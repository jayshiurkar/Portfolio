import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, AlertTriangle, Globe2, Package, Route, ShieldAlert, TrendingUp, Truck, Zap } from "lucide-react";

const F = { d: "Outfit, sans-serif", m: "'DM Mono', monospace" };
const C = {
  bg: "#06090f",
  card: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.11)",
  text: "rgba(255,255,255,0.96)",
  muted: "rgba(255,255,255,0.70)",
  faint: "rgba(255,255,255,0.50)",
  cyan: "#22d3ee",
  indigo: "#818cf8",
  purple: "#a78bfa",
  amber: "#f59e0b",
  red: "#fb7185",
  green: "#34d399",
};

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

function Card({ children, style = {} }) {
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, ...style }}>{children}</div>;
}

function Eyebrow({ children, style = {} }) {
  return <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint, ...style }}>{children}</div>;
}

function Tag({ children, color = C.border, textColor = C.muted }) {
  return <span style={{ padding: "4px 10px", borderRadius: 999, border: `1px solid ${color}`, fontSize: 11, color: textColor, fontFamily: F.m, display: "inline-block" }}>{children}</span>;
}

function MetricCard({ label, value, detail, accent }) {
  return (
    <Card style={{ padding: 18 }}>
      <Eyebrow>{label}</Eyebrow>
      <div style={{ marginTop: 8, fontSize: 28, fontWeight: 700, color: C.text }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12.5, color: accent || C.muted }}>{detail}</div>
    </Card>
  );
}

function MiniBar({ value, color }) {
  return (
    <div style={{ width: "100%", height: 7, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: `${Math.max(4, Math.min(100, value))}%`, height: "100%", background: color, borderRadius: 999 }} />
    </div>
  );
}

function RiskPill({ level }) {
  const map = {
    Low: { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.35)", text: C.green },
    Medium: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", text: C.amber },
    High: { bg: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.35)", text: C.red },
    Critical: { bg: "rgba(251,113,133,0.18)", border: "rgba(251,113,133,0.55)", text: "#ffc1cb" },
  };
  const s = map[level] || map.Medium;
  return <span style={{ padding: "4px 10px", borderRadius: 999, background: s.bg, border: `1px solid ${s.border}`, fontSize: 11, color: s.text, fontFamily: F.m }}>{level}</span>;
}

const baseShipments = [
  { region: "AMER", mode: "Air", lane: "US-MX", otif: 96, cost: 12.4, delay: 1.2, exceptions: 11, severity: 1.1, customs: 0.4, carrier: "FedEx" },
  { region: "AMER", mode: "Ground", lane: "US-CA", otif: 94, cost: 8.1, delay: 1.8, exceptions: 15, severity: 1.2, customs: 0.2, carrier: "FedEx" },
  { region: "EMEA", mode: "Ocean", lane: "NL-UK", otif: 90, cost: 6.4, delay: 3.7, exceptions: 21, severity: 1.4, customs: 0.8, carrier: "Maersk" },
  { region: "EMEA", mode: "Air", lane: "DE-AE", otif: 92, cost: 14.1, delay: 2.8, exceptions: 18, severity: 1.5, customs: 0.7, carrier: "DHL" },
  { region: "APAC", mode: "Ocean", lane: "CN-SG", otif: 87, cost: 5.7, delay: 4.4, exceptions: 27, severity: 1.8, customs: 1.1, carrier: "COSCO" },
  { region: "APAC", mode: "Air", lane: "JP-AU", otif: 93, cost: 13.6, delay: 2.1, exceptions: 14, severity: 1.3, customs: 0.5, carrier: "FedEx" },
  { region: "APAC", mode: "Ground", lane: "IN-AE", otif: 89, cost: 9.8, delay: 3.3, exceptions: 19, severity: 1.6, customs: 0.9, carrier: "BlueDart" },
  { region: "AMER", mode: "Ocean", lane: "US-BR", otif: 88, cost: 7.1, delay: 4.0, exceptions: 22, severity: 1.7, customs: 1.0, carrier: "MSC" },
];

