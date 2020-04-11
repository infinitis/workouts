import request from '../util/request.js';

export default async function workouts() {
	const raw = await request('recent\n');

	const regex = /^(.*)\t(.*)/gm;

	const recent = {};

	let m;

	while ((m = regex.exec(raw)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) { regex.lastIndex++; }

		if(recent[m[1]]===void(0)) {
			recent[m[1]] = [];
		}

		recent[m[1]].push(m[2]);
	}

	return recent;
}