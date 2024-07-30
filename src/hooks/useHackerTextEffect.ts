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
        const isInProgressMap = new Map<HTMLElement, NodeJS.Timeout>();

        elements.forEach(element => {
            element.dataset.value = element.innerText;

            element.onmouseover = (event: MouseEvent) => {
                if (isInProgressMap.get(element)) {
                    clearInterval(isInProgressMap.get(element)!);
                }

                const target = event.target as HTMLElement;
                let iteration = 0;
                const maxIterations = 3;

                const applyTextEffect = () => {
                    if (iteration < maxIterations) {
                        // target.innerText = getRandomLetter(target.dataset.value! === target.dataset.value!.toUpperCase());
                        target.innerText = getRandomCharacter();
                        // target.style.opacity = Math.random() * 0.4 + 0.6 + '';  // 0.6 to 1
                        // target.style.color = Math.random() > 0.5 ? '#089741' : '#088893';
                        target.style.scale = '1.08';

                    } else {
                        target.innerText = target.dataset.value!;
                        // target.style.opacity = '1';
                        // target.style.color = 'white';
                        target.style.scale = '1'
                    }
                    iteration++;
                };

                applyTextEffect();
                const intervalId = setInterval(() => {
                    applyTextEffect();
                    if (iteration > maxIterations) {
                        clearInterval(intervalId);
                    }
                }, 100);
                isInProgressMap.set(element, intervalId);
            };
        });
    }, [selector]);
}
