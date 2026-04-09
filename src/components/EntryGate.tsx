import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryGateProps {
  onEnter: () => void;
}

export default function EntryGate({ onEnter }: EntryGateProps) {
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleStart = () => {
    setClicked(true);
    setTimeout(onEnter, 800);
  };

  const floatingFoods = [
    { emoji: '🍔', x: '15%', y: '20%', delay: 0, size: '2.5rem' },
    { emoji: '🌮', x: '80%', y: '15%', delay: 0.5, size: '2rem' },
    { emoji: '🍕', x: '10%', y: '70%', delay: 1, size: '3rem' },
    { emoji: '🥑', x: '85%', y: '65%', delay: 0.3, size: '2rem' },
    { emoji: '🍜', x: '50%', y: '10%', delay: 0.8, size: '1.8rem' },
    { emoji: '🥞', x: '25%', y: '85%', delay: 0.2, size: '2.2rem' },
    { emoji: '🍣', x: '70%', y: '80%', delay: 0.6, size: '2rem' },
    { emoji: '🫓', x: '5%', y: '45%', delay: 1.2, size: '1.5rem' },
    { emoji: '🥐', x: '90%', y: '40%', delay: 0.4, size: '1.8rem' },
    { emoji: '🍱', x: '60%', y: '5%', delay: 0.9, size: '2rem' },
    { emoji: '🥭', x: '40%', y: '90%', delay: 0.7, size: '2.2rem' },
    { emoji: '🫙', x: '75%', y: '35%', delay: 1.1, size: '1.5rem' },
  ];

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #1A0800 0%, #0D0500 100%)',
          }}
        >
          {/* Animated background grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(230,51,41,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,51,41,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating food emojis */}
          {floatingFoods.map((food, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none select-none"
              style={{ left: food.x, top: food.y, fontSize: food.size }}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [0, -20, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                delay: food.delay,
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {food.emoji}
            </motion.div>
          ))}

          {/* Stars */}
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-star-twinkle"
              style={{
                width: Math.random() * 2.5 + 0.5 + 'px',
                height: Math.random() * 2.5 + 0.5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background: ['#F9C11A', '#F47B20', '#FDF3E3'][Math.floor(Math.random() * 3)],
                animationDelay: Math.random() * 4 + 's',
                animationDuration: (Math.random() * 2 + 2) + 's',
              }}
            />
          ))}

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center gap-10 px-4 text-center">
            {/* Orbiting ring */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div
                className="absolute w-48 h-48 rounded-full border opacity-20 animate-spin-slow"
                style={{ borderColor: 'var(--food-orange)', borderWidth: '1px', borderStyle: 'dashed' }}
              />
              <div
                className="absolute w-36 h-36 rounded-full border opacity-30"
                style={{ borderColor: 'var(--food-yellow)', borderWidth: '1px' }}
              />
              <motion.div
                className="text-7xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4px' }}
              >
                <span style={{ animation: 'orbit 8s linear infinite', '--orbit-radius': '72px', display: 'inline-block' } as React.CSSProperties}>
                  ⭐
                </span>
              </motion.div>
              <div className="text-6xl" style={{ filter: 'drop-shadow(0 0 30px rgba(249,193,26,0.6))' }}>
                🌍
              </div>
            </div>

            {/* Logo */}
            <div>
              <motion.h1
                className="text-7xl md:text-8xl font-black tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                  background: 'linear-gradient(135deg, #F9C11A 0%, #F47B20 50%, #E63329 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                PLANETONO
              </motion.h1>
              <motion.p
                className="text-sm tracking-[0.5em] uppercase mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.6 }}
                style={{ color: 'var(--food-cream)' }}
              >
                3D Food Universe
              </motion.p>
            </div>

            {/* Headphone note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border text-sm"
              style={{
                borderColor: 'rgba(253,243,227,0.15)',
                background: 'rgba(253,243,227,0.04)',
                color: 'rgba(253,243,227,0.5)',
              }}
            >
              <span>🎧</span>
              <span>Best experienced with headphones</span>
            </motion.div>

            {/* Start button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              onHoverStart={() => setHovering(true)}
              onHoverEnd={() => setHovering(false)}
              onClick={handleStart}
              className="relative px-16 py-5 text-lg font-bold tracking-widest uppercase overflow-hidden group"
              style={{
                background: hovering
                  ? 'linear-gradient(135deg, #F9C11A, #F47B20, #E63329)'
                  : 'transparent',
                border: '1.5px solid',
                borderColor: hovering ? 'transparent' : 'rgba(253,243,227,0.4)',
                borderRadius: '4px',
                color: hovering ? '#0D0500' : 'var(--food-cream)',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                boxShadow: hovering ? '0 0 40px rgba(249,193,26,0.4), 0 0 80px rgba(230,51,41,0.2)' : 'none',
              }}
            >
              <motion.span
                animate={hovering ? { letterSpacing: '0.3em' } : { letterSpacing: '0.25em' }}
              >
                Start
              </motion.span>
            </motion.button>

            {/* Scroll hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.5 }}
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--food-cream)' }}
            >
              Scroll to explore
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
