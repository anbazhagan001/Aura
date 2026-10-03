import React, { useState, useEffect } from 'react';
import { SYMPOSIUM_CONFIG } from '../data/symposiumData';

export default function Hero({ onExploreEvents, onRegisterNow }) {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(`${SYMPOSIUM_CONFIG.date}T09:00:00+05:30`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Main Hero Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Institution Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium tracking-wide mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10 animate-float">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{SYMPOSIUM_CONFIG.department}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-300">{SYMPOSIUM_CONFIG.college}</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white mb-2 relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-sm">
            AURA
          </span>
          <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_35px_rgba(0,242,254,0.45)]">
            2026
          </span>
        </h1>

        {/* Event Date Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
          <p className="font-heading uppercase tracking-[0.25em] text-cyan-400 font-bold text-sm sm:text-base md:text-lg">
            {SYMPOSIUM_CONFIG.displayDate}
          </p>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
          &ldquo;{SYMPOSIUM_CONFIG.tagline}&rdquo;
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={onRegisterNow}
            className="btn-cyber-primary w-full sm:w-auto text-base px-8 py-3.5 group"
          >
            <span>Register Now — ₹{SYMPOSIUM_CONFIG.registrationFee}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <button
            onClick={onExploreEvents}
            className="btn-cyber-secondary w-full sm:w-auto text-base px-8 py-3.5"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Explore Events</span>
          </button>
        </div>

        {/* Live Countdown Timer */}
        <div className="w-full max-w-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative">
          <div className="text-xs uppercase font-semibold tracking-widest text-cyan-400 mb-4 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Time Remaining Until Symposium Launch</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            <div className="countdown-box">
              <div className="font-heading font-black text-2xl sm:text-4xl text-white">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 mt-1 font-medium">
                Days
              </div>
            </div>

            <div className="countdown-box">
              <div className="font-heading font-black text-2xl sm:text-4xl text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 mt-1 font-medium">
                Hours
              </div>
            </div>

            <div className="countdown-box">
              <div className="font-heading font-black text-2xl sm:text-4xl text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 mt-1 font-medium">
                Minutes
              </div>
            </div>

            <div className="countdown-box">
              <div className="font-heading font-black text-2xl sm:text-4xl text-cyan-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-cyan-300 mt-1 font-medium">
                Seconds
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Registration closes on <span className="text-white font-semibold">{SYMPOSIUM_CONFIG.registrationDeadline}</span>
          </p>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full max-w-3xl">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
              ₹
            </div>
            <div>
              <div className="text-xs font-bold text-white">₹120 / Person</div>
              <div className="text-[11px] text-gray-400">All-Inclusive Fee</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-left">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
              6
            </div>
            <div>
              <div className="text-xs font-bold text-white">Epic Events</div>
              <div className="text-[11px] text-gray-400">Tech & Non-Tech</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-left">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">
              ★
            </div>
            <div>
              <div className="text-xs font-bold text-white">Cash Prizes</div>
              <div className="text-[11px] text-gray-400">& Grand Trophies</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-white">Certificates</div>
              <div className="text-[11px] text-gray-400">For All Participants</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
