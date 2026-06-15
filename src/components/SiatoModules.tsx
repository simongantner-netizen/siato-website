import {
  Lightbulb,
  RefreshCcw,
  Presentation,
  BarChart3,
  ShieldCheck,
  GraduationCap,
  AlertTriangle,
  BookOpen,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "./ui/reveal";

const modules = [
  {
    icon: Lightbulb,
    title: "Ideenmanagement",
    text: "Jede Idee landet im System statt in der Schublade. Bewerten, priorisieren, umsetzen – mit klarer Verantwortung und sichtbarem Fortschritt.",
  },
  {
    icon: RefreshCcw,
    title: "PDCA-Zyklen",
    text: "Verbesserungen strukturiert durchziehen: Plan, Do, Check, Act – mit Massnahmen, Terminen und Wirkungskontrolle statt guter Vorsätze.",
  },
  {
    icon: Presentation,
    title: "Shopfloor Management",
    text: "Kennzahlen, Aufgaben und Abweichungen direkt am Board – für kurze, wirksame Meetings dort, wo die Arbeit passiert.",
  },
  {
    icon: BarChart3,
    title: "Kennzahlen & Cockpits",
    text: "Alle relevanten KPIs in Echtzeit, vom Team bis zur Geschäftsleitung. Jeder sieht auf einen Blick, wo es klemmt und wo es läuft.",
  },
  {
    icon: ShieldCheck,
    title: "Audits & Compliance",
    text: "Interne Audits, Normenprüfungen und gelenkte Dokumente an einem Ort – revisionssicher und ohne Papierkrieg.",
  },
  {
    icon: GraduationCap,
    title: "Mitarbeitenden-Entwicklung",
    text: "Fähigkeitsmatrix, Zielvereinbarungen und Weiterbildung im Griff. Damit Können sichtbar wird und Entwicklung Routine.",
  },
  {
    icon: AlertTriangle,
    title: "Qualität & Abweichungen",
    text: "Kunden- und Lieferantenbeanstandungen, interne Fehler und 8D-Reports strukturiert bearbeiten – mit Ursachenanalyse statt Bauchgefühl.",
  },
  {
    icon: BookOpen,
    title: "Wissensmanagement",
    text: "Anleitungen, Standards und Erfahrungswissen an einem Ort. Neues Wissen bleibt im Unternehmen, statt mit Personen zu gehen.",
  },
  {
    icon: Wrench,
    title: "Wartung & Instandhaltung",
    text: "Wartungspläne, Aufgaben und Historie pro Anlage. Weniger ungeplante Stillstände, längere Lebensdauer Ihrer Maschinen.",
  },
];

export function SiatoModules() {
  return (
    <section id="module" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-[90rem] px-6">
        {/* Sektionskopf */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4e7717]">
            Module
          </p>
          <h2 className="text-halo mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Alles drin, was Lean braucht.
          </h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Rund 20 Module decken den ganzen Verbesserungsalltag ab – von der
            ersten Idee bis zum bestandenen Audit. Hier die wichtigsten neun.
          </p>
        </Reveal>

        {/* Modul-Karten */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, i) => (
            <Reveal key={mod.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-900/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#80BA2B]/50 hover:shadow-lg hover:shadow-[#80BA2B]/10">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#80BA2B]/12 text-[#4e7717] transition-colors group-hover:bg-[#80BA2B] group-hover:text-white">
                    <mod.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-[#80BA2B]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                  {mod.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
                  {mod.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
