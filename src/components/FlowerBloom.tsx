import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  rotation: number;
  delay: number;
  scale: number;
}

interface Flower {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  petals: Petal[];
  delay: number;
}

interface FlowerBloomProps {
  isActive: boolean;
  count?: number;
}

const flowerColors = [
  { primary: 'hsl(45 100% 60%)', secondary: 'hsl(40 100% 50%)' },
  { primary: 'hsl(280 70% 60%)', secondary: 'hsl(280 60% 50%)' },
  { primary: 'hsl(340 80% 65%)', secondary: 'hsl(340 70% 55%)' },
  { primary: 'hsl(200 80% 60%)', secondary: 'hsl(200 70% 50%)' },
];

const FlowerBloom = ({ isActive, count = 8 }: FlowerBloomProps) => {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    if (isActive) {
      const newFlowers: Flower[] = [];
      
      for (let i = 0; i < count; i++) {
        const petalCount = Math.floor(Math.random() * 3) + 5;
        const petals: Petal[] = [];
        
        for (let j = 0; j < petalCount; j++) {
          petals.push({
            id: j,
            rotation: (360 / petalCount) * j,
            delay: j * 0.1,
            scale: Math.random() * 0.3 + 0.8,
          });
        }
        
        const colorSet = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        
        newFlowers.push({
          id: i,
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
          size: Math.random() * 40 + 30,
          color: colorSet.primary,
          petals,
          delay: Math.random() * 2,
        });
      }
      
      setFlowers(newFlowers);
    }
  }, [isActive, count]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            width: flower.size,
            height: flower.size,
            animationDelay: `${flower.delay}s`,
          }}
        >
          {/* Petals */}
          {flower.petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute left-1/2 top-1/2 origin-bottom animate-bloom"
              style={{
                width: flower.size * 0.4,
                height: flower.size * 0.6,
                transform: `translate(-50%, -100%) rotate(${petal.rotation}deg) scale(${petal.scale})`,
                animationDelay: `${flower.delay + petal.delay}s`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                background: `linear-gradient(180deg, ${flower.color} 0%, transparent 100%)`,
                opacity: 0,
              }}
            />
          ))}
          {/* Center */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-scale-in"
            style={{
              width: flower.size * 0.25,
              height: flower.size * 0.25,
              background: 'radial-gradient(circle, hsl(45 100% 70%) 0%, hsl(40 100% 50%) 100%)',
              animationDelay: `${flower.delay + 0.5}s`,
              boxShadow: '0 0 10px hsl(45 100% 60% / 0.5)',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FlowerBloom;
