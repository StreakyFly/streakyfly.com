import { useEffect } from 'react';

/**
Inspired by: https://www.youtube.com/watch?v=W5oawMJaXbU
 */

const getRandomLetter = (isUppercase: boolean) => {
  const alphabet = isUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const getRandomCharacter = () => {
    // More cool characters: https://jrgraphix.net/r/Unicode/2600-26FF
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}<>?";
    // const characters = "⛆"  // if you're gonna use a single character, optimize the code
    return characters[Math.floor(Math.random() * characters.length)];
}

export default function useHackerTextEffect(selector: string) {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>(selector);

        elements.forEach(element => {
            element.dataset.value = element.innerText;

            element.onmouseover = (event: MouseEvent) => {
                const target = event.target as HTMLElement;
                let iteration = 0;
                const maxIterations = 3;

                const applyTextEffect = () => {
                    if (iteration < maxIterations) {
                        // target.innerText = getRandomLetter(target.dataset.value! === target.dataset.value!.toUpperCase());
                        target.innerText = getRandomCharacter();
                    } else {
                        target.innerText = target.dataset.value!;
                    }
                    iteration++;
                };

                applyTextEffect();
                const intervalId = setInterval(() => {
                    applyTextEffect();
                    if (iteration > maxIterations) {
                        clearInterval(intervalId);
                    }
                }, 120);
            };
        });
    }, [selector]);
}
