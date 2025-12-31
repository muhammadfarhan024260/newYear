import * as React from 'react';

type RotatingGalleryProps = {
  images: string[];
  intervalMs?: number;
};

const RotatingGallery = ({ images }: RotatingGalleryProps) => {
  const count = images.length;
  const radius = 280; // Distance from center
  const angleStep = 360 / count;

  // Generate dynamic keyframes based on image count
  const keyframes = React.useMemo(() => {
    let css = '@keyframes carousel-dynamic {';
    const step = 100 / count;
    const pause = step * 0.65; // Pause for 65% of the slot time
    
    for (let i = 0; i < count; i++) {
      const startP = i * step;
      const endP = startP + pause;
      const angle = -i * angleStep;
      
      css += `
        ${startP}%, ${endP}% {
          transform: translateZ(-${radius}px) rotateY(${angle}deg);
        }
      `;
    }
    
    css += `
      100% {
        transform: translateZ(-${radius}px) rotateY(-360deg);
      }
    }`;
    return css;
  }, [count, radius, angleStep]);

  return (
    <>
      <style>{keyframes}</style>
      <div className="carousel-container mx-auto mt-12">
        <div 
          className="carousel-content"
          style={{
            animation: `carousel-dynamic ${count * 3}s cubic-bezier(1, 0.015, 0.295, 1.225) infinite`,
            transform: `translateZ(-${radius}px)`
          }}
        >
          {images.map((src, index) => {
            const rotation = index * angleStep;

            return (
              <div
                key={index}
                className="carousel-item border-2 border-primary/30 bg-card glow-gold"
                style={{
                  transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
                  opacity: 0.95,
                }}
              >
                <img 
                  src={src} 
                  alt={`Memory ${index + 1}`} 
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RotatingGallery;
