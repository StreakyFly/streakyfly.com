import Navbar from '@/components/Navbar';
import SocialMediaIcons from "@/components/SocialMediaIcons";
import BlurOverlay from "@/components/BlurOverlay";
import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';

export default function Home() {
  return (
      <main className="relative min-h-screen bg-dark z-10">
          <BlurOverlay />
          <Navbar />
          <SocialMediaIcons />
          <Hero/>
          <AboutMe/>
          {/* Add 3D object component here */}
          <section id="contact" className="min-h-screen bg-gray-800">Contact/Call-to-action? WIP</section>
      </main>
  );
}
