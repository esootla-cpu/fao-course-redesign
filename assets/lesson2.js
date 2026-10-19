/* Lesson 2: Key ideas - science, innovation, technology and other kinds of knowledge (outcomes 2.1-2.2) */
(function (C) {
  "use strict";
  var W = "Three words", K = "Beyond science";

  C.addLesson({
    id: "L2", short: "Lesson 2", title: "Science, innovation, technology", minutes: 20,
    blurb: "Tell science, innovation and technology apart, and see why local and Indigenous knowledge belongs in the picture.",
    outcomes: ["Tell science, innovation and technology apart, so you can describe your work precisely in proposals and reports",
               "Take local, traditional and Indigenous knowledge into account when choosing solutions"],
    screens: [
      { id: "l2-0", title: "What you will learn in this lesson", menu: "Lesson overview",
        html: function () {
          var L = this.lesson;
          return '<p class="lead">About ' + L.minutes + ' minutes. Two short parts, each ending with a practice task.</p><ol class="goals">' +
            L.outcomes.map(function (o, i) { return '<li><span class="badge">' + "AB"[i] + "</span><span>" + o + "</span></li>"; }).join("") + "</ol>" +
            C.keypoint("The Strategy uses these three words in a precise way. Using them the same way makes your proposals easier to read and easier to fund.");
        } },

      { id: "l2-1", part: W, title: "Three words people mix up", menu: "Three words people mix up",
        html: function () {
          this._f = C.flipCards([
            { front: '<span class="tag">Science</span><b>How do we know?</b>', back: '<span class="tag">Science</span>An organised way of understanding how things work: observe, test, and let others check the results.' },
            { front: '<span class="tag">Technology</span><b>What tool do we use?</b>', back: '<span class="tag">Technology</span>Science and knowledge applied to make a product or a service — a pump, a seed variety, an app.' },
            { front: '<span class="tag">Innovation</span><b>What changes?</b>', back: '<span class="tag">Innovation</span>Doing something new, or new to that place: a new way to solve an old problem, an old way to solve a new one, or something new for something new.' }], 3);
          return C.howto("Guess the answer, then turn each card over.") + this._f.html +
            C.keypoint("Science is how we know. Technology is a tool. Innovation is a change in what people do.");
        },
        bind: function (r) { this._f.bind(r); } },

      { id: "l2-2", part: W, title: "What science means in the UN system", menu: "What science means",
        html: function () {
          return '<div class="grid g12"><div class="card sky"><h3>In short</h3><p>Science is an organised effort to understand the causes of things and how they are linked.</p></div><div>' +
            "<p>The Strategy uses the UNESCO definition, which the whole UN system shares. In plain words, it says three things:</p>" +
            '<div class="grid">' + [["Organised", "Science is done systematically, by people alone or in groups."], ["Checked", "Results are shared and reviewed by other scientists before they are trusted."],
              ["Useful", "The aim is understanding that people can use — about nature and about society."]].map(function (x, i) {
              return '<div class="row"><span class="badge">' + (i + 1) + "</span><div><b>" + x[0] + "</b><br>" + x[1] + "</div></div>"; }).join("") +
            '</div><p class="source">Source: UNESCO, Recommendation on Science and Scientific Researchers (2017), paragraph 1(a)(i).</p></div></div>';
        } },

      { id: "l2-3", part: W, title: "Innovation depends on where you are", menu: "Innovation is relative",
        html: function () {
          this._t = C.toggle(["In a capital city", "In a remote village"], [
            '<div class="compare"><div class="big">' + C.icon("phone") + '</div><div><h3>Weather alerts by text message</h3><p>Most people already get alerts on their phones. Adding one more service changes little.</p><span class="verdict no">Not an innovation here</span></div></div>',
            '<div class="compare"><div class="big">' + C.icon("phone") + '</div><div><h3>Weather alerts by text message</h3><p>Farmers have never had warnings before. For the first time they can protect crops before a storm.</p><span class="verdict yes">An innovation here</span></div></div>']);
          return '<p class="lead">For FAO, innovation means new products, processes or ways of organising — <b>or existing ones used for the first time in a place</b>.</p>' +
            C.howto("Switch between the two places.") + this._t.html +
            C.keypoint("Whether something is an innovation depends on the context, not on how new it is in the world.");
        },
        bind: function (r) { this._t.bind(r); } },

      { id: "l2-4", part: W, title: "Five kinds of innovation", menu: "Five kinds of innovation",
        html: function () {
          this._r = C.revealCards([
            { badge: "1", color: "", title: "Technological", teaser: "including digital", body: "<p>A new tool or digital service.</p><p><b>Example:</b> a mobile app that gives farmers planting advice.</p>" },
            { badge: "2", color: "", title: "Social", teaser: "new ways people work together", body: "<p>A new way for people to organise themselves.</p><p><b>Example:</b> farmers set up a group to share storage and sell together.</p>" },
            { badge: "3", color: "", title: "Policy", teaser: "new rules", body: "<p>A new rule or public policy.</p><p><b>Example:</b> a law that lets local cooperatives sell certified seed.</p>" },
            { badge: "4", color: "", title: "Financial", teaser: "new ways to pay or insure", body: "<p>A new way to fund, pay or share risk.</p><p><b>Example:</b> crop insurance that pays out automatically when rainfall data show a drought.</p>" },
            { badge: "5", color: "", title: "Institutional", teaser: "new ways organisations work", body: "<p>A new arrangement between organisations.</p><p><b>Example:</b> the ministry and the weather service set up a joint team to issue farming advice.</p>" }], 5);
          return '<p class="lead">The Strategy is clear: innovation is not only about technology. FAO works with five kinds.</p>' + C.howto("Open each card for an example.") + this._r.html +
            C.keypoint("The strongest projects often combine several kinds — for example, a new tool and a new way for people to share it.");
        },
        bind: function (r) { this._r.bind(r); } },

      { id: "l2-5", part: W, title: "What technology means", menu: "What technology means",
        html: function () {
          return '<div class="grid g2"><div><p>For food systems, technology means <b>science and knowledge applied to make a product or a service</b> that makes food systems more sustainable.</p>' +
            '<p>Food systems use many kinds:</p><div class="chips">' + ["Mechanisation", "Biotechnology", "Digital tools", "Renewable energy", "Food processing", "Irrigation"].map(function (c) { return '<span class="chip static">' + c + "</span>"; }).join("") +
            '</div><p class="source">Source: UN Secretary-General, report A/74/238 on agricultural technology for sustainable development.</p></div>' +
            '<div class="card orange"><h3>Not every technology is an innovation</h3><p>A tractor that a district has used for 30 years is technology, but not an innovation there. Many new technologies are also adaptations of older ones.</p>' +
            '<h3 style="margin-top:14px">Example: precision farming</h3><p>Sensors and guidance systems place seed and fertiliser exactly where needed. That can save seed, fertiliser, fuel and working time.</p></div></div>' +
            C.keypoint("A technology becomes an innovation when it changes what people do in a particular place.");
        } },

      { id: "l2-6", part: W, title: "Practice: which is it?", menu: "Practice: which is it?", practice: true,
        html: function () {
          this._c = C.classify("p2-sort", "Sort each example. Choose the best fit.", ["Science", "Technology", "Innovation"], [
            { text: "Researchers test soil from 40 farms to see how compost changes yields, and publish the results for review.", cat: 0, why: "Organised observation, with results checked by others." },
            { text: "A solar-powered water pump.", cat: 1, why: "A product made by applying science and knowledge." },
            { text: "Farmers in a village start sharing one solar pump through a booking rota run by their cooperative.", cat: 2, why: "A new way of organising (social innovation) around an existing technology." },
            { text: "A study compares nutrition in households that grow vegetables with those that don’t.", cat: 0, why: "Systematic research to understand a link between two things." },
            { text: "For the first time in the region, insurance pays farmers automatically when satellite data show a drought.", cat: 2, why: "A financial innovation: a new way to share risk in this context." },
            { text: "A tractor model that the district has used for 30 years.", cat: 1, why: "Technology, but not an innovation here: nothing changes." }],
            "<b>All sorted correctly</b>You can now name your project’s elements precisely — a reviewer will notice.",
            "<b>Some are in the wrong place</b>Read the note under each example and try again. Remember: innovation is about change in a place.");
          return this._c.html;
        },
        bind: function (r) { this._c.bind(r); } },

      { id: "l2-7", part: K, title: "Knowledge beyond science", menu: "Knowledge beyond science",
        html: function () {
          this._t = C.toggle(["Before", "After"], [
            '<div class="compare"><div class="big">' + C.icon("dry") + '</div><div><h3>Rajasthan, India: a dry, degraded valley</h3><p>Drought and damaged land had undermined people’s livelihoods. The river ran dry for much of the year.</p></div></div>',
            '<div class="compare"><div class="big">' + C.icon("water") + '</div><div><h3>Rajasthan, India: water returns</h3><p>Communities rebuilt a traditional way of catching rainwater: small earth dams called ' + C.term("johad", "johads") + ". More than 5,000 were restored in about 1,000 villages. The Arvari river flows again, groundwater recovered and local birds came back.</p></div></div>"]);
          return '<p class="lead">Science is not the only source of knowledge. Local, traditional and Indigenous knowledge helps make food systems sustainable and resilient — and the Strategy treats it as a source of innovation.</p>' +
            C.howto("Switch between before and after.") + this._t.html +
            '<div class="note"><b>Respect comes with it.</b> FAO protects the knowledge of Indigenous Peoples and small producers and, where it applies, respects their right to ' + C.term("fpic", "free, prior and informed consent") + ".</div>" +
            '<p class="source">Sources: UN Committee on Economic, Social and Cultural Rights, General Comment No. 25 (2020); example as presented in the original FAO course.</p>';
        },
        bind: function (r) { this._t.bind(r); } },

      { id: "l2-8", part: K, title: "Practice: whose knowledge counts?", menu: "Practice: whose knowledge?", practice: true,
        html: function () {
          this._s = C.scenario("p2-scn", [
            { situation: "Your district wants more water for farming in a dry valley. An engineering firm proposes a large concrete dam, based on a hydrology model. Older farmers say their grandparents used small earth structures to catch rainwater.",
              q: "What do you do first?",
              options: [
                { text: "Go with the dam. The model is scientific; memories are not.", result: "The dam is costly and the community has no role in running it. Nobody checked what local people already know about where water collects." },
                { text: "Ask older farmers to map the old water structures, walk the valley with the engineers, and compare both views.", best: true, result: "The map shows where small structures refill the groundwater. Combined with the model, the plan is cheaper, and the community wants to maintain it." },
                { text: "Choose the old structures. Science isn’t needed here.", result: "Some sites fail: rainfall patterns have changed since the structures were built. Data would have shown which sites still work." }] },
            { situation: "The plan uses water-finding methods held by an Indigenous community. A project partner wants to publish these methods in a manual for other districts.",
              q: "What do you do?",
              options: [
                { text: "Publish. Good knowledge should be shared.", result: "The community learns about the manual after it is printed. Trust breaks down, and they stop sharing their knowledge with the project." },
                { text: "Publish without naming the community.", result: "Removing the name does not make it acceptable. The knowledge is still theirs, and they were not asked." },
                { text: "Ask the community first, explain how the manual would be used, and accept their answer.", best: true, result: "This is free, prior and informed consent. The community agrees to share part of the method and asks to be credited. Trust grows." }] }]);
          return C.situations({ grace: "You coordinate a district water project for the ministry.", arjun: "You advise the district on behalf of the FAO country office.", mei: "You are bringing a donor and an engineering firm into a district water project." }) +
            C.howto("Make each decision and see what happens.") + this._s.html;
        },
        bind: function (r) { this._s.bind(r); } },

      { id: "l2-9", title: "Lesson 2 in three sentences", menu: "Summary",
        html: function () {
          return '<div class="summary">' + ["Science is how we know, technology is a tool, innovation is a change in what people do — and it depends on the place.",
            "Innovation comes in five kinds: technological, social, policy, financial and institutional.",
            "Local and Indigenous knowledge is a source of solutions. Use it with the community’s consent."].map(function (t, i) { return '<div class="take"><span class="badge orange">' + (i + 1) + "</span><span>" + t + "</span></div>"; }).join("") +
            '</div><p class="muted">Next: Lesson 3 — from Strategy to project: five steps and two real cases.</p>';
        } }
    ]
  });
})(window.Course);
