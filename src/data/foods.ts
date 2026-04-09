export interface FoodItem {
  id: string;
  name: string;
  category: 1 | 2 | 3 | 4;
  color: string;
  accent: string;
  emoji: string;
  description: string;
  origin?: string;
}

export const foodItems: FoodItem[] = [
  // Group 1 - Staples, grains, legumes, basic proteins
  { id: 'adzuki', name: 'Adzuki Bean', category: 1, color: '#8B1A1A', accent: '#C4503A', emoji: '🫘', description: 'Sweet red legume, beloved in East Asian desserts', origin: 'Japan' },
  { id: 'almond', name: 'Almond', category: 1, color: '#C9956C', accent: '#E8B88A', emoji: '🥜', description: 'Versatile tree nut, rich in healthy fats', origin: 'Mediterranean' },
  { id: 'anchovy', name: 'Anchovy', category: 1, color: '#4A6741', accent: '#7A9970', emoji: '🐟', description: 'Tiny, umami-packed saltwater fish', origin: 'Mediterranean' },
  { id: 'bacon', name: 'Bacon', category: 1, color: '#C0392B', accent: '#E74C3C', emoji: '🥓', description: 'Cured and smoked pork belly, crispy perfection', origin: 'Europe' },
  { id: 'barley', name: 'Barley', category: 1, color: '#C9A96E', accent: '#E8C9A0', emoji: '🌾', description: 'Ancient cereal grain, hearty and nutritious', origin: 'Middle East' },
  { id: 'cornmeal', name: 'Cornmeal', category: 1, color: '#F9C11A', accent: '#FFD966', emoji: '🌽', description: 'Ground corn, the base of polenta and grits', origin: 'Americas' },
  { id: 'couscous', name: 'Couscous', category: 1, color: '#D4B896', accent: '#EDD5B8', emoji: '🍚', description: 'Tiny steamed pasta from North Africa', origin: 'North Africa' },
  { id: 'crab', name: 'Crab', category: 1, color: '#E8522A', accent: '#F47B20', emoji: '🦀', description: 'Tender ocean crustacean, sweet and briny', origin: 'Coastal' },
  { id: 'duck', name: 'Duck', category: 1, color: '#8B5E3C', accent: '#B5803A', emoji: '🍗', description: 'Rich, fatty poultry with crispy skin', origin: 'China' },
  { id: 'edamame', name: 'Edamame', category: 1, color: '#5D8A3C', accent: '#8DC63F', emoji: '🫛', description: 'Young soybeans, fresh and protein-rich', origin: 'Japan' },
  
  // Group 2 - Fruits, vegetables, fresh produce
  { id: 'apple', name: 'Apple', category: 2, color: '#C0392B', accent: '#E74C3C', emoji: '🍎', description: 'Crisp and sweet, thousands of varieties', origin: 'Central Asia' },
  { id: 'apricot', name: 'Apricot', category: 2, color: '#F47B20', accent: '#FFA033', emoji: '🍑', description: 'Velvety stone fruit, sun-kissed sweetness', origin: 'China' },
  { id: 'arugula', name: 'Arugula', category: 2, color: '#2D6A4F', accent: '#52B788', emoji: '🥗', description: 'Peppery rocket leaves, bold and distinctive', origin: 'Mediterranean' },
  { id: 'avocado', name: 'Avocado', category: 2, color: '#2D6A4F', accent: '#74C69D', emoji: '🥑', description: 'Creamy green superfood from tropical Americas', origin: 'Mexico' },
  { id: 'banana', name: 'Banana', category: 2, color: '#F9C11A', accent: '#FFD966', emoji: '🍌', description: 'Curved tropical fruit, naturally sweet and filling', origin: 'Southeast Asia' },
  { id: 'mango', name: 'Mango', category: 2, color: '#F47B20', accent: '#FFAD47', emoji: '🥭', description: 'King of tropical fruits, intensely aromatic', origin: 'South Asia' },
  { id: 'rambutan', name: 'Rambutan', category: 2, color: '#C0392B', accent: '#E74C3C', emoji: '🍈', description: 'Exotic hairy fruit, sweet and translucent inside', origin: 'Southeast Asia' },
  { id: 'raspberry', name: 'Raspberry', category: 2, color: '#C0185D', accent: '#E91E8C', emoji: '🫐', description: 'Delicate jewel-toned berry, bright and tart', origin: 'Europe' },
  { id: 'asparagus', name: 'Asparagus', category: 2, color: '#4A7C59', accent: '#70B88D', emoji: '🌿', description: 'Elegant spring vegetable with earthy flavor', origin: 'Mediterranean' },
  { id: 'radish', name: 'Radish', category: 2, color: '#E63329', accent: '#FF6B6B', emoji: '🔴', description: 'Peppery root, crisp and refreshing', origin: 'Asia' },
  
  // Group 3 - Breads, flatbreads, baked goods
  { id: 'brioche', name: 'Brioche', category: 3, color: '#C9843A', accent: '#E8A857', emoji: '🍞', description: 'Buttery, pillowy French bread enriched with eggs', origin: 'France' },
  { id: 'challah', name: 'Challah', category: 3, color: '#D4A055', accent: '#E8C07A', emoji: '🥐', description: 'Braided ceremonial bread, golden and soft', origin: 'Jewish tradition' },
  { id: 'scone', name: 'Scone', category: 3, color: '#C09050', accent: '#DDB882', emoji: '🫓', description: 'Crumbly British teatime classic', origin: 'Scotland' },
  { id: 'simit', name: 'Simit', category: 3, color: '#C27C37', accent: '#E09A55', emoji: '🥯', description: 'Sesame-crusted Turkish bread ring', origin: 'Turkey' },
  { id: 'khachapuri', name: 'Khachapuri', category: 3, color: '#D4A055', accent: '#FFD080', emoji: '🥘', description: 'Georgian cheese bread with egg, bread as a bowl', origin: 'Georgia' },
  { id: 'shokupan', name: 'Shokupan', category: 3, color: '#EDD8B0', accent: '#F5E8D0', emoji: '🍞', description: 'Ultra-soft Japanese milk bread, cloud-like', origin: 'Japan' },
  { id: 'lavash', name: 'Lavash', category: 3, color: '#C9A06A', accent: '#E0C090', emoji: '🫓', description: 'Thin flatbread from the Caucasus, crispy-soft', origin: 'Armenia' },
  { id: 'burek', name: 'Burek', category: 3, color: '#C87833', accent: '#E0A050', emoji: '🥐', description: 'Flaky phyllo pastry filled with cheese or meat', origin: 'Balkans' },
  { id: 'kaak', name: 'Kaak', category: 3, color: '#C08040', accent: '#D8A865', emoji: '🫙', description: 'Middle Eastern ring-shaped sesame cookie', origin: 'Levant' },
  { id: 'breadroll', name: 'Bread Roll', category: 3, color: '#C89050', accent: '#E0B070', emoji: '🍞', description: 'Classic soft roll, the foundation of sandwiches', origin: 'Europe' },
  
  // Group 4 - Breakfast, porridge, morning dishes
  { id: 'appam', name: 'Appam', category: 4, color: '#F5E8D0', accent: '#FFF0D8', emoji: '🥞', description: 'Lacy fermented rice pancake from South India', origin: 'India' },
  { id: 'hardbiledegg', name: 'Hard-boiled Egg', category: 4, color: '#FDF3E3', accent: '#F9C11A', emoji: '🥚', description: 'Perfect protein, simple and universal', origin: 'Universal' },
  { id: 'paperdosa', name: 'Paper Dosa', category: 4, color: '#D4A055', accent: '#E8C070', emoji: '🫓', description: 'Incredibly thin crispy South Indian crêpe', origin: 'South India' },
  { id: 'arrozcaldo', name: 'Arroz Caldo', category: 4, color: '#E8C87A', accent: '#FFD990', emoji: '🍲', description: 'Filipino ginger rice porridge, comfort in a bowl', origin: 'Philippines' },
  { id: 'hashbrowns', name: 'Hash Browns', category: 4, color: '#C07830', accent: '#E09A45', emoji: '🥔', description: 'Crispy shredded potato cakes, golden perfection', origin: 'USA' },
  { id: 'poachedegg', name: 'Poached Egg', category: 4, color: '#FDF3E3', accent: '#F9C11A', emoji: '🍳', description: 'Silky egg whites, runny golden yolk', origin: 'France' },
  { id: 'porridge', name: 'Porridge', category: 4, color: '#D4B896', accent: '#EDD5B8', emoji: '🥣', description: 'Nourishing oat porridge, infinitely customizable', origin: 'Scotland' },
  { id: 'cereal', name: 'Cereal', category: 4, color: '#F9C11A', accent: '#FFD966', emoji: '🥣', description: 'Colorful morning ritual, nostalgic and fun', origin: 'USA' },
  { id: 'huevosrancheros', name: 'Huevos Rancheros', category: 4, color: '#C0392B', accent: '#E74C3C', emoji: '🍳', description: 'Mexican ranch eggs with bold salsa and tortilla', origin: 'Mexico' },
  { id: 'biscuitsgravy', name: 'Biscuits & Gravy', category: 4, color: '#D4B896', accent: '#A0784A', emoji: '🍽️', description: 'Southern comfort classic, rich and hearty', origin: 'USA' },
];

export const foodByCategory = {
  1: foodItems.filter(f => f.category === 1),
  2: foodItems.filter(f => f.category === 2),
  3: foodItems.filter(f => f.category === 3),
  4: foodItems.filter(f => f.category === 4),
};

export const categoryInfo = {
  1: { name: 'Galaxy Staples', subtitle: 'Grains, Legumes & Proteins', color: '#E63329', bg: 'from-red-950 to-orange-950' },
  2: { name: 'Stellar Garden', subtitle: 'Fruits, Vegetables & Fresh', color: '#52B788', bg: 'from-green-950 to-emerald-950' },
  3: { name: 'Bread Universe', subtitle: 'Breads, Flatbreads & Baked', color: '#C9843A', bg: 'from-amber-950 to-yellow-950' },
  4: { name: 'Breakfast Cosmos', subtitle: 'Morning Dishes & Porridges', color: '#F9C11A', bg: 'from-yellow-950 to-orange-950' },
};
