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
// HELPER: material that pops in dark scenes
// ─────────────────────────────────────────────────────────────────────────────
function M({ color, emissive, ei = 0.35, rough = 0.45, metal = 0.05 }: {
  color: string; emissive?: string; ei?: number; rough?: number; metal?: number;
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
// GALAXY BURGER 🍔 — clear stacked layers
// ─────────────────────────────────────────────────────────────────────────────
function BurgerModel() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.3;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.12;
  });

  return (
    <group ref={g} scale={1.55}>
      {/* ── TOP BUN: golden dome (sphere, bottom half clipped) ── */}
      <mesh position={[0, 1.08, 0]}>
        <sphereGeometry args={[0.92, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <M color="#D47C1A" emissive="#A05010" ei={0.5} rough={0.42} />
      </mesh>
      {/* Top bun flat base (caps the dome) */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.1, 48]} />
        <M color="#C06A12" emissive="#8A4008" ei={0.45} rough={0.5} />
      </mesh>
      {/* Sesame seeds */}
      {[0,1,2,3,4,5,6].map(i => {
        const a = (i / 7) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.5, 1.52, Math.sin(a) * 0.5]} rotation={[Math.PI / 5, 0, a]}>
            <sphereGeometry args={[0.055, 6, 6]} />
            <M color="#EED098" emissive="#CCA060" ei={0.3} rough={0.7} />
          </mesh>
        );
      })}

      {/* ── LETTUCE: vivid green ring ── */}
      <mesh position={[0, 0.54, 0]}>
        <torusGeometry args={[0.95, 0.21, 10, 48]} />
        <M color="#30B030" emissive="#1A7A1A" ei={0.55} rough={0.85} />
      </mesh>

      {/* ── TOMATO: bright red thin cylinder ── */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.84, 0.84, 0.11, 48]} />
        <M color="#E02020" emissive="#A01010" ei={0.55} rough={0.65} />
      </mesh>

      {/* ── CHEESE: yellow square, hangs over edge ── */}
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[2.02, 0.09, 2.02]} />
        <M color="#F9C11A" emissive="#C08800" ei={0.55} rough={0.45} />
      </mesh>

      {/* ── PATTY: dark brown cylinder ── */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.88, 0.92, 0.26, 48]} />
        <M color="#4A2010" emissive="#2A0C06" ei={0.4} rough={0.95} metal={0.08} />
      </mesh>
      {/* Grill marks on patty */}
      {[-0.32, 0, 0.32].map((x, i) => (
        <mesh key={i} position={[x, 0.19, 0]}>
          <boxGeometry args={[0.04, 0.01, 1.75]} />
          <M color="#1A0606" emissive="#000000" ei={0} rough={1} />
        </mesh>
      ))}

      {/* ── BOTTOM BUN: golden cylinder ── */}
      <mesh position={[0, -0.26, 0]}>
        <cylinderGeometry args={[0.92, 0.90, 0.36, 48]} />
        <M color="#D47C1A" emissive="#A05010" ei={0.5} rough={0.42} />
      </mesh>
      <mesh position={[0, -0.47, 0]}>
        <cylinderGeometry args={[0.90, 0.88, 0.08, 48]} />
        <M color="#B86010" emissive="#8A4008" ei={0.4} rough={0.5} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STELLAR SAUSAGE 🌭 — hot dog: ellipsoid bun + sausage pill
