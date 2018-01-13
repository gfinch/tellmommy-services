
var assert = require('assert');
var database = require('../lib/dynamodb');

var tableName = "tell-mommy-transactions";
var primaryKeyName = "family_child_chore_id";
var rangeKeyName = "timestamp";
var objectName = "some-test-object";
var primaryKey = "some-primary-key";
var rangeKey = 12345;
var object = {
    attr1 : "test"
}

describe('database', function() {
  describe('#put', function() {
    it('should add an object to dynamodb', function(done) {
      database.put(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, object, function(err, result) {
        if (err) {
            done(err);
        } else {
            done();
        }
      });
    });
  });
});

describe('database', function() {
  describe('#get', function() {
    it('should get an object from dynamodb', function(done) {
      database.get(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, function(err, result) {
        if (err) {
            done(err);
        } else {
            assert.equal(result.attr1, "test");
            done();
        }
      });
    });
  });
});

describe('database', function() {
  describe('#remove', function() {
    it('should remove an object from dynamodb', function(done) {
      database.remove(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, function(err, result) {
        if (err) {
            done(err);
        } else {
            assert.equal(result.attr1, "test");
            done();
        }
      });
    });
  });
});

