import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollReveal from './components/ScrollReveal'
import Home from './pages/Home'
import About from './pages/About'
import Agentic from './pages/Agentic'
import Contact from './pages/Contact'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <ScrollReveal />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/agentic" element={<Agentic />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
