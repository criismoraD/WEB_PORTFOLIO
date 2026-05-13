# Historial Técnico del Proyecto — WEB_PORTFOLIO

Este archivo registra las modificaciones y la estructura progresiva del portafolio Rex-3D de Christian Mora.

## [2026-05-13] Ajustes de Interfaz y Mejora de Servicios
- **Limpieza de Hero**: Se eliminó definitivamente la barra de estadísticas para mantener el foco 100% en la descripción y el CTA de descarga.
- **Navegación Móvil**: Se alinearon los íconos del menú de navegación hacia la izquierda en la cabecera móvil (`justify-content: flex-start`).
- **Upgrade Estético (Servicios)**: Se rediseñaron las tarjetas de "Desarrollo & Automatización" con gradientes sutiles tipo *glassmorphism*, sombras mejoradas (`box-shadow`), tipografía más limpia y efectos de hover profundos para un look premium.

## [2026-05-13] Ajuste de Hero: Skills en Stats Bar
- **Internacionalización**: Se actualizaron las nuevas secciones para soportar 100% bilingüismo vía `i18n.js` y `data-i18n`. Instagram se corrigió a `@rex.3d1`.

## [2026-05-13] Rediseño Premium del Hero (Resumen)
- Implementación de Hero panorámico, anillo brillante (`glow-ring`) y tarjeta horizontal de "Conecta conmigo".
- **Botones y Contacto**: Se incluyeron botones primarios/secundarios interactivos (Ver proyectos, Descargar CV apuntando al nuevo PDF). Además, los enlaces de contacto se estilizaron como "chips" elegantes debajo de la descripción.
- **Nueva Sección Conecta**: La antigua grilla de links se transformó en una barra horizontal elegante (`connect-section`) con divisores de gradiente.

## [2026-05-13] Corrección de Tabs y Limpieza de Imágenes

