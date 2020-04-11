import workout from '../classes/workout.js';

import {constants} from '../constants.js';
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

export default function workouts(state = {},action) {
	if((action===void(0))||(action.type===void(0))) { return state; }

	switch(action.type) {
		case ADD_WORKOUT:
			if(action.name === void(0)) { return state; }
			if(!(state[action.name] instanceof workout)) { return state; }
			
			const newStateAfterAdd = {...state};
			try {
				newStateAfterAdd[action.name].add(action.toAdd);
				return newStateAfterAdd;
			} catch(err) {
				return state;
			}
		case CHANGE_ATTRIBUTE:
			if((action.workout === void(0))||(action.attribute === void(0))) { return state; }
			if(state[action.workout] === void(0)) { return state; }
			
			try {
				const newStateAfterChangeAttribute = {...state};
				newStateAfterChangeAttribute[action.workout].toggleAttribute(action.attribute);
				return newStateAfterChangeAttribute;
			} catch(err) {
				return state;
			}
		case CHANGE_WORKOUT_DATE:
			if(action.workout === void(0)) { return state; }
			if((action.old === void(0))||(action.new === void(0))) { return state; }
			if(action.old === action.new) { return state; }

			const newStateAfterWorkoutDateChange = {...state};
			try {
				newStateAfterWorkoutDateChange[action.workout].remove(action.old);
				newStateAfterWorkoutDateChange[action.workout].add([action.new]);
				return newStateAfterWorkoutDateChange;
			} catch(err) {
				console.error(err);
				return state;
			}
		case CHANGE_WORKOUT_NAME:
			if(action.workout === void(0)) { return state; }
			if(state[action.workout] === void(0)) { return state; }
			if(state[action.name] !== void(0)) { return state; }

			try {
				const newStateAfterNameChange = {
					...state
				};
				const toAdd = new workout(newStateAfterNameChange[action.workout]);
				toAdd.name = action.name;
				delete(newStateAfterNameChange[action.workout]);
				newStateAfterNameChange[action.name] = toAdd;
				return newStateAfterNameChange;
			} catch(err) {
				return state;
			}
		case DELETE_WORKOUT:
			if(action.name === void(0)) { return state; }
			if(action.toDel === void(0)) { return state; }
			if(!(state[action.name] instanceof workout)) { return state; }
			
			try {
				const newStateAfterDelete = {...state};
				newStateAfterDelete[action.name].remove(action.toDel);
				return newStateAfterDelete;
			} catch(err) {
				return state;
			}
		case NEW_WORKOUT:
			if(action.toAdd===void(0)) {
				if(state["New Workout"] !== void(0)) { return state; }

				const newStateAfterNewGeneric = {...state};
				const newWorkout = new workout();
				newStateAfterNewGeneric[newWorkout.name] = newWorkout;
				return newStateAfterNewGeneric;
			} else {
				if(!(action.toAdd instanceof workout)) { return state; }
				const newStateAfterNew = {...state};
				newStateAfterNew[action.toAdd.name] = action.toAdd;
				return newStateAfterNew;
			}
		case REMOVE_WORKOUT:
			if(action.toRemove === void(0)) { return state; }
			if(state[action.toRemove] === void(0)) { return state; }
			
			const newStateAfterRemove = {...state};
			delete(newStateAfterRemove[action.toRemove]);
			return newStateAfterRemove;
		default:
			return state;
	}
}