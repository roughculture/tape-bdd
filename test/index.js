'use strict';

var test = require('../');
var tape = require('tape');

test('test-bdd', function(it, describe) {
  it('should handle \'it\' statements', function(assert) {
    assert.pass();
  });

  it('apparently already handles them', function(assert) {
    assert.not(1, 2);
  });

  describe('nested suites', function(it) {
    it('can handle these nested suites', function(assert) {
      assert.ok('see!');
    });
  });

  it.skip('should skip tests', function(assert) {
    assert.fail();
  });

  describe('test#notOk', function(it) {
    it('should work', function(assert) {
      assert.notOk(false);
    });

    it('should be like .error, right?', function(assert) {
      assert.error(false);
    });
  });

  it('can skip from assert too!', function(assert) {
    assert.skip();
  });

  describe('inequality', function(it, describe) {
    it('should compare things invertedly', function(assert) {
      // cause' that's totally a word
      assert.notEqual('ten', 'twenty');
    });

    it('should nestedly not compare things?!', function(assert) {
      // you see what happens when you take
      // melatonin when there is coding to do?

      assert.notDeepEqual({foo: '2'}, {foo: 2});

      // bad things happen.
    });

    describe('deeper equality', function(it) {
      it('should go deeeper', function(assert) {
        assert.deepEqual({foo: 10}, {foo: 10});
        // "you're so uptight!"
      });

      it('should loosen up a bit', function(assert) {
        assert.deepLooseEqual({foo: '10'}, {foo: 10});
      });

      it('can be loose but negated?', function(assert) {
        assert.notDeepLooseEqual({foo: '10'}, {foo: 'ten'});
      });

      it.skip('should not forget to be redundant', function(assert) {
        assert.fail('hahaha');
      });
    });
  });
});

test('meta', function(it) {
  it('shouldn\'t throw when encountering an error', function(assert) {
    assert.doesNotThrow(function() {
      test('unknown', function(it) {
        it('should fail', function() {
          throw new Error('haha');
        });
      }, function() {
        var htest = tape.createHarness();
        htest.createStream().on('data', function() {});

        htest.apply(null, arguments);
      });
    });
  });

  it('should throw when I tell it to', function(assert) {
    assert.throws(function() {
      throw new Error('hi');
    }, /hi/);
  });
});

test.skip('skipped', function() {});
