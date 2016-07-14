class Game {
	
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
}

class Zombie{
	constructor(){

	}
}

class Gun{

}

export { Game, Player, Zombie, Gun };