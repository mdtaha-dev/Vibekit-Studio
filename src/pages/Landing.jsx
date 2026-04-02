import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

const tailwindConfig = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&family=Space+Grotesk:wght@300..700&family=Manrope:wght@200..800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
`;

const styles = `
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
  }
  .syne-wide { font-family: 'Syne', sans-serif; letter-spacing: 0.05em; }
  .glow-subtle { box-shadow: 0 0 15px rgba(232, 160, 69, 0.15); }
  .glass-panel { backdrop-filter: blur(12px); background-color: rgba(32, 31, 31, 0.7); }
  .geometric-bg-1 {
    background-image: radial-gradient(circle at 2px 2px, #2a2a2a 1px, transparent 0);
    background-size: 24px 24px;
  }
  body { min-height: max(884px, 100dvh); }
`;

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
};


function Icon({ name, className = "" }) {
    return (
        <span className={`material-symbols-outlined ${className}`}>{name}</span>
    );
}

function Header() {
    const navigate = useNavigate()
    return (
        <header
            style={{
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
                padding: "1.5rem 2rem",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Icon name="grid_view" style={{ color: colors.primaryContainer }} />
                <span
                    className="syne-wide"
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "#f0ede6",
                        textTransform: "uppercase",
                    }}
                >
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
                }}
            >
                CREATE
            </button>
        </header>
    );
}

function HeroSection() {
    const navigate = useNavigate()
    return (
        <section
            style={{
                padding: "0 2rem",
                marginTop: "3rem",
                marginBottom: "6rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-6rem",
                    right: "-6rem",
                    width: "16rem",
                    height: "16rem",
                    background: "rgba(255,190,113,0.1)",
                    filter: "blur(100px)",
                    borderRadius: "50%",
                }}
            />
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        marginBottom: "1.5rem",
                        border: `1px solid rgba(82,68,55,0.3)`,
                        fontSize: "0.625rem",
                        letterSpacing: "0.2em",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: colors.primary,
                    }}
                >
                    Architecture for Web
                </div>

                <h1
                    className="syne-wide"
                    style={{
                        fontSize: "clamp(3rem, 8vw, 4.5rem)",
                        fontWeight: 800,
                        color: "#f0ede6",
                        lineHeight: 1.1,
                        marginBottom: "2rem",
                    }}
                >
                    VibeKit <br /> Studio
                </h1>

                <p
                    style={{
                        color: colors.onSurfaceVariant,
                        maxWidth: "24rem",
                        fontSize: "1.125rem",
                        lineHeight: 1.7,
                        marginBottom: "2.5rem",
                        opacity: 0.8,
                    }}
                >
                    Generate a theme, build a mini-site, publish it. Professional
                    aesthetics, zero friction.
                </p>

                <div
                    style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                    <button
                        onClick={() => navigate('/signup')}
                        className="glow-subtle"
                        style={{
                            backgroundColor: colors.primaryContainer,
                            color: colors.onPrimaryContainer,
                            padding: "1.25rem 2rem",
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontSize: "0.875rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s",
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
                            padding: "1.25rem 2rem",
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontSize: "0.875rem",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            transition: "all 0.3s",
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </div>

            <div
                style={{
                    marginTop: "5rem",
                    height: "1px",
                    width: "75%",
                    background: `linear-gradient(to right, rgba(82,68,55,0.5), transparent)`,
                    margin: "5rem auto 0",
                }}
            />
        </section>
    );
}

function FeatureCard({ icon, title, description, decorative }) {
    return (
        <div
            style={{
                backgroundColor: "#141414",
                border: "1px solid #222222",
                padding: "2rem",
                borderRadius: "0.375rem",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {decorative && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: "1rem",
                        opacity: 0.2,
                    }}
                >
                    <div
                        style={{
                            width: "4rem",
                            height: "4rem",
                            borderRight: `1px solid rgba(232,160,69,0.4)`,
                            borderBottom: `1px solid rgba(232,160,69,0.4)`,
                        }}
                    />
                </div>
            )}

            <div
                style={{
                    marginBottom: "2rem",
                    width: "3rem",
                    height: "3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.surfaceContainerHigh,
                    position: "relative",
                }}
            >
                {decorative && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            border: `1px solid rgba(232,160,69,0.2)`,
                            transform: "rotate(45deg)",
                        }}
                    />
                )}
                {icon}
            </div>

            <h3
                className="syne-wide"
                style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                    color: "#f0ede6",
                }}
            >
                {title}
            </h3>
            <p
                style={{
                    color: colors.onSurfaceVariant,
                    fontSize: "0.875rem",
                    lineHeight: 1.8,
                    fontWeight: 500,
                }}
            >
                {description}
            </p>
        </div>
    );
}

function FeaturesSection() {
    const navigate = useNavigate()
    const features = [
        {
            title: "Pick a Vibe",
            description:
                "Curate your aesthetic from our gallery of hand-crafted visual directions. No generic templates, only opinionated designs.",
            decorative: true,
            icon: <Icon name="palette" style={{ color: colors.primary }} />,
        },
        {
            title: "Build Your Page",
            description:
                "Assemble high-end layouts using our modular block system. Every component is mathematically tuned for balance.",
            icon: (
                <div
                    style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        border: `2px solid rgba(232,160,69,0.4)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            width: "0.5rem",
                            height: "0.5rem",
                            backgroundColor: colors.primary,
                        }}
                    />
                </div>
            ),
        },
        {
            title: "Publish Instantly",
            description:
                "Deploy your vision to the world with a single click. Global edge delivery with zero configuration required.",
            icon: (
                <div>
                    <div
                        style={{
                            width: "1.5rem",
                            height: "1px",
                            backgroundColor: colors.primary,
                            marginBottom: "0.25rem",
                        }}
                    />
                    <div
                        style={{ width: "2rem", height: "1px", backgroundColor: colors.primary }}
                    />
                </div>
            ),
        },
    ];

    return (
        <section style={{ padding: "0 2rem", marginBottom: "8rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
                {features.map((f) => (
                    <FeatureCard key={f.title} {...f} />
                ))}
            </div>
        </section>
    );
}

function ThemeCard({ bg, number, title, subtitle, children }) {
    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    aspectRatio: "16/10",
                    backgroundColor: bg,
                    borderRadius: "0.375rem",
                    overflow: "hidden",
                    marginBottom: "1.5rem",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                }}
            >
                {children}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <div>
                    <h4
                        className="syne-wide"
                        style={{ fontWeight: 700, color: "#f0ede6", textTransform: "uppercase" }}
                    >
                        {title}
                    </h4>
                    <p
                        style={{
                            fontSize: "0.75rem",
                            color: "rgba(214,195,177,0.6)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginTop: "0.25rem",
                        }}
                    >
                        {subtitle}
                    </p>
                </div>
                <span
                    style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: colors.primary,
                    }}
                >
                    {number}
                </span>
            </div>
        </div>
    );
}

