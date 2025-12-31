function draw() {
  // Always draw on top of solid black background
  ctx.globalCompositeOperation = "source-over";

  // IMPORTANT: Do NOT clear the canvas here.
  // Just draw ripples on top of the existing black background.

  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];

    // Create glowing gradient
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.2,
      ripple.x, ripple.y, ripple.radius * 3.0
    );
    gradient.addColorStop(0,  `rgba(220,240,255,${ripple.alpha * 0.9})`);
    gradient.addColorStop(0.5,`rgba(160,210,255,${ripple.alpha * 0.6})`);
    gradient.addColorStop(1,  `rgba(120,190,255,0)`);

    // Draw ripple glow
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Punch out center hole
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    let holeRadius = ripple.radius < 300
      ? ripple.radius * 0.9
      : ripple.radius * (1.0 + (ripple.radius - 300) * 0.05);
    ctx.arc(ripple.x, ripple.y, holeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Update ripple properties
    ripple.radius += ripple.radius < 300 ? ripple.growth * 0.25 : ripple.growth * 0.01;
    ripple.alpha -= ripple.fade;

    // Remove faded ripple
    if (ripple.alpha <= 0 && ripple.radius >= 300) {
      ripples.splice(i, 1);
    }
  }

  requestAnimationFrame(draw);
}
