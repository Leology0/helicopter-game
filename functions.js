// Draw Start Screen
function drawStart() {
    drawMainComponents();
  
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
  
    ctx.font = "25px Consolas";
    ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
    ctx.fillText("RELEASE TO GO DOWN", 415, 480);
  }
  
  // Draw Game Elements
  function runGame() {
    // Logic
    moveHeli();
    moveWalls();
    checkCollisions();
    // Draw
    drawGame();
  }
  
  function moveHeli() {
    // Accelerate upward if mouse is pressed
    if (mouseIsPressed) {
      heli.speed += -1;
    }
  
  
    // Apply Gravity (accel)
    heli.speed += heli.accel;
  
    // Constrain Speed (max/min)
    if (heli.speed > 5) {
      heli.speed = 5
    } else if (heli.speed < -5) {
      heli.speed = -5
    }
  
    // Move helicopter by its speed
    heli.y += heli.speed
  }
  
  function moveWalls() {
    // Wall 1
    wall1.x += -3
    if (wall1.x + wall1.w < 0) {
      wall1.x = wall3.x + 500;
      wall1.y = Math.random() * 300 + 100
      wall1.speed += wall1.accel
      wall1.x -= wall1.speed
    }
  
    // Wall 2
    wall2.x += -3
    if (wall2.x + wall2.w < 0) {
      wall2.x = wall1.x + 500;
      wall2.y = Math.random() * 300 + 100
      wall2.speed += wall2.accel
      wall2.x -= wall2.speed
      
    }
  
    // Wall 3
    wall3.x += -3
    if (wall3.x + wall3.w < 0) {
      wall3.x = wall2.x + 500;
      wall3.y = Math.random() * 300 + 100
      wall3.speed += wall3.accel
      wall3.x -= wall3.speed
    }
  }
  
  function checkCollisions() {
    // Collision with top and bottom green bars
    if (heli.y < 50) {
      gameOver();
    } else if (heli.y + heli.h > cnv.height - 50) {
      gameOver();
    }
  
    // Check Collision with the walls
    if (heli.y + heli.h >= wall1.y && heli.x + heli.w >= wall1.x && heli.x <= wall1.x + wall1.w && heli.y <= wall1.y + wall1.h) {
      gameOver()
    } else if (heli.y + heli.h >= wall2.y && heli.x + heli.w >= wall2.x && heli.x <= wall2.x + wall2.w && heli.y <= wall2.y + wall2.h) {
      gameOver()
    } else if (heli.y + heli.h >= wall3.y && heli.x + heli.w >= wall3.x && heli.x <= wall3.x + wall3.w && heli.y <= wall3.y + wall3.h) {
      gameOver()
    }
  
    
  }
  
  
  function gameOver() {
    explosion.play();
    state = "gameover";
    setTimeout(reset, 2000);
    clearInterval(intervalId);
    if (score > highScore) {
      highScore = score
    }
    score = 0
  }
  
  
  
  function drawGame() {
    drawMainComponents();
    drawWalls();
  }
  
  // Draw Game Over Screen
  function drawGameOver() {
    drawMainComponents();
    drawWalls();
  
    // Circle around Helicopter
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
  
    // Game Over Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("GAME OVER", 350, 285);
  }
  
  
  // Helper Functions
  function reset() {
    state = "start";
    heli = {
      x: 200,
      y: 250,
      w: 80,
      h: 40,
      speed: 0,
      accel: 0.7,
    };
    wallsArray.push(wall1 = {
      x: cnv.width,
      y: Math.random() * 300 + 100,
      w: 50,
      h: 100,
      speed: 0,
      accel: 1
    });
    wallsArray.push(wall2 = {
      x: cnv.width + 500,
      y: Math.random() * 300 + 100,
      w: 50,
      h: 100,
      speed: 0,
      accel: 1
    });
    wallsArray.push(wall3 = {
      x: cnv.width + 1000,
      y: Math.random() * 300 + 100,
      w: 50,
      h: 100,
      speed: 0,
      accel: 1
    });
    intervalId = window.setInterval(function(){score++}, 17)
  }
  
  function drawWalls() {
    ctx.fillStyle = "green";
    ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
    ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
    ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
  }
  
  function drawMainComponents() {
    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Green Bars
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, cnv.width, 50);
    ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
  
    // Green Bar Text
    ctx.font = "30px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("HELICOPTER GAME", 25, 35);
    ctx.fillText(`DISTANCE: ${score}`, 25, cnv.height - 15);
    ctx.fillText(`BEST: ${highScore}`, cnv.width - 250, cnv.height - 15);
  
    // Helicopter
    ctx.drawImage(heliImg, heli.x, heli.y);
  }