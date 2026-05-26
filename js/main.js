/* ============================================================
   REX-3D PORTFOLIO — Main JavaScript
   Scroll reveals, header effects, mobile menu, modal, back-to-top
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. PAGE LOADER
  ---------------------------------------------------------- */
  window.addEventListener('load', function () {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('hidden');
    }
  });

  /* ----------------------------------------------------------
     2. HEADER SCROLL EFFECT
  ---------------------------------------------------------- */
  const header = document.getElementById('siteHeader');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     3. MOBILE MENU TOGGLE
  ---------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    // Close menu when clicking a link
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }

  /* ----------------------------------------------------------
     4. SCROLL REVEAL VOXELS & Intersection Observer
  ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     5. STAGGERED CARD ANIMATIONS
  ---------------------------------------------------------- */
  function staggerCards() {
    const grids = document.querySelectorAll('.skills-grid, .links-grid, .portfolio-grid');

    grids.forEach(function (grid) {
      const cards = grid.children;
      const gridObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              Array.from(cards).forEach(function (card, i) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease ' + (i * 0.06) + 's, transform 0.5s ease ' + (i * 0.06) + 's';

                requestAnimationFrame(function () {
                  requestAnimationFrame(function () {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                  });
                });
              });
              gridObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );

      gridObserver.observe(grid);
    });
  }

  if ('IntersectionObserver' in window) {
    staggerCards();
  }

  /* ----------------------------------------------------------
     6. IMAGE MODAL (portfolio page)
  ---------------------------------------------------------- */
  window.openModal = function (imgSrc) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    if (!modal || !modalImg) return;

    modal.style.display = 'block';
    modalImg.src = imgSrc;
    document.body.style.overflow = 'hidden';

    // Close on click anywhere
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      modal.removeEventListener('click', closeModal);
    }

    modal.addEventListener('click', closeModal);
  };

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('myModal');
      if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  });

  /* ----------------------------------------------------------
     7. BACK TO TOP BUTTON
  ---------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     8. TABS LOGIC
  ---------------------------------------------------------- */
  window.openTab = function (event, tabName) {
    // 1. Encontrar el contenedor más cercano para no afectar otras secciones
    const container = event.currentTarget.closest(".tabs-container");
    if (!container) return;

    // 2. Desactivar el contenido activo solo en este contenedor
    const tabContents = container.querySelectorAll(".tab-content");
    tabContents.forEach((el) => el.classList.remove("active"));

    // 3. Desactivar el botón activo solo en este contenedor
    const tabBtns = container.querySelectorAll(".tab-btn");
    tabBtns.forEach((btn) => btn.classList.remove("active"));

    // 4. Activar el contenido y el botón seleccionados
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
  };

  /* ----------------------------------------------------------
     9. TILT EFFECT ON PROFILE IMAGE
  ---------------------------------------------------------- */
  const profileImg = document.querySelector('.profile-img');

  if (profileImg) {
    profileImg.addEventListener('mousemove', function (e) {
      const rect = profileImg.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      profileImg.style.transform = 'scale(1.04) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg)';
    });

    profileImg.addEventListener('mouseleave', function () {
      profileImg.style.transform = 'scale(1)';
    });
  }

  /* ----------------------------------------------------------
     9. TYPING ANIMATION
  ---------------------------------------------------------- */
  const typingEl = document.getElementById('typingText');
  let typingRoles = ["Technical Artist", "Software Developer"]; // Mantener siempre en inglés según preferencia del usuario
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  if (typingEl) {
    function type() {
      const current = typingRoles[roleIndex];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = typingSpeed;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000; // pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % typingRoles.length;
        delay = 400;
      } else if (isDeleting) {
        delay = 50;
      }

      setTimeout(type, delay);
    }

    type();
  }

})();

  /* ----------------------------------------------------------
     10. INTERACTIVE PARTICLE BACKGROUND
  ---------------------------------------------------------- */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    const mouse = { x: null, y: null, radius: 100 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', function(e) {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseout', function() {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    // Handle scroll offset
    let scrollY = window.scrollY;
    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      const scrollDiff = currentScroll - scrollY;
      scrollY = currentScroll;
      
      // Move particles with scroll
      for(let i = 0; i < particles.length; i++) {
        particles[i].y -= scrollDiff * 0.3; // Parallax effect
        
        // Wrap around vertically
        if(particles[i].y > canvas.height) {
          particles[i].y = 0;
        } else if (particles[i].y < 0) {
          particles[i].y = canvas.height;
        }
      }
    });

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      draw() {
        const palette = [
          'rgba(56, 189, 248, 0.45)',
          'rgba(167, 139, 250, 0.35)',
          'rgba(10, 150, 200, 0.35)'
        ];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.dx = -this.dx;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.dy = -this.dy;
        }

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = forceDirectionX * force * 5;
          let directionY = forceDirectionY * force * 5;
          
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Return to normal speed/direction slowly if displaced by mouse
          this.x += this.dx;
          this.y += this.dy;
        }

        this.draw();
      }
    }

    const PARTICLE_COLORS = [
      'rgba(56, 189, 248, 0.45)',
      'rgba(167, 139, 250, 0.35)',
      'rgba(10, 150, 200, 0.35)'
    ];

    function initParticles() {
      particles = [];
      let numParticles = (canvas.width * canvas.height) / 12000;
      for (let i = 0; i < numParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dx = (Math.random() - 0.5) * 0.8;
        let dy = (Math.random() - 0.5) * 0.8;
        const p = new Particle(x, y, dx, dy, size);
        p.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        particles.push(p);
      }
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (distance < (canvas.width / 10) * (canvas.height / 10)) {
            let opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = 'rgba(56, 189, 248,' + opacityValue * 0.2 + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connectParticles();
    }

    initParticles();
    animateParticles();
  }


  /* ----------------------------------------------------------
     11. INFINITE CAROUSEL LOGIC (DOUBLE DIRECTION)
  ---------------------------------------------------------- */
  const carousels = document.querySelectorAll('.portfolio-grid.carousel');
  carousels.forEach(carousel => {
    // Clone children to create infinite loop effect
    const children = Array.from(carousel.children);
    children.forEach(child => {
      const clone = child.cloneNode(true);
      carousel.appendChild(clone);
    });

    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Determine direction (1 for left, -1 for right)
    const isRightScrolling = carousel.classList.contains('carousel-right');
    const baseSpeed = isRightScrolling ? -0.5 : 0.5;
    let autoScrollSpeed = baseSpeed; 
    let currentScrollPos = 0; // Use float variable to avoid integer truncation lag
    
    // Improved initialization: no delay, waits for layout ready
    function setInitialPosition() {
        if (carousel.scrollWidth > 0) {
            if (isRightScrolling) {
                currentScrollPos = carousel.scrollWidth / 2;
                carousel.scrollLeft = currentScrollPos;
            } else {
                currentScrollPos = 0;
                carousel.scrollLeft = 0;
            }
        } else {
            requestAnimationFrame(setInitialPosition);
        }
    }
    setInitialPosition();

    // Pause on hover functionality
    carousel.addEventListener('mouseenter', () => {
      if(!isDown) autoScrollSpeed = 0;
    });

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      currentScrollPos = scrollLeft; // sync on click
      autoScrollSpeed = 0; 
    });
    
    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
      autoScrollSpeed = baseSpeed; 
    });
    
    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
      autoScrollSpeed = baseSpeed;
    });
    
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; 
      currentScrollPos = scrollLeft - walk;
      carousel.scrollLeft = currentScrollPos;
    });

    // Auto scrolling and infinite loop reset
    function autoScroll() {
      if (!isDown && carousel.scrollWidth > 0 && autoScrollSpeed !== 0) {
        currentScrollPos += autoScrollSpeed;
        
        // Infinite loop logic
        if (isRightScrolling) {
          if (currentScrollPos <= 0) {
            currentScrollPos = carousel.scrollWidth / 2;
          }
        } else {
          if (currentScrollPos >= (carousel.scrollWidth / 2)) {
            currentScrollPos = 0;
          }
        }
        carousel.scrollLeft = currentScrollPos;
      }
      requestAnimationFrame(autoScroll);
    }
    
    requestAnimationFrame(autoScroll);
  });


  /* ----------------------------------------------------------
     12. ACCESSIBILITY: KEYBOARD NAVIGATION FOR CAROUSEL
  ---------------------------------------------------------- */
  const imageContainers = document.querySelectorAll('.image-container[role="button"]');
  imageContainers.forEach(container => {
    container.addEventListener('keydown', (e) => {
      // Allow opening modal with Enter or Space
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        container.click();
      }
    });
  });

