const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);

describe('add integration tests', () => {

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

	it('should succeed when adding a new workout', async() => {
		await assert.doesNotReject(async() => await exec('./workouts add test'));
	});

	it('should succeed when adding a new workout and reflect that upon ls', async() => {
		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts add workout1 2020-07-10');

			assert.strictEqual(stdout,`added workout workout1 on 2020-07-10\n`);
		});

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts add apple 2020-06-10');

			assert.strictEqual(stdout,`added workout apple on 2020-06-10\n`);
		});		

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `workout1 [2] [Last done: 2020-07-10]\n`;
			expected += `apple [3] [Last done: 2020-06-10]\n`;
			expected += `test [0] [Last done: N/A]\n`;
			expected += `workout2 [1] [Last done: N/A]\n`;

			assert.strictEqual(stdout,expected);
		});
	});

	it('should successfully get last done', async() => {
		await assert.doesNotReject(async() => await exec('./workouts add workout1 2020-07-10'));
		await assert.doesNotReject(async() => await exec('./workouts add workout1 2020-06-10'));

		await assert.doesNotReject(async() => {
			const {stdout,stderr} = await exec('./workouts ls workout1');

			let expected = `Attributes:\tlower\tupper\t\n`;
			expected += `workout1 [2] [Last done: 2020-07-10]\n`;

			assert.strictEqual(stdout,expected);
		});
	});

	it('should reject when not given a valid workout', async() => {
		await assert.rejects(async() => await exec('./workouts add hahahahahah 2020-07-10'));
	});

	it('should reject when not given a valid date', async() => {
		await assert.rejects(async() => await exec('./workouts add hahahahahah 2020-07-10123123123123123'));
		await assert.rejects(async() => await exec('./workouts add hahahahahah "kasdflasj lkssdasdf lkdaNOT_A_DATE"'));
	});

});