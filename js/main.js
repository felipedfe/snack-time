var game;
var testObject;

var global = {};

window.onload = function () {
  //// Esse código é da doc do Phaser para checar se estamos num mobile
  var isMobile = navigator.userAgent.indexOf("Mobile");
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }
  var w = 1360;
  var h = 740;

  if (isMobile != -1) {
    w = window.innerWidth;
    h = window.innerHeight;
  }
  ////

  var config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    // parent indica em que lugar da página o game vai ficar. Só colocar o id do elemento
    parent: 'game-container',
    // scene é a 'porta de entrada' pro game. A primeira cena é o índice 0 do array
    scene: [
      SceneLoad,
      //SceneTitle,
      SceneMain,
      SceneRoundEnd,
      SceneOver,
      SceneInstructions,
      SceneSettings
    ]
  };

  // aqui temos opções globais como o número de blocos para cada fase do game
  global.settings = new GlobalSettings();

  global.constants = new Constants();

  game = new Phaser.Game(config);
}