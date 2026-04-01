import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&family=Space+Grotesk:wght@300..700&family=Manrope:wght@200..800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
  }
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
`;

const inputStyle = {
    width: "100%",
    backgroundColor: "#0a0a0a",
    border: "1px solid #222222",
    color: "#e5e2e1",
    padding: "1rem",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    transition: "all 0.3s",
    borderRadius: 0,
};

const labelStyle = {
    display: "block",
    fontSize: "0.625rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#9f8e7d",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
};

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("PASSWORD MUST BE AT LEAST 8 CHARACTERS");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setPasswordError("PASSWORD MUST BE AT LEAST 8 CHARACTERS");
            return;
        }
        setPasswordError("");
        setIsLoading(true);
    };

    return (
        <>
            <style>{styles}</style>

            <div style={{ backgroundColor: "#131313", color: "#e5e2e1", fontFamily: "'Manrope', sans-serif", minHeight: "100vh", position: "relative" }}>

                {/* Background Glows */}
                <div style={{ position: "fixed", inset: 0, zIndex: -1, backgroundColor: "#131313", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "50%", height: "50%", background: "rgba(255,190,113,0.05)", filter: "blur(120px)", borderRadius: "50%" }} />
                    <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "40%", height: "40%", background: "rgba(42,42,42,0.2)", filter: "blur(100px)", borderRadius: "50%" }} />
                </div>

                {/* Header */}
                <header style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 2rem", backgroundColor: "transparent" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span className="material-symbols-outlined" style={{ color: "#ffbe71" }}>grid_view</span>
                        <span style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "0.05em", fontWeight: 700, textTransform: "uppercase", fontSize: "1.25rem", color: "#f97316" }}>VIBEKIT</span>
                    </div>
                    <span style={{ fontSize: "0.625rem", letterSpacing: "0.2em", fontWeight: 700, color: "#9f8e7d", textTransform: "uppercase" }}>
                        Member Access / v2.0
                    </span>
                </header>

                {/* Main */}
                <main
                    className="dot-grid"
                    style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
                >
                    {/* Geometric Decorators */}
                    <div style={{ position: "absolute", top: "5rem", left: "5rem", width: "1px", height: "16rem", background: "linear-gradient(to bottom, rgba(82,68,55,0.2), transparent)", opacity: 0.2 }} />
                    <div style={{ position: "absolute", bottom: "5rem", right: "5rem", width: "16rem", height: "1px", background: "linear-gradient(to left, rgba(82,68,55,0.2), transparent)", opacity: 0.2 }} />

                    <div style={{ width: "100%", maxWidth: "28rem", position: "relative" }}>
                        {/* Registration Marks */}
                        <div style={{ position: "absolute", top: "-0.75rem", left: "-0.75rem", width: "6px", height: "6px", backgroundColor: "#ffbe71" }} />
                        <div style={{ position: "absolute", bottom: "-0.75rem", right: "-0.75rem", width: "6px", height: "6px", backgroundColor: "#ffbe71" }} />

                        {/* Card */}
                        <div style={{ backgroundColor: "#201f1f", padding: "3rem", borderLeft: "1px solid rgba(82,68,55,0.1)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.9)" }}>

                            {/* Card Header */}
                            <div style={{ marginBottom: "2.5rem", textAlign: "left" }}>
                                <p style={{ color: "#f97316", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.625rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                                    JOIN THE STUDIO
                                </p>
                                <h1 style={{ fontSize: "2.5rem", fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: "-0.02em", color: "#e5e2e1", marginBottom: "0.5rem" }}>
                                    VIBEKIT STUDIO
                                </h1>
                                <div style={{ height: "4px", width: "3rem", backgroundColor: "#ffbe71" }} />
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={labelStyle}>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="ALEX RIVERA"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={inputStyle}
                                    />
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={labelStyle}>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="DESIGNER@VIBEKIT.STUDIO"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={inputStyle}
                                    />
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={labelStyle}>Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{
                                            ...inputStyle,
                                            border: passwordError ? "1px solid rgba(255,107,107,0.6)" : "1px solid #222222",
                                        }}
                                    />
                                    {passwordError && (
                                        <p style={{ color: "#ff6b6b", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.05em", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: "0.75rem" }}>error</span>
                                            {passwordError}
                                        </p>
                                    )}
                                </div>

                                <div style={{ paddingTop: "1rem" }}>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="glow-hover"
                                        style={{
                                            width: "100%",
                                            backgroundColor: isLoading ? "rgba(232,160,69,0.5)" : "#e8a045",
                                            color: "#0a0a0a",
                                            fontFamily: "'Syne', sans-serif",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.1em",
                                            padding: "1.25rem",
                                            fontSize: "0.875rem",
                                            border: "none",
                                            cursor: isLoading ? "not-allowed" : "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "0.75rem",
                                            transition: "all 0.3s",
                                        }}
                                    >
                                        {isLoading && (
                                            <span className="material-symbols-outlined animate-spin" style={{ fontSize: "0.875rem" }}>
                                                progress_activity
                                            </span>
                                        )}
                                        {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                                    </button>
                                </div>
                            </form>

                            {/* Footer Link */}
                            <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(82,68,55,0.1)", textAlign: "center" }}>
                                <p style={{ fontSize: "0.6875rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", color: "#9f8e7d", textTransform: "uppercase" }}>
                                    Have an account?{" "}
                                    <a href="/login" style={{ color: "#f97316", fontWeight: 700, textDecoration: "none", marginLeft: "0.25rem" }}>
                                        LOGIN
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Asymmetric Accent */}
                        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: "0.5625rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.4em", color: "#353534", textTransform: "uppercase" }}>ESTABLISHED MMXXIV</p>
                                <p style={{ fontSize: "0.5625rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.4em", color: "#353534", textTransform: "uppercase" }}>DIGITAL CRAFT ONLY</p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer style={{ position: "fixed", bottom: 0, width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "2rem 2.5rem", color: "#737373", backgroundColor: "transparent" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                        {["Privacy", "Terms", "Support"].map((link) => (
                            <span
                                key={link}
                                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, cursor: "pointer" }}
                            >
                                {link}
                            </span>
                        ))}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#525252" }}>
                        © 2024 VIBEKIT STUDIO. ALL RIGHTS RESERVED.
                    </div>
                </footer>
            </div>
        </>
    );
}