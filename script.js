function draw() {
  // Instead of full clear, fade the canvas slightly
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // dark background with slight transparency
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.4,
      ripple.x, ripple.y, ripple.radius * 2.0
    );

    gradient.addColorStop(0, `rgba(220, 245, 255, ${ripple.alpha * 0.9})`);
    gradient.addColorStop(0.5, `rgba(170, 220, 255, ${ripple.alpha * 0.5})`);
    gradient.addColorStop(1, `rgba(120, 180, 255, 0)`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ripple.radius += ripple.growth;
    ripple.alpha -= 0.0015;

    if (ripple.alpha <= 0) ripples.splice(index, 1);
  });

  requestAnimationFrame(draw);
}
