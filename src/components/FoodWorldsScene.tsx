import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';

const sceneColors = [
  { main: '#E63329', secondary: '#F47B20', accent: '#F9C11A' },
  { main: '#C47C30', secondary: '#F9C11A', accent: '#FDF3E3' },
  { main: '#F47B20', secondary: '#E63329', accent: '#F9C11A' },
  { main: '#F9C11A', secondary: '#F47B20', accent: '#FDF3E3' },
];

const scenes = [
  {
    id: 'galaxy-burger',
    title: 'Galaxy Burger',
    subtitle: 'Kelompok 1 — Bahan Pokok & Protein',
    description: 'Burger agung yang melayang di galaksi makanan. Ditemani biji-bijian, kacang, dan protein dari seluruh penjuru semesta.',
    emoji: '🍔',
    foods: ['Adzuki Bean', 'Almond', 'Bacon', 'Barley', 'Cornmeal', 'Edamame', 'Anchovy', 'Crab', 'Duck'],
    shape: 'burger',
  },
  {
    id: 'stellar-hotdog',
    title: 'Stellar Hot Dog',
    subtitle: 'Kelompok 3 — Roti & Produk Panggang',
    description: 'Hot dog panggung utama dengan bun memeluk sosis, mustard, dan ketchup yang tampil jelas seperti model makanan aslinya.',
    emoji: '🌭',
    foods: ['Brioche', 'Challah', 'Simit', 'Khachapuri', 'Shokupan', 'Lavash', 'Burek', 'Kaak', 'Scone'],
    shape: 'hotdog',
  },
  {
    id: 'pizza-cosmos',
    title: 'Pizza Cosmos',
    subtitle: 'Kelompok 2 — Buah & Sayuran',
    description: 'Pizza kosmik dengan topping buah-sayuran segar. Avocado, mango, raspberry, dan asparagus membentuk galaksi warna.',
    emoji: '🍕',
    foods: ['Apple', 'Avocado', 'Mango', 'Raspberry', 'Asparagus', 'Arugula', 'Apricot', 'Banana', 'Radish'],
    shape: 'pizza',
  },
  {
    id: 'macaroni-nebula',
    title: 'Macaroni Nebula',
    subtitle: 'Comfort Bowl — Pasta & Cream',
    description: 'Semangkuk makaroni yang tampil tebal, melengkung, dan mudah dikenali, dengan saus keju, basil, dan aksen rempah yang bergerak lembut di angkasa.',
    emoji: '🧀',
    foods: ['Macaroni', 'Cheese Sauce', 'Butter', 'Cream', 'Parmesan', 'Basil', 'Pepper', 'Tomato'],
    shape: 'macaroni',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: PBR material shorthand
// ─────────────────────────────────────────────────────────────────────────────
function M({
  color,
  emissive,
  ei = 0.28,
  rough = 0.55,
  metal = 0.0,
}: {
  color: string;
  emissive?: string;
  ei?: number;
  rough?: number;
  metal?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={emissive ?? color}
      emissiveIntensity={ei}
      roughness={rough}
      metalness={metal}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALAXY BURGER 🍔
// Clearly stacked layers: bottom bun → sauce → patty → cheese → tomato →
// lettuce → mayo drip → top bun + sesame seeds
// ─────────────────────────────────────────────────────────────────────────────
function BurgerModel() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.35;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
  });

  // Pre-compute sesame positions on the dome surface
  const sesameSeeds = useMemo(() => {
    const seeds: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    const rings = [
      { count: 5, polar: 0.38, radScale: 0.52 },
      { count: 7, polar: 0.62, radScale: 0.76 },
      { count: 4, polar: 0.82, radScale: 0.56 },
    ];
    rings.forEach(({ count, polar, radScale }) => {
      for (let i = 0; i < count; i++) {
        const az = (i / count) * Math.PI * 2 + polar * 0.7;
        const r = 0.88 * Math.sin(polar);
        const y = 0.88 * Math.cos(polar);
        seeds.push({
          pos: [Math.cos(az) * r * radScale, y * 0.88 + 1.08, Math.sin(az) * r * radScale],
          rot: [polar, az, 0],
        });
      }
    });
    return seeds;
  }, []);

  return (
    <group ref={g} scale={1.5}>
      {/* ── BOTTOM BUN ── slightly domed base */}
      <mesh position={[0, -0.54, 0]}>
        <cylinderGeometry args={[0.95, 0.88, 0.28, 52]} />
        <M color="#C8690E" emissive="#7A3808" ei={0.45} rough={0.58} />
      </mesh>
      {/* Rounded bottom edge of bottom bun */}
      <mesh position={[0, -0.72, 0]}>
        <torusGeometry args={[0.9, 0.1, 10, 52]} />
        <M color="#B85E0A" emissive="#703405" ei={0.38} rough={0.62} />
      </mesh>
      {/* Top flat face of bottom bun */}
      <mesh position={[0, -0.39, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.04, 52]} />
        <M color="#E8A040" emissive="#9A5A18" ei={0.4} rough={0.48} />
      </mesh>

      {/* ── SAUCE (mayo/special sauce) — white-yellow glossy thin layer ── */}
      <mesh position={[0, -0.31, 0]}>
        <cylinderGeometry args={[0.86, 0.86, 0.06, 48]} />
        <M color="#F5E8C0" emissive="#D0B060" ei={0.35} rough={0.25} metal={0.02} />
      </mesh>
      {/* Sauce drips on edges */}
      {[0, 1.05, 2.1, 3.15, 4.2, 5.25].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.82, -0.36, Math.sin(a) * 0.82]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <M color="#F0DC90" emissive="#C09840" ei={0.3} rough={0.22} />
        </mesh>
      ))}

      {/* ── PATTY — thick dark brown cylinder with grill marks ── */}
      <mesh position={[0, -0.14, 0]}>
        <cylinderGeometry args={[0.9, 0.93, 0.3, 48]} />
        <M color="#3E1A08" emissive="#1A0804" ei={0.3} rough={0.92} metal={0.06} />
      </mesh>
      {/* Grill marks - dark strips across patty face */}
      {[-0.38, -0.15, 0.08, 0.31].map((x, i) => (
        <mesh key={i} position={[x, 0.02, 0]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.05, 0.015, 1.82]} />
          <M color="#150604" emissive="#080200" ei={0} rough={1} />
        </mesh>
      ))}
      {/* Patty edge browned ridge */}
      <mesh position={[0, -0.14, 0]}>
        <torusGeometry args={[0.91, 0.04, 8, 48]} />
        <M color="#5A2808" emissive="#2A0C04" ei={0.28} rough={0.95} />
      </mesh>

      {/* ── CHEESE — bright yellow square sheet hanging over edges ── */}
      <mesh position={[0, 0.09, 0]} rotation={[0, Math.PI / 5.5, 0]}>
        <boxGeometry args={[2.08, 0.07, 2.08]} />
        <M color="#F5B800" emissive="#B87800" ei={0.6} rough={0.38} metal={0.04} />
      </mesh>
      {/* Cheese melted drip corners */}
      {[0.62, 1.67, 2.72, 3.77].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 1.0, 0.0, Math.sin(a) * 1.0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <M color="#F0AA00" emissive="#B07000" ei={0.55} rough={0.3} />
        </mesh>
      ))}

      {/* ── TOMATO — 2 thin bright red slices ── */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.07, 52]} />
        <M color="#D01818" emissive="#8A0808" ei={0.55} rough={0.55} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.06, 52]} />
        <M color="#E02828" emissive="#980E0E" ei={0.5} rough={0.58} />
      </mesh>
      {/* Tomato seed details */}
      {[0, 1.26, 2.51, 3.77, 5.03].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.42, 0.31, Math.sin(a) * 0.42]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <M color="#F5D0C0" emissive="#D08060" ei={0.3} rough={0.6} />
        </mesh>
      ))}

      {/* ── LETTUCE — ruffled green torus ring ── */}
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.88, 0.2, 12, 56]} />
        <M color="#2AAA28" emissive="#127012" ei={0.55} rough={0.82} />
      </mesh>
      {/* Lettuce inner ruffles */}
      <mesh position={[0, 0.42, 0]}>
        <torusGeometry args={[0.65, 0.1, 8, 40]} />
        <M color="#38C035" emissive="#1A8018" ei={0.5} rough={0.85} />
      </mesh>

      {/* ── TOP BUN — golden dome ── */}
      {/* Dome half-sphere */}
      <mesh position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.92, 52, 32, 0, Math.PI * 2, 0, Math.PI * 0.56]} />
        <M color="#D07818" emissive="#8A4A0A" ei={0.52} rough={0.44} />
      </mesh>
      {/* Flat base of top bun */}
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.06, 52]} />
        <M color="#B86010" emissive="#7A3808" ei={0.42} rough={0.5} />
      </mesh>
      {/* Bun inner face (lighter golden) */}
      <mesh position={[0, 0.59, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.02, 48]} />
        <M color="#F0C060" emissive="#C09030" ei={0.45} rough={0.4} />
      </mesh>
      {/* Sheen on top of dome */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.32, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <M color="#F0B040" emissive="#D08020" ei={0.3} rough={0.2} />
      </mesh>

      {/* ── SESAME SEEDS — placed on dome surface ── */}
      {sesameSeeds.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot}>
          <sphereGeometry args={[0.052, 7, 5]} />
          <M color="#EDE0B0" emissive="#C8B878" ei={0.25} rough={0.72} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STELLAR HOT DOG 🌭
// U-shaped bun that truly hugs the sausage from below and both sides.
// Sausage sits inside with both ends protruding. Clean mustard & ketchup lines.
// ─────────────────────────────────────────────────────────────────────────────
function HotDogModel() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(clock.elapsedTime * 0.32) * 0.5;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.48) * 0.1;
  });

  // Mustard zigzag points along the hot dog length
  const mustardSegments = useMemo(() => {
    const segs: { x: number; z: number; rotY: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const t = (i / 7) - 0.5;
      segs.push({ x: t * 3.4, z: (i % 2 === 0 ? 0.04 : -0.04), rotY: (i % 2 === 0 ? 0.25 : -0.25) });
    }
    return segs;
  }, []);

  return (
    <group ref={g} rotation={[0.22, 0, 0]} scale={1.3}>

      {/* ── BUN FLOOR — elongated oval pill base ── */}
      <mesh position={[0, -0.42, 0]} scale={[3.6, 1, 1]}>
        <sphereGeometry args={[0.52, 36, 18]} />
        <M color="#C8700E" emissive="#854508" ei={0.48} rough={0.52} />
      </mesh>

      {/* ── BUN LEFT WALL — sits along left side ── */}
      <mesh position={[0, 0.0, -0.45]} scale={[3.6, 0.72, 0.36]}>
        <sphereGeometry args={[0.52, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <M color="#BA6410" emissive="#7A3C08" ei={0.44} rough={0.56} />
      </mesh>

      {/* ── BUN RIGHT WALL ── */}
      <mesh position={[0, 0.0, 0.45]} scale={[3.6, 0.72, 0.36]}>
        <sphereGeometry args={[0.52, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <M color="#BA6410" emissive="#7A3C08" ei={0.44} rough={0.56} />
      </mesh>

      {/* ── BUN END CAP LEFT ── */}
      <mesh position={[-1.86, -0.14, 0]} scale={[0.55, 0.85, 0.92]}>
        <sphereGeometry args={[0.52, 22, 16]} />
        <M color="#B05C0C" emissive="#7A3A08" ei={0.4} rough={0.58} />
      </mesh>

      {/* ── BUN END CAP RIGHT ── */}
      <mesh position={[1.86, -0.14, 0]} scale={[0.55, 0.85, 0.92]}>
        <sphereGeometry args={[0.52, 22, 16]} />
        <M color="#B05C0C" emissive="#7A3A08" ei={0.4} rough={0.58} />
      </mesh>

      {/* ── BUN INNER FACE — lighter golden inside ── */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[3.52, 0.08, 0.84]} />
        <M color="#F0C060" emissive="#C88C2C" ei={0.45} rough={0.38} />
      </mesh>

      {/* ── SAUSAGE — sits in the bun groove, ends protrude ── */}
      <mesh position={[0, 0.26, 0]} scale={[4.1, 1, 1]}>
        <sphereGeometry args={[0.28, 36, 20]} />
        <M color="#7A1A0A" emissive="#4A0C06" ei={0.55} rough={0.6} metal={0.1} />
      </mesh>
      {/* Sausage specular highlight top */}
      <mesh position={[0, 0.38, 0.04]} scale={[3.6, 0.6, 0.5]}>
        <sphereGeometry args={[0.18, 20, 12]} />
        <M color="#A83020" emissive="#701810" ei={0.32} rough={0.28} />
      </mesh>
      {/* Sausage grill marks */}
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.27, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.005, 0.005, 0.6, 6]} />
          <M color="#2A0804" emissive="#100200" ei={0} rough={1} />
        </mesh>
      ))}
      {/* Sausage end caps (rounded) */}
      <mesh position={[-2.06, 0.26, 0]} scale={[0.52, 1, 1]}>
        <sphereGeometry args={[0.28, 16, 12]} />
        <M color="#6A1408" emissive="#3E0A04" ei={0.5} rough={0.65} />
      </mesh>
      <mesh position={[2.06, 0.26, 0]} scale={[0.52, 1, 1]}>
        <sphereGeometry args={[0.28, 16, 12]} />
        <M color="#6A1408" emissive="#3E0A04" ei={0.5} rough={0.65} />
      </mesh>

      {/* ── MUSTARD — continuous yellow zigzag stripe ── */}
      {mustardSegments.map((seg, i) => (
        <mesh key={i} position={[seg.x, 0.56, seg.z]} rotation={[0, seg.rotY, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.55, 8]} />
          <M color="#F5C200" emissive="#C08800" ei={0.65} rough={0.22} />
        </mesh>
      ))}
      {/* Mustard connector blobs */}
      {mustardSegments.map((seg, i) => (
        <mesh key={i} position={[seg.x, 0.57, seg.z]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <M color="#F9C800" emissive="#C89000" ei={0.6} rough={0.2} />
        </mesh>
      ))}

      {/* ── KETCHUP — parallel red stripe, slightly offset ── */}
      {[-1.35, -0.75, -0.15, 0.45, 1.05, 1.65].map((x, i) => (
        <mesh key={i} position={[x, 0.55, i % 2 === 0 ? 0.1 : -0.1]}>
          <cylinderGeometry args={[0.032, 0.032, 0.52, 8]} />
          <M color="#CC1010" emissive="#880808" ei={0.58} rough={0.3} />
        </mesh>
      ))}
      {[-1.35, -0.75, -0.15, 0.45, 1.05, 1.65].map((x, i) => (
        <mesh key={i} position={[x, 0.56, i % 2 === 0 ? 0.1 : -0.1]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <M color="#D41414" emissive="#900A0A" ei={0.55} rough={0.28} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PIZZA COSMOS 🍕
// Thin circular base, clear thick crust ring, cheese layer with blobs,
// pepperoni discs, bell pepper rings, olives, basil — tilted to face camera.
// ─────────────────────────────────────────────────────────────────────────────
function PizzaModel() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.z += 0.005;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
  });

  // Pepperoni placements
  const pepperonis = useMemo(() => [
    { r: 0.72, a: 0.35 }, { r: 0.68, a: 1.6 }, { r: 0.74, a: 2.9 },
    { r: 0.70, a: 4.15 }, { r: 0.69, a: 5.4 }, { r: 0.73, a: 0.9 },
    { r: 0.42, a: 0.6 }, { r: 0.40, a: 2.2 }, { r: 0.43, a: 3.8 },
    { r: 0.41, a: 5.1 }, { r: 0.18, a: 1.2 }, { r: 0.16, a: 3.5 },
  ], []);

  // Bell pepper rings
  const pepperRings = useMemo(() => [
    { r: 0.55, a: 0.2 }, { r: 0.62, a: 1.9 }, { r: 0.58, a: 3.6 },
    { r: 0.35, a: 1.0 }, { r: 0.28, a: 4.2 },
  ], []);

  // Olive slices
  const olives = useMemo(() => [
    { r: 0.65, a: 1.25 }, { r: 0.60, a: 3.1 }, { r: 0.50, a: 5.0 },
    { r: 0.32, a: 2.8 }, { r: 0.22, a: 5.8 },
  ], []);

  // Mozzarella blob positions
  const cheeseBlobPositions = useMemo(() => [
    { r: 0.52, a: 0.8 }, { r: 0.58, a: 2.4 }, { r: 0.50, a: 4.0 },
    { r: 0.30, a: 1.5 }, { r: 0.28, a: 3.8 }, { r: 0.62, a: 5.6 },
    { r: 0.20, a: 0.3 }, { r: 0.65, a: 3.4 },
  ], []);

  return (
    <group ref={g} rotation={[-0.48, 0, 0]} scale={1.25}>

      {/* ── PIZZA BASE — thin dough disk ── */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.22, 1.22, 0.1, 64]} />
        <M color="#D49840" emissive="#9A6418" ei={0.42} rough={0.72} />
      </mesh>

      {/* ── CRUST — thick golden-brown torus ring, clearly raised ── */}
      <mesh position={[0, 0.06, 0]}>
        <torusGeometry args={[1.18, 0.28, 18, 64]} />
        <M color="#C07018" emissive="#8A4A0A" ei={0.5} rough={0.65} />
      </mesh>
      {/* Crust top sheen */}
      <mesh position={[0, 0.18, 0]}>
        <torusGeometry args={[1.18, 0.14, 10, 64]} />
        <M color="#D88C28" emissive="#A05C10" ei={0.35} rough={0.5} />
      </mesh>

      {/* ── TOMATO SAUCE — vivid red layer ── */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.88, 0.88, 0.06, 60]} />
        <M color="#CC2010" emissive="#8A0808" ei={0.52} rough={0.7} />
      </mesh>

      {/* ── MOZZARELLA CHEESE BASE — yellow-cream layer ── */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.05, 56]} />
        <M color="#F2D860" emissive="#C0A020" ei={0.5} rough={0.42} metal={0.04} />
      </mesh>

      {/* Mozzarella blobs for melted-cheese texture */}
      {cheeseBlobPositions.map((b, i) => (
        <mesh key={i} position={[Math.cos(b.a) * b.r, 0.18, Math.sin(b.a) * b.r]} scale={[1, 0.35, 1]}>
          <sphereGeometry args={[0.14, 10, 8]} />
          <M color="#FFFACC" emissive="#E0D060" ei={0.45} rough={0.35} />
        </mesh>
      ))}

      {/* ── PEPPERONI — flat reddish-brown discs ── */}
      {pepperonis.map((p, i) => (
        <mesh key={i} position={[Math.cos(p.a) * p.r, 0.21, Math.sin(p.a) * p.r]}>
          <cylinderGeometry args={[0.115, 0.115, 0.05, 24]} />
          <M color="#AA2010" emissive="#6A0C06" ei={0.5} rough={0.68} />
        </mesh>
      ))}
      {/* Pepperoni edge curl detail */}
      {pepperonis.slice(0, 6).map((p, i) => (
        <mesh key={i} position={[Math.cos(p.a) * p.r, 0.22, Math.sin(p.a) * p.r]}>
          <torusGeometry args={[0.095, 0.018, 6, 20]} />
          <M color="#881808" emissive="#440C04" ei={0.3} rough={0.8} />
        </mesh>
      ))}

      {/* ── BELL PEPPER RINGS — bright green rings ── */}
      {pepperRings.map((pr, i) => (
        <mesh key={i} position={[Math.cos(pr.a) * pr.r, 0.22, Math.sin(pr.a) * pr.r]} rotation={[Math.PI / 2, 0, pr.a]}>
          <torusGeometry args={[0.07, 0.025, 6, 16]} />
          <M color="#28A820" emissive="#148010" ei={0.55} rough={0.6} />
        </mesh>
      ))}

      {/* ── OLIVE SLICES — dark rings ── */}
      {olives.map((o, i) => (
        <mesh key={i} position={[Math.cos(o.a) * o.r, 0.22, Math.sin(o.a) * o.r]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.065, 0.028, 6, 16]} />
          <M color="#1C1C14" emissive="#080808" ei={0.1} rough={0.62} />
        </mesh>
      ))}
      {/* Olive centers */}
      {olives.map((o, i) => (
        <mesh key={i} position={[Math.cos(o.a) * o.r, 0.22, Math.sin(o.a) * o.r]}>
          <cylinderGeometry args={[0.022, 0.022, 0.06, 8]} />
          <M color="#88A030" emissive="#508018" ei={0.4} rough={0.5} />
        </mesh>
      ))}

      {/* ── BASIL LEAVES — flat green ellipses ── */}
      {[{ r: 0.45, a: 2.0 }, { r: 0.60, a: 4.8 }, { r: 0.25, a: 0.5 }].map((bl, i) => (
        <mesh key={i} position={[Math.cos(bl.a) * bl.r, 0.23, Math.sin(bl.a) * bl.r]}
          rotation={[0, bl.a, 0]} scale={[1, 0.18, 0.65]}>
          <sphereGeometry args={[0.13, 10, 8]} />
          <M color="#1E8C18" emissive="#0E5810" ei={0.55} rough={0.75} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MACARONI NEBULA 🧀
// Ceramic bowl, thick cheese sauce, many elbow macaroni pieces (C-shaped
// partial torus), breadcrumb topping, herbs.
// ─────────────────────────────────────────────────────────────────────────────
function MacaroniModel() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(clock.elapsedTime * 0.26) * 0.38;
    g.current.rotation.x = -0.32 + Math.sin(clock.elapsedTime * 0.2) * 0.04;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.52) * 0.09;
  });

  // Pre-compute elbow macaroni pieces in the bowl
  const macaroniPieces = useMemo(() => {
    const pieces: {
      position: [number, number, number];
      rotation: [number, number, number];
      color: string;
      scale: number;
    }[] = [];
    const palette = ['#F0B030', '#EEAA28', '#F4C040', '#E8A020', '#F6C858'];

    // Three rings of macaroni at different radii and heights
    const rings = [
      { count: 8,  radius: 0.22, height: 0.18 },
      { count: 12, radius: 0.52, height: 0.14 },
      { count: 10, radius: 0.78, height: 0.1  },
      { count: 6,  radius: 0.35, height: 0.26 },
      { count: 8,  radius: 0.62, height: 0.24 },
    ];

    rings.forEach(({ count, radius, height }, ringIdx) => {
      for (let i = 0; i < count; i++) {
        const azimuth = (i / count) * Math.PI * 2 + ringIdx * 0.42;
        const x = Math.cos(azimuth) * radius;
        const z = Math.sin(azimuth) * radius;
        // Orientation: rotate so C-opening faces upward/outward
        pieces.push({
          position: [x, height, z],
          rotation: [Math.PI / 2, azimuth + Math.PI / 3, (i % 3) * 0.6 - 0.3] as [number, number, number],
          color: palette[(i + ringIdx) % palette.length],
          scale: 0.88 + (i % 3) * 0.1,
        });
      }
    });
    return pieces;
  }, []);

  // Breadcrumb particles
  const breadcrumbs = useMemo(() => Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2 + i * 0.3;
    const r = 0.15 + (i % 5) * 0.18;
    return {
      pos: [Math.cos(a) * r, 0.34 + (i % 3) * 0.04, Math.sin(a) * r] as [number, number, number],
      size: 0.028 + (i % 3) * 0.012,
    };
  }), []);

  // Herb dots
  const herbs = useMemo(() => [
    [-0.52, 0.38, 0.30] as [number, number, number],
    [0.60, 0.37, -0.14] as [number, number, number],
    [0.18, 0.39, 0.56] as [number, number, number],
    [-0.08, 0.36, -0.52] as [number, number, number],
    [0.40, 0.37, 0.34] as [number, number, number],
    [-0.38, 0.37, -0.36] as [number, number, number],
  ], []);

  return (
    <group ref={g} scale={1.45}>

      {/* ── BOWL BODY — open ceramic cylinder ── */}
      <mesh position={[0, -0.26, 0]}>
        <cylinderGeometry args={[1.32, 0.98, 0.85, 52, 1, true]} />
        <M color="#F0E8DC" emissive="#C8B8A0" ei={0.2} rough={0.26} metal={0.01} />
      </mesh>

      {/* Bowl bottom (inside floor) */}
      <mesh position={[0, -0.67, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 0.04, 48]} />
        <M color="#EAE0D4" emissive="#C4B49A" ei={0.18} rough={0.3} />
      </mesh>

      {/* Bowl outer base ring */}
      <mesh position={[0, -0.71, 0]}>
        <torusGeometry args={[0.72, 0.07, 10, 44]} />
        <M color="#E0D4C4" emissive="#BEAC98" ei={0.15} rough={0.35} />
      </mesh>

      {/* Bowl rim — thick rounded lip */}
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[1.28, 0.1, 14, 52]} />
        <M color="#FFF8F0" emissive="#DDD0C0" ei={0.22} rough={0.2} metal={0.02} />
      </mesh>

      {/* ── CHEESE SAUCE — thick orange-yellow layer ── */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.14, 1.10, 0.2, 48]} />
        <M color="#F0A828" emissive="#C87808" ei={0.62} rough={0.3} metal={0.04} />
      </mesh>
      {/* Sauce top surface blobs for depth */}
      {[0, 1.05, 2.1, 3.15, 4.2, 5.25].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.7, 0.2, Math.sin(a) * 0.7]} scale={[1, 0.4, 1]}>
          <sphereGeometry args={[0.14, 10, 8]} />
          <M color="#FFBB38" emissive="#D88C10" ei={0.58} rough={0.25} />
        </mesh>
      ))}
      {/* Center sauce pool */}
      <mesh position={[0, 0.2, 0]} scale={[1, 0.38, 1]}>
        <sphereGeometry args={[0.4, 18, 12]} />
        <M color="#FFCC50" emissive="#E09A14" ei={0.55} rough={0.22} />
      </mesh>

      {/* ── ELBOW MACARONI PIECES ── */}
      {macaroniPieces.map((piece, i) => (
        <group key={i} position={piece.position} rotation={piece.rotation} scale={piece.scale}>
          {/* Outer elbow tube */}
          <mesh>
            <torusGeometry args={[0.19, 0.085, 10, 22, Math.PI * 1.15]} />
            <M color={piece.color} emissive="#A07010" ei={0.38} rough={0.52} />
          </mesh>
          {/* Inner hollow — darker, slightly smaller */}
          <mesh>
            <torusGeometry args={[0.19, 0.042, 8, 18, Math.PI * 1.15]} />
            <M color="#8A5808" emissive="#4A2C04" ei={0.15} rough={0.72} />
          </mesh>
          {/* End caps (cut face of elbow tube) */}
          <mesh position={[0.19, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <ringGeometry args={[0.042, 0.085, 10]} />
            <M color="#9A6010" emissive="#5A3408" ei={0.2} rough={0.65} />
          </mesh>
        </group>
      ))}

      {/* ── BREADCRUMB TOPPING ── */}
      {breadcrumbs.map((bc, i) => (
        <mesh key={i} position={bc.pos}>
          <sphereGeometry args={[bc.size, 6, 6]} />
          <M color="#C8920A" emissive="#8A5A04" ei={0.35} rough={0.8} />
        </mesh>
      ))}

      {/* ── HERB DOTS (parsley/chive) ── */}
      {herbs.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <M color="#28A030" emissive="#145818" ei={0.55} rough={0.72} />
        </mesh>
      ))}

      {/* Black pepper dots */}
      {[
        [-0.32, 0.35, -0.26] as [number, number, number],
        [0.44, 0.33, 0.20] as [number, number, number],
        [0.06, 0.36, 0.06] as [number, number, number],
        [-0.56, 0.32, 0.08] as [number, number, number],
        [0.28, 0.34, -0.48] as [number, number, number],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.028, 6, 6]} />
          <M color="#1C1008" emissive="#080400" ei={0.1} rough={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING PARTICLES
// ─────────────────────────────────────────────────────────────────────────────
function FloatingIngredient({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => Math.random() * 0.4 + 0.25, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const rs = useMemo(() => (Math.random() - 0.5) * 0.025, []);
  const shapeType = useMemo(() => Math.floor(Math.random() * 4), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed + offset) * 0.35;
    ref.current.rotation.x += rs;
    ref.current.rotation.y += rs * 0.8;
  });

  return (
    <mesh ref={ref} position={position}>
      {shapeType === 0 && <sphereGeometry args={[0.08, 8, 8]} />}
      {shapeType === 1 && <boxGeometry args={[0.11, 0.11, 0.11]} />}
      {shapeType === 2 && <torusGeometry args={[0.08, 0.032, 6, 14]} />}
      {shapeType === 3 && <coneGeometry args={[0.07, 0.14, 8]} />}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.38} roughness={0.42} />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD CANVAS
// ─────────────────────────────────────────────────────────────────────────────
function WorldCanvas({ sceneIndex }: { sceneIndex: number }) {
  const colors = sceneColors[sceneIndex];
  const shape = scenes[sceneIndex].shape;

  const particles = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4] as [number, number, number],
    color: [colors.main, colors.secondary, colors.accent, '#FDF3E3'][i % 4],
  })), [colors]);

  return (
    <Canvas camera={{ position: [0, 0.6, 5.8], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      {/* Warm ambient fill */}
      <ambientLight intensity={1.1} color="#FFF8F0" />
      {/* Key light — warm from upper-front */}
      <pointLight position={[3, 5, 5]} intensity={8} color="#FFF5E0" />
      {/* Scene-tinted rim light */}
      <pointLight position={[-4, 2, 3]} intensity={5} color={colors.main} />
      {/* Secondary fill */}
      <pointLight position={[2, -2, 4]} intensity={3} color={colors.secondary} />
      {/* Back fill for depth */}
      <pointLight position={[0, 4, -6]} intensity={2.5} color="#FFFFFF" />
      {/* Under-light for bottom detail */}
      <pointLight position={[0, -4, 2]} intensity={1.8} color={colors.accent} />

      <Stars radius={32} depth={20} count={1200} factor={2.2} saturation={0} fade speed={0.25} />

      <Float speed={1.0} floatIntensity={0.22} rotationIntensity={0.06}>
        {shape === 'burger'   && <BurgerModel />}
        {shape === 'hotdog'   && <HotDogModel />}
        {shape === 'pizza'    && <PizzaModel />}
        {shape === 'macaroni' && <MacaroniModel />}
      </Float>

      {particles.map((p, i) => (
        <FloatingIngredient key={i} position={p.position} color={p.color} />
      ))}
    </Canvas>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD CARD
// ─────────────────────────────────────────────────────────────────────────────
function WorldCard({ scene, index }: { scene: typeof scenes[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const colors = sceneColors[index];
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center"
      style={{ background: `radial-gradient(ellipse at ${isEven ? '30%' : '70%'} 50%, ${colors.main}22 0%, transparent 70%)` }}
    >
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full md:w-1/2 h-[55vh] md:h-screen ${!isEven ? 'md:order-2' : ''}`}
      >
        <WorldCanvas sceneIndex={index} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full md:w-1/2 px-8 md:px-16 py-12 ${!isEven ? 'md:order-1' : ''}`}
      >
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: colors.main }}>
            ✦ Scene {String(index + 1).padStart(2, '0')}
          </p>
          <div className="text-6xl mb-4">{scene.emoji}</div>
          <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tight mb-4" style={{ color: 'var(--food-cream)' }}>
            {scene.title}
          </h2>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: colors.secondary }}>
            {scene.subtitle}
          </p>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(253,243,227,0.6)' }}>
            {scene.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {scene.foods.map(food => (
              <span
                key={food}
                className="px-3 py-1.5 text-xs rounded-full border font-medium"
                style={{ borderColor: `${colors.main}40`, background: `${colors.main}10`, color: 'rgba(253,243,227,0.75)' }}
              >
                {food}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0D0500)' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function FoodWorldsScene() {
  return (
    <section id="food-worlds" className="relative" style={{ background: '#0D0500' }}>
      <div className="relative z-10 text-center py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(249,193,26,0.6)' }}>✦ The Worlds ✦</p>
          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight" style={{ color: 'var(--food-cream)' }}>
            FOOD<br />
            <span style={{ background: 'linear-gradient(135deg, #F9C11A, #F47B20, #E63329)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              WORLDS
            </span>
          </h2>
          <p className="mt-6 text-base max-w-md mx-auto" style={{ color: 'rgba(253,243,227,0.45)' }}>
            Empat dunia makanan, ratusan cerita. Setiap scroll membawa Anda ke galaksi baru.
          </p>
        </motion.div>
      </div>
      {scenes.map((scene, index) => (
        <WorldCard key={scene.id} scene={scene} index={index} />
      ))}
    </section>
  );
}
