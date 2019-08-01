'use strict';

const expect = require('chai').expect;

const C = require('../../../lib/constant');
const DingTalk = require('../../../lib/dingtalk');
const config = require('../../test.config');

describe('lib/api/message.test.js', () => {
  describe('发送工作通知消息', () => {
    it('发送工作通知消息：向指定员工发送消息', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const res = await dingtalk.message.sendMessage({
          agent_id: config.agentId,
          userid_list: config.userId,
          msg: {
            'msgtype': 'text',
            'text': {
              'content': `Ryoma 的 测试：${Date.now()}`,
            },
          },
        });

        expect(res.errcode).eq(C.ERROR_CODE.OK);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });

    it('发送工作通知消息：向指定部门发送消息', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const res = await dingtalk.message.sendMessage({
          agent_id: config.agentId,
          dept_id_list: config.departmentId,
          msg: {
            'msgtype': 'text',
            'text': {
              'content': `Ryoma 的 测试：${Date.now()}`,
            },
          },
        });

        expect(res.errcode).eq(C.ERROR_CODE.OK);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('查询工作通知消息的发送进度', () => {
    it('查询工作通知消息的发送进度', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const sendRes = await dingtalk.message.sendMessage({
          agent_id: config.agentId,
          userid_list: config.userId,
          msg: {
            'msgtype': 'text',
            'text': {
              'content': `Ryoma 的 测试：${Date.now()}`,
            },
          },
        });

        const {progress} = await dingtalk.message.getSendProgress({
          agent_id: config.agentId,
          task_id: sendRes.task_id,
        });

        expect(progress.progress_in_percent).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('查询工作通知消息的发送结果', () => {
    it('查询工作通知消息的发送结果', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const sendRes = await dingtalk.message.sendMessage({
          agent_id: config.agentId,
          userid_list: config.userId,
          msg: {
            'msgtype': 'text',
            'text': {
              'content': `Ryoma 的 测试：${Date.now()}`,
            },
          },
        });

        const {send_result: sendResult} = await dingtalk.message.getSendResult({
          agent_id: config.agentId,
          task_id: sendRes.task_id,
        });

        expect(sendResult.unread_user_id_list.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('工作通知消息撤回', () => {
    it('工作通知消息撤回：无效参数', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        await dingtalk.message.recallMessage({
          agent_id: config.agentId,
          msg_task_id: 0,
        });
      } catch (e) {
        flag = false;

        expect(e.code).eq(C.ERROR_CODE.INVALID_PARAM);
      }

      expect(flag).eq(false);
    });

    it('工作通知消息撤回', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const sendRes = await dingtalk.message.sendMessage({
          agent_id: config.agentId,
          userid_list: config.userId,
          msg: {
            'msgtype': 'text',
            'text': {
              'content': `Ryoma 的 测试：${Date.now()}`,
            },
          },
        });

        const res = await dingtalk.message.recallMessage({
          agent_id: config.agentId,
          msg_task_id: sendRes.task_id,
        });

        expect(res.errcode).gte(C.ERROR_CODE.OK);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });
});
