(function() {
  "use strict";

  const body = document.body;
  const header = document.querySelector('#header');

  const toggleScrolled = () => {
    if (!header) return;
    if (window.scrollY > 60) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  };

  window.addEventListener('load', toggleScrolled);
  document.addEventListener('scroll', toggleScrolled);

  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('#navmenu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      body.classList.toggle('mobile-nav-active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active');
          mobileNavToggle.classList.add('bi-list');
          mobileNavToggle.classList.remove('bi-x');
        }
      });
    });
  }

  const scrollTop = document.querySelector('.scroll-top');

  const toggleScrollTop = () => {
    if (!scrollTop) return;
    if (window.scrollY > 200) {
      scrollTop.classList.add('active');
    } else {
      scrollTop.classList.remove('active');
    }
  };

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  if (scrollTop) {
    scrollTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
})();
