import $ from "jquery";
import { Game, player, Player, zombieArray, Zombie, gun, Gun } from './classes';

function startGame(){
	let game = new Game();
	game.createBoard();
	console.log(game.createBoard);
	game.createPlayer();
	game.createGun();
	game.level = 9;
	game.createZombies();
	window.addEventListener('keydown', function(event){
		event.preventDefault();
		if (event.code==="Space"){
			player.attack();
			game.levelUp();
			game.youWin();
		} else if (event.code==="KeyA"){
			player.moveLeft();
		} else if (event.code==="KeyD"){
			player.moveRight();
		};
	});
	zombieArray[0].attack();
};

startGame();