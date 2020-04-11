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
		const {stdout,stderr} = await exec('./workouts --help');
		let usage = `Usage:\n`;
		usage += `\tworkouts [options] [ls] [--filter {attribute filter}] [search term]\n`;
		usage += `\tworkouts [options] add [!name] [date]\n`;
		usage += `\tworkouts [options] new [!name] [attributes]\n`;
		usage += `\tworkouts [options] attr [ls]\n`;
		usage += `\tworkouts [options] attr add [!name]\n`;
		usage += `\tworkouts [options] toggle [!workout name] [!attr]\n`;
		usage += `\tworkouts [options] recent\n`;
		usage += `\n`;
		usage += `Options:\n`;
		usage += `\t--help,-h\n`;
		usage += `\t--homedir=<path>\n`;
		usage += `\t--rows=<number>\n`;
		usage += `\t--verbose,-v\n`;
		usage += `\n`;
		usage += `{attribute filter} refers to string in bit flags corresponding to active attributes.\n\n`;
		usage += `The character '!' in front of a variable name means required.\n`;
		assert.strictEqual(stdout,usage);
	});

	it(`should throw when given option --homedir which doesn't exist`, async() => {
		await assert.rejects(async() => await exec('./workouts --homedir=`pwd`/doesnt_exist'));
	});

	after(async() => {
		await unlink('workouts.db');
	});

});


