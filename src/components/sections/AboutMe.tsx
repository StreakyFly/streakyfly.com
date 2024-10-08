import React from 'react';
import Blob from '@/components/Blob';

export default function AboutMe() {
    return (
        <section id="about-me" className="relative min-h-screen overflow-clip flex flex-col items-center pb-8 justify-center text-white">
            <Blob size="25vw" color1="rgba(0, 217, 255, 0.37)" color2="rgba(0, 160, 255, 0.4)" top="49%" left="-7%" animationId="3" animationDuration="18s" />
            <Blob size="23vw" color1="rgba(255, 0, 170, 0.37)" color2="rgba(255, 0, 234, 0.4)" top="17%" left="78%" animationId="3" animationDuration="18s" />
            <Blob size="22vw" color1="rgba(255, 246, 0, 0.37)" color2="rgba(255, 195, 0, 0.4)" top="40%" left="88%" animationId="3" animationDuration="18s" />
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
                className="text-5xl font-semibold mb-8 md:mb-14">About Me
            </h2>
            <div style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)' }}
                 className="max-w-2xl text-justify space-y-6 text-2xl leading-normal font-light px-8 md:px-0">
                <p>
                    Hey! I&apos;m Miha, a 22-year-old computer science student and software developer from Slovenia. I love transforming wild ideas into real projects, whether it&apos;s game design, machine learning, or automation—essentially anything that combines fun with tech.
                </p>
                <p>
                    I share my epic tech adventures on YouTube, where the upload schedule is a bold experiment in unpredictability. It turns out balancing grand projects with a regular posting routine is harder than debugging code during a live demo. But hang tight—each delay is a reminder of my commitment to overcomplicating things!
                </p>
            </div>
        </section>
    );
}
