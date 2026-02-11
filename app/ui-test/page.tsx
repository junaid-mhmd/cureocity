import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import StayingHealthySection from "../components/StayingHealthySection";
import CategoriesSection from "../components/CategoriesSection";

export default function UiTest() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <StayingHealthySection />
        <CategoriesSection />
      </main>
    </div>
  );
}
