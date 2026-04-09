import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import EntryGate from './components/EntryGate';
import Header from './components/Header';
import HeroScene from './components/HeroScene';
import MarqueeStrip from './components/MarqueeStrip';
import FoodWorldsScene from './components/FoodWorldsScene';
import FeaturedFoods from './components/FeaturedFoods';
import HowItWorks from './components/HowItWorks';
import FoodAtlas from './components/FoodAtlas';
import BooksSection from './components/BooksSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

type AppState = 'loading' | 'entry' | 'experience';

export default function App() {
  const [state, setState] = useState<AppState>('loading');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setState('entry');
  }, []);

  const handleEnter = useCallback(() => {
    setState('experience');
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--food-dark)' }}>
      {/* Loading screen */}
      {state === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Entry gate */}
      {state === 'entry' && (
        <EntryGate onEnter={handleEnter} />
      )}

      {/* Main experience */}
      {state === 'experience' && (
        <>
          <Header soundEnabled={soundEnabled} onToggleSound={handleToggleSound} />
          <main>
            <HeroScene />
            <MarqueeStrip />
            <FoodWorldsScene />
            <MarqueeStrip />
            <FeaturedFoods />
            <HowItWorks />
            <BooksSection />
            <FoodAtlas />
            <ContactSection />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}
