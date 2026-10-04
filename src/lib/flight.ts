/**
 * The paper plane's flight plan.
 *
 * Pure geometry: no DOM, no React, no time of its own. Every leg of the flight is
 * a `Segment` that answers one question — where is the plane, and how is it held,
 * this many milliseconds in — which leaves the component with nothing to do but
 * ask, write a transform, and decide when one leg hands over to the next.
 *
 * The whole file exists to keep the flight CONTINUOUS. A plane that jumps, kinks,
 * or snaps its nose reads as broken however pretty the pieces are, so every seam
 * between two legs is matched in both position AND velocity, and the arithmetic
 * that makes each match is commented where it happens rather than left to be
 * rediscovered.
 */

export const TAU = Math.PI * 2;

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

/** Everything that decides how the plane is drawn on one frame. */
export interface Pose {
  /** The plane's centre, in the flight layer's coordinates. */
  point: Point;
  /**
   * Which way the nose points, in radians. Left undefined by every leg that is
   * actually travelling, because the path it is travelling already says.
   */
  bearing?: number;
  scale: number;
  /** 0 the dial's resting chrome, 1 fully lit. */
  lit: number;
}

/** One leg of the flight. */
export interface Segment {
  /** How long it lasts in ms, or `Infinity` for one that ends on an event. */
  readonly duration: number;
  poseAt(elapsed: number): Pose;
}

/* ── shaping ─────────────────────────────────────────────────────────────── */

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Begins and ends at rest. */
const smoothstep = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};

/**
 * Begins and ends at rest AND at zero acceleration, which is what keeps a curve
 * from kinking where it meets another one travelling at a constant rate.
 */
const smootherstep = (t: number) => {
  const c = clamp01(t);
  return c * c * c * (c * (6 * c - 15) + 10);
};

/** Accelerates away from a standstill. */
const easeIn = (t: number) => {
  const c = clamp01(t);
  return c * c;
};

/** A signed amount up to `spread`, for the parts that should not repeat exactly. */
const jitterBy = (random: () => number, spread: number) =>
  (random() * 2 - 1) * spread;

/**
 * The shorter way round from one angle to another, in radians.
 *
 * Without it a nose swinging past due-west takes the 350° route rather than the
 * 10° one, because the two bearings are numerically far apart while being visually
 * adjacent.
 */
export function shortestTurn(from: number, to: number): number {
  let delta = (to - from) % TAU;
  if (delta > Math.PI) delta -= TAU;
  if (delta < -Math.PI) delta += TAU;
  return delta;
}

/* ── the oval ────────────────────────────────────────────────────────────── */

/**
 * How much of the viewport the oval spans, and how much of it is left clear.
 *
 * Fractions rather than pixels so the same flight reads the same on a phone and on
 * a wide display, and a hard margin on top so the plane never touches an edge on
 * either. `ORBIT_MIN_RADIUS` only bites on a viewport too small to honour the
 * margin, where a recognisable loop is worth more than the clearance.
 */
const ORBIT_WIDTH = 1;
const ORBIT_HEIGHT = 1;
/*
 * At 1 those two stop deciding anything: a fraction of the whole viewport is always
 * more room than the margin leaves, so the margin is what sets the oval's size and
 * the oval is as big as it can be. Below about 0.5 they start to bite again and the
 * flight pulls into the middle of the screen. Left in as the dial for that.
 */
const ORBIT_MARGIN = 48;
const ORBIT_MIN_RADIUS = 56;

/**
 * -1 travels anticlockwise on screen — remembering that y runs DOWN, so a falling
 * angle rises.
 *
 * It is the direction that makes the plane climb out of the dial and sweep upward
 * rather than dive under itself, wherever in the row the dial happens to sit.
 */
const ORBIT_DIRECTION = -1;

/**
 * How much the oval is allowed to swell between one flight and the next.
 *
 * The only thing left varying about it. Where the plane joins the oval used to be
 * jittered as well, and cannot be any more: the join IS the dial now, and moving it
 * would move the plane's own starting point off the dial it is taking off from. It
 * is no loss — the dial's place in the viewport already differs with every scroll
 * position, so no two flights start alike anyway.
 */
