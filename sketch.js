var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedTime,lastFeed,feed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
 database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
lastFeed=data.val();
  })

  fill(255,255,245);
  textSize(15);
  if(lastFeed>=12){
    text("Last Feed: " +lastFeed%12+"PM",350,30);
  }
  else if(lastFeed==0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last feed:" + lastFeed+"AM",350,30);
    
  }
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
