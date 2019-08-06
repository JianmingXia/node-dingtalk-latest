'use strict';

const crypto = require('crypto');

/**
 * sha256 加密
 * @param {String} str
 * @param {String} secret
 * @param {String=} encoding
 * @returns {String}
 */
exports.sha256Hmac = (str, secret, encoding = 'hex') => {
  return crypto.createHmac('sha256', secret).update(str).digest(encoding);
};
