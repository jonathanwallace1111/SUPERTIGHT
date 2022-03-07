class GameObject {
    constructor() {

        //These are properties that used to come from props. Just putting (cont'd)
        //them here, for now. Eventually I should integrate it into the code (cont'd)
        //in a sensible way. Also, some of this will be useless
        this.borderAndPaddleColor = "purple"
        this.ballColor = "#ffffff"
        this.backgroundColor = "black"
        this.ballvelocity = "fast"
        this.gameMode = "multiBall"
        this.playTo = "3"

        this.cornerRadius = 20; 
        this.deltaTime = null; 
        
        this.borders = {
            top: {
                x: 50,
                y: 40,
                width: 650,
                height: 10
            },
            bottom: {
                x: 50,
                y: 550,
                width: 650,
                height: 10 
            }
        }

        this.paddles = {
            //color: gameObject.paddleColor, 
            
            //eventually, I want to replace all "size" calls with "height" (cont'd)
            // and I'd like to referenct this height of the individual paddle.  
            size: 60,
            width: 10,
            height: 60,
            left: {
            //eventually I wont to replace "top" with "x" in all of the code. 
                top: 270,
                x: 50,
                y: 270,
                width: 10, 
                height: 60,
                movementStreak: 0, //interger. How many consective frames has it been moving. 
                isMoving: false,
                movementDirection: null,
                velocity: 390
            },
            right: {
            //eventually I wont to replace "top" with "x" in all of the code. 
                top: 270,
                x: 700,
                y: 270,
                width: 10,
                height: 60,
                movementStreak: 0,
                isMoving: false,
                movementDirection: null,
                velocity: 390,
                rapidFireActive: false
            }
        }
        this.controller = {
            up: false,
            down: false
        }
        this.ballArr = [];


    }




//         this.stopGame = false;


//         this.leftPaddleWinCount = 0,
//         this.rightPaddleWinCount = 0,
//         this.gameStats = {
//             serve: false,
//             firstServe: true,
//             leftPaddleScore: 0,
//             rightPaddleScore: 0,
//             gameOver: false,
//             winner: null,
//             totalHitCount: 0,
//             livesRemaining: 3,

//             speedRound: false,
//             speedRoundHitCount: 0,
//             currentStage: 1,
//             freeHitsRemaining: 0,
//             numOfBallsInPlay: 1,
//             numOfHitsWithCurrentNumOfBallsInPlay: 0
//         }



//         this.nextBallTypeArray = [];

//         this.rightPaddleSineCounter = 0;
//         this.rightPaddleSineIncrease = null;
//         this.rightPaddleSineOffset = null;

//         this.startGame = this.startGame.bind(this);
//         this.restartGame = this.restartGame.bind(this);
//         this.endGame = this.endGame.bind(this);
//         this.backToMenu = this.backToMenu.bind(this);
//         this.rapidFire = this.rapidFire.bind(this);
//         this.rightPaddleLogic = this.rightPaddleLogic.bind(this);
//         this.leftPaddleLogic = this.leftPaddleLogic.bind(this);
//         // build out this.addNewBall
//         this.level1Logic = this.level1Logic.bind(this);
//         this.level2Logic = this.level2Logic.bind(this);
//         this.level3Logic = this.level3Logic.bind(this);
//         this.handleNextBallType = this.handleNextBallType.bind(this);
//         this.assignBallType = this.assignBallType.bind(this);
//         this.handleSpecialBall = this.handleSpecialBall.bind(this);
//         this.freeHit = this.freeHit.bind(this);
//         this.addNewBall = this.addNewBall.bind(this);
//         this.gameLoop = this.gameLoop.bind(this);
//     }

drawGlowingRect(x, y, width, height, cornerRadius) {
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "blue"; 
    strokeWeight(6);
    stroke(this.borderAndPaddleColor); 
    noFill(); 
    rect(x, y, width, height, cornerRadius); 
    strokeWeight(1.25); 
    stroke("white"); 
    rect(x, y, width, height, cornerRadius); 
}

drawGlowingCirc(x, y, diameter) {
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "blue"; 
    strokeWeight(6);
    stroke(this.borderAndPaddleColor); 
    noFill(); 
    circle(x, y, diameter); 
    strokeWeight(1.25); 
    stroke("white"); 
    circle(x, y, diameter); 
}

leftPaddleLogic() { 
    let leftPaddle = this.paddles.left;
    let leftPaddleBottom = leftPaddle.y + leftPaddle.height;
    
    if (keyIsDown(UP_ARROW)) {
        if (!this.controller.up) {
            leftPaddle.movementStreak = 0;
        }
        
        this.controller.up = true;
        leftPaddle.isMoving = true;
        leftPaddle.movementDirection = 'up';
        leftPaddle.movementStreak +=1

    } else { 
        this.controller.up = false;
        leftPaddle.isMoving = false;
        leftPaddle.movementDirection = null;
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        if (!this.controller.down) {
            leftPaddle.movementStreak = 0;
        }
        this.controller.down = true;
        leftPaddle.isMoving = true;
        leftPaddle.movementDirection = 'down';
        leftPaddle.movementStreak +=1; 
    } else {
        this.controller.down = false;
        leftPaddle.isMoving = false; 
        leftPaddle.movementDirection = null; 
    }

    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
        leftPaddle.movementStreak = 0; 
    }

        if (this.controller.up && leftPaddle.y >= 50) {
            leftPaddle.y -= leftPaddle.velocity * this.deltaTime;
        }
        if (this.controller.down && leftPaddleBottom <= 550) {
            leftPaddle.y += leftPaddle.velocity * ;
        }
}

    rightPaddleLogic() {
//         let rightPaddleBottom = this.paddles.right.top + this.paddles.size;
//         let rightPaddleMiddle = this.paddles.right.top + (this.paddles.size / 2);

//         let firstBallFutureLocation;
//         let allBallFutureLocationsArr = [];

//         let rapidFireActive = this.paddles.right.rapidFireActive;

//         if (rapidFireActive === true) {
//             this.rapidFire();
//         } else {
//             if (this.ballArr.length > 0) {
//                 for (let i = 0; i < this.ballArr.length; i++) {
//                     let ball = this.ballArr[i];

//                     if (ball.direction === 'right' && ball.velocity !== 0) {
//                         let futureLocationAndMagnitude = ball.getBallFutureLocation();
//                         allBallFutureLocationsArr.push(futureLocationAndMagnitude)
//                     }
//                 }
//             }

//             let shortestMagnitudeIndex = 0;

//             for (let i = 0; i < allBallFutureLocationsArr.length; i++) {
//                 if (allBallFutureLocationsArr[i].magnitude < allBallFutureLocationsArr[shortestMagnitudeIndex].magnitude) {
//                     shortestMagnitudeIndex = i;
//                 }
//             }

//             if (allBallFutureLocationsArr.length !== 0) {
//                 // console.log(allBallFutureLocationsArr); 
//                 // console.log(shortestMagnitudeIndex); 

//                 firstBallFutureLocation = allBallFutureLocationsArr[shortestMagnitudeIndex].futureLocation;
//             }

//             let diff = firstBallFutureLocation - rightPaddleMiddle;

//             if (firstBallFutureLocation !== rightPaddleMiddle) {

//                 if (Math.abs(diff) < 5) {
//                     this.paddles.right.top += diff;
//                 }

//                 if (Math.sign(diff) === 1) {
//                     this.paddles.right.top += 5
//                 } else if (Math.sign(diff) === -1) {
//                     this.paddles.right.top -= 5;
//                 }
//             }

//         }
//         // if (this.ball.futureLocation !== rightPaddleMiddle) {
//         //     this.paddles.right.top = Math.sin(this.rightPaddleSineCounter) * (diff / 60) + this.rightPaddleSineOffset; 

//         //     this.rightPaddleSineCounter += this.rightPaddleSineIncrease; 
//         // }
    }

