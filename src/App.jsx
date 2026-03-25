import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase, LayoutGrid, Mail, Sparkles, Target, UserRound,
  Layers, TrendingUp, Users, Globe, Code2, Shield, Zap, BookOpen,
  ChevronRight
} from "lucide-react";

const F = { d: "Outfit, sans-serif", m: "'DM Mono', monospace" };
const C = {
  bg: "#06090f",
  card: "rgba(255,255,255,0.045)",
  border: "rgba(255,255,255,0.10)",
  text: "rgba(255,255,255,0.95)",
  muted: "rgba(255,255,255,0.68)",
  faint: "rgba(255,255,255,0.48)",
};

const PAGES = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "journey", label: "Journey", icon: UserRound },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "work", label: "Case Work", icon: Briefcase },
  { id: "thinking", label: "Principles", icon: Target },
  { id: "contact", label: "Contact", icon: Mail },
];

const JOURNEY = [
  { id: "consulting", kicker: "Foundation", title: "Consulting & Workflow Design", summary: "Deloitte gave me the operating lens: discovery, alignment, and delivery discipline in regulated environments.", tags: ["Discovery", "Stakeholder alignment", "Delivery"], icon: Layers, year: "2019–23", color: "#22d3ee" },
  { id: "finance", kicker: "Learning Arc", title: "Finance Depth at NYU", summary: "Building portfolio context and institutional workflow depth through Technology Management coursework.", tags: ["NYU", "Portfolio", "Institutional"], icon: TrendingUp, year: "2023–25", color: "#818cf8" },
  { id: "communication", kicker: "Core Strength", title: "Teaching & Clarity", summary: "Translating dense concepts into language people can actually use — across mentoring and TA roles.", tags: ["Communication", "Mentoring", "Clarity"], icon: Users, year: "Ongoing", color: "#a78bfa" },
  { id: "direction", kicker: "Direction", title: "Institutional Fintech", summary: "Intentionally building toward long-term client relationships in institutional finance and fintech.", tags: ["Client engagement", "Fintech", "Platforms"], icon: Globe, year: "2025→", color: "#f59e0b" },
];

const SKILL_CATS = [
  { id: "client", label: "Client-Facing", color: "#22d3ee", skills: ["Client discovery", "Stakeholder alignment", "Workshop facilitation", "Executive communication", "Training & enablement", "Proposal support", "Partner outreach"] },
  { id: "delivery", label: "Delivery", color: "#818cf8", skills: ["Workflow design", "Requirements gathering", "Release readiness", "SIT / UAT / ATF", "User stories", "Documentation", "Adoption planning"] },
  { id: "technical", label: "Technical", color: "#a78bfa", skills: ["ServiceNow GRC", "Python", "SQL", "Tableau", "Power BI", "Automation / RPA", "Google Cloud"] },
];

const WORK = [
  { id: "grc", badge: "Deloitte", color: "#22d3ee", title: "Multi-stakeholder GRC Implementations", kicker: "4 implementations", summary: "Led workshops and requirement sessions, translating stakeholder discussions into BRDs, FRDs, and workflow specifications across regulated client environments.", tags: ["BRDs / FRDs", "GRC", "Workshops"], impact: "4 implementations across regulated environments" },
  { id: "release", badge: "Testing & Enablement", color: "#818cf8", title: "Release Readiness & Client Validation", kicker: "UAT / SIT leadership", summary: "Defined testing strategy, executed UAT/SIT/ATF cases, and delivered knowledge transfer for 50+ stakeholders pre-go-live.", tags: ["Release", "UAT / SIT", "Training"], impact: "50+ stakeholders trained pre-go-live" },
  { id: "adamas", badge: "Capstone", color: "#a78bfa", title: "AdaMAS — Multi-Agent Investment Platform", kicker: "Cross-functional team", summary: "Balanced product thinking, market research, and solution design for a fintech capstone with faculty advisors and Ada Analytics.", tags: ["Product thinking", "Finance", "GCP + Vertex AI"], impact: "Proof-of-concept on GCP / Vertex AI" },
];

