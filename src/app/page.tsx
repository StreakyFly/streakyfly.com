import Hero from '@/components/sections/Hero';
import Navbar from '@/components/Navbar';
import SocialMediaIcons from "@/components/SocialMediaIcons";
import BlurOverlay from "@/components/BlurOverlay";

export default function Home() {
  return (
      <main className="relative min-h-screen bg-dark z-10">
          <Navbar />
          <Hero/>
          <SocialMediaIcons />
          <BlurOverlay />
          {/* Add 3D object component here */}
          <section id="about-me" className="min-h-screen bg-gray-900">About me</section>
          <section id="contact" className="min-h-screen bg-gray-800">Contact</section>
      </main>
  );
}
