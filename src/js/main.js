import $ from "jquery";
import { Game, Player, Zombie, Gun } from './classes';

function startGame(){
		//Creates a new instance of Game
		let game = new Game();
		//Shows the intro
		//Removes the intro
		// Makes the Board
		game.makeBoard();
		// Puts the Player on the Board
		let player = new Player();
		$(".board").append(`<div id="player">
			<img src=${player.image}
			</div>`);

		// Puts a Zombie(s) on the board
		$(".board").append(`<div class="zombie">
			<img src="http://placekitten.com/50/50">
		</div>`);
};

