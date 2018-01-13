
var assert = require('assert');
var register = require('../lib/register');

describe('register', function() {
  describe('#doRegister', function() {
    it('register a family', function(done) {
      var registration = {
        action: "register",
        email: "test@mamabird.biz",
        password: "testPassword",
        familyName: "MamaBird"
      }
      register.doRegister(registration, function(err, result) {
        assert(false);
        done();
      });
    });
  });
});