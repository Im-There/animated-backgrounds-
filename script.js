<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ripple Animation</title>
  <style>
    body {
      margin: 0;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="rippleCanvas"></canvas>

  <script>
    const canvas = document.getElementById("rippleCanvas");
    const ctx = canvas.getContext("2d");

    // Fullscreen canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let phase = 0;

    function drawRipple() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "hsl(260, 70%, 60%)"; // purple tone

      const amplitude = 50;   // height of wave
      const frequency = 0.02; // number of waves across width
      const baseline = canvas.height / 2; // center line

      // Draw sine wave across the screen
      for (let x = 0; x <= canvas.width + 50; x++) {
        const y = baseline + Math.sin(x * frequency + phase) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();

      // Glow effect
      ctx.strokeStyle = "hsla(260, 70%, 60%, 0.3)";
      ctx.lineWidth = 8;
      ctx.stroke();

      // Animate phase shift
      phase += 0.05;

      requestAnimationFrame(drawRipple);
    }

    drawRipple();

    // Handle window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  </script>
</body>
</html>
