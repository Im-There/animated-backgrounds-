function draw() {
  // Darker background fade for contrast
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.1,
      ripple.x, ripple.y, ripple.radius * 4.0
    );

    gradient.addColorStop(0, `rgba(220, 240, 255, ${ripple.alpha})`);
    gradient.addColorStop(0.4, `rgba(160, 210, 255, ${ripple.alpha * 0.7})`);
    gradient.addColorStop(1, `rgba(120, 190, 255, 0)`);

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Update ripple
    ripple.radius += ripple.growth;
    ripple.alpha -= 0.002; // faster fade

    // Remove when invisible and large enough
    if (ripple.alpha <= 0 && ripple.radius > canvas.width * 0.5) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}
