class Effect extends UIBlock {
  constructor(config) {
    super();

    this.scene = config.scene;
    let key = "effect" + config.effectNumber;
    // aqui embaixo é gerado todos os frames do spritesheet para eles ñ terem que ser colocados
    // um a um na chave frame da anima que estamos criando
    let frameNames = this.scene.anims.generateFrameNumbers(key);
    let animKey = "animKey" + config.effectNumber;

    this.scene.anims.create({
      key: animKey,
      frames: frameNames,
      frameRate: 32,
      repeat: false,
    });

    this.effectImage = this.scene.add.sprite(0, 0, key);
    // esse método add é do UIBlock
    this.add(this.effectImage);
    // destruimos o objeto depois de executado. esse this é o próprio objeto e ele é passado
    // para a destroyMe como um argumento extra
    this.effectImage.on("animationcomplete", this.destroyMe, this);
    this.effectImage.play(animKey);
  }

  static preload = (scene, effectNumber) => {
    let key = "effect" + effectNumber;
    let path = "images/effects/" + effectNumber + ".png";

    scene.load.spritesheet(key, path, { frameWidth: 100, frameHeight: 100 });
  }

  destroyMe = () => {
    this.destroy();
  };
}