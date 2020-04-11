export default async function request(cmd) {
	const req = await fetch("/", {
		method: 'POST',
		body:cmd
	});

	if(!req.ok) { throw new Error('request failed'); }

	return await req.text();
}