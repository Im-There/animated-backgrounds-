function draw() {
  // Fade the canvas slightly instead of clearing completely
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // darker background, slower fade
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.3,   // inner fade start
      ripple.x, ripple.y, ripple.radius * 2.5    // outer fade end (larger for smoother transition)
    );

    // Light blues fading completely into transparent
    gradient.addColorStop(0, `rgba(220, 245, 255, ${ripple.alpha * 0.9})`);
    gradient.addColorStop(0.5, `rgba(170, 220, 255, ${ripple.alpha * 0.4})`);
    gradient.addColorStop(1, `rgba(120, 180, 255, 0)`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Update ripple
    ripple.radius += ripple.growth;   // slower expansion
    ripple.alpha -= 0.0005;           // much slower fade → lasts longer

    if (ripple.alpha <= 0) ripples.splice(index, 1);
  });

  requestAnimationFrame(draw);
}
