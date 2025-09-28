(function() {
  "use strict";

  const body = document.body;
  const header = document.querySelector('#header');
  const navMenu = document.querySelector('#navmenu');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const scrollTopButton = document.querySelector('.scroll-top');

  const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 60) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  };

  const updateScrollTop = () => {
    if (!scrollTopButton) return;
    if (window.scrollY > 200) {
      scrollTopButton.classList.add('active');
    } else {
      scrollTopButton.classList.remove('active');
    }
  };

  const navLinks = navMenu ? Array.from(navMenu.querySelectorAll('a[href^="#"]')) : [];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = () => {
    if (!sections.length) return;
    const position = window.scrollY + 200;
    let activeId = sections[0].id;

    sections.forEach(section => {
      if (position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
        activeId = section.id;
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      body.classList.toggle('mobile-nav-active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    });
  }

  if (navLinks.length) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active');
          if (mobileNavToggle) {
            mobileNavToggle.classList.add('bi-list');
            mobileNavToggle.classList.remove('bi-x');
          }
        }
      });
    });
  }

  if (scrollTopButton) {
    scrollTopButton.addEventListener('click', event => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const onScroll = () => {
    updateHeader();
    updateScrollTop();
    setActiveLink();
  };

  document.addEventListener('scroll', onScroll);
  window.addEventListener('load', () => {
    updateHeader();
    updateScrollTop();
    setActiveLink();
  });
  window.addEventListener('resize', setActiveLink);
})();
