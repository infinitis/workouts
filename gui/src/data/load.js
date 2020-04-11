import getAttributes from './attributes.js';
import getRecent from './recent.js'
import getWorkouts from './workouts.js';

import workout from '../classes/workout.js';

export default async function load() {
	const attrs = await getAttributes();
	const workouts = await getWorkouts();
	const recent = await getRecent();

	for(let i in workouts) {
		workouts[i].dates = (recent[i]===void(0))?[]:recent[i];
		let flags = workouts[i].attributes;
		workouts[i].attributes = {};
		for(let attr of attrs) {
			workouts[i].attributes[attr] = (flags & 1)?true:false;
			flags >>= 1;
		}
		workouts[i].name = i;
		workouts[i] = new workout(workouts[i]);
	}

	return workouts;
}