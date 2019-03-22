import {render} from 'react-dom';

import {createStore} from 'redux';

import {Provider} from 'react-redux';

import reducers from 'reducers/combined.js';

import {main} from 'components/main/main.js';

import workout from 'classes/workout.js';

import data from '../workouts.json';

const defaultSaveFunction = (data) => {
	const content = JSON.stringify(data);
	var a = document.createElement('a');
    var blob = new Blob([content], {'type':'application/octet-stream'});
    a.href = window.URL.createObjectURL(blob);
    a.download = 'workouts.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
    	document.body.removeChild(a);
    	window.URL.revokeObjectURL(blob);
    }, 0);
};

window.workoutsInit = (anchor,saveCb) => {
	if(!(anchor instanceof HTMLElement)) {
		throw new Error("Invalid anchor");
	}
	// Import data into store
	if((data !== void(0))&&(typeof data =="object")) {
		for(let i in data) {
			data[i] = new workout(data[i]);
		}
	}
	const store = createStore(reducers,{workouts:data});
	if(typeof saveCb != "function") {
		saveCb = defaultSaveFunction;
	}
	render(
		createElement(Provider,{store},
			createElement(main,{save:saveCb})
		),
		anchor
	);
};