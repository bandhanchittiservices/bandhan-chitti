import { useState, useEffect } from "react";
import LOGO_URL from "./assets/logo.png";

const BRAND = {
  navy: "#1B2D6B", navyDark: "#0F1D4A", navyLight: "#2A3F8F",
  gold: "#B8860B", goldLight: "#D4A017", goldPale: "#FBF5E0",
  green: "#1B5E3B", white: "#FFFFFF", offWhite: "#F8FAFD",
  gray100: "#F0F3F8", gray200: "#DDE3EF", gray400: "#9BA8C0",
  gray600: "#4A5568", gray800: "#1A202C",
};

// ── Hook to detect mobile ──────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; overflow-x: hidden; }
    body { font-family: 'DM Sans', sans-serif; background: #F8FAFD; }
    h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }
    @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    .page { animation: fadeIn 0.4s ease; }
    input, textarea, select { font-family: 'DM Sans', sans-serif !important; background: #FFFFFF !important; color: #1A202C !important; }
    input::placeholder, textarea::placeholder { color: #9BA8C0 !important; }
    a { text-decoration: none; }
    button { font-family: 'DM Sans', sans-serif; cursor: pointer; }
  `}</style>
);

const SCHEMES = [
  { id: 1, value: "₹1,00,000", emi: "₹5,000", totalSlots: 20, filledSlots: 14, duration: "12–13 months", tag: "Most Popular", status: "active", startDate: "Feb 2025" },
  { id: 2, value: "₹5,00,000", emi: "₹25,000", totalSlots: 20, filledSlots: 8, duration: "12–13 months", tag: "Premium", status: "active", startDate: "Mar 2025" },
  { id: 3, value: "₹2,00,000", emi: "₹10,000", totalSlots: 20, filledSlots: 0, duration: "12–13 months", tag: "Coming Soon", status: "upcoming", startDate: "Apr 2025" },
];

function SlotBar({ filled, total, status }) {
  const pct = Math.round((filled / total) * 100);
  const remaining = total - filled;
  const color = remaining <= 3 ? "#DC2626" : remaining <= 7 ? "#D97706" : BRAND.green;
  if (status === "upcoming") return (
    <div style={{ marginTop: 14 }}>
      <div style={{ height: 8, background: BRAND.gray200, borderRadius: 8 }} />
      <div style={{ marginTop: 8, fontSize: 12, color: BRAND.gold, fontWeight: 600 }}>🔔 Registrations opening soon</div>
    </div>
  );
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: BRAND.gray600 }}>{filled}/{total} joined</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{remaining} left</span>
      </div>
      <div style={{ height: 8, background: BRAND.gray200, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 8 }} />
      </div>
      {remaining <= 5 && remaining > 0 && (
        <div style={{ marginTop: 5, fontSize: 11, color: "#DC2626", fontWeight: 600 }}>🔥 Only {remaining} slots left!</div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "How It Works", "Schemes", "Join Us", "Contact"];

  return (
    <nav style={{ background: BRAND.navy, position: "sticky", top: 0, zIndex: 100, width: "100%", boxShadow: "0 2px 24px rgba(0,0,0,0.15)" }}>
      <div style={{ width: "100%", maxWidth: 1140, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }} onClick={() => { setPage("Home"); setMenuOpen(false); }}>
          <img src={LOGO_URL} alt="Bandhan Chitti" style={{ height: 44, width: "auto", objectFit: "contain" }} />
        </div>
        <div style={{ flex: 1 }} />

        {/* Desktop Nav */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {links.map(l => (
              <button key={l} onClick={() => setPage(l)} style={{
                background: "none", border: "none",
                color: page === l ? BRAND.goldLight : "rgba(255,255,255,0.85)",
                fontSize: 13, fontWeight: page === l ? 600 : 400,
                padding: "8px 10px", borderRadius: 6,
                borderBottom: page === l ? `2px solid ${BRAND.goldLight}` : "2px solid transparent",
              }}>{l}</button>
            ))}
            <button onClick={() => setPage("Login")} style={{
              background: BRAND.goldLight, border: "none", color: BRAND.navyDark,
              fontSize: 13, fontWeight: 700, padding: "9px 16px", borderRadius: 8, marginLeft: 8,
            }}>Member Login</button>
          </div>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", padding: 8, display: "flex", flexDirection: "column", gap: 5,
          }}>
            <div style={{ width: 26, height: 2.5, background: BRAND.white, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5.5px)" : "none" }} />
            <div style={{ width: 26, height: 2.5, background: BRAND.white, borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 26, height: 2.5, background: BRAND.white, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5.5px)" : "none" }} />
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobile && menuOpen && (
        <div style={{ background: BRAND.navyDark, borderTop: `1px solid rgba(255,255,255,0.1)`, padding: "12px 16px 16px" }}>
          {links.map(l => (
            <button key={l} onClick={() => { setPage(l); setMenuOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left",
              background: page === l ? "rgba(212,160,23,0.12)" : "none",
              border: "none", borderLeft: page === l ? `3px solid ${BRAND.goldLight}` : "3px solid transparent",
              color: page === l ? BRAND.goldLight : "rgba(255,255,255,0.85)",
              fontSize: 15, fontWeight: page === l ? 600 : 400,
              padding: "13px 16px", borderRadius: "0 8px 8px 0", marginBottom: 4,
            }}>{l}</button>
          ))}
          <button onClick={() => { setPage("Login"); setMenuOpen(false); }} style={{
            display: "block", width: "100%", marginTop: 8,
            background: BRAND.goldLight, border: "none", color: BRAND.navyDark,
            fontSize: 15, fontWeight: 700, padding: "13px 16px", borderRadius: 8,
          }}>Member Login</button>
        </div>
      )}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${BRAND.navy}, ${BRAND.goldLight}, ${BRAND.green})` }} />
    </nav>
  );
}

