const canvas = document.getElementById("mysticalCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ripples = [];

function addRipple() {
  const x = canvas.width / 2;
  const y = canvas.height / 2;

  ripples.push({
    x,
    y,
    radius: 0,
    alpha: 1,
    growth: 2,       // faster expansion
    thickness: 3
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    // Create radial gradient for ripple
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.9,
      ripple.x, ripple.y, ripple.radius
    );

    // lighter blue tones with fade
    gradient.addColorStop(0, `rgba(173, 216, 255, ${ripple.alpha})`); // light blue center
    gradient.addColorStop(1, `rgba(173, 216, 255, 0)`);               // fade to transparent

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = ripple.thickness;
    ctx.stroke();

    // Update ripple
    ripple.radius += ripple.growth;
    ripple.alpha -= 0.007; // slower fade for visibility

    if (ripple.alpha <= 0) ripples.splice(index, 1);
  });

  requestAnimationFrame(draw);
}

setInterval(addRipple, 1200); // spawn every ~1.2s
draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
