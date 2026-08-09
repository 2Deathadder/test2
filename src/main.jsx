import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';

function ArcSpeaker() {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.55) * 0.035;
  });
  return (
    <group ref={group} rotation={[0.08, -0.45, 0]}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <torusGeometry args={[1.34, 0.23, 32, 96, Math.PI * 1.7]} />
        <meshStandardMaterial color="#e8582a" roughness={0.27} metalness={0.12} />
      </mesh>
      <mesh castShadow position={[0.02, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.04, 1.04, 0.18, 64]} />
        <meshStandardMaterial color="#171716" roughness={0.24} metalness={0.3} />
      </mesh>
      <mesh position={[0.02, 0.1, 0.14]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.8, 0.8, 0.19, 64]} />
        <meshStandardMaterial color="#282725" roughness={0.72} />
      </mesh>
      <mesh position={[0.03, 0, 0.26]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.6, 0.012, 12, 64]} />
        <meshBasicMaterial color="#e8582a" />
      </mesh>
      <mesh position={[0.03, 0, 0.27]} rotation={[0, 0, Math.PI / 2]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshBasicMaterial color="#f9b49c" />
      </mesh>
    </group>
  );
}

function ProductScene() {
  return (
    <Canvas shadows camera={{ position: [0, 0.5, 4.6], fov: 34 }} dpr={[1, 2]}>
      <ambientLight intensity={1.4} />
      <spotLight position={[3, 4, 4]} intensity={80} angle={0.35} penumbra={1} castShadow />
      <pointLight position={[-3, 1, 1]} intensity={12} color="#e8582a" />
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.3}>
        <ArcSpeaker />
      </Float>
      <ContactShadows position={[0, -1.48, 0]} opacity={0.34} scale={5} blur={2.5} far={3} />
      <Environment preset="studio" />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.35} maxPolarAngle={Math.PI / 1.75} />
    </Canvas>
  );
}

const features = [
  ['01', 'Room-filling clarity', 'A custom acoustic architecture that makes every note feel close, dimensional, and true.'],
  ['02', 'Quietly intelligent', 'Adaptive listening reads your room and shapes the sound around how you live.'],
  ['03', 'Made to be seen', 'A tactile object in anodised aluminium, designed to age beautifully in any space.']
];

function Arrow() { return <span className="arrow">↗</span>; }

function App() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="site-shell">
      <header className="nav">
        <button className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>AURA<span>—</span>ARC</button>
        <nav className="nav-links" aria-label="Main navigation">
          <button onClick={() => scrollTo('story')}>The story</button>
          <button onClick={() => scrollTo('details')}>Details</button>
          <button onClick={() => scrollTo('order')}>Order</button>
        </nav>
        <button className="menu-button" aria-label="Open menu"><span></span><span></span></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="dot"></span> A new kind of listening</p>
            <h1>Sound,<br /><em>sculpted.</em></h1>
            <p className="hero-intro">AURA ARC is an intelligent speaker shaped around the way sound moves — and the way you live.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => scrollTo('order')}>Discover AURA ARC <Arrow /></button>
              <button className="text-link" onClick={() => scrollTo('story')}>Explore the story <span>↓</span></button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-label label-top">OBJECT / 001<br /><span>THE ARC SPEAKER</span></div>
            <ProductScene />
            <div className="visual-label label-bottom">DRAG TO ROTATE <span className="cross">+</span></div>
            <div className="orange-orb"></div>
          </div>
          <div className="scroll-mark">SCROLL TO EXPLORE <span>↓</span></div>
        </section>

        <section className="manifesto" id="story">
          <div className="section-kicker">AURA ARC / PHILOSOPHY</div>
          <div className="manifesto-content"><h2>Less machine.<br /><span>More presence.</span></h2><p>We believe technology should earn its place in your home. ARC is a considered object: responsive when you need it, almost invisible when you don't.</p></div>
        </section>

        <section className="features" id="details">
          <div className="section-kicker">WHY ARC <span>03 / 03</span></div>
          <div className="feature-grid">{features.map(([number, title, text]) => <article className="feature" key={number}><div className="feature-number">{number}</div><div><h3>{title}</h3><p>{text}</p><button className="circle-link" aria-label={`Read more about ${title}`}><Arrow /></button></div></article>)}</div>
        </section>

        <section className="specs" id="order">
          <div className="specs-copy"><p className="eyebrow"><span className="dot"></span> The quiet statement</p><h2>Beautifully<br /><em>in tune.</em></h2><p>Engineered in Copenhagen. Tuned by hand. ARC brings a richer, more responsive sound to the rituals you already love.</p><button className="button button-light">Reserve yours <Arrow /></button></div>
          <div className="spec-table"><div><span>Dimensions</span><strong>28 × 28 × 12 cm</strong></div><div><span>Weight</span><strong>3.8 kg</strong></div><div><span>Finish</span><strong>Arc Orange / Graphite</strong></div><div><span>Connectivity</span><strong>Wi-Fi 6 · Bluetooth 5.3</strong></div><div><span>Price</span><strong>€499 <small>incl. VAT</small></strong></div></div>
        </section>
      </main>
      <footer className="footer"><div className="wordmark footer-mark">AURA<span>—</span>ARC</div><p>Sound for considered living.</p><div className="footer-links"><a href="mailto:hello@aura-arc.example">Contact</a><a href="#story">Instagram</a><a href="#details">Journal</a></div><div className="copyright">© 2025 AURA ARC</div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);