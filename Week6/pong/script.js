// Grab the canvas from the page and the 2D context we use to draw on it
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Settings for the ball
let startSpeed = 6;    // how fast the ball moves when a point starts
let speedUp = 1;       // added to the ball's speed every time a paddle hits it
let maxSpeed = 20;     // the ball never goes faster than this, otherwise it could jump right past a paddle
let serveAngle = 75;   // the serve is aimed randomly within this many degrees

// Make each paddle's hitbox this many pixels taller on the top and bottom
// so hits right on the edge still count
let hitboxExtra = 5;

// Settings for the paddles
let paddleStartSpeed = 4;   // how fast a paddle moves as soon as you press the key
let paddleSpeedUp = 1.05;   // every frame you hold the key, the speed is multiplied by this
let paddleMaxSpeed = 14;    // paddles never go faster than this

// Sounds for game
var scoreSound = new Audio("score.mp3");
var hittingSound = new Audio("hitBall.mp3");
var winningSound = new Audio("winSound.mp3");


// The ball
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 15,
  height: 15,
  speedX: startSpeed,
  speedY: 4,
  color: "yellow"
};

// Left paddle (Player 1)
let leftPaddle = {
  x: 30,
  y: 250,
  width: 15,
  height: 100,
  speed: paddleStartSpeed,
  score: 0,
  color: "white"
};

// Right paddle (Player 2)
let rightPaddle = {
  x: canvas.width - 45,
  y: 250,
  width: 15,
  height: 100,
  speed: paddleStartSpeed,
  score: 0,
  color: "white"
};

// true while that key is being held down
let wPressed = false;
let sPressed = false;
let upPressed = false;
let downPressed = false;

// false when the game is paused or hasn't started yet
let playing = false;

// First to 11 wins, but you have to win by 2
let winScore = 11;
let winBy = 2;
let gameOver = false;
let winnerText = "";

// Returns true if the ball is overlapping the paddle.
// It compares the edges of the two rectangles, so it works for either paddle.
function ballHitsPaddle(paddle) {
  return ball.x < paddle.x + paddle.width &&
         ball.x + ball.width > paddle.x &&
         ball.y < paddle.y + paddle.height + hitboxExtra &&
         ball.y + ball.height > paddle.y - hitboxExtra;
}

// Moves a paddle up or down depending on which keys are held.
// The longer you hold a key, the faster the paddle moves.
function movePaddle(paddle, upHeld, downHeld) {
  if (upHeld && paddle.y > 0) {
    paddle.y -= paddle.speed;
  }
  if (downHeld && paddle.y < canvas.height - paddle.height) {
    paddle.y += paddle.speed;
  }

  // If the paddle went past the top or bottom, put it back on the edge
  if (paddle.y < 0) {
    paddle.y = 0;
  }
  if (paddle.y > canvas.height - paddle.height) {
    paddle.y = canvas.height - paddle.height;
  }

  if (upHeld || downHeld) {
    // A key is held, so speed the paddle up a little (up to the limit)
    paddle.speed *= paddleSpeedUp;
    if (paddle.speed > paddleMaxSpeed) {
      paddle.speed = paddleMaxSpeed;
    }
  } else {
    // No key is held, so reset the speed for next time
    paddle.speed = paddleStartSpeed;
  }
}

