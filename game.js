
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let walletConnected = false;
let signer = null;

document.getElementById("connectWalletButton").addEventListener("click", async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("Wallet connected:", address);
    walletConnected = true;
  } else {
    alert("Please install MetaMask!");
  }
});

let y = 500;
let velocity = 0;
let gravity = 1;
let jumpStrength = -15;
let onGround = true;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Simple ground
  ctx.fillStyle = "#444";
  ctx.fillRect(0, 550, canvas.width, 50);

  // Character
  ctx.fillStyle = "#0f0";
  ctx.fillRect(100, y, 50, 50);

  velocity += gravity;
  y += velocity;

  if (y >= 500) {
    y = 500;
    velocity = 0;
    onGround = true;
  }

  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && onGround) {
    velocity = jumpStrength;
    onGround = false;
  }
});

gameLoop();
