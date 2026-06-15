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
    <main className="bg-white font-sans antialiased">
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
  );
}

export default App;
