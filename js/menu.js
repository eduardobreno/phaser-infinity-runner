"use strict";

let menuState = {
	preload: function () {
		game.load.image('background', 'assets/menu.png');
        game.load.image('btn_play', 'assets/btn_play.png');
	},

	create: function () {
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;


        this.background = game.add.sprite(0, 0, 'background');
        this.background.scale.setTo(0.67);

		let btStart = game.add.sprite(470, 500, 'btn_play');
        btStart.scale.setTo(0.67);
		btStart.inputEnabled = true;
		btStart.events.onInputUp.add(function () {
			game.state.start('game');
		});
	},

	update: function () {

	}
}