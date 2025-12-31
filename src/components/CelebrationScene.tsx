import * as React from 'react';
import Particle from './Particle';
import Firework from './Firework';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import Confetti from './Confetti';

const CelebrationScene = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [fireworkTrigger, setFireworkTrigger] = React.useState<{ x: number; y: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [hasPlayed, setHasPlayed] = React.useState(false);
  const nicknames = React.useMemo(
    () => ['Shafooq', 'Kiddo', 'Queen', 'Peach', 'Panda', 'Shawty', 'Gian', 'Bhaalu', 'Pretty', 'Vampire'],
    [],
  );
  const [nameIndex, setNameIndex] = React.useState(0);
  const appreciations = React.useMemo(
    () => [
      'Being always there',
      'Always making me smile',
      'Listening to me',
      'Believing in me',
      'Cheering me up',
      'Being my safe place',
      'Sharing laughs and secrets',
      'Making ordinary days special',
      'Understanding me better than anyone',
      'Being the best part of 2025',
      'Caring for me',
    ],
    [],
  );
  const [showConfetti, setShowConfetti] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowConfetti(true), 200);
    const off = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(off);
  }, []);

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setFireworkTrigger({ x: clientX, y: clientY });
    setTimeout(() => {
      setFireworkTrigger(null);
    }, 150);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => {
      setNameIndex((i) => (i + 1) % nicknames.length);
    }, 2500);
    return () => clearInterval(id);
  }, [nicknames.length]);

  const handlePlaySurprise = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!audioRef.current) {
      const a = new Audio('/gian.mp3');
      a.preload = 'auto';
      a.volume = 0.9;
      audioRef.current = a;
    }
    const a = audioRef.current!;
    try {
      a.pause();
      a.currentTime = 0;
    } catch {}
    a.play().catch(() => {});
  }, []);

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`fixed inset-0 bg-night-sky cursor-pointer transition-opacity duration-1000 overflow-y-auto no-scrollbar ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Confetti isActive={showConfetti} />
      <Particle count={20} />
      <Firework trigger={fireworkTrigger} />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-screen max-h-screen overflow-hidden px-6">
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-2 text-glow-subtle leading-tight">
            Happy New Year
          </h1>
          <div className="font-display text-5xl md:text-7xl text-transparent bg-clip-text bg-gold-gradient">
            2026
          </div>
        </div>
        
        <p
          className={`mt-12 font-body text-lg md:text-xl text-foreground/80 text-center max-w-2xl transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          May this year bring you endless joy and new adventures
        </p>
        
        <p
          className={`mt-8 font-body text-xs text-muted-foreground/60 tracking-wide transition-all duration-1000 delay-1500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Click anywhere for magic ✦
        </p>
        <p
          className={`mt-6 font-display text-xl md:text-2xl text-gold-light text-glow-subtle text-center transition-all duration-1000 delay-[1800ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          Wishing you growth, peace, and success
        </p>
      </div>
      
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Happy New Year Dear Shafaq
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/80">
            Wishing you a year filled with joy, growth, and amazing moments. May your dreams rise higher and your efforts shine brighter.
          </p>
          <div className="mt-8">
            <button
              onClick={handlePlaySurprise}
              className={`group relative inline-flex items-center justify-center rounded-full overflow-hidden border border-primary/50 px-8 py-4 font-display text-lg text-foreground transition-all duration-500 hover:border-primary hover:scale-105`}
            >
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />
              <span className="relative z-10">Play Surprise ✦</span>
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity z-0" />
            </button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground/70">
            Also known as: <span className="font-display text-primary transition-opacity duration-500">{nicknames[nameIndex]}</span>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {nicknames.map((n) => (
              <Badge key={n} variant="outline" className="border-primary/30 text-foreground/80 hover:border-primary/60">
                {n}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-4xl">
          <h3 className="text-center font-display text-xl md:text-2xl text-foreground/90 mb-6">
            Thank you for making 2025 special
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {appreciations.map((text) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/20 px-3 py-1.5 text-sm text-foreground/80 hover:border-primary/40 transition-colors"
              >
                <Heart className="h-3 w-3 text-primary/80" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CelebrationScene;