// KEY: use scale[] on sphere geometry to make pill / oval shapes
// ─────────────────────────────────────────────────────────────────────────────
function HotDogModel() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    // Slow Y oscillation so we see it from different angles
    g.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.5;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    // Tilt entire group so we look slightly down at the hot dog → depth visible
    <group ref={g} rotation={[0.28, 0.3, 0]} scale={1.35}>
      {/* ── BUN BOTTOM HALF: elongated oval pill ── */}
      {/* scale[x=wide, y=flat, z=depth] on a unit sphere → pill shape */}
      <mesh scale={[2.9, 0.58, 0.9]} position={[0, -0.22, 0]}>
        <sphereGeometry args={[0.62, 32, 20, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5]} />
        <M color="#D47C1A" emissive="#9A5010" ei={0.5} rough={0.48} />
      </mesh>
      {/* BUN BOTTOM outer ends (round caps) */}
      <mesh position={[1.8, -0.22, 0]} scale={[0.62, 0.58, 0.9]}>
        <sphereGeometry args={[0.62, 20, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5]} />
        <M color="#C86C14" emissive="#8A4008" ei={0.4} rough={0.5} />
      </mesh>
      <mesh position={[-1.8, -0.22, 0]} scale={[0.62, 0.58, 0.9]}>
        <sphereGeometry args={[0.62, 20, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5]} />
        <M color="#C86C14" emissive="#8A4008" ei={0.4} rough={0.5} />
      </mesh>

      {/* ── BUN TOP — split into two halves that open upward ── */}
      {/* Left half (rotated slightly outward) */}
      <mesh scale={[2.85, 0.42, 0.82]} position={[-0.18, 0.13, 0]} rotation={[0, 0, 0.28]}>
        <sphereGeometry args={[0.62, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <M color="#C06810" emissive="#8A4008" ei={0.45} rough={0.5} />
      </mesh>
      {/* Right half */}
      <mesh scale={[2.85, 0.42, 0.82]} position={[0.18, 0.13, 0]} rotation={[0, 0, -0.28]}>
        <sphereGeometry args={[0.62, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <M color="#C06810" emissive="#8A4008" ei={0.45} rough={0.5} />
      </mesh>

      {/* ── SAUSAGE: stretched sphere pill, vivid red-brown ── */}
      <mesh scale={[2.75, 0.35, 0.35]} position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.62, 32, 20]} />
        <M color="#8C1A10" emissive="#5A0C08" ei={0.6} rough={0.62} metal={0.12} />
      </mesh>
      {/* Sausage surface sheen highlight */}
      <mesh scale={[2.5, 0.28, 0.28]} position={[0, 0.13, 0.04]}>
        <sphereGeometry args={[0.62, 16, 12]} />
        <M color="#AA2418" emissive="#7A1410" ei={0.3} rough={0.3} />
      </mesh>

      {/* ── MUSTARD: yellow zigzag strips on top ── */}
      {[-0.8, -0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.39, i % 2 === 0 ? 0.05 : -0.05]}>
          <boxGeometry args={[0.55, 0.05, 0.08]} />
          <M color="#F9C11A" emissive="#D08800" ei={0.6} rough={0.3} />
        </mesh>
      ))}
      {/* Connecting mustard dots */}
      {[-1.05, -0.5, 0.1, 0.65].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <M color="#F9C11A" emissive="#D08800" ei={0.6} rough={0.3} />
        </mesh>
      ))}

      {/* ── KETCHUP: red dots ── */}
      {[-0.6, 0.0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0.09]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <M color="#CC1818" emissive="#880808" ei={0.5} rough={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PIZZA COSMOS 🍕 — circular pizza, tilted to face camera
// ─────────────────────────────────────────────────────────────────────────────
function PizzaModel() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.z += 0.007; // Slow spin around its own axis
    g.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
  });

  const toppings = useMemo(() => [
    { r: 0.72, a: 0.3,  c: '#CC2020', ec: '#880808' },
    { r: 0.68, a: 1.2,  c: '#3AB83A', ec: '#1A7A1A' },
    { r: 0.75, a: 2.1,  c: '#F47B20', ec: '#A04010' },
    { r: 0.65, a: 3.0,  c: '#CC2020', ec: '#880808' },
    { r: 0.70, a: 3.9,  c: '#5A8A3A', ec: '#2A5A1A' },
    { r: 0.73, a: 4.8,  c: '#8A3A8A', ec: '#5A1A5A' },
    { r: 0.66, a: 5.7,  c: '#CC2020', ec: '#880808' },
    { r: 0.42, a: 0.7,  c: '#F47B20', ec: '#A04010' },
    { r: 0.38, a: 2.4,  c: '#CC2020', ec: '#880808' },
    { r: 0.40, a: 4.1,  c: '#3AB83A', ec: '#1A7A1A' },
    { r: 0.18, a: 1.8,  c: '#F47B20', ec: '#A04010' },
    { r: 0.22, a: 4.5,  c: '#CC2020', ec: '#880808' },
  ], []);

  return (
    // Tilt pizza so the circular face is visible to the camera
    <group ref={g} rotation={[-0.52, 0, 0]} scale={1.3}>
      {/* ── CRUST RING: thick golden-brown torus ── */}
      <mesh>
        <torusGeometry args={[1.2, 0.22, 14, 64]} />
        <M color="#C87820" emissive="#8A4C10" ei={0.5} rough={0.62} />
      </mesh>

      {/* ── DOUGH BASE ── */}
      <mesh>
        <cylinderGeometry args={[1.18, 1.18, 0.14, 64]} />
        <M color="#D49030" emissive="#9A5C10" ei={0.45} rough={0.68} />
      </mesh>

      {/* ── TOMATO SAUCE: bright red ── */}
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.99, 0.99, 0.08, 64]} />
        <M color="#CC2020" emissive="#880A0A" ei={0.55} rough={0.72} />
      </mesh>

      {/* ── MOZZARELLA CHEESE: rich yellow ── */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.88, 0.88, 0.07, 64]} />
        <M color="#F0C830" emissive="#B08800" ei={0.55} rough={0.48} metal={0.05} />
      </mesh>

      {/* ── PIZZA SLICE CUTS ── */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i / 4) * Math.PI;
        return (
          <mesh key={i} position={[0, 0.24, 0]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.028, 0.06, 2.38]} />
            <M color="#881010" emissive="#440404" ei={0.4} rough={0.9} />
          </mesh>
        );
      })}

      {/* ── TOPPINGS: colorful spheres ── */}
      {toppings.map((t, i) => (
        <mesh key={i} position={[Math.cos(t.a) * t.r, 0.26, Math.sin(t.a) * t.r]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <M color={t.c} emissive={t.ec} ei={0.5} rough={0.55} />
        </mesh>
      ))}

      {/* ── OLIVE RINGS ── */}
      {[{ r: 0.5, a: 1.0 }, { r: 0.6, a: 3.6 }, { r: 0.3, a: 5.2 }].map((o, i) => (
        <mesh key={i} position={[Math.cos(o.a) * o.r, 0.26, Math.sin(o.a) * o.r]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.065, 0.03, 6, 14]} />
          <M color="#1A1A1A" emissive="#000000" ei={0.1} rough={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BREAKFAST COSMOS 🍳 — pan with bacon strips + fried egg
// ─────────────────────────────────────────────────────────────────────────────
function MacaroniModel() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(clock.elapsedTime * 0.28) * 0.35;
    g.current.rotation.x = -0.28 + Math.sin(clock.elapsedTime * 0.22) * 0.04;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.08;
  });

  const pieces = useMemo(() => {
    const palette = ['#F2BE55', '#EFAF43', '#F6C86A'];
    const out: { position: [number, number, number]; rotation: [number, number, number]; color: string; scale: number }[] = [];
    const rings = [0.2, 0.55, 0.9];
    rings.forEach((r, ringIndex) => {
      const count = ringIndex === 0 ? 7 : ringIndex === 1 ? 10 : 13;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + (ringIndex * 0.18);
        out.push({
          position: [Math.cos(a) * r, 0.22 + ringIndex * 0.03, Math.sin(a) * r],
          rotation: [Math.PI / 2, a + Math.PI / 4, (i % 2 ? 0.35 : -0.28)],
          color: palette[i % palette.length],
          scale: 0.92 + (i % 3) * 0.07,
        });
      }
    });
    return out;
  }, []);

  const herbDots = useMemo(() => [
    [-0.62, 0.34, 0.35],
    [0.68, 0.34, -0.12],
    [0.18, 0.36, 0.62],
    [-0.08, 0.35, -0.58],
    [0.48, 0.33, 0.32],
  ] as [number, number, number][], []);

  return (
    <group ref={g} scale={1.42}>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[1.46, 1.12, 0.9, 48, 1, true]} />
        <M color="#F7F1E7" emissive="#D7CFC0" ei={0.22} rough={0.28} />
      </mesh>
      <mesh position={[0, -0.67, 0]}>
        <torusGeometry args={[0.82, 0.09, 12, 40]} />
        <M color="#E8DED2" emissive="#C8B8A8" ei={0.18} rough={0.42} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[1.28, 0.08, 12, 48]} />
        <M color="#FFF8F0" emissive="#E4DCCF" ei={0.25} rough={0.22} />
      </mesh>

      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[1.14, 1.08, 0.22, 48]} />
        <M color="#F5B332" emissive="#D7860A" ei={0.6} rough={0.36} metal={0.05} />
      </mesh>
      <mesh position={[0.16, 0.2, -0.18]} scale={[1.0, 0.55, 0.82]}>
        <sphereGeometry args={[0.52, 24, 16]} />
        <M color="#FFD057" emissive="#E19A10" ei={0.55} rough={0.3} />
      </mesh>
      <mesh position={[-0.22, 0.22, 0.22]} scale={[0.82, 0.48, 0.74]}>
        <sphereGeometry args={[0.46, 24, 16]} />
        <M color="#FFCA4A" emissive="#D88E08" ei={0.5} rough={0.32} />
      </mesh>

      {pieces.map((piece, i) => (
        <group key={i} position={piece.position} rotation={piece.rotation} scale={piece.scale}>
          <mesh>
            <torusGeometry args={[0.18, 0.09, 14, 26, Math.PI * 1.2]} />
            <M color={piece.color} emissive="#B97705" ei={0.38} rough={0.56} />
          </mesh>
          <mesh scale={[0.64, 0.64, 0.64]}>
            <torusGeometry args={[0.18, 0.04, 10, 24, Math.PI * 1.2]} />
            <M color="#B85F08" emissive="#7A3404" ei={0.2} rough={0.7} />
          </mesh>
        </group>
      ))}

      {herbDots.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0.2 * i, i, 0.3] as [number, number, number]}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <M color="#2F9E44" emissive="#185A28" ei={0.55} rough={0.7} />
        </mesh>
      ))}

      {([
        [-0.35, 0.34, -0.28],
        [0.42, 0.31, 0.18],
        [0.04, 0.35, 0.04],
        [-0.58, 0.3, 0.05],
      ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <M color="#3C1D12" emissive="#120804" ei={0.12} rough={0.95} />
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
      {shapeType === 0 && <sphereGeometry args={[0.09, 8, 8]} />}
      {shapeType === 1 && <boxGeometry args={[0.12, 0.12, 0.12]} />}
      {shapeType === 2 && <torusGeometry args={[0.09, 0.035, 6, 14]} />}
      {shapeType === 3 && <coneGeometry args={[0.08, 0.16, 8]} />}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD CANVAS
// ─────────────────────────────────────────────────────────────────────────────
function WorldCanvas({ sceneIndex }: { sceneIndex: number }) {
  const colors = sceneColors[sceneIndex];
  const shape = scenes[sceneIndex].shape;

  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4] as [number, number, number],
    color: [colors.main, colors.secondary, colors.accent, '#FDF3E3'][i % 4],
  })), [colors]);

  return (
    <Canvas camera={{ position: [0, 0.4, 5.5], fov: 52 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      {/* Stronger lighting so food colors pop */}
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 5, 5]} intensity={6} color={colors.main} />
      <pointLight position={[-4, 2, 4]} intensity={4} color={colors.secondary} />
      <pointLight position={[0, -3, 3]} intensity={2.5} color={colors.accent} />
      <pointLight position={[0, 3, -5]} intensity={2} color="#FFFFFF" />

      <Stars radius={30} depth={18} count={1500} factor={2.5} saturation={0} fade speed={0.3} />

      <Float speed={1.1} floatIntensity={0.25} rotationIntensity={0.08}>
        {shape === 'burger'    && <BurgerModel />}
        {shape === 'hotdog'    && <HotDogModel />}
        {shape === 'pizza'     && <PizzaModel />}
        {shape === 'macaroni'  && <MacaroniModel />}
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
