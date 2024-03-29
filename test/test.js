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
		it('should have a level', ()=>{
			expect(game.level).to.equal(1);
		});
	});
	describe("Game Actions", ()=>{
		it('should generate a game board when a new game begins', ()=>{
			expect(game.createBoard).to.be.a('function');
		});
		it('should create a player when a new game begins', ()=>{
			expect(game.createPlayer).to.be.a('function');
		});
		it ('should create a gun and give it to the player when game begins', ()=>{
			expect(game.createGun).to.be.a('function');
		});
		it('should create zombies and give them IDs according to the level', ()=>{
			expect(game.createZombies).to.be.a('function');
		});
		it('should start the zombie movement toward player', ()=>{
			expect(game.zombieMovement).to.be.a('function');
		});
		it('should end the game when the player wins and show a win screen', ()=>{
			expect(game.youWin).to.be.a('function');
		});
		it('should move to the next level when all zombies are dead', ()=>{
			expect(game.levelUp).to.be.a('function');
		});
	});
});

describe('Player Class', function () {
	let player;

	beforeEach(()=>{
		player = new Player();
	});
  	describe('Class Creation', function () {
    	it('should be an instance of Player', ()=>{
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
	  	it('should have an image for when it is bitten', ()=>{
	  		expect(player.biteImage).to.be.a('string');
	  	});
	  	it('should have an image for when it is dead', ()=>{
	  		expect(player.deadImage).to.be.a('string');
	  	});
	  	it('should have a sound for when it is bitten', () => {
	  		expect(player.sound).to.be.a('string');
	  	});
	  	it('should have an image for when it attacks', ()=>{
	  		expect(player.attackImage).to.be.a('string');
	  	});
	  	it('should have a gun', ()=>{
	  		expect(player.gun).to.be.a('object');
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
  		it('should be able to attack the zombie', ()=>{
  			expect(player.attack).to.be.a('function');
  		});
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
		it('should have an empty id', ()=>{
			expect(zombie.id).to.be.a('string');
		});
		it('should have an empty index', ()=>{
			expect(zombie.index).to.be.a('string');
		});
		it('should have 3 hitpoints',()=>{
  			expect(zombie.hitpoints).to.be.a('number');
  		});
  		it('should have a speed that it moves at horizontally', ()=>{
  			expect(zombie.moveSpeedX).to.be.a('number');
  		});
  		it('should have a speed that it moves at vertically', ()=>{
  			expect(zombie.moveSpeedY).to.be.a('number');
  		});
	  	it('should have an image', () =>{
	  		expect(zombie.image).to.be.a('string');
	  	});
	  	it('should have an image for when it gets shot', ()=>{
	  		expect(zombie.shotImage).to.be.a('string');
	  	});
	  	it('should have a sound for when it is shot', ()=>{
	  		expect(zombie.sound).to.be.a('string');
	  	});
	  	it('should have a sound for when it dies', ()=>{
	  		expect(zombie.deathSound).to.be.a('string');
	  	});
	  	it('should have an x position on the game board', ()=>{
	  		expect(zombie.position.x).to.be.a('number');
	  	});
	  	it('should have a y position on the game board', ()=>{
	  		expect(zombie.position.y).to.be.a('number');
	  	});
	});
  	describe('Zombie actions', ()=>{
  		it('should move toward the player', ()=>{
  			expect(zombie.moveTowardPlayer).to.be.a('function');
  		});
  		it('should be able to attack the player, check to see if player is dead, and if so end the game', ()=>{
  			expect(zombie.attack).to.be.a('function');
  		});
  		it('should make a sound when it gets shot', ()=>{
  			expect(zombie.grunt).to.be.a('function');
  		});
  		it('should know if it is still alive', ()=>{
  			expect(zombie.checkVitals).to.be.a('function');
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
		it('should have a power rating',()=>{
			expect(gun.power).to.be.a('number');
		});
		it('should have a sound for when it fires', ()=>{
			expect(gun.gunshot).to.be.a('string');
		});
	});
	describe('Gun actions', ()=>{
		it('should make a sound when it fires and hurt the zombie', ()=>{
			expect(gun.fire).to.be.a('function');
		});
	});
});