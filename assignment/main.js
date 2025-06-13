let colorfulRings = []; // Store all colorful ring objects

let canvasSize = 1000; // Base canvas size used for scaling
let canvasScale = 1; // Scaling factor based on canvas resizing
let ringNumbers = 100; // Maximum number of rings to generate randomly
let minRadius = canvasSize * 0.2; // Minimum possible radius for generated rings
let maxRadius = canvasSize * 0.8; // Maximum possible radius for generated rings
let maxAttempts = 100000; // Maximum number of attempts to place non-overlapping rings
let lineWeight = 4; // Stroke weight for ring outlines
let c1, c2; // Two base colors used for background gradient

function setup() {
  createCanvas(canvasSize, canvasSize, P2D);
  windowResized();
  generateRandomRings();
  c1 = color(183, 96, 178, 255); 
  c2 = color(37, 88, 109); 
}

function draw() {
  let amt = map(sin(frameCount * 0.01), -1, 1, 0, 1);
  let bg = lerpColor(c1, c2, amt);
  background(bg);

  showAllRings();
  // Dynamic gradient background using sin() and lerpColor() with frameCount for looping effect
  // Inspired by community generative examples and official p5.js functions
  // References:
  // https://p5js.org/reference/p5/sin/
  // https://p5js.org/reference/p5/map/
  // https://p5js.org/reference/p5/lerpColor/
  // https://p5js.org/reference/p5/frameCount/
}

// Resize the canvas when the window is resized, keeping it square (1:1 aspect ratio)
// Based on the smaller side of the window to maintain layout consistency
// Reference: https://p5js.org/reference/p5/windowResized/
//            https://p5js.org/reference/p5/resizeCanvas/
function windowResized() {
  let minWinSize = min(windowWidth, windowHeight);
  resizeCanvas(minWinSize, minWinSize);
  canvasScale = minWinSize / canvasSize;
}

// Randomly generate non-overlapping circles with varying positions and sizes
function generateRandomRings() {
  let attempts = 0;
  colorfulRings = [];
  // Continue until the target number of rings is reached or max attempts is hit
  while (colorfulRings.length < ringNumbers && attempts < maxAttempts) {
    // Generate random position and radius
    let x = random(canvasSize);
    let y = random(canvasSize);
    let size = random(minRadius, maxRadius);

    let overlapping = false;
    // Check overlap with previously placed rings
    for (let other of colorfulRings) {
      // Use dist() to calculate distance between ring centers
      // https://p5js.org/reference/#/p5/dist
      let d = dist(x, y, other.xpos, other.ypos);
      if (d < size * 0.25 + other.size * 0.25) {
        overlapping = true;
        break;
      }
    }

    // If not overlapping, add to array; else increment attempt counter
    if (!overlapping) {
      colorfulRings.push(new ColorfulRing(x, y, size));
    } else {
      attempts++;
    }
  }
}

// Display all rings with animated rotation and scaling
function showAllRings() {
  for (let i = 0; i < colorfulRings.length; i++) {
    let ring = colorfulRings[i];

    // Animate rotation and scaling using sine waves based on frameCount
    let rot = sin(frameCount * 0.01 + i) * 0.5;
    let scaleFactor = 0.9 + 0.1 * sin(frameCount * 0.02 + i * 2);

    ring.show(rot, scaleFactor);
  }
  // This animation uses sin() and frameCount to create smooth, rhythmic motion.
  // These techniques were not covered in class.
  // References: https://p5js.org/reference/p5/sin/
  // References: https://p5js.org/reference/p5/frameCount/
}

// Detect if the user has clicked on any ring
function mousePressed() {
  if (mouseButton === LEFT) {
    for (let ring of colorfulRings) {
      // Calculate distance between mouse position and ring center (scaled)
      let dis = dist(
        mouseX,
        mouseY,
        ring.xpos * canvasScale,
        ring.ypos * canvasScale
      );
      // If mouse is within the radius, trigger click response
      if (dis < ring.size * canvasScale * 0.25) {
        ring.onMouseClicked();
      }
    }
  } else if (mouseButton === RIGHT) {
    // Right-click: regenerate all rings
    generateRandomRings();
  }
  // This interaction uses mouseButton to detect left/right clicks
  // and dist() to determine whether a ring is clicked
  // RIGHT click behavior usage were not covered in class
  // Reference: https://p5js.org/reference/p5/mouseButton/
}

// Use mouse wheel to scale the ring under the cursor
// Scroll up to enlarge, scroll down to shrink
// Reference: https://p5js.org/reference/p5/mouseWheel/
function mouseWheel(event) {
  // Calculate distance between cursor and ring center
  for (let ring of colorfulRings) {
    let dis = dist(
      mouseX,
      mouseY,
      ring.xpos * canvasScale,
      ring.ypos * canvasScale
    );
    // Only affect the ring if the cursor is within its area
    if (dis < ring.size * canvasScale * 0.25) {
      if (event.delta < 0) {
        ring.size *= 1.02; // Scroll up to enlarge
      } else {
        ring.size *= 0.98; // Scroll down to shrink
      }
    }
  }

  return false; // Prevent default page scrolling
}

