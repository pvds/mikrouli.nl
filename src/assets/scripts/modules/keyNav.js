import { toggleHelpPanel } from './help';

const keyNav = ({ code, ctrlKey, shiftKey }) => {
  const previousPageLink = document.getElementById('previous-page');
  const nextPageLink = document.getElementById('next-page');

  const homeLink = document.getElementById('home');

  if (!ctrlKey && code !== ('MetaLeft' || 'MetaRight')) {
    switch (code) {
      case 'ArrowLeft':
        if (!shiftKey) {
          previousPageLink?.click();
        }
        break;
      case 'ArrowRight':
        if (!shiftKey) {
          nextPageLink?.click();
        }
        break;
      case 'Escape':
        toggleHelpPanel(false);
        break;
      case 'Slash':
        if (shiftKey) {
          toggleHelpPanel();
        }
        break;
      case 'KeyH':
        homeLink?.click();
        break;
    }
  }
};

document.addEventListener('keydown', keyNav);
