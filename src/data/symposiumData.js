// AURA 2026 - Central Configuration & Data File
// Organizers can easily update rules, timings, coordinators, and fees here.

export const SYMPOSIUM_CONFIG = {
  name: "AURA 2026",
  tagline: "Ignite Ideas. Challenge Limits. Create the Future.",
  college: "Adhiparasakthi Engineering College",
  department: "Department of Information Technology",
  date: "2026-10-29",
  displayDate: "29 October 2026",
  registrationDeadline: "28 October 2026",
  registrationFee: 120, // ₹120 per participant
  contactPhone: "6379954550",
  upiId: "nanbu773@okicici",
  upiPayeeName: "AURA 2026 Symposium",
  venue: "Department of Information Technology, Adhiparasakthi Engineering College, Melmaruvathur - 603319",
  emailPlaceholder: "symposium.it@adhiparasakthi.edu.in", // Placeholder
};

export const ABOUT_CARDS = [
  {
    id: "tech",
    title: "Technical Events",
    description: "Battle it out in high-stakes programming, prompt engineering, and data science challenges designed to test technical acumen.",
    icon: "Cpu",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: "nontech",
    title: "Non-Technical Events",
    description: "Unleash competitive spirit and teamwork across esports gaming, strategic box cricket, and high-speed word battles.",
    icon: "Gamepad2",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: "networking",
    title: "Networking & Growth",
    description: "Connect with passionate technocrats, innovators, and peers from top institutions across the state.",
    icon: "Users",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "innovation",
    title: "Innovation Hub",
    description: "Explore cutting-edge developments in Artificial Intelligence, Prompt Engineering, and Modern Computing.",
    icon: "Sparkles",
    gradient: "from-amber-400 to-orange-500"
  },
  {
    id: "competition",
    title: "Championship & Glory",
    description: "Compete for prestigious trophies, cash prizes, and certificates recognized across academia and industry.",
    icon: "Trophy",
    gradient: "from-emerald-400 to-teal-600"
  }
];

export const EVENTS = [
  // TECHNICAL EVENTS
  {
    id: "prompt-war",
    name: "Prompt War",
    category: "Technical Event",
    type: "technical",
    tagline: "Master the Art of Generative AI",
    description: "AI and prompt-based technical competition where participants demonstrate creativity, problem-solving ability, and effective use of AI prompting techniques.",
    image: "assets/prompt-war.jpg",
    icon: "Bot",
    color: "#00f2fe",
    highlights: ["Generative AI Models", "Multi-round Challenge", "Precision & Creativity"],
    timing: "Time to be announced",
    rules: "Detailed rules and evaluation criteria will be briefed prior to the event rounds.",
    coordinators: "Staff & Student Coordinators: To be announced",
    venue: "IT Computer Lab - Block A"
  },
  {
    id: "debugging",
    name: "Debugging",
    category: "Technical Event",
    type: "technical",
    tagline: "Hunt the Bugs. Fix the Code.",
    description: "Programming and debugging competition where participants identify and fix programming errors within a limited time.",
    image: "assets/debugging.jpg",
    icon: "Terminal",
    color: "#4facfe",
    highlights: ["Syntax & Logic Errors", "Timed Rounds", "C / C++ / Java / Python"],
    timing: "Time to be announced",
    rules: "Detailed rules and evaluation criteria will be briefed prior to the event rounds.",
    coordinators: "Staff & Student Coordinators: To be announced",
    venue: "Programming Lab - IT Dept"
  },
  {
    id: "data-analyzer",
    name: "Data Analyzer",
    category: "Technical Event",
    type: "technical",
    tagline: "Decode Insights from Raw Datasets",
    description: "Data analysis and data interpretation competition where participants analyze datasets and demonstrate logical and analytical thinking.",
    image: "assets/data-analyzer.jpg",
    icon: "BarChart3",
    color: "#8b5cf6",
    highlights: ["Dataset Exploration", "Analytical Storytelling", "Logical Problem Solving"],
    timing: "Time to be announced",
    rules: "Detailed rules and evaluation criteria will be briefed prior to the event rounds.",
    coordinators: "Staff & Student Coordinators: To be announced",
    venue: "Data Science Lab"
  },

  // NON-TECHNICAL EVENTS
  {
    id: "box-cricket",
    name: "Box Cricket",
    category: "Non-Technical Event",
    type: "non-technical",
    tagline: "High Octane Turf Showdown",
    description: "A fun and exciting team-based box cricket competition designed to encourage teamwork, energy, and competitive spirit.",
    image: "assets/box-cricket.jpg",
    icon: "Trophy",
    color: "#10b981",
    highlights: ["Fast-paced Overs", "Box Rules & Boundaries", "Team Camaraderie"],
    timing: "Time to be announced",
    rules: "Box cricket standard tournament rules will be provided at the captain's meet.",
    coordinators: "Staff & Student Coordinators: To be announced",
    venue: "College Campus Turf Grounds"
  },
  {
    id: "pubg",
    name: "PUBG",
    category: "Non-Technical Event",
    type: "non-technical",
    tagline: "Battle Royale Mobile Tournament",
    description: "A competitive gaming event where participants compete in a multiplayer battle royale competition.",
    image: "assets/pubg.jpg",
    icon: "Crosshair",
    color: "#f59e0b",
    highlights: ["Esports Battle Royale", "Survival & Strategy", "Custom Room Matches"],
    timing: "Time to be announced",
    rules: "Bring your own devices. Stable network connection and clean fair play enforced.",
    coordinators: "Staff & Student Coordinators: To be announced",
    venue: "Seminar Hall Arena"
  },
  {
    id: "word-smash",
    name: "Word Smash",
    category: "Non-Technical Event",
    type: "non-technical",
    tagline: "Test Your Lexical Speed & Reflexes",
    description: "A fast-paced word-based fun competition designed to test vocabulary, speed, creativity, and quick thinking.",
    image: "assets/word-smash.jpg",
    icon: "Sparkles",
    color: "#ec4899",
    highlights: ["Vocabulary Sprints", "Anagrams & Riddles", "Buzzer Rounds"],
    timing: "Time to be announced",
    rules: "Rounds include speed word association, anagram decoders, and rapid word ladder.",
    coordinators: "Staff & Student Coordinators: To be announced",
    venue: "IT Smart Classroom"
  }
];

export const SCHEDULE_ITEMS = [
  {
    phase: "01",
    title: "Registration & Check-in",
    time: "Time to be announced",
    description: "Reporting, participant kit collection, verification of transaction ID, and breakfast.",
    icon: "CheckCircle2"
  },
  {
    phase: "02",
    title: "Inauguration Ceremony",
    time: "Time to be announced",
    description: "Grand opening by dignitaries, HOD address, introduction of symposium tracks and rules.",
    icon: "Award"
  },
  {
    phase: "03",
    title: "Technical Events Track",
    time: "Time to be announced",
    description: "Prompt War, Debugging, and Data Analyzer preliminary and finale rounds in IT labs.",
    icon: "Code"
  },
  {
    phase: "04",
    title: "Non-Technical Events & Gaming Arena",
    time: "Time to be announced",
    description: "Box Cricket matches on turf, PUBG esports battle royale, and Word Smash showdowns.",
    icon: "Gamepad2"
  },
  {
    phase: "05",
    title: "Valedictory & Prize Distribution",
    time: "Time to be announced",
    description: "Announcement of winners, distribution of cash awards, mementos, and certificates.",
    icon: "Trophy"
  }
];
