"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { SEND_GLYPH_BEARING, SendGlyph } from "@/components/ui/SendGlyph";
import {
  exitSegment,
  hoverSegment,
  orbitJitter,
  orbitSegment,
  planOrbit,
  recoverSegment,
  settleSegment,
  shortestTurn,
  type Point,
  type Segment,
} from "@/lib/flight";

export type SendOutcome = "sent" | "failed";

/**
 * How long each leg of the flight lasts.
 *
 * Dials — the whole flight is `ORBIT_MS + SETTLE_MS`, plus however long the request
 * takes beyond that, plus `EXIT_MS`. `HOVER_MIN_MS` is the floor on the pause at
 * the centre: a reply that arrives before the plane does is still made to land
 * before it leaves, or the arrival reads as a bounce. It also has to outlast the
 * streaks' 700ms fade, or the air never finishes arriving before it is taken away.
 */
const ORBIT_MS = 1700;
const SETTLE_MS = 600;
const HOVER_MIN_MS = 900;
const EXIT_MS = 640;
/* The way home is not listed: it times itself from how far it has to come. */

/**
 * How much of a turn the plane makes in ALL, from the dial to the middle of the
 * screen: three quarters of one, so the arc sweeps past the screen rather than
 * closing a circuit back to where it started.
 *
 * The two lines under it are that figure split between the arc and the spiral, and
 * the split is not free. Both turn at the SAME constant rate — that is what makes
 * the seam between them invisible, and what keeps the plane curving until the
 * moment it stops — so each one's share of the turn is just its share of the time.
 * The pair below is that solved to still add up to exactly `FLIGHT_TURN`.
 *
 * It leaves the spiral with a third of the whole turn rather than a tenth of it,
 * which is the point: a spiral that barely turns is a straight line into the middle
 * wearing a curve's clothes.
 *
 * Dials — `FLIGHT_TURN` is the one to move: 0.75 is 270°, 1 is a full circuit.
 * `ORBIT_MS` then sets the pace rather than the distance, since the distance is
 * this. `SETTLE_MS` shifts turn from the arc to the spiral without changing the
 * total, so more of it makes the plane curl further in and less makes it sweep
 * further round first.
 */
const FLIGHT_TURN = 0.75;
const SETTLE_SHARE = SETTLE_MS / ORBIT_MS;
const ORBIT_TURNS = FLIGHT_TURN / (1 + SETTLE_SHARE);
const SETTLE_TURNS = ORBIT_TURNS * SETTLE_SHARE;

/** Roughly how long the nose takes to come round to where it is going. */
const TURN_MS = 110;

/** How far ahead the path is read to find the direction of travel, in ms. */
const LOOKAHEAD_MS = 24;

/** A sample shorter than this says nothing about direction, in px. */
const STILL_PX = 0.02;

/** Longest frame the nose's turn is integrated over, so a stall cannot spin it. */
const MAX_FRAME_MS = 64;

const DEGREES = 180 / Math.PI;

/**
 * Whether to draw the oval the plane is flying.
 *
 * The path is solved from the viewport at take-off, so with this off the only way
 * to know what shape it came out as on a given screen is to watch the plane trace
 * it. On, it is a faint dashed course under the flight — useful while the geometry
 * is being tuned, and quiet enough to leave on if it reads as part of the HUD.
 */
const SHOW_ORBIT = true;

/**
 * Where the flight has got to.
 *
 * There is deliberately no `idle`: a flight that is not happening is NOT MOUNTED,
 * which is also what makes a second send clean — there is no timer, listener,
 * frame, or half-finished plane left over from the first one to reset.
 */
type Phase = "orbit" | "settle" | "hover" | "exit" | "recover";

export interface SendFlightProps {
  /**
   * The thing the plane comes out of, and returns to if the send fails. Its box
   * gives both the take-off point and the size the plane flies at, so the copy
   * sitting there can be swapped for this one without a jump.
   */
  origin: RefObject<Element | null>;
  /**
   * Null while the send is still out; the result once it has landed. The flight
   * reads it every frame and never asks for it, which is what keeps the animation
   * tied to the request rather than to a clock of its own.
   */
  outcome: SendOutcome | null;
  /** Called once, when the plane is gone and the outcome can be shown. */
  onFinish: () => void;
}

