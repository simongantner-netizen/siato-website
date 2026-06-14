import { Reveal } from "./ui/reveal";
import {
  Mountain,
  Hexagon,
  Triangle,
  Box,
  Circle,
  Gem,
  Factory,
  Compass,
} from "lucide-react";

const stats = [
  { value: "15+", label: "Jahre im Einsatz" },
  { value: "80+", label: "Schweizer KMU" },
  { value: "20", label: "Module" },
  { value: "99.9%", label: "Verfügbarkeit" },
];

// Mock-Wortmarken fiktiver Schweizer Firmen (Platzhalter, keine echten Marken)
const logos = [
  { name: "Alpina Tech", icon: Mountain },
  { name: "Helvetia Werk", icon: Hexagon },
  { name: "Jura Präzision", icon: Triangle },
  { name: "Rhein Industrie", icon: Box },
  { name: "Säntis Group", icon: Circle },
  { name: "Bernina Mfg", icon: Gem },
  { name: "Lemano AG", icon: Factory },
  { name: "Matterhorn Sys", icon: Compass },
];

export function SiatoCustomers() {
  return (
    <section className="relative scroll-mt-20 py-20">
      <div className="mx-auto max-w-[90rem] px-6">
        <Reveal className="text-center">
          <p className="text-sm font-medium text-slate-500">
            Schweizer KMU aus Industrie, Produktion und Dienstleistung steuern
            ihre Verbesserung mit Siato
          </p>
        </Reveal>

        {/* Logo-Wand */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center gap-2.5 text-slate-400 grayscale transition-all hover:text-slate-700 hover:grayscale-0"
              >
                <logo.icon className="h-6 w-6" strokeWidth={1.5} />
                <span className="text-lg font-semibold tracking-tight">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Stats-Band */}
        <Reveal delay={0.15}>
          <div className="mt-16 grid grid-cols-2 divide-slate-200/70 rounded-3xl border border-slate-200/70 bg-white/80 py-8 shadow-sm backdrop-blur-md sm:grid-cols-4 sm:divide-x">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 text-center">
                <div className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
