/* ==========================================================
   CANVAS VFX ENGINE - Cursor Particles (V4.0 Touch+Mouse)
========================================================== */

(function initCursorParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = [];
    let combo = 0;
    let lastClick = 0;

    // Paleta Premium (Cian y Violeta)
    const COLORES = [[56, 189, 248], [167, 139, 250], [10, 150, 200]];
    const COLORES_OVERDRIVE = [[56, 189, 248], [167, 139, 250], [255, 255, 255]];

    window.addEventListener('resize', function() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    // Posicionar el gato en coordenadas X,Y del clic/tap
    function triggerGatoRayo(x, y) {
        const gato = document.getElementById('easterCat');
        if (!gato) return;

        // Centra el gato sobre el punto de tap (width=150px)
        const gatoW = 150;
        const gatoH = 150;
        let posX = Math.min(Math.max(x - gatoW / 2, 5), window.innerWidth  - gatoW - 5);
        let posY = Math.min(Math.max(y - gatoH / 2, 5), window.innerHeight - gatoH - 5);

        gato.style.left   = posX + 'px';
        gato.style.top    = posY + 'px';
        gato.style.bottom = 'auto';
        gato.style.right  = 'auto';
        gato.style.display = 'block';

        gato.animate(
            [{opacity: 0, transform: 'scale(0.5)'}, {opacity: 1, transform: 'scale(1)'}],
            {duration: 400, fill: 'forwards'}
        );
        setTimeout(() => {
            gato.animate(
                [{opacity: 1}, {opacity: 0}],
                {duration: 800, fill: 'forwards'}
            ).onfinish = () => { gato.style.display = 'none'; };
        }, 2500);
    }

    function spawnParticle(x, y, isClick, overdrive) {
        const col = overdrive
            ? COLORES_OVERDRIVE[Math.floor(Math.random() * COLORES_OVERDRIVE.length)]
            : COLORES[Math.floor(Math.random() * COLORES.length)];

        const size   = overdrive ? (Math.random() * 2 + 1.5) : (isClick ? (Math.random() * 1.2 + 0.6) : (Math.random() * 0.8 + 0.4));
        const vx     = isClick ? (Math.random() - 0.5) * (overdrive ? 16 : 6) : (Math.random() - 0.5) * 1.0;
        const vy     = isClick ? (Math.random() - 0.5) * (overdrive ? 16 : 6) : (Math.random() - 0.5) * 1.0;
        const maxLife = isClick ? (overdrive ? 35 : 20) : 10;

        particles.push({ x, y, vx, vy, size, maxLife, life: 0,
            r: col[0], g: col[1], b: col[2], overdrive, isTrail: !isClick });
    }

    // --- Rastro del Cursor (solo escritorio) ---
    let lastMoveTime = 0;
    window.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastMoveTime > 30) {
            spawnParticle(e.clientX, e.clientY, false, combo >= 6);
            lastMoveTime = now;
        }
    });

    // --- Disparador común para mouse y touch ---
    function handleInteraction(x, y) {
        const now = Date.now();
        if (now - lastClick < 400) { combo++; } else { combo = 1; }
        lastClick = now;

        const overdrive = combo >= 6;
        let particleCount = overdrive ? 60 : (5 + combo * 5);
        if (window.innerWidth < 768) particleCount = Math.floor(particleCount * 0.6);

        for (let i = 0; i < particleCount; i++) {
            spawnParticle(x, y, true, overdrive);
        }

        if (overdrive) {
            triggerGatoRayo(x, y);
            combo = 0;
        }
    }

    // Mouse click
    window.addEventListener('mousedown', function(e) {
        handleInteraction(e.clientX, e.clientY);
    });

    // Touch tap (móvil)
    window.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        handleInteraction(touch.clientX, touch.clientY);
    }, { passive: true });

    function animate() {
        ctx.clearRect(0, 0, w, h);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life++;
            if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }

            p.y += p.vy;
            p.x += p.vx;

            const friction = p.overdrive ? 0.96 : 0.93;
            p.vx *= friction;
            p.vy *= friction;

            const alpha = 1.0 - Math.pow(p.life / p.maxLife, 2);
            ctx.globalAlpha = Math.max(0, alpha * (p.isTrail ? 0.3 : 0.8));
            ctx.fillStyle = 'rgb(' + p.r + ',' + p.g + ',' + p.b + ')';

            if (p.overdrive) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
})();
