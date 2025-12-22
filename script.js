// Punch out center (bright start, gradual hollow)
ctx.save();
ctx.globalCompositeOperation = "destination-out";
ctx.beginPath();

let holeRadius;
if (ripple.radius < 300) {
  // keep hole much smaller so the disk looks bright
  holeRadius = ripple.radius * 0.5;
} else {
  // after 300, hole grows faster to fade out
  holeRadius = ripple.radius * 1.1;
}

// Ensure hole never larger than ripple before 300
if (ripple.radius < 300 && holeRadius >= ripple.radius) {
  holeRadius = ripple.radius - 1;
}

ctx.arc(ripple.x, ripple.y, holeRadius, 0, Math.PI * 2);
ctx.fill();
ctx.restore();
