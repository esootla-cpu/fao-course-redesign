/* Course engine: navigation, home, side menu, progress, glossary and reusable interactions.
   Content files (lesson1.js, lesson2.js, lesson3.js, final.js) register lessons with Course.addLesson(). */
(function () {
  "use strict";

  var C = window.Course = { lessons: [], glossary: {}, people: {} };
  var state = { cur: "start", hist: [], v: {}, t: {}, q: {}, role: null, notes: "", name: "" };
  var FLAT = [], BY_ID = {};
  var el = {};

  /* ---------- helpers ---------- */
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function list(items) { return '<ul class="clean">' + items.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>"; }
  C.esc = esc; C.list = list;
  C.state = function () { return state; };

  C.howto = function (txt) { return '<p class="howto"><span class="howto-ico" aria-hidden="true">☝</span>' + txt + "</p>"; };
  C.keypoint = function (txt) { return '<div class="keypoint"><span class="kp-label">Key point</span>' + txt + "</div>"; };
  C.term = function (key, label) { return '<button type="button" class="term" data-term="' + key + '">' + (label || C.glossary[key].term) + "</button>"; };

  /* ---------- people (original characters) ---------- */
  C.people = {
    grace: { name: "Grace", role: "Agricultural officer, Ministry of Agriculture", skin: "#7a4a2a", hair: "#1e1a17", shirt: "#2e8b57", style: "bun",
      quote: "I need to match our national priorities with what science and innovation can offer." },
    arjun: { name: "Arjun", role: "Technical officer, FAO country office", skin: "#b9773f", hair: "#1e1a17", shirt: "#0a6ebd", style: "short", glasses: true,
      quote: "I run capacity-building and technology projects with farmers." },
    mei: { name: "Mei", role: "Partnerships officer, FAO liaison office", skin: "#e9be8f", hair: "#2e2420", shirt: "#e8920c", style: "long",
      quote: "I build links with research institutes, donors and companies." }
  };
  C.ROLE_KEYS = ["grace", "arjun", "mei"];
  C.avatar = function (key, bg, plain) {
    var p = C.people[key], b = bg || "#e6f2fb", s = "";
    s += '<svg viewBox="0 0 100 100"' + (plain ? ' width="100" height="100"' : ' role="img" aria-label="' + p.name + '"') + '><circle cx="50" cy="50" r="50" fill="' + b + '"/>';
    if (p.style === "long") s += '<rect x="25" y="15" width="50" height="62" rx="22" fill="' + p.hair + '"/>';
    s += '<path d="M22 92 V74 Q22 62 34 62 H66 Q78 62 78 74 V92 Z" fill="' + p.shirt + '"/>';
    s += '<rect x="44" y="52" width="12" height="13" fill="' + p.skin + '"/>';
    s += '<ellipse cx="50" cy="35" rx="21" ry="20" fill="' + p.hair + '"/>';
    if (p.style === "bun") s += '<circle cx="50" cy="13" r="8" fill="' + p.hair + '"/>';
    s += '<ellipse cx="50" cy="41" rx="17" ry="18" fill="' + p.skin + '"/>';
    s += '<circle cx="43.5" cy="40" r="1.9" fill="#2b2b2b"/><circle cx="56.5" cy="40" r="1.9" fill="#2b2b2b"/>';
    if (p.glasses) s += '<circle cx="43.5" cy="40" r="5.2" fill="none" stroke="#2b2b2b" stroke-width="1.4"/><circle cx="56.5" cy="40" r="5.2" fill="none" stroke="#2b2b2b" stroke-width="1.4"/><line x1="48.7" y1="40" x2="51.3" y2="40" stroke="#2b2b2b" stroke-width="1.4"/>';
    s += '<path d="M45 49 Q50 53 55 49" fill="none" stroke="#7a3328" stroke-width="1.8" stroke-linecap="round"/></svg>';
    return s;
  };
  C.icon = function (name) {
    var I = {
      phone: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="18" y="6" width="28" height="52" rx="6" fill="#0b3d66"/><rect x="22" y="12" width="20" height="36" rx="2" fill="#e6f2fb"/><path d="M26 30 l5 -8 l2 5 h4 l-6 10 l-1 -5 z" fill="#e8920c"/><circle cx="32" cy="53" r="2.4" fill="#e6f2fb"/></svg>',
      dry: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="46" cy="16" r="9" fill="#e8920c"/><path d="M4 50 Q20 38 34 46 T60 44 V60 H4 Z" fill="#c8a26a"/><path d="M12 54 l6 -4 l3 5 M30 52 l5 3 l4 -5 M46 54 l5 -3" stroke="#8a6a3c" stroke-width="2" fill="none"/></svg>',
      water: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="46" cy="14" r="8" fill="#e8920c"/><path d="M4 44 Q20 32 34 40 T60 38 V60 H4 Z" fill="#3e9b5f"/><path d="M4 52 Q16 48 28 52 T52 52 T64 50 V60 H4 Z" fill="#0a6ebd"/><circle cx="18" cy="32" r="5" fill="#1f6b40"/><rect x="17" y="35" width="2" height="6" fill="#6b4a2b"/></svg>'
    };
    return I[name] || "";
  };
  C.roleOrder = function () { var r = state.role || "grace"; return [r].concat(C.ROLE_KEYS.filter(function (k) { return k !== r; })); };
  C.situations = function (map) {
    var order = C.roleOrder(), h = "", first = order[0];
    h += '<div class="situation">' + C.avatar(first, "#fff") + '<div><b>' + C.people[first].name + ':</b> ' + map[first] + "</div></div>";
    h += '<details class="others"><summary>See the situation for the other two roles</summary>';
    order.slice(1).forEach(function (k) { h += '<div class="situation">' + C.avatar(k, "#fff") + '<div><b>' + C.people[k].name + ':</b> ' + map[k] + "</div></div>"; });
    return h + "</details>";
  };

  /* ---------- registration ---------- */
  C.addLesson = function (lesson) { C.lessons.push(lesson); };
  C.addGlossary = function (g) { Object.keys(g).forEach(function (k) { C.glossary[k] = g[k]; }); };
  C.special = {};
  function build() {
    FLAT = []; BY_ID = {};
    C.lessons.forEach(function (L, li) {
      L.screens.forEach(function (s, si) { s.lesson = L; s.pos = si; FLAT.push(s); BY_ID[s.id] = s; });
    });
    Object.keys(C.special).forEach(function (k) { BY_ID[k] = C.special[k]; });
  }

  /* ---------- persistence (compact, fits SCORM 1.2 suspend_data) ---------- */
  function save() {
    var vis = FLAT.map(function (s) { return state.v[s.id] ? "1" : "0"; }).join("");
    CourseStore.save({ c: state.cur, v: vis, t: state.t, q: state.q, r: state.role, n: state.notes.slice(0, 600), m: state.name }, state.cur);
  }
  C.save = save;
  function load() {
    var d = CourseStore.load();
    if (!d) return;
    state.cur = d.c || "start"; state.t = d.t || {}; state.q = d.q || {}; state.role = d.r || null; state.notes = d.n || ""; state.name = d.m || "";
    (d.v || "").split("").forEach(function (b, i) { if (b === "1" && FLAT[i]) state.v[FLAT[i].id] = true; });
  }
  C.record = function (id, correct) { if (!(id in state.t)) state.t[id] = correct ? 1 : 0; save(); };

  C.lessonProgress = function (L) {
    var seen = L.screens.filter(function (s) { return state.v[s.id]; }).length;
    return { seen: seen, total: L.screens.length, done: seen === L.screens.length };
  };
  C.resumeId = function (L) {
    for (var i = 0; i < L.screens.length; i++) if (!state.v[L.screens[i].id]) return L.screens[i].id;
    return L.screens[0].id;
  };

  /* ---------- modal & glossary ---------- */
  C.modal = function (html, opener) {
    var back = document.createElement("div");
    back.className = "modal-back";
    back.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><button class="close" aria-label="Close">×</button>' + html + "</div>";
    document.body.appendChild(back);
    function close() { back.remove(); document.removeEventListener("keydown", onKey); if (opener && opener.focus) opener.focus(); }
    function onKey(e) { if (e.key === "Escape") close(); }
    back.querySelector(".close").addEventListener("click", close);
    back.addEventListener("click", function (e) { if (e.target === back) close(); });
    back.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", close); });
    document.addEventListener("keydown", onKey);
    wireTerms(back);
    back.querySelector(".close").focus();
    return back;
  };
  function wireTerms(root) {
    root.querySelectorAll(".term").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = C.glossary[b.dataset.term];
        if (g) C.modal('<p class="kicker-sm">Glossary</p><h2>' + g.term + "</h2><p>" + g.def + "</p>", b);
      });
    });
  }

  /* ---------- reusable interactions ---------- */
  // Cards that open a pop-up with more detail.
  C.revealCards = function (cards, cols) {
    return {
      html: '<div class="grid g' + (cols || cards.length) + '">' + cards.map(function (c, i) {
        return '<button class="card click" data-reveal="' + i + '">' + (c.badge ? '<span class="badge ' + (c.color || "orange") + '">' + c.badge + "</span>" : "") +
          (c.img || "") + '<h3 style="margin-top:12px">' + c.title + "</h3>" + (c.teaser ? "<p>" + c.teaser + "</p>" : "") + '<span class="more">' + (c.more || "Open") + ' ›</span><span class="seen" hidden>✓ Seen</span></button>';
      }).join("") + "</div>",
      bind: function (root) {
        root.querySelectorAll("[data-reveal]").forEach(function (b) {
          b.addEventListener("click", function () {
            var c = cards[+b.dataset.reveal];
            b.querySelector(".seen").hidden = false;
            C.modal((c.badge ? '<span class="badge ' + (c.color || "orange") + '">' + c.badge + "</span>" : "") + "<h2>" + c.title + "</h2>" + c.body +
              '<p style="margin-top:18px"><button class="btn primary" data-close>Close</button></p>', b);
          });
        });
      }
    };
  };

  // Cards that turn over in place (front: prompt, back: answer).
  C.flipCards = function (cards, cols) {
    return {
      html: '<div class="grid g' + (cols || cards.length) + '">' + cards.map(function (c, i) {
        return '<button class="flip" data-flip="' + i + '" aria-pressed="false"><span class="flip-front">' + c.front + '<span class="more">Turn over ↻</span></span><span class="flip-back" hidden>' + c.back + "</span></button>";
      }).join("") + "</div>",
      bind: function (root) {
        root.querySelectorAll("[data-flip]").forEach(function (b) {
          b.addEventListener("click", function () {
            var on = b.getAttribute("aria-pressed") !== "true";
            b.setAttribute("aria-pressed", on); b.classList.toggle("flipped", on);
            b.querySelector(".flip-front").hidden = on; b.querySelector(".flip-back").hidden = !on;
          });
        });
      }
    };
  };

  // Tabs or numbered steps inside one screen.
  C.tabs = function (items, numbered) {
    return {
      html: '<div class="tabs' + (numbered ? " stepper" : "") + '" role="tablist">' + items.map(function (t, i) {
        return '<button class="tab" role="tab" aria-selected="' + (i === 0) + '" data-tab="' + i + '">' + (numbered ? '<span class="num">' + (i + 1) + "</span>" : "") + t.label + "</button>";
      }).join("") + '</div><div class="tabpanel" data-panel></div>' + (numbered ? '<div class="stepnav"><button class="btn small" data-prev>‹ Previous step</button><button class="btn small primary" data-next>Next step ›</button></div>' : ""),
      bind: function (root) {
        var cur = 0, seen = {};
        function show(i) {
          cur = i; seen[i] = true;
          root.querySelectorAll(".tab").forEach(function (t) { var k = +t.dataset.tab; t.setAttribute("aria-selected", k === i); t.classList.toggle("visited", !!seen[k] && k !== i); });
          var p = root.querySelector("[data-panel]"); p.innerHTML = items[i].html; wireTerms(p);
          if (items[i].bind) items[i].bind(p);
          var pv = root.querySelector("[data-prev]"), nx = root.querySelector("[data-next]");
          if (pv) { pv.disabled = i === 0; nx.disabled = i === items.length - 1; }
        }
        root.querySelectorAll(".tab").forEach(function (t) { t.addEventListener("click", function () { show(+t.dataset.tab); }); });
        var pv = root.querySelector("[data-prev]"), nx = root.querySelector("[data-next]");
        if (pv) { pv.addEventListener("click", function () { show(cur - 1); }); nx.addEventListener("click", function () { show(cur + 1); }); }
        show(0);
      }
    };
  };

  function checkRow(label) {
    return '<div class="checkrow"><button class="btn primary" data-check>' + (label || "Check my answer") + '</button><button class="btn" data-retry hidden>Try again</button><span class="muted" data-hint aria-live="polite"></span></div><div data-fb aria-live="polite"></div>';
  }
  function fbBox(ok, head, body) { return '<div class="feedback ' + (ok ? "ok" : "no") + '"><b>' + head + "</b>" + (body || "") + "</div>"; }
  C.fbBox = fbBox;

  // One answer.
  C.singleChoice = function (id, q, opts, onDone) {
    var h = '<p class="q">' + q + '</p><div class="opts">' + opts.map(function (o, i) {
      return '<button class="opt" type="button" aria-pressed="false" data-i="' + i + '"><span class="key">' + "ABCDEF"[i] + "</span><span>" + o.text + '<span class="fb" hidden></span></span></button>';
    }).join("") + "</div>" + checkRow();
    return {
      html: h,
      bind: function (root) {
        var sel = -1, btns = root.querySelectorAll(".opt");
        function clear() { btns.forEach(function (x) { x.setAttribute("aria-pressed", "false"); x.classList.remove("right", "wrong"); x.querySelector(".fb").hidden = true; }); root.querySelector("[data-fb]").innerHTML = ""; }
        btns.forEach(function (b) { b.addEventListener("click", function () { clear(); b.setAttribute("aria-pressed", "true"); sel = +b.dataset.i; root.querySelector("[data-hint]").textContent = ""; }); });
        root.querySelector("[data-check]").addEventListener("click", function () {
          if (sel < 0) { root.querySelector("[data-hint]").textContent = "Choose an answer first."; return; }
          var o = opts[sel], b = btns[sel];
          b.classList.add(o.correct ? "right" : "wrong");
          var f = b.querySelector(".fb"); f.textContent = o.feedback; f.hidden = false;
          root.querySelector("[data-fb]").innerHTML = fbBox(!!o.correct, o.head || (o.correct ? "Correct" : "Not quite"), o.correct ? "" : "Choose another answer and check again.");
          C.record(id, !!o.correct);
          if (onDone) onDone(!!o.correct, root);
        });
      }
    };
  };

  // Several answers.
  C.multiSelect = function (id, q, opts, okText, noText) {
    var h = '<p class="q">' + q + '</p><div class="opts">' + opts.map(function (o, i) {
      return '<button class="opt" type="button" role="checkbox" aria-checked="false" aria-pressed="false" data-i="' + i + '"><span class="key box"></span><span>' + o.text + '<span class="fb" hidden></span></span></button>';
    }).join("") + "</div>" + checkRow();
    return {
      html: h,
      bind: function (root) {
        var btns = root.querySelectorAll(".opt"), locked = false;
        btns.forEach(function (b) { b.addEventListener("click", function () { if (locked) return; var on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", on); b.setAttribute("aria-checked", on); }); });
        root.querySelector("[data-check]").addEventListener("click", function () {
          var picked = [], all = true;
          btns.forEach(function (b, i) { if (b.getAttribute("aria-pressed") === "true") picked.push(i); });
          if (!picked.length) { root.querySelector("[data-hint]").textContent = "Select at least one option."; return; }
          root.querySelector("[data-hint]").textContent = ""; locked = true;
          btns.forEach(function (b, i) {
            var o = opts[i], on = picked.indexOf(i) >= 0, f = b.querySelector(".fb");
            if (on !== !!o.correct) all = false;
            if (on || o.correct) { b.classList.add(o.correct ? "right" : "wrong"); f.textContent = (o.correct && !on ? "Missed: " : "") + o.feedback; f.hidden = false; }
          });
          root.querySelector("[data-fb]").innerHTML = '<div class="feedback ' + (all ? "ok" : "no") + '">' + (all ? okText : noText) + "</div>";
          root.querySelector("[data-check]").hidden = true; root.querySelector("[data-retry]").hidden = all;
          C.record(id, all);
        });
        root.querySelector("[data-retry]").addEventListener("click", function () {
          locked = false;
          btns.forEach(function (b) { b.classList.remove("right", "wrong"); b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-checked", "false"); b.querySelector(".fb").hidden = true; });
          root.querySelector("[data-fb]").innerHTML = ""; root.querySelector("[data-check]").hidden = false; root.querySelector("[data-retry]").hidden = true;
        });
      }
    };
  };

  // Sort items into categories: one row per item, one button per category.
  C.classify = function (id, q, cats, items, okText, noText) {
    var h = '<p class="q">' + q + '</p><div class="sorter">' + items.map(function (it, i) {
      return '<div class="sort-item" data-item="' + i + '"><div class="sort-text">' + it.text + '</div><div class="sort-cats" role="group" aria-label="Category">' +
        cats.map(function (c, k) { return '<button type="button" class="chip" data-cat="' + k + '" aria-pressed="false">' + c + "</button>"; }).join("") +
        '</div><div class="fb" hidden></div></div>';
    }).join("") + "</div>" + checkRow("Check my answers");
    return {
      html: h,
      bind: function (root) {
        var pick = {};
        root.querySelectorAll(".sort-item").forEach(function (row) {
          row.querySelectorAll(".chip").forEach(function (b) {
            b.addEventListener("click", function () {
              row.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
              pick[row.dataset.item] = +b.dataset.cat; row.classList.remove("right", "wrong"); row.querySelector(".fb").hidden = true;
            });
          });
        });
        root.querySelector("[data-check]").addEventListener("click", function () {
          if (Object.keys(pick).length < items.length) { root.querySelector("[data-hint]").textContent = "Sort every item first."; return; }
          root.querySelector("[data-hint]").textContent = "";
          var all = true;
          items.forEach(function (it, i) {
            var row = root.querySelector('[data-item="' + i + '"]'), ok = pick[i] === it.cat, f = row.querySelector(".fb");
            if (!ok) all = false;
            row.classList.toggle("right", ok); row.classList.toggle("wrong", !ok);
            f.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Best fit: " + cats[it.cat] + ".</b> ") + it.why; f.hidden = false;
          });
          root.querySelector("[data-fb]").innerHTML = '<div class="feedback ' + (all ? "ok" : "no") + '">' + (all ? okText : noText) + "</div>";
          C.record(id, all);
        });
      }
    };
  };

  // Choose a value for each item from a dropdown.
  C.match = function (id, q, options, items, okText, noText) {
    var opts = '<option value="">Choose…</option>' + options.map(function (o) { return '<option value="' + o.value + '">' + o.label + "</option>"; }).join("");
    var h = '<p class="q">' + q + '</p><div class="match">' + items.map(function (it, i) {
      return '<div class="item' + (it.img ? "" : " noimg") + '" data-item="' + i + '">' + (it.img || "") + "<div>" + it.text + '</div><select aria-label="Answer for item ' + (i + 1) + '">' + opts + '</select><div class="fb" hidden></div></div>';
    }).join("") + "</div>" + checkRow("Check my answers");
    return {
      html: h,
      bind: function (root) {
        root.querySelectorAll(".match select").forEach(function (s) { s.addEventListener("change", function () { var it = s.closest(".item"); it.classList.remove("right", "wrong"); it.querySelector(".fb").hidden = true; }); });
        root.querySelector("[data-check]").addEventListener("click", function () {
          var sels = root.querySelectorAll(".match select"), all = true, empty = false;
          sels.forEach(function (s) { if (!s.value) empty = true; });
          if (empty) { root.querySelector("[data-hint]").textContent = "Answer every item first."; return; }
          root.querySelector("[data-hint]").textContent = "";
          sels.forEach(function (s, i) {
            var it = s.closest(".item"), ok = s.value === items[i].answer, f = it.querySelector(".fb");
            if (!ok) all = false;
            it.classList.toggle("right", ok); it.classList.toggle("wrong", !ok);
            var lab = options.filter(function (o) { return o.value === items[i].answer; })[0].label;
            f.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Best fit: " + lab + ".</b> ") + items[i].why; f.hidden = false;
          });
          root.querySelector("[data-fb]").innerHTML = '<div class="feedback ' + (all ? "ok" : "no") + '">' + (all ? okText : noText) + "</div>";
          C.record(id, all);
        });
      }
    };
  };

  // Branching scenario: a chain of decisions, each with consequences.
  C.scenario = function (id, nodes) {
    return {
      html: '<div class="scenario" data-scn></div>',
      bind: function (root) {
        var box = root.querySelector("[data-scn]"), firstRight = true, step = 0;
        function show(n) {
          var node = nodes[n];
          box.innerHTML = '<div class="scn-step">Decision ' + (n + 1) + " of " + nodes.length + '</div><p class="scn-sit">' + node.situation + '</p><p class="q">' + node.q + '</p><div class="opts">' +
            node.options.map(function (o, i) { return '<button class="opt" data-o="' + i + '"><span class="key">' + "ABC"[i] + "</span><span>" + o.text + "</span></button>"; }).join("") + '</div><div data-out aria-live="polite"></div>';
          wireTerms(box);
          box.querySelectorAll("[data-o]").forEach(function (b) {
            b.addEventListener("click", function () {
              var o = node.options[+b.dataset.o];
              if (!o.best && firstRight && !box.dataset.tried) firstRight = false;
              box.dataset.tried = "1";
              box.querySelectorAll("[data-o]").forEach(function (x) { x.classList.remove("right", "wrong"); x.setAttribute("aria-pressed", "false"); });
              b.classList.add(o.best ? "right" : "wrong"); b.setAttribute("aria-pressed", "true");
              var last = n === nodes.length - 1;
              box.querySelector("[data-out]").innerHTML = '<div class="feedback ' + (o.best ? "ok" : "no") + '"><b>' + (o.best ? "What happens: it works" : "What happens") + "</b>" + o.result + "</div>" +
                (o.best ? '<p style="margin-top:12px">' + (last ? '<span class="pill">Scenario complete</span>' : '<button class="btn primary" data-go>Next decision ›</button>') + "</p>" : '<p class="muted" style="margin-top:8px">Choose another option to see a better path.</p>');
              if (o.best && last) C.record(id, firstRight);
              var g = box.querySelector("[data-go]");
              if (g) g.addEventListener("click", function () { delete box.dataset.tried; show(n + 1); });
            });
          });
        }
        show(step);
      }
    };
  };

  // Two-state comparison toggle.
  C.toggle = function (labels, panels) {
    return {
      html: '<div class="toggle" role="group">' + labels.map(function (l, i) { return '<button class="tab" aria-pressed="' + (i === 0) + '" data-tg="' + i + '">' + l + "</button>"; }).join("") + '</div><div data-tgp class="toggle-panel"></div>',
      bind: function (root) {
        function show(i) { root.querySelectorAll("[data-tg]").forEach(function (b) { b.setAttribute("aria-pressed", +b.dataset.tg === i); b.setAttribute("aria-selected", +b.dataset.tg === i); }); root.querySelector("[data-tgp]").innerHTML = panels[i]; }
        root.querySelectorAll("[data-tg]").forEach(function (b) { b.addEventListener("click", function () { show(+b.dataset.tg); }); });
        show(0);
      }
    };
  };

  /* ---------- navigation ---------- */
  function go(id, push) {
    if (!BY_ID[id]) id = "home";
    if (push !== false && id !== state.cur) state.hist.push(state.cur);
    if (state.hist.length > 60) state.hist.shift();
    state.cur = id;
    render();
  }
  C.go = go;
  function back() { if (state.hist.length) { state.cur = state.hist.pop(); render(); } else go("home", false); }
  function nextOf(s) {
    if (!s.lesson) return null;
    var L = s.lesson.screens;
    return s.pos + 1 < L.length ? L[s.pos + 1].id : null;
  }

  function renderMenu() {
    var h = '<div class="menu-head"><b>Course menu</b><button class="close" data-menu-close aria-label="Close menu">×</button></div>';
    h += '<button class="menu-link' + (state.cur === "home" ? " on" : "") + '" data-go="home">⌂ Course home</button>';
    C.lessons.forEach(function (L) {
      var p = C.lessonProgress(L), open = state.cur && BY_ID[state.cur] && BY_ID[state.cur].lesson === L;
      h += '<details class="menu-lesson"' + (open ? " open" : "") + '><summary><span>' + L.short + "</span><small>" + p.seen + "/" + p.total + "</small></summary>";
      L.screens.forEach(function (s) {
        h += '<button class="menu-link' + (s.id === state.cur ? " on" : "") + '" data-go="' + s.id + '"><span class="tick">' + (state.v[s.id] ? "✓" : "") + "</span>" + (s.menu || s.title) + "</button>";
      });
      h += "</details>";
    });
    h += '<button class="menu-link" data-go="glossary">Glossary</button>';
    el.menu.innerHTML = h;
    el.menu.querySelectorAll("[data-go]").forEach(function (b) { b.addEventListener("click", function () { closeMenu(); go(b.dataset.go); }); });
    el.menu.querySelector("[data-menu-close]").addEventListener("click", closeMenu);
  }
  function openMenu() { renderMenu(); document.body.classList.add("menu-open"); el.menuBtn.setAttribute("aria-expanded", "true"); el.menu.querySelector(".menu-link.on, .menu-link").focus(); }
  function closeMenu() { document.body.classList.remove("menu-open"); el.menuBtn.setAttribute("aria-expanded", "false"); }

  function render() {
    var s = BY_ID[state.cur] || BY_ID.home;
    state.v[s.id] = true;
    var L = s.lesson;
    el.crumb.textContent = L ? L.short + (s.part ? " · " + s.part : "") : (s.crumb || "");
    if (L) { el.pill.hidden = false; el.pill.textContent = "Screen " + (s.pos + 1) + " of " + L.screens.length; el.bar.style.width = (C.lessonProgress(L).seen / L.screens.length * 100) + "%"; }
    else { el.pill.hidden = true; el.bar.style.width = "0"; }
    el.stage.innerHTML = (s.full ? "" : '<h1 tabindex="-1">' + s.title + "</h1>") + s.html.call(s, C);
    wireTerms(el.stage);
    if (s.bind) s.bind.call(s, el.stage, C);
    var nx = nextOf(s);
    el.back.hidden = s.id === "start" || s.id === "home";
    el.next.hidden = !L && !s.next;
    if (L) {
      el.next.textContent = nx ? "Next ›" : "Finish lesson ✓";
      el.next.onclick = function () { if (nx) go(nx); else go("home"); };
    } else if (s.next) {
      el.next.textContent = s.nextLabel || "Next ›";
      el.next.onclick = function () { go(s.next); };
    }
    el.header.hidden = s.id === "start";
    save();
    window.scrollTo(0, 0);
    var h1 = el.stage.querySelector("h1"); if (h1) h1.focus({ preventScroll: true });
  }
  C.render = render;
  C.reset = function () { state = { cur: "start", hist: [], v: {}, t: {}, q: {}, role: null, notes: "", name: "" }; CourseStore.reset(); render(); };

  document.addEventListener("DOMContentLoaded", function () {
    ["stage", "crumb", "pill", "bar", "back", "next", "menu", "header"].forEach(function (k) { el[k] = document.getElementById(k); });
    el.menuBtn = document.getElementById("menuBtn");
    build();
    CourseStore.init();
    load();
    if (!BY_ID[state.cur]) state.cur = "start";
    if (state.cur !== "start") state.cur = "home";
    el.back.addEventListener("click", back);
    el.menuBtn.addEventListener("click", function () { if (document.body.classList.contains("menu-open")) closeMenu(); else openMenu(); });
    document.getElementById("homeBtn").addEventListener("click", function () { go("home"); });
    document.getElementById("scrim").addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    render();
  });
})();
