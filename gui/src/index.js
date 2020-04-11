import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from 'reducers/combined.js';

import {main} from 'components/main/main.js';

import workout from 'classes/workout.js';

import load from 'data/load.js';

import sampleData from '../workouts.json';

window.workoutsInit = async(anchor,saveCb) => {
	if(!(anchor instanceof HTMLElement)) {
		throw new Error("Invalid anchor");
	}

	let data = {};
	try {
		data = await load();
	} catch(err) {
		if(err.message!=="request failed") {
			throw err;
		} else {
			data = sampleData;
			if((data !== void(0))&&(typeof data =="object")) {
				for(let i in data) {
					data[i] = new workout(data[i]);
				}
			}
		}
	}

	const store = createStore(reducers,{workouts:data});
	render(
		createElement(Provider,{store},
			createElement(main,null)
		),
		anchor
	);
};