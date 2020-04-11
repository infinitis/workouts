import action from '../data/action.js';
import load from '../data/load.js';

import request from './request.js';

import {constants} from '../constants.js';
const {
	SYNC_STATUS,
	UPDATE_SYNC_STATUS
} = constants;
const {
	STATUS_UNSYNCED,
	STATUS_DESYNCED,
	STATUS_SYNCED
} = SYNC_STATUS;

export default async function backend(opts) {
	const {dispatch,cmd,data} = opts;

	try {
		if(!(await action({
			cmd:async() => request(cmd),
			data,
			backendDataLoader:load
		}))) {
			throw new Error(`command '${cmd}' failed`);
		}
	} catch(err) {
		console.error(err);
		alert(`Sync with backend failed. Save manually.`);
		dispatch({
			type:UPDATE_SYNC_STATUS,
			status:STATUS_DESYNCED
		});
	}
}