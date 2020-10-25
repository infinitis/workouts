const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);

describe('attr integration tests', () => {

	const attributes = [
		'lower',
		'upper',
		'core',
		'back',
		'cardio',
		'martial',
		'other'
	];

	describe('attr add', () => {

		it('should successfully add', async() => {
			for(const attr of attributes) {
				await assert.doesNotReject(async() => {
					const {stdout,stderr} = await exec(`./workouts attr add ${attr}`);

					assert.strictEqual(stdout,`New attribute added: ${attr}\n`);
				});
			}
		});

		it('should fail to add an attribute with the same name', async() => {
			await assert.rejects(async() => await exec('./workouts attr add other'));
			await assert.doesNotReject(async() => await exec('./workouts attr add Other'));
		});

		it('should fail when not given a name to add', async() => {
			await assert.rejects(async() => await exec('./workouts attr add'));
		});

	});
	
	describe('attr ls', () => {

		it('should successfully list all attributes in order they were added', async() => {
			attributes.push('Other');

			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec(`./workouts attr`);

				let expected = "";
				for(const attr of attributes) {
					expected += `${attr}\n`;
				}

				assert.strictEqual(stdout,expected);
			});

			await assert.doesNotReject(async() => {
				const {stdout,stderr} = await exec(`./workouts attr ls`);
				let expected = "";
				for(const attr of attributes) {
					expected += `${attr}\n`;
				}

				assert.strictEqual(stdout,expected);
			});
		});

	});

	after(async() => {
		await unlink('workouts.db');
	});

});