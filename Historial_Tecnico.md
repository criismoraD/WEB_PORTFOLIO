# Historial Técnico del Proyecto — WEB_PORTFOLIO

Este archivo registra las modificaciones y la estructura progresiva del portafolio Rex-3D de Christian Mora.

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

### [10-04-2026] Equilibrio de Intensidad V3.4
- **Optimización Sensorial**: Eliminación del sonido de rayo para mantener un entorno de navegación silencioso.
- **Ajuste de Visibilidad (Reducción 50%)**:
    - **Densidad**: Conteo de partículas reducido a la mitad (máximo 60 en Overdrive).
    - **Escala**: Reducción del tamaño radial de las partículas para un efecto más fino y menos invasivo.
    - **Post-procesado**: El resplandor (*Glow*) y el desenfoque (*Blur*) se redujeron al 50% de su intensidad anterior.
- **Mantenimiento**: Se conserva la sincronización con el Gato Rayo a los 8 clics, pero ahora con un impacto visual balanceado.
- **Archivos afectados**: `js/canvasVFX.js`.