// ── Home Page ──────────────────────────────────────────────
function HomePage({ setPage }) {
  const isMobile = useIsMobile();
  const stats = [
    { num: "16+", label: "Years of Experience" },
    { num: "500+", label: "Members Served" },
    { num: "40+", label: "Groups Completed" },
    { num: "₹2Cr+", label: "Chit Value Managed" },
  ];
  const features = [
    { icon: "🏦", title: "Trusted for 16+ Years", desc: "A proven track record of running successful chit groups in Hubli-Dharwad." },
    { icon: "🔨", title: "Transparent Auction", desc: "Every monthly auction is conducted openly and fairly among all group members." },
    { icon: "⚡", title: "Quick Access to Funds", desc: "Receive funds faster than traditional bank loans — no heavy documentation." },
    { icon: "🤝", title: "Community-Based System", desc: "Members save together and support each other's financial growth." },
  ];
  return (
    <div className="page" style={{ width: "100%" }}>
      {/* Hero */}
      <div style={{ width: "100%", background: `linear-gradient(135deg, ${BRAND.navyDark} 0%, ${BRAND.navy} 55%, ${BRAND.navyLight} 100%)`, padding: isMobile ? "60px 20px 50px" : "90px 24px 70px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,160,23,0.15)", border: `1px solid rgba(212,160,23,0.3)`, color: BRAND.goldLight, fontSize: isMobile ? 10 : 11, letterSpacing: 2, padding: "7px 16px", borderRadius: 24, marginBottom: 24, fontWeight: 600 }}>
            🏆 HUBLI–DHARWAD'S MOST TRUSTED CHIT FUND
          </div>
          <h1 style={{ color: BRAND.white, fontSize: isMobile ? 34 : 48, lineHeight: 1.15, marginBottom: 20, fontWeight: 800 }}>
            Grow Together,<br /><span style={{ color: BRAND.goldLight }}>Save Smarter</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: isMobile ? 15 : 17, lineHeight: 1.75, marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
            Join Bandhan Chitti Services — Karnataka's trusted community chit fund with 16+ years of experience, serving 500+ members across Hubli-Dharwad.
          </p>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center", alignItems: "center" }}>
            <button onClick={() => setPage("Join Us")} style={{ background: BRAND.goldLight, border: "none", color: BRAND.navyDark, fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 10, width: isMobile ? "100%" : "auto" }}>
              Join a Chitti Group →
            </button>
            <button onClick={() => setPage("How It Works")} style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.3)", color: BRAND.white, fontSize: 15, fontWeight: 500, padding: "14px 32px", borderRadius: 10, width: isMobile ? "100%" : "auto" }}>
              How It Works
            </button>
          </div>
          <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, color: "#4ADE80", fontSize: 14 }}>
            💬 Chat with us on WhatsApp
          </a>
        </div>
      </div>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BRAND.navy}, ${BRAND.goldLight}, ${BRAND.green})` }} />

      {/* Stats */}
      <div style={{ width: "100%", background: BRAND.white, padding: isMobile ? "32px 20px" : "44px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 12 : 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: isMobile ? "18px 12px" : "24px 16px", borderRadius: 12, background: BRAND.offWhite, border: `1px solid ${BRAND.gray200}` }}>
              <div style={{ fontSize: isMobile ? 28 : 34, fontWeight: 800, color: BRAND.navy }}>{s.num}</div>
              <div style={{ fontSize: 12, color: BRAND.gray600, marginTop: 5, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ width: "100%", background: BRAND.offWhite, padding: isMobile ? "44px 20px" : "70px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ color: BRAND.navy, fontSize: isMobile ? 26 : 32, marginBottom: 12 }}>Why Choose Bandhan Chitti?</h2>
            <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: isMobile ? 16 : 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: BRAND.white, borderRadius: 14, padding: "24px 20px", border: `1px solid ${BRAND.gray200}`, display: "flex", gap: 16, boxShadow: "0 2px 16px rgba(27,45,107,0.06)" }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h3 style={{ color: BRAND.navy, fontSize: 16, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schemes */}
      <div style={{ width: "100%", background: BRAND.white, padding: isMobile ? "44px 20px" : "70px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ color: BRAND.navy, fontSize: isMobile ? 26 : 32, marginBottom: 12 }}>Active Chitti Schemes</h2>
            <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 12px" }} />
            <p style={{ color: BRAND.gray600, fontSize: 14 }}>Limited slots — join before they fill up</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 16 : 24 }}>
            {SCHEMES.map((s) => {
              const isUpcoming = s.status === "upcoming";
              return (
                <div key={s.id} style={{ borderRadius: 16, overflow: "hidden", border: `2px solid ${isUpcoming ? BRAND.gray200 : BRAND.navy}`, boxShadow: "0 4px 20px rgba(27,45,107,0.10)" }}>
                  <div style={{ background: isUpcoming ? BRAND.gray100 : BRAND.navy, padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: isMobile ? 22 : 24, fontWeight: 700, color: isUpcoming ? BRAND.gray600 : BRAND.white }}>{s.value}</div>
                      <div style={{ background: isUpcoming ? BRAND.gray400 : BRAND.goldLight, color: isUpcoming ? BRAND.white : BRAND.navyDark, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, flexShrink: 0 }}>{s.tag}</div>
                    </div>
                    <div style={{ color: isUpcoming ? BRAND.gray400 : "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 4 }}>EMI: {s.emi}/month</div>
                  </div>
                  <div style={{ padding: "18px 20px", background: BRAND.white }}>
                    {[["Group Size", "20 Members"], ["Duration", s.duration], ["Auction", "Every Month"]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BRAND.gray100}` }}>
                        <span style={{ color: BRAND.gray600, fontSize: 13 }}>{k}</span>
                        <span style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>{v}</span>
                      </div>
                    ))}
                    <SlotBar filled={s.filledSlots} total={s.totalSlots} status={s.status} />
                    <button onClick={() => !isUpcoming && setPage("Join Us")} style={{ width: "100%", marginTop: 16, background: isUpcoming ? BRAND.gray200 : BRAND.navy, border: "none", color: isUpcoming ? BRAND.gray600 : BRAND.goldLight, fontSize: 14, fontWeight: 700, padding: "12px", borderRadius: 8 }}>
                      {isUpcoming ? "Coming Soon" : "Apply Now →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ width: "100%", background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: isMobile ? "50px 20px" : "60px 24px", textAlign: "center" }}>
        <h2 style={{ color: BRAND.white, fontSize: isMobile ? 24 : 30, marginBottom: 12 }}>Ready to Start Your Chitti Journey?</h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 28 }}>Join hundreds of members already saving smarter.</p>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center", alignItems: "center" }}>
          <button onClick={() => setPage("Join Us")} style={{ background: BRAND.goldLight, border: "none", color: BRAND.navyDark, fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 10, width: isMobile ? "100%" : "auto" }}>Join Now →</button>
          <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#22C55E", color: BRAND.white, fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 10, width: isMobile ? "100%" : "auto" }}>💬 WhatsApp Us</a>
        </div>
      </div>
    </div>
  );
}

