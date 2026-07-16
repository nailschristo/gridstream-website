import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Search, CheckCircle2, Circle, AlertTriangle } from 'lucide-react'
import { SUPPORT_STATUS_WEBHOOK_URL } from '../config'

/**
 * Status lookup — reads ticket progress from the n8n status webhook.
 *
 * The n8n workflow (Webhook GET node → Airtable search → Respond to Webhook)
 * is called as `${SUPPORT_STATUS_WEBHOOK_URL}?ticket=GS-20260716-XXXXXX` and
 * must return JSON in this shape (all timestamps ISO 8601, null if not yet
 * reached; never include requester contact info — this endpoint is unauthenticated
 * and the ticket ID is the only key):
 *
 * {
 *   "found": true,
 *   "ticketId": "GS-20260716-A4F2M9",
 *   "urgency": "Minor / Routine" | "Major / Emergency",
 *   "equipment": "Chiller 1 — York YMC2-S3517AB (SN SLGM427590)",
 *   "status": "New" | "Acknowledged" | "Dispatched" | "On Site" | "Resolved" | "Closed",
 *   "created": "2026-07-16T14:02:00Z",
 *   "acknowledgedAt": "2026-07-16T14:11:00Z" | null,
 *   "dispatchedAt": null,
 *   "onSiteAt": null,
 *   "resolvedAt": null,
 *   "notes": "Optional public-facing note from Gridstream"
 * }
 *
 * For an unknown ticket, return { "found": false }.
 */

const STATUS_STEPS = [
  { key: 'created', label: 'Request Received' },
  { key: 'acknowledgedAt', label: 'Acknowledged by Gridstream' },
  { key: 'dispatchedAt', label: 'Dispatched to Service Team' },
  { key: 'onSiteAt', label: 'Technician On Site' },
  { key: 'resolvedAt', label: 'Resolved' },
]

// Loose shape check only — the lookup webhook is the authority on what exists.
const TICKET_PATTERN = /^GS-\d{8}-[A-Z0-9]{4,10}$/i

const formatTime = (iso) => {
  try { return format(new Date(iso), 'MMM d, yyyy · h:mm a') } catch { return '' }
}

const SupportStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [ticketInput, setTicketInput] = useState(searchParams.get('ticket') || '')
  const [ticket, setTicket] = useState(null)
  const [state, setState] = useState('idle') // idle | loading | found | notfound | error | unconfigured

  const lookup = useCallback(async (rawId) => {
    const id = rawId.trim().toUpperCase()
    if (!id) return
    if (!SUPPORT_STATUS_WEBHOOK_URL) {
      setState('unconfigured')
      return
    }
    if (!TICKET_PATTERN.test(id)) {
      setState('notfound')
      setTicket(null)
      return
    }
    setState('loading')
    try {
      const r = await fetch(`${SUPPORT_STATUS_WEBHOOK_URL}?ticket=${encodeURIComponent(id)}`)
      if (!r.ok) throw new Error(`Status lookup failed: ${r.status}`)
      const data = await r.json()
      if (data && data.found) {
        setTicket(data)
        setState('found')
      } else {
        setTicket(null)
        setState('notfound')
      }
    } catch (e) {
      console.error('Status lookup error:', e)
      setTicket(null)
      setState('error')
    }
  }, [])

  // Auto-lookup when arriving with ?ticket= (e.g., from the confirmation page)
  useEffect(() => {
    const fromUrl = searchParams.get('ticket')
    if (fromUrl) lookup(fromUrl)
  }, [searchParams, lookup])

  const onSearch = (e) => {
    e.preventDefault()
    const id = ticketInput.trim().toUpperCase()
    if (!id) return
    setSearchParams({ ticket: id })
  }

  const isEmergency = ticket?.urgency === 'Major / Emergency'

  return (
    <div>
      <Helmet>
        <title>Ticket Status | Gridstream Support</title>
        <meta name="description" content="Check the status of a Gridstream service request by ticket number." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://gridstream.ai/support/status" />
      </Helmet>

      {/* Page hero */}
      <section className="relative pt-36 pb-12 sm:pt-44 sm:pb-14 container-padding overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="boot flex items-center justify-center gap-2.5 mb-6" style={{ animationDelay: '0.05s' }}>
            <span className="cursor-blink w-1.5 h-1.5 rounded-full bg-primary-green" style={{ boxShadow: '0 0 10px #48D8A0' }} />
            <span className="hud-label text-[11px]">Service Desk · Ticket Tracking</span>
          </div>
          <h1 className="boot hero-text font-display font-semibold leading-[1.02]" style={{ animationDelay: '0.16s' }}>
            Check Ticket <span className="text-primary-green">Status</span>
          </h1>
          <p className="boot text-base sm:text-lg text-dim max-w-2xl mx-auto leading-relaxed mt-6" style={{ animationDelay: '0.3s' }}>
            Enter the ticket number from your confirmation to see live progress on your service request.
          </p>
        </div>
      </section>

      <section className="pb-24 container-padding border-t border-white/[0.06] pt-12">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Lookup form */}
          <div className="glass-card">
            <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="flex-grow form-input font-mono tracking-widest uppercase"
                placeholder="GS-20260716-XXXXXX"
                aria-label="Ticket number"
              />
              <button type="submit" className="glass-button-primary hover-glow inline-flex items-center justify-center gap-2 whitespace-nowrap" disabled={state === 'loading'}>
                <Search className="w-4 h-4" strokeWidth={1.5} />
                {state === 'loading' ? 'Searching...' : 'Track Ticket'}
              </button>
            </form>
          </div>

          {/* Result states */}
          {state === 'unconfigured' && (
            <div className="glass-card text-center">
              <p className="text-dim">
                Online status tracking is being activated for this contract. In the meantime, email{' '}
                <a href="mailto:contact@gridstream.ai" className="text-primary-green hover:underline">contact@gridstream.ai</a> or call{' '}
                <a href="tel:+19199267100" className="text-white hover:text-primary-green transition-colors">(919) 926-7100</a>{' '}
                with your ticket number for an update.
              </p>
            </div>
          )}

          {state === 'notfound' && (
            <div className="glass-card text-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-white font-medium mb-1">Ticket not found</p>
              <p className="text-dim text-sm">
                Double-check the ticket number from your confirmation email (format: GS-YYYYMMDD-XXXXXX).
                If it still isn&apos;t found, call (919) 926-7100.
              </p>
            </div>
          )}

          {state === 'error' && (
            <div className="glass-card text-center">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-white font-medium mb-1">Couldn&apos;t reach the tracking service</p>
              <p className="text-dim text-sm">
                Please try again in a moment. For anything urgent, call{' '}
                <a href="tel:+19199267100" className="text-primary-green hover:underline">(919) 926-7100</a>.
              </p>
            </div>
          )}

          {state === 'found' && ticket && (
            <div className="glass-card">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <p className="hud-label text-[10px] mb-1">Ticket</p>
                  <p className="text-primary-green font-mono text-xl font-medium tracking-widest">{ticket.ticketId}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 text-xs rounded border tracking-wide ${isEmergency ? 'bg-red-500/[0.12] text-red-400 border-red-500/30' : 'bg-primary-green/[0.12] text-primary-green border-primary-green/30'}`}>
                    {ticket.urgency || 'Service Request'}
                  </span>
                  <span className="px-3 py-1 bg-white/[0.06] text-white text-xs rounded border border-white/[0.12] tracking-wide">
                    {ticket.status}
                  </span>
                </div>
              </div>

              {ticket.equipment && (
                <div className="mb-6 pb-6 border-b border-white/[0.08]">
                  <p className="hud-label text-[10px] mb-1">Equipment</p>
                  <p className="text-white text-sm">{ticket.equipment}</p>
                </div>
              )}

              {/* Progress timeline */}
              <div className="space-y-0">
                {STATUS_STEPS.map((step, i) => {
                  const timestamp = ticket[step.key]
                  const done = Boolean(timestamp)
                  const isLast = i === STATUS_STEPS.length - 1
                  return (
                    <div key={step.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {done ? (
                          <CheckCircle2 className="w-6 h-6 text-primary-green flex-shrink-0" strokeWidth={1.5} />
                        ) : (
                          <Circle className="w-6 h-6 text-white/20 flex-shrink-0" strokeWidth={1.5} />
                        )}
                        {!isLast && <div className={`w-px flex-grow my-1 ${done ? 'bg-primary-green/40' : 'bg-white/10'}`} style={{ minHeight: '24px' }} />}
                      </div>
                      <div className={isLast ? '' : 'pb-6'}>
                        <p className={`font-medium ${done ? 'text-white' : 'text-mute'}`}>{step.label}</p>
                        {done && <p className="text-mute text-xs mt-0.5 font-mono">{formatTime(timestamp)}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>

              {ticket.notes && (
                <div className="mt-6 pt-6 border-t border-white/[0.08]">
                  <p className="hud-label text-[10px] mb-2">Notes from Gridstream</p>
                  <p className="text-dim text-sm leading-relaxed">{ticket.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* No link to /support here — the request form is private
              (access-code bookmark only); this status page is public. */}
          <div className="text-center">
            <p className="text-mute text-sm">
              Need to reach us about a ticket? Call{' '}
              <a href="tel:+19199267100" className="text-primary-green hover:underline">(919) 926-7100</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default SupportStatus
