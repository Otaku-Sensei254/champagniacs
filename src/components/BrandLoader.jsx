import { useEffect, useState } from 'react';
import './BrandLoader.css';

export default function BrandLoader() {
  const [phase, setPhase] = useState('visible');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const exitDelay = prefersReducedMotion ? 350 : 1450;
    const exitTimer = window.setTimeout(() => setPhase('exiting'), exitDelay);
    const removeTimer = window.setTimeout(() => setPhase('done'), exitDelay + (prefersReducedMotion ? 20 : 420));

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`brand-loader ${phase === 'exiting' ? 'is-exiting' : ''}`} role="status">
      <div className="loader-orbit" aria-hidden="true" />
      <img className="loader-logo" src="/logo.jpg" alt="" />
      <p className="loader-wordmark">Champagniacs</p>
      <p className="loader-tagline">Good wine. Better company.</p>
      <div className="loader-progress" role="presentation">
        <span />
      </div>
      <span className="loader-caption">POURING SOMETHING LOVELY</span>
    </div>
  );
}
