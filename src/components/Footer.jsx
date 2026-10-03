import React from 'react';
import { SYMPOSIUM_CONFIG } from '../data/symposiumData';

export default function Footer({ onOpenAdmin }) {
  const currentYear = 2026;

  return (
    <footer className="bg-[#060813]/70 backdrop-blur-md border-t border-white/10 pt-16 pb-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="assets/aura-logo.jpg"
                alt="AURA 2026"
                className="w-10 h-10 rounded-xl object-cover border border-cyan-400"
              />
              <span className="font-heading font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
                AURA 2026
              </span>
            </div>

            <p className="text-sm font-semibold text-gray-300">
              {SYMPOSIUM_CONFIG.department}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              {SYMPOSIUM_CONFIG.college}
              <br />
              Melmaruvathur, Tamil Nadu — 603319
            </p>
            <p className="text-xs text-cyan-400 font-medium">
              Symposium Date: {SYMPOSIUM_CONFIG.displayDate}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About AURA
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-cyan-400 transition-colors">
                  All Events
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-cyan-400 transition-colors">
                  Schedule
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-cyan-400 transition-colors">
                  Registration
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-4">
              Event Helpdesk
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div>
                <span className="block text-gray-500 text-[10px] uppercase font-bold">Phone Number</span>
                <a href={`tel:${SYMPOSIUM_CONFIG.contactPhone}`} className="text-white font-mono font-bold hover:text-cyan-400 transition-colors">
                  {SYMPOSIUM_CONFIG.contactPhone}
                </a>
              </div>
              <div>
                <span className="block text-gray-500 text-[10px] uppercase font-bold">UPI ID</span>
                <span className="text-cyan-400 font-mono">{SYMPOSIUM_CONFIG.upiId}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-1.5 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-all flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Organizer Dashboard</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {currentYear} AURA – Department of Information Technology. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Adhiparasakthi Engineering College</span>
            <span>•</span>
            <span className="text-cyan-400">AURA 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
