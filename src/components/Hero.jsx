import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Globe } from '../lib/globe'

// ─── Palette ────────────────────────────────────────────────────────────────
const PALETTE = {
  mint: '#48D8A0',
  mintGlow: 'rgba(72,216,160,0.35)',
  blue: '#4A90E2',
  white: '#FFFFFF',
  dim: 'rgba(255,255,255,0.64)',
  mute: 'rgba(255,255,255,0.42)',
  hairline: 'rgba(255,255,255,0.08)',
  hairlineStrong: 'rgba(255,255,255,0.14)',
  bg: '#07111d',
}

const DISPLAY = '"Bricolage Grotesque", system-ui, sans-serif'
const MONO = '"JetBrains Mono", ui-monospace, monospace'

// ─── Strategic logistics nodes ──────────────────────────────────────────────
const CITIES = {
  raleigh:   { lat: 35.78, lng:  -78.64 },
  norfolk:   { lat: 36.85, lng:  -76.29 },
  sandiego:  { lat: 32.72, lng: -117.16 },
  honolulu:  { lat: 21.30, lng: -157.86 },
  anchorage: { lat: 61.22, lng: -149.90 },
  stuttgart: { lat: 48.78, lng:    9.18 },
  bahrain:   { lat: 26.06, lng:   50.55 },
  tokyo:     { lat: 35.68, lng:  139.69 },
  diegoG:    { lat: -7.31, lng:   72.41 },
  djibouti:  { lat: 11.59, lng:   43.15 },
  guam:      { lat: 13.44, lng:  144.79 },
  london:    { lat: 51.51, lng:   -0.13 },
}
const ALL_ROUTES = [
  ['raleigh', 'stuttgart'], ['raleigh', 'bahrain'], ['sandiego', 'tokyo'],
  ['norfolk', 'london'], ['honolulu', 'guam'], ['anchorage', 'djibouti'],
  ['tokyo', 'bahrain'], ['raleigh', 'diegoG'],
  // densified network — more freight lanes lit up
  ['raleigh', 'tokyo'], ['norfolk', 'bahrain'], ['sandiego', 'honolulu'],
  ['honolulu', 'tokyo'], ['anchorage', 'tokyo'], ['stuttgart', 'bahrain'],
  ['stuttgart', 'djibouti'], ['london', 'bahrain'], ['guam', 'djibouti'],
  ['sandiego', 'guam'], ['bahrain', 'diegoG'], ['tokyo', 'diegoG'],
]
const ALL_NODES = ['raleigh', 'stuttgart', 'bahrain', 'tokyo', 'sandiego', 'norfolk', 'honolulu', 'anchorage', 'guam', 'djibouti', 'london', 'diegoG']

const arcs = ALL_ROUTES.map(([a, b], i) => ({
  from: [CITIES[a].lat, CITIES[a].lng],
  to: [CITIES[b].lat, CITIES[b].lng],
  color: 0x48d8a0,
  duration: 4200 + (i % 3) * 600,
  delay: i * 750,
}))
const points = ALL_NODES.map((k) => ({ lat: CITIES[k].lat, lng: CITIES[k].lng, color: 0x48d8a0 }))

// ─── GlobeView ──────────────────────────────────────────────────────────────
function GlobeView({ options, style }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const g = new Globe(ref.current, options)
    return () => g.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }} />
}

