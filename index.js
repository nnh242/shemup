var game = new Phaser.Game(800,600, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update, render: render});

var player;
var starfield;
var cursors;
var ACCELERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;
var bank;

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
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.maxVelocity.setTo(MAXSPEED,MAXSPEED);
  player.body.drag.setTo(DRAG,DRAG);
  cursors= game.input.keyboard.createCursorKeys();
}
//the update function will add movement
function update() {
//adding the y axis of the tile position will scroll the background up so if i change to x i can scroll the background right and this inpsires a mario runner game
  starfield.tilePosition.y +=2;

  player.body.acceleration.x=0;

  if(cursors.left.isDown) {
    //manipulating along the x axis here will move the player left and right
    //player.body.velocity.x=-200;
    player.body.acceleration.x = -ACCELERATION;
  }
  else if (cursors.right.isDown){
    //player.body.velocity.x=200;
    player.body.acceleration.x = ACCELERATION;
  }
  //if the position of the player is 50px less than the edge then stop the player hence the acceleration is set back to 0
  if(player.x > game.width - 50) {
    player.x=game.width - 50;
    player.body.acceleration.x = 0;
  }
  if(player.x < 50) {
    player.x=50;
    player.body.acceleration.x=0;
  }
  //banking effect does look really nice... but how.. does this get here ?
  bank=player.body.velocity.x/MAXSPEED;
  player.scale.x=1 - Math.abs(bank)/2;
  player.angle=bank*10;
}

function render() {

}
