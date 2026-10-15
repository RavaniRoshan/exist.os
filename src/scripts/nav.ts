export function initNav(): void {
  document.querySelectorAll<HTMLElement>("[data-dropdown]").forEach((wrap) => {
    const trigger = wrap.querySelector<HTMLButtonElement>("[data-dropdown-trigger]");
    const panel = wrap.querySelector<HTMLElement>("[data-dropdown-panel]");
    if (!trigger || !panel) return;

    const close = () => {
      wrap.removeAttribute("data-open");
      trigger.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    };
    const open = () => {
      document.querySelectorAll("[data-dropdown][data-open]").forEach((other) => {
        if (other !== wrap) {
          other.removeAttribute("data-open");
          other.querySelector<HTMLButtonElement>("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "false");
          const otherPanel = other.querySelector<HTMLElement>("[data-dropdown-panel]");
          if (otherPanel) otherPanel.hidden = true;
        }
      });
      wrap.setAttribute("data-open", "");
      trigger.setAttribute("aria-expanded", "true");
      panel.hidden = false;
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