// Draws a filled rectangle for anything with x, y, width, height and color
function drawObject(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

// Puts the ball back in the middle and serves it.
// direction is "left" or "right", the way the ball should go.
function resetBall(direction) {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;

  // Pick a random angle. With serveAngle = 75 that's anywhere from -37.5 to 37.5 degrees.
  // 0 is straight across, negative aims up, positive aims down.
  let angle = Math.random() * serveAngle - serveAngle / 2;

  // Convert to radians because Math.cos and Math.sin use radians
  let radians = angle * Math.PI / 180;

  // Use the angle to split the speed into left/right and up/down movement
  ball.speedX = Math.cos(radians) * startSpeed;
  ball.speedY = Math.sin(radians) * startSpeed;

  // That math always sends the ball right, so flip it if it should go left
  if (direction == "left") {
    ball.speedX = -ball.speedX;
  }
}

// Returns true if this player would win by scoring the next point
function isMatchPoint(player, other) {
  return player.score + 1 >= winScore && player.score + 1 - other.score >= winBy;
}

// Returns true if this player has enough points and is ahead by enough to win
function hasWon(player, other) {
  return player.score >= winScore && player.score - other.score >= winBy;
}

// Runs whenever someone scores.
// scorer is the paddle that got the point, other is the one that didn't.
// scorerSide is "left" or "right".
function pointScored(scorer, other, scorerSide) {
  scorer.score++;
  scoreSound.play();

  // If that point won the game, stop and show who won
  if (hasWon(scorer, other)) {
    winningSound.play()
    gameOver = true;
    playing = false;
    if (scorerSide == "left") {
      winnerText = "Player 1 wins!";
    } else {
      winnerText = "Player 2 wins!";
    }
    return;
  }

  // Usually the ball is served toward the player who just lost the point
  let direction;
  if (scorerSide == "left") {
    direction = "right";
  } else {
    direction = "left";
  }

  // On match point the ball is served toward the player who is ahead instead
  if (isMatchPoint(leftPaddle, rightPaddle)) {
    direction = "left";
  }
  if (isMatchPoint(rightPaddle, leftPaddle)) {
    direction = "right";
  }

  resetBall(direction);
}

// Resets the scores and serves to start a new game
function newGame() {
  leftPaddle.score = 0;
  rightPaddle.score = 0;
  gameOver = false;
  resetBall("right");
}

// Moves everything one step and checks for bounces and points
function update() {
  // Move the paddles
  movePaddle(leftPaddle, wPressed, sPressed);
  movePaddle(rightPaddle, upPressed, downPressed);

  // Move the ball
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // If the ball hits the top or bottom, reverse its up/down direction
  if (ball.y < 0 || ball.y > canvas.height - ball.height) {
    ball.speedY *= -1;
  }

  // Ball hits the left paddle while moving left: send it back right
  if (ballHitsPaddle(leftPaddle) && ball.speedX < 0) {
    ball.speedX = -ball.speedX + speedUp;   // reverse it and add a little speed
    hittingSound.play();
    if (ball.speedX > maxSpeed) {
      ball.speedX = maxSpeed;
    }
  }

  // Ball hits the right paddle while moving right: send it back left
  if (ballHitsPaddle(rightPaddle) && ball.speedX > 0) {
    ball.speedX = -ball.speedX - speedUp;   // reverse it and add a little speed
    hittingSound.play();
    if (ball.speedX < -maxSpeed) {
      ball.speedX = -maxSpeed;
    }
  }

  // The ball went off the left edge, so Player 2 gets the point
  if (ball.x < 0) {
    pointScored(rightPaddle, leftPaddle, "right");
  }

  // The ball went off the right edge, so Player 1 gets the point
  if (ball.x > canvas.width) {
    pointScored(leftPaddle, rightPaddle, "left");
  }
}

// Draws the whole screen for the current frame
function draw() {
  // Fill the screen with black to erase the last frame
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gray line down the middle (gray so the ball is still easy to see on it)
  ctx.fillStyle = "gray";
  ctx.fillRect(canvas.width / 2 - 2, 0, 4, canvas.height);

  // Draw the paddles and the ball
  drawObject(leftPaddle);
  drawObject(rightPaddle);
  drawObject(ball);

  // Draw the scores. textAlign "center" centers the text on the x position.
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText(leftPaddle.score, canvas.width / 4, 70);
  ctx.fillText(rightPaddle.score, canvas.width * 3 / 4, 70);

  // Show "MATCH POINT" when either player is one point from winning
  if (!gameOver && (isMatchPoint(leftPaddle, rightPaddle) || isMatchPoint(rightPaddle, leftPaddle))) {
    ctx.font = "30px Arial";
    ctx.fillText("MATCH POINT", canvas.width / 2, 120);
    ctx.font = "50px Arial";
  }

  // Show the winner, or the start message when the game is paused
  if (gameOver) {
    ctx.fillText(winnerText, canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillText("Press Space to play again", canvas.width / 2, canvas.height / 2 + 40);
  } else if (!playing) {
    ctx.fillText("Press Space", canvas.width / 2, canvas.height / 2);
  }
}

// Runs at 60 fps
function gameLoop() {
  if (playing) {
    update();
  }
  draw();
}

setInterval(gameLoop, 1000 / 60);

// When a key is pressed, remember that it's held down.
// Space starts or pauses the game, and starts a new one after someone wins.
document.addEventListener("keydown", function (event) {
  if (event.key == "w") wPressed = true;
  if (event.key == "s") sPressed = true;
  if (event.key == "ArrowUp") upPressed = true;
  if (event.key == "ArrowDown") downPressed = true;
  if (event.key == " ") {
    if (gameOver) {
      newGame();
    }
    playing = !playing;
  }

  // Stop the arrow keys and space from scrolling the page
  if (event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == " ") {
    event.preventDefault();
  }
});

// When a key is let go, mark it as not held anymore
document.addEventListener("keyup", function (event) {
  if (event.key == "w") wPressed = false;
  if (event.key == "s") sPressed = false;
  if (event.key == "ArrowUp") upPressed = false;
  if (event.key == "ArrowDown") downPressed = false;
});