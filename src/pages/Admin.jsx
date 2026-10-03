import React, { useState, useEffect } from 'react';
import { supabaseService } from '../lib/supabase';
import { EVENTS } from '../data/symposiumData';

export default function Admin({ onClose }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Data & Filter State
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvent, setFilterEvent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'Pending', 'Verified', 'Rejected'
  const [selectedItem, setSelectedItem] = useState(null); // for Details modal
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

  // Load Registrations
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await supabaseService.getAllRegistrations();
      setRegistrations(data);
    } catch (err) {
      console.error('Error fetching registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Handle Passcode Login
  const handleLogin = (e) => {
    e.preventDefault();
    // Default master admin passcode
    if (passcode.trim() === 'aura2026admin' || passcode.trim() === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Admin Passcode. Please check with the Department of IT.');
    }
  };

  // Update Status
  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdatingId(id);
    try {
      await supabaseService.updatePaymentStatus(id, newStatus);
      // Update local state immediately
      setRegistrations((prev) =>
        prev.map((item) =>
          item.id === id || item.registration_id === id
            ? { ...item, payment_status: newStatus }
            : item
        )
      );
      if (selectedItem && (selectedItem.id === id || selectedItem.registration_id === id)) {
        setSelectedItem((prev) => ({ ...prev, payment_status: newStatus }));
      }
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Could not update status. Please try again.');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Delete Record
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    try {
      await supabaseService.deleteRegistration(id);
      setRegistrations((prev) => prev.filter((r) => r.id !== id && r.registration_id !== id));
      if (selectedItem && (selectedItem.id === id || selectedItem.registration_id === id)) {
        setSelectedItem(null);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Reset Demo Seed Data
  const handleResetData = () => {
    if (window.confirm('Reset sample demo registrations?')) {
      const reset = supabaseService.resetDemoData();
      setRegistrations(reset);
    }
  };

  // Filtered List
  const filteredList = registrations.filter((item) => {
    // Search
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      (item.full_name && item.full_name.toLowerCase().includes(q)) ||
      (item.registration_id && item.registration_id.toLowerCase().includes(q)) ||
      (item.college && item.college.toLowerCase().includes(q)) ||
      (item.department && item.department.toLowerCase().includes(q)) ||
      (item.phone && item.phone.includes(q)) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.payment_transaction_id && item.payment_transaction_id.toLowerCase().includes(q));

    // Status Filter
    const matchStatus = filterStatus === 'all' || item.payment_status === filterStatus;

    // Event Filter
    const matchEvent =
      filterEvent === 'all' ||
      (Array.isArray(item.selected_events) && item.selected_events.includes(filterEvent));

    return matchSearch && matchStatus && matchEvent;
  });

  // Calculate Real-time Statistics
  const stats = supabaseService.getAnalytics(registrations);

  // If Not Authenticated -> Show Secure Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
        <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-3 text-cyan-400 shadow-lg shadow-cyan-500/20">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-heading font-black text-2xl text-white">
              Organizer Admin Portal
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              AURA 2026 • Department of Information Technology
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all font-mono"
                autoFocus
              />
              {authError && <p className="text-xs text-red-400 mt-1.5">{authError}</p>}
              <p className="text-[11px] text-gray-400 mt-2">
                Tip: Passcode is <code className="text-cyan-400 font-mono bg-white/5 px-1 py-0.5 rounded">aura2026admin</code>
              </p>
            </div>

            <button
              type="submit"
              className="btn-cyber-primary w-full py-3.5 text-sm font-bold uppercase tracking-wider"
            >
              Authenticate & Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="fixed inset-0 z-50 bg-[#060813] text-white flex flex-col overflow-hidden animate-fadeIn">
      
      {/* Top Navbar */}
      <header className="bg-[#090d24] border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="assets/aura-logo.jpg"
            alt="AURA 2026"
            className="w-9 h-9 rounded-lg object-cover border border-cyan-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-black text-lg text-white">
                AURA 2026 Admin Dashboard
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Live
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Department of Information Technology, Adhiparasakthi Engineering College
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => supabaseService.exportCSV(filteredList)}
            className="btn-cyber-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5"
            title="Download CSV for Excel or Google Sheets"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export CSV</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Exit Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        
        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
              Total Registrations
            </span>
            <div className="font-heading font-black text-2xl text-white">
              {stats.total}
            </div>
            <span className="text-[10px] text-cyan-400">Total participants</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
              Verified Payments
            </span>
            <div className="font-heading font-black text-2xl text-emerald-400">
              {stats.verified}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">Approved</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
              Pending Payments
            </span>
            <div className="font-heading font-black text-2xl text-amber-400">
              {stats.pending}
            </div>
            <span className="text-[10px] text-amber-400 font-medium">Needs verification</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
              Technical Events
            </span>
            <div className="font-heading font-black text-2xl text-cyan-400">
              {stats.techCount}
            </div>
            <span className="text-[10px] text-gray-400">Total entries</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
              Non-Tech Events
            </span>
            <div className="font-heading font-black text-2xl text-purple-400">
              {stats.nonTechCount}
            </div>
            <span className="text-[10px] text-gray-400">Total entries</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/40 to-indigo-950/40">
            <span className="text-[11px] uppercase font-bold text-cyan-300 block mb-1">
              Verified Revenue
            </span>
            <div className="font-heading font-black text-2xl text-white">
              ₹{stats.totalRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-gray-400">Potential: ₹{stats.potentialRevenue.toLocaleString()}</span>
          </div>

        </div>

        {/* Search, Filter, and Action Controls */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-4 justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name, college, phone, reg ID, UTR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Filter by Event */}
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#0b0f24] border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Events</option>
              {EVENTS.map((ev) => (
                <option key={ev.id} value={ev.name}>
                  {ev.name} ({ev.category})
                </option>
              ))}
            </select>

            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#0b0f24] border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Payment Statuses</option>
              <option value="Pending">Pending Verification</option>
              <option value="Verified">Verified / Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Reset / Reload */}
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
              title="Refresh Data"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button
              onClick={handleResetData}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 text-xs"
              title="Reset Sample Records"
            >
              Reset Demo Records
            </button>
          </div>

        </div>

        {/* Registrations Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0a0e27] border-b border-white/10 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3.5 px-4">Reg ID</th>
                  <th className="py-3.5 px-4">Participant Details</th>
                  <th className="py-3.5 px-4">College & Dept</th>
                  <th className="py-3.5 px-4">Events</th>
                  <th className="py-3.5 px-4">Payment UTR</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <span>Loading registrations...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No registrations matched your current search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr
                      key={item.id || item.registration_id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Registration ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                        {item.registration_id}
                        <span className="block text-[10px] text-gray-500 font-sans font-normal">
                          {new Date(item.registration_date).toLocaleDateString()}
                        </span>
                      </td>

                      {/* Participant Details */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white text-sm block">
                          {item.full_name}
                        </span>
                        <div className="text-gray-400 text-[11px] flex items-center gap-2 mt-0.5">
                          <span>{item.phone}</span>
                          <span>•</span>
                          <span className="truncate max-w-[150px]">{item.email}</span>
                        </div>
                      </td>

                      {/* College & Department */}
                      <td className="py-3.5 px-4">
                        <span className="text-gray-300 font-medium block truncate max-w-[200px]">
                          {item.college}
                        </span>
                        <span className="text-gray-500 text-[11px]">
                          {item.department} ({item.year})
                        </span>
                      </td>

                      {/* Selected Events */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {Array.isArray(item.selected_events) &&
                            item.selected_events.map((ev, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-white/5 text-gray-300 text-[10px] font-medium border border-white/5"
                              >
                                {ev}
                              </span>
                            ))}
                        </div>
                      </td>

                      {/* Payment UTR / Txn ID */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className="text-gray-300 font-semibold block">
                          {item.payment_transaction_id}
                        </span>
                        <span className="text-[10px] text-cyan-400">
                          ₹{item.registration_fee || 120}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            item.payment_status === 'Verified'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : item.payment_status === 'Rejected'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.payment_status === 'Verified'
                                ? 'bg-emerald-400'
                                : item.payment_status === 'Rejected'
                                ? 'bg-red-400'
                                : 'bg-amber-400'
                            }`}
                          />
                          {item.payment_status || 'Pending'}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* View Modal Trigger */}
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 border border-white/10"
                            title="View Details & Screenshot"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          {/* Quick Approve Button */}
                          <button
                            disabled={statusUpdatingId === item.id}
                            onClick={() => handleStatusChange(item.id, 'Verified')}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            title="Approve Payment"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>

                          {/* Quick Reject Button */}
                          <button
                            disabled={statusUpdatingId === item.id}
                            onClick={() => handleStatusChange(item.id, 'Rejected')}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
                            title="Reject Payment"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10"
                            title="Delete Record"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Participant Details & Screenshot Viewer Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel max-w-2xl w-full rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="border-b border-white/10 pb-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Registration Verification
              </span>
              <h3 className="font-heading font-black text-2xl text-white">
                {selectedItem.full_name}
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                ID: {selectedItem.registration_id} • Registered on {new Date(selectedItem.registration_date).toLocaleString()}
              </p>
            </div>

            {/* Grid of Details */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-400 block mb-1">College</span>
                <span className="font-bold text-white">{selectedItem.college}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-400 block mb-1">Department & Year</span>
                <span className="font-bold text-white">
                  {selectedItem.department} ({selectedItem.year})
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-400 block mb-1">Phone Number</span>
                <span className="font-bold text-cyan-400 font-mono">{selectedItem.phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-400 block mb-1">Email Address</span>
                <span className="font-bold text-white">{selectedItem.email}</span>
              </div>
            </div>

            {/* Selected Events */}
            <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-bold text-gray-300 block mb-2">
                Registered Events ({selectedItem.selected_events?.length || 0})
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedItem.selected_events?.map((ev, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold"
                  >
                    ✓ {ev}
                  </span>
                ))}
              </div>
            </div>

            {/* Payment Verification Box */}
            <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400 block">UPI Transaction / UTR Number</span>
                  <span className="font-mono font-bold text-base text-cyan-400 select-all">
                    {selectedItem.payment_transaction_id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block">Registration Fee</span>
                  <span className="font-bold text-white text-base">₹120.00</span>
                </div>
              </div>

              {/* Payment Screenshot Viewer */}
              {selectedItem.payment_screenshot ? (
                <div>
                  <span className="text-xs text-gray-400 font-semibold block mb-2">
                    Uploaded Payment Screenshot:
                  </span>
                  <div className="rounded-xl overflow-hidden border border-white/15 bg-black/60 max-h-64 flex items-center justify-center">
                    <img
                      src={selectedItem.payment_screenshot}
                      alt="Payment Proof Screenshot"
                      className="max-h-64 w-auto object-contain cursor-zoom-in"
                      onClick={() => window.open(selectedItem.payment_screenshot, '_blank')}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Click image to open full resolution in new tab
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-white/5 text-gray-400 text-xs text-center">
                  No payment screenshot image attached with this registration.
                </div>
              )}
            </div>

            {/* Status Change Controls */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">Update Status:</span>
                <button
                  onClick={() => handleStatusChange(selectedItem.id, 'Verified')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedItem.payment_status === 'Verified'
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                  }`}
                >
                  ✓ Approve
                </button>

                <button
                  onClick={() => handleStatusChange(selectedItem.id, 'Pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedItem.payment_status === 'Pending'
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                  }`}
                >
                  ⏳ Pending
                </button>

                <button
                  onClick={() => handleStatusChange(selectedItem.id, 'Rejected')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedItem.payment_status === 'Rejected'
                      ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20'
                  }`}
                >
                  ✕ Reject
                </button>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="btn-cyber-secondary text-xs py-2 px-5"
              >
                Close Modal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
