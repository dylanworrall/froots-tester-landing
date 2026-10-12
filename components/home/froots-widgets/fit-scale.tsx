"use client";

// Draws its children at a fixed design size and scales them to the width of the box they sit in,
// so a blog cover looks the same on a narrow grid card as on a wide one. `guess` is the scale used
// before the first measure (and on the server), close to the usual card width to avoid a jump.

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export function FitScale({ width, height, guess, children }: { width: number; height: number; guess: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(guess);
  useLayoutEffect(() => {
    const box = ref.current?.parentElement;
    if (!box) return;
    const measure = () => setScale(box.clientWidth / width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
      {children}
    </div>
  );
}
