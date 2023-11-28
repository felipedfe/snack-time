class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  preload() {

  }

  create() {
    // Imagem BG
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = game.config.width;
    this.bg.displayHeight = game.config.height;

    // Imagens Personagens
    let characterXPos = 0;
    const spacing = 35;
    this.characters = this.add.group();
    for (let i = 1; i <= 5; i += 1) {
      const character = this.add.image(characterXPos, 70, "character").setInteractive();
      // faz o character ser uma drop zone (setar ele como interactive antes)
      character.input.dropZone = true;
      character.id = i;
      character.setOrigin(0, 0);
      this.characters.add(character);
      characterXPos += character.width + spacing;
    };

    // Imagem Mesa
    this.table = this.add.image(0, game.config.height / 2, "table");
    this.table.displayWidth = game.config.width + 40; // + 40 é pq fiz a imagem de um tam. menor
    this.table.displayHeight = (game.config.height / 2) + 17; // idem
    this.table.setOrigin(0, 0);

    // Imagem Placar
    this.scoreBar = this.add.image(10, game.config.height - 70, "scoreBar");
    this.scoreBar.setOrigin(0, 0);

    // Sorteio
    // lista de personagens e baloes que podem ser sorteados a cada rodada
    this.balloonsToBeDrawn = [1, 2, 3, 4, 5];
    this.charactersToBeDrawn = [1, 2, 3, 4, 5];
    this.roundBalloons = [];
    this.balloonsSelectedInTheRound = [];
    this.drawnBalloons = [];
    this.roundCharacters = [];
    this.charactersSelectedInTheRound = [];

    // Placar
    this.scoreGroup = this.add.group();
    this.score = {};
    this.scoreSlot = 0;
    this.scoreSlotWidth = this.scoreBar.width / 5;

    ///////////////////////////////////////////////////

    this.roundDraw();

    // comportamentos do Drag and Drop 
    this.input.on('dragstart', (pointer, gameObject) => {
      console.log("START!");
      this.children.bringToTop(gameObject);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // this.input.on('dragover', (pointer, gameObject, dropZone) => {
    //   console.log("over!")
    // });

    this.input.on('dragend', (pointer, gameObject, dropped) => {
      if (!dropped) {
        this.returnInitialPosition(gameObject);
      }
    });

    this.input.on('drop', (pointer, gameObject, target) => {
      // console.log('--game ob->', gameObject);
      // console.log('--target->', target);
      // console.log("pointer: ", pointer)
      if (target.balloonId === gameObject.id) {
        console.log("Acertou");
        // console.log('balloon id: ', target)
        gameObject.destroy();
        this.destroyBalloon(target.balloonId);

        if (this.drawnBalloons.length === 0) {
          this.addToScore("right");
          this.roundRestore();
          this.roundDraw();
        }
      } else {
        console.log("Errou")
        this.addToScore("wrong");
        this.roundRestore();
        this.roundDraw();
      }

      console.log(this.roundBalloons)
    })

    // this.input.on('dragenter', (pointer, gameObject, dropZone) => {
    //   console.log("ENTER!")
    //   console.log(dropZone)
    // });

    //// fim da create ////
  };

  destroyScoreTiles() {
    const scoreTiles = this.scoreGroup.children.entries;
    while (scoreTiles.length > 0) {
      const item = scoreTiles.pop();
      item.destroy();
    }
    this.scoreSlot = 0;
    console.log("---->>>",this.scoreGroup)
  }

  nextLevel() {
    this.destroyScoreTiles();
    global.settings.level += 1;
  }

  addToScore(type) {
    const checkOrX = this.add.image(
      this.scoreBar.x + (this.scoreSlotWidth * this.scoreSlot), this.scoreBar.y, type);
    this.scoreGroup.add(checkOrX);
    this.scoreSlot += 1;
    checkOrX.setOrigin(0, 0);

    const gameLevel = global.settings.level;
    if (!this.score[gameLevel]) {
      this.score[gameLevel] = {
        right: 0,
        wrong: 0,
      };
    }

    if (!this.score[gameLevel][type]) {
      this.score[gameLevel][type] = 1;
    } else {
      this.score[gameLevel][type] += 1;
    }

    if (this.scoreGroup.children.entries.length >= 5) {
      console.log("NEXT LEVEL", this.score);
      this.nextLevel();
    }
  }

  // funcao que sorteia um numero
  drawNumber(list) {
    const index = Math.floor(Math.random() * list.length);
    // const drawnNumber = list[index];
    // tira o numero sorteado e retorna o primeiro do array (o array já foi embaralhado antes)
    const drawnNumber = list.splice(index, 1)[0];
    return drawnNumber;
  };

  drawCharacterAndBalloon() {
    let balloonNumber = this.drawNumber(this.roundBalloons);
    let characterNumber = this.drawNumber(this.roundCharacters);

    // associa um personagem a um balao
    const allCharacters = this.characters.children.entries;
    const drawnCharacter = allCharacters.filter((item) => item.id === characterNumber)[0];
    drawnCharacter.balloonId = balloonNumber;

    // adiciona balao proximo ao personagem sorteado na tela
    const drawnBalloon = this.add.image(drawnCharacter.x + 180, 40, `balloon-${balloonNumber}`);
    drawnBalloon.id = balloonNumber;
    drawnBalloon.setOrigin(0, 0);
    this.drawnBalloons.push(drawnBalloon);

    console.log("character list: ", this.charactersToBeDrawn);
    console.log("balloon list: ", this.drawnBalloons);
    // console.log('SCENE: ', this);
  };

  drawDishes() {
    this.dishes = this.add.group();
    let dishInitialXPos = 80;
    let dishInitialYPos;
    let dishOrder = [0, 1, 2, 3, 4,];
    Shuffle.shuffleArray(dishOrder);

    // posiciona os pratos
    for (let i = 0; i < 5; i += 1) {
      // pra fazer o zizag de posicoes de prato
      if (i % 2 === 0) {
        dishInitialYPos = 540;
      } else {
        dishInitialYPos = 420;
      }

      const child = this.add.image(dishInitialXPos, dishInitialYPos, `dish-${dishOrder[i] + 1}`);
      // deixando o prato interativo
      child.setInteractive();
      this.input.setDraggable(child);
      child.id = dishOrder[i] + 1;
      child.initialXPos = dishInitialXPos;
      child.initialYPos = dishInitialYPos;
      this.dishes.add(child);
      this.dishes.setOrigin(0, 0);
      dishInitialXPos += 250;
    };
  };

  // sorteia balao e personagem a cada rodada
  roundDraw() {
    this.roundBalloons = [...this.balloonsToBeDrawn];
    this.roundCharacters = [...this.charactersToBeDrawn];
    Shuffle.shuffleArray(this.roundBalloons);
    Shuffle.shuffleArray(this.roundCharacters);

    this.drawDishes();

    const gameLevel = global.settings.level;
    for (let i = 0; i < gameLevel; i += 1) {
      this.drawCharacterAndBalloon()
    }
  };

  destroyBalloon(id) {
    const balloonIndex = this.drawnBalloons.findIndex((item) => item.id === id);
    const balloon = this.drawnBalloons[balloonIndex];
    balloon.destroy();
    this.drawnBalloons.splice(balloonIndex, 1);
  };

  destroyAllBalloons() {
    const balloons = this.drawnBalloons;
    while (balloons.length > 0) {
      const item = balloons.pop();
      item.destroy();
    }
  };

  roundRestore() {
    // destrói todos os balões sorteados na rodada
    this.destroyAllBalloons();
    // restaura os baloes
    this.roundBalloons = [...this.balloonsToBeDrawn];

    // restaura os pratos e apaga os que sobraram
    const dishesLeft = this.dishes.children.entries;

    while (dishesLeft.length > 0) {
      const item = dishesLeft.pop();
      item.destroy();
    }

    console.log("DISHES: ", this.dishes.children.entries.length)
  };

  returnInitialPosition(gameObj) {
    gameObj.x = gameObj.initialXPos;
    gameObj.y = gameObj.initialYPos;
  };

  update() {

  }
}