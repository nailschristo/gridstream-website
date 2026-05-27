import React from 'react'

// Datum-line section header — a numbered, grid-breaking technical divider.
//
//   01 ─────────  CAPABILITIES
//   Big display title with an optional mint emphasis word.
//
// Props:
//   index    — "01" etc. (mono)
//   eyebrow  — short uppercase label (mono)
//   title    — main heading (string; use `accent` to mint-tint a trailing word)
//   accent   — optional word appended in mint
//   subtitle — optional supporting line
//   align    — 'left' | 'center'
const SectionHeader = ({ index, eyebrow, title, accent, subtitle, align = 'center' }) => {
  const centered = align === 'center'
  return (
    <div
      className={`mb-12 sm:mb-16 ${centered ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-3xl'}`}
      data-reveal
    >
      {/* Datum line: index · rule · eyebrow */}
      <div className={`flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`}>
        {index && (
          <span className="font-mono text-primary-green text-xs tracking-[0.2em]">{index}</span>
        )}
        <span className="boot-rule h-px w-10 bg-white/25 inline-block" />
        {eyebrow && (
          <span className="hud-label text-[11px] text-white/45">{eyebrow}</span>
        )}
      </div>

      <h2 className="section-title font-display font-semibold text-white leading-[1.02]">
        {title}
        {accent && <span className="text-primary-green"> {accent}</span>}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-sm sm:text-base leading-relaxed text-dim ${centered ? 'mx-auto' : ''} max-w-2xl`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
