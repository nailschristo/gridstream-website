import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import { verifyCaptcha, sanitizeFormData, validationPatterns } from '../utils/formSecurity'
import { Phone, AlertTriangle, CheckCircle2, Copy, Search, Wrench } from 'lucide-react'
import { SUPPORT_WEBHOOK_URL, SUPPORT_ACCESS_CODE } from '../config'

// Ticket IDs double as the status-lookup key, so the random suffix must be
// unguessable — 6 chars from a 31-char ambiguity-free alphabet (~900M/day).
const generateTicketId = () => {
  const now = new Date()
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  const bytes = new Uint8Array(6)
  crypto.getRandomValues(bytes)
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
  return `GS-${date}-${suffix}`
}

const REQUESTER_ROLES = [
  'Contracting Officer’s Representative (COR)',
  'Boiler Plant Operator',
  'HVAC Technician',
  'Facilities Management',
  'Contracting Officer',
  'Other VA Staff',
]

const EQUIPMENT_OPTIONS = [
  'Chiller 1 — York YMC2-S3517AB (SN SLGM427590)',
  'Chiller 2 — York YMC2-S3517AB (SN SLGM427610)',
  'Chiller 3 — Trane CVHF1070 (SN L09B06301)',
  'Cooling Tower / Condenser Water System',
  'Multiple Units',
  'Other / Not Sure',
]

