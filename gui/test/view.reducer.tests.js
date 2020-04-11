const assert = require('assert');

const view = require('../src/reducers/view.js').default;

const workout = require('../src/classes/workout.js').default;

const {constants} = require('../src/constants.js');
const {
	CHANGE_VIEW,
	DEFAULT_ATTRIBUTES,
	SORT_VIEW
} = constants;

describe('view reducers',() => {

	const defaultState = view();

	const workouts = {
		workout1:new workout({
			attributes:DEFAULT_ATTRIBUTES,
			dates:['2020-07-01'],
			name:'workout1'
		}),
		workout2:new workout({
			attributes:DEFAULT_ATTRIBUTES,
			dates:['2020-06-06'],
			name:'workout2'
		}),
		apple:new workout({
			attributes:DEFAULT_ATTRIBUTES,
			dates:['2020-06-04'],
			name:'apple'
		}),
		hello:new workout({
			attributes:DEFAULT_ATTRIBUTES,
			dates:['2020-07-01'],
			name:'hello'
		})
	};

	describe(CHANGE_VIEW,() => {

		it('should not change the state when an invalid action is given',() => {
			const stateA = {...defaultState};
			assert.deepStrictEqual(view(stateA,void(0)),defaultState);
		});

		it('should successfully change the state to the `manage` view',() => {
			const stateA = {...defaultState};
			const action = {
				type:CHANGE_VIEW,
				workouts:{},
				view:"manage"
			};

			const stateB = {
				...defaultState
			};
			assert.deepStrictEqual(view(stateA,action),stateB);
		});

		it('should successfully change the state to the `recent` view',() => {
			const stateA = {...defaultState};
			const action = {
				type:CHANGE_VIEW,
				workouts:{},
				view:"recent"
			};

			const stateB = {
				...defaultState,
				view:"recent"
			};
			assert.deepStrictEqual(view(stateA,action),stateB);
		});

		it('should successfully add all workouts to data array with appropriate manage view fields',() => {
			const stateA = {...defaultState};
			const action = {
				type:CHANGE_VIEW,
				workouts,
				view:"manage"
			};

			const stateB = {
				...defaultState,
				view:"manage",
				data: [
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-07-01",
						"lower": false,
						"martial": false,
						"name": "workout1",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-06-06",
						"lower": false,
						"martial": false,
						"name": "workout2",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-06-04",
						"lower": false,
						"martial": false,
						"name": "apple",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-07-01",
						"lower": false,
						"martial": false,
						"name": "hello",
						"other": false,
						"times_done": 1,
						"upper": false
					}
				]
			};
			assert.deepStrictEqual(view(stateA,action),stateB);
		});

		it('should successfully add all workouts to data array with appropriate recent view fields',() => {
			const stateA = {...defaultState};
			const action = {
				type:CHANGE_VIEW,
				workouts,
				view:"recent"
			};

			const stateB = {
				...defaultState,
				view:"recent",
				data: [
					{
						date:'2020-07-01',
						name:'workout1'
					},
					{
						date:'2020-06-06',
						name:'workout2'
					},
					{
						date:'2020-06-04',
						name:'apple'
					},
					{
						date:'2020-07-01',
						name:'hello'
					}
				]
			};
			assert.deepStrictEqual(view(stateA,action),stateB);
		});

	});

	describe(SORT_VIEW,() => {

		it('should not change the state when an invalid action is given',() => {
			const stateA = {...defaultState};
			assert.deepStrictEqual(view(stateA,void(0)),defaultState);
		});

		it('should successfully sort the manage view',() => {
			const stateA = {...defaultState};
			const action = {
				type:CHANGE_VIEW,
				workouts,
				view:'manage'
			};

			const stateB = {
				...defaultState,
				view:"manage",
				data: [
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-07-01",
						"lower": false,
						"martial": false,
						"name": "workout1",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-06-06",
						"lower": false,
						"martial": false,
						"name": "workout2",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-06-04",
						"lower": false,
						"martial": false,
						"name": "apple",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-07-01",
						"lower": false,
						"martial": false,
						"name": "hello",
						"other": false,
						"times_done": 1,
						"upper": false
					}
				],
				sortKey: ['last_done'],
				sortOrder: ['desc']
			};
			assert.deepStrictEqual(view(stateA,action),stateB);

			const action2 = {
				type:SORT_VIEW,
				key:'name'
			};
			const stateC = {
				...defaultState,
				view:"manage",
				data: [
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-06-04",
						"lower": false,
						"martial": false,
						"name": "apple",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-07-01",
						"lower": false,
						"martial": false,
						"name": "hello",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-07-01",
						"lower": false,
						"martial": false,
						"name": "workout1",
						"other": false,
						"times_done": 1,
						"upper": false
					},
					{
						"back": false,
						"cardio": false,
						"core": false,
						"last_done": "2020-06-06",
						"lower": false,
						"martial": false,
						"name": "workout2",
						"other": false,
						"times_done": 1,
						"upper": false
					}
				],
				sortKey: ['name'],
				sortOrder: ['asc']
			};

			assert.deepStrictEqual(view(stateB,action2),stateC);
		});

		it('should successfully sort the recent view',() => {
			const stateA = {...defaultState};
			const action = {
				type:CHANGE_VIEW,
				workouts,
				view:"recent"
			};

			const stateB = {
				...defaultState,
				view:"recent",
				data: [
					{
						date:'2020-07-01',
						name:'workout1'
					},
					{
						date:'2020-06-06',
						name:'workout2'
					},
					{
						date:'2020-06-04',
						name:'apple'
					},
					{
						date:'2020-07-01',
						name:'hello'
					}
				]
			};
			assert.deepStrictEqual(view(stateA,action),stateB);

			const action2 = {
				type:SORT_VIEW,
				key:'name'
			};

			const stateC = {
				...defaultState,
				view:"recent",
				data: [
					{
						date:'2020-06-04',
						name:'apple'
					},
					{
						date:'2020-07-01',
						name:'hello'
					},
					{
						date:'2020-07-01',
						name:'workout1'
					},
					{
						date:'2020-06-06',
						name:'workout2'
					}
				],
				sortKey: ['name'],
				sortOrder: ['asc']
			};

			assert.deepStrictEqual(view(stateB,action2),stateC);
		});
			
	});

});