import { useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls, RoundedBox, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const flavors = [
  { name: 'Blue Raspberry', short: 'BLUE', color: '#20bce5', dark: '#087ba8', copy: 'A crisp blue blast.' },
  { name: 'Ice Pop', short: 'ICE POP', color: '#f04370', dark: '#a71952', copy: 'Nostalgia, upgraded.' },
  { name: 'Meta Moon', short: 'META', color: '#f1f1f1', dark: '#25252c', copy: 'Out-of-this-world flavor.' },
  { name: 'Lemon Lime', short: 'LEMON', color: '#9be51a', dark: '#437c20', copy: 'Bright. Zesty. Electric.' },
  { name: 'Tropical Punch', short: 'PUNCH', color: '#ee353b', dark: '#991525', copy: 'A full tropical send.' },
  { name: 'Orange', short: 'ORANGE', color: '#f36b31', dark: '#aa3b1a', copy: 'Citrus with serious lift.' },
]

function Bottle({ color, dark }) {
  const group = useMemo(() => new THREE.Group(), [])
  useFrame((state) => { group.rotation.y = Math.sin(state.clock.elapsedTime * .65) * .18 })
  return <group ref={group} position={[0, -.1, 0]}>
    <RoundedBox args={[1.12, 2.45, .72]} radius={.2} smoothness={5} position={[0, 0, 0]}>
      <meshStandardMaterial color={color} roughness={.24} metalness={.08} />
    </RoundedBox>
    <mesh position={[0, 1.27, 0]}><cylinderGeometry args={[.38, .43, .28, 48]} /><meshStandardMaterial color={dark} roughness={.3} /></mesh>
    <mesh position={[0, 1.44, 0]}><cylinderGeometry args={[.31, .31, .1, 48]} /><meshStandardMaterial color={dark} roughness={.3} /></mesh>
    <mesh position={[0, .08, .38]}><planeGeometry args={[.72, 1.62]} /><meshBasicMaterial color={dark} transparent opacity={.92} /></mesh>
    <mesh position={[0, .1, .391]} rotation={[0, 0, Math.PI / 2]}><planeGeometry args={[.045, .54]} /><meshBasicMaterial color={color} /></mesh>
    <mesh position={[0, -.38, .395]}><planeGeometry args={[.44, .035]} /><meshBasicMaterial color="#ffffff" transparent opacity={.55} /></mesh>
  </group>
}

function ProductScene({ flavor }) {
  return <Canvas camera={{ position: [3, 1.2, 4.3], fov: 38 }} dpr={[1, 2]}>
    <ambientLight intensity={1.4} />
    <spotLight position={[3, 5, 4]} intensity={22} color="#ffffff" angle={.35} penumbra={1} />
    <pointLight position={[-3, 1, 1]} intensity={9} color={flavor.color} />
    <Float speed={1.7} rotationIntensity={.18} floatIntensity={.35}><Bottle color={flavor.color} dark={flavor.dark} /></Float>
    <ContactShadows position={[0, -1.35, 0]} opacity={.55} scale={4} blur={2.5} far={3} />
    <Environment preset="city" />
    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.15} maxPolarAngle={1.85} />
  </Canvas>
}