/**
 * A paper plane that flies a lap of the screen while something is being sent.
 *
 * Mounting it launches the plane; it lifts off the element `origin` points at,
 * laps the viewport, spirals into the middle, and waits there. What happens next
 * is the caller's answer: a success sends it out past the corner of the screen, a
 * failure turns it round and brings it home. `onFinish` fires when it has gone, so
 * the caller can reveal the outcome to a screen that is no longer busy.
 *
 * Deliberately NOT a CSS animation. A keyframe cannot be told to hold its last
 * frame until a promise settles and then continue, which is the one thing this has
 * to do; and the path is a function of the viewport, which keyframes cannot read.
 * So it runs on one animation frame loop writing one `transform` — composited, off
 * the layout path, and unable to shift the page it flies over.
 *
 * It does not check `prefers-reduced-motion`. Whether a flourish is appropriate is
 * the caller's decision, because the caller is the one that knows what it is
 * decorating — and it must then not mount this at all.
 */
export function SendFlight({ origin, outcome, onFinish }: SendFlightProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGEllipseElement>(null);

  // Held in refs, and so kept out of the effect's dependencies: the outcome lands
  // MID-flight by definition, and a caller that rebuilds its callback each render
  // would otherwise relaunch the plane from under itself every time it did.
  const outcomeRef = useRef(outcome);
  const finishRef = useRef(onFinish);

  useEffect(() => {
    outcomeRef.current = outcome;
    finishRef.current = onFinish;
  });

  // Layout, not plain: this measures the origin and writes the first frame, and
  // both have to happen BEFORE the browser paints or the plane is painted once at
  // the top-left corner on its way to being right.
  useLayoutEffect(() => {
    const layer = layerRef.current;
    const plane = planeRef.current;
    const lit = litRef.current;
    const track = trackRef.current;
    const source = origin.current;

    if (!layer || !plane || !lit || !source) {
      // Nothing to fly from. Hand back immediately rather than leaving the caller
      // waiting on a flight that is never going to end.
      finishRef.current();
      return;
    }

    const centreOf = (element: Element): Point => {
      const box = element.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    };

    // The plane is the size of the glyph it came out of, so the swap at take-off
    // is invisible rather than a jump in size.
    const span = source.getBoundingClientRect().width;
    plane.style.width = `${span}px`;
    plane.style.height = `${span}px`;
    plane.style.opacity = "1";

    const jitter = orbitJitter();
    const launchedFrom = centreOf(source);
    const viewport = { width: layer.clientWidth, height: layer.clientHeight };
    const orbit = planOrbit(viewport, launchedFrom, span, jitter);

    // Written INTO the objects the running leg closed over, rather than replacing
    // them, which is how a lap already in progress picks up the new shape. The
    // jitter is reused deliberately: replanning must not also reshuffle the oval
    // underneath the plane.
    // Set rather than rendered: the shape is solved from the viewport, which React
    // has no way of knowing at the time it renders this.
    const drawTrack = () => {
      if (!track) return;
      track.setAttribute("cx", String(orbit.centre.x));
      track.setAttribute("cy", String(orbit.centre.y));
      track.setAttribute("rx", String(orbit.rx));
      track.setAttribute("ry", String(orbit.ry));
    };

    const handleResize = () => {
      Object.assign(viewport, {
        width: layer.clientWidth,
        height: layer.clientHeight,
      });
      Object.assign(orbit, planOrbit(viewport, launchedFrom, span, jitter));
      drawTrack();
    };

    drawTrack();

    let phase: Phase = "orbit";
    let segment: Segment = orbitSegment({
      orbit,
      turns: ORBIT_TURNS,
      duration: ORBIT_MS,
    });
    let since = performance.now();
    let last = since;
    // Starts where the resting glyph points, so the first frame asks for no
    // rotation at all and take-off cannot begin with a twitch.
    let bearing = SEND_GLYPH_BEARING;
    let frame = 0;
    let landed = false;

    const advance = (next: Phase, leg: Segment, now: number) => {
      phase = next;
      segment = leg;
      since = now;
    };

    const land = () => {
      if (landed) return;
      landed = true;
      cancelAnimationFrame(frame);
      finishRef.current();
    };

    const step = (now: number) => {
      frame = requestAnimationFrame(step);

      const elapsed = now - since;
      const delta = Math.min(now - last, MAX_FRAME_MS);
      last = now;

      const pose = segment.poseAt(elapsed);
      const ahead = segment.poseAt(
        Math.min(elapsed + LOOKAHEAD_MS, segment.duration),
      );
      const dx = ahead.point.x - pose.point.x;
      const dy = ahead.point.y - pose.point.y;

      // Turned toward, never snapped to. The nose then lags its path a little,
      // which is what reads as banking, and it cannot flick when the path is
      // momentarily too slow to have a direction. The exponential keeps the turn
      // rate the same whether the frame took 8ms or 30.
      const target =
        pose.bearing ??
        (Math.hypot(dx, dy) > STILL_PX ? Math.atan2(dy, dx) : null);

      if (target !== null) {
        bearing +=
          shortestTurn(bearing, target) * (1 - Math.exp(-delta / TURN_MS));
      }

      plane.style.transform = [
        `translate3d(${(pose.point.x - span / 2).toFixed(2)}px, ${(pose.point.y - span / 2).toFixed(2)}px, 0)`,
        `rotate(${((bearing - SEND_GLYPH_BEARING) * DEGREES).toFixed(2)}deg)`,
        `scale(${pose.scale.toFixed(3)})`,
      ].join(" ");
      lit.style.opacity = pose.lit.toFixed(3);

      // The air moves past the plane only while it is HOLDING. A plane on its way
      // round has its own speed to show, and the moment it moves again the air
      // stops being what tells you it is flying — so the class comes off and the
      // stylesheet fades it out, whether it left in triumph or turned for home.
      // Setting a class an element already has does nothing, so this costs nothing
      // on the frames that do not change it.
      plane.classList.toggle("send-plane-streaming", phase === "hover");

      // A failure is taken the instant it lands, from wherever the plane happens to
      // be: there is nothing left to celebrate, and an error the reader cannot see
      // yet is an error they are sitting and waiting for. A success is NOT taken
      // early — the flight IS the celebration, so it plays out and collects its
      // result at the centre.
      // Named legs rather than "not the exit": `recover` has to be excluded too, or
      // the cut fires again on the frame after it, and again, restarting the turn
      // for home forever and never reaching its end — so the flight never lands
      // and the error is never shown.
      if (
        outcomeRef.current === "failed" &&
        (phase === "orbit" || phase === "settle" || phase === "hover")
      ) {
        advance(
          "recover",
          recoverSegment({
            from: pose.point,
            velocity: { x: dx / LOOKAHEAD_MS, y: dy / LOOKAHEAD_MS },
            to: centreOf(source),
            fromScale: pose.scale,
            restBearing: SEND_GLYPH_BEARING,
          }),
          now,
        );
        return;
      }

      if (phase === "hover") {
        if (outcomeRef.current === "sent" && elapsed >= HOVER_MIN_MS) {
          advance(
            "exit",
            exitSegment({
              from: pose.point,
              fromScale: pose.scale,
              viewport,
              span,
              duration: EXIT_MS,
            }),
            now,
          );
        }
        return;
      }

      if (elapsed < segment.duration) return;

      if (phase === "orbit") {
        advance(
          "settle",
          settleSegment({
            orbit,
            flown: ORBIT_TURNS,
            duration: SETTLE_MS,
            turns: SETTLE_TURNS,
          }),
          now,
        );
        return;
      }

      if (phase === "settle") {
        advance(
          "hover",
          hoverSegment({ centre: orbit.centre, size: pose.scale }),
          now,
        );
        return;
      }

      land();
    };

    window.addEventListener("resize", handleResize);
    step(since);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
    };
  }, [origin]);

  // `document` is safe to reach for here because this only ever mounts in response
  // to a send, which cannot happen on the server.
  return createPortal(
    <div ref={layerRef} aria-hidden className="send-plane-layer">
      {SHOW_ORBIT ? (
        <svg className="send-plane-track">
          <ellipse ref={trackRef} />
        </svg>
      ) : null}

      {/* Starts invisible because its place is not known until the effect below
          has measured the dial — one frame at the wrong size in the corner is
          exactly the visible jump this animation is not allowed to have. */}
      <div ref={planeRef} className="send-plane" style={{ opacity: 0 }}>
        {/*
         * Turned to the plane's own heading rather than the box's. The ink points
         * up and to the right of an unrotated glyph, so a streak laid out flat here
         * would cross the plane at forty-six degrees instead of streaming past it.
         * The angle is taken from the glyph rather than written down again, because
         * there is only one right answer to it and the glyph is where it lives.
         *
         * Five identical elements: what tells them apart is in the stylesheet.
         */}
        <span
          className="send-plane-streaks"
          style={{ transform: `rotate(${SEND_GLYPH_BEARING}rad)` }}
        >
          <span className="send-plane-streak" />
          <span className="send-plane-streak" />
          <span className="send-plane-streak" />
          <span className="send-plane-streak" />
          <span className="send-plane-streak" />
        </span>

        <SendGlyph className="text-glyph-chrome absolute inset-0 size-full" />
        <SendGlyph
          ref={litRef}
          className="send-plane-lit text-accent-primary absolute inset-0 size-full"
        />
      </div>
    </div>,
    document.body,
  );
}
