let cols = 20; // colonnes
let rows = 20; // lignes
let plane = []; // Tableau pour stocker les sommets
let amplitude //vibrations
let customFont; 

function preload() {
  customFont = loadFont('/font/ChunkFive-Regular.otf');
}

function setup() {
  createCanvas(800, 800, WEBGL); 
	//noCursor()

  textFont(customFont); 
  textSize(20); 
  textAlign(CENTER, CENTER); 

  //les sommets feuille
  for (let i = 0; i <= cols; i++) {
    plane[i] = [];
    for (let j = 0; j <= rows; j++) {
      plane[i][j] = createVector(
        map(i, 0, cols, -200, 200), // x
        map(j, 0, rows, -200, 200), // y
        0 // z (au départ plat)
      );
    }
  }
}

function draw() {
background(255, 206, 254);
  orbitControl(); //bouger cam
	amplitude = map(mouseX,0,800,10,300)
	let speed = map(mouseY,0,800,0.0001,0.01)

  // Lumières
  ambientLight(200);
  directionalLight(255, 255, 255, 1, 1, -1);

  // Déformer feuille
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let time = millis() * speed; // Temps pour animer
      let wave = sin(time + i * 0.3 + j * 0.3); // Déformation ondulée
      plane[i][j].z = wave * amplitude; // Changer la hauteur
    }
  }

  // Dessiner la feuille
  fill(21, 179, 146);
  noStroke();
  beginShape(TRIANGLE_STRIP); // Dessiner le mesh en triangles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let v1 = plane[i][j];
      let v2 = plane[i + 1][j];
      vertex(v1.x, v1.y, v1.z); // Premier sommet
      vertex(v2.x, v2.y, v2.z); // Second sommet
    }
  }
  endShape();

  // Ajouter du texte sur la feuille
  fill(255, 206, 254); 
  for (let i = 0; i <= cols; i+=2) {
    for (let j = 0; j <= rows; j+=2) {
      if ((i + j) % 4 === 0) { // espace entre texte
        push();
        let v = plane[i][j];
        translate(v.x, v.y, v.z + 5); // Positionner le texte au-dessus de la surface
        rotateX( 0 ); // Ajuster l'orientation pour qu'il soit lisible
        text('Hello Zhdk', 0, 0);
        pop();
      }
    }
  }
}
