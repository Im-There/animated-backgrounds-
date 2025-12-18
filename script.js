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
    growth: 2.0,   // faster growth
    fade: 0.01     // slower fade so ripple lasts longer
  });
});

// Auto-spawn ripples every 400ms at random positions
setInterval(() => {
  ripples.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 5,
    alpha: 1,
    growth: 2.0,
    fade: 0.01
  });
}, 400);

function draw() {
  // Slightly darken background each frame
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    // Gradient is just for visual effect, not controlling expansion
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.05,
      ripple.x, ripple.y, ripple.radius * 15.0
    );

    // Alpha controls visibility only
    gradient.addColorStop(0, `rgba(220, 240, 255, ${ripple.alpha * 0.3})`);
    gradient.addColorStop(0.5, `rgba(160, 210, 255, ${ripple.alpha * 0.15})`);
    gradient.addColorStop(1, `rgba(120, 190, 255, ${ripple.alpha * 0.05})`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Expansion continues regardless of alpha
    ripple.radius += ripple.growth * 0.4;

    // Fade out separately
    ripple.alpha -= ripple.fade || 0.01;

    // Remove ripple only when fully faded AND expanded beyond 50px
    if (ripple.alpha <= 0 && ripple.radius >= 50) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

draw();
