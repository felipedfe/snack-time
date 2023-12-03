class TextButton extends UIBlock {

  constructor(config) {
    super();
    this.scene = config.scene;

    if (!config.scaleImage) {
      config.scaleImage = 1;
    }

    if (!config.scaleText) {
      config.scaleText = 30;
    }

    // pode ser passada uma callback que será ativada após um clique
    if (config.callBack) {
      this.callBack = config.callBack;
    }

    if (config.event) {
      this.event = config.event;
    }

    this.back = this.scene.add.image(0, 0, config.key)
    // aqui deixamos ele interativo para se clicar
    this.back.setInteractive()
    this.back.on("pointerdown", this.pressed);
    if (config.pointer) {
      this.addCursorPointer();
    }
    // abaixo o back é adicionado ao textButton (que herda o método add da IUBlock)
    this.add(this.back)
    this.back.setScale(config.scaleImage)


    // abaixo o texto do botão
    this.textField = this.scene.add.text(0, 0, config.text, {
      fontSize: game.config.width / config.scaleText,
    });
    // o default origin do texto é (0,0)
    this.textField.setOrigin(0.5, 0.5);
    this.add(this.textField);
  }

  addCursorPointer = () => {
    this.back.on("pointerover", () => this.scene.input.setDefaultCursor("pointer"));
    this.back.on("pointerout", () => this.scene.input.setDefaultCursor("auto"));
    this.back.on("pointerdown", () => {
      this.scene.input.setDefaultCursor("pointer");
    });

    // Event for when the pointer is released after clicking the button
    this.back.on("pointerup", () => {
      this.scene.input.setDefaultCursor("pointer");
    });
  };


  pressed = () => {
    if (this.callBack) {
      this.callBack();
    }

    if (this.event) {
      // esse this.scene.scene é um segundo parâmetro opcional que pode ser passado
      // para o escutador de evento. por exe, no Controller em startGame, o parâmetro scene
      // recebido lá vai ser igual a this.scene.scene. Essa sintaxe tá estranha pq this.scene
      // nesse objeto equivale a this, que é a cena que foi passada pra ele acessar
      global.emitter.emit(this.event, this.scene.scene);

      this.back.removeListener("pointerover");
      this.back.removeListener("pointerout");
    }
  };
}