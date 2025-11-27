function createMysticalIdleAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const ripples = [];

  // Generate random purple shades (hue ~270, saturation high, lightness varies)
  function randomPurple() {
    const hue = 270; // purple hue
    const saturation = Math.floor(Math.random() * 30 + 70); // 70–100%
    const lightness = Math.floor(Math.random() * 50 + 25); // 25–75% (light to dark)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  function addRipple() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    ripples.push({
      x,
      y,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      length: Math.random() * 200 + 150,
      thickness: Math.random() * 2 + 1,
      color: randomPurple(), // use dynamic purple
      alpha: 1,
      speed: 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ripple interactions: slow down when close
    for (let i = 0; i < ripples.length; i++) {
      const r1 = ripples[i];
      for (let j = i + 1; j < ripples.length; j++) {
        const r2 = ripples[j];
        const dx = r1.x - r2.x;
        const dy = r1.y - r2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 60) {
          r1.speed = Math.max(0.5, r1.speed * 0.9);
          r2.speed = Math.max(0.5, r2.speed * 0.9);
        }
      }
    }

    // Draw ripples
    ripples.forEach((ripple, index) => {
      ctx.beginPath();
      ctx.moveTo(ripple.x, ripple.y);
      ctx.lineTo(ripple.x + ripple.length, ripple.y);
      ctx.strokeStyle = ripple.color;
      ctx.globalAlpha = ripple.alpha;
      ctx.lineWidth = ripple.thickness;
      ctx.stroke();

      ripple.x += ripple.dx * ripple.speed;
      ripple.y += ripple.dy * ripple.speed;

      ripple.alpha -= 0.003;

      if (ripple.alpha <= 0) ripples.splice(index, 1);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  setInterval(addRipple, 800);
  draw();
}

// Run the animation
createMysticalIdleAnimation("mysticalCanvas");
