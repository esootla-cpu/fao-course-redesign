/* Lesson 3: From Strategy to project - five steps and two cases (outcomes 3.1-3.2) */
(function (C) {
  "use strict";
  var S = "Five steps", A = "Case 1: Aylluu AgTech", B = "Case 2: ACREI", X = "Apply it";

  var STEPS = [
    ["Understand the problem and its context", "Start with a careful diagnosis, not with a favourite technology.",
      ["What exactly is the problem, and for whom?", "What are the social, environmental and economic conditions?", "Are marginalised groups involved from the start — and at every later step?"]],
    ["Compare possible solutions", "Look at several options before choosing one.",
      ["Which options would solve the problem? Which of them are innovative?", "Is it a new approach or a small improvement to an existing one?", "Does it fit local conditions and the people who will use it?", "Who controls the technology? Can local communities get it and adapt it?"]],
    ["Track impact, document and learn", "Build monitoring into the project from day one.",
      ["Did the innovation help? Whom?", "Were there effects nobody expected?", "What have we learned that should change the next steps?"]],
    ["Look for synergies and trade-offs", "Gains in one place can mean losses in another.",
      ["Where do two goals support each other (a synergy)?", "Where does gaining one thing cost another (a trade-off)?", "How will we reduce trade-offs: impact assessment, quality checks, open dialogue with those affected?"]],
    ["Plan for scaling", "Spreading a success needs more than the technology itself.",
      ["Is there trust between the people involved, and a change in mindsets?", "Is there social licence: dialogue and agreement with those affected?", "Is there stable funding and a market incentive?", "Do policies or rules need to change? Are there safeguards and a transition plan?"]]
  ];
  C.STEPS = STEPS;

  C.addLesson({
    id: "L3", short: "Lesson 3", title: "From Strategy to project", minutes: 30,
    blurb: "Apply five steps for bringing innovation into a project, and check real initiatives against the Strategy.",
    outcomes: ["Apply five steps for bringing an innovation into your own project, from understanding the problem to scaling up",
               "Assess a real initiative against the Strategy’s pillars and principles"],
    screens: [
      { id: "l3-0", title: "What you will learn in this lesson", menu: "Lesson overview",
        html: function () {
          var L = this.lesson;
          return '<p class="lead">About ' + L.minutes + ' minutes. First the five steps, then two real initiatives that show them at work.</p><ol class="goals">' +
            L.outcomes.map(function (o, i) { return '<li><span class="badge">' + "AB"[i] + "</span><span>" + o + "</span></li>"; }).join("") + "</ol>" +
            C.keypoint("Throughout all five steps, one rule holds: involve the people who will live with the result.");
        } },

      { id: "l3-1", part: S, title: "Five steps for bringing innovation into a project", menu: "The five steps",
        html: function () {
          this._t = C.tabs(STEPS.map(function (s) {
            return { label: s[0], html: "<h2>" + s[0] + '</h2><p class="lead">' + s[1] + '</p><div class="card"><h3>Questions to ask</h3>' + C.list(s[2]) + "</div>" };
          }), true);
          return C.howto("Go through the five steps in order.") + this._t.html;
        },
        bind: function (r) { this._t.bind(r); } },

      { id: "l3-2", part: S, title: "Step 1 up close: technology is not neutral", menu: "Technology is not neutral",
        html: function () {
          this._r = C.revealCards([
            { badge: "1", title: "Who gets the land?", teaser: "A new cash crop changes who farms.",
              body: "<p>When new technology or crops make land more profitable, men may take over more of it. Evidence from Cameroon, the Democratic Republic of the Congo and Zimbabwe shows that new cash crops reduced the land given to women.</p>" },
            { badge: "2", title: "Who can use the pump?", teaser: "Equipment designed for one kind of user.",
              body: "<p>A study in Ethiopia, Ghana and the United Republic of Tanzania found that women usually did not use motor pumps: they were complex, physically heavy to operate, and hiring and managing workers was hard.</p><p>Tools and equipment are still mostly designed around male farmers and workers.</p>" },
            { badge: "3", title: "Who tested the machine?", teaser: "The users were not in the room.",
              body: "<p>In Bolivia, women do most of the potato sorting in commercial production. They were not involved in testing a machine that partly automated sorting. They found it too complicated, and it was not adopted.</p>" }], 3);
          return '<p class="lead">Technologies change who does what, who earns and who decides. Women in farming already have less access than men to improved seed, fertiliser, advice, credit and machinery.</p>' +
            C.howto("Open the three short stories.") + this._r.html +
            C.keypoint("That is why gender equality is one of the Strategy’s seven principles: ask early who a technology will help and who it could leave out.");
        },
        bind: function (r) { this._r.bind(r); } },

      { id: "l3-3", part: S, title: "Steps 3 and 4 up close: side effects", menu: "Side effects",
        html: function () {
          this._c = C.classify("p3-trade", "Synergy or trade-off? Sort each example.", ["Synergy", "Trade-off"], [
            { text: "Adding livestock to a crop farm: manure feeds the soil, crop leftovers feed the animals.", cat: 0, why: "Two activities support each other." },
            { text: "More pesticide raises yields, but pollinating insects decline.", cat: 1, why: "Gaining yield costs biodiversity — and later, possibly yield too." },
            { text: "Trees along the fields give shade and fruit and reduce soil erosion.", cat: 0, why: "One measure brings several benefits at once." },
            { text: "Heavy fertiliser use raises harvests, but runoff pollutes the local lake.", cat: 1, why: "A gain on the farm, a loss for water and for people downstream." }],
            "<b>All correct</b>Watching for trade-offs is step 4. Watching for surprises is step 3.",
            "<b>Not quite</b>A trade-off means one gain costs something else. Read the notes and try again.");
          return '<div class="grid g2"><div class="card"><h3>Pesticides</h3><p>At first they were valued for higher yields. Over time, evidence grew of harm to human health and the environment: residues in soil and water, and damage to bees, birds and life in rivers.</p></div>' +
            '<div class="card"><h3>Fertilisers</h3><p>They increase production. But surplus nitrogen and phosphate can seep into groundwater or run off into rivers and lakes.</p></div></div>' +
            '<p style="margin-top:16px">In complex systems you can’t predict every effect. So think about effects before you start, and keep tracking them afterwards. FAO uses safeguards for this, such as its Framework for Environmental and Social Management.</p>' + this._c.html;
        },
        bind: function (r) { this._c.bind(r); } },

      { id: "l3-4", part: S, title: "Practice: which step is this?", menu: "Practice: which step?", practice: true,
        html: function () {
          this._m = C.match("p3-steps", "Each question belongs to one of the five steps. Match them.",
            STEPS.map(function (s, i) { return { value: String(i + 1), label: (i + 1) + ". " + s[0] }; }), [
              { text: "“What do the women and men in this community actually need?”", answer: "1", why: "Understanding needs and context comes first." },
              { text: "“Is this a completely new approach or a small improvement to what we have?”", answer: "2", why: "Comparing and judging options is step 2." },
              { text: "“Who has benefited so far, and did anything happen that we didn’t expect?”", answer: "3", why: "Tracking impact and surprises is step 3." },
              { text: "“Does the higher output here cost us something elsewhere, such as water quality?”", answer: "4", why: "Weighing gains against losses is step 4." },
              { text: "“What else must change — rules, funding, trust — for this to work in ten districts?”", answer: "5", why: "Scaling needs more than the technology: step 5." }],
            "<b>All five matched</b>You can use these questions as a checklist for your own project.", "<b>Some questions belong to another step</b>Read the notes and try again.");
          return this._m.html;
        },
        bind: function (r) { this._m.bind(r); } },

      { id: "l3-5", part: A, title: "Case 1: Aylluu AgTech, Latin America and the Caribbean", menu: "Aylluu AgTech: the story",
        html: function () {
          var T = [
            { label: "The problem", html: "<h2>Farm technology is booming — but not for small farms</h2><p>Latin America and the Caribbean are going through a revolution in agri-food technology. Its benefits have not reached small producers, who make up more than 40% of the region’s farming population. Technology providers mostly serve medium and large farms.</p><p>One main obstacle: there are no business models that make it viable to serve rural communities. That deepens inequality.</p>" },
            { label: "The idea", html: "<h2>Young rural graduates as “force multipliers”</h2><p>The FAO Regional Office for Latin America and the Caribbean launched an innovation " + C.term("bootcamp") + " for rural young people aged 20–35 with an agricultural education.</p><p>The idea: help them start their own agri-tech <b>cooperatives</b>, so that technology reaches thousands of small producers through people who know the communities. The name comes from " + C.term("aylluu", "aylluu") + ", a Quechua word for community.</p><p>Tools used: " + C.term("designthinking", "design thinking") + ", " + C.term("platformcoop", "platform cooperatives") + " and " + C.term("leancoop", "lean cooperatives") + ".</p>" },
            { label: "Try it", html: "<h2>A five-day bootcamp</h2><p>In Santiago de Chile, 15 young people from 10 Latin American countries spent five intensive days on hands-on sessions, mentoring and team projects. Future participants had also helped shape the programme through surveys and interviews.</p><p>Two of the project ideas:</p>" + C.list(["Linked water tanks with flexible hoses that carry rainwater over rough ground to villages without piped water.", "A free-range egg business run as a franchise: local women learn the trade on the farm, then open farms of their own."]) },
            { label: "Learn and adapt", html: "<h2>Support after the bootcamp</h2><p>A support team at the FAO regional office kept advising participants, with monthly training on topics they chose themselves — such as legal forms for a business and funding options.</p><p>The bootcamp was then turned into an online course in Spanish, which attracted more than 1,300 participants in its first two weeks.</p>" },
            { label: "Scale", html: "<h2>The network carries on</h2><p>The group now works on its own. Participants are writing business plans; some went on to further study, others are seeking international funding — for example for agroecology in Peru and beekeeping in Ecuador. One project was ready to apply for international funding.</p>" }];
          this._t = C.tabs(T, true);
          return C.howto("Follow the initiative through the five steps.") + this._t.html;
        },
        bind: function (r) { this._t.bind(r); } },

      { id: "l3-6", part: A, title: "Practice: how does Aylluu AgTech fit the Strategy?", menu: "Practice: Aylluu and the Strategy", practice: true,
        html: function () {
          this._q = C.multiSelect("p3-aylluu", "Which statements show how the initiative fits the Strategy? Select all that apply.", [
            { text: "It helps small producers get affordable, suitable innovations (outcome 2a).", correct: true, feedback: "Yes — that is the problem it was built to solve." },
            { text: "It invests in rural young people, one of the Strategy’s focus groups.", correct: true, feedback: "Yes — youth are named in the Strategy’s scope." },
            { text: "It uses cooperative ownership to pool resources from different organisations (enabler B).", correct: true, feedback: "Yes — new ownership models are a form of innovative funding." },
            { text: "It combines social and organisational innovation with technology.", correct: true, feedback: "Yes — several kinds of innovation at once, as Lesson 2 described." },
            { text: "It focuses only on new technology.", feedback: "No — cooperatives and new ways of organising are central to it." },
            { text: "Its main aim is profitable digital platforms for large agribusiness.", feedback: "No — it targets small producers and rural youth." }],
            "<b>Well spotted</b>One initiative can serve an outcome, a focus group and an enabler at the same time.", "<b>Not yet</b>Read the notes on each statement, then try again.");
          return this._q.html;
        },
        bind: function (r) { this._q.bind(r); } },

      { id: "l3-7", part: B, title: "Case 2: ACREI, East Africa", menu: "ACREI: from forecast to farm",
        html: function () {
          var T = [
            { label: "Forecast", html: "<h2>The problem: forecasts that don’t reach the farm</h2><p>Farmers and herders often get no local climate information. Seasons have become harder to predict, and they say traditional signs — birds, plants, stars — are less reliable than before.</p><p>The Agricultural Climate Resilience Enhancement Initiative (ACREI) was launched in 2018 by FAO, the World Meteorological Organization (WMO) and the IGAD Climate Prediction and Applications Centre (ICPAC) for small farmers and agro-pastoralists in the Horn of Africa.</p>" },
            { label: "Make it local", html: "<h2>Tailor the forecast to the place</h2><p>National forecasts are too broad for decisions on one farm. Meteorologists " + C.term("downscale", "downscale") + " the information to the local level — for example, to Taveta county in Kenya.</p>" },
            { label: "Plan together", html: "<h2>Turn data into advice, together</h2><p>Before each season — twice a year — a " + C.term("psp", "participatory scenario planning") + " workshop brings together meteorologists, extension officers, farmers and local media.</p>" + C.list(["The seasonal forecast is presented and discussed.", "Groups turn it into practical advice on crops, livestock, water, health and infrastructure.", "The workshop agrees how to spread the advice, in local languages."]) },
            { label: "Spread the word", html: "<h2>Reach farmers the way they prefer</h2>" + C.list(["Climate-focused " + C.term("ffs", "farmer field schools") + " for groups.", C.term("picsa", "PICSA") + " for planning on individual farms.", "Local radio: interviews showed that radio in the local language was farmers’ most preferred and trusted channel. A local programme, " + C.term("zoom", "Zoom Mashinani") + ", gives farmers a platform to discuss the advice."]) },
            { label: "Act", html: "<h2>Farmers change what they do</h2>" + C.list(["They prepare land to keep moisture in the soil and drain floods.", "They plant a mix of early and late varieties to avoid losing everything.", "They make hay in good seasons to store for dry periods.", "Communities work together to stop erosion gullies."]) +
              "<p>For longer-term plans, communities use " + C.term("cmdrr", "community-managed disaster risk reduction") + ", which ends in a community adaptation investment plan. One village also received a grant it manages itself to carry out its plan — for example solar power, small dams and climate-resilient goat and poultry keeping.</p>" }];
          this._t = C.tabs(T, true);
          return C.howto("Follow the climate information from the forecast to the farm.") + this._t.html +
            C.keypoint("ACREI’s innovation is not one technology: it connects partners who rarely work together — weather services, farming advisers and local media — with the farmer at the centre.");
        },
        bind: function (r) { this._t.bind(r); } },

      { id: "l3-8", part: B, title: "Practice: the forecast nobody understood", menu: "Practice: scenario", practice: true,
        html: function () {
          this._s = C.scenario("p3-scn", [
            { situation: "A seasonal forecast arrives from the national weather service: 12 pages of technical terms, covering the whole country. Farmers in your district ask what to plant.",
              q: "What do you do?",
              options: [
                { text: "Send the forecast to the field school leaders so they can read it.", result: "Hardly anyone reads it. The language is too technical and the forecast is not specific to your district." },
                { text: "Organise a planning workshop with a meteorologist, farmers, livestock and water staff, and local radio, to turn the forecast into local advice.", best: true, result: "The group agrees on clear advice for crops, livestock and water, and on how to share it in the local language." },
                { text: "Tell farmers to rely on traditional signs this season.", result: "Farmers themselves say the signs have become less reliable as weather grows more erratic. Combining both kinds of knowledge works better." }] },
            { situation: "The workshop has produced clear advice in the local language.",
              q: "How do you reach the most farmers?",
              options: [
                { text: "Send it to lead farmers on a messaging app.", result: "It reaches only farmers with smartphones — mostly better-off men." },
                { text: "Use local-language radio and the field schools, and support individual planning on farms.", best: true, result: "Radio is the channel farmers trust most. Field schools let them discuss and test the advice together." },
                { text: "Print posters in the official language for the district office.", result: "Few farmers visit the office, and many don’t read the official language." }] },
            { situation: "A village has drawn up a good adaptation plan, but there is no money to carry it out.",
              q: "What is the best next step?",
              options: [
                { text: "Wait for the national budget next year.", result: "Plans like this often stay on paper. A year is lost." },
                { text: "Help the community turn the plan into an investment plan and seek a small grant that the village manages itself.", best: true, result: "This is what one ACREI village did: with its own grant it invested in solar power, small dams and climate-resilient livestock." },
                { text: "Drop the plan and start a new one with an outside consultant.", result: "The community loses ownership, and the new plan repeats the work already done." }] }]);
          return C.situations({ grace: "You are an extension officer at the Ministry of Agriculture.", arjun: "You coordinate the climate project for the FAO country office.", mei: "You manage the partnership with the weather service and local media." }) +
            C.howto("Make three decisions and see what happens.") + this._s.html;
        },
        bind: function (r) { this._s.bind(r); } },

      { id: "l3-9", part: X, title: "Practice: assess a new initiative", menu: "Practice: assess an initiative", practice: true,
        html: function () {
          this._q = C.multiSelect("p3-assess", "Which features match the Strategy well? Select all that apply.", [
            { text: "It targets young women in a coastal province.", correct: true, feedback: "Yes — women and youth are focus groups of the Strategy." },
            { text: "Communities tested three dryer prototypes and chose the design themselves.", correct: true, feedback: "Yes — needs-driven, co-created: steps 1 and 2." },
            { text: "A university measures incomes and fish losses every season.", correct: true, feedback: "Yes — evidence and impact tracking: step 3." },
            { text: "It combines a technology (solar dryers) with a social innovation (cooperatives).", correct: true, feedback: "Yes — several kinds of innovation together." },
            { text: "Its plan to hand out free dryers in every province next year, with no budget yet.", feedback: "No — scaling needs stable funding and market incentives (step 5)." }],
            "<b>Good assessment</b>Four strong features and one weak spot to fix before scaling.", "<b>Not quite</b>Check each feature against the principles and the five steps, then try again.");
          return '<div class="grid g2" style="align-items:start"><div class="case"><div class="tag">Training case (fictional)</div><p><b>A regional programme trains young women in a coastal province to run fish-drying cooperatives using solar dryers.</b></p>' +
            C.list(["Communities tested three dryer prototypes and chose the design.", "A local university measures incomes and fish losses every season.", "Next year it plans to hand out free dryers in every province. There is no budget for this yet."]) +
            "</div><div>" + this._q.html + "</div></div>";
        },
        bind: function (r) { this._q.bind(r); } },

      { id: "l3-10", title: "Lesson 3 in three sentences", menu: "Summary",
        html: function () {
          return '<div class="summary">' + ["Five steps: understand the problem, compare solutions, track impact, weigh synergies and trade-offs, plan for scaling.",
            "Technology is not neutral. Ask early who it helps and who it could leave out.",
            "Aylluu AgTech and ACREI work because they combine several kinds of innovation and put people at the centre."].map(function (t, i) { return '<div class="take"><span class="badge orange">' + (i + 1) + "</span><span>" + t + "</span></div>"; }).join("") +
            '</div><p class="muted">Next: the final check — eight questions, one for each learning outcome.</p>';
        } }
    ]
  });
})(window.Course);
