import React from 'react';
import Blob from '@/components/Blob';
import AnimatedTitle from "@/components/AnimatedTitle";

export default function Hero() {
    return (
        <div className="flex flex-col items-start justify-center h-screen text-white">
          {/* TODO - blobs aren't done yet! This is just a test. */}
          <Blob size={600} color="rgba(0, 217, 255, 0.7)" top="6%" left="1%" animationDuration="9s" />
          <Blob size={700} color="rgba(0, 255, 98, 0.7)" top="9%" left="17%" animationDuration="13s" />
          <AnimatedTitle text={"StreakyFly"} />
          {/*<h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginLeft: '8vw' }}*/}
          {/*    className="text-9xl font-bold z-10">*/}
          {/*    StreakyFly*/}
          {/*</h1>*/}
          <p style={{ fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)', marginLeft: '8vw' }}
             className="text-4xl mt-2 font-bold text-green-light z-10">
              Not a fly, but a human.
          </p>
        </div>
    );
}
