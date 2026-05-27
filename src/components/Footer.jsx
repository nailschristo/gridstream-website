import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-primary-dark/90 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img 
                src="/Gridstream White.svg" 
                alt="Gridstream" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-5 max-w-md leading-relaxed">
              A Service-Disabled Veteran Owned Small Business specializing in federal government contracting — delivering excellence across construction, engineering, logistics, material sourcing, and program management.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-green/20 text-primary-green text-xs rounded-full border border-primary-green/30 font-medium">
                SDVOSB Certified
              </span>
              <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue text-xs rounded-full border border-accent-blue/30 font-medium">
                NC HUB Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Business Info</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex flex-col">
                <span className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">CAGE Code</span>
                <span className="font-mono text-white">12H34</span>
              </li>
              <li className="flex flex-col mt-2">
                <span className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">UEI</span>
                <span className="font-mono text-white">TW2PWH3N98N7</span>
              </li>
              <li className="flex flex-col mt-2">
                <span className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Email</span>
                <a href="mailto:contact@gridstream.ai" className="text-primary-green hover:underline">
                  contact@gridstream.ai
                </a>
              </li>
              <li className="flex flex-col mt-2">
                <span className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Phone</span>
                <a href="tel:+16318739814" className="text-gray-300 hover:text-primary-green transition-colors">
                  (631) 873-9814
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Gridstream. All rights reserved. Service-Disabled Veteran Owned Small Business.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
