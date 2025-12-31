import { useEffect, useState } from 'react';

interface Spark {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

interface FireworkBurst {
  id: number;
  x: number;
  y: number;
  sparks: Spark[];
}

interface FireworkProps {
  trigger: { x: number; y: number } | null;
  onComplete?: () => void;
}

const sparkColors = [
  'hsl(45 100% 60%)',   // Gold
  'hsl(45 100% 80%)',   // Light gold
  'hsl(280 80% 60%)',   // Purple
  'hsl(220 100% 70%)',  // Blue
  'hsl(0 0% 100%)',     // White
];

const Firework = ({ trigger, onComplete }: FireworkProps) => {
  const [bursts, setBursts] = useState<FireworkBurst[]>([]);

  useEffect(() => {
    if (trigger) {
      const sparkCount = 24;
      const newSparks: Spark[] = [];
      
      for (let i = 0; i < sparkCount; i++) {
        newSparks.push({
          id: i,
          angle: (360 / sparkCount) * i,
          distance: Math.random() * 80 + 60,
          size: Math.random() * 4 + 2,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        });
      }

      const newBurst: FireworkBurst = {
        id: Date.now(),
        x: trigger.x,
        y: trigger.y,
        sparks: newSparks,
      };

      setBursts((prev) => [...prev, newBurst]);

      // Remove burst after animation
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
        onComplete?.();
      }, 1000);
    }
  }, [trigger, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: burst.x, top: burst.y }}
        >
          {burst.sparks.map((spark) => (
            <div
              key={spark.id}
              className="absolute rounded-full"
              style={{
                width: spark.size,
                height: spark.size,
                backgroundColor: spark.color,
                boxShadow: `0 0 ${spark.size * 3}px ${spark.color}`,
                transform: `translate(-50%, -50%)`,
                animation: `firework-spark 0.8s ease-out forwards`,
                '--angle': `${spark.angle}deg`,
                '--distance': `${spark.distance}px`,
              } as React.CSSProperties}
            />
          ))}
          {/* Central glow */}
          <div
            className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full animate-explode"
            style={{
              background: 'radial-gradient(circle, hsl(45 100% 80%) 0%, transparent 70%)',
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes firework-spark {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -1));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Firework;
