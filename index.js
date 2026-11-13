const raiz = document.documentElement,
  rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const botao = document.querySelector(".menu-botao"),
  menu = document.querySelector(".menu");
const fecha = () => {
  menu.classList.remove("aberto");
  botao.setAttribute("aria-expanded", "false");
};
botao.addEventListener("click", () =>
  botao.setAttribute("aria-expanded", menu.classList.toggle("aberto")),
);
menu.addEventListener("click", (e) => {
  if (e.target.matches("a")) fecha();
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecha();
});

const barra = document.querySelector(".progresso");
const progresso = () => {
  const m = raiz.scrollHeight - innerHeight;
  barra.style.transform = "scaleX(" + (m > 0 ? scrollY / m : 0) + ")";
};
addEventListener("scroll", progresso, { passive: true });
progresso();

const links = [...document.querySelectorAll(".menu a")];
const secoes = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting)
        links.forEach((l) =>
          l.classList.toggle(
            "ativo",
            l.getAttribute("href") === "#" + e.target.id,
          ),
        );
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("main section[id]").forEach((s) => secoes.observe(s));

const revela = new IntersectionObserver(
  (es, o) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        o.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".projeto").forEach((el, i) => {
  el.style.setProperty("--i", i % 2);
  revela.observe(el);
});

const hero = document.querySelector(".hero");
if (!rm && matchMedia("(pointer:fine)").matches) {
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", (e.clientX - r.left) / r.width - 0.5);
    hero.style.setProperty("--my", (e.clientY - r.top) / r.height - 0.5);
  });
}
document.getElementById("ano").textContent = new Date().getFullYear();
