
var monkey , monkey_running
var bananaImage, obstacle, obstacleImage
var FoodGroup, ObstacleGroup, monkey_stop;
var score = 0
var survival_time = 0;
var gameState = "PLAY";
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    monkey_stop = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 

}



function setup() {
createCanvas(400,355);
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving", monkey_running);
monkey.addAnimation("stop" , monkey_stop);
monkey.scale = 0.1;

ground = createSprite(400,350,900,10);
ground.velocityX = -4;
console.log(ground.x);
  
FoodGroup = new Group();
ObstacleGroup = new Group();
}


function draw() {
  background("white");
  //monkey.setCollider("circle" , 150,100, obstacle);
  if (gameState === "PLAY" ) {
 if (ground.x <0) {
  ground.x = ground.width/2;

  }
  
  if (keyDown("space") &&  monkey.y >150) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill ("black");

  
  food();
  rock();
    if (FoodGroup.isTouching(monkey)) {
      score = score + 2;
      FoodGroup.destroyEach();
    }
    
  if (ObstacleGroup.isTouching(monkey)) {
    monkey.changeAnimation("stop" , monkey_stop);
    gameState = "END"
    }
  }
      text("Score :  " + score, 300,50);
  survival_time = Math.ceil(frameCount/World.frameRate);
  text ("Survival Time :    " + survival_time, 100, 50);
  //text(score)
drawSprites();
  if (gameState === "END") {
    ground.velocityX = 0;
    obstacle.velocityX = 0;
   
  }
}



function food () {
  if (frameCount % 80 === 0) {
    
  var banana = createSprite(400,50,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -2;  
  banana.y = Math.round(random(50,200));
  banana.lifetime = 150;
     FoodGroup.add(banana);
}
 
}
function rock () {
  if (frameCount % 300 === 0) {
  obstacle = createSprite (400,310,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -3;
  obstacle.lifetime = 130;
  ObstacleGroup.add(obstacle);
}
}