import request from '../util/request.js';

export default async function attributes() {
	const raw = await request('attr\nls\n');
	return raw.split('\n').filter((i) => i!=="");
}