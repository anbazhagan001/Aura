import React from 'react';
import { SCHEDULE_ITEMS } from '../data/symposiumData';

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 px-4 relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="glow-orb-purple w-72 h-72 top-20 left-10 z-0 opacity-50" />
      <div className="glow-orb-cyan w-72 h-72 bottom-10 right-10 z-0 opacity-50" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Event Flow</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Symposium <span className="text-gradient-purple">Schedule</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Mark your calendar for <strong className="text-white">29 October 2026</strong>. Here is the master itinerary for the symposium day.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Glowing Connector Line */}
          <div className="hidden sm:block absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-indigo-500 to-pink-500 transform md:-translate-x-1/2 opacity-40" />

          <div className="space-y-8 sm:space-y-12">
            {SCHEDULE_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.phase}
                  className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Content Card */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0">
                    <div
                      className={`glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all ${
                        isEven ? 'md:text-left' : 'md:text-left'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          Phase {item.phase}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{item.time}</span>
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-white mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="absolute left-0 sm:left-8 md:left-1/2 top-4 sm:top-1/2 transform -translate-y-1/2 sm:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#060813] border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.6)] flex items-center justify-center z-20">
                      <span className="font-heading font-black text-xs text-cyan-300">
                        {item.phase}
                      </span>
                    </div>
                  </div>

                  {/* Empty Spacer for alternating layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Notice Footer */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-400">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Exact session timings & room allocations will be announced closer to the event day.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