//     startGame() {
//         for (let i = 0; i < this.ballArr.length; i++) {
//             let ball = this.ballArr[i];

//             ball.velocity = 3;
//             let ballAngle = Math.floor(Math.random() * 91 + 135)
//             ball.angle = ballAngle;
//             ball.direction = 'left';

//             ball.updateBall();
//         }
//     }

//     //definitely need to fix this 
//     restartGame() {
//         this.ball = {
//             velocity: null,
//             x: 370,
//             y: 320,
//             angle: null,
//             radians: 0,
//             xunits: 0,
//             yunits: 0,
//             size: 12.5,
//             direction: null,
//             futureLocation: 300
//         }

//         let tempLivesRemaining = this.gameStats.livesRemaining
//         this.gameStats.livesRemaining = tempLivesRemaining -1; 
//         if (this.gameStats.livesRemaining < 0) {
//             this.gameStats.gameOver = true; 
//         }


//         // this.stopGame = false; 

//         this.ball.passedFirstHit = false;


//         //features to add
//         //save high score when game over. Enter name. Then show highscores. 
//         //keep track of remaining lives. 
//         //if out of lives, gameOver
//         //display remaining lives. 
//         //this.gameStats.gameOver = true; 

//         if (!this.gameStats.gameOver) {
//             this.startGame();
//         }

