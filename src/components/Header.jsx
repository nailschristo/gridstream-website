import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className={`max-w-7xl mx-auto glass-nav transition-all duration-500 ease-in-out overflow-hidden ${
        isMenuOpen ? 'mobile-nav-expanded' : ''
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/Gridstream White.svg" 
              alt="Gridstream" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'text-white hover:bg-white/10 hover:text-primary-green'
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
            className="md:hidden glass-button p-2 transition-transform duration-300"
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
            ? 'max-h-96 opacity-100 mt-6 pb-6' 
            : 'max-h-0 opacity-0 mt-0 pb-0'
        }`}>
          <div className="border-t border-white/20 pt-6">
            <div className="flex flex-col space-y-3">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform ${
                    isMenuOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  } ${
                    isActive(item.href)
                      ? 'bg-white/20 text-white backdrop-blur-sm'
                      : 'text-white hover:bg-white/10 hover:text-primary-green'
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
                className={`px-4 py-3 bg-primary-green text-white rounded-lg text-base font-medium text-center mt-2 hover:bg-primary-green/90 transition-all duration-300 transform ${
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
