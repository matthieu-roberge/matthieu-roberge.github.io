let particles = [];
let mic;
let amplitude;
const num = 10000; // Nombre de particules
const noiseScale = 0.01; // Échelle du bruit

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialiser l'entrée audio correctement
  mic = new p5.AudioIn();
  mic.start(); // Demande l'accès au micro
  
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  stroke(255, 100); 
  clear(); // Efface l'arrière-plan pour un effet de traînée
}

function draw() {
  background(0, 10); 

  // Vérifier que le micro fonctionne et obtenir le niveau sonore
  if (mic.enabled) {
    amplitude = mic.getLevel() * 5000; // Récupérer le niveau sonore
  } else {
    amplitude = 0; // Si le micro ne fonctionne pas, ne pas animer
  }
  
  let speedFactor = map(amplitude, 0, 100, 0.5, 3); // Facteur pour ajuster la vitesse
  let colorFactor = map(amplitude, 0, 100, 0, 255); // Facteur pour ajuster la couleur
  
  for (let i = 0; i < num; i++) {
    let p = particles[i];
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * 0.01); // Générer du bruit
    let angle = -TAU / 2 * n; // Angle basé sur le bruit
    p.x += cos(angle) * speedFactor; // Mouvement selon l'angle
    p.y += sin(angle) * speedFactor;

    // Si la particule sort de l'écran, réinitialiser sa position
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }

    // Dessiner la particule avec une couleur réactive au son
    strokeWeight(1.5);
    stroke(colorFactor, 255 - colorFactor, random(100, 200), 150);
    point(p.x, p.y);
  }
}

// Vérifie si une particule est à l'intérieur de l'écran
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
