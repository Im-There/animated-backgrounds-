const canvas = document.getElementById("mysticalCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ripples = [];

function addRipple() {
  // Randomize ripple positions across the canvas
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  ripples.push({
    x,
    y,
    radius: 0,
    alpha: 1,
    growth: 0.6,   // slower expansion speed
    thickness: 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    // Radial gradient for smooth blending
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.5,   // inner fade start
      ripple.x, ripple.y, ripple.radius * 1.6    // outer fade end
    );

    // Softer, lighter blues fading completely into transparent
    gradient.addColorStop(0, `rgba(220, 245, 255, ${ripple.alpha * 0.8})`); // bright center
    gradient.addColorStop(0.4, `rgba(170, 220, 255, ${ripple.alpha * 0.4})`); // mid fade
    gradient.addColorStop(1, `rgba(120, 180, 255, 0)`); // fully transparent edge

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Update ripple
    ripple.radius += ripple.growth;   // slower expansion
    ripple.alpha -= 0.002;            // fade more gradually

    // Remove ripple only when alpha is fully gone
    if (ripple.alpha <= 0) ripples.splice(index, 1);
  });

  requestAnimationFrame(draw);
}

// Spawn ripples randomly across the page every ~1s
setInterval(addRipple, 1000);
draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
