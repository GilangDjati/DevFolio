const body = document.body;
const header = document.querySelector('#header');
const navMenu = document.querySelector('#navmenu');
const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNavIcon = mobileNavToggle ? mobileNavToggle.querySelector('i') : null;
const scrollTopButton = document.querySelector('.scroll-top');

if (mobileNavToggle && navMenu) {
  mobileNavToggle.addEventListener('click', () => {
    const navIsOpen = body.classList.toggle('mobile-nav-active');
    mobileNavToggle.setAttribute('aria-expanded', navIsOpen ? 'true' : 'false');

    if (mobileNavIcon) {
      mobileNavIcon.classList.toggle('bi-list', !navIsOpen);
      mobileNavIcon.classList.toggle('bi-x', navIsOpen);
    }
  });
}

if (navLinks.length) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');

      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');

        if (mobileNavToggle) {
          mobileNavToggle.setAttribute('aria-expanded', 'false');
        }

        if (mobileNavIcon) {
          mobileNavIcon.classList.add('bi-list');
          mobileNavIcon.classList.remove('bi-x');
        }
      }
    });
  });
}
