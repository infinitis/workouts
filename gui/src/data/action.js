export default async function action(params) {
	const {cmd,data,backendDataLoader} = params;

	if(cmd===void(0)) { throw new Error(`missing parameter cmd`); }
	if(data===void(0)) { throw new Error(`missing parameter data`); }
	if(backendDataLoader===void(0)) { throw new Error(`missing parameter backendDataLoader`); }
	
	try {
		await cmd(); // must throw if cmd fails
		const backendData = await backendDataLoader();

		for(let i in data) {
			if(!data[i].equals(backendData[i])) {
				return false;
			}
		}

		return true;
	} catch(err) {
		console.error(err);
		return false;
	}
}