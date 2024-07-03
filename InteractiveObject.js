class InteractiveObject {
    constructor(x, y, name, gameManager) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.name = name;
        this.gameManager = gameManager;
    }

    update(player) {
        this.draw();
    }

    interact() {
        // Placeholder for interaction logic (e.g., reduce stress levels)
        console.log(`Interacting with ${this.name}...`);
        // Implement stress-relieving activity (e.g., meditation, deep breathing)
        this.gameManager.updateJournal(`Interacted with ${this.name}.`);  // Example journal entry
    }

    draw() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);  // Draw a simple interactive object
        ctx.fillStyle = 'black';
        ctx.fillText(this.name, this.x, this.y - 10);  // Draw object name above
    }
}
