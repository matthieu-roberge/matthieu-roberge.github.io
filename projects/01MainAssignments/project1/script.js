let cols = 20; // Nombre de colonnes
let rows = 20; // Nombre de lignes
let plane = []; // Tableau pour stocker les sommets
let amplitude //vibrations
let customFont; 

function preload() {
  customFont = loadFont('/font/ChunkFive-Regular.otf');
}

function setup() {
  createCanvas(800, 800, WEBGL); 
	//noCursor()


  // Vérification si la police est bien chargée
  if (!customFont) {
    console.error('La police n’a pas été chargée.');
    noLoop(); // Stoppe l'animation si la police n'est pas chargée
    return;
  }

  textFont(customFont); 
  textSize(20); 
  textAlign(CENTER, CENTER); 

  // (les sommets de la feuille)
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

  // Déformer la feuille
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let time = millis() * speed; // Temps pour animer
      let wave = sin(time + i * 0.3 + j * 0.3); // Déformation ondulée
      plane[i][j].z = wave * amplitude; // Changer la hauteur (z)
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
      if ((i + j) % 4 === 0) { // Ajouter du texte de manière espacée
        push();
        let v = plane[i][j];
        translate(v.x, v.y, v.z + 5); // Positionner le texte au-dessus de la surface
        rotateX( 0 ); // Ajuster l'orientation pour qu'il soit lisible
        text('Hello Zhdk', 0, 0); // Texte à afficher
        pop();
      }
    }
  }
}
