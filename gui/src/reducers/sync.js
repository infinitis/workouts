import {constants} from '../constants.js';
const {
	DO_ACTION_SYNC,
	UPDATE_SYNC_STATUS,
	SYNC_STATUS
} = constants;

const defaultState = {
	status:SYNC_STATUS.STATUS_UNSYNCED
};

export default function sync(state = defaultState,action) {
	if((action===void(0))||(action.type===void(0))) { return state; }

	switch(action.type) {
		case UPDATE_SYNC_STATUS:
			if(action.status===void(0)) { return state; }
			if(SYNC_STATUS[action.status]===void(0)) { return state; }

			return {
				...state,
				status:action.status
			};
		default:
			return state;
	}
}