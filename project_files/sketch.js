let ball, gameObject, statsBoard, deltaTime, prevTime, timer, now;

//Eventually I need to add a Start Game button (also restart) (cont'd)
//a backtomenu button.. I guess I should make a menu too. 
function setup() {
    createCanvas(750, 600);
    pixelDensity(1); 

    //Putting delta time logic in sketch.js for now. It might work better (cont'd)
    //in the game object, but for now I'm doing it here. 

    prevTime = Date();
    deltaTime = 0;
    timer = 0;

    gameObject = new GameObject();
    gameObject.
    ball = new Ball();
    gameObject.ballArr.push(ball); 
    statsBoard = new StatsBoard(); 
}

function draw() {
    //This if statement is just to ensure that nothing weird happens in the very first (cont'd)
    //loop before a good delta time exists. 
    if (gameObject.deltaTime === null) {
        gameObject.deltaTime = 1000 / frameRate()
    }
    now = Date();
    deltaTime = now - prevTime;
    prevTime = Date(); 
    timer += deltaTime; 

    //then youll say ball.x += velocity * delta time

    gameObject.deltaTime = deltaTime; 
    gameObject.update(); 
    gameObject.draw();
    // ball.draw(); 
    // statsBoard.draw(); 
}
