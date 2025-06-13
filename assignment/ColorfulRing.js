class ColorfulRing {
  constructor(x, y, size) {
    this.xpos = x; // The x-position of the ring center
    this.ypos = y; // The y-position of the ring center
    this.size = size; // The base diameter of the ring

    this.clicked = false; // A flag to check whether this ring has been clicked
    this.increaseSpeed = random(2, 4); // increase speed


    // Randomly shuffle the order of ring types to add variation in how each ring is rendered
    // This creates a dynamic and less predictable composition each time the sketch runs
    this.typeOrder = shuffle([1, 2, 3]);
    // Randomly shuffle the color palette so that each ring gets a different color scheme
    // This randomness improves visual diversity and generative aesthetics
    // Source: https://p5js.org/reference/p5/shuffle/
    this.colorPatterns = shuffle([
      " #1d1f73",
      " #3e9189",
      " #57b652",
      " #7eafcb",
      " #d7442a",
      " #de76be",
      " #e78e43",
      " #e1c162",
      " #3e0707",
    ]);
  }

  // Display visual elements with optional rotation and scaling
  show(rotation = 0, scaleFactor = 1) {
    // If the ring is clicked, increase its size and apply blend effect
    if (this.clicked) {
      this.size += this.increaseSpeed;
      blendMode(DIFFERENCE);
    }

    push();
    translate(this.xpos * canvasScale, this.ypos * canvasScale);
    rotate(rotation); // Apply rotation
    scale(scaleFactor); // Apply scaling

    // Draw multiple circle layers based on shuffled type order
    for (let i = 0; i < this.typeOrder.length; i++) {
      let scaling = 1 - (i + 1) / this.typeOrder.length;
      let size = this.size * canvasScale * scaling;
      let type = this.typeOrder[i];
      if (type === 1) {
        this.drawType1Circle(size);
      } else if (type === 2) {
        this.drawType2Circle(size);
      } else if (type === 3) {
        this.drawType3Circle(size);
      }
    }
    pop();

    blendMode(BLEND);// Restore default blend mode
    // This function uses push/pop, rotate(), scale(), and blendMode() to create layered visual effects
    // The blend mode creates a strong visual feedback when a ring is clicked
    // These techniques go beyond basic course content
    // References:https://p5js.org/reference/p5/blendMode/
  }

  // Draw type-1 circle (spotted circle effect)
  drawType1Circle(s) {
    // Draw background base
    stroke(this.colorPatterns[1]);
    strokeWeight(lineWeight);
    fill(this.colorPatterns[0]);
    circle(0, 0, s);

    // Draw concentric spot rings from inside to outside
    noStroke();
    fill(this.colorPatterns[1]);

    let r = s / 2;
    let sapcing = s * 0.04; // Distance between rings
    if (sapcing <= 0) return;
    let circleNum = ceil(r / sapcing); // Number of concentric rings
    let spotNum = s * 0.2; // Number of spots per ring (scaled by size)
    let spotDt = TWO_PI / spotNum; // Angular interval between spots
    let offset = 0; // Angular offset between rings
    let offsetDt = s * 0.1;

    // Calculate the position of each spot and draw it
    for (let i = 0; i < circleNum - 1; i++) {
      offset += offsetDt;
      for (let j = 0; j < spotNum; j++) {
        let angle = j * spotDt + offset;
        let raduis = i * sapcing;

        let spotX = raduis * cos(angle);
        let spotY = raduis * sin(angle);
        circle(spotX, spotY, s * 0.03);
      }
    }
  }

  // Draw type-2 circle (radial line effect)
  drawType2Circle(s) {
    // Draw background base
    stroke(this.colorPatterns[2]);
    strokeWeight(lineWeight);
    fill(this.colorPatterns[1]);
    circle(0, 0, s);

    // Calculate radial lines inside the circle
    let lineNum = s * 0.3; // Number of radial lines 
    let lineDt = TWO_PI / lineNum; // Angular step between lines
    let linePath = []; // Store endpoints of each line
    let innerRadius = s * 0.25; 
    let outterRadius = s * 0.45; 

    for (let i = 0; i < lineNum; i++) {
      let angle = i * lineDt;

      let innerx = innerRadius * cos(angle);
      let innery = innerRadius * sin(angle);
      let outterx = outterRadius * cos(angle);
      let outtery = outterRadius * sin(angle);

      linePath.push({ x: innerx, y: innery });
      linePath.push({ x: outterx, y: outtery });
    }

    // Draw lines inside the circle
    stroke(this.colorPatterns[2]);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let pt of linePath) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

    // Positioning with polar coordinates and custom shape rendering
    // inspired by generative art and p5.js examples using beginShape()
    // Reference: https://p5js.org/reference/p5/beginShape/
    // Reference: https://p5js.org/reference/p5/endShape/
    // Reference: https://p5js.org/reference/p5/vertex/
  }

  // Draw type-3 circle (concentric ring effect)
  drawType3Circle(s) {
    // Draw background base
    stroke(this.colorPatterns[3]);
    strokeWeight(lineWeight);
    fill(this.colorPatterns[2]);
    circle(0, 0, s);

    // Draw concentric rings
    let sapcing = s * 0.1; // Spacing between rings
    if (sapcing <= 0) return;
    let circleNum = round(s / sapcing); // Number of concentric rings

    for (let i = circleNum - 1; i >= 0; i--) {
      let raduis = i * sapcing;
      let c = i % 2 === 0 ? this.colorPatterns[3] : this.colorPatterns[2];
      noStroke();
      fill(c);
      circle(0, 0, raduis);
    }
  }
  // Set the clicked flag to true when the ring is clicked
  onMouseClicked() {
    this.clicked = true;
  }
}

