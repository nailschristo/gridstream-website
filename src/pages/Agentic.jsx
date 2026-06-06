import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Database, FileSearch, BrainCircuit, Network, Plug, Compass,
  ListChecks, GitBranch, ShieldCheck, Layers, Send,
  UserCheck, ScrollText, Lock, Gauge, ArrowRight
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import AgentMesh from '../components/AgentMesh'

/* ─── Palette refs (kept local so the file is self-contained) ───────────── */
const MINT = '#48D8A0'
const MONO = '"JetBrains Mono", ui-monospace, monospace'

/* ─── Small reusable bits ──────────────────────────────────────────────── */
const HudLabel = ({ children, className = '' }) => (
  <span className={`hud-label text-[10px] ${className}`}>{children}</span>
)

const TelemetryTile = ({ label, value, accent = false, delay = '0s' }) => (
  <div
    className="boot-fade"
    style={{
      animationDelay: delay,
      padding: '10px 14px',
      minWidth: 96,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.14)',
      borderRadius: 4,
      textAlign: 'right',
    }}
  >
    <div style={{
      fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', marginBottom: 4,
    }}>{label}</div>
    <div style={{
      fontFamily: MONO, fontSize: 20, color: accent ? MINT : '#fff',
      fontWeight: 500, fontVariantNumeric: 'tabular-nums',
    }}>{value}</div>
  </div>
)

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */
const Agentic = () => {
  const capabilities = [
    {
      title: 'Data Pipeline Agents',
      icon: Database,
      tag: 'INGEST · TRANSFORM · LOAD',
      description:
        'Agentic ETL that adapts to changing schemas, reconciles dirty inputs, and writes its own validation as it learns the data — replacing brittle hand-coded pipelines.',
    },
    {
      title: 'Document Intelligence',
      icon: FileSearch,
      tag: 'EXTRACT · CLASSIFY · ROUTE',
      description:
        'Parse contracts, RFPs, technical specifications, and regulatory filings into structured, auditable records. Built for the document volume of federal operations.',
    },
    {
      title: 'Decision-Support Agents',
      icon: BrainCircuit,
      tag: 'REASON · RECOMMEND · EXPLAIN',
      description:
        'Reasoning agents that surface options with cited evidence — not opaque answers. Designed for environments where every recommendation needs a paper trail.',
    },
    {
      title: 'Workflow Orchestration',
      icon: Network,
      tag: 'FAN-OUT · VERIFY · SYNTHESIZE',
      description:
        'Multi-agent harnesses that decompose a task, run sub-agents in parallel, adversarially verify findings, and synthesize a single accountable output.',
    },
    {
      title: 'Legacy System Integration',
      icon: Plug,
      tag: 'BRIDGE · MIGRATE · MODERNIZE',
      description:
        'Agents that sit on top of mainframes, custom databases, and proprietary tooling — extending their useful life without forcing a rip-and-replace migration.',
    },
    {
      title: 'Strategic Consulting',
      icon: Compass,
      tag: 'ASSESS · ARCHITECT · DEPLOY',
      description:
        'Where to apply autonomy, where to keep humans in the loop, and how to measure ROI. Engagements grounded in federal compliance and procurement realities.',
    },
  ]

  const stages = [
    { n: '01', title: 'Plan',       icon: ListChecks,  body: 'Orchestrator decomposes the brief into a typed task graph — every step accountable, every dependency explicit.' },
    { n: '02', title: 'Fan-out',    icon: GitBranch,   body: 'Sub-agents execute in parallel across data, documents, and tools — each scoped to a single, verifiable job.' },
    { n: '03', title: 'Verify',     icon: ShieldCheck, body: 'Adversarial review agents try to refute each finding. What survives gets a confidence score and a citation.' },
    { n: '04', title: 'Synthesize', icon: Layers,      body: 'Verified outputs are merged into a single artifact — report, record, decision packet, or downstream API call.' },
    { n: '05', title: 'Deliver',    icon: Send,        body: 'Results land in the systems that already run your operation: SharePoint, Salesforce, Jira, dbt, S3, or a custom UI.' },
  ]

  const phases = [
    { tag: 'PHASE 01', name: 'Discovery',  weeks: '1–2 wks',  body: 'Workshop with stakeholders. Map the workflow, the data, the constraints, and the success metric. Out: a written scope and a no-go decision if the fit isn\'t there.' },
    { tag: 'PHASE 02', name: 'Pilot',      weeks: '4–6 wks',  body: 'Build a narrow, end-to-end agent against real data in a controlled environment. Measured against the success metric from Phase 01.' },
    { tag: 'PHASE 03', name: 'Production', weeks: '8–12 wks', body: 'Harden, instrument, document, and deploy. Includes audit logging, observability, role-based access, and a runbook your team owns.' },
    { tag: 'PHASE 04', name: 'Iteration',  weeks: 'Ongoing',  body: 'Quarterly review of agent behavior, drift, cost, and impact. Adjust the harness as your data, models, and policy environment evolve.' },
  ]

  const guardrails = [
    { icon: UserCheck,   title: 'Human-in-the-loop',  body: 'Defined checkpoints where an operator approves before the agent takes a consequential action.' },
    { icon: ScrollText,  title: 'Full audit trails',  body: 'Every decision, every tool call, every model invocation logged with inputs, outputs, and timing.' },
    { icon: Gauge,       title: 'Deterministic where it counts', body: 'Reasoning is agentic; execution paths that demand reproducibility stay rule-based by design.' },
    { icon: Lock,        title: 'Compliance-aware',   body: 'Designed around FISMA, NIST 800-53, and agency-specific data handling rules. On-premise and air-gapped deployments supported.' },
  ]

  return (
    <div>
      <Helmet>
        <title>Agentic Workflows | Gridstream — AI &amp; Autonomous Systems for Federal Operations</title>
        <meta name="description" content="Gridstream designs, builds, and deploys agentic workflows for federal data processing, document intelligence, and decision-support — with audit trails, human-in-the-loop guardrails, and compliance-aware deployments." />
        <meta name="keywords" content="agentic workflows, AI agents, federal AI consulting, government data processing, document intelligence, autonomous systems, decision support, multi-agent orchestration, FISMA, NIST 800-53, on-premise AI" />
        <meta property="og:title" content="Agentic Workflows | Gridstream — AI for Federal Operations" />
        <meta property="og:description" content="Custom agentic systems for federal data, documents, and decisions — built with audit trails, human checkpoints, and on-premise deployment options." />
        <meta property="og:url" content="https://gridstream.ai/agentic" />
        <link rel="canonical" href="https://gridstream.ai/agentic" />
      </Helmet>

      {/* ═══════════════════════════════════════════════════════════════
          HERO — agent mesh
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 'min(880px, 100vh)',
          background: '#07111d',
        }}
      >
        {/* local blueprint grid, masked to weight the right side */}
        <div className="boot-fade" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 100% 90% at 75% 50%, #000 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 90% at 75% 50%, #000 25%, transparent 80%)',
        }} />

        {/* mint depth halo behind the mesh */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 55% 80% at 78% 55%, rgba(72,216,160,0.12) 0%, rgba(72,216,160,0) 60%)',
        }} />

        {/* left-side fade to soften mesh edge */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: 'linear-gradient(90deg, #07111d 0%, #07111d 24%, rgba(7,17,29,0.85) 40%, rgba(7,17,29,0) 58%)',
        }} />

        {/* corner brackets */}
        <div className="boot-fade" style={{ animationDelay: '0.1s', position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
          {[
            { top: 22, left: 22, bt: 1, bl: 1 },
            { top: 22, right: 22, bt: 1, br: 1 },
            { bottom: 22, left: 22, bb: 1, bl: 1 },
            { bottom: 22, right: 22, bb: 1, br: 1 },
          ].map((s, i) => (
            <span key={i} style={{
              position: 'absolute', width: 18, height: 18,
              borderColor: 'rgba(255,255,255,0.14)', borderStyle: 'solid', borderWidth: 0,
              top: s.top, left: s.left, right: s.right, bottom: s.bottom,
              borderTopWidth: s.bt || 0, borderLeftWidth: s.bl || 0,
              borderRightWidth: s.br || 0, borderBottomWidth: s.bb || 0,
            }} />
          ))}
        </div>

        {/* rotated mono spine */}
        <div className="hidden lg:block boot-fade" style={{
          animationDelay: '0.25s', position: 'absolute', left: 30, top: '50%',
          transform: 'translateY(-50%) rotate(180deg)', writingMode: 'vertical-rl',
          fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.42)', zIndex: 3,
        }}>
          Autonomous Systems Group — Agentic Operations
        </div>

        {/* agent mesh visualization */}
        <div
          className="boot-fade absolute pointer-events-none"
          style={{
            animationDelay: '0.3s',
            right: '-4%', top: '50%', transform: 'translateY(-50%)',
            width: 'min(720px, 60vw)', aspectRatio: '1 / 1', zIndex: 1,
          }}
        >
          <AgentMesh />
        </div>

        {/* telemetry tiles (top-right) */}
        <div className="hidden lg:flex" style={{
          position: 'absolute', top: 110, right: 56, zIndex: 3,
          flexDirection: 'column', gap: 14, alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <TelemetryTile label="Agents" value="06" delay="0.55s" />
            <TelemetryTile label="Active Tasks" value="14" delay="0.65s" />
            <TelemetryTile label="Avg Latency" value="1.8s" delay="0.75s" />
          </div>
          <div className="boot-fade" style={{
            animationDelay: '0.95s',
            fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: MINT,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 999, background: MINT,
              boxShadow: `0 0 8px ${MINT}`,
              animation: 'gridPulse 1.6s ease-in-out infinite',
            }} />
            Mesh · Nominal
          </div>
        </div>

        {/* copy block */}
        <div className="relative z-[4] px-6 pt-32 pb-32 sm:px-10 lg:absolute lg:left-24 lg:top-1/2 lg:-translate-y-1/2 lg:px-0 lg:pt-0 lg:pb-0 lg:max-w-[600px]">
          {/* eyebrow */}
          <div className="boot" style={{
            animationDelay: '0.15s', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26,
          }}>
            <span className="cursor-blink" style={{
              width: 7, height: 7, borderRadius: 999, background: MINT,
              boxShadow: `0 0 10px ${MINT}`,
            }} />
            <span style={{
              fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.64)',
            }}>
              AI &amp; Autonomous Systems · Operational
            </span>
          </div>

          {/* headline */}
          <h1
            style={{
              fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
              fontWeight: 600, lineHeight: 0.94, letterSpacing: '-0.035em',
              margin: 0, marginBottom: 28,
            }}
            className="text-[clamp(3rem,9.5vw,5.75rem)]"
          >
            <span className="boot-line"><span style={{ animationDelay: '0.30s' }}>From data</span></span>
            <span className="boot-line"><span style={{ animationDelay: '0.44s' }}>to <em style={{ fontStyle: 'normal', color: MINT }}>decision.</em></span></span>
          </h1>

          <p
            className="boot text-base sm:text-[17px]"
            style={{
              animationDelay: '0.72s',
              fontFamily: '"Hanken Grotesk", system-ui, sans-serif',
              lineHeight: 1.55, color: 'rgba(255,255,255,0.64)',
              maxWidth: 500, margin: 0, marginBottom: 38,
            }}
          >
            Gridstream designs, builds, and deploys agentic workflows for the
            data, documents, and decisions that move federal operations —
            with the audit trails, guardrails, and accountability the
            mission demands.
          </p>

          <div className="boot flex flex-col sm:flex-row gap-3" style={{ animationDelay: '0.86s' }}>
            <Link to="/contact" className="glass-button-primary">Schedule a discovery</Link>
            <a href="#anatomy" className="glass-button-secondary">How it works ↓</a>
          </div>
        </div>

        {/* bottom datum strip */}
        <div className="hidden lg:flex boot-fade" style={{
          animationDelay: '1s', position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3,
          alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 56px', borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(0deg, rgba(4,10,18,0.6), transparent)',
          backdropFilter: 'blur(2px)',
        }}>
          {[
            { l: 'Stack',      v: 'Python · Node · Rust · TS' },
            { l: 'Models',     v: 'Claude · GPT · Open-weight' },
            { l: 'Deployment', v: 'Cloud · On-prem · Air-gapped' },
            { l: 'Status',     v: '● Accepting engagements', accent: true },
          ].map((d, i, arr) => (
            <React.Fragment key={d.l}>
              <div style={{
                flex: '1 1 0', minWidth: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', gap: 3,
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)',
                }}>{d.l}</span>
                <span style={{
                  fontFamily: MONO, fontSize: 12, letterSpacing: '0.04em',
                  whiteSpace: 'nowrap', color: d.accent ? MINT : '#fff',
                }}>{d.v}</span>
              </div>
              {i < arr.length - 1 && (
                <span style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.08)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MANIFESTO — short prose explainer
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          <div data-reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-primary-green text-xs tracking-[0.2em]">00</span>
              <span className="boot-rule h-px w-10 bg-white/25 inline-block" />
              <span className="hud-label text-[11px] text-white/45">Premise</span>
            </div>
            <h2 className="section-title font-display font-semibold text-white leading-[1.04]">
              Not chatbots.<br />
              <span className="text-primary-green">Operations.</span>
            </h2>
          </div>

          <div className="space-y-5 text-dim text-base sm:text-[17px] leading-relaxed" data-reveal style={{ transitionDelay: '120ms' }}>
            <p>
              Most "AI" pilots stop at a demo. Gridstream builds <span className="text-white font-medium">agentic
              systems that ship</span> — autonomous workflows that take ownership of a task,
              call the tools they need, verify their own output, and deliver into the
              systems your team already runs.
            </p>
            <p>
              We treat agents the way we treat any federal capability: with explicit
              scope, measurable performance, full instrumentation, and a clear chain of
              accountability. The aesthetic is mission control, not magic.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CAPABILITIES
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="01"
            eyebrow="Capabilities"
            title="What we"
            accent="build."
            subtitle="Six surfaces where agentic systems consistently out-perform traditional automation — and where Gridstream has the harness to deploy them safely."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className="glass-card flex flex-col"
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-primary-green/[0.12] rounded-md flex items-center justify-center border border-primary-green/20">
                    <c.icon className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.18em] text-white/40 mt-1">
                    {c.tag}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 text-white">{c.title}</h3>
                <p className="text-dim text-sm leading-relaxed flex-grow">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ANATOMY — stages of an agentic workflow
          ═══════════════════════════════════════════════════════════════ */}
      <section id="anatomy" className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="02"
            eyebrow="Anatomy"
            title="How an agentic workflow"
            accent="runs."
            subtitle="Every workflow we ship follows the same accountable shape — five named stages, measurable at each handoff."
          />

          {/* desktop: horizontal pipeline */}
          <div className="hidden lg:block" data-reveal>
            <div className="relative pt-8 pb-4 px-2">
              {/* base rail */}
              <div className="absolute left-[8%] right-[8%] top-[100px] h-px bg-white/[0.10]" />
              {/* mint progress overlay */}
              <div
                className="absolute left-[8%] top-[100px] h-px"
                style={{
                  width: '84%',
                  background: 'linear-gradient(90deg, transparent, rgba(72,216,160,0.55), transparent)',
                  animation: 'gridPulse 4.5s ease-in-out infinite',
                }}
              />

              <div className="grid grid-cols-5 gap-4 relative">
                {stages.map((s, i) => (
                  <div key={s.n} className="flex flex-col items-center text-center">
                    <span className="hud-label text-[10px] mb-3 text-white/45">{s.n}</span>
                    <div className="relative">
                      <div
                        className="w-[60px] h-[60px] flex items-center justify-center"
                        style={{
                          background: '#07111d',
                          border: `1px solid ${MINT}`,
                          clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
                        }}
                      >
                        <s.icon className="w-6 h-6 text-primary-green" strokeWidth={1.5} />
                      </div>
                      <span
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary-green"
                        style={{
                          boxShadow: `0 0 8px ${MINT}`,
                          animation: 'blink 1.4s steps(1) infinite',
                          animationDelay: `${i * 0.25}s`,
                        }}
                      />
                    </div>
                    <h4 className="mt-5 text-white font-display font-semibold text-lg">{s.title}</h4>
                    <p className="text-dim text-sm leading-relaxed mt-2 max-w-[200px]">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* mobile: vertical stack */}
          <div className="lg:hidden space-y-4">
            {stages.map((s, i) => (
              <div
                key={s.n}
                className="glass-card flex items-start gap-4"
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: '#07111d',
                    border: `1px solid ${MINT}`,
                    clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
                  }}
                >
                  <s.icon className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-primary-green">{s.n}</span>
                    <h4 className="text-white font-display font-semibold text-base">{s.title}</h4>
                  </div>
                  <p className="text-dim text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ENGAGEMENT MODEL — phased timeline
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="03"
            eyebrow="Engagement"
            title="A phased path to"
            accent="production."
            subtitle="From first conversation to a deployed, instrumented, audited system — without committing to scope you can't yet validate."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {phases.map((p, i) => (
              <div
                key={p.name}
                className="glass-card relative flex flex-col"
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {/* small connector arrow on desktop */}
                {i < phases.length - 1 && (
                  <span className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center text-primary-green/60">
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-primary-green">{p.tag}</span>
                  <span className="font-mono text-[10px] tracking-[0.05em] text-white/50">{p.weeks}</span>
                </div>

                <h3 className="text-xl font-display font-semibold mb-2 text-white">{p.name}</h3>
                <p className="text-dim text-sm leading-relaxed flex-grow">{p.body}</p>

                {/* phase progress bar */}
                <div className="mt-5 h-px bg-white/[0.08] relative overflow-hidden">
                  <span
                    className="absolute inset-y-0 left-0 bg-primary-green/60"
                    style={{ width: `${(i + 1) * 25}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          GUARDRAILS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          <div>
            <SectionHeader
              index="04"
              eyebrow="Guardrails"
              title="Autonomy with a"
              accent="leash."
              align="left"
            />
            <p className="text-dim text-sm sm:text-base leading-relaxed max-w-md" data-reveal>
              Every Gridstream agent is shipped with the controls that make it
              deployable in a federal environment — by default, not as an afterthought.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {guardrails.map((g, i) => (
              <div
                key={g.title}
                className="glass-card flex items-start gap-4"
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 bg-accent-blue/[0.12] rounded-md flex items-center justify-center flex-shrink-0 border border-accent-blue/20">
                  <g.icon className="w-5 h-5 text-accent-blue" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-white font-display font-semibold text-base mb-1">{g.title}</h4>
                  <p className="text-dim text-sm leading-relaxed">{g.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center" data-reveal>
          <div className="glass-card">
            <div className="flex items-center justify-center gap-2.5 mb-5">
              <span className="cursor-blink w-1.5 h-1.5 rounded-full bg-primary-green" style={{ boxShadow: `0 0 10px ${MINT}` }} />
              <HudLabel className="text-white/55">Mission · Open</HudLabel>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold mb-5 text-white leading-tight">
              Have a workflow that should be running <span className="text-primary-green">autonomously?</span>
            </h2>
            <p className="text-dim text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              A 30-minute discovery call. We map the workflow, evaluate fit, and tell you straight whether agentic is the right tool — or whether something simpler will get you there faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="glass-button-primary">
                Schedule a discovery →
              </Link>
              <Link to="/about" className="glass-button-secondary">
                About Gridstream
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Agentic
