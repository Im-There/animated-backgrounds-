function createMysticalIdleAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const ripples = [];
  const particles = [];

  const colors = ["#FF0000", "#00FF00", "#00FFFF", "#FFD700", "#FFFFFF"];

  function addRipple() {
    ripples.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 80 + 40, // ripple length
      dx: (Math.random() - 0.5) * 2,   // horizontal drift
      dy: (Math.random() - 0.5) * 2,   // vertical drift
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      width: Math.random() * 2 + 1     // line thickness
    });
  }

  function addParticle() {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.8
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ripples as flowing lines
    ripples.forEach((ripple, index) => {
      ctx.beginPath();
      ctx.moveTo(ripple.x, ripple.y);
      ctx.lineTo(ripple.x + ripple.length, ripple.y);
      ctx.strokeStyle = ripple.color;
      ctx.globalAlpha = ripple.alpha;
      ctx.lineWidth = ripple.width;
      ctx.stroke();

      ripple.x += ripple.dx;
      ripple.y += ripple.dy;
      ripple.alpha -= 0.005;

      if (ripple.alpha <= 0) ripples.splice(index, 1);
    });

    // Draw particles
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

  setInterval(addRipple, 1000); // spawn ripples more frequently
  for (let i = 0; i < 50; i++) addParticle();

  draw();
}

// Run the animation
createMysticalIdleAnimation("mysticalCanvas");
