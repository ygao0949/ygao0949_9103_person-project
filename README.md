# ygao0949_9103_person-project
# Wheels of Fortune Interactive Animation

## Interaction Instructions

User interactions are based on standard mouse events and directly affect individual circles in the animation:

- **Left-click**: Click on a circle to trigger its animation. The circle scales up (expands) and `blendMode(DIFFERENCE)` is applied, creating a color-subtractive overlap effect.  
- **Right-click**: Right-click anywhere on the canvas to reset the sketch. All circles are cleared and regenerated with new colors and positions.  
- **Mouse wheel (scroll)**: Hover over a circle and scroll to increase or decrease its size in real time.  

## Individual Approach

This personal iteration builds on the group codebase but adds distinct interactive and visual features:

- **Interactive color blending**: When clicked, circles enter `DIFFERENCE` blend mode, subtracting their color from overlapping areas to create dynamic visuals.
- **Dynamic color palette**: Each run generates a shuffled color palette for greater unpredictability and variation.
- **Mouse-driven transformation**: Unlike other group members using automated or timed changes, this sketch is fully interactive, allowing users to control circle behavior via mouse.
- **Transparent and layered aesthetic**: The use of blending and overlapping shapes creates a glass-like, layered look, differentiating it from more opaque or static group implementations.

## Animation Driver

The animation is not time-driven but entirely interactive. Mouse inputs—clicks, scrolls, and position—drive all updates in real time, creating a responsive experience where the viewer becomes the driver.

## Animated Properties

- **Scaling**: Circles grow when clicked or resized with the scroll wheel.
- **Rotation**: Each ring continuously rotates in the `show()` method, adding subtle kinetic energy.
- **Blend Mode Activation**: Clicking a circle triggers `blendMode(DIFFERENCE)`, temporarily changing how its color interacts with others.
- **Color Variation**: Circles are styled with shuffled palettes and three visual types: dotted rings, line rings, and concentric rings.
- **Visual Style**: The output has a translucent, interactive quality resembling stained glass, distinct from the group’s baseline version.

## Inspiration

This animation was inspired by both a visual artwork and a generative sketch:

- **Artwork**: *Wheels of Fortune* (1984) by Pacita Abad. The vibrant circular motifs in the painting inspired the radial structure and color-based composition.  
- **Generative Sketch**: A sketch by Mascaria on OpenProcessing ([Sketch ID 2041909](https://openprocessing.org/sketch/2041909)). This reference influenced the overlapping ring forms, dynamic scaling, and interactive structure. It showed how simple geometric repetitions and user-driven interactions can yield complex visual behavior.  

## Technical Explanation

- **ColorfulRing class**: Each circle is an instance of this class and has randomized color patterns and visual types.
- **show() method**: Handles rotation, scaling, and conditional application of `blendMode(DIFFERENCE)` based on mouse clicks.
- **Event Handlers**:
  - `mousePressed()` checks whether the user left- or right-clicked and triggers circle expansion or a canvas reset.
  - `mouseWheel()` allows the user to resize a hovered circle with scroll input.
- **Canvas Resizing**: The canvas adjusts to fit any browser window size using `windowResized()`.

## Code Modification Summary

- `ColorfulRing.js`: Added interaction states, scaling behavior, and blend mode switching.
- `main.js`: Implemented event handlers (`mousePressed`, `mouseWheel`) and logic for user interaction with individual rings.
- The project now distinguishes between passive and active circles and interpolates changes smoothly.

## References

- Abad, P. (1984). *Wheels of Fortune* [Painting]. Pacita Abad Art Estate.  
- OpenProcessing. (n.d.). *Interactive generative sketch* [Sketch ID 2041909]. Retrieved June 13, 2025, from https://openprocessing.org/sketch/2041909  
- p5.js. (n.d.). *blendMode()*. Retrieved from https://p5js.org/reference/#/p5/blendMode  
- p5.js. (n.d.). *mouseWheel()*. Retrieved from https://p5js.org/reference/#/p5/mouseWheel  
