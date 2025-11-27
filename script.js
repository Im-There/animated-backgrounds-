function createMysticalIdleAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const ripples = [];

  // Generate dark matte purple shades
  function randomDarkPurple() {
    const hue = 270; // purple hue
    const saturation = Math.floor(Math.random() * 20 + 40); // 40–60% muted
    const lightness = Math.floor(Math.random() * 20 + 15); // 15–35% dark tones
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  function addRipple() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    ripples.push({
      x,
      y,
      radius: 0,
      growth: Math.random() * 1.5 + 0.5,
      thickness: Math.random() * 2 + 1,
      color: randomDarkPurple(),
      alpha: 1,
      wobble: Math.random() * 0.2 + 0.05 // irregular edge distortion
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ripple interactions: flow through but slow down
    for (let i = 0; i < ripples.length; i++) {
      const r1 = ripples[i];
      for (let j = i + 1; j < ripples.length; j++) {
        const r2 = ripples[j];
        const dx = r1.x - r2.x;
        const dy = r1.y - r2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < r1.radius + r2.radius) {
          r1.growth = Math.max(0.1, r1.growth * 0.95);
          r2.growth = Math.max(0.1, r2.growth * 0.95);
        }
      }
    }

    // Draw ripples
    ripples.forEach((ripple, index) => {
      ctx.beginPath();

      // Organic ripple: draw distorted circle
      const steps = 64; // resolution of the ripple edge
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const distortion = Math.sin(angle * 6 + ripple.radius * ripple.wobble) * 3; 
        const r = ripple.radius + distortion;
        const px = ripple.x + r * Math.cos(angle);
        const py = ripple.y + r * Math.sin(angle);

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.closePath();
      ctx.strokeStyle = ripple.color;
      ctx.lineWidth = ripple.thickness;
      ctx.globalAlpha = ripple.alpha;
      ctx.stroke();

      // Aura effect (matte glow)
      const gradient = ctx.createRadialGradient(
        ripple.x, ripple.y, ripple.radius * 0.8,
        ripple.x, ripple.y, ripple.radius * 1.3
      );
      gradient.addColorStop(0, ripple.color);
      gradient.addColorStop(1, "rgba(0,0,0,0.4)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Expansion
      ripple.radius += ripple.growth;

      // Fade only when large enough
      if (ripple.radius > canvas.width * 0.5) {
        ripple.alpha -= 0.01;
      }

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
