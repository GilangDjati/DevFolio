const body = document.body;
const header = document.querySelector('#header');
const navMenu = document.querySelector('#navmenu');
const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNavIcon = mobileNavToggle ? mobileNavToggle.querySelector('i') : null;
const scrollTopButton = document.querySelector('.scroll-top');

const supportsHistoryPushState = typeof window !== 'undefined' && window.history && typeof window.history.pushState === 'function';
const supportsHistoryBack = typeof window !== 'undefined' && window.history && typeof window.history.back === 'function';

let mobileNavIsOpen = false;
let mobileNavHasHistoryEntry = false;

const syncMobileNavState = (isOpen) => {
  body.classList.toggle('mobile-nav-active', isOpen);

  if (mobileNavToggle) {
    mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (mobileNavIcon) {
    mobileNavIcon.classList.toggle('bi-list', !isOpen);
    mobileNavIcon.classList.toggle('bi-x', isOpen);
  }
};

const openMobileNav = () => {
  if (mobileNavIsOpen) {
    return;
  }

  mobileNavIsOpen = true;
  syncMobileNavState(true);

  if (supportsHistoryPushState) {
    window.history.pushState({ mobileNav: true }, '', window.location.href);
    mobileNavHasHistoryEntry = true;
  } else {
    mobileNavHasHistoryEntry = false;
  }
};

const closeMobileNav = (shouldNavigateBack = false) => {
  if (!mobileNavIsOpen) {
    return;
  }

  mobileNavIsOpen = false;
  syncMobileNavState(false);

  if (shouldNavigateBack && mobileNavHasHistoryEntry && supportsHistoryBack) {
    mobileNavHasHistoryEntry = false;
    window.history.back();
  } else {
    mobileNavHasHistoryEntry = false;
  }
};

if (mobileNavToggle && navMenu) {
  mobileNavToggle.addEventListener('click', () => {
    if (mobileNavIsOpen) {
      closeMobileNav(true);
    } else {
      openMobileNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (!mobileNavIsOpen) {
      return;
    }

    const target = event.target;

    if ((navMenu && navMenu.contains(target)) || (mobileNavToggle && mobileNavToggle.contains(target))) {
      return;
    }

    closeMobileNav(true);
  });

  window.addEventListener('popstate', (event) => {
    if (mobileNavIsOpen) {
      closeMobileNav(false);
      return;
    }

    if (event.state && event.state.mobileNav && supportsHistoryBack) {
      mobileNavHasHistoryEntry = false;
      window.history.back();
    }
  });
}

if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');

      if (mobileNavIsOpen) {
        closeMobileNav(false);
      }
    });
  });
}
