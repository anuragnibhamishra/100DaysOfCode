const navItems = document.querySelectorAll('#main-nav li');
const megaMenu = document.getElementById('mega-menu');

navItems.forEach(item => {
  item.addEventListener('mouseover', () => {
    const menuType = item.dataset.menu;

    // megaMenu.innerHTML = getMenuContent(menuType);
    megaMenu.classList.remove('opacity-0', 'pointer-events-none');
  });
});

megaMenu.addEventListener('mouseleave', () => {
  megaMenu.classList.add('opacity-0', 'pointer-events-none');
});