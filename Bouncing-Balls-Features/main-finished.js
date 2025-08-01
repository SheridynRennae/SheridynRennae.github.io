/*
Name: Sheridyn Sharpe
File: main-finished.js
Date: 27 July 2025
A JavaScript file for reference to index-finished.html, the updated bouncing balls webpage.
*/

// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Store a reference to the ball count paragraph.
const para = document.querySelector('p');
// Initialize a count variable for the amount of balls on the canvas.
let ballCount = 0;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = true;
    }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Defines EvilCircle class that extends Shape class.
class EvilCircle extends Shape {
    // Initialize position and properties.
    constructor(x, y) {
        // Pass up values to Shape superclass.
        super(x, y, 20, 20)
        // Set colour of evil circle to white and size to 10 px.
        this.color = "white";
        this.size = 10;

        // Add keydown event to allow movement with computer keys.
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a":
                    this.x -= this.velX;
                    break;
                case "d":
                    this.x += this.velX;
                    break;
                case "w":
                    this.y -= this.velY;
                    break;
                case "s":
                    this.y += this.velY;
                    break;
            }
        });
    }

    // Method to draw the evil circle on the canvas.
    draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    }

    // Method to make sure the evil circle stays on the canvas.
    checkBounds() {
        // If evil circle goes out of bounds, move it back onto the canvas by its radius.
        if (this.x + this.size >= width) {
            this.x -= this.size;
        }

        if (this.x - this.size <= 0) {
            this.x += this.size;
        }

        if (this.y + this.size >= height) {
            this.y -= this.size;
        }

        if (this.y - this.size <= 0) {
            this.y += this.size;
        }   
    }

    // Method to detect overlap/collisions of balls and the evil circle.
    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists) {
                // Calculate distance between the evil circle and each ball.
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Set the ball to not exist if it overlaps with the evil circle.
                if (distance < this.size + ball.size) {
                    ball.exists = false;

                    // Ball counter logic, decrement count when ball no longer exists.
                    ballCount--;
                    // Update the ball count paragraph text on the window.
                    para.textContent = "Ball Count: " + ballCount;
                }
            }
        }        
    }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  // Ball counter logic, increment the count when a new ball is pushed into the Balls array.
  ballCount++;
  // Update the ball count paragraph text on the window.
  para.textContent = "Ball Count: " + ballCount;
}

// Create new evil circle instance, set it to appear at a random location on the canvas.
const evilCircle = new EvilCircle(random(0, width), random(0, height));

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    // If the ball exists, draw, update, and detect collisions each frame.
    if (ball.exists) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
  }  

    // Draw, check the bounds of, and detect collisions of the evil circle every frame.
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();