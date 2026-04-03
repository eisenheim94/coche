"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryCarouselProps {
  images: string[];
  alt: string;
}

export function GalleryCarousel({ images, alt }: GalleryCarouselProps) {
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animFrame = useRef<number>(0);

  /* ---------- responsive: how many visible per page ---------- */
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    function calc() {
      const w = window.innerWidth;
      if (w < 640) setPerPage(1);
      else if (w < 1024) setPerPage(2);
      else setPerPage(3);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const totalPages = Math.max(1, Math.ceil(images.length / perPage));

  /* clamp page when perPage changes */
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  /* ---------- scroll to page ---------- */
  const scrollToPage = useCallback(
    (p: number) => {
      const track = trackRef.current;
      if (!track) return;
      const gap = 20; // gap-5 = 1.25rem = 20px
      const slideW =
        (track.parentElement!.clientWidth - gap * (perPage - 1)) / perPage;
      const target = p * perPage * (slideW + gap);
      track.scrollTo({ left: target, behavior: "smooth" });
    },
    [perPage]
  );

  useEffect(() => {
    scrollToPage(page);
  }, [page, scrollToPage]);

  /* ---------- snap after free scroll ---------- */
  const snapToNearest = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const gap = 20;
    const slideW =
      (track.parentElement!.clientWidth - gap * (perPage - 1)) / perPage;
    const stepW = perPage * (slideW + gap);
    const nearest = Math.round(track.scrollLeft / stepW);
    const clamped = Math.max(0, Math.min(nearest, totalPages - 1));
    setPage(clamped);
    track.scrollTo({ left: clamped * stepW, behavior: "smooth" });
  }, [perPage, totalPages]);

  /* ---------- pointer / touch drag ---------- */
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const track = trackRef.current;
      if (!track) return;
      dragging.current = true;
      startX.current = e.clientX;
      startScroll.current = track.scrollLeft;
      velocity.current = 0;
      lastX.current = e.clientX;
      lastTime.current = Date.now();
      track.setPointerCapture(e.pointerId);
      track.style.scrollBehavior = "auto";
      track.style.cursor = "grabbing";
      cancelAnimationFrame(animFrame.current);
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const track = trackRef.current;
      if (!track) return;
      const dx = e.clientX - startX.current;
      track.scrollLeft = startScroll.current - dx;

      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocity.current = (e.clientX - lastX.current) / dt;
      }
      lastX.current = e.clientX;
      lastTime.current = now;
    },
    []
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const track = trackRef.current;
      if (!track) return;
      track.releasePointerCapture(e.pointerId);
      track.style.scrollBehavior = "";
      track.style.cursor = "";

      /* momentum flick */
      const v = velocity.current;
      if (Math.abs(v) > 0.3) {
        const gap = 20;
        const slideW =
          (track.parentElement!.clientWidth - gap * (perPage - 1)) / perPage;
        const stepW = perPage * (slideW + gap);
        const currentPage = Math.round(track.scrollLeft / stepW);
        const dir = v > 0 ? -1 : 1;
        const next = Math.max(0, Math.min(currentPage + dir, totalPages - 1));
        setPage(next);
        track.style.scrollBehavior = "smooth";
        track.scrollTo({ left: next * stepW, behavior: "smooth" });
        return;
      }

      snapToNearest();
    },
    [perPage, totalPages, snapToNearest]
  );

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <div>
      {/* Track wrapper with chevrons */}
      <div className="relative group/carousel">
        {/* Left chevron — desktop only, hidden at first page */}
        {canPrev && (
          <button
            onClick={() => setPage(page - 1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex w-11 h-11 rounded-full bg-black/50 border border-white/10 items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <ChevronLeft className="w-5 h-5 text-white/80" />
          </button>
        )}

        {/* Right chevron — desktop only, hidden at last page */}
        {canNext && (
          <button
            onClick={() => setPage(page + 1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex w-11 h-11 rounded-full bg-black/50 border border-white/10 items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <ChevronRight className="w-5 h-5 text-white/80" />
          </button>
        )}

        <div className="overflow-hidden rounded-2xl">
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="flex gap-5 overflow-x-hidden touch-pan-y select-none"
            style={{ cursor: "grab", scrollBehavior: "smooth" }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] shrink-0 ${
                  perPage === 1 ? "" : "aspect-[3/4]"
                }`}
                style={{
                  width: `calc((100% - ${(perPage - 1) * 20}px) / ${perPage})`,
                }}
              >
                {perPage === 1 ? (
                  <Image
                    src={src}
                    alt={`${alt} photo ${i + 1}`}
                    width={800}
                    height={1200}
                    className="w-full h-auto pointer-events-none"
                    sizes="100vw"
                    draggable={false}
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`${alt} photo ${i + 1}`}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === page
                  ? "w-10 bg-white/80"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
