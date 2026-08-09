import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, SlidersHorizontal, Grid2X2, List, ChevronDown, MapPin, ArrowUpRight, X, Menu, Star, Trophy } from 'lucide-react';
import './styles.css';

const players = [
  ['LeBron James','Los Angeles Lakers','SF','West','23', 'King James'], ['Stephen Curry','Golden State Warriors','PG','West','30','Chef Curry'], ['Nikola Jokić','Denver Nuggets','C','West','15','The Joker'], ['Jayson Tatum','Boston Celtics','SF','East','0','JT'], ['Giannis Antetokounmpo','Milwaukee Bucks','PF','East','34','Greek Freak'], ['Luka Dončić','Dallas Mavericks','PG','West','77','Luka Magic'], ['Kevin Durant','Phoenix Suns','SF','West','35','KD'], ['Anthony Edwards','Minnesota Timberwolves','SG','West','5','Ant-Man'], ['Joel Embiid','Philadelphia 76ers','C','East','21','The Process'], ['Shai Gilgeous-Alexander','Oklahoma City Thunder','PG','West','2','SGA'], ['Ja Morant','Memphis Grizzlies','PG','West','12','G12'], ['Devin Booker','Phoenix Suns','SG','West','1','Book'], ['Jimmy Butler','Miami Heat','SF','East','22','Playoff Jimmy'], ['Donovan Mitchell','Cleveland Cavaliers','SG','East','45','Spida'], ['Damian Lillard','Milwaukee Bucks','PG','East','0','Dame Time'], ['Bam Adebayo','Miami Heat','C','East','13','Bam'], ['Jaylen Brown','Boston Celtics','SG','East','7','JB'], ['Anthony Davis','Los Angeles Lakers','PF','West','3','The Brow'], ['Kawhi Leonard','LA Clippers','SF','West','2','The Klaw'], ['Trae Young','Atlanta Hawks','PG','East','11','Ice Trae'], ['Tyrese Haliburton','Indiana Pacers','PG','East','0','Hali'], ['Victor Wembanyama','San Antonio Spurs','C','West','1','Wemby'], ['Paolo Banchero','Orlando Magic','PF','East','5','Paolo'], ['Chet Holmgren','Oklahoma City Thunder','C','West','7','Chet'], ['DeMar DeRozan','Sacramento Kings','SF','West','10','Deebo'], ['Zion Williamson','New Orleans Pelicans','PF','West','1','Zanos'], ['Jalen Brunson','New York Knicks','PG','East','11','JB'], ['Karl-Anthony Towns','New York Knicks','C','East','32','KAT'], ['LaMelo Ball','Charlotte Hornets','PG','East','1','Melo'], ['Scottie Barnes','Toronto Raptors','SF','East','4','Scot Barn']
].map((p, i) => ({ id:i+1, name:p[0], team:p[1], pos:p[2], conf:p[3], number:p[4], nick:p[5], ppg:(18.4 + ((i*3.7)%12)).toFixed(1), rpg:(4.2 + ((i*1.9)%6)).toFixed(1), apg:(3.1 + ((i*1.3)%7)).toFixed(1) }));

const teams = ['All teams','Atlanta Hawks','Boston Celtics','Cleveland Cavaliers','Dallas Mavericks','Golden State Warriors','Los Angeles Lakers','Miami Heat','Milwaukee Bucks','New York Knicks','Oklahoma City Thunder','Phoenix Suns','Philadelphia 76ers'];
const positions = ['All positions','PG','SG','SF','PF','C'];

