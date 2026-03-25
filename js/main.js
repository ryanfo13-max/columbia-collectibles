/* ============================================================
   Columbia Collectibles — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. STICKY NAV
     ---------------------------------------------------------- */
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load in case page is already scrolled

  /* ----------------------------------------------------------
     2. MOBILE NAV HAMBURGER
     ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  /* ----------------------------------------------------------
     3. SCROLL-TRIGGERED FADE-UP ANIMATIONS
        (uses IntersectionObserver for performance)
     ---------------------------------------------------------- */
  var animateEls = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything for old browsers
    animateEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ----------------------------------------------------------
     4. BUY-LIST SLIDE-IN ANIMATION
        (separate observer for the directional slide)
     ---------------------------------------------------------- */
  var buyListItems = document.querySelectorAll('.buy-list__item');

  if ('IntersectionObserver' in window && buyListItems.length) {
    var buyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            buyObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -20px 0px' }
    );

    buyListItems.forEach(function (item) {
      buyObserver.observe(item);
    });
  } else {
    buyListItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  /* ----------------------------------------------------------
     5. TODAY'S HOURS HIGHLIGHT
     ---------------------------------------------------------- */
  var today = new Date().getDay(); // 0=Sun, 1=Mon, ... 6=Sat
  var todayRow = document.getElementById('day-' + today);

  if (todayRow) {
    todayRow.classList.add('today');

    // Subtle pulse on page load to draw attention
    setTimeout(function () {
      todayRow.style.transition = 'transform 0.2s ease';
      todayRow.style.transform = 'scale(1.015)';
      setTimeout(function () {
        todayRow.style.transform = 'scale(1)';
        setTimeout(function () {
          todayRow.style.transition = '';
        }, 200);
      }, 200);
    }, 800);
  }

  /* ----------------------------------------------------------
     6. SMOOTH SCROLL FOR ANCHOR LINKS
        (handles nav links and CTA buttons pointing to #sections)
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      var navHeight = nav ? nav.offsetHeight : 0;
      var targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

})();
