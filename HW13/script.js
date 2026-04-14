const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
document.getElementById("score").innerText = score;

let obstacles = [];
let collectibles = [];

/* ---------------- OBSTACLES ---------------- */

class Obstacle {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.w = data.w;
    this.h = data.h;
    this.color = data.color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

/* ---------------- COLLECTIBLES ---------------- */

class Collectible {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.size = data.size;
    this.color = data.color;
    this.active = true;
  }

  draw() {
    if (!this.active) return;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ---------------- PLAYER (POMERANIAN) ---------------- */

class Player {
  constructor() {
    this.x = 20;
    this.y = 20;
    this.size = 40;
    this.speed = 3;

    this.image = new Image();
    this.image.src = "pomeranian.png";

    this.loaded = false;
    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw() {
    if (!this.loaded) return;
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

  move(dx, dy) {
    let newX = this.x + dx;
    let newY = this.y + dy;

    // canvas boundaries
    if (
      newX < 0 ||
      newY < 0 ||
      newX + this.size > canvas.width ||
      newY + this.size > canvas.height
    ) return;

    // obstacle collision (blocking movement)
    for (let obs of obstacles) {
      if (
        newX < obs.x + obs.w &&
        newX + this.size > obs.x &&
        newY < obs.y + obs.h &&
        newY + this.size > obs.y
      ) {
        return;
      }
    }

    this.x = newX;
    this.y = newY;

    this.checkCollectibles();
  }

  checkCollectibles() {
    for (let c of collectibles) {
      if (!c.active) continue;

      if (
        this.x < c.x + c.size &&
        this.x + this.size > c.x &&
        this.y < c.y + c.size &&
        this.y + this.size > c.y
      ) {
        c.active = false;
        score++;
        document.getElementById("score").innerText = score;
      }
    }
  }
}

/* ---------------- INPUT ---------------- */

const player = new Player();

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.move(0, -player.speed);
  if (e.key === "ArrowDown") player.move(0, player.speed);
  if (e.key === "ArrowLeft") player.move(-player.speed, 0);
  if (e.key === "ArrowRight") player.move(player.speed, 0);
});

/* ---------------- LOAD JSON ---------------- */

async function loadData() {
  const obsRes = await fetch("obstacles.json");
  const obsData = await obsRes.json();
  obstacles = obsData.map(o => new Obstacle(o));

  const colRes = await fetch("collectibles.json");
  const colData = await colRes.json();
  collectibles = colData.map(c => new Collectible(c));
}

/* ---------------- GAME LOOP ---------------- */

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  obstacles.forEach(o => o.draw());
  collectibles.forEach(c => c.draw());
  player.draw();

  requestAnimationFrame(gameLoop);
}

/* ---------------- START GAME ---------------- */

loadData().then(() => {
  gameLoop();
});