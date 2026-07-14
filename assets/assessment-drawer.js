(function () {
  "use strict";

  var questions = [
    {
      title: "What is making you consider a transition?",
      options: [
        "The business model no longer fits",
        "Ownership, equity, or succession",
        "Payout, compensation, or economics",
        "Platform, technology, or support",
        "A firm acquisition or cultural change",
        "Something else"
      ]
    },
    {
      title: "Which business model are you in today?",
      options: ["Wirehouse", "Regional or independent broker-dealer", "Bank or insurance firm", "RIA or hybrid RIA", "Another model"]
    },
    {
      title: "When would you realistically consider making a change?",
      options: ["Within 3 months", "Within 3 to 6 months", "Within 6 to 12 months", "I am exploring, with no set timeline"]
    },
    {
      title: "What is your practice's approximate trailing-12 revenue?",
      options: ["Under $500,000", "$500,000 to $1 million", "$1 million to $2 million", "More than $2 million"]
    },
    {
      title: "Approximately how much does your practice manage or advise?",
      options: ["Under $100 million", "$100 million to $250 million", "$250 million to $500 million", "More than $500 million"]
    },
    {
      title: "Would you like to find out more about what it could look like to get your transition process started?",
      options: ["Yes, I'd like to explore next steps", "Not yet, send me relevant research"]
    }
  ];

  var siteRoot = new URL("../", document.currentScript.src);
  var scheduleUrl = new URL("schedule/index.html?source=assessment", siteRoot).href;
  var answers = [];
  window.AGLAssessmentAnswers = answers;
  var index = 0;
  var previousFocus = null;

  var backdrop = document.createElement("button");
  backdrop.type = "button";
  backdrop.className = "agl-assess-backdrop";
  backdrop.setAttribute("aria-label", "Close questions");
  backdrop.hidden = true;

  var drawer = document.createElement("section");
  drawer.className = "agl-assess-drawer";
  drawer.setAttribute("aria-label", "Transition questions");
  drawer.hidden = true;
  drawer.innerHTML = [
    '<div class="agl-assess-drawer__top">',
      '<span class="agl-assess-drawer__eyebrow">Start here</span>',
      '<button class="agl-assess-drawer__close" type="button" aria-label="Close">&times;</button>',
    '</div>',
    '<div class="agl-assess-drawer__flow">',
      '<div class="agl-assess-drawer__progress" aria-live="polite">',
        '<span>Question <b data-agl-current>1</b> of 6</span>',
        '<span class="agl-assess-drawer__track" aria-hidden="true"><i class="agl-assess-drawer__bar"></i></span>',
      '</div>',
      '<h2 data-agl-question></h2>',
      '<div class="agl-assess-drawer__options" data-agl-options></div>',
      '<div class="agl-assess-drawer__actions"><button class="agl-assess-drawer__back" type="button">Back</button></div>',
    '</div>',
    '<div class="agl-assess-drawer__result" data-agl-booking-result hidden>',
      '<span class="agl-assess-drawer__eyebrow">Private conversation</span>',
      '<h2 tabindex="-1">Let\'s find a time to talk through your options.</h2>',
      '<p class="agl-assess-drawer__result-copy">You\'ll go to a private scheduling page on this site. Choose a time for a confidential conversation with no obligation to pursue a move.</p>',
      '<div class="agl-lead-stack">',
        '<section class="agl-lead agl-lead--primary">',
          '<div class="agl-lead__top"><span class="agl-lead__popular">Your selected next step</span><span class="agl-lead__type">Confidential</span></div>',
          '<h4>Discuss what a transition could look like.</h4>',
          '<p>The embedded calendar will collect the contact details needed for the conversation.</p>',
          '<a class="agl-lead__schedule" href="#" data-booking-link>Choose a time</a>',
        '</section>',
      '</div>',
    '</div>',
    '<div class="agl-assess-drawer__result" data-agl-research-result hidden>',
      '<span class="agl-assess-drawer__eyebrow">Relevant research</span>',
      '<h2 tabindex="-1">Get the reading that fits your situation.</h2>',
      '<p class="agl-assess-drawer__result-copy">Share your first name and email. Then we\'ll take you to the most relevant Advisor Growth Lab briefing based on your answers.</p>',
      '<div class="agl-lead-stack">',
        '<form class="agl-lead agl-lead--primary" action="#" method="post" data-lead-capture data-lead-autostart data-redirect-after-capture data-verify="lead-form-endpoint">',
          '<div class="agl-lead__top"><span class="agl-lead__popular">Private follow-up</span><span class="agl-lead__type">Name and email only</span></div>',
          '<h4>Where should we send your follow-up?</h4>',
          '<p>No phone number is required. Your answers are not sent to your firm.</p>',
          '<input type="hidden" name="assessment_answers" data-lead-answers>',
          '<input type="hidden" name="redirect_url" data-resource-target>',
          '<button class="agl-lead__start" type="button" data-lead-start hidden>Continue</button>',
          '<div class="agl-lead__flow" data-lead-flow>',
            '<div class="agl-lead__progress"><span>Detail <b data-lead-current>1</b> of 2</span><i data-lead-track></i></div>',
            '<fieldset class="agl-lead__step" data-lead-step><label>What is your first name?<input type="text" name="first_name" autocomplete="given-name" placeholder="First name" required></label><div class="agl-lead__step-actions"><button class="agl-lead__continue" type="button" data-lead-next>Continue</button></div></fieldset>',
            '<fieldset class="agl-lead__step" data-lead-step hidden><label>What is the best email for you?<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="you@example.com" required></label><div class="agl-lead__step-actions"><button class="agl-lead__continue" type="submit">See my recommended reading</button><button class="agl-lead__back" type="button" data-lead-back>Back</button></div></fieldset>',
          '</div>',
          '<div class="agl-lead__complete" data-lead-complete hidden><strong tabindex="-1">Opening your recommended reading.</strong></div>',
        '</form>',
      '</div>',
    '</div>'
  ].join("");

  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  var flow = drawer.querySelector(".agl-assess-drawer__flow");
  var bookingResult = drawer.querySelector("[data-agl-booking-result]");
  var researchResult = drawer.querySelector("[data-agl-research-result]");
  var current = drawer.querySelector("[data-agl-current]");
  var bar = drawer.querySelector(".agl-assess-drawer__bar");
  var question = drawer.querySelector("[data-agl-question]");
  var options = drawer.querySelector("[data-agl-options]");
  var back = drawer.querySelector(".agl-assess-drawer__back");
  bookingResult.querySelector("[data-booking-link]").href = scheduleUrl;

  function tailoredResourceUrl() {
    if (answers[0] === "A firm acquisition or cultural change") return new URL("resources/retention-offer-after-acquisition.html", siteRoot).href;
    if (answers[0] === "Payout, compensation, or economics") return new URL("resources/forgivable-note-clawback.html", siteRoot).href;
    return new URL("resources/am-i-ready-to-leave-my-firm.html", siteRoot).href;
  }

  function showOutcome(route) {
    flow.hidden = true;
    if (route === "book") {
      bookingResult.hidden = false;
      bookingResult.querySelector("h2").focus({ preventScroll: true });
      var bookingLink = bookingResult.querySelector("[data-booking-link]");
      var bookingHref = bookingLink && bookingLink.getAttribute("href");
      if (bookingHref && bookingHref !== "#") window.setTimeout(function () { window.location.assign(bookingHref); }, 260);
      return;
    }
    var target = researchResult.querySelector("[data-resource-target]");
    if (target) target.value = tailoredResourceUrl();
    researchResult.hidden = false;
    researchResult.querySelector("h2").focus({ preventScroll: true });
    var firstInput = researchResult.querySelector("input:not([type='hidden'])");
    if (firstInput) window.setTimeout(function () { firstInput.focus({ preventScroll: true }); }, 80);
  }

  function render() {
    var item = questions[index];
    current.textContent = String(index + 1);
    bar.style.width = (((index + 1) / questions.length) * 100) + "%";
    question.textContent = item.title;
    back.hidden = index === 0;
    options.innerHTML = "";
    item.options.forEach(function (label) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "agl-assess-drawer__option";
      button.textContent = label;
      if (answers[index] === label) button.classList.add("is-selected");
      button.addEventListener("click", function () {
        answers[index] = label;
        button.classList.add("is-selected");
        window.setTimeout(function () {
          if (index === questions.length - 1) {
            showOutcome(label.indexOf("Yes,") === 0 ? "book" : "research");
          } else {
            index += 1;
            render();
          }
        }, 200);
      });
      options.appendChild(button);
    });
  }

  function openDrawer(trigger) {
    previousFocus = trigger || document.activeElement;
    backdrop.hidden = false;
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(function () {
      drawer.classList.add("is-open");
      drawer.querySelector(".agl-assess-drawer__close").focus();
    });
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
    window.setTimeout(function () {
      drawer.hidden = true;
      backdrop.hidden = true;
      if (previousFocus) previousFocus.focus();
    }, 240);
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-assess], a[href*='start-here/index.html#assessment']");
    if (!trigger) return;
    event.preventDefault();
    openDrawer(trigger);
  });

  drawer.querySelector(".agl-assess-drawer__close").addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  back.addEventListener("click", function () {
    index = Math.max(0, index - 1);
    render();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !drawer.hidden) closeDrawer();
  });

  render();
})();
