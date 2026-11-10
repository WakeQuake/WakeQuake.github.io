// Mobile navigation toggle
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

  // Product gallery: swap main image when a thumbnail is clicked
  var heroImage = document.getElementById('heroImage');
  var galleryThumbs = document.getElementById('galleryThumbs');

  if (heroImage && galleryThumbs) {
    galleryThumbs.querySelectorAll('.gallery-thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        heroImage.src = thumb.getAttribute('data-image');
        heroImage.alt = thumb.getAttribute('data-alt') || heroImage.alt;

        galleryThumbs.querySelectorAll('.gallery-thumb').forEach(function (t) {
          t.classList.remove('active');
        });
        thumb.classList.add('active');
      });
    });
  }
});
