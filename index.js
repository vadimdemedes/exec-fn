'use strict';

/**
 * Dependencies
 */

var isGenerator = require('is-generator').fn;
var isPromise = require('is-promise');
var Promise = require('pinkie-promise');
var co = require('co');


/**
 * Expose `exec-fn`
 */

module.exports = execFn;


/**
 * Execute function, promise, generator and get a consistent result
 */

function execFn (fn, args, context) {
  if (!Array.isArray(args)) {
    context = args;
    args = [];
  }

  try {
    if (isGenerator(fn)) {
      fn = co.wrap(fn);
    }

    var result = fn.apply(context || this, args);

    if (!isPromise(result)) {
      return Promise.resolve(result);
    }

    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
