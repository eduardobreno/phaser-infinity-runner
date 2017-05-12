'use strict';

let gameState = {

    preload: () => {
        game.stage.backgroundColor = '#71c5cf';

        //  game.load.image('player', 'assets/player/000.png');
        game.load.spritesheet('player', 'assets/player/player.png', 500, 500, 2);
        game.load.spritesheet('enemy', 'assets/enemies-07.png', 500, 800, 2);

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
        this.player.scale.setTo(0.2);
        this.player.animations.add('run');
        this.player.animations.play('run', 5, true);

        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1000;
        this.player.anchor.setTo(0.5, 0.5);

        let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        game.input.onDown.add(this.jump, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
        game.time.events.loop(1000, () => { this.labelScore.text = this.score++; }, this);

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
        game.state.start('game');
    },

    addEnemy: function () {
        let x = 1280;
        let y = 550;
        this.enemy = game.add.sprite(x, y, 'enemy');
        this.enemy.scale.setTo(0.2);
        this.enemy.animations.add('run');
        this.enemy.animations.play('run', 2, true);
        this.enemies.add(this.enemy);
        game.physics.arcade.enable(this.enemy);

        this.enemy.body.velocity.x = -200;
        this.enemy.checkWorldBounds = true;
        this.enemy.outOfBoundsKill = true;
    }
};

