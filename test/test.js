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
});