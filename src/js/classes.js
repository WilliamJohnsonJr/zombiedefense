import $ from 'jquery';

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
		
	}

	makeBoard(){
		for (var x=0; x < 100; x++) {
			$(".board").append(`<div class="square ${x}">
			</div>`);
		};
	}

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
		this.board = '';
		this.board = new Board(this.level);
	}

};

class Board {
	constructor(level){

	}

}

class Player {
	constructor(){
		this.hitpoints = 3;
		this.image = "http://placecage.com/50/50";
		this.biteImage = "http://placekitten.com/50/50";
		this.biteImage2 = "http://placehold.it/50/ffffff/000000"
		this.sound = "../../app/sounds/Pain.mp3";
		this.deathSound = "../../app/sounds/Psycho_Scream.mp3";
	}

	scream() {
		var audio = new Audio(this.deathSound);
		audio.play();
	}
};

class Zombie{
	constructor(){

	}
};

class Gun{

};

export { Game, Player, Zombie, Gun };