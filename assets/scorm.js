/* Minimal SCORM 1.2 wrapper. Outside an LMS it falls back to the browser's localStorage,
   so the same files work as a plain website (GitHub Pages) and as a SCORM package. */
(function () {
  var api = null, finished = false, KEY = "fao-si-course-v2";

  function findAPI(win) {
    var n = 0;
    while (win && n < 12) {
      try { if (win.API) return win.API; } catch (e) { return null; }
      if (!win.parent || win.parent === win) break;
      win = win.parent; n++;
    }
    return null;
  }

  var store = {
    init: function () {
      api = findAPI(window);
      if (!api && window.opener) api = findAPI(window.opener);
      if (api) {
        api.LMSInitialize("");
        var st = api.LMSGetValue("cmi.core.lesson_status");
        if (!st || st === "not attempted") api.LMSSetValue("cmi.core.lesson_status", "incomplete");
        api.LMSCommit("");
      }
      return !!api;
    },
    inLMS: function () { return !!api; },
    load: function () {
      var raw = "";
      if (api) raw = api.LMSGetValue("cmi.suspend_data") || "";
      else { try { raw = window.localStorage.getItem(KEY) || ""; } catch (e) { raw = ""; } }
      try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
    },
    save: function (state, location) {
      var raw = JSON.stringify(state);
      if (api) {
        api.LMSSetValue("cmi.suspend_data", raw.slice(0, 4000));
        if (location) api.LMSSetValue("cmi.core.lesson_location", location);
        api.LMSCommit("");
      } else {
        try { window.localStorage.setItem(KEY, raw); } catch (e) { /* private mode: progress is not kept */ }
      }
    },
    complete: function (scorePct, passed) {
      if (!api) return;
      api.LMSSetValue("cmi.core.score.min", "0");
      api.LMSSetValue("cmi.core.score.max", "100");
      api.LMSSetValue("cmi.core.score.raw", String(Math.round(scorePct)));
      api.LMSSetValue("cmi.core.lesson_status", passed ? "passed" : "failed");
      api.LMSCommit("");
    },
    learnerName: function () {
      if (!api) return "";
      var n = api.LMSGetValue("cmi.core.student_name") || "";
      var parts = n.split(",");
      return parts.length === 2 ? (parts[1].trim() + " " + parts[0].trim()) : n;
    },
    reset: function () {
      if (!api) { try { window.localStorage.removeItem(KEY); } catch (e) {} }
    },
    finish: function () {
      if (!api || finished) return;
      finished = true;
      var st = api.LMSGetValue("cmi.core.lesson_status");
      api.LMSSetValue("cmi.core.exit", (st === "completed" || st === "passed") ? "" : "suspend");
      api.LMSCommit("");
      api.LMSFinish("");
    }
  };
  window.addEventListener("pagehide", store.finish);
  window.addEventListener("beforeunload", store.finish);
  window.CourseStore = store;
})();
