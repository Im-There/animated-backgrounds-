function createSineWaveAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  let phase = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "hsl(260, 70%, 60%)"; // purple tone

    const amplitude = 50;   // height of wave
    const frequency = 0.02; // number of waves across width
    const baseline = canvas.height / 2; // center line

    for (let x = 0; x <= canvas.width + 50; x++) {
      const y = baseline + Math.sin(x * frequency + phase) * amplitude;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();

    // Glow effect around wave
    ctx.strokeStyle = "hsla(260, 70%, 60%, 0.3)";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Animate phase shift
    phase += 0.05;

    requestAnimationFrame(draw);
  }

  draw();
}

// Run the animation
createSineWaveAnimation("mysticalCanvas");
