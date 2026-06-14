import { useEffect, useRef } from "react";

/**
 * Vollflächiger, fixierter Wasser-Hintergrund auf Weiss.
 *
 * Die Quelle ist auf 60 fps interpoliert und läuft kontinuierlich (kein
 * Scrubben → kein eingefrorener Frame; kein Crossfade → kein Ghosting; der
 * Clip loopt sauber von sich aus):
 * - Ruhezustand: ganz langsame, flüssige Slow-Motion (playbackRate = IDLE).
 * - Scrollen: die Wiedergabe zieht sanft an (∝ Scroll-Tempo) und easet zurück.
 *
 * MAX ist bewusst niedrig: visible-rate × 60 fps = Frames/s, die der Decoder
 * liefern muss. Zu hoch → Stocken beim Scrollen.
 */
export function WaterBackground({
  src = `${import.meta.env.BASE_URL}media/water-scrub.mp4`,
  poster = `${import.meta.env.BASE_URL}media/water-poster.jpg`,
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Bei „Bewegung reduzieren": Poster bleibt stehen, keine Wiedergabe.
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const IDLE = 0.6; // langsame, aber flüssige Slow-Motion im Ruhezustand
    const MAX = 1.7; // Obergrenze (decoder-schonend; höher → Stocken)
    const SENS = 18; // Empfindlichkeit: erreicht den Cap zügig beim Scrollen
    const DECAY_MS = 160; // nach dieser Stille zurück auf Slow-Mo

    let targetRate = IDLE;
    let currentRate = IDLE;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let lastScrollAt = -Infinity;
    let appliedRate = -1;
    let raf = 0;

    const ensurePlay = () => {
      if (video.paused) {
        const p = video.play();
        if (p && typeof p.then === "function") p.catch(() => {});
      }
    };

    const onScroll = () => {
      ensurePlay();
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(16, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      lastScrollAt = now;
      targetRate = Math.min(MAX, IDLE + (dy / dt) * SENS);
    };

    const tick = () => {
      const now = performance.now();
      if (now - lastScrollAt > DECAY_MS) targetRate = IDLE;
      // schnell hochziehen beim Scrollen, sanft zurück auf Slow-Mo
      const k = targetRate > currentRate ? 0.18 : 0.05;
      currentRate += (targetRate - currentRate) * k;
      // auf 0.02 gerundet und nur bei Änderung setzen → kein Decoder-Stottern
      const r = Math.max(0.1, Math.round(currentRate * 50) / 50);
      if (r !== appliedRate) {
        try {
          video.playbackRate = r;
          appliedRate = r;
        } catch {
          /* noch nicht setzbar */
        }
      }
      raf = requestAnimationFrame(tick);
    };

    video.muted = true;
    video.loop = true;
    video.playbackRate = IDLE;
    ensurePlay();

    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", ensurePlay, { passive: true });
    window.addEventListener("touchstart", ensurePlay, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", ensurePlay);
      window.removeEventListener("touchstart", ensurePlay);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      />
      {/* Dezenter Veil: hält den Hintergrund clean und den Text lesbar */}
      <div className="pointer-events-none absolute inset-0 bg-white/30" />
    </div>
  );
}
