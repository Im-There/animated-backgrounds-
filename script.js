const canvas = document.getElementById("mysticalCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to full window resolution
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Ripple storage
let ripples = [];

// Spawn ripple on click (still works)
canvas.addEventListener("click", (e) => {
  spawnRipple(e.clientX, e.clientY);
});

// Function to spawn a ripple
function spawnRipple(x, y) {
  ripples.push({
    x,
    y,
    radius: 10 + Math.random() * 10,   // small initial radius
    alpha: 1,
    growth: 1.5 + Math.random() * 1.5  // varied growth speed
  });
}

// Auto-spawn ripples like rain
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.9; // near bottom surface
  spawnRipple(x, y);
}, 200); // every 200ms → drizzle; lower for heavier rain

function draw() {
  // Darker background fade for contrast
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.1,
      ripple.x, ripple.y, ripple.radius * 4.0
    );

    gradient.addColorStop(0, `rgba(220, 240, 255, ${ripple.alpha})`);
    gradient.addColorStop(0.4, `rgba(160, 210, 255, ${ripple.alpha * 0.7})`);
    gradient.addColorStop(1, `rgba(120, 190, 255, 0)`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Update ripple
    ripple.radius += ripple.growth;
    ripple.alpha -= 0.0007; // fade tuned for rain effect

    // Remove when invisible and large enough
    if (ripple.alpha <= 0 && ripple.radius > canvas.width * 0.5) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

draw();
