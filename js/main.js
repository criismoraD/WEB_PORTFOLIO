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
    var loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('hidden');
    }
  });

  /* ----------------------------------------------------------
     2. HEADER SCROLL EFFECT
  ---------------------------------------------------------- */
  var header = document.getElementById('siteHeader');

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
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');

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
     4. SCROLL REVEAL — Intersection Observer
  ---------------------------------------------------------- */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    var revealObserver = new IntersectionObserver(
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
    var grids = document.querySelectorAll('.skills-grid, .links-grid, .portfolio-grid');

    grids.forEach(function (grid) {
      var cards = grid.children;
      var gridObserver = new IntersectionObserver(
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
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('img01');
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
      var modal = document.getElementById('myModal');
      if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  });

  /* ----------------------------------------------------------
     7. BACK TO TOP BUTTON
  ---------------------------------------------------------- */
  var backToTop = document.getElementById('backToTop');

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
  window.openTab = function (tabName) {
    var i, tabContent, tabBtns;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.remove("active");
    }
    tabBtns = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtns.length; i++) {
      tabBtns[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
  };

  /* ----------------------------------------------------------
     9. TILT EFFECT ON PROFILE IMAGE
  ---------------------------------------------------------- */
  var profileImg = document.querySelector('.profile-img');

  if (profileImg) {
    profileImg.addEventListener('mousemove', function (e) {
      var rect = profileImg.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      profileImg.style.transform = 'scale(1.04) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg)';
    });

    profileImg.addEventListener('mouseleave', function () {
      profileImg.style.transform = 'scale(1)';
    });
  }

  /* ----------------------------------------------------------
     9. TYPING ANIMATION
  ---------------------------------------------------------- */
  var typingEl = document.getElementById('typingText');

  if (typingEl) {
    var roles = ['Technical Artist', 'Software Developer'];
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 100;

    function type() {
      var current = roles[roleIndex];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      var delay = typingSpeed;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000; // pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
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
  var canvas = document.getElementById('particleCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 80;
    var mouse = { x: null, y: null, radius: 100 };

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
    var scrollY = window.scrollY;
    window.addEventListener('scroll', function() {
      var currentScroll = window.scrollY;
      var scrollDiff = currentScroll - scrollY;
      scrollY = currentScroll;

      // Move particles with scroll
      for(var i = 0; i < particles.length; i++) {
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 255, 65, 0.4)';
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

    function initParticles() {
      particles = [];
      let numParticles = (canvas.width * canvas.height) / 12000;
      for (let i = 0; i < numParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dx = (Math.random() - 0.5) * 0.8;
        let dy = (Math.random() - 0.5) * 0.8;
        particles.push(new Particle(x, y, dx, dy, size));
      }
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (distance < (canvas.width / 10) * (canvas.height / 10)) {
            let opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = 'rgba(0, 255, 65,' + opacityValue * 0.3 + ')';
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
