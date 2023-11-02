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
      const character = this.add.image(characterXPos, 70, "character").setInteractive();
      // faz o character ser uma drop zone (setar ele como interactive antes)
      character.input.dropZone = true;
      console.log("CHARACTER: ", character)

      // drop zone
      //const characterDropZone = this.add.zone(characterXPos, 70, character.width, character.height);
      //characterDropZone.setInteractive();
      //console.log("CHARACTER ZONE: ", characterDropZone);

      // contorno da drop zone
      //const zoneOutline = this.add.graphics();
      //zoneOutline.lineStyle(2, 0xffff00);
      //zoneOutline.strokeRect(characterDropZone.x, characterDropZone.y, characterDropZone.width, characterDropZone.height);

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
    let dishInitialXPos = 80;
    let dishInitialYPos;
    let dishOrder = [0, 1, 2, 3, 4,];
    let dishShuffled = [...dishOrder];
    Shuffle.shuffleArray(dishOrder);

    console.log("ORDEM : ", dishOrder)

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

    // Sorteio
    // lista de personagens e baloes que podem ser sorteados a cada rodada
    this.balloonsToBeDrawn = [1, 2, 3, 4, 5];
    this.characterToBeDrawn = [1, 2, 3, 4, 5];
    this.roundBalloons = [...this.balloonsToBeDrawn];
    this.roundCharacters = [...this.characterToBeDrawn];
    this.drawnBalloons = [];
    Shuffle.shuffleArray(this.roundBalloons);
    Shuffle.shuffleArray(this.characterToBeDrawn);
    this.RoundDraw(this, this.balloonsToBeDrawn, this.characterToBeDrawn);

    // comportamentos do Drag and Drop 
    this.input.on('dragstart', (pointer, gameObject) => {
      console.log("START!");
      this.children.bringToTop(gameObject);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // this.input.on('dragenter', (pointer, gameObject, dropZone) => {
    // });

    // this.input.on('dragover', (pointer, gameObject, dropZone) => {
    //   console.log("over!")
    // });

    this.input.on('dragend', (pointer, gameObject, dropped) => {
      if (!dropped) {
        this.returnInitialPosition(gameObject);
      }
    });

    this.input.on('drop', (pointer, gameObject, target) => {
      console.log('--game ob->', gameObject);
      // console.log('--target->', target);
      console.log("pointer: ", pointer)
      if (target.balloonId === gameObject.id) {
        console.log("Acertou")
        console.log('balloon id: ', target)
        gameObject.destroy();
        this.destroyBalloon(target.balloonId);
      } else {
        console.log("Errou")
        this.returnInitialPosition(gameObject);
      }
    })

    // this.input.on('dragenter', (pointer, gameObject, dropZone) => {
    //   console.log("ENTER!")
    //   console.log(dropZone)
    // });

    this.input.on('drop', (pointer, gameObject, dropZone) => {
      // if (dropZone) {
      console.log("DROPPED!")
      // }
    });

  } //// fim da create ////


  // funcao que sorteia um numero
  drawNumber(list) {
    const index = Math.floor(Math.random() * list.length);
    // const drawnNumber = list[index];
    // tira o numero sorteado e retorna o primeiro do array (o array já foi embaralhado antes)
    const drawnNumber = list.splice(index, 1)[0];
    return drawnNumber;
  }

  // sorteia balao e personagem a cada rodada
  RoundDraw(scene, balloonList, characterList) {
    const gameLevel = global.settings.level;
    for (let i = 0; i < gameLevel; i += 1) {
      let balloonNumber = this.drawNumber(balloonList);
      let characterNumber = this.drawNumber(characterList);

      // associa um personagem a um balao
      const allCharacters = this.characters.children.entries;
      const drawnCharacter = allCharacters.filter((item) => item.id === characterNumber)[0];
      drawnCharacter.balloonId = balloonNumber;
      console.log("----------")
      console.log("characterNumber ->", characterNumber);
      console.log("balloonNumber ->", balloonNumber);
      //console.log("persongem sorteado ->", drawnCharacter);

      // adiciona balao proximo ao personagem sorteado na tela
      const drawnBalloon = this.add.image(drawnCharacter.x + 180, 40, `balloon-${balloonNumber}`);
      drawnBalloon.id = balloonNumber;
      drawnBalloon.setOrigin(0, 0);
      scene.drawnBalloons.push(drawnBalloon);

      console.log("character list: ", characterList);
      console.log("balloon list: ", balloonList);
      console.log('SCENE: ', scene.drawnBalloons);
    }
  };

  destroyBalloon(id) {
    const self = this;
    const balloon = this.drawnBalloons.find((item) => item.id === id);
    balloon.destroy();
    console.log('this ', self)
  }

  returnInitialPosition(gameObj) {
    gameObj.x = gameObj.initialXPos;
    gameObj.y = gameObj.initialYPos;
  };


  update() {

  }
}