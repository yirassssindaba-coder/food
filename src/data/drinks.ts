export interface DrinkEntry {
  id: string;
  name: string;
  origin: string;
  category: DrinkCategory;
  basis: string;
  emoji: string;
  alcohol: 'Non-alkohol' | 'Non-alkohol rendah' | 'Alkohol sangat rendah' | 'Alkohol';
  note: string;
}

export type DrinkCategory =
  | 'teh-infus'
  | 'kopi-kakao'
  | 'susu-yogurt'
  | 'buah-penyegar'
  | 'fermentasi'
  | 'spirit-cocktail';

export interface DrinkCategoryInfo {
  key: DrinkCategory;
  label: string;
  emoji: string;
  color: string;
  character: string;
}

export const drinkCategories: DrinkCategoryInfo[] = [
  { key: 'teh-infus',     label: 'Teh & Infus',        emoji: '🍵', color: '#A8D8A8', character: 'Hangat / dingin / herbal' },
  { key: 'kopi-kakao',    label: 'Kopi & Kakao',        emoji: '☕', color: '#C4A882', character: 'Berkafein / creamy / dessert' },
  { key: 'susu-yogurt',   label: 'Susu, Yogurt & Grain', emoji: '🥛', color: '#B8C4E0', character: 'Lembut / gurih / sarapan' },
  { key: 'buah-penyegar', label: 'Buah & Penyegar',     emoji: '🍹', color: '#FFB347', character: 'Segar / asam / manis' },
  { key: 'fermentasi',    label: 'Fermentasi',           emoji: '🫧', color: '#98D8C8', character: 'Probiotik / rustic' },
  { key: 'spirit-cocktail', label: 'Spirit & Cocktail', emoji: '🍸', color: '#E8A0BF', character: 'Strong / mixed drinks' },
];

