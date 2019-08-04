'use strict';

const assert = require('assert');

/**
 * 部门相关 API
 * @see https://ding-doc.dingtalk.com/doc#/serverapi2/dubakq
 * @type {Department}
 */
class Department {
  constructor(client) {
    this.client = client;
  }

  /**
   * 获取子部门列表
   * @param {{parentDeptId: number, fetchChild: boolean}} opts
   * @returns {Promise<[{createDeptGroup: boolean, name: string, id: number, autoAddUser: boolean, parentid: number}]>} 部门列表
   */
  async getSubDepts(opts) {
    assert(opts.parentDeptId >= 1, 'opts.parentDeptId required');

    const {parentDeptId, fetchChild = false} = opts;

    const options = {
      url: '/department/list',
      method: 'GET',
      params: {
        access_token: await this.client.getAppAccessToken(),
        id: parentDeptId,
        fetch_child: fetchChild,
      },
    };

    const res = await this.client.request(options);
    return res.department || [];
  }

  /**
   * 获取子部门 ID 列表
   * @param {Number} id
   * @returns {Promise<[number]>}
   */
  async getSubDeptIds(deptId = 1) {
    assert(deptId >= 1, 'deptId required');

    const options = {
      url: '/department/list_ids',
      method: 'GET',
      params: {
        id: deptId,
        access_token: await this.client.getAppAccessToken(),
      },
    };

    const retData = await this.client.request(options);
    return retData['sub_dept_id_list'] || [];
  }

  /**
   * 获取部门详情
   * @param {number} deptId
   * @returns {Promise<{errcode: number, parentid: number, createDeptGroup: boolean, name: string, id: number, autoAddUser: boolean, deptHiding: boolean, order: number}>}
   */
  async getDepartment(deptId) {
    assert(deptId, 'deptId required');

    const options = {
      url: '/department/get',
      method: 'GET',
      params: {
        access_token: await this.client.getAppAccessToken(),
        id: deptId,
      },
    };

    return this.client.request(options);
  }
}

module.exports = Department;
