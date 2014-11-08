tape-bdd [![Build Status](http://img.shields.io/travis/roughculture/tape-bdd.svg?style=flat)](https://travis-ci.org/roughculture/tape-bdd) [![NPM Version](http://img.shields.io/npm/v/tape-bdd.svg?style=flat)](https://npmjs.org/package/tape-bdd) [![License](http://img.shields.io/npm/l/tape-bdd.svg?style=flat)](https://github.com/roughculture/tape-bdd/blob/master/LICENSE) [![Coverage Status](https://img.shields.io/coveralls/roughculture/tape-bdd.svg?style=flat)](https://coveralls.io/r/roughculture/tape-bdd?branch=master)
========

Tape-BDD essentially wraps tape and provides a more Mocha-style interface for
BDD and automatically handling things like TAP planning and assertion names. It
assumes one assertion per test.

Usage
-----

```js
var describe = require('tape-bdd');

describe('plus', function(it) {
  // assert has the same API as tape's test object

  // 'it' is a function that will handle thrown
  // errors gracefully and set the number of tests
  // for the suite for assert.plan().

  it('should add one and two', function(assert) {
    assert.equal(1 + 3, 3);
  });

  it('should add strings', function(assert) {
    assert.equal('foo' + 'bar', 'foobar');
  });
});
```

Is equivalent to:

```js
var test = require('tape');

test('plus', function(t) {
  t.plan(2);

  t.equal(1 + 2, 3, 'should add one and two');

  t.equal('foo' + 'bar', 'foobar', 'should add strings');
});
```
