import $ from "jquery";
import { Game, bodyCount, player, Player, zombieArray, Zombie, gun, Gun } from './classes';

$(".board").append(`<h1 class="h1">Welcome to Zombie Defense! Can you stay alive until Level 99?</h1>
					<h2 class="h2">Controls: A - move left  D - move right  Space - shoot</h2>
					<h3 class="h3">Click to begin!</h3>`);
function startGame(){
	$(".h1").remove();
	$(".h2").remove();
	$(".h3").remove();
	$(".board").append(`<h3 class="bodyCounter">Body Count: ${bodyCount} </br>   Lives Left: 3</h3>`);
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

window.addEventListener('click', function(event){
	event.preventDefault();
	startGame();
});