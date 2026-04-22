import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase, LayoutGrid, Mail, Sparkles, Target, UserRound,
  Layers, TrendingUp, Users, Globe, Code2, Shield, Zap, BookOpen,
  ChevronRight,
} from "lucide-react";

/* ── tokens ── */
const F = { d: "Outfit, sans-serif", m: "'DM Mono', monospace" };
const C = {
  bg: "#06090f",
  card: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.11)",
  text: "rgba(255,255,255,0.96)",
  muted: "rgba(255,255,255,0.70)",
  faint: "rgba(255,255,255,0.50)",
};

/* ── responsive hook ── */
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

/* ── data ── */
const PAGES = [
  { id: "overview",  label: "Overview",  icon: LayoutGrid },
  { id: "journey",   label: "Journey",   icon: UserRound  },
  { id: "skills",    label: "Skills",    icon: Sparkles   },
  { id: "work",      label: "Case Work", icon: Briefcase  },
  { id: "thinking",  label: "Principles",icon: Target     },
  { id: "contact",   label: "Contact",   icon: Mail       },
];

const JOURNEY = [
  { id: "consulting",    kicker: "Foundation",    title: "Consulting & Workflow Design", summary: "Deloitte gave me the operating lens: discovery, alignment, and delivery discipline in regulated environments.", tags: ["Discovery", "Stakeholder alignment", "Delivery"], icon: Layers,    year: "2019–23", color: "#22d3ee" },
  { id: "finance",       kicker: "Learning Arc",  title: "Finance Depth at NYU",         summary: "Building portfolio context and institutional workflow depth through Technology Management coursework.",    tags: ["NYU", "Portfolio", "Institutional"],               icon: TrendingUp, year: "2023–25", color: "#818cf8" },
  { id: "communication", kicker: "Core Strength", title: "Teaching & Clarity",            summary: "Translating dense concepts into language people can actually use — across mentoring and TA roles.",        tags: ["Communication", "Mentoring", "Clarity"],           icon: Users,      year: "Ongoing", color: "#a78bfa" },
  { id: "direction",     kicker: "Direction",     title: "Institutional Fintech",         summary: "Intentionally building toward long-term client relationships in institutional finance and fintech.",       tags: ["Client engagement", "Fintech", "Platforms"],      icon: Globe,      year: "2025→",   color: "#f59e0b" },
];

const SKILL_CATS = [
  { id: "client",   label: "Client-Facing", color: "#22d3ee", skills: ["Client discovery", "Stakeholder alignment", "Workshop facilitation", "Executive communication", "Training & enablement", "Proposal support", "Partner outreach"] },
  { id: "delivery", label: "Delivery",      color: "#818cf8", skills: ["Workflow design", "Requirements gathering", "Release readiness", "SIT / UAT / ATF", "User stories", "Documentation", "Adoption planning"] },
  { id: "technical",label: "Technical",     color: "#a78bfa", skills: ["ServiceNow GRC", "Python", "SQL", "Tableau", "Power BI", "Automation / RPA", "Google Cloud"] },
];

const WORK = [
  { id: "grc",     badge: "Deloitte",            color: "#22d3ee", title: "Multi-stakeholder GRC Implementations",    kicker: "4 implementations",   summary: "Led workshops and requirement sessions, translating stakeholder discussions into BRDs, FRDs, and workflow specifications across regulated client environments.", tags: ["BRDs / FRDs", "GRC", "Workshops"],        impact: "4 implementations across regulated environments" },
  { id: "release", badge: "Testing & Enablement", color: "#818cf8", title: "Release Readiness & Client Validation",    kicker: "UAT / SIT leadership", summary: "Defined testing strategy, executed UAT/SIT/ATF cases, and delivered knowledge transfer for 50+ stakeholders pre-go-live.",                                   tags: ["Release", "UAT / SIT", "Training"],       impact: "50+ stakeholders trained pre-go-live" },
  { id: "adamas",  badge: "Capstone",             color: "#a78bfa", title: "AdaMAS — Multi-Agent Investment Platform", kicker: "Cross-functional team", summary: "Balanced product thinking, market research, and solution design for a fintech capstone with faculty advisors and Ada Analytics.",                             tags: ["Product thinking", "Finance", "GCP + Vertex AI"], impact: "Proof-of-concept on GCP / Vertex AI" },
  { id: "scm",     badge: "Featured Project",     color: "#22d3ee", title: "Global Supply Chain Risk & Logistics Intelligence Platform", kicker: "Predictive analytics + scenario planning", summary: "Built a manager-style analytics platform for global distribution, logistics, and trade operations with KPI visibility, predictive risk scoring, and scenario-based decision support.", tags: ["Supply chain analytics", "Predictive risk", "Scenario planning"], impact: "Live project page demonstrating logistics KPIs, risk management, and executive storytelling" },
];

