var game = new Phaser.Game(800,600, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update, render: render});

var player;
var starfield;
var cursors;
function preload() {
  game.load.image('starfield','./assets/starfield.png');
  game.load.image('ship','./assets/player.png');
}

function create() {
  //here is how to add the background simply do game.add and tileSprite is a method written in phaser file, in ES6, i'd use let here to declare this
  starfield = game.add.tileSprite(0,0,800,600,'starfield');

  //add the player by using the sprite method
  player = game.add.sprite(400,500,'ship');
  //position the player after adding it
  player.anchor.setTo(0.5,0.5);
}
//the update function will add movement
function update() {
//adding the y axis of the tile position will scroll the background up so if i change to x i can scroll the background right and this inpsires a mario runner game 
  starfield.tilePosition.y +=2;
}

function render() {

}
