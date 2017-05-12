"use strict";

let menuState = {
	preload: function () {
		game.load.image('background', 'assets/background.png');
		game.load.image('background2', 'assets/background2.png');
	},

	create: function () {
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		this.background2 = game.add.sprite(0, 0, 'background2');
        this.background2.scale.setTo(0.32);
        this.background = game.add.sprite(0, 0, 'background');
        this.background.scale.setTo(0.32);

		let btStart = game.add.text(400, 300, "Start", {
			fill: "#ffffff"
		});
		btStart.inputEnabled = true;
		btStart.events.onInputUp.add(function () {
			game.state.start('game');
		});
	},

	update: function () {

	}
}