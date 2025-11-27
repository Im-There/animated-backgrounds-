function createWaterWaveAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const ripples = [];

  // Watery bluish-purple tones
  function randomWaterColor() {
    const hue = 240 + Math.random() * 30; // blue-purple range
    const saturation = 60 + Math.random() * 20;
    const lightness = 40 + Math.random() * 20;
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
      thickness: 1.5,
      color: randomWaterColor(),
      alpha: 0.9,
      wavePhase: Math.random() * Math.PI * 2,
      frequency: Math.random() * 0.1 + 0.05, // controls wave oscillation
      amplitude: Math.random() * 3 + 2       // controls ripple distortion
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ripples.forEach((ripple, index) => {
      ctx.beginPath();

      const steps = 180; // high resolution for smoothness
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;

        // Sinusoidal distortion for water-like ripples
        const distortion = Math.sin(angle * 12 + ripple.wavePhase + ripple.radius * ripple.frequency) * ripple.amplitude;
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

      // Soft watery glow
      const gradient = ctx.createRadialGradient(
        ripple.x, ripple.y, ripple.radius * 0.7,
        ripple.x, ripple.y, ripple.radius * 1.6
      );
      gradient.addColorStop(0, `${ripple.color.replace("hsl", "hsla").replace(")", ",0.25)")}`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Expansion
      ripple.radius += ripple.growth;

      // Fade out gradually
      ripple.alpha -= 0.004;
      if (ripple.alpha <= 0) ripples.splice(index, 1);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  setInterval(addRipple, 1000); // natural pacing
  draw();
}

// Run the animation
createWaterWaveAnimation("mysticalCanvas");
