// src/data/portfolioData.js

// Iconos por tecnología (usando Iconify - simple-icons)
// Estos se usan tanto en las cards como en los botones de filtro
export const skillIcons = {
  react: "logos:react",
  laravel: "logos:laravel",
  flutter: "logos:flutter",
  nodejs: "logos:nodejs-icon",
  express: "simple-icons:express",
  tailwind: "logos:tailwindcss-icon",
  python: "logos:python",
  streamlit: "simple-icons:streamlit",
  php: "logos:php",
  mysql: "logos:mysql",
  javascript: "logos:javascript",
  tensorflow: "logos:tensorflow",
  sklearn: "simple-icons:scikitlearn",
  bluetooth: "simple-icons:bluetooth",
  openstreetmap: "simple-icons:openstreetmap",
  n8n: "simple-icons:n8n",
};

// Un color distinto por proyecto (se usa como acento en cada card)
export const portafolioData = [
  {
    id: "colcatrufis",
    titulo: "ColcaTrufis",
    imgSrc: "/projects/colcatrufis.png",
    color: "#01f2ff",
    skills: ["flutter", "laravel"],
    descripcion:
      "Aplicación móvil multiplataforma de movilidad urbana (Trufi/Radiotaxi) desarrollada durante mi pasantía oficial en el Gobierno Autónomo Municipal de Colcapirhua. Incluye datos oficiales de rutas municipales y consume APIs RESTful en Laravel. Actualmente en producción.",
    demoURL: "https://moviruta.colcapirhua.gob.bo",
    repoURL: "",
  },
  {
    id: "sistema-electoral",
    titulo: "Sistema de Boletas Electorales (NGP)",
    imgSrc: "/projects/sistema-electoral.png",
    color: "#ff6b35",
    skills: ["nodejs", "express", "react"],
    descripcion:
      "Sistema desplegado y utilizado oficialmente durante el proceso electoral subnacional de Cochabamba. Backend en Node.js/Express con APIs RESTful para procesamiento de datos electorales en tiempo real, y frontend en React con dashboard interactivo para visualización en vivo de resultados.",
    demoURL: "",
    repoURL: "",
  },
  {
    id: "ferreteria-urkupina",
    titulo: "Ferretería Urkupiña",
    imgSrc: "/projects/ferreteria-urkupina.png",
    color: "#D35400",
    skills: ["laravel", "react", "tailwind"],
    descripcion:
      "Sistema completo de inventario y gestión de productos para una ferretería, actualmente en uso activo por el negocio. Dashboard con tarjetas estadísticas interactivas, seguimiento de productos y control de stock, con animaciones personalizadas e identidad de marca propia.",
    demoURL: "",
    repoURL: "",
  },
  {
    id: "lectura-medidores",
    titulo: "Lectura de Medidores Eléctricos",
    imgSrc: "/projects/lectura-medidores.png",
    color: "#ffd60a",
    skills: ["flutter", "laravel", "bluetooth", "openstreetmap"],
    descripcion:
      "Aplicación móvil Android para técnicos de campo de la Cooperativa de Electricidad “15 de Noviembre” (Potosí). Registro de lecturas con geolocalización GPS, impresión automática de recibos térmicos vía Bluetooth ESC/POS, mapa interactivo de clientes con OpenStreetMap y backend en Laravel.",
    demoURL: "",
    repoURL: "",
  },
  {
    id: "automatizacion-n8n",
    titulo: "Automatización de Procesos con n8n",
    imgSrc: "/projects/automatizacion-n8n.png",
    color: "#ea4b71",
    skills: ["n8n"],
    descripcion:
      "Migración masiva automatizada de más de 6,500 filas de Excel hacia el sistema de boletas electorales, con trazabilidad completa. Integración y validación de datos multi-fuente mediante orquestación de workflows en n8n.",
    demoURL: "",
    repoURL: "",
  },
  {
    id: "iglesia-betania",
    titulo: "Sitio Web Iglesia Betania Restauración",
    imgSrc: "/projects/iglesia-betania.png",
    color: "#8e44ad",
    skills: ["python", "streamlit"],
    descripcion:
      "Sitio web para una iglesia local, actualmente en uso activo, con información actualizada de eventos, enlaces a redes sociales y datos relevantes de la congregación. Desarrollado íntegramente con Python + Streamlit como solución ligera y fácil de mantener.",
    demoURL: "",
    repoURL: "",
  },
  {
    id: "synapse",
    titulo: "Synapse — Plataforma Educativa",
    imgSrc: "/projects/synapse.png",
    color: "#2ecc71",
    skills: ["laravel", "php", "mysql", "javascript"],
    descripcion:
      "LMS completo con gestión de cursos, administración de usuarios y entrega de contenido académico. Acceso basado en roles (Estudiante / Profesor / Admin) con dashboards personalizados, evaluaciones automatizadas, seguimiento de progreso y reportes administrativos detallados. Optimizado con caching y eager loading.",
    demoURL: "",
    repoURL: "",
  },
  {
    id: "deteccion-fraude",
    titulo: "Detección de Fraude Financiero con Deep Learning",
    imgSrc: "/projects/deteccion-fraude.png",
    color: "#e74c3c",
    skills: ["python", "tensorflow", "sklearn", "streamlit"],
    descripcion:
      "Sistema híbrido Isolation Forest + Autoencoder (arquitectura 20-12-8-12-20) para detección de anomalías en transacciones. Pipeline diseñado para datos desbalanceados (fraude <0.1%), alcanzando 94.2% de precisión y 91.8% de recall sobre más de 150,000 transacciones. Dashboard interactivo en Streamlit con visualización de anomalías y scoring de riesgo adaptativo.",
    demoURL: "",
    repoURL: "",
  },
];