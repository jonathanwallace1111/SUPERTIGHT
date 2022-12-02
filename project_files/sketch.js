let ball, gameObject, statsBoard, deltaTime, prevTime, timer, now;
let laserSound;

function preload() { 
    laserSound = loadSound("sounds/leisure_video_game_retro_laser_gun_fire_001.mp3"); 
}

function setup() {
    createCanvas(750, 660);
    pixelDensity(1); 

    prevTime = new Date();
    deltaTime = 0;
    timer = 0;

    gameObject = new GameObject();
    gameObject.deltaTime = .016 
    ball = new Ball();
    ball.state.firstBall = true;
    gameObject.ballArr.push(ball); 
    statsBoard = new StatsBoard(); 
}

function draw() { 
    if (gameObject.deltaTime === null) { 
        deltaTime === .016; //1000 / frameRate() / 1000; 
    } else {
        now = new Date();
        deltaTime = (now.getTime() - prevTime.getTime()) / 1000;
        prevTime = new Date(); 
        timer += deltaTime; 
    }

//I need a conditional that checks if gameObject.state.gameInProgress. If so, run code below. (cont'd)
//eventually, I need to write the code for if the game is paused or there is a game over. 
    gameObject.state.deltaTime = deltaTime; 
    gameObject.update(); 
    gameObject.draw();

    statsBoard.draw(gameObject.stats); 
}

function keyPressed() {    
    let gs = gameObject.state; 
    if (keyCode === 32 && gs.gameInProgress === false) {
        gameObject.startGame(); 
    } else if (keyCode === 32 && gs.gameInProgress === true) {
        gameObject.pauseOrUnpauseGame(); 
    }
    // laserSound.play();  
}