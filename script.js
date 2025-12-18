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
    growth: 1.2,   // slower expansion speed
    fade: 0.02     // fade a bit faster
  });
});

// Auto-spawn ripples every 400ms at random positions
setInterval(() => {
  ripples.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 5,
    alpha: 1,
    growth: 1.2,
    fade: 0.02
  });
}, 400);

function draw() {
  // Slightly darken background each frame
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.05,   // tighter inner glow
      ripple.x, ripple.y, ripple.radius * 8.0     // much larger outer radius
    );

    // Increase alpha multipliers slightly for stronger overlap,
    // but keep them capped so it never turns fully opaque
    const centerAlpha = Math.min(
      0.35, // cap at 0.35
      ripple.alpha * 0.3 * (1 - ripple.radius / (canvas.width * 0.9))
    );

    gradient.addColorStop(0, `rgba(220, 240, 255, ${centerAlpha})`);
    gradient.addColorStop(0.5, `rgba(160, 210, 255, ${Math.min(0.2, ripple.alpha * 0.18)})`);
    gradient.addColorStop(1, `rgba(120, 190, 255, ${Math.min(0.1, ripple.alpha * 0.07)})`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Slower expansion but much larger coverage
    ripple.radius += ripple.growth * 0.25;

    // Faster fading
    ripple.alpha -= ripple.fade || 0.02;

    // Remove ripple cleanly once alpha is gone
    if (ripple.alpha <= 0) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

draw();
