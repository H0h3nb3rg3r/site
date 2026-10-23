// Divisórias de madeira: só cria as tábuas. O movimento é feito pelo CSS.

const PADRAO = [
  { w: 22, t: 14, d: -3,  dir: 1,  c: 1 },
  { w: 15, t: 10, d: -7,  dir: -1, c: 2 },
  { w: 28, t: 18, d: -11, dir: 1,  c: 3 },
  { w: 12, t: 9,  d: -2,  dir: -1, c: 1 },
  { w: 20, t: 13, d: -8,  dir: 1,  c: 2 },
];

document.querySelectorAll(".divisor").forEach((el, i) => {
  const inverter = i % 2 === 1 ? -1 : 1; // alterna o sentido entre divisórias
  PADRAO.forEach((tab) => {
    const sentido = tab.dir * inverter === 1 ? "normal" : "reverse";
    const tabua = document.createElement("i");
    tabua.style.cssText =
      `--w:${tab.w}vw;--t:${tab.t}s;--d:${tab.d - i * 4}s;` +
      `--s:${sentido};--c:var(--madeira-${tab.c})`;
    el.append(tabua);
  });
});