export const drinkEntries: DrinkEntry[] = [
  // ── Teh & Infus ──────────────────────────────────────────
  { id: 'sencha',         name: 'Sencha',           origin: 'Jepang',            category: 'teh-infus',     basis: 'Teh hijau',          alcohol: 'Non-alkohol', emoji: '🍵', note: 'Teh hijau kukus dengan rasa vegetal.' },
  { id: 'masala-chai-d',  name: 'Masala Chai',      origin: 'India',             category: 'teh-infus',     basis: 'Teh susu rempah',    alcohol: 'Non-alkohol', emoji: '☕', note: 'Teh hitam direbus bersama susu dan rempah.' },
  { id: 'ataya-d',        name: 'Ataya',            origin: 'Senegal',           category: 'teh-infus',     basis: 'Teh hijau',          alcohol: 'Non-alkohol', emoji: '🍵', note: 'Seduhan sangat pekat yang dituang tinggi.' },
  { id: 'rooibos-d',      name: 'Rooibos',          origin: 'Afrika Selatan',    category: 'teh-infus',     basis: 'Herbal',             alcohol: 'Non-alkohol', emoji: '🍵', note: 'Infus merah alami tanpa kafein.' },
  { id: 'mint-tea',       name: 'Mint Tea',         origin: 'Maroko',            category: 'teh-infus',     basis: 'Teh hijau + mint',   alcohol: 'Non-alkohol', emoji: '🍵', note: 'Teh manis harum mint, disajikan hangat.' },
  { id: 'yerba-mate-d',   name: 'Yerba Mate',       origin: 'Southern Cone',     category: 'teh-infus',     basis: 'Infus daun mate',    alcohol: 'Non-alkohol', emoji: '🫖', note: 'Minuman sosial khas Argentina–Uruguay–Paraguay.' },
  { id: 'butter-tea',     name: 'Butter Tea',       origin: 'Tibet',             category: 'teh-infus',     basis: 'Teh gurih',          alcohol: 'Non-alkohol', emoji: '🍵', note: 'Teh dengan mentega dan garam.' },
  { id: 'hk-milk-tea-d',  name: 'Hong Kong Milk Tea', origin: 'Hong Kong',      category: 'teh-infus',     basis: 'Teh susu',           alcohol: 'Non-alkohol', emoji: '🧋', note: 'Teh hitam kuat dengan susu evaporasi.' },

  // ── Kopi & Kakao ─────────────────────────────────────────
  { id: 'espresso-d',     name: 'Espresso',          origin: 'Italia',           category: 'kopi-kakao',    basis: 'Kopi',               alcohol: 'Non-alkohol', emoji: '☕', note: 'Shot kopi pekat sebagai dasar banyak minuman.' },
  { id: 'flat-white',     name: 'Flat White',        origin: 'Australia / NZ',   category: 'kopi-kakao',    basis: 'Kopi susu',          alcohol: 'Non-alkohol', emoji: '☕', note: 'Espresso dengan microfoam tipis.' },
  { id: 'cafe-de-olla',   name: 'Café de Olla',      origin: 'Meksiko',          category: 'kopi-kakao',    basis: 'Kopi rempah',        alcohol: 'Non-alkohol', emoji: '☕', note: 'Kopi dengan piloncillo dan kayu manis.' },
  { id: 'viet-iced-d',    name: 'Vietnamese Iced Coffee', origin: 'Vietnam',     category: 'kopi-kakao',    basis: 'Kopi susu',          alcohol: 'Non-alkohol', emoji: '☕', note: 'Kopi phin dengan susu kental manis.' },
  { id: 'turk-kahvesi',   name: 'Türk Kahvesi',      origin: 'Türkiye',          category: 'kopi-kakao',    basis: 'Kopi',               alcohol: 'Non-alkohol', emoji: '☕', note: 'Kopi bubuk sangat halus dimasak dalam cezve.' },
  { id: 'mochaccino',     name: 'Mochaccino',        origin: 'Global',           category: 'kopi-kakao',    basis: 'Kopi + cokelat',     alcohol: 'Non-alkohol', emoji: '☕', note: 'Perpaduan espresso, cokelat, dan susu.' },
  { id: 'hot-chocolate',  name: 'Hot Chocolate',     origin: 'Eropa / Global',   category: 'kopi-kakao',    basis: 'Kakao',              alcohol: 'Non-alkohol', emoji: '🍫', note: 'Minuman kakao manis dan creamy.' },
  { id: 'iced-matcha',    name: 'Iced Matcha Latte', origin: 'Jepang / Global',  category: 'kopi-kakao',    basis: 'Teh bubuk',          alcohol: 'Non-alkohol', emoji: '🍵', note: 'Matcha dan susu, dingin dan lembut.' },

  // ── Susu, Yogurt & Grain ─────────────────────────────────
  { id: 'ayran-d',        name: 'Ayran',             origin: 'Türkiye',          category: 'susu-yogurt',   basis: 'Yogurt drink',       alcohol: 'Non-alkohol', emoji: '🥛', note: 'Yogurt asin yang menyegarkan.' },
  { id: 'doogh',          name: 'Doogh',             origin: 'Iran',             category: 'susu-yogurt',   basis: 'Yogurt drink',       alcohol: 'Non-alkohol', emoji: '🥛', note: 'Mirip ayran, kadang berkarbonasi ringan.' },
  { id: 'lassi',          name: 'Lassi',             origin: 'India',            category: 'susu-yogurt',   basis: 'Yogurt',             alcohol: 'Non-alkohol', emoji: '🥛', note: 'Bisa manis, asin, atau berbuah.' },
  { id: 'mango-lassi-d',  name: 'Mango Lassi',       origin: 'India',            category: 'susu-yogurt',   basis: 'Yogurt buah',        alcohol: 'Non-alkohol', emoji: '🥭', note: 'Versi lassi yang manis dan lembut.' },
  { id: 'horchata-d',     name: 'Horchata',          origin: 'Meksiko / Spanyol', category: 'susu-yogurt',  basis: 'Beras / kacang',     alcohol: 'Non-alkohol', emoji: '🥛', note: 'Minuman manis dingin berbasis biji/beras.' },
  { id: 'atole',          name: 'Atole',             origin: 'Meksiko',          category: 'susu-yogurt',   basis: 'Jagung hangat',      alcohol: 'Non-alkohol', emoji: '🥣', note: 'Minuman tepung jagung kental.' },
  { id: 'sahlab',         name: 'Sahlab',            origin: 'Timur Tengah',     category: 'susu-yogurt',   basis: 'Susu panas',         alcohol: 'Non-alkohol', emoji: '🥛', note: 'Minuman susu kental dengan aroma floral.' },
  { id: 'kefir',          name: 'Kefir',             origin: 'Kaukasus / Global', category: 'susu-yogurt',  basis: 'Fermented dairy',    alcohol: 'Non-alkohol', emoji: '🫙', note: 'Susu fermentasi probiotik.' },

  // ── Buah & Penyegar ──────────────────────────────────────
  { id: 'jallab-d',       name: 'Jallab',            origin: 'Levant',           category: 'buah-penyegar', basis: 'Sirup kurma/anggur', alcohol: 'Non-alkohol', emoji: '🍹', note: 'Minuman dingin manis aromatik.' },
  { id: 'sorrel',         name: 'Sorrel',            origin: 'Karibia',          category: 'buah-penyegar', basis: 'Hibiscus',           alcohol: 'Non-alkohol', emoji: '🌺', note: 'Asam-manis dengan jahe dan rempah.' },
  { id: 'agua-fresca',    name: 'Agua Fresca',       origin: 'Meksiko',          category: 'buah-penyegar', basis: 'Buah / benih',       alcohol: 'Non-alkohol', emoji: '🍹', note: 'Kategori minuman buah encer dingin.' },
  { id: 'limonana',       name: 'Limonana',          origin: 'Levant',           category: 'buah-penyegar', basis: 'Lemon + mint',       alcohol: 'Non-alkohol', emoji: '🍋', note: 'Lemonade mint yang sangat segar.' },
  { id: 'kompot',         name: 'Kompot',            origin: 'Eropa Timur',      category: 'buah-penyegar', basis: 'Buah rebus',         alcohol: 'Non-alkohol', emoji: '🍑', note: 'Infus buah manis hangat atau dingin.' },
  { id: 'calamansi',      name: 'Calamansi Juice',   origin: 'Filipina',         category: 'buah-penyegar', basis: 'Citrus',             alcohol: 'Non-alkohol', emoji: '🍊', note: 'Asam segar khas Asia Tenggara.' },
  { id: 'bandung',        name: 'Bandung',           origin: 'Malaysia / Singapura', category: 'buah-penyegar', basis: 'Rose syrup + milk', alcohol: 'Non-alkohol', emoji: '🥤', note: 'Minuman merah muda populer.' },
  { id: 'nimbu-pani',     name: 'Nimbu Pani',        origin: 'India',            category: 'buah-penyegar', basis: 'Lemonade',           alcohol: 'Non-alkohol', emoji: '🍋', note: 'Bisa manis atau asin dengan rempah.' },

  // ── Fermentasi ────────────────────────────────────────────
  { id: 'kombucha',       name: 'Kombucha',          origin: 'Tiongkok / Global', category: 'fermentasi',   basis: 'Teh fermentasi',     alcohol: 'Non-alkohol rendah', emoji: '🫧', note: 'Teh berkarbonasi alami.' },
  { id: 'kvass',          name: 'Kvass',             origin: 'Eropa Timur',      category: 'fermentasi',    basis: 'Roti gandum fermentasi', alcohol: 'Alkohol sangat rendah', emoji: '🍺', note: 'Minuman roti asam menyegarkan.' },
  { id: 'switchel',       name: 'Switchel',          origin: 'Karibia / Amerika', category: 'fermentasi',   basis: 'Ginger-vinegar drink', alcohol: 'Non-alkohol', emoji: '🍶', note: 'Penyejuk tradisional manis-asam.' },
  { id: 'jun',            name: 'Jun',               origin: 'Asia / Global',    category: 'fermentasi',    basis: 'Teh fermentasi',     alcohol: 'Non-alkohol rendah', emoji: '🫧', note: 'Mirip kombucha, sering berbasis madu.' },
  { id: 'tepache',        name: 'Tepache',           origin: 'Meksiko',          category: 'fermentasi',    basis: 'Nanas fermentasi',   alcohol: 'Alkohol sangat rendah', emoji: '🍍', note: 'Minuman fermentasi nanas ringan.' },
  { id: 'boza',           name: 'Boza',              origin: 'Türkiye / Balkan', category: 'fermentasi',    basis: 'Grain fermentasi',   alcohol: 'Alkohol sangat rendah', emoji: '🫙', note: 'Minuman grain fermentasi tebal dan manis.' },

  // ── Spirit & Cocktail ─────────────────────────────────────
  { id: 'negroni',        name: 'Negroni',           origin: 'Italia',           category: 'spirit-cocktail', basis: 'Gin + Campari + Vermouth', alcohol: 'Alkohol', emoji: '🍸', note: 'Cocktail bitter-manis ikonik Italia.' },
  { id: 'margarita',      name: 'Margarita',         origin: 'Meksiko',          category: 'spirit-cocktail', basis: 'Tequila + lime',     alcohol: 'Alkohol', emoji: '🍹', note: 'Cocktail asam segar berbasis tequila.' },
  { id: 'mojito',         name: 'Mojito',            origin: 'Kuba',             category: 'spirit-cocktail', basis: 'Rum + mint + lime',  alcohol: 'Alkohol', emoji: '🍹', note: 'Cocktail mint segar asal Kuba.' },
  { id: 'caipirinha',     name: 'Caipirinha',        origin: 'Brasil',           category: 'spirit-cocktail', basis: 'Cachaça + lime',     alcohol: 'Alkohol', emoji: '🍹', note: 'Cocktail nasional Brasil yang segar.' },
  { id: 'pisco-sour',     name: 'Pisco Sour',        origin: 'Peru / Chile',     category: 'spirit-cocktail', basis: 'Pisco + lime + putih telur', alcohol: 'Alkohol', emoji: '🍸', note: 'Cocktail khas Andes berbusa.' },
  { id: 'sake',           name: 'Sake',              origin: 'Jepang',           category: 'spirit-cocktail', basis: 'Beras fermentasi',   alcohol: 'Alkohol', emoji: '🍶', note: 'Wine beras tradisional Jepang.' },
];

export const drinksByCategory: Record<DrinkCategory, DrinkEntry[]> = {
  'teh-infus':       drinkEntries.filter(d => d.category === 'teh-infus'),
  'kopi-kakao':      drinkEntries.filter(d => d.category === 'kopi-kakao'),
  'susu-yogurt':     drinkEntries.filter(d => d.category === 'susu-yogurt'),
  'buah-penyegar':   drinkEntries.filter(d => d.category === 'buah-penyegar'),
  'fermentasi':      drinkEntries.filter(d => d.category === 'fermentasi'),
  'spirit-cocktail': drinkEntries.filter(d => d.category === 'spirit-cocktail'),
};
