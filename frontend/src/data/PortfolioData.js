export const profile = {
  name: "Govind Singh",
  handle: "geekygovind",
  title: "Java & Full Stack AI Engineer",
  role: "Software Engineer | Full Stack Developer | DSA Enthusiast",
  location: "Kanpur, Uttar Pradesh, India",
  email: "govindsingh.dsai@gmail.com",
  phone: "+91 9026749148",
  linkedin: "https://www.linkedin.com/in/geekygovind/",
  github: "https://github.com/geekygovind",
  leetcode: "https://leetcode.com/u/geekygovind/",
  site: "https://geekygovind.netlify.app/",
  resumeUrl: "/Govind_Singh_Resume.pdf",
  avatar: "https://avatars.githubusercontent.com/u/154784407?v=4", // Github avatar fallback
  status: "AVAILABLE FOR OPPORTUNITIES",
  tagline:
    "Turning ideas into efficient code, scalable applications and meaningful digital experiences.",
  aboutHeadline: "CODE. CURIOSITY. CONSISTENCY.",
  aboutStory: [
    "I am a passionate Software Engineer and B.Tech CSE student specializing in Java, Data Structures & Algorithms, and modern Full Stack development.",
    "Driven by intense curiosity and engineering discipline, I spend my days breaking down complex algorithmic problems and building full-stack web applications that solve real-world problems.",
    "Whether it's optimizing search algorithms in Java or crafting seamless AI-powered web interfaces, my goal is always the same: write clean, efficient, and scalable software with an eye for detail.",
  ],
  stats: [
    { label: "Days Coding Streak", value: "200+", suffix: "Days" },
    { label: "DSA Problems Solved", value: "200+", suffix: "Problems" },
    { label: "Production Projects", value: "4+", suffix: "Apps" },
    { label: "Core Language", value: "Java & Python", suffix: "100%" },
  ],
  philosophy: ["Think", "Break Down", "Build", "Debug", "Improve"],
};

export const rotatingRoles = [
  "Full Stack Developer",
  "Problem Solver",
  "DSA Enthusiast",
  "AI/ML Engineer",
];

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Allenhouse Institute of Technology · Kanpur",
    period: "2025 — Expected 2029",
  },
  {
    degree: "Secondary Education",
    school: "New Kingston Senior Secondary School · Kanpur",
    period: "2024",
    note: "86.5%",
  },
];

export const videos = [
  {
    videoId: "ua-CiDNNj30",
    title: "Learn Data Science Tutorial — Full Course for Beginners",
    description:
      "A beginner-friendly introduction to the data science workflow, tools and core concepts.",
  },
  {
    videoId: "x7ULDYs4X84",
    title: "Python for Data Science — Course for Beginners",
    description:
      "Learn the Python foundations used in data science, including NumPy, Pandas and visualisation.",
  },
  {
    videoId: "GwIo3gDZCVQ",
    title: "Machine Learning Full Course — Learn Machine Learning",
    description:
      "A full introduction to machine-learning concepts, workflows and common algorithms.",
  },
  {
    videoId: "aircAruvnKk",
    title: "But what is a neural network? — Deep Learning Chapter 1",
    description:
      "An intuitive visual explanation of neural networks from 3Blue1Brown.",
  },
];

