'use strict';

const
	Puqeue = require('puqeue');

exports = module.exports = async (promises, options = {}) => {

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

exports.resolved = async (promises, options) => {
	return (await exports(promises, options))[0];
};

exports.rejected = async (promises, options) => {
	return (await exports(promises, options))[1];
};
