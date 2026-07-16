document.documentElement.classList.add("js");
const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu");
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
document
  .querySelectorAll(".nav-links a")
  .forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open")),
  );
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
const filters = document.querySelectorAll(".filter");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const type = button.dataset.filter;
    document
      .querySelectorAll(".resource-row")
      .forEach(
        (row) => (row.hidden = type !== "all" && row.dataset.type !== type),
      );
  }),
);
