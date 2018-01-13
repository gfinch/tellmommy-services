'use strict';

var AWS = require("aws-sdk");
AWS.config.update({region:'us-east-1'});
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

module.exports = {
    put: function(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, object, callback) {
        var item = {};

        if (rangeKeyName && rangeKey) {
            item[primaryKeyName] = primaryKey;
            item[rangeKeyName] = rangeKey;
            item[objectName] = object;
        } else {
            item[primaryKeyName] = primaryKey;
            item[objectName] = object;
        }

        var params = {
           TableName : tableName,
           Item: item
        };

        dynamodbDoc.put(params, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, object);
            }
        });
    },

    remove: function(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, callback) {
        var key = {};

        if (rangeKeyName && rangeKey) {
            key[primaryKeyName] = primaryKey;
            key[rangeKeyName] = rangeKey;
        } else {
            key[primaryKeyName] = primaryKey;
        }

        var params = {
            TableName : tableName,
            Key : key,
            ReturnValues : "ALL_OLD"
        };

        dynamodbDoc.delete(params, function(err, result) {
            if (err) {
                callback(err);
            } else {
                var object = result.Attributes[objectName];
                callback(null, object);
            }
        });
    },

    get: function(tableName, primaryKeyName, primaryKey, rangeKeyName, rangeKey, objectName, callback) {
        var key = {};

        if (rangeKeyName && rangeKey) {
            key[primaryKeyName] = primaryKey;
            key[rangeKeyName] = rangeKey;
        } else {
            key[primaryKeyName] = primaryKey;
        }

        var params = {
            TableName : tableName,
            Key : key
        };

        dynamodbDoc.get(params, function(err, result) {
            if (err) {
                console.log("Got an error: " + err);
                callback(err);
            } else {
                var object = result.Item[objectName];
                callback(null, object);
            }
        });
    }
};