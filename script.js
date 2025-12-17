function addRipple() {
  let x, y;

  // 70% chance random position, 30% chance corners
  if (Math.random() < 0.7) {
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
  } else {
    const corner = Math.floor(Math.random() * 4);
    if (corner === 0) { x = 0; y = 0; }                          // top-left
    if (corner === 1) { x = canvas.width; y = 0; }               // top-right
    if (corner === 2) { x = 0; y = canvas.height; }              // bottom-left
    if (corner === 3) { x = canvas.width; y = canvas.height; }   // bottom-right
  }

  ripples.push({
    x,
    y,
    radius: 0,
    alpha: 1,
    growth: 0.5,   // slower expansion speed
    thickness: 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    // Radial gradient for smooth blending
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.4,   // inner fade start
      ripple.x, ripple.y, ripple.radius * 2.0    // outer fade end (extended for smoother transition)
    );

    // Light blues fading completely into transparent
    gradient.addColorStop(0, `rgba(220, 245, 255, ${ripple.alpha * 0.9})`); // bright center
    gradient.addColorStop(0.5, `rgba(170, 220, 255, ${ripple.alpha * 0.5})`); // mid fade
    gradient.addColorStop(1, `rgba(120, 180, 255, 0)`); // fully transparent edge

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Update ripple
    ripple.radius += ripple.growth;   // slower expansion
    ripple.alpha -= 0.0015;           // slower fade → lasts longer

    if (ripple.alpha <= 0) ripples.splice(index, 1);
  });

  requestAnimationFrame(draw);
}
