const assert = require('assert');

const action = require('../src/data/action.js').default;

const workout = require('../src/classes/workout.js').default;

const {constants} = require('../src/constants.js');
const {
	DEFAULT_ATTRIBUTES
} = constants;

describe('action tests',() => {

	it('should throw when given no parameters',async() => {
		const params = {};
		await assert.rejects(action(params));
	});

	it('should throw when cmd is not a function',async() => {
		const params = {cmd:1};
		await assert.rejects(action(params));
	});

	it('should return false when not given any data',async() => {
		const params = {
			cmd:() => {}
		};
		await assert.rejects(action(params));
	});

	it('should throw when not given a function to load backend data',async() => {
		const params = {
			cmd:() => {},
			data:{}
		};
		await assert.rejects(action(params));
	});

	it('should return false when cmd function throws',async() => {
		const params = {
			cmd:async() => {
				throw new Error("here");
			},
			data:{},
			backendDataLoader:async() => {}
		};
		await assert.doesNotReject(async() => {
			const originalConsoleError = console.error;
			console.error = (msg) => {};
			assert.strictEqual(await action(params),false);
			console.error = originalConsoleError;
		});
	});

	it('should return false when backend data and data differ',async() => {
		const params = {
			cmd:async() => {},
			data:{
				test:new workout(),
				test2:new workout({
					attributes:DEFAULT_ATTRIBUTES,
					dates:['2020-07-01'],
					name:'test2'
				})
			},
			backendDataLoader:async() => {
				return {
					test:-1,
					test2:'apple'
				};
			}
		};
		
		await assert.doesNotReject(async() => {
			assert.strictEqual(await action(params),false);
		});
	});

	it('should return true upon updating and validating backend data',async() => {
		const params = {
			cmd:async() => {},
			data:{
				test:new workout()
			},
			backendDataLoader:async() => {
				return {
					test:new workout()
				};
			}
		};
		
		await assert.doesNotReject(async() => {
			assert.strictEqual(await action(params),true);
		});
	});

});