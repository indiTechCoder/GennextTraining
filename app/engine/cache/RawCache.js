'use strict';

var RedisClient = require('../../db').redis;
var debug = require('debug')('htapp:Intl-engine:Cache');
var Promise = require('bluebird');

class RaWCache {
    static put(key, value, exptime) {
        debug('Caching ->', key);
        return new Promise((resolve, reject) => {
            RedisClient.set(key, value, (err, reply) => {
                if (exptime)
                    RedisClient.expireat(key, exptime);
                debug('Cached ->', key);
                return resolve(value);
            });
        });
    }
    static get(key) {
        return new Promise((resolve, reject) => {
            RedisClient.get(key, (error, buffer) => {
                if (error || !buffer) {
                    debug('failed cache ->', key);
                    return reject(new Error('Cache not found for key '+ key));
                }
                debug('From cache ->', key);
                resolve(buffer.toString());
            });
        });
    }
    static purge(key) {
        debug('Invalidating cache ->', key);
        return new Promise((resolve, reject) => {
            RedisClient.del(key, (err, reply) => {
                resolve(reply);
            });
        });
    }
}

module.exports = RaWCache;