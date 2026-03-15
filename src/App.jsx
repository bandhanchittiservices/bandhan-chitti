import { useState } from "react";
import LOGO_URL from "./assets/logo.png";

const BRAND = {
  navy: "#1B2D6B", navyDark: "#0F1D4A", navyLight: "#2A3F8F",
  gold: "#B8860B", goldLight: "#D4A017", goldPale: "#FBF5E0",
  green: "#1B5E3B", white: "#FFFFFF", offWhite: "#F8FAFD",
  gray100: "#F0F3F8", gray200: "#DDE3EF", gray400: "#9BA8C0",
  gray600: "#4A5568", gray800: "#1A202C",
};

const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; }
    h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }
    @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    .page { animation: fadeIn 0.4s ease; }
    input, textarea, select {
      font-family: 'DM Sans', sans-serif !important;
      background: #FFFFFF !important;
      color: #1A202C !important;
    }
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
    <div style={{ marginTop: 16 }}>
      <div style={{ height: 8, background: BRAND.gray200, borderRadius: 8 }} />
      <div style={{ marginTop: 8, fontSize: 12, color: BRAND.gold, fontWeight: 600 }}>🔔 Registrations opening soon</div>
    </div>
  );
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: BRAND.gray600 }}>{filled} of {total} members joined</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{remaining} slots left</span>
      </div>
      <div style={{ height: 8, background: BRAND.gray200, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 8 }} />
      </div>
      {remaining <= 5 && remaining > 0 && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#DC2626", fontWeight: 600, animation: "pulse 2s infinite" }}>
          🔥 Only {remaining} slots remaining!
        </div>
      )}
    </div>
  );
}

