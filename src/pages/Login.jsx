import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');

  .dot-grid {
    background-image: radial-gradient(circle, #222222 1px, transparent 1px);
    background-size: 32px 32px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
`

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        const { error } = await login(email, password)
        if (error) {
            setError(error)
            setIsLoading(false)
            return
        }
        navigate('/app')
    }

    return (
        <>
            <style>{styles}</style>

            <div style={{
                backgroundColor: '#0e0e0e',
                color: '#e5e2e1',
                fontFamily: "'DM Sans', sans-serif",
                minHeight: '100vh',
                position: 'relative',
            }}>

                {/* Dot Grid Background */}
                <div className="dot-grid" style={{
                    position: 'fixed',
                    inset: 0,
                    opacity: 0.4,
                    pointerEvents: 'none',
                }} />

                {/* Decorative Lines */}
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                }}>
                    <div style={{ position: 'absolute', top: '10%', left: '5%', width: '1px', height: '16rem', backgroundColor: 'rgba(82,68,55,0.2)' }} />
                    <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '1px', height: '16rem', backgroundColor: 'rgba(82,68,55,0.2)' }} />
                    <div style={{ position: 'absolute', top: '20%', right: '10%', width: '8rem', height: '1px', backgroundColor: 'rgba(82,68,55,0.2)' }} />
                    <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '8rem', height: '1px', backgroundColor: 'rgba(82,68,55,0.2)' }} />
                </div>

                {/* Main */}
                <main style={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                }}>

                    {/* Login Card */}
                    <div style={{
                        width: '100%',
                        maxWidth: '28rem',
                        backgroundColor: '#201f1f',
                        border: '1px solid rgba(82,68,55,0.2)',
                        borderRadius: '0.25rem',
                        padding: '2.5rem',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9)',
                    }}>

                        {/* Corner Dots */}
                        {[
                            { top: '1rem', left: '1rem' },
                            { top: '1rem', right: '1rem' },
                            { bottom: '1rem', left: '1rem' },
                            { bottom: '1rem', right: '1rem' },
                        ].map((pos, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                width: '0.25rem',
                                height: '0.25rem',
                                backgroundColor: '#e8a045',
                                ...pos,
                            }} />
                        ))}

                        {/* Header */}
                        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <span style={{
                                display: 'block',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '0.625rem',
                                letterSpacing: '0.2em',
                                color: '#e8a045',
                                marginBottom: '0.5rem',
                            }}>
                                WELCOME BACK
                            </span>
                            <h1 style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: '1.875rem',
                                letterSpacing: '0.1em',
                                color: '#f0ede6',
                                textTransform: 'uppercase',
                            }}>
                                VIBEKIT STUDIO
                            </h1>
                            <div style={{
                                width: '3rem',
                                height: '2px',
                                backgroundColor: '#e8a045',
                                margin: '1.5rem auto 0',
                                opacity: 0.8,
                            }} />
                        </header>

                        {/* Global error message */}
                        {error && (
                            <div style={{
                                marginBottom: '1.5rem',
                                padding: '0.75rem 1rem',
                                backgroundColor: 'rgba(127,29,29,0.3)',
                                border: '1px solid rgba(239,68,68,0.3)',
                                borderRadius: '0.25rem',
                                color: '#ff6b6b',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '0.8rem',
                            }}>
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit}>

                            {/* Email */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.625rem',
                                    letterSpacing: '0.1em',
                                    color: '#d6c3b1',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem',
                                    marginLeft: '0.25rem',
                                }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#0e0e0e',
                                        border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(82,68,55,0.4)'}`,
                                        borderRadius: '0.25rem',
                                        padding: '0.75rem 1rem',
                                        color: '#f0ede6',
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: '0.875rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#e8a045'}
                                    onBlur={(e) => e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(82,68,55,0.4)'}
                                />
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.625rem',
                                    letterSpacing: '0.1em',
                                    color: '#d6c3b1',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem',
                                    marginLeft: '0.25rem',
                                }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#0e0e0e',
                                        border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(82,68,55,0.4)'}`,
                                        borderRadius: '0.25rem',
                                        padding: '0.75rem 1rem',
                                        color: '#f0ede6',
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: '0.875rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#e8a045'}
                                    onBlur={(e) => e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(82,68,55,0.4)'}
                                />
                            </div>

                            {/* Submit Button */}
                            <div style={{ paddingTop: '1rem' }}>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#e8a045',
                                        color: '#0a0a0a',
                                        fontFamily: "'Syne', sans-serif",
                                        fontWeight: 700,
                                        fontSize: '0.875rem',
                                        letterSpacing: '0.15em',
                                        padding: '1rem',
                                        borderRadius: '0.25rem',
                                        textTransform: 'uppercase',
                                        border: 'none',
                                        cursor: isLoading ? 'not-allowed' : 'pointer',
                                        opacity: isLoading ? 0.8 : 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        transition: 'all 0.3s',
                                        boxShadow: isLoading ? 'none' : '0 0 0 rgba(232,160,69,0)',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isLoading) e.target.style.boxShadow = '0 0 20px rgba(232,160,69,0.4)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.boxShadow = '0 0 0 rgba(232,160,69,0)'
                                    }}
                                >
                                    {isLoading && (
                                        <span className="animate-spin" style={{
                                            width: '1rem',
                                            height: '1rem',
                                            border: '2px solid rgba(10,10,10,0.3)',
                                            borderTopColor: '#0a0a0a',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                        }} />
                                    )}
                                    {isLoading ? 'AUTHENTICATING...' : 'SIGN IN'}
                                </button>

                                {isLoading && (
                                    <p style={{
                                        marginTop: '0.5rem',
                                        textAlign: 'center',
                                        fontSize: '0.5625rem',
                                        color: '#525252',
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontStyle: 'italic',
                                    }}>
                                        Establishing secure connection...
                                    </p>
                                )}
                            </div>
                        </form>

                        {/* Switch to Signup — using React Router Link */}
                        <footer style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '0.6875rem',
                                letterSpacing: '0.05em',
                                color: '#737373',
                            }}>
                                No account?{' '}
                                <Link to="/signup" style={{
                                    color: '#e8a045',
                                    fontWeight: 700,
                                    textDecoration: 'underline',
                                    textDecorationColor: 'rgba(232,160,69,0.3)',
                                    textUnderlineOffset: '4px',
                                }}>
                                    SIGN UP
                                </Link>
                            </p>
                        </footer>

                    </div>
                </main>

                {/* Bottom Footer */}
                <footer style={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem 2.5rem',
                    color: '#737373',
                }}>
                    <div style={{
                        color: '#e8a045',
                        fontWeight: 700,
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.1em',
                        fontSize: '0.75rem',
                    }}>
                        VIBEKIT
                    </div>
                    <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.625rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}>
                        © 2025 VIBEKIT STUDIO
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy', 'Terms', 'Support'].map((link) => (
                            <a key={link} href="#" style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '0.625rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: '#525252',
                                textDecoration: 'none',
                            }}>
                                {link}
                            </a>
                        ))}
                    </div>
                </footer>

            </div>
        </>
    )
}