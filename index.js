var game = new Phaser.Game(800,600, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update, render: render});

var player;
var starfield;
var cursors;
var ACCELERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;
var bank;
var shipTrail;
var bullets;
var fireButton;

function preload() {
  game.load.image('starfield','./assets/starfield.png');
  game.load.image('ship','./assets/player.png');
  game.load.image('bullet','./assets/bullet.png');
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
  //controls to play the game
  cursors= game.input.keyboard.createCursorKeys();
  //Add an emitter for the ship's shipTrail
  shipTrail = game.add.emitter(player.x, player.y + 10, 400);
  shipTrail.width = 10;
  shipTrail.makeParticles('bullet');
  shipTrail.setXSpeed(30,-30);
  shipTrail.setYSpeed(200,180);
  shipTrail.setRotation(50,-50);
  shipTrail.setAlpha(1,0.01,800);
  shipTrail.setScale(0.05,0.4,0.05,0.4,2000,Phaser.Easing.Quintic.Out);
  shipTrail.start(false,5000,10);
  //Add: bullets
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 1);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
  // fire button
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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
  // Fire bullet
  if (fireButton.isDown || game.input.activePointer.isDown) {
    fireBullet();
  }
  function fireBullet(){
    var bullet = bullets.getFirstExists(false);
    if(bullet){
      bullet.reset(player.x,player.y +8);
      bullet.body.velocity.y = -400;
    }
  }

  //move ship towards mouse pointer add:mouse control
  if(game.input.x <game.width -20 && game.input.x > 20 && game.input.y >20 && game.input.y < game.height - 20) {
    var minDist = 200;
    var dist = game.input.x - player.x;
    player.body.velocity.x = MAXSPEED * game.math.clamp(dist/minDist, -1, 1);
  }
  //banking effect does look really nice... but how.. does this get here ?
  bank=player.body.velocity.x/MAXSPEED;
  player.scale.x=1 - Math.abs(bank)/2;
  player.angle=bank*30;
  shipTrail.x=player.x
}

function render() {

}
