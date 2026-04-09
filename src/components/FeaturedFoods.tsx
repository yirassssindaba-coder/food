import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { foodItems } from '../data/foods';

const featured = foodItems.filter(f =>
  ['burger', 'brioche', 'mango', 'appam', 'edamame', 'khachapuri', 'rambutan', 'porridge'].some(
    keyword => f.id.includes(keyword) || f.name.toLowerCase().includes(keyword)
  )
).slice(0, 8).concat(foodItems.slice(0, 8));

const displayFoods = foodItems.slice(0, 12);

function FoodCard({ food, index }: { food: typeof foodItems[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="relative group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="rounded-2xl p-6 border h-full transition-all duration-400"
        style={{
          background: hovered ? `${food.color}12` : 'rgba(253,243,227,0.02)',
          borderColor: hovered ? `${food.color}40` : 'rgba(253,243,227,0.06)',
          transform: hovered ? 'translateY(-6px)' : 'none',
          boxShadow: hovered ? `0 20px 40px ${food.color}15` : 'none',
        }}
      >
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: `${food.color}20`,
              color: food.color,
            }}
          >
            Group {food.category}
          </span>
          {food.origin && (
            <span className="text-xs" style={{ color: 'rgba(253,243,227,0.25)' }}>
              {food.origin}
            </span>
          )}
        </div>

        {/* Emoji */}
        <div
          className="text-5xl mb-4 transition-transform duration-400"
          style={{ transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)' }}
        >
          {food.emoji}
        </div>

        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--food-cream)' }}>
          {food.name}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,243,227,0.45)' }}>
          {food.description}
        </p>

        {/* Hover accent line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-400"
          style={{
            background: `linear-gradient(to right, ${food.color}, ${food.accent})`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function FeaturedFoods() {
  return (
    <section
      className="relative py-32 px-4"
      style={{ background: '#0D0500' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(196,124,48,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(196,124,48,0.6)' }}>
              ✦ The Collection ✦
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6" style={{ color: 'var(--food-cream)' }}>
              FEATURED
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #C47C30, #F9C11A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                FOODS
              </span>
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: 'rgba(253,243,227,0.4)' }}>
              Dari 400+ makanan dalam kompendium kami. Setiap item punya cerita, sejarah, dan rasa unik.
            </p>
          </motion.div>
        </div>

        {/* Food grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayFoods.map((food, index) => (
            <FoodCard key={food.id} food={food} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm" style={{ color: 'rgba(253,243,227,0.3)' }}>
            and 400+ more in the full compendium...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
