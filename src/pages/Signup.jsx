import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');

  .dot-grid {
    background-image: radial-gradient(circle, #222222 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .glow-hover:hover {
    box-shadow: 0 0 20px rgba(232, 160, 69, 0.25);
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
`

const inputStyle = {
    width: '100%',
    backgroundColor: '#0a0a0a',
    border: '1px solid #222222',
    color: '#f0ede6',
    padding: '1rem',
    outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.875rem',
    transition: 'all 0.3s',
    borderRadius: 0,
}

const labelStyle = {
    display: 'block',
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#9f8e7d',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
}

export default function Signup() {
    const { signup } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setPasswordError('')

        // Client side validation
        if (password.length < 8) {
            setPasswordError('PASSWORD MUST BE AT LEAST 8 CHARACTERS')
            return
        }

        setIsLoading(true)
        const { error } = await signup(name, email, password)

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
                backgroundColor: '#131313',
                color: '#f0ede6',
                fontFamily: "'DM Sans', sans-serif",
                minHeight: '100vh',
                position: 'relative',
            }}>

                {/* Background Glows */}
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: -1,
                    backgroundColor: '#131313',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-10%', right: '-10%',
                        width: '50%', height: '50%',
                        background: 'rgba(232,160,69,0.05)',
                        filter: 'blur(120px)',
                        borderRadius: '50%',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '-10%', left: '-10%',
                        width: '40%', height: '40%',
                        background: 'rgba(42,42,42,0.2)',
                        filter: 'blur(100px)',
                        borderRadius: '50%',
                    }} />
                </div>

                {/* Header */}
                <header style={{
                    position: 'relative',
                    top: 0,
                    width: '100%',
                    zIndex: 50,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '2rem 2rem',
                    backgroundColor: 'transparent',
                }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                    }}>
                        <span style={{
                            fontFamily: "'Syne', sans-serif",
                            letterSpacing: '0.05em',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            fontSize: '1.25rem',
                            color: '#e8a045',
                        }}>
                            VIBEKIT
                        </span>
                    </Link>
                    <span style={{
                        fontSize: '0.625rem',
                        letterSpacing: '0.2em',
                        fontWeight: 700,
                        color: '#9f8e7d',
                        textTransform: 'uppercase',
                    }}>
                        Member Access
                    </span>
                </header>

                {/* Main */}
                <main
                    className="dot-grid"
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                    }}
                >
                    {/* Geometric Decorators */}
                    <div style={{
                        position: 'absolute',
                        top: '5rem', left: '5rem',
                        width: '1px', height: '16rem',
                        background: 'linear-gradient(to bottom, rgba(82,68,55,0.2), transparent)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '5rem', right: '5rem',
                        width: '16rem', height: '1px',
                        background: 'linear-gradient(to left, rgba(82,68,55,0.2), transparent)',
                    }} />

                    <div style={{ width: '100%', maxWidth: '28rem', position: 'relative' }}>

                        {/* Registration Marks */}
                        <div style={{
                            position: 'absolute',
                            top: '-0.75rem', left: '-0.75rem',
                            width: '6px', height: '6px',
                            backgroundColor: '#e8a045',
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-0.75rem', right: '-0.75rem',
                            width: '6px', height: '6px',
                            backgroundColor: '#e8a045',
                        }} />

                        {/* Card */}
                        <div style={{
                            backgroundColor: '#201f1f',
                            padding: '3rem',
                            borderLeft: '1px solid rgba(82,68,55,0.1)',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9)',
                        }}>

                            {/* Card Header */}
                            <div style={{
                                marginBottom: '2.5rem',
                                textAlign: 'left',
                                paddingTop: '2rem',

                            }}>
                                <p style={{
                                    textAlign: 'center',
                                    color: '#e8a045',
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '0.625rem',
                                    letterSpacing: '0.3em',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem',
                                }}>
                                    JOIN THE STUDIO
                                </p>
                                <h1 style={{
                                    textAlign: 'center',
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 800,
                                    fontSize: 'clamp(1.5rem, 8vw, 2.5rem)', // ← replace fixed size with clamp
                                    letterSpacing: '-0.02em',
                                    color: '#f0ede6',
                                    marginBottom: '0.5rem',
                                }}>
                                    VIBEKIT STUDIO
                                </h1>
                                <div style={{
                                    height: '4px',
                                    width: '3rem',
                                    backgroundColor: '#e8a045',
                                }} />
                            </div>

                            {/* Global error */}
                            {error && (
                                <div style={{
                                    marginBottom: '1.5rem',
                                    padding: '0.75rem 1rem',
                                    backgroundColor: 'rgba(127,29,29,0.3)',
                                    border: '1px solid rgba(239,68,68,0.3)',
                                    color: '#ff6b6b',
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.8rem',
                                }}>
                                    {error}
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit}>

                                {/* Name */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={labelStyle}>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={inputStyle}
                                        onFocus={(e) => e.target.style.borderColor = '#e8a045'}
                                        onBlur={(e) => e.target.style.borderColor = '#222222'}
                                    />
                                </div>

                                {/* Email */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={labelStyle}>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={inputStyle}
                                        onFocus={(e) => e.target.style.borderColor = '#e8a045'}
                                        onBlur={(e) => e.target.style.borderColor = '#222222'}
                                    />
                                </div>

                                {/* Password */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={labelStyle}>Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            if (passwordError && e.target.value.length >= 8) {
                                                setPasswordError('')
                                            }
                                        }}
                                        required
                                        style={{
                                            ...inputStyle,
                                            border: passwordError
                                                ? '1px solid rgba(255,107,107,0.6)'
                                                : '1px solid #222222',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e8a045'}
                                        onBlur={(e) => e.target.style.borderColor = passwordError
                                            ? 'rgba(255,107,107,0.6)'
                                            : '#222222'
                                        }
                                    />
                                    {passwordError && (
                                        <p style={{
                                            color: '#ff6b6b',
                                            fontSize: '0.625rem',
                                            fontWeight: 500,
                                            letterSpacing: '0.05em',
                                            marginTop: '0.25rem',
                                        }}>
                                            {passwordError}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <div style={{ paddingTop: '1rem' }}>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="glow-hover"
                                        style={{
                                            width: '100%',
                                            backgroundColor: isLoading ? 'rgba(232,160,69,0.5)' : '#e8a045',
                                            color: '#0a0a0a',
                                            fontFamily: "'Syne', sans-serif",
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            padding: '1.25rem',
                                            fontSize: '0.875rem',
                                            border: 'none',
                                            cursor: isLoading ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.75rem',
                                            transition: 'all 0.3s',
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
                                        {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                                    </button>
                                </div>
                            </form>

                            {/* Switch to login */}
                            <div style={{
                                marginTop: '2.5rem',
                                paddingTop: '2rem',
                                borderTop: '1px solid rgba(82,68,55,0.1)',
                                textAlign: 'center',
                            }}>
                                <p style={{
                                    fontSize: '0.6875rem',
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: '0.1em',
                                    color: '#9f8e7d',
                                    textTransform: 'uppercase',
                                }}>
                                    Have an account?{' '}
                                    <Link to="/login" style={{
                                        color: '#e8a045',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        marginLeft: '0.25rem',
                                    }}>
                                        LOGIN
                                    </Link>
                                </p>
                            </div>

                        </div>

                        {/* Asymmetric Accent */}
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{
                                    opacity: 0.2,
                                    fontSize: '0.5625rem',
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: '0.4em',
                                    color: '#353534',
                                    textTransform: 'uppercase',
                                }}>
                                    ESTABLISHED MMXXV
                                </p>
                                <p style={{
                                    opacity: 0.2,
                                    fontSize: '0.5625rem',
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: '0.4em',
                                    color: '#353534',
                                    textTransform: 'uppercase',
                                }}>
                                    DIGITAL CRAFT ONLY
                                </p>
                            </div>
                        </div>

                    </div>
                </main>

                <footer style={{
                    position: 'relative',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 1.5rem',
                    color: '#737373',
                    backgroundColor: 'transparent',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {['Privacy', 'Terms', 'Support'].map((link) => (
                            <span key={link} style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '0.625rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                            }}>
                                {link}
                            </span>
                        ))}
                    </div>
                    <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.625rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#525252',
                    }}>
                        © 2026 VIBEKIT STUDIO
                    </div>
                </footer>

            </div>
        </>
    )
}