const THINKING = [
  { id: "trust",    icon: Shield,   title: "Trust through understanding",       principle: "Strong client work starts with how a client really operates — not just what they ask for. Operating context is what makes platform guidance useful rather than generic.", accent: "#22d3ee" },
  { id: "hands-on", icon: Zap,      title: "Engagement should be hands-on",     principle: "The roles I value combine relationship work with diagnosis, rollout, testing, training, and adoption — not only relationship management.",                               accent: "#818cf8" },
  { id: "workflow", icon: Layers,   title: "Platform value is cross-functional", principle: "Real value appears when front, middle, and back office connect through a more integrated platform view — supporting the full operating model.",                          accent: "#a78bfa" },
  { id: "feedback", icon: BookOpen, title: "Client pain improves the product",   principle: "Recurring issues should feed into better documentation, prioritization, and product signals — not just one-off fixes.",                                                  accent: "#f59e0b" },
];

/* ── primitive components ── */
function Card({ children, style = {}, hover = true, onClick }) {
  return (
    <motion.div onClick={onClick}
      whileHover={hover && onClick ? { y: -2, transition: { duration: 0.12 } } : {}}
      style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, fontFamily: F.d, ...style }}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, style = {} }) {
  return <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.faint, ...style }}>{children}</div>;
}

function Pip({ color, style = {} }) {
  return <div style={{ width: 30, height: 2, borderRadius: 2, background: color, ...style }} />;
}

function Tag({ children, color = C.border, textColor }) {
  return (
    <span style={{ padding: "3px 10px", borderRadius: 20, border: `1px solid ${color}`, fontSize: 11, color: textColor || C.muted, fontFamily: F.m, letterSpacing: "0.04em", whiteSpace: "nowrap", display: "inline-block" }}>
      {children}
    </span>
  );
}

