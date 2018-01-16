
var assert = require('assert');
var register = require('../lib/register');

describe('register', function() {
  it('register', function(done) {
    var registration = {
      action: "register",
      email: "test@mamabird.biz",
      password: "testPassword"
    };
    
    register.doRegister(registration, function(err, result) {
      if (err) done(err);
      else {
        assert(result && result.familyId);  
        done();
      }
    });
  });
  
  it('do not register if email already exists', function(done) {
    var registration = {
      action: "register",
      email: "test@mamabird.biz",
      password: "testPassword"
    };
    
    register.doRegister(registration, function(err, result) {
      assert(err && err == "An account already exists for this email address.");
      done();
    });
  });
  
  it('login', function(done) {
    var login = {
      action: "login",
      email: "test@mamabird.biz",
      password: "testPassword"
    };
    
    register.doLogin(login, function(err, result) {
      assert(result && result.familyId);
      done();
    });
  });
  
  it('deregister', function(done) {
    var registration = {
      action: "deregister",
      email: "test@mamabird.biz",
      password: "testPassword"
    };
    
    register.doDeregister(registration, function(err, result) {
      assert(result);
      done();
    });
  });
  
  it('present an error if deregistering an email that does not exist.', function(done) {
    var registration = {
      action: "deregister",
      email: "non-existing@mamabird.biz",
      password: "testPassword"
    };
    
    register.doDeregister(registration, function(err, result) {
      assert(err && err == "Invalid email address or password.");
      done();
    });
  });
});