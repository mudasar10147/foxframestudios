"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  controlHeightStyles,
  controlStyles,
  type ControlSize,
} from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export interface SelectOption<Value extends string = string> {
  value: Value;
  label: string;
}

export interface SelectProps<Value extends string = string> {
  /** Ties the control to its `<label htmlFor>`. */
  id?: string;
  /** Submitted with the form, through a hidden input. */
  name?: string;
  options: readonly SelectOption<Value>[];
  /** The chosen value, or "" for nothing chosen yet. */
  value: Value | "";
  onValueChange: (value: Value) => void;
  /** Shown while nothing is chosen, like an input's placeholder. */
  placeholder?: string;
  /** Defaults to `md`. */
  size?: ControlSize;
  disabled?: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  className?: string;
}

/**
 * A dropdown that looks and behaves the same in every browser, in the same chrome
 * as `Input`.
 *
 * Built to the WAI-ARIA "select-only combobox" pattern: focus stays on the trigger,
 * and the highlighted option is announced through `aria-activedescendant`.
 * - Closed: Enter, Space, ↑ or ↓ opens it; Home/End open it at either end.
 * - Open: ↑/↓ move, Home/End jump, Enter or Space chooses, Escape closes without
 *   choosing, Tab closes and moves on.
 * - Typing a letter jumps to the next option starting with it, open or closed.
 * - A click outside closes it.
 */
export function Select<Value extends string>({
  id,
  name,
  options,
  value,
  onValueChange,
  placeholder,
  size = "md",
  disabled = false,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  className,
}: SelectProps<Value>) {
  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  // Derived, not stored: which option holds the value (§12.1).
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const openAt = (index: number) => {
    setActive(Math.min(Math.max(index, 0), options.length - 1));
    setOpen(true);
  };

  const choose = (index: number) => {
    const option = options[index];
    if (option) onValueChange(option.value);
    setOpen(false);
  };

  /** The next option, after `from`, whose label starts with `key`, wrapping round. */
  const findByLetter = (key: string, from: number) => {
    const letter = key.toLowerCase();
    for (let step = 1; step <= options.length; step += 1) {
      const index = (from + step) % options.length;
      if (options[index]?.label.toLowerCase().startsWith(letter)) return index;
    }
    return -1;
  };

  // A pointer press anywhere outside closes the menu. Only listened for while it's
  // open, and removed again on close.
  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !root.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [open]);

  // Keep the highlighted option in view in a menu tall enough to scroll.
  useEffect(() => {
    if (!open) return;
    list.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    const current = selectedIndex >= 0 ? selectedIndex : 0;

    if (!open) {
      switch (event.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          openAt(current);
          return;
        case "Home":
          event.preventDefault();
          openAt(0);
          return;
        case "End":
          event.preventDefault();
          openAt(last);
          return;
      }
    } else {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActive((index) => Math.min(index + 1, last));
          return;
        case "ArrowUp":
          event.preventDefault();
          setActive((index) => Math.max(index - 1, 0));
          return;
        case "Home":
          event.preventDefault();
          setActive(0);
          return;
        case "End":
          event.preventDefault();
          setActive(last);
          return;
        case "Enter":
        case " ":
          event.preventDefault();
          choose(active);
          return;
        case "Escape":
          event.preventDefault();
          setOpen(false);
          return;
        case "Tab":
          setOpen(false);
          return;
      }
    }

    // Type-ahead: a single printable character, with no shortcut modifier held.
    if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      const match = findByLetter(event.key, open ? active : current);
      if (match < 0) return;
      if (open) setActive(match);
      else openAt(match);
    }
  };

  return (
    <div ref={root} className="relative">
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
        onKeyDown={handleKeyDown}
        className={controlStyles({
          size,
          className: cn(
            controlHeightStyles[size],
            "flex cursor-pointer items-center justify-between gap-3 text-left",
            open && "border-accent-primary",
            className,
          ),
        })}
      >
        <span
          // On the text, not the button: the control's own text colour is on
          // the button, and two colour classes on one element would leave the
          // winner to stylesheet order.
          className={cn("truncate", !selected && "text-text-secondary")}
        >
          {selected?.label ?? placeholder}
        </span>
        <span
          aria-hidden
          className={cn(
            "select-chevron text-text-secondary shrink-0",
            open && "select-chevron-open",
          )}
        >
          <Icon name="chevronDown" />
        </span>
      </button>

      {open ? (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="select-menu absolute inset-x-0 top-full z-20 mt-2"
        >
          {options.map((option, index) => {
            const isSelected = index === selectedIndex;

            return (
              <li
                key={option.value}
                id={optionId(index)}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                // Keeps focus on the trigger: a pointer press on an option would
                // otherwise blur it before the click lands.
                onPointerDown={(event) => event.preventDefault()}
                onPointerEnter={() => setActive(index)}
                onClick={() => choose(index)}
                className={cn(
                  "select-option",
                  index === active && "select-option-active",
                  isSelected && "select-option-selected",
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected ? (
                  <span aria-hidden className="shrink-0">
                    <Icon name="check" />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
