import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../lib/api'
import { getThemeTokens } from './Editor'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
    display: inline-block;
    line-height: 1;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skeleton {
    background: linear-gradient(90deg, #1a1a1a 25%, #222222 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
  }
`

// ── Skeleton loader shown while page data is fetching ──────
function PageSkeleton() {
    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
            <div className="skeleton" style={{ height: '60vh', marginBottom: '2rem', borderRadius: '4px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton" style={{ height: '12rem' }} />
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton" style={{ aspectRatio: '4/3' }} />
                ))}
            </div>
        </div>
    )
}

// ── 404 state ──────────────────────────────────────────────
function NotFound() {
    return (
        <div style={{
            backgroundColor: '#0a0a0a',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <div style={{ position: 'relative', width: '5rem', height: '5rem' }}>
                <div style={{ position: 'absolute', inset: 0, border: '1px solid #222222' }} />
                <div style={{ position: 'absolute', inset: '0.75rem', border: '1px solid #e8a045', opacity: 0.4 }} />
            </div>
            <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#f0ede6',
            }}>
                PAGE NOT FOUND
            </h1>
            <p style={{ color: '#616161', fontSize: '0.875rem' }}>
                This page does not exist or has been unpublished.
            </p>
            <Link to="/" style={{
                color: '#e8a045',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.75rem',
                textDecoration: 'none',
            }}>
                GO HOME
            </Link>
        </div>
    )
}

export default function PublishedPage() {
    const { slug } = useParams()

    const [page, setPage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    // Contact form state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState('')

    useEffect(() => {
        async function loadPage() {
            const { data, error } = await api.public.getPage(slug)
            if (error) {
                setNotFound(true)
                setLoading(false)
                return
            }
            setPage(data.page)
            setLoading(false)

            // Increment view count — fire and forget
            api.public.incrementView(slug)
        }
        loadPage()
    }, [slug])

    async function handleContactSubmit(e) {
        e.preventDefault()
        setSubmitError('')
        setSubmitting(true)

        const { error } = await api.public.submitContact(slug, { name, email, message })

        if (error) {
            setSubmitError(error)
            setSubmitting(false)
            return
        }

        setSubmitSuccess(true)
        setName('')
        setEmail('')
        setMessage('')
        setSubmitting(false)
    }

    if (loading) return <PageSkeleton />
    if (notFound) return <NotFound />

    const t = getThemeTokens(page.theme)
    const content = page.content

    return (
        <>
            <style>{styles}</style>

            <div style={{
                backgroundColor: t.bg,
                color: t.text,
                fontFamily: t.fontBody,
                minHeight: '100vh',
                overflowX: 'hidden',
            }}>

                {/* Render sections in saved order */}
                {content.sectionOrder.map((section) => {
                    if (section === 'hero') return (
                        <HeroSection key="hero" data={content.hero} tokens={t} />
                    )
                    if (section === 'features') return (
                        <FeaturesSection key="features" data={content.features} tokens={t} />
                    )
                    if (section === 'gallery') return (
                        <GallerySection key="gallery" data={content.gallery} tokens={t} />
                    )
                    if (section === 'contact') return (
                        <ContactSection
                            key="contact"
                            data={content.contact}
                            tokens={t}
                            name={name} setName={setName}
                            email={email} setEmail={setEmail}
                            message={message} setMessage={setMessage}
                            onSubmit={handleContactSubmit}
                            submitting={submitting}
                            success={submitSuccess}
                            error={submitError}
                        />
                    )
                    return null
                })}

                {/* Footer */}
                <footer style={{
                    backgroundColor: t.surface,
                    borderTop: `1px solid ${t.border}`,
                    padding: '2rem 3rem',
                }}>
                    <div style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}>
                        <p style={{
                            fontFamily: t.fontBody,
                            fontSize: '0.75rem',
                            color: t.textMuted,
                            letterSpacing: '0.05em',
                        }}>
                            {page.title}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            {/* View count */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: t.bg,
                                padding: '0.375rem 0.75rem',
                                borderRadius: t.radius,
                                border: `1px solid ${t.border}`,
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: t.accent }}>
                                    visibility
                                </span>
                                <span style={{
                                    fontFamily: t.fontBody,
                                    fontSize: '0.625rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: t.textMuted,
                                }}>
                                    {page.view_count} Views
                                </span>
                            </div>

                            {/* Made with VibeKit */}
                            <Link to="/" style={{
                                fontFamily: t.fontBody,
                                fontSize: '0.625rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                color: t.accent,
                                textDecoration: 'none',
                            }}>
                                MADE WITH VIBEKIT STUDIO
                            </Link>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}

// ── SECTION COMPONENTS ─────────────────────────────────────
// These match exactly what the editor PreviewContent renders.

function HeroSection({ data, tokens: t }) {
    return (
        <section
            className="fade-in-up"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 1.5rem',
                backgroundColor: t.surface,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <h1 style={{
                fontFamily: t.fontDisplay,
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 800,
                color: t.text,
                marginBottom: '1.5rem',
                lineHeight: 1.1,
                letterSpacing: '0.02em',
            }}>
                {data.title}
            </h1>
            <p style={{
                color: t.textMuted,
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                marginBottom: '2.5rem',
                maxWidth: '42rem',
                lineHeight: 1.6,
            }}>
                {data.subtitle}
            </p>

            <a href={data.buttonUrl}
                style={{
                    display: 'inline-block',
                    backgroundColor: t.accent,
                    color: t.accentText,
                    fontFamily: t.fontDisplay,
                    fontWeight: 700,
                    padding: '1rem 2.5rem',
                    borderRadius: t.radius,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                    border: t.buttonBorder || 'none',
                    boxShadow: t.buttonShadow || 'none',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = t.buttonShadow || '0 4px 20px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = t.buttonShadow || 'none'
                }}
            >
                {data.buttonText}
            </a>
        </section >
    )
}

function FeaturesSection({ data, tokens: t }) {
    return (
        <section style={{
            padding: '6rem 1.5rem',
            backgroundColor: t.bg,
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
            }}>
                {data.map((feature) => (
                    <div
                        key={feature.id}
                        style={{
                            backgroundColor: t.surface,
                            padding: '2rem',
                            borderRadius: t.radius,
                            border: `1px solid ${t.border}`,
                            boxShadow: t.shadow || 'none',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = t.shadow || '0 8px 30px rgba(0,0,0,0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = t.shadow || 'none'
                        }}
                    >
                        <h3 style={{
                            fontFamily: t.fontDisplay,
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            color: t.text,
                            marginBottom: '0.75rem',
                        }}>
                            {feature.title}
                        </h3>
                        <p style={{
                            color: t.textMuted,
                            fontSize: '0.9375rem',
                            lineHeight: 1.7,
                        }}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

function GallerySection({ data, tokens: t }) {
    const validImages = data.filter(img => img.url)

    return (
        <section style={{
            padding: '6rem 1.5rem',
            backgroundColor: t.surface,
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
            }}>
                {validImages.map((img) => (
                    <div
                        key={img.id}
                        style={{
                            aspectRatio: '4/3',
                            overflow: 'hidden',
                            borderRadius: t.radius,
                            border: `1px solid ${t.border}`,
                        }}
                    >
                        <img
                            src={img.url}
                            alt={img.alt}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            onError={(e) => {
                                e.target.parentElement.style.backgroundColor = t.border
                                e.target.style.display = 'none'
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

function ContactSection({
    data, tokens: t,
    name, setName,
    email, setEmail,
    message, setMessage,
    onSubmit, submitting, success, error
}) {
    const inputStyle = {
        width: '100%',
        backgroundColor: t.surface,
        border: 'none',
        borderBottom: `1px solid ${t.border}`,
        padding: '0.875rem 0',
        fontFamily: t.fontBody,
        color: t.text,
        outline: 'none',
        fontSize: '0.9375rem',
        transition: 'border-color 0.2s',
        background: 'transparent',
    }

    return (
        <section style={{
            padding: '8rem 1.5rem',
            backgroundColor: t.bg,
        }}>
            <div style={{
                maxWidth: '48rem',
                margin: '0 auto',
                backgroundColor: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: t.radius,
                padding: 'clamp(2rem, 5vw, 4rem)',
                boxShadow: t.shadow || 'none',
            }}>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{
                        fontFamily: t.fontDisplay,
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: t.text,
                        marginBottom: '0.75rem',
                    }}>
                        {data.heading}
                    </h2>
                    <p style={{ color: t.textMuted, fontSize: '0.9375rem' }}>
                        {data.subheading}
                    </p>
                </div>

                {/* Success message */}
                {success ? (
                    <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        backgroundColor: t.bg,
                        border: `1px solid ${t.accent}`,
                        borderRadius: t.radius,
                    }}>
                        <p style={{
                            fontFamily: t.fontDisplay,
                            fontWeight: 700,
                            color: t.accent,
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                        }}>
                            MESSAGE RECEIVED
                        </p>
                        <p style={{ color: t.textMuted, marginTop: '0.5rem', fontSize: '0.875rem' }}>
                            Thank you for reaching out. We will be in touch.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            <div>
                                <label style={{
                                    fontFamily: t.fontBody,
                                    fontSize: '0.625rem',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: t.textMuted,
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => e.target.style.borderBottomColor = t.accent}
                                    onBlur={(e) => e.target.style.borderBottomColor = t.border}
                                />
                            </div>
                            <div>
                                <label style={{
                                    fontFamily: t.fontBody,
                                    fontSize: '0.625rem',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: t.textMuted,
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => e.target.style.borderBottomColor = t.accent}
                                    onBlur={(e) => e.target.style.borderBottomColor = t.border}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{
                                fontFamily: t.fontBody,
                                fontSize: '0.625rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: t.textMuted,
                                display: 'block',
                                marginBottom: '0.5rem',
                            }}>
                                Message
                            </label>
                            <textarea
                                placeholder="Your message..."
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                style={{ ...inputStyle, resize: 'none' }}
                                onFocus={(e) => e.target.style.borderBottomColor = t.accent}
                                onBlur={(e) => e.target.style.borderBottomColor = t.border}
                            />
                        </div>

                        {error && (
                            <p style={{
                                color: '#ff6b6b',
                                fontSize: '0.875rem',
                                fontFamily: t.fontBody,
                            }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                width: '100%',
                                padding: '1.25rem',
                                backgroundColor: t.accent,
                                color: t.accentText,
                                fontFamily: t.fontDisplay,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                border: t.buttonBorder || 'none',
                                borderRadius: t.radius,
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                fontSize: '0.875rem',
                                opacity: submitting ? 0.7 : 1,
                                boxShadow: t.buttonShadow || 'none',
                                transition: 'all 0.3s',
                            }}
                        >
                            {submitting ? 'SENDING...' : 'SEND MESSAGE'}
                        </button>

                    </form>
                )}

            </div>
        </section>
    )
}