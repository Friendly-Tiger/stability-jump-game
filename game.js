
let score = 0;
let connected = false;
let player = { x: 50, y: 200, width: 30, height: 30, color: "#00ffc8", vy: 0, gravity: 1.5, jumpPower: -15, grounded: false };
let coins = [];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.getElementById("connectWallet").addEventListener("click", async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            connected = true;
            document.getElementById("connectWallet").innerText = "Wallet Connected";
        } catch (err) {
            console.error(err);
        }
    } else {
        alert("Please install MetaMask");
    }
});

window.addEventListener("keydown", e => {
    if (e.code === "Space" && player.grounded) {
        player.vy = player.jumpPower;
        player.grounded = false;
    }
});

function spawnCoin() {
    coins.push({
        x: canvas.width + 100,
        y: Math.random() * (canvas.height - 100) + 50,
        width: 20,
        height: 20,
        color: "#ffd700"
    });
}

function update() {
    player.vy += player.gravity;
    player.y += player.vy;

    if (player.y + player.height >= canvas.height - 10) {
        player.y = canvas.height - player.height - 10;
        player.grounded = true;
        player.vy = 0;
    }

    coins.forEach((coin, i) => {
        coin.x -= 6;
        if (
            player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y
        ) {
            coins.splice(i, 1);
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }
    });

    coins = coins.filter(coin => coin.x > -coin.width);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    coins.forEach(coin => {
        ctx.fillStyle = coin.color;
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.width / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

setInterval(spawnCoin, 1500);
gameLoop();
