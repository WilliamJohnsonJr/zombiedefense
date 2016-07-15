import $ from 'jquery';

let player, gun;
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
	};

	createGun(){
		gun = new Gun();
		player.gun = gun;
	};

	createZombie(){
		for (var x=0; x < this.level; x++){
			let zombie = new Zombie();
			zombie.id = x;
			zombieArray.push(zombie);
		};
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
		this.level += 1;
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
		zombieArray.forEach(function(zombie){
			gun.fire();
			if( this.position.x < zombie.position.x < (this.position.x + 100)){
				zombie.hitpoints -= 1;
			};
		});	
	};

	moveLeft(){
		this.position.x -= 2;
	}

	moveRight() {
		this.position.x += 2;
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
	moveLeft(){
		if( 2 < this.position.x){
			this.position.x -= this.moveSpeed;
		};
	};

	moveRight() {
		if (this.position.x < 450){
			this.position.x += this.moveSpeed;
		};
	};

	grunt(){
		var audio = new Audio(this.sound);
		audio.play();
	}
	checkVitals(){
		if (zombie.hitpoints === 0) {
			zombie.scream();
			this.image = this.deathImage;
		};
	};
	scream() {
		var audio = new Audio(this.deathSound);
		audio.play();
	}

	attack(){
		player.hitpoints -= 1;
		var audio = new Audio(this.attackSound);
		audio.play();
	};

};

class Gun{
	constructor (){
		this.power = 1;
		this.gunshot = "./sounds/Pistol.mp3";
	};

	fire(){
		let audio = new Audio(this.gunshot);
		audio.play();
	};
};

export { Game, player, Player, zombieArray, Zombie, gun, Gun };