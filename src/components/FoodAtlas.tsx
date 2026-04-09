import { useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { foodItems, categoryInfo } from '../data/foods';

// ─────────────────────────────────────────────────────────────────────────────
// RESTAURANT DATA  — lat/lng → CSS % positions
// x = (lng + 180) / 360 * 100
// y = (90  - lat) / 180 * 100
// ─────────────────────────────────────────────────────────────────────────────
export interface Restaurant {
  id: number;
  name: string;
  city: string;
  country: string;
  cuisine: string;
  specialty: string;
  rating: number;
  reviews: number;
  emoji: string;
  color: string;
  region: string;
  x: number;
  y: number;
}

function ll(lat: number, lng: number) {
  return { x: (lng + 180) / 360 * 100, y: (90 - lat) / 180 * 100 };
}

const restaurants: Restaurant[] = [
  // ── East Asia ──────────────────────────────────────────────────────────────
  { id:  1, name: 'Ichiran Ramen',        city: 'Tokyo',    country: 'Japan',        cuisine: 'Japanese',          specialty: 'Tonkotsu Ramen',          rating: 4.9, reviews: 12480, emoji: '🍜', color: '#E63329', region: 'East Asia',      ...ll(35.7, 139.7) },
  { id:  2, name: 'Da Dong Roast Duck',   city: 'Beijing',  country: 'China',        cuisine: 'Chinese',           specialty: 'Peking Duck',             rating: 4.8, reviews:  8920, emoji: '🦆', color: '#F47B20', region: 'East Asia',      ...ll(39.9, 116.4) },
  { id:  3, name: 'Gwangjang Market',     city: 'Seoul',    country: 'South Korea',  cuisine: 'Korean',            specialty: 'Bindaetteok & Bibimbap',  rating: 4.7, reviews:  6340, emoji: '🥘', color: '#E63329', region: 'East Asia',      ...ll(37.5, 127.0) },
  // ── Southeast Asia ─────────────────────────────────────────────────────────
  { id:  4, name: 'Gaggan Anand',         city: 'Bangkok',  country: 'Thailand',     cuisine: 'Progressive',       specialty: 'Yogurt Explosion',        rating: 4.9, reviews:  5210, emoji: '🍛', color: '#F9C11A', region: 'Southeast Asia', ...ll(13.8, 100.5) },
  { id:  5, name: 'Hawker Chan',          city: 'Singapore',country: 'Singapore',    cuisine: 'Singaporean',       specialty: 'Soya Sauce Chicken Rice', rating: 4.8, reviews:  9870, emoji: '🍗', color: '#F47B20', region: 'Southeast Asia', ...ll( 1.3, 103.8) },
  { id:  6, name: 'Phở 10',              city: 'Hanoi',    country: 'Vietnam',      cuisine: 'Vietnamese',        specialty: 'Beef Pho',               rating: 4.7, reviews:  7650, emoji: '🍲', color: '#E63329', region: 'Southeast Asia', ...ll(21.0, 105.8) },
  { id:  7, name: 'Babi Guling Ibu Oka', city: 'Ubud',     country: 'Indonesia',    cuisine: 'Balinese',          specialty: 'Suckling Pig',           rating: 4.8, reviews:  6230, emoji: '🐷', color: '#C47C30', region: 'Southeast Asia', ...ll(-8.5, 115.2) },
  // ── South Asia ─────────────────────────────────────────────────────────────
  { id:  8, name: 'Bukhara',             city: 'New Delhi',country: 'India',        cuisine: 'North Indian',      specialty: 'Dal Bukhara',            rating: 4.8, reviews: 11230, emoji: '🫕', color: '#F9C11A', region: 'South Asia',     ...ll(28.7,  77.2) },
  { id:  9, name: 'Trishna',             city: 'Mumbai',   country: 'India',        cuisine: 'Coastal Indian',    specialty: 'Butter Garlic Crab',     rating: 4.7, reviews:  8760, emoji: '🦀', color: '#F47B20', region: 'South Asia',     ...ll(19.1,  72.9) },
  // ── Middle East ────────────────────────────────────────────────────────────
  { id: 10, name: 'Al Hallab',           city: 'Beirut',   country: 'Lebanon',      cuisine: 'Lebanese',          specialty: 'Mixed Grill Meze',       rating: 4.8, reviews:  6540, emoji: '🥙', color: '#5D8A3C', region: 'Middle East',    ...ll(33.9,  35.5) },
  { id: 11, name: 'Zuma',               city: 'Dubai',    country: 'UAE',          cuisine: 'Izakaya',           specialty: 'Miso Black Cod',         rating: 4.9, reviews:  9430, emoji: '🐟', color: '#F9C11A', region: 'Middle East',    ...ll(25.2,  55.3) },
  { id: 12, name: 'Mikla',              city: 'Istanbul', country: 'Turkey',       cuisine: 'Anatolian',         specialty: 'Meze Tasting',           rating: 4.8, reviews:  8340, emoji: '🫙', color: '#C47C30', region: 'Middle East',    ...ll(41.0,  28.9) },
  // ── Europe ─────────────────────────────────────────────────────────────────
  { id: 13, name: 'Le Jules Verne',      city: 'Paris',    country: 'France',       cuisine: 'French Haute',      specialty: 'Foie Gras & Truffle',    rating: 4.8, reviews:  7890, emoji: '🥐', color: '#E63329', region: 'Europe',         ...ll(48.9,   2.3) },
  { id: 14, name: 'Osteria Francescana', city: 'Modena',   country: 'Italy',        cuisine: 'Italian',           specialty: '5 Ages of Parmigiano',   rating: 4.9, reviews:  5670, emoji: '🍝', color: '#F47B20', region: 'Europe',         ...ll(44.6,  10.9) },
  { id: 15, name: 'Brat',               city: 'London',   country: 'UK',           cuisine: 'British',           specialty: 'Turbot on Wood Grill',   rating: 4.7, reviews:  6120, emoji: '🐟', color: '#C47C30', region: 'Europe',         ...ll(51.5,  -0.1) },
  { id: 16, name: 'Disfrutar',          city: 'Barcelona',country: 'Spain',        cuisine: 'Avant-garde',       specialty: 'Multi-spherication',     rating: 4.9, reviews:  4830, emoji: '🫧', color: '#E63329', region: 'Europe',         ...ll(41.4,   2.2) },
  { id: 17, name: 'Geranium',           city: 'Copenhagen',country:'Denmark',      cuisine: 'Nordic',            specialty: 'Sea Buckthorn Granite',  rating: 4.9, reviews:  3920, emoji: '🌿', color: '#5D8A3C', region: 'Europe',         ...ll(55.7,  12.6) },
  { id: 18, name: 'White Rabbit',       city: 'Moscow',   country: 'Russia',       cuisine: 'Russian Modern',    specialty: 'Reimagined Olivier',     rating: 4.8, reviews:  4320, emoji: '🥗', color: '#C47C30', region: 'Europe',         ...ll(55.8,  37.6) },
  // ── Africa ─────────────────────────────────────────────────────────────────
  { id: 19, name: 'La Maison Arabe',    city: 'Marrakech',country: 'Morocco',      cuisine: 'Moroccan',          specialty: 'Chicken Pastilla',       rating: 4.8, reviews:  7230, emoji: '🫔', color: '#F9C11A', region: 'Africa',         ...ll(31.6,  -8.0) },
  { id: 20, name: 'Carnivore',          city: 'Nairobi',  country: 'Kenya',        cuisine: 'East African',      specialty: 'Nyama Choma',            rating: 4.7, reviews:  9870, emoji: '🍖', color: '#E63329', region: 'Africa',         ...ll(-1.3,  36.8) },
  { id: 21, name: 'La Colombe',         city: 'Cape Town',country: 'South Africa', cuisine: 'Contemporary',      specialty: 'Tuna La Colombe Tin',    rating: 4.9, reviews:  5430, emoji: '🐟', color: '#C47C30', region: 'Africa',         ...ll(-33.9, 18.4) },
  // ── Americas ───────────────────────────────────────────────────────────────
  { id: 22, name: 'Eleven Madison Park', city:'New York', country: 'USA',          cuisine: 'Contemporary American', specialty: 'Celery Root Shawarma', rating: 4.9, reviews: 14560, emoji: '🌿', color: '#5D8A3C', region: 'Americas',      ...ll(40.7, -74.0) },
  { id: 23, name: 'Quintonil',          city: 'Mexico City',country:'Mexico',      cuisine: 'Mexican',           specialty: 'Corn Tetela',            rating: 4.8, reviews:  7890, emoji: '🌽', color: '#F9C11A', region: 'Americas',       ...ll(19.4, -99.1) },
  { id: 24, name: 'Joe Beef',           city: 'Montreal', country: 'Canada',       cuisine: 'Quebecois',         specialty: 'Bone Marrow Mille-Feuille', rating: 4.7, reviews: 5430, emoji: '🍁', color: '#C47C30', region: 'Americas',    ...ll(45.5, -73.6) },
  { id: 25, name: 'Central',            city: 'Lima',     country: 'Peru',         cuisine: 'Peruvian',          specialty: 'Amazon Altitude',        rating: 4.9, reviews:  6780, emoji: '🫘', color: '#F47B20', region: 'Americas',       ...ll(-12.0,-77.0) },
  { id: 26, name: 'Don Julio',          city: 'Buenos Aires',country:'Argentina',  cuisine: 'Argentine',         specialty: 'Dry-aged Asado',         rating: 4.8, reviews: 10230, emoji: '🥩', color: '#E63329', region: 'Americas',       ...ll(-34.6,-58.4) },
  // ── Oceania ────────────────────────────────────────────────────────────────
  { id: 27, name: 'Quay',              city: 'Sydney',    country: 'Australia',    cuisine: 'Contemporary',      specialty: 'Snow Egg Dessert',       rating: 4.8, reviews:  6780, emoji: '🦐', color: '#F47B20', region: 'Oceania',        ...ll(-33.9, 151.2) },
  { id: 28, name: 'Attica',            city: 'Melbourne', country: 'Australia',    cuisine: 'Australian',        specialty: 'Flinders Island Wallaby',rating: 4.9, reviews:  5230, emoji: '🌿', color: '#5D8A3C', region: 'Oceania',        ...ll(-37.8, 144.9) },
];

const REGIONS = ['All', 'East Asia', 'Southeast Asia', 'South Asia', 'Middle East', 'Europe', 'Africa', 'Americas', 'Oceania'];

// ─────────────────────────────────────────────────────────────────────────────
// STAR RATING
// ─────────────────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill={i <= Math.round(rating) ? '#F9C11A' : 'rgba(253,243,227,0.2)'}>
          <polygon points="5,0.5 6.5,3.8 10,4.2 7.5,6.6 8.1,10 5,8.3 1.9,10 2.5,6.6 0,4.2 3.5,3.8" />
        </svg>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE MAPS-STYLE MARKER PIN
// ─────────────────────────────────────────────────────────────────────────────
function MapMarker({
  restaurant,
  isSelected,
  isFiltered,
  zoom,
  onClick,
}: {
  restaurant: Restaurant;
  isSelected: boolean;
  isFiltered: boolean;
  zoom: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || isSelected;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: -8 }}
      animate={{
        opacity: isFiltered ? 1 : 0.18,
        scale: isFiltered ? 1 : 0.75,
        y: 0,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="absolute cursor-pointer select-none"
      style={{
        left: `${restaurant.x}%`,
        top: `${restaurant.y}%`,
        transform: 'translate(-50%, -100%)',
        zIndex: isSelected ? 50 : hovered ? 40 : 10,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Teardrop pin */}
      <motion.div
        animate={{ scale: active ? 1.25 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="28" height="38" viewBox="0 0 28 38" fill="none">
          <path
            d="M14 0C6.268 0 0 6.268 0 14c0 9.4 12.2 22.4 13.2 23.5a1.1 1.1 0 001.6 0C15.8 36.4 28 23.4 28 14 28 6.268 21.732 0 14 0z"
            fill={isSelected ? '#fff' : restaurant.color}
            stroke={isSelected ? restaurant.color : 'rgba(0,0,0,0.3)'}
            strokeWidth="1.5"
          />
          <circle cx="14" cy="14" r="6" fill={isSelected ? restaurant.color : 'rgba(0,0,0,0.25)'} />
        </svg>
      </motion.div>

      {/* Pulse ring */}
      {(active || isSelected) && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="absolute rounded-full"
          style={{
            width: 28, height: 28,
            top: 0, left: 0,
            background: restaurant.color,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Hover label */}
      <AnimatePresence>
        {hovered && !isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-semibold pointer-events-none"
            style={{
              background: 'rgba(13,5,0,0.95)',
              border: `1px solid ${restaurant.color}50`,
              backdropFilter: 'blur(8px)',
              color: '#FDF3E3',
              boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
            }}
          >
            <span style={{ color: restaurant.color }}>{restaurant.emoji}</span> {restaurant.name}
            <br />
            <span style={{ color: 'rgba(253,243,227,0.45)', fontSize: 9 }}>{restaurant.city}, {restaurant.country}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INFO PANEL (Google Maps-style side card)
// ─────────────────────────────────────────────────────────────────────────────
function InfoPanel({ restaurant, onClose }: { restaurant: Restaurant; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      className="absolute top-3 right-3 bottom-3 w-72 rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(13,5,0,0.96)',
        border: `1px solid ${restaurant.color}35`,
        backdropFilter: 'blur(16px)',
        boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px ${restaurant.color}20`,
        zIndex: 60,
      }}
    >
      {/* Header / "photo" area */}
      <div
        className="relative flex-shrink-0 h-40 flex items-center justify-center"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${restaurant.color}40 0%, rgba(13,5,0,0.8) 70%)`,
          borderBottom: `1px solid ${restaurant.color}20`,
        }}
      >
        <div className="text-7xl">{restaurant.emoji}</div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
          style={{ background: 'rgba(253,243,227,0.1)', color: 'rgba(253,243,227,0.6)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(253,243,227,0.2)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(253,243,227,0.1)'; }}
        >
          ✕
        </button>

        {/* Region badge */}
        <div
          className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: `${restaurant.color}25`, color: restaurant.color, border: `1px solid ${restaurant.color}40` }}
        >
          {restaurant.region}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Name & rating row */}
        <div className="mb-3">
          <h3 className="text-lg font-black leading-tight mb-1" style={{ color: '#FDF3E3' }}>
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-2">
            <Stars rating={restaurant.rating} />
            <span className="text-xs font-bold" style={{ color: '#F9C11A' }}>{restaurant.rating}</span>
            <span className="text-xs" style={{ color: 'rgba(253,243,227,0.35)' }}>
              ({restaurant.reviews.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(253,243,227,0.07)', marginBottom: 12 }} />

        {/* Details */}
        {[
          { icon: '📍', label: 'Location', value: `${restaurant.city}, ${restaurant.country}` },
          { icon: '🍽️', label: 'Cuisine', value: restaurant.cuisine },
          { icon: '⭐', label: 'Signature', value: restaurant.specialty },
        ].map(item => (
          <div key={item.label} className="flex gap-3 mb-3">
            <span className="text-base flex-shrink-0">{item.icon}</span>
            <div>
              <p className="text-xs mb-0.5" style={{ color: 'rgba(253,243,227,0.35)' }}>{item.label}</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(253,243,227,0.85)' }}>{item.value}</p>
            </div>
          </div>
        ))}

        <div style={{ borderTop: '1px solid rgba(253,243,227,0.07)', margin: '12px 0' }} />

        {/* Directions-style button */}
        <button
          className="w-full py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${restaurant.color}, ${restaurant.color}99)`,
            color: '#0D0500',
            boxShadow: `0 4px 20px ${restaurant.color}40`,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)'; }}
        >
          → Explore Cuisine
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD MAP SVG  — simplified continent shapes, dark mode (equirectangular)
// viewBox matches the x/y coordinate system so pins align perfectly
// ─────────────────────────────────────────────────────────────────────────────
function WorldMapSVG() {
  const landColor = '#1A1C14';
  const landStroke = '#252B1C';
  const waterColor = '#080E18';

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ocean fill */}
      <rect width="100" height="100" fill={waterColor} />

      {/* Latitude grid lines */}
      {[10, 20, 30, 40, 50, 60, 70, 80].map(y => (
        <line key={y} x1="0" y1={y} x2="100" y2={y}
          stroke="rgba(249,193,26,0.035)" strokeWidth="0.15" />
      ))}
      {/* Longitude grid lines */}
      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="100"
          stroke="rgba(249,193,26,0.035)" strokeWidth="0.15" />
      ))}
      {/* Equator */}
      <line x1="0" y1="50" x2="100" y2="50"
        stroke="rgba(249,193,26,0.07)" strokeWidth="0.2" strokeDasharray="1,2" />
      {/* Prime Meridian */}
      <line x1="50" y1="0" x2="50" y2="100"
        stroke="rgba(249,193,26,0.07)" strokeWidth="0.2" strokeDasharray="1,2" />

      {/* ── North America ── */}
      <path
        d="M 5,14 L 15,11 L 25,11 L 33,12 L 34,15 L 30,15.5
           L 29,20 L 26,20 L 24.5,18.5 L 19,18.5 L 17,22.5
           L 21,24 L 22,27 L 19,27 L 17,24 L 16,14 L 10,14.5 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.2"
      />
      {/* Greenland */}
      <path d="M 35,7 L 42,6 L 44,11 L 39,13 L 36,10 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.15" />
      {/* Alaska separate notch */}
      <path d="M 5,14 L 8,12 L 10,14.5 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.15" />

      {/* ── South America ── */}
      <path
        d="M 22,27 L 29,26 L 36,23 L 38,29 L 37,34 L 33,38
           L 31,38.5 L 29,44.5 L 26,44 L 23,40 L 21,33 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.2"
      />

      {/* ── Europe ── */}
      <path
        d="M 44,12 L 51,10.5 L 55,11 L 57,14 L 55.5,16
           L 57.5,19.5 L 53,21 L 49.5,20 L 48.5,18
           L 46,17.5 L 44,14.5 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.2"
      />
      {/* Scandinavian peninsula */}
      <path d="M 51,10.5 L 55,9 L 57,6.5 L 53,6 L 51,10.5 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.15" />
      {/* UK approximate */}
      <path d="M 48,13 L 50,12.5 L 50,15 L 48.5,15.5 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.15" />

      {/* ── Africa ── */}
      <path
        d="M 46.5,17.5 L 57,17 L 61,20.5 L 63,26
           L 62.5,31 L 58,39.5 L 53,46 L 49,44
           L 45,37 L 44,28 L 45.5,21 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.2"
      />
      {/* Madagascar */}
      <path d="M 62,38 L 63.5,37 L 64,41 L 62.5,42 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.12" />

      {/* ── Asia main body ── */}
      <path
        d="M 57,11 L 75,10 L 90,10 L 97,13.5
           L 95,19 L 87,23.5 L 82,27.5 L 75,29
           L 69,29.5 L 63,25 L 59,19 L 57.5,15
           L 57,11 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.2"
      />
      {/* Arabia peninsula */}
      <path d="M 58,19.5 L 63,17.5 L 66.5,24 L 61,25 L 57.5,22 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.15" />
      {/* India peninsula */}
      <path d="M 67,22.5 L 74,21 L 75.5,29 L 72,31 L 69,29.5 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.15" />
      {/* SE Asia peninsula */}
      <path d="M 82,24 L 87,23.5 L 87,30 L 83,29 L 81,27 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.15" />
      {/* Japan */}
      <path d="M 88.5,15 L 91,14 L 92,17.5 L 89,18.5 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.12" />
      {/* Sumatra/Borneo hint */}
      <path d="M 79,28 L 86,27 L 87,30 L 83,31 L 79,30 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.12" />
      {/* Sri Lanka */}
      <path d="M 73.5,30 L 74.5,29.5 L 74.8,31 L 73.8,31.3 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.1" />

      {/* ── Australia ── */}
      <path
        d="M 78,31 L 91,27 L 95,31 L 93,38.5 L 87,40.5
           L 80,40 L 76,36 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.2"
      />
      {/* New Zealand */}
      <path d="M 97,37 L 98.5,37.5 L 98,40 L 97,39.5 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.12" />
      {/* Tasmania */}
      <path d="M 88.5,40 L 90,40 L 90,41.5 L 88.5,41 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.1" />

      {/* ── Siberia / Russia extension ── */}
      <path d="M 57,11 L 75,10 L 90,10 L 70,8 L 57,9 Z"
        fill={landColor} stroke={landStroke} strokeWidth="0.15" />

      {/* ── Antarctic hint ── */}
      <path d="M 0,90 L 100,90 L 100,100 L 0,100 Z"
        fill={landColor} opacity="0.4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ZOOM CONTROLS
// ─────────────────────────────────────────────────────────────────────────────
function ZoomControls({ zoom, onZoom }: { zoom: number; onZoom: (v: number) => void }) {
  const btn = (label: string, delta: number, disabled: boolean) => (
    <button
      onClick={() => !disabled && onZoom(Math.max(1, Math.min(2.5, zoom + delta)))}
      disabled={disabled}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200"
      style={{
        background: 'rgba(13,5,0,0.9)',
        color: disabled ? 'rgba(253,243,227,0.2)' : 'rgba(253,243,227,0.75)',
        border: '1px solid rgba(253,243,227,0.12)',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {label}
    </button>
  );
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-30">
      {btn('+', 0.4, zoom >= 2.5)}
      {btn('−', -0.4, zoom <= 1)}
      <button
        onClick={() => onZoom(1)}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-xs transition-all duration-200"
        style={{
          background: 'rgba(13,5,0,0.9)',
          color: 'rgba(253,243,227,0.5)',
          border: '1px solid rgba(253,243,227,0.12)',
        }}
        title="Reset zoom"
      >
        ⊡
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY CARD
// ─────────────────────────────────────────────────────────────────────────────
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
      className="relative rounded-2xl p-6 border overflow-hidden cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? `${info.color}50` : `${info.color}15`,
        background: hovered ? `${info.color}10` : 'rgba(253,243,227,0.02)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="absolute inset-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${info.color}15 0%, transparent 70%)`, opacity: hovered ? 1 : 0 }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: info.color }}>Group {catNum}</span>
          <span className="text-xs" style={{ color: 'rgba(253,243,227,0.3)' }}>{foodItems.filter(f => f.category === catNum).length} items</span>
        </div>
        <h3 className="text-2xl font-black mb-1" style={{ color: 'var(--food-cream)' }}>{info.name}</h3>
        <p className="text-xs mb-5" style={{ color: 'rgba(253,243,227,0.4)' }}>{info.subtitle}</p>
        <div className="grid grid-cols-2 gap-2">
          {foods.map(food => (
            <div key={food.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: `${info.color}08` }}>
              <span className="text-base">{food.emoji}</span>
              <span className="text-xs truncate" style={{ color: 'rgba(253,243,227,0.65)' }}>{food.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function FoodAtlas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeRegion, setActiveRegion] = useState('All');
  const [zoom, setZoom] = useState(1);

  const selected = useMemo(() => restaurants.find(r => r.id === selectedId) ?? null, [selectedId]);

  const isFiltered = useCallback(
    (r: Restaurant) => activeRegion === 'All' || r.region === activeRegion,
    [activeRegion]
  );

  const handleMarkerClick = useCallback((id: number) => {
    setSelectedId(prev => prev === id ? null : id);
  }, []);

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    setSelectedId(null);
  };

  return (
    <section id="food-atlas" className="relative py-32 px-4" style={{ background: '#0D0500' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(249,193,26,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── HEADER ── */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(249,193,26,0.6)' }}>
              ✦ Food Origins Atlas ✦
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6" style={{ color: 'var(--food-cream)' }}>
              WORLD
              <br />
              <span style={{ background: 'linear-gradient(135deg, #F9C11A, #F47B20)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                RESTAURANTS
              </span>
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: 'rgba(253,243,227,0.4)' }}>
              Jelajahi restoran-restoran ikonik dari seluruh penjuru dunia. Klik pin untuk melihat detail.
            </p>
          </motion.div>
        </div>

        {/* ── REGION FILTER TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-5"
        >
          {REGIONS.map(region => (
            <button
              key={region}
              onClick={() => handleRegionChange(region)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: activeRegion === region ? 'linear-gradient(135deg, #F9C11A, #F47B20)' : 'rgba(253,243,227,0.06)',
                color: activeRegion === region ? '#0D0500' : 'rgba(253,243,227,0.55)',
                border: activeRegion === region ? 'none' : '1px solid rgba(253,243,227,0.1)',
              }}
            >
              {region}
            </button>
          ))}
        </motion.div>

        {/* ── MAP CONTAINER ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative mb-24 rounded-3xl overflow-hidden"
          style={{
            height: '520px',
            background: '#080E18',
            border: '1px solid rgba(249,193,26,0.1)',
            boxShadow: '0 0 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(249,193,26,0.05)',
          }}
        >
          {/* Zoomable inner */}
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* SVG World Map */}
            <WorldMapSVG />

            {/* Restaurant markers */}
            {restaurants.map(r => (
              <MapMarker
                key={r.id}
                restaurant={r}
                isSelected={selectedId === r.id}
                isFiltered={isFiltered(r)}
                zoom={zoom}
                onClick={() => handleMarkerClick(r.id)}
              />
            ))}
          </div>

          {/* Info Panel (outside zoom wrapper so it doesn't scale) */}
          <AnimatePresence>
            {selected && (
              <InfoPanel
                restaurant={selected}
                onClose={() => setSelectedId(null)}
              />
            )}
          </AnimatePresence>

          {/* Zoom Controls */}
          <ZoomControls zoom={zoom} onZoom={setZoom} />

          {/* Map attribution */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <p className="text-xs" style={{ color: 'rgba(253,243,227,0.18)' }}>
              Culinarax Food Atlas • {restaurants.filter(isFiltered).length} locations
            </p>
          </div>

          {/* Top-left label */}
          <div className="absolute top-4 left-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#F9C11A' }} />
            <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: 'rgba(253,243,227,0.4)' }}>
              Interactive Map
            </p>
          </div>

          {/* Vignette overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{ boxShadow: 'inset 0 0 80px rgba(8,14,24,0.6)' }} />
        </motion.div>

        {/* ── STATS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {[
            { label: 'Restaurants', value: restaurants.length, icon: '🏪' },
            { label: 'Countries', value: new Set(restaurants.map(r => r.country)).size, icon: '🌍' },
            { label: 'Regions', value: REGIONS.length - 1, icon: '🗺️' },
            { label: 'Avg Rating', value: (restaurants.reduce((s, r) => s + r.rating, 0) / restaurants.length).toFixed(1), icon: '⭐' },
          ].map(stat => (
            <div key={stat.label}
              className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(253,243,227,0.03)', border: '1px solid rgba(253,243,227,0.07)' }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-black" style={{ color: '#F9C11A' }}>{stat.value}</p>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(253,243,227,0.35)' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── CATEGORY CARDS ── */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(249,193,26,0.5)' }}>✦ Collections ✦</p>
            <h3 className="text-3xl font-black" style={{ color: 'var(--food-cream)' }}>Food Groups</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {([1, 2, 3, 4] as const).map(cat => (
              <CategoryCard key={cat} catNum={cat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
