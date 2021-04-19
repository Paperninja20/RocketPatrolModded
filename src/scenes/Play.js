class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image('rocket', './assets/Hook.png')
        this.load.image('fishingline', './assets/Line.png')
        this.load.image('orangefish', './assets/orangefish.png')
        this.load.image('yellowfish', './assets/Yellowfish.png')
        this.load.image('purplefish', './assets/Purplefish.png')
        this.load.image('smallership', './assets/Smallfish.png')
        this.load.image('starfield', './assets/SeaBackground.png')
        this.load.spritesheet('ten', './assets/10.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('thirty', './assets/30.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('fifty', './assets/50.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('hundred', './assets/100.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.audio('sfx_select', './assets/Select.mp3');
        this.load.audio('sfx_explosion', './assets/caught.mp3');
        this.load.audio('sfx_rocket', './assets/HookRelease.mp3');
        this.load.audio('music', './assets/UnderwaterJingle.mp3');
    }
    

    create() {
        let audioConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let backgroundMusic = this.sound.add('music', audioConfig);
        backgroundMusic.play();
        //place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        //green UI background

        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, borderUISize/2, 'rocket').setOrigin(0.5,0)
        //this.line = new Fishingline(this, game.config.width/2, -200, 'fishingline').setOrigin(0.5,0)

        //add ships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5 + borderPadding*2, 'orangefish', 0, 30, 4, 0).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*4, 'yellowfish', 0, 50, 2, 1).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding*6, 'purplefish', 0, 100, 0, 0).setOrigin(0,0);

        this.smallership = new Smallership(this, game.config.width - borderPadding * 2 - borderUISize, borderUISize * 4, 'smallership', 0, 10).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        this.anims.create({
            key: '10',
            frames: this.anims.generateFrameNumbers('ten', { start: 0, end: 3, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: '30',
            frames: this.anims.generateFrameNumbers('thirty', { start: 0, end: 3, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: '50',
            frames: this.anims.generateFrameNumbers('fifty', { start: 0, end: 3, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: '100',
            frames: this.anims.generateFrameNumbers('hundred', { start: 0, end: 3, first: 0}),
            frameRate: 15
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#ffd39f',
            color: '#843605',
            align: 'center',
            padding: {
              top: 3,
              bottom: 3,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize, game.config.height - (borderUISize + borderPadding*4), this.p1Score, scoreConfig);


        let gameOverConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#003c5e',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', gameOverConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        let timerConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#ffd39f',
            color: '#843605',
            align: 'center',
            padding: {
                top: 3,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timerRight = this.add.text(game.config.width - (borderUISize + 100), game.config.height - (borderUISize + borderPadding*4), '0:'.concat(Math.ceil(this.clock.getRemainingSeconds())), timerConfig);
        //white borders
        this.add.rectangle(0,0, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize/2, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize/2, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0,0);
    }

    update() {
    
        if (this.clock.getRemainingSeconds() < 10) {
            this.timerRight.text = '0:0'.concat(Math.floor(this.clock.getRemainingSeconds()));
        }
        else if (this.clock.getRemainingSeconds() >= 60) {
            let minutes = Math.floor(this.clock.getRemainingSeconds()/60);
            let minuteString = minutes + ":";
            if (Math.floor(this.clock.getRemainingSeconds()) - (minutes * 60) < 10) {
                let minuteString = minutes + ":0";
                this.timerRight.text = minuteString.concat(Math.floor(this.clock.getRemainingSeconds()) - (minutes * 60));
            }
            else {
                this.timerRight.text = minuteString.concat(Math.floor(this.clock.getRemainingSeconds()) - (minutes * 60));
            }
        }
        else {
            this.timerRight.text = '0:'.concat(Math.floor(this.clock.getRemainingSeconds()));
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= starSpeed;

        //update rocket
        if (!this.gameOver) {    
            this.p1Rocket.update();
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.smallership.update();
        }
        else {
            this.p1Rocket.visible = false;
            this.ship01.visible = false;               // update spaceships (x3)
            this.ship02.visible = false;
            this.ship03.visible = false;
            this.smallership.visible = false;
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.smallership)) {
            this.p1Rocket.reset();
            this.shipExplode(this.smallership);
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
            return true;
        }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, ''.concat(ship.points)).setOrigin(0, 0);
        boom.anims.play("".concat(ship.points));        
        boom.on('animationcomplete', () => { 
            ship.reset();                      
            ship.alpha = 1;                    
            boom.destroy();                       
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion');  
        let timeConfig = {
            delay: this.clock.getRemaining() + 10000,
            callback: () => {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu').setOrigin(0.5);
                this.gameOver = true;
            },
        }
        this.clock.reset(timeConfig);         
    }
}