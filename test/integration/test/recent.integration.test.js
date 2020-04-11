const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);

describe('recent integration tests', () => {

	const recent = [
		{name:"workout1",date:"2020-07-10"},
		{name:"apple",date:"2020-07-09"},
		{name:"test",date:"2020-07-09"},
		{name:"workout2",date:"2020-07-09"}
	];

	beforeEach(async() => {
		await assert.doesNotReject(async() => await exec('./workouts attr add lower'));
		await assert.doesNotReject(async() => await exec('./workouts attr add upper'));

		await assert.doesNotReject(async() => await exec('./workouts new workout1 01'));
		await assert.doesNotReject(async() => await exec('./workouts new workout2 10'));
		await assert.doesNotReject(async() => await exec('./workouts new test 00'));
		await assert.doesNotReject(async() => await exec('./workouts new apple 11'));

		for(const i of recent) {
			await assert.doesNotReject(async() => await exec(`./workouts add ${i.name} ${i.date}`));
		}
	});

	afterEach(async() => {
		await unlink('workouts.db');
	});

	it('should successfully print recent workouts', async() => {
		const {stdout,stderr} = await exec('./workouts recent');

		let expected = "";
		for(const i of recent) {
			expected += `${i.name}\t${i.date}\n`;
		}

		assert.strictEqual(stdout,expected);
	});

});