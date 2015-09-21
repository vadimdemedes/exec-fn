# exec-fn [![Circle CI](https://circleci.com/gh/vdemedes/exec-fn.svg?style=svg)](https://circleci.com/gh/vdemedes/exec-fn)

Execute function, promise, generator and get a consistent result.


### Installation

```
$ npm install exec-fn --save
```


### Usage

```js
const execute = require('exec-fn');

function regularFn () {
  return 'regular';
}

function promiseFn () {
  return Promise.resolve('promise');
}

function * generatorFn () {
  return 'generator';
}

exec(regularFn).then(function (value) {
  value === 'regular';
});

exec(promiseFn).then(function (value) {
  value === 'promise';
});

exec(generatorFn).then(function (value) {
  value === 'generator';
});
```


### API

```js
exec(fn, arguments, context)
```

- `fn` - function to execute. Can be a regular function, generator function or function that returns a `Promise`.
- `arguments` - array of arguments for the `fn` (optional)
- `context` - context for the `fn` (optional)


### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/exec-fn.svg?style=svg)](https://circleci.com/gh/vdemedes/exec-fn)

```
$ make test
```


### License

MIT © [vdemedes](https://github.com/vdemedes)
