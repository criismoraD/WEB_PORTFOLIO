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
     8. TILT EFFECT ON PROFILE IMAGE
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
    var roles = ['Technical Artist', '3D Generalist', 'Software Developer'];
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

  /* ----------------------------------------------------------
     10. CUSTOM CURSOR WITH GLOW
  ---------------------------------------------------------- */
  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!isTouchDevice) {
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mouseX = -100;
    var mouseY = -100;
    var ringX = -100;
    var ringY = -100;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = 'translate(' + (mouseX - 4) + 'px, ' + (mouseY - 4) + 'px)';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = 'translate(' + (ringX - 18) + 'px, ' + (ringY - 18) + 'px)';
      requestAnimationFrame(animateRing);
    }

    animateRing();

    // Expand ring on interactive elements
    var interactives = document.querySelectorAll('a, button, .skill-card, .link-card, .image-container, input, textarea');
    interactives.forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('hover'); });
    });

    // Hide on mouse leave window
    document.addEventListener('mouseleave', function () {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

})();
