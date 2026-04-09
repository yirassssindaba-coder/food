import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const navLinks = [
  { label: 'Worlds', href: '#food-worlds' },
  { label: 'The Book', href: '#book' },
  { label: 'Atlas', href: '#food-atlas' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ soundEnabled, onToggleSound }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-30 px-6 md:px-12"
      style={{
        height: '64px',
        background: scrolled ? 'rgba(13,5,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(253,243,227,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 2).map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase transition-all duration-300"
              style={{ color: 'rgba(253,243,227,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--food-cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,243,227,0.5)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Center logo */}
        <a
          href="#top"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #F9C11A, #F47B20, #E63329)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          PLANETONO
        </a>

        {/* Right nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(2).map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase transition-all duration-300"
              style={{ color: 'rgba(253,243,227,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--food-cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,243,227,0.5)')}
            >
              {link.label}
            </a>
          ))}
          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className="flex items-center gap-1.5 text-xs tracking-widest uppercase transition-all duration-300"
            style={{ color: soundEnabled ? 'var(--food-yellow)' : 'rgba(253,243,227,0.35)' }}
          >
            {soundEnabled ? '🔊' : '🔇'}
            <span>{soundEnabled ? 'Sound' : 'Muted'}</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: 'var(--food-cream)' }}
        >
          <span className="w-6 h-0.5 block transition-all" style={{ background: menuOpen ? 'var(--food-red)' : 'var(--food-cream)' }} />
          <span className="w-4 h-0.5 block" style={{ background: menuOpen ? 'var(--food-red)' : 'var(--food-cream)' }} />
          <span className="w-6 h-0.5 block" style={{ background: menuOpen ? 'var(--food-red)' : 'var(--food-cream)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute left-0 right-0 top-16 px-6 py-6 flex flex-col gap-5"
          style={{ background: 'rgba(13,5,0,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(253,243,227,0.06)' }}
        >
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase"
              style={{ color: 'rgba(253,243,227,0.7)' }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { onToggleSound(); setMenuOpen(false); }}
            className="text-sm tracking-widest uppercase text-left"
            style={{ color: soundEnabled ? 'var(--food-yellow)' : 'rgba(253,243,227,0.4)' }}
          >
            {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