function Navbar({ page, setPage }) {
  const links = ["Home", "About", "How It Works", "Schemes", "Join Us", "Contact"];
  return (
    <nav style={{ background: BRAND.navy, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 24px rgba(0,0,0,0.15)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => setPage("Home")}>
          <img src={LOGO_URL} alt="Bandhan Chitti Services" style={{ height: 48, width: "auto", objectFit: "contain" }} />
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {links.map(l => (
            <button key={l} onClick={() => setPage(l)} style={{
              background: "none", border: "none",
              color: page === l ? BRAND.goldLight : "rgba(255,255,255,0.82)",
              fontSize: 13.5, fontWeight: page === l ? 600 : 400,
              padding: "8px 12px", borderRadius: 6,
              borderBottom: page === l ? `2px solid ${BRAND.goldLight}` : "2px solid transparent",
            }}>{l}</button>
          ))}
          <button onClick={() => setPage("Login")} style={{
            background: BRAND.goldLight, border: "none", color: BRAND.navyDark,
            fontSize: 13.5, fontWeight: 700, padding: "9px 20px", borderRadius: 8, marginLeft: 10,
          }}>Member Login</button>
        </div>
      </div>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${BRAND.navy}, ${BRAND.goldLight}, ${BRAND.green})` }} />
    </nav>
  );
}

function HomePage({ setPage }) {
  const stats = [
    { num: "16+", label: "Years of Experience" },
    { num: "500+", label: "Members Served" },
    { num: "40+", label: "Chit Groups Completed" },
    { num: "₹2Cr+", label: "Chit Value Managed" },
  ];
  const features = [
    { icon: "🏦", title: "Trusted for 16+ Years", desc: "A proven track record of running successful chit groups in Hubli-Dharwad." },
    { icon: "🔨", title: "Transparent Auction", desc: "Every monthly auction is conducted openly and fairly among all group members." },
    { icon: "⚡", title: "Quick Access to Funds", desc: "Receive funds faster than traditional bank loans — no heavy documentation." },
    { icon: "🤝", title: "Community-Based System", desc: "Members save together and support each other's financial growth." },
  ];
  return (
    <div className="page">
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark} 0%, ${BRAND.navy} 55%, ${BRAND.navyLight} 100%)`, padding: "90px 24px 70px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,160,23,0.15)", border: `1px solid rgba(212,160,23,0.3)`, color: BRAND.goldLight, fontSize: 11, letterSpacing: 2, padding: "7px 20px", borderRadius: 24, marginBottom: 28, fontWeight: 600 }}>
            🏆 HUBLI–DHARWAD'S MOST TRUSTED CHIT FUND
          </div>
          <h1 style={{ color: BRAND.white, fontSize: 48, lineHeight: 1.15, marginBottom: 22, fontWeight: 800 }}>
            Grow Together,<br /><span style={{ color: BRAND.goldLight }}>Save Smarter</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 17, lineHeight: 1.75, marginBottom: 38, maxWidth: 580, margin: "0 auto 38px" }}>
            Join Bandhan Chitti Services — Karnataka's trusted community chit fund with 16+ years of experience, serving 500+ members across Hubli-Dharwad.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Join Us")} style={{ background: BRAND.goldLight, border: "none", color: BRAND.navyDark, fontSize: 15, fontWeight: 700, padding: "15px 36px", borderRadius: 10 }}>Join a Chitti Group →</button>
            <button onClick={() => setPage("How It Works")} style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.25)", color: BRAND.white, fontSize: 15, fontWeight: 500, padding: "15px 36px", borderRadius: 10 }}>How It Works</button>
          </div>
          <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, color: "#4ADE80", fontSize: 14 }}>💬 Chat with us on WhatsApp</a>
        </div>
      </div>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BRAND.navy}, ${BRAND.goldLight}, ${BRAND.green})` }} />
      <div style={{ background: BRAND.white, padding: "44px 24px", borderBottom: `1px solid ${BRAND.gray200}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "24px 16px", borderRadius: 12, background: BRAND.offWhite, border: `1px solid ${BRAND.gray200}` }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: BRAND.navy }}>{s.num}</div>
              <div style={{ fontSize: 13, color: BRAND.gray600, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: BRAND.offWhite, padding: "70px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ color: BRAND.navy, fontSize: 32, marginBottom: 14 }}>Why Choose Bandhan Chitti?</h2>
            <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: BRAND.white, borderRadius: 14, padding: "30px 26px", border: `1px solid ${BRAND.gray200}`, display: "flex", gap: 20, boxShadow: "0 2px 16px rgba(27,45,107,0.06)" }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h3 style={{ color: BRAND.navy, fontSize: 17, marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: BRAND.white, padding: "70px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ color: BRAND.navy, fontSize: 32, marginBottom: 14 }}>Active Chitti Schemes</h2>
            <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 16px" }} />
            <p style={{ color: BRAND.gray600, fontSize: 15 }}>Limited slots available — join before they fill up</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {SCHEMES.map((s) => {
              const isUpcoming = s.status === "upcoming";
              return (
                <div key={s.id} style={{ borderRadius: 16, overflow: "hidden", border: `2px solid ${isUpcoming ? BRAND.gray200 : BRAND.navy}`, boxShadow: "0 4px 24px rgba(27,45,107,0.10)" }}>
                  <div style={{ background: isUpcoming ? BRAND.gray100 : BRAND.navy, padding: "20px 22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: isUpcoming ? BRAND.gray600 : BRAND.white }}>{s.value}</div>
                      <div style={{ background: isUpcoming ? BRAND.gray400 : BRAND.goldLight, color: isUpcoming ? BRAND.white : BRAND.navyDark, fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20 }}>{s.tag}</div>
                    </div>
                    <div style={{ color: isUpcoming ? BRAND.gray400 : "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 }}>Monthly EMI: {s.emi}</div>
                  </div>
                  <div style={{ padding: "20px 22px", background: BRAND.white }}>
                    <SlotBar filled={s.filledSlots} total={s.totalSlots} status={s.status} />
                    <button onClick={() => !isUpcoming && setPage("Join Us")} style={{ width: "100%", marginTop: 18, background: isUpcoming ? BRAND.gray200 : BRAND.navy, border: "none", color: isUpcoming ? BRAND.gray600 : BRAND.goldLight, fontSize: 14, fontWeight: 700, padding: "12px", borderRadius: 8 }}>
                      {isUpcoming ? "Coming Soon" : "Apply Now →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "60px 24px", textAlign: "center" }}>
        <h2 style={{ color: BRAND.white, fontSize: 30, marginBottom: 14 }}>Ready to Start Your Chitti Journey?</h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 32 }}>Join hundreds of members already saving smarter with Bandhan Chitti Services.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("Join Us")} style={{ background: BRAND.goldLight, border: "none", color: BRAND.navyDark, fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 10 }}>Join Now →</button>
          <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22C55E", color: BRAND.white, fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 10 }}>💬 WhatsApp Us</a>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  const impact = [
    { num: "16+", label: "Years of Experience", desc: "Serving the community with a reliable chit fund system" },
    { num: "500+", label: "Members Served", desc: "Hundreds of members have participated in our chit groups" },
    { num: "40+", label: "Chit Groups Completed", desc: "Multiple chit cycles conducted with strong participation" },
    { num: "₹2Cr+", label: "Total Chit Value Managed", desc: "Total value of chit funds managed across various groups" },
  ];
  const whyUs = [
    "Trusted local network built over 16+ years",
    "Transparent bidding process",
    "Faster access to funds compared to traditional loans",
    "Community-driven savings system",
    "Reliable and structured financial participation",
  ];
  return (
    <div className="page">
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 38, marginBottom: 14 }}>About Bandhan Chitti Services</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 16px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>Built on Trust. Driven by Commitment. — Serving Hubli–Dharwad for over 16 years</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ background: BRAND.white, borderRadius: 16, padding: "40px", border: `1px solid ${BRAND.gray200}`, marginBottom: 40, boxShadow: "0 2px 16px rgba(27,45,107,0.06)" }}>
          <h2 style={{ color: BRAND.navy, fontSize: 28, marginBottom: 20 }}>Our Story</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15, marginBottom: 16 }}>Bandhan Chitti Services is a trusted community-based chit fund platform operating in Hubli–Dharwad, Karnataka. With over <strong style={{ color: BRAND.navy }}>16 years of experience</strong>, we have built a strong reputation for helping individuals and families grow their savings and access funds through a reliable and transparent chit system.</p>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15, marginBottom: 16 }}>Our mission is simple: to create a financial support network where members save together and help each other grow financially.</p>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15 }}>Over the years, Bandhan Chitti Services has helped many members access funds for <strong style={{ color: BRAND.navy }}>business needs, personal emergencies, education, and financial growth</strong> — all through a system built on trust and discipline.</p>
        </div>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: BRAND.navy, fontSize: 28, marginBottom: 8, textAlign: "center" }}>Our Impact</h2>
          <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 32px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {impact.map((item, i) => (
              <div key={i} style={{ background: BRAND.white, borderRadius: 14, padding: "28px 20px", textAlign: "center", border: `1px solid ${BRAND.gray200}`, boxShadow: "0 2px 12px rgba(27,45,107,0.06)" }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: BRAND.navy, marginBottom: 8 }}>{item.num}</div>
                <div style={{ color: BRAND.navy, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{item.label}</div>
                <div style={{ color: BRAND.gray600, fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: BRAND.offWhite, borderRadius: 16, padding: "40px", border: `1px solid ${BRAND.gray200}`, marginBottom: 40 }}>
          <h2 style={{ color: BRAND.navy, fontSize: 28, marginBottom: 20 }}>What We Do</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15, marginBottom: 20 }}>Bandhan Chitti Services organizes structured chit fund groups where members contribute a fixed monthly amount. Each month, members participate in a transparent bidding process, where one member receives the pooled fund based on the bid amount.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {["Disciplined savings for members", "Transparent monthly auction system", "Quick access to funds without complex banking procedures", "Community-based financial support"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: BRAND.white, padding: "14px 16px", borderRadius: 10, border: `1px solid ${BRAND.gray200}` }}>
                <span style={{ color: BRAND.green, fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: BRAND.white, borderRadius: 16, padding: "40px", border: `1px solid ${BRAND.gray200}`, marginBottom: 40 }}>
          <h2 style={{ color: BRAND.navy, fontSize: 28, marginBottom: 24 }}>Why Choose Bandhan Chitti Services</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: BRAND.offWhite, borderRadius: 10, border: `1px solid ${BRAND.gray200}` }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: BRAND.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: BRAND.goldLight, fontSize: 13, fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ color: BRAND.gray800, fontSize: 15 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: BRAND.navy, fontSize: 28, marginBottom: 8, textAlign: "center" }}>Why Chit Fund?</h2>
          <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 32px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { title: "Better than Loans", icon: "🏦", desc: "No complicated bank procedures or heavy documentation required." },
              { title: "Better than FD", icon: "📈", desc: "Instead of locking money for years, access funds when you need them." },
              { title: "Better than SIP", icon: "💹", desc: "SIPs are long-term — chit funds provide liquidity for immediate needs." },
            ].map((item, i) => (
              <div key={i} style={{ background: BRAND.white, borderRadius: 14, padding: "28px 22px", border: `2px solid ${BRAND.gray200}`, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ color: BRAND.navy, fontSize: 17, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, borderRadius: 16, padding: "40px", marginBottom: 40 }}>
          <h2 style={{ color: BRAND.white, fontSize: 28, marginBottom: 16 }}>Our Vision</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, fontSize: 15, marginBottom: 24 }}>Our vision is to modernize the traditional chit fund system by introducing digital technology and transparency. In the future, members will be able to:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            {["Track their payments online", "View auction results in real time", "Monitor their balances", "Participate in a more transparent and secure system"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: 10 }}>
                <span style={{ color: BRAND.goldLight, fontSize: 14 }}>→</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: BRAND.goldPale, borderRadius: 16, padding: "40px", border: `2px solid ${BRAND.goldLight}`, textAlign: "center" }}>
          <h2 style={{ color: BRAND.navy, fontSize: 28, marginBottom: 16 }}>Our Commitment</h2>
          <p style={{ color: BRAND.gray600, lineHeight: 1.85, fontSize: 15, maxWidth: 700, margin: "0 auto 16px" }}>At Bandhan Chitti Services, we believe that financial growth should be accessible to everyone. Our commitment is to provide a secure, transparent, and trustworthy platform where members can save regularly and access funds when they need them most.</p>
          <p style={{ color: BRAND.navy, fontSize: 17, fontWeight: 700, fontStyle: "italic" }}>"Bandhan Chitti Services – Built on Trust. Driven by Commitment."</p>
        </div>
      </div>
    </div>
  );
}

