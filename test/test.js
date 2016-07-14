// Import Chai
import chai from 'chai';

// Import Any Files to Test
import { Player, Zombie } from '../src/js/characters';

// Set Chai Constants
const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;

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
  		expect(player.deathScream).to.be.a('string');
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
	});
});