const ORBIT_RADIUS_JITTER = 0.07;

export interface Orbit {
  centre: Point;
  rx: number;
  ry: number;
  /** Where on the oval the plane joins it, in radians. */
  theta: number;
  /**
   * Where the dial sits, as a fraction of the oval's radius along `theta` — under 1
   * inside the oval, over 1 outside it, and exactly what the launch opens out to 1.
   * With `theta` it IS the dial's position, which is what lets the plane start on
   * the oval's own curve instead of flying across to reach it.
   */
  entry: number;
  direction: number;
  /**
   * What this viewport can carry, as a multiplier on every size in the flight —
   * 1 on a screen with room to spare. Carried here rather than recomputed because
   * the size is read on every frame, by more than one leg, and all of them have to
   * agree about it (§14).
   */
  depth: number;
}

export interface OrbitJitter {
  /** Multiplier on both radii. */
  radius: number;
}

/**
 * Drawn once per flight and kept, so a viewport that changes mid-flight can be
 * replanned without also reshuffling the randomness and jumping the plane.
 */
export function orbitJitter(random: () => number = Math.random): OrbitJitter {
  return { radius: 1 + jitterBy(random, ORBIT_RADIUS_JITTER) };
}

/**
 * The oval this flight will lap, sized to the viewport it is flying in.
 *
 * It is joined at the dial's OWN bearing from the centre of the screen, which is
 * what lets the plane peel onto it instead of crossing the screen to reach it.
 */
export function planOrbit(
  viewport: Size,
  home: Point,
  span: number,
  jitter: OrbitJitter,
): Orbit {
  const centre = { x: viewport.width / 2, y: viewport.height / 2 };

  const depth = Math.min(
    1,
    (Math.min(viewport.width, viewport.height) * DEPTH_MAX_SHARE) /
      (span * DEPTH_NEAR),
  );

  // Measured at `DEPTH_NEAR`, not at the plane's resting size: the bottom of the
  // oval is both the closest the plane comes to an edge and the largest it ever is.
  const clear = (span * DEPTH_NEAR * depth) / 2 + ORBIT_MARGIN;

  // The swell is inside the clamp, not applied after it: a jitter on top of an
  // already-fitted radius is a jitter that can push the plane through the margin
  // it was just fitted to.
  const fit = (half: number, fraction: number) =>
    Math.max(
      ORBIT_MIN_RADIUS,
      Math.min(half * 2 * fraction * jitter.radius, half - clear),
    );

  const rx = fit(centre.x, ORBIT_WIDTH);
  const ry = fit(centre.y, ORBIT_HEIGHT);

  // The dial in the oval's OWN coordinates: an angle round it, and how far out along
  // that angle. Note the radii inside the `atan2` — this is not the dial's bearing
  // on screen, it is its angle once the oval has been squashed back into the circle
  // it stands for, which is the only angle the oval is parameterised by.
  const reach = { x: (home.x - centre.x) / rx, y: (home.y - centre.y) / ry };

  return {
    centre,
    depth,
    rx,
    ry,
    theta: Math.atan2(reach.y, reach.x),
    entry: Math.hypot(reach.x, reach.y),
    direction: ORBIT_DIRECTION,
  };
}

/**
 * How near and how far the plane gets, as a multiple of the size it rests at in
 * the dial.
 *
 * The oval is not really an oval: it is a CIRCLE lying away from the reader, and
 * everything else here follows from taking that seriously. The bottom of it is the
 * near edge and the top is the far one, so the plane is largest crossing the bottom
 * of the screen and smallest crossing the top — which is the only reason a flat
 * path on a flat screen reads as a plane going round you rather than a sticker
 * being dragged along a line.
 *
 * Dials — widen the gap between them for a stronger sense of depth; set them equal
 * and the plane holds one size the whole way round.
 */
const DEPTH_NEAR = 4;
const DEPTH_FAR = 2;

/**
 * The size it reaches at the middle of the screen: bigger than anywhere on the
 * oval, because the middle is where it has come all the way in to.
 */