function HowItWorksPage({ setPage }) {
  const steps = [
    { num: "01", icon: "📋", title: "Join a Chitti Group", desc: "Members join a chit group with a fixed monthly contribution. Choose between our ₹1,00,000 or ₹5,00,000 schemes based on your financial goals." },
    { num: "02", icon: "💳", title: "Monthly Contribution", desc: "Each member pays their monthly installment as per the chit value. ₹5,000/month for the ₹1L scheme or ₹25,000/month for the ₹5L scheme." },
    { num: "03", icon: "🔨", title: "Transparent Monthly Auction", desc: "Every month a transparent bidding process is conducted among members. The member who bids the highest discount wins the pooled chit amount." },
    { num: "04", icon: "🏆", title: "Receive the Chitti Amount", desc: "The winning member receives the chit amount after the bid discount. They continue paying monthly EMI but cannot bid again in that group." },
    { num: "05", icon: "✅", title: "Cycle Completes", desc: "The process continues until all 20 members have received their chitti. The entire cycle completes in 12–13 months." },
  ];
  const comparison = [
    { feature: "Documentation Required", chit: "Minimal", loan: "Heavy", fd: "Moderate" },
    { feature: "Access to Funds", chit: "Monthly via Auction", loan: "After Approval", fd: "After Lock-in" },
    { feature: "Interest Charges", chit: "None", loan: "High", fd: "N/A" },
    { feature: "Community Support", chit: "✓ Yes", loan: "✗ No", fd: "✗ No" },
    { feature: "Liquidity", chit: "High", loan: "N/A", fd: "Low" },
  ];
  return (
    <div className="page" style={{ background: BRAND.offWhite, minHeight: "100vh" }}>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 38, marginBottom: 14 }}>How Chitti Works</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 16px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>Simple, transparent, and community-driven savings</p>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 50 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: BRAND.white, borderRadius: 14, padding: "26px 28px", border: `1px solid ${BRAND.gray200}`, display: "flex", gap: 22, alignItems: "flex-start", boxShadow: "0 2px 12px rgba(27,45,107,0.05)" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: BRAND.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: BRAND.goldLight, fontWeight: 700, fontSize: 16 }}>{s.num}</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <h3 style={{ color: BRAND.navy, fontSize: 19 }}>{s.title}</h3>
                </div>
                <p style={{ color: BRAND.gray600, lineHeight: 1.7, fontSize: 14 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: BRAND.goldPale, border: `2px solid ${BRAND.goldLight}`, borderRadius: 16, padding: "32px", marginBottom: 50 }}>
          <h3 style={{ color: BRAND.navy, fontSize: 22, marginBottom: 20 }}>📌 Real Example — ₹1,00,000 Chitti</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            {[["Total Members", "20 people"], ["Monthly EMI", "₹5,000 each"], ["Total Pool/Month", "₹1,00,000"], ["Minimum Bid", "₹30,000 discount"], ["Winner Gets", "₹70,000 minimum"], ["Duration", "12–13 months"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", background: BRAND.white, padding: "11px 16px", borderRadius: 8 }}>
                <span style={{ color: BRAND.gray600, fontSize: 13 }}>{k}</span>
                <span style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: BRAND.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${BRAND.gray200}`, marginBottom: 40 }}>
          <div style={{ background: BRAND.navy, padding: "20px 28px" }}>
            <h3 style={{ color: BRAND.white, fontSize: 20 }}>Chit Fund vs Loan vs FD</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: BRAND.offWhite }}>
                <th style={{ padding: "14px 20px", textAlign: "left", color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>Feature</th>
                <th style={{ padding: "14px 20px", textAlign: "center", color: BRAND.green, fontSize: 13, fontWeight: 700 }}>Chit Fund ✓</th>
                <th style={{ padding: "14px 20px", textAlign: "center", color: BRAND.gray600, fontSize: 13, fontWeight: 700 }}>Bank Loan</th>
                <th style={{ padding: "14px 20px", textAlign: "center", color: BRAND.gray600, fontSize: 13, fontWeight: 700 }}>FD / SIP</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${BRAND.gray200}`, background: i % 2 === 0 ? BRAND.white : BRAND.offWhite }}>
                  <td style={{ padding: "13px 20px", color: BRAND.gray800, fontSize: 13 }}>{row.feature}</td>
                  <td style={{ padding: "13px 20px", textAlign: "center", color: BRAND.green, fontSize: 13, fontWeight: 600 }}>{row.chit}</td>
                  <td style={{ padding: "13px 20px", textAlign: "center", color: BRAND.gray600, fontSize: 13 }}>{row.loan}</td>
                  <td style={{ padding: "13px 20px", textAlign: "center", color: BRAND.gray600, fontSize: 13 }}>{row.fd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("Join Us")} style={{ background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "15px 40px", borderRadius: 10 }}>Ready to Join? Apply Now →</button>
        </div>
      </div>
    </div>
  );
}

