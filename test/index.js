import { use as chaiUse, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import results from '../index.js';

chaiUse(chaiAsPromised);

describe('results', function() {
	it ('should come back with resolved and rejected results separated.', () => {
		return expect(results([
			Promise.resolve('result0'),
			Promise.reject(new Error('error0')),
			Promise.resolve('result1'),
			Promise.reject(new Error('error1')),
			Promise.resolve('result2')
		])).to.eventually.satisfy((data) => {
			return data.length == 2
				&& data[0].length == 3
				&& !data[0].some((data, idx) => data !== `result${idx}`)
				&& !data[1].some((error, idx) => error.message !== `error${idx}`);
		});
	});
	it ('should come back with only resolved results.', () => {
		return expect(results.resolved([
			Promise.resolve('result0'),
			Promise.reject(new Error('error0')),
			Promise.resolve('result1'),
			Promise.reject(new Error('error1')),
			Promise.resolve('result2')
		])).to.eventually.satisfy((data) => {
			return data.length == 3
				&& !data.some((data, idx) => data !== `result${idx}`);
		});
	});
	it ('should come back with only rejected results.', () => {
		return expect(results.rejected([
			Promise.resolve('result0'),
			Promise.reject(new Error('error0')),
			Promise.resolve('result1'),
			Promise.reject(new Error('error1')),
			Promise.resolve('result2')
		])).to.eventually.satisfy((data) => {
			return data.length == 2
				&& !data.some((error, idx) => error.message !== `error${idx}`);
		});
	});
});
