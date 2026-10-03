import React, { useRef } from 'react';
import { SYMPOSIUM_CONFIG } from '../data/symposiumData';

export default function SuccessModal({ registration, onClose }) {
  const receiptRef = useRef(null);

  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  const selectedEvents = Array.isArray(registration.selected_events)
    ? registration.selected_events
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="max-w-2xl w-full my-8 bg-[#0b0f24] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Top Celebration Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mb-1">
            Registration Successful! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Your registration for AURA 2026 has been successfully recorded.
          </p>
        </div>

        {/* Printable / Downloadable Digital Pass Card */}
        <div
          id="printable-ticket"
          ref={receiptRef}
          className="bg-gradient-to-br from-[#0e163b] to-[#141f4f] rounded-2xl border border-cyan-500/30 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-6"
        >
          {/* Subtle Cyber Corner Badges */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/20 to-transparent pointer-events-none" />

          {/* Ticket Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src="assets/aura-logo.jpg"
                alt="AURA 2026"
                className="w-12 h-12 rounded-xl object-cover border border-cyan-400 shadow-md shadow-cyan-400/20"
              />
              <div>
                <h3 className="font-heading font-black text-xl tracking-wider text-cyan-300">
                  AURA 2026 E-PASS
                </h3>
                <p className="text-[11px] text-gray-300">
                  {SYMPOSIUM_CONFIG.department}
                </p>
                <p className="text-[10px] text-gray-400">
                  {SYMPOSIUM_CONFIG.college}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Registration ID
              </span>
              <span className="font-heading font-black text-lg sm:text-xl text-cyan-400 font-mono">
                {registration.registration_id}
              </span>
            </div>
          </div>

          {/* Ticket Body Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-gray-400 block mb-0.5">Participant Name</span>
              <span className="font-bold text-sm text-white">{registration.full_name}</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-gray-400 block mb-0.5">College</span>
              <span className="font-bold text-sm text-white truncate block">
                {registration.college}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-gray-400 block mb-0.5">Dept & Year</span>
              <span className="font-bold text-white">
                {registration.department} ({registration.year})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-gray-400 block mb-0.5">Contact Phone</span>
              <span className="font-bold text-white font-mono">{registration.phone}</span>
            </div>
          </div>

          {/* Selected Events List */}
          <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-2">
              Registered Events ({selectedEvents.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedEvents.map((ev, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold"
                >
                  ✓ {ev}
                </span>
              ))}
            </div>
          </div>

          {/* Payment & Symposium Date Verification Bar */}
          <div className="pt-4 border-t border-dashed border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Symposium Date:</span>
                <span className="font-bold text-white">{SYMPOSIUM_CONFIG.displayDate}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-gray-400">Payment Status:</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {registration.payment_status || 'Pending Verification'}
                </span>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5 font-mono">
                Txn ID: {registration.payment_transaction_id}
              </div>
            </div>

            <div className="text-right">
              <span className="text-gray-400 block text-[10px]">Helpline Contact</span>
              <span className="font-bold text-cyan-400 font-mono text-sm">
                {SYMPOSIUM_CONFIG.contactPhone}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="btn-cyber-primary w-full sm:w-auto text-sm py-3 px-6 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Download Registration Confirmation</span>
          </button>

          <button
            onClick={onClose}
            className="btn-cyber-secondary w-full sm:w-auto text-sm py-3 px-6"
          >
            Done & Return to Home
          </button>
        </div>

      </div>
    </div>
  );
}
