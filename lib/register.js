'use strict';

var dynamodb = require('./dynamodb');
var util = require('./util');
var md5 = require('md5');

var accountTableName = "tell-mommy-accounts";
var accountPrimaryKey = "email";
var accountDetailsColumn = "accountDetails";

module.exports = {
    doRegister: function(registration, callback) {
        register(registration, callback);
    },
    
    doDeregister: function(registration, callback) {
        deregister(registration, callback);
    },
    
    doLogin: function(login, callback) {
        authenticate(login.email, login.password, callback);
    }
};

function getAccountForEmail(email, callback) {
    dynamodb.get(accountTableName, accountPrimaryKey, email, null, null, accountDetailsColumn, callback);
}

function authenticate(email, password, callback) {
    var hashedEmail = md5(email);
    getAccountForEmail(hashedEmail, function(err, account) {
        if (account && account.password) {
            var hashedPassword = md5(password);
            if (hashedPassword == account.password) {
                callback(null, {
                    familyId: account.familyId
                });
            } else {
                callback("Invalid email address or password.");
            }
        } else if (err == "Not Found") {
            callback("Invalid email address or password.");
        } else {
            callback("An unexpected error occurred.  Please try again.");
        }
    });
}

function register(registration, callback) {
    var hashedEmail = md5(registration.email);
    getAccountForEmail(hashedEmail, function(err, account) {
        if (account) callback("An account already exists for this email address.");
        else if (err == "Not Found") {
            var familyId = getFamilyId(registration);
            var email = hashedEmail;
            var password = md5(registration.password);
            
            var account = {
                email : email,
                familyId: familyId,
                password: password
            };
            
            dynamodb.put(accountTableName, accountPrimaryKey, email, null, null, accountDetailsColumn, account, function (err, result) {
                if (!err) {
                    callback(null, {
                        familyId : familyId
                    });
                } else callback(err);
            });
        } else {
            console.log("Unexpected error: " + err);
            callback("An unexpected error occurred.  Please try again.");
        }
    });
}

function deregister(registration, callback) {
    authenticate(registration.email, registration.password, function(err, result) {
        if (result) {
            var hashedEmail = md5(registration.email);
            dynamodb.remove(accountTableName, accountPrimaryKey, hashedEmail, null, null, accountDetailsColumn, function(err, result) {
                if (!err) { 
                    callback(null, {
                        familyId: result.familyId
                    }); 
                } else callback(err);
            });
        } else callback(err);
    });
}

function getFamilyId(registration) {
    if (registration.familyId) return registration.familyId;
    else return util.generateUUID();
}