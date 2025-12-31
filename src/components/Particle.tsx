import { useEffect, useState } from 'react';

interface ParticleProps {
  count?: number;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const Particle = ({ count = 50 }: ParticleProps) => {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const newParticles: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-star-white animate-twinkle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(45 100% 70% / 0.5)`,
          }}
        />
      ))}
    </div>
  );
};

export default Particle;
