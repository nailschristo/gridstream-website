import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Building2, Shield, Wrench, BarChart3, Award, Landmark, BookOpen, Star, Package } from 'lucide-react'

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
    <div className="pt-20 sm:pt-24">
      <Helmet>
        <title>Gridstream | Federal Government Contracting | SDVOSB | NC HUB Certified</title>
        <meta name="description" content="Gridstream is a Service-Disabled Veteran Owned Small Business (SDVOSB) and NC HUB Certified firm delivering federal contracting excellence — construction, engineering, logistics, material sourcing, and program management. CAGE: 12H34 | UEI: TW2PWH3N98N7" />
        <meta name="keywords" content="federal government contracting, SDVOSB, service-disabled veteran owned small business, NC HUB certified, prime contracting, construction contracts, engineering contracts, logistics, material sourcing, tactical equipment supply, program management, veteran owned business" />
        <meta property="og:title" content="Gridstream | Federal Government Contracting | SDVOSB" />
        <meta property="og:description" content="SDVOSB & NC HUB Certified federal contractor delivering construction, engineering, logistics, material sourcing, and program management." />
        <meta property="og:url" content="https://gridstream.ai/" />
        <link rel="canonical" href="https://gridstream.ai/" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-gradient section-padding container-padding">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-primary-green/20 text-primary-green text-xs sm:text-sm rounded-full border border-primary-green/30 font-medium">
              SDVOSB Certified
            </span>
            <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue text-xs sm:text-sm rounded-full border border-accent-blue/30 font-medium">
              NC HUB Certified
            </span>
          </div>

          <h1 className="hero-text font-bold mb-4 sm:mb-6">
            Federal Contracting
            <span className="text-gradient block">Excellence</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Gridstream is a Service-Disabled Veteran Owned Small Business delivering federal contracting excellence across construction, engineering, logistics, material sourcing, and program management.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-xs sm:max-w-none mx-auto">
            <Link to="/contact" className="glass-button-primary hover-glow">
              Partner With Us
            </Link>
            <Link to="/about" className="glass-button-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 md:py-24 container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-title font-bold mb-3 sm:mb-6">
              Our <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Comprehensive federal contracting solutions backed by veteran leadership and a commitment to mission success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                <div className="w-12 h-12 bg-primary-green/15 rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed flex-grow">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gridstream Section */}
      <section className="py-16 sm:py-20 md:py-24 container-padding bg-primary-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="section-title font-bold mb-3 sm:mb-6">
              Why Choose <span className="text-gradient">Gridstream</span>?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              As a Service-Disabled Veteran Owned Small Business, Gridstream brings the discipline, integrity, and mission-focus of military service to every federal contract.
            </p>
          </div>

          {/* Differentiators — card grid, works great on all screen sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
            {differentiators.map((item, index) => (
              <div key={index} className="glass-card flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent-blue/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-accent-blue" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-1">{item.label}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ready to Work Together card */}
          <div className="glass-card max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white text-center">Ready to Work Together?</h3>
            <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed text-center">
              Whether you're a contracting officer seeking a capable SDVOSB prime or a company looking for a trusted teaming partner — Gridstream is ready to deliver.
            </p>

            <div className="border-t border-white/10 pt-5 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">CAGE Code</p>
                  <p className="text-white font-mono font-semibold">12H34</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">UEI</p>
                  <p className="text-white font-mono font-semibold text-sm">TW2PWH3N98N7</p>
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

      {/* Certifications Banner */}
      <section className="py-12 sm:py-16 container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-primary-green/15 rounded-2xl flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-primary-green" strokeWidth={1.5} />
                </div>
                <h4 className="text-white font-semibold mb-2">SDVOSB Certified</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Service-Disabled Veteran Owned Small Business — eligible for federal set-aside and sole-source awards</p>
              </div>
              <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-x border-white/10 pt-6 sm:pt-0 sm:px-6">
                <div className="w-14 h-14 bg-accent-blue/15 rounded-2xl flex items-center justify-center mb-4">
                  <Landmark className="w-7 h-7 text-accent-blue" strokeWidth={1.5} />
                </div>
                <h4 className="text-white font-semibold mb-2">NC HUB Certified</h4>
                <p className="text-gray-400 text-sm leading-relaxed">North Carolina Historically Underutilized Business — recognized for state and federal procurement opportunities</p>
              </div>
              <div className="flex flex-col items-center border-t sm:border-t-0 border-white/10 pt-6 sm:pt-0">
                <div className="w-14 h-14 bg-primary-green/15 rounded-2xl flex items-center justify-center mb-4">
                  <Star className="w-7 h-7 text-primary-green" strokeWidth={1.5} />
                </div>
                <h4 className="text-white font-semibold mb-2">Veteran-Led</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Founded and operated by service-disabled veterans committed to excellence, integrity, and mission success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">
              Ready to Compete and Win in the Federal Marketplace?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-10 leading-relaxed">
              Partner with Gridstream and leverage our SDVOSB status, federal contracting expertise, and veteran-led team to pursue and win government contracts with confidence.
            </p>
            <Link to="/contact" className="glass-button-primary hover-glow">
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
