import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import './styles.css';

const characters = [
  ['01','Naruto Uzumaki','KONOHA','NINJA / JINCHURIKI','Wind Style'], ['02','Sasuke Uchiha','KONOHA','NINJA / AVENGER','Sharingan'], ['03','Sakura Haruno','KONOHA','MEDICAL NINJA','Chakra Control'], ['04','Kakashi Hatake','KONOHA','JŌNIN / COPY NINJA','Lightning'], ['05','Itachi Uchiha','AKATSUKI','ROGUE NINJA','Mangekyō'], ['06','Gaara','SUNA','KAZEKAGE','Sand Control'], ['07','Hinata Hyūga','KONOHA','NINJA','Byakugan'], ['08','Shikamaru Nara','KONOHA','STRATEGIST','Shadow Possession'], ['09','Jiraiya','KONOHA','SANNIN / SAGE','Toad Sage'], ['10','Orochimaru','OTOGAKURE','SANNIN / SCIENTIST','Snake Sage'], ['11','Tsunade','KONOHA','HOKAGE / MEDIC','Strength'], ['12','Rock Lee','KONOHA','TAIJUTSU SPECIALIST','Eight Gates'], ['13','Neji Hyūga','KONOHA','NINJA','Gentle Fist'], ['14','Might Guy','KONOHA','JŌNIN / TAİJUTSU','Eight Gates'], ['15','Madara Uchiha','AKATSUKI','LEGENDARY NINJA','Rinnegan'], ['16','Obito Uchiha','AKATSUKI','MASKED MAN','Kamui'], ['17','Pain / Nagato','AKATSUKI','LEADER','Rinnegan'], ['18','Konan','AKATSUKI','ROGUE NINJA','Paper Jutsu'], ['19','Killer B','KUMOGAKURE','JINCHURIKI','Eight-Tails'], ['20','Minato Namikaze','KONOHA','FOURTH HOKAGE','Flying Raijin'], ['21','Mito Uzumaki','KONOHA','FIRST JINCHURIKI','Sealing'], ['22','Hashirama Senju','KONOHA','FIRST HOKAGE','Wood Style'], ['23','Tobirama Senju','KONOHA','SECOND HOKAGE','Water Style'], ['24','Kabuto Yakushi','OTOGAKURE','SPY / MEDIC','Sage Mode']
];
const filters = ['ALL', 'KONOHA', 'AKATSUKI', 'SUNA', 'KUMOGAKURE', 'OTOGAKURE'];

function ChakraOrb() {
  const group = useRef();
  useFrame((state, delta) => { if (group.current) { group.current.rotation.y += delta * .25; group.current.rotation.x = Math.sin(state.clock.elapsedTime * .5) * .12; } });
  return <group ref={group}>
    <Float speed={1.5} rotationIntensity={.35} floatIntensity={.5}>
      <Sphere args={[1.12, 48, 48]}><meshStandardMaterial color="#e85d04" emissive="#8d2d00" emissiveIntensity={2.2} roughness={.18} metalness={.3} /></Sphere>
      <Torus args={[1.37, .025, 12, 80]} rotation={[Math.PI / 2, 0, 0]}><meshBasicMaterial color="#ff8a3d" transparent opacity={.8} /></Torus>
      <Torus args={[1.58, .012, 12, 80]} rotation={[.4, 0, 0]}><meshBasicMaterial color="#b94100" transparent opacity={.6} /></Torus>
    </Float>
    <pointLight color="#e85d04" intensity={5} distance={5} />
  </group>;
}
function OrbScene() { return <Canvas camera={{ position: [0, 0, 4.2], fov: 38 }} dpr={[1, 2]}><ambientLight intensity={.3} /><Stars radius={6} depth={3} count={150} factor={1.5} saturation={0} fade /><ChakraOrb /><OrbitControls enableZoom={false} autoRotate autoRotateSpeed={.5} /></Canvas>; }

function Avatar({ index }) { return <div className="avatar"><div className="avatar-mark">{String(index + 1).padStart(2,'0')}</div><div className="avatar-glow" /></div>; }

