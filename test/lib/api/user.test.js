'use strict';

const expect = require('chai').expect;

const C = require('../../../lib/constant');
const DingTalk = require('../../../lib/dingtalk');
const config = require('../../test.config');

describe('lib/api/user.test.js', () => {
  describe('获取部门用户 userid 列表', () => {
    it('发送工作获取部门用户 userid 列表', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const userIds = await dingtalk.user.getDeptUserIds(config.departmentId);

        expect(userIds.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('获取部门部分用户列表', () => {
    it('获取部门部分用户列表', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const res = await dingtalk.user.getDeptUserSimples({
          deptId: config.departmentId,
        });

        expect(res.userlist.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('获取部门所有用户列表', () => {
    it('获取部门所有用户列表', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const users = await dingtalk.user.getDeptAllUserSimples(config.departmentId);

        expect(users.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('获取部门部分用户详情', () => {
    it('获取部门部分用户详情', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const res = await dingtalk.user.getDeptUsers({
          deptId: config.departmentId,
        });

        expect(res.userlist.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('获取部门所有用户详情', () => {
    it('获取部门所有用户详情', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const users = await dingtalk.user.getDeptAllUsers(config.departmentId);

        expect(users.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('获取用户详情', () => {
    it('获取用户详情：找不到该用户', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        await dingtalk.user.getUser('xxxxxx');
      } catch (e) {
        expect(e.code).eq(C.ERROR_CODE.USER_DOES_NOT_EXIST);

        flag = false;
      }

      expect(flag).eq(false);
    });

    it('获取用户详情', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const user = await dingtalk.user.getUser(config.userId);

        expect(user.userid).eq(config.userId);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('根据 unionid 获取 userid', () => {
    it('根据 unionid 获取 userid：找不到该用户', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        await dingtalk.user.getUserIdByUnionId('xxxxxx');
      } catch (e) {
        expect(e.code).eq(C.ERROR_CODE.INVALID_PARAM);

        flag = false;
      }

      expect(flag).eq(false);
    });

    it('根据 unionid 获取 userid', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const userId = await dingtalk.user.getUserIdByUnionId(config.unionId);

        expect(userId).eq(config.userId);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('获取企业员工数', () => {
    it('获取企业员工数：包含未激活', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const count = await dingtalk.user.getOrgUserCount();

        expect(count).gt(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });

    it('获取企业员工数：不包含未激活', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const count = await dingtalk.user.getOrgUserCount(1);

        expect(count).gt(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });
});