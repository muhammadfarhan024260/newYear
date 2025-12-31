import * as React from 'react';

type FallingTagsProps = {
  tags: string[];
  density?: number;
  className?: string;
};

const FallingTags = ({ tags, density = 16, className }: FallingTagsProps) => {
  const [items, setItems] = React.useState<
    { id: number; label: string; left: number; duration: number; delay: number }[]
  >([]);

  React.useEffect(() => {
    const arr: { id: number; label: string; left: number; duration: number; delay: number }[] = [];
    for (let i = 0; i < density; i++) {
      arr.push({
        id: i,
        label: tags[i % tags.length], // Cycle through tags to ensure all are included
        left: Math.random() * 100,
        duration: 15 + Math.random() * 15, // Slower fall for longer distance
        delay: Math.random() * 10, // More spread out delays
      });
    }
    setItems(arr);
  }, [tags, density]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className || ''}`}>
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute tag-pill animate-tag-fall"
          style={{
            left: `${it.left}%`,
            top: '-50px', // Start slightly above
            animationDelay: `${it.delay}s`,
            '--tag-duration': `${it.duration}s`,
          } as React.CSSProperties}
        >
          {it.label}
        </span>
      ))}
    </div>
  );
};

export default FallingTags;
