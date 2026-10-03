import React, { useState } from 'react';
import { SYMPOSIUM_CONFIG } from '../data/symposiumData';

export default function Contact() {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    emailOrPhone: '',
    message: ''
  });

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.emailOrPhone || !inquiryForm.message) {
      alert('Please fill out all fields before sending inquiry.');
      return;
    }
    // Simulate inquiry dispatch
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryForm({ name: '', emailOrPhone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb-cyan w-80 h-80 top-10 left-10 z-0 opacity-30" />
      <div className="glow-orb-purple w-80 h-80 bottom-10 right-10 z-0 opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Connect With Organizers</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Get In <span className="text-gradient-cyan">Touch</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Have questions regarding events, rules, transport, or registration? Reach out directly to our student and staff coordinators.
          </p>
        </div>

        {/* Contact Info & Inquiry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Direct Helpline & College Details */}
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h3 className="font-heading font-black text-2xl text-white mb-2">
                  {SYMPOSIUM_CONFIG.college}
                </h3>
                <p className="text-sm font-semibold text-cyan-400">
                  {SYMPOSIUM_CONFIG.department}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Melmaruvathur, Chengalpattu District, Tamil Nadu — 603319
                </p>
              </div>

              {/* Direct Phone & WhatsApp CTAs */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                      Symposium Helpline
                    </span>
                    <span className="font-heading font-black text-2xl text-white font-mono">
                      {SYMPOSIUM_CONFIG.contactPhone}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Direct Call Button */}
                  <a
                    href={`tel:${SYMPOSIUM_CONFIG.contactPhone}`}
                    className="btn-cyber-primary py-3 text-xs font-bold text-center justify-center flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call Coordinator</span>
                  </a>

                  {/* Direct WhatsApp Button */}
                  <a
                    href={`https://wa.me/91${SYMPOSIUM_CONFIG.contactPhone}?text=Hi%20AURA%202026%20Team%2C%20I%20have%20an%20inquiry%20regarding%20the%20symposium`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full text-xs font-bold text-center justify-center flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              {/* Campus Location Map Card */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-300 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Campus Map & Navigation</span>
                  </span>
                  <span className="text-gray-400">Melmaruvathur</span>
                </div>

                <div className="p-4 text-xs text-gray-400 space-y-2">
                  <p>
                    <strong className="text-white">Transit: </strong>
                    Conveniently located on GST Road (NH 45), Melmaruvathur Railway Station & Bus Terminal are within 1 km.
                  </p>
                  <a
                    href="https://maps.google.com/?q=Adhiparasakthi+Engineering+College+Melmaruvathur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline font-bold mt-2"
                  >
                    <span>Open in Google Maps</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Inquiry Form */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Send An Instant Inquiry
                  </h3>
                  <p className="text-xs text-gray-400">
                    Our student desk typically replies within a few hours
                  </p>
                </div>
              </div>

              {inquirySent ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center my-8 space-y-2">
                  <svg className="w-8 h-8 text-emerald-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="font-bold text-base">Inquiry Dispatched!</h4>
                  <p className="text-xs text-gray-300">
                    Thank you! Our coordinator will contact you shortly on your provided contact details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-4 my-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vignesh"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Email or Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9876543210 or name@gmail.com"
                      value={inquiryForm.emailOrPhone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, emailOrPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Your Query or Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ask about event rules, timing, spot entries, or team structure..."
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-cyber-primary w-full py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider"
                  >
                    <span>Submit Inquiry</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-gray-500 text-center">
              Official IT Department Symposium Desk • AURA 2026
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
