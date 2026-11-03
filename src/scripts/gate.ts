export function initMergeGate(): void {
  document.querySelectorAll<HTMLElement>("[data-merge-gate]").forEach((gate) => {
    const boxes = Array.from(gate.querySelectorAll<HTMLInputElement>("[data-gate]"));
    const button = gate.querySelector<HTMLButtonElement>("[data-merge-button]");
    const status = gate.querySelector<HTMLElement>("[data-merge-status]");
    if (!button || !status) return;

    const update = () => {
      const all = boxes.every((box) => box.checked);
      button.disabled = !all;
      status.textContent = all
        ? status.dataset.ready ?? "Ready to merge."
        : status.dataset.blocked ?? "Merge blocked by policy.";
    };

    boxes.forEach((box) => box.addEventListener("change", update));
    update();
  });
}
