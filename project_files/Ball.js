class Ball {
    constructor() {
        this.x = 370;
        this.y = 295;
        this.size = 12.5; 
        this.angle = 210;
        this.radians = 0;
        this.velocity = null;
        this.xunits = 0;
        this.yunits = 0;

        this.colorArr = ['white']; 
        this.colorChangeCounter = 0; 
        this.specialBallType = []; 
        this.direction = null;   
        this.ballTraveledArr = []; 
        this.futureLocation = 300;
        this.magnitudeToFutureLocation = null;

        this.state = {
            firstBall: false,
            oldestBall: false,
            numberOfHits: 0,
        } 
    }




    updateBall(deltaTime) {  
                this.angle = this.angle % 360;
                this.radians = this.angle * Math.PI / 180;
                this.xunits = Math.cos(this.radians) * (this.velocity * deltaTime);
                this.yunits = Math.sin(this.radians) * (this.velocity * deltaTime);
                // console.log(deltaTime); 
    }

    getBallFutureLocation() {
        let ballClone = {
            velocity: this.velocity,
            x: this.x,
            y: this.y,
            angle: this.angle,
            radians: this.radians,
            xunits: this.xunits,
            yunits: this.yunits,
            size: this.size
        }
        let magnitudeAccumulator = 0;

        while (ballClone.x <= 700) {
            ballClone.x += ballClone.xunits;
            ballClone.y += ballClone.yunits;
            magnitudeAccumulator += this.velocity;

            //simulate bounces off top and bottom borders. 
            if (ballClone.y <= 50 || ballClone.y >= 550) {
                ballClone.angle = 360 - ballClone.angle;
                ballClone.angle = ballClone.angle % 360;
                ballClone.radians = ballClone.angle * Math.PI / 180;
                ballClone.xunits = Math.cos(ballClone.radians) * ballClone.velocity;
                ballClone.yunits = Math.sin(ballClone.radians) * ballClone.velocity;
            }
        }

        this.magnitudeToFutureLocation = magnitudeAccumulator;
        this.futureLocation = ballClone.y;

        return {
            futureLocation: this.futureLocation,
            magnitude: this.magnitudeToFutureLocation
        }
    }
}

