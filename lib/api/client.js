'use strict';

const assert = require('assert');
const axios = require('axios');

const C = require('../constant');
const DingTalkError = require('../error');

/**
 * 鉴权 && 请求相关 API
 * @type {Client}
 */
class Client {
  /**
   * Client 构造函数
   * @param {Object} options 配置参数
   * @param {string} options.appKey 应用 appKey
   * @param {string} options.appSecret 应用 appSecret
   * @param {*=} options.cache
   * @param {string=} options.host
   * @param {number=} options.accessTokenLifeTime
   * @constructor
   */
  constructor(options) {
    assert(options.host, 'options.host required');
    assert(options.cache, 'options.cache required');

    this.cache = options.cache;

    this.options = Object.assign({
      accessTokenLifeTime: (C.ACCESS_TOKEN_EXPIRED_TIME - C.ENSURE_ACCESS_TOKEN_VALID_TIME),
    }, options);
  }

  /**
   * 获取应用的 AccessToken
   * @see https://open-doc.dingtalk.com/microapp/serverapi2/eev437
   * @returns {Promise<String>}
   */
  async getAppAccessToken() {
    assert(this.options.appKey, 'options.appKey required');
    assert(this.options.appSecret, 'options.appSecret required');

    let cacheKey = `access_token_${this.options.appKey}`;
    let data = await this.cache.get(cacheKey);
    if (data) {
      return data;
    }

    let opts = {
      url: '/gettoken',
      method: 'GET',
      params: {
        appkey: this.options.appKey,
        appsecret: this.options.appSecret,
      },
    };

    const retData = await this.request(opts);
    if (retData['access_token']) {
      await this.cache.set(cacheKey, retData['access_token'], this.options.accessTokenLifeTime);

      return retData['access_token'];
    } else {
      throw new Error('return access_token not set');
    }
  }

  /**
   * 网络请求
   * @param {*} opts
   */
  async request(opts) {
    let options = Object.assign(
      {
        timeout: C.HTTP_TIMEOUT,
        baseURL: this.options.host,
      },
      opts
    );

    try {
      let response = await axios(options);
      const result = response.data;

      if (result.errcode !== 0) {
        const err = new DingTalkError(`${options.url} got error: ${JSON.stringify(result)}`);
        err.name = 'DingTalkClientResponseError';
        err.code = result.errcode;
        err.data = result;

        throw err;
      }

      return result;
    } catch (e) {
      throw e;
    }
  }
};

module.exports = Client;