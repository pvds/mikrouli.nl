import { createFocusTrap } from 'focus-trap';
import { debounce, focusable } from './helpers';

const SELECTORS = {
  nav: '.js-nav',
  navLinks: '.js-nav-link',
  openBtn: '.js-nav-open',
  closeBtn: '.js-nav-close',
};

const CLASSES = {
  open: 'is-open',
};

/**
 * Navigation menu singleton
 */
class Navigation {
  /**
   * Setup nav trigger action and add focus trap
   *
   * @hideconstructor
   */
  constructor() {
    this.isOpen = false;

    this.nav = document.querySelector(SELECTORS.nav);
    this.openBtn = this.nav.querySelector(SELECTORS.openBtn);
    this.closeBtn = this.nav.querySelector(SELECTORS.closeBtn);
    this.navLinks = this.nav.querySelectorAll(SELECTORS.navLinks);
    this.ctaLink = this.nav.querySelector(SELECTORS.ctaLink);
    this.focusTrap = createFocusTrap(this.nav, { allowOutsideClick: true });

    this.openBtn.addEventListener('click', () => this.toggleMenu(true));
    this.closeBtn.addEventListener('click', () => this.toggleMenu(false));
    this.close = this.toggleMenu(false);

    this.clickOutsideMenu = (e) => {
      if (!this.nav.contains(e.target)) return this.toggleMenu(false);
    };

    this.keyNav = (e) => {
      switch (e.code) {
        case 'Escape':
          this.toggleMenu(false);
          break;
        case 'KeyM':
          this.toggleMenu();
          break;
      }
    };

    document.addEventListener('keydown', debounce(this.keyNav, 200, true));
  }

  /**
   * Toggle navigation menu
   * @param {boolean} force
   */
  toggleMenu(force = undefined) {
    this.isOpen = typeof force === 'boolean' ? force : !this.isOpen;

    this.nav.classList.toggle(CLASSES.open, this.isOpen);
    this.openBtn.setAttribute('aria-expanded', String(this.isOpen));
    this.closeBtn.setAttribute('aria-expanded', String(this.isOpen));

    if (this.isOpen) {
      this.focusTrap.activate();
      window.addEventListener('click', this.clickOutsideMenu, true);

      focusable(this.closeBtn, true);

      [...this.navLinks].map((link) => {
        focusable(link, true);
      });
    } else {
      this.focusTrap.deactivate();
      window.removeEventListener('click', this.clickOutsideMenu, true);

      focusable(this.closeBtn, false);

      [...this.navLinks].map((link) => {
        focusable(link, false);
      });
    }
  }
}

if (document.querySelector(SELECTORS.nav)) {
  new Navigation();
}
