'use strict';

var tape = require('tape');

exports = module.exports = function exports(name, harness, fake) {
  (fake || tape)(name, function(testObj) {
    var tests = [];

    function describe(child, harness) {
      tests.push(function() {
        exports(name + ' ' + child, harness, function() {
          testObj.test.apply(testObj, arguments);
        });
      });
    }

    function it(desc, test) {
      tests.push(function() {
        var assert = makeAsserter(testObj, name + ' ' + desc);

        try {
          test(assert);
        } catch (e) {
          testObj.error(e);
        }
      });
    }

    describe.skip =
    it.skip = function(desc) {
      tests.push(function() {
        testObj.skip(name + ' ' + desc);
      });
    };

    harness(it, describe);

    testObj.plan(tests.length);

    for (var i = 0; i < tests.length; i++) {
      tests[i]();
    }
  });
};

exports.skip = function(name, harness) {
  exports(name, harness, function() {
    tape.skip.apply(tape, arguments);
  });
};

/* istanbul ignore next */
exports.only = function(name, harness) {
  exports(name, harness, function() {
    tape.only.apply(tape, arguments);
  });
};

function makeAsserter(t, msg) {
  var assert = {};

  assert.skip = function() {
    t.skip(msg);
  };

  assert.fail = function() {
    t.fail(msg);
  };

  assert.pass = function() {
    t.pass(msg);
  };

  assert.skip = function() {
    t.skip(msg);
  };

  assert.ok =
  assert['true'] =
  assert.assert = function(value) {
    t.ok(value, msg);
  };

  assert.notOk =
  assert['false'] =
  assert.notok = function(value) {
    t.notOk(value, msg);
  };

  assert.error =
  assert.ifError =
  assert.ifErr =
  assert.iferror = function(err) {
    t.error(err, msg);
  };

  assert.equals =
  assert.isEqual =
  assert.is =
  assert.strictEqual =
  assert.strictEquals =
  assert.equal = function(actual, expected) {
    t.equal(actual, expected, msg);
  };

  assert.notEquals =
  assert.notStrictEqual =
  assert.notStrictEquals =
  assert.isNotEqual =
  assert.isNot =
  assert.not =
  assert.doesNotEqual =
  assert.isInequal =
  assert.notEqual = function(actual, expected) {
    t.notEqual(actual, expected, msg);
  };

  assert.deepEqual =
  assert.isEquivalent =
  assert.same =
  assert.deepEqual = function(actual, expected) {
    t.deepEqual(actual, expected, msg);
  };

  assert.notEquivalent =
  assert.notDeeply =
  assert.notSame =
  assert.isNotDeepEqual =
  assert.isNotDeeply =
  assert.isNotEquivalent =
  assert.isInequivalent =
  assert.notDeepEqual = function(actual, expected) {
    t.notDeepEqual(actual, expected, msg);
  };

  assert.looseEqual =
  assert.looseEquals =
  assert.deepLooseEqual = function(actual, expected) {
    t.deepLooseEqual(actual, expected, msg);
  };

  assert.notLooseEqual =
  assert.notLooseEquals =
  assert.notDeepLooseEqual = function() {
    t.fail('see https://github.com/substack/tape/pull/116');
  };

  assert.throws = function(actual, expected) {
    t.throws(actual, expected, msg);
  };

  assert.doesNotThrow = function(actual, expected) {
    t.doesNotThrow(actual, expected, msg);
  };

  return assert;
}
