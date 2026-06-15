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

      {/* Weisser Verlauf: verdeckt das Wasser hinter Nav/Headline und lässt es
          erst auf Button-Höhe hervortreten. Scrollt mit dem Header weg –
          darunter fliesst das fixe Wasser ununterbrochen weiter. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-screen bg-gradient-to-b from-white from-40% to-transparent to-50%"
      />

      {/* Hero mit Scroll-Tablet */}
      <div className="relative flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tight text-slate-900 [text-shadow:0_1px_18px_rgba(255,255,255,0.9)] md:text-6xl md:leading-[1.08]">
                Eine Software, die Ihr Unternehmen{" "}
                <span className="bg-gradient-to-r from-[#80BA2B] to-[#4e7717] bg-clip-text text-transparent [text-shadow:none]">
                  besser und schneller
                </span>{" "}
                macht.
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
              <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-slate-200/80 bg-white/90 p-6 text-base leading-relaxed text-slate-600 shadow-sm shadow-slate-900/5 backdrop-blur-sm md:text-lg">
                Mit Siato fliessen Ihre Prozesse. Der Wettbewerb ist gnadenlos –
                wer als Schweizer KMU bestehen will, muss schneller, schlanker
                und besser werden. Siato vereint Ideen, Qualität und Kennzahlen
                in einer Lösung und macht kontinuierliche Verbesserung zum
                Alltag. Die einzige Software, die Ihr Unternehmen dafür braucht.
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
              <p className="relative z-10 mt-8 mb-14 text-sm font-medium text-slate-600 [text-shadow:0_1px_8px_rgba(255,255,255,0.95)]">
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
