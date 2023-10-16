class SceneSettings extends Phaser.Scene {
  constructor() {
    super("SceneSettings")
  }
  preload() {

  }

  create() {
    global.emitter.on(global.constants.MUSIC_CHANGE, this.updateButtons);
    global.emitter.on(global.constants.SOUND_CHANGE, this.updateButtons);

    this.soundText = "Sound is on";
    this.musicText = "Music is on";

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

    // botão para tirar os efeitos sonoros
    this.soundBtn = new TextButton({
      scene: this,
      key: "green",
      text: "",
      scaleImage: 0.7,
      scaleText: 28,
      pointer: true,
      event: global.constants.TOGGLE_SOUND,
    });
    this.aGrid.placeAtIndex(38, this.soundBtn);

    // botão para tirar a música
    this.musicBtn = new TextButton({
      scene: this,
      key: "green",
      text: "",
      scaleImage: 0.7,
      scaleText: 28,
      pointer: true,
      event: global.constants.TOGGLE_MUSIC,
    });
    this.aGrid.placeAtIndex(60, this.musicBtn);

    // chamamos essa função assim que carregamos a página para que os textos dos botões não
    // fiquem vazios na 1a renderizada
    this.updateButtons();

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
    this.aGrid.placeAtIndex(82, this.titleBtn)
  }

  // funçao que atualiza o texto dos botões
  updateButtons = () => {
    // esse é o texto que vai ficar no botão de som. Ele é dinâmico
    let soundText = "Sound is on";
    if (global.settings.sfxOn === false) {
      soundText = "Sound is off";
    };

    // esse é o texto que vai ficar no botão de música. Ele é dinâmico
    let musicText = "Music is on";

    if (global.settings.musicOn === false) {
      musicText = "Music is off";
    }

    this.soundBtn.textField.setText(soundText);
    this.musicBtn.textField.setText(musicText);
  };
}