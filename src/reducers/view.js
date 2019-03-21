import workout from '../classes/workout.js';

import {constants} from '../constants.js';

const {DEFAULT_ATTRIBUTES} = constants;
const defaultDaysAgo = {...DEFAULT_ATTRIBUTES};
Object.keys(defaultDaysAgo).map((attr) => {
	defaultDaysAgo[attr] = -1;
});
const defaultState = {
	view:"manage",
	daysAgo:defaultDaysAgo,
	data:[],
	sortKey:"last_done",
	sortOrder:"desc"
};

export default function view(state = defaultState,action) {
	const {CHANGE_VIEW,SORT_VIEW} = constants;
	if((action.workouts == void(0))||(typeof action.workouts != "object" )) {
		return state;
	}
	if(!Object.keys(action.workouts).every((x) => x instanceof workout)) {
		return state;
	}
	console.log('here');
	switch(action.type) {
		case CHANGE_VIEW:
			if((action.view === void(0))||(action.view == state.view)) {
				return state;
			}
			switch(action.view) {
				case "manage":
					const newStateManageView = {
						...state,
						view:"manage"
					};
					newStateManageView.data = [];
					for(let i=0;i<action.workouts.length;i++) {
						newStateManageView.data.push({
							attributes:actions.workouts[i].attributes,
							name:actions.workouts[i].name,
							last_done:actions.workouts[i].last_done,
							description:actions.workouts[i].description
						});
					}
					return newStateManageView;
				case "recent":
					const newStateRecentView = {
						...state,
						view:"recent"
					};
					newStateRecentView.data = [];
					for(let i=0;i<action.workouts.length;i++) {
						for(let j=0;j<action.workouts[i].datesDone;j++) {
							newStateRecentView.data.push({
								name:actions.workouts[i].name,
								date:actions.workouts[i].datesDone[j]
							});
						}
					}
					return newStateRecentView;
				default:
					return state;
			}
		case SORT_VIEW:
			/*if(action.key === void(0)) {
				return state;
			}
			if(action.order === void(0)) {
				return state;
			}
			let newSortKey = [...state.sortKey];
			let newSortOrder = [...state.sortOrder];
			const sortIndex = state.sortKey.indexOf(action.key);
			if(sortIndex>-1) {
				newSortOrder[sortIndex] = (newSortOrder[sortIndex]=="asc")?"desc":"asc";
			} else {
				newSortkey*/
			return state;
		default:
			return state;
	}
}