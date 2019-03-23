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
	sortKey:["last_done"],
	sortOrder:["desc"]
};

const generateDaysAgo = (workouts) => {
	const daysAgo = {...defaultDaysAgo};
	const now = new Date();
	for(let i in workouts) {
		const last = workouts[i].last_done[0];
		if(last === void(0)) {
			continue;
		}
		let lastDate = new Date(last);
		lastDate = new Date(lastDate.getTime() + (now.getTimezoneOffset() * 60000));
		for(let attr in workouts[i].attributes) {
			if(workouts[i].attributes[attr]) {
				const diff = Math.floor((now-lastDate)/(1000*60*60*24));
				if((daysAgo[attr]<0)||(diff<daysAgo[attr])) {
					daysAgo[attr] = diff;
				}
			}
		}
	}
	return daysAgo;
};

export default function view(state = defaultState,action) {
	const {CHANGE_VIEW,SORT_VIEW} = constants;
	switch(action.type) {
		case CHANGE_VIEW:
			if((action.workouts == void(0))||(typeof action.workouts != "object" )) {
				return state;
			}
			if(!Object.keys(action.workouts).every((x) => action.workouts[x] instanceof workout)) {
				return state;
			}
			if((action.view === void(0))||(action.view == state.view)) {
				return state;
			}
			switch(action.view) {
				case "manage":
					console.log('manage');
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
					newStateManageView.daysAgo = generateDaysAgo(action.workouts);
					console.log(JSON.stringify(newStateManageView.data));
					return newStateManageView;
				case "recent":
					console.log('recent');
					const newStateRecentView = {
						...state,
						view:"recent"
					};
					newStateRecentView.data = [];
					for(let i in action.workouts) {
						for(let j=0;j<action.workouts[i].datesDone.length;j++) {
							newStateRecentView.data.push({
								name:action.workouts[i].name,
								date:action.workouts[i].datesDone[j]
							});
						}
					}
					newStateRecentView.daysAgo = generateDaysAgo(action.workouts);
					console.log(JSON.stringify(newStateRecentView.data));
					return newStateRecentView;
				default:
					return state;
			}
		case SORT_VIEW:
			if(action.key === void(0)) {
				return state;
			}
			const newStateAfterSort = {...state};
			let newSortKey = [...newStateAfterSort.sortKey];
			let newSortOrder = [...newStateAfterSort.sortOrder];
			if(action.shift === true) {
				const index = newSortKey.indexOf(action.key);
				if(index>-1) {
					newSortOrder[index] = (newSortOrder[index]=="asc")?"desc":"asc";
				} else {
					newSortKey.push(action.key);
					newSortOrder.push("asc");
				}
			} else {
				if((newSortKey[0] !== void(0))&&(newSortKey[0]==action.key)) {
					newSortOrder = (newSortOrder[0]=="asc")?["desc"]:["asc"];
				} else {
					newSortOrder = ["asc"];
				}
				newSortKey = [action.key];
			}
			newStateAfterSort.sortKey = newSortKey;
			newStateAfterSort.sortOrder = newSortOrder;
			console.log(state.data);
			console.log(newStateAfterSort.data);
			newStateAfterSort.data.sort((a,b) => {
				for(let i=0;i<newSortKey.length;i++) {
					console.log(a[newSortKey[i]],b[newSortKey[i]]);
					if(a[newSortKey[i]]<b[newSortKey[i]]) {
						return (newSortOrder[i]=="asc")?-1:1;
					} else if(a[newSortKey[i]]>b[newSortKey[i]]) {
						return (newSortOrder[i]=="asc")?1:-1;
					}
				}
				return 0;
			});
			return newStateAfterSort;
		default:
			return state;
	}
}