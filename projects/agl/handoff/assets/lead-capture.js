(function(){
  "use strict";
  function init(form){
    var start=form.querySelector("[data-lead-start]");
    var flow=form.querySelector("[data-lead-flow]");
    var complete=form.querySelector("[data-lead-complete]");
    var steps=Array.from(form.querySelectorAll("[data-lead-step]"));
    var current=form.querySelector("[data-lead-current]");
    var track=form.querySelector("[data-lead-track]");
    var redirectTarget=form.querySelector("[data-resource-target]");
    var index=0;
    if(!start||!flow||!steps.length)return;

    function render(nextIndex){
      index=Math.max(0,Math.min(nextIndex,steps.length-1));
      steps.forEach(function(step,stepIndex){step.hidden=stepIndex!==index;});
      if(current)current.textContent=String(index+1);
      if(track)track.style.setProperty("--lead-progress",(((index+1)/steps.length)*100)+"%");
      var input=steps[index].querySelector("input");
      if(input)window.setTimeout(function(){input.focus({preventScroll:true});},40);
    }

    function advance(){
      var input=steps[index].querySelector("input");
      if(input&&!input.reportValidity())return;
      if(index<steps.length-1)render(index+1);
      else form.requestSubmit();
    }

    start.addEventListener("click",function(){start.hidden=true;flow.hidden=false;render(0);});
    form.querySelectorAll("[data-lead-next]").forEach(function(button){button.addEventListener("click",advance);});
    form.querySelectorAll("[data-lead-back]").forEach(function(button){button.addEventListener("click",function(){render(index-1);});});
    form.addEventListener("keydown",function(event){
      if(event.key!=="Enter"||event.shiftKey||flow.hidden)return;
      event.preventDefault();
      advance();
    });
    form.addEventListener("submit",function(event){
      var input=steps[index].querySelector("input");
      if(input&&!input.reportValidity()){event.preventDefault();return;}
      var answers=form.querySelector("[data-lead-answers]");
      if(answers&&window.AGLAssessmentAnswers)answers.value=JSON.stringify(window.AGLAssessmentAnswers);
      if(form.getAttribute("action")!=="#")return;
      event.preventDefault();
      flow.hidden=true;
      if(redirectTarget&&redirectTarget.value){
        if(complete)complete.hidden=false;
        window.setTimeout(function(){window.location.assign(redirectTarget.value);},240);
        return;
      }
      if(!complete)return;
      complete.hidden=false;
      var heading=complete.querySelector("strong");
      if(heading)heading.focus({preventScroll:true});
    });
    if(form.hasAttribute("data-lead-autostart")){
      start.hidden=true;
      flow.hidden=false;
      render(0);
    }
  }
  document.querySelectorAll("[data-lead-capture]").forEach(init);
})();
