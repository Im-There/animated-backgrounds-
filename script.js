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
    growth: 2,
    thickness: 3
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    // Create a radial gradient that fades outward
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.7,   // inner fade start
      ripple.x, ripple.y, ripple.radius * 1.2    // outer fade end
    );

    // Softer, lighter blues that blend into black
    gradient.addColorStop(0, `rgba(200, 230, 255, ${ripple.alpha * 0.8})`); // bright center
    gradient.addColorStop(0.5, `rgba(150, 200, 255, ${ripple.alpha * 0.4})`); // mid fade
    gradient.addColorStop(1, `rgba(100, 150, 255, 0)`); // transparent edge

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();   // use fill instead of stroke for blur effect

    // Update ripple
    ripple.radius += ripple.growth;
    ripple.alpha -= 0.006; // slower fade for visibility

    if (ripple.alpha <= 0) ripples.splice(index, 1);
  });

  requestAnimationFrame(draw);
}

setInterval(addRipple, 1200);
draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
