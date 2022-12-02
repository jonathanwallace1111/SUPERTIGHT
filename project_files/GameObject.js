class GameObject {
    constructor() {
        this.state = {
            gameInProgress: false, 
            gamePaused: false,
            deltaTime: null,
            speedRound: false,
            speedRoundHitCount: 0,
            currentStage: 1,
            numOfBallsInPlay: 1,
            rapidFireActive: false
        }

        this.stats = {
            score: 0, 
            gameOver: false,
            totalHitCount: 0,
            livesRemaining: 3,
            freeHitsRemaining: 0,
            numOfHitsWithCurrentNumOfBallsInPlay: 0,
            message: ''
        }

        this.controller = {
            up: false,
            down: false
        }

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
            left: {
                x: 50,
                y: 270,
                width: 10, 
                height: 60,
                velocity: 500,
                movementStreak: 0,
                isMoving: false,
                movementDirection: null
            },
            right: {
                x: 700,
                y: 270,
                width: 10,
                height: 60,
                velocity: 390,
                movementStreak: 0,
                isMoving: false,
                movementDirection: null,
            }
        }

        this.ballArr = [];



        this.backgroundColor = "black"
        this.borderAndPaddleColor = "purple"
        this.cornerRadius = 20; 
    }

    startGame() {
        for (let i = 0; i < this.ballArr.length; i++) {
            let ball = this.ballArr[i];

            ball.velocity = 300;
            ball.angle = Math.floor(Math.random() * 91 + 135)
            ball.direction = 'left';

            ball.updateBall(this.state.deltaTime);
        }

        this.state.gameInProgress = true;  
    }

pauseOrUnpauseGame() { 

}

leftPaddleLogic() { 
    let leftPaddle = this.paddles.left;
    let leftPaddleBottom = leftPaddle.y + leftPaddle.height;
    let deltaTime = this.state.deltaTime;
    
    if (keyIsDown(UP_ARROW)) {
        if (!this.controller.up) {
            leftPaddle.movementStreak = 0;
        }
        
        this.controller.up = true;
        leftPaddle.isMoving = true;
        leftPaddle.movementDirection = 'up';
        leftPaddle.movementStreak += 1

    } else { 
        this.controller.up = false;
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
    }

    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
        leftPaddle.isMoving = false; 
        leftPaddle.movementDirection = null; 
        leftPaddle.movementStreak = 0; 
    }

        if (this.controller.up && leftPaddle.y >= 50) {
            // leftPaddle.y -= leftPaddle.velocity * deltaTime;
            leftPaddle.y -= leftPaddle.velocity * deltaTime; 
        }
        if (this.controller.down && leftPaddleBottom <= 550) {
            // leftPaddle.y += leftPaddle.velocity * deltaTime;
            leftPaddle.y += leftPaddle.velocity * deltaTime; 
        }
}

    rightPaddleCornerHitAnimation() {
    
    }

    rightPaddleLogic() {

        

        let rightPaddleBottom = this.paddles.right.y + this.paddles.right.height;
        let rightPaddleMiddle = this.paddles.right.y + (this.paddles.right.height / 2);

        let firstBallFutureLocation;
        let allBallFutureLocationsArr = [];

        let rapidFireActive = this.state.rapidFireActive;

        if (rapidFireActive === true) {
            this.rapidFire();
        } else {
            if (this.ballArr.length > 0) {
                for (let i = 0; i < this.ballArr.length; i++) {
                    let ball = this.ballArr[i];

                    if (ball.direction === 'right' && ball.velocity !== 0) {
                        let futureLocationAndMagnitude = ball.getBallFutureLocation();
                        allBallFutureLocationsArr.push(futureLocationAndMagnitude)
                    }
                }
            }

            let shortestMagnitudeIndex = 0;

            for (let i = 0; i < allBallFutureLocationsArr.length; i++) {
                if (allBallFutureLocationsArr[i].magnitude < allBallFutureLocationsArr[shortestMagnitudeIndex].magnitude) {
                    shortestMagnitudeIndex = i;
                }
            }

            if (allBallFutureLocationsArr.length !== 0) {
                // b(allBallFutureLocationsArr); 
                // console.log(shortestMagnitudeIndex); 

                firstBallFutureLocation = allBallFutureLocationsArr[shortestMagnitudeIndex].futureLocation;
            }

            let diff = firstBallFutureLocation - rightPaddleMiddle;

            if (firstBallFutureLocation !== rightPaddleMiddle) {

                if (Math.abs(diff) < 5) {
                    this.paddles.right.y += diff;
                }

                if (Math.sign(diff) === 1) {
                    this.paddles.right.y += 5
                } else if (Math.sign(diff) === -1) {
                    this.paddles.right.y -= 5;
                }
            }

        }
    }


