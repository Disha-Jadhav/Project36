var dog, dogImage, happyDogImage;
var  database;
var foodS, foodStock;
var Food;
var FeedTime;

    function preload()
    {
      dogImage = loadImage("images/dogImg.png");
      happyDogImage = loadImage("images/dogImg1.png");
    }

    function setup() 
    {
      createCanvas(800, 600);
      
      database = firebase.database();

      dog = createSprite(700, 250, 100, 100);
      dog.addImage(dogImage);
      dog.scale = 0.3;

      foodObj = new food();

      foodStock = database.ref('Food');
      foodStock.on("value", readStock);
      
      feed = createButton("Feed the dog");
      feed.position(250, 50);
      feed.mousePressed(feedDog);

      addFood = createButton("Add Food");
      addFood.position(350, 50);
      addFood.mousePressed(addFoodS);
    }

function draw() 
{ 
  background(46, 139, 87);

  foodObj.display();

  drawSprites();

  fill("white");
  textSize(20);
  stroke("white");
}

function readStock(data)
{
  foodS = data.val();
}

function feedDog()
{
  dog.addImage(happyDogImage);

  foodS = foodS - 1
 
  database.ref('/').update({
    foodStock: foodS,
    FeedTime: hour()
  })
}

function addFoodS()
{
  foodS++

  dog.addImage(dogImage);

  database.ref('/').update(
  {
    foodStock: foodS
  });
}