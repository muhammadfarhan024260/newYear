import { Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Resume context if suspended (browser policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (!isLoaded) {
      // Initialize and play audio
      const audio = new Audio('/audio.mp3');
      audio.loop = true;
      audio.volume = 0.6; 
      
      // Connect to AudioContext
      const source = audioContextRef.current.createMediaElementSource(audio);
      source.connect(audioContextRef.current.destination);
      
      audioElementRef.current = audio;
      
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoaded(true);
        })
        .catch(e => console.error("Audio play failed:", e));
        
    } else {
      // Toggle play/pause
      const audio = audioElementRef.current;
      if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play().catch(e => console.error("Audio resume failed:", e));
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110 glow-gold"
      aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  );
};

export default AudioToggle;
