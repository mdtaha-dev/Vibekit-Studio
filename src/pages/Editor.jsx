import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
    display: inline-block;
    line-height: 1;
  }

  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 10px; }

  .section-btn:hover { background-color: #2a2a2a !important; }

  /* ── Base (mobile-first) ── */
  .editor-root {
    background-color: #131313;
    color: #f0ede6;
    font-family: 'DM Sans', sans-serif;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Fixed top bar */
  .editor-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    height: 3.5rem;
    background-color: #131313;
    border-bottom: 1px solid #222222;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.75rem;
    gap: 0.5rem;
  }

  .header-left  { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
  .header-center { display: none; } /* hidden on mobile */
  .header-right { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }

  /* Body below header */
  .editor-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    margin-top: 3.5rem;
  }

  /* Sidebar — stacks on top on mobile */
  .editor-sidebar {
    width: 100%;
    max-height: 40vh;
    background-color: #0e0e0e;
    border-bottom: 1px solid #222222;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 0;
  }

  /* Preview — fills remaining space */
  .editor-main {
    flex: 1;
    overflow-y: auto;
    background-color: #131313;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
  }

  /* Title input */
  .title-input {
    background: transparent;
    color: #f0ede6;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.6875rem;
    letter-spacing: 0.05em;
    outline: none;
    width: 9rem;
    padding-bottom: 2px;
    border: none;
    border-bottom: 1px solid #524437;
  }

  /* Save / status text — hidden on very small */
  .save-status { display: none; }

  /* ── Tablet (≥768px) ── */
  @media (min-width: 768px) {
    .editor-header {
      height: 4rem;
      padding: 0 1.25rem;
      gap: 1rem;
    }
    .header-left  { gap: 0.75rem; }
    .header-right { gap: 0.75rem; }
    .header-center {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      font-family: 'Syne', sans-serif;
      letter-spacing: 0.12em;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.625rem;
    }
    .editor-body { margin-top: 4rem; }
    .title-input { width: 11rem; }
    .save-status { display: flex; }
  }

  /* ── Desktop (≥1280px) — sidebar goes to the left ── */
  @media (min-width: 1280px) {
    .editor-header { padding: 0 1.5rem; gap: 1.5rem; }
    .header-left  { gap: 1rem; }
    .header-right { gap: 1rem; }
    .header-center { gap: 2rem; }
    .title-input { width: 14rem; }

    .editor-body {
      flex-direction: row;
    }
    .editor-sidebar {
      width: 20rem;
      max-height: none;
      height: 100%;
      border-bottom: none;
      border-right: 1px solid #222222;
      flex-shrink: 0;
    }
    .editor-main {
      padding: 2rem;
    }
  }

  /* Preview grids */
  .preview-grid-features {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (min-width: 600px) {
    .preview-grid-features { grid-template-columns: repeat(3, 1fr); }
  }

  .preview-grid-gallery {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  @media (min-width: 480px) {
    .preview-grid-gallery { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 768px) {
    .preview-grid-gallery { grid-template-columns: repeat(3, 1fr); }
  }
`

const inputBase = {
  width: '100%',
  backgroundColor: '#0e0e0e',
  border: '1px solid #222222',
  color: '#f0ede6',
  borderRadius: '0.125rem',
  padding: '0.5rem 0.75rem',
  fontSize: '0.875rem',
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelBase = {
  display: 'block',
  fontSize: '0.5625rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: '#71717a',
  fontFamily: "'DM Sans', sans-serif",
  marginBottom: '0.25rem',
}

const THEMES = [
  { key: 'minimal', label: 'Minimal', bg: '#f5f5f5' },
  { key: 'neobrutал', label: 'Neo-Brutal', bg: '#f5f500' },
  { key: 'neon', label: 'Neon', bg: '#050508', accent: '#00ffe0' },
  { key: 'pastel', label: 'Pastel', bg: '#fce4ec' },
  { key: 'luxury', label: 'Luxury', bg: '#1a1208', accent: '#c9a84c' },
  { key: 'retro', label: 'Retro', bg: '#2d4a1e', accent: '#a3e635' },
]

const DEVICE_MODES = [
  { label: 'Desktop', icon: 'desktop_windows', width: '100%' },
  { label: 'Tablet', icon: 'tablet_mac', width: '768px' },
  { label: 'Mobile', icon: 'smartphone', width: '375px' },
]

const DEFAULT_CONTENT = {
  hero: {
    title: 'Welcome to My Page',
    subtitle: 'Built with VibeKit Studio',
    buttonText: 'Get Started',
    buttonUrl: '#features',
  },
  features: [
    { id: 'f1', title: 'Feature One', description: 'Describe your first key feature here.' },
    { id: 'f2', title: 'Feature Two', description: 'Describe your second key feature here.' },
    { id: 'f3', title: 'Feature Three', description: 'Describe your third key feature here.' },
  ],
  gallery: [
    { id: 'g1', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', alt: 'Gallery 1' },
    { id: 'g2', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', alt: 'Gallery 2' },
    { id: 'g3', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', alt: 'Gallery 3' },
  ],
  contact: {
    heading: 'Get in Touch',
    subheading: 'We would love to hear from you.',
  },
  sectionOrder: ['hero', 'features', 'gallery', 'contact'],
}

export default function Editor() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [theme, setTheme] = useState('minimal')
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [status, setStatus] = useState('draft')
  const [expandedSection, setExpandedSection] = useState('hero')
  const [activeDevice, setActiveDevice] = useState('Desktop')
  const [saveState, setSaveState] = useState('idle')
  const [publishing, setPublishing] = useState(false)

  const autoSaveTimer = useRef(null)

  // ── Load ─────────────────────────────────────────────────
  useEffect(() => {
    async function loadPage() {
      const { data, error } = await api.pages.get(id)
      if (error) { setError(error); setLoading(false); return }
      const p = data.page
      setPage(p)
      setTitle(p.title)
      setTheme(p.theme)
      setStatus(p.status)
      setContent(p.content && Object.keys(p.content).length > 0 ? p.content : DEFAULT_CONTENT)
      setLoading(false)
    }
    loadPage()
  }, [id])

  // ── Save ─────────────────────────────────────────────────
  const save = useCallback(async (overrides = {}) => {
    setSaveState('saving')
    const { error } = await api.pages.update(id, {
      title: overrides.title ?? title,
      theme: overrides.theme ?? theme,
      content: overrides.content ?? content,
    })
    if (error) { setSaveState('error'); return }
    setSaveState('saved')
    setTimeout(() => setSaveState('idle'), 2000)
  }, [id, title, theme, content])

  function triggerAutoSave(overrides = {}) {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => save(overrides), 2000)
  }

  // ── Content helpers ───────────────────────────────────────
  function updateHero(field, value) {
    const updated = { ...content, hero: { ...content.hero, [field]: value } }
    setContent(updated); triggerAutoSave({ content: updated })
  }
  function updateFeature(i, field, value) {
    const features = content.features.map((f, idx) => idx === i ? { ...f, [field]: value } : f)
    const updated = { ...content, features }
    setContent(updated); triggerAutoSave({ content: updated })
  }
  function addFeature() {
    if (content.features.length >= 6) return
    const features = [...content.features, { id: `f${Date.now()}`, title: 'New Feature', description: 'Describe it here.' }]
    const updated = { ...content, features }
    setContent(updated); triggerAutoSave({ content: updated })
  }
  function removeFeature(i) {
    if (content.features.length <= 3) return
    const features = content.features.filter((_, idx) => idx !== i)
    const updated = { ...content, features }
    setContent(updated); triggerAutoSave({ content: updated })
  }
  function updateGalleryImage(i, field, value) {
    const gallery = content.gallery.map((g, idx) => idx === i ? { ...g, [field]: value } : g)
    const updated = { ...content, gallery }
    setContent(updated); triggerAutoSave({ content: updated })
  }
  function addGalleryImage() {
    if (content.gallery.length >= 8) return
    const gallery = [...content.gallery, { id: `g${Date.now()}`, url: '', alt: 'New image' }]
    const updated = { ...content, gallery }
    setContent(updated); triggerAutoSave({ content: updated })
  }
  function removeGalleryImage(i) {
    if (content.gallery.length <= 3) return
    const gallery = content.gallery.filter((_, idx) => idx !== i)
    const updated = { ...content, gallery }
    setContent(updated); triggerAutoSave({ content: updated })
  }
  function updateContact(field, value) {
    const updated = { ...content, contact: { ...content.contact, [field]: value } }
    setContent(updated); triggerAutoSave({ content: updated })
  }
  function updateTitle(value) {
    setTitle(value); triggerAutoSave({ title: value })
  }
  function updateTheme(key) {
    setTheme(key); save({ theme: key })
  }
  function moveSection(section, direction) {
    const order = [...content.sectionOrder]
    const idx = order.indexOf(section)
    if (direction === 'up' && idx > 0)
      [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]]
    else if (direction === 'down' && idx < order.length - 1)
      [order[idx], order[idx + 1]] = [order[idx + 1], order[idx]]
    const updated = { ...content, sectionOrder: order }
    setContent(updated); triggerAutoSave({ content: updated })
  }

  async function handlePublishToggle() {
    setPublishing(true)
    await save()
    const fn = status === 'published' ? api.pages.unpublish : api.pages.publish
    const { data, error } = await fn(id)
    if (error) { setError(error); setPublishing(false); return }
    setStatus(data.page.status)
    setPublishing(false)
  }

  const previewWidth = DEVICE_MODES.find(d => d.label === activeDevice)?.width || '100%'

  // ── Loading / Error ───────────────────────────────────────
  if (loading) return (
    <div style={{ height: '100vh', backgroundColor: '#131313', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8a045' }}>LOADING...</p>
    </div>
  )
  if (error) return (
    <div style={{ height: '100vh', backgroundColor: '#131313', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <p style={{ color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
      <button onClick={() => navigate('/app')} style={{ color: '#e8a045', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Syne', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        BACK TO DASHBOARD
      </button>
    </div>
  )

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>

      <div className="editor-root">

        {/* ── HEADER ── */}
        <header className="editor-header">

          {/* Left */}
          <div className="header-left">
            <button onClick={() => navigate('/app')} style={{ color: '#e8a045', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.5rem', color: '#71717a', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.2 }}>EDITING</span>
              <input
                type="text"
                className="title-input"
                value={title}
                onChange={(e) => updateTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Center — device toggles, hidden on mobile */}
          <nav className="header-center">
            {DEVICE_MODES.map(({ label, icon }) => (
              <button key={label} onClick={() => setActiveDevice(label)} style={{
                color: activeDevice === label ? '#e8a045' : '#71717a',
                borderBottom: activeDevice === label ? '2px solid #e8a045' : '2px solid transparent',
                paddingBottom: '0.25rem',
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s',
                fontSize: '0.625rem', fontFamily: "'Syne', sans-serif", fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="header-right">
            {/* Save status — hidden on mobile via CSS */}
            <div className="save-status" style={{ alignItems: 'center', gap: '0.5rem' }}>
              {saveState === 'saving' && <span style={{ fontSize: '0.5625rem', color: '#71717a', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>SAVING...</span>}
              {saveState === 'saved' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '0.3rem', height: '0.3rem', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
                  <span style={{ fontSize: '0.5625rem', color: '#10b981', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>SAVED</span>
                </div>
              )}
              {saveState === 'error' && <span style={{ fontSize: '0.5625rem', color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>SAVE FAILED</span>}
            </div>

            <button onClick={() => save()} style={{ padding: '0.375rem 0.75rem', fontSize: '0.5625rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', border: '1px solid #e8a045', color: '#e8a045', background: 'none', borderRadius: '0.25rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              SAVE
            </button>

            <button onClick={handlePublishToggle} disabled={publishing} style={{ padding: '0.375rem 0.75rem', fontSize: '0.5625rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: status === 'published' ? 'transparent' : '#e8a045', color: status === 'published' ? '#ff6b6b' : '#0a0a0a', border: status === 'published' ? '1px solid #ff6b6b' : 'none', borderRadius: '0.25rem', cursor: publishing ? 'not-allowed' : 'pointer', opacity: publishing ? 0.7 : 1, whiteSpace: 'nowrap' }}>
              {publishing ? '...' : status === 'published' ? 'UNPUBLISH' : 'PUBLISH'}
            </button>

            {status === 'published' && page?.slug && (
              <a href={`/p/${page.slug}`} target="_blank" rel="noreferrer" style={{ color: '#71717a', display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>open_in_new</span>
              </a>
            )}
          </div>
        </header>

        {/* ── BODY ── */}
        <div className="editor-body">

          {/* ── SIDEBAR ── */}
          <aside className="editor-sidebar">
            <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {content.sectionOrder.map((section, idx) => (
                <div key={section}>

                  {/* Section header row */}
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: expandedSection === section ? '#2a2a2a' : '#201f1f', borderRadius: '0.25rem 0.25rem 0 0', overflow: 'hidden' }}>
                    <button className="section-btn" onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                      style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0.875rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: expandedSection === section ? '#e8a045' : '#a1a1a1' }}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </span>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: expandedSection === section ? '#e8a045' : '#71717a', transform: expandedSection === section ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>chevron_right</span>
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 0.375rem' }}>
                      <button onClick={() => moveSection(section, 'up')} disabled={idx === 0} style={{ background: 'none', border: 'none', cursor: idx === 0 ? 'not-allowed' : 'pointer', color: idx === 0 ? '#333' : '#71717a', padding: '0.1rem', lineHeight: 1 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>expand_less</span>
                      </button>
                      <button onClick={() => moveSection(section, 'down')} disabled={idx === content.sectionOrder.length - 1} style={{ background: 'none', border: 'none', cursor: idx === content.sectionOrder.length - 1 ? 'not-allowed' : 'pointer', color: idx === content.sectionOrder.length - 1 ? '#333' : '#71717a', padding: '0.1rem', lineHeight: 1 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>expand_more</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded panel */}
                  {expandedSection === section && (
                    <div style={{ backgroundColor: '#201f1f', padding: '0.875rem', borderRadius: '0 0 0.25rem 0.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.25rem' }}>

                      {section === 'hero' && (
                        <>
                          <div>
                            <label style={labelBase}>Title</label>
                            <input type="text" value={content.hero.title} onChange={(e) => updateHero('title', e.target.value)} style={inputBase} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                          </div>
                          <div>
                            <label style={labelBase}>Subtitle</label>
                            <textarea value={content.hero.subtitle} onChange={(e) => updateHero('subtitle', e.target.value)} style={{ ...inputBase, height: '4rem', resize: 'none' }} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <div>
                              <label style={labelBase}>Button Text</label>
                              <input type="text" value={content.hero.buttonText} onChange={(e) => updateHero('buttonText', e.target.value)} style={inputBase} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                            </div>
                            <div>
                              <label style={labelBase}>Button URL</label>
                              <input type="text" value={content.hero.buttonUrl} onChange={(e) => updateHero('buttonUrl', e.target.value)} style={inputBase} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                            </div>
                          </div>
                        </>
                      )}

                      {section === 'features' && (
                        <>
                          {content.features.map((feature, i) => (
                            <div key={feature.id} style={{ padding: '0.625rem', backgroundColor: '#0e0e0e', borderRadius: '0.125rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.5rem', color: '#e8a045', fontFamily: "'Syne', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>FEATURE {i + 1}</span>
                                {content.features.length > 3 && (
                                  <button onClick={() => removeFeature(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#616161', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>close</span>
                                  </button>
                                )}
                              </div>
                              <input type="text" placeholder="Feature title" value={feature.title} onChange={(e) => updateFeature(i, 'title', e.target.value)} style={inputBase} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                              <textarea placeholder="Short description" value={feature.description} onChange={(e) => updateFeature(i, 'description', e.target.value)} style={{ ...inputBase, height: '3rem', resize: 'none' }} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                            </div>
                          ))}
                          {content.features.length < 6 && (
                            <button onClick={addFeature} style={{ width: '100%', padding: '0.5rem', backgroundColor: 'transparent', border: '1px dashed #333333', color: '#616161', fontFamily: "'Syne', sans-serif", fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', borderRadius: '0.125rem' }}>
                              + ADD FEATURE
                            </button>
                          )}
                        </>
                      )}

                      {section === 'gallery' && (
                        <>
                          {content.gallery.map((img, i) => (
                            <div key={img.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', padding: '0.625rem', backgroundColor: '#0e0e0e', borderRadius: '0.125rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.5rem', color: '#e8a045', fontFamily: "'Syne', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>IMAGE {i + 1}</span>
                                {content.gallery.length > 3 && (
                                  <button onClick={() => removeGalleryImage(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#616161', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>close</span>
                                  </button>
                                )}
                              </div>
                              {img.url && <img src={img.url} alt={img.alt} style={{ width: '100%', height: '4rem', objectFit: 'cover', borderRadius: '0.125rem', opacity: 0.7 }} onError={(e) => e.target.style.display = 'none'} />}
                              <input type="text" placeholder="Image URL" value={img.url} onChange={(e) => updateGalleryImage(i, 'url', e.target.value)} style={inputBase} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                              <input type="text" placeholder="Alt text" value={img.alt} onChange={(e) => updateGalleryImage(i, 'alt', e.target.value)} style={{ ...inputBase, fontSize: '0.75rem' }} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                            </div>
                          ))}
                          {content.gallery.length < 8 && (
                            <button onClick={addGalleryImage} style={{ width: '100%', padding: '0.5rem', backgroundColor: 'transparent', border: '1px dashed #333333', color: '#616161', fontFamily: "'Syne', sans-serif", fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', borderRadius: '0.125rem' }}>
                              + ADD IMAGE
                            </button>
                          )}
                        </>
                      )}

                      {section === 'contact' && (
                        <>
                          <div>
                            <label style={labelBase}>Heading</label>
                            <input type="text" value={content.contact.heading} onChange={(e) => updateContact('heading', e.target.value)} style={inputBase} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                          </div>
                          <div>
                            <label style={labelBase}>Subheading</label>
                            <input type="text" value={content.contact.subheading} onChange={(e) => updateContact('subheading', e.target.value)} style={inputBase} onFocus={(e) => e.target.style.borderColor = '#e8a045'} onBlur={(e) => e.target.style.borderColor = '#222222'} />
                          </div>
                          <p style={{ fontSize: '0.5625rem', color: '#616161', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic' }}>
                            Name, email, and message fields render automatically.
                          </p>
                        </>
                      )}

                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Theme Picker */}
            <div style={{ padding: '1rem', borderTop: '1px solid #222222', backgroundColor: '#0a0a0a', flexShrink: 0 }}>
              <h3 style={{ fontSize: '0.5625rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', color: '#71717a' }}>THEME ENGINE</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
                {THEMES.map(({ key, label, bg, accent }) => (
                  <div key={key} onClick={() => updateTheme(key)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                    <div style={{ width: '100%', aspectRatio: '1', backgroundColor: bg, borderRadius: '0.25rem', border: accent ? `2px solid ${accent}` : 'none', outline: theme === key ? '2px solid #e8a045' : 'none', outlineOffset: '2px', opacity: theme === key ? 1 : 0.6, transition: 'all 0.2s' }} />
                    <span style={{ fontSize: '0.4375rem', fontWeight: 700, textTransform: 'uppercase', color: theme === key ? '#f0ede6' : '#71717a', fontFamily: "'DM Sans', sans-serif", textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── PREVIEW ── */}
          <main className="editor-main custom-scrollbar">
            <div style={{ width: previewWidth, maxWidth: '100%', transition: 'width 0.3s ease', display: 'flex', flexDirection: 'column' }}>

              {/* Browser chrome bar */}
              <div style={{ height: '2.25rem', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', padding: '0 0.875rem', borderRadius: '0.5rem 0.5rem 0 0', border: '1px solid #222222', borderBottom: 'none' }}>
                <div style={{ display: 'flex', gap: '0.375rem', marginRight: '1rem' }}>
                  {['#ef4444', '#f59e0b', '#10b981'].map((c) => (
                    <div key={c} style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: c, opacity: 0.6 }} />
                  ))}
                </div>
                <div style={{ flex: 1, maxWidth: '18rem', height: '1.125rem', backgroundColor: '#0e0e0e', borderRadius: '0.125rem', display: 'flex', alignItems: 'center', padding: '0 0.5rem', gap: '0.25rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '0.5625rem', color: '#52525b' }}>lock</span>
                  <span style={{ fontSize: '0.4375rem', color: '#71717a', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    vibekit.studio/p/{page?.slug}
                  </span>
                </div>
              </div>

              {/* Preview content */}
              <div style={{ backgroundColor: '#201f1f', border: '1px solid #222222', borderTop: 'none', borderRadius: '0 0 0.5rem 0.5rem', minHeight: '50vh', overflow: 'hidden' }}>
                <PreviewContent content={content} theme={theme} />
              </div>

            </div>
          </main>

        </div>
      </div>
    </>
  )
}

// ── LIVE PREVIEW ───────────────────────────────────────────

function PreviewContent({ content, theme }) {
  const t = getThemeTokens(theme)
  return (
    <div style={{ backgroundColor: t.bg, color: t.text, fontFamily: t.fontBody, minHeight: '100%' }}>
      {content.sectionOrder.map((section) => {
        if (section === 'hero') return <HeroPreview key="hero" data={content.hero} tokens={t} />
        if (section === 'features') return <FeaturesPreview key="features" data={content.features} tokens={t} />
        if (section === 'gallery') return <GalleryPreview key="gallery" data={content.gallery} tokens={t} />
        if (section === 'contact') return <ContactPreview key="contact" data={content.contact} tokens={t} />
        return null
      })}
    </div>
  )
}

function HeroPreview({ data, tokens: t }) {
  return (
    <section style={{ padding: '3rem 1.5rem', backgroundColor: t.surface, textAlign: 'center' }}>
      <h1 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', fontWeight: 800, color: t.text, marginBottom: '1rem', lineHeight: 1.1 }}>
        {data.title}
      </h1>
      <p style={{ color: t.textMuted, fontSize: '0.9375rem', maxWidth: '32rem', margin: '0 auto 1.75rem' }}>
        {data.subtitle}
      </p>
      <a href={data.buttonUrl} style={{ display: 'inline-block', backgroundColor: t.accent, color: t.accentText, fontFamily: t.fontDisplay, fontWeight: 700, padding: '0.75rem 1.75rem', borderRadius: t.radius, textDecoration: 'none', fontSize: '0.8125rem', letterSpacing: '0.05em', border: t.buttonBorder || 'none', boxShadow: t.buttonShadow || 'none' }}>
        {data.buttonText}
      </a>
    </section>
  )
}

function FeaturesPreview({ data, tokens: t }) {
  return (
    <section style={{ padding: '2rem 1.5rem', backgroundColor: t.bg }}>
      <div className="preview-grid-features">
        {data.map((feature) => (
          <div key={feature.id} style={{ backgroundColor: t.surface, padding: '1.25rem', borderRadius: t.radius, border: `1px solid ${t.border}`, boxShadow: t.shadow || 'none' }}>
            <h3 style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: '0.9375rem', color: t.text, marginBottom: '0.375rem' }}>{feature.title}</h3>
            <p style={{ color: t.textMuted, fontSize: '0.8125rem', lineHeight: 1.6 }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function GalleryPreview({ data, tokens: t }) {
  const validImages = data.filter(img => img.url)
  return (
    <section style={{ padding: '2rem 1.5rem', backgroundColor: t.surface }}>
      <div className="preview-grid-gallery">
        {validImages.map((img) => (
          <div key={img.id} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: t.radius, border: `1px solid ${t.border}` }}>
            <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.parentElement.style.backgroundColor = t.border; e.target.style.display = 'none' }} />
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactPreview({ data, tokens: t }) {
  return (
    <section style={{ padding: '2.5rem 1.5rem', backgroundColor: t.bg, textAlign: 'center' }}>
      <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: '1.5rem', color: t.text, marginBottom: '0.375rem' }}>{data.heading}</h2>
      <p style={{ color: t.textMuted, marginBottom: '1.75rem', fontSize: '0.875rem' }}>{data.subheading}</p>
      <div style={{ maxWidth: '24rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.625rem', textAlign: 'left' }}>
        {['Name', 'Email', 'Message'].map((field) =>
          field === 'Message' ? (
            <textarea key={field} placeholder={field} disabled rows={3} style={{ width: '100%', backgroundColor: t.surface, border: `1px solid ${t.border}`, color: t.textMuted, padding: '0.625rem', borderRadius: t.radius, fontFamily: t.fontBody, resize: 'none', fontSize: '0.8125rem' }} />
          ) : (
            <input key={field} type={field === 'Email' ? 'email' : 'text'} placeholder={field} disabled style={{ width: '100%', backgroundColor: t.surface, border: `1px solid ${t.border}`, color: t.textMuted, padding: '0.625rem', borderRadius: t.radius, fontFamily: t.fontBody, fontSize: '0.8125rem' }} />
          )
        )}
        <button style={{ backgroundColor: t.accent, color: t.accentText, fontFamily: t.fontDisplay, fontWeight: 700, padding: '0.75rem', border: t.buttonBorder || 'none', borderRadius: t.radius, cursor: 'default', fontSize: '0.8125rem', boxShadow: t.buttonShadow || 'none' }}>
          SEND MESSAGE
        </button>
      </div>
    </section>
  )
}

// ── THEME TOKENS ───────────────────────────────────────────

export function getThemeTokens(theme) {
  const themes = {
    minimal: {
      bg: '#fafaf8', surface: '#ffffff', text: '#1a1a1a', textMuted: '#6b6b6b',
      accent: '#1a1a1a', accentText: '#ffffff', border: '#e8e6e1', radius: '2px',
      fontDisplay: "'Playfair Display', Georgia, serif", fontBody: "'DM Sans', sans-serif",
      shadow: '0 1px 3px rgba(0,0,0,0.08)',
    },
    'neobrutал': {
      bg: '#f5f500', surface: '#ffffff', text: '#0a0a0a', textMuted: '#333333',
      accent: '#0a0a0a', accentText: '#f5f500', border: '#0a0a0a', radius: '0px',
      fontDisplay: "'Bebas Neue', 'Arial Black', sans-serif", fontBody: "'DM Sans', sans-serif",
      shadow: '4px 4px 0px #0a0a0a', buttonBorder: '2px solid #0a0a0a', buttonShadow: '4px 4px 0px #0a0a0a',
    },
    neon: {
      bg: '#050508', surface: '#0d0d14', text: '#e8e8ff', textMuted: '#7878a8',
      accent: '#00ffe0', accentText: '#050508', border: '#1e1e3a', radius: '6px',
      fontDisplay: "'Syne', sans-serif", fontBody: "'Space Mono', monospace",
      shadow: '0 0 20px rgba(0,255,224,0.15)', buttonShadow: '0 0 20px rgba(0,255,224,0.4)',
    },
    pastel: {
      bg: '#fef6ee', surface: '#ffffff', text: '#3d2c2c', textMuted: '#9e7e7e',
      accent: '#f9a8d4', accentText: '#3d2c2c', border: '#fce7f3', radius: '12px',
      fontDisplay: "'DM Sans', sans-serif", fontBody: "'DM Sans', sans-serif",
      shadow: '0 4px 20px rgba(249,168,212,0.2)',
    },
    luxury: {
      bg: '#1a1208', surface: '#211a0e', text: '#f5e6c8', textMuted: '#a08060',
      accent: '#c9a84c', accentText: '#1a1208', border: '#3a2a10', radius: '2px',
      fontDisplay: "'Playfair Display', Georgia, serif", fontBody: "'DM Sans', sans-serif",
      shadow: '0 2px 8px rgba(0,0,0,0.4)',
    },
    retro: {
      bg: '#2d4a1e', surface: '#1e3314', text: '#e8f5c8', textMuted: '#8aab5a',
      accent: '#a3e635', accentText: '#1e3314', border: '#4a7a2a', radius: '0px',
      fontDisplay: "'Space Mono', monospace", fontBody: "'Space Mono', monospace",
      shadow: '2px 2px 0px #a3e635', buttonShadow: '2px 2px 0px #e8f5c8',
    },
  }
  return themes[theme] || themes.minimal
}