const CENTRE_SCALE = 3;

/**
 * The most of the screen the plane is allowed to take up, measured across the
 * SHORTER side of the viewport.
 *
 * The three sizes above are multiples of the plane's resting size, and a multiple
 * cannot know what it is a multiple of on. Four times its size is a seventh of a
 * desktop's height and a good deal of drama; on a phone it is a quarter of the
 * screen's width, flying an oval it no longer fits inside — the plane ends up wider
 * than the whole path it is meant to be going round.
 *
 * So the sizes are held to this share, and everything else follows from the number
 * that comes out: the oval's clearance, the size at every point on it, the size at
 * the centre. On a desktop it is no limit at all and the values above stand exactly
 * as set. On a phone it is the only thing keeping the flight in proportion.
 */
const DEPTH_MAX_SHARE = 0.2;

/** A point `turns` complete turns along the oval, at `radius` of its full size. */
function ellipse(orbit: Orbit, turns: number, radius: number): Point {
  const angle = orbit.theta + orbit.direction * TAU * turns;
  return {
    x: orbit.centre.x + Math.cos(angle) * orbit.rx * radius,
    y: orbit.centre.y + Math.sin(angle) * orbit.ry * radius,
  };
}

/**
 * How big the plane is that far along the oval.
 *
 * `sin` of the angle is +1 at the bottom of the oval and -1 at the top, remembering
 * that y runs down — so it is already the near-to-far reading, and it only has to
 * be mapped onto the two sizes. It is continuous by construction, which matters:
 * the size is read fresh on every frame and by more than one leg of the flight, and
 * anything with a seam in it would show as a visible pop in the plane's size.
 */
function depthAt(orbit: Orbit, turns: number): number {
  const angle = orbit.theta + orbit.direction * TAU * turns;
  return orbit.depth * lerp(DEPTH_FAR, DEPTH_NEAR, (Math.sin(angle) + 1) / 2);
}

/* ── the legs ────────────────────────────────────────────────────────────── */

/** Share of the first lap spent peeling out of the dial and onto the oval. */
const LAUNCH_SPAN = 0.22;

/**
 * Launch and the arc round the screen, as ONE leg rather than two.
 *
 * The plane does not fly TO the oval and then start going round it. It starts ON
 * the oval — just not at full radius. The dial is written in the oval's own
 * coordinates (`theta` and `entry`), and the launch opens that radius out to 1, so
 * the first frame is on the same curve as the last one and the plane traces the
 * oval's shape from the moment it leaves.
 *
 * What this replaced was a straight blend from the dial across to a point on the
 * oval, which is a chord: it left the plane off the course for the first forty
 * degrees of it, by as much as 65px, and on a layout where the dial sits below the
 * middle of the screen it made the plane dip before it climbed. It also needed an
 * aiming lead to stop the nose swinging most of the way round at take-off, and that
 * is gone too — the plane's first movement is now along the oval's own tangent,
 * which is the direction it is about to keep going.
 *
 * What it gives up is leaving from a standstill. On the oval from the start means
 * travelling from the start, at whatever fraction of the oval's speed `entry` comes
 * to. That is not a discontinuity — there is no earlier motion for it to disagree
 * with — and a plane thrown out of a dial looks better leaving at speed than easing
 * off the mark.
 *
 * `turns` is how much of the oval it covers — the caller's to set, and less than a
 * whole one, so the arc reads as a sweep past the screen rather than a circuit
 * back to where it started.
 */
export function orbitSegment(options: {
  orbit: Orbit;
  turns: number;
  duration: number;
}): Segment {
  const { orbit, turns, duration } = options;

  return {
    duration,
    poseAt(elapsed) {
      const lap = clamp01(elapsed / duration);
      const blend = smoothstep(lap / LAUNCH_SPAN);

      return {
        point: ellipse(orbit, lap * turns, lerp(orbit.entry, 1, blend)),
        // Out of the dial at exactly the resting size — anything else and the
        // swap at take-off is a pop — and onto the oval's own depth with the
        // same blend that opens the radius.
        scale: lerp(1, depthAt(orbit, lap * turns), blend),
        lit: blend,
      };
    },
  };
}

