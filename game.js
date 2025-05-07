const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 100, y: 100, width: 50, height: 50, dy: 0, gravity: 1.5, jumpPower: -20 };
let coinCount = 0;

function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer() {
  player.dy += player.gravity;
  player.y += player.dy;

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  updatePlayer();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", e => {
  if (e.code === "ArrowUp" && player.dy === 0) {
    player.dy = player.jumpPower;
  }
});

gameLoop();
