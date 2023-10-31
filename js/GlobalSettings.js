class GlobalSettings {
  constructor() {
    this.level = 1;
    this.score = 0;
    this._musicOn = true;
    this._sfxOn = true;
    this.gameTitle = "Snack time";
    this.instrText = "Instructions Here";
  }

  set musicOn(value) {
    this._musicOn = value;
    // aqui é disparado uma action caso o valor mude
    global.emitter.emit(global.constants.MUSIC_CHANGE);
  }

  get musicOn() {
    return this._musicOn;
  }

  set sfxOn(value) {
    this._sfxOn = value;
    global.emitter.emit(global.constants.SOUND_CHANGE);
  }

  get sfxOn() {
    return this._sfxOn;
  }
}