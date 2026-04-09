import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Cone, Float, Stars, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function BurgerHero() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* Top bun */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#C47C30" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Sesame seeds on bun */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 0.5,
            1.25,
            Math.sin((i / 6) * Math.PI * 2) * 0.5
          ]}
          rotation={[Math.PI / 3, 0, i]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#F5E0B0" />
        </mesh>
      ))}
      {/* Lettuce */}
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[0.85, 0.15, 8, 32]} />
        <meshStandardMaterial color="#4A8C3F" roughness={0.8} />
      </mesh>
      {/* Tomato */}
      <mesh position={[0, 0.28, 0]}>
        <torusGeometry args={[0.75, 0.08, 8, 32]} />
        <meshStandardMaterial color="#C0392B" roughness={0.6} />
      </mesh>
      {/* Cheese */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[1.7, 0.08, 1.7]} />
        <meshStandardMaterial color="#F9C11A" roughness={0.5} />
      </mesh>
      {/* Patty */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.82, 0.85, 0.22, 32]} />
        <meshStandardMaterial color="#6B3A2A" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Bottom bun */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.9, 0.88, 0.32, 32]} />
        <meshStandardMaterial color="#C47C30" roughness={0.4} />
      </mesh>
    </group>
  );
}

function AmbientFoodParticle({ position, color, shape }: { position: [number, number, number]; color: string; shape: 'sphere' | 'box' | 'torus' | 'cone' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => Math.random() * 0.5 + 0.3, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const rotSpeed = useMemo(() => (Math.random() - 0.5) * 0.02, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;
    meshRef.current.rotation.x += rotSpeed;
    meshRef.current.rotation.y += rotSpeed * 0.7;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box': return <boxGeometry args={[0.15, 0.15, 0.15]} />;
      case 'torus': return <torusGeometry args={[0.12, 0.04, 8, 16]} />;
      case 'cone': return <coneGeometry args={[0.1, 0.2, 8]} />;
      default: return <sphereGeometry args={[0.1, 8, 8]} />;
    }
  }, [shape]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
    </mesh>
  );
}

function OrbitingRing() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });

  const items = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    color: ['#F9C11A', '#F47B20', '#E63329', '#C47C30', '#5D8A3C', '#FDF3E3'][i % 6],
    shape: ['sphere', 'box', 'torus', 'cone'][i % 4] as 'sphere' | 'box' | 'torus' | 'cone',
  })), []);

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <AmbientFoodParticle
          key={i}
          position={[Math.cos(item.angle) * 3.5, Math.sin(item.angle) * 0.5, Math.sin(item.angle) * 3.5]}
          color={item.color}
          shape={item.shape}
        />
      ))}
    </group>
  );
}

function PlanetFood({ position, color, size, speed }: { position: [number, number, number]; color: string; size: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.01 * speed;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <MeshDistortMaterial color={color} distort={0.3} speed={2} roughness={0.4} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <section id="top" className="relative w-full" style={{ height: '100vh', background: 'radial-gradient(ellipse at 50% 30%, #2A0800 0%, #0D0500 70%)' }}>
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#F47B20" />
          <pointLight position={[-5, 3, -3]} intensity={1.5} color="#E63329" />
          <pointLight position={[0, -3, 4]} intensity={1} color="#F9C11A" />
          
          <Stars radius={30} depth={20} count={3000} factor={3} saturation={0} fade speed={0.5} />
          <Environment preset="sunset" />
          
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
            <BurgerHero />
          </Float>
          
          <OrbitingRing />
          
          <PlanetFood position={[-4, 2, -3]} color="#C0392B" size={0.5} speed={0.7} />
          <PlanetFood position={[4.5, -1.5, -4]} color="#F47B20" size={0.7} speed={0.5} />
          <PlanetFood position={[-3, -2, -5]} color="#F9C11A" size={0.4} speed={0.9} />
          <PlanetFood position={[3, 2.5, -6]} color="#5D8A3C" size={0.35} speed={1.1} />
        </Canvas>
      </div>

      {/* Hero text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ paddingTop: '64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center px-4 max-w-4xl mx-auto"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(249,193,26,0.7)' }}>
            ✦ World Food Universe ✦
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter"
            style={{
              background: 'linear-gradient(135deg, #FDF3E3 0%, #F9C11A 40%, #F47B20 70%, #E63329 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
          >
            FOOD
            <br />
            <span style={{ fontSize: '0.7em' }}>UNIVERSE</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
            style={{ color: 'var(--food-cream)' }}
          >
            A cinematic journey through 400+ foods from every corner of the world. Scroll to begin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex items-center justify-center gap-3"
          >
            <div
              className="w-0.5 h-12 mx-auto"
              style={{
                background: 'linear-gradient(to bottom, transparent, #F47B20, transparent)',
                animation: 'float 2s ease-in-out infinite',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(253,243,227,0.35)' }}>
          Scroll
        </p>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(244,123,32,0.5), transparent)' }} />
      </div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0D0500)' }} />
    </section>
  );
}
