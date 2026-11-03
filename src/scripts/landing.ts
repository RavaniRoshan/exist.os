import { initCopy } from "./copy";
import { initReveal } from "./reveal";

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function initMenu(): void {
  const button = document.querySelector<HTMLButtonElement>("[data-menu-open]");
  const menu = document.querySelector<HTMLElement>("#mobile-menu");
  if (!button || !menu) return;

  const close = () => {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
  };

  button.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) close();
  });
}

function initLoop(): void {
  const nodes = Array.from(document.querySelectorAll<SVGGElement>("[data-step]"));
  const title = document.querySelector<HTMLElement>("[data-loop-title]");
  const detail = document.querySelector<HTMLElement>("[data-loop-detail]");
  const meta = document.querySelector<HTMLElement>("[data-loop-meta]");
  const count = document.querySelector<HTMLElement>("[data-loop-count]");
  const track = document.querySelector<HTMLElement>("[data-loop-track]");
  if (!nodes.length || !title || !detail) return;

  const total = nodes.length;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = 0;
  let timer: number | undefined;

  const activate = (index: number) => {
    active = index;
    const node = nodes[index];
    nodes.forEach((item, itemIndex) => item.setAttribute("data-active", itemIndex === index ? "true" : "false"));
    title.textContent = node.dataset.title ?? "";
    detail.textContent = node.dataset.detail ?? "";
    if (meta) meta.textContent = node.dataset.meta ?? "";
    if (count) count.textContent = `0${index + 1} / 0${total}`;
    if (track) {
      track.style.transition = "none";
      track.style.width = "0%";
      requestAnimationFrame(() => {
        track.style.transition = "width 2600ms linear";
        track.style.width = `${((index + 1) / total) * 100}%`;
      });
    }
  };

  const start = () => {
    if (reduced || timer !== undefined) return;
    timer = window.setInterval(() => activate((active + 1) % total), 2800);
  };

  const stop = () => {
    if (timer === undefined) return;
    window.clearInterval(timer);
    timer = undefined;
  };

  nodes.forEach((node, index) => {
    node.addEventListener("mouseenter", () => {
      stop();
      activate(index);
    });
    node.addEventListener("focus", () => {
      stop();
      activate(index);
    });
    node.addEventListener("click", () => {
      stop();
      activate(index);
    });
    node.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      stop();
      activate(index);
    });
  });

  const card = nodes[0].closest<HTMLElement>(".orbit-card");
  card?.addEventListener("mouseenter", stop);
  card?.addEventListener("mouseleave", start);
  card?.addEventListener("focusin", stop);
  card?.addEventListener("focusout", (event) => {
    if (!card.contains(event.relatedTarget as Node | null)) start();
  });

  activate(0);
  start();
}

