import $ from "jquery";
import { Game, bodyCount, gameLevel, player, Player, zombieArray, Zombie, gun, Gun } from './classes';

$(".board").append(`<h1 class="h1">ZOMBIE DEFENSE    </br> <img src="./images/zombieWalk.png"></h1>
					<h2 class="h2"> Can you stay alive until Level 100? </br> </br> Controls: A - move left  D - move right  Space - shoot</h2>
					<div class="h3">
						<button class="startButton">Start Game</button>
					</div>`);

let soundtrack = new Audio("https://archive.org/download/ToccataAndFugueInDMinor/12ToccataAndFugueInDMinor.mp3");
soundtrack.play();

function startGame(){
	$(".h1").remove();
	$(".h2").remove();
	$(".h3").remove();
	$(".startButton").remove();
	$(".board").append(`<h3 class="bodyCounter">Body Count: ${bodyCount} </br> Level: ${gameLevel} </br> Lives Left: 3</h3>`);
	let game = new Game();
	game.createBoard();
	console.log(game.createBoard);
	game.createPlayer();
	game.createGun();
	game.level = 1;
	game.createZombies();
	window.addEventListener('keydown', function(event){
		event.preventDefault();
		if (event.code==="KeyA"){
			player.moveLeft();
		} else if (event.code==="KeyD"){
			player.moveRight();
		};
	});
	window.addEventListener('keyup', function(event){
		event.preventDefault();
		if (event.code==="Space"){
			player.attack();
			game.levelUp();
		};
	});
	window.setInterval(game.zombieMovement, 500);
};

//Test

$(".startButton").on('click', function(event){
	event.preventDefault();
	startGame();
});