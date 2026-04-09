import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const foodEmojis = ['🍔', '🌮', '🍕', '🥑', '🍜', '🥞', '🍣', '🫓', '🥐', '🍱'];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const emojiTimer = setInterval(() => {
      setCurrentEmoji(prev => (prev + 1) % foodEmojis.length);
    }, 200);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          clearInterval(emojiTimer);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 60);

    return () => {
      clearInterval(emojiTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'var(--food-dark)' }}
        >
          {/* Background stars */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-star-twinkle"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  background: ['#F9C11A', '#F47B20', '#FDF3E3', '#E63329'][Math.floor(Math.random() * 4)],
                  animationDelay: Math.random() * 3 + 's',
                  animationDuration: (Math.random() * 2 + 1.5) + 's',
                }}
              />
            ))}
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Orbiting emoji */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div
                className="absolute text-5xl"
                style={{
                  animation: 'orbit 3s linear infinite',
                  '--orbit-radius': '50px',
                } as React.CSSProperties}
              >
                ⭐
              </div>
              <div className="text-6xl" style={{ filter: 'drop-shadow(0 0 20px rgba(249,193,26,0.8))' }}>
                {foodEmojis[currentEmoji]}
              </div>
            </div>

            {/* Brand name */}
            <div className="text-center">
              <h1 className="text-5xl font-black tracking-tight text-gradient-fire mb-2">
                PLANETONO
              </h1>
              <p className="text-sm tracking-[0.4em] uppercase" style={{ color: 'rgba(253,243,227,0.5)' }}>
                Food Universe Loading
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(253,243,227,0.1)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #E63329, #F47B20, #F9C11A)' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <p className="text-xs font-mono" style={{ color: 'rgba(253,243,227,0.3)' }}>
              {Math.min(Math.floor(progress), 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