function initTtl(): void {
  const range = document.querySelector<HTMLInputElement>("[data-ttl]");
  const ring = document.querySelector<SVGCircleElement>("[data-ttl-ring]");
  const label = document.querySelector<HTMLElement>("[data-ttl-label]");
  const renew = document.querySelector<HTMLButtonElement>("[data-ttl-renew]");
  if (!range || !ring || !label) return;

  const circumference = 2 * Math.PI * 56;
  const update = (value: number) => {
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${circumference * (1 - value / 60)}`;
    label.textContent = String(value);
  };

  range.addEventListener("input", () => update(Number(range.value)));
  renew?.addEventListener("click", () => {
    range.value = "15";
    update(15);
    const original = renew.dataset.label ?? renew.textContent ?? "Renew lease";
    renew.dataset.label = original;
    renew.textContent = "Renewed";
    window.setTimeout(() => {
      renew.textContent = original;
    }, 1600);
  });
  update(Number(range.value));
}

function initMergeGate(): void {
  document.querySelectorAll<HTMLElement>("[data-merge-gate]").forEach((gate) => {
    const boxes = Array.from(gate.querySelectorAll<HTMLInputElement>("[data-gate]"));
    const states = boxes.map((box) => box.closest("label")?.querySelector<HTMLElement>("[data-gate-state]"));
    const button = gate.querySelector<HTMLButtonElement>("[data-merge-button]");
    const run = gate.querySelector<HTMLButtonElement>("[data-gate-run]");
    const status = gate.querySelector<HTMLElement>("[data-merge-status]");
    if (!button || !status) return;

    let busy = false;
    let merged = false;

    const paintState = (index: number, state: "passed" | "pending" | "running") => {
      const node = states[index];
      if (!node) return;
      node.textContent = state;
      node.className = state === "passed" ? "text-[11px] text-mint" : "text-[11px] text-ink-3";
    };

    const refresh = () => {
      const all = boxes.every((box) => box.checked);
      boxes.forEach((box, index) => paintState(index, box.checked ? "passed" : "pending"));
      if (busy || merged) return;
      button.disabled = !all;
      status.textContent = all
        ? status.dataset.ready ?? "Ready to merge."
        : status.dataset.blocked ?? "Merge blocked by policy.";
    };

    boxes.forEach((box) => box.addEventListener("change", refresh));

    run?.addEventListener("click", async () => {
      if (busy || merged) return;
      busy = true;
      button.disabled = true;
      run.disabled = true;
      run.textContent = "Running…";
      status.textContent = "Running checks…";
      boxes.forEach((box, index) => {
        box.checked = false;
        paintState(index, "running");
      });
      for (let index = 0; index < boxes.length; index += 1) {
        await wait(480);
        boxes[index].checked = true;
        paintState(index, "passed");
      }
      await wait(260);
      busy = false;
      run.disabled = false;
      run.textContent = "Re-run checks";
      refresh();
    });

    button.addEventListener("click", async () => {
      if (button.disabled || busy || merged) return;
      button.disabled = true;
      button.textContent = "Merging…";
      status.textContent = "Merging through policy…";
      await wait(950);
      merged = true;
      button.textContent = "Merged into main";
      button.style.background = "var(--color-mint)";
      status.textContent = status.dataset.merged ?? "Merged.";
    });

    refresh();
  });
}

function initArch(): void {
  const layers = Array.from(document.querySelectorAll<SVGGElement>("[data-arch]"));
  const detail = document.querySelector<HTMLElement>("[data-arch-detail]");
  if (!layers.length || !detail) return;

  const details: Record<string, string> = {
    clients: "Clients and agents reach existd over HTTP and SSH.",
    existd: "Policy, transports, and the web UI run in one process.",
    disk: "SQLite WAL and bare Git repositories stay on local disk.",
  };

  layers.forEach((layer) => {
    layer.addEventListener("mouseenter", () => {
      layers.forEach((item) => item.setAttribute("data-active", item === layer ? "true" : "false"));
      detail.textContent = details[layer.dataset.arch ?? ""] ?? "";
    });
  });
}

function initSearch(): void {
  const dialog = document.querySelector<HTMLDialogElement>("#search-dialog");
  const input = dialog?.querySelector<HTMLInputElement>("[data-search-input]");
  const items = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>("[data-search-item]")) : [];
  if (!dialog) return;

  const closeMenu = () => {
    const menu = document.querySelector<HTMLElement>("#mobile-menu");
    const button = document.querySelector<HTMLButtonElement>("[data-menu-open]");
    if (menu) menu.hidden = true;
    button?.setAttribute("aria-expanded", "false");
  };

  document.querySelectorAll("[data-search-open]").forEach((button) => {
    button.addEventListener("click", () => {
      closeMenu();
      dialog.showModal();
      window.setTimeout(() => input?.focus(), 40);
    });
  });

  input?.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    items.forEach((item) => {
      item.hidden = Boolean(query) && !(item.dataset.searchText ?? "").includes(query);
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    dialog.close();
  });

  dialog.addEventListener("close", () => {
    if (input) input.value = "";
    items.forEach((item) => {
      item.hidden = false;
    });
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (!dialog.open) {
        closeMenu();
        dialog.showModal();
        window.setTimeout(() => input?.focus(), 40);
      }
    }
  });
}

export function initLanding(): void {
  initMenu();
  initReveal();
  initLoop();
  initTtl();
  initMergeGate();
  initArch();
  initCopy();
  initSearch();
}
