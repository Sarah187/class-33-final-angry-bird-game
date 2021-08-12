class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("sprites/bird.png");
    this.blueBird = loadImage("sprites/bluebird.png");
    this.yellowBird = loadImage("sprites/yellowbird.png");
    this.smokeImage = loadImage("sprites/smoke.png");
    this.trajectory =[];
    this.visibility=255;
  }

  displayTrajectory() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;

    //super.display();

    if(this.body.velocity.x > 10 && this.body.position.x > 200){
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }
   

    for(var i=0; i<this.trajectory.length; i++){
      push()
      this.visibility = this.visibility - 0.5
      tint(255,this.visibility);
      image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
      pop()
    }
  }

  displayBluebird() {
      var angle = this.body.angle;
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.blueBird, 0, 0, this.width, this.height);
      pop();
  }

  displayYellowbird() {
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.yellowBird, 0, 0, this.width, this.height);
    pop();
  }

  displayRedbird() {
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }

}
