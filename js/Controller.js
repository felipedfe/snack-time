// aqui vão ficar organizados os nosso eventos
class Controller {
  constructor() {
    global.emitter.on(global.constants.START_GAME, this.startGame);
    global.emitter.on(global.constants.SHOW_INSTR, this.showInstructions);
    global.emitter.on(global.constants.SHOW_SETTINGS, this.showSettings);
    global.emitter.on(global.constants.SHOW_TITLE, this.showTitle);
    global.emitter.on(global.constants.TOGGLE_MUSIC, this.toggleMusic);
    global.emitter.on(global.constants.TOGGLE_SOUND, this.toggleSound);
  }

  startGame = (scene) => {
    scene.start("SceneMain");
  };

  showInstructions = (scene) => {
    scene.start("SceneInstructions");
  };

  showSettings = (scene) => {
    scene.start("SceneSettings");
  };

  showTitle = (scene) => {
    scene.start("SceneTitle");
  };

  toggleMusic = () => {
    global.settings.musicOn = !global.settings.musicOn;
  };

  toggleSound = () => {
    global.settings.sfxOn = !global.settings.sfxOn;
  };
}