const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);

describe('add integration tests', () => {

	beforeEach(async() => {
		await assert.doesNotReject(async() => await exec('./workouts --attr add lower'));
		await assert.doesNotReject(async() => await exec('./workouts --attr add upper'));

		await assert.doesNotReject(async() => await exec('./workouts --workout add workout1 01'));
		await assert.doesNotReject(async() => await exec('./workouts --workout add workout2 10'));
		await assert.doesNotReject(async() => await exec('./workouts --workout add test 00'));
		await assert.doesNotReject(async() => await exec('./workouts --workout add apple 11'));
	});

	afterEach(async() => {
		await unlink('workouts.db');
	});

	describe('adding a new attribute', () => {

		const attributes = [
			'lower_2',
			'upper_2',
			'core',
			'back',
			'cardio',
			'martial',
			'other'
		];

		it('should successfully add', async() => {
			for(const attr of attributes) {
				await assert.doesNotReject(async() => {
					const {stdout,stderr} = await exec(`./workouts --attr add ${attr}`);
					assert.strictEqual(stdout,`attribute ${attr} added\n`);
				});
			}
		});

		it('should successfully add with long option', async() => {
			for(const attr of attributes) {
				await assert.doesNotReject(async() => {
					const {stdout,stderr} = await exec(`./workouts --attribute add ${attr}`);
					assert.strictEqual(stdout,`attribute ${attr} added\n`);
				});
			}
		});

		it('should successfully add with short option', async() => {
			for(const attr of attributes) {
				await assert.doesNotReject(async() => {
					const {stdout,stderr} = await exec(`./workouts -a add ${attr}`);
					assert.strictEqual(stdout,`attribute ${attr} added\n`);
				});
			}
		});

		it('should fail to add an attribute with the same name', async() => {
			await assert.rejects(async() => await exec('./workouts --attr add lower'));
			await assert.doesNotReject(async() => await exec('./workouts --attr add Other'));
		});

		it('should fail when not given a name to add', async() => {
			await assert.rejects(async() => await exec('./workouts --attr add'));
		});

	});

	describe('adding a new recent', () => {
		
		it('should succeed when adding a new workout', async() => {
			await assert.doesNotReject(async() => await exec('./workouts --recent add test'));
		});

		it('should succeed when adding a new workout with short option', async() => {
			await assert.doesNotReject(async() => await exec('./workouts -l add test'));
		});

		it('should succeed when adding a new workout and reflect that upon ls', async() => {
			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts --recent add workout1 2020-07-10');

				assert.strictEqual(stdout,`added workout workout1 on 2020-07-10\n`);
			});

			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts --recent add apple 2020-06-10');

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
			await assert.doesNotReject(async() => await exec('./workouts --recent add workout1 2020-07-10'));
			await assert.doesNotReject(async() => await exec('./workouts --recent add workout1 2020-06-10'));

			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts --workout ls workout1');

				let expected = `Attributes:\tlower\tupper\t\n`;
				expected += `workout1 [2] [Last done: 2020-07-10]\n`;

				assert.strictEqual(stdout,expected);
			});
		});

		it('should reject when not given a valid workout', async() => {
			await assert.rejects(async() => await exec('./workouts --recent add hahahahahah 2020-07-10'));
		});

		it('should reject when not given a valid date', async() => {
			await assert.rejects(async() => await exec('./workouts --recent add hahahahahah 2020-07-10123123123123123'));
			await assert.rejects(async() => await exec('./workouts --recent add hahahahahah "kasdflasj lkssdasdf lkdaNOT_A_DATE"'));
		});

	});

	describe('adding a new workout', () => {
		it('should success creating a new workout', async() => {
			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts --workout add workout11');
				assert.strictEqual(stdout,`added workout workout11\n`);
			});
		});

		it('should success creating a new workout with short option', async() => {
			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec('./workouts -w add workout11');
				assert.strictEqual(stdout,`added workout workout11\n`);
			});
		});

		it('should fail to create a workout when given the wrong number of attributes', async() => {
			await assert.rejects(async() => await exec('./workouts --workout add workout12 0'));
			await assert.rejects(async() => await exec('./workouts --workout add workout13 110'));
		});
	});

});