// ─── HUD chrome ─────────────────────────────────────────────────────────────
function HudTile({ label, value, delay }) {
  return (
    <div className="boot-fade" style={{
      animationDelay: delay,
      padding: '10px 14px', minWidth: 82,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${PALETTE.hairlineStrong}`,
      borderRadius: 4, textAlign: 'right',
    }}>
      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: PALETTE.mute, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: MONO, fontSize: 22, color: PALETTE.white, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  )
}

function CornerBrackets({ inset = 22, size = 18, color = PALETTE.hairlineStrong }) {
  const arm = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 }
  return (
    <div className="boot-fade" style={{ animationDelay: '0.1s', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <span style={{ ...arm, top: inset, left: inset, borderTopWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...arm, top: inset, right: inset, borderTopWidth: 1, borderRightWidth: 1 }} />
      <span style={{ ...arm, bottom: inset, left: inset, borderBottomWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...arm, bottom: inset, right: inset, borderBottomWidth: 1, borderRightWidth: 1 }} />
    </div>
  )
}

const monoLbl = { fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: PALETTE.mute }

// Datum-strip cell
function Datum({ label, value, mintValue }) {
  return (
    <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 3 }}>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: PALETTE.mute }}>{label}</span>
      <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.04em', whiteSpace: 'nowrap', color: mintValue ? PALETTE.mint : PALETTE.white }}>{value}</span>
    </div>
  )
}
const datumDivider = <span style={{ width: 1, height: 26, background: PALETTE.hairline }} />

// ═════════════════════════════════════════════════════════════════════════════
//  HERO — "Flight Director"
// ═════════════════════════════════════════════════════════════════════════════
const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: PALETTE.bg, color: PALETTE.white }}
    >
      {/* Local blueprint grid — ties the hero to the global atmosphere */}
      <div className="boot-fade" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 30% 50%, #000 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 30% 50%, #000 30%, transparent 80%)',
      }} />

      {/* Depth halo behind the globe */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 65% 95% at 92% 55%, rgba(38,62,100,0.42) 0%, rgba(38,62,100,0) 65%)',
      }} />

      {/* Globe — right, partly off-frame */}
      <GlobeView
        options={{
          surface: 'graticule',
          arcs, points,
          arcColor: 0x48d8a0, accentColor: 0x48d8a0, atmosphereColor: 0x48d8a0,
          atmosphereIntensity: 1.25, graticuleOpacity: 0.34, innerColor: 0x07111d,
          tilt: 0.36, pitch: 0.4, yaw: -0.7, rotationSpeed: 0.0005,
          cameraDistance: 3.8,
        }}
        style={{ left: '38%', right: '-12%', top: '-10%', bottom: '-6%' }}
      />

      {/* Left fade — masks the globe silhouette into the page */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(90deg, #07111d 0%, #07111d 28%, rgba(7,17,29,0.85) 42%, rgba(7,17,29,0) 60%)',
      }} />

      <CornerBrackets />

      {/* Vertical spine — far-left rotated mono label (desktop) */}
      <div className="hidden lg:block boot-fade" style={{
        animationDelay: '0.2s', position: 'absolute', left: 30, top: '50%',
        transform: 'translateY(-50%) rotate(180deg)', writingMode: 'vertical-rl',
        fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: PALETTE.mute, zIndex: 2,
      }}>
        Federal Operations Network — EST. Raleigh NC
      </div>

      {/* Top-right telemetry (desktop) */}
      <div className="hidden lg:flex" style={{ position: 'absolute', top: 110, right: 56, flexDirection: 'column', gap: 14, alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <HudTile label="Awards" value="24" delay="0.60s" />
          <HudTile label="Ops Centers" value="04" delay="0.70s" />
          <HudTile label="Agencies" value="11" delay="0.80s" />
        </div>
        <div className="boot-fade" style={{ animationDelay: '0.95s', ...monoLbl, color: PALETTE.mint, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: PALETTE.mint, boxShadow: `0 0 8px ${PALETTE.mint}`, animation: 'gridPulse 1.6s ease-in-out infinite' }} />
          Network · Nominal
        </div>
      </div>

      {/* Copy block */}
      <div className="relative z-[2] px-6 pt-32 pb-28 sm:px-10 lg:absolute lg:left-24 lg:top-1/2 lg:-translate-y-1/2 lg:px-0 lg:pt-0 lg:pb-0 lg:max-w-[600px]">
        {/* Eyebrow */}
        <div className="boot" style={{ animationDelay: '0.15s', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
          <span className="cursor-blink" style={{ width: 7, height: 7, borderRadius: 999, background: PALETTE.mint, boxShadow: `0 0 10px ${PALETTE.mint}` }} />
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: PALETTE.dim }}>
            Veteran-Owned Federal Prime · SDVOSB
          </span>
        </div>

        {/* Headline — clip line-reveal */}
        <h1 style={{
          fontFamily: DISPLAY, fontWeight: 600, lineHeight: 0.94, letterSpacing: '-0.035em',
          margin: 0, marginBottom: 28,
        }} className="text-[clamp(3.25rem,11vw,6.5rem)]">
          <span className="boot-line"><span style={{ animationDelay: '0.30s' }}>From requirement</span></span>
          <span className="boot-line"><span style={{ animationDelay: '0.44s' }}>to <em style={{ fontStyle: 'normal', color: PALETTE.mint }}>delivery.</em></span></span>
        </h1>

        <p className="boot text-base sm:text-[17px]" style={{ animationDelay: '0.72s', fontFamily: '"Hanken Grotesk", system-ui, sans-serif', lineHeight: 1.55, color: PALETTE.dim, maxWidth: 480, margin: 0, marginBottom: 38 }}>
          The accountable prime when the mission can't slip — trusted across
          logistics, supply, engineering, and program oversight.
        </p>

        <div className="boot flex flex-col sm:flex-row gap-3" style={{ animationDelay: '0.86s' }}>
          <Link to="/contact" className="glass-button-primary">Start a contract</Link>
          <Link to="/about" className="glass-button-secondary">Capabilities statement →</Link>
        </div>
      </div>

      {/* Bottom datum strip (desktop) — composed instrument bar */}
      <div className="hidden lg:flex boot-fade" style={{
        animationDelay: '1s', position: 'absolute', left: 0, right: 0, bottom: 0,
        alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 56px', borderTop: `1px solid ${PALETTE.hairline}`,
        background: 'linear-gradient(0deg, rgba(4,10,18,0.6), transparent)',
        backdropFilter: 'blur(2px)', zIndex: 2,
      }}>
        <Datum label="Gridstream HQ" value="35.78°N · 78.64°W · RDU" />
        {datumDivider}
        <Datum label="CAGE" value="12H34" />
        {datumDivider}
        <Datum label="UEI" value="TW2PWH3N98N7" />
        {datumDivider}
        <Datum label="Status" value="● Operational" mintValue />
      </div>
    </section>
  )
}

export default Hero
