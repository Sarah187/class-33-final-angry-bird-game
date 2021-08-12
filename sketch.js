const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var Redbird, Yellowbird, Bluebird, slingshot;
var response, responseType, dateTime, hour;
var score = 0
var birds = [];
var gameState = "onSling";
var refreshButton, birdSound, flySound;

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    refreshButton = loadImage("sprites/refresh.png");
    birdSound = loadSound("sprites/bird_select.mp3");
    flySound = loadSound("sprites/bird_flying.mp3");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    Redbird = new Bird(200,50);
    Yellowbird = new Bird(150,200);
    Bluebird = new Bird(100,200);
    //pushing birds inside birds array
    birds.push(Bluebird);
    birds.push(Yellowbird);
    birds.push(Redbird);
    console.log(birds);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(Redbird.body,{x:200, y:50});

    refreshButton = createImg("sprites/refresh.png");
    refreshButton.position(50,20);

    time();
}

function draw(){

    if(backgroundImg){
        background(backgroundImg);
    }

    textSize(30)
    fill("white")
    text("angry bird game",300,50);
    text("hour = " + hour,600,50);
    text("score: " + score,800,50);

    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    pig3.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    Redbird.displayRedbird();
    Redbird.displayTrajectory();
    Yellowbird.displayYellowbird();
    Yellowbird.displayTrajectory();
    Bluebird.displayBluebird();
    Bluebird.displayTrajectory();
    platform.display();
    //log6.display();
    slingshot.display();

    refreshButton.mousePressed(reset);

}

function mouseDragged(){
    if (mouseX > 0 && mouseX < 200 && gameState!=="launched"){
        flySound.play();
        Matter.Body.setPosition(birds[birds.length -1].body, {x: mouseX , y: mouseY})
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    birds.pop();
}

function keyPressed(){
    if(keyCode === 32 && gameState == "launched"){
        slingshot.attach(birds[birds.length -1].body);
        Matter.Body.setPosition(birds[birds.length -1].body, {x: 200, y: 50});
        birds.trajectory=[];
        gameState = "onSling"
        birdSound.play();
    }
}

function reset() {
    location.reload();
}

async function time(){
    response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London")
    console.log(response)
    responseType = await response.json()
    console.log(responseType)
    dateTime = responseType.datetime
    console.log(dateTime)
    hour = dateTime.slice(11,13)
    console.log(hour)

    if(hour >= 06 && hour >= 13){
        bg = "sprites/bg.png"
    }
    else{
        bg = "sprites/bg2.jpg"
    }
    backgroundImg = loadImage(bg)
}