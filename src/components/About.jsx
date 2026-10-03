import React from 'react';
import { ABOUT_CARDS, SYMPOSIUM_CONFIG } from '../data/symposiumData';

export default function About() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu':
        return (
          <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'Gamepad2':
        return (
          <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        );
      case 'Users':
        return (
          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'Sparkles':
        return (
          <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'Trophy':
        return (
          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="glow-orb-purple w-80 h-80 top-1/4 right-0 z-0" />
      <div className="glow-orb-cyan w-80 h-80 bottom-0 left-0 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>About The Symposium</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Welcome to <span className="text-gradient-aura">AURA 2026</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            Organized with pride by the <strong className="text-white font-semibold">{SYMPOSIUM_CONFIG.department}</strong> at{' '}
            <strong className="text-white font-semibold">{SYMPOSIUM_CONFIG.college}</strong>, AURA 2026 is a flagship technical and non-technical symposium designed to empower the next generation of engineers.
          </p>
          <p className="text-sm sm:text-base text-gray-400 mt-4 leading-relaxed">
            We provide a vibrant platform for ambitious students to demonstrate deep technical expertise, explore generative AI innovations, exercise creative problem-solving, build leadership & teamwork, and cultivate a triumphant competitive spirit.
          </p>
        </div>

        {/* 5 Distinct Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className={`glass-panel p-6 sm:p-8 rounded-2xl relative group hover:border-cyan-500/40 transition-all ${
                idx === 0 ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-cyan-400 transition-all" />

              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-transform">
                {getIcon(card.icon)}
              </div>

              <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {card.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}

          {/* Department Highlights Summary Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl relative group bg-gradient-to-br from-[#0e1538] to-[#121c4a] border-cyan-500/20 lg:col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Department of IT
              </span>
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              Excellence in Engineering
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Join hundreds of brightest minds on October 29, 2026. Experience high-tech coding arenas, thrilling esports battles, and friendly campus camaraderie.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Date: 29 October 2026</span>
              <span>•</span>
              <span>Fee: ₹120 Only</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
