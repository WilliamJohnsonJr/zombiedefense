import $ from 'jquery';

let player, gun, game;
let zombieArray = [];
let bodyCount = 0;
let gameLevel;

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
 				if(zombie.position.x > 490){
 					zombie.position.x = 10;
 				};
 				document.getElementById(zombie.id).style.left = zombie.position.x +"px";
			});
		};
		placeZombie();
	};

	zombieMovement(){
			zombieArray.forEach(function(zombie){
				if(zombie.alive ===true){
					let xdifference = (player.position.x +37) - zombie.position.x;
					let ydifference = (player.position.y -105) - zombie.position.y;
					let xdifferenceAbs = Math.abs(xdifference);
					let ydifferenceAbs = Math.abs(ydifference);
					if (ydifferenceAbs <=20 && xdifferenceAbs <= 20){
						zombie.attack();
					} else {
						zombie.moveTowardPlayer();
					};
				} else {
					console.log("This zombie's dead and can't do nuthin.")
				};			
			});
	};

	youWin(){
		if(this.level === 100) {
			function alerter(){
				alert("You win!");
				$(".zombie").remove();
				$("#player").remove();
				zombieArray = [];
				$(".board").append(`<h1>Refresh page to play again!</h1>`);
			};
			window.setTimeout(alerter, 200);
		};
	};

	levelUp(){
		if(zombieArray.length===0){
			this.level += 1;
			gameLevel = this.level;
			console.log(this.level);
			console.log(gameLevel);
			this.youWin();
			if(this.level === 7){
				gun.power = 3;
				alert("You got the Super Shotgun!");
			};
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
			let xdifference = (this.position.x +30) - zombie.position.x;
			let ydifference = (this.position.y -105) - zombie.position.y;
			let xdifferenceAbs = Math.abs(xdifference);
			if (xdifferenceAbs <= 20){
				zombie.grunt();
				$("#"+zombie.id).html(`<img src='${zombie.shotImage}'>`);				
				zombie.hitpoints -= gun.power;
				zombie.checkVitals();		
				function imageZombieReset(){
					$("#"+zombie.id).html(`<img src='${zombie.image}'>`);
				};
				window.setTimeout(imageZombieReset, 500);
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

	scream() {
		var audio = new Audio(this.deathSound);
		audio.play();
	};
};

class Zombie{
	constructor(){
		this.id = '';
		this.alive = true;
		this.index = '';
		this.hitpoints = 3;
		this.moveSpeedX = 10 + (Math.random()*10);
		this.moveSpeedY = 20 + (Math.random()*25);
		this.image = "./images/zombieWalk.png";
		this.shotImage = "./images/zombieShot.png";
		this.attackImage = "./images/zombieAttack.png";
		this.deathImage = "./images/zombieDeath.png";
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

		if (xdifference > 20) {
			this.position.x += this.moveSpeedX;
			$("#"+this.id).animate({"left": `+=${this.moveSpeedX}px`}, "fast");
		} else if (xdifference < -20) {
			this.position.x -= this.moveSpeedX;
			$("#"+this.id).animate({"left": `-=${this.moveSpeedX}px`}, "fast");
		};

		if (ydifference > 20) {
			this.position.y += this.moveSpeedY;;
			$("#"+this.id).animate({"top": `+=${this.moveSpeedY}px`}, "fast");
		} //else stop where you are.
	};

	grunt(){
		var audio = new Audio(this.sound);
		audio.play();
	}
	checkVitals(){
		if (this.hitpoints <= 0) {
			this.alive = false;
			this.scream();
			$("#"+`${this.id}`).remove();
			bodyCount +=1;
		$(".bodyCounter").remove();
		$(".board").append(`<h3 class="bodyCounter">Body Count: ${bodyCount} </br> Level: ${gameLevel} </br>  Lives Left: ${player.hitpoints}</h3>`);					
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

	attack(){
		var audio = new Audio(this.attackSound);
		audio.play();
		$("#"+this.id).html(`<img src='${this.attackImage}'>`);
		player.grunt();
		$("#player").html(`<img src='${player.biteImage}'>`);				
		player.hitpoints -=1;
		$(".bodyCounter").remove();
		$(".board").append(`<h3 class="bodyCounter">Body Count: ${bodyCount} </br> Level: ${gameLevel} </br>   Lives Left: ${player.hitpoints}</h3>`);					
		if(player.hitpoints === 0){
			player.scream();
			function alerter(){
				alert("You Lose!");
				$(".zombie").remove();
				$("#player").remove();
				zombieArray = [];
				$(".board").append(`<h1 class="loseBanner">Refresh page to play again!</h1>`);
			};
			window.setTimeout(alerter, 200);
		};
		function imagePlayerReset(){
			$("#player").html(`<img src='${player.image}'>`);
		};
		window.setTimeout(imagePlayerReset, 300);
		function imageReset(){
			$("#"+this.id).html(`<img src='${this.image}'>`)
		};
		window.setTimeout(imageReset.bind(this), 300);
	};
};

class Gun{
	constructor (){
		this.power = 1;
		this.gunshot = "./sounds/Shotgun.mp3";
	};

	fire(){
		let audio = new Audio(this.gunshot);
		audio.volume=0.6;
		audio.play();

	};
};

export { Game, bodyCount, gameLevel, player, Player, zombieArray, Zombie, gun, Gun };