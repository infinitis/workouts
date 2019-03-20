import assert from 'assert';

import view from '../src/reducers/view.js';

import {constants} from '../src/constants.js';
const {CHANGE_VIEW,SORT_VIEW} = constants;

describe('view reducers',() => {

	describe(CHANGE_VIEW,() => {

		it('should not change the state when an invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should successfully change the state to the `manage` view',() => {
			assert.fail('Not implemented');
		});

		it('should successfully change the state to the `recent` view',() => {
			assert.fail('Not implemented');
		});

	});

	describe(SORT_VIEW,() => {

		it('should not change the state when an invalid action is given',() => {
			assert.fail('Not implemented');
		});

		it('should successfully sort the view',() => {
			assert.fail('Not implemented');
		});
			
	});

});