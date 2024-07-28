import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import SocialMediaIcons from "@/components/SocialMediaIcons";

export default function Home() {
  return (
      <main className="relative min-h-screen bg-dark">
          <Navbar />
          <Hero/>
          <SocialMediaIcons />
          {/* Add #D object and gradient blob components here */}
          <section id="about-me" className="min-h-screen bg-gray-900">About me</section>
          <section id="contact" className="min-h-screen bg-gray-800">Contact</section>
      </main>
  );
}
