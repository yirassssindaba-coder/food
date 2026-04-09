import { foodItems } from '../data/foods';

export default function MarqueeStrip() {
  const items = [...foodItems, ...foodItems];

  return (
    <div
      className="relative py-4 overflow-hidden border-y"
      style={{
        borderColor: 'rgba(253,243,227,0.06)',
        background: 'rgba(253,243,227,0.02)',
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((food, i) => (
          <span
            key={`${food.id}-${i}`}
            className="inline-flex items-center gap-2 px-6 text-xs tracking-widest uppercase"
            style={{ color: 'rgba(253,243,227,0.3)' }}
          >
            <span>{food.emoji}</span>
            <span>{food.name}</span>
            <span style={{ color: 'rgba(253,243,227,0.1)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
