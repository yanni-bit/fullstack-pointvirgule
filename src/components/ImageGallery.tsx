"use client";

import { useState, useEffect, useCallback } from "react";

interface ImageGalleryProps {
  images: string[];
  projectTitle: string;
  accentColor?: string;
}

export default function ImageGallery({
  images,
  projectTitle,
  accentColor = "#2196F3",
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = (i: number) => setActiveIndex(i);
  const closeModal = () => setActiveIndex(null);

  const prev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length]);

  const next = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  }, [activeIndex, images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, prev, next]);

  // Bloquer le scroll body quand modal ouvert
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div style={{ marginTop: 40 }}>
        <h2
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Galerie
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openModal(i)}
              style={{
                all: "unset",
                cursor: "zoom-in",
                display: "block",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid var(--border)",
                position: "relative",
                aspectRatio: "16/10",
                background: "var(--surface)",
                transition:
                  "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "scale(1.03)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 8px 32px ${accentColor}30`;
                (e.currentTarget as HTMLElement).style.borderColor =
                  `${accentColor}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
              }}
              aria-label={`Voir ${projectTitle} image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${projectTitle} ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
              {/* Overlay hover */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `${accentColor}18`,
                  opacity: 0,
                  transition: "opacity 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="thumb-overlay"
              >
                <span style={{ fontSize: 24 }}>🔍</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeIndex !== null && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.18s ease",
          }}
        >
          {/* Conteneur image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "88vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={images[activeIndex]}
              alt={`${projectTitle} ${activeIndex + 1}`}
              style={{
                maxWidth: "90vw",
                maxHeight: "82vh",
                objectFit: "contain",
                borderRadius: 14,
                display: "block",
                boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
                animation: "zoomIn 0.18s ease",
              }}
            />

            {/* Compteur */}
            <div
              style={{
                position: "absolute",
                bottom: -36,
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              {activeIndex + 1} / {images.length}
            </div>
          </div>

          {/* Bouton fermer */}
          <button
            onClick={closeModal}
            style={{
              all: "unset",
              cursor: "pointer",
              position: "fixed",
              top: 20,
              right: 24,
              color: "rgba(255,255,255,0.7)",
              fontSize: 28,
              lineHeight: 1,
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.16)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.7)";
            }}
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Navigation — uniquement si > 1 image */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  position: "fixed",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 22,
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    `${accentColor}40`;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    accentColor;
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.8)";
                }}
                aria-label="Image précédente"
              >
                ←
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  position: "fixed",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 22,
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    `${accentColor}40`;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    accentColor;
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.8)";
                }}
                aria-label="Image suivante"
              >
                →
              </button>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
