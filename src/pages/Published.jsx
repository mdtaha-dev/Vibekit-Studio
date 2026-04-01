import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
    display: inline-block;
    line-height: 1;
  }
  .scanline-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%),
                linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06));
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
    z-index: 100;
  }
  .neon-text-glow {
    text-shadow: 0 0 8px rgba(0,255,136,0.6), 0 0 20px rgba(0,255,136,0.2);
  }
  .glass-card {
    background: rgba(42,42,42,0.4);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.05);
  }
  .skeleton-shimmer {
    background: linear-gradient(90deg, #1a1a1a 25%, #222222 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .feature-card {
    padding: 2rem;
    border-left: 1px solid rgba(255,255,255,0.05);
    transition: all 0.5s;
  }
  .feature-card:hover {
    border-left-color: #00ff88;
    background-color: #1c1b1b;
  }
  .feature-card:hover .feature-icon {
    opacity: 1;
  }
  .cta-btn:hover {
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(255,190,113,0.4);
  }
  .submit-btn:hover {
    background-color: #e8a045;
  }
`;

const neon = "#00ff88";

const features = [
    {
        icon: "speed",
        title: "Velocity",
        desc: "Rapid iteration cycles designed for the speed of modern thought. No bottlenecks, just pure momentum.",
    },
    {
        icon: "architecture",
        title: "Precision",
        desc: "Every pixel and path is calculated. Our architectural approach ensures structural integrity at every scale.",
    },
    {
        icon: "auto_fix_high",
        title: "Craft",
        desc: "A dedication to the handmade digital artifact. We prioritize soul and texture over generic convenience.",
    },
];

export default function PublishedPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <style>{styles}</style>

            <div style={{ backgroundColor: "#0a0a0a", color: "#e0ffe0", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>

                {/* Scanline Overlay */}
                <div className="scanline-overlay" />

                <main style={{ position: "relative", minHeight: "100vh" }}>

                    {/* SECTION 1: HERO */}
                    <section style={{
                        position: "relative", height: "100vh",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        padding: "0 1.5rem", overflow: "hidden", backgroundColor: "#131313",
                    }}>
                        {/* Decorative Lines */}
                        <div style={{ position: "absolute", top: "3rem", left: "3rem", width: "1px", height: "6rem", backgroundColor: `${neon}4d` }} />
                        <div style={{ position: "absolute", bottom: "3rem", right: "3rem", width: "6rem", height: "1px", backgroundColor: `${neon}4d` }} />

                        {/* Background Glow */}
                        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.2, background: "radial-gradient(circle at center, rgba(0,255,136,0.1), transparent)" }} />

                        <div style={{ zIndex: 10, textAlign: "center", maxWidth: "56rem", margin: "0 auto" }}>
                            <h1
                                className="neon-text-glow"
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: "clamp(3rem, 10vw, 6rem)",
                                    fontWeight: 800,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    lineHeight: 1.1,
                                    marginBottom: "2rem",
                                }}
                            >
                                the<div>website</div>
                            </h1>

                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "#d6c3b1", letterSpacing: "0.05em", maxWidth: "42rem", margin: "0 auto 2rem", opacity: 0.9 }}>
                                Architecting the future of creative collaboration.
                            </p>

                            <div style={{ paddingTop: "2rem" }}>
                                <button
                                    className="cta-btn"
                                    style={{
                                        backgroundColor: "#ffbe71",
                                        color: "#482a00",
                                        fontFamily: "'Manrope', sans-serif",
                                        textTransform: "uppercase",
                                        fontWeight: 700,
                                        letterSpacing: "0.1em",
                                        padding: "1.25rem 2.5rem",
                                        fontSize: "0.875rem",
                                        border: "none",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        margin: "0 auto",
                                        transition: "all 0.5s",
                                    }}
                                >
                                    Explore the Work
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: FEATURES */}
                    <section style={{ padding: "8rem 1.5rem", backgroundColor: "#0e0e0e" }}>
                        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                            {features.map(({ icon, title, desc }) => (
                                <div key={title} className="feature-card">
                                    <div style={{ marginBottom: "1.5rem" }}>
                                        <span className="material-symbols-outlined feature-icon" style={{ fontSize: "2.25rem", color: neon, opacity: 0.7, transition: "opacity 0.3s" }}>{icon}</span>
                                    </div>
                                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", color: "#e5e2e1" }}>
                                        {title}
                                    </h3>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#d6c3b1", lineHeight: 1.7 }}>
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 3: GALLERY */}
                    <section style={{ padding: "6rem 1.5rem", backgroundColor: "#131313" }}>
                        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", gap: "1rem", flexWrap: "wrap" }}>
                                <div>
                                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.625rem", letterSpacing: "0.3em", textTransform: "uppercase", color: neon }}>Visual Journal</span>
                                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#e5e2e1", marginTop: "0.5rem" }}>
                                        Case Studies
                                    </h2>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", opacity: 0.4 }}>
                                {[0, 1, 2].map((i) => (
                                    <div key={i} style={{ aspectRatio: "4/5", backgroundColor: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#e5e2e1" }}>Gallery Empty</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: CONTACT */}
                    <section style={{ padding: "8rem 1.5rem", backgroundColor: "#0a0a0a" }}>
                        <div className="glass-card" style={{ maxWidth: "56rem", margin: "0 auto", padding: "clamp(2rem, 5vw, 4rem)" }}>
                            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                                <h2 className="neon-text-glow" style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#e5e2e1", marginBottom: "1rem" }}>
                                    Initiate Sequence
                                </h2>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#d6c3b1" }}>
                                    Ready to architect your project? Drop a transmission.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
                                    <div>
                                        <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d6c3b1", display: "block", marginBottom: "0.5rem" }}>Identity</label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{ width: "100%", backgroundColor: "#0e0e0e", border: "none", borderBottom: "1px solid #524437", padding: "1rem 0", fontFamily: "'DM Sans', sans-serif", color: "#e5e2e1", outline: "none", fontSize: "0.875rem" }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d6c3b1", display: "block", marginBottom: "0.5rem" }}>Contact</label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{ width: "100%", backgroundColor: "#0e0e0e", border: "none", borderBottom: "1px solid #524437", padding: "1rem 0", fontFamily: "'DM Sans', sans-serif", color: "#e5e2e1", outline: "none", fontSize: "0.875rem" }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d6c3b1", display: "block", marginBottom: "0.5rem" }}>Transmission</label>
                                    <textarea
                                        placeholder="Briefly describe your vision..."
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        style={{ width: "100%", backgroundColor: "#0e0e0e", border: "none", borderBottom: "1px solid #524437", padding: "1rem 0", fontFamily: "'DM Sans', sans-serif", color: "#e5e2e1", outline: "none", resize: "none", fontSize: "0.875rem" }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    style={{
                                        width: "100%",
                                        padding: "1.5rem",
                                        backgroundColor: "#ffbe71",
                                        color: "#482a00",
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.3em",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                    }}
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer style={{ backgroundColor: "#131313", borderTop: "1px solid rgba(42,42,42,0.15)" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", padding: "2rem 3rem", maxWidth: "1400px", margin: "0 auto", gap: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                            <a href="#" style={{ color: "#e8a045", fontWeight: 700, letterSpacing: "0.2em", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem", textDecoration: "none" }}>
                                VIBEKIT STUDIO
                            </a>
                            <div style={{ height: "1rem", width: "1px", backgroundColor: "rgba(82,68,55,0.3)" }} />
                            <p style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.625rem", color: "#2a2a2a" }}>
                                © 2024 Nocturnal Atelier. Built for the architectural mind.
                            </p>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", gap: "1.5rem" }}>
                                {["Terms", "Privacy", "Studio"].map((link) => (
                                    <a key={link} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.625rem", color: "#2a2a2a", textDecoration: "none" }}>
                                        {link}
                                    </a>
                                ))}
                            </div>

                            <div style={{ backgroundColor: "#2a2a2a", padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span className="material-symbols-outlined" style={{ fontSize: "0.75rem", color: neon }}>visibility</span>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#d6c3b1" }}>1,248 Views</span>
                            </div>

                            <a href="https://vibekit.studio" target="_blank" rel="noreferrer" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#e8a045", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                MADE WITH VIBEKIT STUDIO
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}