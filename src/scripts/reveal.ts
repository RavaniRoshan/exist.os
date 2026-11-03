export function initReveal(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (items.length === 0) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const siblings = Array.from(element.parentElement?.querySelectorAll("[data-reveal]") ?? []);
        const index = Math.max(0, siblings.indexOf(element));
        element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
        element.classList.add("is-visible");
        observer.unobserve(element);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  items.forEach((item) => observer.observe(item));
}
