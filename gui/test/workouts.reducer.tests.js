const assert = require('assert');

const workouts = require('../src/reducers/workouts.js').default;

const workout = require('../src/classes/workout.js').default;

const {constants} = require('../src/constants.js');
const {
	ADD_WORKOUT,
	CHANGE_ATTRIBUTE,
	CHANGE_WORKOUT_DATE,
	CHANGE_WORKOUT_NAME,
	DEFAULT_ATTRIBUTES,
	DELETE_WORKOUT,
	NEW_WORKOUT,
	REMOVE_WORKOUT
} = constants;

describe('workouts reducer',() => {

	const now = new Date();
	let today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000 ));
	let yesterday = new Date(today.getTime());
	today = today.toISOString().split("T")[0];
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday = yesterday.toISOString().split("T")[0];

	describe(ADD_WORKOUT,() => {

		it('should not change the state when invalid action is given',() => {
			assert.deepStrictEqual(workouts("haha"),"haha");
		});

		it('should fail to add to a non-existent workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:DEFAULT_ATTRIBUTES,
					dates:[],
					name:'workout1'
				})
			};
			const action = {
				type:ADD_WORKOUT,
				name:'workout1'
			};

			assert.deepStrictEqual(workouts(stateA,action),stateA);
		});

		it('should successfully add a workout to an already existing workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				})
			};
			const action = {
				type:ADD_WORKOUT,
				name:'workout1',
				toAdd:today
			};

			const stateB = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[today],
					name:'workout1'
				})
			};

			assert.deepStrictEqual(workouts(stateA,action),stateB);
		});

	});

	describe(CHANGE_ATTRIBUTE,() => {

		it('should not change the state when an invalid action is given',() => {
			const action = {
				type:CHANGE_ATTRIBUTE
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should not change the state when trying to change an attribute for a nonexistent workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				})
			};
			const action = {
				type:CHANGE_ATTRIBUTE,
				workout:'workout2'
			};

			assert.deepStrictEqual(workouts(stateA,action),stateA);

		});

		it('should successfully change the attribute of an already existing workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				})
			};
			const action = {
				type:CHANGE_ATTRIBUTE,
				workout:'workout1',
				attribute:"lower"
			};

			const stateB = {
				"workout1":new workout({
					attributes:{
						...DEFAULT_ATTRIBUTES,
						"lower":true
					},
					dates:[],
					name:'workout1'
				})
			};

			assert.deepStrictEqual(workouts(stateA,action),stateB);
		});

	});

	describe(CHANGE_WORKOUT_DATE,() => {

		it('should not change the state when an invalid action is given',() => {
			const action = {
				type:CHANGE_WORKOUT_DATE
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should not change the state when old and new are the same',() => {
			const action = {
				type:CHANGE_WORKOUT_DATE,
				old:-1,
				new:-1
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should successfully change the date of a workout',() => {
			
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[today],
					name:'workout1'
				})
			};
			const action = {
				type:CHANGE_WORKOUT_DATE,
				workout:'workout1',
				old:today,
				new:yesterday
			};

			const stateB = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[yesterday],
					name:'workout1'
				})
			};

			assert.deepStrictEqual(workouts(stateA,action),stateB);
		});

	});

	describe(CHANGE_WORKOUT_NAME,() => {

		it('should not change the state when an invalid action is given',() => {
			const action = {
				type:CHANGE_WORKOUT_NAME
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should not change the state when trying to change the name for a nonexistent workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				})
			};
			const action = {
				type:CHANGE_WORKOUT_NAME,
				workout:"workout2"
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should fail to change the name of a workout to an already existing workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				}),
				"workout2":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout2'
				})
			};
			const action = {
				type:CHANGE_WORKOUT_NAME,
				workout:"workout1",
				name:"workout2"
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should successfully change the name of an already existing workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				}),
				"workout2":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout2'
				})
			};
			const action = {
				type:CHANGE_WORKOUT_NAME,
				workout:"workout1",
				name:"workout3"
			};

			const stateB = {
				"workout3":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout3'
				}),
				"workout2":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout2'
				})
			};

			assert.deepStrictEqual(workouts(stateA,action),stateB);
		});

	});

	describe(DELETE_WORKOUT,() => {

		it('should not change the state when an invalid action is given',() => {
			const action = {
				type:DELETE_WORKOUT
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should not change the state when action.name refers to a nonexistent workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[today],
					name:'workout1'
				}),
				"workout2":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout2'
				})
			};
			const action = {
				type:DELETE_WORKOUT,
				name:"workout3"
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should successfully delete a workout from an existent workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[today],
					name:'workout1'
				}),
				"workout2":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout2'
				})
			};
			const action = {
				type:DELETE_WORKOUT,
				name:"workout1",
				toDel:today
			};

			const stateB = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				}),
				"workout2":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout2'
				})
			};
			assert.deepStrictEqual(workouts(stateA,action),stateB);
		});

	});

	describe(NEW_WORKOUT,() => {

		it('should not change the state when "New Workout" workout already exists',() => {
			const stateA = {
				"New Workout":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'New Workout'
				})
			};

			const action = {
				type:NEW_WORKOUT
			};
			assert.deepStrictEqual(workouts(stateA,action),stateA);
		});

		it('should successfully add a new generic workout',() => {
			const stateB = {
				"New Workout":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'New Workout'
				})
			};

			const action = {
				type:NEW_WORKOUT
			};
			assert.deepStrictEqual(workouts({},action),stateB);
		});

		it('should successfully add a new workout',() => {
			const stateB = {
				"hello workout":new workout({
					attributes:{...DEFAULT_ATTRIBUTES,lower:true},
					dates:['2020-01-01'],
					name:'hello workout'
				})
			};

			const action = {
				type:NEW_WORKOUT,
				toAdd:new workout({
					attributes:{...DEFAULT_ATTRIBUTES,lower:true},
					dates:['2020-01-01'],
					name:'hello workout'
				})
			};
			assert.deepStrictEqual(workouts({},action),stateB);
		});
	});

	describe(REMOVE_WORKOUT,() => {

		it('should not change the state when an invalid action is given',() => {
			const action = {
				type:REMOVE_WORKOUT
			};
			assert.deepStrictEqual(workouts("haha",action),"haha");
		});

		it('should fail when action.toRemove refers to a nonexistent workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				})
			};
			const action = {
				type:REMOVE_WORKOUT,
				toRemove:'workout2'
			};
			assert.deepStrictEqual(workouts(stateA,action),stateA);
		});

		it('should successfully remove a workout',() => {
			const stateA = {
				"workout1":new workout({
					attributes:{...DEFAULT_ATTRIBUTES},
					dates:[],
					name:'workout1'
				})
			};
			const action = {
				type:REMOVE_WORKOUT,
				toRemove:'workout1'
			};
			assert.deepStrictEqual(workouts(stateA,action),{});
		});

	});

});