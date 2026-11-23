// nav 
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('.nav-item').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // product
  var heroImage = document.getElementById('heroImage');
  var heroControls = document.querySelectorAll('.gallery-thumb[data-image], .sidebar .variety-item[data-image]');

  function showOnHero(src, alt) {
    heroImage.src = src;
    if (alt) heroImage.alt = alt;
    heroControls.forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-image') === src);
    });
  }

  if (heroImage) {
    heroControls.forEach(function (el) {
      el.addEventListener('click', function () {
        showOnHero(el.getAttribute('data-image'), el.getAttribute('data-alt'));
      });
    });
  }

  // Feature colors: each swatch swaps the image of its feature card
  document.querySelectorAll('.swatch-group').forEach(function (group) {
    var card = document.getElementById(group.getAttribute('data-target'));
    var cardImage = card && card.querySelector('.fcard-image');
    if (!cardImage) return;

    group.querySelectorAll('.swatch').forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        cardImage.src = swatch.getAttribute('data-image');
        group.querySelectorAll('.swatch').forEach(function (s) {
          s.classList.toggle('active', s === swatch);
        });
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        flash(card);
      });
    });
  });

  // sidebar links
  var sidebarLinks = Array.prototype.slice.call(document.querySelectorAll('.sidebar a[href^="#"]'));

  function setActiveLink(id) {
    sidebarLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  function flash(el) {
    el.classList.remove('is-highlighted');
    void el.offsetWidth; // restart the animation
    el.classList.add('is-highlighted');
  }

  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      history.replaceState(null, '', '#' + id);
      setActiveLink(id);
      flash(target);
    });
  });

  if ('IntersectionObserver' in window && sidebarLinks.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sidebarLinks.forEach(function (link) {
      var target = document.getElementById(link.getAttribute('href').slice(1));
      if (target) observer.observe(target);
    });
  }
});

    // show the sticky navbar once the user scrolls down a bit
    (function () {
      // fade in the product intro block once 20% of it enters the viewport
      const navbar = document.getElementById('topNavbar');
      if (!navbar) return;
      const toggleNavbar = () => {
        navbar.classList.toggle('is-visible', window.scrollY > 40);
      };
      window.addEventListener('scroll', toggleNavbar, { passive: true });
      toggleNavbar(); // run once on load in case the page reloads mid-scroll

      // fallback for older browsers without IntersectionObserver
      const fillerInfo = document.getElementById('heroFillerInfo');
      if (fillerInfo && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                fillerInfo.classList.add('is-visible');
                observer.unobserve(fillerInfo);
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(fillerInfo);
      } else if (fillerInfo) {
        fillerInfo.classList.add('is-visible');
      }

      // quick fade-out transition before navigating to the features page
      const featuresBtn = document.getElementById('heroFeaturesBtn');
      if (featuresBtn) {
        featuresBtn.addEventListener('click', (e) => {
          e.preventDefault();
          document.body.classList.add('page-fade-out');
          setTimeout(() => {
            window.location.href = featuresBtn.getAttribute('href');
          }, 100);
        });
      }
    })();
