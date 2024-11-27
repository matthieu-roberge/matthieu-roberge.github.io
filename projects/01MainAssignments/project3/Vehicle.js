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