// ── About Page ─────────────────────────────────────────────
function AboutPage() {
  const isMobile = useIsMobile();
  const impact = [
    { num: "16+", label: "Years of Experience", desc: "Serving the community reliably" },
    { num: "500+", label: "Members Served", desc: "Hundreds of happy members" },
    { num: "40+", label: "Groups Completed", desc: "Strong track record" },
    { num: "₹2Cr+", label: "Chit Value Managed", desc: "Trusted with large amounts" },
  ];
  return (
    <div className="page" style={{ width: "100%" }}>
      <div style={{ width: "100%", background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: isMobile ? "50px 20px" : "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: isMobile ? 28 : 36, marginBottom: 12 }}>About Bandhan Chitti Services</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 14px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>Built on Trust. Driven by Commitment.</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "32px 20px" : "50px 24px" }}>
        {/* Story */}
        <div style={{ background: BRAND.white, borderRadius: 16, padding: isMobile ? "24px 20px" : "36px", border: `1px solid ${BRAND.gray200}`, marginBottom: 28 }}>
          <h2 style={{ color: BRAND.navy, fontSize: isMobile ? 22 : 26, marginBottom: 16 }}>Our Story</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15, marginBottom: 14 }}>Bandhan Chitti Services is a trusted community-based chit fund platform in Hubli–Dharwad, Karnataka. With over <strong style={{ color: BRAND.navy }}>16 years of experience</strong>, we help individuals and families grow savings and access funds through a reliable, transparent chit system.</p>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15, marginBottom: 14 }}>Our mission: create a financial support network where members save together and grow financially.</p>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15 }}>We have helped members access funds for <strong style={{ color: BRAND.navy }}>business needs, emergencies, education, and financial growth.</strong></p>
        </div>

        {/* Impact */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: BRAND.navy, fontSize: isMobile ? 22 : 26, marginBottom: 8, textAlign: "center" }}>Our Impact</h2>
          <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 24px" }} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 12 : 20 }}>
            {impact.map((item, i) => (
              <div key={i} style={{ background: BRAND.white, borderRadius: 14, padding: "22px 16px", textAlign: "center", border: `1px solid ${BRAND.gray200}` }}>
                <div style={{ fontSize: isMobile ? 28 : 34, fontWeight: 800, color: BRAND.navy, marginBottom: 6 }}>{item.num}</div>
                <div style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700, marginBottom: 5 }}>{item.label}</div>
                <div style={{ color: BRAND.gray600, fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Do */}
        <div style={{ background: BRAND.offWhite, borderRadius: 16, padding: isMobile ? "24px 20px" : "36px", border: `1px solid ${BRAND.gray200}`, marginBottom: 28 }}>
          <h2 style={{ color: BRAND.navy, fontSize: isMobile ? 22 : 26, marginBottom: 16 }}>What We Do</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15, marginBottom: 16 }}>We organize structured chit fund groups where members contribute a fixed monthly amount. Each month, a transparent bidding process determines who receives the pooled fund.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 12 }}>
            {["Disciplined savings for members", "Transparent monthly auction system", "Quick access to funds without complex banking", "Community-based financial support"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: BRAND.white, padding: "12px 14px", borderRadius: 10, border: `1px solid ${BRAND.gray200}` }}>
                <span style={{ color: BRAND.green, fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={{ background: BRAND.white, borderRadius: 16, padding: isMobile ? "24px 20px" : "36px", border: `1px solid ${BRAND.gray200}`, marginBottom: 28 }}>
          <h2 style={{ color: BRAND.navy, fontSize: isMobile ? 22 : 26, marginBottom: 18 }}>Why Choose Us</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Trusted local network built over 16+ years", "Transparent bidding process", "Faster access to funds vs traditional loans", "Community-driven savings system", "Reliable and structured financial participation"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: BRAND.offWhite, borderRadius: 10, border: `1px solid ${BRAND.gray200}` }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: BRAND.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: BRAND.goldLight, fontSize: 12, fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ color: BRAND.gray800, fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: BRAND.navy, fontSize: isMobile ? 22 : 26, marginBottom: 8, textAlign: "center" }}>Why Chit Fund?</h2>
          <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 24px" }} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 14 : 20 }}>
            {[
              { title: "Better than Loans", icon: "🏦", desc: "No complicated bank procedures or heavy documentation required." },
              { title: "Better than FD", icon: "📈", desc: "Access funds when needed instead of locking money for years." },
              { title: "Better than SIP", icon: "💹", desc: "Chit funds provide liquidity for immediate financial needs." },
            ].map((item, i) => (
              <div key={i} style={{ background: BRAND.white, borderRadius: 14, padding: "24px 20px", border: `2px solid ${BRAND.gray200}`, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ color: BRAND.navy, fontSize: 16, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, borderRadius: 16, padding: isMobile ? "24px 20px" : "36px", marginBottom: 28 }}>
          <h2 style={{ color: BRAND.white, fontSize: isMobile ? 22 : 26, marginBottom: 14 }}>Our Vision</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, fontSize: 15, marginBottom: 18 }}>To modernize the traditional chit fund system with digital technology. Members will soon be able to:</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 10 }}>
            {["Track payments online", "View auction results in real time", "Monitor their balances", "Participate in a transparent secure system"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", padding: "11px 14px", borderRadius: 10 }}>
                <span style={{ color: BRAND.goldLight }}>→</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment */}
        <div style={{ background: BRAND.goldPale, borderRadius: 16, padding: isMobile ? "24px 20px" : "36px", border: `2px solid ${BRAND.goldLight}`, textAlign: "center" }}>
          <h2 style={{ color: BRAND.navy, fontSize: isMobile ? 22 : 26, marginBottom: 14 }}>Our Commitment</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15, maxWidth: 680, margin: "0 auto 14px" }}>At Bandhan Chitti Services, financial growth should be accessible to everyone. We provide a secure, transparent, trustworthy platform where members save regularly and access funds when needed.</p>
          <p style={{ color: BRAND.navy, fontSize: 16, fontWeight: 700, fontStyle: "italic" }}>"Built on Trust. Driven by Commitment."</p>
        </div>
      </div>
    </div>
  );
}