/**
 * The end of the arc to the middle of the screen, as an inward spiral.
 *
 * Not a move to the centre: the plane keeps GOING ROUND while its radius closes,
 * which is the difference between an arrival and a straight line tacked onto a
 * curve.
 *
 * The turning runs at a CONSTANT rate — the same one the arc was turning at — and
 * every bit of the slowing down comes from the radius instead. That is what keeps
 * the plane curving the whole way in: decay the turning as well and it finishes
 * turning while there is still radius left to close, and the last stretch of the
 * approach becomes a straight radial run into the middle, which is visible and
 * reads as a second, separate movement after the flight has ended.
 *
 * It also means speed falls out for free. The plane's pace here is its radius times
 * its turn rate, so a radius that closes to nothing brings it to a stop at the
 * centre with nothing else asked to.
 *
 * `flown` is where the arc left off, so this picks the oval up at exactly the point
 * the plane is already at. `turns` is how much further round it carries while
 * closing, and the caller has to derive it rather than choose it — see the call
 * site.
 */
export function settleSegment(options: {
  orbit: Orbit;
  flown: number;
  duration: number;
  turns: number;
}): Segment {
  const { orbit, flown, duration, turns } = options;

  return {
    duration,
    poseAt(elapsed) {
      const u = clamp01(elapsed / duration);

      return {
        // Radius by `smootherstep`, which closes from nothing and to nothing: the
        // arc arrives with no inward motion at all, so anything that starts closing
        // at speed puts a visible corner on the seam.
        point: ellipse(orbit, flown + turns * u, 1 - smootherstep(u)),
        // Starts on the oval's depth rather than being handed the size the arc
        // ended at, so the two legs cannot disagree about it (§14).
        scale: lerp(
          depthAt(orbit, flown + turns * u),
          CENTRE_SCALE * orbit.depth,
          smootherstep(u),
        ),
        lit: 1,
      };
    },
  };
}

/** The idle at the centre: how far it drifts, how fast it breathes, how it sways. */
const HOVER_BOB = 7;
const HOVER_DRIFT = 4;
const HOVER_SWAY = 0.1;
const HOVER_PERIOD = 1900;
const HOVER_BREATH = 0.02;
/** ms for the idle to reach full size, from the standstill it inherits. */
const HOVER_RISE = 320;
/**
 * The sideways drift runs slower than the bob and the sway lags both, so the three
 * never line up into a single bounce.
 */
const HOVER_WANDER = 1.6;
const HOVER_LAG = Math.PI / 3;

/**
 * How the plane is held while it waits, in radians — negative being nose-up, since
 * y runs down. About thirty degrees.
 *
 * A fixed attitude, and it has to be: left to the path the plane keeps whatever
 * heading the spiral happened to finish on, which is nose-up-91° on a desktop, -42°
 * on a tablet and -57° on a phone. Three different resting poses for the same
 * moment, none of them chosen, and all of them steeper than a plane holding station
 * should sit.
 *
 * Thirty rather than zero on purpose: dead level reads as a diagram of a plane,
 * and a slight climb reads as one flying. It is also most of the way to the
 * heading it leaves on, so the exit is a small turn rather than a pivot.
 */
const HOVER_BEARING = -Math.PI / 6;

/**
 * Holding at the centre while the request is still out.
 *
 * Endless on purpose: it is left by the outside world answering, not by a clock,
 * so a slow reply is waited out rather than raced. Everything it does is built on
 * a sine through zero and scaled by a ramp, which is why it can pick up from a
 * dead stop without a twitch.
 *
 * It is the one leg that states its own bearing, for two reasons: left to the path,
 * a nose following a 7px bob would swing wildly for no reason — and the attitude a
 * plane rests at is a thing to be chosen, not a leftover of how it got there.
 */