function IconBox({ icon: Icon, color, size = 38 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size / 3), background: `${color}1a`, border: `1px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={Math.round(size * 0.42)} style={{ color }} />
    </div>
  );
}

function Timeline() {
  const cols = ["#22d3ee", "#818cf8", "#a78bfa", "#f59e0b"];
  return (
    <svg viewBox="0 0 560 70" style={{ width: "100%", height: 70 }} aria-hidden="true">
      <line x1="40" y1="35" x2="520" y2="35" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="5 5" />
      {JOURNEY.map((item, i) => {
        const x = 40 + i * 160;
        return (
          <g key={item.id}>
            <circle cx={x} cy="35" r="10" fill={`${cols[i]}18`} stroke={cols[i]} strokeWidth="1.5" />
            <circle cx={x} cy="35" r="4" fill={cols[i]} />
            <text x={x} y="16" textAnchor="middle" fill={cols[i]} fontSize="9" fontFamily={F.m} letterSpacing="0.05em">{item.year}</text>
            <text x={x} y="58" textAnchor="middle" fill="rgba(255,255,255,0.60)" fontSize="9.5" fontFamily={F.d}>{item.kicker}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniVenn() {
  return (
    <svg viewBox="0 0 300 160" style={{ width: "100%", height: 160 }} aria-label="Skills Venn">
      <defs>
        <radialGradient id="rg1" cx="35%" cy="45%"><stop offset="0%" stopColor="#22d3ee" stopOpacity="0.52" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" /></radialGradient>
        <radialGradient id="rg2" cx="65%" cy="45%"><stop offset="0%" stopColor="#a78bfa" stopOpacity="0.52" /><stop offset="100%" stopColor="#6366f1" stopOpacity="0.12" /></radialGradient>
      </defs>
      <circle cx="112" cy="80" r="64" fill="url(#rg1)" />
      <circle cx="188" cy="80" r="64" fill="url(#rg2)" />
      <text x="62"  y="44" fill="rgba(255,255,255,0.68)" fontSize="9.5" fontFamily={F.m} letterSpacing="0.12em">CLIENT</text>
      <text x="195" y="44" fill="rgba(255,255,255,0.68)" fontSize="9.5" fontFamily={F.m} letterSpacing="0.12em">TECH</text>
      <text x="150" y="74" textAnchor="middle" fill="rgba(255,255,255,0.96)" fontSize="11" fontWeight="600" fontFamily={F.d}>Client</text>
      <text x="150" y="92" textAnchor="middle" fill="rgba(255,255,255,0.96)" fontSize="11" fontWeight="600" fontFamily={F.d}>Engagement</text>
    </svg>
  );
}

function SkillBars({ category }) {
  const vals = [92, 85, 88, 80, 86];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      {category.skills.slice(0, 5).map((skill, i) => (
        <div key={skill} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ flex: 1, fontSize: 13, color: C.muted, minWidth: 0 }}>{skill}</span>
          <div style={{ width: 70, height: 3, background: "rgba(255,255,255,0.10)", borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${vals[i]}%` }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
              style={{ height: "100%", background: category.color, borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const pv = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

/* ── main component ── */
export default function Portfolio() {
  const [page, setPage]           = useState("overview");
  const [selWork, setSelWork]     = useState("scm");
  const [selThink, setSelThink]   = useState("trust");
  const [selJourney, setSelJourney] = useState("consulting");
  const [selSkill, setSelSkill]   = useState("client");
  const { isMobile, isTablet }    = useBreakpoint();
  const isNarrow = isMobile || isTablet;

  useEffect(() => {
    document.documentElement.style.cssText = "background:#06090f;margin:0;padding:0;";
    document.body.style.cssText = "background:#06090f;margin:0;padding:0;";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (_) {} };
  }, []);

  const activeWork  = WORK.find(w => w.id === selWork);
  const activeThink = THINKING.find(t => t.id === selThink);
  const activeSkill = SKILL_CATS.find(s => s.id === selSkill);
  const cardBtn     = (extra = {}) => ({ textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer", width: "100%", display: "block", ...extra });

  /* responsive values */
  const pad    = isMobile ? "14px 14px 90px" : isTablet ? "16px 18px 90px" : "20px 28px 90px";
  const gap    = isMobile ? 10 : 14;
  const colGap = isMobile ? 8  : 12;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: F.d, color: C.text, position: "relative", overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-8%", left: "-6%",  width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "30%", right: "-4%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-4%", left: "32%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1160, margin: "0 auto", padding: pad, display: "flex", flexDirection: "column", gap }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <Card style={{ padding: "9px 18px", display: "flex", alignItems: "center", gap: 10, borderRadius: 14 }} hover={false}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 9px rgba(34,211,238,0.6)" }} />
            <span style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: C.text }}>Jay Shiurkar</span>
            {!isMobile && <span style={{ fontSize: 11, color: C.muted, fontFamily: F.m }}>NYC · Technology Management</span>}
          </Card>
          {!isMobile && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Client Engagement", "Financial Technology", "Institutional Workflows"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "186px 1fr", gap: gap, alignItems: "start" }}>
          {!isNarrow && (
            <Card style={{ padding: 9, borderRadius: 18, position: "sticky", top: 18 }} hover={false}>
              <Eyebrow style={{ padding: "6px 10px 8px" }}>Navigate</Eyebrow>
              {PAGES.map(p => {
                const Icon = p.icon;
                const active = page === p.id;
                return (
                  <button key={p.id} onClick={() => setPage(p.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 12, background: active ? "rgba(255,255,255,0.09)" : "transparent", border: "none", cursor: "pointer", color: active ? C.text : C.muted, fontFamily: F.d, fontSize: 13.5, fontWeight: active ? 500 : 400, transition: "all 0.15s", textAlign: "left" }}>
                    <Icon size={14} />
                    {p.label}
                  </button>
                );
              })}
            </Card>
          )}

          <div style={{ minWidth: 0 }}>
            <AnimatePresence mode="wait">
              {page === "overview" && (
                <motion.div key="overview" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap }}>
                  <Card style={{ padding: 0, overflow: "hidden", background: "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(129,140,248,0.05) 55%, rgba(167,139,250,0.05))", borderColor: "rgba(34,211,238,0.18)" }} hover={false}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 190px", alignItems: "end" }}>
                      <div style={{ padding: isMobile ? "22px 20px 22px" : "28px 32px 28px" }}>
                        <Eyebrow>Building toward</Eyebrow>
                        <div style={{ marginTop: 10, fontSize: isMobile ? 24 : 30, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.028em", color: C.text }}>
                          Client engagement in <span style={{ color: "#22d3ee" }}>financial technology</span>
                        </div>
                        <Pip color="#22d3ee" style={{ marginTop: 16 }} />
                        <p style={{ marginTop: 14, fontSize: isMobile ? 13 : 14, color: C.muted, lineHeight: 1.75, maxWidth: 460 }}>
                          Consulting foundation, workflow design depth, and a deliberate pivot toward client-facing roles in institutional fintech.
                        </p>
                        <div style={{ marginTop: 18, display: "flex", gap: 9, flexWrap: "wrap" }}>
                          <button onClick={() => setPage("journey")} style={{ padding: "9px 18px", borderRadius: 12, background: "white", color: "#06090f", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: F.d }}>Explore journey →</button>
                          <button onClick={() => setPage("work")} style={{ padding: "9px 18px", borderRadius: 12, background: "transparent", color: C.muted, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 13, fontFamily: F.d }}>View case work</button>
                        </div>
                      </div>
                      {!isMobile && (
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 12, overflow: "hidden", height: 230 }}>
                          <div style={{ position: "relative", width: 170, height: 220 }}>
                            <img src="/MyIMG.JPEG" alt="Jay Shiurkar" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", borderRadius: "16px 16px 0 0", display: "block" }} />
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, rgba(8,14,24,0.85), transparent)" }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: colGap }}>
                    {[
                      { label: "Foundation", value: "4+ yrs", detail: "Deloitte consulting" },
                      { label: "Education",  value: "NYU",    detail: "Technology Management · May 2026" },
                    ].map(m => (
                      <Card key={m.label} style={{ padding: isMobile ? 14 : 18 }}>
                        <Eyebrow>{m.label}</Eyebrow>
                        <div style={{ marginTop: 9, fontSize: isMobile ? 20 : 22, fontWeight: 600, color: C.text }}>{m.value}</div>
                        <div style={{ marginTop: 4, fontSize: 12, color: C.muted }}>{m.detail}</div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {page === "journey" && (
                <motion.div key="journey" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap }}>
                  <Card style={{ padding: isMobile ? "16px 18px" : "20px 26px" }} hover={false}>
                    <Eyebrow>Journey</Eyebrow>
                    <div style={{ marginTop: 7, fontSize: isMobile ? 20 : 24, fontWeight: 600, color: C.text }}>How I got here</div>
                    <div style={{ marginTop: 16 }}><Timeline /></div>
                  </Card>
                </motion.div>
              )}

              {page === "skills" && (
                <motion.div key="skills" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: colGap }}>
                    <Card style={{ padding: isMobile ? 16 : 24 }} hover={false}>
                      <Eyebrow>Skill overlap</Eyebrow>
                      <div style={{ marginTop: 7, fontSize: isMobile ? 18 : 21, fontWeight: 600, color: C.text }}>Built from both sides</div>
                      <div style={{ marginTop: 14 }}><MiniVenn /></div>
                    </Card>
                    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                      {SKILL_CATS.map(cat => (
                        <button key={cat.id} onClick={() => setSelSkill(cat.id)} style={cardBtn()}>
                          <Card style={{ padding: "15px 18px", borderColor: selSkill === cat.id ? `${cat.color}48` : C.border, background: selSkill === cat.id ? `${cat.color}0d` : C.card }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, boxShadow: selSkill === cat.id ? `0 0 9px ${cat.color}85` : "none" }} />
                                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{cat.label}</span>
                              </div>
                              <span style={{ fontSize: 11, color: C.muted, fontFamily: F.m }}>{cat.skills.length} skills</span>
                            </div>
                          </Card>
                        </button>
                      ))}
                    </div>
                  </div>
                  {activeSkill && (
                    <motion.div key={selSkill} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                      <Card style={{ padding: isMobile ? 16 : 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: activeSkill.color }} />
                          <Eyebrow>{activeSkill.label} skills</Eyebrow>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18 }}>
                          <SkillBars category={activeSkill} />
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignContent: "flex-start" }}>
                            {activeSkill.skills.map(s => (
                              <Tag key={s} color={`${activeSkill.color}38`} textColor="rgba(255,255,255,0.84)">{s}</Tag>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {page === "work" && (
                <motion.div key="work" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap }}>
                  <Card style={{ padding: isMobile ? "14px 18px" : "16px 22px" }} hover={false}>
                    <Eyebrow>Case work</Eyebrow>
                    <div style={{ marginTop: 6, fontSize: isMobile ? 20 : 22, fontWeight: 600, color: C.text }}>Collaboration & delivery</div>
                  </Card>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: colGap }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {WORK.map(item => {
                        const sel = selWork === item.id;
                        return (
                          <button key={item.id} onClick={() => setSelWork(item.id)} style={cardBtn()}>
                            <Card style={{ padding: isMobile ? 16 : 20, borderColor: sel ? `${item.color}48` : C.border, background: sel ? `${item.color}0d` : C.card }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <Tag color={`${item.color}32`} textColor={item.color}>{item.badge}</Tag>
                                  <div style={{ marginTop: 9, fontSize: isMobile ? 14 : 14.5, fontWeight: 600, lineHeight: 1.3, color: C.text }}>{item.title}</div>
                                  <div style={{ marginTop: 4, fontSize: 12, color: C.muted }}>{item.kicker}</div>
                                </div>
                                <ChevronRight size={14} style={{ color: C.faint, marginTop: 4, transform: sel ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
                              </div>
                              {isMobile && sel && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                                  <Pip color={item.color} style={{ marginTop: 12 }} />
                                  <p style={{ marginTop: 11, fontSize: 13, color: C.muted, lineHeight: 1.72 }}>{item.summary}</p>
                                  <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: `${item.color}0d`, border: `1px solid ${item.color}22` }}>
                                    <Eyebrow>Impact</Eyebrow>
                                    <div style={{ marginTop: 5, fontSize: 13, color: C.muted }}>{item.impact}</div>
                                  </div>
                                  {item.id === "scm" && (
                                    <div style={{ marginTop: 12 }}>
                                      <a href="/projects/scmprj" style={{ display: "inline-block", padding: "9px 16px", borderRadius: 12, background: "white", color: "#06090f", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Open live project →</a>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </Card>
                          </button>
                        );
                      })}
                    </div>
                    {!isMobile && (
                      <AnimatePresence mode="wait">
                        {activeWork && (
                          <motion.div key={activeWork.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }} transition={{ duration: 0.2 }}>
                            <Card style={{ padding: 26, borderColor: `${activeWork.color}32` }} hover={false}>
                              <Tag color={`${activeWork.color}32`} textColor={activeWork.color}>{activeWork.badge}</Tag>
                              <div style={{ marginTop: 16, fontSize: 18, fontWeight: 600, lineHeight: 1.3, color: C.text }}>{activeWork.title}</div>
                              <Pip color={activeWork.color} style={{ marginTop: 13 }} />
                              <p style={{ marginTop: 13, fontSize: 13.5, color: C.muted, lineHeight: 1.78 }}>{activeWork.summary}</p>
                              <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: `${activeWork.color}0d`, border: `1px solid ${activeWork.color}22` }}>
                                <Eyebrow>Impact</Eyebrow>
                                <div style={{ marginTop: 7, fontSize: 13.5, color: C.muted }}>{activeWork.impact}</div>
                              </div>
                              <div style={{ marginTop: 13, display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {activeWork.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                              </div>
                              {activeWork.id === "scm" && (
                                <div style={{ marginTop: 16 }}>
                                  <a href="/projects/scmprj" style={{ display: "inline-block", padding: "10px 18px", borderRadius: 12, background: "white", color: "#06090f", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Open live project →</a>
                                </div>
                              )}
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </motion.div>
              )}

              {page === "thinking" && (
                <motion.div key="thinking" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap }}>
                  <Card style={{ padding: isMobile ? "14px 18px" : "18px 24px" }} hover={false}>
                    <Eyebrow>Principles</Eyebrow>
                    <div style={{ marginTop: 7, fontSize: isMobile ? 20 : 22, fontWeight: 600, color: C.text }}>Client lens & working principles</div>
                  </Card>
                </motion.div>
              )}

              {page === "contact" && (
                <motion.div key="contact" variants={pv} initial="initial" animate="animate" exit="exit" style={{ display: "flex", flexDirection: "column", gap }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr", gap: colGap }}>
                    <Card style={{ padding: isMobile ? "22px 20px" : "28px 30px", background: "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(129,140,248,0.05))", borderColor: "rgba(34,211,238,0.16)" }} hover={false}>
                      <Eyebrow>Contact</Eyebrow>
                      <div style={{ marginTop: 11, fontSize: isMobile ? 20 : 22, fontWeight: 600, lineHeight: 1.3, color: C.text }}>Open to conversations in client engagement & fintech</div>
                      <Pip color="#22d3ee" style={{ marginTop: 16 }} />
                      <p style={{ marginTop: 14, fontSize: 13.5, color: C.muted, lineHeight: 1.75 }}>Based in New York City. Interested in roles combining client trust, financial domain learning, and platform execution.</p>
                      <div style={{ marginTop: 20, display: "flex", gap: 9, flexWrap: "wrap" }}>
                        <a href="mailto:jayshiurkar@gmail.com" style={{ padding: "9px 18px", borderRadius: 12, background: "white", color: "#06090f", textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: F.d }}>jayshiurkar@gmail.com</a>
                        <a href="https://www.linkedin.com/in/jayshiurkar" target="_blank" rel="noreferrer" style={{ padding: "9px 18px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.card, color: C.muted, textDecoration: "none", fontSize: 13, fontFamily: F.d }}>LinkedIn →</a>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 40, display: "flex", background: "rgba(6,9,15,0.94)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${C.border}`, borderRadius: 22, padding: 7, gap: 2 }}>
        {PAGES.map(p => {
          const Icon = p.icon;
          const active = page === p.id;
          return (
            <button key={p.id} onClick={() => setPage(p.id)} title={p.label}
              style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center", gap: 4, padding: isMobile ? "7px 10px" : "7px 14px", borderRadius: 15, background: active ? "rgba(255,255,255,0.10)" : "transparent", border: "none", cursor: "pointer", color: active ? C.text : C.muted, transition: "all 0.15s", fontFamily: F.d, fontSize: 10 }}>
              <Icon size={15} />
              {isMobile && <span style={{ fontSize: 9, fontFamily: F.m }}>{p.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
