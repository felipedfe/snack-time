class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  preload() {

  }

  create() {
    // BG
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = game.config.width;
    this.bg.displayHeight = game.config.height;

    // Personagens
    let characterXPos = 0;
    const spacing = 35;
    this.characters = this.add.group();
    for (let i = 1; i <= 5; i += 1) {
      const character = this.add.image(characterXPos, 70, "character");
      character.id = i;
      character.setOrigin(0, 0);
      this.characters.add(character);
      characterXPos += character.width + spacing;
    };

    // Mesa
    this.table = this.add.image(0, game.config.height / 2, "table");
    this.table.displayWidth = game.config.width + 40; // + 40 é pq fiz a imagem de um tam. menor
    this.table.displayHeight = (game.config.height / 2) + 17; // idem
    this.table.setOrigin(0, 0);

    // Pratos
    this.dishes = this.add.group();
    let dishXPosition = 80;
    let dishOrder = [0, 1, 2, 3, 4,];
    let dishYPosition;
    Shuffle.shuffleArray(dishOrder);

    for (let i = 0; i < 5; i += 1) {
      // pra fazer o zizag de posicoes de prato
      if (i % 2 === 0) {
        dishYPosition = 540;
      } else {
        dishYPosition = 420;
      }

      const child = this.add.image(dishXPosition, dishYPosition, `dish-${dishOrder[i] + 1}`);
      child.id = i;
      this.dishes.add(child);
      this.dishes.setOrigin(0, 0);
      dishXPosition += 250;
    };

    // Sorteio
    this.RoundDraw();

  } //// fim da create ////


  // funcao que sorteia um numero
  drawNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }

  // sorteia balao e personagem
  RoundDraw() {
    let balloonNumber = this.drawNumber();
    let characterNumber = this.drawNumber();

    const allCharacters = this.characters.children.entries;
    const drawnCharacter = allCharacters.filter((item) => item.id === characterNumber)[0];
    drawnCharacter.balloonId = balloonNumber;
    console.log("1->", characterNumber);
    console.log("2->", drawnCharacter);

    // adiciona balao proximo ao personagem sorteado
    this.roundBalloon = this.add.image(drawnCharacter.x + 180, 40, `balloon-${balloonNumber}`);
    this.roundBalloon.setOrigin(0, 0);
  };

  update() {

  }
}