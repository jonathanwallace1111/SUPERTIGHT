class Ball {
    constructor() {
        this.x = 370;
        this.y = 295;
        this.size = 12.5; //I am trading this. Now using this.diameter or ball.diameter. This will take a lot of debugging to make the circle ball work. 
        this.diameter = 12.5;
        this.ballColor = ['white']; 

        
//         this.velocity = null;
    
//         this.angle = 210;
//         this.radians = 0;
//         this.xunits = 0;
//         this.yunits = 0;
//         this.direction = null;
//         this.futureLocation = 300;
//         this.passedFirstHit = false;
//         this.topOrBottom = null;
//         this.leftOrright = null;
//         this.specialBallType = []; 
    
//         this.hitCount = 0; 
//         this.oldestBall = false; 
//         this.colorChangeCounter = 0; 

//         this.magnitudeToFutureLocation = null;

//         this.updateBall = this.updateBall.bind(this);
//         this.getBallFutureLocation = this.getBallFutureLocation.bind(this);
//         this.createSpecialBall = this.createSpecialBall.bind(this); 
    }



//     //This function also exists in the GameModeMultiBall class. Gotta choose where it belongs

//     updateBall() {

//         // if (this.passedFirstHit) {
//         //     if (this.props.gameObject.ballvelocity === 'slow') {
//         //         this.velocity = 3; 
//         //    } else if (this.props.gameObject.ballvelocity === 'medium') {
//         //         this.velocity = 5; 
//         //    } else if (this.props.gameObject.ballvelocity === 'fast') {
//         //         this.velocity = 8; 
//         //    }
//         // }


//         // if (this.passedFirstHit) {
//         //     this.velocity = 8;
//         // } else {
//         //     this.velocity = 3;
//         // }


//         this.angle = this.angle % 360;
//         this.radians = this.angle * Math.PI / 180;
//         this.xunits = Math.cos(this.radians) * this.velocity;
//         this.yunits = Math.sin(this.radians) * this.velocity;
//     }

//     // //This function also exists in the GameModeMultiBall class. Gotta choose where it belongs
//     getBallFutureLocation() {

//         let ballClone = {
//             velocity: this.velocity,
//             x: this.x,
//             y: this.y,
//             angle: this.angle,
//             radians: this.radians,
//             xunits: this.xunits,
//             yunits: this.yunits,
//             size: this.size
//         }

//         let magnitudeAccumulator = 0;

//         while (ballClone.x <= 700) {

//             ballClone.x += ballClone.xunits;
//             ballClone.y += ballClone.yunits;

//             magnitudeAccumulator += this.velocity;

//             //bounce off top and bottom. 
//             if (ballClone.y <= 50 || ballClone.y >= 550) {
//                 ballClone.angle = 360 - ballClone.angle;
//                 ballClone.angle = ballClone.angle % 360;
//                 ballClone.radians = ballClone.angle * Math.PI / 180;
//                 ballClone.xunits = Math.cos(ballClone.radians) * ballClone.velocity;
//                 ballClone.yunits = Math.sin(ballClone.radians) * ballClone.velocity;
//             }
//         }

//         this.magnitudeToFutureLocation = magnitudeAccumulator;

//         this.futureLocation = ballClone.y;

//         // return this.futureLocation

//         //Below is experimental
//         return {
//             futureLocation: this.futureLocation,
//             magnitude: this.magnitudeToFutureLocation
//         }
//     }

//     createSpecialBall(typeOfSpecialBall) {
//         if (typeOfSpecialBall === 'newBall') {
//             this.ballColor = 'yellow'; 
//         }
//     }
// }


    draw() {
        ellipse(100, 300, 50, 50); 
    }
}

