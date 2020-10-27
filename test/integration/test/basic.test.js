const assert = require('assert');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const access = util.promisify(require('fs').access);
const unlink = util.promisify(require('fs').unlink);

describe('basic tests', () => {
	
	it('should create workouts.db when run with no arguments', async() => {
		const {stdout,stderr} = await exec('./workouts');
		assert.strictEqual(stdout,'');
		await assert.doesNotReject(async() => await access('workouts.db'));
	});

	it('should print usage options when run with --help option', async() => {
		let usage = `Usage:\n`;
		usage += `\tworkouts [options] add [!name] [date] [attributes]\n`;
		usage += `\tworkouts [options] ls [--filter {attribute filter}] [search term]\n`;
		usage += `\tworkouts [options] rm [!name] [date]\n`;
		usage += `\tworkouts [options] toggle [!workout name] [!attr]\n`;
		usage += `\n`;
		usage += `Options:\n`;
		usage += `\t--attribute, --attr, -a\n`;
		usage += `\t--help, -h\n`;
		usage += `\t--homedir, -d <path>\n`;
		usage += `\t--quiet, -q\n`;
		usage += `\t--recent, -l\n`;
		usage += `\t--rows, -r <number>\n`;
		usage += `\t--verbose, -v\n`;
		usage += `\t--workout, -w\n`;
		usage += `\n`;
		usage += `{attribute filter} refers to a string of bit flags (0 = not, 1 = has, x = either) corresponding to active attributes.\n`;
		usage += `Ex: 0100x00\n\n`
		usage += `The character '!' in front of a variable name means required.\n`;

		await assert.rejects(async() => await exec('./workouts --help'),(err) => {
			assert.strictEqual(err.code,1);
			assert.strictEqual(err.message,`Command failed: ./workouts --help\n`+usage);
			return true;
		});

		await assert.rejects(async() => await exec('./workouts -h'),(err) => {
			assert.strictEqual(err.code,1);
			assert.strictEqual(err.message,`Command failed: ./workouts -h\n`+usage);
			return true;
		});
	});

	it(`should throw when given option --homedir which doesn't exist`, async() => {
		await assert.rejects(async() => await exec('./workouts --homedir=`pwd`/doesnt_exist'));
		await assert.rejects(async() => await exec('./workouts -d `pwd`/doesnt_exist'));
	});

	after(async() => {
		await unlink('workouts.db');
	});

});


