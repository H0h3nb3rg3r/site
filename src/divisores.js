// Divisórias de madeira: criam as tábuas e movem cada uma conforme a rolagem.

const PADRAO = [
  { w: 78, x: 4,  dir: 1,  v: 1.0, c: 1 },
  { w: 62, x: 30, dir: -1, v: 0.8, c: 2 },
  { w: 90, x: -8, dir: 1,  v: 0.6, c: 3 },
  { w: 70, x: 22, dir: -1, v: 1.1, c: 1 },
];

const divisores = [...document.querySelectorAll(".divisor")];

divisores.forEach((el, i) => {
  const inverter = i % 2 === 1 ? -1 : 1; // alterna o sentido entre divisórias
  PADRAO.forEach((t) => {
    const tabua = document.createElement("i");
    tabua.style.cssText =
      `--w:${t.w}vw;--x:${t.x * inverter}vw;--dir:${t.dir * inverter};` +
      `--v:${t.v};--c:var(--madeira-${t.c})`;
    el.append(tabua);
  });
});

const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
let agendado = false;

function atualizar() {
  agendado = false;
  const altura = window.innerHeight;

  for (const el of divisores) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -100 || r.top > altura + 100) continue; // fora da tela
    // 0 = entrando por baixo, 1 = saindo por cima
    const p = (altura - r.top) / (altura + r.height);
    el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
  }
}

function agendar() {
  if (!agendado) {
    agendado = true;
    requestAnimationFrame(atualizar);
  }
}

if (!reduzirMovimento.matches) {
  window.addEventListener("scroll", agendar, { passive: true });
  window.addEventListener("resize", agendar);
  atualizar();
}