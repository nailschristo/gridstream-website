import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Building2, Shield, Wrench, BarChart3, Award, Landmark, BookOpen, Star, Package } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'

const Home = () => {
  const services = [
    {
      title: 'Construction',
      description: 'Federal construction contracts executed with precision — from design-build and new construction to renovation and facility improvements.',
      icon: Building2
    },
    {
      title: 'Engineering',
      description: 'Civil, mechanical, and systems engineering contract execution supporting federal agency infrastructure and mission requirements.',
      icon: Wrench
    },
    {
      title: 'Logistics',
      description: 'Supply chain management, transportation coordination, and distribution support ensuring mission-critical materials reach their destination.',
      icon: Shield
    },
    {
      title: 'Material Sourcing',
      description: 'Procurement of tactical equipment, fuel, and mission-critical materials to meet federal and defense agency requirements.',
      icon: Package
    },
    {
      title: 'Program Management',
      description: 'End-to-end contract execution, oversight, and delivery management ensuring performance, compliance, and mission success.',
      icon: BarChart3
    }
  ]

  const differentiators = [
    {
      label: 'SDVOSB Certified',
      description: 'Eligible for set-aside and sole-source federal contracts',
      icon: Award
    },
    {
      label: 'NC HUB Certified',
      description: 'Recognized Historically Underutilized Business',
      icon: Landmark
    },
    {
      label: 'Federal Marketplace Expertise',
      description: 'Deep knowledge of government contracting regulations and processes',
      icon: BookOpen
    },
    {
      label: 'Veteran-Led Leadership',
      description: 'Military discipline and integrity driving every engagement',
      icon: Star
    }
  ]

  return (
    <div>
      <Helmet>
        <title>Gridstream | Federal Government Contracting | SDVOSB | NC HUB Certified</title>
        <meta name="description" content="Gridstream is a Service-Disabled Veteran Owned Small Business (SDVOSB) and NC HUB Certified firm delivering federal contracting excellence — construction, engineering, logistics, material sourcing, and program management. CAGE: 12H34 | UEI: TW2PWH3N98N7" />
        <meta name="keywords" content="federal government contracting, SDVOSB, service-disabled veteran owned small business, NC HUB certified, prime contracting, construction contracts, engineering contracts, logistics, material sourcing, tactical equipment supply, program management, veteran owned business" />
        <meta property="og:title" content="Gridstream | Federal Government Contracting | SDVOSB" />
        <meta property="og:description" content="SDVOSB & NC HUB Certified federal contractor delivering construction, engineering, logistics, material sourcing, and program management." />
        <meta property="og:url" content="https://gridstream.ai/" />
        <link rel="canonical" href="https://gridstream.ai/" />
      </Helmet>

      {/* Hero Section — "Flight Director" (Mission Control) */}
      <Hero />

      {/* Capabilities */}
      <section className="section-padding container-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="01"
            eyebrow="Capabilities"
            title="From requirement to"
            accent="result."
            subtitle="Comprehensive federal contracting solutions backed by veteran leadership and a commitment to mission success."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card flex flex-col"
                data-reveal
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-11 h-11 bg-primary-green/[0.12] rounded-md flex items-center justify-center mb-4 flex-shrink-0 border border-primary-green/20">
                  <service.icon className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-dim text-sm leading-relaxed flex-grow">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gridstream */}
      <section className="section-padding container-padding border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="02"
            eyebrow="Why Gridstream"
            title="Military discipline, federal"
            accent="results."
            subtitle="As a Service-Disabled Veteran Owned Small Business, Gridstream brings the discipline, integrity, and mission-focus of military service to every federal contract."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="glass-card flex items-start space-x-4"
                data-reveal
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-10 h-10 bg-accent-blue/[0.12] rounded-md flex items-center justify-center flex-shrink-0 border border-accent-blue/20">
                  <item.icon className="w-5 h-5 text-accent-blue" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-white font-display font-semibold text-base mb-1">{item.label}</h4>
                  <p className="text-dim text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ready to Work Together */}
          <div className="glass-card max-w-2xl mx-auto" data-reveal>
            <h3 className="text-xl font-display font-semibold mb-2 text-white text-center">Ready to Work Together?</h3>
            <p className="text-dim mb-6 text-sm sm:text-base leading-relaxed text-center">
              Whether you're a contracting officer seeking a capable SDVOSB prime or a company looking for a trusted teaming partner — Gridstream is ready to deliver.
            </p>

            <div className="border-t border-white/[0.08] pt-5 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="hud-label text-[10px] mb-1">CAGE Code</p>
                  <p className="text-white font-mono font-medium tracking-wider">12H34</p>
                </div>
                <div>
                  <p className="hud-label text-[10px] mb-1">UEI</p>
                  <p className="text-white font-mono font-medium tracking-wider text-sm">TW2PWH3N98N7</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="flex-1 text-center glass-button-primary">
                New Inquiry
              </Link>
              <Link to="/about" className="flex-1 text-center glass-button-secondary">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding container-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            index="03"
            eyebrow="Accreditation"
            title="Certified to"
            accent="compete."
            subtitle="Gridstream's certifications open doors to exclusive federal contracting opportunities and demonstrate our commitment to the highest standards."
          />
          <div className="glass-card" data-reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-primary-green/[0.12] rounded-md flex items-center justify-center mb-4 border border-primary-green/20">
                  <Award className="w-7 h-7 text-primary-green" strokeWidth={1.5} />
                </div>
                <h4 className="text-white font-display font-semibold mb-2">SDVOSB Certified</h4>
                <p className="text-dim text-sm leading-relaxed">Service-Disabled Veteran Owned Small Business — eligible for federal set-aside and sole-source awards</p>
              </div>
              <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-x border-white/[0.08] pt-6 sm:pt-0 sm:px-6">
                <div className="w-14 h-14 bg-accent-blue/[0.12] rounded-md flex items-center justify-center mb-4 border border-accent-blue/20">
                  <Landmark className="w-7 h-7 text-accent-blue" strokeWidth={1.5} />
                </div>
                <h4 className="text-white font-display font-semibold mb-2">NC HUB Certified</h4>
                <p className="text-dim text-sm leading-relaxed">North Carolina Historically Underutilized Business — recognized for state and federal procurement opportunities</p>
              </div>
              <div className="flex flex-col items-center border-t sm:border-t-0 border-white/[0.08] pt-6 sm:pt-0">
                <div className="w-14 h-14 bg-primary-green/[0.12] rounded-md flex items-center justify-center mb-4 border border-primary-green/20">
                  <Star className="w-7 h-7 text-primary-green" strokeWidth={1.5} />
                </div>
                <h4 className="text-white font-display font-semibold mb-2">Veteran-Led</h4>
                <p className="text-dim text-sm leading-relaxed">Founded and operated by service-disabled veterans committed to excellence, integrity, and mission success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-padding">
        <div className="max-w-4xl mx-auto text-center" data-reveal>
          <div className="glass-card">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold mb-4 sm:mb-6 text-white leading-tight">
              Ready to compete and win in the <span className="text-primary-green">federal marketplace?</span>
            </h2>
            <p className="text-dim text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Partner with Gridstream and leverage our SDVOSB status, federal contracting expertise, and veteran-led team to pursue and win government contracts with confidence.
            </p>
            <Link to="/contact" className="glass-button-primary">
              Start the conversation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
