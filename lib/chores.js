'use strict';

var dynamodb = require('./dynamodb');

var tableName = "tell-mommy-domain";
var primaryKeyName = "domain_id";
var domainColumnName = "chores";

module.exports = {
    assignChores: function(request, callback) {
        var familyChildId = buildFamilyChildId(request);
        
        var assignments = {
            familyId: request.familyId,
            childId: request.childId,
            chores: request.chores
        };
        
        dynamodb.put(tableName, primaryKeyName, familyChildId, null, null, domainColumnName, assignments, callback);
    },
    
    getChores: function(request, callback) {
        var familyChildId = buildFamilyChildId(request);
        dynamodb.get(tableName, primaryKeyName, familyChildId, null, null, domainColumnName, callback);
    },
    
    removeAllChores: function(request, callback) {
        var familyChildId = buildFamilyChildId(request);
        dynamodb.remove(tableName, primaryKeyName, familyChildId, null, null, domainColumnName, callback);
    }
};

function buildFamilyChildId(request) {
    var familyId = request.familyId;
    var childId = request.childId;
    return familyId + "_" + childId;
}