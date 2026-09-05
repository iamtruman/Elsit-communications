document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  /* Service category filter (services.html) */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var serviceCards = document.querySelectorAll('.service-card');
  if (filterButtons.length && serviceCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var group = btn.getAttribute('data-filter');
        serviceCards.forEach(function (card) {
          var cardGroups = (card.getAttribute('data-group') || '').split(' ');
          card.style.display = (group === 'all' || cardGroups.indexOf(group) !== -1) ? '' : 'none';
        });
      });
    });
  }

  /* Front-end form handling: no backend is wired into this rebuild yet,
     so we confirm the submission locally rather than silently failing. */
  var forms = document.querySelectorAll('form[data-local-handle]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) { valid = false; field.style.borderColor = '#B5602A'; }
        else { field.style.borderColor = ''; }
      });
      if (!status) return;
      if (!valid) {
        status.textContent = 'Please fill in the highlighted fields before sending.';
        status.style.color = '#B5602A';
      } else {
        status.textContent = 'Thanks — your message is ready to send. Connect this form to your mail handler to deliver it.';
        status.style.color = '#1F6F6B';
        form.reset();
      }
    });
  });

  /* Footer year */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Hero services slider (index.html) */
  var slider = document.getElementById('heroSlider');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.dot'));
    var current = 0;
    var timer = null;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function next() {
      goTo((current + 1) % slides.length);
    }

    function startAutoplay() {
      if (reduceMotion) return;
      stopAutoplay();
      timer = setInterval(next, 4200);
    }

    function stopAutoplay() {
      if (timer) clearInterval(timer);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        startAutoplay();
      });
    });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }
});
