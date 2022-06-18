window.requestAnimFrame = (function(){
	return window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
				function(callback){
					window.setTimeout(callback, 1000 / 60);
				};
})();
window.addEventListener("DOMContentLoaded",app);

function app() {
	var I = document.querySelector("#intro"),
		P = document.querySelector("#play"),
		S = document.querySelector("#stats"),
		BL = document.querySelector("#base-lives"),
		V = document.querySelector("#win"),
		PA_V = document.querySelector("#play-again-win"),
		L = document.querySelector("#lose"),
		PA_L = document.querySelector("#play-again-lose"),
		AA =document.querySelector("#aliens-alive"),
		AAR =document.querySelector("#aliens-alive-result"),
		C = document.querySelector("canvas"),
		c = C.getContext("2d"),
		W = 216,
		H = 248;
	
	C.width = W;
	C.height = H;
	C.style.width = "auto";
	C.style.height = "100%";

	var bolt = [
			[
				0,0,1,
				0,1,0,
				1,0,0,
				0,1,0,
				0,0,1,
				0,1,0,
				1,0,0
			],
			[
				1,0,0,
				0,1,0,
				0,0,1,
				0,1,0,
				1,0,0,
				0,1,0,
				0,0,1
			]
		],
		ship_ = [
			[
				0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
				0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,
				0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
				0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,
				0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0
			]
		],
		bunker0 = [
			[
				1,1,1,1,
				1,1,1,1,
				1,1,1,1,
				1,1,1,1
			],
			[
				1,1,1,1,
				0,1,0,1,
				1,1,1,1,
				1,0,0,1
			],
			[
				1,0,1,1,
				0,1,0,0,
				1,1,1,1,
				0,0,0,1
			],
			[
				1,0,0,1,
				0,1,0,0,
				0,1,0,0,
				0,0,0,1
			]
		],
		bunker1 = [
			[
				0,0,0,0,
				0,0,0,1,
				0,0,1,1,
				0,1,1,1
			],
			[
				0,0,0,0,
				0,0,0,1,
				0,0,1,1,
				0,0,0,1
			],
			[
				0,0,0,0,
				0,0,0,0,
				0,0,1,1,
				0,0,0,1
			],
			[
				0,0,0,0,
				0,0,0,0,
				0,0,0,0,
				0,0,0,1
			]
		],
		bunker2 = [
			[
				0,0,0,0,
				1,0,0,0,
				1,1,0,0,
				1,1,1,0
			],
			[
				0,0,0,0,
				0,0,0,0,
				1,1,0,0,
				1,0,0,0
			],
			[
				0,0,0,0,
				0,0,0,0,
				1,1,0,0,
				0,0,0,0
			],
			[
				0,0,0,0,
				0,0,0,0,
				0,1,0,0,
				0,0,0,0
			]
		],
		bunker3 = [
			[
				1,1,1,0,
				1,1,0,0,
				1,0,0,0,
				1,0,0,0
			],
			[
				1,1,1,0,
				0,1,0,0,
				1,0,0,0,
				1,0,0,0
			],
			[
				1,0,1,0,
				0,1,0,0,
				1,0,0,0,
				0,0,0,0
			],
			[
				1,0,0,0,
				0,1,0,0,
				0,0,0,0,
				0,0,0,0
			]
		],
		bunker4 = [
			[
				0,1,1,1,
				0,0,1,1,
				0,0,0,1,
				0,0,0,1
			],
			[
				0,1,1,1,
				0,0,0,1,
				0,0,0,1,
				0,0,0,1
			],
			[
				0,0,1,1,
				0,0,0,0,
				0,0,0,1,
				0,0,0,1
			],
			[
				0,0,0,1,
				0,0,0,0,
				0,0,0,0,
				0,0,0,1
			]
		],
		invader0 = [
			[
				0,0,0,1,1,0,0,0,
				0,0,1,1,1,1,0,0,
				0,1,1,1,1,1,1,0,
				1,1,0,1,1,0,1,1,
				1,1,1,1,1,1,1,1,
				0,1,0,1,1,0,1,0,
				1,0,0,0,0,0,0,1,
				0,1,0,0,0,0,1,0
			],[
				0,0,0,1,1,0,0,0,
				0,0,1,1,1,1,0,0,
				0,1,1,1,1,1,1,0,
				1,1,0,1,1,0,1,1,
				1,1,1,1,1,1,1,1,
				0,0,1,0,0,1,0,0,
				0,1,0,1,1,0,1,0,
				1,0,1,0,0,1,0,1
			]
		],
		invader1 = [
			[
				0,0,1,0,0,0,0,0,1,0,0,
				0,0,0,1,0,0,0,1,0,0,0,
				0,0,1,1,1,1,1,1,1,0,0,
				0,1,1,0,1,1,1,0,1,1,0,
				1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,
				1,0,1,0,0,0,0,0,1,0,1,
				0,0,0,1,1,0,1,1,0,0,0
			],[
				0,0,1,0,0,0,0,0,1,0,0,
				1,0,0,1,0,0,0,1,0,0,1,
				1,0,1,1,1,1,1,1,1,0,1,
				1,1,1,0,1,1,1,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,
				0,1,1,1,1,1,1,1,1,1,0,
				0,0,1,0,0,0,0,0,1,0,0,
				0,1,0,0,0,0,0,0,0,1,0
			]
		],
		invader2 = [
			[
				0,0,0,0,1,1,1,1,0,0,0,0,
				0,1,1,1,1,1,1,1,1,1,1,0,
				1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,0,0,1,1,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,
				0,0,1,1,1,0,0,1,1,1,0,0,
				0,1,1,0,0,1,1,0,0,1,1,0,
				0,0,1,1,0,0,0,0,1,1,0,0
			],[
				0,0,0,0,1,1,1,1,0,0,0,0,
				0,1,1,1,1,1,1,1,1,1,1,0,
				1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,0,0,1,1,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,
				0,0,0,1,1,0,0,1,1,0,0,0,
				0,0,1,1,0,1,1,0,1,1,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0
			]
		],
		invaderDeath_ = [
			[
				0,0,0,0,1,0,0,0,1,0,0,0,0,
				0,1,0,0,0,1,0,1,0,0,0,1,0,
				0,0,1,0,0,0,0,0,0,0,1,0,0,
				0,0,0,1,0,0,0,0,0,1,0,0,0,
				1,1,0,0,0,0,0,0,0,0,0,1,1,
				0,0,0,1,0,0,0,0,0,1,0,0,0,
				0,0,1,0,0,1,0,1,0,0,1,0,0,
				0,1,0,0,1,0,0,0,1,0,0,1,0
			]
		]
		base_ = [
			[
				0,0,0,0,0,0,1,0,0,0,0,0,0,
				0,0,0,0,0,1,1,1,0,0,0,0,0,
				0,0,0,0,0,1,1,1,0,0,0,0,0,
				0,1,1,1,1,1,1,1,1,1,1,1,0,
				1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1
			]
		],
		baseDeath_ = [
			[
				0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
				0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,
				0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,
				1,0,0,0,1,0,1,1,0,1,0,1,0,0,0,0,
				0,0,1,1,1,1,1,1,1,1,0,0,1,0,0,0,
				0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0
			],
			[
				0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,
				1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,1,
				0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,
				0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,
				0,1,0,0,1,0,1,1,0,0,1,1,0,0,0,1,
				0,0,1,0,0,0,0,1,1,1,0,0,0,1,0,0,
				0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,
				0,0,1,1,0,1,1,1,1,1,1,1,0,0,1,0
			]
		],
		matrixToData = function(matrix,width,height,color) {
			var matrixData = [];
			for (m in matrix) {
				matrixData.push(c.createImageData(width,height));
			}
			for (i in matrixData) {
				for (j = 0; j < matrixData[i].data.length; j += 4) {
					if (matrix[i][j / 4]) {
						switch (color) {
							case "green":
								matrixData[i].data[j + 0] = 0;
								matrixData[i].data[j + 1] = 255;
								matrixData[i].data[j + 2] = 0;
								break;
							case "red":
								matrixData[i].data[j + 0] = 255;
								matrixData[i].data[j + 1] = 0;
								matrixData[i].data[j + 2] = 0;
								break;
							default:
								var d = 3;
								while (d--) {
									matrixData[i].data[j + d] = 255;
								}
								break;
						}
						matrixData[i].data[j + 3] = 255;

					} else {
						var d = 3;
						matrixData[i].data[j + d] = 255
						while (d--) {
							matrixData[i].data[j + d] = 0;
						}
					}
				}
			}
			return matrixData;
		};

	var Bolt = function(x,y) {
			this.x = x;
			this.y = y;
			this.w = 3;
			this.h = 7;
			this.speedY = 2;
			this.frm = 0;
		},
		bolts = [],
		Laser = function(x,y) {
			this.x = x;
			this.y = y;
			this.w = 1;
			this.h = 4;
			this.speedY = 2;
		},
		laser = null,
		Ship = function(x,y,dir) {
			this.x = x;
			this.y = y;
			this.w = 16;
			this.h = 8;
			// -1 = left, 1 = right
			this.dr = dir;
			this.speedX = 1;
		},
		ship = null,
		Bunker = function(type,x,y) {
			this.typ = type;
			this.x = x;
			this.y = y;
			this.w = 4;
			this.h = 4;
			this.frm = 0;
			this.stages = 4;
			this.decay = function() {
				++this.frm;
			}
		},
		bunkers = [],
		Invader = function(type,x,y) {
			this.typ = type;
			this.x = x || 0;
			this.y = y || 0;
			this.w = !this.typ ? 8 : (this.typ == 1 ? 11 : 12);
			this.h = 8;
			this.frm = 0;
			// -1 = left, 1 = right
			this.dr = 1;
			this.speedX = 5;
			this.speedY = 8;
			this.fire = function() {
				bolts.push(new Bolt(this.x + ~~(this.w/2),this.y + 2));
			};
		},
		invaders = [],
		InvaderDeath = function(x,y) {
			this.x = x;
			this.y = y;
			this.w = 13;
			this.h = 8;
		},
		invaderDeath = null,
		Base = function() {
			this.w = 13;
			this.h = 7;
			this.x = W/2;
			this.y = 208;
			// -1 = left, 0 = stopped, 1 = right
			this.dr = 1;
			this.speedX = 1;
			this.fire = function() {
				if (laser == null) {
					laser = new Laser(this.x + 6,this.y);
				}
			};
		},
		base = null,
		BaseDeath = function(x,y) {
			this.x = x;
			this.y = y;
			this.w = 16;
			this.h = 8;
			this.frm = 0;
		},
		baseDeath = null,
		gameOver = true,
		invadersAlive = 0,
		baseLives = 0,
		barY = 230;

	var startGame = function() {
			I.className = "hide";
			S.classList.remove("hide");
			V.className = "hide";
			L.className = "hide";

			gameOver = false;
			invadersAlive = 55;
			baseLives = 3;

			AA.innerHTML = invadersAlive;
			BL.innerHTML = baseLives;

			bolts = [];
			laser = null;
			ship = null;
			invaders = [];
			bunkers = [];
			base = new Base();

			// spawn invaders
			var spawn = invadersAlive,
				s = spawn;
			while (s--) {
				let n = spawn - s - 1,
					iType = n < 11 ? 0 : (n < 33 ? 1 : 2);
				invaders.push(new Invader(iType));
				invaders[n].x = 22 + 16 * (n % 11);
				invaders[n].y = 64 + 16 * ~~(n / 11);
			}

			// spawn bunker parts
			spawn = 4;
			s = spawn;
			while (s--) {
				let n = spawn - s - 1,
					x = 30 + 45 * n,
					y = 184;

				for (var by = 0; by < 4; ++by) {
					for (var bx = 0; bx < 5; ++bx) {
						// assign type if not bottom gap
						if (!(bx == 2 && by == 3)) {
							let bType = 0;
							if (!bx && !by)
								bType = 1;
							else if (bx == 4 && !by)
								bType = 2;
							else if (bx == 1 && by == 3)
								bType = 3;
							else if (bx == 3 && by == 3)
								bType = 4;

							bunkers.push(new Bunker(bType,x + 4 * bx,y + 4 * by));
						}
					}
				}
			}

			run();
		},
		endGame = function(outcome) {
			gameOver = true;
			if (outcome == "win") {
				V.classList.remove("hide");
				AAR.innerHTML = invadersAlive;
			} else {
				L.classList.remove("hide");
			}
		},
		moveBolts = function() {
			for (var b in bolts) {
				bolts[b].y += bolts[b].speedY;
				++bolts[b].frm;

				if (bolts[b].frm == 8)
					bolts[b].frm = 0;

				if (bolts[b].y + bolts[b].h > barY)
					bolts.splice(+b,1);
			}
		},
		moveLaser = function() {
			if (laser != null) {
				laser.y -= laser.speedY;

				if (laser.y + laser.h < 0) {
					laser = null;
				}
			}
		},
		moveShip = function(){
			if (ship != null) {
				ship.x += ship.speedX * ship.dr;

				if (ship.x > W || ship.x + ship.w < 0) {
					ship = null;
				}
			}
		},
		controlInvaders = function(e) {
			if (!gameOver && invaders.length && base != null && invaderDeath == null) {
				// move
				if (e.code == "Space") {
					let wallHit = false,
						bottomHit = false;

					// move right or left
					for (var i in invaders) {
						invaders[i].x += invaders[i].speedX * (invaders[i].dr ? 1 : -1);
						invaders[i].frm = invaders[i].frm ? 0 : 1;
						if (invaders[i].x + invaders[i].w > W || invaders[i].x < 0) {
							wallHit = true;
						}
					}
					// move all down
					if (wallHit) {
						for (var i in invaders) {
							invaders[i].x += invaders[i].speedX * (invaders[i].dr ? -1 : 1);
							invaders[i].y += invaders[i].speedY;
							invaders[i].dr = !invaders[i].dr;

							// lose game
							if (invaders[i].y + invaders[i].h > base.y) {
								bottomHit = true;
							}
						}
					}
					if (bottomHit) {
						endGame("win");
						draw();
					}

				// attack
				} else if (e.code == "KeyS") {
					invaders[~~(Math.random() * invaders.length)].fire();

				// send ship from left
				} else if (e.code == "KeyA" && ship == null) {
					ship = new Ship(-11,30,1);
				
				// send ship from right
				} else if (e.code == "KeyD" && ship == null) {
					ship = new Ship(W,30,-1);
				}
			}
		},
		moveBase = function() {
			if (base != null) {
				base.x += base.speedX * base.dr;

				// touching boundaries
				if (base.x < 0)
					base.x = 0;
				else if (base.x + base.w > W)
					base.x = W - base.w;

				if (ship == null) {
					// randomly switch direction
					if (Math.random() < 0.05) {
						let choose = Math.random();
						base.dr = choose < 0.3 ? -1 : (choose < 0.7 ? 0 : 1);
					}
					// randomly fire
					if (Math.random() < 0.3)
						base.fire();

				// chase and attack ship instead if it exists
				} else {
					base.dr = ship.x > base.x ? 1 : -1;
					base.fire();
				}


			} else if (baseDeath != null) {
				++baseDeath.frm;
				if (baseDeath.frm == 8)
					baseDeath.frm = 0;
			}
		},
		contactFound = function(bodyA,bodyB) {
			var found = false;
			if (bodyA != null && bodyB != null) {
				if (bodyA.x + bodyA.w > bodyB.x && bodyA.x < bodyB.x + bodyB.w &&
					bodyA.y < bodyB.y + bodyB.h && bodyA.y + bodyA.h > bodyB.y)
					found = true
			}
			return found;
		},
		checkContact = function() {
			// invader vs base laser or ship vs base laser
			if (laser != null) {
				for (var i in invaders) {
					if (contactFound(laser,invaders[i])) {
						laser = null;
						invaderDeath = new InvaderDeath(invaders[i].x,invaders[i].y);
						invaders.splice(+i,1);
						--invadersAlive;
						AA.innerHTML = invadersAlive;
						setTimeout(function(){
							invaderDeath = null;
							// lose game
							if (!invadersAlive) {
								endGame("lose");
								draw();
							}
						},300);
						break;
					}
				}
				for (var k in bunkers) {
					if (contactFound(laser,bunkers[k])) {
						laser = null;
						bunkers[k].decay();
						if (bunkers[k].frm == bunkers[k].stages)
							bunkers.splice(+k,1);
						break;
					}
				}
				if (ship != null) {
					if (contactFound(laser,ship)) {
						laser = null;
						ship = null;
					}
				}
			}
			// invader bolt vs bunker or base
			if (base != null) {
				for (var b in bolts) {
					for (var k in bunkers) {
						if (contactFound(bolts[b],bunkers[k])) {
							bolts.splice(+b,1);
							bunkers[k].decay();
							if (bunkers[k].frm == bunkers[k].stages)
								bunkers.splice(+k,1);
							break;
						}
					}
					if (contactFound(bolts[b],base)) {
						bolts.splice(+b,1);
						baseDeath = new BaseDeath(base.x,base.y);
						base = null;
						setTimeout(function(){
							baseDeath = null;
							--baseLives;
							BL.innerHTML = baseLives;
						},900);
						setTimeout(function(){
							if (!baseLives)
								endGame("win");
							else
								base = new Base();
								
						},1800);
						break;
					}
				}
			}
		}
		draw = function() {
			var shipData,
				boltData,

				bunker0Data = matrixToData(bunker0,4,4,"green"),
				bunker1Data = matrixToData(bunker1,4,4,"green"),
				bunker2Data = matrixToData(bunker2,4,4,"green"),
				bunker3Data = matrixToData(bunker3,4,4,"green"),
				bunker4Data = matrixToData(bunker4,4,4,"green"),

				invader0Data = matrixToData(invader0,8,8),
				invader1Data = matrixToData(invader1,11,8),
				invader2Data = matrixToData(invader2,12,8),

				invaderDeathData,
				baseData = matrixToData(base_,13,7,"green"),
				baseDeathData;

			if (ship != null)
				shipData = matrixToData(ship_,ship.w,ship.h,"red");

			if (bolts.length)
				boltData = matrixToData(bolt,3,7);

			if (invaderDeath != null)
				invaderDeathData = matrixToData(invaderDeath_,invaderDeath.w,invaderDeath.h);
			
			if (baseDeath != null)
				baseDeathData = matrixToData(baseDeath_,baseDeath.w,baseDeath.h,"green");

			clean();

			// ship
			if (shipData)
				c.putImageData(shipData[0],ship.x,ship.y);
			
			// bolts
			for (var b in bolts) {
				let boltSprite = bolts[b].frm >= 4 ? 1 : 0;
				c.putImageData(boltData[boltSprite],bolts[b].x,bolts[b].y);
			}

			// laser
			if (laser != null) {
				c.fillStyle = "#fff";
				c.fillRect(laser.x,laser.y,laser.w,laser.h);
			}

			// invaders
			for (var i in invaders) {
				var data;
				switch (invaders[i].typ) {
					case 1:
						data = invader1Data[invaders[i].frm];
						break;
					case 2:
						data = invader2Data[invaders[i].frm];
						break;
					default:
						data = invader0Data[invaders[i].frm];
						break;
				}
				c.putImageData(data,invaders[i].x,invaders[i].y);
			}

			// bunker parts
			for (var s in bunkers) {
				var data;
				switch (bunkers[s].typ) {
					case 1:
						data = bunker1Data[bunkers[s].frm];
						break;
					case 2:
						data = bunker2Data[bunkers[s].frm];
						break;
					case 3:
						data = bunker3Data[bunkers[s].frm];
						break;
					case 4:
						data = bunker4Data[bunkers[s].frm];
						break;
					default:
						data = bunker0Data[bunkers[s].frm];
						break;
				}
				c.putImageData(data,bunkers[s].x,bunkers[s].y);
			}

			// invader death
			if (invaderDeathData)
				c.putImageData(invaderDeathData[0],invaderDeath.x,invaderDeath.y);

			// base and base lives
			if (base)
				c.putImageData(baseData[0],base.x,base.y);
			var bl = baseLives;
			while (--bl && bl > 0)
				c.putImageData(baseData[0],24 + 16 * (bl - 1),barY + 1);

			// base death
			if (baseDeathData) {
				let baseDeathSprite = baseDeath.frm >= 4 ? 1 : 0;
				c.putImageData(baseDeathData[baseDeathSprite],baseDeath.x,baseDeath.y);
			}

			c.fillStyle = "#0f0";
			c.fillRect(0,barY,W,1)
		},
		clean = function() {
			c.clearRect(0,0,W,H);
			c.fillStyle = "#000";
			c.fillRect(0,0,W,H);
		},
		run = function(){
			if (!gameOver) {
				draw();
				moveBolts();
				moveLaser();
				moveShip();
				moveBase();
				checkContact();
				requestAnimFrame(run);
			}
		};
	clean();

	document.addEventListener("keydown",controlInvaders);
	P.addEventListener("click",startGame);
	PA_V.addEventListener("click",startGame);
	PA_L.addEventListener("click",startGame);
}