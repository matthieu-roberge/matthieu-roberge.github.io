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