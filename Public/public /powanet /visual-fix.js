// public/powanet-visual-fix.js
window.addEventListener('load', () => {
  setInterval(() => {
    try {
      const dash = document.getElementById('dashboard');
      if (!dash || getComputedStyle(dash).display === 'none' || getComputedStyle(dash).visibility === 'hidden') {
        console.warn('Auto-restore dashboard');
        if (location.search.indexOf('reboot=visual-engine') === -1) {
          location.search = (location.search ? location.search + '&' : '?') + 'reboot=visual-engine';
        }
      }
    } catch(e) {}
  }, 5000);
});
