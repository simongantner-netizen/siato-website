import { ContainerScroll } from "./ui/container-scroll-animation";
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
  Plus,
  ThumbsUp,
} from "lucide-react";
import { SiatoMark } from "./SiatoLogo";

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

const ideaColumns = [
  {
    title: "Neu",
    count: 4,
    cards: [
      { title: "Rüstzeit Presse 3 halbieren", tag: "Produktion", votes: 12, initials: "MK" },
      { title: "Digitale Checkliste Wareneingang", tag: "Logistik", votes: 8, initials: "SB" },
    ],
  },
  {
    title: "In Prüfung",
    count: 3,
    cards: [
      { title: "Energiemonitoring Halle 1", tag: "Nachhaltigkeit", votes: 17, initials: "RT" },
      { title: "5S-Standard für Werkbänke", tag: "Ordnung", votes: 9, initials: "LH" },
    ],
  },
  {
    title: "In Umsetzung",
    count: 5,
    cards: [
      { title: "Kanban für C-Teile einführen", tag: "Material", votes: 21, initials: "CG" },
      { title: "Einarbeitungs-Playbook Montage", tag: "HR", votes: 14, initials: "AS" },
    ],
  },
  {
    title: "Umgesetzt",
    count: 12,
    cards: [
      { title: "QR-Codes für Maschinenwartung", tag: "Instandhaltung", votes: 26, initials: "PF" },
      { title: "Shopfloor-Board Team Fräsen", tag: "Führung", votes: 19, initials: "JW" },
    ],
  },
];

function IdeenBoard() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f7f8f6] text-left select-none">
      {/* Topbar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <SiatoMark className="h-7 w-7" />
          <div>
            <p className="text-[13px] font-semibold text-slate-900">
              Ideenmanagement
            </p>
            <p className="text-[11px] text-slate-400">
              24 aktive Ideen · Werk Frauenfeld
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-[#80BA2B] px-3.5 py-1.5 text-[12px] font-semibold text-white">
          <Plus className="h-3.5 w-3.5" /> Neue Idee
        </div>
      </div>

      {/* Kanban */}
      <div className="grid flex-1 grid-cols-4 gap-3 overflow-hidden p-4">
        {ideaColumns.map((col) => (
          <div key={col.title} className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[12px] font-semibold text-slate-700">
                {col.title}
              </span>
              <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                {col.count}
              </span>
            </div>
            {col.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-slate-200 bg-white p-3"
              >
                <span className="text-[10px] font-medium text-[#4e7717]">
                  {card.tag}
                </span>
                <p className="mt-1 text-[12px] font-medium leading-snug text-slate-800">
                  {card.title}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <ThumbsUp className="h-3 w-3" /> {card.votes}
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#80BA2B]/15 text-[9px] font-semibold text-[#4e7717]">
                    {card.initials}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiatoModules() {
  return (
    <section id="module" className="relative scroll-mt-20 pt-24">
      <div className="mx-auto max-w-[90rem] px-6">
        {/* Sektionskopf */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4e7717]">
            Module
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Alles drin, was Lean braucht.
          </h2>
          <p className="mt-4 text-base text-slate-500 md:text-lg">
            Rund 20 Module decken den ganzen Verbesserungsalltag ab – von der
            ersten Idee bis zum bestandenen Audit. Hier die ersten sechs.
          </p>
        </div>

        {/* Modul-Karten */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="group rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-900/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#80BA2B]/50 hover:shadow-lg hover:shadow-[#80BA2B]/10"
            >
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
          ))}
        </div>
      </div>

      {/* Volles Scroll-Tablet (gleiche Animation wie im Hero) */}
      <div className="relative -mt-10 flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <h3 className="mx-auto max-w-3xl text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Sehen Sie, wie Ideen ins{" "}
              <span className="bg-gradient-to-r from-[#80BA2B] to-[#4e7717] bg-clip-text text-transparent">
                Rollen
              </span>{" "}
              kommen.
            </h3>
          }
        >
          <IdeenBoard />
        </ContainerScroll>
      </div>
    </section>
  );
}
