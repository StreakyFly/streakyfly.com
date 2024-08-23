import Navbar from '@/components/Navbar';
import SocialMediaIcons from "@/components/SocialMediaIcons";
import BlurOverlay from "@/components/BlurOverlay";
import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';
import CallToAction from '@/components/sections/CallToAction';

export default function Home() {
  return (
      <main className="relative min-h-screen bg-dark z-10">
          <BlurOverlay />
          <Navbar />
          <SocialMediaIcons />
          {/* Add 3D object component here */}
          <Hero/>
          <AboutMe/>
          <CallToAction/>
      </main>
  );
}
