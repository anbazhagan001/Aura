// Supabase Client & Resilient Data Service for AURA 2026
// Connects to Supabase when environment keys are provided,
// and gracefully falls back to persistent LocalStorage for demo & offline modes.

const SUPABASE_URL = typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL 
  ? process.env.VITE_SUPABASE_URL 
  : (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || window.__SUPABASE_URL || '';

const SUPABASE_ANON_KEY = typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY 
  ? process.env.VITE_SUPABASE_ANON_KEY 
  : (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || window.__SUPABASE_ANON_KEY || '';

const STORAGE_KEY = 'aura_2026_registrations_v1';

// Seed sample registrations for realistic demo and test verification
const SEED_DATA = [
  {
    id: 'seed-01',
    registration_id: 'AURA26-7841',
    full_name: 'Vigneshwaran K',
    college: 'Adhiparasakthi Engineering College',
    department: 'Information Technology',
    year: '3rd Year',
    phone: '9840123456',
    email: 'vignesh.k@gmail.com',
    selected_events: ['Prompt War', 'Debugging'],
    registration_fee: 120,
    payment_transaction_id: 'UPI984012984102',
    payment_screenshot: 'assets/prompt-war.jpg',
    payment_status: 'Verified',
    registration_date: '2026-10-01T10:30:00.000Z',
    admin_notes: 'Payment verified via ICICI UPI log'
  },
  {
    id: 'seed-02',
    registration_id: 'AURA26-7842',
    full_name: 'Priyadharshini S',
    college: 'Sri Sairam Engineering College',
    department: 'Computer Science and Engineering',
    year: '4th Year',
    phone: '8754129870',
    email: 'priya.s@outlook.com',
    selected_events: ['Data Analyzer', 'Word Smash'],
    registration_fee: 120,
    payment_transaction_id: 'UPI875412450912',
    payment_screenshot: 'assets/data-analyzer.jpg',
    payment_status: 'Pending',
    registration_date: '2026-10-02T14:15:00.000Z',
    admin_notes: 'Awaiting bank confirmation'
  },
  {
    id: 'seed-03',
    registration_id: 'AURA26-7843',
    full_name: 'Aravind Kumar M',
    college: 'Rajalakshmi Engineering College',
    department: 'Artificial Intelligence & Data Science',
    year: '2nd Year',
    phone: '9123456789',
    email: 'aravind.m@gmail.com',
    selected_events: ['PUBG', 'Box Cricket'],
    registration_fee: 120,
    payment_transaction_id: 'UPI912345129034',
    payment_screenshot: 'assets/pubg.jpg',
    payment_status: 'Verified',
    registration_date: '2026-10-02T16:45:00.000Z',
    admin_notes: 'Verified via GPay transaction'
  },
  {
    id: 'seed-04',
    registration_id: 'AURA26-7844',
    full_name: 'Sneha R',
    college: 'Adhiparasakthi Engineering College',
    department: 'Electronics & Communication',
    year: '3rd Year',
    phone: '9443210987',
    email: 'sneha.r@gmail.com',
    selected_events: ['Debugging', 'Word Smash'],
    registration_fee: 120,
    payment_transaction_id: 'UPI944321782390',
    payment_screenshot: 'assets/debugging.jpg',
    payment_status: 'Pending',
    registration_date: '2026-10-03T09:20:00.000Z',
    admin_notes: ''
  }
];

export class SupabaseService {
  constructor() {
    this.isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http'));
    this.client = null;
    
    if (this.isConfigured && window.supabase) {
      try {
        this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      } catch (err) {
        console.warn('Could not initialize Supabase client directly, falling back to local database.', err);
        this.isConfigured = false;
      }
    }
    
    this._initLocalStorage();
  }

  _initLocalStorage() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      }
    } catch (e) {
      console.warn('LocalStorage not accessible:', e);
    }
  }

  getLocalRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : SEED_DATA;
    } catch {
      return SEED_DATA;
    }
  }

  saveLocalRegistrations(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }

  generateRegistrationId() {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `AURA26-${randomDigits}`;
  }

  async submitRegistration(formData) {
    const regId = this.generateRegistrationId();
    const timestamp = new Date().toISOString();

    const record = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'reg-' + Date.now(),
      registration_id: regId,
      full_name: formData.fullName.trim(),
      college: formData.college.trim(),
      department: formData.department.trim(),
      year: formData.year,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      selected_events: formData.selectedEvents,
      registration_fee: 120,
      payment_transaction_id: formData.transactionId.trim(),
      payment_screenshot: formData.screenshotDataUrl || null,
      payment_status: 'Pending',
      admin_notes: '',
      registration_date: timestamp,
      created_at: timestamp
    };

    // If Supabase is active, try remote insert
    if (this.isConfigured && this.client) {
      try {
        const { data, error } = await this.client
          .from('registrations')
          .insert([record])
          .select();

        if (error) {
          console.warn('Supabase insert failed, saving to local store:', error);
          this._saveLocally(record);
        } else {
          // Also keep in sync locally
          this._saveLocally(record);
          return { success: true, registration: record, isRemote: true };
        }
      } catch (err) {
        console.warn('Supabase communication error:', err);
        this._saveLocally(record);
      }
    } else {
      // Local fallback
      this._saveLocally(record);
    }

    return { success: true, registration: record, isRemote: false };
  }

  _saveLocally(record) {
    const current = this.getLocalRegistrations();
    // Prepend new record so it appears at top
    current.unshift(record);
    this.saveLocalRegistrations(current);
  }

  async getAllRegistrations() {
    if (this.isConfigured && this.client) {
      try {
        const { data, error } = await this.client
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Error fetching from Supabase, returning local records:', err);
      }
    }
    return this.getLocalRegistrations();
  }

  async updatePaymentStatus(id, newStatus, adminNotes = '') {
    if (this.isConfigured && this.client) {
      try {
        await this.client
          .from('registrations')
          .update({ payment_status: newStatus, admin_notes: adminNotes })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase status update failed:', err);
      }
    }

    // Always update local storage
    const list = this.getLocalRegistrations();
    const updated = list.map(item => {
      if (item.id === id || item.registration_id === id) {
        return { ...item, payment_status: newStatus, admin_notes: adminNotes };
      }
      return item;
    });
    this.saveLocalRegistrations(updated);
    return { success: true };
  }

  async deleteRegistration(id) {
    if (this.isConfigured && this.client) {
      try {
        await this.client
          .from('registrations')
          .delete()
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }

    const list = this.getLocalRegistrations();
    const filtered = list.filter(item => item.id !== id && item.registration_id !== id);
    this.saveLocalRegistrations(filtered);
    return { success: true };
  }

  getAnalytics(registrations) {
    const total = registrations.length;
    let verified = 0;
    let pending = 0;
    let rejected = 0;
    const eventCounts = {};

    registrations.forEach(r => {
      if (r.payment_status === 'Verified') verified++;
      else if (r.payment_status === 'Rejected') rejected++;
      else pending++;

      if (Array.isArray(r.selected_events)) {
        r.selected_events.forEach(ev => {
          eventCounts[ev] = (eventCounts[ev] || 0) + 1;
        });
      }
    });

    const techCount = (eventCounts['Prompt War'] || 0) + (eventCounts['Debugging'] || 0) + (eventCounts['Data Analyzer'] || 0);
    const nonTechCount = (eventCounts['Box Cricket'] || 0) + (eventCounts['PUBG'] || 0) + (eventCounts['Word Smash'] || 0);

    return {
      total,
      verified,
      pending,
      rejected,
      techCount,
      nonTechCount,
      totalRevenue: verified * 120,
      potentialRevenue: total * 120,
      eventCounts
    };
  }

  exportCSV(registrations) {
    const headers = [
      'Registration ID',
      'Date',
      'Full Name',
      'College',
      'Department',
      'Year',
      'Phone',
      'Email',
      'Selected Events',
      'Fee (INR)',
      'Transaction ID',
      'Payment Status',
      'Admin Notes'
    ];

    const rows = registrations.map(r => [
      `"${r.registration_id}"`,
      `"${new Date(r.registration_date).toLocaleString()}"`,
      `"${(r.full_name || '').replace(/"/g, '""')}"`,
      `"${(r.college || '').replace(/"/g, '""')}"`,
      `"${(r.department || '').replace(/"/g, '""')}"`,
      `"${r.year || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.email || ''}"`,
      `"${(Array.isArray(r.selected_events) ? r.selected_events.join(', ') : '').replace(/"/g, '""')}"`,
      `"${r.registration_fee || 120}"`,
      `"${r.payment_transaction_id || ''}"`,
      `"${r.payment_status || 'Pending'}"`,
      `"${(r.admin_notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AURA_2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  resetDemoData() {
    this.saveLocalRegistrations(SEED_DATA);
    return SEED_DATA;
  }
}

export const supabaseService = new SupabaseService();
