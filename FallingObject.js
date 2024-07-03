class FallingObject {
    constructor(x, y, symbol, type, gameManager) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.type = type;
        this.speed = 2 + Math.random() * 3; // Random speed for more variety
        this.gameManager = gameManager;
        this.canvas = gameManager.canvas;
        this.ctx = gameManager.ctx;
        this.width = 30;
        this.height = 30;
    }

    update(player) {
        this.y += this.speed;
        this.draw();

        if (this.y > this.canvas.height) {
            this.reset();
        }

        if (this.isCollidingWith(player)) {
            this.handleCollision(player);
            this.reset();
        }
    }

    draw() {
        this.ctx.font = "30px Arial";
        this.ctx.fillText(this.symbol, this.x, this.y);
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = -Math.random() * this.canvas.height;
    }

    isCollidingWith(player) {
        return this.x < player.x + player.width &&
               this.x + this.width > player.x &&
               this.y < player.y + player.height &&
               this.y + this.height > player.y;
    }

    handleCollision(player) {
        if (this.type === 'positive') {
            this.gameManager.updateScore(10);
        } else if (this.type === 'negative') {
            this.gameManager.updateScore(-5);
        } else if (this.type === 'powerUp') {
            player.activatePowerUp();
        }
    }
}
