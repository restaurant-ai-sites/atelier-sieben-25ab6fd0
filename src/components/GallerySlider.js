"use client";
import { useState, useEffect, useRef } from "react";

export default function GallerySlider({ images }) {
  const [cur, setCur] = useState(0);
  const [visible, setVisible] = useState(true);
  const paused = useRef(false);
  const curRef = useRef(0);

  function goTo(i) {
    if (i === curRef.current) return;
    setVisible(false);
    setTimeout(() => { curRef.current = i; setCur(i); setVisible(true); }, 320);
  }

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) goTo((curRef.current + 1) % images.length);
    }, 4500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div
      className="relative"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="relative overflow-hidden" style={{ height: "55vh" }}>
        <img
          src={images[cur]}
          alt={`Galerie ${cur + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 320ms ease" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
        <span className="absolute top-5 right-6 text-white/70 text-sm font-mono tabular-nums select-none">
          {String(cur + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
      <div className="flex justify-center gap-2 mt-6 px-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Bild ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === cur ? "w-8 bg-terra" : "w-2 bg-coffee/25 hover:bg-coffee/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
