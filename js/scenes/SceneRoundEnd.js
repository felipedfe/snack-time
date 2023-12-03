class SceneRoundEnd extends Phaser.Scene {
  constructor() {
    super('SceneRoundEnd');
  }

  preload() {

  }

  create() {
    // renderBackground(this);
    // BG
    const bg = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000)
    bg.setOrigin(0, 0);
    bg.alpha = 0.5;

    // grid
    this.aGrid = new AlignGrid({
      scene: this,
      rows: 11,
      cols: 11
    });

    // número do último estágio jogado
    const lastStage = global.settings.level - 1;

    // texto de título
    this.titleText = this.add.text((game.config.width / 2), 230, `Fim da fase ${lastStage}`, {
      fontSize: 60,
      color: "#ffffff",
    })
    this.titleText.setOrigin(0.5, 0.5);

    this.nextStage = new TextButton({
      scene: this,
      key: "green",
      text: "PRÓXIMA FASE",
      scaleImage: 2,
      scaleText: 28,
      pointer: true,
      event: global.constants.RETURN_TO_GAME,
      // callBack: this.goToSceneMain,
    });
    // this.aGrid.showNumbers();
    this.aGrid.placeAtIndex(71, this.nextStage);

    // Erros e acertos
    this.rightText = this.add.text(0, 0, `Acertos: ${global.settings.score[lastStage].right}`, {
      fontSize: 40,
    });
    this.rightText.setOrigin(0.5, 0.5);
    this.aGrid.placeAtIndex(93, this.rightText);

    this.wrongText = this.add.text(0, 0, `Erros: ${global.settings.score[lastStage].wrong}`, {
      fontSize: 40,
    });
    this.wrongText.setOrigin(0.5, 0.5);
    this.aGrid.placeAtIndex(104, this.wrongText);

    console.log(global);
  }

  // goToSceneMain = () => {
  //   const sceneMain = this.scene.get('SceneMain');
  //   console.log("__CONFIg: ", sceneMain)
  //   sceneMain.start('SceneMain');
  // };

  update() {

  }
}