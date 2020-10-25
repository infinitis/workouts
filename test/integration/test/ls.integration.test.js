const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);

describe('ls integration tests', () => {

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

	it('should succeed when no workouts are present', async() => {
		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `apple [3] [Last done: N/A]\n`;
			expected += `test [0] [Last done: N/A]\n`;
			expected += `workout1 [2] [Last done: N/A]\n`;
			expected += `workout2 [1] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});
	});

	it('should successfully limit rows grabbed', async() => {
		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts --rows=1 ls');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `apple [3] [Last done: N/A]\n`;
			assert.strictEqual(stdout,expected);
		});
	});

	it('should successfully search for workouts', async() => {
		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts ls workout');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `workout1 [2] [Last done: N/A]\n`;
			expected += `workout2 [1] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});
	});

	it('should reject when `ls` term is not given and attempting to filter', async() => {
		await assert.rejects(async() => {
			await exec('./workouts --filter 01');
		});
	});

	it('should successfully filter workouts by attribute', async() => {
		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts ls --filter 01');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `workout2 [1] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts ls --filter 10');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `workout1 [2] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts ls --filter x1');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `apple [3] [Last done: N/A]\n`;
			expected += `workout2 [1] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts ls --filter 00');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `test [0] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});
	});

});