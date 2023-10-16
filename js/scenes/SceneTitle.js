class SceneTitle extends Phaser.Scene {
  constructor() {
    super('SceneTitle');
  }
  preload() {

  }

  create() {
    // fundo
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = game.config.width;
    this.bg.displayHeight = game.config.height;

    // texto de título
    this.titleText = this.add.text((game.config.width / 2), 230, global.settings.gameTitle, {
      fontSize: game.config.width / 10,
      color: "#ffffff",
    })
    this.titleText.setOrigin(0.5, 0);

    // criando grid para posicionar os botões
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    // this.aGrid.showNumbers();

    // criando um botão com fundo reutilizável
    this.startBtn = new TextButton({
      scene: this,
      key: "green",
      text: "Start Game",
      scaleImage: 1.5,
      scaleText: 32,
      // callBack: this.startGame,
      pointer: false,
      event: global.constants.START_GAME,
    })
    this.aGrid.placeAtIndex(71, this.startBtn)
  }

  // não está sendo usada, mas serve pra mostrar que poderíamos enviar essa funcao como
  // callback para um botão e iniciar o jogo
  startGame = () => {
    global.emitter.emit("SHOW_INSTR");
  }
}