## [2026-05-13] Refactor Estético y Optimización de Rendimiento
- **Reordenamiento**: Sección "Desarrollo & Automatización" movida ANTES de "Proyectos Destacados".
- **Tabs Software**: Sección "Software & Tecnologías" dividida en tabs "Perfil Técnico" y "Perfil Artístico".
- **Nueva Paleta**: Gradiente cian→violeta (#38bdf8→#a78bfa). Viñeta, glows y partículas actualizados.
- **Rendimiento**: Preconnect a Google Fonts/jsdelivr, preload LCP image, fetchpriority/decoding en profile.jpeg.
- **JS Cleanup**: Eliminadas traducciones duplicadas de main.js (~4KB). Motor i18n centralizado en i18n.js.
- **Hero Restructura**: Foto movida a la derecha. Datos de contacto (email/teléfono) agregados en el hero.
- **Hero Responsive**: Imagen de perfil reposicionada debajo del label de "Technical Artist" en vista móvil. Alineación corregida en vista desktop.
- **Header**: Eliminado "Christian Mora" del header (logo-link oculto) y menú de navegación ahora perfectamente centrado.
- **Contacto**: Formulario reemplazado por tarjetas directas (email + teléfono) con datos reales.
- **Optimización WebP**: Las 29 imágenes (incluyendo perfil y miniaturas de software) fueron convertidas de `.png`/`.jpg` a formato `.webp` automatizado en Python para máxima compresión, mejorando el First Contentful Paint.
- **Easter Egg (Interactivo)**: El GIF secreto `gato_rayo.gif` ahora aparece dinámicamente centrado sobre las coordenadas exactas del ratón (`e.clientX`, `e.clientY`) y flota sobre el viewport usando `position: fixed` tras detonar el combo.
- **Imágenes Servicios**: 4 imágenes regeneradas con paleta cian→violeta (serv_web, serv_bots, serv_desktop, serv_auto).
- **Archivos afectados**: `index.html`, `CSS/styles.css`, `js/main.js`, `js/canvasVFX.js`, `js/i18n.js`, `img/serv_*.png`.

## [2026-05-12] Adición de Git y Cambio de Paleta de Colores
- Paleta verde Matrix → azul cian/hielo. Sincronización de partículas con nueva paleta.
- Archivos: `index.html`, `CSS/styles.css`, `js/canvasVFX.js`, `js/main.js`.

## [2026-04-09] Mejora de Layout y Corrección de Hero (Typing Effect)
- **Cambio**: Se incrementó el `max-width` de `.main-content` a **1300px**.
- **Cambio**: Refactorización del efecto de escritura (`typingText`) para soportar múltiples idiomas dinámicamente.
- **Corrección**: Se ajustó el selector de traducción para evitar que el texto traducido sobrescribiera el cursor de la animación, corrigiendo el error de duplicación visual.
- **Ajuste**: Se fijaron los términos del efecto de escritura ("Technical Artist" y "Software Developer") en inglés para ambos idiomas por preferencia del usuario.
- **Carrusel de Proyectos**: Se reparó el movimiento infinito de la segunda fila (RTL) y se aplicó un efecto de desvanecimiento (`mask-image`) en los laterales.
- **Formato Visual**: Se cambió el `aspect-ratio` de las imágenes de proyectos a **1:1 (cuadrado)** y se ajustó el ancho base a 320px para una estética más moderna.
- **Ajuste de Velocidad**: Se redujo la velocidad de autodesplazamiento del carrusel a la mitad (incremento de 0.5px) para mayor legibilidad.
- **Interactividad del Carrusel**: Se implementó la función de **pausa al pasar el ratón (hover)** y se optimizó el inicio del desplazamiento eliminando retardos innecesarios para que las filas se activen de inmediato.
- **Archivos afectados**: `styles.css`, `main.js`

### [10-04-2026] Localización Universal (i18n)
- **Infraestructura**: Implementación de atributos `data-i18n` en el HTML para un control centralizado de traducciones.
- **Motor JS**: Creación de `js/i18n.js` con soporte para desvanecimiento suave y almacenamiento local de preferencias.
- **Diccionario**: Ampliación masiva de traducciones para Navegación, Hero, Proyectos, Software y Contacto.
- **Archivos afectados**: `index.html`, `js/i18n.js`

### [10-04-2026] VFX, SEO y Optimización Final
- **Efectos Visuales**: Implementación del motor `js/canvasVFX.js`. Explosiones de partículas verdes al hacer clic (Touch Feedback).
- **SEO Técnico**: Configuración de OpenGraph, Twitter Cards y JSON-LD (Schema.org) para mejorar el posicionamiento y previsualización en redes sociales.
- **UI/UX Responsive**:
    - **Header**: Migración a Flexbox dinámico con `gap` de seguridad para evitar superposiciones en tablets.
    - **Hero**: Estabilización de tipografía en móviles (`white-space: nowrap`) para prevenir saltos de línea.
    - **Widget Idiomas**: El selector de idiomas ahora es un componente flotante absoluto para no interferir con la navegación principal.
- **Easter Eggs**: Integración de `img/gato_rayo.gif` activable tras 5 clics rápidos en el avatar del usuario.
- **Favicon**: Cambio del icono de la pestaña a `img/Rata_pela.jpeg`.
- **Navegación**: El botón "Back to Top" se configuró como siempre visible con ajuste de altura para móviles.
- **Archivos afectados**: `index.html`, `CSS/styles.css`, `js/main.js`, `js/canvasVFX.js`, `js/i18n.js`.

## [2026-04-09] Ajuste de Consistencia en Navegación
- **Cambio**: Se eliminó la clase `active` del botón "Inicio" en el `index.html`.
- **Razón**: El botón de Inicio tenía un formato resaltado (verde brillante y fondo oscuro) que no coincidía con los otros botones ("Portafolio" y "Contacto") al cargar la página. Ahora todos guardan la misma estética uniforme.
- **Archivo afectado**: `index.html`

### [10-04-2026] Refinamiento V3.0: i18n Inteligente y Layout Panorámico
- **Internacionalización**: Implementación de detección de idioma proactiva mediante `navigator.language` (Redirección automática a ENG/SPN).
- **Iconografía**: Sustitución de selectores de texto por **Banderas SVG** de alta fidelidad para un diseño más limpio y universal.
- **Rediseño de Servicios**:
    - **Formato**: Transición a un layout panorámico extremo (**aspect-ratio: 3:1**).
    - **Contenido**: Evolución de "Automatización Windows" a **"Automatización & Scripting"**, integrando Python y PowerShell en el discurso técnico.
    - **Activos**: Restauración de imágenes minimalistas ("ligeras") para reducir el ruido visual.
- **Layout Header**: Implementación de espaciadores flexibles para garantizar el centrado exacto de la navegación sobre el eje vertical de la página.
- **Archivos afectados**: `index.html`, `CSS/styles.css`, `js/i18n.js`.

### [10-04-2026] Rediseño de Navegación y Header V3.8
- **Integración de Cabecera**:
    - Se eliminó el selector de idiomas flotante y se integró directamente en el `siteHeader`.
    - Rediseño del layout para centrar el `nav` y situar el selector a la derecha.
- **Optimización Móvil (UX/UI)**:
    - **Iconificación**: Sustitución de etiquetas de texto por iconos SVG en el menú de navegación para ahorrar espacio y mejorar la estética.
    - **Switch de Idioma Físico**: Implementación de un selector tipo "switch" con textos ESP/ENG y una transición animada mediante pseudoelementos (`::before`) impulsada por el atributo `lang` del HTML.
    - **Limpieza**: Ocultación del nombre "Christian Mora" en el header móvil para evitar saturación visual.
- **Micro-ajustes VFX**:
    - **Gato Rayo**: Se redujo el tiempo de permanencia en pantalla de 10 a **3 segundos** para una interacción más ágil.
- **Cache-Busting**: Implementación de parámetros de versión (`?v=3.7`) en las llamadas a scripts para forzar la actualización en GitHub Pages.
- **Archivos afectados**: `index.html`, `CSS/styles.css`, `js/i18n.js`, `js/canvasVFX.js`.

### [10-04-2026] Refinamiento de Perfil y Navegación V3.7
- **Actualización de Bio**: Reajuste de enfoque profesional de "Technical Artist / Arte Hiperrealista" a **"Programador y Diseñador 3D"** en todas las meta-descripciones y etiquetas OG.
- **Mejora de UX**:
    - **Navegación**: Inserción del acceso directo a **Habilidades** en el menú principal (`siteHeader`).
    - **Estructura**: Asignación de `id="habilidades"` a la sección de skills para permitir el anclaje directo.
- **i18n**: Adición de la clave `nav_skills` en los diccionarios de español e inglés.
- **Archivos afectados**: `index.html`, `js/i18n.js`.
