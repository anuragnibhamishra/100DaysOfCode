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

const featuredProductsContainer = document.getElementById('featuredProducts');

const featuredProducts = [
  {
    name: 'Nike Air Zoom Pegasus 42',
    rating: 4.8,
    reviews: 124,
    color: 'Black/White',
    image: 'https://via.placeholder.com/400x500.png?text=Pegasus+42',
    price: '$160',
    description: 'A modern running classic with responsive cushioning.'
  },
  {
    name: 'Nike Dunk High',
    rating: 4.7,
    reviews: 98,
    color: 'Sail/Black',
    image: 'https://via.placeholder.com/400x500.png?text=Dunk+High',
    price: '$120',
    description: 'Retro styling with a soft leather upper for everyday wear.'
  },
  {
    name: 'Nike Air Max 97',
    rating: 4.9,
    reviews: 168,
    color: 'Silver Bullet',
    image: 'https://via.placeholder.com/400x500.png?text=Air+Max+97',
    price: '$180',
    description: 'Iconic full-length Air cushioning and premium materials.'
  },
  {
    name: 'Nike React Infinity Run',
    rating: 4.6,
    reviews: 85,
    color: 'Wolf Grey',
    image: 'https://via.placeholder.com/400x500.png?text=React+Infinity',
    price: '$160',
    description: 'Engineered for stability and comfort on long runs.'
  },
  {
    name: 'Nike Air Force 1',
    rating: 4.5,
    reviews: 210,
    color: 'White/White',
    image: 'https://via.placeholder.com/400x500.png?text=Air+Force+1',
    price: '$110',
    description: 'Timeless streetwear with durable leather construction.'
  },
  {
    name: 'Nike ZoomX Vaporfly',
    rating: 4.9,
    reviews: 74,
    color: 'Volt/Black',
    image: 'https://via.placeholder.com/400x500.png?text=Vaporfly',
    price: '$250',
    description: 'Race-day performance with ultra-responsive ZoomX foam.'
  }
];

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'min-w-[300px] sm:min-w-[340px] md:min-w-[360px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden w-[360px] hover:-translate-y-1 h-[575px] flex flex-col justify-between transition-transform duration-300';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'w-full h-72 overflow-hidden bg-neutral-100';
  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;
  image.className = 'w-full h-full object-cover';
  imageWrapper.appendChild(image);

  const content = document.createElement('div');
  content.className = 'p-6 flex flex-col justify-between grow gap-4';

  const badge = document.createElement('span');
  badge.className = 'text-xs uppercase tracking-[0.3em] text-neutral-500';
  badge.textContent = product.color;

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold text-neutral-950';
  title.textContent = product.name;

  const description = document.createElement('p');
  description.className = 'text-sm text-neutral-600 leading-6';
  description.textContent = product.description;

  const ratingRow = document.createElement('div');
  ratingRow.className = 'flex items-center justify-between gap-3';

  const rating = document.createElement('span');
  rating.className = 'text-sm font-medium text-neutral-950';
  rating.textContent = `${product.rating} ★ (${product.reviews})`;

  const price = document.createElement('span');
  price.className = 'text-lg font-bold text-neutral-950';
  price.textContent = product.price;

  ratingRow.appendChild(rating);
  ratingRow.appendChild(price);

  const action = document.createElement('button');
  action.className = 'w-full py-3 bg-neutral-950 text-white rounded-full text-sm font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors duration-200';
  action.textContent = 'Shop now';

  content.appendChild(badge);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(ratingRow);
  content.appendChild(action);

  card.appendChild(imageWrapper);
  card.appendChild(content);

  return card;
}

function renderFeaturedProducts() {
  if (!featuredProductsContainer) return;

  featuredProductsContainer.className = 'w-full flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-4 scroll-smooth';
  featuredProductsContainer.style.scrollbarWidth = 'none';
  featuredProductsContainer.style.msOverflowStyle = 'none';
  featuredProductsContainer.innerHTML = '';

  featuredProducts.forEach(product => {
    const card = createProductCard(product);
    featuredProductsContainer.appendChild(card);
  });
}

renderFeaturedProducts();


