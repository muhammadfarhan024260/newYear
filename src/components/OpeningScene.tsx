import { useState, useEffect } from 'react';
import LetterByLetter from './LetterByLetter';
import Particle from './Particle';

interface OpeningSceneProps {
  onTransition: () => void;
}

const OpeningScene = ({ onTransition }: OpeningSceneProps) => {
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Show button after text animation completes
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setFlash(true);
    setIsExiting(true);
    
    setTimeout(() => {
      onTransition();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 bg-night-sky flex flex-col items-center justify-center transition-opacity duration-700 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Particle count={60} />
      
      {/* Flash effect */}
      {flash && (
        <div className="fixed inset-0 bg-primary/30 animate-flash pointer-events-none z-50" />
      )}
      
      {/* Opening text */}
      <div className="text-center px-6 mb-16 z-10">
        <h1 className="font-display text-2xl md:text-4xl lg:text-5xl text-foreground tracking-wide">
          <LetterByLetter
            text="A New Year Is About To Begin Shafaq"
            delay={500}
            letterDelay={80}
          />
        </h1>
      </div>
      
      {/* Click to begin button */}
      <div
        className={`transition-all duration-1000 z-10 ${
          showButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <button
          onClick={handleClick}
          disabled={!showButton}
          className="group relative px-10 py-5 font-display text-xl md:text-2xl text-foreground border border-primary/50 rounded-full overflow-hidden transition-all duration-500 hover:border-primary hover:scale-105 active:animate-boom"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />
          
          {/* Button text */}
          <span className="relative z-10 text-glow-subtle">
            ✦ Click to Begin ✦
          </span>
          
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50 font-body text-sm tracking-widest">
        2025 → 2026
      </div>
    </div>
  );
};

export default OpeningScene;
