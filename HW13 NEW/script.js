const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;

let obstacles = [];
let collectibles = [];

/* ---------------- OBSTACLE ---------------- */

class Obstacle {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

/* ---------------- COLLECTIBLE ---------------- */

class Collectible {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
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

/* ---------------- PLAYER ---------------- */

class Player {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.size = 70;
    this.speed = 4;

    this.img = new Image();
    this.img.src = "pomeranian.png";

    this.loaded = false;
    this.img.onload = () => {
      this.loaded = true;
    };
  }

  draw() {
    if (!this.loaded) return;

    ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
  }

  move(dx, dy) {
    let newX = this.x + dx;
    let newY = this.y + dy;

    // bounds
    if (
      newX < 0 ||
      newY < 0 ||
      newX + this.size > canvas.width ||
      newY + this.size > canvas.height
    ) return;

    // obstacle collision (simple padding)
    let padding = 10;

    for (let o of obstacles) {
      if (
        newX < o.x + o.w - padding &&
        newX + this.size > o.x + padding &&
        newY < o.y + o.h - padding &&
        newY + this.size > o.y + padding
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

/* ---------------- SETUP ---------------- */

let player = new Player();

/* ---------------- INPUT (FIXED & SIMPLE) ---------------- */

document.addEventListener("keydown", function (e) {
  console.log("Key:", e.key);

  if (e.key === "ArrowUp") player.move(0, -player.speed);
  if (e.key === "ArrowDown") player.move(0, player.speed);
  if (e.key === "ArrowLeft") player.move(-player.speed, 0);
  if (e.key === "ArrowRight") player.move(player.speed, 0);
});

/* ---------------- LOAD JSON ---------------- */

async function loadGame() {
  let o = await fetch("obstacles.json");
  let oData = await o.json();

  for (let i = 0; i < oData.length; i++) {
    let o2 = oData[i];
    obstacles.push(new Obstacle(o2.x, o2.y, o2.w, o2.h, o2.color));
  }

  let c = await fetch("collectibles.json");
  let cData = await c.json();

  for (let i = 0; i < cData.length; i++) {
    let c2 = cData[i];
    collectibles.push(new Collectible(c2.x, c2.y, c2.size, c2.color));
  }

  gameLoop();
}

/* ---------------- GAME LOOP ---------------- */

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let o of obstacles) o.draw();
  for (let c of collectibles) c.draw();

  player.draw();

  requestAnimationFrame(gameLoop);
}

loadGame();