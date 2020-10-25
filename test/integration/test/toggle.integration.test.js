const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);

describe('toggle integration tests', () => {

	beforeEach(async() => {
		await assert.doesNotReject(async() => await exec('./workouts attr add lower'));
		await assert.doesNotReject(async() => await exec('./workouts attr add upper'));

		await assert.doesNotReject(async() => await exec('./workouts new workout1 01'));
		await assert.doesNotReject(async() => await exec('./workouts new workout2 10'));
		await assert.doesNotReject(async() => await exec('./workouts new test 00'));
		await assert.doesNotReject(async() => await exec('./workouts new apple 11'));
	});

	afterEach(async() => {
		await unlink('workouts.db');
	});

	it('should fail when given an invalid workout', async() => {
		await assert.rejects(async() => await exec('./workouts toggle not lower'));
	});

	it('should fail when given an invalid attribute', async() => {
		await assert.rejects(async() => await exec('./workouts toggle not not_an_attribute'));
	});

	it('should successfully toggle a workout', async() => {
		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts toggle workout1 lower');

			assert.strictEqual(stdout,`Successfully toggled lower attribute for workout workout1\n`);
		});

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts ls workout1');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `workout1 [3] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts toggle workout1 lower');

			assert.strictEqual(stdout,`Successfully toggled lower attribute for workout workout1\n`);
		});

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts ls workout1');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `workout1 [2] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});
	});

});