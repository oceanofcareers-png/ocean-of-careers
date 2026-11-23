"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config";

type Props = { value: number; decimals?: number; suffix?: string; durationMs?: number };

/** Counts up from 0 when scrolled into view. Server-renders the final value for SEO / no-JS. */
export default function CountUp({ value, decimals = 0, suffix = "", durationMs = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduced || !siteConfig.features.statsCounterAnimation) return;

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
      render(value);
    };
  }, [value, decimals, suffix, durationMs]);

  return <span ref={ref}>{format(value)}</span>;
}
