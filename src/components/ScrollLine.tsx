import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Site-weiter, animierter Hintergrund in Siato-Grün.
 *
 * Oben das schöne, dichte "Wirrwarr" aus 21st.dev (verwirrte Prozesse) –
 * programmatisch skaliert (~32% kleiner) und horizontal zentriert, sitzt dank
 * weisser Fläche im Header oberhalb der Headline. Es löst sich nach unten in
 * einen weichen, abwechslungsreichen Fluss auf. Alles glatte Béziers.
 *
 * Enthüllt per Clip-Maske nach vertikaler Position → Knoten sofort sichtbar,
 * Fluss klebt beim Scrollen am Sichtfeld (kein Hinterherhinken). viewBox-Höhe
 * = Seitenhöhe → keine Verzerrung (Schleifen bleiben rund).
 */

// Original-21st-Knäuel (dichtes Wirrwarr), endet bei (953.797, 561.655).
const KNOT_RAW =
  "M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655";

/** Skaliert + verschiebt alle Koordinaten eines (nur M/C) Pfades: p → s·p + t. */
function transformPath(d: string, s: number, tx: number, ty: number) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:[eE]-?\d+)?/g) ?? [];
  const pairsFor = (c: string) =>
    c === "M" || c === "L" || c === "T" ? 1 : c === "C" ? 3 : c === "Q" || c === "S" ? 2 : 0;
  let out = "";
  let cmd = "";
  let i = 0;
  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) {
      cmd = tokens[i].toUpperCase();
      out += tokens[i] + " ";
      i++;
    }
    const n = pairsFor(cmd);
    if (n === 0) {
      i++;
      continue;
    }
    for (let pr = 0; pr < n && i + 1 < tokens.length; pr++) {
      const x = parseFloat(tokens[i++]) * s + tx;
      const y = parseFloat(tokens[i++]) * s + ty;
      out += `${x.toFixed(2)} ${y.toFixed(2)} `;
    }
  }
  return out;
}

/**
 * Kehrt einen (nur M/C, absoluten) Pfad um: gleiche Kurve, umgekehrte Richtung.
 * Bei einem kubischen Segment werden Start/Ende getauscht und die beiden
 * Kontrollpunkte vertauscht. Gebraucht, damit sich das Knäuel beim Self-Draw
 * vom Stiel-Ansatz AUS ins Wirrwarr zeichnet (statt dort zu enden) – so bleibt
 * es während der ganzen Animation mit der herausfliessenden Linie verbunden.
 */
function reversePath(d: string) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:[eE]-?\d+)?/g) ?? [];
  const pts: { x: number; y: number }[] = [];
  const ctrls: { c1: { x: number; y: number }; c2: { x: number; y: number } }[] = [];
  let cmd = "";
  let i = 0;
  const num = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) {
      cmd = tokens[i].toUpperCase();
      i++;
      continue;
    }
    if (cmd === "M") {
      pts.push({ x: num(), y: num() });
    } else if (cmd === "C") {
      const c1 = { x: num(), y: num() };
      const c2 = { x: num(), y: num() };
      ctrls.push({ c1, c2 });
      pts.push({ x: num(), y: num() });
    } else {
      i++;
    }
  }
  const n = pts.length - 1;
  let out = `M ${pts[n].x} ${pts[n].y} `;
  for (let k = n; k >= 1; k--) {
    const { c1, c2 } = ctrls[k - 1];
    out += `C ${c2.x} ${c2.y} ${c1.x} ${c1.y} ${pts[k - 1].x} ${pts[k - 1].y} `;
  }
  return out;
}

// Knäuel ~32% kleiner (s=0.68) und zentriert (bbox-Center 882.8,278 → 639,300).
const KNOT = transformPath(KNOT_RAW, 0.68, 38.68, 110.93);
// Umgekehrte Variante nur für die Zeichen-Animation: startet am Stiel-Ansatz
// (687.26, 492.86) und zeichnet von dort ins Wirrwarr → durchgehend verbunden.
const KNOT_DRAW = reversePath(KNOT);

