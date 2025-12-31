import { useEffect, useState } from 'react';

interface Effect {
  id: number;
  x: number;
  y: number;
  type: 'spark' | 'ripple' | 'bloom';
}

interface ClickEffectProps {
  position: { x: number; y: number } | null;
}

const ClickEffect = ({ position }: ClickEffectProps) => {
  const [effects, setEffects] = useState<Effect[]>([]);

  useEffect(() => {
    if (position) {
      const types: Effect['type'][] = ['spark', 'ripple', 'bloom'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newEffect: Effect = {
        id: Date.now(),
        x: position.x,
        y: position.y,
        type: randomType,
      };

      setEffects((prev) => [...prev, newEffect]);

      // Remove effect after animation
      setTimeout(() => {
        setEffects((prev) => prev.filter((e) => e.id !== newEffect.id));
      }, 1000);
    }
  }, [position]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {effects.map((effect) => (
        <div
          key={effect.id}
          className="absolute"
          style={{ left: effect.x, top: effect.y }}
        >
          {effect.type === 'spark' && (
            <div className="relative">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-4 bg-primary rounded-full"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                    animation: 'spark-line 0.5s ease-out forwards',
                    boxShadow: '0 0 8px hsl(45 100% 60%)',
                  }}
                />
              ))}
            </div>
          )}
          
          {effect.type === 'ripple' && (
            <>
              <div
                className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary animate-ripple"
                style={{ boxShadow: '0 0 20px hsl(45 100% 60% / 0.5)' }}
              />
              <div
                className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent animate-ripple"
                style={{ animationDelay: '0.1s', boxShadow: '0 0 20px hsl(280 80% 60% / 0.5)' }}
              />
            </>
          )}
          
          {effect.type === 'bloom' && (
            <div className="relative">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-5 origin-bottom"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${i * 60}deg)`,
                    animation: 'petal-bloom 0.6s ease-out forwards',
                    background: 'linear-gradient(180deg, hsl(45 100% 60%) 0%, transparent 100%)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  }}
                />
              ))}
              <div
                className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
                style={{ boxShadow: '0 0 10px hsl(45 100% 60%)' }}
              />
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes spark-line {
          0% {
            height: 4px;
            opacity: 1;
          }
          100% {
            height: 30px;
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateY(-20px);
          }
        }
        @keyframes petal-bloom {
          0% {
            transform: translate(-50%, -100%) rotate(var(--rotation, 0deg)) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -100%) rotate(var(--rotation, 0deg)) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ClickEffect;
