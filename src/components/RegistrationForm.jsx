import React, { useState, useEffect } from 'react';
import { SYMPOSIUM_CONFIG, EVENTS } from '../data/symposiumData';
import { supabaseService } from '../lib/supabase';

export default function RegistrationForm({ preselectedEvent, onSuccessRegistration }) {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    college: '',
    department: '',
    year: '3rd Year',
    phone: '',
    email: '',
    selectedEvents: [],
    transactionId: '',
    screenshotDataUrl: '',
    confirmed: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Handle preselection if user clicked "Register Now" from a specific event card
  useEffect(() => {
    if (preselectedEvent) {
      setFormData((prev) => {
        if (!prev.selectedEvents.includes(preselectedEvent)) {
          return { ...prev, selectedEvents: [...prev.selectedEvents, preselectedEvent] };
        }
        return prev;
      });
    }
  }, [preselectedEvent]);

  // Generate UPI QR Code URL
  useEffect(() => {
    const upiLink = `upi://pay?pa=${SYMPOSIUM_CONFIG.upiId}&pn=AURA2026_Symposium&am=${SYMPOSIUM_CONFIG.registrationFee}&cu=INR&tn=AURA2026_Registration`;
    // Use QRServer API for instant high-res crisp vector QR without external heavy packages
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&color=000000&bgcolor=ffffff&data=${encodeURIComponent(
      upiLink
    )}`;
    setQrCodeUrl(qrUrl);
  }, []);

  // Event selection toggle
  const toggleEvent = (eventName) => {
    setFormData((prev) => {
      const exists = prev.selectedEvents.includes(eventName);
      const updated = exists
        ? prev.selectedEvents.filter((e) => e !== eventName)
        : [...prev.selectedEvents, eventName];
      return { ...prev, selectedEvents: updated };
    });

    if (errors.selectedEvents) {
      setErrors((prev) => ({ ...prev, selectedEvents: '' }));
    }
  };

  // Copy UPI ID
  const handleCopyUpi = () => {
    navigator.clipboard.writeText(SYMPOSIUM_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Handle Screenshot Upload with validation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, screenshot: 'Please upload an image file (PNG, JPG, or WEBP).' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, screenshot: 'Screenshot size must be under 5MB.' }));
      return;
    }

    setErrors((prev) => ({ ...prev, screenshot: '' }));

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target.result;
      setScreenshotPreview(result);
      setFormData((prev) => ({ ...prev, screenshotDataUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  // Validate inputs
  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.college.trim()) errs.college = 'College Name is required.';
    if (!formData.department.trim()) errs.department = 'Department is required.';

    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }

    if (formData.selectedEvents.length === 0) {
      errs.selectedEvents = 'Please select at least one event to participate.';
    }

    if (!formData.transactionId.trim()) {
      errs.transactionId = 'UPI Transaction ID / UTR Number is required.';
    } else if (formData.transactionId.trim().length < 6) {
      errs.transactionId = 'Enter a valid Transaction ID / UTR Number (min 6 digits).';
    }

    if (!formData.confirmed) {
      errs.confirmed = 'You must confirm that the information provided is correct.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to error
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await supabaseService.submitRegistration(formData);
      if (response && response.success) {
        onSuccessRegistration(response.registration);
      } else {
        alert('Could not submit registration. Please check your network and try again.');
      }
    } catch (err) {
      console.error('Registration submission error:', err);
      alert('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const technicalEvents = EVENTS.filter((e) => e.type === 'technical');
  const nonTechnicalEvents = EVENTS.filter((e) => e.type === 'non-technical');

  return (
    <section id="register" className="py-24 px-4 relative overflow-hidden">
      {/* Background Neon Elements */}
      <div className="glow-orb-cyan w-96 h-96 top-20 -left-20 z-0 opacity-40" />
      <div className="glow-orb-purple w-96 h-96 bottom-20 -right-20 z-0 opacity-40" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Online Registration</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Register for <span className="text-gradient-cyan">AURA 2026</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Fill in your personal details, select your events, complete the ₹120 UPI fee payment, and submit your registration.
          </p>
        </div>

        {/* Main Registration Card */}
        <form
          onSubmit={handleSubmit}
          className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative space-y-10"
        >
          {/* Step 1: Personal Details */}
          <div>
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-heading font-black text-sm text-cyan-400">
                1
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                  Personal & Academic Details
                </h3>
                <p className="text-xs text-gray-400">
                  Enter your official details for certificate generation
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vigneshwaran K"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* College Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  College Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Adhiparasakthi Engineering College"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                />
                {errors.college && <p className="text-xs text-red-400 mt-1">{errors.college}</p>}
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Department <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Information Technology"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                />
                {errors.department && <p className="text-xs text-red-400 mt-1">{errors.department}</p>}
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Year of Study <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0f24] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  WhatsApp / Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full pl-14 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="vignesh@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Step 2: Event Selection */}
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-heading font-black text-sm text-cyan-400">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                    Select Your Events
                  </h3>
                  <p className="text-xs text-gray-400">
                    Choose one or more events to compete in
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {formData.selectedEvents.length} Selected
              </span>
            </div>

            {errors.selectedEvents && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errors.selectedEvents}</span>
              </div>
            )}

            {/* Technical Events Section */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Technical Events</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {technicalEvents.map((ev) => {
                  const isChecked = formData.selectedEvents.includes(ev.name);
                  return (
                    <div
                      key={ev.id}
                      onClick={() => toggleEvent(ev.name)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isChecked
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-heading font-bold text-sm text-white">
                          {ev.name}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-cyan-400 border-cyan-400 text-black'
                              : 'border-gray-500 bg-transparent'
                          }`}
                        >
                          {isChecked && (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-2">
                        {ev.tagline}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Non-Technical Events Section */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Non-Technical Events</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nonTechnicalEvents.map((ev) => {
                  const isChecked = formData.selectedEvents.includes(ev.name);
                  return (
                    <div
                      key={ev.id}
                      onClick={() => toggleEvent(ev.name)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isChecked
                          ? 'bg-purple-950/60 border-purple-400 shadow-md shadow-purple-500/20'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-heading font-bold text-sm text-white">
                          {ev.name}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-purple-400 border-purple-400 text-white'
                              : 'border-gray-500 bg-transparent'
                          }`}
                        >
                          {isChecked && (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-2">
                        {ev.tagline}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 3: Payment Details */}
          <div>
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-heading font-black text-sm text-cyan-400">
                3
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                  Payment Verification
                </h3>
                <p className="text-xs text-gray-400">
                  Registration Fee: ₹{SYMPOSIUM_CONFIG.registrationFee} per participant
                </p>
              </div>
            </div>

            {/* UPI Payment Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c122e] to-[#121c45] border border-cyan-500/30 shadow-xl mb-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                
                {/* QR Code Container */}
                <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center justify-center shrink-0">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="UPI QR Code"
                      className="w-40 h-40 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-40 h-40 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-xs text-gray-500">
                      Loading QR...
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-gray-800 mt-2 uppercase tracking-wide">
                    Scan with any UPI App
                  </span>
                </div>

                {/* Payment Instructions & Details */}
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                    <span>Registration Fee: ₹{SYMPOSIUM_CONFIG.registrationFee}</span>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-white">
                    Pay via UPI (GPay / PhonePe / Paytm / BHIM)
                  </h4>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    <div className="px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-cyan-400 font-mono font-bold text-sm tracking-wide select-all w-full sm:w-auto text-center">
                      {SYMPOSIUM_CONFIG.upiId}
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="btn-cyber-secondary text-xs py-2 px-4 whitespace-nowrap"
                    >
                      {copiedUpi ? (
                        <>
                          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy UPI ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-300 font-medium">
                    &ldquo;After completing the payment, enter your transaction/reference ID.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction ID & Screenshot Upload Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Transaction ID / UTR */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Transaction ID / UTR Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 428910482910 or UPI-123456"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all font-mono"
                />
                {errors.transactionId && (
                  <p className="text-xs text-red-400 mt-1">{errors.transactionId}</p>
                )}
              </div>

              {/* Payment Screenshot Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Payment Screenshot (Optional / Recommended)
                </label>
                <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {screenshotPreview ? (
                    <div className="flex items-center gap-3 w-full">
                      <img
                        src={screenshotPreview}
                        alt="Payment preview"
                        className="w-12 h-12 object-cover rounded-lg border border-cyan-400"
                      />
                      <div className="flex-1 text-left">
                        <span className="text-xs text-emerald-400 font-bold block">
                          ✓ Screenshot Attached
                        </span>
                        <span className="text-[11px] text-gray-400">Click to change file</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Upload receipt image (Max 5MB)</span>
                    </div>
                  )}
                </label>
                {errors.screenshot && <p className="text-xs text-red-400 mt-1">{errors.screenshot}</p>}
              </div>
            </div>
          </div>

          {/* Step 4: Confirmation Checkbox */}
          <div className="pt-4 border-t border-white/10">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.confirmed}
                onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-gray-600 text-cyan-400 focus:ring-cyan-500 bg-black/40 cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white leading-relaxed">
                I confirm that the information provided is correct, and I have completed the registration fee payment of ₹{SYMPOSIUM_CONFIG.registrationFee} to the official UPI ID.
              </span>
            </label>
            {errors.confirmed && <p className="text-xs text-red-400 mt-2">{errors.confirmed}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-cyber-primary w-full py-4 text-base font-black uppercase tracking-wider ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing Registration...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Submit Registration (₹{SYMPOSIUM_CONFIG.registrationFee})</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-3">
              Protected by Supabase Database • Instant E-Receipt Generated Upon Submission
            </p>
          </div>
        </form>

      </div>
    </section>
  );
}
