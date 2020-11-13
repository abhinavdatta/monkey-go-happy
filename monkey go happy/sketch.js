//to create the sprites
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacle_Image;
var FoodGroup, obstacleGroup;

var survival_time=0;
var PLAY = 1;
var END = 0
var gamestate = PLAY;
var ground2;


function preload() {
//to load the animations and image
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacle_Image = loadImage("obstacle.png");

}
function setup() {
  createCanvas(500, 400);

  //to display and add sprites to game
  monkey = createSprite(80, 100, 20, 20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //project done by 

  ground = createSprite(170, 200, 900, 10);
  ground2 = createSprite(170, 205, 900, 10);
  monkey.debug=true;
  monkey.setCollider("circle",0,0,290);
  
  //to create groups for obstacle and food
    FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("teal");
  
  //code that is used while playing the game
  if (gamestate === PLAY) {
  //monkey gravity
 
    if (keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -12;
    }    
    obstacles();
    food();
    
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground2);
    ground.velocityX = -4;
    if (ground.x < 170) {
      ground.x = width / 2;
    }
   
    if (obstacleGroup.isTouching(monkey)){
      gamestate=END;
       //29 abhinav datta 
       FoodGroup.setLifetimeEach(-1);
       obstacleGroup.setLifetimeEach(-1);
     monkey.velocityX=0;
      ground.velocityX=0;
      monkey.velocityY=0;
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
    
    }
  }
  ground2.visible = false;  
  console.log(monkey.depth);
  
  drawSprites();
 
  textSize(20);
  fill("white");
  survival_time=Math.round(frameCount/frameRate());
  text("survival time"+survival_time,50,40)
      
}
//functions that is used for food
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(80, 180)), 50, 50);
    banana.addImage(bananaImage)
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 120;
    
    banana.debug=false;
    banana.setCollider("circle",0,0,100)
    FoodGroup.add(banana);

  }
}
//check my website https://abhinavdatta2.whjr.site/
//functions that is used for obstacles
function obstacles() {
  if (frameCount % 130 === 0) {
    obstacle = createSprite(600, 170, 50, 50);
    obstacle.addImage(obstacle_Image);
    obstacle.scale = 0.12;
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
  
    obstacle.debug=true;
    obstacle.setCollider("circle",0,0,200);
    obstacleGroup.add(obstacle);

  }
}
