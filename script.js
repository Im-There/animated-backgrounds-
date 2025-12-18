// Get canvas and context
const canvas = document.getElementById("mysticalCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let ripples = [];
let rippleCount = 0; // track how many ripples have been spawned

// Add ripple on click
canvas.addEventListener("click", (e) => {
  addRipple(e.clientX, e.clientY);
});

// Auto-spawn ripples every 400ms
setInterval(() => {
  addRipple(Math.random() * canvas.width, Math.random() * canvas.height);
}, 400);

function addRipple(x, y) {
  ripples.push({
    x,
    y,
    radius: 5,
    alpha: 1,
    growth: 1.2,   // slower expansion
    fade: 0.002    // slower fade
  });

  rippleCount++;

  // Refresh background every 100 ripples
  if (rippleCount % 100 === 0) {
    ctx.fillStyle = "black"; // reset background to solid black
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function draw() {
  // Slightly darken background each frame
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.05,
      ripple.x, ripple.y, ripple.radius * 25.0
    );

    const centerAlpha = Math.max(
      0,
      ripple.alpha * 0.3 * (1 - ripple.radius / (canvas.width * 1.5))
    );

    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.05,   // inner glow
      ripple.x, ripple.y, ripple.radius * 25.0    // outer glow
    );
    
    // Stronger edge visibility, center fades quickly
    gradient.addColorStop(0, `rgba(220, 240, 255, ${ripple.alpha * 0.02})`);   // center almost invisible
    gradient.addColorStop(0.4, `rgba(160, 210, 255, ${ripple.alpha * 0.15})`); // mid faint
    gradient.addColorStop(1, `rgba(120, 190, 255, ${ripple.alpha * 0.35})`);   // edge bright & visible

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ripple.radius += ripple.growth * 0.3;
    ripple.alpha -= ripple.fade || 0.002;

    if (ripple.alpha <= 0 && ripple.radius >= 300) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

draw();
