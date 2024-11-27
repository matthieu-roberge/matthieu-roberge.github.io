var vehicles = [];
let seed = 73837843789
let easing = 0.05
let gameState = "start"
let spaceship;
let score = 0;

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
	
	


