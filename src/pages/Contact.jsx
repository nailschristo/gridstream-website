import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { verifyCaptcha, sanitizeFormData, validationPatterns } from '../utils/formSecurity'
import { Mail, Phone } from 'lucide-react'

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()

  const scrollToFormTop = () => {
    const formElement = document.querySelector('.glass-card')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const showAlert = (message, isError = false) => {
    const alertElement = document.createElement('div')
    alertElement.className = isError
      ? 'fixed top-24 left-0 right-0 mx-auto max-w-md p-4 bg-red-500/90 text-white rounded-lg shadow-lg z-50 text-center'
      : 'fixed top-24 left-0 right-0 mx-auto max-w-md p-4 bg-primary-green/90 text-white rounded-lg shadow-lg z-50 text-center'
    alertElement.textContent = message
    document.body.appendChild(alertElement)
    setTimeout(() => { alertElement.remove() }, 5000)
  }

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '')
    if (phoneNumber.length === 0) return ''
    else if (phoneNumber.length <= 3) return `(${phoneNumber}`
    else if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    else return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
    setValue('phone', formatted)
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      let recaptchaToken = ''
      try { recaptchaToken = await verifyCaptcha() } catch (e) { console.error('reCAPTCHA error:', e) }
      const sanitizedData = sanitizeFormData(data)
      const timestamp = new Date().toISOString()
      const formData = { ...sanitizedData, phone: phoneNumber, formType: 'contact', timestamp, recaptchaToken }
      const encodedData = new URLSearchParams()
      encodedData.append('form-name', 'contact')
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'bot-field') return
        if (Array.isArray(value)) encodedData.append(key, value.join(', '))
        else if (value !== undefined && value !== null) encodedData.append(key, value)
      })
      let netlifySuccess = false
      try {
        const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encodedData.toString() })
        netlifySuccess = r.ok
      } catch (e) { console.error('Netlify form error:', e) }
      let webhookSuccess = false
      try {
        const r = await fetch('https://tnelson.app.n8n.cloud/webhook/348fa6ec-25ab-41ae-be11-7bbb43308a2a', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
        webhookSuccess = r.ok
      } catch (e) { console.error('Webhook error:', e) }
      if (netlifySuccess || webhookSuccess) {
        setIsSubmitted(true)
        reset()
        setPhoneNumber('')
        showAlert("Thank you for reaching out! We'll be in touch within 24 hours.")
        setTimeout(() => { setIsSubmitted(false) }, 5000)
      } else {
        throw new Error('All form submission methods failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrorMessage('There was an error submitting your inquiry. Please try again or contact us directly.')
      scrollToFormTop()
      showAlert('There was an error submitting your inquiry. Please try again or contact us directly.', true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Form data — preserved for when the form is re-enabled
  const services = [
    'Prime Contracting', 'Training & Graphic Design', 'Engineering',
    'Logistics', 'Material Sourcing', 'Fuel Supply Contracts',
    'Tactical Equipment Supply', 'Program Management', 'Teaming Opportunities'
  ]
  const industries = [
    'Federal Government', 'Department of Defense', 'State & Local Government',
    'Defense Contracting', 'Education & Training', 'Technology', 'Other'
  ]

  // Contact form component — hidden until ready to enable
  // To re-enable: set SHOW_FORM = true
  const SHOW_FORM = false

  const ContactForm = () => (
    <div className="glass-card">
      <h2 className="text-2xl font-bold mb-2 text-white">Send Us a Message</h2>
      <p className="text-gray-400 text-sm mb-6">We typically respond within one business day.</p>
      {isSubmitted && (
        <div className="mb-6 p-4 bg-primary-green/20 border border-primary-green/30 rounded-lg">
          <p className="text-primary-green font-medium">Thank you for reaching out! We'll be in touch within 24 hours.</p>
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 font-medium">{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact" />
        <div hidden><input name="bot-field" {...register('bot-field')} /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">First Name *</label>
            <input type="text" {...register('firstName', { required: 'First name is required', pattern: validationPatterns.name })} className="w-full form-input" placeholder="John" />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Last Name *</label>
            <input type="text" {...register('lastName', { required: 'Last name is required', pattern: validationPatterns.name })} className="w-full form-input" placeholder="Doe" />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Email Address *</label>
          <input type="email" {...register('email', { required: 'Email is required', pattern: validationPatterns.email })} className="w-full form-input" placeholder="john.doe@agency.gov" />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Phone Number</label>
          <input type="tel" name="phone" value={phoneNumber} onChange={handlePhoneChange} className="w-full form-input" placeholder="(555) 123-4567" maxLength="14" />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Organization / Agency *</label>
          <input type="text" {...register('company', { required: 'Organization name is required', pattern: validationPatterns.company })} className="w-full form-input" placeholder="Your Agency or Company" />
          {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>}
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Sector</label>
          <select {...register('industry')} className="w-full form-select">
            <option value="">Select your sector</option>
            {industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-white font-medium mb-4">Areas of Interest</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service) => (
              <label key={service} className="flex items-start space-x-3 text-gray-300 cursor-pointer hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-white/5 min-h-[3rem]">
                <input type="checkbox" value={service} {...register('services')} className="w-5 h-5 mt-0.5 flex-shrink-0 rounded border-2 border-white/30 bg-white/10 text-primary-green focus:ring-2 focus:ring-primary-green focus:ring-offset-0 focus:border-primary-green checked:bg-primary-green checked:border-primary-green" />
                <span className="text-sm select-none leading-relaxed">{service}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Message *</label>
          <textarea {...register('message', { required: 'Please provide details about your inquiry' })} rows={4} className="w-full form-input resize-none" placeholder="Tell us about your contracting needs, teaming opportunities, or how we can support your federal mission..." />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" className="w-full glass-button-primary hover-glow" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )

  return (
    <div>
      <Helmet>
        <title>Contact Gridstream | SDVOSB · VOSB · NC HUB Certified Federal Contractor</title>
        <meta name="description" content="Contact Gridstream — an SDVOSB, VOSB, and NC HUB certified federal contractor. Reach us at contact@gridstream.ai or (919) 926-7100. CAGE: 12H34 | UEI: TW2PWH3N98N7" />
        <meta name="keywords" content="contact Gridstream, SDVOSB contractor contact, VOSB, NC HUB certified, federal contracting inquiry, teaming partner, training development, graphic design, engineering, logistics, material sourcing, veteran owned business contact" />
        <meta property="og:title" content="Contact Gridstream | SDVOSB · VOSB · NC HUB Certified" />
        <meta property="og:description" content="Partner with Gridstream — an SDVOSB, VOSB & NC HUB certified federal contractor. Contact us for training &amp; graphic design, engineering, logistics, material sourcing, and teaming opportunities." />
        <meta property="og:url" content="https://gridstream.ai/contact" />
        <link rel="canonical" href="https://gridstream.ai/contact" />
      </Helmet>

      {/* Page hero */}
      <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 container-padding overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="boot flex items-center justify-center gap-2.5 mb-6" style={{ animationDelay: '0.05s' }}>
            <span className="cursor-blink w-1.5 h-1.5 rounded-full bg-primary-green" style={{ boxShadow: '0 0 10px #48D8A0' }} />
            <span className="hud-label text-[11px]">Open for Engagement · 24h Response</span>
          </div>
          <h1 className="boot hero-text font-display font-semibold leading-[1.02]" style={{ animationDelay: '0.16s' }}>
            Partner with <span className="text-primary-green">Gridstream</span>
          </h1>
          <p className="boot text-base sm:text-lg text-dim max-w-2xl mx-auto leading-relaxed mt-6" style={{ animationDelay: '0.3s' }}>
            Whether you're a contracting officer seeking a capable veteran-owned prime, or a company looking for a trusted teaming partner — Gridstream is ready to deliver.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 container-padding border-t border-white/[0.06] pt-16">
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-12 ${SHOW_FORM ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>

            {/* Contact Form — set SHOW_FORM = true above to re-enable */}
            {SHOW_FORM && <ContactForm />}

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <div className="glass-card" data-reveal>
                <h3 className="text-xl font-display font-semibold mb-5 text-white">Contact Us Directly</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-green/[0.12] rounded-md flex items-center justify-center flex-shrink-0 border border-primary-green/20">
                      <Mail className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="hud-label text-[10px] mb-1">Email</p>
                      <a href="mailto:contact@gridstream.ai" className="text-primary-green hover:underline font-medium">
                        contact@gridstream.ai
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-green/[0.12] rounded-md flex items-center justify-center flex-shrink-0 border border-primary-green/20">
                      <Phone className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="hud-label text-[10px] mb-1">Phone</p>
                      <a href="tel:+19199267100" className="text-white hover:text-primary-green transition-colors font-medium">
                        (919) 926-7100
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Gridstream */}
              <div className="glass-card" data-reveal style={{ transitionDelay: '80ms' }}>
                <h3 className="text-xl font-display font-semibold mb-4 text-white">Why Partner With Gridstream?</h3>
                <ul className="space-y-3 text-dim">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <span>SDVOSB, VOSB &amp; NC HUB certified — eligible for federal set-aside, sole-source, and state HUB awards</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <span>Veteran-led team with deep federal contracting expertise</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <span>Full-spectrum capabilities — training development, engineering, logistics, and material sourcing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <span>Proven teaming network across federal contracting sectors</span>
                  </li>
                </ul>
              </div>

              {/* Business Identifiers */}
              <div className="glass-card" data-reveal style={{ transitionDelay: '160ms' }}>
                <h3 className="hud-label text-[11px] mb-4">Federal Business Identifiers</h3>
                <div className="space-y-4">
                  <div>
                    <p className="hud-label text-[10px] mb-1">CAGE Code</p>
                    <p className="text-white font-mono text-xl font-medium tracking-widest">12H34</p>
                  </div>
                  <div>
                    <p className="hud-label text-[10px] mb-1">UEI</p>
                    <p className="text-white font-mono text-lg font-medium tracking-widest">TW2PWH3N98N7</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-primary-green/[0.12] text-primary-green text-xs rounded border border-primary-green/30 tracking-wide">SDVOSB</span>
                    <span className="px-2.5 py-1 bg-primary-green/[0.12] text-primary-green text-xs rounded border border-primary-green/30 tracking-wide">VOSB</span>
                    <span className="px-2.5 py-1 bg-accent-blue/[0.12] text-accent-blue text-xs rounded border border-accent-blue/30 tracking-wide">NC HUB</span>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="glass-card" data-reveal style={{ transitionDelay: '240ms' }}>
                <h3 className="text-xl font-display font-semibold mb-4 text-white">What Happens Next?</h3>
                <div className="space-y-4">
                  {[
                    ['01', 'Initial Consultation', "We'll schedule a call to understand your contracting needs and objectives"],
                    ['02', 'Tailored Strategy', 'We develop a customized approach aligned with your goals and the federal marketplace'],
                    ['03', 'Execution & Delivery', 'We execute with precision, accountability, and a commitment to mission success'],
                  ].map(([n, title, body]) => (
                    <div key={n} className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-primary-green/[0.12] text-primary-green rounded-md flex items-center justify-center text-xs font-mono font-medium flex-shrink-0 border border-primary-green/25">{n}</div>
                      <div>
                        <h4 className="text-white font-medium">{title}</h4>
                        <p className="text-mute text-sm mt-0.5">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
