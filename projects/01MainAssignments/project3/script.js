var vehicles = [];
let seed = 73837843789
let easing = 0.05
let gameState = "start"
let spaceship;
let score = 0;

class Vehicle {
	// constructor 
	constructor(x, y, color, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.color = color;
		this.w = 70; // width
		this.h = random(20,40); // height 
		this.collision = false;
	}


	// the update method handles our simple "physics" here
	update() {
		this.x += this.speed; // we can move the ca by adding speed to position 
		// return the vehicle to the start of the screen if goes out of bounds
		if (this.x > width) {
			this.x = 0 - this.w;
		}

		if (this.x < 0 - this.w) {
			this.x = width + this.w;
		}
	}

	checkColision(vehicles) {
		// check collision 
		let collision = false;
		for (var j = 0; j < vehicles.length; j++) {
			if (this != vehicles[j] && this.checkRectangleOverlap(this, vehicles[j])) {
				collision = true;
			}
		}
		this.collision = collision;
	}

	// the drive method calls the update method, and then draws the vehicle on the screen
	display() {
		push();
		noStroke();
		if (!this.collision) {
			fill(this.color);
		} else {
			fill(255, 0, 0);
		}
		fill(this.color);
		translate(this.x, this.y);
		strokeWeight(2)
		stroke(0)
		rect(0, 0, this.w, this.h,0,20,20,0);
		fill(255)
		strokeWeight(3)
		stroke(0)
		circle(this.w * 0.6, this.h * 0.5, this.h * 0.5 )
		//rect(this.w * -0.3, this.h * 0.2,this.w * 0.3, this.h * 0.2)
		fill("#F3C623")
		noStroke()
		rect(0,0+1, this.w *0.2, this.h -2)
		
		pop();
	}

	checkRectangleOverlap(rect1, rect2) {
		//simple rectangle collision detection
		if (
			rect1.x < rect2.x + rect2.w &&
			rect1.x + rect1.w > rect2.x &&
			rect1.y < rect2.y + rect2.h &&
			rect1.h + rect1.y > rect2.y
		) {
			return true;
		}
		return false;
	}
}


let objx, objy

class Spaceship extends Vehicle {
	// constructor 
	constructor(x,y,color) {
		super(x, y, color, 0)
		this.w = 50; // width
		this.h = 50; // height 
		//this.collision = false;
	}

	// the update method handles our simple "physics" here
	update() {
		this.x = lerp(this.x, mouseX, 0.05); // Glatte Bewegung zu mouseX
    this.y = lerp(this.y, mouseY, 0.05); // Glatte Bewegung zu mouseY
	}
	
	display() {
		 push();
        translate(this.x, this.y);
        noStroke();
        fill(this.collision ? color(255,0,0) : this.color); // if statement better
        stroke("#F3C623");
        strokeWeight(2);

        // Hauptkörper
        circle(0, 0, 50);

        // Innerer Kreis
        fill("#E4EEEF");
        stroke(0);
        circle(0, 0, 30);
        pop();
	}
		}

function setup() {
	createCanvas(windowWidth, windowHeight);
	objx = width /2
	objy = height /2
	
	// lets create some new car objects! 	
	for (let i = 0; i < 20; i++) {
		let newColor = color(random(100, 255));
		vehicles.push(new Vehicle(random(width), random(height), newColor, random(1, 10)));
	}
	spaceship = new Spaceship(mouseX, mouseY,"#8EA3A6")
}

function draw() {
	background(34, 23, 122, 80);
	randomSeed(seed); 
	
	if (gameState == "start"){
		drawStartScreen()
	} else if(gameState == "play"){
		drawGamePlay()
	} else if(gameState == "end"){
		gameOverScreen()
	}	
	
	// stars
	/*for(let i = 0; i <= 1000; i++){
		noStroke()
			fill(255)
			circle(random(width), random(height), random (1,4))
}*/
		
		
	for (let i = 0; i < vehicles.length; i++) {
		vehicles[i].update();
		vehicles[i].display();
	}
	
	spaceship.checkColision(vehicles);
	spaceship.update();
	spaceship.display();
}


function drawStartScreen() {
	fill(255)
	textAlign(CENTER,CENTER);
	textSize(40)
	text("DRUNK IN THE SPACE", width/2, height/2)
	textSize(20)
	text("press SPACE to start", width/2, height/2 + 40)
}


function drawGamePlay (){
	score ++;
	textSize(20);
	fill(0);
	text(`Score: ${score}`, 10,30);
	
	for(let i = 0; i <= 1000; i++){
		noStroke()
			fill(255)
			circle(random(width), random(height), random (1,4))
}
	
	objx = lerp(objx, mouseX, 0.1)
	objy = lerp(objy, mouseY, 0.1)
	fill("#8EA3A6")
	
  stroke("#F3C623")
	circle(objx, objy,50)
  fill("#E4EEEF")
	stroke(0)
	
	circle(objx, objy,30)

	for (let i = 0; i < vehicles.length; i++) {
		vehicles[i].update();
		vehicles[i].display();
	}
	
	if(spaceship.collision){
		gameState = "end";
	}
	
	spaceship.checkColision(vehicles);
	spaceship.update();
	spaceship.display();
	
}
	
	function gameOverScreen() {
	fill(255)
	textAlign(CENTER,CENTER);	
	textSize(40)
	text("GAME OVER", width/2, height/2 -50)
	textSize(20)
	text(`Your Score: ${score}`, width/2, height/2);
	text("press SPACE to restart", width/2, height/2 + 50)
		
	}

function restart() {
	score = 0;
	var vehicles = [];
	objx = width /2
	objy = height /2
	
	// lets create some new car objects! 	
	for (let i = 0; i < 30; i++) {
		let newColor = color(random(100, 255));
		vehicles.push(new Vehicle(random(width), random(height), newColor, random(1, 20)));
	}
	spaceship = new Spaceship(mouseX, mouseY,"#8EA3A6")
	gameState = "start"
	
}

function keyPressed(){
	if(gameState == "start" && key === ' '){
		gameState = "play"
	} else if(gameState == "end" && key === ' '){
		restart();
	}
}
	
	


