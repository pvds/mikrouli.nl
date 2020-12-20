import { focusable } from './helpers';

const panel = document.getElementById('help-panel');
const close = document.getElementById('help-panel-close');
let isOpen = false;

/**
 * Toggle help panel
 * @param {boolean} force
 */
export const toggleHelpPanel = (force = undefined) => {
  isOpen = typeof force === 'boolean' ? force : !isOpen;

  if (isOpen) {
    panel.classList.add('is-visible');
    focusable(close, true);
  } else {
    panel.classList.remove('is-visible');
    focusable(close, false);
  }
};

close.addEventListener('click', () => toggleHelpPanel(false));
