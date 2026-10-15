export function initTabs(): void {
  document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-tab]"));
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
    if (tabs.length === 0) return;

    const select = (index: number) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute("aria-selected", i === index ? "true" : "false");
        tab.toggleAttribute("data-selected", i === index);
        const panel = panels[i];
        if (panel) panel.hidden = i !== index;
      });
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i));
      tab.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key === "ArrowRight" || key === "ArrowLeft") {
          e.preventDefault();
          const next = (i + (key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
          tabs[next].focus();
          select(next);
        }
      });
    });

    select(0);
  });
}