function computeMetrics(mult) {
  const adjusted = baseShipments.map((s) => {
    const delay = s.delay * (1 + mult.disruption * 0.16 + mult.portCongestion * 0.12 - mult.automation * 0.05 - mult.airPriority * (s.mode === "Air" ? 0.08 : 0.01));
    const exceptions = s.exceptions * (1 + mult.disruption * 0.18 + mult.portCongestion * 0.14 - mult.automation * 0.08);
    const cost = s.cost * (1 + mult.fuel * 0.11 + mult.airPriority * (s.mode === "Air" ? 0.09 : 0.02) + mult.disruption * 0.05 - mult.automation * 0.03);
    const otif = Math.max(75, Math.min(99, s.otif - mult.disruption * 2.6 - mult.portCongestion * 2.1 - (delay - s.delay) * 1.2 + mult.automation * 1.4 + (s.mode === "Air" ? mult.airPriority * 1.1 : 0)));
    const probability = Math.max(0.08, Math.min(0.98, 0.22 + delay * 0.07 + s.customs * 0.09 + mult.disruption * 0.08 + mult.portCongestion * 0.06 - mult.automation * 0.05));
    const impact = Math.min(5, Math.max(1, s.severity + mult.disruption * 0.5 + mult.fuel * 0.2 + mult.portCongestion * 0.35));
    const riskScore = probability * impact * 20;
    let riskLevel = "Low";
    if (riskScore >= 65) riskLevel = "Critical";
    else if (riskScore >= 50) riskLevel = "High";
    else if (riskScore >= 32) riskLevel = "Medium";
    return { ...s, delay, exceptions, cost, otif, probability, impact, riskScore, riskLevel };
  });

  const avg = (arr, key) => arr.reduce((a, b) => a + b[key], 0) / arr.length;
  const totalExceptions = adjusted.reduce((a, b) => a + b.exceptions, 0);
  const critical = adjusted.filter((x) => x.riskLevel === "Critical").length;
  const high = adjusted.filter((x) => x.riskLevel === "High").length;
  return {
    rows: adjusted.sort((a, b) => b.riskScore - a.riskScore),
    kpis: {
      otif: avg(adjusted, "otif").toFixed(1),
      delay: avg(adjusted, "delay").toFixed(1),
      cost: avg(adjusted, "cost").toFixed(2),
      exceptions: Math.round(totalExceptions),
      risk: avg(adjusted, "riskScore").toFixed(0),
      critical,
      high,
    },
  };
}

function scenarioNarrative(mult, data) {
  const top = data.rows[0];
  const notes = [];
  if (mult.portCongestion > 0.4) notes.push("port congestion is increasing lead-time variability on ocean-heavy lanes");
  if (mult.disruption > 0.4) notes.push("network disruptions are elevating exception volumes and service risk");
  if (mult.fuel > 0.4) notes.push("fuel inflation is putting pressure on transport cost per unit");
  if (mult.automation > 0.3) notes.push("automation is partially offsetting manual exception handling effort");
  if (mult.airPriority > 0.3) notes.push("air prioritization is improving service on critical lanes at a cost premium");
  return `Current scenario indicates average OTIF at ${data.kpis.otif}% with a risk index of ${data.kpis.risk}. The most exposed lane is ${top.lane} in ${top.region}, where ${notes.slice(0, 2).join(" and ") || "cross-border complexity is driving delay risk"}. Recommended action: prioritize exception triage, reroute critical shipments, and tighten monitoring on high-risk lanes.`;
}

