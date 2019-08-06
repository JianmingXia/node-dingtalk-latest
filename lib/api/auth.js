'use strict';

const querystring = require('querystring');
const assert = require('assert');

const {sha256Hmac} = require('../crypto');

/**
 * 身份认证相关 API
 * @see https://ding-doc.dingtalk.com/doc#/serverapi2/kymkv6
 * @type {Auth}
 */
class Auth {
  constructor(client, options) {
    this.client = client;
    this.options = options;
  }

  /**
   * 获取内嵌二维码的 goto url
   * @param {String} redirectUri
   * @returns {String}
   */
  getQRGotoUrl(redirectUri) {
    assert(this.options.host, 'this.options.host required');
    assert(this.options.loginAppId, 'this.options.loginAppId required');

    // querystring.stringify 时包含 encodeURIComponent 操作
    const params = {
      appid: this.options.loginAppId,
      response_type: 'code',
      scope: 'snsapi_login',
      state: 'STATE',
      redirect_uri: redirectUri,
    };

    return encodeURIComponent(`${this.options.host}/connect/oauth2/sns_authorize?${querystring.stringify(params)}`);
  }

  /**
   * 通过 code 获取用户信息（扫码获取 tmpAuthCode 后，需要手动构造一个链接，该链接会 302 到重定向地址，此时的 code 才可使用）
   * @param tmpAuthCode
   * @returns {Promise<{nick: String, unionid: String, dingId: String, openid: String}>}
   */
  async getUserInfoByCode(tmpAuthCode) {
    assert(tmpAuthCode, 'tmpAuthCode required');
    assert(this.options.loginAppSecret, 'this.options.loginAppSecret required');

    const timestamp = Date.now();
    // axios 请求时，会对参数进行 urlEncode
    let options = {
      url: '/sns/getuserinfo_bycode',
      method: 'POST',
      params: {
        signature: sha256Hmac(timestamp + '', this.options.loginAppSecret, 'base64'),
        timestamp,
        accessKey: this.options.loginAppId,
      },
      data: {
        tmp_auth_code: tmpAuthCode,
      },
    };

    const res = await this.client.request(options);

    return res.user_info || {};
  }
};

module.exports = Auth;