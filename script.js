<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ripple Pond Animation</title>
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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ripples = [];

    function addRipple() {
      let x, y;

      // 70% chance center, 30% chance edges
      if (Math.random() < 0.7) {
        x = canvas.width / 2;
        y = canvas.height / 2;
      } else {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { x = Math.random() * canvas.width; y = 0; }
        if (edge === 1) { x = canvas.width; y = Math.random() * canvas.height; }
        if (edge === 2) { x = Math.random() * canvas.width; y = canvas.height; }
        if (edge === 3) { x = 0; y = Math.random() * canvas.height; }
      }

      ripples.push({
        x,
        y,
        radius: 0,
        alpha: 1,
        growth: 0.8,   // slower expansion speed
        thickness: 4
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.forEach((ripple, index) => {
        // Main ripple line
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(260, 70%, 60%, ${ripple.alpha})`;
        ctx.lineWidth = ripple.thickness;
        ctx.stroke();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(260, 70%, 60%, ${ripple.alpha * 0.2})`;
        ctx.lineWidth = ripple.thickness * 0.5;
        ctx.stroke();

        // Update ripple
        ripple.radius += ripple.growth;   // slower growth
        ripple.alpha -= 0.01;             // fade gradually

        if (ripple.alpha <= 0) ripples.splice(index, 1);
      });

      requestAnimationFrame(draw);
    }

    // Spawn ripples slower (every 2.5 seconds instead of 1 second)
    setInterval(addRipple, 2500);
    draw();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  </script>
</body>
</html>
