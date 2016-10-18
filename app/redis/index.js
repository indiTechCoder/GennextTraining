'use strict';
var configuration = require('../configuration');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var elasticSearch = require('elasticsearch');
var redis = require('redis');
var platformShconfig = require("platformsh").config();


var elasticClient, redisClient;
if (platformShconfig) {
    var cache = platformShconfig.relationships.cache[0];
    redisClient = redis.createClient({
        host: cache['host'],
        port: cache['port']
    });

} else {

    redisClient = redis.createClient({
        host: configuration.redis.host,
        port: configuration.redis.port
    });
    redisClient.on("error", function(err) {
        console.log("Error " + err);
    });
}

require('../schema');

const RedisPub = redisClient.duplicate();
const RedisSub = redisClient.duplicate();

exports.mongoose = mongoose;

exports.elastic = elasticClient;

exports.redis = redisClient;

exports.RedisSub = RedisSub;

exports.RedisPub = RedisPub;