const THINKING = [
  { id: "trust", icon: Shield, title: "Trust through understanding", principle: "Strong client work starts with how a client really operates — not just what they ask for. Operating context is what makes platform guidance useful rather than generic.", accent: "#22d3ee" },
  { id: "hands-on", icon: Zap, title: "Engagement should be hands-on", principle: "The roles I value combine relationship work with diagnosis, rollout, testing, training, and adoption — not only relationship management.", accent: "#818cf8" },
  { id: "workflow", icon: Layers, title: "Platform value is cross-functional", principle: "Real value appears when front, middle, and back office connect through a more integrated platform view — supporting the full operating model.", accent: "#a78bfa" },
  { id: "feedback", icon: BookOpen, title: "Client pain improves the product", principle: "Recurring issues should feed into better documentation, prioritization, and product signals — not just one-off fixes.", accent: "#f59e0b" },
];

function Card({ children, style = {}, hover = true, onClick }) {
  return (
    <motion.div onClick={onClick} whileHover={hover ? { y: -2, transition: { duration: 0.12 } } : {}}
      style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, fontFamily: F.d, ...style }}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, style = {} }) {
  return (
    <div style={{ fontFamily: F.m, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.faint, ...style }}>
      {children}
    </div>
  );
}

function Pip({ color, style = {} }) {
  return <div style={{ width: 28, height: 2, borderRadius: 2, background: color, ...style }} />;
}

