// Import Chai
import chai from 'chai';

// Import Any Files to Test
import { Game, Player, Zombie, Gun } from '../src/js/classes';

// Set Chai Constants
const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;

describe('Game Class', ()=>{
	let game;
	beforeEach(()=>{
		game = new Game();
	});
	describe('Class Creation', ()=>{
		it('should be an instance of Game',()=>{
			expect(game).to.be.an.instanceof(Game);
		});
	});

	describe("Game Properties", ()=>{
		it('should have a state', ()=>{
			expect(game.state).to.be.a('number');
		});
		it('should have a board',()=>{
			expect(game.board).to.be.a('string');
		});
		it('should have a start screen', ()=>{
			expect(game.startScreen).to.be.a('string');
		});
		it('should have a win screen', ()=>{
			expect(game.winScreen).to.be.a('string');
		});
		it('should have a lose screen',()=>{
			expect(game.loseScreen).to.be.a('string');
		});
	});
	describe("Game Actions", ()=>{
		it('should start a new game when the player presses a key', ()=>{
			expect(game.start).to.be.a('function');
		});
		it('should end the game with the player wins', ()=>{
			expect(game.youWin).to.be.a('function');
		});
		it('should end the game when the player dies', ()=>{
			expect(game.gameOver).to.be.a('function');
		});
	});
});

describe('Player Class', function () {
	let player;

	beforeEach(()=>{
		player = new Player();
	})
  describe('Class Creation', function () {

    it('should be an instance of Player', function () {
      expect(player).to.be.an.instanceof(Player);
    });
  });

  describe('Player properties', () => {
	  	it('should have 3 hitpoints',()=>{
	  		expect(player.hitpoints).to.equal(3);
	  	});
	  	it('should have an image', () =>{
	  		expect(player.image).to.be.a('string');
	  	});
	  	it('should have an image for when it is bitten once', ()=>{
	  		expect(player.biteImage).to.be.a('string');
	  	});
	  	it('should have an image for when it is bitten twice', ()=>{
	  		expect(player.biteImage2).to.be.a('string');
	  	});
	  	it('should have a sound for when it is bitten', () => {
	  		expect(player.sound).to.be.a('string');
	  	});
	  	it('should have a sound for when it dies', ()=>{
	  		expect(player.deathSound).to.be.a('string');
	  	});
	  	it('should have an x position on the game board', ()=>{
	  		expect(player.position.x).to.be.a('number');
	  	});
	  	it('should have a y position on the game board', ()=>{
	  		expect(player.position.y).to.be.a('number');
	  	});
  	});
  	describe('Player actions', ()=>{
  		it('should be able to change its position left on the board', ()=>{
  			expect(player.moveLeft).to.be.a('function');
  		});
  		it('should be able to change its position right on the board', ()=>{
  			expect(player.moveRight).to.be.a('function');
  		});
  		it('should be able to make a sound when it gets bitten', ()=>{
  			expect(player.grunt).to.be.a('function');
  		});
  		it('should be able to scream when it dies', ()=>{
  			expect(player.scream).to.be.a('function');
  		});
  	});
});

describe('Zombie Class', function(){
	let zombie;
	beforeEach(()=>{
		zombie = new Zombie();
	});
	describe ('Zombie Class Creation', ()=>{
		it('should have 3 hitpoints',()=>{
  			expect(zombie.hitpoints).to.equal(3);
  		});
	  	it('should have an image', () =>{
	  		expect(zombie.image).to.be.a('string');
	  	});
	  	it('should have an image for when it gets shot', ()=>{
	  		expect(zombie.shotImage).to.be.a('string');
	  	});
	  	it('should have an image for when it gets shot twice', ()=>{
	  		expect(zombie.shotImage2).to.be.a('string');
	  	});
	  	it('should have a sound for when it is shot', () => {
	  		expect(zombie.sound).to.be.a('string');
	  	});
	  	it('should have a sound for when it dies', ()=>{
	  		expect(zombie.deathScream).to.be.a('string');
	  	});
	  	it('should have an x position on the game board', ()=>{
	  		expect(zombie.position.x).to.be.a('number');
	  	});
	  	it('should have a y position on the game board', ()=>{
	  		expect(zombie.position.y).to.be.a('number');
	});
  	describe('Zombie actions', ()=>{
  		it('should be able to change its position left on the board', ()=>{
  			expect(zombie.moveLeft).to.be.a('function');
  		});
  		it('should be able to change its position right on the board', ()=>{
  			expect(zombie.moveRight).to.be.a('function');
  		});
  		it('should move down towards the player at a certain speed', ()=>{
  			expect(zombie.moveSpeed).to.be.a('function');
  		});
  		it('should be able to attack the player', ()=>{
  			expect(zombie.attack).to.be.a('function');
  		});
  		it('should make a sound when it gets shot', ()=>{
  			expect(zombie.grunt).to.be.a('function');
  		});
  		it('should be able to scream when it dies', ()=>{
  			expect(zombie.scream).to.be.a('function');
  		});
	});
});

describe('Gun Class', function(){
	let gun;
	beforeEach(()=>{
		gun = new Gun();
	});
	describe('Gun Class Creation', ()=>{
		it('should have an image', ()=>{
			expect(gun.image).to.be.a('string');
		});
		it('should have an image for when it fires', ()=>{
			expect(gun.fireImage).to.be.a('string');
		});
		it('should have a power rating',()=>{
			expect(gun.power).to.be.a('number');
		});
	});
	describe('Gun actions', ()=>{
		it('should make a sound when it fires', ()=>{
			expect(gun.shot).to.be.a('function');
		});
		it('should fire when the user pushes a button if it has bullets', ()=>{
			expect(gun.shoot).to.be.a('function');
		});
	})
});