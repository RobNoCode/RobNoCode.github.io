// Impulse BJJ: shared site animation
// Scroll reveals + header weight-on-scroll. No dependencies.
(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // Hero content: reveal immediately on load, staggered.
    var heroEls = document.querySelectorAll('.hero .eyebrow, .hero .belt-chip, .hero h1, .hero .lede, .hero-actions, .hero-media');
    heroEls.forEach(function (el, i) {
      el.classList.add('reveal-load');
      el.style.transitionDelay = (i * 90) + 'ms';
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        heroEls.forEach(function (el) { el.classList.add('in-view'); });
      });
    });

    // Scroll-triggered reveals for everything below the fold.
    var revealTargets = document.querySelectorAll(
      '.block-head, .statement-band h2, .statement-band p, .testimonial, .coach, .feature, .amenities, .tablewrap, form'
    );
    revealTargets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = ((i % 6) * 70) + 'ms';
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add('in-view'); });
    }

    // Header gains shadow/weight once the page scrolls.
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('scrolled', window.scrollY > 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

  });
})();