export default function App() {
  const [active, setActive] = useState(0)
  const [cart, setCart] = useState(0)
  const [menu, setMenu] = useState(false)
  const flavor = flavors[active]
  return <main className="grain min-h-screen bg-ink text-white">
    <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <a href="#top" className="font-display text-4xl tracking-[-.08em]">PRIME<span className="text-acid">.</span></a>
      <div className={`${menu ? 'flex' : 'hidden'} absolute left-6 right-6 top-20 flex-col gap-6 rounded-2xl border border-white/10 bg-[#17171c]/95 p-6 backdrop-blur-xl md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
        <a href="#flavors" className="text-sm text-white/70 transition hover:text-acid">FLAVORS</a><a href="#story" className="text-sm text-white/70 transition hover:text-acid">OUR STORY</a><a href="#shop" className="text-sm text-white/70 transition hover:text-acid">SHOP</a>
      </div>
      <div className="flex items-center gap-3"><button onClick={() => setCart(cart + 1)} className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold hover:border-acid hover:text-acid">CART <span className="text-acid">({cart})</span></button><button aria-label="Open menu" onClick={() => setMenu(!menu)} className="md:hidden text-2xl">☰</button></div>
    </nav>

    <section id="top" className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-4 px-6 pb-16 pt-8 lg:grid-cols-[.86fr_1.14fr] lg:px-10 lg:pt-0">
      <div className="relative z-10 max-w-xl">
        <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.28em] text-acid"><span className="h-px w-10 bg-acid"/>Hydration, redefined</p>
        <h1 className="font-display text-[clamp(5rem,12vw,10.8rem)] leading-[.78] tracking-[-.07em]">FUEL<br/><span className="text-acid">YOUR</span><br/>PRIME.</h1>
        <p className="mt-8 max-w-sm text-base leading-7 text-white/55">Electrolytes, BCAAs and antioxidants. Zero added sugar. Flavor that hits different.</p>
        <div className="mt-9 flex flex-wrap items-center gap-4"><a href="#flavors" className="rounded-full bg-acid px-7 py-4 text-xs font-black tracking-widest text-ink transition hover:scale-105">EXPLORE FLAVORS ↗</a><span className="text-xs text-white/40">20oz / 591ml</span></div>
      </div>
      <div className="relative h-[500px] min-h-[420px] lg:h-[650px]">
        <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700" style={{ backgroundColor: flavor.color, opacity: .2 }} />
        <div className="absolute right-4 top-8 z-10 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] backdrop-blur">01 / 06</div>
        <ProductScene flavor={flavor} />
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center"><p className="font-display text-3xl tracking-tight">{flavor.name.toUpperCase()}</p><p className="text-xs text-white/45">{flavor.copy}</p></div>
      </div>
    </section>

    <section id="flavors" className="border-y border-white/10 bg-[#111116] px-6 py-16 lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-acid">Pick your power</p><h2 className="font-display text-5xl tracking-[-.04em] md:text-7xl">THE LINEUP<span className="text-acid">.</span></h2></div><span className="hidden text-xs text-white/35 md:block">SCROLL TO DISCOVER ↓</span></div><div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{flavors.map((item, i) => <button key={item.name} onClick={() => setActive(i)} className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition duration-300 ${active === i ? 'border-acid bg-white/10' : 'border-white/10 bg-white/[.025] hover:border-white/40'}`}><div className="mb-3 flex h-36 items-center justify-center rounded-xl" style={{ background: `linear-gradient(145deg, ${item.color}55, ${item.dark}88)` }}><div className="bottle-shadow h-28 w-12 rounded-[13px] border-2 border-white/25" style={{ background: item.color }}><div className="mt-9 h-12 bg-black/75" /></div></div><p className="text-[10px] font-black tracking-[.12em] text-white/50">0{i + 1}</p><p className="mt-1 text-xs font-bold">{item.name}</p></button>)}</div></div></section>

    <section id="story" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10"><div className="overflow-hidden rounded-3xl border border-white/10 bg-[#16161b] p-3"><img src="assets/photo-1.jpg" alt="Collection de bouteilles PRIME" className="h-full min-h-[360px] w-full rounded-2xl object-cover object-center" /></div><div className="flex flex-col justify-center"><p className="mb-4 text-xs font-bold uppercase tracking-[.25em] text-acid">Built different</p><h2 className="font-display text-6xl leading-[.88] tracking-[-.05em] md:text-8xl">MORE THAN<br/><span className="text-acid">A DRINK.</span></h2><p className="mt-8 max-w-md text-base leading-7 text-white/55">Prime was created to fill the gap between flavor and function. Every bottle is designed to help you stay hydrated, keep moving and make every moment count.</p><div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6"><div><strong className="font-display text-3xl">10</strong><p className="mt-1 text-[10px] uppercase text-white/40">Calories</p></div><div><strong className="font-display text-3xl">0g</strong><p className="mt-1 text-[10px] uppercase text-white/40">Added sugar</p></div><div><strong className="font-display text-3xl">834mg</strong><p className="mt-1 text-[10px] uppercase text-white/40">Electrolytes</p></div></div></div></section>

    <section id="shop" className="bg-acid px-6 py-16 text-ink lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="mb-3 text-xs font-black uppercase tracking-[.25em]">Ready when you are</p><h2 className="font-display text-6xl leading-[.82] tracking-[-.05em] md:text-8xl">STAY<br/>HYDRATED.</h2></div><div className="max-w-sm"><p className="mb-6 text-sm leading-6 opacity-70">Build your flavor pack and get your next hydration fix delivered.</p><button onClick={() => setCart(cart + 1)} className="rounded-full bg-ink px-7 py-4 text-xs font-black tracking-widest text-white transition hover:scale-105">ADD A VARIETY PACK — $29.99</button></div></div></section>
    <footer className="flex flex-col justify-between gap-5 px-6 py-8 text-xs text-white/40 md:flex-row lg:px-10"><span className="font-display text-2xl tracking-[-.08em] text-white">PRIME<span className="text-acid">.</span></span><span>© 2024 PRIME HYDRATION · MADE TO MOVE</span><span>INSTAGRAM&nbsp;&nbsp; TIKTOK&nbsp;&nbsp; YOUTUBE</span></footer>
  </main>
}