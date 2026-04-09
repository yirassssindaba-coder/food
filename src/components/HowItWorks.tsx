import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Explore the Universe',
    description: 'Scroll through our 3D food universe and discover flavors from every continent. Each scene is a new galaxy waiting to be found.',
    icon: '🌍',
    color: '#E63329',
  },
  {
    number: '02',
    title: 'Build Your Meal',
    description: 'Mix and match ingredients from all four food groups. Create perfect combinations inspired by global cuisines.',
    icon: '👨‍🍳',
    color: '#F47B20',
  },
  {
    number: '03',
    title: 'Discover Connections',
    description: 'Uncover how ingredients from different worlds connect. Adzuki beans meet brioche, mango meets arugula.',
    icon: '🔗',
    color: '#F9C11A',
  },
  {
    number: '04',
    title: 'Save & Share',
    description: 'Bookmark your favorite discoveries and share your curated food atlas with fellow explorers around the world.',
    icon: '⭐',
    color: '#FDF3E3',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div
          className="hidden lg:block absolute top-14 left-full w-full h-px z-0"
          style={{
            background: `linear-gradient(to right, ${step.color}40, transparent)`,
            transform: 'translateX(-50%)',
          }}
        />
      )}

      <div
        className="relative p-8 rounded-2xl border h-full transition-all duration-500 group-hover:-translate-y-2"
        style={{
          background: 'rgba(253,243,227,0.02)',
          borderColor: `${step.color}20`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = `${step.color}08`;
          e.currentTarget.style.borderColor = `${step.color}40`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(253,243,227,0.02)';
          e.currentTarget.style.borderColor = `${step.color}20`;
        }}
      >
        {/* Step number */}
        <div
          className="text-7xl font-black leading-none mb-6 select-none"
          style={{
            color: `${step.color}15`,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {step.number}
        </div>

        {/* Icon */}
        <div
          className="text-4xl mb-5 w-16 h-16 flex items-center justify-center rounded-xl"
          style={{ background: `${step.color}15` }}
        >
          {step.icon}
        </div>

        <h3
          className="text-xl font-bold mb-4 leading-tight"
          style={{ color: 'var(--food-cream)' }}
        >
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,243,227,0.5)' }}>
          {step.description}
        </p>

        {/* Color accent corner */}
        <div
          className="absolute top-0 right-0 w-12 h-12 rounded-bl-2xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${step.color}20` }}
        />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section
      id="how-it-works"
      className="relative py-32 px-4"
      style={{ background: '#0D0500' }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(230,51,41,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(244,123,32,0.6)' }}>
              ✦ How It Works ✦
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6" style={{ color: 'var(--food-cream)' }}>
              YOUR
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #F47B20, #E63329)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                JOURNEY
              </span>
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: 'rgba(253,243,227,0.4)' }}>
              Empat langkah menuju atlas makanan dunia yang paling lengkap dan paling indah.
            </p>
          </motion.div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="#food-atlas"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #E63329, #F47B20)',
              color: '#0D0500',
              boxShadow: '0 0 30px rgba(244,123,32,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(244,123,32,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(244,123,32,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Explore the Atlas
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
