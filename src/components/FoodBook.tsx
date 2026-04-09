import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { compendiumFoods, compendiumByCategory, groupNames, type CompendiumFood } from '../data/compendium';

// ---- Book Cover ----
function BookCover({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
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
            background: 'linear-gradient(145deg, #1A0800 0%, #2D1000 40%, #1A0800 100%)',
            border: '1px solid rgba(249,193,26,0.3)',
            boxShadow: '8px 8px 30px rgba(0,0,0,0.8), inset -3px 0 8px rgba(0,0,0,0.5)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Spine effect */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8"
            style={{ background: 'linear-gradient(to right, #0D0500, #2D1500)', borderRight: '1px solid rgba(249,193,26,0.15)' }}
          />

          <div className="pl-12 pr-6 py-10 flex flex-col items-center text-center gap-4">
            {/* Ornamental top */}
            <div className="w-full flex items-center gap-2 mb-2">
              <div className="flex-1 h-px" style={{ background: 'rgba(249,193,26,0.3)' }} />
              <span style={{ color: 'rgba(249,193,26,0.5)', fontSize: '10px' }}>✦ ✦ ✦</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(249,193,26,0.3)' }} />
            </div>

            {/* Subtitle */}
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(249,193,26,0.6)' }}>
              Kompendium Master
            </p>

            {/* Main title */}
            <h2
              className="text-3xl md:text-4xl font-black leading-tight"
              style={{
                background: 'linear-gradient(135deg, #F9C11A, #F47B20, #E63329)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MAKANAN<br />DUNIA
            </h2>

            {/* Large emoji illustration */}
            <div className="text-7xl my-4" style={{ filter: 'drop-shadow(0 4px 20px rgba(249,193,26,0.4))' }}>
              🌍
            </div>

            {/* Food emoji ring */}
            <div className="flex flex-wrap justify-center gap-1.5 text-lg">
              {['🍔', '🌮', '🍕', '🥑', '🍜', '🥞', '🍣', '🫓', '🥐', '🍱', '🥭', '🥚'].map((e, i) => (
                <span key={i} style={{ opacity: 0.7 }}>{e}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="w-full mt-2 grid grid-cols-2 gap-3">
              {[
                { n: '80+', l: 'Foods' },
                { n: '13', l: 'Batches' },
                { n: '4', l: 'Groups' },
                { n: '∞', l: 'Flavors' },
              ].map(s => (
                <div key={s.l} className="text-center py-2 rounded-lg" style={{ background: 'rgba(249,193,26,0.06)', border: '1px solid rgba(249,193,26,0.1)' }}>
                  <div className="text-lg font-black" style={{ color: '#F9C11A' }}>{s.n}</div>
                  <div className="text-xs" style={{ color: 'rgba(253,243,227,0.4)' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Ornamental bottom */}
            <div className="w-full flex items-center gap-2 mt-2">
              <div className="flex-1 h-px" style={{ background: 'rgba(249,193,26,0.3)' }} />
              <span style={{ color: 'rgba(249,193,26,0.5)', fontSize: '10px' }}>✦ ✦ ✦</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(249,193,26,0.3)' }} />
            </div>

            <p className="text-xs" style={{ color: 'rgba(253,243,227,0.25)' }}>Batch Gabungan 1–13</p>

            {/* Open hint */}
            {!isOpen && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-2 text-xs tracking-widest uppercase"
                style={{ color: 'rgba(249,193,26,0.6)' }}
              >
                ← Open Book
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

// ---- Category Tab ----
function CategoryTab({ cat, active, onClick }: { cat: 1|2|3|4; active: boolean; onClick: () => void }) {
  const g = groupNames[cat];
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
      style={{
        background: active ? g.color : 'rgba(253,243,227,0.04)',
        color: active ? '#0D0500' : 'rgba(253,243,227,0.5)',
        border: `1px solid ${active ? g.color : 'rgba(253,243,227,0.08)'}`,
      }}
    >
      <span>{g.emoji}</span>
      <span className="hidden sm:inline">Group {cat}</span>
    </button>
  );
}

// ---- Food Page Content ----
function FoodPageContent({ food }: { food: CompendiumFood }) {
  const group = groupNames[food.category];
  return (
    <div className="h-full flex flex-col">
      {/* Page header */}
      <div
        className="flex items-center justify-between px-6 py-3 mb-4"
        style={{ borderBottom: `1px solid ${group.color}20` }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: group.color }}>
          Group {food.category} — {food.subcategory}
        </span>
        <span className="text-xs" style={{ color: 'rgba(253,243,227,0.25)' }}>
          Batch {food.batch}
        </span>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-y-auto flex flex-col gap-4">
        {/* Main food display */}
        <div className="flex items-start gap-5">
          {/* Emoji with background */}
          <div
            className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-5xl"
            style={{ background: `${group.color}15`, border: `1px solid ${group.color}30` }}
          >
            {food.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-black leading-tight" style={{ color: 'var(--food-cream)' }}>
              {food.name}
            </h3>
            {food.nameLocal && (
              <p className="text-sm italic mt-0.5" style={{ color: 'rgba(253,243,227,0.4)' }}>
                {food.nameLocal}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${group.color}20`, color: group.color }}
              >
                {food.origin}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,243,227,0.75)' }}>
            {food.description}
          </p>
        </div>

        {/* Info sections */}
        <div className="grid grid-cols-1 gap-3">
          {/* Nutrition */}
          <div className="p-3 rounded-xl" style={{ background: 'rgba(253,243,227,0.03)', border: '1px solid rgba(253,243,227,0.06)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">💪</span>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: group.color }}>Nutrition</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,243,227,0.55)' }}>
              {food.nutrition}
            </p>
          </div>

          {/* Usage */}
          <div className="p-3 rounded-xl" style={{ background: 'rgba(253,243,227,0.03)', border: '1px solid rgba(253,243,227,0.06)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">🍽️</span>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: group.color }}>How to Use</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,243,227,0.55)' }}>
              {food.usage}
            </p>
          </div>

          {/* Fun fact */}
          {food.funFact && (
            <div className="p-3 rounded-xl" style={{ background: `${group.color}08`, border: `1px solid ${group.color}20` }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">⭐</span>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: group.color }}>Fun Fact</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,243,227,0.65)' }}>
                {food.funFact}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- TOC Page ----
function TableOfContents({ onSelect }: { onSelect: (cat: 1|2|3|4) => void }) {
  return (
    <div className="h-full flex flex-col px-6 py-6 gap-5">
      <div>
        <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(249,193,26,0.5)' }}>Contents</p>
        <h3 className="text-3xl font-black" style={{ color: 'var(--food-cream)' }}>Daftar Isi</h3>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {([1, 2, 3, 4] as const).map(cat => {
          const g = groupNames[cat];
          const foods = compendiumByCategory[cat];
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className="group w-full text-left p-4 rounded-xl transition-all duration-300"
              style={{
                background: `${g.color}08`,
                border: `1px solid ${g.color}20`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${g.color}15`; e.currentTarget.style.borderColor = `${g.color}40`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${g.color}08`; e.currentTarget.style.borderColor = `${g.color}20`; }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{g.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold" style={{ color: 'var(--food-cream)' }}>{g.title}</p>
                    <span className="text-xs ml-2 flex-shrink-0" style={{ color: g.color }}>{foods.length} items →</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(253,243,227,0.4)' }}>{g.subtitle}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-3" style={{ borderTop: '1px solid rgba(253,243,227,0.06)' }}>
        <p className="text-xs text-center" style={{ color: 'rgba(253,243,227,0.2)' }}>
          {compendiumFoods.length} makanan dari seluruh dunia
        </p>
      </div>
    </div>
  );
}

// ---- Main Book Component ----
export default function FoodBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<1|2|3|4>(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [view, setView] = useState<'toc' | 'food'>('toc');
  const [search, setSearch] = useState('');

  const filteredFoods = useMemo(() => {
    let foods = compendiumByCategory[activeCategory];
    if (search.trim()) {
      const q = search.toLowerCase();
      foods = foods.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.origin.toLowerCase().includes(q) ||
        (f.nameLocal?.toLowerCase().includes(q) ?? false)
      );
    }
    return foods;
  }, [activeCategory, search]);

  const currentFood = filteredFoods[currentPage];
  const totalPages = filteredFoods.length;

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

  const handleCategoryChange = useCallback((cat: 1|2|3|4) => {
    setActiveCategory(cat);
    setCurrentPage(0);
    setView('food');
    setSearch('');
  }, []);

  const pageVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      id="book"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0500 0%, #0A0300 50%, #0D0500 100%)' }}
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
              background: ['#F9C11A', '#F47B20', '#FDF3E3'][Math.floor(Math.random() * 3)],
              opacity: Math.random() * 0.4 + 0.1,
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
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(196,124,48,0.6)' }}>
            ✦ Encyclopaedia ✦
          </p>
          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-4">
            <span
              style={{
                background: 'linear-gradient(135deg, #F9C11A, #C47C30)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              THE BOOK
            </span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: 'rgba(253,243,227,0.4)' }}>
            Kompendium Master Makanan Dunia — 80+ makanan dari 13 batch, 4 kelompok besar.
          </p>
        </motion.div>

        {/* Book + Reader layout */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Book cover (left) */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <div style={{ perspective: '1200px' }}>
              <BookCover onClick={() => setIsOpen(true)} isOpen={isOpen} />
            </div>
            {!isOpen && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #C47C30, #F9C11A)',
                  color: '#0D0500',
                }}
              >
                Open Book →
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
                ← Close Book
              </button>
            )}
          </div>

          {/* Book pages (right) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 min-w-0"
              >
                {/* Category tabs */}
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
                    📋 Contents
                  </button>
                  {([1, 2, 3, 4] as const).map(cat => (
                    <CategoryTab
                      key={cat}
                      cat={cat}
                      active={view === 'food' && activeCategory === cat}
                      onClick={() => handleCategoryChange(cat)}
                    />
                  ))}
                </div>

                {/* Book page */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: '#0F0600',
                    border: '1px solid rgba(253,243,227,0.08)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    minHeight: '520px',
                  }}
                >
                  {/* Page header bar */}
                  <div
                    className="px-6 py-3 flex items-center justify-between"
                    style={{ background: 'rgba(253,243,227,0.03)', borderBottom: '1px solid rgba(253,243,227,0.06)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#E63329' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F47B20' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F9C11A' }} />
                    </div>
                    {view === 'food' && (
                      <p className="text-xs" style={{ color: 'rgba(253,243,227,0.3)' }}>
                        Page {currentPage + 1} / {totalPages}
                      </p>
                    )}
                    <p className="text-xs" style={{ color: 'rgba(253,243,227,0.2)' }}>
                      Kompendium Master Makanan Dunia
                    </p>
                  </div>

                  {/* Content */}
                  <div style={{ minHeight: '460px' }}>
                    {view === 'toc' ? (
                      <TableOfContents onSelect={handleCategoryChange} />
                    ) : (
                      <>
                        {/* Search bar */}
                        <div className="px-6 pt-4">
                          <div
                            className="flex items-center gap-2 px-3 py-2 rounded-xl"
                            style={{ background: 'rgba(253,243,227,0.04)', border: '1px solid rgba(253,243,227,0.08)' }}
                          >
                            <span className="text-sm">🔍</span>
                            <input
                              type="text"
                              value={search}
                              onChange={e => { setSearch(e.target.value); setCurrentPage(0); }}
                              placeholder={`Search in Group ${activeCategory}...`}
                              className="flex-1 bg-transparent text-xs outline-none"
                              style={{ color: 'var(--food-cream)', caretColor: groupNames[activeCategory].color }}
                            />
                            {search && (
                              <button onClick={() => { setSearch(''); setCurrentPage(0); }} style={{ color: 'rgba(253,243,227,0.3)' }}>
                                ✕
                              </button>
                            )}
                          </div>
                          {search && (
                            <p className="text-xs mt-2 mb-0" style={{ color: 'rgba(253,243,227,0.3)' }}>
                              {filteredFoods.length} result{filteredFoods.length !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>

                        {/* Food content */}
                        {filteredFoods.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-64 gap-4">
                            <span className="text-4xl">🔍</span>
                            <p style={{ color: 'rgba(253,243,227,0.4)' }}>No foods found</p>
                          </div>
                        ) : (
                          <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                              key={`${activeCategory}-${currentPage}-${search}`}
                              custom={direction}
                              variants={pageVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              style={{ minHeight: '400px' }}
                            >
                              {currentFood && <FoodPageContent food={currentFood} />}
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                {view === 'food' && filteredFoods.length > 0 && (
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={goPrev}
                      disabled={currentPage === 0}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                      style={{
                        background: currentPage > 0 ? 'rgba(253,243,227,0.06)' : 'rgba(253,243,227,0.02)',
                        border: '1px solid rgba(253,243,227,0.08)',
                        color: currentPage > 0 ? 'var(--food-cream)' : 'rgba(253,243,227,0.2)',
                        cursor: currentPage > 0 ? 'pointer' : 'not-allowed',
                      }}
                    >
                      ← Previous
                    </button>

                    {/* Page dots */}
                    <div className="flex items-center gap-1.5 overflow-x-auto max-w-48 py-2">
                      {filteredFoods.slice(
                        Math.max(0, currentPage - 4),
                        Math.min(totalPages, currentPage + 5)
                      ).map((_, i) => {
                        const realIndex = Math.max(0, currentPage - 4) + i;
                        return (
                          <button
                            key={realIndex}
                            onClick={() => { setDirection(realIndex > currentPage ? 1 : -1); setCurrentPage(realIndex); }}
                            className="rounded-full flex-shrink-0 transition-all duration-200"
                            style={{
                              width: realIndex === currentPage ? '20px' : '6px',
                              height: '6px',
                              background: realIndex === currentPage ? groupNames[activeCategory].color : 'rgba(253,243,227,0.15)',
                            }}
                          />
                        );
                      })}
                    </div>

                    <button
                      onClick={goNext}
                      disabled={currentPage >= totalPages - 1}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                      style={{
                        background: currentPage < totalPages - 1 ? `${groupNames[activeCategory].color}20` : 'rgba(253,243,227,0.02)',
                        border: `1px solid ${currentPage < totalPages - 1 ? `${groupNames[activeCategory].color}40` : 'rgba(253,243,227,0.08)'}`,
                        color: currentPage < totalPages - 1 ? groupNames[activeCategory].color : 'rgba(253,243,227,0.2)',
                        cursor: currentPage < totalPages - 1 ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}

                {/* All food grid for category */}
                {view === 'food' && (
                  <div className="mt-6">
                    <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(253,243,227,0.3)' }}>
                      All in Group {activeCategory} ({filteredFoods.length})
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                      {filteredFoods.map((food, i) => (
                        <button
                          key={food.id}
                          onClick={() => { setDirection(i > currentPage ? 1 : -1); setCurrentPage(i); }}
                          className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 text-center"
                          style={{
                            background: i === currentPage ? `${groupNames[activeCategory].color}20` : 'rgba(253,243,227,0.03)',
                            border: `1px solid ${i === currentPage ? `${groupNames[activeCategory].color}50` : 'rgba(253,243,227,0.06)'}`,
                          }}
                        >
                          <span className="text-lg">{food.emoji}</span>
                          <span className="text-xs leading-tight" style={{ color: i === currentPage ? 'var(--food-cream)' : 'rgba(253,243,227,0.4)', fontSize: '10px' }}>
                            {food.name}
                          </span>
                        </button>
                      ))}
                    </div>
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
