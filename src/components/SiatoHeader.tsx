import { LayoutGroup, motion } from "framer-motion";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { TextRotate } from "./ui/text-rotate";
import { SiatoDashboard } from "./SiatoDashboard";
import { SiatoLogo } from "./SiatoLogo";
import { ArrowRight } from "lucide-react";

export function SiatoHeader() {
  return (
    <header className="relative">
      {/* Navigation – hell/frosted über dem Wasser */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-4">
          <SiatoLogo />

          <div className="hidden items-center gap-8 text-[15px] text-slate-600 md:flex">
            <a href="#module" className="transition-colors hover:text-slate-900">
              Module
            </a>
            <a href="#warum" className="transition-colors hover:text-slate-900">
              Warum Siato
            </a>
            <a href="#preise" className="transition-colors hover:text-slate-900">
              Preise
            </a>
            <a href="#kontakt" className="transition-colors hover:text-slate-900">
              Kontakt
            </a>
          </div>

          <a
            href="#kontakt"
            className="group flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#80BA2B]"
          >
            Demo buchen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </nav>

      {/* Hero mit Scroll-Tablet */}
      <div className="relative flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-7xl md:leading-[1.05]">
                Bringen Sie Ihr Unternehmen{" "}
                <span className="bg-gradient-to-r from-[#80BA2B] to-[#4e7717] bg-clip-text text-transparent">
                  in Fluss
                </span>
                .
              </h1>
              <LayoutGroup>
                <motion.div layout className="mt-7 flex justify-center">
                  <TextRotate
                    texts={[
                      "In der Schweiz entwickelt.",
                      "In der Schweiz gehostet.",
                      "Schon ab 15.– pro Nutzer.",
                      "Speziell für Schweizer KMU.",
                    ]}
                    mainClassName="overflow-hidden justify-center rounded-full bg-[#80BA2B] px-6 py-2.5 text-lg font-semibold text-white shadow-lg shadow-[#80BA2B]/25 md:px-8 md:py-3 md:text-2xl"
                    staggerFrom="first"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    staggerDuration={0.02}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </motion.div>
              </LayoutGroup>
              <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 md:text-lg">
                Lean heisst Fluss – Prozesse, die laufen statt stocken. Mit Siato
                kommen Ideen, Verbesserungen und Qualität in Bewegung und bleiben
                es: weniger Stillstand, weniger Fehler, ein Team, das jeden Tag
                im Fluss arbeitet.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#kontakt"
                  className="rounded-full bg-[#80BA2B] px-7 py-3 text-[15px] font-semibold text-white shadow-lg shadow-[#80BA2B]/25 transition-colors hover:bg-[#6da524]"
                >
                  Demo buchen
                </a>
                <a
                  href="#module"
                  className="rounded-full border border-slate-300 bg-white/70 px-7 py-3 text-[15px] font-semibold text-slate-700 backdrop-blur-sm transition-colors hover:border-slate-400 hover:bg-white"
                >
                  Module entdecken
                </a>
              </div>
              <p className="mt-8 text-sm text-slate-500">
                80+ Kunden vertrauen darauf · 20 Module · Microsoft 365
                integriert
              </p>
            </>
          }
        >
          <SiatoDashboard />
        </ContainerScroll>
      </div>
    </header>
  );
}