export const skillsCategories = [
  {
    name: "Languages",
    skills: [
      {
        name: "Java",
        level: "Advanced",
        icon: "SiJava",
        description:
          "Core CS foundation, OOP, Collection Framework, Multi-threading, Streams API & DSA implementations.",
        projectsCount: 8,
      },
      {
        name: "Python",
        level: "Advanced",
        icon: "SiPython",
        description:
          "Asynchronous backend APIs with FastAPI, automation scripting, AI/ML model integrations, NumPy/Pandas pipelines & DSA.",
        projectsCount: 8,
      },
      {
        name: "JavaScript",
        level: "Advanced",
        icon: "SiJavascript",
        description:
          "Modern ES6+, async/await, closures, promises, event loop, DOM manipulation, and functional paradigms.",
        projectsCount: 12,
      },
    ],
  },
  {
    name: "Frontend",
    skills: [
      {
        name: "React",
        level: "Advanced",
        icon: "SiReact",
        description:
          "Hooks, custom hooks, state management, SPA routing, and reusable component architectures.",
        projectsCount: 10,
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        level: "Intermediate",
        icon: "SiNodedotjs",
        description:
          "Event-driven non-blocking I/O, RESTful APIs, NPM package ecosystem, and asynchronous microservices.",
        projectsCount: 6,
      },
      {
        name: "Express.js",
        level: "Intermediate",
        icon: "SiExpress",
        description:
          "Middleware architecture, RESTful routing, JWT authentication, CORS, and error handling pipelines.",
        projectsCount: 6,
      },
      {
        name: "FastAPI",
        level: "Intermediate",
        icon: "SiFastapi",
        description:
          "High-performance asynchronous Python API endpoints, Pydantic data validation schemas, and AI service integration.",
        projectsCount: 5,
      },
    ],
  },
];

export const marqueeTech = [
  "JAVA",
  "PYTHON",
  "JAVASCRIPT",
  "REACT",
  "FASTAPI",
  "NODE.JS",
  "EXPRESS",
];

