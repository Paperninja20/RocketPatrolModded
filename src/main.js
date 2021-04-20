//Jacob Yu, Mellow Fishing, 4/19/2021, about 15 hours
//Points breakdown:
//  10 points for disaplying the time in seconds on the screen
//  20 points for creating a new spaceship type that's smaller, moves faster, and is worth more points
//  20 points for implementing a new timing/scoring mechanism that adds time to the clock for successful hits
//  60 points for redesigning the game's artwork, UI, and sound to an underwater fishing theme.
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play ] 
}

let game = new Phaser.Game(config);


let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let starSpeed = 0

let keyF, keyR, keyLEFT, keyRIGHT;