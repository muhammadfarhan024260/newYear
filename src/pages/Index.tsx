import * as React from 'react';
import OpeningScene from '@/components/OpeningScene';
import CelebrationScene from '@/components/CelebrationScene';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const [scene, setScene] = React.useState<'opening' | 'celebration'>('opening');

  const handleTransition = () => {
    setScene('celebration');
  };

  return (
    <>
      <Helmet>
        <title>Happy New Year 2026 </title>
        <meta name="description" content="An immersive, cinematic New Year 2025 celebration experience. Click to begin your journey into the new year with stunning animations and magical interactions." />
        <meta name="keywords" content="New Year 2026, Happy New Year, celebration, wishes, animated greeting" />
        <meta property="og:title" content="Happy New Year 2026" />
        <meta property="og:description" content="An immersive celebration experience for the New Year" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <main className="min-h-screen overflow-hidden">
        {scene === 'opening' && <OpeningScene onTransition={handleTransition} />}
        {scene === 'celebration' && <CelebrationScene />}
      </main>
    </>
  );
};

export default Index;
