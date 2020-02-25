@trenskow/results
----

Executes an array of promises and returns their resolved or rejected results.

# Installation

````bash
npm install --save @trenskow/results
````

## Usage

````javascript
const results = require('results');
````

### Getting all Results

````javascript
const [resolved, rejected] = results([
	Promise.resolve('a'),
	Promise.reject(new Error('a')),
	Promise.resolve('b'),
	Promise.reject(new Error('b'))
]);
/* -> [['a','b'],[Error('a'), Error('b')]] */
````

### Getting Only Resolved Results

````javascript
const resolved = results.resolved([
	Promise.resolve('a'),
	Promise.reject(new Error('a')),
	Promise.resolve('b'),
	Promise.reject(new Error('b'))
]);
/* -> ['a','b'] */
````

### Getting Only Rejected Results

````javascript
const rejected = results.resolved([
	Promise.resolve('a'),
	Promise.reject(new Error('a')),
	Promise.resolve('b'),
	Promise.reject(new Error('b'))
]);
/* -> [Error('a'),Error('b')] */
````

## Order

The promises are executed in serial and therefore out-of-order, meaning there is no guarantee in which order the result comes out.

## Executing in Parallel

You can specify how many promises can be executed at once by using an option.

````javascript
const [resolved, rejected] = results(/* promises */, { simultaneously: 1 });
````

The above example will make the promises execute one at the time. You can specify any arbitrary number, default is `0` (which means unlimited).

> This works for all three variants (resolved/rejected, resolved and rejected).

# LICENSE

MIT (see license).