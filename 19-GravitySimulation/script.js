const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Body {
  constructor(x, y, mass) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.vx = 0;
    this.vy = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.sqrt(this.mass), 0, Math.PI * 2);
    ctx.fillStyle = `#befabe`;
    ctx.fill();
  }
}

const G = 0.05;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const sun = new Body(centerX, centerY, 8000);

const bodies = [sun];

for (let i = 1; i <= 5; i++) {
  let distance = 100 + i * 80;
  let angle = Math.random() * Math.PI * 2;

  let x = centerX + Math.cos(angle) * distance;
  let y = centerY + Math.sin(angle) * distance;

  let planet = new Body(x, y, 5 + Math.random() * 20);

  let dx = planet.x - sun.x;
  let dy = planet.y - sun.y;
  let r = Math.sqrt(dx * dx + dy * dy);

  let v = Math.sqrt((G * sun.mass) / r);

  planet.vx = -v * (dy / r);
  planet.vy =  v * (dx / r);

  bodies.push(planet);
}

function applyGravity(b1, b2) {
  let dx = b2.x - b1.x;
  let dy = b2.y - b1.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 5) return;

  let force = (G * b1.mass * b2.mass) / (dist * dist);
  let angle = Math.atan2(dy, dx);

  let fx = force * Math.cos(angle);
  let fy = force * Math.sin(angle);

  b1.vx += fx / b1.mass;
  b1.vy += fy / b1.mass;

  b2.vx -= fx / b2.mass;
  b2.vy -= fy / b2.mass;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      applyGravity(bodies[i], bodies[j]);
    }
  }

  bodies.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;
    b.draw();
  });

  requestAnimationFrame(update);
}

update();