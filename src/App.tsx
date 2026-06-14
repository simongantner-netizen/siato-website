import { WaterBackground } from "./components/WaterBackground";
import { SiatoHeader } from "./components/SiatoHeader";
import { SiatoCustomers } from "./components/SiatoCustomers";
import { SiatoModules } from "./components/SiatoModules";
import { SiatoDevices } from "./components/SiatoDevices";
import { SiatoFeatures } from "./components/SiatoFeatures";
import { SiatoWhy } from "./components/SiatoWhy";
import { SiatoPricing } from "./components/SiatoPricing";
import { SiatoContact, SiatoFooter } from "./components/SiatoContact";

function App() {
  return (
    <>
      {/* Scroll-gescrubbtes, fliessendes Wasser auf Weiss – durchgehend hinter allem */}
      <WaterBackground />

      <main className="relative font-sans antialiased">
        <SiatoHeader />
        <SiatoCustomers />
        <SiatoModules />
        <SiatoDevices />
        <SiatoFeatures />
        <SiatoWhy />
        <SiatoPricing />
        <SiatoContact />
        <SiatoFooter />
      </main>
    </>
  );
}

export default App;