export const projects = [
  {
    id: "pulsebridge",
    number: "01",
    category: "FULL STACK",
    featured: true,
    title: "PulseBridge — AI-Powered Blood Donation Platform",
    subtitle:
      "Full-Stack MERN Platform for Real-Time Blood Donation Coordination & AI Donor Matching",
    description:
      "A life-saving blood donation platform connecting donors, recipients, and hospitals in real-time with Groq LLaMA 3.3 70B AI integration.",
    problem:
      "Traditional blood donation requests suffer from slow response times, lack of real-time inventory tracking, and cumbersome donor-matching workflows during emergencies.",
    solution:
      "Engineered an end-to-end MERN application featuring geolocation-based donor matching, automated SMS/email alerts, and an intelligent AI assistant that answers medical eligibility queries.",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Groq (LLaMA 3.3 70B)",
    ],
    github: "https://github.com/geekygovind/pulsebridge-blood-coordination",
    live: "https://pulsebridge-s4qi.onrender.com",
    image: "/PulseBridge.png",
    caseStudy: {
      idea: "Provide emergency blood coordination with instantaneous AI query triage and location matching.",
      architecture:
        "Client SPA (React + Vite) communicating with Node.js/Express REST API and Groq AI microservice, storing persistent records on MongoDB Atlas.",
      decisions: [
        "Selected Groq LLaMA 3.3 70B for ultra-fast response latency (<300ms) for AI medical query assistance.",
        "Implemented JWT authentication with role-based access for Donors, Recipients, and Admin Hospital staff.",
        "Built dynamic search indexing in MongoDB for rapid blood-group and location queries.",
      ],
      challenges:
        "Handling race conditions during rapid blood request fulfillment and ensuring privacy of medical records.",
      learnings:
        "Advanced asynchronous API orchestration, secure user state persistence, and deploying split frontend/backend services on cloud platforms.",
    },
  },
  {
    id: "nexshelf",
    number: "02",
    category: "FULL STACK",
    featured: false,
    title: "NexShelf — AI-Powered Library Management System",
    subtitle:
      "Intelligent Digital Library with Personalized AI Recommendations",
    description:
      "A modern library management ecosystem with automated cataloging, AI book recommendations, and interactive query assistant.",
    problem:
      "Conventional library portals lack intuitive search, personalized recommendations, and dynamic interaction features.",
    solution:
      "Created a sleek web platform with FastAPI backend and AI recommendations based on reading preferences and borrowing history.",
    tech: [
      "JavaScript",
      "Vite",
      "Python (FastAPI)",
      "MongoDB Atlas",
      "HTML5",
      "CSS3",
    ],
    github: "https://github.com/geekygovind/NexShelf",
    live: "https://nexshelf.onrender.com",
    image: "/NexShelf.png",
    caseStudy: {
      idea: "Reimagine library management by blending traditional book indexation with contextual AI discovery.",
      architecture:
        "Vite frontend paired with FastAPI microservice layer, managing data in MongoDB Atlas.",
      decisions: [
        "Used Python FastAPI for seamless integration with vector-based recommendation algorithms.",
        "Designed custom CSS cyber-glass layout for a futuristic reading lounge interface.",
      ],
      challenges:
        "Optimizing search performance across thousands of stored titles.",
      learnings:
        "API query caching, RESTful endpoint structure, and UI micro-interactions.",
    },
  },
  {
    id: "ai-study-planner",
    number: "03",
    category: "FULL STACK",
    featured: false,
    title: "AI Study Planner",
    subtitle: "Automated Academic Schedule Generator & Progress Tracker",
    description:
      "Personalized study schedule generator powered by FastAPI and MongoDB that transforms syllabus outlines into actionable daily study blocks.",
    problem:
      "Students struggle to break down large exam syllabi into manageable, structured study timelines.",
    solution:
      "Developed an algorithmic planner that calculates subject weights, time constraints, and generates custom study roadmaps.",
    tech: [
      "JavaScript",
      "React.js",
      "Vite",
      "Python (FastAPI)",
      "MongoDB Atlas",
    ],
    github: "https://github.com/geekygovind/AI-Study-Planner",
    live: "https://ai-study-planner-flax.vercel.app",
    image: "/AI-Study-Planner.png",
    caseStudy: {
      idea: "Provide students with an intelligent planner that adapts to their learning speed and upcoming exam deadlines.",
      architecture:
        "React frontend with real-time schedule visualization and FastAPI backend logic.",
      decisions: [
        "Built dynamic calendar timeline components in React with custom dragging and check-off features.",
        "Utilized MongoDB Atlas for persistent cloud synchronization across devices.",
      ],
      challenges:
        "Building dynamic time-allocation algorithms that adjust automatically when deadlines shift.",
      learnings:
        "State management for complex forms, schedule layout algorithms, and cloud deployment.",
    },
  },
  {
    id: "ai-translator",
    number: "04",
    category: "FRONTEND",
    featured: false,
    title: "AI Translator & Linguistics Hub",
    subtitle: "Multi-Language Neural Translation Application",
    description:
      "Fast neural-powered translation app providing instantaneous cross-language translation with contextual AI explanations.",
    problem:
      "Standard translation tools lack contextual nuances and technical jargon explanation.",
    solution:
      "Built a responsive web client with real-time translation feedback and AI language learning notes.",
    tech: [
      "JavaScript",
      "React.js",
      "Vite",
      "Python (FastAPI)",
      "MongoDB Atlas",
    ],
    github: "https://github.com/geekygovind/AI-Translator",
    live: "https://ai-translator-flax.vercel.app",
    image: "/AI-Translator.png",
    caseStudy: {
      idea: "Instant translation paired with grammatical breakdown and context notes.",
      architecture:
        "React Vite client communicating with neural translation APIs.",
      decisions: [
        "Implemented debounced input handlers to prevent API rate-limit throttling.",
      ],
      challenges: "Managing async state for concurrent translation requests.",
      learnings:
        "Debouncing techniques, error handling boundary, UI feedback UX.",
    },
  },
];

export const codeWindowSnippet = `public class Developer {
    // Core Identity
    private String name = "Govind Singh";
    private String role = "Software Engineer";
    private String primaryLanguage = "Java";
    
    // Core Skills & Focus
    private String[] interests = {
        "Data Structures & Algorithms",
        "Full Stack Web Engineering",
        "System Architecture",
        "Problem Solving"
    };

    // Engineering Philosophy Loop
    public void build() {
        while (isCurious()) {
            think();
            breakDownProblem();
            codeEfficiently();
            debugAndOptimize();
            shipValue();
        }
    }
    
    private boolean isCurious() {
        return true; // Lifelong Learner
    }
}`;

