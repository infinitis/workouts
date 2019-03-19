import {render} from 'react-dom';

import {createStore} from 'redux';

import {Provider} from 'react-redux';

import reducers from 'reducers/combined.js';

import main from 'components/main/main.js';

export default function workoutsInit(anchor) {
	if(!(anchor instanceof HTMLElement)) {
		throw new Error("Invalid anchor");
	}
	const store = createStore(reducers,{});
	render(
		createElement(Provider,{store},
			createElement(main,null)
		),
		anchor
	);
}