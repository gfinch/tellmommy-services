
var assert = require('assert');
var familyService = require('../lib/family');

describe('family', function() {
  it('put family', function(done) {
    var family = {
      action: "createFamily",
      familyId: "abcd-1234-effe-5678-dcba",
      familyName: "Mamabird family"
    };
    
    familyService.put(family, function(err, result) {
      if (err) done(err);
      else {
        assert(result && result.familyId);
        done();
      }
    });
  });
  
  it('add child', function(done) {
    var request = {
      "action" : "addChild",
      "familyId" : "abcd-1234-effe-5678-dcba",
      "name" : "Peter"
    };
    
    familyService.addChild(request, function(err, result) {
        if (err) done(err);
        else {
            assert(result && result.children.length > 0 && result.children[0].childId);
            done();
        }
    });
  });
  
  it('do not add child if already exists', function(done) {
    var request = {
      "action" : "addChild",
      "familyId" : "abcd-1234-effe-5678-dcba",
      "name" : "Peter"
    };
    
    familyService.addChild(request, function(err, result) {
        if (err) {
          done();
        } else {
          done("should not have added child.");
        }
    });
  });
  
  it('do not add child if case is different', function(done) {
    var request = {
      "action" : "addChild",
      "familyId" : "abcd-1234-effe-5678-dcba",
      "name" : "PETER"
    };
    
    familyService.addChild(request, function(err, result) {
        if (err) {
          done();
        } else {
          done("should not have added child.");
        }
    });
  });
  
  it('edit child', function(done) {
    var familyRequest = {
      "familyId" : "abcd-1234-effe-5678-dcba"
    };
    
    familyService.get(familyRequest, function(err, family) {
      if (family) {
        var child = family.children[0];
        child.nicknames = ["Pete", "Peter the Magnificent"];
        var updateRequest = {
          "action" : "editChild",
          "familyId" : "abcd-1234-effe-5678-dcba",
          "child" : child
        };
        familyService.editChild(updateRequest, function(err, updatedFamily) {
          if (err) done(err);
          else {
            assert(updatedFamily && 
              updatedFamily.children && 
              updatedFamily.children.length == 1 && 
              updatedFamily.children[0].nicknames.length == 2);
            done();
          }
        });  
      } else {
        done(err);  
      }
    });
  });
  
  it('remove child', function(done) {
    var familyRequest = {
      "familyId" : "abcd-1234-effe-5678-dcba"
    };
    
    familyService.get(familyRequest, function(err, family) {
      if (family) {
        var child = family.children[0];
        var removeRequest = {
          "action" : "removeChild",
          "familyId" : "abcd-1234-effe-5678-dcba",
          "child" : child
        };
        familyService.removeChild(removeRequest, function(err, updatedFamily) {
          if (err) done(err);
          else {
            assert(updatedFamily && 
              updatedFamily.children && 
              updatedFamily.children.length == 0);
            done();
          }
        });  
      } else {
        done(err);  
      }
    });
  });
  
  it('set reward system', function(done) {
    var request = {
      familyId: "abcd-1234-effe-5678-dcba",
      rewardSystem: "dollars"
    };
    
    familyService.setRewardSystem(request, function(err, updatedFamily) {
      if (err) done(err);
      else {
        assert(updatedFamily && updatedFamily.rewardSystem === "dollars");
        done();
      }
    });
  });
  
  it('set words of affirmation', function(done) {
    var request = {
      familyId: "abcd-1234-effe-5678-dcba",
      wordsOfAffirmation: ["way to go", "you rock", "well done"]
    };
    
    familyService.setWordsOfAffirmation(request, function(err, updatedFamily) {
      if (err) done(err);
      else {
        assert(updatedFamily && updatedFamily.wordsOfAffirmation.length == 3);
        done();
      }
    });
  });
  
  it('remove family', function(done) {
    var family = {
      familyId: "abcd-1234-effe-5678-dcba"
    };
    
    familyService.remove(family, function(err, result) {
      if (err) done(err);
      else {
        assert(result && result.familyId);
        done();
      }
    });
  });
  
});