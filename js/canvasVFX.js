/* ==========================================================
   CANVAS VFX ENGINE - Cursor Particles
========================================================== */

(function initCursorParticles() {
    // Solo escritorio por rendimiento (opcional pero recomendado en VFX pesados)
    if (window.innerWidth < 768) return;

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var w = canvas.width = window.innerWidth;
    var h = canvas.height = window.innerHeight;
    
    var particles = [];

    // Paleta: Verdes oscuros y técnicos
    var COLORES = [
      [0, 100, 40],     // Verde oscuro
      [10, 80, 20],     // Verdoso militar muy oscuro
      [0, 60, 15],      // Verde casi negro
      [20, 130, 50],    // Verde medio oscuro
      [0, 150, 70],     // Esmeralda oscuro
      [30, 100, 40],    // Verde opaco
    ];

    window.addEventListener('resize', function() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    function spawnParticle(x, y, isClick) {
        var col = COLORES[Math.floor(Math.random() * COLORES.length)];
        
        // Físicas diferentes si es un click o simplemente mover el mouse
        var vx = isClick ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 2;
        var vy = isClick ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 2 - 1.5; // Flotan ligeramente hacia arriba
        var maxLife = isClick ? Math.floor(Math.random() * 60) + 40 : Math.floor(Math.random() * 40) + 20;

        particles.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            size: Math.floor(Math.random() * 6) + 3, // Tamaño de voxels al cursor
            maxLife: maxLife,
            life: 0,
            r: col[0], g: col[1], b: col[2],
            glitch: Math.random() > 0.8
        });
    }

    window.addEventListener('mousedown', function(e) {
        // Explosión de polvo digital al cliquear
        for(var i=0; i<30; i++) {
           spawnParticle(e.clientX, e.clientY, true);
        }
    });

    function animate() {
        ctx.clearRect(0, 0, w, h);
        
        // Recorremos a la inversa para poder eliminar partículas muertas sin romper el loop
        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.life++;

            if (p.life >= p.maxLife) {
                particles.splice(i, 1);
                continue;
            }

            // Aplicar velocidad física
            p.y += p.vy;
            p.x += p.vx;

            // Fricción artificial (resistencia del aire para que se frenen suavemente)
            p.vx *= 0.95; 
            p.vy *= 0.95;

            // Glitch horizontal aleatorio como estática
            if (p.glitch && Math.random() > 0.9) {
                p.x += (Math.random() - 0.5) * 10;
            }

            var progress = p.life / p.maxLife;
            var alpha = 1.0 - Math.pow(progress, 2); // Curva de fade out más rápida al final

            ctx.globalAlpha = Math.max(0, alpha);
            ctx.fillStyle = 'rgb(' + p.r + ',' + p.g + ',' + p.b + ')';
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        }

        requestAnimationFrame(animate);
    }

    // Iniciar loop infinito
    animate();
})();
