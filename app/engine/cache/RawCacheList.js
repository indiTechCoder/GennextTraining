'use strict';

var RedisClient = require('../../db').redis;
var debug = require('debug')('htapp:Intl-engine:Cache');
var Promise = require('bluebird');

class RaWCacheList {
    static add(key, value) {
        return new Promise((resolve, reject) => {
            debug('Caching ->', key);
            RedisClient.sadd(key, value, (error, flag) => {
                if (error) return reject(error);
                debug('Cached ->', key, ':', value);
                return resolve(value);
            });
        });

    }
    static getAll(key) {
        return new Promise((resolve, reject) => {
            RedisClient.smembers(key, (error, values) => {
                if (error) return reject(error);
                return resolve(values);
            });
        });
    }
    static remove(key, value) {
        return new Promise((resolve, reject) => {
            RedisClient.srem(key, value, (error, flag) => {
                if (error) return reject(error);
                debug('Cache Invalidated ->', key);
                return resolve(flag);
            });
        });
    }
}

module.exports = RaWCacheList;