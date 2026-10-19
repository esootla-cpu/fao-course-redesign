/* Lesson 1: The Strategy and your work (outcomes 1.1-1.4) */
(function (C) {
  "use strict";
  var A = "Why it matters", B = "Find your place", P = "Partners and funding", D = "Seven principles";

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
  C.OUTCOMES = OUTCOMES;
  C.outcomeTable = function () {
    return '<div class="tablewrap"><table class="ref"><thead><tr><th>Outcome</th><th>What should change</th><th>This is you if you…</th></tr></thead><tbody>' +
      OUTCOMES.map(function (o) { return '<tr class="p' + o[4] + '"><td>' + o[0] + " " + o[1] + "</td><td>" + o[2] + "</td><td>" + o[3] + "</td></tr>"; }).join("") + "</tbody></table></div>";
  };
  var PRINCIPLES = [
    ["Rights-based and people-centred", "Who could be left out, and how does the project bring them in?"],
    ["Gender-equal", "Does the project consider the different roles and needs of women and men?"],
    ["Evidence-based", "What evidence is the choice based on? Does it include local and Indigenous knowledge?"],
    ["Needs-driven", "Did the solution come from people’s real problem or from a ready-made template? Were they part of the choice?"],
    ["Sustainability-aligned", "What does the project give people, the economy and nature — and where does one cost another?"],
    ["Risk-informed", "What could go wrong, and how does the project reduce it?"],
    ["Ethics-based", "Are there fairness issues: whose data, who controls the technology, do people know what they agree to?"]
  ];
  C.PRINCIPLES = PRINCIPLES;

  C.addLesson({
    id: "L1", short: "Lesson 1", title: "The Strategy and your work", minutes: 25,
    blurb: "Explain the Strategy in two or three sentences, find your project in it, and use it to argue for partners and funding.",
    outcomes: ["Explain to a colleague or partner, in two or three sentences, why the Strategy exists and what problems it solves",
               "Identify which pillar and outcome of the Strategy your project or task belongs to",
               "Find arguments in the Strategy for partnerships and funding, for negotiations and proposals",
               "Check your project or initiative against the Strategy’s seven guiding principles"],
    screens: [
      { id: "l1-0", title: "What you will learn in this lesson", menu: "Lesson overview",
        html: function () {
          var L = this.lesson;
          return '<p class="lead">About ' + L.minutes + ' minutes. Four short parts, each ending with a practice task.</p><ol class="goals">' +
            L.outcomes.map(function (o, i) { return '<li><span class="badge">' + "ABCD"[i] + "</span><span>" + o + "</span></li>"; }).join("") + "</ol>" +
            C.keypoint("You don’t need to remember the Strategy. You need to be able to use it: explain it, place your work in it and test your project against it.");
        } },

      { id: "l1-1", part: A, title: "What stands in the way", menu: "What stands in the way",
        html: function () {
          this._r = C.revealCards([
            { badge: "1", title: "Innovations don’t reach the ground", teaser: "Solutions exist, but not where they are needed.",
              body: C.list(["Small farms and low- and middle-income countries often can’t get solutions that already exist.", "Advisory services that bring knowledge to farmers have had little support for years.", "Some countries also lag behind on digital technology."]) },
            { badge: "2", title: "Too little, uneven research funding", teaser: "Research money goes where profits come fast.",
              body: C.list(["Most developing countries spend less on agricultural research than they need.", "Private investment is growing, but it goes where profits come fast.", "Research for small farms still depends on public money."]) },
            { badge: "3", title: "Decisions don’t always rest on evidence", teaser: "Facts compete with interests and outdated rules.",
              body: C.list(["Data can be incomplete or contradictory.", "Many interests shape a decision, not only the facts.", "Technology changes faster than laws and rules."]) }], 3);
          return '<p class="lead">Science already offers many solutions for farming and food. They rarely reach the people who need them most.</p>' + C.howto("Open each card.") + this._r.html +
            '<div class="note"><b>Think about it:</b> which of these three is closest to your country?</div>';
        },
        bind: function (r) { this._r.bind(r); } },

      { id: "l1-2", part: A, title: "What the Strategy is", menu: "What the Strategy is",
        html: function () {
          return '<div class="grid g2"><div><p>The FAO Science and Innovation Strategy is FAO’s plan for helping countries use science and new solutions. The FAO Council approved it in 2022.</p>' +
            "<p>Member countries asked FAO for more support in this area. The Strategy answers that request: it brings FAO’s work with science together and helps spot new problems early.</p>" +
            "<p>It does not stand alone. It is one of the main tools for delivering the FAO Strategic Framework 2022–2031.</p></div>" +
            '<div class="card sky nest"><h3 style="color:var(--blue)">FAO Strategic Framework 2022–2031</h3><div class="inner"><b>Science and Innovation Strategy</b><span>one of the main tools for delivering the Framework</span></div></div></div>' +
            C.keypoint("The Strategy is FAO’s answer to a request from its members: help us use science and innovation.");
        } },

      { id: "l1-3", part: A, title: "What the Strategy aims for", menu: "Vision and goal",
        html: function () {
          this._f = C.flipCards([
            { front: '<span class="tag">Vision</span><b>What world does the Strategy want?</b>', back: '<span class="tag">Vision</span>A world without hunger and malnutrition, where science and innovation are used to the full to solve complex problems.' },
            { front: '<span class="tag">Goal</span><b>What should countries be able to do?</b>', back: '<span class="tag">Goal</span>Use science and innovation to find solutions that fit their own conditions — making food systems more efficient, inclusive, resilient and sustainable.' }], 2);
          return C.howto("Turn each card over.") + this._f.html +
            '<p class="muted" style="margin-top:22px">FAO calls the result the “four betters”, with one condition: leaving no one behind.</p><div class="grid g4 betters">' +
            ["Better production", "Better nutrition", "Better environment", "Better life"].map(function (b, i) { return '<div class="row"><span class="badge orange">' + (i + 1) + "</span><b>" + b + "</b></div>"; }).join("") + "</div>" +
            '<div class="note"><b>Special focus:</b> small and family farms, Indigenous Peoples, women, youth and small businesses — the groups most often left out.</div>';
        },
        bind: function (r) { this._f.bind(r); } },

      { id: "l1-4", part: A, title: "What FAO does — and doesn’t", menu: "FAO’s role",
        html: function () {
          var does = [["Norms and standards", "Guidelines and standards based on evidence"], ["Policy advice", "Advice to governments on policy"],
                      ["A neutral space", "Where countries and scientists discuss shared issues"], ["Country projects", "Adapting solutions to local conditions and scaling up successful pilots"]];
          return '<div class="grid g12"><div class="card"><h3>FAO is not a research organisation</h3><p>It does not run its own research programme. Its role is to turn evidence into things countries can use.</p></div><div class="grid">' +
            does.map(function (d) { return '<div class="row"><span class="badge green">✓</span><div><b>' + d[0] + '</b><br><span class="muted">' + d[1] + "</span></div></div>"; }).join("") + "</div></div>";
        } },

      { id: "l1-5", part: A, title: "Practice: explain the Strategy in 30 seconds", menu: "Practice: explain it", practice: true,
        html: function () {
          this._q = C.singleChoice("p1-explain", "Which answer works best in a short conversation?", [
            { text: "“It’s FAO’s plan to help countries use science and new solutions. Right now innovations rarely reach farmers or government decisions. The Strategy helps fix that, especially for small farms.”", correct: true, head: "Yes — that works",
              feedback: "Three sentences: what it is, what problem it solves, and for whom. Start with the problem, not with the structure of the document." },
            { text: "“It’s a key tool for implementing FAO’s Strategic Framework 2022–2031, with three pillars and nine outcomes.”", head: "True, but not helpful yet",
              feedback: "Everything here is correct, but the listener still doesn’t know why it matters to them." },
            { text: "“It’s FAO’s programme for running research in countries.”", head: "Not quite",
              feedback: "FAO is not a research organisation. Its role is to turn evidence into norms, advice and projects." }],
            function (ok, root) { root.querySelector("[data-notes]").hidden = false; });
          return C.situations({ grace: "A deputy minister asks in the lift: “FAO has a new science strategy. What’s in it for us?”",
                                arjun: "A research institute director asks: “Why does FAO need this strategy if you don’t do research?”",
                                mei: "A donor at a conference asks: “In a nutshell — what is this strategy?”" }) + this._q.html +
            '<div data-notes hidden><p style="margin-top:18px"><b>Now write your own version</b> for your situation. It is saved with your progress and shown on your certificate page.</p><textarea data-note aria-label="My explanation of the Strategy">' + C.esc(C.state().notes) + "</textarea></div>";
        },
        bind: function (r) {
          if ("p1-explain" in C.state().t) r.querySelector("[data-notes]").hidden = false;
          this._q.bind(r);
          r.querySelector("[data-note]").addEventListener("input", function (e) { C.state().notes = e.target.value; C.save(); });
        } },

      { id: "l1-6", part: B, title: "The Strategy on one page", menu: "The Strategy on one page",
        html: function () {
          return C.howto("Read it top to bottom: the goal, three pillars that hold it, then what runs through all of them.") +
            '<div class="house"><div class="goal"><b>Goal: countries use science and innovation for solutions that fit their own conditions</b><span class="muted">four betters · leaving no one behind</span></div><div class="pillars">' +
            [["1. Evidence-based decisions", 0], ["2. Innovation in countries", 3], ["3. FAO’s own capacity", 6]].map(function (p) {
              return '<div class="pillar"><h3>' + p[0] + "</h3>" + OUTCOMES.slice(p[1], p[1] + 3).map(function (o) { return "<div>" + o[0] + " " + o[1] + "</div>"; }).join("") + "</div>";
            }).join("") + '</div><div class="enablers"><b>Enablers:</b> A — transformative partnerships · B — innovative funding and financing</div>' +
            '<div class="found"><b>Foundation: seven guiding principles</b><br><span class="muted">' + PRINCIPLES.map(function (p) { return p[0].toLowerCase(); }).join(" · ") + "</span></div></div>" +
            C.keypoint("To find your project in the Strategy, take two steps: choose a pillar, then an outcome inside it.");
        } },

      { id: "l1-7", part: B, title: "Three pillars in plain words", menu: "Three pillars",
        html: function () {
          var P = [["1", "Evidence-based decisions", "Decisions rest on facts.", "Strengthen science- and evidence-based decision-making", ["FAO’s global databases", "Dialogue between scientists and policymakers"]],
                   ["2", "Innovation in countries", "New solutions reach countries and farmers.", "Support innovation and technology at regional and country levels", ["Sharing experience between countries", "Adapting a technology to local conditions", "Scaling up a successful pilot"]],
                   ["3", "FAO’s own capacity", "FAO itself gets better at working with science.", "Reinforce FAO’s science and innovation capacities", ["Sharing knowledge inside FAO", "Clear science communication", "Staff skills"], "If you don’t work for FAO, your project most likely belongs to pillar 1 or 2."]];
          this._t = C.tabs(P.map(function (p) {
            return { label: p[1], html: '<div class="row"><span class="badge orange lg">' + p[0] + '</span><div><h2 style="margin:4px 0 6px">' + p[2] + '</h2><p class="muted"><b>Official wording:</b> <i>' + p[3] + "</i></p></div></div>" +
              '<div class="grid g2" style="margin-top:16px"><div class="card"><h3>What this looks like</h3>' + C.list(p[4]) + "</div>" + (p[5] ? '<div class="card sky"><h3 style="color:var(--blue)">Tip</h3><p>' + p[5] + "</p></div>" : "") + "</div>" };
          }), true);
          return C.howto("Go through the three pillars.") + this._t.html;
        },
        bind: function (r) { this._t.bind(r); } },

      { id: "l1-8", part: B, title: "Find your outcome", menu: "Find your outcome",
        html: function () { return '<p class="lead">Each pillar has three outcomes — what should change. Find the row that best describes your project.</p>' + C.outcomeTable(); } },

      { id: "l1-9", part: B, title: "Practice: where does the project fit?", menu: "Practice: place projects", practice: true,
        html: function () {
          var items = [{ who: "grace", text: "<b>Ministry.</b> Drafting rules for digital advisory services for farmers and assessing their impact first.", answer: "2c", why: "The project is about science and innovation policy and rules. Dialogue with scientists (1b) helps, but the goal is the rules themselves." },
                       { who: "arjun", text: "<b>Country office.</b> Running farmer field schools where farmers and agronomists test drought-tolerant varieties.", answer: "2a", why: "The point is that small farms get and use a suitable solution. 2b would fit if the project built a national field-school system." },
                       { who: "mei", text: "<b>Partnerships.</b> Setting up regular meetings between the national agricultural institute and a parliamentary committee.", answer: "1b", why: "Scientists and decision-makers working together is exactly the science–policy link." },
                       { who: null, text: "<b>FAO.</b> Building a shared database of lessons from country office projects.", answer: "3a", why: "This is FAO’s internal work with its own knowledge: pillar 3. Outcome 1a is about data on food systems, not FAO’s own experience." }];
          var r = C.state().role || "grace";
          items.sort(function (a, b) { return (b.who === r) - (a.who === r); });
          items.forEach(function (it) { it.img = it.who ? C.avatar(it.who, "#fff") : '<span class="badge deep">FAO</span>'; });
          this._m = C.match("p1-place", "Choose an outcome for each project.", OUTCOMES.map(function (o) { return { value: o[0], label: o[0] + " " + o[1] }; }), items,
            "<b>All four placed correctly</b>Two steps — pillar, then outcome — work for any project.", "<b>Some projects belong elsewhere</b>Read the note under each project, change your answers and check again.");
          return '<p><button class="btn small" data-table>Open the outcome table</button></p>' + this._m.html;
        },
        bind: function (r) {
          this._m.bind(r);
          r.querySelector("[data-table]").addEventListener("click", function (e) { C.modal("<h2>Find your outcome</h2>" + C.outcomeTable(), e.target); });
        } },

      { id: "l1-10", part: P, title: "Two enablers: nothing works without them", menu: "Two enablers",
        html: function () {
          return '<p class="lead">The Strategy names two things that cut across all three pillars.</p><div class="grid g2">' +
            '<div class="card orange row"><span class="badge orange lg">A</span><div><h3>Transformative partnerships</h3><p>Partnerships that bring lasting change, not one-off events.</p></div></div>' +
            '<div class="card orange row"><span class="badge orange lg">B</span><div><h3>Innovative funding and financing</h3><p>New ways to pay for innovation, so poorer countries don’t fall further behind.</p></div></div></div>' +
            C.keypoint("When you propose a partnership or look for funding, you are doing what the Strategy calls a condition for success. That is a strong argument — use it.");
        } },

      { id: "l1-11", part: P, title: "Who to work with", menu: "Who to work with",
        html: function () {
          this._r = C.revealCards([
            { badge: "1", color: "", title: "Research and universities", teaser: "Research, experts, data", body: "<p><b>Strategy focus:</b> national and international research centres, including CGIAR; advisory and extension services.</p>" },
            { badge: "2", color: "", title: "UN system", teaser: "Joint work without duplication", body: "<p><b>Strategy focus:</b> the Rome-based UN agencies and the UN Technology Facilitation Mechanism.</p>" },
            { badge: "3", color: "", title: "Civil society", teaser: "Local knowledge and the networks that spread it", body: "<p><b>Strategy focus:</b> organisations that work with farmers and communities.</p>" },
            { badge: "4", color: "", title: "Private sector", teaser: "Investment, technology, access to markets", body: "<p><b>Strategy focus:</b> small and medium businesses, start-ups and incubators — especially those led by women and young people.</p>" }], 4);
          return C.howto("Open each partner group to see who the Strategy has in mind.") + this._r.html +
            C.keypoint("Why partner: access to experts and research, more funding, less duplication, wider reach.");
        },
        bind: function (r) { this._r.bind(r); } },

      { id: "l1-12", part: P, title: "Money for innovation", menu: "Money for innovation",
        html: function () {
          var F = [["Public–private partnerships", "One of the new ways to pay for innovation."],
                   ["Climate and environment funds", "FAO links country projects to the Green Climate Fund and the Global Environment Facility. Countries can prepare projects for these funds with FAO."],
                   ["Due diligence", "Private partners go through FAO’s check for conflicts of interest (the FRAME procedure). Plan time for it."]];
          return '<p class="lead">Without new sources of funding, low- and middle-income countries will fall further behind. Three things worth knowing:</p><div class="grid g3">' +
            F.map(function (f, i) { return '<div class="card"><span class="badge orange">' + (i + 1) + '</span><h3 style="margin-top:14px">' + f[0] + "</h3><p>" + f[1] + "</p></div>"; }).join("") + "</div>";
        } },

      { id: "l1-13", part: P, title: "Practice: arguments for a partner", menu: "Practice: make your case", practice: true,
        html: function () {
          this._q = C.multiSelect("p1-args", "Which three arguments from the Strategy are strongest for this project? Select three.", [
            { text: "The Strategy names start-ups and small businesses as priority partners.", correct: true, feedback: "Yes — that is enabler A." },
            { text: "The project helps small farms get affordable solutions — outcome 2a.", correct: true, feedback: "Yes — linking to a named outcome shows the project serves the Strategy." },
            { text: "The university brings the science, the start-up the channel to farmers.", correct: true, feedback: "Yes — partners who complement each other instead of duplicating." },
            { text: "FAO will run the research for the app itself.", feedback: "No — FAO is not a research organisation. Here the university brings the research." },
            { text: "The start-up needs no extra checks to work with FAO.", feedback: "No — private partners go through FAO’s check for conflicts of interest. Treat it as a step in your plan." }],
            "<b>Strong set</b>A priority type of partner, a named outcome, and partners who complement each other. Use the same logic in your letter or concept note.",
            "<b>Not yet</b>Look at the notes on each option, then try again.");
          return C.situations({ grace: "You’re writing to FAO for help launching mobile advice for farmers with a local start-up and an agricultural university.",
                                arjun: "You’re drafting a concept note for a donor on the same mobile advice project.",
                                mei: "You’re preparing to meet the start-up and the university, who want to launch the service with FAO." }) + this._q.html;
        },
        bind: function (r) { this._q.bind(r); } },

      { id: "l1-14", part: D, title: "Seven principles as a checklist", menu: "Seven principles",
        html: function () {
          this._f = C.flipCards(PRINCIPLES.map(function (p) { return { front: "<b>" + p[0] + "</b>", back: "<b>" + p[0] + "</b><span>" + p[1] + "</span>" }; }), 4);
          return '<p class="lead">The seven principles guide how FAO works with science and innovation. Each one becomes a question you can ask about any project.</p>' + C.howto("Turn the cards over to see the questions.") + this._f.html +
            C.keypoint("If a question has no good answer, the project has a weak spot.");
        },
        bind: function (r) { this._f.bind(r); } },

      { id: "l1-15", part: D, title: "Practice: check a project", menu: "Practice: check a project", practice: true,
        html: function () {
          var o = [["Rights-based and people-centred", true, "The smallest farms are left out because of the price."],
                   ["Gender-equal", true, "Training only for landowners shuts out women who work in the fields."],
                   ["Evidence-based", false, "Met: based on independent trials. Farmers’ own experience would make it stronger."],
                   ["Needs-driven", true, "Farmers weren’t asked about their main problem; drones may solve the wrong one."],
                   ["Sustainability-aligned", false, "Met: effects on water and pollinators were assessed."],
                   ["Risk-informed", false, "Met: there is a safety plan and operator training."],
                   ["Ethics-based", true, "Field data goes to the company without farmers knowing."]];
          this._q = C.multiSelect("p1-check", "Which principles does the project meet poorly? Select all that apply.",
            o.map(function (x) { return { text: x[0], correct: x[1], feedback: x[2] }; }),
            "<b>Four weak spots, three strengths</b>Which single step would you add to the project first?", "<b>Not quite</b>Read the case again — each weak principle matches one line of it.");
          return '<div class="grid g2" style="align-items:start"><div class="case"><div class="tag">Training case (fictional)</div><p><b>In a rice-growing district, a private company will spray fields by drone for a fee.</b></p>' +
            C.list(["The decision followed independent field trials in three villages.", "Effects on water and pollinators were assessed.", "There is a safety plan and operator training.",
                    "Farmers were not asked what their main problem is.", "Only landowners are invited to training — in this district, almost always men.",
                    "The smallest farms can’t afford the service.", "Field data collected by the drones belongs to the company; farmers are not told."]) +
            "</div><div>" + this._q.html + "</div></div>";
        },
        bind: function (r) { this._q.bind(r); } },

      { id: "l1-16", title: "Lesson 1 in four sentences", menu: "Summary",
        html: function () {
          return '<div class="summary">' + ["The Strategy helps countries use science where it doesn’t yet reach people. When you explain it, start with the problem.",
            "Any project can be placed in the Strategy in two steps: pillar, then outcome.",
            "Partners and new funding are conditions for success. Use that in negotiations.",
            "The seven principles are seven questions for any project."].map(function (t, i) { return '<div class="take"><span class="badge orange">' + (i + 1) + "</span><span>" + t + "</span></div>"; }).join("") +
            '</div><p class="muted">Next: Lesson 2 — science, innovation and technology: what’s the difference?</p>';
        } }
    ]
  });
})(window.Course);
