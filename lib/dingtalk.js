'use strict';

const Cache = require('./cache');

const Client = require('./api/client');
const Message = require('./api/message');
const User = require('./api/user');
const Department = require('./api/department');
const Auth = require('./api/auth');

/**
 * 钉钉 SDK
 * @type {DingTalk}
 */
class DingTalk {
  /**
   * @param {Object} options 配置参数
   * @param {string} options.appKey 应用 appKey
   * @param {string} options.appSecret 应用 appSecret
   * @param {string} options.loginAppId 登录 appId
   * @param {string} options.loginAppSecret 登录 appSecret
   * @param {Cache=} options.cache
   * @param {string=} options.host
   * @param {number=} options.accessTokenLifeTime
   */
  constructor(options){
    options.host = options.host || 'https://oapi.dingtalk.com';
    options.cache = options.cache || new Cache();

    this.client = new Client(options);
    this.message = new Message(this.client);
    this.user = new User(this.client);
    this.department = new Department(this.client);
    this.auth = new Auth(this.client, options);
  }
};

module.exports = DingTalk;