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
    growth: 2,
    fade: 0.025
  });
});

// Auto-spawn ripples every 500ms at random positions
setInterval(() => {
  ripples.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 5,
    alpha: 1,
    growth: 2,
    fade: 0.025
  });
}, 500);

function draw() {
  // Slightly darken background each frame
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.1,
      ripple.x, ripple.y, ripple.radius * 4.0
    );

    const centerAlpha = Math.max(
      0,
      ripple.alpha * 0.6 * (1 - ripple.radius / (canvas.width * 0.5))
    );

    gradient.addColorStop(0, `rgba(220, 240, 255, ${centerAlpha})`);
    gradient.addColorStop(0.5, `rgba(160, 210, 255, ${ripple.alpha * 0.5})`);
    gradient.addColorStop(1, `rgba(120, 190, 255, ${ripple.alpha * 0.4})`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Slower expansion
    ripple.radius += ripple.growth * 0.5;

    // Faster fading
    ripple.alpha -= ripple.fade || 0.025;

    // Remove ripple when invisible
    if (ripple.alpha <= 0 && ripple.radius > canvas.width * 0.5) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

draw();
