import React from 'react'
import { Link } from 'react-router-dom'
import { SHOW_AGENTIC } from '../config'

const Footer = () => {
  return (
    <footer className="bg-primary-dark/90 border-t border-white/[0.08] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img
                src="/Gridstream White.svg"
                alt="Gridstream"
                className="h-7 w-auto"
              />
            </div>
            <p className="text-white/60 mb-5 max-w-md leading-relaxed text-sm">
              A veteran-owned firm specializing in federal government contracting — delivering excellence across training &amp; graphic design, engineering, logistics, material sourcing, and program management.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-primary-green/[0.12] text-primary-green text-xs rounded border border-primary-green/30 tracking-wide">
                SDVOSB Certified
              </span>
              <span className="px-2.5 py-1 bg-primary-green/[0.12] text-primary-green text-xs rounded border border-primary-green/30 tracking-wide">
                VOSB Certified
              </span>
              <span className="px-2.5 py-1 bg-accent-blue/[0.12] text-accent-blue text-xs rounded border border-accent-blue/30 tracking-wide">
                NC HUB Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="hud-label text-[11px] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-primary-green transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-primary-green transition-colors text-sm">
                  About Us
                </Link>
              </li>
              {SHOW_AGENTIC && (
                <li>
                  <Link to="/agentic" className="text-white/70 hover:text-primary-green transition-colors text-sm">
                    Agentic Workflows
                  </Link>
                </li>
              )}
              <li>
                <Link to="/contact" className="text-white/70 hover:text-primary-green transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="hud-label text-[11px] mb-4">Business Info</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex flex-col">
                <span className="hud-label text-[10px] mb-0.5">CAGE Code</span>
                <span className="font-mono text-white tracking-wide">12H34</span>
              </li>
              <li className="flex flex-col mt-2">
                <span className="hud-label text-[10px] mb-0.5">UEI</span>
                <span className="font-mono text-white tracking-wide">TW2PWH3N98N7</span>
              </li>
              <li className="flex flex-col mt-2">
                <span className="hud-label text-[10px] mb-0.5">Email</span>
                <a href="mailto:contact@gridstream.ai" className="text-primary-green hover:underline">
                  contact@gridstream.ai
                </a>
              </li>
              <li className="flex flex-col mt-2">
                <span className="hud-label text-[10px] mb-0.5">Phone</span>
                <a href="tel:+19199267100" className="text-white/70 hover:text-primary-green transition-colors">
                  (919) 926-7100
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.08] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Gridstream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
