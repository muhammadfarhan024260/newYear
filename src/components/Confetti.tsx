import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
}

interface ConfettiProps {
  isActive: boolean;
}

const colors = [
  'hsl(45 100% 50%)',   // Gold
  'hsl(280 80% 60%)',   // Purple
  'hsl(220 100% 60%)',  // Blue
  'hsl(45 100% 70%)',   // Light gold
  'hsl(320 80% 60%)',   // Pink
  'hsl(180 60% 50%)',   // Teal
];

const Confetti = ({ isActive }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 100; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 5,
          rotation: Math.random() * 360,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 3,
        });
      }
      setPieces(newPieces);

      // Clean up confetti after animation
      const timeout = setTimeout(() => {
        setPieces([]);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  if (!isActive && pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
