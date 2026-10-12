"use client";

// The motion kit behind the home page's drawn widgets.
//
// Every widget runs off one `useTick` clock that only counts while the widget is on screen, and
// what it shows is a pure function of that tick, so a loop plays the same way on every load (no
// Math.random, no Date). Entrances use one easing, SETTLE: a fast start that settles long.
//
// REDUCED MOTION: `useTick` returns null (read as "finished") and `useDrawn` is true at once, so a
// visitor who asks for less motion gets every widget in its end state. The `.fw` class on a widget
// root also switches every transition and keyframe inside it off (globals.css), and <Reveal/>'s
// hidden state only applies under `prefers-reduced-motion: no-preference` with scripting on, so
// nothing is ever left invisible.

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";

/** The one easing every entrance uses. */
export const SETTLE = "cubic-bezier(0.16, 1, 0.3, 1)";

const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribeReduced(on: () => void) {
  const q = window.matchMedia(REDUCE);
  q.addEventListener("change", on);
  return () => q.removeEventListener("change", on);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
}

/** `inView` follows the element on and off screen; `seen` latches the first sighting. */
export function useInView<T extends Element>(threshold = 0.2): { ref: RefObject<T | null>; inView: boolean; seen: boolean } {
  const ref = useRef<T>(null);
  const [state, setState] = useState({ inView: false, seen: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setState((s) => ({ inView: e.isIntersecting, seen: s.seen || e.isIntersecting })),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, ...state };
}

/** A widget's clock and draw state in one: `t` counts every `ms` while on screen (null under
 *  reduced motion), `drawn` latches true on first sight (true at once under reduced motion). */
export function useWidget<T extends Element>(ms: number) {
  const { ref, inView, seen } = useInView<T>();
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setT((v) => v + 1), ms);
    return () => window.clearInterval(id);
  }, [ms, inView, reduced]);
  return { ref, t: reduced ? null : t, drawn: seen || reduced };
}

/** Brings its content in the first time it scrolls into view: it rises 32px, sharpens from a
 *  slight blur and settles from 98% scale. `delay` staggers siblings. The hidden state lives in
 *  CSS (globals.css, `[data-reveal]`) so no-JS and reduced-motion visitors always see content. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const { ref, seen } = useInView<HTMLElement>(0.12);
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement & HTMLLIElement>}
      data-reveal={seen ? "shown" : "pending"}
      style={{ transitionDelay: seen ? `${delay}ms` : "0ms" }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Stagger helper: each part lands `step` ms after the one before, once `drawn`. */
export function land(drawn: boolean, i: number, step = 110, base = 150) {
  const d = base + i * step;
  return {
    style: { transition: `opacity 600ms ease ${d}ms, transform 900ms ${SETTLE} ${d}ms` },
    className: drawn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
  };
}
