export function initCopy(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) => {
    const source = document.querySelector<HTMLElement>(button.dataset.copySource ?? "");
    const status = document.querySelector<HTMLElement>(button.dataset.copyStatus ?? "");
    const defaultLabel = button.textContent ?? "Copy";
    if (!source) return;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(source.innerText);
        button.textContent = button.dataset.copiedLabel ?? "Copied ✓";
        if (status) status.textContent = "Copied";
      } catch {
        button.textContent = "Copy failed — select manually";
      }
      window.setTimeout(() => {
        button.textContent = defaultLabel;
        if (status) status.textContent = "";
      }, 2000);
    });
  });
}
