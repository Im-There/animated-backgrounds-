function addRipple() {
  let x, y;

  // 70% chance random position, 30% chance corners
  if (Math.random() < 0.7) {
    // anywhere on the canvas
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
  } else {
    // pick one of the four corners
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
    growth: 0.6,   // slower expansion speed
    thickness: 2
  });
}
