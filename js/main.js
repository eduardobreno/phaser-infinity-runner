'use strict';

var game = new Phaser.Game(1280, 720);

var mainState = {

    preload: function () {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('player', 'assets/player/000.png');
        game.load.image('enemy', 'assets/arvore_enemy.gif');
    },

    create: function () {
        if (!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.setMinMax(game.width / 2, game.height / 2, game.width, game.height);
        }

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.enemies = game.add.group();
        this.timer = game.time.events.loop(1500, this.addEnemy, this);

        this.player = game.add.sprite(100, 245, 'player');
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1000;
        this.player.anchor.setTo(-0.2, 0.5);

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        game.input.onDown.add(this.jump, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
    },

    update: function () {
        game.physics.arcade.overlap(this.player, this.enemies, this.hit, null, this);

        if (this.player.y < 0 || this.player.y > game.world.height)
            this.restartGame();

        if (this.player.angle < 20)
            this.player.angle += 1;
    },

    jump: function () {
        if (this.player.alive == false)
            return;
        this.player.body.velocity.y = -350;
    },

    hit: function () {
        if (this.player.alive == false)
            return;
        this.player.alive = false;
        game.time.events.remove(this.timer);
        
        this.enemies.forEach(function (p) {
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function () {
        game.state.start('main');
    },

    addEnemy: function () {
        var x = 1280;
        var y = 380;
        var enemy = game.add.sprite(x, y, 'enemy');
        enemy.scale.setTo(0.5);
        this.enemies.add(enemy);
        game.physics.arcade.enable(enemy);

        enemy.body.velocity.x = -200;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    }
};

game.state.add('main', mainState);
game.state.start('main'); 