
var assert = require('assert');
var database = require('../lib/dynamodb');

var tableName = "tell-mommy-transactions";
var primaryKeyName = "family_child_chore_id";
var rangeKeyName = "completed_timestamp";
var objectName = "some-test-object";
var primaryKey = "some-primary-key";
var rangeKey = 12345;
var object = {
    attr1 : "test"
}

describe('dynamodb', function() {
  it('should add an object to dynamodb', function(done) {
    database.put(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, object, function(err, result) {
      if (err) {
          done(err);
      } else {
          done();
      }
    });
  });
  
  it('should not put if item already exists', function(done) {
    database.put(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, object, function(err, result) {
      if (err) {
          done();
      } else {
          done("Not expected to put if item already exists.");
      }
    });
  });
  
  it('should successfully update if item exists.', function(done) {
    database.update(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, object, function(err, result) {
      if (err) {
          done(err);
      } else {
          done();
      }
    });
  });
  
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
  
  it('should return not found when item does not exist', function(done) {
    database.get(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, function(err, result) {
      if (err) {
          assert.equal(err, "Not Found");
          done();
      } else {
          done("Expected error, but got result.");
      }
    });
  });
});