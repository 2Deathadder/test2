import { useCallback, useEffect, useRef, useState } from 'react';
import GameCanvas from './components/GameCanvas';

const BEST_KEY = 'willow-run-best';

function PlayIcon() {
  return <span aria-hidden="true" className="play-icon">▶</span>;
}

function App() {
  const [screen, setScreen] = useState('home');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem(BEST_KEY) || 0));
  const gameRef = useRef(null);

  const startGame = useCallback(() => {
    setScore(0);
    setScreen('playing');
  }, []);

  const finishGame = useCallback((finalScore) => {
    const nextBest = Math.max(best, finalScore);
    setScore(finalScore);
    setBest(nextBest);
    localStorage.setItem(BEST_KEY, String(nextBest));
    setScreen('gameover');
  }, [best]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (screen === 'home' || screen === 'gameover') startGame();
      }
      if (event.key.toLowerCase() === 'r' && screen === 'gameover') startGame();
    };
    window.addEventListener('keydown', onKey, { passive: false });
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, startGame]);

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <button className="brand" onClick={() => setScreen('home')} aria-label="Retour à l'accueil">
          <span className="brand-mark">W</span><span>willow<span className="brand-dot">.</span></span>
        </button>
        <div className="status-chip"><span className="status-pulse" /> RUN / 2D</div>
      </header>

      {screen === 'home' && (
        <section className="home-screen" aria-labelledby="home-title">
          <div className="eyebrow"><span className="eyebrow-line" /> ENDLESS MOTION <span className="eyebrow-line" /></div>
          <h1 id="home-title">Keep moving.<br /><em>Stay in the flow.</em></h1>
          <p className="lead">Traverse la ligne d'horizon, évite les anomalies<br className="desktop-only" /> et construis ton meilleur score.</p>
          <button className="primary-button" onClick={startGame}><PlayIcon />Jouer maintenant</button>
          <div className="home-meta"><span>MEILLEUR SCORE <strong>{String(best).padStart(4, '0')}</strong></span><span className="meta-separator" /><span>CLAVIER · MOBILE</span></div>
          <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring ring-a" /><div className="orbit-ring ring-b" /><div className="orbit-core" /></div>
        </section>
      )}

      {screen === 'playing' && (
        <section className="game-screen" aria-label="Zone de jeu">
          <div className="game-heading"><div><span className="eyebrow compact">WILLOW RUN / SESSION ACTIVE</span><h2>Find your rhythm.</h2></div><div className="live-score"><small>DISTANCE</small><strong>{String(score).padStart(4, '0')}<i>m</i></strong></div></div>
          <GameCanvas ref={gameRef} onScore={setScore} onGameOver={finishGame} />
          <p className="controls-hint"><kbd>ESPACE</kbd> ou <span className="tap-dot" /> TAP pour sauter <span className="hint-divider" /> vitesse adaptative</p>
        </section>
      )}

      {screen === 'gameover' && (
        <section className="gameover-screen" aria-labelledby="over-title">
          <div className="over-badge">SESSION TERMINÉE</div>
          <h1 id="over-title">Nice run.<br /><em>Again?</em></h1>
          <div className="result-card"><div><small>SCORE FINAL</small><strong>{String(score).padStart(4, '0')}<i>m</i></strong></div><div className="result-divider" /><div><small>MEILLEUR SCORE</small><strong className="best-number">{String(best).padStart(4, '0')}<i>m</i></strong></div></div>
          <button className="primary-button" onClick={startGame}><PlayIcon />Rejouer</button>
          <button className="text-button" onClick={() => setScreen('home')}>Retour à l'accueil</button>
        </section>
      )}
      <footer className="footer">WILLOW RUN <span>·</span> A SMALL ESCAPE INTO MOTION</footer>
    </main>
  );
}

export default App;