function ThemesSection() {
    return (
        <section
            style={{
                backgroundColor: colors.surfaceContainerLowest,
                padding: "6rem 2rem",
                marginBottom: "6rem",
                borderTop: `1px solid rgba(82,68,55,0.1)`,
                borderBottom: `1px solid rgba(82,68,55,0.1)`,
            }}
        >
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
                <span
                    style={{
                        color: colors.primary,
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        fontSize: "0.625rem",
                    }}
                >
                    Curation
                </span>
                <h2
                    className="syne-wide"
                    style={{
                        fontSize: "1.875rem",
                        fontWeight: 700,
                        marginTop: "1rem",
                        textTransform: "uppercase",
                        color: "#f0ede6",
                    }}
                >
                    Theme Archive
                </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                <ThemeCard bg="white" number="01" title="Minimal Clean" subtitle="Swiss Precision">
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "1px solid rgba(0,0,0,0.1)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            padding: "1rem",
                        }}
                    >
                        <div style={{ height: "1rem", width: "50%", backgroundColor: "rgba(0,0,0,0.8)" }} />
                        <div
                            style={{
                                height: "3rem",
                                width: "100%",
                                borderTop: "1px solid rgba(0,0,0,0.05)",
                            }}
                        />
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <div
                                style={{ width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }}
                            />
                            <div
                                style={{ width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)" }}
                            />
                        </div>
                    </div>
                </ThemeCard>

                <ThemeCard bg="#1a1a1a" number="02" title="Nocturnal Atelier" subtitle="Dark Mode Only">
                    <div
                        className="geometric-bg-1"
                        style={{ position: "absolute", inset: 0, opacity: 0.5 }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(to bottom right, rgba(232,160,69,0.05), transparent)`,
                        }}
                    />
                    <div
                        style={{
                            position: "relative",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{ width: "3rem", height: "0.25rem", backgroundColor: colors.primary, marginBottom: "1rem" }}
                        />
                        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "2.25rem", fontWeight: 700 }}>A_</div>
                    </div>
                </ThemeCard>

                <ThemeCard bg="#f8efd4" number="03" title="Solarized Geometric" subtitle="Abstract Construct">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", width: "100%" }}>
                        <div style={{ width: "3rem", height: "3rem", backgroundColor: "#2d5a27", borderRadius: "0.5rem" }} />
                        <div style={{ width: "3rem", height: "3rem", backgroundColor: "#8c3333", borderRadius: "0.5rem" }} />
                        <div style={{ width: "3rem", height: "3rem", backgroundColor: "#424c50", borderRadius: "0.5rem" }} />
                        <div
                            style={{
                                width: "100%",
                                marginTop: "1rem",
                                height: "2rem",
                                border: "2px solid rgba(66,76,80,0.2)",
                                borderRadius: "0.5rem",
                            }}
                        />
                    </div>
                </ThemeCard>
            </div>
        </section>
    );
}

function CTASection() {
    const navigate = useNavigate()
    return (
        <section style={{ padding: "0 2rem 3rem" }}>
            <div
                style={{
                    backgroundColor: colors.primaryContainer,
                    padding: "3rem",
                    borderRadius: "0.375rem",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    className="geometric-bg-1"
                    style={{ position: "absolute", inset: 0, opacity: 0.1 }}
                />
                <h2
                    className="syne-wide"
                    style={{
                        fontSize: "2.25rem",
                        fontWeight: 800,
                        color: colors.onPrimaryContainer,
                        marginBottom: "1.5rem",
                        lineHeight: 1.2,
                        position: "relative",
                    }}
                >
                    READY TO <br /> START?
                </h2>
                <button
                    onClick={() => navigate('/signup')}
                    style={{
                        width: "100%",
                        maxWidth: "20rem",
                        backgroundColor: "#0a0a0a",
                        color: "#f0ede6",
                        padding: "1.25rem 2rem",
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
                    }}
                >
                    GET THE TOOLKIT
                </button>
            </div>
        </section>
    );
}

function Footer() {
    const links = ["TOOLS", "ARCHIVE", "STUDIO", "LEGAL"];
    return (
        <footer
            style={{
                backgroundColor: "#0a0a0a",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "2.5rem 3rem",
                gap: "1.5rem",
                borderTop: "1px solid rgba(240,237,230,0.1)",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <span
                    className="syne-wide"
                    style={{ color: "#f0ede6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}
                >
                    VIBEKIT STUDIO
                </span>
                <p
                    style={{
                        fontSize: "0.625rem",
                        letterSpacing: "0.15em",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        color: "rgba(240,237,230,0.4)",
                    }}
                >
                    © 2026 VIBEKIT STUDIO. ARCHITECTURAL PRECISION.
                </p>
            </div>
            <nav style={{ display: "flex", gap: "1.5rem" }}>
                {links.map((link) => (
                    <a
                        key={link}
                        href="#"
                        style={{
                            fontSize: "0.75rem",
                            letterSpacing: "0.15em",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            color: "rgba(240,237,230,0.6)",
                            textDecoration: "none",
                            transition: "color 0.2s",
                        }}
                    >
                        {link}
                    </a>
                ))}
            </nav>
        </footer>
    );
}

export default function Landing() {

    const navigate = useNavigate()

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        ${styles}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
      `}</style>

            <div
                style={{
                    backgroundColor: colors.surfaceDim,
                    color: colors.onSurface,
                    fontFamily: "'DM Sans', sans-serif",
                    minHeight: "100vh",
                }}
            >
                <Header />
                <main style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
                    <HeroSection />
                    <FeaturesSection />
                    <ThemesSection />
                    <CTASection />
                </main>
                <Footer />
            </div>
        </>
    );
}