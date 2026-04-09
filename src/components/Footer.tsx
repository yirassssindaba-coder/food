import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative pt-24 pb-12 px-4 overflow-hidden"
      style={{ background: '#070300' }}
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(230,51,41,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-star-twinkle"
          style={{
            width: Math.random() * 2 + 0.5 + 'px',
            height: Math.random() * 2 + 0.5 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 70 + '%',
            background: ['#F9C11A', '#F47B20', '#FDF3E3'][Math.floor(Math.random() * 3)],
            animationDelay: Math.random() * 4 + 's',
            animationDuration: (Math.random() * 2 + 2) + 's',
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="text-6xl mb-8">🌌</div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-8">
            <span
              style={{
                background: 'linear-gradient(135deg, #FDF3E3 0%, #F9C11A 40%, #F47B20 70%, #E63329 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              THE UNIVERSE
            </span>
            <br />
            <span style={{ color: 'rgba(253,243,227,0.2)', fontSize: '0.6em' }}>
              is still expanding.
            </span>
          </h2>
          <p className="text-base max-w-lg mx-auto mb-10" style={{ color: 'rgba(253,243,227,0.4)' }}>
            Culinarax adalah konsep yang terus tumbuh. Atlas makanan ini akan terus berkembang, satu batch satu waktu, sampai setiap sudut dunia kuliner terwakili.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#top"
              className="px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #E63329, #F47B20)',
                color: '#0D0500',
                boxShadow: '0 0 30px rgba(244,123,32,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(244,123,32,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(244,123,32,0.3)'; }}
            >
              Back to Top ↑
            </a>
            <a
              href="#food-worlds"
              className="px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-full border transition-all duration-300"
              style={{
                borderColor: 'rgba(253,243,227,0.2)',
                color: 'rgba(253,243,227,0.7)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(253,243,227,0.5)'; e.currentTarget.style.color = 'var(--food-cream)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(253,243,227,0.2)'; e.currentTarget.style.color = 'rgba(253,243,227,0.7)'; }}
            >
              Explore Worlds
            </a>
          </div>
        </motion.div>

        {/* Nav links */}
        <div className="border-t pt-10" style={{ borderColor: 'rgba(253,243,227,0.06)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <span
                className="text-2xl font-black tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #F9C11A, #F47B20, #E63329)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CULINARAX
              </span>
              <p className="text-xs" style={{ color: 'rgba(253,243,227,0.25)' }}>
                3D Food Universe • Concept Project
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap items-center justify-center gap-8">
              {['How it works', 'Worlds', 'Atlas', 'Featured', 'Contact'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="text-xs tracking-widest uppercase transition-all duration-300"
                  style={{ color: 'rgba(253,243,227,0.3)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(253,243,227,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,243,227,0.3)')}
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Credit */}
            <p className="text-xs text-center md:text-right" style={{ color: 'rgba(253,243,227,0.2)' }}>
              Built with Three.js & React.<br />Culinarax Food Universe © 2025
            </p>
          </div>

          {/* Bottom note */}
          <div className="mt-10 text-center">
            <p className="text-xs" style={{ color: 'rgba(253,243,227,0.1)' }}>
              This is a concept project. The universe is your kitchen. ✦
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
