import { useEffect, useState } from 'react';

interface LetterByLetterProps {
  text: string;
  className?: string;
  delay?: number;
  letterDelay?: number;
  onComplete?: () => void;
}

const LetterByLetter = ({
  text,
  className = '',
  delay = 0,
  letterDelay = 80,
  onComplete,
}: LetterByLetterProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleLetters((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            onComplete?.();
            return prev;
          }
          return prev + 1;
        });
      }, letterDelay);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, letterDelay, onComplete]);

  return (
    <span className={`perspective-1000 ${className}`}>
      {text.split('').map((letter, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            index < visibleLetters
              ? 'opacity-100 transform-none'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * 30}ms`,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
};

export default LetterByLetter;
