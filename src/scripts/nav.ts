export function initNav(): void {
  document.querySelectorAll<HTMLElement>("[data-dropdown]").forEach((wrap) => {
    const trigger = wrap.querySelector<HTMLButtonElement>("[data-dropdown-trigger]");
    if (!trigger) return;

    const close = () => {
      wrap.removeAttribute("data-open");
      trigger.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      document.querySelectorAll("[data-dropdown][data-open]").forEach((other) => {
        if (other !== wrap) {
          other.removeAttribute("data-open");
          other.querySelector<HTMLButtonElement>("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "false");
        }
      });
      wrap.setAttribute("data-open", "");
      trigger.setAttribute("aria-expanded", "true");
    };

    trigger.addEventListener("click", () => {
      wrap.hasAttribute("data-open") ? close() : open();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target as Node)) close();
    });
  });
}
