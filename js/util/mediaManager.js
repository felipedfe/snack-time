class MediaManager {
  constructor(config) {
    this.scene = config.scene;
    this.music = null;
  }

  playSound(key) {
    if (global.settings.sfxOn) {
      let sound = this.scene.sound.add(key);
      sound.play();
    }
  }

  playMusic(key) {
    if (global.settings.musicOn) {
      this.music = this.scene.sound.add(key, { volume: 0.5, loop: true });
      this.music.play();
    }
  }

  stopMusic() {
    if (global.settings.musicOn) {
      this.music.stop();
      this.music = null;
    }
  };
}