import React, { useState } from 'react';

export default function AdminPanel({ akatsukiImages = {}, setAkatsukiImages = () => {}, akatsukiList = [] }) {
  const [selected, setSelected] = useState(akatsukiList[0] ? akatsukiList[0][0] : '');
  const [preview, setPreview] = useState(null);

  function onFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(f);
  }

  function save() {
    if (!selected || !preview) return;
    const next = { ...(akatsukiImages || {}) };
    next[selected] = preview;
    setAkatsukiImages(next);
    alert('Image enregistrée pour ' + selected);
  }
  function remove() {
    if (!selected) return;
    const next = { ...(akatsukiImages || {}) };
    delete next[selected];
    setAkatsukiImages(next);
    setPreview(null);
  }

  return (
    <div style={{ width: 360, background: '#111', border: '1px solid rgba(232,93,4,.12)', padding: 14, borderRadius: 12, boxShadow: '0 6px 30px rgba(0,0,0,.6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <strong style={{ color: '#e85d04' }}>Admin — Akatsuki Images</strong>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', color: '#cfc8be', fontSize: 13, marginBottom: 6 }}>Member</label>
        <select value={selected} onChange={e => { setSelected(e.target.value); setPreview((akatsukiImages || {})[e.target.value] || null); }} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: '#0b0b0a', color: '#eee9df', border: '1px solid #232020' }}>
          {akatsukiList.map(m => <option key={m[0]} value={m[0]}>{m[0]} — {m[1]}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', color: '#cfc8be', fontSize: 13, marginBottom: 6 }}>Upload image (png / jpg)</label>
        <input type="file" accept="image/*" onChange={onFile} style={{ color: '#eee9df' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', color: '#cfc8be', fontSize: 13, marginBottom: 6 }}>Preview</label>
        <div style={{ width: '100%', height: 120, borderRadius: 8, background: '#0b0b0a', display: 'grid', placeItems: 'center', border: '1px dashed #232020' }}>
          {preview ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} /> : <div style={{ color: '#85817a' }}>Aucune image</div>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={save} style={{ flex: 1, padding: '8px 10px', background: '#e85d04', color: '#0b0b0a', borderRadius: 8, border: 0 }}>Enregistrer</button>
        <button onClick={remove} style={{ padding: '8px 10px', background: '#222', color: '#e85d04', borderRadius: 8, border: 0 }}>Supprimer</button>
      </div>
      <div style={{ marginTop: 12, color: '#85817a', fontSize: 13 }}>
        <strong style={{ color: '#cfc8be' }}>Current uploads</strong>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {Object.keys(akatsukiImages || {}).length === 0 && <div style={{ color: '#666' }}>Aucune image enregistrée</div>}
          {Object.entries(akatsukiImages || {}).map(([k,v]) => <div key={k} style={{ width: 64, height: 64, borderRadius: 6, overflow: 'hidden', border: '1px solid #232020' }} title={k}><img src={v} alt={k} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>)}
        </div>
      </div>
    </div>
  );
}
