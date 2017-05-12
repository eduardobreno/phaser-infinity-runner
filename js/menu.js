"use strict";

let menuState = {
	preload: function () {
		game.stage.backgroundColor = '#71c5cf';
	},


	create: function () {
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		let btStart = game.add.text(400, 300, "Menu Principal", {
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