// Übergang Knäuel → Fluss, eckenfrei.
// Das Knäuel endet bei ~(687.26, 492.86) und verlässt es exakt senkrecht nach
// unten. Statt eines engen Seitwärts-Knicks (alte Ecke) folgt ein EINZIGER
// weicher Bogen direkt zum ersten echten Fluss-Knoten A1 = (936.04, 1140.66):
//  - erster Kontrollpunkt liegt senkrecht unter dem Knäuel-Ende (gleiches x)
//    → Linie kommt senkrecht aus dem Wirrwarr (wie vom Nutzer eingezeichnet),
//  - zweiter Kontrollpunkt liegt auf der Eintritts-Tangente des Flusses
//    (Richtung −190.27, 144.66) → C1-stetig, kein Knick beim Einmünden.
// Dadurch entfällt der frühere Zwischenpunkt A0 (954,562) samt Rechts-Ausbuchtung.
const TRANSITION = "C 687.26 835 1006.4 1087.2 936.039 1140.66";

// Fluss ab dem zweiten Knoten (der erste Knoten A1 wird vom TRANSITION-Bogen
// geliefert). Variierte, weiche Schwünge bis ans Seitenende (vom Nutzer abgenommen).
const FLOW =
  "C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89C450 3050 470 3200 520 3470C560 3860 250 3930 240 4300C232 4640 500 4720 540 5060C580 5360 1010 5340 1010 5700C1010 5980 900 6080 770 6055C655 6033 630 5895 716 5852C802 5810 866 5915 800 6070C716 6280 520 6320 520 6700C520 7060 700 7180 700 7520C700 7900 470 7950 510 8340C540 8640 620 8800 630 9050";

// Der „Rest" (Übergang + Fluss) als eigener Pfad, der am Knäuel-Ende
// (687.26, 492.86) ansetzt. So kann das Knäuel separat per Load-Animation
// gezeichnet werden, während Stiel + Fluss unverändert am Scroll-Reveal hängen.
const REST = `M 687.26 492.86 ${TRANSITION} ${FLOW}`;

export function ScrollLine() {
  const { scrollY } = useScroll();
  const [vbH, setVbH] = useState(8297);
  const [vw, setVw] = useState(1278);
  const leadRef = useRef(760);

  useEffect(() => {
    const measure = () => {
      setVbH(document.documentElement.scrollHeight);
      setVw(document.documentElement.clientWidth);
      leadRef.current = window.innerHeight * 0.92;
    };
    measure();
    window.addEventListener("resize", measure);
    const t1 = window.setTimeout(measure, 400);
    const t2 = window.setTimeout(measure, 1200);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const revealH = useTransform(scrollY, (y) =>
    Math.max(0, Math.min(vbH, y + leadRef.current)),
  );

  // Das Knäuel ist eine erkennbare Form und soll auf allen Breiten gleich
  // (rund, unverzerrt) aussehen. Der SVG-Hintergrund streckt x mit der
  // Fensterbreite (preserveAspectRatio="none", Referenz 1278px) – fürs Knäuel
  // machen wir das rückgängig: Gegen-Skalierung in x um den Stiel-Ansatz
  // (687.26), damit die Verbindung zur herausfliessenden Linie erhalten bleibt.
  // Auf schmalen Screens (<1278px) lassen wir es mitskalieren (kein Überlauf).
  const knotScaleX = Math.min(1, 1278 / vw);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox={`0 0 1278 ${vbH}`}
        preserveAspectRatio="none"
        fill="none"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <clipPath id="sl-reveal">
            <motion.rect x={-1600} y={0} width={4000} height={revealH} />
          </clipPath>
        </defs>

        {/* Stiel + Fluss: unverändert per Scroll-Reveal enthüllt. */}
        <path
          d={REST}
          clipPath="url(#sl-reveal)"
          stroke="#80BA2B"
          strokeWidth={13}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wirrwarr: zeichnet sich beim Laden der Seite einmalig selbst nach –
            wie von Hand mit einem Stift. Beginnt am Stiel-Ansatz (KNOT_DRAW ist
            umgekehrt) und wandert ins Wirrwarr → bleibt durchgehend verbunden.
            Ruhig in ~3.4s, gleichmässiges Tempo. Die Gegen-Skalierung in x hält
            das Knäuel auf jeder Breite rund/unverzerrt. */}
        <g
          transform={`translate(687.26 0) scale(${knotScaleX} 1) translate(-687.26 0)`}
        >
          <motion.path
            d={KNOT_DRAW}
            stroke="#80BA2B"
            strokeWidth={13}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.4, ease: [0.45, 0, 0.55, 1], delay: 0.2 }}
          />
        </g>
      </svg>
    </div>
  );
}
