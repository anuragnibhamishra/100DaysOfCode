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

const section = document.getElementById('JustDoIt');

const colors = [
  { bg: [0, 0, 0], text: [255, 255, 255] },       // black
  { bg: [23, 23, 23], text: [230, 230, 230] },    // neutral-900
  { bg: [64, 64, 64], text: [200, 200, 200] },    // neutral-700
  { bg: [115, 115, 115], text: [120, 120, 120] }, // neutral-500
  { bg: [212, 212, 212], text: [50, 50, 50] },    // neutral-300
  { bg: [245, 245, 245], text: [0, 0, 0] },        // neutral-100
  { bg: [250, 250, 250], text: [0, 0, 0] }      // neutral-50
];

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function interpolateColor(c1, c2, t) {
  return c1.map((val, i) => Math.round(lerp(val, c2[i], t)));
}

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // progress from 0 → 1
  let progress = 1 - rect.top / windowHeight;
  progress = Math.min(Math.max(progress, 0), 1);

  // map progress to color segments
  const totalStops = colors.length - 1;
  const scaled = progress * totalStops;

  const index = Math.floor(scaled);
  const t = scaled - index;

  const c1 = colors[index];
  const c2 = colors[index + 1] || colors[index];

  const bg = interpolateColor(c1.bg, c2.bg, t);
  const text = interpolateColor(c1.text, c2.text, t);

  section.style.backgroundColor = `rgb(${bg.join(",")})`;
  section.style.color = `rgb(${text.join(",")})`;
});


