class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', 'assets/Select.mp3')
        this.load.audio('sfx_select', 'assets/explosion38.wav')
        this.load.audio('sfx_select', 'assets/rocket_shot.wav')
        this.load.image('background', 'assets/menubackdrop.png')
    }

    create() {
        //this.scene.start("playScene")
        this.backdrop = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);

        let menuConfig = {
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

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'MELLOW FISHING', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, '<--> to move hook & (F) to lower hook', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert',
        menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }


    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
        }
    }
}