function SchemesPage({ setPage }) {
  return (
    <div className="page">
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 38, marginBottom: 14 }}>Our Chitti Schemes</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 16px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>Limited slots available — secure your spot today</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {SCHEMES.map((s) => {
            const isUpcoming = s.status === "upcoming";
            return (
              <div key={s.id} style={{ borderRadius: 16, overflow: "hidden", border: `2px solid ${isUpcoming ? BRAND.gray200 : BRAND.navy}`, boxShadow: "0 6px 30px rgba(27,45,107,0.10)" }}>
                <div style={{ background: isUpcoming ? BRAND.gray100 : BRAND.navy, padding: "22px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 700, color: isUpcoming ? BRAND.gray600 : BRAND.white }}>{s.value}</div>
                      <div style={{ color: isUpcoming ? BRAND.gray400 : "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 3 }}>Chitti Value</div>
                    </div>
                    <div style={{ background: isUpcoming ? BRAND.gray400 : BRAND.goldLight, color: isUpcoming ? BRAND.white : BRAND.navyDark, fontSize: 11, fontWeight: 700, padding: "5px 13px", borderRadius: 20 }}>{s.tag}</div>
                  </div>
                </div>
                <div style={{ padding: "24px", background: BRAND.white }}>
                  {[["Monthly EMI", s.emi], ["Group Size", "20 Members"], ["Duration", s.duration], ["Auction", "Every Month"], ["Starting", s.startDate]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${BRAND.gray100}` }}>
                      <span style={{ color: BRAND.gray600, fontSize: 13 }}>{k}</span>
                      <span style={{ color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                  <SlotBar filled={s.filledSlots} total={s.totalSlots} status={s.status} />
                  <button onClick={() => !isUpcoming && setPage("Join Us")} style={{ width: "100%", marginTop: 20, background: isUpcoming ? BRAND.gray200 : BRAND.navy, border: "none", color: isUpcoming ? BRAND.gray600 : BRAND.goldLight, fontSize: 14, fontWeight: 700, padding: "13px", borderRadius: 8 }}>
                    {isUpcoming ? "Coming Soon" : "Apply for this Scheme →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ background: BRAND.goldPale, border: `1px solid ${BRAND.goldLight}`, borderRadius: 12, padding: "20px 24px", marginTop: 36, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 22 }}>ℹ️</span>
          <p style={{ color: BRAND.gray600, fontSize: 13, lineHeight: 1.6, margin: 0 }}>All members must submit valid ID proof and references before joining. Slots are limited and filled on a first-come, first-served basis. Contact us on WhatsApp for faster processing.</p>
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
    if (!form.name || !form.phone || !form.scheme) { alert("Please fill all required fields."); return; }
    setSubmitted(true);
  };
  const inputStyle = (name) => ({
    width: "100%", padding: "12px 16px", borderRadius: 8, fontSize: 15,
    color: "#1A202C", background: "#FFFFFF", outline: "none", boxSizing: "border-box",
    border: `2px solid ${focused === name ? BRAND.navy : BRAND.gray200}`, transition: "border-color 0.2s",
  });
  if (submitted) return (
    <div className="page" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: BRAND.offWhite }}>
      <div style={{ background: BRAND.white, borderRadius: 20, padding: "52px 44px", textAlign: "center", maxWidth: 500, border: `2px solid ${BRAND.goldLight}`, boxShadow: "0 8px 40px rgba(27,45,107,0.12)" }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
        <h2 style={{ color: BRAND.navy, fontSize: 26, marginBottom: 14 }}>Application Submitted!</h2>
        <p style={{ color: BRAND.gray600, lineHeight: 1.75, marginBottom: 28 }}>Thank you <strong style={{ color: BRAND.navy }}>{form.name}</strong>! We have received your application for the <strong style={{ color: BRAND.navy }}>{form.scheme}</strong> scheme. Our team will contact you within <strong>24 hours</strong>.</p>
        <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22C55E", color: BRAND.white, fontSize: 15, fontWeight: 700, padding: "13px 28px", borderRadius: 10 }}>💬 Message us on WhatsApp</a>
      </div>
    </div>
  );
  return (
    <div className="page" style={{ background: BRAND.offWhite, minHeight: "100vh" }}>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 36, marginBottom: 14 }}>Join Bandhan Chitti</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 16px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>Fill the form below — our team will get back to you within 24 hours</p>
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "50px 24px" }}>
        <div style={{ background: BRAND.white, borderRadius: 20, padding: "40px", boxShadow: "0 4px 30px rgba(27,45,107,0.09)", border: `1px solid ${BRAND.gray200}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Full Name *", name: "name", placeholder: "Enter your full name", type: "text" },
              { label: "Phone Number *", name: "phone", placeholder: "+91 XXXXX XXXXX", type: "tel" },
              { label: "Occupation", name: "occupation", placeholder: "e.g. Shopkeeper, Teacher, Business Owner", type: "text" },
              { label: "City / Area", name: "city", placeholder: "e.g. Hubli, Dharwad", type: "text" },
              { label: "Reference — Who referred you?", name: "reference", placeholder: "Name of existing member or how you heard about us", type: "text" },
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
              <textarea name="message" placeholder="Any questions or additional information..." value={form.message} onChange={handle} rows={4} onFocus={() => setFocused("message")} onBlur={() => setFocused("")} style={{ ...inputStyle("message"), resize: "vertical" }} />
            </div>
            <button onClick={submit} style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 16, fontWeight: 700, padding: "15px", borderRadius: 10 }}>Submit Application →</button>
          </div>
          <p style={{ textAlign: "center", color: BRAND.gray600, fontSize: 13, marginTop: 20 }}>
            Or reach us on <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ color: "#22C55E", fontWeight: 700 }}>WhatsApp</a> or email <a href="mailto:bandhanchittiservices@gmail.com" style={{ color: BRAND.navy, fontWeight: 700 }}>bandhanchittiservices@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page">
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: BRAND.white, fontSize: 38, marginBottom: 14 }}>Contact Us</h1>
        <div style={{ width: 56, height: 3, background: BRAND.goldLight, margin: "0 auto 16px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>We're here to help. Reach us anytime.</p>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
          <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ background: BRAND.white, borderRadius: 16, padding: "32px 28px", border: `2px solid #22C55E`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>💬</div>
            <h3 style={{ color: BRAND.navy, fontSize: 18 }}>WhatsApp</h3>
            <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.5 }}>+91 79758 76235<br />Chat with us directly</p>
            <div style={{ background: "#22C55E", color: BRAND.white, fontSize: 13, fontWeight: 700, padding: "9px 22px", borderRadius: 8 }}>Message Now</div>
          </a>
          <a href="tel:+917975876235" style={{ background: BRAND.white, borderRadius: 16, padding: "32px 28px", border: `2px solid ${BRAND.navy}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: BRAND.offWhite, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>📞</div>
            <h3 style={{ color: BRAND.navy, fontSize: 18 }}>Phone</h3>
            <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.5 }}>+91 79758 76235<br />Call us during business hours</p>
            <div style={{ background: BRAND.navy, color: BRAND.goldLight, fontSize: 13, fontWeight: 700, padding: "9px 22px", borderRadius: 8 }}>Call Now</div>
          </a>
          <a href="mailto:bandhanchittiservices@gmail.com" style={{ background: BRAND.white, borderRadius: 16, padding: "32px 28px", border: `2px solid ${BRAND.goldLight}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: BRAND.goldPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>✉️</div>
            <h3 style={{ color: BRAND.navy, fontSize: 18 }}>Email</h3>
            <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.5 }}>bandhanchittiservices@gmail.com<br />We reply within 24 hours</p>
            <div style={{ background: BRAND.goldLight, color: BRAND.navyDark, fontSize: 13, fontWeight: 700, padding: "9px 22px", borderRadius: 8 }}>Send Email</div>
          </a>
          <div style={{ background: BRAND.white, borderRadius: 16, padding: "32px 28px", border: `2px solid ${BRAND.gray200}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: BRAND.offWhite, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>📍</div>
            <h3 style={{ color: BRAND.navy, fontSize: 18 }}>Location & Hours</h3>
            <p style={{ color: BRAND.gray600, fontSize: 14, lineHeight: 1.7 }}>Hubli–Dharwad, Karnataka, India<br /><strong style={{ color: BRAND.navy }}>Mon–Sat:</strong> 9:00 AM – 7:00 PM<br /><strong style={{ color: BRAND.navy }}>Sunday:</strong> Closed</p>
            <a href="https://maps.google.com/?q=Hubli,Karnataka" target="_blank" rel="noreferrer" style={{ background: BRAND.offWhite, color: BRAND.navy, border: `1px solid ${BRAND.gray200}`, fontSize: 13, fontWeight: 700, padding: "9px 22px", borderRadius: 8 }}>View on Maps</a>
          </div>
        </div>
        <div style={{ background: BRAND.navy, borderRadius: 14, padding: "28px 32px", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 36 }}>🛡️</div>
          <div>
            <h3 style={{ color: BRAND.white, fontSize: 17, marginBottom: 6 }}>Trusted for 16+ Years in Hubli-Dharwad</h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>500+ members served • 40+ successful groups • ₹2Cr+ managed</p>
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
    <div className="page" style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.offWhite, padding: 24 }}>
      <div style={{ background: BRAND.white, borderRadius: 20, padding: "44px 40px", maxWidth: 420, width: "100%", boxShadow: "0 8px 40px rgba(27,45,107,0.12)", border: `1px solid ${BRAND.gray200}` }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src={LOGO_URL} alt="Bandhan Chitti" style={{ height: 50, marginBottom: 16, objectFit: "contain" }} />
          <h2 style={{ color: BRAND.navy, fontSize: 24, marginBottom: 6 }}>Member Login</h2>
          <p style={{ color: BRAND.gray600, fontSize: 13 }}>Access your personal chitti dashboard</p>
        </div>
        {step === 1 ? (
          <>
            <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Mobile Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" type="tel" style={{ width: "100%", padding: "13px 16px", borderRadius: 8, border: `2px solid ${BRAND.gray200}`, fontSize: 15, color: BRAND.gray800, background: BRAND.white, outline: "none", boxSizing: "border-box", marginBottom: 20 }} />
            <button onClick={() => setStep(2)} style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10 }}>Send OTP →</button>
          </>
        ) : (
          <>
            <p style={{ color: BRAND.gray600, fontSize: 13, marginBottom: 16 }}>OTP sent to <strong>{phone}</strong></p>
            <label style={{ display: "block", color: BRAND.navy, fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Enter OTP</label>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" type="number" style={{ width: "100%", padding: "13px 16px", borderRadius: 8, border: `2px solid ${BRAND.gray200}`, fontSize: 15, color: BRAND.gray800, background: BRAND.white, outline: "none", boxSizing: "border-box", marginBottom: 20 }} />
            <button style={{ width: "100%", background: BRAND.navy, border: "none", color: BRAND.goldLight, fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10, marginBottom: 10 }}>Login to Dashboard →</button>
            <button onClick={() => setStep(1)} style={{ width: "100%", background: "none", border: "none", color: BRAND.gray600, fontSize: 13 }}>← Change Number</button>
          </>
        )}
        <div style={{ marginTop: 24, padding: "14px 16px", background: BRAND.goldPale, borderRadius: 8, textAlign: "center", border: `1px solid ${BRAND.goldLight}` }}>
          <p style={{ color: BRAND.gray600, fontSize: 12, margin: 0 }}>Not a member yet? <a href="#" style={{ color: BRAND.navy, fontWeight: 700 }}>Apply to Join →</a></p>
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
          system: "You are a helpful assistant for Bandhan Chitti Services, a chit fund company in Hubli-Dharwad, Karnataka with 16+ years experience. Answer questions about chit funds, joining groups, EMI payments, auctions. Be warm and professional.",
          messages: newMsgs }),
      });
      const data = await res.json();
      setMessages([...newMsgs, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "Sorry, try again." }]);
    } catch { setMessages([...newMsgs, { role: "assistant", content: "Something went wrong. Please WhatsApp us at +91 79758 76235" }]); }
    setLoading(false);
  };
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
      {open && (
        <div style={{ width: 330, height: 440, background: BRAND.white, borderRadius: 18, boxShadow: "0 8px 40px rgba(27,45,107,0.22)", border: `1px solid ${BRAND.gray200}`, display: "flex", flexDirection: "column", marginBottom: 14, overflow: "hidden" }}>
          <div style={{ background: BRAND.navy, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <img src={LOGO_URL} alt="" style={{ height: 30, objectFit: "contain" }} />
            <div>
              <div style={{ color: BRAND.white, fontSize: 13, fontWeight: 700 }}>Bandhan Chitti</div>
              <div style={{ color: BRAND.goldLight, fontSize: 10 }}>● Online — Ask me anything</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 20 }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "82%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? BRAND.navy : BRAND.offWhite, color: m.role === "user" ? BRAND.white : BRAND.navy, fontSize: 13, lineHeight: 1.55 }}>{m.content}</div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", gap: 4, padding: "10px 14px", background: BRAND.offWhite, borderRadius: "14px 14px 14px 4px", width: "fit-content" }}>
              {[0,1,2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.goldLight, animation: "bounce 1.2s infinite", animationDelay: `${j*0.2}s` }} />)}
            </div>}
          </div>
          <div style={{ padding: "10px 12px", borderTop: `1px solid ${BRAND.gray200}`, display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{ flex: 1, padding: "9px 13px", borderRadius: 8, border: `1.5px solid ${BRAND.gray200}`, fontSize: 13, outline: "none", color: BRAND.navy, background: BRAND.white }} />
            <button onClick={send} style={{ background: BRAND.navy, border: "none", color: BRAND.goldLight, borderRadius: 8, width: 38, fontSize: 15, fontWeight: 700 }}>➤</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{ width: 58, height: 58, borderRadius: "50%", background: BRAND.navy, border: `3px solid ${BRAND.goldLight}`, color: BRAND.goldLight, fontSize: 22, boxShadow: "0 4px 20px rgba(27,45,107,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: BRAND.navyDark, padding: "52px 24px 28px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 44, marginBottom: 44 }}>
          <div>
            <img src={LOGO_URL} alt="Bandhan Chitti Services" style={{ height: 48, marginBottom: 16, objectFit: "contain" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.75, maxWidth: 300, marginBottom: 16 }}>Trusted community chit fund platform in Hubli–Dharwad, Karnataka. Serving members with transparency and commitment since 2009.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="https://wa.me/917975876235" target="_blank" rel="noreferrer" style={{ color: "#4ADE80", fontSize: 13 }}>💬 +91 79758 76235</a>
              <a href="mailto:bandhanchittiservices@gmail.com" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>✉️ bandhanchittiservices@gmail.com</a>
            </div>
          </div>
          <div>
            <div style={{ color: BRAND.goldLight, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 18 }}>QUICK LINKS</div>
            {["Home", "About", "How It Works", "Schemes", "Join Us", "Contact"].map(l => (
              <div key={l} style={{ marginBottom: 11 }}>
                <button onClick={() => setPage(l)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 13, padding: 0 }}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: BRAND.goldLight, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 18 }}>OUR IMPACT</div>
            {[["16+", "Years Experience"], ["500+", "Members Served"], ["40+", "Groups Completed"], ["₹2Cr+", "Value Managed"]].map(([n, l]) => (
              <div key={l} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
                <span style={{ color: BRAND.goldLight, fontSize: 15, fontWeight: 700 }}>{n}</span>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>© 2025 Bandhan Chitti Services. Hubli–Dharwad, Karnataka, India.</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontStyle: "italic" }}>Built on Trust. Driven by Commitment.</div>
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
    <div style={{ minHeight: "100vh", background: BRAND.offWhite }}>
      <FontLink />
      <Navbar page={page} setPage={setPage} />
      <main>{pages[page] || <HomePage setPage={setPage} />}</main>
      <Footer setPage={setPage} />
      <ChatWidget />
    </div>
  );
}