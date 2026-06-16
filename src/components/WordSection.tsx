import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/**
 * Eigene, ruhige Sektion mit viel Weissraum: ein grosses Wort im grünen
 * Verlauf (wie „besser und schneller"). Beim Scrollen vier Effekte zugleich:
 *  1. Scale-Reveal — das Wort wächst beim Reinscrollen (0.82× → 1×),
 *  2. kräftiger Parallax (y) + leichte Neigung (rotate) → fliesst durch den Raum,
 *  3. Velocity-Farbfluss — die Grüntöne fliessen durch die Buchstaben, schneller
 *     je schneller man scrollt (wie der Linien-Hintergrund),
 *  4. Grösse pro Wort an die Breite angepasst → bleibt immer lesbar.
 * Bei „Bewegung reduzieren" steht alles still.
 */
export function WordSection({ word }: { word: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;

  // Position/Grösse: an die Sektions-Scrollposition gekoppelt.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["65%", "-65%"]);
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-3%", "3%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.82, 1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-2.5, 2.5]);

  // Farbfluss: an die Scroll-Geschwindigkeit gekoppelt (kontinuierlich + Schub).
  const { scrollY } = useScroll();
  const smoothVel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300, mass: 1 });
  const flow = useMotionValue(0);
  useAnimationFrame((_t, dtMs) => {
    if (reduce) return;
    const dt = Math.min(dtMs, 50) / 1000;
    const v = Math.abs(smoothVel.get());
    flow.set(flow.get() + (6 + v * 0.035) * dt); // %/s: Ruhe-Drift + Velocity-Schub
  });
  const bgPos = useMotionTemplate`${flow}%`;

  // Schriftgrösse pro Wort, damit die Breite passt (lange Wörter kleiner).
  const fontSize = `clamp(3rem, ${(162 / word.length).toFixed(1)}vw, 28rem)`;

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden py-32 md:py-56"
    >
      <motion.h2
        style={{
          y,
          x,
          scale,
          rotate,
          fontSize,
          backgroundPositionX: bgPos,
          // periodisch mit Mittelgrün an den Enden → Kachel-Naht unsichtbar
          backgroundImage:
            "linear-gradient(100deg, #80BA2B 0%, #A4D65E 25%, #80BA2B 50%, #4E7717 75%, #80BA2B 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
        className="select-none whitespace-nowrap text-center font-black leading-none tracking-tighter"
      >
        {word}
      </motion.h2>
    </section>
  );
}
