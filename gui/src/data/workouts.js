import request from '../util/request.js';

export default async function workouts() {
	const raw = await request('ls\n');
	
	const regex = /^(.*) \[(.*)\] \[Last done: (.*)\]/gm;

	const workouts = {};

	let m;

	while ((m = regex.exec(raw)) !== null) {
	    // This is necessary to avoid infinite loops with zero-width matches
	    if (m.index === regex.lastIndex) { regex.lastIndex++; }

	    // The result can be accessed through the `m`-variable.
	    workouts[m[1]] = {
	    	attributes:m[2],
	    	last_done:m[3]
	    };
	}

	return workouts;
}