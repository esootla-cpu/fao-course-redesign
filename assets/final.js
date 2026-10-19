/* Course frame: start, roles, home, glossary, final check and certificate */
(function (C) {
  "use strict";
  var PASS = 75;

  C.addGlossary({
    aylluu: { term: "Aylluu (ayllu)", def: "A Quechua word for a community or extended family whose members work together for mutual benefit, sharing resources, labour and responsibilities. It is a social, cultural and political idea in Andean communities." },
    bootcamp: { term: "Innovation bootcamp", def: "A short, intensive programme in which participants develop ideas together through brainstorming, design thinking and prototyping, with mentors and resources to turn ideas into real plans or products." },
    designthinking: { term: "Design thinking", def: "A way of solving problems that starts from the people who will use the solution: understand their needs, generate ideas, build prototypes, test and improve. A good solution is desirable (people want it), feasible (it can be built) and viable (it can pay for itself)." },
    platformcoop: { term: "Platform cooperative", def: "A website or app that is owned and run democratically by its users or workers, who share the profits and the decisions." },
    leancoop: { term: "Lean cooperative", def: "A cooperative run on lean management principles: deliver more value to members while cutting waste." },
    downscale: { term: "Downscaled climate services", def: "Climate information adapted to a smaller area — for example from national to district level — because global and regional models are too coarse for local decisions." },
    psp: { term: "Participatory scenario planning (PSP)", def: "A local workshop, usually before each season, where weather services, government staff, farmers and media discuss the seasonal forecast, turn it into practical advice and agree how to share it in local languages." },
    ffs: { term: "Farmer field school", def: "A group of farmers who meet regularly through a season to learn by doing in the field — on crops, pests, soil, water and more — with a trained facilitator. Climate-focused field schools also teach how to use weather information." },
    picsa: { term: "PICSA", def: "Participatory Integrated Climate Services for Agriculture: farmers, advisers and meteorologists look at climate data and forecasts together so that each farmer can plan crops, livestock and livelihoods for their own situation." },
    zoom: { term: "Zoom Mashinani", def: "A local radio programme in Taita-Taveta, Kenya, supported by ACREI partners. “Mashinani” means “grassroots” in Swahili. It gives farmers a platform to discuss how weather and climate information affects their decisions." },
    cmdrr: { term: "Community-managed disaster risk reduction", def: "A participatory approach in which a community identifies, assesses and reduces its own risks from disasters and climate hazards. It ends in a community adaptation investment plan." },
    johad: { term: "Johad", def: "A small curved earth dam built across a seasonal stream in Rajasthan, India, to catch rainwater and refill groundwater." },
    fpic: { term: "Free, prior and informed consent", def: "The right of Indigenous Peoples to give or withhold consent, without pressure and with full information, before a project or use of their knowledge affects them." },
    tradeoff: { term: "Trade-off", def: "A situation where gaining one thing costs another — for example, higher yields with more pesticide but fewer pollinators." },
    synergy: { term: "Synergy", def: "A situation where two goals or activities support each other — for example, crops and livestock on the same farm." }
  });

  var QUIZ = [
    { o: "1.1", q: "A new colleague asks why the Strategy matters. What is the best way to start your answer?",
      opts: ["“It has three pillars, nine outcomes and two enablers.”", "“Science and new solutions rarely reach farmers or decisions. The Strategy is FAO’s plan to change that.”", "“It is FAO’s research programme.”"], a: 1,
      why: "Start with the problem it solves. The structure comes later, and FAO is not a research organisation." },
    { o: "1.2", q: "A project helps a national institute and farmers decide together which innovations to develop and scale. Which outcome fits best?",
      opts: ["1a Knowledge and evidence", "2b National innovation capacity", "3c Staff capacity"], a: 1,
      why: "Countries choosing, co-creating and scaling innovations themselves is outcome 2b." },
    { o: "1.3", q: "You are preparing a proposal for a climate fund. Which argument is grounded in the Strategy?",
      opts: ["The Strategy guarantees funding for proposals that cite it.", "The Strategy calls innovative funding a condition for success, and FAO links country projects to climate and environment funds.", "Private partners can join without any checks."], a: 1,
      why: "Enabler B and FAO’s role with climate funds are real arguments. Funding is never guaranteed, and private partners are checked." },
    { o: "1.4", q: "A training project invites only landowners, who in this district are almost all men. Which principle is weakest?",
      opts: ["Gender-equal", "Risk-informed", "Evidence-based"], a: 0,
      why: "Women who work in the fields are left out of the training." },
    { o: "2.1", q: "A cooperative starts a booking rota so members can share a tractor that the district has used for years. What is the rota?",
      opts: ["Science", "A technology", "An innovation"], a: 2,
      why: "The tractor is old technology; the new way of organising around it is a social innovation." },
    { o: "2.2", q: "Why should a project use local and Indigenous knowledge?",
      opts: ["Only because it is free.", "It is a source of evidence and solutions, and using it requires the community’s consent.", "It replaces the need for scientific data."], a: 1,
      why: "Local knowledge complements science, and the community decides whether and how it is shared." },
    { o: "3.1", q: "Your innovation is running. Which question belongs to step 3, tracking impact?",
      opts: ["“Which solutions could we choose from?”", "“Who has benefited, and did anything unexpected happen?”", "“What must change in the rules to scale this?”"], a: 1,
      why: "Step 3 asks who benefits and what nobody expected. The others are steps 2 and 5." },
    { o: "3.2", q: "Which feature of ACREI best shows the Strategy’s needs-driven principle?",
      opts: ["It uses the most advanced climate models.", "Forecasts were turned into local advice together with farmers and shared on radio in their own language.", "It was launched by three international organisations."], a: 1,
      why: "The advice was shaped with farmers and delivered the way they prefer." }
  ];
  C.QUIZ = QUIZ;

  function quizScore() {
    var s = C.state(), right = 0, answered = 0;
    QUIZ.forEach(function (x, i) { if (s.q["f" + i] != null) { answered++; if (+s.q["f" + i] === x.a) right++; } });
    return { right: right, answered: answered, pct: Math.round(right / QUIZ.length * 100), done: answered === QUIZ.length };
  }
  C.quizScore = quizScore;

  var TITLE_ART = function () {
    function at(k, x, y) { return '<g transform="translate(' + x + " " + y + ') scale(.9)">' + C.avatar(k, "#fff", true) + "</g>"; }
    return '<svg viewBox="0 0 520 470" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<circle cx="410" cy="95" r="62" fill="#e8920c"/><ellipse cx="330" cy="520" rx="330" ry="210" fill="#2f7d4f"/><ellipse cx="460" cy="540" rx="260" ry="190" fill="#3e9b5f"/>' +
      '<g stroke="#7cc08f" stroke-width="7" stroke-linecap="round"><line x1="300" y1="400" x2="500" y2="380"/><line x1="305" y1="425" x2="500" y2="405"/><line x1="310" y1="450" x2="500" y2="430"/></g>' +
      '<rect x="96" y="300" width="9" height="40" fill="#6b4a2b"/><circle cx="100" cy="285" r="34" fill="#1f6b40"/><rect x="160" y="290" width="9" height="50" fill="#6b4a2b"/><circle cx="164" cy="272" r="42" fill="#1f6b40"/>' +
      at("grace", 205, 175) + at("arjun", 305, 150) + at("mei", 395, 200) + "</svg>";
  };

  C.special.start = { id: "start", full: true, crumb: "",
    html: function () {
      var returning = Object.keys(C.state().v).length > 3;
      return '<div class="title-screen"><div class="txt"><div class="kicker">SELF-PACED COURSE · ABOUT 75 MINUTES</div><h1 tabindex="-1">The FAO Science and Innovation Strategy and your work</h1>' +
        "<p>Three short lessons and a final check. Learn to explain the Strategy, place your work in it, and use it to plan better projects.</p>" +
        '<button class="btn accent big" data-start>' + (returning ? "Continue the course ›" : "Start the course ›") + "</button>" +
        '<div class="credit">Course redesign concept by Erik Sootla, based on the FAO e-learning course on the FAO Science and Innovation Strategy (2025). Not an official FAO product.</div></div>' + TITLE_ART() + "</div>";
    },
    bind: function (r) { r.querySelector("[data-start]").addEventListener("click", function () { C.go(C.state().role ? "home" : "roles"); }); } };

  C.special.roles = { id: "roles", crumb: "Before you start", title: "Which role is closest to your work?", next: "home", nextLabel: "Go to the course ›",
    html: function () {
      var s = C.state();
      return '<p class="lead">The practice tasks show situations for three roles. Choose yours: its situation will come first. You can change this at any time on the course home page.</p><div class="grid g3 people">' +
        C.ROLE_KEYS.map(function (k) {
          var p = C.people[k];
          return '<button class="card click person pick' + (s.role === k ? " on" : "") + '" data-role="' + k + '" aria-pressed="' + (s.role === k) + '">' + C.avatar(k, "#fff") +
            "<h3>" + p.name + '</h3><div class="role">' + p.role + "</div><blockquote>“" + p.quote + '”</blockquote><div class="tick">✓ My role</div></button>';
        }).join("") + "</div>";
    },
    bind: function (r) {
      r.querySelectorAll("[data-role]").forEach(function (b) {
        b.addEventListener("click", function () {
          C.state().role = b.dataset.role; C.save();
          r.querySelectorAll("[data-role]").forEach(function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
        });
      });
    } };

  C.special.home = { id: "home", full: true, crumb: "Course home",
    html: function () {
      var s = C.state(), qs = quizScore(), all = C.lessons.every(function (L) { return C.lessonProgress(L).done; });
      var next = null;
      C.lessons.some(function (L) { if (!C.lessonProgress(L).done) { next = L; return true; } return false; });
      var h = '<div class="home-head"><div><p class="kicker-sm">Course home</p><h1 tabindex="-1">The FAO Science and Innovation Strategy and your work</h1></div>' +
        (s.role ? '<div class="me">' + C.avatar(s.role, "#fff") + '<div><small>Your role</small><b>' + C.people[s.role].name + '</b><button class="linkbtn" data-goto="roles">Change</button></div></div>' : '<button class="btn small" data-goto="roles">Choose your role</button>') + "</div>";
      if (next) h += '<div class="resume"><span>' + (C.lessonProgress(next).seen ? "Pick up where you left off:" : "Start here:") + " <b>" + next.short + ". " + next.title + '</b></span><button class="btn primary" data-goto="' + C.resumeId(next) + '">' + (C.lessonProgress(next).seen ? "Continue" : "Start") + " ›</button></div>";
      h += '<div class="lessons">' + C.lessons.map(function (L) {
        var p = C.lessonProgress(L), status = p.done ? "Done" : p.seen ? "In progress" : "Not started";
        return '<div class="lesson-card' + (p.done ? " done" : "") + '"><div class="lc-top"><span class="pill">' + L.short + '</span><span class="status">' + (p.done ? "✓ " : "") + status + '</span></div><h2>' + L.title + "</h2><p>" + L.blurb + '</p><div class="lc-bar"><span style="width:' + (p.seen / p.total * 100) + '%"></span></div>' +
          '<div class="lc-foot"><small>About ' + L.minutes + " min · " + p.seen + " of " + p.total + ' screens</small><button class="btn ' + (p.done ? "" : "primary") + ' small" data-goto="' + (p.done ? L.screens[0].id : C.resumeId(L)) + '">' + (p.done ? "Review" : p.seen ? "Continue" : "Start") + " ›</button></div></div>";
      }).join("") +
        '<div class="lesson-card final' + (qs.done && qs.pct >= PASS ? " done" : "") + '"><div class="lc-top"><span class="pill">Final check</span><span class="status">' + (qs.done ? (qs.pct >= PASS ? "✓ Passed" : "Try again") : all ? "Ready" : "Best after the lessons") + "</span></div><h2>Eight questions</h2><p>One question for each learning outcome. Pass mark " + PASS + "%. You can retake it.</p>" +
        '<div class="lc-foot"><small>About 10 min' + (qs.done ? " · your score " + qs.pct + "%" : "") + '</small><button class="btn ' + (all ? "primary" : "") + ' small" data-goto="' + (qs.done ? "certificate" : "quiz") + '">' + (qs.done ? "See result" : "Start") + " ›</button></div></div></div>";
      h += '<p class="home-links"><button class="linkbtn" data-goto="glossary">Glossary</button> · <button class="linkbtn" data-goto="about">About this course</button></p>';
      return h;
    },
    bind: function (r) { r.querySelectorAll("[data-goto]").forEach(function (b) { b.addEventListener("click", function () { C.go(b.dataset.goto); }); }); } };

  C.special.glossary = { id: "glossary", crumb: "Glossary", title: "Glossary",
    html: function () {
      return '<p class="lead">Terms used in the course. Underlined terms in the lessons open these explanations directly.</p><dl class="gloss">' +
        Object.keys(C.glossary).sort(function (a, b) { return C.glossary[a].term.localeCompare(C.glossary[b].term); }).map(function (k) { return "<dt>" + C.glossary[k].term + "</dt><dd>" + C.glossary[k].def + "</dd>"; }).join("") + "</dl>";
    } };

  C.special.about = { id: "about", crumb: "About", title: "About this course",
    html: function () {
      return "<p>This is a redesign concept of the FAO self-paced e-learning course on the FAO Science and Innovation Strategy. It was made as a portfolio piece by Erik Sootla, learning and development consultant.</p>" +
        '<div class="grid g2"><div class="card"><h3>What changed</h3>' + C.list(["Task-based learning outcomes for three real job roles", "Plain-language text, one idea per screen", "Practice tasks with feedback instead of recall questions", "Two case studies told through a five-step method", "A final check with one question per outcome"]) + "</div>" +
        '<div class="card"><h3>Source and credit</h3><p>Content is based on the FAO e-learning course on the FAO Science and Innovation Strategy (2025) and the Strategy itself. Text, characters and illustrations are new.</p><p><b>Not an official FAO product.</b> Official names and figures should be checked against the Strategy before any use.</p></div></div>';
    } };

  C.special.quiz = { id: "quiz", crumb: "Final check", title: "Final check",
    html: function () {
      var s = C.state();
      return '<p class="lead">Eight questions, one for each learning outcome. Choose one answer for each, then submit. Pass mark ' + PASS + "%.</p>" +
        QUIZ.map(function (x, i) {
          return '<fieldset class="qblock"><legend><span class="pill">Outcome ' + x.o + "</span> " + (i + 1) + ". " + x.q + "</legend>" + x.opts.map(function (o, k) {
            return '<label class="radio"><input type="radio" name="f' + i + '" value="' + k + '"' + (s.q["f" + i] != null && +s.q["f" + i] === k ? " checked" : "") + "><span>" + o + "</span></label>";
          }).join("") + '<div class="fb" hidden></div></fieldset>';
        }).join("") + '<div class="checkrow"><button class="btn primary" data-submit>Submit my answers</button><span class="muted" data-hint aria-live="polite"></span></div>';
    },
    bind: function (r) {
      var s = C.state();
      r.querySelector("[data-submit]").addEventListener("click", function () {
        var missing = 0;
        QUIZ.forEach(function (x, i) { var c = r.querySelector('input[name="f' + i + '"]:checked'); if (!c) missing++; });
        if (missing) { r.querySelector("[data-hint]").textContent = missing + (missing === 1 ? " question has" : " questions have") + " no answer yet."; return; }
        QUIZ.forEach(function (x, i) { s.q["f" + i] = +r.querySelector('input[name="f' + i + '"]:checked').value; });
        var sc = quizScore();
        CourseStore.complete(sc.pct, sc.pct >= PASS);
        C.save();
        C.go("certificate");
      });
    } };

  C.special.certificate = { id: "certificate", crumb: "Result", title: "Your result",
    html: function () {
      var s = C.state(), sc = quizScore(), pass = sc.done && sc.pct >= PASS;
      if (!sc.done) return '<p class="lead">You haven’t taken the final check yet.</p><p><button class="btn primary" data-goto="quiz">Take the final check ›</button></p>';
      var name = s.name || CourseStore.learnerName() || "";
      var review = QUIZ.map(function (x, i) {
        var ok = +s.q["f" + i] === x.a;
        return '<div class="rev ' + (ok ? "right" : "wrong") + '"><b>' + (ok ? "✓" : "✗") + " " + (i + 1) + ". " + x.q + "</b><span>" + (ok ? "" : "Best answer: " + x.opts[x.a] + ". ") + x.why + "</span></div>";
      }).join("");
      var h = '<div class="result ' + (pass ? "pass" : "fail") + '"><div class="score">' + sc.pct + '%</div><div><b>' + (pass ? "You passed the final check." : "Not yet — the pass mark is " + PASS + "%.") + "</b><br>" + sc.right + " of " + QUIZ.length + " correct.</div></div>";
      if (pass) {
        h += '<div class="cert" id="cert"><div class="cert-kicker">Certificate of completion</div><div class="cert-name" data-certname>' + (name ? C.esc(name) : "Your name") + '</div><p>has completed the course</p><h2>The FAO Science and Innovation Strategy and your work</h2><p>Three lessons and a final check · score ' + sc.pct + "% · " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) + '</p><p class="cert-note">Course redesign concept. Not issued by FAO.</p></div>' +
          '<div class="checkrow no-print"><label>Name on certificate <input type="text" data-name value="' + C.esc(name) + '" placeholder="Your name"></label><button class="btn primary" data-print>Print or save as PDF</button></div>';
        if (s.notes) h += '<div class="card no-print" style="margin-top:18px"><h3>Your 30-second explanation (Lesson 1)</h3><p><i>' + C.esc(s.notes) + "</i></p></div>";
      }
      h += '<details class="no-print" style="margin-top:22px"' + (pass ? "" : " open") + "><summary><b>Review your answers</b></summary>" + review + "</details>";
      h += '<p class="no-print" style="margin-top:18px"><button class="btn" data-retake>Retake the final check</button> <button class="btn" data-goto="home">Course home</button></p>';
      return h;
    },
    bind: function (r) {
      var s = C.state();
      r.querySelectorAll("[data-goto]").forEach(function (b) { b.addEventListener("click", function () { C.go(b.dataset.goto); }); });
      var inp = r.querySelector("[data-name]");
      if (inp) inp.addEventListener("input", function () { s.name = inp.value; r.querySelector("[data-certname]").textContent = inp.value || "Your name"; C.save(); });
      var pr = r.querySelector("[data-print]"); if (pr) pr.addEventListener("click", function () { window.print(); });
      var rt = r.querySelector("[data-retake]");
      if (rt) rt.addEventListener("click", function () { Object.keys(s.q).forEach(function (k) { if (k.charAt(0) === "f") delete s.q[k]; }); C.save(); C.go("quiz"); });
    } };
})(window.Course);
