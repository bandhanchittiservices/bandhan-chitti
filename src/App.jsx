import { useState } from "react";
import LOGO_URL from "./assets/logo.png";

const BRAND = {
  navy: "#1B2D6B", navyDark: "#0F1D4A", navyLight: "#2A3F8F",
  gold: "#B8860B", goldLight: "#D4A017", goldPale: "#FBF5E0",
  green: "#1B5E3B", white: "#FFFFFF", offWhite: "#F8FAFD",
  gray100: "#F0F3F8", gray200: "#DDE3EF", gray400: "#9BA8C0",
  gray600: "#4A5568", gray800: "#1A202C",
};

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
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { name: "Home", icon: "🏠" },
    { name: "About", icon: "ℹ️" },
    { name: "How It Works", icon: "❓" },
    { name: "Schemes", icon: "💰" },
    { name: "Join Us", icon: "✅" },
    { name: "Contact", icon: "📞" },
    { name: "Login", icon: "🔐" },
  ];
  return (
    <>
      <nav style={{ background: BRAND.navy, position: "sticky", top: 0, zIndex: 100, width: "100%", boxShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64 }}>
          {/* Logo */}
          <div style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => { setPage("Home"); setMenuOpen(false); }}>
            <img src={LOGO_URL} alt="Bandhan Chitti" style={{ height: 44, objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1 }} />
          {/* Join Us button - always visible */}
          <button onClick={() => { setPage("Join Us"); setMenuOpen(false); }} style={{
            background: BRAND.goldLight, border: "none", color: BRAND.navyDark,
            fontSize: 13, fontWeight: 700, padding: "9px 16px", borderRadius: 8, marginRight: 12,
            cursor: "pointer",
          }}>Join Us</button>
          {/* Hamburger - three lines */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: menuOpen ? "rgba(255,255,255,0.1)" : "none",
            border: "none", padding: "8px 10px", borderRadius: 8,
            display: "flex", flexDirection: "column", gap: 5, cursor: "pointer",
          }}>
            <div style={{ width: 24, height: 2.5, background: BRAND.white, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5.5px)" : "none" }} />
            <div style={{ width: 24, height: 2.5, background: BRAND.white, borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 24, height: 2.5, background: BRAND.white, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5.5px)" : "none" }} />
          </button>
        </div>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${BRAND.navy}, ${BRAND.goldLight}, ${BRAND.green})` }} />
      </nav>

      {/* Full Screen Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: BRAND.navyDark, zIndex: 200,
          display: "flex", flexDirection: "column",
        }}>
          {/* Menu Header */}
          <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
            <img src={LOGO_URL} alt="Bandhan Chitti" style={{ height: 40, objectFit: "contain" }} />
            <button onClick={() => setMenuOpen(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: BRAND.white, fontSize: 22, width: 40, height: 40, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>

          {/* Menu Links */}
          <div style={{ flex: 1, padding: "24px 24px", overflowY: "auto" }}>
            {links.map((l, i) => (
              <button key={l.name} onClick={() => { setPage(l.name); setMenuOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 16,
                width: "100%", textAlign: "left",
                background: page === l.name ? "rgba(212,160,23,0.12)" : "none",
                border: "none",
                borderLeft: page === l.name ? `4px solid ${BRAND.goldLight}` : "4px solid transparent",
                color: page === l.name ? BRAND.goldLight : "rgba(255,255,255,0.85)",
                fontSize: 18, fontWeight: page === l.name ? 600 : 400,
                padding: "16px 20px", borderRadius: "0 12px 12px 0",
                marginBottom: 8, cursor: "pointer",
                transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 22, width: 32 }}>{l.icon}</span>
                {l.name}
              </button>
            ))}
          </div>

          {/* Menu Footer */}
          <div style={{ padding: "20px 24px", borderTop: `1px solid rgba(255,255,255,0.1)` }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textAlign: "center", marginBottom: 8 }}>Bandhan Chitti Services</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textAlign: "center", fontStyle: "italic" }}>Built on Trust. Driven by Commitment.</p>
          </div>
        </div>
      )}
    </>
  );
}

// ── Home Page ──────────────────────────────────────────────
function HomePage({ setPage }) {
  const stats = [
    { num: "16+", label: "Years" },
    { num: "500+", label: "Members" },
    { num: "40+", label: "Groups" },
    { num: "₹2Cr+", label: "Managed" },
  ];
  const features = [
    { icon: "🏦", title: "Trusted for 16+ Years", desc: "Proven track record in Hubli-Dharwad." },
    { icon: "🔨", title: "Transparent Auction", desc: "Fair monthly bidding for all members." },
    { icon: "⚡", title: "Quick Access to Funds", desc: "Faster than traditional bank loans." },
    { icon: "🤝", title: "Community-Based", desc: "Members save and grow together." },
  ];
  return (
    <div style={{ width: "100%" }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark} 0%, ${BRAND.navy} 55%, ${BRAND.navyLight} 100%)`, padding: "60px 20px 50px", textAlign: "center", width: "100%" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(212,160,23,0.15)", border: `1px solid rgba(212,160,23,0.3)`, color: BRAND.goldLight, fontSize: 10, letterSpacing: 2, padding: "6px 14px", borderRadius: 24, marginBottom: 20, fontWeight: 600 }}>
            🏆 HUBLI–DHARWAD'S MOST TRUSTED CHIT FUND
          </div>
          <h1 style={{ color: BRAND.white, fontSize: 36, lineHeight: 1.2, marginBottom: 16, fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>
            Grow Together,<br /><span style={{ color: BRAND.goldLight }}>Save Smarter</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>
            Karnataka's trusted chit fund — 16+ years of experience, serving 500+ members.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320, margin: "0 auto 20px" }}>
            <button onClick={() => setPage("Join Us")} style={{ background: BRAND.goldLight, border: "none", color: BRAND.navyDark, fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, padding: "15px 32px", borderRadius: 10, cursor: "pointer" }}>
              Join a Chitti Group →
            </button>
            <button onClick={() => setPage("How It Works")} style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.3)", color: BRAND.white, fontSize: 15, fontFamily: "'DM Sans', sans-serif", padding: "14px 32px", borderRadius: 10, cursor: "pointer" }}>
              How It Works
            </button>
          </div>
          <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ color: "#4ADE80", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif" }}>
            💬 Chat with us on WhatsApp
          </a>
        </div>
      </div>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BRAND.navy}, ${BRAND.goldLight}, ${BRAND.green})` }} />

      {/* Stats */}
      <div style={{ background: BRAND.white, padding: "28px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "16px 8px", borderRadius: 12, background: BRAND.offWhite, border: `1px solid ${BRAND.gray200}` }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: BRAND.navy, fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: BRAND.gray600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ background: BRAND.offWhite, padding: "44px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ color: BRAND.navy, fontSize: 26, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Why Choose Bandhan Chitti?</h2>
            <div style={{ width: 50, height: 3, background: BRAND.goldLight, margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: BRAND.white, borderRadius: 12, padding: "20px 16px", border: `1px solid ${BRAND.gray200}` }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{f.icon}</div>
                <h3 style={{ color: BRAND.navy, fontSize: 15, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>{f.title}</h3>
                <p style={{ color: BRAND.gray600, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schemes */}
      <div style={{ background: BRAND.white, padding: "44px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ color: BRAND.navy, fontSize: 26, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Active Chitti Schemes</h2>
            <div style={{ width: 50, height: 3, background: BRAND.goldLight, margin: "0 auto 10px" }} />
            <p style={{ color: BRAND.gray600, fontSize: 13 }}>Limited slots — join before they fill up</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SCHEMES.map((s) => {
              const isUpcoming = s.status === "upcoming";
              return (
                <div key={s.id} style={{ borderRadius: 14, overflow: "hidden", border: `2px solid ${isUpcoming ? BRAND.gray200 : BRAND.navy}` }}>
                  <div style={{ background: isUpcoming ? BRAND.gray100 : BRAND.navy, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: isUpcoming ? BRAND.gray600 : BRAND.white, fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                      <div style={{ color: isUpcoming ? BRAND.gray400 : "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 }}>EMI: {s.emi}/month</div>
                    </div>
                    <div style={{ background: isUpcoming ? BRAND.gray400 : BRAND.goldLight, color: isUpcoming ? BRAND.white : BRAND.navyDark, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{s.tag}</div>
                  </div>
                  <div style={{ padding: "16px 20px", background: BRAND.white }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 4 }}>
                      {[["Duration", s.duration], ["Group Size", "20 Members"]].map(([k, v]) => (
                        <div key={k} style={{ background: BRAND.offWhite, padding: "8px 10px", borderRadius: 8 }}>
                          <div style={{ color: BRAND.gray600, fontSize: 11 }}>{k}</div>
                          <div style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <SlotBar filled={s.filledSlots} total={s.totalSlots} status={s.status} />
                    <button onClick={() => !isUpcoming && setPage("Join Us")} style={{ width: "100%", marginTop: 14, background: isUpcoming ? BRAND.gray200 : BRAND.navy, border: "none", color: isUpcoming ? BRAND.gray600 : BRAND.goldLight, fontSize: 14, fontWeight: 700, padding: "12px", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
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
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ color: BRAND.white, fontSize: 24, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Ready to Start Your Chitti Journey?</h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginBottom: 24 }}>Join hundreds of members already saving smarter.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300, margin: "0 auto" }}>
          <button onClick={() => setPage("Join Us")} style={{ background: BRAND.goldLight, border: "none", color: BRAND.navyDark, fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Join Now →</button>
          <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#22C55E", color: BRAND.white, fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif" }}>💬 WhatsApp Us</a>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  const impact = [
    { num: "16+", label: "Years of Experience", desc: "Serving the community reliably" },
    { num: "500+", label: "Members Served", desc: "Hundreds of happy members" },
    { num: "40+", label: "Groups Completed", desc: "Strong track record" },
    { num: "₹2Cr+", label: "Chit Value Managed", desc: "Trusted with large amounts" },
  ];
  return (
    <div style={{ width: "100%" }}>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "50px 20px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 28, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>About Bandhan Chitti</h1>
        <div style={{ width: 50, height: 3, background: BRAND.goldLight, margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Built on Trust. Driven by Commitment.</p>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ background: BRAND.white, borderRadius: 14, padding: "24px 20px", border: `1px solid ${BRAND.gray200}`, marginBottom: 24 }}>
          <h2 style={{ color: BRAND.navy, fontSize: 22, marginBottom: 14, fontFamily: "'Playfair Display', serif" }}>Our Story</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 14, marginBottom: 12 }}>Bandhan Chitti Services is a trusted community-based chit fund in Hubli–Dharwad, Karnataka. With over <strong style={{ color: BRAND.navy }}>16 years of experience</strong>, we help individuals and families grow savings through a reliable, transparent chit system.</p>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 14, marginBottom: 12 }}>Our mission: a financial support network where members save together and grow financially.</p>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 14 }}>We have helped members access funds for <strong style={{ color: BRAND.navy }}>business, emergencies, education, and growth.</strong></p>
        </div>
        <h2 style={{ color: BRAND.navy, fontSize: 22, marginBottom: 8, textAlign: "center", fontFamily: "'Playfair Display', serif" }}>Our Impact</h2>
        <div style={{ width: 50, height: 3, background: BRAND.goldLight, margin: "0 auto 20px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
          {impact.map((item, i) => (
            <div key={i} style={{ background: BRAND.white, borderRadius: 12, padding: "20px 16px", textAlign: "center", border: `1px solid ${BRAND.gray200}` }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.navy, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>{item.num}</div>
              <div style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: BRAND.gray600, fontSize: 12 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: BRAND.offWhite, borderRadius: 14, padding: "24px 20px", border: `1px solid ${BRAND.gray200}`, marginBottom: 24 }}>
          <h2 style={{ color: BRAND.navy, fontSize: 20, marginBottom: 14, fontFamily: "'Playfair Display', serif" }}>What We Do</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 14, marginBottom: 14 }}>We organize structured chit fund groups where members contribute monthly. Each month, a transparent bidding process determines who receives the pooled fund.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Disciplined savings", "Transparent monthly auctions", "Quick access to funds", "Community financial support"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: BRAND.white, padding: "10px 14px", borderRadius: 8, border: `1px solid ${BRAND.gray200}` }}>
                <span style={{ color: BRAND.green, fontSize: 16 }}>✓</span>
                <span style={{ color: BRAND.gray600, fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, borderRadius: 14, padding: "24px 20px", marginBottom: 24 }}>
          <h2 style={{ color: BRAND.white, fontSize: 20, marginBottom: 12, fontFamily: "'Playfair Display', serif" }}>Our Vision</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, fontSize: 14, marginBottom: 16 }}>To modernize the chit fund system with digital technology:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Track payments online", "View auction results live", "Monitor balances anytime", "Secure transparent system"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", padding: "10px 14px", borderRadius: 8 }}>
                <span style={{ color: BRAND.goldLight }}>→</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: BRAND.goldPale, borderRadius: 14, padding: "24px 20px", border: `2px solid ${BRAND.goldLight}`, textAlign: "center" }}>
          <h2 style={{ color: BRAND.navy, fontSize: 20, marginBottom: 12, fontFamily: "'Playfair Display', serif" }}>Our Commitment</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 14, marginBottom: 12 }}>Financial growth should be accessible to everyone. We provide a secure, transparent, trustworthy platform.</p>
          <p style={{ color: BRAND.navy, fontSize: 15, fontWeight: 700, fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>"Built on Trust. Driven by Commitment."</p>
        </div>
      </div>
    </div>
  );
}

function HowItWorksPage({ setPage }) {
  const steps = [
    { num: "01", icon: "📋", title: "Join a Chitti Group", desc: "Choose ₹1,00,000 or ₹5,00,000 scheme and get verified." },
    { num: "02", icon: "💳", title: "Monthly Contribution", desc: "Pay ₹5,000/month for ₹1L or ₹25,000/month for ₹5L." },
    { num: "03", icon: "🔨", title: "Monthly Auction", desc: "Fair monthly bidding. Highest bidder wins the chit." },
    { num: "04", icon: "🏆", title: "Receive Funds", desc: "Winner gets money. Continues EMI but cannot bid again." },
    { num: "05", icon: "✅", title: "Cycle Completes", desc: "All 20 members receive chitti in 12–13 months." },
  ];
  return (
    <div style={{ width: "100%", background: BRAND.offWhite }}>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "50px 20px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 28, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>How Chitti Works</h1>
        <div style={{ width: 50, height: 3, background: BRAND.goldLight, margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Simple, transparent, community savings</p>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: BRAND.white, borderRadius: 12, padding: "18px 16px", border: `1px solid ${BRAND.gray200}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: BRAND.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: BRAND.goldLight, fontWeight: 700, fontSize: 13 }}>{s.num}</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <h3 style={{ color: BRAND.navy, fontSize: 16, fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                </div>
                <p style={{ color: BRAND.gray600, fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: BRAND.goldPale, border: `2px solid ${BRAND.goldLight}`, borderRadius: 14, padding: "22px 18px", marginBottom: 28 }}>
          <h3 style={{ color: BRAND.navy, fontSize: 18, marginBottom: 14, fontFamily: "'Playfair Display', serif" }}>📌 Real Example — ₹1,00,000 Chitti</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[["Total Members", "20 people"], ["Monthly EMI", "₹5,000 each"], ["Total Pool", "₹1,00,000/month"], ["Minimum Bid", "₹30,000 discount"], ["Winner Gets", "₹70,000 minimum"], ["Duration", "12–13 months"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", background: BRAND.white, padding: "9px 12px", borderRadius: 8 }}>
                <span style={{ color: BRAND.gray600, fontSize: 13 }}>{k}</span>
                <span style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setPage("Join Us")} style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          Ready to Join? Apply Now →
        </button>
      </div>
    </div>
  );
}

function SchemesPage({ setPage }) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "50px 20px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 28, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Our Chitti Schemes</h1>
        <div style={{ width: 50, height: 3, background: BRAND.goldLight, margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Limited slots — secure your spot today</p>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SCHEMES.map((s) => {
            const isUpcoming = s.status === "upcoming";
            return (
              <div key={s.id} style={{ borderRadius: 14, overflow: "hidden", border: `2px solid ${isUpcoming ? BRAND.gray200 : BRAND.navy}` }}>
                <div style={{ background: isUpcoming ? BRAND.gray100 : BRAND.navy, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: isUpcoming ? BRAND.gray600 : BRAND.white, fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                    <div style={{ color: isUpcoming ? BRAND.gray400 : "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 }}>Chitti Value</div>
                  </div>
                  <div style={{ background: isUpcoming ? BRAND.gray400 : BRAND.goldLight, color: isUpcoming ? BRAND.white : BRAND.navyDark, fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20 }}>{s.tag}</div>
                </div>
                <div style={{ padding: "18px 20px", background: BRAND.white }}>
                  {[["Monthly EMI", s.emi], ["Group Size", "20 Members"], ["Duration", s.duration], ["Auction", "Every Month"], ["Starting", s.startDate]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BRAND.gray100}` }}>
                      <span style={{ color: BRAND.gray600, fontSize: 13 }}>{k}</span>
                      <span style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                  <SlotBar filled={s.filledSlots} total={s.totalSlots} status={s.status} />
                  <button onClick={() => !isUpcoming && setPage("Join Us")} style={{ width: "100%", marginTop: 14, background: isUpcoming ? BRAND.gray200 : BRAND.navy, border: "none", color: isUpcoming ? BRAND.gray600 : BRAND.goldLight, fontSize: 14, fontWeight: 700, padding: "12px", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                    {isUpcoming ? "Coming Soon" : "Apply for this Scheme →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ background: BRAND.goldPale, border: `1px solid ${BRAND.goldLight}`, borderRadius: 10, padding: "16px 18px", marginTop: 20, display: "flex", gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</span>
          <p style={{ color: BRAND.gray600, fontSize: 13, lineHeight: 1.6, margin: 0 }}>Valid ID proof and references required. WhatsApp us for faster processing.</p>
        </div>
      </div>
    </div>
  );
}

function JoinUsPage() {
  const [form, setForm] = useState({ name: "", phone: "", occupation: "", scheme: "", city: "", reference: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = () => {
    if (!form.name || !form.phone || !form.scheme) { alert("Please fill required fields."); return; }
    setSubmitted(true);
  };
  const inp = (name) => ({
    width: "100%", padding: "13px 14px", borderRadius: 8, fontSize: 15,
    color: "#1A202C", background: "#FFFFFF", outline: "none", boxSizing: "border-box",
    border: `2px solid ${focused === name ? BRAND.navy : BRAND.gray200}`, transition: "border-color 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  });
  if (submitted) return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px", background: BRAND.offWhite }}>
      <div style={{ background: BRAND.white, borderRadius: 18, padding: "40px 24px", textAlign: "center", maxWidth: 440, width: "100%", border: `2px solid ${BRAND.goldLight}` }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
        <h2 style={{ color: BRAND.navy, fontSize: 22, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Application Submitted!</h2>
        <p style={{ color: BRAND.gray600, lineHeight: 1.75, marginBottom: 22, fontSize: 14 }}>Thank you <strong style={{ color: BRAND.navy }}>{form.name}</strong>! We received your application for <strong style={{ color: BRAND.navy }}>{form.scheme}</strong>. We'll contact you within 24 hours.</p>
        <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22C55E", color: BRAND.white, fontSize: 15, fontWeight: 700, padding: "12px 24px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif" }}>💬 WhatsApp Us</a>
      </div>
    </div>
  );
  return (
    <div style={{ width: "100%", background: BRAND.offWhite }}>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "50px 20px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 28, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Join Bandhan Chitti</h1>
        <div style={{ width: 50, height: 3, background: BRAND.goldLight, margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>We'll contact you within 24 hours</p>
      </div>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ background: BRAND.white, borderRadius: 18, padding: "28px 20px", border: `1px solid ${BRAND.gray200}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Full Name *", name: "name", placeholder: "Enter your full name", type: "text" },
              { label: "Phone Number *", name: "phone", placeholder: "+91 XXXXX XXXXX", type: "tel" },
              { label: "Occupation", name: "occupation", placeholder: "e.g. Shopkeeper, Teacher", type: "text" },
              { label: "City / Area", name: "city", placeholder: "e.g. Hubli, Dharwad", type: "text" },
              { label: "Who referred you?", name: "reference", placeholder: "Member name or how you found us", type: "text" },
            ].map((f) => (
              <div key={f.name}>
                <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{f.label}</label>
                <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handle} onFocus={() => setFocused(f.name)} onBlur={() => setFocused("")} style={inp(f.name)} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Select Scheme *</label>
              <select name="scheme" value={form.scheme} onChange={handle} onFocus={() => setFocused("scheme")} onBlur={() => setFocused("")} style={inp("scheme")}>
                <option value="">-- Choose a scheme --</option>
                <option value="₹1,00,000 Chitti (₹5,000/month)">₹1,00,000 — ₹5,000/month</option>
                <option value="₹5,00,000 Chitti (₹25,000/month)">₹5,00,000 — ₹25,000/month</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Message</label>
              <textarea name="message" placeholder="Any questions?" value={form.message} onChange={handle} rows={3} onFocus={() => setFocused("message")} onBlur={() => setFocused("")} style={{ ...inp("message"), resize: "vertical" }} />
            </div>
            <button onClick={submit} style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 16, fontWeight: 700, padding: "15px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Submit Application →
            </button>
          </div>
          <p style={{ textAlign: "center", color: BRAND.gray600, fontSize: 13, marginTop: 14, fontFamily: "'DM Sans', sans-serif" }}>
            Or <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ color: "#22C55E", fontWeight: 700 }}>WhatsApp us</a> directly
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "50px 20px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 28, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Contact Us</h1>
        <div style={{ width: 50, height: 3, background: BRAND.goldLight, margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>We're here to help anytime</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
          {[
            { icon: "💬", title: "WhatsApp", desc: "+91 79758 76235", sub: "Chat with us directly", btn: "Message Now", link: "https://wa.me/917975876235", btnBg: "#22C55E", border: "#22C55E" },
            { icon: "📞", title: "Phone", desc: "+91 79758 76235", sub: "Call during business hours", btn: "Call Now", link: "tel:+917975876235", btnBg: BRAND.navy, border: BRAND.navy },
            { icon: "✉️", title: "Email", desc: "bandhanchittiservices@gmail.com", sub: "We reply within 24 hours", btn: "Send Email", link: "mailto:bandhanchittiservices@gmail.com", btnBg: BRAND.goldLight, border: BRAND.goldLight },
            { icon: "📍", title: "Location", desc: "Hubli–Dharwad, Karnataka", sub: "Mon–Sat: 9AM – 7PM", btn: "View Maps", link: "https://maps.google.com/?q=Hubli,Karnataka", btnBg: BRAND.gray600, border: BRAND.gray200 },
          ].map((c, i) => (
            <a key={i} href={c.link} target="_blank" rel="noreferrer" style={{ background: BRAND.white, borderRadius: 14, padding: "20px", border: `2px solid ${c.border}`, display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: BRAND.offWhite, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: BRAND.navy, fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: 2 }}>{c.title}</div>
                <div style={{ color: BRAND.gray800, fontSize: 13, marginBottom: 2 }}>{c.desc}</div>
                <div style={{ color: BRAND.gray600, fontSize: 12 }}>{c.sub}</div>
              </div>
              <div style={{ background: c.btnBg, color: BRAND.white, fontSize: 12, fontWeight: 700, padding: "8px 14px", borderRadius: 8, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>{c.btn}</div>
            </a>
          ))}
        </div>
        <div style={{ background: BRAND.navy, borderRadius: 12, padding: "20px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>🛡️</div>
          <div>
            <div style={{ color: BRAND.white, fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>Trusted for 16+ Years</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>500+ members • 40+ groups • ₹2Cr+ managed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  return (
    <div style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.offWhite, padding: "24px 20px" }}>
      <div style={{ background: BRAND.white, borderRadius: 18, padding: "36px 24px", maxWidth: 380, width: "100%", border: `1px solid ${BRAND.gray200}` }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img src={LOGO_URL} alt="Bandhan Chitti" style={{ height: 44, marginBottom: 12, objectFit: "contain" }} />
          <h2 style={{ color: BRAND.navy, fontSize: 20, marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>Member Login</h2>
          <p style={{ color: BRAND.gray600, fontSize: 13 }}>Access your chitti dashboard</p>
        </div>
        {step === 1 ? (
          <>
            <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Mobile Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" type="tel" style={{ width: "100%", padding: "13px 14px", borderRadius: 8, border: `2px solid ${BRAND.gray200}`, fontSize: 15, color: BRAND.gray800, background: BRAND.white, outline: "none", boxSizing: "border-box", marginBottom: 16 }} />
            <button onClick={() => setStep(2)} style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "13px", borderRadius: 10, cursor: "pointer" }}>Send OTP →</button>
          </>
        ) : (
          <>
            <p style={{ color: BRAND.gray600, fontSize: 13, marginBottom: 12 }}>OTP sent to <strong>{phone}</strong></p>
            <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Enter OTP</label>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit OTP" type="number" style={{ width: "100%", padding: "13px 14px", borderRadius: 8, border: `2px solid ${BRAND.gray200}`, fontSize: 15, color: BRAND.gray800, background: BRAND.white, outline: "none", boxSizing: "border-box", marginBottom: 16 }} />
            <button style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "13px", borderRadius: 10, cursor: "pointer", marginBottom: 10 }}>Login →</button>
            <button onClick={() => setStep(1)} style={{ width: "100%", background: "none", border: "none", color: BRAND.gray600, fontSize: 13, cursor: "pointer" }}>← Change Number</button>
          </>
        )}
        <div style={{ marginTop: 18, padding: "12px", background: BRAND.goldPale, borderRadius: 8, textAlign: "center", border: `1px solid ${BRAND.goldLight}` }}>
          <p style={{ color: BRAND.gray600, fontSize: 12, margin: 0 }}>Not a member? <a href="#" style={{ color: BRAND.navy, fontWeight: 700 }}>Apply to Join →</a></p>
        </div>
      </div>
    </div>
  );
}

function ChatWidget() {
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
          system: "You are a helpful assistant for Bandhan Chitti Services, a chit fund in Hubli-Dharwad with 16+ years experience.",
          messages: newMsgs }),
      });
      const data = await res.json();
      setMessages([...newMsgs, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "Sorry, try again." }]);
    } catch { setMessages([...newMsgs, { role: "assistant", content: "WhatsApp us at +91 79758 76235" }]); }
    setLoading(false);
  };
  return (
    <div style={{ position: "fixed", bottom: 20, right: 16, zIndex: 300 }}>
      {open && (
        <div style={{ width: "min(300px, calc(100vw - 32px))", height: 400, background: BRAND.white, borderRadius: 16, boxShadow: "0 8px 40px rgba(27,45,107,0.22)", border: `1px solid ${BRAND.gray200}`, display: "flex", flexDirection: "column", marginBottom: 12, overflow: "hidden" }}>
          <div style={{ background: BRAND.navy, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <img src={LOGO_URL} alt="" style={{ height: 26, objectFit: "contain" }} />
            <div>
              <div style={{ color: BRAND.white, fontSize: 13, fontWeight: 700 }}>Bandhan Chitti</div>
              <div style={{ color: BRAND.goldLight, fontSize: 10 }}>● Online</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 20, cursor: "pointer" }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "82%", padding: "9px 12px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? BRAND.navy : BRAND.offWhite, color: m.role === "user" ? BRAND.white : BRAND.navy, fontSize: 13, lineHeight: 1.55 }}>{m.content}</div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", gap: 4, padding: "9px 12px", background: BRAND.offWhite, borderRadius: "14px 14px 14px 4px", width: "fit-content" }}>
              {[0,1,2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.goldLight, animation: "bounce 1.2s infinite", animationDelay: `${j*0.2}s` }} />)}
            </div>}
          </div>
          <div style={{ padding: "10px 12px", borderTop: `1px solid ${BRAND.gray200}`, display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${BRAND.gray200}`, fontSize: 13, outline: "none", color: BRAND.navy, background: BRAND.white }} />
            <button onClick={send} style={{ background: BRAND.navy, border: "none", color: BRAND.goldLight, borderRadius: 8, width: 36, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>➤</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{ width: 52, height: 52, borderRadius: "50%", background: BRAND.navy, border: `3px solid ${BRAND.goldLight}`, color: BRAND.goldLight, fontSize: 20, boxShadow: "0 4px 20px rgba(27,45,107,0.35)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: BRAND.navyDark, padding: "36px 20px 24px", width: "100%" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 28 }}>
          <div>
            <img src={LOGO_URL} alt="Bandhan Chitti" style={{ height: 40, marginBottom: 12, objectFit: "contain" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 12 }}>Trusted chit fund in Hubli–Dharwad. Serving members since 2009.</p>
            <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ color: "#4ADE80", fontSize: 13, display: "block", marginBottom: 6 }}>💬 +91 79758 76235</a>
            <a href="mailto:bandhanchittiservices@gmail.com" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, display: "block" }}>✉️ bandhanchittiservices@gmail.com</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ color: BRAND.goldLight, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 12 }}>QUICK LINKS</div>
              {["Home", "About", "How It Works", "Schemes", "Join Us", "Contact"].map(l => (
                <div key={l} style={{ marginBottom: 8 }}>
                  <button onClick={() => setPage(l)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 13, padding: 0, cursor: "pointer" }}>{l}</button>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: BRAND.goldLight, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 12 }}>OUR IMPACT</div>
              {[["16+", "Years"], ["500+", "Members"], ["40+", "Groups"], ["₹2Cr+", "Managed"]].map(([n, l]) => (
                <div key={l} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                  <span style={{ color: BRAND.goldLight, fontSize: 14, fontWeight: 700 }}>{n}</span>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: 18, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>© 2025 Bandhan Chitti Services. Hubli–Dharwad, Karnataka.</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontStyle: "italic" }}>Built on Trust. Driven by Commitment.</div>
        </div>
      </div>
    </footer>
  );
}

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
    <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden", background: BRAND.offWhite, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
        #root { width: 100%; overflow-x: hidden; }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        a { text-decoration: none; }
        button { cursor: pointer; }
        input, textarea, select { font-family: 'DM Sans', sans-serif !important; }
        input::placeholder, textarea::placeholder { color: #9BA8C0; }
      `}</style>
      <Navbar page={page} setPage={setPage} />
      <main style={{ width: "100%" }}>{pages[page] || <HomePage setPage={setPage} />}</main>
      <Footer setPage={setPage} />
      <ChatWidget />
    </div>
  );
}
