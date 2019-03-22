import assert from 'assert';

import workouts from '../src/reducers/workouts.js';

import {constants} from '../src/constants.js';
const {ADD_WORKOUT,CHANGE_ATTRIBUTE,CHANGE_WORKOUT_NAME,DELETE_WORKOUT,NEW_WORKOUT,REMOVE_WORKOUT} = constants;

describe('workouts reducer',() => {

	describe(ADD_WORKOUT,() => {

		it('should not change the state when invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should successfully add a workout to an already existing workout',() => {
			assert.fail('Not implemented');
		});

	});

	describe(CHANGE_ATTRIBUTE,() => {

		it('should not change the state when an invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should not change the state when trying to change an attribute for a nonexistent workout',() => {
			assert.fail('Not implemented');
		});

		it('should successfully change the attribute of an already existing workout',() => {
			assert.fail('Not implemented');
		});

	});

	describe(CHANGE_WORKOUT_NAME,() => {

		it('should not change the state when an invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should not change the state when trying to change the name for a nonexistent workout',() => {
			assert.fail('Not implemented');
		});

		it('should successfully change the name of an already existing workout',() => {
			assert.fail('Not implemented');
		});

	});

	describe(CHANGE_WORKOUT_DESCRIPTION,() => {

		it('should not change the state when an invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should not change the state when trying to change the description for a nonexistent workout',() => {
			assert.fail('Not implemented');
		});

		it('should successfully change the description of an already existing workout',() => {
			assert.fail('Not implemented');
		});

	});	

	describe(DELETE_WORKOUT,() => {

		it('should not change the state when an invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should not change the state when action.name refers to a nonexistent workout',() => {
			assert.fail('Not implemented');
		});

		it('should successfully delete a workout from an existent workout',() => {
			assert.fail('Not implemented');
		});

	});

	describe(NEW_WORKOUT,() => {

		it('should not change the state when an invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should not change the state when "New Workout" workout already exists',() => {
			assert.fail('Not implemented');
		});

		it('should successfully add a new workout',() => {
			assert.fail('Not implemented');
		});
	});

	describe(REMOVE_WORKOUT,() => {

		it('should not change the state when an invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should fail when action.toRemove refers to a nonexistent workout',() => {
			assert.fail('Not implemented');
		});

		it('should successfully remove a workout',() => {
			assert.fail('Not implemented');
		});

	});

});