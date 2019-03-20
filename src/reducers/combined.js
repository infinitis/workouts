import {combineReducers} from 'redux';

import workouts from './workouts.js';
import view from './view.js';

export default combineReducers({
	workouts,
	view
});