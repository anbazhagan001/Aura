# AURA 2026 — Official Symposium Website
### Department of Information Technology, Adhiparasakthi Engineering College
**Symposium Date:** 29 October 2026 | **Registration Fee:** ₹120 per participant | **Contact:** 6379954550

---

## 🌟 Overview

**AURA 2026** is a modern, responsive, cyber-themed symposium web application developed for the **Department of Information Technology, Adhiparasakthi Engineering College**.

The website features a futuristic dark aesthetic with neon cyan and electric purple accents, cinematic video background, live countdown timer, technical and non-technical event portfolios, automated UPI QR code billing, registration submission with validation, downloadable digital E-Pass / receipts, and a password-protected organizer Admin Dashboard with real-time analytics and CSV exports.

---

## 🚀 Instant Quick Start

You can run this project in several ways with **zero hassle**:

### Method 1: Instant Browser Launch (No Node.js Required)
Simply open `index.html` in Google Chrome, Microsoft Edge, Brave, or Firefox.

### Method 2: Python Local Server (Already Running at `http://localhost:5173`)
Run in PowerShell or Command Prompt:
```powershell
python -m http.server 5173
```
Then visit: **[http://localhost:5173](http://localhost:5173)**

### Method 3: VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Method 4: Standard Vite + React (When Node.js is installed)
```bash
npm install
npm run dev
```

---

## 🎯 Key Features & Event Information

| Item | Details |
| :--- | :--- |
| **Symposium Name** | **AURA 2026** |
| **Institution** | **Adhiparasakthi Engineering College** |
| **Department** | **Department of Information Technology** |
| **Symposium Date** | **29 October 2026** |
| **Registration Deadline**| **28 October 2026** |
| **Registration Fee** | **₹120 per participant** |
| **Helpline Contact** | **6379954550** (Call & WhatsApp integrated) |
| **UPI ID** | `nanbu773@okicici` |
| **Admin Portal Passcode**| `aura2026admin` |

---

## 🏆 Featured Events

### Technical Events
1. **Prompt War**: AI and prompt-based technical competition testing generative AI mastery, creativity, and problem solving.
2. **Debugging**: Programming error identification and timed code fixing across C, C++, Java, and Python.
3. **Data Analyzer**: Data interpretation and statistical storytelling challenge evaluating analytical reasoning.

### Non-Technical Events
4. **Box Cricket**: High-energy team turf cricket tournament.
5. **PUBG**: Multiplayer battle royale mobile gaming tournament.
6. **Word Smash**: High-speed vocabulary sprints, anagram decoders, and rapid reflex word games.

*Note: Clicking "Register Now" on any event card automatically scrolls down and pre-selects the event in the registration form.*

---

## 💳 Payment & Registration Flow

1. **Personal Information**: Full Name, College Name, Department, Year of Study (1st to 4th), Phone Number (10-digit validation), Email Address.
2. **Multi-Event Selection**: Participants can choose one or multiple events with a single ₹120 fee.
3. **UPI Payment**:
   - Official UPI ID: `nanbu773@okicici` (with 1-click copy).
   - Dynamic UPI QR Code generated directly for instant scanning via GPay, PhonePe, Paytm, or BHIM.
   - Transaction ID / UTR Number validation.
   - Payment screenshot file upload with preview.
4. **Success Screen & E-Pass**:
   - Generates an official digital confirmation pass with Unique Registration ID (`AURA26-XXXX`).
   - One-click "Download Registration Confirmation" / Print E-Ticket button.

---

## 🛡️ Organizer Admin Portal

Access via the **"Admin"** button in the header or footer:
- **Default Passcode:** `aura2026admin` (or `admin123`)
- **Real-Time Analytics:**
  - Total Participants
  - Total Registrations
  - Technical Event Registrations
  - Non-Technical Event Registrations
  - Pending Payments
  - Total Verified Collections (₹)
- **Search & Filters:** Search by Name, College, Phone, Email, Reg ID, or UTR. Filter by Event and Status.
- **Participant Inspector:** View all attendee details and full-resolution payment screenshot proofs.
- **Status Updates:** Approve, Mark Pending, or Reject registrations with real-time state sync.
- **Data Export:** Export all attendee records to clean `.csv` for Excel and Google Sheets.

---

## 🗄️ Supabase PostgreSQL Integration

The application operates in **dual-mode**:
1. **Live Supabase Database:** Connected when environment credentials are provided.
2. **Local Resilient Fallback:** Stores in browser storage with realistic sample records if Supabase keys are not yet configured.

### Setting up your Supabase Database:
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project dashboard.
3. Copy and run the entire contents of [`supabase_schema.sql`](./supabase_schema.sql).
4. Go to **Project Settings > API**, copy your **Project URL** and **Anon Public Key**.
5. Add them to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

---

## 📁 Project Architecture

```
AURA-2026/
├── index.html                   # High-performance standalone web app entry
├── style.css                    # Cybernetic futuristic design system
├── supabase_schema.sql          # Complete Supabase PostgreSQL schema & RLS policies
├── package.json                 # Standard React dependencies
├── vite.config.js               # Vite bundler configuration
├── .env.example                 # Supabase configuration template
├── README.md                    # Project documentation
│
├── assets/                      # Generated event graphics & branding
│   ├── aura-logo.jpg            # Official AURA 2026 emblem
│   ├── prompt-war.jpg           # Prompt War event artwork
│   ├── debugging.jpg            # Debugging event artwork
│   ├── data-analyzer.jpg        # Data Analyzer event artwork
│   ├── box-cricket.jpg          # Box Cricket event artwork
│   ├── pubg.jpg                 # PUBG Gaming event artwork
│   └── word-smash.jpg           # Word Smash event artwork
│
└── src/
    ├── data/
    │   └── symposiumData.js     # Central editable config (events, timings, rules, contacts)
    ├── lib/
    │   └── supabase.js          # Supabase client & fallback persistence service
    ├── components/
    │   ├── Navbar.jsx           # Responsive navbar with mobile drawer
    │   ├── Hero.jsx             # Hero section with cinematic video background & countdown
    │   ├── About.jsx            # About cards & department highlights
    │   ├── EventCard.jsx        # Glassmorphic event cards
    │   ├── Events.jsx           # Events track with filter tabs & details modal
    │   ├── Schedule.jsx         # Timeline schedule with placeholder timings
    │   ├── RegistrationForm.jsx # Registration form with UPI QR code
    │   ├── SuccessModal.jsx     # Registration confirmation & printable pass
    │   ├── Contact.jsx          # Contact details, helpline, WhatsApp, map
    │   └── Footer.jsx           # Footer with links & copyright
    ├── pages/
    │   └── Admin.jsx            # Organizer Admin dashboard with stats & CSV export
    ├── App.jsx                  # Main application coordinator
    └── main.jsx                 # Vite application entry point
```

---

## ✏️ How to Update Event Details Later

As requested, all event timings, coordinators, rules, and schedules are stored in **[`src/data/symposiumData.js`](./src/data/symposiumData.js)**.

You can modify timings, rules, or contact numbers directly in that file without altering any layout or styling code!

---

© 2026 AURA — Department of Information Technology, Adhiparasakthi Engineering College.
#   A u r a  
 #   A u r a  
 