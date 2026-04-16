/* ==========================================================
   CANVAS VFX ENGINE - Cursor Particles (V3.6 Single Palette)
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

    const COLORES = [[0, 255, 65], [0, 150, 70], [20, 130, 50]];
    const COLORES_OVERDRIVE = [[0, 255, 65], [255, 255, 255]];

    window.addEventListener('resize', function() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    function triggerGatoRayo() {
        const gato = document.getElementById('easterCat');
        if (!gato) return;
        gato.style.display = 'block';
        gato.animate([{opacity: 0, transform: 'translateY(50px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 500, fill: 'forwards'});
        setTimeout(() => {
            gato.animate([{opacity: 1}, {opacity: 0}], {duration: 1500, fill: 'forwards'}).onfinish = () => gato.style.display = 'none';
        }, 3000); 
    }

    function spawnParticle(x, y, isClick, overdrive) {
        const col = overdrive ?
            COLORES_OVERDRIVE[Math.floor(Math.random() * COLORES_OVERDRIVE.length)] : 
            COLORES[Math.floor(Math.random() * COLORES.length)];
        
        const size = overdrive ? (Math.random() * 2 + 1.5) : (isClick ? (Math.random() * 1.2 + 0.6) : (Math.random() * 0.8 + 0.4));
        const vx = isClick ? (Math.random() - 0.5) * (overdrive ? 16 : 6) : (Math.random() - 0.5) * 1.0;
        const vy = isClick ? (Math.random() - 0.5) * (overdrive ? 16 : 6) : (Math.random() - 0.5) * 1.0;
        const maxLife = isClick ? (overdrive ? 35 : 20) : 10;

        particles.push({
            x: x, y: y,
            vx: vx, vy: vy,
            size: size,
            maxLife: maxLife,
            life: 0,
            r: col[0], g: col[1], b: col[2],
            overdrive: overdrive,
            isTrail: !isClick
        });
    }

    // --- Rastro Constante del Cursor ---
    let lastMoveTime = 0;
    window.addEventListener('mousemove', function(e) {
        const now = Date.now();
        // Generar 1 partícula de rastro cada 30ms al mover el ratón
        if (now - lastMoveTime > 30) {
            spawnParticle(e.clientX, e.clientY, false, combo >= 6);
            lastMoveTime = now;
        }
    });
    // -----------------------------------

    window.addEventListener('mousedown', function(e) {
        const now = Date.now();
        if (now - lastClick < 400) {
            combo++;
        } else {
            combo = 1;
        }
        lastClick = now;

        const overdrive = combo >= 6;
        
        let particleCount = overdrive ? 60 : (5 + (combo * 5));
        if (window.innerWidth < 768) particleCount *= 0.5;

        for(let i=0; i<particleCount; i++) {
           spawnParticle(e.clientX, e.clientY, true, overdrive);
        }

        if (overdrive) {
            triggerGatoRayo();
            combo = 0; 
        }
    });

    function animate() {
        ctx.clearRect(0, 0, w, h);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life++;
            if (p.life >= p.maxLife) {
                particles.splice(i, 1);
                continue;
            }
            
            p.y += p.vy;
            p.x += p.vx;
            
            const friction = p.overdrive ? 0.96 : 0.93;
            p.vx *= friction; 
            p.vy *= friction;

            const alpha = 1.0 - Math.pow(p.life / p.maxLife, 2);
            // El rastro sutil (isTrail) tiene aún menos opacidad para no ensuciar la pantalla
            ctx.globalAlpha = Math.max(0, alpha * (p.isTrail ? 0.3 : 0.8));
            ctx.fillStyle = 'rgb(' + p.r + ',' + p.g + ',' + p.b + ')';
            
            if (p.overdrive) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(0, 255, 65, 0.8)';
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
        requestAnimationFrame(animate);
    }
    animate();
})();