//     //definitely need to fix this 
//     restartGame() {
//         // This function also needs to empty the ballArray and ad one new, still ball to ballArray

                //this.ball = {
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

//         let tempLivesRemaining = this.stats.livesRemaining
//         this.stats.livesRemaining = tempLivesRemaining -1; 
//         if (this.stats.livesRemaining < 0) {
//             this.stats.gameOver = true; 
//         }


//         // this.state.gameInProgress = false; 

//         this.ball.passedFirstHit = false;


//         //features to add
//         //save high score when game over. Enter name. Then show highscores. 
//         //keep track of remaining lives. 
//         //if out of lives, gameOver
//         //display remaining lives. 
//         //this.stats.gameOver = true; 

//         if (!this.stats.gameOver) {
//             this.startGame();
//         }

//     }

//     //What happens when you run out of lives? 
//     endGame() {

//     }

//this function houses all logic for assigning special balls and ballcolors
    level1Logic(ball) {
        let stats = this.stats;

        // addBall / yellow ball logic 
        if (this.ballArr.length === 1) {
            ball.specialBallType.push('addBall');
            ball.colorArr.push('yellow'); 
        }

        // //addLife / green ball logic
        // if (this.ballArr.length === 1) {
        //     ball.specialBallType.push('addLife');
        //     ball.colorArr.push('green');
        // }
        
        //addVelocity / orange ball logic
        if (this.ballArr.length === 1 && stats.livesRemaining === 0) {
            ball.specialBallType.push('addVelocity'); 
            ball.colorArr.push('orange'); 
        }

        //this if statement it to get rid of "white" if there are other colors in the array
        if (ball.colorArr.length > 1 && ball.colorArr.includes("white")) {
            ball.colorArr = ball.colorArr.filter(value => {
                return value !=  "white"; 
            }); 
        }


    }

    level2Logic(ball) {

    }

    level3Logic(ball) {

    }

    //when the colored special ball hits the left paddle
    handleSpecialBall(ball) {
        if (ball.specialBallType.includes('addBall')) {
            this.addNewBall();
        }

        if (ball.specialBallType.includes('addLife')) {
            this.stats.livesRemaining += 1;
        }

        // Gotta make the "free hit" actually work" 
        if (ball.specialBallType.includes('freeHit')) {
            this.stats.freeHitsRemaining += 1;
        }

        if (ball.specialBallType.includes('addVelocity')) {
            ball.velocity += 100;
        }

        if (ball.specialBallType.includes('rapidFire')) {
            this.state.rapidFireActive = true;
        }

        ball.specialBallType = [];
        ball.colorArr = ['white'];
    }


    leftHitLogic(ball) {
        let leftPaddle = this.paddles.left; 
        let leftMovementStreak = leftPaddle.movementStreak; 
        let deltaTime = this.state.deltaTime;   

                if (leftMovementStreak >= 30) {
                    if (leftPaddle.movementDirection === 'up') {
                        ball.angle = -45;
                    } else if (leftPaddle.movementDirection === 'down') {
                        ball.angle = 45;
                    }
                    // ball.angle = 180 - ball.angle;
                }
    
                if (leftMovementStreak >= 15 && leftMovementStreak < 30) {
                    if (leftPaddle.movementDirection === 'up') {
                        ball.angle = -45;
                    } else if (leftPaddle.movementDirection === 'down') {
                        ball.angle = 45;
                    }
                    // ball.angle = 180 - ball.angle;
                }
    
                if (leftMovementStreak > 0 && leftMovementStreak < 15) {
                    if (leftPaddle.movementDirection === 'up') {
                        ball.angle = -23;
                    } else if (leftPaddle.movementDirection === 'down') {
                        ball.angle = 23;
                    }
                    // ball.angle = 180 - ball.angle;
 
                }
    
                if (leftMovementStreak === 0) {
                    ball.angle = 180 - ball.angle;
                }
    
                this.stats.totalHitCount += 1; 
    
                this.handleSpecialBall(ball);
    
                ball.updateBall(deltaTime);
                ball.direction = 'right';
    
                this.stats.numOfHitsWithCurrentNumOfBallsInPlay += 1;  
    }
    
    rightHitLogic(ball) { 
        // ball.passedFirstHit = true;
        ball.angle = 180 - ball.angle;
        ball.updateBall(this.state.deltaTime);
        ball.direction = 'left';
    

        switch (this.state.currentStage) {
            case 1:
                this.level1Logic(ball);
                break;
            case 2:
                this.level3Logic(ball);
                break;
            case 3:
                this.level3Logic(ball);
                break;
            default:
                break;
        }

        // this.handleBallType(ball); 
    }