// ── How It Works ───────────────────────────────────────────
function HowItWorksPage({ setPage }) {
  const isMobile = useIsMobile();
  const steps = [
    { num: "01", icon: "📋", title: "Join a Chitti Group", desc: "Choose ₹1,00,000 or ₹5,00,000 scheme. Submit application and get verified." },
    { num: "02", icon: "💳", title: "Monthly Contribution", desc: "Pay monthly EMI — ₹5,000 for ₹1L scheme or ₹25,000 for ₹5L scheme." },
    { num: "03", icon: "🔨", title: "Transparent Monthly Auction", desc: "Fair monthly bidding. Highest bidder wins the pooled chit amount." },
    { num: "04", icon: "🏆", title: "Receive the Chitti Amount", desc: "Winner gets funds after bid discount. Continues paying EMI but cannot bid again." },
    { num: "05", icon: "✅", title: "Cycle Completes", desc: "All 20 members receive their chitti within 12–13 months." },
  ];
  return (
    <div className="page" style={{ width: "100%", background: BRAND.offWhite }}>
      <div style={{ width: "100%", background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: isMobile ? "50px 20px" : "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: isMobile ? 28 : 36, marginBottom: 12 }}>How Chitti Works</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 14px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>Simple, transparent, community-driven savings</p>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "32px 20px" : "50px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: BRAND.white, borderRadius: 14, padding: isMobile ? "18px 16px" : "24px 28px", border: `1px solid ${BRAND.gray200}`, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: BRAND.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: BRAND.goldLight, fontWeight: 700, fontSize: 14 }}>{s.num}</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <h3 style={{ color: BRAND.navy, fontSize: isMobile ? 16 : 18 }}>{s.title}</h3>
                </div>
                <p style={{ color: BRAND.gray600, lineHeight: 1.7, fontSize: 14 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Example */}
        <div style={{ background: BRAND.goldPale, border: `2px solid ${BRAND.goldLight}`, borderRadius: 16, padding: isMobile ? "22px 18px" : "28px 28px", marginBottom: 36 }}>
          <h3 style={{ color: BRAND.navy, fontSize: isMobile ? 18 : 22, marginBottom: 16 }}>📌 Real Example — ₹1,00,000 Chitti</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[["Total Members", "20 people"], ["Monthly EMI", "₹5,000 each"], ["Total Pool/Month", "₹1,00,000"], ["Minimum Bid", "₹30,000 discount"], ["Winner Gets", "₹70,000 minimum"], ["Duration", "12–13 months"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", background: BRAND.white, padding: "10px 14px", borderRadius: 8 }}>
                <span style={{ color: BRAND.gray600, fontSize: 14 }}>{k}</span>
                <span style={{ color: BRAND.navy, fontSize: 14, fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("Join Us")} style={{ background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 10, width: isMobile ? "100%" : "auto" }}>
            Ready to Join? Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Schemes Page ───────────────────────────────────────────
function SchemesPage({ setPage }) {
  const isMobile = useIsMobile();
  return (
    <div className="page" style={{ width: "100%" }}>
      <div style={{ width: "100%", background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: isMobile ? "50px 20px" : "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: isMobile ? 28 : 36, marginBottom: 12 }}>Our Chitti Schemes</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 14px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>Limited slots — secure your spot today</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "32px 20px" : "50px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 16 : 28 }}>
          {SCHEMES.map((s) => {
            const isUpcoming = s.status === "upcoming";
            return (
              <div key={s.id} style={{ borderRadius: 16, overflow: "hidden", border: `2px solid ${isUpcoming ? BRAND.gray200 : BRAND.navy}`, boxShadow: "0 4px 24px rgba(27,45,107,0.10)" }}>
                <div style={{ background: isUpcoming ? BRAND.gray100 : BRAND.navy, padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: isUpcoming ? BRAND.gray600 : BRAND.white }}>{s.value}</div>
                      <div style={{ color: isUpcoming ? BRAND.gray400 : "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 3 }}>Chitti Value</div>
                    </div>
                    <div style={{ background: isUpcoming ? BRAND.gray400 : BRAND.goldLight, color: isUpcoming ? BRAND.white : BRAND.navyDark, fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, flexShrink: 0 }}>{s.tag}</div>
                  </div>
                </div>
                <div style={{ padding: "20px", background: BRAND.white }}>
                  {[["Monthly EMI", s.emi], ["Group Size", "20 Members"], ["Duration", s.duration], ["Auction", "Every Month"], ["Starting", s.startDate]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${BRAND.gray100}` }}>
                      <span style={{ color: BRAND.gray600, fontSize: 13 }}>{k}</span>
                      <span style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                  <SlotBar filled={s.filledSlots} total={s.totalSlots} status={s.status} />
                  <button onClick={() => !isUpcoming && setPage("Join Us")} style={{ width: "100%", marginTop: 16, background: isUpcoming ? BRAND.gray200 : BRAND.navy, border: "none", color: isUpcoming ? BRAND.gray600 : BRAND.goldLight, fontSize: 14, fontWeight: 700, padding: "13px", borderRadius: 8 }}>
                    {isUpcoming ? "Coming Soon" : "Apply for this Scheme →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ background: BRAND.goldPale, border: `1px solid ${BRAND.goldLight}`, borderRadius: 12, padding: "18px 20px", marginTop: 28, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>ℹ️</span>
          <p style={{ color: BRAND.gray600, fontSize: 13, lineHeight: 1.6, margin: 0 }}>All members must submit valid ID proof and references. Slots are limited — first come, first served. WhatsApp us for faster processing.</p>
        </div>
      </div>
    </div>
  );
}

// ── Join Us Page ───────────────────────────────────────────
function JoinUsPage() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", phone: "", occupation: "", scheme: "", city: "", reference: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = () => {
    if (!form.name || !form.phone || !form.scheme) { alert("Please fill all required fields."); return; }
    setSubmitted(true);
  };
  const inputStyle = (name) => ({
    width: "100%", padding: "13px 14px", borderRadius: 8, fontSize: 15,
    color: "#1A202C", background: "#FFFFFF", outline: "none", boxSizing: "border-box",
    border: `2px solid ${focused === name ? BRAND.navy : BRAND.gray200}`, transition: "border-color 0.2s",
  });
  if (submitted) return (
    <div className="page" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px", background: BRAND.offWhite }}>
      <div style={{ background: BRAND.white, borderRadius: 20, padding: isMobile ? "36px 24px" : "48px 44px", textAlign: "center", maxWidth: 480, width: "100%", border: `2px solid ${BRAND.goldLight}` }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 style={{ color: BRAND.navy, fontSize: 24, marginBottom: 12 }}>Application Submitted!</h2>
        <p style={{ color: BRAND.gray600, lineHeight: 1.75, marginBottom: 24, fontSize: 15 }}>Thank you <strong style={{ color: BRAND.navy }}>{form.name}</strong>! We received your application for <strong style={{ color: BRAND.navy }}>{form.scheme}</strong>. Our team contacts you within 24 hours.</p>
        <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22C55E", color: BRAND.white, fontSize: 15, fontWeight: 700, padding: "13px 28px", borderRadius: 10 }}>💬 Message on WhatsApp</a>
      </div>
    </div>
  );
  return (
    <div className="page" style={{ width: "100%", background: BRAND.offWhite }}>
      <div style={{ width: "100%", background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: isMobile ? "50px 20px" : "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: isMobile ? 28 : 36, marginBottom: 12 }}>Join Bandhan Chitti</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 14px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>Our team will contact you within 24 hours</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: isMobile ? "32px 20px" : "50px 24px" }}>
        <div style={{ background: BRAND.white, borderRadius: 20, padding: isMobile ? "28px 20px" : "40px", boxShadow: "0 4px 30px rgba(27,45,107,0.09)", border: `1px solid ${BRAND.gray200}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { label: "Full Name *", name: "name", placeholder: "Enter your full name", type: "text" },
              { label: "Phone Number *", name: "phone", placeholder: "+91 XXXXX XXXXX", type: "tel" },
              { label: "Occupation", name: "occupation", placeholder: "e.g. Shopkeeper, Teacher, Business Owner", type: "text" },
              { label: "City / Area", name: "city", placeholder: "e.g. Hubli, Dharwad", type: "text" },
              { label: "Reference — Who referred you?", name: "reference", placeholder: "Name of existing member or how you found us", type: "text" },
            ].map((f) => (
              <div key={f.name}>
                <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 7 }}>{f.label}</label>
                <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handle} onFocus={() => setFocused(f.name)} onBlur={() => setFocused("")} style={inputStyle(f.name)} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Select Scheme *</label>
              <select name="scheme" value={form.scheme} onChange={handle} onFocus={() => setFocused("scheme")} onBlur={() => setFocused("")} style={inputStyle("scheme")}>
                <option value="">-- Choose a scheme --</option>
                <option value="₹1,00,000 Chitti (₹5,000/month)">₹1,00,000 Chitti — ₹5,000/month</option>
                <option value="₹5,00,000 Chitti (₹25,000/month)">₹5,00,000 Chitti — ₹25,000/month</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Message or Questions</label>
              <textarea name="message" placeholder="Any questions?" value={form.message} onChange={handle} rows={3} onFocus={() => setFocused("message")} onBlur={() => setFocused("")} style={{ ...inputStyle("message"), resize: "vertical" }} />
            </div>
            <button onClick={submit} style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 16, fontWeight: 700, padding: "15px", borderRadius: 10 }}>
              Submit Application →
            </button>
          </div>
          <p style={{ textAlign: "center", color: BRAND.gray600, fontSize: 13, marginTop: 16 }}>
            Or reach us on <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ color: "#22C55E", fontWeight: 700 }}>WhatsApp</a> or <a href="mailto:bandhanchittiservices@gmail.com" style={{ color: BRAND.navy, fontWeight: 700 }}>Email</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Contact Page ───────────────────────────────────────────
function ContactPage() {
  const isMobile = useIsMobile();
  const contacts = [
    { icon: "💬", title: "WhatsApp", desc: "+91 79758 76235\nChat with us directly", btn: "Message Now", link: "https://wa.me/917975876235", btnBg: "#22C55E", btnColor: BRAND.white, border: "#22C55E" },
    { icon: "📞", title: "Phone", desc: "+91 79758 76235\nCall during business hours", btn: "Call Now", link: "tel:+917975876235", btnBg: BRAND.navy, btnColor: BRAND.goldLight, border: BRAND.navy },
    { icon: "✉️", title: "Email", desc: "bandhanchittiservices@gmail.com\nWe reply within 24 hours", btn: "Send Email", link: "mailto:bandhanchittiservices@gmail.com", btnBg: BRAND.goldLight, btnColor: BRAND.navyDark, border: BRAND.goldLight },
    { icon: "📍", title: "Location & Hours", desc: "Hubli–Dharwad, Karnataka\nMon–Sat: 9AM – 7PM | Sunday: Closed", btn: "View on Maps", link: "https://maps.google.com/?q=Hubli,Karnataka", btnBg: BRAND.offWhite, btnColor: BRAND.navy, border: BRAND.gray200 },
  ];
  return (
    <div className="page" style={{ width: "100%" }}>
      <div style={{ width: "100%", background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: isMobile ? "50px 20px" : "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: isMobile ? 28 : 36, marginBottom: 12 }}>Contact Us</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 14px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>We're here to help. Reach us anytime.</p>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "32px 20px" : "50px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: isMobile ? 16 : 24, marginBottom: 28 }}>
          {contacts.map((c, i) => (
            <a key={i} href={c.link} target="_blank" rel="noreferrer" style={{ background: BRAND.white, borderRadius: 16, padding: "28px 24px", border: `2px solid ${c.border}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, textDecoration: "none", boxShadow: "0 2px 12px rgba(27,45,107,0.06)" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: BRAND.offWhite, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{c.icon}</div>
              <h3 style={{ color: BRAND.navy, fontSize: 18 }}>{c.title}</h3>
              <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.65, whiteSpace: "pre-line" }}>{c.desc}</p>
              <div style={{ background: c.btnBg, color: c.btnColor, fontSize: 13, fontWeight: 700, padding: "10px 24px", borderRadius: 8 }}>{c.btn}</div>
            </a>
          ))}
        </div>
        <div style={{ background: BRAND.navy, borderRadius: 14, padding: "24px 20px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 32, flexShrink: 0 }}>🛡️</div>
          <div>
            <h3 style={{ color: BRAND.white, fontSize: 16, marginBottom: 6 }}>Trusted for 16+ Years in Hubli-Dharwad</h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>500+ members • 40+ groups • ₹2Cr+ managed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Login Page ─────────────────────────────────────────────
function LoginPage() {
  const isMobile = useIsMobile();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  return (
    <div className="page" style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.offWhite, padding: "24px 20px" }}>
      <div style={{ background: BRAND.white, borderRadius: 20, padding: isMobile ? "36px 24px" : "44px 40px", maxWidth: 420, width: "100%", boxShadow: "0 8px 40px rgba(27,45,107,0.12)", border: `1px solid ${BRAND.gray200}` }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src={LOGO_URL} alt="Bandhan Chitti" style={{ height: 48, marginBottom: 14, objectFit: "contain" }} />
          <h2 style={{ color: BRAND.navy, fontSize: 22, marginBottom: 6 }}>Member Login</h2>
          <p style={{ color: BRAND.gray600, fontSize: 13 }}>Access your personal chitti dashboard</p>
        </div>
        {step === 1 ? (
          <>
            <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Mobile Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" type="tel" style={{ width: "100%", padding: "13px 14px", borderRadius: 8, border: `2px solid ${BRAND.gray200}`, fontSize: 15, color: BRAND.gray800, background: BRAND.white, outline: "none", boxSizing: "border-box", marginBottom: 18 }} />
            <button onClick={() => setStep(2)} style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10 }}>Send OTP →</button>
          </>
        ) : (
          <>
            <p style={{ color: BRAND.gray600, fontSize: 13, marginBottom: 14 }}>OTP sent to <strong>{phone}</strong></p>
            <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Enter OTP</label>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" type="number" style={{ width: "100%", padding: "13px 14px", borderRadius: 8, border: `2px solid ${BRAND.gray200}`, fontSize: 15, color: BRAND.gray800, background: BRAND.white, outline: "none", boxSizing: "border-box", marginBottom: 18 }} />
            <button style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10, marginBottom: 10 }}>Login to Dashboard →</button>
            <button onClick={() => setStep(1)} style={{ width: "100%", background: "none", border: "none", color: BRAND.gray600, fontSize: 13 }}>← Change Number</button>
          </>
        )}
        <div style={{ marginTop: 20, padding: "12px 14px", background: BRAND.goldPale, borderRadius: 8, textAlign: "center", border: `1px solid ${BRAND.goldLight}` }}>
          <p style={{ color: BRAND.gray600, fontSize: 12, margin: 0 }}>Not a member yet? <a href="#" style={{ color: BRAND.navy, fontWeight: 700 }}>Apply to Join →</a></p>
        </div>
      </div>
    </div>
  );
}

// ── Chat Widget ────────────────────────────────────────────
function ChatWidget() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: "Namaskar! 🙏 Welcome to Bandhan Chitti Services. How can I help you today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim(); setInput("");
    const newMsgs = [...messages, { role: "user", content: text }];
    setMessages(newMsgs); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: "You are a helpful assistant for Bandhan Chitti Services, a chit fund in Hubli-Dharwad, Karnataka with 16+ years experience. Answer questions about chit funds, joining, EMI, auctions. Be warm and professional.",
          messages: newMsgs }),
      });
      const data = await res.json();
      setMessages([...newMsgs, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "Sorry, try again." }]);
    } catch { setMessages([...newMsgs, { role: "assistant", content: "Something went wrong. Please WhatsApp us at +91 79758 76235" }]); }
    setLoading(false);
  };
  return (
    <div style={{ position: "fixed", bottom: isMobile ? 16 : 24, right: isMobile ? 16 : 24, zIndex: 1000 }}>
      {open && (
        <div style={{ width: isMobile ? "calc(100vw - 32px)" : 320, height: 420, background: BRAND.white, borderRadius: 18, boxShadow: "0 8px 40px rgba(27,45,107,0.22)", border: `1px solid ${BRAND.gray200}`, display: "flex", flexDirection: "column", marginBottom: 12, overflow: "hidden" }}>
          <div style={{ background: BRAND.navy, padding: "13px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <img src={LOGO_URL} alt="" style={{ height: 28, objectFit: "contain" }} />
            <div>
              <div style={{ color: BRAND.white, fontSize: 13, fontWeight: 700 }}>Bandhan Chitti</div>
              <div style={{ color: BRAND.goldLight, fontSize: 10 }}>● Online — Ask me anything</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 22 }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "82%", padding: "10px 13px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? BRAND.navy : BRAND.offWhite, color: m.role === "user" ? BRAND.white : BRAND.navy, fontSize: 13, lineHeight: 1.55 }}>{m.content}</div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", gap: 4, padding: "10px 13px", background: BRAND.offWhite, borderRadius: "14px 14px 14px 4px", width: "fit-content" }}>
              {[0,1,2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.goldLight, animation: "bounce 1.2s infinite", animationDelay: `${j*0.2}s` }} />)}
            </div>}
          </div>
          <div style={{ padding: "10px 12px", borderTop: `1px solid ${BRAND.gray200}`, display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{ flex: 1, padding: "10px 13px", borderRadius: 8, border: `1.5px solid ${BRAND.gray200}`, fontSize: 13, outline: "none", color: BRAND.navy, background: BRAND.white }} />
            <button onClick={send} style={{ background: BRAND.navy, border: "none", color: BRAND.goldLight, borderRadius: 8, width: 38, fontSize: 16, fontWeight: 700 }}>➤</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{ width: 54, height: 54, borderRadius: "50%", background: BRAND.navy, border: `3px solid ${BRAND.goldLight}`, color: BRAND.goldLight, fontSize: 22, boxShadow: "0 4px 20px rgba(27,45,107,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────
function Footer({ setPage }) {
  const isMobile = useIsMobile();
  return (
    <footer style={{ width: "100%", background: BRAND.navyDark, padding: isMobile ? "40px 20px 24px" : "52px 24px 28px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 32 : 44, marginBottom: 36 }}>
          <div>
            <img src={LOGO_URL} alt="Bandhan Chitti" style={{ height: 44, marginBottom: 14, objectFit: "contain" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.75, maxWidth: 280, marginBottom: 14 }}>Trusted community chit fund in Hubli–Dharwad, Karnataka. Serving members since 2009.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ color: "#4ADE80", fontSize: 13 }}>💬 +91 79758 76235</a>
              <a href="mailto:bandhanchittiservices@gmail.com" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>✉️ bandhanchittiservices@gmail.com</a>
            </div>
          </div>
          <div>
            <div style={{ color: BRAND.goldLight, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>QUICK LINKS</div>
            {["Home", "About", "How It Works", "Schemes", "Join Us", "Contact"].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <button onClick={() => setPage(l)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 13, padding: 0 }}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: BRAND.goldLight, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>OUR IMPACT</div>
            {[["16+", "Years Experience"], ["500+", "Members Served"], ["40+", "Groups Completed"], ["₹2Cr+", "Value Managed"]].map(([n, l]) => (
              <div key={l} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
                <span style={{ color: BRAND.goldLight, fontSize: 14, fontWeight: 700 }}>{n}</span>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: 20, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 8 }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>© 2025 Bandhan Chitti Services. Hubli–Dharwad, Karnataka.</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontStyle: "italic" }}>Built on Trust. Driven by Commitment.</div>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const pages = {
    "Home": <HomePage setPage={setPage} />,
    "About": <AboutPage />,
    "How It Works": <HowItWorksPage setPage={setPage} />,
    "Schemes": <SchemesPage setPage={setPage} />,
    "Join Us": <JoinUsPage />,
    "Contact": <ContactPage />,
    "Login": <LoginPage />,
  };
  return (
    <div style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden", background: BRAND.offWhite }}>
      <FontLink />
      <Navbar page={page} setPage={setPage} />
      <main style={{ width: "100%" }}>{pages[page] || <HomePage setPage={setPage} />}</main>
      <Footer setPage={setPage} />
      <ChatWidget />
    </div>
  );
}
```

---

## 👉 After pasting and saving run:
```
git add .
git commit -m "Perfect mobile fix"
git push