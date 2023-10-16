class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  preload() {

  }

  create() {
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = game.config.width;
    this.bg.displayHeight = game.config.height;

    this.table = this.add.image(0, 0, "table");
    this.table.displayWidth = game.config.width + 40;
    this.table.setOrigin(0, 0);
  }


  update() {

  }
}