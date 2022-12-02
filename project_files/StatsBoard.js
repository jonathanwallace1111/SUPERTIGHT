class StatsBoard {
    constructor() { //this is gameObject.gameStats

    }

    draw(gameStats) { 


        let displayText;
        textSize(16); 
        fill('white'); 

        displayText = `score: ${gameStats.score}`;
        text(displayText, 100, 600); 
        displayText = `lives: ${gameStats.livesRemaining}`;
        text(displayText, 100, 620); 
        displayText = `totalHitCount: ${gameStats.totalHitCount}`;
        text(displayText, 100, 640); 
        displayText = `Message: ${gameStats.message}`;
        text(displayText, 400, 600); 
    }

}