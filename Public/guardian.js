// public/guardian.js
(function(){
  window.addEventListener('DOMContentLoaded', () => {
    try {
      const dash = document.getElementById('dashboard');
      if (dash) {
        dash.style.visibility = 'visible';
        dash.style.opacity = '1';
        dash.style.display = 'block';
      }
      const params = new URLSearchParams(window.location.search);
      if (params.get('reboot') === 'visual-engine') {
        console.log('POWANET visual reboot triggered');
        if (typeof window.powanetStopHide !== 'undefined') {
          window.powanetStopHide = false;
          setTimeout(()=> window.powanetStopHide = true, 3000);
        }
        if (dash) dash.innerHTML = dash.innerHTML;
      }
    } catch(e) {
      console.warn('guardian error', e);
    }
  });
})();
