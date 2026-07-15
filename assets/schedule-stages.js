(function () {
  var buttons = Array.from(document.querySelectorAll("[data-stage-target]"));
  var panels = Array.from(document.querySelectorAll("[data-stage-panel]"));
  var intro = document.querySelector("[data-stage-intro]");

  if (!buttons.length || !panels.length) return;

  function selectStage(stage, moveIntoView) {
    var selected = buttons.find(function (button) {
      return button.dataset.stageTarget === stage;
    });
    var panel = panels.find(function (item) {
      return item.dataset.stagePanel === stage;
    });

    if (!selected || !panel) return;

    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button === selected));
    });
    panels.forEach(function (item) {
      item.hidden = item !== panel;
    });
    if (intro) intro.hidden = true;

    document.documentElement.dataset.advisorStage = stage;

    try {
      window.sessionStorage.setItem("aglAdvisorStage", stage);
      var url = new URL(window.location.href);
      url.searchParams.set("stage", stage);
      window.history.replaceState(null, "", url);
    } catch (error) {
      // The selector remains fully usable when storage or history is restricted.
    }

    if (moveIntoView) {
      selected.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectStage(button.dataset.stageTarget, true);
    });
  });

  var initialStage = new URLSearchParams(window.location.search).get("stage");
  if (!initialStage) {
    try {
      initialStage = window.sessionStorage.getItem("aglAdvisorStage");
    } catch (error) {
      initialStage = "";
    }
  }

  if (initialStage) selectStage(initialStage, false);
})();
