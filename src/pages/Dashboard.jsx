import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Manrope:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
  }
  body {
    background-color: #0a0a0a;
    background-image: radial-gradient(circle at 2px 2px, #2a2a2a 1px, transparent 0);
    background-size: 24px 24px;
    min-height: max(884px, 100dvh);
  }
  .glass-card {
    background: rgba(20, 20, 20, 0.8);
    backdrop-filter: blur(12px);
  }
  .page-card {
    transition: all 0.3s;
    border-left: 1px solid #222222;
  }
  .page-card:hover {
    border-left: 6px solid #e8a045;
    transform: translateX(4px);
  }
  .page-card img {
    filter: grayscale(100%);
    opacity: 0.5;
    transition: all 0.7s;
  }
  .page-card:hover img {
    filter: grayscale(0%);
    opacity: 1;
  }
`;

const pages = [
    {
        id: 1,
        title: "Minimal Portfolio",
        slug: "/p/minimal-port",
        status: "published",
        views: "1,240",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8bKEaTFrsScZL0K1RZRyELyO2OcLPzdZVwUcg7WtImVtJ1lMbbiHSB30TpHwytGNiPSrJ61UYJidj-knxGN4gBw5nDl1-lcInlcfCz0QjIyIJLp6VOcF4vv6tgxE4lio2fXB3G5u0x-y9P7ZhPpERDkNL-9up7SZEByQKdaioUcMXeLX1Vu9qI2iYZmelwiugJv02uJ0fmBTG3sulMbPtk-gepjkHtP4fcxYEEV6O6EZRnd4Wcsoafek05r38LYV7SgOe5HwWnpc",
        icon: null,
    },
    {
        id: 2,
        title: "Design Studio",
        slug: "/p/design-studio-v2",
        status: "published",
        views: "892",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjcYXWD54aOlEPoYvadRLZPdvgncPPopVtIVqLjxa3bCjlzRXn-J8el_2akK_ADyFCexMlmodew548KR7uVaJJOfUw1XHFVhSaUe54pXTcieHmjpX9OXtq1e6ggh84icYl5g6Fq5uJ9qLrsMNo1X5V0BHAiXKZkpPqZKVYbbbcf_4Dc4II1HBtV1VP22tmCY8j34fHrcMFgN-vVD4DFxqA65GCguY1KasLzAbyF8QUYh-6bVqEDIKA6a0_1gi3c0Zd-3J19GEMW5E",
        icon: null,
    },
    {
        id: 3,
        title: "New Site Draft",
        slug: "/p/draft-site",
        status: "draft",
        views: null,
        image: null,
        icon: "pending",
    },
    {
        id: 4,
        title: "Marketing Landing Page",
        slug: "/p/mkt-landing-alpha",
        status: "draft",
        views: null,
        image: null,
        icon: "architecture",
    },
];

function StatusBadge({ status }) {
    if (status === "published") {
        return (
            <span style={{
                backgroundColor: "#052c16",
                color: "#4ade80",
                fontSize: "0.625rem",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.25rem",
                textTransform: "uppercase",
            }}>
                PUBLISHED
            </span>
        );
    }
    return (
        <span style={{
            backgroundColor: "#2a2a2a",
            color: "#a1a1a1",
            fontSize: "0.625rem",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "0.25rem 0.75rem",
            borderRadius: "0.25rem",
            textTransform: "uppercase",
            border: "1px solid #3a3a3a",
        }}>
            DRAFT
        </span>
    );
}

function PageCard({ page, onDelete }) {
    return (
        <div
            className="page-card"
            style={{
                backgroundColor: "#141414",
                border: "1px solid #222222",
                borderRadius: "6px",
                overflow: "hidden",
            }}
        >
            {/* Thumbnail */}
            <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", backgroundColor: "#201f1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {page.image ? (
                    <img src={page.image} alt={page.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                    <>
                        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(#e8a045 1px, transparent 0)", backgroundSize: "16px 16px" }} />
                        <span className="material-symbols-outlined" style={{ fontSize: "2.25rem", color: "#333333" }}>{page.icon}</span>
                    </>
                )}
                <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                    <StatusBadge status={page.status} />
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <h3 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: page.status === "draft" ? "#a1a1a1" : "#e5e2e1",
                    }}>
                        {page.title}
                    </h3>
                    {page.views && (
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", color: "#e8a045", textTransform: "uppercase" }}>
                            — {page.views} VIEWS
                        </span>
                    )}
                </div>

                <code style={{ color: "#616161", fontSize: "0.75rem", fontFamily: "monospace" }}>{page.slug}</code>

                {/* Actions */}
                <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1.5rem", borderTop: "1px solid #222222", paddingTop: "1.5rem" }}>
                    <button style={{ color: "#e8a045", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer" }}>
                        EDIT
                    </button>
                    <button style={{ color: "#616161", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer" }}>
                        DUPLICATE
                    </button>
                    <button
                        onClick={() => onDelete(page.id)}
                        style={{ marginLeft: "auto", color: "#616161", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [pageList, setPageList] = useState(pages);

    const handleDelete = (id) => {
        setPageList((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <>
            <style>{styles}</style>

            <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#e5e2e1" }}>

                {/* Header */}
                <header style={{
                    backgroundColor: "#131313",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid rgba(42,42,42,0.15)",
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span className="material-symbols-outlined" style={{ color: "#e8a045" }}>grid_view</span>
                        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, fontSize: "1.25rem", color: "#e8a045" }}>
                            VIBEKIT
                        </h1>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                        <nav style={{ display: "flex", gap: "2rem" }}>
                            <a href="#" style={{ color: "#e8a045", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>My Pages</a>
                            <a href="#" style={{ color: "#a1a1a1", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>New Page</a>
                        </nav>
                        <button style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 700, fontSize: "0.875rem", color: "#e8a045", background: "none", border: "none", cursor: "pointer", padding: "0.5rem 1rem" }}>
                            LOGOUT
                        </button>
                    </div>
                </header>

                {/* Main */}
                <main style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem 8rem" }}>

                    {/* Page Header */}
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", gap: "1.5rem" }}>
                        <div style={{ position: "relative" }}>
                            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "3rem", letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                                MY PAGES
                            </h2>
                            <div style={{ width: "33%", height: "2px", backgroundColor: "#e8a045" }} />
                            <p style={{ marginTop: "1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", letterSpacing: "0.1em", color: "#a1a1a1", textTransform: "uppercase" }}>
                                {pageList.length} pages
                            </p>
                        </div>

                        <button style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            backgroundColor: "#e8a045",
                            color: "#0a0a0a",
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            padding: "1rem 2rem",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                        }}>
                            <span className="material-symbols-outlined">add_box</span>
                            NEW PAGE
                        </button>
                    </div>

                    {/* Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 28rem), 1fr))", gap: "2rem" }}>
                        {pageList.map((page) => (
                            <PageCard key={page.id} page={page} onDelete={handleDelete} />
                        ))}
                    </div>
                </main>

                {/* Mobile Bottom Nav */}
                <nav style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 50,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "4rem",
                    padding: "0 1rem",
                    backgroundColor: "rgba(14,14,14,0.8)",
                    backdropFilter: "blur(20px)",
                    borderTop: "1px solid rgba(42,42,42,0.15)",
                    boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
                }}>
                    <a href="#" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#e8a045", textDecoration: "none" }}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.25rem" }}>My Pages</span>
                    </a>
                    <a href="#" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#616161", textDecoration: "none" }}>
                        <span className="material-symbols-outlined">add_box</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.25rem" }}>New Page</span>
                    </a>
                </nav>

                {/* Geometric Decorators */}
                <div style={{ position: "fixed", top: "8rem", left: "2rem", width: "1px", height: "8rem", backgroundColor: "rgba(42,42,42,0.2)" }} />
                <div style={{ position: "fixed", top: "8rem", right: "2rem", width: "1px", height: "8rem", backgroundColor: "rgba(42,42,42,0.2)" }} />
                <div style={{ position: "fixed", bottom: "8rem", left: "2rem", width: "1rem", height: "1rem", borderLeft: "1px solid #e8a045", borderBottom: "1px solid #e8a045", opacity: 0.3 }} />
                <div style={{ position: "fixed", bottom: "8rem", right: "2rem", width: "1rem", height: "1rem", borderRight: "1px solid #e8a045", borderBottom: "1px solid #e8a045", opacity: 0.3 }} />
            </div>
        </>
    );
}