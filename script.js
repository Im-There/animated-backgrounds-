function draw() {
  // Fade the canvas more gently (less opaque)
  ctx.fillStyle = "rgba(0, 0, 0, 0.02)"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.2,   // inner fade start
      ripple.x, ripple.y, ripple.radius * 2.2    // outer fade end
    );

    // Brighter blues so they stand out
    gradient.addColorStop(0, `rgba(180, 220, 255, ${ripple.alpha})`);   // bright center
    gradient.addColorStop(0.5, `rgba(140, 200, 255, ${ripple.alpha * 0.6})`); // mid fade
    gradient.addColorStop(1, `rgba(100, 180, 255, 0)`); // transparent edge

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Update ripple
    ripple.radius += ripple.growth;
    ripple.alpha -= 0.001;   // fade a bit faster so it’s visible

    if (ripple.alpha <= 0) ripples.splice(index, 1);
  });

  requestAnimationFrame(draw);
}
