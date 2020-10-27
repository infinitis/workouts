const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);

describe('ls integration tests', () => {

	const recent = [
		{name:"workout1",date:"2020-07-10"},
		{name:"apple",date:"2020-07-09"},
		{name:"test",date:"2020-07-09"},
		{name:"workout2",date:"2020-07-09"}
	];

	beforeEach(async() => {
		await assert.doesNotReject(async() => await exec('./workouts --attr add lower'));
		await assert.doesNotReject(async() => await exec('./workouts --attr add upper'));

		await assert.doesNotReject(async() => await exec('./workouts --workout add workout1 01'));
		await assert.doesNotReject(async() => await exec('./workouts --workout add workout2 10'));
		await assert.doesNotReject(async() => await exec('./workouts --workout add test 00'));
		await assert.doesNotReject(async() => await exec('./workouts --workout add apple 11'));

		for(const i of recent) {
			await assert.doesNotReject(async() => await exec(`./workouts --recent add ${i.name} ${i.date}`));
		}
	});

	afterEach(async() => {
		await unlink('workouts.db');
	});

	describe('ls_attribute', () => {
		it('should successfully list all attributes in order they were added', async() => {
			const attributes = ["lower","upper"];

			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec(`./workouts --attr ls`);

				let expected = "";
				for(const attr of attributes) {
					expected += `${attr}\n`;
				}

				assert.strictEqual(stdout,expected);
			});
		});
	});

	describe('ls_recent', () => {

		it('should successfully print recent workouts', async() => {
			const {stdout,stderr} = await exec('./workouts --recent ls');

			let expected = "";
			for(const i of recent) {
				expected += `${i.name}\t${i.date}\n`;
			}

			assert.strictEqual(stdout,expected);
		});

	});

	describe('ls_workouts', () => {
		
		it('should succeed when no workouts are present', async() => {
			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts');

				let expected = `Attributes:\tlower\tupper\t\n`;
				expected += `workout1 [2] [Last done: 2020-07-10]\n`;
				expected += `apple [3] [Last done: 2020-07-09]\n`;
				expected += `test [0] [Last done: 2020-07-09]\n`;
				expected += `workout2 [1] [Last done: 2020-07-09]\n`;

				assert.strictEqual(stdout,expected);
			});
		});

		it('should successfully limit rows grabbed', async() => {
			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts --rows=1 ls');

				let expected = `Attributes:\tlower\tupper\t\n`;
				expected += `workout1 [2] [Last done: 2020-07-10]\n`;
				assert.strictEqual(stdout,expected);
			});
		});

		it('should successfully search for workouts', async() => {
			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts ls workout');

				let expected = `Attributes:\tlower\tupper\t\n`;
				expected += `workout1 [2] [Last done: 2020-07-10]\n`;
				expected += `workout2 [1] [Last done: 2020-07-09]\n`;

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
				expected += `workout2 [1] [Last done: 2020-07-09]\n`;

				assert.strictEqual(stdout,expected);
			});

			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts ls --filter 10');

				let expected = `Attributes:\tlower\tupper\t\n`;
				expected += `workout1 [2] [Last done: 2020-07-10]\n`;

				assert.strictEqual(stdout,expected);
			});

			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts ls --filter x1');

				let expected = `Attributes:\tlower\tupper\t\n`;
				expected += `apple [3] [Last done: 2020-07-09]\n`;
				expected += `workout2 [1] [Last done: 2020-07-09]\n`;

				assert.strictEqual(stdout,expected);
			});

			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts ls --filter 00');

				let expected = `Attributes:\tlower\tupper\t\n`;
				expected += `test [0] [Last done: 2020-07-09]\n`;

				assert.strictEqual(stdout,expected);
			});
		});

	});

});