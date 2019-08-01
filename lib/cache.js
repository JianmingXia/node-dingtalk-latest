'use strict';

/**
 * Cache 缓存
 * @type {Cache}
 */
class Cache {
  constructor() {
    this.cached = {};
  }

  get(key) {
    if (this.cached[key] && (this.cached[key].expired > Date.now())) {
      return this.cached[key].value;
    } else {
      return null;
    }
  }

  set(key, value, ttl) {
    const obj = {
      expired: ttl * 1000 + Date.now(),
      value,
    };

    this.cached[key] = obj;
    return obj;
  }
};

module.exports = Cache;