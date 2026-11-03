// Hero canvas animation for animated gradient and blob effects
function initHeroCanvas(): void {
  const canvas = document.querySelector<HTMLCanvasElement>(".hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Set canvas size
  const updateCanvasSize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  };

  updateCanvasSize();
  window.addEventListener("resize", updateCanvasSize);

  // Handle reduced motion
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animation state
  let animationId: number | undefined;
  let time = 0;

  // Blob configuration
  const blobs = [
    { x: 0.3, y: 0.2, w: 0.6, h: 0.4, dx: 0.02, dy: -0.01, r: 120, opacity: 0.15 },
    { x: 0.7, y: 0.6, w: 0.5, h: 0.5, dx: -0.015, dy: 0.02, r: 80, opacity: 0.1 },
    { x: 0.1, y: 0.8, w: 0.4, h: 0.3, dx: 0.01, dy: 0.015, r: 100, opacity: 0.12 },
  ];

  const animate = () => {
    if (reduced) return;

    time += 0.005;

    ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

    blobs.forEach((blob, index) => {
      blob.x += blob.dx;
      blob.y += blob.dy;

      // Bounce off edges
      if (blob.x < 0.05 || blob.x > 0.95) blob.dx *= -1;
      if (blob.y < 0.05 || blob.y > 0.95) blob.dy *= -1;

      const centerX = blob.x * canvas.width / (window.devicePixelRatio || 1);
      const centerY = blob.y * canvas.height / (window.devicePixelRatio || 1);
      const radius = blob.r + Math.sin(time * 0.001 + index * 2) * 20;

      // Create gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `rgba(94, 234, 212, ${blob.opacity})`);
      gradient.addColorStop(1, `rgba(94, 234, 212, 0)`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Add animated mesh lines
    ctx.strokeStyle = "rgba(94, 234, 212, 0.05)";
    ctx.lineWidth = 1;

    const lines = 8;
    for (let i = 0; i < lines; i++) {
      const y = (i * canvas.height / (window.devicePixelRatio || 1) / lines) + Math.sin(time * 0.001 + i) * 20;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width / (window.devicePixelRatio || 1), y);
      ctx.stroke();

      const x = (i * canvas.width / (window.devicePixelRatio || 1) / lines) + Math.cos(time * 0.001 + i) * 20;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height / (window.devicePixelRatio || 1));
      ctx.stroke();
    }

    animationId = requestAnimationFrame(animate);
  };

  // Start animation unless reduced motion
  if (!reduced) {
    animate();
  }

  // Add hover interaction
  const heroSection = canvas.closest<HTMLElement>(".hero-wash");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => {
      if (!reduced) {
        stopAnimation();
      }
    });

    heroSection.addEventListener("mouseleave", () => {
      if (!reduced && animationId === undefined) {
        animate();
      }
    });

    const stopAnimation = () => {
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId);
        animationId = undefined;
      }
    };
  }
}

function initCopy(): void {
  const strips = Array.from(document.querySelectorAll<HTMLElement>(".code-strip"));

  strips.forEach((strip) => {
    const button = strip.querySelector<HTMLButtonElement>("[data-copy]");
    if (!button) return;

    button.addEventListener("click", async () => {
      const source = strip.querySelector<HTMLElement>("[data-copy-source]");
      if (!source) return;

      await navigator.clipboard.writeText(source.textContent || "");

      const originalLabel = button.textContent || "";
      button.textContent = "Copied";

      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1600);
    });
  });
}

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

function initHotspots(): void {
  const hotspots = Array.from(document.querySelectorAll<SVGCircleElement>(".hotspot"));
  if (!hotspots.length) return;

  hotspots.forEach((hotspot) => {
    const label = hotspot.dataset.label ?? "";
    const parent = hotspot.closest<SVGGElement>("[data-step]") ?? hotspot.closest<SVGGElement>("[data-arch]");
    const tooltip = document.createElement("div");
    tooltip.className = "hotspot-tooltip";
    tooltip.textContent = label;
    tooltip.style.cssText = "position:fixed;pointer-events:none;opacity:0;transition:opacity 120ms ease;z-index:9999;background:var(--color-ink);color:var(--color-paper);font-size:11px;padding:6px 10px;border-radius:8px;white-space:nowrap;transform:translate(-50%,-130%);";

    hotspot.addEventListener("mouseenter", () => {
      hotspot.setAttribute("stroke-opacity", "0.8");
      document.body.appendChild(tooltip);
      requestAnimationFrame(() => {
        const rect = hotspot.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top}px`;
        tooltip.style.opacity = "1";
      });
    });

    hotspot.addEventListener("mouseleave", () => {
      hotspot.setAttribute("stroke-opacity", "0");
      tooltip.style.opacity = "0";
      window.setTimeout(() => tooltip.remove(), 120);
    });

    hotspot.addEventListener("mousemove", (event) => {
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${event.clientY - 24}px`;
    });
  });
}

export function initLanding(): void {
  initMenu();
  initReveal();
  initHeroCanvas();
  initLoop();
  initTtl();
  initMergeGate();
  initArch();
  initHotspots();
  initCopy();
  initSearch();
}