//This is when you've only got one ball left so it sends orange balls and it speeds up.
//  speedRound() {
     // // if you are down to one ball with no lives left then the ball velocitys up and if you hit it three times
        // //then you get an extra life
        // if (stats.livesRemaining === 0 && this.state.numOfBallsInPlay === 1 && !this.state.speedRound) {
        //     this.state.speedRound = true; 
        //     newBallTypeArray.push('addvelocity');
        //     // ball.velocity = 12; 
        // }

        // if (this.state.speedRound && this.state.speedRoundHitCount < 2) {
        //     this.state.speedRoundHitCount += 1; 
        //     newBallTypeArray.push('addvelocity');
        // }

        // if (this.state.speedRound && this.state.speedRoundHitCount === 2) {
        //     this.state.speedRoundHitCount += 1; 
        //     newBallTypeArray.push('addLife');
        //     // ball.velocity = 12; 
        //     newBallTypeArray.push('addvelocity');
        // }

        // if (this.state.speedRound && this.state.speedRoundHitCount === 3) {
        //     this.state.speedRound = false; 
        //     this.state.speedRoundHitCount = 0; 
        //     newBallTypeArray.push('addBall');
        //     ball.velocity = 8;
        // }
// }

//This is where right paddle shoots three or more new balls in rapid succession
//     rapidFire() {
//         //end condition for this function (it runs on a loop) is (cont'd)
//         //this.state.rapidFireActive = false 
//     }

//     freeHit(ball) {
//         //temp code just to make the freeHit() work in a basic way
//         ball.angle = 180 - ball.angle;
//         ball.direction = 'right';
//         ball.updateBall(this.state.deltaTime);

//         this.handleSpecialBall(ball);

//         this.stats.freeHit = this.stats.freeHitsRemaining - 1;
//         this.stats.totalHitCount += 1; 

//         this.stats.numOfHitsWithCurrentNumOfBallsInPlay += 1;

//     }

    addNewBall() {
        let ball1 = new Ball();
        let ballAngle = Math.floor(Math.random() * 91 + 135)
        ball1.angle = ballAngle;
        ball1.x = this.paddles.right.x;
        ball1.y = this.paddles.right.y + (this.paddles.right.height / 2);
        ball1.direction = "left"
        ball1.velocity = 300;

        ball1.updateBall(this.state.deltaTime);
        this.ballArr.push(ball1);

        this.state.numOfBallsInPlay += 1; 
        this.stats.numOfHitsWithCurrentNumOfBallsInPlay = 0; 
    }

