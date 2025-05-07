
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const connectButton = document.getElementById("connectWallet");
const statusText = document.getElementById("status");
let provider;
let signer;
let connectedAddress;

// Character
const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    color: "lime",
    velocityY: 0,
    gravity: 1,
    jumpStrength: -15,
    grounded: true
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer() {
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    if (player.y >= 300) {
        player.y = 300;
        player.velocityY = 0;
        player.grounded = true;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlayer();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && player.grounded) {
        player.velocityY = player.jumpStrength;
        player.grounded = false;
    }
});

connectButton.addEventListener("click", async () => {
    if (typeof window.ethereum !== "undefined") {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        connectedAddress = await signer.getAddress();
        statusText.textContent = `Connected: ${connectedAddress}`;
    } else {
        alert("Please install MetaMask!");
    }
});

gameLoop();
