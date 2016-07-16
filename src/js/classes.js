import $ from 'jquery';

let player, gun, game;
let zombieArray = [];

class Game {
	constructor(){
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
		document.getElementById('player').style.left = player.position.x +"px";
		document.getElementById('player').style.top = player.position.y +"px";
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
		function zombieMover(){
				zombieArray.forEach(function(zombie){
					zombie.moveTowardPlayer();
				});
		};	
		window.setInterval(zombieMover, 500);
	};

	youWin(){
		if(this.level === 100) {
			alert("You win!");
		};
	};

	gameOver(){
			alert("You lose");
	};

	levelUp(){
		if(zombieArray.length===0){
			this.level += 1;
			this.youWin();
			zombieArray = [];
			this.createZombies();
			this.zombieMovement();
		};
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
		zombieArray.forEach((zombie) =>{
			let xdifference = (this.position.x +37) - zombie.position.x;
			let ydifference = (this.position.y -105) - zombie.position.y;
			let xdifferenceAbs = Math.abs(xdifference);
			if (xdifferenceAbs <= 20){
				zombie.grunt();
				zombie.hitpoints -= gun.power;
				zombie.checkVitals();		
			};
		});
		function imageReset() {
			$("#player").html(`<img src='${this.image}'>`);
		};
		var timeoutID = window.setTimeout(imageReset.bind(this), 200);
	};

	moveLeft(){
		this.position.x -= 20;
		// $("#player").animate({"left": "-=20px"}, "fast"); This code causes the stack to overflow if the button is held down.
		document.getElementById('player').style.left = this.position.x +"px"
	}

	moveRight() {
		this.position.x += 20;
		// $("#player").animate({"left": "+=20px"}, "fast") This code causes the stack to overflow if the button is held down.
		document.getElementById('player').style.left = this.position.x +"px"
	}

	grunt(){
		var audio = new Audio(this.sound);
		audio.play();
	}

	// checkVitals(){
	// 	if(player.hitpoints === 0){
	// 		game.gameOver();
	// 	};
	// };

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
		this.moveSpeed = (Math.random()*20);
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
		let xdifference = (player.position.x +37) - this.position.x;
		let ydifference = (player.position.y -105) - this.position.y;

		let xdifferenceAbs = Math.abs(xdifference);
		let ydifferenceAbs = Math.abs(ydifference);

		if (ydifferenceAbs <=10 && xdifferenceAbs <= 10){
			player.scream();
			game.gameOver();
		};

		if (xdifference > 0) {
			this.position.x += this.moveSpeed;
			$("#"+this.id).animate({"left": `+=${this.moveSpeed}px`}, "fast");
		} else if (xdifference < 0) {
			this.position.x -= this.moveSpeed;
			$("#"+this.id).animate({"left": `-=${this.moveSpeed}px`}, "fast");
		};

		if (ydifference > 5) {
			this.position.y += this.moveSpeed;;
			$("#"+this.id).animate({"top": `+=${this.moveSpeed}px`}, "fast");
		} 
	};

	grunt(){
		var audio = new Audio(this.sound);
		audio.play();
	}
	checkVitals(){
		if (this.hitpoints === 0) {
			this.scream();
			$("#"+`${this.id}`).remove();
			zombieArray.splice(this.index, 1);
			for(var x=0; x<zombieArray.length; x++){
				zombieArray[x].index = x;
			};
            this.position.y = 800;
			console.log(this)
			console.log(zombieArray);
		};
	};
	scream() {
		var audio = new Audio(this.deathSound);
		audio.play();
	}

	// attack(){
	// 	player.grunt();
	// 	player.hitpoints -= 1;
	// 	var audio = new Audio(this.attackSound);
	// 	audio.play();
	// 	// console.log(zombieArray);
	// 	console.log(player.hitpoints);
	// };

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