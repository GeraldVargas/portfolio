 const portafolioData = [
  {
    imgSrc: "../img/portfolio_img/synapse.webp",
    titulo: "Synapse — LMS Platform",
    skills: ["Laravel", "MySQL", "PHP"],
    descripcion:
      "Full-featured Learning Management System with role-based access, automated assessments, and admin dashboards.",
    demoURL: "https://tu-demo.com",
    repoURL: "https://github.com/GeraldVargas/synapse",
    anim:"fade-right"
  },
  {
    imgSrc: "../img/portfolio_img/colcatrufi.webp",
    titulo: "ColcaTrufis",
    skills: ["Flutter", "Laravel", "REST API"],
    descripcion: "Cross-platform urban mobility app for the Municipal Government of Colcapirhua.",
    demoURL: "https://moviruta.colcapirhua.gob.bo",
    repoURL: "https://moviruta.colcapirhua.gob.bo",
    anim:"fade-up"
  },
  {
    imgSrc: "../img/portfolio_img/fraud.webp",
    titulo: "Financial Fraud Detection",
    skills: ["Python", "Streamlit", "Machine Learning"],
    descripcion: "Deep Learning system (Autoencoder + Isolation Forest) with 94.2% precision on 150,000+ transactions.",
    demoURL: "https://github.com/GeraldVargas/fraud-detection",
    repoURL: "https://github.com/GeraldVargas/fraud-detection",
    anim:"fade-left"
  },
  {
    imgSrc: "../img/portfolio_img/electoral.webp",
    titulo: "Electoral Ballot System",
    skills: ["Node.js", "React", "Realtime"],
    descripcion: "Official system used in the Cochabamba 2026 Sub-national Elections with real-time results dashboard.",
    demoURL: "https://github.com/GeraldVargas",
    repoURL: "https://github.com/GeraldVargas",
    anim:"fade-right"
  },
];

 const skillIcons = {
  React: "skill-icons:react-dark",
  "Node.js": "skill-icons:nodejs-dark",
  Laravel: "skill-icons:laravel-dark",
  PHP: "skill-icons:php-dark",
  MySQL: "skill-icons:mysql-dark",
  Flutter: "skill-icons:flutter-dark",
  "REST API": "carbon:api",
  Python: "skill-icons:python-dark",
  Streamlit: "simple-icons:streamlit",
  "Machine Learning": "carbon:machine-learning-model",
  Realtime: "mdi:chart-timeline-variant-shimmer",
};

export  {portafolioData,skillIcons}
