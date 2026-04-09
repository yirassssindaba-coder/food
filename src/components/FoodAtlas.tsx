import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { foodItems, categoryInfo } from '../data/foods';

const regions = [
  { name: 'East Asia', x: 72, y: 32, foods: ['Edamame', 'Duck', 'Shokupan', 'Appam'], color: '#E63329' },
  { name: 'South Asia', x: 62, y: 42, foods: ['Appam', 'Paper Dosa', 'Arroz Caldo', 'Couscous'], color: '#F47B20' },
  { name: 'Mediterranean', x: 48, y: 33, foods: ['Anchovy', 'Arugula', 'Asparagus', 'Lavash'], color: '#F9C11A' },
  { name: 'Middle East', x: 56, y: 38, foods: ['Barley', 'Kaak', 'Challah', 'Couscous'], color: '#5D8A3C' },
  { name: 'Europe', x: 46, y: 28, foods: ['Brioche', 'Scone', 'Bacon', 'Raspberry'], color: '#C47C30' },
  { name: 'Americas', x: 25, y: 38, foods: ['Cornmeal', 'Hash Browns', 'Huevos Rancheros', 'Banana'], color: '#F47B20' },
  { name: 'Southeast Asia', x: 74, y: 46, foods: ['Rambutan', 'Mango', 'Banana', 'Burek'], color: '#E63329' },
  { name: 'Caucasus', x: 57, y: 30, foods: ['Khachapuri', 'Lavash', 'Simit', 'Barley'], color: '#F9C11A' },
];

function CategoryCard({ catNum }: { catNum: 1 | 2 | 3 | 4 }) {
  const info = categoryInfo[catNum];
  const foods = foodItems.filter(f => f.category === catNum).slice(0, 6);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: (catNum - 1) * 0.1 }}
      viewport={{ once: true }}
      className="relative rounded-2xl p-6 border overflow-hidden cursor-default transition-all duration-400"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? `${info.color}50` : `${info.color}15`,
        background: hovered ? `${info.color}10` : 'rgba(253,243,227,0.02)',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${info.color}15 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: info.color }}>
            Group {catNum}
          </span>
          <span className="text-xs" style={{ color: 'rgba(253,243,227,0.3)' }}>
            {foodItems.filter(f => f.category === catNum).length} items
          </span>
        </div>

        <h3 className="text-2xl font-black mb-1" style={{ color: 'var(--food-cream)' }}>
          {info.name}
        </h3>
        <p className="text-xs mb-5" style={{ color: 'rgba(253,243,227,0.4)' }}>
          {info.subtitle}
        </p>

        {/* Food grid */}
        <div className="grid grid-cols-2 gap-2">
          {foods.map(food => (
            <div
              key={food.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
              style={{ background: `${info.color}08` }}
            >
              <span className="text-base">{food.emoji}</span>
              <span className="text-xs truncate" style={{ color: 'rgba(253,243,227,0.65)' }}>
                {food.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MapPin({ region, index }: { region: typeof regions[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200 }}
      viewport={{ once: true }}
      className="absolute"
      style={{ left: `${region.x}%`, top: `${region.y}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pin */}
      <div
        className="w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300"
        style={{
          borderColor: region.color,
          background: hovered ? region.color : 'transparent',
          boxShadow: hovered ? `0 0 20px ${region.color}80` : 'none',
          transform: hovered ? 'scale(1.5)' : 'scale(1)',
        }}
      />

      {/* Pulse ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${region.color}40`,
          animation: 'pulse-glow 3s ease-in-out infinite',
          transform: 'scale(2)',
        }}
      />

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-5 w-40 px-3 py-2 rounded-xl text-xs z-10"
          style={{ background: 'rgba(13,5,0,0.9)', border: `1px solid ${region.color}40`, backdropFilter: 'blur(10px)' }}
        >
          <p className="font-bold mb-1" style={{ color: region.color }}>{region.name}</p>
          {region.foods.slice(0, 2).map(f => (
            <p key={f} style={{ color: 'rgba(253,243,227,0.6)' }}>· {f}</p>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function FoodAtlas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="food-atlas"
      className="relative py-32 px-4"
      style={{ background: '#0D0500' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(249,193,26,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(249,193,26,0.6)' }}>
              ✦ Food Atlas ✦
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6" style={{ color: 'var(--food-cream)' }}>
              WORLD
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #F9C11A, #F47B20)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                LOCATIONS
              </span>
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: 'rgba(253,243,227,0.4)' }}>
              Makanan bukan hanya rasa — ia adalah geografi. Jelajahi dari mana setiap sajian berasal.
            </p>
          </motion.div>
        </div>

        {/* World map placeholder with pins */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative mb-24 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(253,243,227,0.03)',
            border: '1px solid rgba(253,243,227,0.06)',
            height: '380px',
          }}
        >
          {/* Simplified world map grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(249,193,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,193,26,0.04) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Continents as abstract blobs */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
            {/* North America */}
            <ellipse cx="22" cy="32" rx="12" ry="14" fill="rgba(244,123,32,0.08)" stroke="rgba(244,123,32,0.15)" strokeWidth="0.3" />
            {/* South America */}
            <ellipse cx="27" cy="48" rx="7" ry="10" fill="rgba(244,123,32,0.06)" stroke="rgba(244,123,32,0.1)" strokeWidth="0.3" />
            {/* Europe */}
            <ellipse cx="47" cy="27" rx="8" ry="8" fill="rgba(249,193,26,0.08)" stroke="rgba(249,193,26,0.15)" strokeWidth="0.3" />
            {/* Africa */}
            <ellipse cx="49" cy="44" rx="9" ry="12" fill="rgba(249,193,26,0.06)" stroke="rgba(249,193,26,0.1)" strokeWidth="0.3" />
            {/* Asia */}
            <ellipse cx="67" cy="32" rx="18" ry="13" fill="rgba(230,51,41,0.07)" stroke="rgba(230,51,41,0.12)" strokeWidth="0.3" />
            {/* Australia */}
            <ellipse cx="78" cy="52" rx="6" ry="5" fill="rgba(230,51,41,0.05)" stroke="rgba(230,51,41,0.1)" strokeWidth="0.3" />
          </svg>

          {/* Map pins */}
          {regions.map((region, i) => (
            <MapPin key={region.name} region={region} index={i} />
          ))}

          {/* Atlas label */}
          <div className="absolute top-4 left-6">
            <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(253,243,227,0.2)' }}>
              Food Origins Atlas • Interactive
            </p>
          </div>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {([1, 2, 3, 4] as const).map(cat => (
            <CategoryCard key={cat} catNum={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
