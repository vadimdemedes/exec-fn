'use strict';

/**
 * Dependencies
 */

const exec = require('./');
const test = require('ava');


/**
 * Tests
 */

test ('function', function (t) {
  t.plan(2);

  function fn () {
    t.pass();

    return true;
  }

  exec(fn).then(function (value) {
    t.true(value);
  });
});

test ('function with arguments', function (t) {
  t.plan(3);

  function fn (a, b) {
    t.true(a);
    t.false(b);

    return true;
  }

  exec(fn, [true, false]).then(function (value) {
    t.true(value);
  });
});

test ('function with context', function (t) {
  t.plan(6);

  let context = {
    a: true,
    b: false
  };

  function fn () {
    t.true(this.a);
    t.false(this.b);
  }

  exec(fn, context).then(function () {
    t.pass();
  });

  exec.call(context, fn).then(function () {
    t.pass();
  });
});

test ('function with thrown error', function (t) {
  t.plan(1);

  function fn () {
    throw new Error('Fatal');
  }

  exec(fn).catch(function (err) {
    t.is(err.message, 'Fatal');
  });
});

test ('promise', function (t) {
  t.plan(1);

  function fn () {
    return Promise.resolve(true);
  }

  exec(fn).then(function (value) {
    t.true(value);
  });
});

test ('promise with arguments', function (t) {
  t.plan(3);

  function fn (a, b) {
    t.true(a);
    t.false(b);

    return Promise.resolve(true);
  }

  exec(fn, [true, false]).then(function (value) {
    t.true(value);
  });
});

test ('promise with context', function (t) {
  t.plan(6);

  let context = {
    a: true,
    b: false
  };

  function fn () {
    t.true(this.a);
    t.false(this.b);

    return Promise.resolve();
  }

  exec(fn, context).then(function () {
    t.pass();
  });

  exec.call(context, fn).then(function () {
    t.pass();
  });
});

test ('generator function', function (t) {
  t.plan(2);

  function * fn () {
    t.pass();

    return true;
  }

  exec(fn).then(function (value) {
    t.true(value);
  });
});

test ('generator function with arguments', function (t) {
  t.plan(3);

  function * fn (a, b) {
    t.true(a);
    t.false(b);

    return true;
  }

  exec(fn, [true, false]).then(function (value) {
    t.true(value);
  });
});

test ('generator function with context', function (t) {
  t.plan(6);

  let context = {
    a: true,
    b: false
  };

  function * fn () {
    t.true(this.a);
    t.false(this.b);
  }

  exec(fn, context).then(function (value) {
    t.pass();
  });

  exec.call(context, fn).then(function (value) {
    t.pass();
  });
});
