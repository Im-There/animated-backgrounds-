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
    growth: 1.2,   // base expansion speed
    fade: 0.002    // fade rate
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
    // Create radial gradient for glow
    // Create radial gradient for glow with tighter spread
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.2,   // inner glow closer to ripple size
      ripple.x, ripple.y, ripple.radius * 3.0    // outer glow not too far
    );
    
    gradient.addColorStop(0,  `rgba(220, 240, 255, ${ripple.alpha * 0.9})`);
    gradient.addColorStop(0.5,`rgba(160, 210, 255, ${ripple.alpha * 0.6})`);
    gradient.addColorStop(1,  `rgba(120, 190, 255, ${ripple.alpha * 0.0})`);
    
    // Draw glowing ripple
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Punch out center
    // Punch out center (larger start, faster growth after 300)
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    
    let holeRadius;
    if (ripple.radius < 300) {
      // start with hole already a bit bigger (half the ripple size)
      holeRadius = ripple.radius * 0.6;
    } else {
      // after 300, hole grows faster than ripple
      holeRadius = ripple.radius * 1.4;
    }
    
    ctx.arc(ripple.x, ripple.y, holeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Update ripple properties
    if (ripple.radius < 300) {
      ripple.radius += ripple.growth * 0.25; // slightly slower growth before 300
    } else {
      ripple.radius += ripple.growth * 0.02; // very slow growth after 300
    }
    ripple.alpha -= ripple.fade || 0.002;

    // Remove ripple when faded and large enough
    if (ripple.alpha <= 0 && ripple.radius >= 300) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

// Kick off animation loop
draw();
