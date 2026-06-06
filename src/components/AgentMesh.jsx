import React from 'react'

/* ════════════════════════════════════════════════════════════════════════
   AGENT MESH — shared SVG visualization
   Orchestrator hex at the center, six worker-agent hexes on a clock dial,
   data tokens travelling along the spokes. Used by the Agentic page hero
   and the home page "Spotlight" section.
   ════════════════════════════════════════════════════════════════════════ */
const MINT = '#48D8A0'
const BLUE = '#4A90E2'
const MONO = '"JetBrains Mono", ui-monospace, monospace'

const ORCH = { x: 300, y: 300 }
const SAT_R = 180
const SATELLITES = [
  { id: 'ingest',   angle: -90,  label: 'Ingest',    icon: 'I' },
  { id: 'parse',    angle: -30,  label: 'Parse',     icon: 'P' },
  { id: 'verify',   angle:  30,  label: 'Verify',    icon: 'V' },
  { id: 'reason',   angle:  90,  label: 'Reason',    icon: 'R' },
  { id: 'compose',  angle: 150,  label: 'Compose',   icon: 'C' },
  { id: 'deliver',  angle: 210,  label: 'Deliver',   icon: 'D' },
]
const polar = (angle, r = SAT_R) => {
  const rad = (angle * Math.PI) / 180
  return { x: ORCH.x + Math.cos(rad) * r, y: ORCH.y + Math.sin(rad) * r }
}

const Hex = ({ cx, cy, r, fill, stroke, opacity = 1 }) => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`
  }).join(' ')
  return <polygon points={pts} fill={fill} stroke={stroke} opacity={opacity} />
}

// Render uniquely per call so multiple instances on the same page don't
// collide on SVG <defs> ids.
let _uid = 0
const nextId = () => `am${++_uid}`

export default function AgentMesh({ showLabels = true, showCompass = true }) {
  // generate per-instance ids so two meshes on one page don't share defs
  const idPrefix = React.useMemo(nextId, [])

  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      style={{ overflow: 'visible' }}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${idPrefix}-orchGlow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor={MINT} stopOpacity="0.55" />
          <stop offset="60%" stopColor={MINT} stopOpacity="0.05" />
          <stop offset="100%" stopColor={MINT} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${idPrefix}-satGlow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor={BLUE} stopOpacity="0.32" />
          <stop offset="80%" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
        <filter id={`${idPrefix}-softGlow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* concentric rings — instrument bezel */}
      {[260, 220, 180, 140].map((r, i) => (
        <circle
          key={r}
          cx={ORCH.x}
          cy={ORCH.y}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray={i === 0 ? '2 6' : i === 2 ? '4 10' : undefined}
        />
      ))}

      {/* outer compass ticks */}
      {showCompass && Array.from({ length: 36 }).map((_, i) => {
        // Skip the north cardinal tick (angle 270, i=27) — on the Agentic
        // page hero, this mint tick lands directly above the orchestrator
        // and inside the top-right AGENTS telemetry tile, reading as a
        // stray vertical streak in the box.
        if (i === 27) return null
        const a = (i * 10 * Math.PI) / 180
        const x1 = ORCH.x + Math.cos(a) * 282
        const y1 = ORCH.y + Math.sin(a) * 282
        const len = i % 3 === 0 ? 12 : 5
        const x2 = ORCH.x + Math.cos(a) * (282 + len)
        const y2 = ORCH.y + Math.sin(a) * (282 + len)
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i % 9 === 0 ? MINT : 'rgba(255,255,255,0.18)'}
            strokeWidth="1"
            opacity={i % 9 === 0 ? 0.7 : 0.35}
          />
        )
      })}

      {/* orchestrator halo */}
      <circle cx={ORCH.x} cy={ORCH.y} r="110" fill={`url(#${idPrefix}-orchGlow)`} />

      {/* spokes + data tokens */}
      {SATELLITES.map((s, i) => {
        const p = polar(s.angle)
        const pathId = `${idPrefix}-spoke-${s.id}`
        return (
          <g key={s.id}>
            <path
              id={pathId}
              d={`M ${ORCH.x} ${ORCH.y} L ${p.x} ${p.y}`}
              stroke="rgba(72,216,160,0.18)"
              strokeWidth="1"
              fill="none"
            />
            <circle r="3" fill={MINT} filter={`url(#${idPrefix}-softGlow)`}>
              <animateMotion
                dur={`${3 + (i % 3) * 0.6}s`}
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.85;1"
                dur={`${3 + (i % 3) * 0.6}s`}
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle r="2" fill={BLUE} opacity="0.6">
              <animateMotion
                dur={`${3.4 + (i % 2) * 0.5}s`}
                begin={`${i * 0.45 + 1.4}s`}
                repeatCount="indefinite"
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
          </g>
        )
      })}

      {/* satellite agents */}
      {SATELLITES.map((s, i) => {
        const p = polar(s.angle)
        const labelOffset = polar(s.angle, SAT_R + 38)
        return (
          <g key={`sat-${s.id}`}>
            <circle cx={p.x} cy={p.y} r="44" fill={`url(#${idPrefix}-satGlow)`} />
            <Hex cx={p.x} cy={p.y} r={22} fill="#0b1426" stroke="rgba(72,216,160,0.55)" />
            <Hex cx={p.x} cy={p.y} r={16} fill="none" stroke="rgba(255,255,255,0.10)" />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily={MONO} fontSize="11" fill={MINT} opacity="0.9">
              {s.icon}
            </text>
            {showLabels && (
              <text x={labelOffset.x} y={labelOffset.y + 4} textAnchor="middle" fontFamily={MONO} fontSize="9.5" letterSpacing="2" fill="rgba(255,255,255,0.55)">
                {s.label.toUpperCase()}
              </text>
            )}
            <circle cx={p.x + 16} cy={p.y - 14} r="2.4" fill={i % 3 === 0 ? MINT : BLUE}>
              <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}

      {/* orchestrator core */}
      <Hex cx={ORCH.x} cy={ORCH.y} r={46} fill="#07111d" stroke={MINT} />
      <Hex cx={ORCH.x} cy={ORCH.y} r={36} fill="none" stroke="rgba(72,216,160,0.30)" />
      <circle cx={ORCH.x} cy={ORCH.y} r="6" fill={MINT}>
        <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <text x={ORCH.x} y={ORCH.y + 4} textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.85)" dy="22">
        ORCHESTRATOR
      </text>
    </svg>
  )
}
