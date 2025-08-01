/*
Name: Sheridyn Sharpe
File: main.js
Date: 25 July 2025
A JavaScript file for reference to index.html, the bouncing balls webpage.
*/

// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball class with constructor that implements the properties of each ball object.
class Ball {
  constructor(x, y, velX, velY, color, size) {
    // x and y coordinates where ball starts on canvas.
    this.x = x;
    this.y = y;
    // horizontal and vertical velocity of ball.
    this.velX = velX;
    this.velY = velY;
    // color of ball.
    this.color = color;
    // size of ball (in pixels)
    this.size = size;
  }

  // Method to draw ball onto canvas.
   draw() {
    // Send context to the canvas to draw new shape.
    ctx.beginPath();
    // Set fill colour of shape (ball).
    ctx.fillStyle = this.color;
    // Draw a circle at specified position with specified radius and angle of 360°.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // Fill circle with colour.
    ctx.fill();
  }

  // Update the animation of the ball to stay within the window.
  update() {
    // If ball hits the edge of window, reverse the velocity to make ball travel in opposite direction.
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    // Add new velocity to coordinate to move ball.
    this.x += this.velX;
    this.y += this.velY;
  }
}

// Initiailize array to store balls.
const balls = [];

// While array contains less than 25 balls, create new ball instance and add to end of array.
while (balls.length < 25) {
  // Pick random number for radius of ball.
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    // Set vertical and horizontal velocity.
    random(-7, 7),
    random(-7, 7),
    // Set random colour.
    randomRGB(),
    // Finally, size from earlier.
    size,
  );

  // Add new instance to the end of ball array.
  balls.push(ball);
}

// Prep the canvas with specified values, update and loop the animation.
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  // Loop through each ball in the balls array and draw on canvas.
  for (const ball of balls) {
    ball.draw();
    ball.update();
  }

  // Loop function again before updating canvas for smooth animation.
  requestAnimationFrame(loop);
}

// Call function to start animation.
loop();
