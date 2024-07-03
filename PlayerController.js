class PlayerController {
    constructor(x, y, speed, gameManager) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.gameManager = gameManager;
        this.width = 100; // Adjust width to fit the basket image
        this.height = 100; // Adjust height to fit the basket image
        this.canvas = gameManager.canvas;
        this.ctx = gameManager.ctx;
        this.basketImage = new Image();
        this.basketImage.src = 'basket.png';
        this.keys = {};

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(e) {
        this.keys[e.key] = true;
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;
    }

    update() {
        if (this.keys['ArrowLeft'] && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.keys['ArrowRight'] && this.x < this.canvas.width - this.width) {
            this.x += this.speed;
        }
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.basketImage, this.x, this.y, this.width, this.height);
    }

    activatePowerUp() {
        this.speed *= 2;
        setTimeout(() => this.speed /= 2, 5000); // Power-up lasts for 5 seconds
    }
}