//     }

//     //What happens when you run out of lives? 
//     endGame() {

//     }

//     // backToMenu() {
//     //     this.stopGame = true;
//     //     this.props.setCurrentScreen('mainMenu');
//     // }

//     rapidFire() {



//         //end condition for this function (it runs on a loop) is (cont'd)
//         //this.paddles.right.rapidFireActive = false 
//     }

//     level1Logic(ball) {
//         let newBallTypeArray = [];
//         let gameStats = this.gameStats;
        
//         //below is test code to make an addball appear every time there's one ball in play
//         // if (this.gameStats.numOfBallsInPlay === 1 && this.gameStats.livesRemaining > 0) {
//             // newBallTypeArray.push('addBall');
//         // }

//         //below is test code to make rapidFire happen at the beginning
//         if (this.gameStats.numOfBallsInPlay === 1 && this.gameStats.livesRemaining > 0) {

//         }

//         //if you are down to one ball with no lives left then the ball velocitys up and if you hit it three times
//         //then you get an extra life
//         if (gameStats.livesRemaining === 0 && gameStats.numOfBallsInPlay === 1 && !gameStats.velocityRound) {
//             this.gameStats.velocityRound = true; 
//             newBallTypeArray.push('addvelocity');
//             // ball.velocity = 12; 
//         }

//         if (gameStats.velocityRound && gameStats.velocityRoundHitCount < 2) {
//             this.gameStats.velocityRoundHitCount += 1; 
//             newBallTypeArray.push('addvelocity');
//         }

//         if (gameStats.velocityRound && gameStats.velocityRoundHitCount === 2) {
//             this.gameStats.velocityRoundHitCount += 1; 
//             newBallTypeArray.push('addLife');
//             // ball.velocity = 12; 
//             newBallTypeArray.push('addvelocity');
//         }

//         if (gameStats.velocityRound && gameStats.velocityRoundHitCount === 3) {
//             this.gameStats.velocityRound = false; 
//             this.gameStats.velocityRoundHitCount = 0; 
//             newBallTypeArray.push('addBall');
//             ball.velocity = 8;
//         }



//         // if (this.gameStats.totalHitCount % 1 === 0) {
//         //     newBallTypeArray.push('addLife');
//         // }

//         // if (this.gameStats.totalHitCount % 1 === 0) {
//         //     newBallTypeArray.push('freeHit');
//         // }


//         this.nextBallTypeArray.push(newBallTypeArray);
//     }

//     level2Logic(ball) {

//     }

//     level3Logic(ball) {

//     }

//     //When ball hits left paddle, this funct does the math as to what special ball type is next
//     handleNextBallType(ball) {
//         switch (this.gameStats.currentStage) {
//             case 1:
//                 this.level1Logic(ball);
//                 break;
//             case 2:
//                 this.level3Logic(ball);
//                 break;
//             case 3:
//                 this.level3Logic(ball);
//                 break;
//             default:
//                 break;
//         }
//     }

