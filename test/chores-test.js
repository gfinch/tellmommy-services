
var assert = require('assert');
var choreService = require('../lib/chores');

describe('chores', function() {
  it('assign chores', function(done) {
      var request = {
          familyId: "some-familyId",
          childId: "some-childId",
          chores: [{
              name : "some-chore",
              value : 1.0
          }, {
              name : "some-chore",
              value : 2.0
          }]
      };
      
      choreService.assignChores(request, function(err, result) {
          assert(result && !err);
          done();
      });
  });
  
  it('get chores', function(done) {
      var request = {
          familyId: "some-familyId",
          childId: "some-childId"
      };
      
      choreService.getChores(request, function(err, result) {
          assert(result && !err);
          done();
      });
  });
  
  it('remove all chore assignments', function(done) {
      var request = {
          familyId: "some-familyId",
          childId: "some-childId"
      };
      
      choreService.removeAllChores(request, function(err, result) {
          assert(result && !err);
          done();
      });
  });
});