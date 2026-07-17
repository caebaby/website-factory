document.documentElement.classList.remove("no-js");

const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu");

menu?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") || false;
  document.body.classList.toggle("nav-open", open);
  menu.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    document.body.classList.remove("nav-open");
    menu?.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("in"));
}

const filters = Array.from(document.querySelectorAll(".filter"));
const briefs = Array.from(document.querySelectorAll(".brief-row[data-topic]"));

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const topic = button.dataset.filter || "all";
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    briefs.forEach((brief) => {
      brief.hidden = topic !== "all" && brief.dataset.topic !== topic;
    });
  });
});
