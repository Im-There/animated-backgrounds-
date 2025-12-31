// ===============================
// Mystical Ripple Animation Script
// ===============================

// Get canvas element and its 2D drawing context
const canvas = document.getElementById("mysticalCanvas");
const ctx = canvas.getContext("2d");

// -------------------------------
// Resize canvas to fill the window
// -------------------------------
function resizeCanvas() {
  // Match canvas size to current window dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Paint initial background as solid black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
resizeCanvas(); // Run once at start
window.addEventListener("resize", resizeCanvas); // Update on window resize

// -------------------------------
// Ripple storage and counter
// -------------------------------
let ripples = [];       // Array to hold all active ripples
let rippleCount = 0;    // Track how many ripples have been spawned

// -------------------------------
// Add ripple on mouse click
// -------------------------------
canvas.addEventListener("click", (e) => {
  addRipple(e.clientX, e.clientY); // Spawn ripple at click coordinates
});

// -------------------------------
// Auto-spawn ripples every 400ms
// -------------------------------
setInterval(() => {
  addRipple(Math.random() * canvas.width, Math.random() * canvas.height);
}, 400);

// -------------------------------
// Function to create a new ripple
// -------------------------------
function addRipple(x, y) {
  ripples.push({
    x,          // X position
    y,          // Y position
    radius: 5,  // Starting radius
    alpha: 1,   // Opacity (1 = fully visible)
    growth: 1.2,// Base expansion speed
    fade: 0.002 // Fade rate per frame
  });

  rippleCount++;

  // Optional: reset background every 100 ripples
  if (rippleCount % 100 === 0) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// -------------------------------
// Main draw loop (runs every frame)
// -------------------------------
function draw() {
  // Reset composite mode to normal drawing
  ctx.globalCompositeOperation = "source-over";

  // Slightly darken background each frame
  // This creates a "trailing" effect for ripples
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Loop backwards through ripples (safe for removal)
  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];

    // -------------------------------
    // Create glowing radial gradient
    // -------------------------------
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.2, // inner circle
      ripple.x, ripple.y, ripple.radius * 3.0  // outer circle
    );

    // Gradient color stops (soft glow effect)
    gradient.addColorStop(0,  `rgba(220,240,255,${ripple.alpha * 0.9})`);
    gradient.addColorStop(0.5,`rgba(160,210,255,${ripple.alpha * 0.6})`);
    gradient.addColorStop(1,  `rgba(120,190,255,0)`);

    // Draw glowing ripple circle
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // -------------------------------
    // Punch out center hole
    // -------------------------------
    ctx.save(); // Save current state
    ctx.globalCompositeOperation = "destination-out"; // Cut out mode
    ctx.beginPath();

    let holeRadius;
    if (ripple.radius < 300) {
      // Before 300px, hole is ~90% of ripple size
      holeRadius = ripple.radius * 0.9;
    } else {
      // After 300px, hole expands drastically
      holeRadius = ripple.radius * (1.0 + (ripple.radius - 300) * 0.05);
      // Example: at radius=400 → holeRadius ≈ 6× ripple size
    }

    ctx.arc(ripple.x, ripple.y, holeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore(); // Restore normal drawing mode

    // -------------------------------
    // Update ripple properties
    // -------------------------------
    if (ripple.radius < 300) {
      ripple.radius += ripple.growth * 0.25; // Normal growth
    } else {
      ripple.radius += ripple.growth * 0.01; // Slows down after 300px
    }

    ripple.alpha -= ripple.fade; // Gradually fade out

    // -------------------------------
    // Remove ripple when invisible
    // -------------------------------
    if (ripple.alpha <= 0 && ripple.radius >= 300) {
      ripples.splice(i, 1); // Remove from array
    }
  }

  // -------------------------------
  // Optional: clear background every 100 ripples
  // -------------------------------
  if (rippleCount > 0 && rippleCount % 100 === 0) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Request next animation frame
  requestAnimationFrame(draw);
}

// -------------------------------
// Start the animation loop
// -------------------------------
draw();
