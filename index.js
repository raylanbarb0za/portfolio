document.documentElement.classList.add("js");
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

const itens = [
  ...document.querySelectorAll(
    "#sobre .conteiner > *, #habilidades h2, #habilidades .habilidades-grade > *, #projetos h2, #projetos .intro, .projeto, #contato .painel-contato",
  ),
];
itens.forEach((el) => el.classList.add("revelar"));
const desloc = itens.map(
  (el) => ([...el.parentElement.children].indexOf(el) % 3) * 40,
);
let agendado = false;
const animaItens = () => {
  const vh = innerHeight;
  itens.forEach((el, i) => {
    const p = Math.min(
      1,
      Math.max(
        0,
        (vh * 1.0 - el.getBoundingClientRect().top - desloc[i]) / (vh * 0.5),
      ),
    );
    el.style.opacity = p;
    el.style.translate = "0 " + (1 - p) * 48 + "px";
  });
  agendado = false;
};
const agenda = () => {
  if (!agendado) {
    agendado = true;
    requestAnimationFrame(animaItens);
  }
};
if (!rm) {
  addEventListener("scroll", agenda, { passive: true });
  addEventListener("resize", agenda);
  animaItens();
}

const hero = document.querySelector(".hero");
if (!rm && matchMedia("(pointer:fine)").matches) {
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", (e.clientX - r.left) / r.width - 0.5);
    hero.style.setProperty("--my", (e.clientY - r.top) / r.height - 0.5);
  });
}
document.getElementById("ano").textContent = new Date().getFullYear();
