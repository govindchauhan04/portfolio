export const profile = {
  name: 'Govind Singh',
  title: 'Impact-Driven Full Stack & AI/ML Engineer',
  location: 'Kanpur, Uttar Pradesh, India',
  email: 'govindsingh.dsai@gmail.com',
  phone: '9026749148',
  linkedin: 'https://www.linkedin.com/in/geekygovind/',
  github: 'https://github.com/geekygovind',
  site: 'https://geekygovind.netlify.app/',
  about:
    'Enthusiastic B.Tech CSE student building full-stack, AI-integrated web apps with the MERN stack. Comfortable across React, Node.js, Express, MongoDB and Python, with a growing focus on shipping AI-powered features and secure, scalable products.',
}

export const techStack = {
  frontend: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
  backend: ['Node.js', 'Express.js', 'Python (FastAPI)'],
  database: ['MongoDB', 'SQL'],
  languages: ['Java', 'Python', 'C'],
  tools: ['Git', 'GitHub', "Visual Studio Code", 'Vite'],
}

export const projects = [
  {
    title: 'PulseBridge-Blood Donation Platform',
    subtitle: 'AI-Powered Blood Donation Platform',
    image: '/PulseBridge.png',
    tech: ['React.js', 'Tailwind CSS', 'Vite', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Groq (LLaMA 3.3 70B)'],
    points: [
      'Full-stack MERN platform for blood donation management with real-time updates and donor matching',
      "AI-powered assistant for managing donor information and optimizing blood distribution",
      'Secure JWT auth with user profiles and favorite locations',
      'Deployed as separate frontend and backend services on Render with CI/CD pipelines',
    ],
    github: 'https://github.com/geekygovind/pulsebridge-blood-coordination',
    live: 'https://pulsebridge-s4qi.onrender.com',
  },
  {
    title: 'NexShelf - AI-Powered Library Management System',
    subtitle: 'AI-Powered Library Management System with Personalized Recommendations',
    image: '/NexShelf.png',
    tech: ['JavaScript', 'Vite', 'Python (FastAPI)', 'MongoDB Atlas', 'HTML5', 'CSS3'],
    points: [
      'Full-stack library management system with AI-generated personalized book recommendations',
      'AI chat assistant for answering questions about products and providing learning resources',
      'Feedback form with AI-generated thank-you replies, stored in MongoDB',
      'Deployed as separate frontend and backend services on Render with CI/CD pipelines',
    ],
    github: 'https://github.com/geekygovind/NexShelf',
    live: 'https://nexshelf.onrender.com',
  },
  {
    title: 'AI Study Planner',
    subtitle: 'AI-Powered Study Planner with Personalized Recommendations',
    image: '/AI-Study-Planner.png',
    tech: ['JavaScript', 'Vite', 'Python (FastAPI)', 'MongoDB Atlas', 'HTML5', 'CSS3'],
    points: [
      'Full-stack study planner with AI-generated personalized study plans and recommendations',
      'AI chat assistant for answering questions about study topics and providing learning resources',
      'Feedback form with AI-generated thank-you replies, stored in MongoDB',
      'Deployed as separate frontend and backend services on Render with CI/CD pipelines',
    ],
    github: 'https://github.com/geekygovind/AI-Study-Planner',
    live: 'https://ai-study-planner-flax.vercel.app',
  },
  {
    title: 'AI Translator',
    subtitle: 'AI-Powered Language Translation App',
    image: '/AI-Translator.png',
    tech: ['JavaScript', 'React.js', 'Vite', 'Python (FastAPI)', 'MongoDB Atlas'],
    points: [
      'Full-stack language translation app with AI-generated translations and recommendations',
      'AI chat assistant for answering questions about translation topics and providing learning resources',
      'Feedback form with AI-generated thank-you replies, stored in MongoDB',
    ],
    github: 'https://github.com/geekygovind/AI-Translator',
    live: 'https://ai-translator-flax.vercel.app',
  },
  {
    title: 'Portfolio Website',
    subtitle: 'Personal Portfolio with AI Chat Assistant',
    image: '/Portfolio.png',
    tech: ['React.js', 'Tailwind CSS', 'Vite', 'Python (FastAPI)', 'MongoDB Atlas', 'Groq (LLaMA 3.3 70B)'],
    points: [
      'Full-stack portfolio site with animated, glitch-styled UI and section-based layout',
      'AI chat assistant that answers visitor questions using Groq-powered LLM',
      'Feedback form with AI-generated thank-you replies, stored in MongoDB',
      'Deployed as separate frontend and backend services on Render with CI/CD pipelines',
    ],
    github: 'https://github.com/geekygovind/govind-singh-portfolio',
    live: 'https://geekygovind.netlify.app/',
  },
]

export const education = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'Allenhouse Institute of Technology · Kanpur',
    period: '2025 — Expected 2029',
  },
  {
    degree: 'Secondary Education',
    school: 'New Kingston Senior Secondary School · Kanpur',
    period: '2024',
    note: '86.5%',
  },
]

export const certificates = [
  {
    title: 'Hackathon · HachShood · CSJMU University',
    issuer: "CSJMU University · HachShood Hackathon",
    period: '30 Dec 2025 – 10 Jan 2026',
    src: '/Certificate_1.png',
  },
  {
    title: 'Simple I Learners · Generative AI & Deep Learning',
    issuer: "CEO · Simple I Learners · EduSkills",
    period: '30 Dec 2025 – 10 Jan 2026',
    src: '/Certificate_2.jpeg',
  },
  {
    title: 'CODEFUSE · GeeksforGeeks · programming & AI',
    issuer: 'GeeksforGeeks · CODEFUSE',
    period: 'oct – nov 2025',
    src: '/Certificate_3.jpeg',
  },
]

export const videos = [
  {
    videoId: 'ua-CiDNNj30',
    title: 'Learn Data Science Tutorial — Full Course for Beginners',
    description: 'A beginner-friendly introduction to the data science workflow, tools and core concepts.',
  },
  {
    videoId: 'x7ULDYs4X84',
    title: 'Python for Data Science — Course for Beginners',
    description: 'Learn the Python foundations used in data science, including NumPy, Pandas and visualisation.',
  },
  {
    videoId: 'GwIo3gDZCVQ',
    title: 'Machine Learning Full Course — Learn Machine Learning',
    description: 'A full introduction to machine-learning concepts, workflows and common algorithms.',
  },
  {
    videoId: 'aircAruvnKk',
    title: 'But what is a neural network? — Deep Learning Chapter 1',
    description: 'An intuitive visual explanation of neural networks from 3Blue1Brown.',
  },
]
