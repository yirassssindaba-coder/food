import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  culinaraxRecipes,
  recipesByRegion,
  regions,
  type CulinaraxRecipe,
  type RegionKey,
} from '../data/culinarax';

// ── Book Cover ──────────────────────────────────────────────
function RecipeBookCover({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ perspective: '1200px' }}
      onClick={!isOpen ? onClick : undefined}
    >
      <motion.div
        animate={{ rotateY: isOpen ? -160 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
        className="relative w-72 md:w-80 h-auto"
      >
        {/* Front cover */}
        <div
          className="relative rounded-r-xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #001A00 0%, #002D00 40%, #001A00 100%)',
            border: '1px solid rgba(149,213,178,0.3)',
            boxShadow: '8px 8px 30px rgba(0,0,0,0.8), inset -3px 0 8px rgba(0,0,0,0.5)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Spine effect */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8"
            style={{ background: 'linear-gradient(to right, #000D00, #002000)', borderRight: '1px solid rgba(149,213,178,0.15)' }}
          />

          <div className="pl-12 pr-6 py-10 flex flex-col items-center text-center gap-4">
            {/* Ornamental top */}
            <div className="w-full flex items-center gap-2 mb-2">
              <div className="flex-1 h-px" style={{ background: 'rgba(149,213,178,0.3)' }} />
              <span style={{ color: 'rgba(149,213,178,0.5)', fontSize: '10px' }}>✦ ✦ ✦</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(149,213,178,0.3)' }} />
            </div>

            {/* Logo & subtitle */}
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(149,213,178,0.6)' }}>
              Culinarax
            </p>

            {/* Main title */}
            <h2
              className="text-3xl md:text-4xl font-black leading-tight"
              style={{
                background: 'linear-gradient(135deg, #95D5B2, #52B788, #1B4332)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RESEP &<br />MINUMAN<br />DUNIA
            </h2>

            {/* Globe illustration */}
            <div className="text-7xl my-4" style={{ filter: 'drop-shadow(0 4px 20px rgba(149,213,178,0.4))' }}>
              🗺️
            </div>

            {/* Regional emoji ring */}
            <div className="flex flex-wrap justify-center gap-1.5 text-lg">
              {['🍜', '🍛', '🌮', '🥘', '🍲', '🥗', '🍹', '☕'].map((e, i) => (
                <span key={i} style={{ opacity: 0.7 }}>{e}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="w-full mt-2 grid grid-cols-2 gap-3">
              {[
                { n: `${culinaraxRecipes.length}+`, l: 'Resep' },
                { n: '8', l: 'Wilayah' },
                { n: `${culinaraxRecipes.filter(r => r.type === 'drink').length}+`, l: 'Minuman' },
                { n: '∞', l: 'Rasa' },
              ].map(s => (
                <div
                  key={s.l}
                  className="text-center py-2 rounded-lg"
                  style={{ background: 'rgba(149,213,178,0.06)', border: '1px solid rgba(149,213,178,0.1)' }}
                >
                  <div className="text-lg font-black" style={{ color: '#95D5B2' }}>{s.n}</div>
                  <div className="text-xs" style={{ color: 'rgba(253,243,227,0.4)' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Ornamental bottom */}
            <div className="w-full flex items-center gap-2 mt-2">
              <div className="flex-1 h-px" style={{ background: 'rgba(149,213,178,0.3)' }} />
              <span style={{ color: 'rgba(149,213,178,0.5)', fontSize: '10px' }}>✦ ✦ ✦</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(149,213,178,0.3)' }} />
            </div>

            <p className="text-xs" style={{ color: 'rgba(253,243,227,0.25)' }}>Kompendium Resep &amp; Minuman Dunia</p>

            {!isOpen && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-2 text-xs tracking-widest uppercase"
                style={{ color: 'rgba(149,213,178,0.6)' }}
              >
                ← Buka Buku
              </motion.div>
            )}
          </div>

          {/* Texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Region Tab ──────────────────────────────────────────────
function RegionTab({ region, active, onClick }: { region: typeof regions[0]; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
      style={{
        background: active ? region.color : 'rgba(253,243,227,0.04)',
        color: active ? '#0D0500' : 'rgba(253,243,227,0.5)',
        border: `1px solid ${active ? region.color : 'rgba(253,243,227,0.08)'}`,
      }}
    >
      <span>{region.emoji}</span>
      <span className="hidden sm:inline">{region.label}</span>
    </button>
  );
}

// ── Recipe Page Content ─────────────────────────────────────
function RecipePageContent({ recipe }: { recipe: CulinaraxRecipe }) {
  const regionInfo = regions.find(r => r.key === recipe.region)!;
  const isFood = recipe.type === 'food';

  return (
    <div className="h-full flex flex-col">
      {/* Page header */}
      <div
        className="flex items-center justify-between px-6 py-3 mb-4"
        style={{ borderBottom: `1px solid ${regionInfo.color}20` }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: regionInfo.color }}>
          {regionInfo.emoji} {regionInfo.label} — {recipe.category}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{
            background: isFood ? 'rgba(249,193,26,0.15)' : 'rgba(116,185,255,0.15)',
            color: isFood ? '#F9C11A' : '#74B9FF',
          }}
        >
          {isFood ? '🍽 Makanan' : '🥤 Minuman'}
        </span>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-y-auto flex flex-col gap-4">
        {/* Main display */}
        <div className="flex items-start gap-5">
          <div
            className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-5xl"
            style={{ background: `${regionInfo.color}15`, border: `1px solid ${regionInfo.color}30` }}
          >
            {recipe.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-black leading-tight" style={{ color: 'var(--food-cream)' }}>
              {recipe.name}
            </h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${regionInfo.color}20`, color: regionInfo.color }}
              >
                📍 {recipe.origin}
              </span>
            </div>
          </div>
        </div>

        {/* Info sections */}
        <div className="grid grid-cols-1 gap-3">
          {/* Main ingredients */}
          <div className="p-3 rounded-xl" style={{ background: 'rgba(253,243,227,0.03)', border: '1px solid rgba(253,243,227,0.06)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">🧂</span>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: regionInfo.color }}>Bahan Inti</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,243,227,0.7)' }}>
              {recipe.mainIngredients}
            </p>
          </div>

          {/* Method */}
          <div className="p-3 rounded-xl" style={{ background: 'rgba(253,243,227,0.03)', border: '1px solid rgba(253,243,227,0.06)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">👨‍🍳</span>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: regionInfo.color }}>Metode Singkat</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,243,227,0.7)' }}>
              {recipe.method}
            </p>
          </div>

          {/* Note (if any) */}
          {recipe.note && (
            <div className="p-3 rounded-xl" style={{ background: `${regionInfo.color}08`, border: `1px solid ${regionInfo.color}20` }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">⭐</span>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: regionInfo.color }}>Catatan</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,243,227,0.65)' }}>
                {recipe.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── TOC Page ────────────────────────────────────────────────
function RecipeTOC({ onSelect }: { onSelect: (key: RegionKey) => void }) {
  return (
    <div className="h-full flex flex-col px-6 py-6 gap-5">
      <div>
        <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(149,213,178,0.5)' }}>Daftar Isi</p>
        <h3 className="text-3xl font-black" style={{ color: 'var(--food-cream)' }}>Wilayah Dunia</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
        {regions.map(region => {
          const items = recipesByRegion[region.key];
          const foodCount = items.filter(r => r.type === 'food').length;
          const drinkCount = items.filter(r => r.type === 'drink').length;
          return (
            <button
              key={region.key}
              onClick={() => onSelect(region.key)}
              className="w-full text-left p-3 rounded-xl transition-all duration-300"
              style={{
                background: `${region.color}08`,
                border: `1px solid ${region.color}20`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${region.color}15`; e.currentTarget.style.borderColor = `${region.color}40`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${region.color}08`; e.currentTarget.style.borderColor = `${region.color}20`; }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{region.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold" style={{ color: 'var(--food-cream)' }}>{region.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(253,243,227,0.35)' }}>{region.subtitle}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs" style={{ color: '#F9C11A' }}>🍽 {foodCount}</span>
                    <span className="text-xs" style={{ color: '#74B9FF' }}>🥤 {drinkCount}</span>
                  </div>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: region.color }}>→</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-3" style={{ borderTop: '1px solid rgba(253,243,227,0.06)' }}>
        <p className="text-xs text-center" style={{ color: 'rgba(253,243,227,0.2)' }}>
          {culinaraxRecipes.length} resep &amp; minuman dari seluruh dunia — Culinarax
        </p>
      </div>
    </div>
  );
}

// ── Main RecipeBook Component ───────────────────────────────
export default function RecipeBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<RegionKey>('asia-timur');
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [view, setView] = useState<'toc' | 'recipe'>('toc');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'food' | 'drink'>('all');

  const activeRegionInfo = regions.find(r => r.key === activeRegion)!;

  const filteredRecipes = useMemo(() => {
    let recipes = recipesByRegion[activeRegion];
    if (typeFilter !== 'all') {
      recipes = recipes.filter(r => r.type === typeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      recipes = recipes.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.origin.toLowerCase().includes(q) ||
        r.mainIngredients.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    return recipes;
  }, [activeRegion, search, typeFilter]);

  const currentRecipe = filteredRecipes[currentPage];
  const totalPages = filteredRecipes.length;

  const goNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(p => p + 1);
    }
  }, [currentPage, totalPages]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(p => p - 1);
    }
  }, [currentPage]);

  const handleRegionChange = useCallback((key: RegionKey) => {
    setActiveRegion(key);
    setCurrentPage(0);
    setView('recipe');
    setSearch('');
    setTypeFilter('all');
  }, []);

  const pageVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      id="recipe-book"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000D00 0%, #001200 50%, #000D00 100%)' }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: ['#95D5B2', '#52B788', '#FDF3E3'][Math.floor(Math.random() * 3)],
              opacity: Math.random() * 0.35 + 0.08,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(82,183,136,0.6)' }}>
            ✦ Culinarax ✦
          </p>
          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-4">
            <span
              style={{
                background: 'linear-gradient(135deg, #95D5B2, #52B788)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RESEP DUNIA
            </span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: 'rgba(253,243,227,0.4)' }}>
            Kompendium Resep Makanan &amp; Minuman Dunia — {culinaraxRecipes.length}+ resep dari 8 wilayah.
          </p>
        </motion.div>

        {/* Book + Reader layout */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Book cover */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <div style={{ perspective: '1200px' }}>
              <RecipeBookCover onClick={() => setIsOpen(true)} isOpen={isOpen} />
            </div>
            {!isOpen && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #52B788, #95D5B2)',
                  color: '#001A00',
                }}
              >
                Buka Buku →
              </motion.button>
            )}
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300"
                style={{ color: 'rgba(253,243,227,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(253,243,227,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,243,227,0.3)'}
              >
                ← Tutup Buku
              </button>
            )}
          </div>

          {/* Book pages */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 min-w-0"
              >
                {/* Region tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setView('toc')}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
                    style={{
                      background: view === 'toc' ? '#FDF3E3' : 'rgba(253,243,227,0.04)',
                      color: view === 'toc' ? '#0D0500' : 'rgba(253,243,227,0.5)',
                      border: `1px solid ${view === 'toc' ? '#FDF3E3' : 'rgba(253,243,227,0.08)'}`,
                    }}
                  >
                    📋 Daftar Isi
                  </button>
                  {regions.map(region => (
                    <RegionTab
                      key={region.key}
                      region={region}
                      active={view === 'recipe' && activeRegion === region.key}
                      onClick={() => handleRegionChange(region.key)}
                    />
                  ))}
                </div>

                {/* Book page */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: '#020D02',
                    border: '1px solid rgba(149,213,178,0.08)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    minHeight: '520px',
                  }}
                >
                  {/* Page header bar */}
                  <div
                    className="px-6 py-3 flex items-center justify-between"
                    style={{ background: 'rgba(149,213,178,0.03)', borderBottom: '1px solid rgba(149,213,178,0.06)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#E63329' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F47B20' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#95D5B2' }} />
                    </div>
                    {view === 'recipe' && (
                      <p className="text-xs" style={{ color: 'rgba(253,243,227,0.3)' }}>
                        Resep {currentPage + 1} / {totalPages}
                      </p>
                    )}
                    <p className="text-xs" style={{ color: 'rgba(253,243,227,0.2)' }}>
                      Culinarax — Kompendium Resep Dunia
                    </p>
                  </div>

                  {/* Content */}
                  <div style={{ minHeight: '460px' }}>
                    {view === 'toc' ? (
                      <RecipeTOC onSelect={handleRegionChange} />
                    ) : (
                      <>
                        {/* Search + Filter bar */}
                        <div className="px-6 pt-4 flex flex-col gap-2">
                          <div
                            className="flex items-center gap-2 px-3 py-2 rounded-xl"
                            style={{ background: 'rgba(149,213,178,0.04)', border: '1px solid rgba(149,213,178,0.08)' }}
                          >
                            <span className="text-sm">🔍</span>
                            <input
                              type="text"
                              value={search}
                              onChange={e => { setSearch(e.target.value); setCurrentPage(0); }}
                              placeholder={`Cari di ${activeRegionInfo.label}...`}
                              className="flex-1 bg-transparent text-xs outline-none"
                              style={{ color: 'var(--food-cream)', caretColor: activeRegionInfo.color }}
                            />
                            {search && (
                              <button onClick={() => { setSearch(''); setCurrentPage(0); }} style={{ color: 'rgba(253,243,227,0.3)' }}>
                                ✕
                              </button>
                            )}
                          </div>
                          {/* Type filter */}
                          <div className="flex gap-2">
                            {(['all', 'food', 'drink'] as const).map(t => (
                              <button
                                key={t}
                                onClick={() => { setTypeFilter(t); setCurrentPage(0); }}
                                className="px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
                                style={{
                                  background: typeFilter === t ? activeRegionInfo.color : 'rgba(253,243,227,0.04)',
                                  color: typeFilter === t ? '#001A00' : 'rgba(253,243,227,0.4)',
                                  border: `1px solid ${typeFilter === t ? activeRegionInfo.color : 'rgba(253,243,227,0.06)'}`,
                                }}
                              >
                                {t === 'all' ? '🌐 Semua' : t === 'food' ? '🍽 Makanan' : '🥤 Minuman'}
                              </button>
                            ))}
                          </div>
                          {search && (
                            <p className="text-xs" style={{ color: 'rgba(253,243,227,0.3)' }}>
                              {filteredRecipes.length} hasil ditemukan
                            </p>
                          )}
                        </div>

                        {/* Recipe content */}
                        {filteredRecipes.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-64 gap-4">
                            <span className="text-4xl">🔍</span>
                            <p style={{ color: 'rgba(253,243,227,0.4)' }}>Resep tidak ditemukan</p>
                          </div>
                        ) : (
                          <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                              key={`${activeRegion}-${currentPage}-${search}-${typeFilter}`}
                              custom={direction}
                              variants={pageVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              style={{ minHeight: '400px' }}
                            >
                              {currentRecipe && <RecipePageContent recipe={currentRecipe} />}
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                {view === 'recipe' && filteredRecipes.length > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={goPrev}
                      disabled={currentPage === 0}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                      style={{
                        background: currentPage === 0 ? 'rgba(253,243,227,0.02)' : 'rgba(149,213,178,0.08)',
                        color: currentPage === 0 ? 'rgba(253,243,227,0.2)' : 'rgba(253,243,227,0.8)',
                        border: `1px solid ${currentPage === 0 ? 'rgba(253,243,227,0.04)' : 'rgba(149,213,178,0.15)'}`,
                        cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      ← Sebelumnya
                    </button>

                    {/* Dots */}
                    <div className="flex gap-1.5">
                      {Array.from({ length: Math.min(totalPages, 8) }).map((_, i) => {
                        const idx = totalPages <= 8 ? i : Math.floor(i * totalPages / 8);
                        const isActive = totalPages <= 8 ? i === currentPage : Math.floor(currentPage * 8 / totalPages) === i;
                        return (
                          <button
                            key={i}
                            onClick={() => { setCurrentPage(idx); }}
                            className="rounded-full transition-all duration-300"
                            style={{
                              width: isActive ? '20px' : '6px',
                              height: '6px',
                              background: isActive ? activeRegionInfo.color : 'rgba(253,243,227,0.15)',
                            }}
                          />
                        );
                      })}
                    </div>

                    <button
                      onClick={goNext}
                      disabled={currentPage === totalPages - 1}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                      style={{
                        background: currentPage === totalPages - 1 ? 'rgba(253,243,227,0.02)' : 'rgba(149,213,178,0.08)',
                        color: currentPage === totalPages - 1 ? 'rgba(253,243,227,0.2)' : 'rgba(253,243,227,0.8)',
                        border: `1px solid ${currentPage === totalPages - 1 ? 'rgba(253,243,227,0.04)' : 'rgba(149,213,178,0.15)'}`,
                        cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Berikutnya →
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
