import React from 'react';

export default function EventCard({ event, onRegister, onSelectDetails }) {
  const isTechnical = event.type === 'technical';

  return (
    <div className="event-card glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 group">
      {/* Event Header Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-900">
        <img
          src={event.image}
          alt={event.name}
          className="card-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f24] via-transparent to-black/30" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg ${
              isTechnical
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                : 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isTechnical ? 'bg-cyan-400' : 'bg-purple-400'
              }`}
            />
            {event.category}
          </span>
        </div>

        {/* Timing Badge (Placeholder) */}
        <div className="absolute bottom-3 right-4">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-gray-300 border border-white/10">
            {event.timing}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-heading font-black text-2xl text-white group-hover:text-cyan-400 transition-colors">
              {event.name}
            </h3>
          </div>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {event.tagline}
          </p>

          <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-4">
            {event.description}
          </p>

          {/* Highlights Chips */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {event.highlights.map((h, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-4 border-t border-white/5 flex items-center gap-3">
          <button
            onClick={() => onRegister(event.name)}
            className="btn-cyber-primary flex-1 py-2.5 text-xs sm:text-sm font-bold tracking-wide"
          >
            <span>Register Now</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {onSelectDetails && (
            <button
              onClick={() => onSelectDetails(event)}
              className="p-2.5 rounded-full text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              title="View Guidelines & Details"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
