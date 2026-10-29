const setMenu = (open) => {
    const toggle = document.querySelector('.nav-toggle');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
 
  // um único listener no document: funciona mesmo que o script carregue antes do HTML
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-toggle');
    if (btn) return setMenu(btn.getAttribute('aria-expanded') !== 'true');
 
    // fecha ao clicar num link ou fora da nav
    if (!e.target.closest('nav') || e.target.closest('.navlinks a')) setMenu(false);
  });
 
  // fecha com Esc e ao voltar para a tela de desktop
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
  matchMedia('(min-width: 721px)').addEventListener('change', () => setMenu(false));