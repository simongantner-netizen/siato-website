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
    const MAX = 1.7; // Obergrenze beim Scrollen — höher (>~1.8) überlastet den Decoder beim Scrollen → Lag
    const SENS = 16; // Empfindlichkeit: Scrollen treibt zügig Richtung MAX
    const SPEED_DECAY = 0.9; // Scroll-Signal klingt pro Frame sanft ab (kein Schnappen)

    let speed = 0; // abklingendes Scroll-Tempo-Signal
    let currentRate = IDLE;
    let lastY = window.scrollY;
    let lastT = performance.now();
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
      speed = Math.max(speed, dy / dt); // Spitzentempo; klingt im tick ab
    };

    const tick = () => {
      // Scroll-Signal klingt sanft ab → nach dem Scrollen kein Überschiessen/Schnappen (der Ruckler)
      speed *= SPEED_DECAY;
      if (speed < 0.002) speed = 0;
      const target = Math.min(MAX, IDLE + speed * SENS);
      // schnell hoch beim Scrollen, sanft zurück auf Slow-Mo
      const k = target > currentRate ? 0.2 : 0.1;
      currentRate += (target - currentRate) * k;
      // auf 0.02 gerundet und nur bei Änderung setzen
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