function Tag({ children, color = C.border, textColor }) {
  return (
    <span style={{ padding: "2px 9px", borderRadius: 20, border: `1px solid ${color}`, fontSize: 10, color: textColor || C.muted, fontFamily: F.m, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function IconBox({ icon: Icon, color, size = 36 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size / 3), background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={Math.round(size * 0.42)} style={{ color }} />
    </div>
  );
}

function Timeline() {
  const cols = ["#22d3ee", "#818cf8", "#a78bfa", "#f59e0b"];
  return (
    <svg viewBox="0 0 600 68" style={{ width: "100%", height: 68 }} aria-hidden="true">
      <line x1="50" y1="34" x2="550" y2="34" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="5 5" />
      {JOURNEY.map((item, i) => {
        const x = 50 + i * 166;
        return (
          <g key={item.id}>
            <circle cx={x} cy="34" r="9" fill={`${cols[i]}18`} stroke={cols[i]} strokeWidth="1.5" />
            <circle cx={x} cy="34" r="3.5" fill={cols[i]} />
            <text x={x} y="15" textAnchor="middle" fill={cols[i]} fontSize="8.5" fontFamily={F.m} letterSpacing="0.05em">{item.year}</text>
            <text x={x} y="56" textAnchor="middle" fill="rgba(255,255,255,0.60)" fontSize="9" fontFamily={F.d}>{item.kicker}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniVenn() {
  return (
    <svg viewBox="0 0 300 158" style={{ width: "100%", height: 158 }} aria-label="Skills Venn">
      <defs>
        <radialGradient id="rg1" cx="35%" cy="45%"><stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" /></radialGradient>
        <radialGradient id="rg2" cx="65%" cy="45%"><stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" /><stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" /></radialGradient>
      </defs>
      <circle cx="110" cy="79" r="62" fill="url(#rg1)" />
      <circle cx="190" cy="79" r="62" fill="url(#rg2)" />
      <text x="62" y="44" fill="rgba(255,255,255,0.70)" fontSize="9" fontFamily={F.m} letterSpacing="0.12em">CLIENT</text>
      <text x="196" y="44" fill="rgba(255,255,255,0.70)" fontSize="9" fontFamily={F.m} letterSpacing="0.12em">TECH</text>
      <text x="150" y="73" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="10" fontWeight="600" fontFamily={F.d}>Client</text>
      <text x="150" y="90" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="10" fontWeight="600" fontFamily={F.d}>Engagement</text>
    </svg>
  );
}

function SkillBars({ category }) {
  const vals = [91, 83, 87, 78, 85];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {category.skills.slice(0, 5).map((skill, i) => (
        <div key={skill} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ flex: 1, fontSize: 11.5, color: C.muted, minWidth: 0 }}>{skill}</span>
          <div style={{ width: 64, height: 3, background: "rgba(255,255,255,0.10)", borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${vals[i]}%` }} transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
              style={{ height: "100%", background: category.color, borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const pv = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

export default function Portfolio() {
  const [page, setPage] = useState("overview");
  const [selWork, setSelWork] = useState("grc");
  const [selThink, setSelThink] = useState("trust");
  const [selJourney, setSelJourney] = useState("consulting");
  const [selSkill, setSelSkill] = useState("client");

  useEffect(() => {
    document.documentElement.style.cssText = "background:#06090f;height:100%;margin:0;padding:0;";
    document.body.style.cssText = "background:#06090f;margin:0;padding:0;";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (_) {} };
  }, []);

  const activeWork = WORK.find(w => w.id === selWork);
  const activeThink = THINKING.find(t => t.id === selThink);
  const activeSkill = SKILL_CATS.find(s => s.id === selSkill);
  const cardBtn = (style = {}) => ({ textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer", width: "100%", display: "block", ...style });

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: F.d, color: C.text, position: "relative", overflowX: "hidden" }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-8%", left: "-6%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "28%", right: "-4%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-4%", left: "34%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "18px 20px 100px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <Card style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 10, borderRadius: 14 }} hover={false}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 8px rgba(34,211,238,0.55)" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Jay Shiurkar</span>
            <span style={{ fontSize: 10, color: C.muted, fontFamily: F.m }}>NYC · Technology Management</span>
          </Card>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Client Engagement", "Financial Technology", "Institutional Workflows"].map(t => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "176px 1fr", gap: 14, alignItems: "start" }}>

          {/* Sidebar */}
          <Card style={{ padding: 8, borderRadius: 18, position: "sticky", top: 18 }} hover={false}>
            <Eyebrow style={{ padding: "6px 10px 8px" }}>Navigate</Eyebrow>
            {PAGES.map(p => {
              const Icon = p.icon;
              const active = page === p.id;
              return (
                <button key={p.id} onClick={() => setPage(p.id)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 11px", borderRadius: 12, background: active ? "rgba(255,255,255,0.09)" : "transparent", border: "none", cursor: "pointer", color: active ? C.text : C.muted, fontFamily: F.d, fontSize: 12.5, fontWeight: active ? 500 : 400, transition: "all 0.15s", textAlign: "left" }}>
                  <Icon size={13} />
                  {p.label}
                </button>
              );
            })}
          </Card>

          {/* Main */}
          <div style={{ minWidth: 0 }}>
            <AnimatePresence mode="wait">

              {/* ── OVERVIEW ── */}
              {page === "overview" && (
                <motion.div key="overview" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                  {/* Hero with photo */}
                  <Card style={{ padding: 0, overflow: "hidden", background: "linear-gradient(135deg, rgba(34,211,238,0.07), rgba(129,140,248,0.05) 55%, rgba(167,139,250,0.05))", borderColor: "rgba(34,211,238,0.16)" }} hover={false}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 170px" }}>
                      <div style={{ padding: "26px 30px" }}>
                        <Eyebrow>Building toward</Eyebrow>
                        <div style={{ marginTop: 10, fontSize: 26, fontWeight: 600, lineHeight: 1.18, letterSpacing: "-0.025em", color: C.text }}>
                          Client engagement in <span style={{ color: "#22d3ee" }}>financial technology</span>
                        </div>
                        <Pip color="#22d3ee" style={{ marginTop: 14 }} />
                        <p style={{ marginTop: 12, fontSize: 12.5, color: C.muted, lineHeight: 1.72, maxWidth: 440 }}>
                          Consulting foundation, workflow design depth, and a deliberate pivot toward client-facing roles in institutional fintech.
                        </p>
                        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                          <button onClick={() => setPage("journey")} style={{ padding: "7px 16px", borderRadius: 11, background: "white", color: "#06090f", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: F.d }}>Explore journey →</button>
                          <button onClick={() => setPage("work")} style={{ padding: "7px 16px", borderRadius: 11, background: "transparent", color: C.muted, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 12, fontFamily: F.d }}>View case work</button>
                        </div>
                      </div>
                      {/* Profile photo — bg removed via mix-blend-mode */}
                      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
                        <img src="/MyIMG.PNG" alt="Jay Shiurkar"
                          style={{ width: 160, height: 200, objectFit: "cover", objectPosition: "center top", borderRadius: "14px 14px 0 0", display: "block", mixBlendMode: "luminosity", filter: "brightness(0.92) contrast(1.05)" }} />
                      </div>
                    </div>
                  </Card>

                  {/* 2 stat cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                    {[
                      { label: "Foundation", value: "4+ yrs", detail: "Deloitte consulting" },
                      { label: "Education", value: "NYU", detail: "Technology Management · May 2026" },
                    ].map(m => (
                      <Card key={m.label} style={{ padding: 16 }}>
                        <Eyebrow>{m.label}</Eyebrow>
                        <div style={{ marginTop: 8, fontSize: 19, fontWeight: 600, color: C.text }}>{m.value}</div>
                        <div style={{ marginTop: 4, fontSize: 11, color: C.muted }}>{m.detail}</div>
                      </Card>
                    ))}
                  </div>

                  {/* What I bring */}
                  <Card style={{ padding: 20 }}>
                    <Eyebrow>What I bring</Eyebrow>
                    <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {[
                        { icon: Users, text: "Client discovery & stakeholder alignment" },
                        { icon: Layers, text: "Workflow translation & requirements" },
                        { icon: Code2, text: "Testing, delivery & automation" },
                        { icon: TrendingUp, text: "Training, adoption & platform enablement" },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 11px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` }}>
                          <Icon size={12} style={{ color: "#22d3ee", flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: C.muted }}>{text}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* ── JOURNEY ── */}
              {page === "journey" && (
                <motion.div key="journey" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Card style={{ padding: "18px 24px" }} hover={false}>
                    <Eyebrow>Journey</Eyebrow>
                    <div style={{ marginTop: 6, fontSize: 20, fontWeight: 600, color: C.text }}>How I got here</div>
                    <div style={{ marginTop: 14 }}><Timeline /></div>
                  </Card>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {JOURNEY.map((item) => {
                      const Icon = item.icon;
                      const sel = selJourney === item.id;
                      return (
                        <button key={item.id} onClick={() => setSelJourney(item.id)} style={cardBtn()}>
                          <Card style={{ padding: 18, borderColor: sel ? `${item.color}45` : C.border, background: sel ? `${item.color}0c` : C.card, height: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <div style={{ flex: 1, minWidth: 0, paddingRight: 10 }}>
                                <Eyebrow>{item.kicker}</Eyebrow>
                                <div style={{ marginTop: 6, fontSize: 13.5, fontWeight: 600, lineHeight: 1.3, color: sel ? item.color : C.text }}>{item.title}</div>
                              </div>
                              <IconBox icon={Icon} color={item.color} size={34} />
                            </div>
                            <Pip color={item.color} style={{ marginTop: 12 }} />
                            <AnimatePresence>
                              {sel && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                                  <p style={{ marginTop: 10, fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{item.summary}</p>
                                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
                                    {item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            {!sel && <p style={{ marginTop: 8, fontSize: 11.5, color: C.muted, lineHeight: 1.55 }}>{item.summary.substring(0, 68)}…</p>}
                          </Card>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── SKILLS ── */}
              {page === "skills" && (
                <motion.div key="skills" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <Card style={{ padding: 22 }} hover={false}>
                      <Eyebrow>Skill overlap</Eyebrow>
                      <div style={{ marginTop: 6, fontSize: 19, fontWeight: 600, color: C.text }}>Built from both sides</div>
                      <div style={{ marginTop: 14 }}><MiniVenn /></div>
                    </Card>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {SKILL_CATS.map(cat => (
                        <button key={cat.id} onClick={() => setSelSkill(cat.id)} style={cardBtn()}>
                          <Card style={{ padding: "14px 16px", borderColor: selSkill === cat.id ? `${cat.color}45` : C.border, background: selSkill === cat.id ? `${cat.color}0c` : C.card }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                <div style={{ width: 7, height: 7, borderRadius: "50%", background: cat.color, boxShadow: selSkill === cat.id ? `0 0 8px ${cat.color}80` : "none" }} />
                                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{cat.label}</span>
                              </div>
                              <span style={{ fontSize: 10, color: C.muted, fontFamily: F.m }}>{cat.skills.length} skills</span>
                            </div>
                            {selSkill === cat.id && (
                              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 5 }}>
                                {cat.skills.slice(0, 4).map(s => <Tag key={s} color={`${cat.color}35`} textColor="rgba(255,255,255,0.82)">{s}</Tag>)}
                                {cat.skills.length > 4 && <Tag color={C.border} textColor={C.muted}>+{cat.skills.length - 4}</Tag>}
                              </div>
                            )}
                          </Card>
                        </button>
                      ))}
                    </div>
                  </div>
                  {activeSkill && (
                    <motion.div key={selSkill} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                      <Card style={{ padding: 22 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: activeSkill.color }} />
                          <Eyebrow>{activeSkill.label} skills</Eyebrow>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <SkillBars category={activeSkill} />
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignContent: "flex-start" }}>
                            {activeSkill.skills.map(s => (
                              <Tag key={s} color={`${activeSkill.color}35`} textColor="rgba(255,255,255,0.82)">{s}</Tag>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ── WORK ── */}
              {page === "work" && (
                <motion.div key="work" variants={pv} initial="initial" animate="animate" exit="exit">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <Card style={{ padding: "14px 18px" }} hover={false}>
                        <Eyebrow>Case work</Eyebrow>
                        <div style={{ marginTop: 5, fontSize: 19, fontWeight: 600, color: C.text }}>Collaboration & delivery</div>
                      </Card>
                      {WORK.map(item => {
                        const sel = selWork === item.id;
                        return (
                          <button key={item.id} onClick={() => setSelWork(item.id)} style={cardBtn()}>
                            <Card style={{ padding: 18, borderColor: sel ? `${item.color}45` : C.border, background: sel ? `${item.color}0c` : C.card }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <Tag color={`${item.color}30`} textColor={item.color}>{item.badge}</Tag>
                                  <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, lineHeight: 1.3, color: C.text }}>{item.title}</div>
                                  <div style={{ marginTop: 3, fontSize: 11, color: C.muted }}>{item.kicker}</div>
                                </div>
                                <ChevronRight size={13} style={{ color: C.faint, marginTop: 4, transform: sel ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
                              </div>
                            </Card>
                          </button>
                        );
                      })}
                    </div>
                    <AnimatePresence mode="wait">
                      {activeWork && (
                        <motion.div key={activeWork.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }} transition={{ duration: 0.2 }}>
                          <Card style={{ padding: 24, borderColor: `${activeWork.color}30`, height: "100%" }} hover={false}>
                            <Tag color={`${activeWork.color}30`} textColor={activeWork.color}>{activeWork.badge}</Tag>
                            <div style={{ marginTop: 14, fontSize: 17, fontWeight: 600, lineHeight: 1.3, color: C.text }}>{activeWork.title}</div>
                            <Pip color={activeWork.color} style={{ marginTop: 12 }} />
                            <p style={{ marginTop: 12, fontSize: 12.5, color: C.muted, lineHeight: 1.75 }}>{activeWork.summary}</p>
                            <div style={{ marginTop: 14, padding: 13, borderRadius: 12, background: `${activeWork.color}0d`, border: `1px solid ${activeWork.color}20` }}>
                              <Eyebrow>Impact</Eyebrow>
                              <div style={{ marginTop: 6, fontSize: 12.5, color: C.muted }}>{activeWork.impact}</div>
                            </div>
                            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 5 }}>
                              {activeWork.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                            </div>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* ── THINKING ── */}
              {page === "thinking" && (
                <motion.div key="thinking" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Card style={{ padding: "16px 22px" }} hover={false}>
                    <Eyebrow>Principles</Eyebrow>
                    <div style={{ marginTop: 6, fontSize: 20, fontWeight: 600, color: C.text }}>Client lens & working principles</div>
                  </Card>
                  <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 10 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {THINKING.map(item => {
                        const Icon = item.icon;
                        const sel = selThink === item.id;
                        return (
                          <button key={item.id} onClick={() => setSelThink(item.id)} style={cardBtn()}>
                            <Card style={{ padding: 18, borderColor: sel ? `${item.accent}45` : C.border, background: sel ? `${item.accent}0c` : C.card, height: "100%" }}>
                              <IconBox icon={Icon} color={item.accent} size={34} />
                              <div style={{ marginTop: 11, fontSize: 13, fontWeight: 600, lineHeight: 1.35, color: sel ? item.accent : C.text }}>{item.title}</div>
                              <Pip color={item.accent} style={{ marginTop: 10 }} />
                            </Card>
                          </button>
                        );
                      })}
                    </div>
                    <AnimatePresence mode="wait">
                      {activeThink && (
                        <motion.div key={activeThink.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                          <Card style={{ padding: 24, borderColor: `${activeThink.accent}30`, height: "100%" }} hover={false}>
                            <IconBox icon={activeThink.icon} color={activeThink.accent} size={42} />
                            <div style={{ marginTop: 14, fontSize: 17, fontWeight: 600, color: C.text }}>{activeThink.title}</div>
                            <Pip color={activeThink.accent} style={{ marginTop: 12 }} />
                            <p style={{ marginTop: 12, fontSize: 12.5, color: C.muted, lineHeight: 1.75 }}>{activeThink.principle}</p>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* ── CONTACT ── */}
              {page === "contact" && (
                <motion.div key="contact" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 10 }}>
                    <Card style={{ padding: "26px 28px", background: "linear-gradient(135deg, rgba(34,211,238,0.07), rgba(129,140,248,0.05))", borderColor: "rgba(34,211,238,0.14)" }} hover={false}>
                      <Eyebrow>Contact</Eyebrow>
                      <div style={{ marginTop: 10, fontSize: 20, fontWeight: 600, lineHeight: 1.3, color: C.text }}>Open to conversations in client engagement & fintech</div>
                      <Pip color="#22d3ee" style={{ marginTop: 14 }} />
                      <p style={{ marginTop: 12, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>Based in New York City. Interested in roles combining client trust, financial domain learning, and platform execution.</p>
                      <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <a href="mailto:jayshiurkar@gmail.com" style={{ padding: "8px 16px", borderRadius: 11, background: "white", color: "#06090f", textDecoration: "none", fontSize: 12, fontWeight: 600, fontFamily: F.d }}>jayshiurkar@gmail.com</a>
                        <a href="https://www.linkedin.com/in/jayshiurkar" target="_blank" rel="noreferrer" style={{ padding: "8px 16px", borderRadius: 11, border: `1px solid ${C.border}`, background: C.card, color: C.muted, textDecoration: "none", fontSize: 12, fontFamily: F.d }}>LinkedIn →</a>
                      </div>
                    </Card>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { label: "Location", value: "New York City", detail: "Eastern Time" },
                        { label: "Eligibility", value: "OPT / H-1B", detail: "US work authorized" },
                        { label: "Best fit", value: "Client platform roles", detail: "Finance, risk, fintech" },
                      ].map(m => (
                        <Card key={m.label} style={{ padding: 16 }}>
                          <Eyebrow>{m.label}</Eyebrow>
                          <div style={{ marginTop: 7, fontSize: 15, fontWeight: 600, color: C.text }}>{m.value}</div>
                          <div style={{ marginTop: 3, fontSize: 11, color: C.muted }}>{m.detail}</div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div style={{ position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 40, display: "flex", background: "rgba(6,9,15,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 6, gap: 2 }}>
        {PAGES.map(p => {
          const Icon = p.icon;
          const active = page === p.id;
          return (
            <button key={p.id} onClick={() => setPage(p.id)} title={p.label}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 13px", borderRadius: 14, background: active ? "rgba(255,255,255,0.10)" : "transparent", border: "none", cursor: "pointer", color: active ? C.text : C.muted, transition: "all 0.15s" }}>
              <Icon size={15} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
