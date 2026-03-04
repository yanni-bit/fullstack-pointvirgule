"use client";

import { useState, useEffect } from "react";

const words = [
  "sites e-commerce",
  "applications web",
  "APIs robustes",
  "solutions sur mesure",
];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(word.slice(0, text.length + 1));
          if (text === word) setTimeout(() => setIsDeleting(true), 2200);
        } else {
          setText(word.slice(0, text.length - 1));
          if (!text) {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % words.length);
          }
        }
      },
      isDeleting ? 35 : 75,
    );
    return () => clearTimeout(timeout);
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
