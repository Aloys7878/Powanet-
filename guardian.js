/* guardian.js
   POWANET Guardian — UI Integrity + Access Control + Auto-Backup
   Paste this into /public/guardian.js or directly into AppStudio Global JS.
*/

(function POWANET_GUARDIAN(){
  // Config
  const HEARTBEAT_MS = 5000;       // heartbeat interval
  const BACKUP_INTERVAL_MS = 60000; // auto backup every 60s (adjust)
  const REQUIRED_DOM_IDS = ["dashboard","app-root","networks","ego-chat"];

  // Helpers
  function log(...args){ console.log("[POWANET-GUARD]", ...args); }
  function safeSet(el, prop, val){
    try { el.style[prop] = val; } catch(e){ /* ignore */ }
  }

  // 1) Basic hardening on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    // ensure global flag
    window.powanetStopHide = true;
    // ensure dashboard visible
    const dash = document.getElementById("dashboard");
    if (dash) {
      safeSet(dash, "display", "block");
      safeSet(dash, "visibility", "visible");
      safeSet(dash, "opacity", "1");
      dash.setAttribute("data-powanet-guard", Date.now());
      log("Dashboard ensured visible.");
    } else {
      log("Warning: no #dashboard found yet.");
    }

    // Block common hide attempts by overwriting style setters (best effort)
    try {
      const proto = CSSStyleDeclaration.prototype;
      const originalSetProperty = proto.setProperty;
      proto.setProperty = function(name, value, priority){
        if (window.powanetStopHide && (name === "display" && value === "none" || name === "visibility" && value === "hidden" || name === "opacity" && (value === "0" || value === 0))) {
          console.warn("[POWANET-GUARD] Blocked style change:", name, value);
          return;
        }
        return originalSetProperty.apply(this, arguments);
      };
    } catch(e){ /* fail silently if env prevents overriding */ }

    // 2) Protect against removed nodes: reattach if missing
    const body = document.body;
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList" && m.removedNodes.length) {
          m.removedNodes.forEach(node => {
            if (node && node.id === "dashboard") {
              // re-insert snapshot if available
              log("Dashboard removed; attempting re-insert...");
              if (window._p_snapshot) {
                try { body.appendChild(window._p_snapshot.cloneNode(true)); log("Dashboard restored from snapshot."); }
                catch(e){ console.error(e); }
              }
            }
          });
        }
      }
    });
    observer.observe(body, { childList: true, subtree: true });

    // Save a lightweight snapshot for recovery
    try { window._p_snapshot = dash ? dash.cloneNode(true) : null; } catch(e){}

    // 3) Heartbeat
    setInterval(() => {
      try {
        const dash = document.getElementById("dashboard");
        if (!dash) {
          log("Heartbeat: dashboard missing — attempting re-insert.");
          if (window._p_snapshot) body.appendChild(window._p_snapshot.cloneNode(true));
          return;
        }
        // visibility checks
        const computed = window.getComputedStyle(dash);
        if (computed.display === "none" || computed.visibility === "hidden" || computed.opacity === "0") {
          log("Heartbeat: dashboard hidden — restoring styles.");
          safeSet(dash, "display", "block");
          safeSet(dash, "visibility", "visible");
          safeSet(dash, "opacity", "1");
        }
        // check required elements exist
        REQUIRED_DOM_IDS.forEach(id => {
          if (!document.getElementById(id)) {
            log("Missing required element:", id);
            // optionally create placeholder so UI doesn't break
            const ph = document.createElement("div");
            ph.id = id;
            ph.className = "powa-placeholder";
            ph.textContent = id + " (placeholder)";
            safeSet(ph, "padding", "8px");
            safeSet(ph, "color", "#eee");
            body.appendChild(ph);
            log("Inserted placeholder:", id);
          }
        });
        log("Heartbeat OK");
      } catch(e){ console.error("Heartbeat error:", e); }
    }, HEARTBEAT_MS);

    // 4) Auto-backup local state (IndexedDB/localStorage) -> attempt server backup
    async function doBackup() {
      try {
        const state = {
          ts: Date.now(),
          location: window.location.href,
          localStorage: {},
          sessionStorage: {},
        };
        for (let i=0;i<localStorage.length;i++){
          const k = localStorage.key(i);
          state.localStorage[k] = localStorage.getItem(k);
        }
        for (let i=0;i<sessionStorage.length;i++){
          const k = sessionStorage.key(i);
          state.sessionStorage[k] = sessionStorage.getItem(k);
        }
        // Save to IndexedDB fallback (simple)
        try {
          localStorage.setItem("POWANET_LAST_BACKUP", JSON.stringify(state));
        } catch(e){ /* mobile browsers may restrict */ }

        // Try server backup endpoint (if exists)
        if (navigator.onLine) {
          try {
            await fetch("/api/backup", {
              method: "POST",
              headers: { "Content-Type":"application/json" },
              body: JSON.stringify({ backup: state })
            });
            log("Remote backup attempted.");
          } catch(e){ log("Remote backup failed, kept local copy."); }
        }
      } catch(e){ console.error("Backup error:", e); }
    }

    // Schedule backups
    setInterval(doBackup, BACKUP_INTERVAL_MS);
    // first backup after small delay
    setTimeout(doBackup, 5000);

    // 5) Safe mode toggle (expose API)
    window.POWANET = window.POWANET || {};
    window.POWANET.enableSafeMode = function(){ window.powanetStopHide = true; log("Safe mode ON"); };
    window.POWANET.disableSafeMode = function(){ window.powanetStopHide = false; log("Safe mode OFF"); };

    log("POWANET Guardian initialized.");
  });
})();
