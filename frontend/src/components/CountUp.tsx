"use client";

import { useEffect, useRef } from "react";

type Props = { text: string; animate: boolean; durationMs?: number };

/**
 * Counts the leading number in `text` (e.g. "760+", "5.0 ★") up from 0 when
 * scrolled into view. Server-renders the final text for SEO / no-JS.
 */
export default function CountUp({ text, animate, durationMs = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = text.match(/^(\d+(?:\.(\d+))?)(.*)$/);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !match || reduced || !animate) return;

    const value = Number(match[1]);
    const decimals = match[2]?.length ?? 0;
    const suffix = match[3];
    const render = (n: number) => (el.textContent = `${n.toFixed(decimals)}${suffix}`);
    render(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          render(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text, animate, durationMs]);

  return <span ref={ref}>{text}</span>;
}
