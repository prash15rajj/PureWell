class GameManager {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.levelThreshold = 100; // Score needed to level up
        this.backgroundMusic = new Audio('background-music.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }

    updateScore(points) {
        this.score += points;
        if (this.score >= this.level * this.levelThreshold) {
            this.levelUp();
        }
    }

    displayScore() {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Score: " + this.score, 10, 20);
    }

    displayLevel() {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Level: " + this.level, 10, 50);
    }

    levelUp() {
        this.level++;
        // Increase difficulty: more objects and faster speed
        for (let i = 0; i < 2; i++) {
            fallingObjects.push(new FallingObject(Math.random() * 800, -Math.random() * 600, "😊", "positive", this));
            obstacles.push(new FallingObject(Math.random() * 800, -Math.random() * 600, "😡", "negative", this));
        }
    }
}
