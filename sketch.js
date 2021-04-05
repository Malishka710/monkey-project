
var ground;
var monkey, monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;
var obstacles;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(50,390,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  monkey.debug=true;
  
  ground=createSprite(200,400,800,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score=0;
  
}


function draw() {
background("pink");

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time: "+ survivalTime, 100,50);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground);
  
  //call food and obstacles function
 spawnFood();
 spawnObstacles();
  
  stroke("white");
  textSize(20);
  fill("purple");
  text("Score: "+ score, 500,50);
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  if(monkey.isTouching(FoodGroup)){
    score=score+1
  }
  
  drawSprites();
  
}

function spawnFood(){
if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = Math.round(random(120,200));    
    banana.velocityX = -5;
        //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
 
    //add each banana to the group
    FoodGroup.add(banana);
  }
  
}

function spawnObstacles() {
if(frameCount % 300 === 0) {

 var obstacle = createSprite(800,380,10,40);
 obstacle.debug=true;
  obstacle.velocityX = -6 ; 
    //add image of obstacles
 obstacle.addImage(obstacleImage);
 obstacle.scale = 0.15;
  //assign a lifetime to the variable
  obstacle.lifetime = 300;
  monkey.depth = obstacle.depth+1
  

  
  //add each obstacle to group
  obstaclesGroup.add(obstacle);
}
}






