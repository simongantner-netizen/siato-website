import { ScrollLine } from "./components/ScrollLine";
import { SiatoHeader } from "./components/SiatoHeader";
import { SiatoCustomers } from "./components/SiatoCustomers";
import { SiatoModules } from "./components/SiatoModules";
import { SiatoDevices } from "./components/SiatoDevices";
import { SiatoFeatures } from "./components/SiatoFeatures";
import { SiatoWhy } from "./components/SiatoWhy";
import { SiatoPricing } from "./components/SiatoPricing";
import { SiatoContact, SiatoFooter } from "./components/SiatoContact";
import { Reveal } from "./components/ui/reveal";

function App() {
  return (
    <main className="relative isolate bg-white font-sans antialiased">
      {/* Animierte, scroll-folgende Linie in Siato-Grün – durchgehend hinter allem */}
      <ScrollLine />

      <SiatoHeader />

        {/* Übergangs-Headline nach dem ersten animierten iPad – gleiches
            Hero-Design (als h2), enthüllt beim Hochscrollen. */}
        <section className="relative scroll-mt-20 py-20 md:py-28">
          <div className="mx-auto max-w-[90rem] px-6">
            <Reveal className="text-center">
              <h2 className="text-halo mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl md:leading-[1.08]">
                Eine Software, die Ihr Unternehmen{" "}
                <span className="text-halo-grad bg-gradient-to-r from-[#80BA2B] to-[#4e7717] bg-clip-text text-transparent [text-shadow:none]">
                  besser und schneller
                </span>{" "}
                macht.
              </h2>
            </Reveal>
          </div>
        </section>

        <SiatoCustomers />
        <SiatoModules />
        <SiatoDevices />
        <SiatoFeatures />
        <SiatoWhy />
        <SiatoPricing />
        <SiatoContact />
        <SiatoFooter />
    </main>
  );
}

export default App;
