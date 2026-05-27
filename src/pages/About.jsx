import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ShieldCheck, Trophy, Target, Handshake, Award, Landmark } from 'lucide-react'

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
    'Construction Contracts',
    'Design-Build Projects',
    'Facility Renovation',
    'Civil Engineering',
    'Mechanical Engineering',
    'Systems Engineering',
    'Logistics & Supply Chain',
    'Transportation & Distribution',
    'Fuel Supply Contracts',
    'Tactical Equipment Supply',
    'Material Procurement',
    'Program Management',
    'Project Management',
    'Contract Management',
    'Teaming & Partnerships',
    'Compliance & Regulatory Support'
  ]

  return (
    <div className="pt-20 sm:pt-24">
      <Helmet>
        <title>About Gridstream | SDVOSB Federal Contractor | NC HUB Certified</title>
        <meta name="description" content="Learn about Gridstream — a Service-Disabled Veteran Owned Small Business (SDVOSB) and NC HUB Certified federal contractor specializing in construction, engineering, logistics, material sourcing, and program management. CAGE: 12H34 | UEI: TW2PWH3N98N7" />
        <meta name="keywords" content="about Gridstream, SDVOSB federal contractor, NC HUB certified, veteran owned business, prime contracting, construction contracts, engineering contracts, logistics, material sourcing, tactical equipment supply, program management, CAGE 12H34" />
        <meta property="og:title" content="About Gridstream | SDVOSB Federal Contractor" />
        <meta property="og:description" content="Gridstream is a Service-Disabled Veteran Owned Small Business delivering federal contracting excellence — built on military values, proven expertise, and a commitment to mission success." />
        <meta property="og:url" content="https://gridstream.ai/about" />
        <link rel="canonical" href="https://gridstream.ai/about" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-gradient section-padding container-padding">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-5 sm:mb-6">
            <span className="px-3 py-1 bg-primary-green/20 text-primary-green text-xs sm:text-sm rounded-full border border-primary-green/30 font-medium">
              SDVOSB Certified
            </span>
            <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue text-xs sm:text-sm rounded-full border border-accent-blue/30 font-medium">
              NC HUB Certified
            </span>
          </div>
          <h1 className="hero-text font-bold mb-4 sm:mb-6">
            About <span className="text-gradient">Gridstream</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
            A Service-Disabled Veteran Owned Small Business built on military values, federal contracting expertise, and an unwavering commitment to mission success.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-14 sm:py-20 container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="section-title font-bold mb-5 sm:mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                Gridstream is a federal government contractor delivering a full spectrum of services across construction, engineering, logistics, and material sourcing. As a Service-Disabled Veteran Owned Small Business and NC HUB Certified firm, we bring military discipline and strategic expertise to every contract we pursue and perform.
              </p>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                We compete for and execute federal contracts with precision — from design-build construction and engineering projects to fuel supply, tactical equipment procurement, and end-to-end program management.
              </p>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                From prime contracting to tactical equipment supply, Gridstream delivers with the precision, integrity, and accountability that only a veteran-led organization can provide.
              </p>
            </div>

            <div className="glass-card">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Our Vision</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                To be the federal marketplace's most trusted Service-Disabled Veteran Owned contractor — known for delivering results, building powerful teaming relationships, and setting the standard for integrity and performance in government contracting.
              </p>
              <div className="border-t border-white/20 pt-5 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Key Differentiators</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">SDVOSB & NC HUB certified — eligible for set-aside and sole-source awards</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">Full-spectrum contract execution — construction, engineering, logistics, and supply</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">Proven teaming network across federal contracting sectors</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">Veteran-led leadership with deep federal marketplace expertise</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-14 sm:py-20 container-padding bg-primary-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-title font-bold mb-3 sm:mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The same values that define military service define how we do business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass-card text-center hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 bg-primary-green/15 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <value.icon className="w-7 h-7 text-primary-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{value.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-14 sm:py-20 container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-title font-bold mb-3 sm:mb-4">
              Our <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              A full spectrum of federal contracting capabilities — from pursuit to performance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {capabilities.map((capability, index) => (
              <div key={index} className="glass-effect p-3 sm:p-4 rounded-lg text-center hover:bg-white/10 transition-colors duration-200">
                <span className="text-white font-medium text-xs sm:text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDVOSB & Certifications Section */}
      <section className="py-14 sm:py-20 container-padding bg-primary-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="section-title font-bold mb-3 sm:mb-4">
              Certifications & <span className="text-gradient">Registrations</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Gridstream's certifications open doors to exclusive federal contracting opportunities and demonstrate our commitment to the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
            {/* SDVOSB Card */}
            <div className="glass-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-green/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">SDVOSB Certified</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                Gridstream is proudly certified as a Service-Disabled Veteran Owned Small Business (SDVOSB). This certification reflects our commitment to bringing military values of integrity, excellence, and service to federal contracting. SDVOSB status makes Gridstream eligible for set-aside contracts and sole-source awards across federal agencies.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary-green/20 text-primary-green text-xs rounded border border-primary-green/30">Set-Aside Eligible</span>
                <span className="px-2 py-1 bg-primary-green/20 text-primary-green text-xs rounded border border-primary-green/30">Sole-Source Eligible</span>
              </div>
            </div>

            {/* NC HUB Card */}
            <div className="glass-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent-blue/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-5 h-5 text-accent-blue" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">NC HUB Certified</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                Gridstream holds North Carolina Historically Underutilized Business (HUB) certification, recognizing our status as a minority and disadvantaged business enterprise. This certification supports our pursuit of state and federally-funded procurement opportunities across North Carolina and beyond.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-accent-blue/20 text-accent-blue text-xs rounded border border-accent-blue/30">State Procurement</span>
                <span className="px-2 py-1 bg-accent-blue/20 text-accent-blue text-xs rounded border border-accent-blue/30">Federal Procurement</span>
              </div>
            </div>
          </div>

          {/* Business Identifiers */}
          <div className="glass-card max-w-2xl mx-auto">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-5 sm:mb-6 text-center">Federal Business Identifiers</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">CAGE Code</p>
                <p className="text-white font-mono text-xl sm:text-2xl font-bold tracking-wider">12H34</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">UEI</p>
                <p className="text-white font-mono text-base sm:text-xl font-bold tracking-wider break-all">TW2PWH3N98N7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">
              Ready to Partner With Gridstream?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              Whether you're a federal agency seeking a capable SDVOSB contractor or a company looking for a trusted teaming partner, Gridstream is ready to deliver.
            </p>
            <Link to="/contact" className="glass-button-primary hover-glow">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
