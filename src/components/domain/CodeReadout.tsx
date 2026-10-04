import type { CSSProperties } from "react";
import { HudTile } from "@/components/ui/HudTile";
import { Icon, type IconName } from "@/components/ui/Icon";
import { staggerDelays } from "@/lib/stagger";
import type { Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

const fillStyles: Record<Tone, string> = {
  neutral: "bg-tone-neutral",
  cool: "bg-tone-cool",
  strong: "bg-tone-strong",
  deep: "bg-tone-deep",
  warm: "bg-tone-warm",
  dim: "bg-tone-dim",
};

/** Gap between one token filling in and the next; the sequence runs line by line. */
const TOKEN_STAGGER_MS = 45;
const DEFAULT_PAGES = 4;

export interface CodeToken {
  /** Width, as a percentage of the line. */
  length: number;
  /**
   * Syntax colour, filled in on hover. Leave it out for plain code, which stays a
   * grey bar.
   */
  tone?: Tone;
}

export interface CodeReadoutProps {
  /** e.g. "Scripts". Displayed uppercase. */
  title: string;
  /** Short qualities under the title, separated by dots. */
  tags: readonly string[];
  /** Shown bottom right, e.g. "Lua". Displayed uppercase. */
  language: string;
  /** The mark in the corner tile. Defaults to the code glyph. */
  icon?: IconName;
  /** Abstract code: each line is a run of tokens, drawn as bars. */
  lines: readonly (readonly CodeToken[])[];
  /** Dots beside the language. Defaults to 4. */
  pages?: number;
  /** Which dot is lit, from 0. Defaults to 0. */
  activePage?: number;
}

/**
 * Code at a glance: a title and its qualities, a corner icon, a block of abstract
 * syntax-highlighted lines, and the language with page dots.
 *
 * Like the other readouts, it brings no surface of its own; it fills the box it's
 * given and sizes itself from that box (see `.code-readout` in the utilities
 * stylesheet). The code is always there as grey bars. While the pointer is over the
 * readout, its highlighted tokens fill with colour, token by token and line by
 * line, and the corner tile lights up; on leave, the colour drains backwards.
 */
export function CodeReadout({
  title,
  tags,
  language,
  icon = "code",
  lines,
  pages = DEFAULT_PAGES,
  activePage = 0,
}: CodeReadoutProps) {
  const tokenCount = lines.reduce((sum, line) => sum + line.length, 0);
  // Each token's position in the whole block, so typing runs on across lines.
  const lineStarts = lines.map((_, index) =>
    lines.slice(0, index).reduce((sum, line) => sum + line.length, 0),
  );

  return (
    <div className="code-readout hover-reveal-scope size-full">
      <div className="code-readout-body flex size-full flex-col">
        <div className="code-readout-header">
          <p className="code-readout-title text-text-primary font-bold uppercase">
            {title}
          </p>
          <p className="code-readout-tags text-text-secondary uppercase">
            {tags.map((tag, index) => (
              <span key={tag} className="code-readout-tag">
                {index > 0 ? <span aria-hidden>•</span> : null}
                {tag}
              </span>
            ))}
          </p>
        </div>

        <div aria-hidden className="code-readout-icon">
          <HudTile tone="cool" selected>
            <Icon name={icon} />
          </HudTile>
        </div>

        {/* Decorative: the shape of code, not code to read. */}
        <ul aria-hidden className="code-readout-lines">
          {lines.map((line, lineIndex) => (
            // Lines and tokens are fixed content that never reorders, so their
            // positions are stable keys.
            <li key={lineIndex} className="code-readout-line">
              <span className="code-readout-bullet bg-border-strong" />
              <span className="code-readout-tokens">
                {line.map((token, tokenIndex) => {
                  const { enterDelay, exitDelay } = staggerDelays(
                    (lineStarts[lineIndex] ?? 0) + tokenIndex,
                    tokenCount,
                    TOKEN_STAGGER_MS,
                  );

                  return (
                    <span
                      key={tokenIndex}
                      className="code-readout-token bg-border-strong"
                      style={
                        {
                          "--token-length": `${token.length}%`,
                          "--token-enter-delay": `${enterDelay}ms`,
                          "--token-exit-delay": `${exitDelay}ms`,
                        } as CSSProperties
                      }
                    >
                      {token.tone ? (
                        <span
                          className={cn(
                            "code-readout-fill",
                            fillStyles[token.tone],
                          )}
                        />
                      ) : null}
                    </span>
                  );
                })}
              </span>
            </li>
          ))}
        </ul>

        <div className="code-readout-footer">
          <span className="text-text-secondary uppercase">{language}</span>
          <span aria-hidden className="code-readout-dots">
            {Array.from({ length: pages }, (_, page) => (
              <span
                // Fixed positions in a row that never reorders.
                key={page}
                className={cn(
                  "code-readout-dot",
                  page === activePage
                    ? "code-readout-dot-active bg-accent-primary"
                    : "bg-surface-elevated",
                )}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
