const assert = require('assert');

const sync = require('../src/reducers/sync.js').default;

const {constants} = require('../src/constants.js');
const {
	UPDATE_SYNC_STATUS,
	SYNC_STATUS
} = constants;

describe('sync reducer',() => {

	describe(UPDATE_SYNC_STATUS,() => {

		it('should not change the state when given an invalid action',async() => {
			const action = {
				type:UPDATE_SYNC_STATUS
			};
			await assert.doesNotReject(async() => {
				assert.deepStrictEqual(await sync("haha",action),"haha");
			});
		});

		it('should not change the state when given an invalid status',async() => {
			const action = {
				type:UPDATE_SYNC_STATUS,
				status:-1
			};
			await assert.doesNotReject(async() => {
				assert.deepStrictEqual(await sync("haha",action),"haha");
			});
		});

		it('should successfully change the status',async() => {
			const stateA = {
				status:SYNC_STATUS.STATUS_DESYNCED
			};
			const action1 = {
				type:UPDATE_SYNC_STATUS,
				status:SYNC_STATUS.STATUS_UNSYNCED
			};

			const stateB = {
				status:SYNC_STATUS.STATUS_UNSYNCED
			};
			const action2 = {
				type:UPDATE_SYNC_STATUS,
				status:SYNC_STATUS.STATUS_SYNCED
			};
			
			const stateC = {
				status:SYNC_STATUS.STATUS_SYNCED
			};

			await assert.doesNotReject(async() => {
				assert.deepStrictEqual(await sync(stateA,action1),stateB);
				assert.deepStrictEqual(await sync(stateB,action2),stateC);
			});
		});

	});

});