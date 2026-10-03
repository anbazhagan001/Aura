import React, { useState } from 'react';
import { EVENTS } from '../data/symposiumData';
import EventCard from './EventCard';

export default function Events({ onRegisterEvent }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'technical', 'non-technical'
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const filteredEvents = EVENTS.filter((ev) => {
    if (activeTab === 'all') return true;
    return ev.type === activeTab;
  });

  const technicalEvents = EVENTS.filter((e) => e.type === 'technical');
  const nonTechnicalEvents = EVENTS.filter((e) => e.type === 'non-technical');

  return (
    <section id="events" className="py-24 px-4 relative overflow-hidden">
      {/* Background Cyber Accents */}
      <div className="glow-orb-cyan w-96 h-96 top-10 left-1/3 z-0" />
      <div className="glow-orb-purple w-96 h-96 bottom-10 right-10 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Official Event Lineup</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Explore <span className="text-gradient-cyan">AURA 2026</span> Events
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Test your limits across 3 technical challenges and 3 thrilling non-technical arenas. A single registration fee of{' '}
            <strong className="text-white font-semibold">₹120</strong> grants you entry to participate in your choice of events!
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              All Events ({EVENTS.length})
            </button>

            <button
              onClick={() => setActiveTab('technical')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'technical'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Technical Events ({technicalEvents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('non-technical')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'non-technical'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Non-Technical Events ({nonTechnicalEvents.length})</span>
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={onRegisterEvent}
              onSelectDetails={(ev) => setSelectedEventModal(ev)}
            />
          ))}
        </div>

        {/* Event Quick Guidance Banner */}
        <div className="mt-16 p-6 rounded-2xl glass-panel border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-white">
                Can I register for multiple events?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400">
                Yes! With a single ₹120 registration fee, you can choose multiple events as long as the event schedules do not clash.
              </p>
            </div>
          </div>

          <a
            href="#register"
            className="btn-cyber-secondary whitespace-nowrap text-xs sm:text-sm py-2.5 px-6"
          >
            Start Registration
          </a>
        </div>

      </div>

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel max-w-xl w-full rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl relative">
            <div className="relative h-48 w-full">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f24] to-transparent" />
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {selectedEventModal.category}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-xs text-gray-400">{selectedEventModal.timing}</span>
              </div>

              <h3 className="font-heading font-black text-2xl text-white mb-2">
                {selectedEventModal.name}
              </h3>

              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                {selectedEventModal.description}
              </p>

              <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/5 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-gray-300">Venue: </span>
                  <span className="text-gray-400">{selectedEventModal.venue}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-300">Rules & Rounds: </span>
                  <span className="text-gray-400">{selectedEventModal.rules}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-300">Coordinators: </span>
                  <span className="text-gray-400">{selectedEventModal.coordinators}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const eventName = selectedEventModal.name;
                    setSelectedEventModal(null);
                    onRegisterEvent(eventName);
                  }}
                  className="btn-cyber-primary flex-1 py-3 text-sm font-bold"
                >
                  Register for {selectedEventModal.name}
                </button>
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="btn-cyber-secondary py-3 px-6 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
