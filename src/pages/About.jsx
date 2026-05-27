import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ShieldCheck, Trophy, Target, Handshake, Award, Landmark } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

const About = () => {
  const values = [
    {
      title: 'Integrity',
      description: 'Military values are the foundation of every client relationship, partnership, and contract we execute.',
      icon: ShieldCheck
    },
    {
      title: 'Excellence',
      description: 'We hold ourselves to the highest standards of performance, compliance, and delivery on every engagement.',
      icon: Trophy
    },
    {
      title: 'Mission Focus',
      description: 'Every contract is a mission. We plan, execute, and deliver with the discipline and accountability instilled through military service.',
      icon: Target
    },
    {
      title: 'Partnership',
      description: 'We build lasting relationships with clients, teaming partners, and agencies to create shared success in the federal marketplace.',
      icon: Handshake
    }
  ]

  const capabilities = [
    'Construction Contracts', 'Design-Build Projects', 'Facility Renovation',
    'Civil Engineering', 'Mechanical Engineering', 'Systems Engineering',
    'Logistics & Supply Chain', 'Transportation & Distribution', 'Fuel Supply Contracts',
    'Tactical Equipment Supply', 'Material Procurement', 'Program Management',
    'Project Management', 'Contract Management', 'Teaming & Partnerships',
    'Compliance & Regulatory Support'
  ]

  return (
    <div>
      <Helmet>
        <title>About Gridstream | SDVOSB · VOSB · NC HUB Certified Federal Contractor</title>
        <meta name="description" content="Learn about Gridstream — an SDVOSB, VOSB, and NC HUB certified federal contractor specializing in construction, engineering, logistics, material sourcing, and program management. CAGE: 12H34 | UEI: TW2PWH3N98N7" />
        <meta name="keywords" content="about Gridstream, SDVOSB federal contractor, VOSB, veteran owned small business, NC HUB certified, veteran owned business, prime contracting, construction contracts, engineering contracts, logistics, material sourcing, tactical equipment supply, program management, CAGE 12H34" />
        <meta property="og:title" content="About Gridstream | SDVOSB · VOSB · NC HUB Certified" />
        <meta property="og:description" content="Gridstream is an SDVOSB, VOSB, and NC HUB certified federal contractor — built on military values, proven expertise, and a commitment to mission success." />
        <meta property="og:url" content="https://gridstream.ai/about" />
        <link rel="canonical" href="https://gridstream.ai/about" />
      </Helmet>

      {/* Page hero */}
      <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-24 container-padding overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="boot flex items-center justify-center gap-2.5 mb-6" style={{ animationDelay: '0.05s' }}>
            <span className="cursor-blink w-1.5 h-1.5 rounded-full bg-primary-green" style={{ boxShadow: '0 0 10px #48D8A0' }} />
            <span className="hud-label text-[11px]">Veteran-Owned · Federal Prime</span>
          </div>
          <h1 className="boot hero-text font-display font-semibold leading-[1.02]" style={{ animationDelay: '0.16s' }}>
            About <span className="text-primary-green">Gridstream</span>
          </h1>
          <p className="boot text-base sm:text-lg text-dim max-w-2xl mx-auto leading-relaxed mt-6" style={{ animationDelay: '0.3s' }}>
            A veteran-owned federal contractor built on military values, federal contracting expertise, and an unwavering commitment to mission success.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <SectionHeader
              index="01"
              eyebrow="Mission"
              title="Built on"
              accent="service."
              align="left"
            />
            <div className="space-y-5 text-dim text-sm sm:text-base leading-relaxed" data-reveal>
              <p>Gridstream is a veteran-owned federal contractor delivering a full spectrum of services across construction, engineering, logistics, and material sourcing. We bring military discipline and strategic expertise to every contract we pursue and perform.</p>
              <p>We compete for and execute federal contracts with precision — from design-build construction and engineering projects to fuel supply, tactical equipment procurement, and end-to-end program management.</p>
              <p>From prime contracting to tactical equipment supply, Gridstream delivers with the precision, integrity, and accountability that only a veteran-led organization can provide.</p>
            </div>
          </div>

          <div className="glass-card lg:mt-2" data-reveal style={{ transitionDelay: '120ms' }}>
            <h3 className="text-xl font-display font-semibold mb-3 text-white">Our Vision</h3>
            <p className="text-dim text-sm sm:text-base mb-6 leading-relaxed">
              To be the federal marketplace's most trusted veteran-owned contractor — known for delivering results, building powerful teaming relationships, and setting the standard for integrity and performance in government contracting.
            </p>
            <div className="border-t border-white/[0.08] pt-6">
              <h4 className="hud-label text-[11px] mb-4">Key Differentiators</h4>
              <ul className="space-y-3 text-dim">
                {[
                  'Eligible for federal set-aside and sole-source contract awards',
                  'Full-spectrum contract execution — construction, engineering, logistics, and supply',
                  'Proven teaming network across federal contracting sectors',
                  'Veteran-led leadership with deep federal marketplace expertise',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="02"
            eyebrow="Values"
            title="How we"
            accent="operate."
            subtitle="The same values that define military service define how we do business."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((value, index) => (
              <div key={index} className="glass-card text-center" data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="w-12 h-12 bg-primary-green/[0.12] rounded-md flex items-center justify-center mb-4 mx-auto border border-primary-green/20">
                  <value.icon className="w-6 h-6 text-primary-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 text-white">{value.title}</h3>
                <p className="text-dim text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="03"
            eyebrow="Capabilities"
            title="A full spectrum of"
            accent="execution."
            subtitle="From pursuit to performance — the contract types Gridstream is built to deliver."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="glass-effect p-3 sm:p-4 rounded-md text-center hover:bg-white/[0.07] transition-colors duration-200"
                data-reveal
                style={{ transitionDelay: `${index * 35}ms` }}
              >
                <span className="text-white/85 font-medium text-xs sm:text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="04"
            eyebrow="Accreditation"
            title="Certifications &"
            accent="registrations."
            subtitle="Gridstream's certifications open doors to exclusive federal contracting opportunities and demonstrate our commitment to the highest standards."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            <div className="glass-card" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-green/[0.12] rounded-md flex items-center justify-center flex-shrink-0 border border-primary-green/20">
                  <Award className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">SDVOSB Certified</h3>
              </div>
              <p className="text-dim text-sm leading-relaxed mb-4">
                Gridstream is proudly certified as a Service-Disabled Veteran-Owned Business. This certification reflects our commitment to military values of integrity and service, and makes Gridstream eligible for set-aside contracts and sole-source awards across federal agencies.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-primary-green/[0.12] text-primary-green text-xs rounded border border-primary-green/30 tracking-wide">Set-Aside Eligible</span>
                <span className="px-2.5 py-1 bg-primary-green/[0.12] text-primary-green text-xs rounded border border-primary-green/30 tracking-wide">Sole-Source Eligible</span>
              </div>
            </div>

            <div className="glass-card" data-reveal style={{ transitionDelay: '120ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-green/[0.12] rounded-md flex items-center justify-center flex-shrink-0 border border-primary-green/20">
                  <ShieldCheck className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">VOSB Certified</h3>
              </div>
              <p className="text-dim text-sm leading-relaxed mb-4">
                Gridstream is a verified Veteran-Owned Small Business (VOSB). VOSB status qualifies us for the U.S. Department of Veterans Affairs "Vets First" program and veteran set-aside opportunities across federal agencies.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-primary-green/[0.12] text-primary-green text-xs rounded border border-primary-green/30 tracking-wide">Vets First</span>
                <span className="px-2.5 py-1 bg-primary-green/[0.12] text-primary-green text-xs rounded border border-primary-green/30 tracking-wide">Veteran Set-Aside</span>
              </div>
            </div>

            <div className="glass-card" data-reveal style={{ transitionDelay: '240ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent-blue/[0.12] rounded-md flex items-center justify-center flex-shrink-0 border border-accent-blue/20">
                  <Landmark className="w-5 h-5 text-accent-blue" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">NC HUB Certified</h3>
              </div>
              <p className="text-dim text-sm leading-relaxed mb-4">
                Gridstream holds North Carolina Historically Underutilized Business (HUB) certification, recognizing our status as a minority and disadvantaged business enterprise. This supports our pursuit of state and federally-funded procurement opportunities across North Carolina and beyond.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-accent-blue/[0.12] text-accent-blue text-xs rounded border border-accent-blue/30 tracking-wide">State Procurement</span>
                <span className="px-2.5 py-1 bg-accent-blue/[0.12] text-accent-blue text-xs rounded border border-accent-blue/30 tracking-wide">Federal Procurement</span>
              </div>
            </div>
          </div>

          <div className="glass-card max-w-2xl mx-auto" data-reveal>
            <h3 className="hud-label text-[11px] mb-6 text-center">Federal Business Identifiers</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="hud-label text-[10px] mb-2">CAGE Code</p>
                <p className="text-white font-mono text-xl sm:text-2xl font-medium tracking-widest">12H34</p>
              </div>
              <div className="text-center">
                <p className="hud-label text-[10px] mb-2">UEI</p>
                <p className="text-white font-mono text-base sm:text-xl font-medium tracking-widest break-all">TW2PWH3N98N7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-padding border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center" data-reveal>
          <div className="glass-card">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold mb-5 text-white leading-tight">
              Ready to partner with <span className="text-primary-green">Gridstream?</span>
            </h2>
            <p className="text-dim text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Whether you're a federal agency seeking a capable veteran-owned contractor or a company looking for a trusted teaming partner, Gridstream is ready to deliver.
            </p>
            <Link to="/contact" className="glass-button-primary">
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