export function hoverSegment(options: {
  centre: Point;
  /**
   * The size to hold. Handed in rather than worked out again, so the spiral's last
   * frame and this one's first cannot disagree — and so the drift below moves in
   * proportion to the plane doing it. Seven pixels reads as a float under a plane
   * its own size and as a twitch under one three times bigger.
   */
  size: number;
}): Segment {
  const { centre, size } = options;

  return {
    duration: Number.POSITIVE_INFINITY,
    poseAt(elapsed) {
      const rise = smoothstep(elapsed / HOVER_RISE);
      const beat = TAU * (elapsed / HOVER_PERIOD);
      const bob = Math.sin(beat);

      return {
        point: {
          x:
            centre.x +
            Math.sin(beat / HOVER_WANDER) * HOVER_DRIFT * rise * size,
          y: centre.y + bob * HOVER_BOB * rise * size,
        },
        // Turned TO, not inherited. The nose is followed by a smoothed turn, so
        // asking for an attitude it is not yet at is a swing into position rather
        // than a snap — which is the settling the arrival was missing.
        bearing: HOVER_BEARING + Math.sin(beat + HOVER_LAG) * HOVER_SWAY * rise,
        scale: size * (1 + bob * HOVER_BREATH * rise),
        lit: 1,
      };
    },
  };
}

/**
 * The way out: due right, and only a few degrees either side of it.
 *
 * A fixed bearing rather than whatever heading the plane happened to be holding.
 * The plane is carrying something away, and the direction that reads as away is the
 * one the reader's eye already leaves a line in — so it is worth being the same
 * every time, and worth the plane having to turn to take it.
 */
const EXIT_BEARING = 0;
const EXIT_SPREAD = 0.12;
const EXIT_BOW = 46;
/**
 * How much of its departing size the plane is left at — a fraction OF it, not a
 * size to land on. A fixed size to land on means the same exit is a sevenfold
 * recede on a desktop and a fourfold one on a phone, because the two do not leave
 * at the same size to begin with.
 */
const EXIT_SHRINK = 0.15;

/**
 * Gone: out to the right, accelerating, and past the edge of the screen.
 *
 * The distance is squared progress, which spends the first half of the leg barely
 * moving and the second half leaving, so the hover reads as a wind-up for it. The
 * bow eases in sideways on top, so the departure banks rather than ruling a line.
 */
export function exitSegment(options: {
  from: Point;
  /**
   * The size it is leaving at. Handed in rather than assumed to be the centre's,
   * because the hover is breathing when the exit takes over and is a fraction above
   * or below that size at the moment it does — which is small, and would still show
   * as a pop on the frame it happened.
   */
  fromScale: number;
  viewport: Size;
  span: number;
  duration: number;
  random?: () => number;
}): Segment {
  const {
    from,
    fromScale,
    viewport,
    span,
    duration,
    random = Math.random,
  } = options;

  const heading = EXIT_BEARING + jitterBy(random, EXIT_SPREAD);
  const bow = jitterBy(random, EXIT_BOW);
  const along = { x: Math.cos(heading), y: Math.sin(heading) };
  // Half the diagonal clears the furthest corner, whichever way it happens to go.
  const reach = Math.hypot(viewport.width, viewport.height) / 2 + span;

  return {
    duration,
    poseAt(elapsed) {
      const u = clamp01(elapsed / duration);
      const gone = easeIn(u);
      const drift = bow * smoothstep(u);

      return {
        point: {
          x: from.x + along.x * reach * gone - along.y * drift,
          y: from.y + along.y * reach * gone + along.x * drift,
        },
        scale: lerp(fromScale, fromScale * EXIT_SHRINK, gone),
        lit: 1,
      };
    },
  };
}

/** Longest run-out along the incoming heading, as a share of the way home. */
const RETURN_LEAD = 0.55;
/** How far the curve bows sideways when there is no heading to run out along. */
const RETURN_BOW = 0.28;
/**
 * How fast the way home is flown, in px/ms, and the shortest and longest it may
 * take. Timed from the distance rather than given a fixed duration: the same 560ms
 * is a gentle glide from the middle of a phone screen and a bolt across a desktop
 * one, and it is the SPEED that has to look the same on both.
 */
