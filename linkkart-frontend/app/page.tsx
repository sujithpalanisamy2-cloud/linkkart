import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import HeroSection from '@/components/landing/hero-section';
import BrandsSection from '@/components/landing/brands-section';
import PlatformSection from '@/components/landing/platform-section';
import DashboardPreview from '@/components/landing/dashboard-preview';
import FeaturesSection from '@/components/landing/features-section';
import SocialProof from '@/components/landing/social-proof';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <BrandsSection />
        <PlatformSection />
        <DashboardPreview />
        <FeaturesSection />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
