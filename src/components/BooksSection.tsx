import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Data imports ──────────────────────────────────────────────────────────────
import { compendiumFoods, compendiumByCategory, groupNames, type CompendiumFood } from '../data/compendium';
import { culinaraxRecipes, recipesByRegion, regions, type CulinaraxRecipe, type RegionKey } from '../data/culinarax';
import { drinkEntries, drinksByCategory, drinkCategories, type DrinkEntry, type DrinkCategory } from '../data/drinks';

// ─────────────────────────────────────────────────────────────────────────────
// BOOK DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────
type BookId = 'food' | 'recipe' | 'drink';

interface BookDef {
  id: BookId;
  title: string[];
  subtitle: string;
  label: string;
  emoji: string;
  emojiRing: string[];
  stats: { n: string; l: string }[];
  accent: string;
  accentDark: string;
  bgFrom: string;
  bgTo: string;
  borderColor: string;
}

const BOOKS: BookDef[] = [
  {
    id: 'food',
    title: ['MAKANAN', 'DUNIA'],
    subtitle: 'Kompendium Master',
    label: 'Kompendium Master Makanan Dunia',
    emoji: '🌍',
    emojiRing: ['🍔', '🌮', '🍕', '🥑', '🍜', '🥞', '🍣', '🫓', '🥐', '🍱', '🥭', '🥚'],
    stats: [
      { n: '80+', l: 'Foods' },
      { n: '13', l: 'Batches' },
      { n: '4', l: 'Groups' },
      { n: '∞', l: 'Flavors' },
    ],
    accent: '#F9C11A',
    accentDark: '#C47C30',
    bgFrom: '#1A0800',
    bgTo: '#2D1000',
    borderColor: 'rgba(249,193,26,0.3)',
  },
  {
    id: 'recipe',
    title: ['RESEP &', 'MINUMAN', 'DUNIA'],
    subtitle: 'Culinarax',
    label: 'Kompendium Resep & Minuman Dunia',
    emoji: '🗺️',
    emojiRing: ['🍜', '🍛', '🌮', '🥘', '🍲', '🥗', '🍹', '☕'],
    stats: [
      { n: `${culinaraxRecipes.length}+`, l: 'Resep' },
      { n: '8', l: 'Wilayah' },
      { n: `${culinaraxRecipes.filter(r => r.type === 'drink').length}+`, l: 'Minuman' },
      { n: '∞', l: 'Rasa' },
    ],
    accent: '#95D5B2',
    accentDark: '#52B788',
    bgFrom: '#001A00',
    bgTo: '#002D00',
    borderColor: 'rgba(149,213,178,0.3)',
  },
  {
    id: 'drink',
    title: ['MINUMAN', 'DUNIA'],
    subtitle: 'Culinarax Master',
    label: 'Kompendium Master Minuman Dunia',
    emoji: '🍶',
    emojiRing: ['☕', '🍵', '🧋', '🍹', '🥛', '🫧', '🍸', '🍺'],
    stats: [
      { n: `${drinkEntries.length}+`, l: 'Minuman' },
      { n: '6', l: 'Kategori' },
      { n: '20+', l: 'Negara' },
      { n: '∞', l: 'Rasa' },
    ],
    accent: '#74B9FF',
    accentDark: '#0984E3',
    bgFrom: '#00101A',
    bgTo: '#001A2D',
    borderColor: 'rgba(116,185,255,0.3)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BOOK COVER (compact version for horizontal layout)
// ─────────────────────────────────────────────────────────────────────────────
function BookCover({ book, isSelected, onClick }: { book: BookDef; isSelected: boolean; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      animate={{ y: isSelected ? -10 : 0, scale: isSelected ? 1.04 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer select-none flex-1"
      style={{ minWidth: 0, maxWidth: '280px' }}
    >
      <div
        className="relative rounded-xl overflow-hidden h-full"
        style={{
          background: `linear-gradient(145deg, ${book.bgFrom} 0%, ${book.bgTo} 40%, ${book.bgFrom} 100%)`,
          border: `1px solid ${isSelected ? book.accent : book.borderColor}`,
          boxShadow: isSelected
            ? `0 20px 50px rgba(0,0,0,0.7), 0 0 30px ${book.accent}30, 8px 8px 30px rgba(0,0,0,0.8), inset -3px 0 8px rgba(0,0,0,0.5)`
            : '8px 8px 30px rgba(0,0,0,0.6), inset -3px 0 8px rgba(0,0,0,0.4)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Spine */}
        <div
          className="absolute left-0 top-0 bottom-0 w-6"
          style={{
            background: `linear-gradient(to right, ${book.bgFrom}, ${book.bgTo})`,
            borderRight: `1px solid ${book.borderColor}`,
          }}
        />

        <div className="pl-10 pr-4 py-7 flex flex-col items-center text-center gap-3">
          {/* Ornament top */}
          <div className="w-full flex items-center gap-1 mb-1">
            <div className="flex-1 h-px" style={{ background: `${book.accent}40` }} />
            <span style={{ color: `${book.accent}70`, fontSize: '8px' }}>✦ ✦ ✦</span>
            <div className="flex-1 h-px" style={{ background: `${book.accent}40` }} />
          </div>

          {/* Subtitle label */}
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: `${book.accent}90` }}>
            {book.subtitle}
          </p>

          {/* Title */}
          <h3
            className="text-xl md:text-2xl font-black leading-tight"
            style={{
              background: `linear-gradient(135deg, ${book.accent}, ${book.accentDark})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {book.title.map((line, i) => (
              <span key={i}>{line}{i < book.title.length - 1 ? <br /> : ''}</span>
            ))}
          </h3>

          {/* Emoji */}
          <div className="text-5xl my-2" style={{ filter: `drop-shadow(0 4px 15px ${book.accent}40)` }}>
            {book.emoji}
          </div>

          {/* Emoji ring */}
          <div className="flex flex-wrap justify-center gap-1 text-sm">
            {book.emojiRing.map((e, i) => (
              <span key={i} style={{ opacity: 0.65 }}>{e}</span>
            ))}
          </div>

          {/* Stats grid */}
          <div className="w-full mt-1 grid grid-cols-2 gap-1.5">
            {book.stats.map(s => (
              <div
                key={s.l}
                className="text-center py-1.5 rounded-lg"
                style={{ background: `${book.accent}08`, border: `1px solid ${book.accent}15` }}
              >
                <div className="text-sm font-black" style={{ color: book.accent }}>{s.n}</div>
                <div className="text-xs" style={{ color: 'rgba(253,243,227,0.4)', fontSize: '10px' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Ornament bottom */}
          <div className="w-full flex items-center gap-1 mt-1">
            <div className="flex-1 h-px" style={{ background: `${book.accent}40` }} />
            <span style={{ color: `${book.accent}70`, fontSize: '8px' }}>✦ ✦ ✦</span>
            <div className="flex-1 h-px" style={{ background: `${book.accent}40` }} />
          </div>

          {/* CTA */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs tracking-widest uppercase"
            style={{ color: isSelected ? book.accent : `${book.accent}70` }}
          >
            {isSelected ? '✦ Dibuka ✦' : '← Buka'}
          </motion.div>
        </div>

        {/* Texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }}
        />

        {/* Selected indicator bar at top */}
        {isSelected && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, transparent, ${book.accent}, transparent)` }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOD BOOK READER
// ─────────────────────────────────────────────────────────────────────────────
function FoodReader() {
  const [activeCategory, setActiveCategory] = useState<1|2|3|4>(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [view, setView] = useState<'toc'|'food'>('toc');
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
  const total = filteredFoods.length;
  const book = BOOKS[0];

  const goNext = useCallback(() => { if (currentPage < total - 1) { setDirection(1); setCurrentPage(p => p + 1); } }, [currentPage, total]);
  const goPrev = useCallback(() => { if (currentPage > 0) { setDirection(-1); setCurrentPage(p => p - 1); } }, [currentPage]);

  const pageVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <TabBtn label="📋 Isi" active={view === 'toc'} color={book.accent} onClick={() => setView('toc')} />
        {([1,2,3,4] as const).map(cat => {
          const g = groupNames[cat];
          return <TabBtn key={cat} label={`${g.emoji} Grup ${cat}`} active={view === 'food' && activeCategory === cat} color={g.color}
            onClick={() => { setActiveCategory(cat); setCurrentPage(0); setView('food'); setSearch(''); }} />;
        })}
      </div>

      {/* Page */}
      <div className="flex-1 rounded-xl overflow-hidden" style={{ background: '#0F0600', border: '1px solid rgba(249,193,26,0.08)', minHeight: '420px' }}>
        <ReaderHeader book={book} pageNum={view === 'food' ? currentPage + 1 : undefined} total={view === 'food' ? total : undefined} />
        <div style={{ minHeight: '360px' }}>
          {view === 'toc' ? (
            <FoodTOC onSelect={(cat) => { setActiveCategory(cat); setCurrentPage(0); setView('food'); }} />
          ) : (
            <>
              <SearchBar color={book.accent} value={search} onChange={v => { setSearch(v); setCurrentPage(0); }} placeholder={`Cari di Grup ${activeCategory}...`} />
              {filteredFoods.length === 0 ? <EmptyState /> : (
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div key={`f-${activeCategory}-${currentPage}-${search}`} custom={direction}
                    variants={pageVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25 }} style={{ minHeight: '340px' }}>
                    {currentFood && <FoodPage food={currentFood} />}
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}
        </div>
      </div>
      {view === 'food' && total > 0 && (
        <NavBar color={book.accent} prev={goPrev} next={goNext} canPrev={currentPage > 0} canNext={currentPage < total - 1}
          current={currentPage} total={total} onDot={setCurrentPage} />
      )}
    </div>
  );
}

function FoodTOC({ onSelect }: { onSelect: (cat: 1|2|3|4) => void }) {
  return (
    <div className="px-5 py-5 flex flex-col gap-3">
      <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(249,193,26,0.5)' }}>Daftar Isi</p>
      {([1,2,3,4] as const).map(cat => {
        const g = groupNames[cat];
        const cnt = compendiumByCategory[cat].length;
        return (
          <HoverBtn key={cat} colorBase={`${g.color}08`} colorHover={`${g.color}15`} borderBase={`${g.color}20`} borderHover={`${g.color}40`}
            onClick={() => onSelect(cat)}>
            <span className="text-xl">{g.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold" style={{ color: 'var(--food-cream)' }}>{g.title}</p>
              <p className="text-xs" style={{ color: 'rgba(253,243,227,0.35)' }}>{g.subtitle}</p>
            </div>
            <span className="text-xs flex-shrink-0" style={{ color: g.color }}>{cnt} →</span>
          </HoverBtn>
        );
      })}
      <p className="text-xs text-center mt-2" style={{ color: 'rgba(253,243,227,0.2)' }}>{compendiumFoods.length} makanan dari seluruh dunia</p>
    </div>
  );
}

function FoodPage({ food }: { food: CompendiumFood }) {
  const g = groupNames[food.category];
  return (
    <div className="px-5 pb-5 flex flex-col gap-3">
      <div className="flex items-start gap-4 pt-1">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ background: `${g.color}15`, border: `1px solid ${g.color}30` }}>
          {food.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black" style={{ color: 'var(--food-cream)' }}>{food.name}</h3>
          {food.nameLocal && <p className="text-xs italic mt-0.5" style={{ color: 'rgba(253,243,227,0.4)' }}>{food.nameLocal}</p>}
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${g.color}20`, color: g.color }}>
            {food.origin}
          </span>
        </div>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,243,227,0.7)' }}>{food.description}</p>
      <InfoBlock icon="💪" label="Nutrisi" color={g.color} text={food.nutrition} />
      <InfoBlock icon="🍽️" label="Penggunaan" color={g.color} text={food.usage} />
      {food.funFact && <InfoBlock icon="⭐" label="Fun Fact" color={g.color} text={food.funFact} highlight />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RECIPE BOOK READER
// ─────────────────────────────────────────────────────────────────────────────
function RecipeReader() {
  const [activeRegion, setActiveRegion] = useState<RegionKey>('asia-timur');
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [view, setView] = useState<'toc'|'recipe'>('toc');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all'|'food'|'drink'>('all');

  const regionInfo = regions.find(r => r.key === activeRegion)!;
  const book = BOOKS[1];

  const filtered = useMemo(() => {
    let list = recipesByRegion[activeRegion];
    if (typeFilter !== 'all') list = list.filter(r => r.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.origin.toLowerCase().includes(q) || r.mainIngredients.toLowerCase().includes(q));
    }
    return list;
  }, [activeRegion, search, typeFilter]);

  const current = filtered[currentPage];
  const total = filtered.length;

  const goNext = useCallback(() => { if (currentPage < total - 1) { setDirection(1); setCurrentPage(p => p + 1); } }, [currentPage, total]);
  const goPrev = useCallback(() => { if (currentPage > 0) { setDirection(-1); setCurrentPage(p => p - 1); } }, [currentPage]);

  const pageVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="flex flex-col h-full">
      {/* Region tabs */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <TabBtn label="📋 Isi" active={view === 'toc'} color={book.accent} onClick={() => setView('toc')} />
        {regions.map(r => (
          <TabBtn key={r.key} label={`${r.emoji} ${r.label}`} active={view === 'recipe' && activeRegion === r.key} color={r.color}
            onClick={() => { setActiveRegion(r.key); setCurrentPage(0); setView('recipe'); setSearch(''); setTypeFilter('all'); }} />
        ))}
      </div>

      {/* Page */}
      <div className="flex-1 rounded-xl overflow-hidden" style={{ background: '#020D02', border: '1px solid rgba(149,213,178,0.08)', minHeight: '420px' }}>
        <ReaderHeader book={book} pageNum={view === 'recipe' ? currentPage + 1 : undefined} total={view === 'recipe' ? total : undefined} />
        <div style={{ minHeight: '360px' }}>
          {view === 'toc' ? (
            <RecipeTOC onSelect={(key) => { setActiveRegion(key); setCurrentPage(0); setView('recipe'); }} />
          ) : (
            <>
              <div className="px-5 pt-3 flex flex-col gap-2">
                <SearchBar color={regionInfo.color} value={search} onChange={v => { setSearch(v); setCurrentPage(0); }}
                  placeholder={`Cari di ${regionInfo.label}...`} />
                <div className="flex gap-1.5">
                  {(['all','food','drink'] as const).map(t => (
                    <button key={t} onClick={() => { setTypeFilter(t); setCurrentPage(0); }}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
                      style={{
                        background: typeFilter === t ? regionInfo.color : 'rgba(253,243,227,0.04)',
                        color: typeFilter === t ? '#001A00' : 'rgba(253,243,227,0.4)',
                        border: `1px solid ${typeFilter === t ? regionInfo.color : 'rgba(253,243,227,0.06)'}`,
                      }}>
                      {t === 'all' ? '🌐 Semua' : t === 'food' ? '🍽 Makanan' : '🥤 Minuman'}
                    </button>
                  ))}
                </div>
              </div>
              {filtered.length === 0 ? <EmptyState /> : (
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div key={`r-${activeRegion}-${currentPage}-${search}-${typeFilter}`} custom={direction}
                    variants={pageVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25 }} style={{ minHeight: '320px' }}>
                    {current && <RecipePage recipe={current} />}
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}
        </div>
      </div>
      {view === 'recipe' && total > 0 && (
        <NavBar color={book.accent} prev={goPrev} next={goNext} canPrev={currentPage > 0} canNext={currentPage < total - 1}
          current={currentPage} total={total} onDot={setCurrentPage} />
      )}
    </div>
  );
}

function RecipeTOC({ onSelect }: { onSelect: (key: RegionKey) => void }) {
  return (
    <div className="px-5 py-5 flex flex-col gap-2">
      <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(149,213,178,0.5)' }}>Wilayah Dunia</p>
      <div className="grid grid-cols-2 gap-2">
        {regions.map(r => {
          const items = recipesByRegion[r.key];
          return (
            <HoverBtn key={r.key} colorBase={`${r.color}08`} colorHover={`${r.color}15`} borderBase={`${r.color}20`} borderHover={`${r.color}40`}
              onClick={() => onSelect(r.key)}>
              <span>{r.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold" style={{ color: 'var(--food-cream)' }}>{r.label}</p>
                <p className="text-xs" style={{ color: 'rgba(253,243,227,0.3)', fontSize: '10px' }}>
                  🍽 {items.filter(x => x.type === 'food').length} · 🥤 {items.filter(x => x.type === 'drink').length}
                </p>
              </div>
              <span className="text-xs" style={{ color: r.color }}>→</span>
            </HoverBtn>
          );
        })}
      </div>
      <p className="text-xs text-center mt-2" style={{ color: 'rgba(253,243,227,0.2)' }}>{culinaraxRecipes.length} resep &amp; minuman — Culinarax</p>
    </div>
  );
}

function RecipePage({ recipe }: { recipe: CulinaraxRecipe }) {
  const r = regions.find(x => x.key === recipe.region)!;
  return (
    <div className="px-5 pb-5 flex flex-col gap-3 pt-2">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ background: `${r.color}15`, border: `1px solid ${r.color}30` }}>
          {recipe.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black" style={{ color: 'var(--food-cream)' }}>{recipe.name}</h3>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${r.color}20`, color: r.color }}>📍 {recipe.origin}</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{
              background: recipe.type === 'food' ? 'rgba(249,193,26,0.15)' : 'rgba(116,185,255,0.15)',
              color: recipe.type === 'food' ? '#F9C11A' : '#74B9FF',
            }}>{recipe.type === 'food' ? '🍽 Makanan' : '🥤 Minuman'}</span>
          </div>
        </div>
      </div>
      <InfoBlock icon="🧂" label="Bahan Inti" color={r.color} text={recipe.mainIngredients} />
      <InfoBlock icon="👨‍🍳" label="Metode Singkat" color={r.color} text={recipe.method} />
      {recipe.note && <InfoBlock icon="⭐" label="Catatan" color={r.color} text={recipe.note} highlight />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRINK BOOK READER
// ─────────────────────────────────────────────────────────────────────────────
function DrinkReader() {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>('teh-infus');
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [view, setView] = useState<'toc'|'drink'>('toc');
  const [search, setSearch] = useState('');

  const catInfo = drinkCategories.find(c => c.key === activeCategory)!;
  const book = BOOKS[2];

  const filtered = useMemo(() => {
    let list = drinksByCategory[activeCategory];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(q) || d.origin.toLowerCase().includes(q) || d.basis.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  const current = filtered[currentPage];
  const total = filtered.length;

  const goNext = useCallback(() => { if (currentPage < total - 1) { setDirection(1); setCurrentPage(p => p + 1); } }, [currentPage, total]);
  const goPrev = useCallback(() => { if (currentPage > 0) { setDirection(-1); setCurrentPage(p => p - 1); } }, [currentPage]);

  const pageVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="flex flex-col h-full">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <TabBtn label="📋 Isi" active={view === 'toc'} color={book.accent} onClick={() => setView('toc')} />
        {drinkCategories.map(cat => (
          <TabBtn key={cat.key} label={`${cat.emoji} ${cat.label}`} active={view === 'drink' && activeCategory === cat.key} color={cat.color}
            onClick={() => { setActiveCategory(cat.key); setCurrentPage(0); setView('drink'); setSearch(''); }} />
        ))}
      </div>

      {/* Page */}
      <div className="flex-1 rounded-xl overflow-hidden" style={{ background: '#00101A', border: '1px solid rgba(116,185,255,0.08)', minHeight: '420px' }}>
        <ReaderHeader book={book} pageNum={view === 'drink' ? currentPage + 1 : undefined} total={view === 'drink' ? total : undefined} />
        <div style={{ minHeight: '360px' }}>
          {view === 'toc' ? (
            <DrinkTOC onSelect={(key) => { setActiveCategory(key); setCurrentPage(0); setView('drink'); }} />
          ) : (
            <>
              <SearchBar color={catInfo.color} value={search} onChange={v => { setSearch(v); setCurrentPage(0); }}
                placeholder={`Cari di ${catInfo.label}...`} />
              {filtered.length === 0 ? <EmptyState /> : (
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div key={`d-${activeCategory}-${currentPage}-${search}`} custom={direction}
                    variants={pageVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25 }} style={{ minHeight: '320px' }}>
                    {current && <DrinkPage drink={current} />}
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}
        </div>
      </div>
      {view === 'drink' && total > 0 && (
        <NavBar color={book.accent} prev={goPrev} next={goNext} canPrev={currentPage > 0} canNext={currentPage < total - 1}
          current={currentPage} total={total} onDot={setCurrentPage} />
      )}
    </div>
  );
}

function DrinkTOC({ onSelect }: { onSelect: (key: DrinkCategory) => void }) {
  return (
    <div className="px-5 py-5 flex flex-col gap-2">
      <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(116,185,255,0.5)' }}>Kategori Minuman</p>
      {drinkCategories.map(cat => {
        const cnt = drinksByCategory[cat.key].length;
        return (
          <HoverBtn key={cat.key} colorBase={`${cat.color}08`} colorHover={`${cat.color}15`} borderBase={`${cat.color}20`} borderHover={`${cat.color}40`}
            onClick={() => onSelect(cat.key)}>
            <span className="text-xl">{cat.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold" style={{ color: 'var(--food-cream)' }}>{cat.label}</p>
              <p className="text-xs" style={{ color: 'rgba(253,243,227,0.35)' }}>{cat.character}</p>
            </div>
            <span className="text-xs flex-shrink-0" style={{ color: cat.color }}>{cnt} →</span>
          </HoverBtn>
        );
      })}
      <p className="text-xs text-center mt-2" style={{ color: 'rgba(253,243,227,0.2)' }}>{drinkEntries.length} minuman dari seluruh dunia</p>
    </div>
  );
}

function DrinkPage({ drink }: { drink: DrinkEntry }) {
  const cat = drinkCategories.find(c => c.key === drink.category)!;
  const alcoholColor = drink.alcohol === 'Alkohol' ? '#E63329' : drink.alcohol.includes('rendah') ? '#F47B20' : '#95D5B2';
  return (
    <div className="px-5 pb-5 flex flex-col gap-3 pt-2">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
          {drink.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black" style={{ color: 'var(--food-cream)' }}>{drink.name}</h3>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${cat.color}20`, color: cat.color }}>📍 {drink.origin}</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${alcoholColor}20`, color: alcoholColor }}>
              {drink.alcohol === 'Non-alkohol' ? '✅' : '⚠️'} {drink.alcohol}
            </span>
          </div>
        </div>
      </div>
      <InfoBlock icon="🫙" label="Basis" color={cat.color} text={drink.basis} />
      <InfoBlock icon="📝" label="Catatan" color={cat.color} text={drink.note} />
      <InfoBlock icon="🏷️" label="Kategori" color={cat.color} text={`${cat.emoji} ${cat.label} — ${cat.character}`} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function TabBtn({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap"
      style={{
        background: active ? color : 'rgba(253,243,227,0.04)',
        color: active ? '#0D0500' : 'rgba(253,243,227,0.5)',
        border: `1px solid ${active ? color : 'rgba(253,243,227,0.08)'}`,
      }}>
      {label}
    </button>
  );
}

function ReaderHeader({ book, pageNum, total }: { book: BookDef; pageNum?: number; total?: number }) {
  return (
    <div className="px-5 py-2.5 flex items-center justify-between" style={{ background: `${book.accent}05`, borderBottom: `1px solid ${book.accent}10` }}>
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#E63329' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F47B20' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: book.accent }} />
      </div>
      {pageNum !== undefined && <p className="text-xs" style={{ color: 'rgba(253,243,227,0.3)' }}>Hal {pageNum} / {total}</p>}
      <p className="text-xs" style={{ color: 'rgba(253,243,227,0.2)' }}>{book.label}</p>
    </div>
  );
}

function SearchBar({ color, value, onChange, placeholder }: { color: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="px-5 pt-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: `${color}06`, border: `1px solid ${color}12` }}>
        <span className="text-sm">🔍</span>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="flex-1 bg-transparent text-xs outline-none" style={{ color: 'var(--food-cream)', caretColor: color }} />
        {value && <button onClick={() => onChange('')} style={{ color: 'rgba(253,243,227,0.3)' }}>✕</button>}
      </div>
    </div>
  );
}

function InfoBlock({ icon, label, color, text, highlight }: { icon: string; label: string; color: string; text: string; highlight?: boolean }) {
  return (
    <div className="p-3 rounded-xl" style={{ background: highlight ? `${color}08` : 'rgba(253,243,227,0.03)', border: `1px solid ${highlight ? color + '20' : 'rgba(253,243,227,0.06)'}` }}>
      <div className="flex items-center gap-2 mb-1">
        <span>{icon}</span>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color }}>{label}</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: highlight ? 'rgba(253,243,227,0.65)' : 'rgba(253,243,227,0.6)' }}>{text}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-48 gap-3">
      <span className="text-4xl">🔍</span>
      <p style={{ color: 'rgba(253,243,227,0.4)' }}>Tidak ditemukan</p>
    </div>
  );
}

function HoverBtn({ children, colorBase, colorHover, borderBase, borderHover, onClick }: {
  children: React.ReactNode;
  colorBase: string; colorHover: string; borderBase: string; borderHover: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all duration-300"
      style={{ background: colorBase, border: `1px solid ${borderBase}` }}
      onMouseEnter={e => { e.currentTarget.style.background = colorHover; e.currentTarget.style.borderColor = borderHover; }}
      onMouseLeave={e => { e.currentTarget.style.background = colorBase; e.currentTarget.style.borderColor = borderBase; }}>
      {children}
    </button>
  );
}

function NavBar({ color, prev, next, canPrev, canNext, current, total, onDot }: {
  color: string; prev: () => void; next: () => void;
  canPrev: boolean; canNext: boolean; current: number; total: number;
  onDot: (i: number) => void;
}) {
  const dots = Math.min(total, 10);
  return (
    <div className="flex items-center justify-between mt-3">
      <button onClick={prev} disabled={!canPrev} className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
        style={{ background: canPrev ? `${color}12` : 'rgba(253,243,227,0.02)', color: canPrev ? 'rgba(253,243,227,0.8)' : 'rgba(253,243,227,0.2)', border: `1px solid ${canPrev ? color + '20' : 'rgba(253,243,227,0.04)'}`, cursor: canPrev ? 'pointer' : 'not-allowed' }}>
        ← Sebelumnya
      </button>
      <div className="flex gap-1">
        {Array.from({ length: dots }).map((_, i) => {
          const idx = total <= dots ? i : Math.floor(i * total / dots);
          const isActive = total <= dots ? i === current : Math.floor(current * dots / total) === i;
          return (
            <button key={i} onClick={() => onDot(idx)} className="rounded-full transition-all duration-300"
              style={{ width: isActive ? '18px' : '6px', height: '6px', background: isActive ? color : 'rgba(253,243,227,0.15)' }} />
          );
        })}
      </div>
      <button onClick={next} disabled={!canNext} className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
        style={{ background: canNext ? `${color}12` : 'rgba(253,243,227,0.02)', color: canNext ? 'rgba(253,243,227,0.8)' : 'rgba(253,243,227,0.2)', border: `1px solid ${canNext ? color + '20' : 'rgba(253,243,227,0.04)'}`, cursor: canNext ? 'pointer' : 'not-allowed' }}>
        Berikutnya →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function BooksSection() {
  const [selectedBook, setSelectedBook] = useState<BookId | null>(null);

  const activeBook = BOOKS.find(b => b.id === selectedBook);

  return (
    <section
      id="book"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080300 0%, #050200 50%, #080300 100%)' }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: Math.random() * 2 + 0.5 + 'px',
            height: Math.random() * 2 + 0.5 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: ['#F9C11A', '#95D5B2', '#74B9FF', '#FDF3E3'][Math.floor(Math.random() * 4)],
            opacity: Math.random() * 0.3 + 0.08,
          }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(196,124,48,0.6)' }}>
            ✦ Encyclopaedia ✦
          </p>
          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #F9C11A, #95D5B2, #74B9FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              THE BOOKS
            </span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(253,243,227,0.4)' }}>
            Tiga kompendium dunia — makanan, resep, dan minuman dari seluruh penjuru bumi.
          </p>
        </motion.div>

        {/* 3 books horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10"
        >
          {BOOKS.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              viewport={{ once: true }}
              className="flex justify-center sm:flex-1"
              style={{ maxWidth: '300px', margin: '0 auto' }}
            >
              <BookCover
                book={book}
                isSelected={selectedBook === book.id}
                onClick={() => setSelectedBook(prev => prev === book.id ? null : book.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Book shelf line */}
        <div className="relative h-2 mb-8 mx-auto max-w-3xl">
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,193,26,0.3), rgba(149,213,178,0.3), rgba(116,185,255,0.3), transparent)' }} />
          <div className="absolute inset-x-0 top-0.5 h-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.5), transparent)' }} />
        </div>

        {/* Reader panel */}
        <AnimatePresence>
          {selectedBook && activeBook && (
            <motion.div
              key={selectedBook}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto"
            >
              {/* Reader label */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeBook.emoji}</span>
                  <span className="text-sm font-bold" style={{ color: activeBook.accent }}>{activeBook.label}</span>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="px-3 py-1.5 rounded-lg text-xs tracking-widest uppercase transition-all duration-200"
                  style={{ color: 'rgba(253,243,227,0.3)', border: '1px solid rgba(253,243,227,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(253,243,227,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,243,227,0.3)'}
                >
                  ✕ Tutup
                </button>
              </div>

              {selectedBook === 'food'   && <FoodReader />}
              {selectedBook === 'recipe' && <RecipeReader />}
              {selectedBook === 'drink'  && <DrinkReader />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt if none selected */}
        {!selectedBook && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm mt-2"
            style={{ color: 'rgba(253,243,227,0.25)' }}
          >
            ↑ Pilih salah satu buku untuk membacanya
          </motion.p>
        )}
      </div>
    </section>
  );
}