//     //when ball hits right paddle
//     assignBallType(ball) {
//         let nextBallArray = this.nextBallTypeArray[this.nextBallTypeArray.length - 1];

//         if (nextBallArray.length > 0) {
//             ball.specialBallType = nextBallArray;
//             ball.ballColor = [];

//             // if (nextBallArray[0] === 'addBall') {
//             //     ball.ballColor.push('yellow');
//             // }
//             // if (nextBallArray[0] === 'addLife') {
//             //     ball.ballColor.push('green'); 
//             // }
//             // if (nextBallArray[0] === 'freeHit') {
//             //     ball.ballColor.push('blue'); 
//             // }

//             if (nextBallArray.includes('addBall')) {
//                 ball.ballColor.push('yellow');
//             }
//             if (nextBallArray.includes('addLife')) {
//                 ball.ballColor.push('green');
//             }
//             if (nextBallArray.includes('freeHit')) {
//                 ball.ballColor.push('blue');
//             }
//             if (nextBallArray.includes('addvelocity')) {
//                 ball.ballColor.push('orange');
//             }
//             if (nextBallArray.includes('rapidFire')) {
//                 ball.ballColor.push('purple');
//             }
//         }

//         this.nextBallTypeArray.pop();
//     }

//     //when the colored special ball hits the left paddle
//     handleSpecialBall(ball) {
//         if (ball.specialBallType.includes('addBall')) {
//             this.addNewBall();
//         }

//         if (ball.specialBallType.includes('addLife')) {
//             this.GameStats.livesRemaining += 1;
//         }

//         // Gotta make the "free hit" actually work" 
//         if (ball.specialBallType.includes('freeHit')) {
//             this.gameStats.freeHitsRemaining += 1;
//         }

//         if (ball.specialBallType.includes('addvelocity')) {
//             ball.velocity += 1;
//         }

//         if (ball.specialBallType.includes('rapidFire')) {
//             this.paddles.right.rapidFireActive = true;
//         }

//         ball.specialBallType = [];
//         ball.ballColor = ['white'];
//     }

//     freeHit(ball) {
//         //temp code just to make the freeHit() work in a basic way
//         ball.angle = 180 - ball.angle;
//         ball.direction = 'right';
//         ball.updateBall();

//         this.handleSpecialBall(ball);
//         this.handleNextBallType(ball);

//         this.gameStats.freeHit = this.gameStats.freeHitsRemaining - 1;
//         this.gameStats.totalHitCount += 1; 

//         this.gameStats.numOfHitsWithCurrentNumOfBallsInPlay += 1;

//     }

//     addNewBall() {
//         let ball1 = new Ball();
//         let ballAngle = Math.floor(Math.random() * 91 + 135)
//         ball1.angle = ballAngle;
//         ball1.x = 700; /*700 is right paddle x*/
//         ball1.y = this.paddles.right.top + (this.paddles.size / 2);
//         ball1.direction = "left"
//         //next line is a temporary fix. New balls need to start with a velocity of 8
//         ball1.passedFirstHit = true;
//         ball1.velocity = 8;

//         ball1.updateBall();
//         this.ballArr.push(ball1);