export default function SCMProject() {
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;
  const [mult, setMult] = useState({ fuel: 0.2, disruption: 0.25, portCongestion: 0.3, automation: 0.2, airPriority: 0.15 });

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (_) {} };
  }, []);

  const data = useMemo(() => computeMetrics(mult), [mult]);
  const narrative = useMemo(() => scenarioNarrative(mult, data), [mult, data]);

  const setField = (field, value) => setMult((m) => ({ ...m, [field]: Number(value) }));

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: F.d }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: isMobile ? "18px 14px 60px" : "22px 24px 70px" }}>
        <Card style={{ padding: isMobile ? 18 : 28, background: "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(129,140,248,0.06) 55%, rgba(167,139,250,0.06))", borderColor: "rgba(34,211,238,0.18)" }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.muted, textDecoration: "none", fontSize: 13, marginBottom: 18 }}>
            <ArrowLeft size={15} /> Back to portfolio
          </a>
          <Eyebrow>Project showcase</Eyebrow>
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <div style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, lineHeight: 1.1 }}>Reimagining Logistics — GenAI, Predictive Risk, and Supply Chain Decision Intelligence</div>
          </div>
          <p style={{ marginTop: 14, maxWidth: 920, fontSize: isMobile ? 13.5 : 15, lineHeight: 1.8, color: C.muted }}>
            A manager-style analytics platform designed for global distribution, logistics, and trade operations. It combines KPI visibility, predictive risk scoring, exception management, and scenario planning to show how analytics can influence service, cost, and flow reliability across AMER, EMEA, and APAC.
          </p>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 7 }}>
            <Tag color="rgba(34,211,238,0.35)" textColor={C.cyan}>Supply Chain Analytics</Tag>
            <Tag color="rgba(129,140,248,0.35)" textColor={C.indigo}>Predictive Risk</Tag>
            <Tag color="rgba(167,139,250,0.35)" textColor={C.purple}>Scenario Planning</Tag>
            <Tag color="rgba(245,158,11,0.35)" textColor={C.amber}>Executive Storytelling</Tag>
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr 1fr" : "repeat(6, 1fr)", gap: 12, marginTop: 16 }}>
          <MetricCard label="OTIF" value={`${data.kpis.otif}%`} detail="delivery performance" accent={C.green} />
          <MetricCard label="Avg Delay" value={`${data.kpis.delay}d`} detail="lead-time variability" accent={C.amber} />
          <MetricCard label="Cost / Unit" value={`$${data.kpis.cost}`} detail="transport cost pressure" accent={C.cyan} />
          <MetricCard label="Exceptions" value={`${data.kpis.exceptions}`} detail="active shipment issues" accent={C.red} />
          <MetricCard label="Risk Index" value={data.kpis.risk} detail="probability × severity" accent={C.purple} />
          <MetricCard label="High/Critical" value={`${data.kpis.high + data.kpis.critical}`} detail="priority risk clusters" accent={C.red} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1.15fr 0.85fr", gap: 14, marginTop: 16 }}>
          <Card style={{ padding: isMobile ? 16 : 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Globe2 size={18} color={C.cyan} />
              <div style={{ fontSize: 18, fontWeight: 700 }}>Global operations command view</div>
            </div>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
              {[
                { r: "AMER", service: 93, cost: 76, risk: 44, accent: C.cyan },
                { r: "EMEA", service: 91, cost: 72, risk: 57, accent: C.indigo },
                { r: "APAC", service: 89, cost: 68, risk: 63, accent: C.purple },
              ].map((x) => (
                <Card key={x.r} style={{ padding: 14, borderColor: `${x.accent}38` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Eyebrow>{x.r}</Eyebrow>
                    <Tag color={`${x.accent}38`} textColor={x.accent}>region</Tag>
                  </div>
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: C.muted, marginBottom: 6 }}><span>Service</span><span>{x.service}</span></div>
                      <MiniBar value={x.service} color={C.green} />
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: C.muted, marginBottom: 6 }}><span>Cost efficiency</span><span>{x.cost}</span></div>
                      <MiniBar value={x.cost} color={C.cyan} />
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: C.muted, marginBottom: 6 }}><span>Risk</span><span>{x.risk}</span></div>
                      <MiniBar value={x.risk} color={C.red} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` }}>
              <Eyebrow>Insight narrative</Eyebrow>
              <p style={{ marginTop: 8, fontSize: 13.5, color: C.muted, lineHeight: 1.75 }}>{narrative}</p>
            </div>
          </Card>

          <Card style={{ padding: isMobile ? 16 : 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ShieldAlert size={18} color={C.red} />
              <div style={{ fontSize: 18, fontWeight: 700 }}>Scenario planning controls</div>
            </div>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: C.muted }}>
              Adjust operational stressors to see their impact on service, cost, and risk. This models the decision support expected from a global supply chain analytics leader.
            </p>
            {[
              ["fuel", "Fuel inflation"],
              ["disruption", "Network disruption"],
              ["portCongestion", "Port congestion"],
              ["automation", "Automation maturity"],
              ["airPriority", "Air prioritization"],
            ].map(([key, label]) => (
              <div key={key} style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: C.muted, marginBottom: 6 }}>
                  <span>{label}</span>
                  <span>{Math.round(mult[key] * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={mult[key]} onChange={(e) => setField(key, e.target.value)} style={{ width: "100%" }} />
              </div>
            ))}
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Card style={{ padding: 12 }}><div style={{ fontSize: 12, color: C.muted }}>Recommended posture</div><div style={{ marginTop: 6, fontSize: 14, fontWeight: 700 }}>Protect service on critical lanes</div></Card>
              <Card style={{ padding: 12 }}><div style={{ fontSize: 12, color: C.muted }}>Primary lever</div><div style={{ marginTop: 6, fontSize: 14, fontWeight: 700 }}>Automate exception triage</div></Card>
            </div>
          </Card>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14, marginTop: 16 }}>
          <Card style={{ padding: isMobile ? 16 : 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <TrendingUp size={18} color={C.indigo} />
              <div style={{ fontSize: 18, fontWeight: 700 }}>Predictive analytics and risk scoring</div>
            </div>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: C.muted }}>
              Each lane is evaluated using a simple predictive risk model. Risk score combines probability of disruption with impact severity, giving operations teams a prioritization mechanism instead of a flat list of delays.
            </p>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {data.rows.slice(0, 5).map((row) => (
                <div key={row.lane} style={{ padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{row.lane}</div>
                      <div style={{ marginTop: 4, fontSize: 12.5, color: C.muted }}>{row.region} · {row.mode} · {row.carrier}</div>
                    </div>
                    <RiskPill level={row.riskLevel} />
                  </div>
                  <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
                    <div><div style={{ fontSize: 11, color: C.faint }}>Delay</div><div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>{row.delay.toFixed(1)}d</div></div>
                    <div><div style={{ fontSize: 11, color: C.faint }}>Probability</div><div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>{Math.round(row.probability * 100)}%</div></div>
                    <div><div style={{ fontSize: 11, color: C.faint }}>Impact</div><div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>{row.impact.toFixed(1)}</div></div>
                    <div><div style={{ fontSize: 11, color: C.faint }}>Risk score</div><div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>{row.riskScore.toFixed(0)}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: isMobile ? 16 : 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <AlertTriangle size={18} color={C.amber} />
              <div style={{ fontSize: 18, fontWeight: 700 }}>Risk management register</div>
            </div>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: C.muted }}>
              This section translates predictive signals into management action. It shows how exception analytics, lane risk, and trade complexity can be turned into practical mitigation plans for leadership teams.
            </p>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { risk: "Customs clearance volatility in APAC", owner: "Trade Ops", level: "High", mitigation: "Pre-clear documents and shift urgent volume to alternate hub routing" },
                { risk: "Ocean lead-time instability for EMEA lanes", owner: "Logistics", level: "Medium", mitigation: "Tighten booking windows and rebalance inventory buffers" },
                { risk: "Fuel-driven transport cost escalation", owner: "Finance + Ops", level: "Medium", mitigation: "Monitor mode mix and use scenario triggers for rerouting" },
                { risk: "High manual exception handling effort", owner: "Analytics", level: "Critical", mitigation: "Automate triage rules and route only priority cases to human planners" },
              ].map((r) => (
                <div key={r.risk} style={{ padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.risk}</div>
                    <RiskPill level={r.level} />
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12.5, color: C.muted }}>Owner: {r.owner}</div>
                  <div style={{ marginTop: 8, fontSize: 12.8, lineHeight: 1.7, color: C.muted }}>{r.mitigation}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
          {[
            { icon: Package, title: "KPI visibility", text: "Designs dashboards for OTIF, delays, cost, and exception health." },
            { icon: Route, title: "Scenario modelling", text: "Tests cost-service tradeoffs across lanes, disruptions, and routing choices." },
            { icon: Truck, title: "Operational thinking", text: "Connects analytics to logistics, distribution, and trade execution decisions." },
            { icon: Zap, title: "Insight storytelling", text: "Translates raw signals into executive-ready narratives and actions." },
          ].map((x) => {
            const Icon = x.icon;
            return (
              <Card key={x.title} style={{ padding: 18 }}>
                <Icon size={18} color={C.cyan} />
                <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700 }}>{x.title}</div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: C.muted }}>{x.text}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