export const journeyTimeline = [
  {
    year: "2024 – 2025",
    title: "Basic Java & Programming Foundations",
    description:
      "Started programming journey by focusing on Core Java fundamentals — basic syntax, control flow, loops, methods, OOP concepts, and algorithmic logic building.",
    icon: "FaJava",
    tag: "BASIC JAVA",
  },
  {
    year: "2025 – 2026",
    title: "Java DSA & Web Development (HTML & CSS)",
    description:
      "Progressed into Data Structures & Algorithms in Java (Arrays, Strings, Recursion, Linked Lists) while mastering modern Web Development foundations with HTML5, CSS3, and JavaScript.",
    icon: "FaBrain",
    tag: "DSA & WEB DEV",
  },
  {
    year: "2026 – Present",
    title: "Advanced DSA, Backend Architecture & Databases",
    description:
      "Currently mastering advanced algorithmic problem solving on LeetCode (Trees, Graphs, Dynamic Programming) alongside engineering scalable backend services and databases with Node.js, Express, FastAPI, MongoDB, and SQL.",
    icon: "FaDatabase",
    tag: "CURRENT FOCUS",
  },
];

export const problemSolvingStats = {
  solved: "200+",
  totalCount: 200,
  totalSubmissions: 328,
  easySolved: 96,
  mediumSolved: 85,
  hardSolved: 15,
  streak: "200+ Days",
  badge: "200 Days Badge 2026",
  ranking: "Top ~860K",
  mainLanguage: "Java (100%)",
  handle: "@geekygovind",
  profileUrl: "https://leetcode.com/u/geekygovind/",
  platforms: [
    {
      name: "LeetCode",
      profile: "https://leetcode.com/u/geekygovind/",
      handle: "@geekygovind",
      badge: "Active Daily Solver",
    },
    {
      name: "GeeksforGeeks",
      profile: "https://github.com/geekygovind",
      badge: "CODEFUSE Hackathon",
    },
    {
      name: "GitHub",
      profile: "https://github.com/geekygovind",
      badge: "Consistent Commits",
    },
  ],
  categories: [
    { name: "Strings & Arrays", count: "80+ Solved", level: "Proficient" },
    {
      name: "Two Pointers & Sliding Window",
      count: "35+ Solved",
      level: "Proficient",
    },
    { name: "Binary Search", count: "25+ Solved", level: "Proficient" },
    {
      name: "Math & Logic",
      count: "25+ Solved",
      level: "Proficient",
    },
    { name: "Recursion & DP", count: "16+ Solved", level: "Intermediate" },
    {
      name: "Linked Lists & Stack",
      count: "15+ Solved",
      level: "Intermediate",
    },
  ],
  recentAccepted: [
    {
      name: "Roman to Integer",
      difficulty: "Easy",
      tag: "Strings / Math",
      lang: "Java",
    },
    {
      name: "Integer to Roman",
      difficulty: "Medium",
      tag: "Strings / Math",
      lang: "Java",
    },
    {
      name: "String Compression",
      difficulty: "Medium",
      tag: "Two Pointers",
      lang: "Java",
    },
    {
      name: "Removing Min & Max from Array",
      difficulty: "Medium",
      tag: "Greedy / Array",
      lang: "Java",
    },
    {
      name: "N-th Tribonacci Number",
      difficulty: "Easy",
      tag: "DP / Recursion",
      lang: "Java",
    },
  ],
};

