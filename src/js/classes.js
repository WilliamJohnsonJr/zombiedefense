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
		this.image = "http://placecage.com/50/50";
		this.biteImage = "http://placehold.it/50/E8117F/000000";
		this.biteImage2 = "http://placehold.it/50/C41D21/000000";
		this.sound = "./sounds/Pain.mp3";
		this.deathSound = "./sounds/Psycho_Scream.mp3";
		this.gun = {};
		this.position = {
			x: 224,
			y: 450
		}
	}

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

	scream() {
		var audio = new Audio(this.deathSound);
		audio.play();
	}
};

class Zombie{
	constructor(){
		this.hitpoints = 3;
		this.moveSpeed = 1;
		this.image = "http://placekitten.com/50/50";
		this.shotImage = "http://placehold.it/50/E8117F/000000";
		this.shotImage2 = "http://placehold.it/50/C41D21/000000";
		this.sound = "./sounds/Zombie_Grunt.mp3";
		this.deathSound = "./sounds/Zombie_Death_Scream.mp3";
		this.attackSound = ".sounds/Zombie_Attack.mp3";
		this.position = {
			x: (Math.random()*452),
			y: 0
		};
	};
	moveLeft(){
		if( 2 < this.position.x){
			this.position.x -= 2;
		};
	};

	moveRight() {
		if (this.position.x < 450){
			this.position.x += 2;
		};
	};

	grunt(){
		var audio = new Audio(this.sound);
		audio.play();
	}

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

};

export { Game, player, Player, Zombie, Gun };