import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700&display=swap')
  @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap')

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
  }
  .syne-wide { font-family: 'Syne', sans-serif; letter-spacing: 0.05em; }
  .glow-subtle { box-shadow: 0 0 15px rgba(232, 160, 69, 0.15); }
  .geometric-bg-1 {
    background-image: radial-gradient(circle at 2px 2px, #2a2a2a 1px, transparent 0);
    background-size: 24px 24px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }

  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    .hero-buttons {
      flex-direction: row !important;
    }
    .footer-inner {
      flex-direction: row !important;
      align-items: center !important;
    }
  }
`

const colors = {
    primary: "#ffbe71",
    primaryContainer: "#e8a045",
    onPrimary: "#482a00",
    onPrimaryContainer: "#603900",
    surface: "#131313",
    surfaceDim: "#131313",
    surfaceContainer: "#201f1f",
    surfaceContainerHigh: "#2a2a2a",
    surfaceContainerHighest: "#353534",
    surfaceContainerLowest: "#0e0e0e",
    surfaceBright: "#3a3939",
    onSurface: "#e5e2e1",
    onSurfaceVariant: "#d6c3b1",
    outlineVariant: "#524437",
    background: "#0a0a0a",
}

function Icon({ name, style = {} }) {
    return (
        <span className="material-symbols-outlined" style={style}>{name}</span>
    )
}

function Header() {
    const navigate = useNavigate()
    return (
        <header style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: "#0a0a0a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(82,68,55,0.15)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Icon name="grid_view" style={{ color: colors.primaryContainer }} />
                <span className="syne-wide" style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#f0ede6",
                    textTransform: "uppercase",
                }}>
                    VIBEKIT
                </span>
            </div>
            <button
                onClick={() => navigate('/signup')}
                className="syne-wide"
                style={{
                    letterSpacing: "0.15em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    color: colors.primaryContainer,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    minHeight: "44px",
                    minWidth: "44px",
                    padding: "0 0.5rem",
                }}
            >
                CREATE
            </button>
        </header>
    )
}

function HeroSection() {
    const navigate = useNavigate()
    return (
        <section style={{
            padding: "0 1.5rem",
            marginTop: "2rem",
            marginBottom: "4rem",
            position: "relative",
            overflow: "hidden",
        }}>
            <div style={{
                position: "absolute",
                top: "-6rem",
                right: "-6rem",
                width: "16rem",
                height: "16rem",
                background: "rgba(255,190,113,0.1)",
                filter: "blur(100px)",
                borderRadius: "50%",
                pointerEvents: "none",
            }} />

            <div style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}>
                <div style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    marginBottom: "1.5rem",
                    border: "1px solid rgba(82,68,55,0.3)",
                    fontSize: "0.5625rem",
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: colors.primary,
                }}>
                    Architecture for Web
                </div>

                <h1 className="syne-wide" style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: "clamp(2.5rem, 10vw, 4.5rem)",
                    fontWeight: 800,
                    color: "#f0ede6",
                    lineHeight: 1.1,
                    marginBottom: "1.5rem",
                }}>
                    VIBEKIT <br /> STUDIO
                </h1>

                <p style={{
                    color: colors.onSurfaceVariant,
                    maxWidth: "22rem",
                    fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                    opacity: 0.8,
                    padding: "0 0.5rem",
                }}>
                    Generate a theme, build a mini-site, publish it. Professional aesthetics, zero friction.
                </p>

                <div
                    className="hero-buttons"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.875rem",
                        width: "100%",
                        maxWidth: "22rem",
                    }}
                >
                    <button
                        onClick={() => navigate('/signup')}
                        className="glow-subtle"
                        style={{
                            backgroundColor: colors.primaryContainer,
                            color: colors.onPrimaryContainer,
                            padding: "1rem 2rem",
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontSize: "0.875rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            minHeight: "44px",
                        }}
                    >
                        Create your first page
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            backgroundColor: "transparent",
                            border: `1px solid ${colors.outlineVariant}`,
                            color: colors.onSurface,
                            padding: "1rem 2rem",
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontSize: "0.875rem",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            minHeight: "44px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </div>

            <div style={{
                marginTop: "4rem",
                height: "1px",
                width: "75%",
                background: "linear-gradient(to right, rgba(82,68,55,0.5), transparent)",
                margin: "4rem auto 0",
            }} />
        </section>
    )
}

function FeatureCard({ icon, title, description, decorative }) {
    return (
        <div style={{
            backgroundColor: "#141414",
            border: "1px solid #222222",
            padding: "1.75rem",
            borderRadius: "0.375rem",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        }}>
            {decorative && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    padding: "1rem",
                    opacity: 0.2,
                    pointerEvents: "none",
                }}>
                    <div style={{
                        width: "4rem",
                        height: "4rem",
                        borderRight: "1px solid rgba(232,160,69,0.4)",
                        borderBottom: "1px solid rgba(232,160,69,0.4)",
                    }} />
                </div>
            )}

            <div style={{
                marginBottom: "1.5rem",
                width: "3rem",
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.surfaceContainerHigh,
                position: "relative",
                flexShrink: 0,
            }}>
                {decorative && (
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        border: "1px solid rgba(232,160,69,0.2)",
                        transform: "rotate(45deg)",
                    }} />
                )}
                {icon}
            </div>

            <h3 className="syne-wide" style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                marginBottom: "0.875rem",
                textTransform: "uppercase",
                color: "#f0ede6",
            }}>
                {title}
            </h3>
            <p style={{
                color: colors.onSurfaceVariant,
                fontSize: "0.875rem",
                lineHeight: 1.8,
                fontWeight: 500,
            }}>
                {description}
            </p>
        </div>
    )
}

function FeaturesSection() {
    const features = [
        {
            title: "Pick a Vibe",
            description: "Curate your aesthetic from our gallery of hand-crafted visual directions. No generic templates, only opinionated designs.",
            decorative: true,
            icon: <Icon name="palette" style={{ color: colors.primary }} />,
        },
        {
            title: "Build Your Page",
            description: "Assemble high-end layouts using our modular block system. Every component is mathematically tuned for balance.",
            icon: (
                <div style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    border: "2px solid rgba(232,160,69,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{ width: "0.5rem", height: "0.5rem", backgroundColor: colors.primary }} />
                </div>
            ),
        },
        {
            title: "Publish Instantly",
            description: "Deploy your vision to the world with a single click. Global edge delivery with zero configuration required.",
            icon: (
                <div>
                    <div style={{ width: "1.5rem", height: "1px", backgroundColor: colors.primary, marginBottom: "0.25rem" }} />
                    <div style={{ width: "2rem", height: "1px", backgroundColor: colors.primary }} />
                </div>
            ),
        },
    ]

    return (
        <section style={{ padding: "0 1.5rem", marginBottom: "6rem" }}>
            <div
                className="features-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "1.25rem",
                }}
            >
                {features.map((f) => (
                    <FeatureCard key={f.title} {...f} />
                ))}
            </div>
        </section>
    )
}

function ThemesSection() {
    return (
        <section style={{
            backgroundColor: colors.surfaceContainerLowest,
            padding: "4rem 1.5rem",
            marginBottom: "4rem",
            borderTop: "1px solid rgba(82,68,55,0.1)",
            borderBottom: "1px solid rgba(82,68,55,0.1)",
        }}>
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
                <span style={{
                    color: colors.primary,
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontSize: "0.5625rem",
                }}>
                    Curation
                </span>
                <h2 className="syne-wide" style={{
                    fontSize: "clamp(1.5rem, 5vw, 1.875rem)",
                    fontWeight: 700,
                    marginTop: "0.75rem",
                    textTransform: "uppercase",
                    color: "#f0ede6",
                }}>
                    Theme Archive
                </h2>
            </div>

            <div style={{
                maxWidth: "72rem",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.5rem",
            }}>

                {/* Theme 1: Minimal */}
                <div style={{
                    backgroundColor: "#141414",
                    border: "1px solid #222222",
                    borderRadius: "6px",
                    overflow: "hidden",
                }}>
                    <div style={{
                        aspectRatio: "16/10",
                        backgroundColor: "#ffffff",
                        padding: "1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.625rem",
                    }}>
                        <div style={{ height: "0.625rem", width: "50%", backgroundColor: "rgba(0,0,0,0.8)" }} />
                        <div style={{ height: "2px", width: "100%", backgroundColor: "rgba(0,0,0,0.06)" }} />
                        <div style={{ height: "1.5rem", width: "75%", backgroundColor: "rgba(0,0,0,0.04)" }} />
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                            <div style={{ width: "1.25rem", height: "1.25rem", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }} />
                            <div style={{ width: "1.25rem", height: "1.25rem", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }} />
                        </div>
                    </div>
                    <div style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                            <h4 className="syne-wide" style={{ fontWeight: 700, color: "#f0ede6", textTransform: "uppercase", fontSize: "0.8125rem", marginBottom: "0.25rem" }}>
                                Minimal Clean
                            </h4>
                            <p style={{ fontSize: "0.5rem", color: "rgba(240,237,230,0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                                Swiss Precision
                            </p>
                        </div>
                        <span style={{ fontSize: "0.625rem", fontWeight: 700, color: colors.primary }}>01</span>
                    </div>
                </div>

                {/* Theme 2: Dark/Neon */}
                <div style={{
                    backgroundColor: "#141414",
                    border: "1px solid #222222",
                    borderRadius: "6px",
                    overflow: "hidden",
                }}>
                    <div style={{
                        aspectRatio: "16/10",
                        backgroundColor: "#050508",
                        padding: "1.25rem",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                    }}>
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: "radial-gradient(circle at 2px 2px, #1e1e3a 1px, transparent 0)",
                            backgroundSize: "20px 20px",
                            opacity: 0.6,
                            pointerEvents: "none",
                        }} />
                        <div style={{
                            position: "absolute",
                            top: "30%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "6rem",
                            height: "6rem",
                            background: "radial-gradient(circle, rgba(0,255,224,0.15), transparent)",
                            filter: "blur(20px)",
                            pointerEvents: "none",
                        }} />
                        <div style={{ position: "relative" }}>
                            <div style={{ width: "2.5rem", height: "2px", backgroundColor: "#00ffe0", marginBottom: "0.625rem", boxShadow: "0 0 8px #00ffe0" }} />
                            <div style={{ color: "rgba(0,255,224,0.3)", fontSize: "1.25rem", fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                                A_
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                            <h4 className="syne-wide" style={{ fontWeight: 700, color: "#f0ede6", textTransform: "uppercase", fontSize: "0.8125rem", marginBottom: "0.25rem" }}>
                                Dark Neon
                            </h4>
                            <p style={{ fontSize: "0.5rem", color: "rgba(240,237,230,0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                                Electric Pulse
                            </p>
                        </div>
                        <span style={{ fontSize: "0.625rem", fontWeight: 700, color: colors.primary }}>02</span>
                    </div>
                </div>

                {/* Theme 3: Neo-Brutal */}
                <div style={{
                    backgroundColor: "#141414",
                    border: "1px solid #222222",
                    borderRadius: "6px",
                    overflow: "hidden",
                }}>
                    <div style={{
                        aspectRatio: "16/10",
                        backgroundColor: "#f5f500",
                        padding: "1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.625rem",
                        position: "relative",
                    }}>
                        <div style={{
                            position: "absolute",
                            top: "0.75rem",
                            right: "0.75rem",
                            width: "2.5rem",
                            height: "2.5rem",
                            border: "3px solid #0a0a0a",
                            backgroundColor: "#ffffff",
                        }} />
                        <div style={{ height: "0.75rem", width: "60%", backgroundColor: "#0a0a0a" }} />
                        <div style={{ height: "2px", width: "100%", backgroundColor: "#0a0a0a" }} />
                        <div style={{ height: "1.5rem", width: "40%", backgroundColor: "#0a0a0a", marginTop: "auto" }} />
                        <div style={{
                            position: "absolute",
                            bottom: "0.75rem",
                            right: "0.75rem",
                            padding: "0.25rem 0.625rem",
                            backgroundColor: "#0a0a0a",
                            color: "#f5f500",
                            fontSize: "0.5rem",
                            fontWeight: 700,
                            fontFamily: "'Syne', sans-serif",
                            boxShadow: "2px 2px 0px rgba(0,0,0,0.5)",
                        }}>
                            BRUTAL
                        </div>
                    </div>
                    <div style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                            <h4 className="syne-wide" style={{ fontWeight: 700, color: "#f0ede6", textTransform: "uppercase", fontSize: "0.8125rem", marginBottom: "0.25rem" }}>
                                Neo Brutal
                            </h4>
                            <p style={{ fontSize: "0.5rem", color: "rgba(240,237,230,0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                                Raw Construct
                            </p>
                        </div>
                        <span style={{ fontSize: "0.625rem", fontWeight: 700, color: colors.primary }}>03</span>
                    </div>
                </div>

            </div>
        </section>
    )
}

function CTASection() {
    const navigate = useNavigate()
    return (
        <section style={{ padding: "0 1.5rem 3rem" }}>
            <div style={{
                backgroundColor: colors.primaryContainer,
                padding: "2.5rem 1.5rem",
                borderRadius: "0.375rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
            }}>
                <div className="geometric-bg-1" style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.1,
                    pointerEvents: "none",
                }} />
                <h2 className="syne-wide" style={{
                    fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
                    fontWeight: 800,
                    color: colors.onPrimaryContainer,
                    lineHeight: 1.2,
                    position: "relative",
                }}>
                    READY TO <br /> START?
                </h2>
                <button
                    onClick={() => navigate('/signup')}
                    style={{
                        width: "100%",
                        maxWidth: "20rem",
                        backgroundColor: "#0a0a0a",
                        color: "#f0ede6",
                        padding: "1rem 2rem",
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        fontSize: "0.75rem",
                        borderRadius: "0.375rem",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        position: "relative",
                        minHeight: "44px",
                    }}
                >
                    GET THE TOOLKIT
                </button>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer style={{
            backgroundColor: "#0a0a0a",
            width: "100%",
            padding: "2rem 1.5rem",
            borderTop: "1px solid rgba(240,237,230,0.1)",
        }}>
            <div
                className="footer-inner"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    textAlign: "center",
                }}
            >
                <span className="syne-wide" style={{
                    color: "#f0ede6",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontSize: "0.875rem",
                }}>
                    VIBEKIT STUDIO
                </span>
                <p style={{
                    fontSize: "0.5625rem",
                    letterSpacing: "0.15em",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    color: "rgba(240,237,230,0.4)",
                }}>
                    © 2026 VIBEKIT STUDIO. ARCHITECTURAL PRECISION.
                </p>
            </div>
        </footer>
    )
}

export default function Landing() {
    return (
        <>
            <style>{styles}</style>
            <div style={{
                backgroundColor: colors.surfaceDim,
                color: colors.onSurface,
                fontFamily: "'DM Sans', sans-serif",
                minHeight: "100vh",
                overflowX: "hidden",
            }}>
                <Header />
                <main style={{ paddingTop: "5rem", paddingBottom: "2rem" }}>
                    <HeroSection />
                    <FeaturesSection />
                    <ThemesSection />
                    <CTASection />
                </main>
                <Footer />
            </div>
        </>
    )
}


