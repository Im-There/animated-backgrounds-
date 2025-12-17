function draw() {
  // Fade the canvas gently
  ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.2,   // inner fade start
      ripple.x, ripple.y, ripple.radius * 3.0    // outer fade end (larger for smoother transition)
    );

    // Brighter blues fading completely into transparent
    gradient.addColorStop(0, `rgba(180, 220, 255, ${ripple.alpha})`);
    gradient.addColorStop(0.5, `rgba(140, 200, 255, ${ripple.alpha * 0.5})`);
    gradient.addColorStop(1, `rgba(100, 180, 255, 0)`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Update ripple
    ripple.radius += ripple.growth;
    ripple.alpha -= 0.0007;   // slower fade → lasts longer

    // Only remove ripple once it's both invisible AND large enough
    if (ripple.alpha <= 0 && ripple.radius > canvas.width * 0.5) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}