function Avatar({ player }) {
  const [broken, setBroken] = useState(false);
  return <div className="avatar">{!broken && <img src="/assets/placeholder.jpg" alt="" onError={() => setBroken(true)} />}<span>{player.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><b>{player.number}</b></div>;
}
function PlayerCard({ player, favorite, toggleFavorite }) {
  return <article className="player-card">
    <button className={`favorite ${favorite ? 'active':''}`} onClick={() => toggleFavorite(player.id)} aria-label="Ajouter aux favoris"><Star size={17} fill={favorite ? 'currentColor':'none'} /></button>
    <Avatar player={player}/>
    <div className="player-info"><div className="eyebrow">{player.pos} · #{player.number}</div><h3>{player.name}</h3><p>{player.nick}</p><div className="team"><span className="team-dot" />{player.team}</div></div>
    <div className="stat-row"><div><strong>{player.ppg}</strong><small>PTS</small></div><div><strong>{player.rpg}</strong><small>REB</small></div><div><strong>{player.apg}</strong><small>AST</small></div><button className="open-btn" aria-label="Ouvrir la fiche"><ArrowUpRight size={18}/></button></div>
  </article>
}
function App() {
  const [query,setQuery]=useState(''); const [team,setTeam]=useState('All teams'); const [position,setPosition]=useState('All positions'); const [conf,setConf]=useState('All'); const [view,setView]=useState('grid'); const [favs,setFavs]=useState([]); const [mobileOpen,setMobileOpen]=useState(false);
  const filtered = useMemo(() => players.filter(p => (p.name+p.team+p.nick).toLowerCase().includes(query.toLowerCase()) && (team==='All teams'||p.team===team) && (position==='All positions'||p.pos===position) && (conf==='All'||p.conf===conf)), [query,team,position,conf]);
  const toggle = id => setFavs(x=>x.includes(id)?x.filter(v=>v!==id):[...x,id]);
  return <div className="app">
    <aside className={mobileOpen?'sidebar open':'sidebar'}><div className="brand"><span className="ball">◉</span><span>COURT<span>BOOK</span></span><button className="close" onClick={()=>setMobileOpen(false)}><X size={20}/></button></div><div className="side-label">Directory</div><nav><a className="selected"><Grid2X2 size={18}/>Players <em>450+</em></a><a><Trophy size={18}/>Teams</a><a><Star size={18}/>Favorites <em>{favs.length}</em></a></nav><div className="side-label space">Explore</div><nav><a>Rookies <span>→</span></a><a>Hall of fame <span>→</span></a><a>Stat leaders <span>→</span></a></nav><div className="side-footer"><div className="season">2024 — 25 <ChevronDown size={15}/></div><p>NBA PLAYER DIRECTORY<br/><span>Built for the love of the game.</span></p></div></aside>
    <main><header><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="crumb">PLAYERS <span>/</span> ALL PLAYERS</div><div className="header-actions"><div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search players..."/><kbd>⌘ K</kbd></div><button className="avatar-user">CB</button></div></header>
      <section className="hero"><div><div className="eyebrow orange">THE LEAGUE, AT A GLANCE</div><h1>Every player.<br/><i>Every story.</i></h1><p>Explore the complete NBA roster. Find your favorites, follow the numbers, and stay close to the game.</p></div><div className="hero-art"><div className="rings"/><div className="hero-ball">◉</div><span>EST. 1946</span></div></section>
      <div className="toolbar"><div><h2>All players <span>{filtered.length}</span></h2><p>Showing active NBA players</p></div><div className="controls"><button className="filter-toggle"><SlidersHorizontal size={16}/> Filters</button><div className="segmented"><button className={view==='grid'?'on':''} onClick={()=>setView('grid')}><Grid2X2 size={16}/></button><button className={view==='list'?'on':''} onClick={()=>setView('list')}><List size={16}/></button></div></div></div>
      <div className="filters"><label>CONFERENCE<select value={conf} onChange={e=>setConf(e.target.value)}><option>All</option><option>East</option><option>West</option></select></label><label>POSITION<select value={position} onChange={e=>setPosition(e.target.value)}>{positions.map(x=><option key={x}>{x}</option>)}</select></label><label>TEAM<select value={team} onChange={e=>setTeam(e.target.value)}>{teams.map(x=><option key={x}>{x}</option>)}</select></label><button className="reset" onClick={()=>{setQuery('');setTeam('All teams');setPosition('All positions');setConf('All')}}>Reset filters</button></div>
      <div className={view==='grid'?'players-grid':'players-list'}>{filtered.map(p=><PlayerCard key={p.id} player={p} favorite={favs.includes(p.id)} toggleFavorite={toggle}/>)}</div>{filtered.length===0&&<div className="empty"><MapPin size={25}/>No players match these filters.</div>}
      <footer><span>© 2025 COURTBOOK</span><span>Data refreshed daily <i/> Made for the hardwood</span></footer>
    </main>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);