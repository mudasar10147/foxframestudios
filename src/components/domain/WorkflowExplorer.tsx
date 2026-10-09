"use client";

import { useState } from "react";
import { WorkflowStep } from "@/components/domain/WorkflowStep";
import { Rise } from "@/components/shared/Rise";
import { FlowArrow } from "@/components/ui/FlowArrow";
import { OutlineSurge } from "@/components/ui/OutlineSurge";
import { Tabs } from "@/components/ui/Tabs";

export interface WorkflowTrack {
  /** Stable key, also the tab's value. */
  id: string;
  /** The tab's text, e.g. "Scripting". */
  label: string;
  /** Shown above the row, e.g. "Scripting Process". */
  caption: string;
  /** The stages, in order. */
  stages: readonly string[];
}

/**
 * The ambient charge's pace, in milliseconds.
 *
 * Dials — `STAGE_MS` and `ARROW_MS` are how long the charge takes to get round one
 * stage and across one arrow, so together they set how fast it reads; `REST_MS` is
 * the dark pause after it reaches the last stage, before it sets off from the first
 * again. Raise `REST_MS` to make the section quieter without slowing the charge.
 */
const STAGE_MS = 640;
const ARROW_MS = 280;
const REST_MS = 900;

/** One stage plus the arrow leading into the next, which is the relay's step. */
const STRIDE_MS = STAGE_MS + ARROW_MS;

/**
 * One pass of the row plus the rest after it. Every piece repeats on this same
 * period — that shared cycle is what keeps them relaying ONE charge rather than
 * each flashing on a clock of its own. Worked out per track, since tracks can
 * differ in length.
 */
function cycleMs(stageCount: number) {
  return stageCount * STAGE_MS + (stageCount - 1) * ARROW_MS + REST_MS;
}

export interface WorkflowExplorerProps {
  tracks: readonly WorkflowTrack[];
  /** The tab selected when the page loads. Defaults to the first. */
  defaultId?: string;
}

/**
 * The studio's workflow, one track per service, chosen with tabs.
 *
 * Switching tracks remounts the row (it's keyed by the track), which replays the
 * stages' entrance and starts the ambient charge from the first stage again. The
 * entrance waits for the row to be in view, so the first track still plays when
 * it's scrolled to, and a track switched to on screen plays straight away.
 */
export function WorkflowExplorer({ tracks, defaultId }: WorkflowExplorerProps) {
  const [selectedId, setSelectedId] = useState(
    defaultId ?? tracks[0]?.id ?? "",
  );
  const track = tracks.find((item) => item.id === selectedId) ?? tracks[0];

  if (!track) return null;

  const cycle = cycleMs(track.stages.length);

  return (
    <Tabs
      label="Workflow by service"
      items={tracks.map((item) => ({ value: item.id, label: item.label }))}
      value={track.id}
      onValueChange={setSelectedId}
      align="center"
    >
      <div key={track.id} className="mt-10 lg:mt-12">
        <Rise trigger="in-view">
          {/* Tracking matches the one `SectionHeader` gives its eyebrow — it is
              what makes a line of type read as instrumentation rather than copy. */}
          <span className="text-text-secondary text-sm font-medium tracking-[0.2em] uppercase">
            Workflow / {track.caption}
          </span>
        </Rise>

        {/*
         * Ordered, because the sequence IS the content. The numbers are in the text
         * as well, so the order still reads once the list styling is reset away.
         */}
        <ol className="node-row mt-5">
          {track.stages.map((stage, index) => (
            // `relative` so the arrow can be hung off this stage's left edge
            // without taking part in the row's layout.
            <li key={stage} className="relative">
              {/* The arrow into this stage carries the charge for the gap between
                  the previous stage leaving it and this one taking it up. */}
              {index > 0 ? (
                <FlowArrow
                  surge={{
                    delay: index * STRIDE_MS - ARROW_MS,
                    duration: ARROW_MS,
                    cycle,
                  }}
                />
              ) : null}

              <Rise trigger="in-view" delay={index * 90} className="h-full">
                <WorkflowStep index={index + 1} name={stage} />
              </Rise>

              {/*
               * The charge splits at this stage's left edge, rides both halves of
               * its outline, and rejoins on the right before the next arrow takes
               * it on. Hung off the `<li>` rather than the step so it traces the
               * box the row actually laid out.
               */}
              <OutlineSurge
                className="surge-ambient"
                delay={index * STRIDE_MS}
                duration={STAGE_MS}
                cycle={cycle}
              />
            </li>
          ))}
        </ol>
      </div>
    </Tabs>
  );
}
