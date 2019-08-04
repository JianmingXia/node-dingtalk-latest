'use strict';

const assert = require('assert');

/**
 * 消息相关 API
 * @see https://ding-doc.dingtalk.com/doc#/serverapi2/pgoxpy
 * @type {Message}
 */
class Message {
  constructor(client) {
    this.client = client;
  }

  /**
   * 发送工作通知消息
   * @param {number} opts.agent_id
   * @param {string=} opts.userid_list
   * @param {string=} opts.dept_id_list
   * @param {boolean=} opts.to_all_user
   * @param {Object} opts.msg
   * @returns {Promise<{errcode: number, errmsg: string, task_id: number}>}
   */
  async sendMessage(opts) {
    assert(opts.agent_id, 'opts.agent_id required');
    assert(opts.userid_list || opts.dept_id_list || opts.to_all_user, 'opts.userid_list or opts.dept_id_list or opts.to_all_user required');
    assert(opts.msg, 'opts.msg required');

    const options = {
      url: '/topapi/message/corpconversation/asyncsend_v2',
      method: 'POST',
      params: {
        access_token: await this.client.getAppAccessToken(),
      },
      data: opts,
    };

    return this.client.request(options);
  }

  /**
   * 查询工作通知消息的发送进度
   * @param {Object} opts
   * @param {number} opts.agent_id
   * @param {number} opts.task_id
   * @returns {Promise<{errcode: number, errmsg: string, progress: {status: number, progress_in_percent: number}}>}
   */
  async getSendProgress(opts) {
    assert(opts.agent_id, 'opts.agent_id required');
    assert(opts.task_id, 'opts.task_id required');

    const options = {
      url: '/topapi/message/corpconversation/getsendprogress',
      method: 'POST',
      params: {
        access_token: await this.client.getAppAccessToken(),
      },
      data: opts,
    };

    return this.client.request(options);
  }

  /**
   * 查询工作通知消息的发送结果
   * @param {Object} opts
   * @param {number} opts.agent_id
   * @param {number} opts.task_id
   * @returns {Promise<{errcode: number, errmsg: string, send_result: {invalid_user_id_list: string[], forbidden_user_id_list: string[], failed_user_id_list: string[], read_user_id_list: string[], unread_user_id_list: string[], invalid_dept_id_list: string[]}}>}
   */
  async getSendResult(opts) {
    assert(opts.agent_id, 'opts.agent_id required');
    assert(opts.task_id, 'opts.task_id required');

    const options = {
      url: '/topapi/message/corpconversation/getsendresult',
      method: 'POST',
      params: {
        access_token: await this.client.getAppAccessToken(),
      },
      data: opts,
    };

    return this.client.request(options);
  }

  /**
   * 工作通知消息撤回
   * @param {Object} opts
   * @param {number} opts.agent_id
   * @param {number} opts.msg_task_id
   * @returns {Promise<{errcode: number, errmsg: string}>}
   */
  async recallMessage(opts) {
    assert(opts.agent_id, 'opts.agent_id required');
    assert(opts.msg_task_id, 'opts.msg_task_id required');

    const options = {
      url: '/topapi/message/corpconversation/recall',
      method: 'POST',
      params: {
        access_token: await this.client.getAppAccessToken(),
      },
      data: opts,
    };

    return this.client.request(options);
  }
};

module.exports = Message;