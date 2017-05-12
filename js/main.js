'use strict';

let game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-canvas');

game.state.add('game', gameState);
game.state.add('menu', menuState);

game.state.start('menu');