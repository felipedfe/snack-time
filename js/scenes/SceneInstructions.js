class SceneInstructions extends Phaser.Scene {
  constructor() {
    super("SceneInstructions")
  }
  preload() {

  }

  create() {
    // fundo
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = game.config.width;
    this.bg.displayHeight = game.config.height;

    // grid
    this.aGrid = new AlignGrid({
      scene: this,
      rows: 11,
      cols: 11
    });
    // this.aGrid.showNumbers();

    // texto
    this.text1 = this.add.text(0, 0,
      global.settings.instrText,
      {
        color: "#000000",
        fontSize: game.config.width / 28,
        backgroundColor: "#ffffff",
      }
    );
    this.text1.setAlign("center");
    // this.text1.setFontStyle("bold");
    this.text1.setOrigin(0.5, 0.5);
    this.text1.setLineSpacing(8)
    this.text1.setPadding(15, 15, 15, 15)
    this.aGrid.placeAtIndex(82, this.text1);

    // botão para voltar pra tela inicial
    this.titleBtn = new TextButton({
      scene: this,
      key: "blue",
      text: "Home",
      scaleImage: 0.7,
      scaleText: 28,
      pointer: true,
      event: global.constants.SHOW_TITLE,
    })
    this.aGrid.placeAtIndex(104, this.titleBtn)
  }
}