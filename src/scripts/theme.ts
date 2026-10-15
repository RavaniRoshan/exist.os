export function initTheme(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const root = document.documentElement;
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("exist-theme", next);
      } catch {
        // storage unavailable (private mode) — theme simply doesn't persist
      }
      button.textContent = next === "dark" ? "Light" : "Dark";
    });
  });
}
