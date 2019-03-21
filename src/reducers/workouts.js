import workout from '../classes/workout.js';

import {constants} from '../constants.js';

export default function workouts(state = {},action) {
	const {ADD_WORKOUT,CHANGE_ATTRIBUTE,CHANGE_WORKOUT_DESCRIPTION,CHANGE_WORKOUT_NAME,DEFAULT_ATTRIBUTES,DELETE_WORKOUT,NEW_WORKOUT,REMOVE_WORKOUT} = constants;
	if(typeof action != "object") {
		return state;
	}
	switch(action.type) {
		case ADD_WORKOUT:
			if(action.name === void(0)) {
				return state;
			}
			if(!(state[action.name] instanceof workout)) {
				return state;
			}
			const newStateAfterAdd = {...state};
			try {
				newStateAfterAdd[action.name].add(action.toAdd);
				return newStateAfterAdd;
			} catch(err) {
				return state;
			}
		case CHANGE_ATTRIBUTE:
			if((action.workout === void(0))||(action.attribute === void(0))) {
				return state;
			}
			if(state[action.workout] === void(0)) {
				return state;
			}
			try {
				const newStateAfterChangeAttribute = {...state};
				newStateAfterChangeAttribute[action.workout].toggleAttribute(action.attribute);
				return newStateAfterChangeAttribute;
			} catch(err) {
				return state;
			}
		case CHANGE_WORKOUT_DESCRIPTION:
			if(action.workout === void(0)) {
				return state;
			}
			if(state[action.workout] === void(0)) {
				return state;
			}
			try {
				const newStateAfterDescriptionChange = {...state};
				newStateAfterDescriptionChange[action.workout].changeDescription(action.description);
				return newStateAfterDescriptionChange;
			} catch(err) {
				console.error(err);
				return state;
			}
		case CHANGE_WORKOUT_NAME:
			if(action.workout === void(0)) {
				return state;
			}
			if(state[action.workout] === void(0)) {
				return state;
			}
			if(state[action.name] !== void(0)) {
				return state;
			}
			try {
				const newStateAfterNameChange = {
					...state
				};
				const toAdd = new workout(newStateAfterNameChange[action.workout]);
				toAdd.setName(action.name)
				delete(newStateAfterNameChange[action.workout]);
				newStateAfterNameChange[action.name] = toAdd;
				return newStateAfterNameChange;
			} catch(err) {
				return state;
			}
		case DELETE_WORKOUT:
			if(action.name === void(0)) {
				return state;
			}
			if(!(state[action.name] instanceof workout)) {
				return state;
			}
			try {
				const newStateAfterDelete = {...state};
				newStateAfterDelete[action.workout].remove(toDel);
				return newStateAfterDelete;
			} catch(err) {
				return state;
			}
		case NEW_WORKOUT:
			if(state["New Workout"] !== void(0)) {
				return state;
			}
			const newStateAfterNew = {...state};
			const newWorkout = new workout();
			newStateAfterNew[newWorkout.name] = newWorkout;
			return newStateAfterNew;
		case REMOVE_WORKOUT:
			if(action.toRemove === void(0)) {
				return state;
			}
			if(state[action.toRemove] === void(0)) {
				return state;
			}
			const newStateAfterRemove = {...state};
			delete(newStateAfterRemove[action.toRemove]);
			return newStateAfterRemove;
		default:
			return state;
	}
}