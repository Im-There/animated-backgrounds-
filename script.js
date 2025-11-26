function createMysticalIdleAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const ripples = [];
  const particles = [];

  const colors = ["#6A0DAD", "#8A2BE2", "#9370DB", "#D8BFD8", "#FFD700"];

  function addRipple() {
    ripples.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  function addParticle() {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.8
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ripples.forEach((ripple, index) => {
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = ripple.color;
      ctx.globalAlpha = ripple.alpha;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ripple.radius += 0.2;
      ripple.alpha -= 0.001;

      if (ripple.alpha <= 0) ripples.splice(index, 1);
    });

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  setInterval(addRipple, 3000);
  for (let i = 0; i < 50; i++) addParticle();

  draw();
} // ← closing curly bracket of the function

// Run the animation on the canvas
createMysticalIdleAnimation("mysticalCanvas");
