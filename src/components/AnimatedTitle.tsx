'use client';

import useHackerTextEffect from '@/hooks/useHackerTextEffect';

export default function AnimatedTitle({ text }: { text: string }) {
    useHackerTextEffect('span');

    return (
        <h1
            style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginLeft: '8vw' }}
            className="text-9xl font-bold z-10"
        >
            {text.split("").map((letter, index) => (
                <span key={index} className="inline-block" data-value={letter}>
          {letter}
        </span>
            ))}
        </h1>
    );
};
