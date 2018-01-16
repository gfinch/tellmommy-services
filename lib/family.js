'use strict';

var dynamodb = require('./dynamodb');
var util = require('./util');
var _ = require('lodash');

var tableName = "tell-mommy-domain";
var primaryKeyName = "domain_id";
var domainColumnName = "family";

module.exports = {
    put: function(request, callback) {
        var family = {
            familyId: request.familyId,
            familyName: request.familyName
        };
        dynamodb.put(tableName, primaryKeyName, family.familyId, null, null, domainColumnName, family, callback);
    },
    
    get: function(family, callback) {
        getFamily(family, callback);
    },
    
    update: function(family, callback) {
        updateFamily(family, callback);
    },
    
    remove: function(family, callback) {
        dynamodb.remove(tableName, primaryKeyName, family.familyId, null, null, domainColumnName, callback);
    },
    
    addChild: function(request, callback) {
        getFamily(request, function(err, family) {
            if (family) {
                if (!childExistsByName(family, request.name)) {
                    var child = {
                        name: request.name,
                        childId: util.generateUUID()
                    };
                    
                    var updatedFamily = appendChild(family, child);
                    updateFamily(updatedFamily, callback);
                } else {
                    callback(request.name + " is already part of the family.");
                }    
            } else if (err) {
                callback("An unexpected error occurred, please try again.");
            }
        });
    },
    
    editChild: function(request, callback) {
        getFamily(request, function(err, family) {
            if (family) {
                var updatedFamily = replaceChild(family, request.child);
                updateFamily(updatedFamily, callback);
            } else if (err) {
                callback("An unexpected error occurred, please try again.");
            }
        });
    },
    
    removeChild: function(request, callback) {
        getFamily(request, function(err, family) {
            if (family) {
                var updatedFamily = removeChild(family, request.child);
                updateFamily(updatedFamily, callback);
            } else if (err) {
                callback("An unexpected error occurred, please try again.");
            }
        });
    },
    
    setRewardSystem: function(request, callback) {
        getFamily(request, function(err, family) {
            if (family) {
                var updatedFamily = setRewardSystem(family, request.rewardSystem);
                updateFamily(updatedFamily, callback);
            } else if (err) {
                callback("An unexpected error occurred, please try again.");
            }
        });
    },
    
    setWordsOfAffirmation: function(request, callback) {
        getFamily(request, function(err, family) {
            if (family) {
                var updatedFamily = setWordsOfAffirmation(family, request.wordsOfAffirmation);
                updateFamily(updatedFamily, callback);
            } else if (err) {
                callback("An unexpected error occurred, please try again.");
            }
        })
    }
};

function getFamily(family, callback) {
    dynamodb.get(tableName, primaryKeyName, family.familyId, null, null, domainColumnName, callback);
}

function updateFamily(family, callback) {
    dynamodb.update(tableName, primaryKeyName, family.familyId, null, null, domainColumnName, family, callback);
}

function childExistsByName(family, childName) {
    return _.find(family.children, function(o) {
        var upperCaseListName = o.name.toUpperCase();
        var upperCaseChildName = childName.toUpperCase();
        return upperCaseListName == upperCaseChildName;
    });
}

function replaceChild(family, child) {
    var index = _.findIndex(family.children, function(o) {
        return o.childId == child.childId;
    });
    
    if (index < 0) return family;
    else {
        family.children.splice(index, 1, child);
        return family;
    }
}

function removeChild(family, child) {
    var index = _.findIndex(family.children, function(o) {
        return o.childId == child.childId;
    });
    
    if (index < 0) return family;
    else {
        family.children.splice(index, 1);
        return family;
    }
}

function appendChild(family, child) {
    if (!family.children) family.children = [];
    family.children.push(child);
    return family;
}

function setRewardSystem(family, rewardSystem) {
    family.rewardSystem = rewardSystem;
    return family;
}

function setWordsOfAffirmation(family, wordsOfAffirmation) {
    family.wordsOfAffirmation= wordsOfAffirmation;
    return family;
}