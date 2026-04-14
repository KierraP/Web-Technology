const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let win = false;

let obstacles = [];
let coins = [];

let player = {
  x: 10,
  y: 10,
  size: 120,
  speed: 6,
  img: new Image()
};

player.img.src = "pomeranian.png";

document.addEventListener("keydown", function(e) {
  if (win) return;

  let nx = player.x;
  let ny = player.y;

  if (e.key === "ArrowUp") ny -= player.speed;
  if (e.key === "ArrowDown") ny += player.speed;
  if (e.key === "ArrowLeft") nx -= player.speed;
  if (e.key === "ArrowRight") nx += player.speed;

  if (nx < 0 || ny < 0 || nx + player.size > canvas.width || ny + player.size > canvas.height)
    return;

  let padding = 10;

  for (let o of obstacles) {
    if (
      nx < o.x + o.w - padding &&
      nx + player.size > o.x + padding &&
      ny < o.y + o.h - padding &&
      ny + player.size > o.y + padding
    ) return;
  }

  player.x = nx;
  player.y = ny;

  checkCoins();
});

async function load() {
  let o = await fetch("obstacles.json");
  obstacles = await o.json();

  let c = await fetch("collectibles.json");
  coins = await c.json();

  loop();
}

function checkCoins() {
  for (let c of coins) {
    if (!c.active && c.active !== undefined) continue;

    if (
      player.x < c.x + c.size &&
      player.x + player.size > c.x &&
      player.y < c.y + c.size &&
      player.y + player.size > c.y
    ) {
      c.active = false;
      score++;
      document.getElementById("score").innerText = score;

      if (score >= 12) win = true;
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // obstacles
  for (let o of obstacles) {
    ctx.fillStyle = o.color;
    ctx.fillRect(o.x, o.y, o.w, o.h);
  }

  for (let c of coins) {
    if (c.active === false) continue;

    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.drawImage(player.img, player.x, player.y, player.size, player.size);

  if (win) {
    ctx.fillStyle = "white";
    ctx.font = "60px Arial";
    ctx.fillText("You Win!", 380, 350);
  }

  requestAnimationFrame(loop);
}

load();