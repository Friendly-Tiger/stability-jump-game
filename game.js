
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 100, y: canvas.height - 60, w: 30, h: 30, vy: 0, jumping: false };
let gravity = 1.2;
let coins = [];
let score = 0;
let keys = {};
let walletConnected = false;

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function spawnCoin() {
  coins.push({
    x: Math.random() * (canvas.width - 20),
    y: Math.random() * (canvas.height - 100),
    r: 10,
    collected: false
  });
}

function update() {
  if (keys[" "] && !player.jumping) {
    player.vy = -18;
    player.jumping = true;
  }

  player.vy += gravity;
  player.y += player.vy;

  if (player.y > canvas.height - 60) {
    player.y = canvas.height - 60;
    player.vy = 0;
    player.jumping = false;
  }

  coins.forEach(coin => {
    if (!coin.collected &&
        player.x < coin.x + coin.r &&
        player.x + player.w > coin.x &&
        player.y < coin.y + coin.r &&
        player.y + player.h > coin.y) {
      coin.collected = true;
      score++;
      document.getElementById("score").innerText = "Score: " + score;
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffd9";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  coins.forEach(coin => {
    if (!coin.collected) {
      ctx.beginPath();
      ctx.arc(coin.x, coin.y, coin.r, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd700";
      ctx.fill();
      ctx.closePath();
    }
  });
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

document.getElementById("connectWallet").onclick = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      walletConnected = true;
      document.getElementById("connectWallet").innerText = "Wallet Connected";
    } catch (err) {
      console.error("User rejected wallet connection");
    }
  }
};

for (let i = 0; i < 10; i++) spawnCoin();
loop();
