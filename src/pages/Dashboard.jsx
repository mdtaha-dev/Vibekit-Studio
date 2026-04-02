import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
  }
  body {
    background-color: #0a0a0a;
    background-image: radial-gradient(circle at 2px 2px, #2a2a2a 1px, transparent 0);
    background-size: 24px 24px;
  }
  .page-card {
    transition: all 0.3s;
    border-left: 1px solid #222222;
  }
  .page-card:hover {
    border-left: 6px solid #e8a045;
    transform: translateX(4px);
  }
  .delete-btn:hover .delete-icon {
    color: #ff6b6b;
  }
`

function StatusBadge({ status }) {
    if (status === 'published') {
        return (
            <span style={{
                backgroundColor: '#052c16',
                color: '#4ade80',
                fontSize: '0.625rem',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                textTransform: 'uppercase',
            }}>
                PUBLISHED
            </span>
        )
    }
    return (
        <span style={{
            backgroundColor: '#2a2a2a',
            color: '#a1a1a1',
            fontSize: '0.625rem',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.1em',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.25rem',
            textTransform: 'uppercase',
            border: '1px solid #3a3a3a',
        }}>
            DRAFT
        </span>
    )
}

function EmptyState({ onCreate }) {
    return (
        <div style={{
            gridColumn: '1 / -1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 2rem',
            textAlign: 'center',
        }}>
            {/* Geometric shape */}
            <div style={{ position: 'relative', width: '5rem', height: '5rem', marginBottom: '2rem' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    border: '1px solid #222222',
                    transform: 'rotate(0deg)',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: '0.5rem',
                    border: '1px solid #333333',
                    transform: 'rotate(15deg)',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: '1rem',
                    border: '1px solid #e8a045',
                    opacity: 0.4,
                    transform: 'rotate(30deg)',
                }} />
            </div>

            <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#a1a1a1',
                marginBottom: '0.75rem',
            }}>
                NO PAGES YET
            </h3>
            <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.875rem',
                color: '#616161',
                marginBottom: '2rem',
                maxWidth: '20rem',
            }}>
                Create your first page and pick a vibe to get started.
            </p>
            <button
                onClick={onCreate}
                style={{
                    backgroundColor: '#e8a045',
                    color: '#0a0a0a',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '0.875rem 2rem',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                }}
            >
                CREATE YOUR FIRST PAGE
            </button>
        </div>
    )
}

function PageCard({ page, onDelete, onDuplicate }) {
    const navigate = useNavigate()

    return (
        <div
            className="page-card"
            style={{
                backgroundColor: '#141414',
                border: '1px solid #222222',
                borderRadius: '6px',
                overflow: 'hidden',
            }}
        >
            {/* Thumbnail */}
            <div style={{
                aspectRatio: '16/9',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#201f1f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(#e8a045 1px, transparent 0)',
                    backgroundSize: '16px 16px',
                }} />
                <span className="material-symbols-outlined" style={{
                    fontSize: '2.25rem',
                    color: '#333333',
                }}>
                    draft
                </span>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    <StatusBadge status={page.status} />
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '2rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                }}>
                    <h3 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: page.status === 'draft' ? '#a1a1a1' : '#f0ede6',
                        maxWidth: '70%',
                    }}>
                        {page.title}
                    </h3>
                    {page.status === 'published' && (
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.625rem',
                            letterSpacing: '0.1em',
                            color: '#e8a045',
                            textTransform: 'uppercase',
                        }}>
                            {page.view_count} VIEWS
                        </span>
                    )}
                </div>

                <code style={{
                    color: '#616161',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                }}>
                    /p/{page.slug}
                </code>

                {/* Actions */}
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    borderTop: '1px solid #222222',
                    paddingTop: '1.5rem',
                }}>
                    <button
                        onClick={() => navigate(`/app/editor/${page.id}`)}
                        style={{
                            color: '#e8a045',
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        EDIT
                    </button>

                    <button
                        onClick={() => onDuplicate(page.id)}
                        style={{
                            color: '#616161',
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        DUPLICATE
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => onDelete(page.id)}
                        style={{
                            marginLeft: 'auto',
                            color: '#616161',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.2s',
                        }}
                    >
                        <span
                            className="material-symbols-outlined delete-icon"
                            style={{ fontSize: '1.25rem', transition: 'color 0.2s' }}
                        >
                            delete
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [pages, setPages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [creating, setCreating] = useState(false)

    // Fetch pages on mount
    useEffect(() => {
        fetchPages()
    }, [])

    async function fetchPages() {
        setLoading(true)
        const { data, error } = await api.pages.list()
        if (error) {
            setError(error)
        } else {
            setPages(data.pages)
        }
        setLoading(false)
    }

    async function handleCreate() {
        setCreating(true)
        const { data, error } = await api.pages.create({
            title: 'Untitled Page',
            theme: 'minimal',
        })
        if (error) {
            setError(error)
            setCreating(false)
            return
        }
        navigate(`/app/editor/${data.page.id}`)
    }

    async function handleDuplicate(id) {
        const { data, error } = await api.pages.duplicate(id)
        if (error) {
            setError(error)
            return
        }
        setPages((prev) => [data.page, ...prev])
    }

    async function handleDelete(id) {
        if (!window.confirm('Delete this page? This cannot be undone.')) return
        const { error } = await api.pages.delete(id)
        if (error) {
            setError(error)
            return
        }
        setPages((prev) => prev.filter((p) => p.id !== id))
    }

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    return (
        <>
            <style>{styles}</style>

            <div style={{ fontFamily: "'DM Sans', sans-serif", color: '#f0ede6', minHeight: '100vh' }}>

                {/* Header */}
                <header style={{
                    backgroundColor: '#131313',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid #222222',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        textDecoration: 'none',
                    }}>
                        <span className="material-symbols-outlined" style={{ color: '#e8a045' }}>grid_view</span>
                        <h1 style={{
                            fontFamily: "'Syne', sans-serif",
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: '#f0ede6',
                        }}>
                            VIBEKIT
                        </h1>
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Hide email on small screens */}
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.75rem',
                            color: '#616161',
                            maxWidth: '120px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: window.innerWidth < 480 ? 'none' : 'block',
                        }}>
                            {user?.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                color: '#e8a045',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                minHeight: '44px',
                                minWidth: '44px',
                            }}
                        >
                            LOGOUT
                        </button>
                    </div>
                </header>

                {/* Main */}
                <main style={{
                    maxWidth: '80rem',
                    margin: '0 auto',
                    padding: '3rem 1.5rem 8rem',
                }}>

                    {/* Error banner */}
                    {error && (
                        <div style={{
                            marginBottom: '2rem',
                            padding: '0.75rem 1rem',
                            backgroundColor: 'rgba(127,29,29,0.3)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            color: '#ff6b6b',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.875rem',
                            borderRadius: '4px',
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Page Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        marginBottom: '4rem',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                    }}>
                        <div style={{ position: 'relative' }}>
                            <h2 style={{
                                textAlign: 'center',
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: 'clamp(2rem, 8vw, 3rem)',
                                letterSpacing: '-0.02em',
                                textTransform: 'uppercase',
                                marginBottom: '0.5rem',
                            }}>
                                MY PAGES
                            </h2>
                            <div style={{ width: '100%', height: '2px', backgroundColor: '#e8a045' }} />
                            <p style={{
                                marginTop: '1rem',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '0.875rem',
                                letterSpacing: '0.1em',
                                color: '#a1a1a1',
                                textTransform: 'uppercase',
                            }}>
                                {loading ? '...' : `${pages.length} pages`}
                            </p>
                        </div>

                        <button
                            onClick={handleCreate}
                            disabled={creating}
                            style={{
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: '#e8a045',
                                color: '#0a0a0a',
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                padding: '1rem 2rem',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: creating ? 'not-allowed' : 'pointer',
                                fontSize: '0.875rem',
                                opacity: creating ? 0.7 : 1,
                                boxShadow: '0 0 0 rgba(232,160,69,0)',
                                transition: 'box-shadow 0.3s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(232,160,69,0.4)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 rgba(232,160,69,0)'}
                        >
                            <span className="material-symbols-outlined">add_box</span>
                            {creating ? 'CREATING...' : 'NEW PAGE'}
                        </button>
                    </div>

                    {/* Loading state */}
                    {loading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '6rem 0',
                        }}>
                            <p style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: '0.875rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#e8a045',
                                animation: 'pulse 2s infinite',
                            }}>
                                LOADING...
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 28rem), 1fr))',
                            gap: '2rem',
                        }}>
                            {pages.length === 0 ? (
                                <EmptyState onCreate={handleCreate} />
                            ) : (
                                pages.map((page) => (
                                    <PageCard
                                        key={page.id}
                                        page={page}
                                        onDelete={handleDelete}
                                        onDuplicate={handleDuplicate}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </main>

                {/* Mobile Bottom Nav */}
                <nav style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 50,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: '4rem',
                    padding: '0 1rem',
                    backgroundColor: 'rgba(14,14,14,0.8)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(42,42,42,0.15)',
                    boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
                }}>
                    <button
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#e8a045',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'none',
                        }}
                    >
                        <span className="material-symbols-outlined">layers</span>
                        <span style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '0.625rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginTop: '0.25rem',
                        }}>
                            My Pages
                        </span>
                    </button>

                    <button
                        onClick={handleCreate}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#616161',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <span className="material-symbols-outlined">add_box</span>
                        <span style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '0.625rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginTop: '0.25rem',
                        }}>
                            New Page
                        </span>
                    </button>
                </nav>

                {/* Geometric Decorators */}
                <div style={{ position: 'fixed', top: '8rem', left: '2rem', width: '1px', height: '8rem', backgroundColor: 'rgba(42,42,42,0.2)' }} />
                <div style={{ position: 'fixed', top: '8rem', right: '2rem', width: '1px', height: '8rem', backgroundColor: 'rgba(42,42,42,0.2)' }} />
                <div style={{ position: 'fixed', bottom: '8rem', left: '2rem', width: '1rem', height: '1rem', borderLeft: '1px solid #e8a045', borderBottom: '1px solid #e8a045', opacity: 0.3 }} />
                <div style={{ position: 'fixed', bottom: '8rem', right: '2rem', width: '1rem', height: '1rem', borderRight: '1px solid #e8a045', borderBottom: '1px solid #e8a045', opacity: 0.3 }} />

            </div>
        </>
    )
}