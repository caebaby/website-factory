(function(){
  "use strict";
  var toggle=document.querySelector(".nav-toggle");
  var links=document.querySelector(".nav-links");
  if(toggle&&links){
    toggle.addEventListener("click",function(){
      var open=links.classList.toggle("open");
      toggle.setAttribute("aria-expanded",String(open));
    });
    links.addEventListener("click",function(event){
      if(event.target.closest("a")){links.classList.remove("open");toggle.setAttribute("aria-expanded","false");}
    });
  }
  if("IntersectionObserver" in window){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("in");observer.unobserve(entry.target);}});
    },{threshold:.16});
    document.querySelectorAll(".io").forEach(function(element){observer.observe(element);});
  }else{document.querySelectorAll(".io").forEach(function(element){element.classList.add("in");});}
  document.querySelectorAll("[data-year]").forEach(function(element){element.textContent=String(new Date().getFullYear());});
  document.querySelectorAll("[data-newsletter]").forEach(function(form){
    form.addEventListener("submit",function(event){
      var input=form.querySelector("input[type='email']");
      if(input&&!input.reportValidity()){event.preventDefault();return;}
      if(form.getAttribute("action")!=="#")return;
      event.preventDefault();
      form.hidden=true;
      var success=form.parentElement.querySelector("[data-newsletter-success]");
      if(success){success.hidden=false;var focus=success.querySelector("strong");if(focus)focus.focus({preventScroll:true});}
    });
  });
})();