// FAQ data and component
function FAQ() {
  const items = [
    { q: 'Quels sont les modes de financement disponibles ?', a: "Nous proposons plusieurs options : financement classique sur 24–72 mois, leasing avec apport variable, et paiement en plusieurs fois via des partenaires. Le taux dépendra de votre profil et d'une simple vérification de solvabilité." },
    { q: 'Quelle est la durée de la garantie constructeur et que couvre-t-elle ?', a: "La plupart des véhicules bénéficient d'une garantie constructeur standard de 2 à 5 ans selon le modèle ; elle couvre les défauts de fabrication. Des extensions de garantie optionnelles sont aussi disponibles pour prolonger la couverture." },
    { q: "Puis-je effectuer un essai routier avant d'acheter ?", a: "Oui : les essais routiers se réservent en ligne ou en concession. Apportez un permis valide ; pour certains modèles, un rendez-vous et une caution peuvent être demandés." },
    { q: 'Comment fonctionne la livraison du véhicule et quels sont les délais ?', a: "Livraison en concession ou à domicile selon votre préférence. Les délais varient de quelques jours pour un stock local à plusieurs semaines pour une commande spéciale. Nous confirmons la date dès la préparation du véhicule." }
  ];
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="faq">
      <div className="faq-inner">
        <header className="faq-head"><h2>FAQ</h2><p>Questions fréquentes sur le financement, la garantie, l'essai et la livraison.</p></header>
        <div className="faq-list">
          {items.map((it, i) => (
            <div className={`faq-item ${open === i ? 'open' : ''}`} key={i}>
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="q-text">{it.q}</span>
                <span className="q-arrow">{open === i ? '−' : '+'}</span>
              </button>
              <div className="faq-answer" style={{ display: open === i ? 'block' : 'none' }}>
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [filter, setFilter] = useState('ALL'); const [query, setQuery] = useState(''); const [active, setActive] = useState(null);
  const visible = useMemo(() => characters.filter(c => (filter === 'ALL' || c[2] === filter) && c[1].toLowerCase().includes(query.toLowerCase())), [filter, query]);
  return <main>
    <nav className="nav"><div className="brand"><span className="brand-dot" /> SHINOBI <b>INDEX</b></div><div className="nav-links"><a href="#archive">ARCHIVE</a><a href="#clans">CLANS</a><a href="#about">ABOUT</a></div><div className="nav-status"><span className="live" /> DATABASE // 04.22</div></nav>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">木ノ葉隠れ — THE HIDDEN LEAF VILLAGE</p><h1>THE<br /><em>SHINOBI</em><br />INDEX<span>.</span></h1><p className="lede">An unauthorized field guide to the legends, rogues, and hidden forces of the Naruto world.</p><a className="scroll" href="#archive">↓ <span>EXPLORE ARCHIVE</span></a></div>
      <div className="orb-wrap"><div className="orb-label top">CHAKRA CORE <strong>///</strong></div><OrbScene /><div className="orb-label bottom">INTERACTIVE RELIC <strong>03:44:12</strong></div></div>
      <div className="hero-aside"><span className="vertical">KONOHA ARCHIVES / VOL. 01</span><div className="coord">35° 41' 22" N<br />139° 41' 30" E</div></div>
    </section>
    <section id="archive" className="archive"><header className="section-head"><div><p className="eyebrow">FIELD RECORDS / 001—024</p><h2>CHARACTER <i>ARCHIVE</i></h2></div><div className="count">{visible.length.toString().padStart(2,'0')} <small>ENTRIES</small></div></header>
      <div className="toolbar"><div className="filters">{filters.map(f => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div><label className="search">⌕ <input value={query} onChange={e => setQuery(e.target.value)} placeholder="SEARCH OPERATIVE..." /></label></div>
      <div className="grid">{visible.map((c,i) => <article className="card" key={c[1]} onClick={() => setActive(c)}><div className="card-top"><span>#{c[0]}</span><span className="rank">{c[2]}</span></div><Avatar index={characters.indexOf(c)} /><div className="card-info"><h3>{c[1]}</h3><p>{c[3]}</p></div><div className="card-foot"><span>{c[4]}</span><b>↗</b></div></article>)}</div>
    </section>

    {/* FAQ section added per admin request */}
    <FAQ />

    <footer id="about"><span>SHINOBI INDEX / NARUTO FIELD ARCHIVE</span><span>MADE FOR THE CURIOUS · NOT AFFILIATED WITH RIGHTS HOLDERS</span></footer>
    {active && <div className="modal-backdrop" onClick={() => setActive(null)}><div className="modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setActive(null)}>×</button><p className="eyebrow">OPERATIVE FILE #{active[0]}</p><div className="modal-avatar"><Avatar index={characters.indexOf(active)} /></div><h2>{active[1]}</h2><p className="modal-meta">{active[2]} / {active[3]}</p><div className="intel"><span>PRIMARY TECHNIQUE</span><strong>{active[4]}</strong><span>STATUS</span><strong>ACTIVE IN ARCHIVE</strong></div></div></div>}
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);