import {combineReducers} from 'redux';

import sync from './sync.js';
import view from './view.js';
import workouts from './workouts.js';

export default combineReducers({
	sync,
	view,
	workouts
});