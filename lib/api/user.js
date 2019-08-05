'use strict';

const assert = require('assert');

const C = require('../constant');

/**
 * 用户相关 API
 * @see https://ding-doc.dingtalk.com/doc#/serverapi2/ege851
 * @type {User}
 */
class User {
  constructor(client) {
    this.client = client;
  }

  /**
   * 获取部门用户 userid 列表
   * @param {string} deptId
   * @returns {Promise<Array<string>>}
   */
  async getDeptUserIds(deptId) {
    assert(deptId, 'deptId required');

    const options = {
      url: '/user/getDeptMember',
      method: 'GET',
      params: {
        access_token: await this.client.getAppAccessToken(),
        deptId,
      },
    };

    const retData = await this.client.request(options);
    return retData.userIds || [];
  }

  /**
   * @private
   * @param {Object} opts
   * @param {Number} opts.deptId
   * @param {Number} opts.offset
   * @param {Number} opts.size
   * @returns {Promise<{hasMore: boolean, userlist: [{userid: string, name: string}]}>}
   */
  async _getDeptUserSimples(opts) {
    assert(opts.deptId, 'opts.deptId required');
    assert(opts.offset >= 0, 'opts.offset required');
    assert(opts.size, 'opts.size required');

    const options = {
      url: '/user/simplelist',
      method: 'GET',
      params: {
        access_token: await this.client.getAppAccessToken(),
        department_id: opts.deptId,
        offset: opts.offset,
        size: opts.size,
      },
    };

    return this.client.request(options);
  }

  /**
   * 获取部门部分用户基本信息
   * @param {Object} opts
   * @param {Number} opts.deptId
   * @param {Number=0} opts.offset
   * @param {Number=100} opts.size
   * @returns {Promise<{hasMore: boolean, userlist: [{userid: string, name: string}]}>}
   */
  async getDeptUserSimples(opts) {
    assert(opts.deptId, 'opts.deptId required');

    const {deptId, offset = 0, size = C.PAGE.DEFAULT_PAGE_SIZE} = opts;

    return this._getDeptUserSimples({
      deptId,
      offset,
      size,
    });
  }

  /**
   * 获取部门所有用户基本信息
   * @param deptId
   * @returns {Promise<[{userid: string, name: string}]>}
   */
  async getDeptAllUserSimples(deptId) {
    assert(deptId, 'deptId required');

    let res = [];
    let offset = 0;
    const pageSize = C.PAGE.DEFAULT_PAGE_SIZE;

    let hasMore = false;
    do {
      const userSimples = await this._getDeptUserSimples({
        deptId,
        offset,
        size: pageSize,
      });

      res.push(...userSimples.userlist);
      hasMore = userSimples.hasMore;

      offset += pageSize;
    } while (hasMore);

    return res;
  }

  /**
   * @private
   * @param {Object} opts
   * @param {Number} opts.deptId
   * @param {Number} opts.offset
   * @param {Number} opts.size
   * @returns {Promise<{hasMore: boolean, userlist: [{unionid: string, openId: string, userid: string, isBoss: string, department: [number], name: string}]}>}
   */
  async _getDeptUsers(opts) {
    assert(opts.deptId, 'opts.deptId required');
    assert(opts.offset >= 0, 'opts.offset required');
    assert(opts.size, 'opts.size required');

    const options = {
      url: '/user/listbypage',
      method: 'GET',
      params: {
        access_token: await this.client.getAppAccessToken(),
        department_id: opts.deptId,
        offset: opts.offset,
        size: opts.size,
      },
    };

    return this.client.request(options);
  }

  /**
   * 获取部门部分用户详情
   * @param {Object} opts
   * @param {Number} opts.deptId
   * @param {Number=0} opts.offset
   * @param {Number=100} opts.size
   * @returns {Promise<{hasMore: boolean, userlist: [{unionid: string, openId: string, userid: string, isBoss: string, department: [number], name: string}]}>}
   */
  async getDeptUsers(opts) {
    assert(opts.deptId, 'opts.deptId required');

    const {deptId, offset = 0, size = C.PAGE.DEFAULT_PAGE_SIZE} = opts;

    return this._getDeptUsers({
      deptId,
      offset,
      size,
    });
  }

  /**
   * 获取部门所有用户信息
   * @param deptId
   * @returns {Promise<[{unionid: string, openId: string, userid: string, isBoss: string, department: [number], name: string}]>}
   */
  async getDeptAllUsers(deptId) {
    assert(deptId, 'deptId required');

    let res = [];
    let offset = 0;
    const pageSize = C.PAGE.DEFAULT_PAGE_SIZE;

    let hasMore = false;
    do {
      const userSimples = await this._getDeptUsers({
        deptId,
        offset,
        size: pageSize,
      });

      res.push(...userSimples.userlist);
      hasMore = userSimples.hasMore;

      offset += pageSize;
    } while (hasMore);

    return res;
  }

  /**
   * 获取用户详情
   * @param {String} id - 成员 userid
   * @returns {Promise<{errode: number, unionid: string, openId: string, remark: string, userid: string, isBoss: boolean, isLeaderInDepts: string, hiredDate: number, isSenior: boolean, email: string}>}
   */
  async getUser(userId) {
    assert(userId, 'userId required');

    const options = {
      url: '/user/get',
      method: 'GET',
      params: {
        access_token: await this.client.getAppAccessToken(),
        userid: userId,
      },
    };

    return this.client.request(options);
  }

  /**
   * 根据 unionid 获取 userid
   * @param {String} unionId - 即 user.openId
   * @returns {Promise<Object>} 返回 { userid }
   */
  async getUserIdByUnionId(unionId) {
    assert(unionId, 'unionId  required');

    const options = {
      url: '/user/getUseridByUnionid',
      method: 'GET',
      params: {
        access_token: await this.client.getAppAccessToken(),
        unionid: unionId,
      },
    };

    const res = await this.client.request(options);

    return res.userid;
  }

  /**
   * 获取企业员工数
   * @param onlyActive
   * @returns {Promise<number>}
   */
  async getOrgUserCount(onlyActive = 0) {
    let options = {
      url: '/user/get_org_user_count',
      method: 'GET',
      params: {
        access_token: await this.client.getAppAccessToken(),
        onlyActive,
      },
    };

    const retData = await this.client.request(options);
    return retData.count || 0;
  }
};

module.exports = User;