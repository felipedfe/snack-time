// Imagem BG
const renderBackground = (scene) => {
  scene.bg = scene.add.image(0, 0, "titleBack");
  scene.bg.setOrigin(0, 0);
  scene.bg.displayWidth = game.config.width;
  scene.bg.displayHeight = game.config.height;
};

// Imagens Personagens
const renderCharacters = (scene) => {
  let characterXPos = 0;
  const spacing = 35;
  scene.characters = scene.add.group();
  for (let i = 1; i <= 5; i += 1) {
    const character = scene.add.image(characterXPos, 70, "character").setInteractive();
    // faz o character ser uma drop zone (setar ele como interactive antes)
    character.input.dropZone = true;
    character.id = i;
    character.setOrigin(0, 0);
    scene.characters.add(character);
    characterXPos += character.width + spacing;
  };
};

// Imagem Mesa
const renderTable = (scene) => {
  scene.table = scene.add.image(0, game.config.height / 2, "table");
  scene.table.displayWidth = game.config.width + 40; // + 40 é pq fiz a imagem de um tam. menor
  scene.table.displayHeight = (game.config.height / 2) + 17; // idem
  scene.table.setOrigin(0, 0);
};

// Imagem Placar
const renderScore = (scene) => {
  scene.scoreBar = scene.add.image(10, game.config.height - 70, "scoreBar");
  scene.scoreBar.setOrigin(0, 0);
};