ballMechanics() {
        let leftPaddleTop = this.paddles.left.y; 
        let leftPaddleBottom = leftPaddleTop + this.paddles.left.height;
        let leftMovementStreak = this.paddles.left.movementStreak; 
        let rightPaddleTop = this.paddles.right.y;
        let rightPaddleBottom = rightPaddleTop + this.paddles.right.height;
        let rightPaddleMiddle = rightPaddleTop + (this.paddles.right.height / 2);
        let deltaTime = this.state.deltaTime; 

        for (let i = 0; i < this.ballArr.length; i++) {
            let ball = this.ballArr[i];

            let tempBallX = ball.x;

            //actually moving the ball. 
            ball.x += ball.xunits;
            ball.y += ball.yunits;
            let ballTraveledArr = ball.ballTraveledArr;

            if (ball.x > tempBallX) {
                for (let j = tempBallX; j <= ball.x; j++) {
                    ballTraveledArr.push(Math.floor(j));
                }
            } else if (tempBallX > ball.x) {
                for (let j = ball.x; j <= tempBallX; j++) {
                    ballTraveledArr.push(Math.floor(j));
                }
            }

            while (ballTraveledArr.length > 60) {
                ballTraveledArr.shift(); 
            }

            //left paddle hit logic
            if (
                ball.ballTraveledArr.includes(50) 
                && ball.direction === 'left' 
                && ball.y >= leftPaddleTop 
                && ball.y <= leftPaddleBottom
                ) {
                    this.leftHitLogic(ball);
            }

            //right paddle hit logic
            if (
                ballTraveledArr.includes(700) 
                && ball.direction === 'right'
                //I don't think these last two conditionals should be here. Right paddle should always be there 
                && ball.y >= rightPaddleTop
                && ball.y <= rightPaddleBottom
                ) {
                    this.rightHitLogic(ball); 
            }    


            //if you miss the ball
            if (ball.x <= 0) {
                this.ballArr.splice(i, 1);
                this.state.numOfBallsInPlay -= 1; 
                this.stats.numOfHitsWithCurrentNumOfBallsInPlay = 0; 

                //this if statement is to add a new ball after I lose the last one (if I have an extra life)
                //I've got to get rid of this "0 + 1" logic. This is a remnant of the REACT code 
                if (this.ballArr.length <= 0 && this.stats.livesRemaining >= 1) {
                    this.addNewBall();
                }

                this.stats.livesRemaining -= 1; 



            }

            //Border hit logic
            if (ball.y <= 50 || ball.y >= 550) {
                ball.angle = 360 - ball.angle;
                ball.updateBall(deltaTime);
            }

        }
}

    update() {

        //left paddle mechanics 
        this.leftPaddleLogic(); 

        // // right paddle mechanics
        // // I don't like this if statement. Leaving it for now so I don't break anything 
        if (this.ballArr !== []) {
            this.rightPaddleLogic();
        }

        // // ball mechanics
        this.ballMechanics(); 
    }

    drawGlowingRect(x, y, width, height, cornerRadius, color) {
        drawingContext.shadowBlur = 5;
        drawingContext.shadowColor = "blue"; 
        strokeWeight(6);
        stroke(color); 
        noFill(); 
        rect(x, y, width, height, cornerRadius); 
        strokeWeight(1.25); 
        stroke("white"); 
        rect(x, y, width, height, cornerRadius); 
    }
    
    drawGlowingCirc(x, y, diameter, color) {
        drawingContext.shadowBlur = 5;
        drawingContext.shadowColor = "blue"; 
        strokeWeight(6);
        stroke(color); 
        noFill(); 
        circle(x, y, diameter); 
        strokeWeight(1.25); 
        stroke("white"); 
        circle(x, y, diameter); 
    }

    draw() {
        fill(this.backgroundColor);
        noStroke(); 
        rect(0, 0, 750, 900); //this is to clear prior images so the animation doesn't pile up images
        let color;

        //top border
        let topBorder = this.borders.top; 
        color = this.borderAndPaddleColor;
        this.drawGlowingRect(topBorder.x, topBorder.y, topBorder.width, topBorder.height, this.cornerRadius, color);

        //bottom border
        this.bottomBorder = this.borders.bottom; 
        this.drawGlowingRect(this.bottomBorder.x, this.bottomBorder.y, this.bottomBorder.width, this.bottomBorder.height, this.cornerRadius, color); 
        
        //left paddle 
        let leftPaddle = this.paddles.left;
        this.drawGlowingRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, this.cornerRadius, color);

        //right paddle
        let rightPaddle = this.paddles.right;
        this.drawGlowingRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, this.cornerRadius, color); 

        //ballArr Loop
        for (let i = 0; i < this.ballArr.length; i++) {
            let ball = this.ballArr[i]

    // handle ball color
            if (ball.colorArr.length > 1) {
                let numOfColors = ball.colorArr.length;
                let cycleCounter = (numOfColors * 10) - 1; 
                let colorIndex = floor(ball.colorChangeCounter / 10);
                ball.colorChangeCounter += 1;
                if (ball.colorChangeCounter > cycleCounter) {
                    ball.colorChangeCounter = 0;
                }
                color = ball.colorArr[colorIndex];
            } else {
                color = ball.colorArr[0]; 
            }

            //draw ball
            this.drawGlowingRect(ball.x, ball.y, ball.size, ball.size, this.cornerRadius, color); 
            // console.log(color); 
        }

    }
}