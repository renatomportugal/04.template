// https://openclassrooms.com/courses/creer-un-mini-rpg-en-javascript-avec-canvas

let Tillset_src = "https://user.oc-static.com/files/301001_302000/301139.png",
	 sprite_src = "https://user.oc-static.com/files/313001_314000/313386.png";


function Tileset(url) {

	this.image = new Image();
	this.image.referenceDuTileset = this;
	
	this.image.onload = function() {
		if(!this.complete) 
			throw new Error("Erreur de chargement du tileset");
		
		// Largeur du tileset en tiles
		this.referenceDuTileset.largeur = this.width / 32;
	}
	
	this.image.src = url;
}




Tileset.prototype.dessinerTile = function(numero, ctx, xDestination, yDestination) {
	
	let ySourceEnTiles = Math.ceil(numero / this.largeur),
		 xSourceEnTiles = numero % this.largeur;
	
	if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
	
	let xSource = (xSourceEnTiles - 1) * 32,
		 ySource = (ySourceEnTiles - 1) * 32;
	
	ctx.drawImage(
		this.image, 
		xSource, 
		ySource, 
		32, 
		32, 
		xDestination, 
		yDestination, 
		32, 
		32);
}


let carte = {
	"tileset" : Tillset_src,
	"terrain" : [
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10,  8,  6,  6,  6,  6,  6,  6],
		[2, 2, 2, 2, 2, 2, 9, 10, 10, 10, 10, 10, 10, 10, 10],
		[2, 2, 2, 2, 2, 2, 9, 10, 12, 14, 14, 14, 14, 14, 14],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2],
		[2, 2, 2, 2, 2, 2, 9, 10, 11,  2,  2,  2,  2,  2,  2]
	]
}



function Map() {
	this.tileset = new Tileset(carte.tileset);
	this.terrain = carte.terrain;
	// Liste des personnages présents sur le terrain.
	this.personnages = new Array();
}

var map = new Map();


// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
	return this.terrain.length;
}

Map.prototype.getLargeur = function() {
	return this.terrain[0].length;
}


// Pour ajouter un personnage
Map.prototype.addPersonnage = function(perso) {
	this.personnages.push(perso);
}


Map.prototype.dessinerMap = function(ctx) {
	
	for(let i = 0, l = this.terrain.length ; i < l ; i++) {
		let ligne = this.terrain[i];
		let y = i * 32;
		
		
		for(let j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], ctx, j * 32, y);
		}
		
		
		// Dessin des personnages
		for(let i = 0, l = this.personnages.length ; i < l ; i++) {
    		this.personnages[i].dessinerPersonnage(ctx);
		}
	}
}



const DUREE_ANIMATION = 4;
const DUREE_DEPLACEMENT = 15;

let DIRECTION = {
	"BAS"    : 0,
	"GAUCHE" : 1,
	"DROITE" : 2,
	"HAUT"   : 3
}

function Personnage(url, x, y, direction) {
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.direction = direction;
	this.etatAnimation = -1;
	
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille du personnage
		this.referenceDuPerso.largeur = this.width / 4;
		this.referenceDuPerso.hauteur = this.height / 4;
	}
	this.image.src = url;
	

}

Personnage.prototype.dessinerPersonnage = function(context) {
	
	// Numéro de l'image à prendre pour l'animation
	let frame = 0,
		 // Décalage à appliquer à la position du personnage
		 decalageX = 0, 
		 decalageY = 0; 
	
	if(this.etatAnimation >= DUREE_DEPLACEMENT) {
		// Si le déplacement a atteint ou dépassé le temps nécessaire pour s'effectuer, on le termine
		this.etatAnimation = -1;
	} 
	
	else if(this.etatAnimation >= 0) {
		// On calcule l'image (frame) de l'animation à afficher
		frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
		if(frame > 3) {
			frame %= 4;
		}
		// Nombre de pixels restant à parcourir entre les deux cases
		let pixelsAParcourir = 32 - (32 * (this.etatAnimation / DUREE_DEPLACEMENT));

		// À partir de ce nombre, on définit le décalage en x et y.
		if(this.direction == DIRECTION.HAUT) {
			decalageY = pixelsAParcourir;
		} 
		else if(this.direction == DIRECTION.BAS) {
			decalageY = -pixelsAParcourir;
		} 
		else if(this.direction == DIRECTION.GAUCHE) {
			decalageX = pixelsAParcourir;
		} 
		else if(this.direction == DIRECTION.DROITE) {
			decalageX = -pixelsAParcourir;
		}

		// On incrémente d'une frame
		this.etatAnimation++;
	}
/*
 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
 * donc il nous suffit de garder les valeurs 0 pour les variables 
 * frame, decalageX et decalageY
 */


	context.drawImage(
		this.image, 
		// Point d'origine du rectangle source à prendre dans notre image
		this.largeur * frame, this.direction * this.hauteur,  
		// Taille du rectangle source (c'est la taille du personnage)
		this.largeur, 
		this.hauteur,
		// Point de destination (dépend de la taille du personnage)
		(this.x * 32) - (this.largeur / 2) + 16 + decalageX, 
		(this.y * 32) - this.hauteur + 24 + decalageY, 
		this.largeur, 
		// Taille du rectangle destination (c'est la taille du personnage)
		this.hauteur 
	);
}


Personnage.prototype.getCoordonneesAdjacentes = function(direction)  {
    var coord = {'x' : this.x, 'y' : this.y};
    switch(direction) {
        case DIRECTION.BAS : 
            coord.y++;
            break;
        case DIRECTION.GAUCHE : 
            coord.x--;
            break;
        case DIRECTION.DROITE : 
            coord.x++;
            break;
        case DIRECTION.HAUT : 
            coord.y--;
            break;
    }
    return coord;
}
    
Personnage.prototype.deplacer = function(direction, map) {
	
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(this.etatAnimation >= 0) {
		return false;
	}

    // On change la direction du personnage
    this.direction = direction;
        
    // On vérifie que la case demandée est bien située dans la carte
    var prochaineCase = this.getCoordonneesAdjacentes(direction);
    if(   prochaineCase.x < 0 
		 || prochaineCase.y < 0 
		 || prochaineCase.x >= map.getLargeur() 
		 || prochaineCase.y >= map.getHauteur()
		) {
        // On retourne un booléen indiquant que le déplacement ne s'est pas fait, 
        return false;
    }
	
    // On commence l'animation
	this.etatAnimation = 1;
    
    // On effectue le déplacement
    this.x = prochaineCase.x;
    this.y = prochaineCase.y;
        
    return true;
}






	
var joueur = new Personnage(sprite_src, 7, 14, DIRECTION.BAS);
map.addPersonnage(joueur);



window.onload = function() {
	let canvas = document.getElementById('canvas'),
		 ctx = canvas.getContext('2d');
	
	canvas.width  = map.getLargeur() * 32;
	canvas.height = map.getHauteur() * 32;
	
	setInterval(function() {
		map.dessinerMap(ctx);
	}, 20);

	// Gestion du clavier
	window.onkeydown = function(event) {
		let e = event || window.event;
		let key = e.which || e.keyCode;

		switch(key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				joueur.deplacer(DIRECTION.HAUT, map);
				break;
			case 40 : case 115 : case 83 : // Flèche bas, s, S
				joueur.deplacer(DIRECTION.BAS, map);
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				joueur.deplacer(DIRECTION.GAUCHE, map);
				break;
			case 39 : case 100 : case 68 : // Flèche droite, d, D
				joueur.deplacer(DIRECTION.DROITE, map);
				break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		return false;

}



}