const Support = () => {
  const [searchParams] = useSearchParams()
  const [submittedTicket, setSubmittedTicket] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [copied, setCopied] = useState(false)
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
    defaultValues: { accessCode: searchParams.get('code') || '' },
  })

  const urgency = watch('urgency')
  const isEmergency = urgency === 'Major / Emergency'

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length === 0) return ''
    else if (digits.length <= 3) return `(${digits}`
    else if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    else return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
    setValue('phone', formatted)
  }

  const copyStatusLink = () => {
    const url = `${window.location.origin}/support/status?ticket=${submittedTicket.ticketId}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      if (data.accessCode.trim().toUpperCase() !== SUPPORT_ACCESS_CODE.toUpperCase()) {
        setErrorMessage('Invalid access code. Use the code provided at contract kickoff, or call (919) 926-7100.')
        setIsSubmitting(false)
        return
      }

      let recaptchaToken = ''
      try { recaptchaToken = await verifyCaptcha() } catch (e) { console.error('reCAPTCHA error:', e) }

      const sanitizedData = sanitizeFormData(data)
      const ticketId = generateTicketId()
      const timestamp = new Date().toISOString()
      const formData = {
        ...sanitizedData,
        phone: phoneNumber,
        ticketId,
        formType: 'support',
        timestamp,
        recaptchaToken,
      }

      // Dual-path submission: Netlify Forms is the durable record (and email
      // safety net) even when n8n is unreachable; n8n handles routing to the
      // service team, Airtable, and emergency escalation. Either landing
      // counts as success — the same ticketId ties the two copies together.
      const encodedData = new URLSearchParams()
      encodedData.append('form-name', 'support')
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'bot-field') return
        if (value !== undefined && value !== null) encodedData.append(key, value)
      })

      const netlifyPromise = fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedData.toString(),
      }).then((r) => r.ok).catch((e) => { console.error('Netlify form error:', e); return false })

      const webhookPromise = SUPPORT_WEBHOOK_URL
        ? fetch(SUPPORT_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          }).then((r) => r.ok).catch((e) => { console.error('Webhook error:', e); return false })
        : Promise.resolve(false)

      const [netlifySuccess, webhookSuccess] = await Promise.all([netlifyPromise, webhookPromise])

      if (netlifySuccess || webhookSuccess) {
        setSubmittedTicket({ ticketId, urgency: data.urgency })
        reset()
        setPhoneNumber('')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        throw new Error('All submission methods failed')
      }
    } catch (error) {
      console.error('Service request submission error:', error)
      setErrorMessage('There was an error submitting your request. Please try again — or for any urgent issue, call (919) 926-7100 now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Helmet>
        <title>Submit a Service Request | Gridstream Support</title>
        <meta name="description" content="Submit a chiller maintenance or emergency service request to Gridstream. 24/7/365 emergency response for supported facilities." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://gridstream.ai/support" />
      </Helmet>

      {/* Page hero */}
      <section className="relative pt-36 pb-12 sm:pt-44 sm:pb-14 container-padding overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="boot flex items-center justify-center gap-2.5 mb-6" style={{ animationDelay: '0.05s' }}>
            <span className="cursor-blink w-1.5 h-1.5 rounded-full bg-primary-green" style={{ boxShadow: '0 0 10px #48D8A0' }} />
            <span className="hud-label text-[11px]">Service Desk · 24/7/365 Emergency Response</span>
          </div>
          <h1 className="boot hero-text font-display font-semibold leading-[1.02]" style={{ animationDelay: '0.16s' }}>
            Submit a <span className="text-primary-green">Service Request</span>
          </h1>
          <p className="boot text-base sm:text-lg text-dim max-w-2xl mx-auto leading-relaxed mt-6" style={{ animationDelay: '0.3s' }}>
            For authorized facility points of contact. Your request is logged, dispatched to our service team, and trackable by ticket number.
          </p>
          <div className="boot mt-6" style={{ animationDelay: '0.4s' }}>
            <Link to="/support/status" className="inline-flex items-center gap-2 text-primary-green hover:underline text-sm font-medium">
              <Search className="w-4 h-4" strokeWidth={1.5} />
              Check the status of an existing ticket
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 container-padding border-t border-white/[0.06] pt-12">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Emergency call-first banner — always visible */}
          <div className="p-4 sm:p-5 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-4">
            <div className="w-10 h-10 bg-red-500/[0.15] rounded-md flex items-center justify-center flex-shrink-0 border border-red-500/30">
              <Phone className="w-5 h-5 text-red-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white font-medium">Equipment failure impacting operations right now?</p>
              <p className="text-dim text-sm mt-1">
                Call <a href="tel:+19199267100" className="text-red-400 font-semibold hover:underline">(919) 926-7100</a> immediately —
                phone is the fastest emergency channel. Then submit this form so your request is documented and tracked.
              </p>
            </div>
          </div>

          {submittedTicket ? (
            /* ---------------- Success state ---------------- */
            <div className="glass-card text-center">
              <div className="w-14 h-14 bg-primary-green/[0.12] rounded-full flex items-center justify-center mx-auto mb-5 border border-primary-green/30">
                <CheckCircle2 className="w-7 h-7 text-primary-green" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-display font-semibold text-white mb-2">Request Received</h2>
              <p className="text-dim mb-6">Your service request has been logged and is being routed to our service team now.</p>
              <div className="inline-block px-6 py-4 bg-white/[0.04] border border-white/[0.1] rounded-lg mb-6">
                <p className="hud-label text-[10px] mb-1">Your Ticket Number</p>
                <p className="text-primary-green font-mono text-2xl font-medium tracking-widest">{submittedTicket.ticketId}</p>
              </div>
              {submittedTicket.urgency === 'Major / Emergency' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
                  <p className="text-red-400 font-medium text-sm">
                    This was submitted as an emergency. If you have not already done so, call{' '}
                    <a href="tel:+19199267100" className="font-semibold underline">(919) 926-7100</a> now —
                    our emergency response clock is fastest when we hear from you by phone.
                  </p>
                </div>
              )}
              <p className="text-mute text-sm mb-6">
                Save your ticket number — you can check progress anytime on the status page.
                A confirmation will be sent to the email address you provided.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={`/support/status?ticket=${submittedTicket.ticketId}`}
                  className="glass-button-primary hover-glow inline-flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" strokeWidth={1.5} />
                  Track This Ticket
                </Link>
                <button
                  onClick={copyStatusLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/[0.15] text-white hover:border-primary-green/50 hover:text-primary-green transition-colors"
                >
                  <Copy className="w-4 h-4" strokeWidth={1.5} />
                  {copied ? 'Link Copied!' : 'Copy Status Link'}
                </button>
              </div>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="mt-6 text-mute hover:text-white text-sm underline transition-colors"
              >
                Submit another request
              </button>
            </div>
          ) : (
            /* ---------------- Intake form ---------------- */
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-2">
                <Wrench className="w-5 h-5 text-primary-green" strokeWidth={1.5} />
                <h2 className="text-2xl font-bold text-white">New Service Request</h2>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Fields marked * are required. Routine requests are answered within 24 hours; emergencies receive a 30-minute phone response and 4-hour on-site mobilization.
              </p>

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" name="support" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="support" />
                <div hidden><input name="bot-field" {...register('bot-field')} /></div>

                {/* Access code */}
                <div>
                  <label className="block text-white font-medium mb-2">Facility Access Code *</label>
                  <input
                    type="text"
                    {...register('accessCode', { required: 'Access code is required' })}
                    className="w-full form-input font-mono tracking-widest"
                    placeholder="Provided at contract kickoff"
                    autoComplete="off"
                  />
                  {errors.accessCode && <p className="text-red-400 text-sm mt-1">{errors.accessCode.message}</p>}
                  <p className="text-mute text-xs mt-1">Issued to authorized facility POCs. Don&apos;t have it? Call (919) 926-7100.</p>
                </div>

                {/* Requester identity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Your Name *</label>
                    <input type="text" {...register('name', { required: 'Name is required', pattern: validationPatterns.name })} className="w-full form-input" placeholder="Full name" />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Your Role *</label>
                    <select {...register('role', { required: 'Role is required' })} className="w-full form-select">
                      <option value="">Select your role</option>
                      {REQUESTER_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                    </select>
                    {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Email Address *</label>
                    <input type="email" {...register('email', { required: 'Email is required', pattern: validationPatterns.email })} className="w-full form-input" placeholder="name@va.gov" />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Callback Phone *</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="w-full form-input"
                      placeholder="(555) 123-4567"
                      maxLength="14"
                    />
                    <input type="hidden" {...register('phone', { required: 'A callback number is required' })} />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <label className="block text-white font-medium mb-2">Equipment Affected *</label>
                  <select {...register('equipment', { required: 'Please identify the equipment' })} className="w-full form-select">
                    <option value="">Select equipment</option>
                    {EQUIPMENT_OPTIONS.map((eq) => <option key={eq} value={eq}>{eq}</option>)}
                  </select>
                  {errors.equipment && <p className="text-red-400 text-sm mt-1">{errors.equipment.message}</p>}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Building / Location Detail</label>
                  <input type="text" {...register('location')} className="w-full form-input" placeholder="e.g., Central Plant, Building 2" />
                </div>

                {/* Urgency — SOW-aligned definitions */}
                <div>
                  <label className="block text-white font-medium mb-3">Urgency *</label>
                  <div className="space-y-3">
                    <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${urgency === 'Minor / Routine' ? 'border-primary-green/50 bg-primary-green/[0.06]' : 'border-white/[0.1] hover:border-white/[0.25]'}`}>
                      <input type="radio" value="Minor / Routine" {...register('urgency', { required: 'Please select an urgency level' })} className="mt-1 w-4 h-4 accent-[#48D8A0]" />
                      <div>
                        <p className="text-white font-medium">Minor / Routine</p>
                        <p className="text-dim text-sm mt-0.5">
                          A malfunction or fault has been detected, but air handling systems are <span className="text-white">not</span> impacted
                          to the point of shutting down operations. Response within 24 hours.
                        </p>
                      </div>
                    </label>
                    <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${isEmergency ? 'border-red-500/50 bg-red-500/[0.06]' : 'border-white/[0.1] hover:border-white/[0.25]'}`}>
                      <input type="radio" value="Major / Emergency" {...register('urgency', { required: 'Please select an urgency level' })} className="mt-1 w-4 h-4 accent-[#f87171]" />
                      <div>
                        <p className="text-white font-medium flex items-center gap-2">
                          Major / Emergency
                          <AlertTriangle className="w-4 h-4 text-red-400" strokeWidth={1.5} />
                        </p>
                        <p className="text-dim text-sm mt-0.5">
                          Partial or complete failure that has impacted — or will shortly impact — operations
                          (mission work stoppage). 30-minute phone response, 4-hour on-site mobilization, 24/7/365.
                        </p>
                      </div>
                    </label>
                  </div>
                  {errors.urgency && <p className="text-red-400 text-sm mt-1">{errors.urgency.message}</p>}
                </div>

                {isEmergency && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-sm text-white">
                      For emergencies, <a href="tel:+19199267100" className="text-red-400 font-semibold underline">call (919) 926-7100</a> in
                      addition to submitting this form. This form documents and dispatches your request — the phone line is the fastest path to a technician.
                    </p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-white font-medium mb-2">Describe the Issue *</label>
                  <textarea
                    {...register('description', { required: 'Please describe the issue' })}
                    rows={5}
                    className="w-full form-input resize-none"
                    placeholder="What's happening, when it started, any alarms or fault codes on the control panel, unusual noise/vibration, current temperatures if known..."
                  />
                  {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Best Time to Reach You</label>
                  <input type="text" {...register('callback')} className="w-full form-input" placeholder="e.g., Anytime, weekdays 0700–1600, after 1400" />
                </div>

                <button type="submit" className={`w-full ${isEmergency ? 'py-3 rounded-lg font-medium text-white bg-red-500/80 hover:bg-red-500 border border-red-400/50 transition-colors' : 'glass-button-primary hover-glow'}`} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : isEmergency ? 'Submit Emergency Request' : 'Submit Service Request'}
                </button>
              </form>
            </div>
          )}

          {/* What happens next */}
          <div className="glass-card" data-reveal>
            <h3 className="text-xl font-display font-semibold mb-4 text-white">What Happens Next?</h3>
            <div className="space-y-4">
              {[
                ['01', 'Logged & Confirmed', 'Your request gets a ticket number instantly and a confirmation email is sent to you.'],
                ['02', 'Dispatched', 'The request is routed to our service team immediately — emergencies also trigger direct alerts to Gridstream management.'],
                ['03', 'Tracked to Resolution', 'Follow progress anytime with your ticket number on the status page. Every step is time-stamped for the record.'],
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
      </section>
    </div>
  )
}

export default Support
