/* ============================================================
   Study Trip 2027 — interactions
   Config lives in data/trip.json.
   Preview the reveal:
   ?preview=reveal&city=Somewhere&code=AAA
   ============================================================ */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?!-.";
const MIN_FLAPS = 11;
const SECRET = "?????";

const $ = (sel) => document.querySelector(sel);

document.addEventListener("DOMContentLoaded", async () => {
  initNav();

  let config;
  try {
    config = await loadConfig();
  } catch (err) {
    console.error("Could not load data/trip.json", err);
    return;
  }

  bindTripInfo(config.trip);
  initDestination(config);
});

async function loadConfig() {
  const res = await fetch("data/trip.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function getPreviewDestination() {
  const params = new URLSearchParams(location.search);
  if (params.get("preview") !== "reveal") return null;
  return { city: params.get("city") || "Somewhere", code: params.get("code") || "AAA" };
}

function bindTripInfo(trip) {
  const values = {
    dateLabel: trip.dateLabel,
    originCode: trip.origin?.code,
    originCity: trip.origin?.city,
  };
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const value = values[el.dataset.bind];
    if (value) el.textContent = value;
  });
}

/* ---------- Destination + countdown ---------- */

function initDestination(config) {
  const revealAt = new Date(config.reveal.at).getTime();
  const tripStart = new Date(config.trip.start).getTime();
  const home = config.trip.origin.city;
  const preview = getPreviewDestination();

  const rows = {
    out: createBoard($("#flaps-1")),
    home: createBoard($("#flaps-2")),
  };

  let revealed = false;

  // Flip the rows one after another: destination, then home.
  const reveal = (destination) => {
    revealed = true;
    const count = flapCount(destination.city, home);
    rows.out.show(destination.city, count, () => {
      rows.home.show(home, count, () => {
        document.body.classList.add("is-revealed");
        setStatus("Confirmed", true);
        $("#board").setAttribute("aria-label", `Destination: ${destination.city}`);
        setPassDestination(destination);
        if (!reduceMotion) confetti();
      });
    });
  };

  const destination = preview || config.reveal.destination;
  if (destination && (preview || Date.now() >= revealAt)) {
    // Small delay so the hero entrance finishes first.
    setTimeout(() => reveal(destination), reduceMotion ? 0 : 900);
  } else {
    const count = flapCount(home);
    rows.out.tease(count);
    rows.home.show(home, count);
  }

  // Countdown: to the reveal while secret, to departure once revealed.
  let polling = false;
  const tick = () => {
    const now = Date.now();
    if (!revealed && now >= revealAt && !polling) {
      // Reveal moment passed while the page was open: fetch the destination.
      polling = true;
      pollForDestination(reveal);
    }

    if (revealed || now >= revealAt) {
      if (now >= tripStart) {
        $("#countdown-label").textContent = "We're on our way! ✈️";
        $(".countdown__grid").hidden = true;
        return;
      }
      $("#countdown-label").textContent = "Departure in";
      renderCountdown(tripStart - now);
    } else {
      $("#countdown-label").textContent = "Destination reveal in";
      renderCountdown(revealAt - now);
    }
  };
  tick();
  setInterval(tick, 1000);
}

function flapCount(...texts) {
  return Math.max(MIN_FLAPS, ...texts.map((t) => t.length + 2));
}

async function pollForDestination(onFound) {
  setStatus("Revealing…");
  try {
    const config = await loadConfig();
    if (config.reveal.destination) return onFound(config.reveal.destination);
  } catch {
    /* try again below */
  }
  setTimeout(() => pollForDestination(onFound), 30_000);
}

function renderCountdown(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  $("#cd-days").textContent = Math.floor(s / 86400);
  $("#cd-hours").textContent = String(Math.floor((s / 3600) % 24)).padStart(2, "0");
  $("#cd-min").textContent = String(Math.floor((s / 60) % 60)).padStart(2, "0");
  $("#cd-sec").textContent = String(s % 60).padStart(2, "0");
}

function setStatus(text, final = false) {
  const el = $("#board-status");
  el.textContent = text;
  el.classList.toggle("is-final", final);
}

function setPassDestination(destination) {
  const items = [
    [$("#pass-code"), destination.code],
    [$("#pass-city"), destination.city],
    [$("#stub-code"), destination.code],
  ];
  for (const [el, text] of items) {
    el.textContent = text;
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
  }
}

/* ---------- Split-flap board ---------- */

function createBoard(container) {
  let flaps = [];
  let teaseTimer = null;

  const build = (count) => {
    container.innerHTML = "";
    flaps = Array.from({ length: count }, () => {
      const el = document.createElement("span");
      el.className = "flap";
      container.appendChild(el);
      return el;
    });
  };

  const setChar = (el, ch) => {
    el.textContent = ch === " " ? "" : ch;
    if (reduceMotion) return;
    el.classList.remove("is-flipping");
    void el.offsetWidth;
    el.classList.add("is-flipping");
  };

  const centered = (text, count) => {
    const pad = Math.floor((count - text.length) / 2);
    return text.padStart(text.length + pad).padEnd(count).split("");
  };

  // Flip every flap through random characters until it lands on its target.
  const flipTo = (text, done) => {
    const target = centered(text.toUpperCase(), flaps.length);
    if (reduceMotion) {
      flaps.forEach((el, i) => setChar(el, target[i]));
      done?.();
      return;
    }
    let remaining = flaps.length;
    flaps.forEach((el, i) => {
      let steps = 6 + Math.floor(Math.random() * 6) + i * 2;
      const step = () => {
        if (steps-- <= 0) {
          setChar(el, target[i]);
          if (--remaining === 0) done?.();
          return;
        }
        setChar(el, FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)]);
        setTimeout(step, 55);
      };
      step();
    });
  };

  return {
    tease(count) {
      build(count);
      flipTo(SECRET);
      if (reduceMotion) return;
      teaseTimer = setInterval(() => flipTo(SECRET), 8000);
    },
    show(text, count, done) {
      clearInterval(teaseTimer);
      build(count);
      flipTo(text, done);
    },
  };
}

/* ---------- Nav ---------- */

function initNav() {
  const nav = $(".nav");
  const update = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ---------- Confetti ---------- */

function confetti() {
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = innerWidth;
  const h = innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const colors = ["#f4b9b8", "#e48887", "#9c5658", "#ece8d4", "#a7b0d8", "#2c3446"];
  const pieces = Array.from({ length: 180 }, () => ({
    x: w / 2 + (Math.random() - 0.5) * 120,
    y: h * 0.45,
    vx: (Math.random() - 0.5) * 16,
    vy: Math.random() * -16 - 4,
    size: Math.random() * 7 + 4,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  let frame = 0;
  const loop = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pieces) {
      p.vy += 0.35;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    if (++frame < 240) requestAnimationFrame(loop);
    else ctx.clearRect(0, 0, w, h);
  };
  loop();
}
