import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Agentic', href: '/agentic' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:pt-4">
      <nav className={`max-w-7xl mx-auto glass-nav transition-all duration-500 ease-in-out overflow-hidden ${
        isMenuOpen ? 'shadow-2xl' : ''
      }`}>
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/Gridstream White.svg"
              alt="Gridstream"
              className="h-6 w-auto"
            />
          </Link>

          {/* Desktop Navigation — absolutely centered in the bar */}
          <div className="hidden md:flex items-center gap-1 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3.5 py-1.5 rounded-full text-sm tracking-wide transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-primary-green bg-white/[0.06]'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/contact" className="glass-button-cta">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? 'max-h-96 opacity-100 mt-4 pb-4'
            : 'max-h-0 opacity-0 mt-0 pb-0'
        }`}>
          <div className="border-t border-white/[0.10] pt-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 transform ${
                    isMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  } ${
                    isActive(item.href)
                      ? 'bg-white/[0.06] text-primary-green'
                      : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2.5 bg-primary-green text-ink rounded-lg text-sm font-semibold text-center mt-1 transition-all duration-300 transform ${
                  isMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${navigation.length * 100}ms` : '0ms'
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
