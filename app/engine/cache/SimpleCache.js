'use strict';

var RaWCache = require('./RawCache');

class SimpleCache {
    constructor(prefix) {
        if (!prefix) throw new TypeError('prefix should be string type.')
        this.prefix = prefix + ':';
    }
    put(key, value) {
        return RaWCache.put(this.prefix + key, value);
    }
    get(key) {
        return RaWCache.get(this.prefix + key);
    }
    purge(key) {
        return RaWCache.purge(this.prefix + key);
    }
    flush() { }
}


module.exports = SimpleCache;