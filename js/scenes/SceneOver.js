class SceneOver extends Phaser.Scene {
  constructor() {
    super('SceneOver');
  }

  create() {
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });

    // essa imagem foi carregada na SceneMain
    this.btnPlayAgain = this.add.image(0, 0, "btnPlayAgain");
    Align.center(this.btnPlayAgain);
    this.btnPlayAgain.setInteractive();
    this.btnPlayAgain.on("pointerdown", this.playAgain);

    this.btnInstr = new TextButton({
      scene: this,
      key: "blue",
      text: "Back to Start",
      scaleImage: 0.7,
      scaleText: 28,
      pointer: true,
      event: global.constants.SHOW_TITLE,
    })

    this.aGrid.placeAtIndex(82, this.btnInstr);
  }

  playAgain = () => {
    this.scene.start("SceneMain");
  }

  update() {

  }
}