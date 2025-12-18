// Get canvas and context
const canvas = document.getElementById("mysticalCanvas");
const ctx = canvas.getContext("2d");

// Function to resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let ripples = [];

// Add ripple on click (optional interactive effect)
canvas.addEventListener("click", (e) => {
  ripples.push({
    x: e.clientX,
    y: e.clientY,
    radius: 5,
    alpha: 1,
    growth: 1.5,   // slightly faster growth so it reaches large size
    fade: 0.02     // fade rate
  });
});

// Auto-spawn ripples every 400ms at random positions
setInterval(() => {
  ripples.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 5,
    alpha: 1,
    growth: 1.5,
    fade: 0.02
  });
}, 400);

function draw() {
  // Slightly darken background each frame
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.05,   // inner glow
      ripple.x, ripple.y, ripple.radius * 12.0    // much larger outer radius
    );

    // Softer alpha values for blending
    const centerAlpha = Math.max(
      0,
      ripple.alpha * 0.25 * (1 - ripple.radius / (canvas.width * 1.2))
    );

    gradient.addColorStop(0, `rgba(220, 240, 255, ${centerAlpha})`);
    gradient.addColorStop(0.5, `rgba(160, 210, 255, ${ripple.alpha * 0.12})`);
    gradient.addColorStop(1, `rgba(120, 190, 255, ${ripple.alpha * 0.05})`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Expand slower but allow much larger coverage
    ripple.radius += ripple.growth * 0.2;

    // Fade out
    ripple.alpha -= ripple.fade || 0.02;

    // Remove ripple once fully invisible
    if (ripple.alpha <= 0) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

draw();