export const githubFallback = {
  username: "geekygovind",
  publicRepos: 18,
  followers: 12,
  following: 15,
  stars: 24,
  topLanguages: [
    { name: "Java", percentage: 42, color: "#b07219" },
    { name: "JavaScript", percentage: 35, color: "#f1e05a" },
    { name: "HTML/CSS", percentage: 15, color: "#e34c26" },
    { name: "Python", percentage: 8, color: "#3572A5" },
  ],
  recentRepos: [
    {
      name: "pulsebridge-blood-coordination",
      stars: 5,
      language: "JavaScript",
      description:
        "Full-stack MERN blood donation & coordination app with Groq AI",
    },
    {
      name: "NexShelf",
      stars: 4,
      language: "JavaScript",
      description:
        "AI-powered library management system with personalized recommendations",
    },
    {
      name: "AI-Study-Planner",
      stars: 3,
      language: "Python",
      description: "AI study scheduler generating daily study roadmaps",
    },
    {
      name: "govind-singh-portfolio",
      stars: 6,
      language: "JavaScript",
      description:
        "Personal cinematic portfolio website built with React & GSAP",
    },
  ],
};

export const achievements = [
  {
    id: "leetcode-streak",
    title: "LeetCode 200 Days Badge 2026",
    issuer: "LeetCode",
    date: "2026",
    category: "BADGE",
    image: "/Leetcode.png",
    description:
      "Awarded for solving problems on LeetCode on 200+ days in 2026.",
  },
  {
    id: "cert-hachshood",
    title: "Hackathon · HachShood · CSJMU University",
    issuer: "CSJMU University",
    date: "30 Dec 2025 – 10 Jan 2026",
    category: "HACKATHON",
    image: "/Certificate_1.png",
    description:
      "Participated in intense university hackathon building innovative tech solutions under tight deadlines.",
  },
  {
    id: "cert-eduskills",
    title: "Generative AI & Deep Learning Certification",
    issuer: "Simple I Learners · EduSkills",
    date: "30 Dec 2025 – 10 Jan 2026",
    category: "CERTIFICATE",
    image: "/Certificate_2.jpeg",
    description:
      "Completed comprehensive course on Generative AI architectures, deep learning principles, and model deployment.",
  },
  {
    id: "cert-codefuse",
    title: "CODEFUSE · GeeksforGeeks Programming & AI",
    issuer: "GeeksforGeeks · CODEFUSE",
    date: "Oct – Nov 2025",
    category: "CERTIFICATE",
    image: "/Certificate_3.jpeg",
    description:
      "Achieved recognition for competitive programming excellence and AI integration challenge.",
  },
];

export const labExperiments = [
  {
    id: "exp-1",
    title: "Binary Search Step Visualizer",
    category: "Algorithm Visualizer",
    description:
      "Interactive step-by-step pointers (low, mid, high) demonstrating logarithmic searching in sorted arrays.",
    tech: ["React", "JavaScript", "CSS Modules"],
    status: "LIVE DEMO",
  },
  {
    id: "exp-2",
    title: "Cyber Glassmorphism Shaders",
    category: "CSS Experiments",
    description:
      "Experimental CSS backdrop-filter glare, holographic scanlines, and animated border glows.",
    tech: ["CSS3", "Keyframes", "Design Tokens"],
    status: "IN PORTFOLIO",
  },
  {
    id: "exp-3",
    title: "Interactive CLI Terminal Overlay",
    category: "Developer Tools",
    description:
      "Full-featured pseudo-shell in browser with command history, autocomplete hints, and custom easter eggs.",
    tech: ["React", "Custom Hooks", "Event Handling"],
    status: "ACTIVE FEATURE",
  },
  {
    id: "exp-4",
    title: "Constellation Particle Network Canvas",
    category: "Canvas Engine",
    description:
      "Lightweight HTML5 2D Canvas engine with cursor repulsion, proximity node links, and visibility pause optimization.",
    tech: ["HTML5 Canvas", "Math & Lerp", "rAnimationFrame"],
    status: "ACTIVE FEATURE",
  },
];
