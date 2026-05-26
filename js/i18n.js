/* ==========================================================
   i18n TRANSLATION ENGINE
========================================================== */

(function initTranslations() {
const translationsDict = {
  es: {
    nav_home: "Inicio",
    nav_portfolio: "Portafolio",
    nav_skills: "Habilidades",

    heroBtnCV: "Descargar CV ↓",
    subtitle: "Technical Artist",
    aboutText: "Technical Artist con experiencia creando recursos 3D, entornos para Arquitectura, publicidad y diversas industrias. Actualmente ampliando mi perfil en desarrollo de software, combinando arte y código para ofrecer soluciones completas.",
    connectTitle: "Conecta conmigo",
    connectArtstation: "Ver mi trabajo",
    connectFreelancer: "Perfil profesional",
    connectLinkedin: "Conectemos",
    connectCgtrader: "Modelos 3D",
    connectGithub: "Repositorios",
    titleProjects: "Proyectos Destacados",
    titleServices: "Desarrollo & Automatización",
    servWebTitle: "Web & App Development",
    servWebDesc: "Aplicaciones web modernas, PWAs y plataformas interactivas de alto rendimiento.",
    servBotsTitle: "Bots de IA (WhatsApp/Telegram)",
    servBotsDesc: "Atención al cliente y procesos de negocio automatizados con Inteligencia Artificial.",
    servDesktopTitle: "Software de Escritorio",
    servDesktopDesc: "Herramientas administrativas y aplicaciones robustas para entornos Windows/Empresariales.",
    servAutoTitle: "Automatización & Scripting",
    servAutoDesc: "Scripts con Python y PowerShell para optimizar flujos de trabajo repetitivos y tareas de sistema.",
    titleTrayectoria: "Trayectoria",
    tabExperience: "Experiencia",
    tabEducation: "Educación",
    expEmmanuel: "Renders variados estilo low-poly para artista panameño.",
    expOrthodontic: "Modelado y Renderizado de piezas dentales.",
    eduSenati: "Desarrollo de Software",
    eduIsil: "Animación Digital y Diseño 3D",
    skillsTitle: "Habilidades",
    skillModeling: "Modelado High & Low Poly",
    skillOptimization: "Optimización de Rendimiento en Tiempo Real",
    skillProcedural: "Creación de Contenido Procedural",
    skillMaterials: "Materiales y Shaders",
    skillPBR: "Texturizado PBR",
    skillLighting: "Iluminación de Escenas",
    skillVFX: "Simulaciones de Fluidos y VFX",
    skillPost: "Postproducción",
    skillCAD: "Modelado CAD",
    skillScripting: "Scripting y Programación",
    softwareTitle: "Software & Tecnologías",
    catDev: "Lenguajes de Programación",
    catGames: "Motores de Videojuegos",
    catDevTools: "Herramientas de Desarrollo",
    cat3D: "Modelado y Escultura 3D",
    catTexturing: "Texturizado",
    catRender: "Motores de Render",
    catVFX: "VFX y Simulación",
    catPost: "Postproducción y Diseño",
    tabTechProfile: "Perfil Técnico",
    tabArtProfile: "Herramientas 3D",

    footerRights: "© 2026 Christian Mora Damian. Todos los derechos reservados."
  },
  en: {
    nav_home: "Home",
    nav_portfolio: "Portfolio",
    nav_skills: "Skills",

    heroBtnCV: "Download CV ↓",
    subtitle: "Technical Artist",
    aboutText: "Technical Artist with experience creating 3D assets, environments for Architecture, advertising, and various industries. Currently expanding my profile in software development, combining art and code to deliver complete solutions.",
    connectTitle: "Connect with me",
    connectArtstation: "View my work",
    connectFreelancer: "Professional Profile",
    connectLinkedin: "Let's connect",
    connectCgtrader: "3D Models",
    connectGithub: "Repositories",
    titleProjects: "Featured Projects",
    titleServices: "Development & Automation",
    servWebTitle: "Web & App Development",
    servWebDesc: "Modern web applications, PWAs, and high-performance interactive platforms.",
    servBotsTitle: "AI Bots (WhatsApp/Telegram)",
    servBotsDesc: "Customer support and automated business processes powered by AI.",
    servDesktopTitle: "Desktop Software",
    servDesktopDesc: "Administrative tools and robust applications for Windows/Enterprise environments.",
    servAutoTitle: "Automation & Scripting",
    servAutoDesc: "Python and PowerShell scripts to optimize repetitive workflows and system tasks.",
    titleTrayectoria: "Journey",
    tabExperience: "Experience",
    tabEducation: "Education",
    expEmmanuel: "Various low-poly style renders for Panamanian artist.",
    expOrthodontic: "Modeling and Rendering of dental pieces.",
    eduSenati: "Software Development",
    eduIsil: "Digital Animation and 3D Design",
    skillsTitle: "Technical Skills",
    skillModeling: "High & Low Poly Modeling",
    skillOptimization: "Realtime Performance Optimization",
    skillProcedural: "Procedural Content Creation",
    skillMaterials: "Materials & Shaders",
    skillPBR: "PBR Texturing",
    skillLighting: "Scene Lighting",
    skillVFX: "Fluid Simulations & VFX",
    skillPost: "Post-production",
    skillCAD: "CAD Modeling",
    skillScripting: "Scripting & Programming",
    softwareTitle: "Software & Technology",
    catDev: "Development Languages",
    catGames: "Game Engines",
    catDevTools: "Development Tools",
    cat3D: "3D Modeling & Sculpting",
    catTexturing: "Texturing",
    catRender: "Render Engines",
    catVFX: "VFX & Simulation",
    catPost: "Post-production & Design",
    tabTechProfile: "Technical Profile",
    tabArtProfile: "3D Tools",

    footerRights: "© 2026 Christian Mora Damian. All rights reserved."
  }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // Función central de traducción
    function setLanguage(lang) {
        // Actualizar UI de los botones
        langBtns.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Buscar y reemplazar texto de elementos genéricos
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const translationKey = el.getAttribute('data-i18n');
            if (translationsDict[lang][translationKey]) {
                // Pequeño fade out-in
                el.style.opacity = '0';
                setTimeout(() => {
                    el.textContent = translationsDict[lang][translationKey];
                    el.style.opacity = '1';
                }, 150);
            }
        });

        // Reemplazar Placeholders de inputs/textareas
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const translationKey = el.getAttribute('data-i18n-placeholder');
            if (translationsDict[lang][translationKey]) {
                el.setAttribute('placeholder', translationsDict[lang][translationKey]);
            }
        });

        // Guardar preferencia
        try {
            localStorage.setItem('preferredLang', lang);
        } catch(e) {} // Prevenir errores en incognito con iframe
        document.documentElement.lang = lang;
    }

    // Escuchar clicks
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            setLanguage(lang);
        });
    });

    // Lógica inteligente de detección:
    // 1. Preferencia guardada en localStorage
    // 2. Idioma del sistema (navigator.language)
    // 3. Español por defecto
    let initialLang = 'es';
    try {
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang) {
            initialLang = savedLang;
        } else {
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang && browserLang.startsWith('en')) {
                initialLang = 'en';
            }
        }
    } catch(e) {}
    
    setLanguage(initialLang);
});
})();
