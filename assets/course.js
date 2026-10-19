/* Lesson 1 engine and content. Plain JavaScript, no external libraries. */
(function () {
  "use strict";

  /* ---------- people (original characters) ---------- */
  var PEOPLE = {
    grace: { name: "Grace", role: "Agricultural officer, Ministry of Agriculture", skin: "#7a4a2a", hair: "#1e1a17", shirt: "#2e8b57", style: "bun",
      quote: "I need to match our national priorities with what science and innovation can offer." },
    arjun: { name: "Arjun", role: "Technical officer, FAO country office", skin: "#b9773f", hair: "#1e1a17", shirt: "#0a6ebd", style: "short", glasses: true,
      quote: "I run capacity-building and technology projects with farmers." },
    mei: { name: "Mei", role: "Partnerships officer, FAO liaison office", skin: "#e9be8f", hair: "#2e2420", shirt: "#e8920c", style: "long",
      quote: "I build links with research institutes, donors and companies." }
  };
  var ROLE_KEYS = ["grace", "arjun", "mei"];

  function avatar(key, bg) {
    var p = PEOPLE[key], b = bg || "#e6f2fb", s = "";
    s += '<svg viewBox="0 0 100 100" role="img" aria-label="' + p.name + '"><circle cx="50" cy="50" r="50" fill="' + b + '"/>';
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
  }

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ---------- state ---------- */
  var TASKS = ["p15", "p19", "p113", "p115"];
  var state = { cur: 0, hist: [], visited: {}, tasks: {}, role: null, notes: "" };
  var root, crumbEl, pillEl, barEl, backBtn, nextBtn, menuBtn;

  function save() { CourseStore.save(state, SCREENS[state.cur].id); }
  function record(id, correct) {
    if (!state.tasks[id]) state.tasks[id] = { first: correct };
    state.tasks[id].done = true;
    save();
  }
  function score() {
    var n = 0;
    TASKS.forEach(function (t) { if (state.tasks[t] && state.tasks[t].first) n++; });
    return { right: n, pct: n / TASKS.length * 100 };
  }
  function roleOrder() {
    var r = state.role || "grace";
    return [r].concat(ROLE_KEYS.filter(function (k) { return k !== r; }));
  }

  /* ---------- modal ---------- */
  function openModal(html, opener) {
    var back = document.createElement("div");
    back.className = "modal-back";
    back.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><button class="close" aria-label="Close">×</button>' + html + '</div>';
    document.body.appendChild(back);
    var closeBtn = back.querySelector(".close");
    function close() { back.remove(); document.removeEventListener("keydown", onKey); if (opener) opener.focus(); }
    function onKey(e) { if (e.key === "Escape") close(); }
    closeBtn.addEventListener("click", close);
    back.addEventListener("click", function (e) { if (e.target === back) close(); });
    document.addEventListener("keydown", onKey);
    var extra = back.querySelector("[data-close]");
    if (extra) extra.addEventListener("click", close);
    closeBtn.focus();
  }

  /* ---------- practice components ---------- */
  function situations(map) {
    var order = roleOrder(), h = "";
    var first = order[0];
    h += '<div class="situation">' + avatar(first, "#fff") + '<div><b>' + PEOPLE[first].name + ':</b> ' + map[first] + '</div></div>';
    h += '<details class="others"><summary>See the situation for the other two roles</summary>';
    order.slice(1).forEach(function (k) { h += '<div class="situation">' + avatar(k, "#fff") + '<div><b>' + PEOPLE[k].name + ':</b> ' + map[k] + '</div></div>'; });
    return h + '</details>';
  }

  function singleChoice(id, q, opts) {
    var h = '<p class="q">' + q + '</p><div class="opts">';
    opts.forEach(function (o, i) {
      h += '<button class="opt" type="button" aria-pressed="false" data-i="' + i + '"><span class="key">' + "ABCDE"[i] + '</span><span>' + o.text + '<span class="fb" hidden></span></span></button>';
    });
    h += '</div><div class="checkrow"><button class="btn primary" data-check>Check my answer</button><span class="muted" data-hint aria-live="polite"></span></div><div data-fb aria-live="polite"></div>';
    return {
      html: h,
      bind: function (el, after) {
        var sel = -1, btns = el.querySelectorAll(".opt");
        btns.forEach(function (b) {
          b.addEventListener("click", function () {
            btns.forEach(function (x) { x.setAttribute("aria-pressed", "false"); x.classList.remove("right", "wrong"); x.querySelector(".fb").hidden = true; });
            b.setAttribute("aria-pressed", "true"); sel = +b.dataset.i;
            el.querySelector("[data-fb]").innerHTML = ""; el.querySelector("[data-hint]").textContent = "";
          });
        });
        el.querySelector("[data-check]").addEventListener("click", function () {
          if (sel < 0) { el.querySelector("[data-hint]").textContent = "Choose an answer first."; return; }
          var o = opts[sel], b = btns[sel];
          b.classList.add(o.correct ? "right" : "wrong");
          var fb = b.querySelector(".fb"); fb.textContent = o.feedback; fb.hidden = false;
          el.querySelector("[data-fb]").innerHTML = '<div class="feedback ' + (o.correct ? "ok" : "no") + '"><b>' + (o.correct ? o.head || "Correct" : o.head || "Not quite") + '</b>' +
            (o.correct ? "" : "Try another answer.") + '</div>';
          record(id, !!o.correct);
          if (after) after(!!o.correct);
        });
      }
    };
  }

  function multiSelect(id, q, opts, okText, noText) {
    var h = '<p class="q">' + q + '</p><div class="opts">';
    opts.forEach(function (o, i) {
      h += '<button class="opt" type="button" role="checkbox" aria-checked="false" aria-pressed="false" data-i="' + i + '"><span class="key">' + "✓" + '</span><span>' + o.text + '<span class="fb" hidden></span></span></button>';
    });
    h += '</div><div class="checkrow"><button class="btn primary" data-check>Check my answer</button><button class="btn" data-retry hidden>Try again</button><span class="muted" data-hint aria-live="polite"></span></div><div data-fb aria-live="polite"></div>';
    return {
      html: h,
      bind: function (el) {
        var btns = el.querySelectorAll(".opt"), locked = false;
        btns.forEach(function (b) {
          b.addEventListener("click", function () {
            if (locked) return;
            var on = b.getAttribute("aria-pressed") !== "true";
            b.setAttribute("aria-pressed", on ? "true" : "false"); b.setAttribute("aria-checked", on ? "true" : "false");
          });
        });
        el.querySelector("[data-check]").addEventListener("click", function () {
          var picked = [], all = true;
          btns.forEach(function (b, i) { if (b.getAttribute("aria-pressed") === "true") picked.push(i); });
          if (!picked.length) { el.querySelector("[data-hint]").textContent = "Select at least one option."; return; }
          el.querySelector("[data-hint]").textContent = "";
          locked = true;
          btns.forEach(function (b, i) {
            var o = opts[i], on = picked.indexOf(i) >= 0, fb = b.querySelector(".fb");
            if (on !== !!o.correct) all = false;
            if (on || o.correct) {
              b.classList.add(o.correct ? "right" : "wrong");
              fb.textContent = (o.correct && !on ? "Missed: " : "") + o.feedback; fb.hidden = false;
            }
          });
          el.querySelector("[data-fb]").innerHTML = '<div class="feedback ' + (all ? "ok" : "no") + '">' + (all ? okText : noText) + '</div>';
          el.querySelector("[data-check]").hidden = true;
          el.querySelector("[data-retry]").hidden = all;
          record(id, all);
        });
        el.querySelector("[data-retry]").addEventListener("click", function () {
          locked = false;
          btns.forEach(function (b) { b.classList.remove("right", "wrong"); b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-checked", "false"); b.querySelector(".fb").hidden = true; });
          el.querySelector("[data-fb]").innerHTML = "";
          el.querySelector("[data-check]").hidden = false; el.querySelector("[data-retry]").hidden = true;
        });
      }
    };
  }

  /* ---------- content ---------- */
  var OUTCOMES = [
    ["1a", "Knowledge and evidence", "More reliable data on food systems", "collect, analyse or publish data", 1],
    ["1b", "Science–policy links", "Scientists and decision-makers work together regularly", "link researchers with ministries or parliament", 1],
    ["1c", "Research for development", "Research answers small producers’ needs", "work with institutes on practical research", 1],
    ["2a", "Access", "Small farms get and use affordable, suitable solutions", "bring technologies or practices to farmers", 2],
    ["2b", "National innovation capacity", "Countries choose, co-create and scale innovations", "strengthen national institutes or networks", 2],
    ["2c", "Policy and regulation", "Countries design, run and assess innovation policy", "draft strategies, laws or rules", 2],
    ["3a", "Knowledge management", "FAO keeps and shares lessons, country to HQ", "work at FAO and collect project lessons", 3],
    ["3b", "Science communication", "Science explained clearly to public and decision-makers", "write about science for non-specialists", 3],
    ["3c", "Staff capacity", "FAO staff have skills for science and innovation", "develop FAO staff skills", 3]
  ];
  function outcomeTable() {
    var h = '<table class="ref"><thead><tr><th>Outcome</th><th>What should change</th><th>This is you if you…</th></tr></thead><tbody>';
    OUTCOMES.forEach(function (o) { h += '<tr class="p' + o[4] + '"><td>' + o[0] + " " + o[1] + '</td><td>' + o[2] + '</td><td>' + o[3] + '</td></tr>'; });
    return h + '</tbody></table>';
  }

  var PRINCIPLES = [
    ["Rights-based and people-centred", "Who could be left out, and how does the project bring them in?"],
    ["Gender-equal", "Does the project consider the different roles and needs of women and men?"],
    ["Evidence-based", "What evidence is the choice based on? Does it include local and Indigenous knowledge?"],
    ["Needs-driven", "Did the solution come from people’s real problem or from a ready-made template? Were they part of the choice?"],
    ["Sustainability-aligned", "What does the project give people, the economy and nature — and where does one cost another?"],
    ["Risk-informed", "What could go wrong, and how does the project reduce it?"],
    ["Ethics-based", "Are there fairness issues: whose data, who controls the technology, do people know what they agree to?"]
  ];

  var PART_A = "Part A · Why the Strategy matters", PART_B = "Part B · Find your work in the Strategy",
      PART_C = "Part C · Partnerships and funding", PART_D = "Part D · The seven principles";

  var TITLE_ART = '<svg viewBox="0 0 520 470" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    '<circle cx="410" cy="95" r="62" fill="#e8920c"/>' +
    '<ellipse cx="330" cy="520" rx="330" ry="210" fill="#2f7d4f"/><ellipse cx="460" cy="540" rx="260" ry="190" fill="#3e9b5f"/>' +
    '<g stroke="#7cc08f" stroke-width="7" stroke-linecap="round"><line x1="300" y1="400" x2="500" y2="380"/><line x1="305" y1="425" x2="500" y2="405"/><line x1="310" y1="450" x2="500" y2="430"/></g>' +
    '<rect x="96" y="300" width="9" height="40" fill="#6b4a2b"/><circle cx="100" cy="285" r="34" fill="#1f6b40"/>' +
    '<rect x="160" y="290" width="9" height="50" fill="#6b4a2b"/><circle cx="164" cy="272" r="42" fill="#1f6b40"/>' +
    '<g transform="translate(205 175) scale(.9)">' + avatar("grace", "#fff").replace('<svg viewBox="0 0 100 100" role="img" aria-label="Grace">', '<svg width="100" height="100" viewBox="0 0 100 100">') + '</g>' +
    '<g transform="translate(305 150) scale(.9)">' + avatar("arjun", "#fff").replace('<svg viewBox="0 0 100 100" role="img" aria-label="Arjun">', '<svg width="100" height="100" viewBox="0 0 100 100">') + '</g>' +
    '<g transform="translate(405 200) scale(.9)">' + avatar("mei", "#fff").replace('<svg viewBox="0 0 100 100" role="img" aria-label="Mei">', '<svg width="100" height="100" viewBox="0 0 100 100">') + '</g>' +
    '</svg>';

  var SCREENS = [
    { id: "title", crumb: "Lesson 1", full: true,
      html: function () {
        var resume = Object.keys(state.visited).length > 2 && state.cur === 0 && state.resumeAt > 1;
        return '<div class="title-screen"><div class="txt"><div class="kicker">LESSON 1</div><h1 tabindex="-1">The FAO Science and Innovation Strategy and your work</h1>' +
          '<p>Explain it, find your project in it, and use it to make your case.</p>' +
          '<button class="btn accent" data-start>Start ›</button>' + (resume ? ' <button class="btn" style="margin-left:8px" data-resume>Resume where you left off</button>' : "") +
          '<div class="credit">Course redesign concept, English pilot. Based on the FAO e-learning course on the FAO Science and Innovation Strategy (2025). Not an official FAO product.</div></div>' +
          TITLE_ART + '</div>';
      },
      bind: function (el) {
        el.querySelector("[data-start]").addEventListener("click", function () { go(1); });
        var r = el.querySelector("[data-resume]");
        if (r) r.addEventListener("click", function () { go(state.resumeAt); });
      } },

    { id: "roles", crumb: "Before you start", title: "Who this course is for",
      html: function () {
        var h = '<p class="lead">Three people take this course. Each needs the Strategy for a different job. Choose the one closest to your work: the practice tasks will show their situation first.</p><div class="grid g3 people">';
        ROLE_KEYS.forEach(function (k) {
          var p = PEOPLE[k];
          h += '<button class="card click person pick' + (state.role === k ? " on" : "") + '" data-role="' + k + '" aria-pressed="' + (state.role === k) + '">' + avatar(k, "#fff") +
            '<h3>' + p.name + '</h3><div class="role">' + p.role + '</div><blockquote>“' + p.quote + '”</blockquote><div class="tick">✓ My role</div></button>';
        });
        return h + '</div>';
      },
      bind: function (el) {
        el.querySelectorAll("[data-role]").forEach(function (b) {
          b.addEventListener("click", function () {
            state.role = b.dataset.role; save();
            el.querySelectorAll("[data-role]").forEach(function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
            nextBtn.textContent = "Next ›";
          });
        });
      } },

    { id: "s10", code: "1.0", crumb: "Lesson 1", title: "What you will learn in this lesson",
      html: function () {
        var steps = [["A", "Explain the Strategy in two or three sentences", "s11", ["s11", "s12", "s13", "s14", "s15"]],
                     ["B", "Find where your project fits in the Strategy", "s16", ["s16", "s17", "s18", "s19"]],
                     ["C", "Use the Strategy to argue for partnerships and funding", "s110", ["s110", "s111", "s112", "s113"]],
                     ["D", "Check a project against the seven principles", "s114", ["s114", "s115"]]];
        var h = '<p class="lead">About 25 minutes. You can stop and come back at any time. Choose a part, or press Next to start from the beginning.</p><div class="path">';
        steps.forEach(function (s) {
          var done = s[3].every(function (id) { return state.visited[id]; });
          h += '<div class="step' + (done ? " done" : "") + '"><span class="badge">' + (done ? "✓" : s[0]) + '</span><button class="card sky click" data-jump="' + s[2] + '"><h3>' + s[1] + '</h3><span class="more">' + (done ? "Review this part ›" : "Go to this part ›") + '</span></button></div>';
        });
        return h + '</div>';
      },
      bind: function (el) { el.querySelectorAll("[data-jump]").forEach(function (b) { b.addEventListener("click", function () { go(indexOf(b.dataset.jump)); }); }); } },

    { id: "s11", code: "1.1", crumb: PART_A, title: "What stands in the way",
      html: function () {
        var cards = [["1", "Innovations don’t reach the ground"], ["2", "Too little, uneven research funding"], ["3", "Decisions don’t always rest on evidence"]];
        var h = '<p class="lead">Science already offers many solutions for farming and food. They rarely reach the people who need them most. Three problems repeat in most countries. Open each one.</p><div class="grid g3">';
        cards.forEach(function (c, i) { h += '<button class="card click" data-open="' + i + '"><span class="badge orange">' + c[0] + '</span><h3 style="margin-top:14px">' + c[1] + '</h3><span class="more">Open ›</span></button>'; });
        return h + '</div><div class="note"><b>Think about it:</b> which of these three is closest to your country?</div>';
      },
      bind: function (el) {
        var D = [["Innovations don’t reach the ground", ["Small farms and low- and middle-income countries often can’t get solutions that already exist.", "Advisory services that bring knowledge to farmers have had little support for years.", "Some countries also lag behind on digital technology."]],
                 ["Too little, uneven research funding", ["Most developing countries spend less on agricultural research than they need.", "Private investment is growing, but it goes where profits come fast.", "Research for small farms still depends on public money."]],
                 ["Decisions don’t always rest on evidence", ["Data can be incomplete or contradictory.", "Many interests shape a decision, not only the facts.", "Technology changes faster than laws and rules."]]];
        el.querySelectorAll("[data-open]").forEach(function (b) {
          b.addEventListener("click", function () {
            var d = D[+b.dataset.open];
            openModal('<div class="row"><span class="badge orange">' + (+b.dataset.open + 1) + '</span><h2>' + d[0] + '</h2></div><ul class="clean">' + d[1].map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul><p style="margin-top:18px"><button class="btn primary" data-close>Back to the problems</button></p>', b);
          });
        });
      } },

    { id: "s12", code: "1.2", crumb: PART_A, title: "What the Strategy is",
      html: function () {
        return '<div class="grid g2"><div><p>The FAO Science and Innovation Strategy is FAO’s plan for helping countries use science and new solutions. The FAO Council approved it in 2022.</p>' +
          '<p>Member countries asked FAO for more support in this area. The Strategy answers that request. It brings FAO’s work with science together and helps spot new problems early.</p>' +
          '<p>It does not stand alone: it is one of the main tools for delivering the FAO Strategic Framework 2022–2031.</p></div>' +
          '<div class="card sky"><h3 style="color:var(--blue)">FAO Strategic Framework 2022–2031</h3><div class="card" style="background:var(--blue);color:#fff;text-align:center;margin-top:16px;padding:30px 20px"><b style="font-size:21px">Science and Innovation Strategy</b><br><span style="color:#dcebf8">one of the main tools for delivering the Framework</span></div></div></div>';
      } },

    { id: "s13", code: "1.3", crumb: PART_A, title: "What the Strategy aims for",
      html: function () {
        var betters = ["Better production", "Better nutrition", "Better environment", "Better life"];
        return '<div class="grid g2"><div class="card sky"><div class="tag" style="color:var(--blue);font-weight:800;font-size:13px">VISION</div><p>A world without hunger and malnutrition, where science and innovation are used to the full to solve complex problems.</p></div>' +
          '<div class="card sky"><div style="color:var(--blue);font-weight:800;font-size:13px">GOAL</div><p>Countries use science and innovation to find solutions that fit their own conditions — making food systems more efficient, inclusive, resilient and sustainable.</p></div></div>' +
          '<p class="muted" style="margin-top:22px">FAO calls the result the “four betters” — with one condition: leaving no one behind.</p><div class="grid g4">' +
          betters.map(function (b, i) { return '<div class="row" style="align-items:center"><span class="badge orange">' + (i + 1) + '</span><b>' + b + '</b></div>'; }).join("") +
          '</div><div class="note"><b>Special focus:</b> small and family farms, Indigenous Peoples, women, youth and small businesses — the groups most often left out.</div>';
      } },

    { id: "s14", code: "1.4", crumb: PART_A, title: "What FAO does — and doesn’t",
      html: function () {
        var does = [["Norms and standards", "Guidelines and standards based on evidence"], ["Policy advice", "Advice to governments on policy"],
                    ["A neutral space", "Where countries and scientists discuss shared issues"], ["Country projects", "Adapting solutions to local conditions and scaling up successful pilots"]];
        return '<div class="grid g12"><div class="card"><h3>FAO is not a research organisation</h3><p>It does not run its own research programme. Its role is to turn evidence into things countries can use.</p></div><div class="grid">' +
          does.map(function (d) { return '<div class="row"><span class="badge green">✓</span><div><b>' + d[0] + '</b><br><span class="muted">' + d[1] + '</span></div></div>'; }).join("") + '</div></div>';
      } },

    { id: "s15", code: "1.5", crumb: PART_A, title: "Practice: explain the Strategy in 30 seconds", task: "p15",
      html: function () {
        this._q = singleChoice("p15", "Which answer works best in a short conversation?", [
          { text: "“It’s FAO’s plan to help countries use science and new solutions. Right now innovations rarely reach farmers or government decisions. The Strategy helps fix that, especially for small farms.”", correct: true, head: "Yes — that works",
            feedback: "Three sentences: what it is, what problem it solves, and for whom. Start with the problem, not with the structure of the document." },
          { text: "“It’s a key tool for implementing FAO’s Strategic Framework 2022–2031, with three pillars and nine outcomes.”", head: "True, but not helpful yet",
            feedback: "Everything here is correct, but the listener still doesn’t know why it matters to them." },
          { text: "“It’s FAO’s programme for running research in countries.”", head: "Not quite",
            feedback: "FAO is not a research organisation. Its role is to turn evidence into norms, advice and projects (screen 1.4)." }]);
        return situations({ grace: "A deputy minister asks in the lift: “FAO has a new science strategy. What’s in it for us?”",
                            arjun: "A research institute director asks: “Why does FAO need this strategy if you don’t do research?”",
                            mei: "A donor at a conference asks: “In a nutshell — what is this strategy?”" }) + this._q.html +
          '<div data-notes hidden><p style="margin-top:18px"><b>Now write your own version</b> for your situation. It is saved with your progress and shown again at the end of the lesson.</p><textarea data-note aria-label="My explanation of the Strategy">' + esc(state.notes) + '</textarea></div>';
      },
      bind: function (el) {
        var notes = el.querySelector("[data-notes]");
        if (state.tasks.p15) notes.hidden = false;
        this._q.bind(el, function () { notes.hidden = false; });
        el.querySelector("[data-note]").addEventListener("input", function (e) { state.notes = e.target.value; save(); });
      } },

    { id: "s16", code: "1.6", crumb: PART_B, title: "The Strategy on one page",
      html: function () {
        return '<div class="house"><div class="goal"><b>Goal: countries use science and innovation for solutions that fit their own conditions</b><span class="muted">four betters · leaving no one behind</span></div><div class="pillars">' +
          [["1. Evidence-based decisions", 0], ["2. Innovation in countries", 3], ["3. FAO’s own capacity", 6]].map(function (p) {
            return '<div class="pillar"><h3>' + p[0] + '</h3>' + OUTCOMES.slice(p[1], p[1] + 3).map(function (o) { return "<div>" + o[0] + " " + o[1] + "</div>"; }).join("") + '</div>';
          }).join("") + '</div><div class="enablers"><b>Enablers:</b> A — transformative partnerships · B — innovative funding and financing</div>' +
          '<div class="found"><b>Foundation: seven guiding principles</b><br><span class="muted">' + PRINCIPLES.map(function (p) { return p[0].toLowerCase(); }).join(" · ") + '</span></div></div>' +
          '<p class="muted" style="margin-top:14px">Find your project in two steps: choose a pillar, then an outcome inside it.</p>';
      } },

    { id: "s17", code: "1.7", crumb: PART_B, title: "Three pillars in plain words",
      html: function () {
        return '<div class="tabs" role="tablist">' + ["1 Evidence-based decisions", "2 Innovation in countries", "3 FAO’s own capacity"].map(function (t, i) {
          return '<button class="tab" role="tab" aria-selected="' + (i === 0) + '" data-tab="' + i + '">' + t + '</button>'; }).join("") + '</div><div data-panel></div>';
      },
      bind: function (el) {
        var P = [["1", "Decisions rest on facts.", "Strengthen science- and evidence-based decision-making", ["FAO’s global databases", "Dialogue between scientists and policymakers"]],
                 ["2", "New solutions reach countries and farmers.", "Support innovation and technology at regional and country levels", ["Sharing experience between countries", "Adapting a technology to local conditions", "Scaling up a successful pilot"]],
                 ["3", "FAO itself gets better at working with science.", "Reinforce FAO’s science and innovation capacities", ["Sharing knowledge inside FAO", "Clear science communication", "Staff skills"], "If you don’t work for FAO, your project most likely belongs to pillar 1 or 2."]];
        function show(i) {
          var p = P[i];
          el.querySelectorAll(".tab").forEach(function (t) { t.setAttribute("aria-selected", +t.dataset.tab === i); });
          el.querySelector("[data-panel]").innerHTML = '<div class="row"><span class="badge orange lg">' + p[0] + '</span><div><h2 style="margin:4px 0 6px">' + p[1] + '</h2><p class="muted"><b>Official wording:</b> <i>' + p[2] + '</i></p></div></div>' +
            '<div class="grid g2" style="margin-top:16px"><div class="card"><h3>What this looks like</h3><ul class="clean">' + p[3].map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div>' +
            (p[4] ? '<div class="card sky"><h3 style="color:var(--blue)">Tip</h3><p>' + p[4] + '</p></div>' : "") + '</div>';
        }
        el.querySelectorAll(".tab").forEach(function (t) { t.addEventListener("click", function () { show(+t.dataset.tab); }); });
        show(0);
      } },

    { id: "s18", code: "1.8", crumb: PART_B, title: "Find your outcome",
      html: function () { return '<p class="lead">Each pillar has three outcomes — what should change. Find the row that best describes your project.</p>' + outcomeTable(); } },

    { id: "s19", code: "1.9", crumb: PART_B, title: "Practice: where does the project fit?", task: "p19",
      html: function () {
        var items = [["grace", "The ministry is drafting rules for digital advisory services for farmers and wants to assess their impact first.", "2c", "The project is about science and innovation policy and rules. Dialogue with scientists (1b) helps, but the goal is the rules themselves."],
                     ["arjun", "The country office runs farmer field schools where farmers and agronomists test drought-tolerant varieties.", "2a", "The point is that small farms get and use a suitable solution. 2b would fit if the project built a national field-school system."],
                     ["mei", "A partnerships officer sets up regular meetings between the national agricultural institute and a parliamentary committee.", "1b", "Scientists and decision-makers working together is exactly the science–policy link."],
                     [null, "FAO builds a shared database of lessons from its country office projects.", "3a", "This is FAO’s internal work with its own knowledge: pillar 3. Outcome 1a is about data on food systems, not FAO’s own experience."]];
        var r = state.role || "grace";
        items.sort(function (a, b) { return (b[0] === r) - (a[0] === r); });
        this._items = items;
        var opts = '<option value="">Choose an outcome…</option>' + OUTCOMES.map(function (o) { return '<option value="' + o[0] + '">' + o[0] + " " + o[1] + "</option>"; }).join("");
        return '<p class="lead">Choose an outcome for each project, then check. <button class="btn small" data-table>Open the outcome table</button></p><div class="match">' +
          items.map(function (it, i) {
            return '<div class="item" data-item="' + i + '">' + (it[0] ? avatar(it[0], "#fff") : '<span class="badge deep">FAO</span>') + '<div><b>Project ' + (i + 1) + '.</b> ' + it[1] + '</div>' +
              '<select aria-label="Outcome for project ' + (i + 1) + '">' + opts + '</select><div class="fb" hidden></div></div>';
          }).join("") + '</div><div class="checkrow"><button class="btn primary" data-check>Check my answers</button><span class="muted" data-hint aria-live="polite"></span></div><div data-fb aria-live="polite"></div>';
      },
      bind: function (el) {
        var items = this._items;
        el.querySelector("[data-table]").addEventListener("click", function (e) { openModal("<h2>Find your outcome</h2>" + outcomeTable(), e.target); });
        el.querySelectorAll("select").forEach(function (s) { s.addEventListener("change", function () { var it = s.closest(".item"); it.classList.remove("right", "wrong"); it.querySelector(".fb").hidden = true; }); });
        el.querySelector("[data-check]").addEventListener("click", function () {
          var sels = el.querySelectorAll("select"), all = true, empty = false;
          sels.forEach(function (s) { if (!s.value) empty = true; });
          if (empty) { el.querySelector("[data-hint]").textContent = "Choose an outcome for every project first."; return; }
          el.querySelector("[data-hint]").textContent = "";
          sels.forEach(function (s, i) {
            var it = s.closest(".item"), ok = s.value === items[i][2], fb = it.querySelector(".fb");
            if (!ok) all = false;
            it.classList.toggle("right", ok); it.classList.toggle("wrong", !ok);
            fb.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Best fit: " + items[i][2] + ".</b> ") + items[i][3]; fb.hidden = false;
          });
          el.querySelector("[data-fb]").innerHTML = '<div class="feedback ' + (all ? "ok" : "no") + '"><b>' + (all ? "All four placed correctly" : "Some projects belong elsewhere") + '</b>' +
            (all ? "Two steps — pillar, then outcome — work for any project." : "Read the notes under each project, change your answers and check again.") + '</div>';
          record("p19", all);
        });
      } },

    { id: "s110", code: "1.10", crumb: PART_C, title: "Two enablers: nothing works without them",
      html: function () {
        return '<p class="lead">The Strategy names two things that cut across all three pillars.</p><div class="grid g2">' +
          '<div class="card orange row"><span class="badge orange lg">A</span><div><h3>Transformative partnerships</h3><p>Partnerships that bring lasting change, not one-off events.</p></div></div>' +
          '<div class="card orange row"><span class="badge orange lg">B</span><div><h3>Innovative funding and financing</h3><p>New ways to pay for innovation, so poorer countries don’t fall further behind.</p></div></div></div>' +
          '<div class="note"><b>What this means for you:</b> when you propose a partnership or look for funding, you are doing what the Strategy calls a condition for success. That is a strong argument — use it.</div>';
      } },

    { id: "s111", code: "1.11", crumb: PART_C, title: "Who to work with",
      html: function () {
        var P = [["Research organisations and universities", "Research, experts, data", "National and international centres, including CGIAR; advisory services"],
                 ["UN system", "Joint work without duplication", "Rome-based UN agencies; the UN Technology Facilitation Mechanism"],
                 ["Civil society", "Local knowledge and the networks that spread it", "Organisations working with farmers and communities"],
                 ["Private sector", "Investment, technology, access to markets", "Small and medium businesses, start-ups, incubators — especially women- and youth-led"]];
        return '<div class="grid g2">' + P.map(function (p, i) {
          return '<div class="card row"><span class="badge">' + (i + 1) + '</span><div><h3>' + p[0] + '</h3><p><b>Brings:</b> ' + p[1] + '</p><p class="muted"><b>Strategy focus:</b> ' + p[2] + '</p></div></div>';
        }).join("") + '</div><p style="margin-top:18px"><b>Why partner:</b> access to experts and research, more funding, less duplication, wider reach.</p>';
      } },

    { id: "s112", code: "1.12", crumb: PART_C, title: "Money for innovation",
      html: function () {
        var F = [["Public–private partnerships", "are one of these new ways."],
                 ["Climate and environment funds", "FAO links country projects to the Green Climate Fund and the Global Environment Facility. Countries can prepare projects for these funds with FAO."],
                 ["Due diligence", "Private partners go through FAO’s check for conflicts of interest (the FRAME procedure). Plan time for it."]];
        return '<p class="lead">Without new sources of funding, low- and middle-income countries will fall further behind. The Strategy supports new ways to finance innovation. Three things worth knowing:</p><div class="grid g3">' +
          F.map(function (f, i) { return '<div class="card"><span class="badge orange">' + (i + 1) + '</span><h3 style="margin-top:14px">' + f[0] + '</h3><p>' + f[1] + '</p></div>'; }).join("") + '</div>';
      } },

    { id: "s113", code: "1.13", crumb: PART_C, title: "Practice: arguments for a partner", task: "p113",
      html: function () {
        this._q = multiSelect("p113", "Which three arguments from the Strategy are strongest for this project? Select three.", [
          { text: "The Strategy names start-ups and small businesses as priority partners.", correct: true, feedback: "Yes — that is enabler A (screen 1.11)." },
          { text: "The project helps small farms get affordable solutions — outcome 2a.", correct: true, feedback: "Yes — linking to a named outcome shows the project serves the Strategy." },
          { text: "The university brings the science, the start-up the channel to farmers.", correct: true, feedback: "Yes — partners who complement each other rather than duplicate." },
          { text: "FAO will run the research for the app itself.", feedback: "No — FAO is not a research organisation. Here the university brings the research." },
          { text: "The start-up needs no extra checks to work with FAO.", feedback: "No — private partners go through FAO’s check for conflicts of interest. Treat it as a step in your plan." }],
          "<b>Strong set</b>A priority type of partner, a named outcome, and partners who complement each other. Copy this logic into your letter or concept note.",
          "<b>Not yet</b>Look at the notes on each option, then try again.");
        return situations({ grace: "You’re writing to FAO for help launching mobile advice for farmers with a local start-up and an agricultural university.",
                            arjun: "You’re drafting a concept note for a donor on the same mobile advice project.",
                            mei: "You’re preparing to meet the start-up and the university, who want to launch the service with FAO." }) + this._q.html;
      },
      bind: function (el) { this._q.bind(el); } },

    { id: "s114", code: "1.14", crumb: PART_D, title: "Seven principles as a checklist",
      html: function () {
        return '<p class="lead">The seven principles guide how FAO works with science and innovation. Use them as a checklist: if a question has no good answer, the project has a weak spot. Open each principle to see its question.</p><div class="grid g4">' +
          PRINCIPLES.map(function (p, i) { return '<button class="card sky click" data-p="' + i + '"><h3>' + p[0] + '</h3><span class="more">Show the question ›</span><p data-qa hidden style="margin-top:10px">' + p[1] + '</p></button>'; }).join("") + '</div>';
      },
      bind: function (el) {
        el.querySelectorAll("[data-p]").forEach(function (b) {
          b.addEventListener("click", function () { var q = b.querySelector("[data-qa]"); q.hidden = !q.hidden; b.querySelector(".more").textContent = q.hidden ? "Show the question ›" : "Hide"; });
        });
      } },

    { id: "s115", code: "1.15", crumb: PART_D, title: "Practice: check a project", task: "p115",
      html: function () {
        var opts = [["Needs-driven", true, "Farmers weren’t asked about their main problem; drones may solve the wrong one."],
                    ["Gender-equal", true, "Training only for landowners shuts out women who work in the fields."],
                    ["Rights-based and people-centred", true, "The smallest farms are left out because of the price."],
                    ["Ethics-based", true, "Field data goes to the company without farmers knowing."],
                    ["Evidence-based", false, "Met: based on independent trials. Farmers’ own experience would make it stronger."],
                    ["Sustainability-aligned", false, "Met: effects on water and pollinators were assessed."],
                    ["Risk-informed", false, "Met: there is a safety plan and operator training."]];
        opts.sort(function (a, b) { return PRINCIPLES.findIndex(function (p) { return p[0] === a[0]; }) - PRINCIPLES.findIndex(function (p) { return p[0] === b[0]; }); });
        this._q = multiSelect("p115", "Which principles does the project meet poorly? Select all that apply.",
          opts.map(function (o) { return { text: o[0], correct: o[1], feedback: o[2] }; }),
          "<b>Four weak spots, three strengths</b>Which single step would you add to the project first?",
          "<b>Not quite</b>Read the case again — each weak principle matches one line of it.");
        return '<div class="grid g2" style="align-items:start"><div class="case"><div class="tag">Training case (fictional)</div><p><b>In a rice-growing district, a private company will spray fields by drone for a fee.</b></p><ul class="clean">' +
          ["The decision followed independent field trials in three villages.", "Effects on water and pollinators were assessed.", "There is a safety plan and operator training.",
           "Farmers were not asked what their main problem is.", "Only landowners are invited to training — in this district, almost always men.",
           "The smallest farms can’t afford the service.", "Field data collected by the drones belongs to the company; farmers are not told."].map(function (x) { return "<li>" + x + "</li>"; }).join("") +
          '</ul></div><div>' + this._q.html + '</div></div>';
      },
      bind: function (el) { this._q.bind(el); } },

    { id: "s116", code: "1.16", crumb: "Lesson 1", title: "What to take away", full: true,
      html: function () {
        var sc = score(), done = TASKS.filter(function (t) { return state.tasks[t]; }).length;
        var take = ["The Strategy helps countries use science where it doesn’t yet reach people. When you explain it, start with the problem.",
                    "Any project can be placed in the Strategy in two steps: pillar, then outcome.",
                    "Partners and new funding are conditions for success. Use that in negotiations.",
                    "The seven principles are seven questions for any project."];
        return '<div class="done-screen"><h1 tabindex="-1">What to take away</h1><div class="grid g32"><div>' +
          take.map(function (t, i) { return '<div class="take"><span class="badge orange">' + (i + 1) + '</span><span>' + t + '</span></div>'; }).join("") +
          '</div><div class="card"><div class="score">' + sc.right + ' / ' + TASKS.length + '</div><p>practice tasks right on the first try' + (done < TASKS.length ? " (" + (TASKS.length - done) + " not attempted yet — use the Menu)" : "") + '</p>' +
          (state.notes ? '<p style="margin-top:14px"><b>Your explanation (screen 1.5):</b><br><i>' + esc(state.notes) + '</i></p>' : "") + '</div></div>' +
          '<p style="margin-top:22px"><b style="color:var(--orange)">Next:</b> Lesson 2 — science, innovation and technology: what’s the difference?</p>' +
          '<p><button class="btn" data-restart>Restart the lesson</button></p></div>';
      },
      bind: function (el) {
        CourseStore.complete(score().pct);
        el.querySelector("[data-restart]").addEventListener("click", function () {
          if (!window.confirm("Clear your answers and start again?")) return;
          state = { cur: 0, hist: [], visited: {}, tasks: {}, role: null, notes: "" };
          CourseStore.reset(); go(0, false);
        });
      } }
  ];

  var CODED = SCREENS.filter(function (s) { return s.code; });
  function indexOf(id) { for (var i = 0; i < SCREENS.length; i++) if (SCREENS[i].id === id) return i; return 0; }

  /* ---------- navigation ---------- */
  function go(i, push) {
    if (push !== false && i !== state.cur) state.hist.push(state.cur);
    if (state.hist.length > 50) state.hist.shift();
    state.cur = i;
    render();
  }
  function back() {
    if (state.hist.length) { state.cur = state.hist.pop(); render(); }
    else if (state.cur > 0) { state.cur -= 1; render(); }
  }

  function render() {
    var s = SCREENS[state.cur];
    state.visited[s.id] = true;
    if (state.cur > 1) state.resumeAt = state.cur;
    crumbEl.textContent = s.crumb || "";
    var n = CODED.indexOf(s);
    pillEl.hidden = n < 0;
    if (n >= 0) pillEl.textContent = "Screen " + s.code + " · " + (n + 1) + " of " + CODED.length;
    var seen = CODED.filter(function (c) { return state.visited[c.id]; }).length;
    barEl.style.width = (seen / CODED.length * 100) + "%";
    root.innerHTML = (s.full ? "" : '<h1 tabindex="-1">' + s.title + "</h1>") + s.html.call(s);
    if (s.bind) s.bind.call(s, root);
    backBtn.disabled = state.cur === 0;
    menuBtn.hidden = state.cur < 2;
    nextBtn.hidden = state.cur === 0 || state.cur === SCREENS.length - 1;
    nextBtn.textContent = state.cur === 1 ? (state.role ? "Next ›" : "Skip for now ›") : "Next ›";
    save();
    window.scrollTo(0, 0);
    var h = root.querySelector("h1"); if (h) h.focus({ preventScroll: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    root = document.getElementById("stage");
    crumbEl = document.getElementById("crumb"); pillEl = document.getElementById("pill"); barEl = document.getElementById("bar");
    backBtn = document.getElementById("back"); nextBtn = document.getElementById("next"); menuBtn = document.getElementById("menu");
    CourseStore.init();
    var saved = CourseStore.load();
    if (saved && typeof saved.cur === "number") {
      state = Object.assign(state, saved);
      state.hist = [];
      state.cur = 0; // always open on the title screen; it offers "Resume"
    }
    backBtn.addEventListener("click", back);
    nextBtn.addEventListener("click", function () { if (state.cur === 1 && !state.role) { /* allowed to skip */ } go(state.cur + 1); });
    menuBtn.addEventListener("click", function () { go(indexOf("s10")); });
    render();
  });
})();
