/* =====================================================
   POWANET UI HEARTBEAT + AUTO-RECOVERY SYSTEM
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const dash = document.getElementById("dashboard");

  // 1. Irimbura ko dashboard ihari
  if (!dash) {
    console.error("POWANET ERROR: Dashboard element not found!");
    return;
  }

  // 2. Anti-hide global flag
  window.powanetStopHide = true;

  // 3. Re-block any hide attempt
  if (HTMLElement.prototype.hide) {
    const originalHide = HTMLElement.prototype.hide;
    HTMLElement.prototype.hide = function () {
      if (window.powanetStopHide) {
        console.warn("POWANET BLOCK: hide attempt stopped");
        return;
      }
      originalHide.apply(this, arguments);
    };
  }

  // 4. Heartbeat (every 5 seconds)
  setInterval(() => {
    try {
      // --- Re-check visibility
      if (dash.style.display === "none" ||
          dash.style.visibility === "hidden" ||
          dash.style.opacity === "0" ||
          dash.offsetParent === null) {

        console.warn("POWANET ALERT: Dashboard hidden — Restoring...");

        // --- Auto-Repair
        dash.style.display = "block";
        dash.style.visibility = "visible";
        dash.style.opacity = "1";
      }

      // --- Ensure dashboard still exists in DOM
      if (!document.body.contains(dash)) {
        console.error("POWANET CRITICAL: Dashboard removed! Re-injecting...");

        document.body.appendChild(dash);
        dash.style.display = "block";
        dash.style.visibility = "visible";
        dash.style.opacity = "1";
      }

      console.log("POWANET Heartbeat OK");

    } catch (err) {
      console.error("POWANET Heartbeat Error:", err);
    }
  }, 5000); // 5 seconds

  console.log("POWANET UI HEARTBEAT + AUTO-RECOVERY ACTIVATED");
});
