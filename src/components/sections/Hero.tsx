import React from 'react';
import Blob from '@/components/Blob';
import AnimatedTitle from "@/components/AnimatedTitle";

export default function Hero() {
    return (
        <section id="hero" className="relative flex flex-col items-start justify-center h-screen text-white">
          {/* TODO: Blob position should be relative to the title, not the view width/height! */}
          <Blob size="24vw" color1="rgba(0, 217, 255, 0.37)" color2="rgba(0, 160, 255, 0.4)" top="20vh" left="3vw" animationId="1" animationDuration="18s" />
          <Blob size="26vw" color1="rgba(0, 255, 98, 0.37)" color2="rgba(0, 255, 62, 0.4)" top="21.5vh" left="22vw" animationId="2" animationDuration="18s" />
          <AnimatedTitle text={"StreakyFly"} />
          {/*<h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginLeft: '8vw' }}*/}
          {/*    className="text-9xl font-bold z-10">*/}
          {/*    StreakyFly*/}
          {/*</h1>*/}
          <p style={{ fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)', marginLeft: '8vw' }} className="text-4xl mt-2 font-bold text-green-light">
              Not a fly, but a human.
          </p>
        </section>
    );
}