//         this.gameStats.numOfBallsInPlay += 1; 
//         this.gameStats.numOfHitsWithCurrentNumOfBallsInPlay = 0; 
//     }


    update() {

        //left paddle mechanics 
        let leftPaddleBottom = this.paddles.left.top + this.paddles.size;
        this.leftPaddleLogic(); 
        let leftMovementStreak = this.paddles.left.movementStreak; 

//         // right paddle mechanics

//         let rightPaddleBottom = this.paddles.right.top + this.paddles.size;
//         let rightPaddleMiddle = this.paddles.right.top + (this.paddles.size / 2);

//         if (this.ballArr !== []) {
//             this.rightPaddleLogic();

//         }


//         // ball mechanics

//         for (let i = 0; i < this.ballArr.length; i++) {
//             let ball = this.ballArr[i];

//             let tempBallX = ball.x;

//             ball.x += ball.xunits;
//             ball.y += ball.yunits;

//             let ballTraveledArr = [];

//             if (ball.x > tempBallX) {
//                 for (let j = tempBallX; j <= ball.x; j++) {
//                     ballTraveledArr.push(Math.floor(j));
//                 }
//             } else if (tempBallX > ball.x) {
//                 for (let j = ball.x; j <= tempBallX; j++) {
//                     ballTraveledArr.push(Math.floor(j));
//                 }
//             }



//             // assign quadrant 
//             //I don't think I've found a use for this yet. 
//             if (ball.x >= 375) {
//                 ball.leftOrright = 'right';
//             } else {
//                 ball.leftOrright = 'left';
//             }

//             if (ball.y > 300) {
//                 ball.topOrBottom = 'bottom';
//             } else {
//                 ball.topOrBottom = 'top';
//             }


//             //left paddle hit logic
//             if (ballTraveledArr.includes(50) && ball.direction === 'left' && ball.y >= this.paddles.left.top && ball.y <= leftPaddleBottom) {

//                 // This is good code. It shoots the ball at an extreme angle if the leftMovementStreak is above thirty
//                 // // I'm changing it to just 45 degrees for now. it out because this happens way too often when you have multiple balls. 
//                 if (leftMovementStreak >= 30 /* && leftMovementStreak < 45 */) {
//                     if (this.movementDirection === 'up') {
//                         ball.angle = -45;
//                     } else if (this.movementDirection === 'down') {
//                         ball.angle = 45;
//                     }
//                 }

//                 if (leftMovementStreak >= 15 && leftMovementStreak < 30) {
//                     if (this.movementDirection === 'up') {
//                         ball.angle = -45;
//                     } else if (this.movementDirection === 'down') {
//                         ball.angle = 45;
//                     }
//                 }

//                 if (leftMovementStreak > 0 && leftMovementStreak < 15) {
//                     if (this.movementDirection === 'up') {
//                         ball.angle = -23;
//                     } else if (this.movementDirection === 'down') {
//                         ball.angle = 23;
//                     }
//                 }

//                 if (leftMovementStreak === 0) {
//                     ball.angle = 180 - ball.angle;
//                 }

//                 this.gameStats.totalHitCount += 1; 

//                 this.handleSpecialBall(ball);

//                 //temp code. just trying to get to get two balls at once
//                 // if (!ball.passedFirstHit && i === 0 ) {
//                 //     let newBall = new Ball();
//                 //     newBall.velocity = 3;
//                 //     newBall.velocity = 3;
//                 //     let ballAngle = Math.floor(Math.random() * 91 + 135)
//                 //     newBall.angle = ballAngle;
//                 //     newBall.direction = 'left';

//                 //     newBall.updateBall(); 
//                 //     this.ballArr.push(newBall)
//                 // }       

//                 if (!ball.passedFirstHit) {
//                     ball.passedFirstHit = true;
//                     ball.velocity = 8;
//                 }

//                 ball.updateBall();
//                 ball.direction = 'right';

//                 this.gameStats.numOfHitsWithCurrentNumOfBallsInPlay += 1; 
//                 this.handleNextBallType(ball);
//             }




//             //temp if (keeps ball bouncing even if I'm not playing)
//             // if (this.ball.x <= 25) {
//             //     this.ball.angle = 180 - this.ball.angle;   
//             //     this.updateBall() 

//             // }

//             if (ballTraveledArr.includes(700) && ball.direction === 'right' && ball.y >= this.paddles.right.top && ball.y <= rightPaddleBottom) {
//                 ball.passedFirstHit = true;
//                 ball.angle = 180 - ball.angle;
//                 ball.updateBall();
//                 ball.direction = 'left';

//                 // this.handleBallType(ball); 
//                 this.assignBallType(ball);
//             }

//             //temp code. This is to keep the balls bouncing as I test the game
//             if (ball.x > 715 && ball.direction === 'right') {
//                 ball.passedFirstHit = true;
//                 ball.angle = 180 - ball.angle;
//                 ball.updateBall();
//                 ball.direction = 'left';
//             }

//             if (ballTraveledArr.includes(50) && ball.direction === 'left' && (ball.y < this.paddles.left.top || ball.y > leftPaddleBottom)) {
//                 if (this.gameStats.freeHitsRemaining > 0) {
//                     this.freeHit(ball);
//                 }
//             }

//             if (ball.x <= 0) {
//                 // this.restartGame();

//                 //temp code. temporarily disabling the ability to lose so I can test two balls at once. 
//                 // ball.angle = 180 - ball.angle;
//                 // ball.updateBall(); 
//                 // ball.direction = 'right'; 

//                 // starting here, this is me working on a perminent code for multi-ball mode. 
//                 this.ballArr.splice(i, 1);

//                 this.gameStats.numOfBallsInPlay -= 1; 
//                 this.gameStats.numOfHitsWithCurrentNumOfBallsInPlay = 0; 


//                 // if (this.ballArr.length >= 0 && this.gameStats.livesRemaining > 0 + 1 /* I put the plus one here because I haven't changed the livesRemaining (nonlinear state change fucked with me)*/)  {
//                 //     return; 
//                 // } else 

//                 if (this.ballArr.length <= 0 && this.gameStats.livesRemaining >= 0 + 1) {
//                     this.addNewBall();
//                 }

//                 this.gameStats.livesRemaining -+ 1; 



//             }

//             if (ball.x >= 750 - ball.size) {
//                 let newScore = this.gameStats.leftPaddleScore + 1;
//                 this.gameStats.leftPaddleScore = newScore;
//                 this.restartGame();
//             }


//             if (ball.y <= 50 || ball.y >= 550) {
//                 ball.angle = 360 - ball.angle;
//                 ball.updateBall();
//             }

//         }
    }

    draw() {
        let borderAndPaddleColor = this.borderAndPaddleColor;
        let ballColor = this.ballColor;

        fill(this.backgroundColor);
        rect(0, 0, 750, 600); //this is to clear prior images so the animation doesn't pile up images

        //top border
        let topBorder = this.borders.top; 
        this.drawGlowingRect(topBorder.x, topBorder.y, topBorder.width, topBorder.height, this.cornerRadius);

        //bottom border
        this.bottomBorder = this.borders.bottom; 
        this.drawGlowingRect(this.bottomBorder.x, this.bottomBorder.y, this.bottomBorder.width, this.bottomBorder.height, this.cornerRadius); 
        
        //left paddle 
        let leftPaddle = this.paddles.left;
        this.drawGlowingRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, this.cornerRadius);

        //right paddle
        let rightPaddle = this.paddles.right;
        this.drawGlowingRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, this.cornerRadius); 

//ballArr Loop
        for (let i = 0; i < this.ballArr.length; i++) {
            let ball = this.ballArr[i]

    // handle ball color
            // if (ball.ballColor.length > 1) {
        //         let numOfColors = ball.ballColor.length;
        //         let cycleCounter = numOfColors * 10;
        //         let increment = 30 / numOfColors;
        //         c.fillStyle = ball.ballColor[Math.floor(ball.colorChangeCounter / 10)];
        //         // if (ball.colorChangeCounter < 10) {
        //         //     c.fillStyle = ball.ballColor[0];
        //         // } else if (ball.colorChangeCounter > 10) {
        //         //     c.fillStyle = ball.ballColor[1]; 
        //         // }
        //         if (ball.colorChangeCounter > cycleCounter) {
        //             ball.colorChangeCounter = 0;
        //         }
        //         ball.colorChangeCounter += 1;
            // } else {
        //         c.fillStyle = ball.ballColor;
            // }

    //draw ball
            this.drawGlowingRect(ball.x, ball.y, ball.size, ball.size, this.cornerRadius); 
        }

    }

//     gameLoop() {
//         if (!this.stopGame) {
//             this.update();
//             this.draw();
//             requestAnimationFrame(this.gameLoop);
//         }
//     }

}