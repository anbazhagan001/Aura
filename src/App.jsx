import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import RegistrationForm from './components/RegistrationForm';
import SuccessModal from './components/SuccessModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState(null);
  const [successfulRegistration, setSuccessfulRegistration] = useState(null);

  const scrollToRegister = (eventName = null) => {
    if (eventName) {
      setPreselectedEvent(eventName);
    }
    const regSection = document.getElementById('register');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-cyan-500 selection:text-black">
      {/* Global Fixed Background Video for Entire Website */}
      <div className="cyber-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="cyber-video-bg opacity-65"
        >
          <source src="assets/bg-video.mp4" type="video/mp4" />
        </video>
        {/* Global Dark Contrast Scrim for Text Legibility Across All Sections */}
        <div className="absolute inset-0 bg-[#060813]/60 pointer-events-none" />
      </div>

      {/* Main Content Layered Above Video */}
      <div className="relative z-10">
        {/* Sticky Navigation Bar */}
        <Navbar
          onOpenAdmin={() => setIsAdminOpen(true)}
          onRegisterClick={() => scrollToRegister()}
        />

        {/* Hero Section with Live Countdown */}
        <Hero
          onExploreEvents={scrollToEvents}
          onRegisterNow={() => scrollToRegister()}
        />

        {/* About Section */}
        <About />

        {/* Events Section (Technical & Non-Technical) */}
        <Events
          onRegisterEvent={(eventName) => scrollToRegister(eventName)}
        />

        {/* Schedule Section */}
        <Schedule />

        {/* Registration Form with UPI Payment Details */}
        <RegistrationForm
          preselectedEvent={preselectedEvent}
          onSuccessRegistration={(reg) => setSuccessfulRegistration(reg)}
        />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      </div>

      {/* Registration Success Modal & E-Pass Download */}
      {successfulRegistration && (
        <SuccessModal
          registration={successfulRegistration}
          onClose={() => setSuccessfulRegistration(null)}
        />
      )}

      {/* Admin Dashboard Modal */}
      {isAdminOpen && (
        <Admin onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
