//FishingLine prefab
class Fishingline extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to the existing scene
        scene.add.existing(this);
        this.isShooting = false;      //track rocket firing status
        this.moveSpeed = 2;         //pixels per frame
    }

    update() {
        // left/right movement
        if (!this.isShooting) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        if (this.isShooting && this.y <= game.config.height - borderUISize * 3 - borderPadding) {
            this.y += this.moveSpeed;
        }

        if (this.y >= game.config.height - borderUISize * 3 - borderPadding) {
            this.isShooting = false;
            this.y = borderUISize;
        }
    }

    move() {
        if (!this.isShooting) {
            this.isShooting = true;
        }
    }
    
    reset() {
        this.isShooting = false;
        this.y = borderUISize;
    }
}