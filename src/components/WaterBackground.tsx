import { useEffect, useRef } from "react";

/**
 * Vollflächiger, fixierter Wasser-Hintergrund auf Weiss.
 * Das Video ist scroll-gescrubbt: es bewegt sich NICHT von allein, sondern
 * fliesst nur, wenn man scrollt. Vor dem ersten Scroll bleibt es komplett
 * stehen (kein Autoplay, kein Priming). Ein heller Veil hält das Bild clean
 * und den Text lesbar. All-intra kodiert für scharfes Seeking.
 */
export function WaterBackground({
  src = `${import.meta.env.BASE_URL}media/water-scrub.mp4`,
  poster = `${import.meta.env.BASE_URL}media/water-poster.jpg`,
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const primed = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;

    const computeTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    // iOS/Safari brauchen einen kurzen play/pause, damit Seeks dekodiert werden –
    // aber erst beim ersten Scroll, damit vorher garantiert nichts läuft.
    const primeOnce = () => {
      if (primed.current) return;
      primed.current = true;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {});
      } else {
        video.pause();
      }
    };

    const onScroll = () => {
      primeOnce();
      computeTarget();
    };

    const tick = () => {
      const dur = video.duration || 0;
      if (dur && isFinite(dur)) {
        current.current += (target.current - current.current) * 0.08;
        const t = current.current * (dur - 0.05);
        if (Math.abs(video.currentTime - t) > 0.01) {
          try {
            video.currentTime = t;
          } catch {
            /* seek noch nicht möglich */
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      computeTarget();
      current.current = target.current; // beim Laden: Stand = aktuelle Scrollposition
      video.pause();
      raf = requestAnimationFrame(tick);
    };

    if (video.readyState >= 1) start();
    else video.addEventListener("loadedmetadata", start, { once: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", primeOnce, { passive: true });
    window.addEventListener("resize", computeTarget);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", primeOnce);
      window.removeEventListener("resize", computeTarget);
      video.removeEventListener("loadedmetadata", start);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      />
      {/* Dezenter Veil: hält den Hintergrund clean und den Text lesbar */}
      <div className="pointer-events-none absolute inset-0 bg-white/30" />
    </div>
  );
}
