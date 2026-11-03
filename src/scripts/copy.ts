export function initCopy(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) => {
    const selector = button.dataset.copySource;
    if (!selector) return;
    const source = document.querySelector<HTMLElement>(selector);
    if (!source) return;
    const statusSelector = button.dataset.copyStatus;
    const status = statusSelector ? document.querySelector<HTMLElement>(statusSelector) : null;
    const defaultLabel = button.textContent ?? "Copy";

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(source.textContent ?? source.innerText);
        button.textContent = button.dataset.copiedLabel ?? "Copied";
        if (status) status.textContent = "Copied";
      } catch {
        button.textContent = "Copy failed";
      }
      window.setTimeout(() => {
        button.textContent = defaultLabel;
        if (status) status.textContent = "";
      }, 2000);
    });
  });
}
