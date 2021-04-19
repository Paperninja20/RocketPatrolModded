class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed + speed;
        this.facing = direction;
    }

    update() {
        if (this.facing == 1) {
            this.x -= this.moveSpeed;
            if (this.x <= 0 - this.width) {
                this.x = game.config.width;
            }
        }
        else {
            this.x += this.moveSpeed;
            if (this.x >= game.config.width) {
                this.x = 0 - this.width;
            }
        }
    }

    reset() {
        if (this.facing == 1) {
            this.x = game.config.width;
        }
        else {
            this.x = 0 - this.width;
        }
    }
}
