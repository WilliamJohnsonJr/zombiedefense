import $ from 'jquery';

let player, gun, game;
let zombieArray = [];

class Game {
	constructor(){

		// Game state 0 = Ready to start
		// Game state 1 = Playing
		//Game state 2 = You Lose
		//Game state 3 = You Win
		this.state = 0;
		this.level = 1;
	};

	intro(){
		
	};

	createBoard(){
		for (var x=0; x < 100; x++) {
			$(".board").append(`<div class="square ${x}">
			</div>`);
		};
	};

	createPlayer(){
		player= new Player();
		$(".board").append(`<div id="player">
			<img src=${player.image}>
		</div>`);
		document.getElementById('player').style.left = player.position.x;
		document.getElementById('player').style.top = player.position.y;
	};

	createGun(){
		gun = new Gun();
		player.gun = gun;
	};

	createZombies(){
		for (var x=0; x < this.level; x++){
			let zombie = new Zombie();
			zombie.id = "zombie"+x;
			zombie.index = x;
			zombieArray.push(zombie);
		};

		let placeZombie = function(){zombieArray.forEach(function(zombie){
				$(".board").append(`<div class="zombie" id="${zombie.id}">
					<img src=${zombie.image}>
 				</div>`);
 				document.getElementById(zombie.id).style.left = zombie.position.x +"px";
			});
		};
		placeZombie();
	};

	zombieMovement(){
		function zombieMover(){zombieArray.forEach(function(zombie){
			zombie.moveTowardPlayer();
		})};

		let zombieInterval = window.setInterval(zombieMover, 500);
	};

	youWin(){
		if(this.level === 10) {
			alert("You win!");
		};
	};

	gameOver(){
		if (this.state === 2) {
			alert("You lose");
		};
	};

	levelUp(){
		if(zombieArray.length===0){
			this.level += 1;
			this.youWin();
		}
	};

};

class Player {
	constructor(){
		this.hitpoints = 3;
		this.image = "./images/playerImage.png";
		this.biteImage = "./images/playerImageHurt.png";
		this.deadImage = "./images/playerDead.png";
		this.attackImage = "./images/playerAttack.png"
		this.sound = "./sounds/Pain.mp3";
		this.deathSound = "./sounds/Psycho_Scream.mp3";
		this.gun = {};
		this.position = {
			x: 224,
			y: 450
		}
	}

	attack(){
		gun.fire();
		$("#player").html(`<img src=${this.attackImage}>`);
		let zombiePositionYArray = [];
		zombieArray.forEach(function(zombie){
			zombiePositionYArray.push(zombie.position.y);
		});
		zombieArray.forEach((zombie) =>{
			if ((Math.abs((zombie.position.x+15) - (this.position.x + 76)) < 15) &&
				((zombie.position.y +50) >= zombiePositionYArray.reduce(function(a, b){
					return Math.max(a, b);
				})+50)){
						zombie.grunt();
						zombie.hitpoints -= gun.power;
						zombie.checkVitals();
			};
		});

		function imageReset() {
			$("#player").html("<img src=\"./images/playerImage.png\">");
		};
		window.setTimeout(imageReset, 200);
		window.clearTimeout(imageReset);
	};
	moveLeft(){
		this.position.x -= 20;
		$("#player").animate({"left": "-=20px"}, "fast");
		// document.getElementById('player').style.left = this.position.x +"px"
	}

	moveRight() {
		this.position.x += 20;
		$("#player").animate({"left": "+=20px"}, "fast")
		// document.getElementById('player').style.left = this.position.x +"px"
	}

	grunt(){
		var audio = new Audio(this.sound);
		audio.play();
	}

	checkVitals(){
		if(player.hitpoints === 0){
			alert('You Lose!');
		};
	};

	scream() {
		var audio = new Audio(this.deathSound);
		audio.play();
	};
};

class Zombie{
	constructor(){
		this.id = '';
		this.index = '';
		this.hitpoints = 3;
		this.moveSpeed = (Math.random()*4);
		this.image = "./images/zombieWalk.gif";
		this.shotImage = "./images/zombieShot.png";
		this.attackImage = "./images/zombieAttack.gif";
		this.deathImage = "./images/zombieDeath.gif";
		this.sound = "./sounds/Zombie_Grunt.mp3";
		this.deathSound = "./sounds/Zombie_Death_Scream.mp3";
		this.attackSound = "./sounds/Zombie_Attack.mp3";
		this.position = {
			x: (Math.random()*452),
			y: 0
		};
	};

	moveTowardPlayer(){
		let xdifference = (player.position.x +75) - this.position.x;
		let ydifference = (player.position.y -150) - this.position.y;

		if (xdifference > 0) {
			this.position.x += 5;
			$("#"+this.id).animate({"left": `+=${this.moveSpeed}px`}, "fast");
		} else if (xdifference < 0) {
			this.position.x -= 5;
			$("#"+this.id).animate({"left": `-=${this.moveSpeed}px`}, "fast");
		};

		if (ydifference > 5) {
			this.position.y += 5;
			$("#"+this.id).animate({"top": "+=5px"}, "fast");
		} else if (ydifference <=5 && xdifference <= 5 ){
			this.attack();
		};
	};

	grunt(){
		var audio = new Audio(this.sound);
		audio.play();
	}
	checkVitals(){
		if (this.hitpoints === 0) {
			this.scream();
			this.image = this.deathImage;
			$("#"+`${this.id}`).remove();
			zombieArray.splice(this.index, 1);
			for(var x=0; x<zombieArray.length; x++){
				zombieArray[x].index = x;
			};
		};
	};
	scream() {
		var audio = new Audio(this.deathSound);
		audio.play();
	}

	attack(){
		player.grunt();
		player.hitpoints -= 1;
		var audio = new Audio(this.attackSound);
		audio.play();
	};

};

class Gun{
	constructor (){
		this.power = 1;
		this.gunshot = "./sounds/Shotgun.mp3";
	};

	fire(){
		let audio = new Audio(this.gunshot);
		audio.play();
	};
};

export { Game, player, Player, zombieArray, Zombie, gun, Gun };