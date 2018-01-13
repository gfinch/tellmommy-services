'use strict';

var dynamodb = require('./dynamodb');
var util = require('./util');
var md5 = require('md5');

var accountTableName = "tell-mommy-accounts";
var accountPrimaryKey = "email";
var accountDetailsColumn = "accountDetails";

var domainTableName = "tell-mommy-domain";
var domainPrimaryKey = "";
var domainDetailsColumn = "family";

module.exports = {
    doRegister: function(registration, callback) {
        register(registration, callback);
    }
};

function getAccountForEmail(email, callback) {
    dynamodb.get(accountTableName, accountPrimaryKey, email, null, null, accountDetailsColumn, callback);
}

function register(registration, callback) {
    getAccountForEmail(registration.email, function(err, account) {
        if (account) callback("An account already exists for this email address.");
        if (err == "Not Found") {
            var familyId = getFamilyId(registration);
            var familyName = registration.familyName;
            var email = registration.email;
            var password = md5(registration.password);
            
            var account = {
                email : email,
                familyId: familyId,
                password: password
            }
            
            dynamodb.put(accountTableName, accountPrimaryKey, email, null, null, accountDetailsColumn, account, function (err, result) {
                if (!err) {
                    var family = {
                        familyId : familyId,
                        familyName : familyName
                    }
                    dynamodb.put(domainTableName, domainPrimaryKey, familyId, null, null, domainDetailsColumn, family, callback);
                } else callback(err)
            });
        } else {
            console.log(err);
            callback("An unexpected error occurred.  Please try again.");
        }
    })
}

function getFamilyId(registration) {
    if (registration.familyId) return registration.familyId;
    else return util.generateUUID();
}