(function(){
  "use strict";
  var host=document.querySelector("[data-calendly-embed]");
  if(!host)return;
  var url=(host.getAttribute("data-calendly-url")||"").trim();
  if(!/^https:\/\/calendly\.com\//i.test(url)||/YOUR_LINK/i.test(url))return;
  var placeholder=host.querySelector("[data-calendly-placeholder]");
  if(placeholder)placeholder.remove();
  host.classList.add("is-live");
  host.setAttribute("aria-busy","true");
  var script=document.createElement("script");
  script.src="https://assets.calendly.com/assets/external/widget.js";
  script.async=true;
  script.onload=function(){
    if(!window.Calendly)return;
    var source=new URLSearchParams(window.location.search).get("source")||"site-cta";
    window.Calendly.initInlineWidget({
      url:url,
      parentElement:host,
      resize:true,
      utm:{utmSource:"advisor-growth-lab",utmMedium:"website",utmCampaign:"transition-conversation",utmContent:source}
    });
    host.removeAttribute("aria-busy");
  };
  document.head.appendChild(script);
})();
