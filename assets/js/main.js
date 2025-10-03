const body = document.body;
const header = document.querySelector('#header');
const navMenu = document.querySelector('#navmenu');
const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNavClose = navMenu ? navMenu.querySelector('.mobile-nav-close') : null;
const mobileNavIcon = mobileNavToggle ? mobileNavToggle.querySelector('i') : null;
const scrollTopButton = document.querySelector('.scroll-top');

const setMobileNavState = (isOpen) => {
  body.classList.toggle('mobile-nav-active', isOpen);

  if (mobileNavToggle) {
    mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (mobileNavIcon) {
    if (isOpen) {
      mobileNavIcon.classList.remove('bi-list');
      mobileNavIcon.classList.add('bi-x');
    } else {
      mobileNavIcon.classList.add('bi-list');
      mobileNavIcon.classList.remove('bi-x');
    }
  }
};

const openMobileNav = () => {
  if (!body.classList.contains('mobile-nav-active')) {
    setMobileNavState(true);
  }
};

const closeMobileNav = () => {
  if (body.classList.contains('mobile-nav-active')) {
    setMobileNavState(false);
  }
};

const toggleMobileNav = () => {
  if (body.classList.contains('mobile-nav-active')) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
};

if (mobileNavToggle && navMenu) {
  mobileNavToggle.addEventListener('click', () => {
    toggleMobileNav();
  });
}

if (mobileNavClose) {
  mobileNavClose.addEventListener('click', () => {
    closeMobileNav();
  });
}

if (navMenu) {
  document.addEventListener('click', (event) => {
    if (!body.classList.contains('mobile-nav-active')) {
      return;
    }

    const target = event.target;

    if (navMenu.contains(target) || (mobileNavToggle && mobileNavToggle.contains(target))) {
      return;
    }

    closeMobileNav();
  });
}

if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      closeMobileNav();
    });
  });
}