const RETURN_SPEED = 1;
const RETURN_MIN_MS = 480;
const RETURN_MAX_MS = 900;
/**
 * Share of the return still spent following the path, before the nose lines up
 * with the dial. It trades one thing off against the other: line up later and the
 * plane docks at a visible angle to the glyph it is swapped for, line up earlier
 * and it flies the last stretch home pointing somewhere other than where it is
 * going. A fifth of the way in leaves the angle inside a couple of pixels.
 */
const RETURN_ALIGN = 0.2;
/** px/ms under which there is no heading left to continue. */
const RETURN_STILL = 0.001;

function cubic(a: Point, b: Point, c: Point, d: Point, t: number): Point {
  const s = 1 - t;
  const wa = s * s * s;
  const wb = 3 * s * s * t;
  const wc = 3 * s * t * t;
  const wd = t * t * t;

  return {
    x: a.x * wa + b.x * wb + c.x * wc + d.x * wd,
    y: a.y * wa + b.y * wb + c.y * wc + d.y * wd,
  };
}

/**
 * The way home, when the send failed.
 *
 * Taken from WHEREVER the plane is when the failure lands, because a plane that
 * finished a lap it no longer had a reason to fly would keep the reader waiting on
 * an error they could already have been reading. So it can be cut into at full
 * speed mid-lap, and the curve is built to take that over rather than fight it.
 *
 * Walked in LINEAR time, with no easing on top. That is not a simplification — it
 * is what makes the curve the easing: a cubic in time leaves at 3·(P1−P0)/duration
 * and arrives at 3·(P3−P2)/duration, so putting P1 one third of the incoming
 * velocity along and P2 ON the target gives a curve that picks up exactly the speed
 * the plane had and comes to a complete stop at the dial, with the whole shape of
 * the deceleration in between. Laying an ease over a cubic instead compounds two
 * uneven speed profiles, and the plane lurches somewhere in the middle at four
 * times the speed it was cut at.
 *
 * With nothing to take over — cut in from the hover, at a standstill — it bows out
 * sideways instead, so the return is still a curve rather than a line.
 */
export function recoverSegment(options: {
  from: Point;
  /** px per ms. */
  velocity: Point;
  to: Point;
  fromScale: number;
  /** The bearing the glyph's ink already points, so docking lands on rotation 0. */
  restBearing: number;
}): Segment {
  const { from, velocity, to, fromScale, restBearing } = options;

  const gap = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  const duration = Math.min(
    RETURN_MAX_MS,
    Math.max(RETURN_MIN_MS, gap / RETURN_SPEED),
  );

  const speed = Math.hypot(velocity.x, velocity.y);
  const run =
    speed > RETURN_STILL
      ? Math.min(gap * RETURN_LEAD, (speed * duration) / 3)
      : gap * RETURN_BOW;
  const heading =
    speed > RETURN_STILL
      ? { x: velocity.x / speed, y: velocity.y / speed }
      : // Sideways of the way home, so a standstill still leaves on a curve.
        { x: -(to.y - from.y) / gap, y: (to.x - from.x) / gap };

  const control = { x: from.x + heading.x * run, y: from.y + heading.y * run };
  const at = (elapsed: number) =>
    cubic(from, control, to, to, clamp01(elapsed / duration));

  return {
    duration,
    poseAt(elapsed) {
      const progress = clamp01(elapsed / duration);
      const point = at(elapsed);
      const ahead = at(elapsed + 1);

      return {
        point,
        /*
         * Handed straight to the resting attitude partway home rather than eased
         * into it. The nose is already followed by a smoothed turn, so a target
         * that moves as well is a target the nose can only ever lag — and that lag
         * is what left the plane docking nearly twenty degrees off the glyph it was
         * about to be swapped for. A fixed target it has time to reach lands on it.
         */
        bearing:
          progress < RETURN_ALIGN
            ? Math.atan2(ahead.y - point.y, ahead.x - point.x)
            : restBearing,
        scale: lerp(fromScale, 1, smoothstep(progress)),
        lit: 1 - smoothstep(progress),
      };
    },
  };
}
