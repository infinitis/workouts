const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);

describe('new integration tests', () => {

	beforeEach(async() => {
		await assert.doesNotReject(async() => await exec('./workouts attr add lower'));
		await assert.doesNotReject(async() => await exec('./workouts attr add upper'));
	});

	afterEach(async() => {
		await unlink('workouts.db');
	});

	it('should success creating a new workout', async() => {
		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts new workout1');

			assert.strictEqual(stdout,`New workout added: workout1\n`);
		});
	});

	it('should fail to create a workout when given the wrong number of attributes', async() => {
		await assert.rejects(async() => {
			const res = await exec('./workouts new workout1 0');
			console.log(res);
		});
		await assert.rejects(async() => await exec('./workouts new workout1 110'));
	});

});