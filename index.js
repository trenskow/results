import Puqeue from 'puqeue';

let results = async (promises, options = {}) => {

	if (!promises) return [[], []];

	if (!Array.isArray(promises)) promises = [promises];

	const queue = new Puqeue({ maxOperationCount: options.simultaneously || 0 });

	let resolved = [];
	let rejected = [];

	await Promise.all(promises.map(async (promise) => {
		await queue.add(async () => {
			try {
				resolved.push(await Promise.resolve(promise));
			} catch (err) {
				rejected.push(err);
			}
		});
	}));

	return [resolved, rejected];

};

const resolved = async (promises, options) => {
	return (await results(promises, options))[0];
};

const rejected = async (promises, options) => {
	return (await results(promises, options))[1];
};

results.resolved = resolved;
results.rejected = rejected;

export default results;

export { resolved, rejected };
