/* ==========================================================
   i18n TRANSLATION ENGINE
========================================================== */

/* ==========================================================
   i18n TRANSLATION ENGINE
========================================================== */

(function initTranslations() {
const translationsDict = {
  es: {
    nav_home: "Inicio",
    nav_portfolio: "Portafolio",
    nav_skills: "Habilidades",
    nav_contact: "Contacto",
    aboutText: "Technical Artist con experiencia creando recursos 3D, entornos para Arquitectura, publicidad y diversas industrias. Actualmente ampliando mi perfil en desarrollo de software, combinando arte y código para ofrecer soluciones completas.",
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
    tabTrayectoria: "Trayectoria",
    tabSoftware: "Software & Tecnologías",
    catGames: "Motores de Videojuegos",
    catDev: "Herramientas de Desarrollo",
    cat3D: "Modelado y Escultura 3D",
    catPost: "Postproducción y Diseño",
    titleContact: "Contacto",
    contactIntro: "¿Tienes un proyecto en mente? Escríbeme y hablemos.",
    labelName: "Nombre",
    labelEmail: "Email",
    labelMessage: "Mensaje",
    btnSend: "Enviar Mensaje",
    placeholderName: "Tu nombre...",
    placeholderEmail: "tu@email.com",
    placeholderMessage: "Cuéntame sobre tu proyecto...",
    footerRights: "© 2026 Christian Mora Damian. Todos los derechos reservados."
  },
  en: {
    nav_home: "Home",
    nav_portfolio: "Portfolio",
    nav_skills: "Skills",
    nav_contact: "Contact",
    aboutText: "Technical Artist with experience creating 3D assets, environments for Architecture, advertising, and various industries. Currently expanding my profile in software development, combining art and code to deliver complete solutions.",
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
    tabTrayectoria: "Career Path",
    tabSoftware: "Software & Technologies",
    catGames: "Game Engines",
    catDev: "Development Tools",
    cat3D: "3D Modeling & Sculpting",
    catPost: "Post-production & Design",
    titleContact: "Contact",
    contactIntro: "Have a project in mind? Let's talk.",
    labelName: "Name",
    labelEmail: "Email",
    labelMessage: "Message",
    btnSend: "Send Message",
    placeholderName: "Your name...",
    placeholderEmail: "you@email.com",
    placeholderMessage: "Tell me about your project...",
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
