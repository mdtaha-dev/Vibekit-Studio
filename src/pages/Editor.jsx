import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap');
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
`;

const inputBase = {
    width: "100%",
    backgroundColor: "#0e0e0e",
    border: "none",
    color: "#e5e2e1",
    borderRadius: "0.125rem",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    fontFamily: "'Manrope', sans-serif",
    outline: "none",
};

const labelBase = {
    display: "block",
    fontSize: "0.5625rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#71717a",
    fontFamily: "'Manrope', sans-serif",
    marginBottom: "0.25rem",
};

const themes = [
    { label: "Minimal", bg: "#f5f5f5", active: true },
    { label: "Neo-Brutal", bg: "#3b82f6" },
    { label: "Neon", bg: "#c026d3" },
    { label: "Pastel", bg: "#fecdd3" },
    { label: "Luxury", bg: "#1a1a1a", border: "#78350f" },
    { label: "Retro", bg: "#fed7aa" },
];

const collapsedSections = [
    { label: "Features", meta: "3 Items" },
    { label: "Gallery", meta: "8 Images" },
    { label: "Contact", meta: "Form Only" },
];

const deviceModes = [
    { label: "Desktop", icon: "desktop_windows" },
    { label: "Tablet", icon: "tablet_mac" },
    { label: "Mobile", icon: "smartphone" },
];

export default function Editor() {
    const [pageTitle, setPageTitle] = useState("My First Landing Page");
    const [activeDevice, setActiveDevice] = useState("Desktop");
    const [activeTheme, setActiveTheme] = useState("Minimal");
    const [heroTitle, setHeroTitle] = useState("The New Paradigm");
    const [heroSubtitle, setHeroSubtitle] = useState("Architecting the future of creative collaboration.");
    const [btnText, setBtnText] = useState("Explore");
    const [btnUrl, setBtnUrl] = useState("/start");

    return (
        <>
            <style>{styles}</style>

            <div style={{ backgroundColor: "#131313", color: "#e5e2e1", fontFamily: "'Manrope', sans-serif", height: "100vh", overflow: "hidden" }}>

                {/* Top Header */}
                <header style={{
                    position: "fixed", top: 0, width: "100%", zIndex: 50,
                    height: "4rem", backgroundColor: "#131313",
                    borderBottom: "1px solid rgba(42,42,42,0.3)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0 1.5rem",
                }}>
                    {/* Left */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button style={{ color: "#ffbe71", background: "none", border: "none", cursor: "pointer" }}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "0.625rem", color: "#71717a", fontFamily: "'Space Grotesk', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                Studio Atelier
                            </span>
                            <input
                                type="text"
                                value={pageTitle}
                                onChange={(e) => setPageTitle(e.target.value)}
                                style={{
                                    background: "transparent",
                                    borderBottom: "1px solid #524437",
                                    color: "#e5e2e1",
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.05em",
                                    outline: "none",
                                    width: "12rem",
                                    paddingBottom: "2px",
                                    border: "none",
                                    borderBottom: "1px solid #524437",
                                }}
                            />
                        </div>
                    </div>

                    {/* Center: Device Toggles */}
                    <nav style={{ display: "flex", alignItems: "center", gap: "2rem", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase", fontSize: "0.625rem" }}>
                        {deviceModes.map(({ label, icon }) => (
                            <button
                                key={label}
                                onClick={() => setActiveDevice(label)}
                                style={{
                                    color: activeDevice === label ? "#ffbe71" : "#71717a",
                                    borderBottom: activeDevice === label ? "2px solid #ffbe71" : "2px solid transparent",
                                    paddingBottom: "0.25rem",
                                    display: "flex", alignItems: "center", gap: "0.5rem",
                                    background: "none", border: "none",
                                    borderBottom: activeDevice === label ? "2px solid #ffbe71" : "none",
                                    cursor: "pointer",
                                    transition: "color 0.2s",
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: "0.875rem" }}>{icon}</span>
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Right: Actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginRight: "1rem" }}>
                            <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", backgroundColor: "rgba(16,185,129,0.8)", boxShadow: "0 0 8px rgba(16,185,129,0.4)" }} />
                            <span style={{ fontSize: "0.625rem", fontFamily: "'Space Grotesk', sans-serif", color: "rgba(16,185,129,0.8)", letterSpacing: "0.1em", fontWeight: 500 }}>SAVED</span>
                        </div>
                        <button style={{ padding: "0.5rem 1rem", fontSize: "0.625rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", border: "1px solid #ffbe71", color: "#ffbe71", background: "none", borderRadius: "0.25rem", cursor: "pointer" }}>
                            Save
                        </button>
                        <button style={{ padding: "0.5rem 1rem", fontSize: "0.625rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: "#e8a045", color: "#603900", border: "none", borderRadius: "0.25rem", cursor: "pointer" }}>
                            Publish
                        </button>
                        <div style={{ width: "1px", height: "1.5rem", backgroundColor: "rgba(82,68,55,0.3)", margin: "0 0.5rem" }} />
                        {["history", "settings"].map((icon) => (
                            <span key={icon} className="material-symbols-outlined" style={{ color: "#a1a1a1", cursor: "pointer", padding: "0.25rem", fontSize: "1.25rem" }}>{icon}</span>
                        ))}
                    </div>
                </header>

                <div style={{ display: "flex", height: "100vh", paddingTop: "4rem" }}>

                    {/* Sidebar */}
                    <aside style={{
                        position: "fixed", left: 0, top: "4rem",
                        height: "calc(100vh - 64px)", width: "20rem",
                        backgroundColor: "#0e0e0e",
                        borderRight: "1px solid rgba(42,42,42,0.2)",
                        display: "flex", flexDirection: "column", zIndex: 40,
                    }}>
                        {/* Sidebar Header */}
                        <div style={{ padding: "1.25rem", borderBottom: "1px solid rgba(42,42,42,0.1)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1rem" }}>
                                <div>
                                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "#e5e2e1" }}>Editor</h2>
                                    <p style={{ fontSize: "0.625rem", color: "#71717a", letterSpacing: "0.05em" }}>Page Canvas v1.0</p>
                                </div>
                                <button style={{ backgroundColor: "#2a2a2a", color: "#ffbe71", padding: "0.5rem", borderRadius: "0.25rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

                            {/* Hero Section (expanded) */}
                            <div style={{ backgroundColor: "#201f1f", borderRadius: "0.25rem", overflow: "hidden" }}>
                                <button style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "#2a2a2a", border: "none", cursor: "pointer" }}>
                                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#ffbe71" }}>Hero Section</span>
                                    <span className="material-symbols-outlined" style={{ fontSize: "0.875rem", color: "#ffbe71" }}>expand_more</span>
                                </button>
                                <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div>
                                        <label style={labelBase}>Title</label>
                                        <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} style={inputBase} />
                                    </div>
                                    <div>
                                        <label style={labelBase}>Subtitle</label>
                                        <textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} style={{ ...inputBase, height: "5rem", resize: "none" }} />
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                                        <div>
                                            <label style={labelBase}>Button Text</label>
                                            <input type="text" value={btnText} onChange={(e) => setBtnText(e.target.value)} style={inputBase} />
                                        </div>
                                        <div>
                                            <label style={labelBase}>URL</label>
                                            <input type="text" value={btnUrl} onChange={(e) => setBtnUrl(e.target.value)} style={inputBase} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Collapsed Sections */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {collapsedSections.map(({ label, meta }) => (
                                    <button key={label} style={{
                                        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                                        padding: "1rem", backgroundColor: "#201f1f", borderRadius: "0.25rem",
                                        border: "none", cursor: "pointer", transition: "background 0.2s",
                                    }}>
                                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a1a1a1" }}>{label}</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                            <span style={{ fontSize: "0.5625rem", color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>{meta}</span>
                                            <span className="material-symbols-outlined" style={{ fontSize: "0.875rem", color: "#71717a" }}>chevron_right</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Theme Engine */}
                        <div style={{ padding: "1.25rem", borderTop: "1px solid rgba(42,42,42,0.2)", backgroundColor: "#0a0a0a" }}>
                            <h3 style={{ fontSize: "0.625rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1rem", color: "#71717a" }}>
                                Theme Engine
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
                                {themes.map(({ label, bg, border, active }) => (
                                    <div
                                        key={label}
                                        onClick={() => setActiveTheme(label)}
                                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem", cursor: "pointer" }}
                                    >
                                        <div style={{
                                            width: "100%", aspectRatio: "1",
                                            backgroundColor: bg,
                                            borderRadius: "0.25rem",
                                            border: border ? `1px solid ${border}` : "none",
                                            outline: activeTheme === label ? "2px solid #ffbe71" : "none",
                                            outlineOffset: "2px",
                                            opacity: activeTheme === label ? 1 : 0.6,
                                            transition: "opacity 0.2s",
                                        }} />
                                        <span style={{ fontSize: "0.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: activeTheme === label ? "#e5e2e1" : "#71717a" }}>
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Preview Canvas */}
                    <main className="custom-scrollbar" style={{
                        marginLeft: "20rem", flex: 1,
                        height: "calc(100vh - 64px)",
                        overflowY: "auto",
                        backgroundColor: "#131313",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "3rem",
                        position: "relative",
                    }}>
                        {/* Browser Mockup */}
                        <div style={{
                            width: "100%", maxWidth: "64rem", aspectRatio: "16/9",
                            backgroundColor: "#201f1f",
                            borderRadius: "0.75rem",
                            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.8)",
                            border: "1px solid rgba(82,68,55,0.3)",
                            display: "flex", flexDirection: "column",
                            overflow: "hidden",
                        }}>
                            {/* Browser Chrome */}
                            <div style={{ height: "2.5rem", backgroundColor: "#1a1a1a", display: "flex", alignItems: "center", padding: "0 1rem", borderBottom: "1px solid #2a2a2a" }}>
                                <div style={{ display: "flex", gap: "0.5rem", marginRight: "1.5rem" }}>
                                    {["#ef4444", "#f59e0b", "#10b981"].map((c) => (
                                        <div key={c} style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", backgroundColor: c, opacity: 0.5 }} />
                                    ))}
                                </div>
                                <div style={{ flex: 1, maxWidth: "28rem", height: "1.5rem", backgroundColor: "#0e0e0e", borderRadius: "0.125rem", display: "flex", alignItems: "center", padding: "0 0.75rem", gap: "0.5rem" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: "0.75rem", color: "#52525b" }}>lock</span>
                                    <span style={{ fontSize: "0.625rem", color: "#71717a", fontFamily: "'Manrope', sans-serif" }}>vibekit.studio/preview/alpha-beta-771</span>
                                </div>
                                <span className="material-symbols-outlined" style={{ marginLeft: "auto", color: "#71717a", fontSize: "0.875rem" }}>open_in_new</span>
                            </div>

                            {/* Preview Content */}
                            <div style={{ flex: 1, backgroundColor: "#131313", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                {/* Dot pattern */}
                                <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 2px 2px, #ffbe71 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top right, #131313, transparent, rgba(255,190,113,0.05))", pointerEvents: "none" }} />

                                {/* Placeholder */}
                                <div style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
                                    <div style={{ position: "relative" }}>
                                        <div style={{ width: "6rem", height: "6rem", border: "2px solid rgba(255,190,113,0.2)", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <div style={{ width: "4rem", height: "4rem", border: "1px solid rgba(255,190,113,0.4)", transform: "rotate(-12deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <span className="material-symbols-outlined" style={{ color: "#ffbe71", fontSize: "2.25rem", transform: "rotate(-33deg)", fontVariationSettings: "'FILL' 1" }}>texture</span>
                                            </div>
                                        </div>
                                        <div style={{ position: "absolute", top: "-0.25rem", right: "-0.25rem", width: "0.5rem", height: "0.5rem", backgroundColor: "#ffbe71" }} />
                                        <div style={{ position: "absolute", bottom: "-0.25rem", left: "-0.25rem", width: "0.5rem", height: "0.5rem", backgroundColor: "#ffbe71" }} />
                                    </div>

                                    <div>
                                        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#e5e2e1", marginBottom: "0.5rem" }}>
                                            PREVIEW WILL RENDER HERE
                                        </h1>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", color: "#71717a", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase" }}>
                                            Engine Initializing • Assets Loaded
                                        </p>
                                    </div>

                                    <div style={{ display: "flex", gap: "3rem", marginTop: "2rem", opacity: 0.4, alignItems: "center" }}>
                                        <div style={{ height: "1px", width: "6rem", backgroundColor: "#ffbe71" }} />
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            {[0.4, 0.7, 1].map((o, i) => (
                                                <div key={i} style={{ width: "0.375rem", height: "0.375rem", backgroundColor: `rgba(255,190,113,${o})` }} />
                                            ))}
                                        </div>
                                        <div style={{ height: "1px", width: "6rem", backgroundColor: "#ffbe71" }} />
                                    </div>
                                </div>

                                {/* Corner marks */}
                                {[
                                    { top: "2rem", left: "2rem", borderTop: "1px solid rgba(255,190,113,0.4)", borderLeft: "1px solid rgba(255,190,113,0.4)" },
                                    { top: "2rem", right: "2rem", borderTop: "1px solid rgba(255,190,113,0.4)", borderRight: "1px solid rgba(255,190,113,0.4)" },
                                    { bottom: "2rem", left: "2rem", borderBottom: "1px solid rgba(255,190,113,0.4)", borderLeft: "1px solid rgba(255,190,113,0.4)" },
                                    { bottom: "2rem", right: "2rem", borderBottom: "1px solid rgba(255,190,113,0.4)", borderRight: "1px solid rgba(255,190,113,0.4)" },
                                ].map((s, i) => (
                                    <div key={i} style={{ position: "absolute", width: "2rem", height: "2rem", ...s }} />
                                ))}
                            </div>
                        </div>

                        {/* Viewport Info Float */}
                        <div style={{
                            position: "fixed", bottom: "2rem", right: "2rem",
                            backgroundColor: "rgba(42,42,42,0.8)",
                            backdropFilter: "blur(20px)",
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                            border: "1px solid rgba(255,255,255,0.05)",
                            display: "flex", alignItems: "center", gap: "1rem",
                        }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "#ffbe71", textTransform: "uppercase", letterSpacing: "0.1em" }}>Viewport Scale</span>
                                <span style={{ fontSize: "0.75rem", fontFamily: "'Space Grotesk', sans-serif", color: "#d4d4d8" }}>100% (1440 x 900)</span>
                            </div>
                            <div style={{ width: "1px", height: "1.5rem", backgroundColor: "rgba(255,255,255,0.1)" }} />
                            <button style={{ padding: "0.5rem", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                                <span className="material-symbols-outlined" style={{ fontSize: "1.125rem", color: "#a1a1a1" }}>fullscreen</span>
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}