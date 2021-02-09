var trex, trex_running, trexc;
var ground, invisibleGround, groundImage;
var gameover, restart;
var gameover1, restart1;
var cloud, cloudsGroup, cloudImage;
var obs1, obs2, obs3, obs4, obs5, obs6;
var score;
const PLAY = 1;
const STOP = 0;
const RESET = 2;
var gameserve = STOP;
var newImage;
var cactusG, cloudG;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexc = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  gameover = loadImage("gameOver.png");
  restart = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexc);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;


  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  console.log("Hello" + 5)
  score = 0;

  cactusG = createGroup();
  cloudG = createGroup();
  gameover1 = createSprite(300, 100, 10, 10);
  gameover1.addImage(gameover);
  gameover1.scale = 0.75;

  restart1 = createSprite(300, 100, 10, 10);
  restart1.addImage(restart);
  restart1.scale = 0.45;

  gameover1.visible = false;
  restart1.visible = false;

}

function draw() {
  background(180);
  if (keyDown("space") && trex.y >= 100 && gameserve != RESET) {
    trex.velocityY = -10;
    gameserve = PLAY;
  }

  if (gameserve === PLAY) {
    ground.velocityX = -4;
    trex.changeAnimation("running", trex_running);
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnClouds();
    cas();
    score = score + 1;
    if (trex.isTouching(cactusG)) {
      gameserve = STOP;
      gameover1.visible = true;
      restart1.visible = true;
    }
  } else if (gameserve === STOP) {
    ground.velocityX = 0;
    cactusG.setVelocityXEach(0);
    cloudG.setVelocityXEach(0);
    trex.changeAnimation("collided", trexc);
    cactusG.setLifetimeEach(-200);
    cloudG.setLifetimeEach(-100);
    if ((mousePressedOver(restart1) || keyWentDown("space"))) {
      gameserve = RESET;
    }
  } else {
    cactusG.destroyEach();
    cloudG.destroyEach();
    gameover1.visible = false;
    restart1.visible = false;
    score = 0;
    gameserve = STOP
  }






  trex.velocityY = trex.velocityY + 0.8



  trex.collide(invisibleGround);

  //spawn the clouds

  text("score =  " + score, 400, 50);



  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;


    //assigning lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudG.add(cloud);
  }
}

function cas() {

  if (frameCount % 40 === 0) {
    var cas1 = createSprite(580, 165, 10, 10);
    cas1.velocityX = -3;
    var x = Math.round(random(1, 6));

    // if(x === 1){
    //   cas1.addImage(obs1);
    // }else if(x === 2){
    //   cas1.addImage(obs2);
    // }else if(x===3){
    //   cas1.addImage(obs3);
    // }else if(x===4){
    //   cas1.addImage(obs4);
    // } 
    switch (x) {
      case 1:
        cas1.addImage(obs1);
        break;
      case 2:
        cas1.addImage(obs2);
        break;
      case 3:
        cas1.addImage(obs3);
        break;
      case 4:
        cas1.addImage(obs4);
        break;
      case 5:
        cas1.addImage(obs5);
        break;
      case 6:
        cas1.addImage(obs6);
        break;
      default:
        break;

    }
    cas1.scale = 0.5
    cactusG.add(cas1);
    cas1.lifetime = 195;




  }

}