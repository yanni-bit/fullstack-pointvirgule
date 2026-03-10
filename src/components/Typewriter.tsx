"use client";

import { useState, useEffect, useRef } from "react";

const words = [
  "sites e-commerce",
  "applications web",
  "APIs robustes",
  "solutions sur mesure",
];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const idleRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = words[index];

    const tick = () => {
      if (!isDeleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (!next) {
          setIsDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    };

    const delay = isDeleting ? 35 : 75;

    timeoutRef.current = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleRef.current = requestIdleCallback(tick, { timeout: 200 });
      } else {
        tick();
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (idleRef.current && "cancelIdleCallback" in window) {
        cancelIdleCallback(idleRef.current);
      }
    };
  }, [text, isDeleting, index]);

  return (
    <>
      {text}
      <span
        className="text-[var(--blue)]"
        style={{ animation: "blink 1s step-end infinite" }}
      >
        |
      </span>
    </>
  );
}