import { Reveal } from "./ui/reveal";

const stats = [
  { value: "15+", label: "Jahre im Einsatz" },
  { value: "80+", label: "Schweizer KMU" },
  { value: "20", label: "Module" },
  { value: "99.9%", label: "Verfügbarkeit" },
];

// Echte Kunden. logo = Datei in public/logos/ (sonst Wortmarke als Fallback).
const customers: { name: string; logo: string | null }[] = [
  { name: "Monopol Colors", logo: "logos/monopol.png" },
  { name: "Peterhans Schibli", logo: "logos/peterhans.svg" },
  { name: "Maurer Lackierwerk", logo: "logos/maurer.svg" },
  { name: "Schänis", logo: "logos/schaenis.png" },
];

export function SiatoCustomers() {
  return (
    <section className="relative scroll-mt-20 py-20">
      <div className="mx-auto max-w-[90rem] px-6">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-slate-900 [text-shadow:0_1px_14px_rgba(255,255,255,0.8)] md:text-4xl">
            Kunden, die dank Siato besser und schneller arbeiten.
          </h2>
        </Reveal>

        {/* Kunden-Logos */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 items-center gap-x-10 gap-y-10 sm:grid-cols-4">
            {customers.map((c) => (
              <div key={c.name} className="flex items-center justify-center">
                {c.logo ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${c.logo}`}
                    alt={c.name}
                    className="h-9 w-auto max-w-[160px] object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10"
                  />
                ) : (
                  <span className="text-xl font-bold tracking-tight text-slate-400 transition-colors hover:text-slate-700">
                    {c.name}
                  </span>
                )}
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
