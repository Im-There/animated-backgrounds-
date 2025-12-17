const canvas = document.getElementById("mysticalCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ripples = [];

function addRipple() {
  let x = canvas.width / 2;
  let y = canvas.height / 2;

  ripples.push({
    x,
    y,
    radius: 0,
    alpha: 1,
    growth: 1.2,
    thickness: 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    // Create blurred ripple using shadow
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(100, 150, 255, ${ripple.alpha})`;
    ctx.lineWidth = ripple.thickness;

    ctx.shadowColor = `rgba(100, 150, 255, ${ripple.alpha})`;
    ctx.shadowBlur = 20; // blur effect
    ctx.stroke();

    // Update ripple
    ripple.radius += ripple.growth;
    ripple.alpha -= 0.01;

    if (ripple.alpha <= 0) ripples.splice(index, 1);
  });

  requestAnimationFrame(draw);
}

setInterval(addRipple, 2000);
draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
