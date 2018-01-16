'use strict';

var register = require('./lib/register');
var family = require('./lib/family');
var chores = require('./lib/chores');

module.exports = {
    register:  function(request, callback) {
        register.doRegister(request, callback);
    },
    
    login:  function(request, callback) {
        register.doLogin(request, callback);
    },
    
    addFamily: function(request, callback) {
        family.put(request, callback);  
    },
    
    getFamily: function(request, callback) {
        family.get(request, callback);
    },
    
    updateFamily: function(request, callback) {
        family.update(request, callback);
    },
    
    removeFamily: function(request, callback) {
        family.remove(request, callback);
    },
    
    addChild: function(request, callback) {
        family.addChild(request, callback);
    },
    
    editChild: function(request, callback) {
        family.editChild(request, callback);
    },
    
    removeChild: function(request, callback) {
        family.removeChild(request, callback);
    },
    
    setRewardSystem: function(request, callback) {
        family.setRewardSystem(request, callback);
    },
    
    setWordsOfAffirmation: function(request, callback) {
        family.setWordsOfAffirmation(request, callback);
    }
};