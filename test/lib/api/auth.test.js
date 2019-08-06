'use strict';

const expect = require('chai').expect;

const C = require('../../../lib/constant');

const DingTalk = require('../../../lib/dingtalk');
const config = require('../../test.config');

describe('lib/api/auth.test.js', () => {
  describe('获取内嵌二维码的 goto url', () => {
    it('获取内嵌二维码的 goto url', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const gotoUrl = dingtalk.auth.getQRGotoUrl('http://127.0.0.1:3000/test');

        expect(gotoUrl.length).gt(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('通过 code 获取用户信息', () => {
    it('通过 code 获取用户信息：不存在的临时授权码', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        await dingtalk.auth.getUserInfoByCode('xxxx');
      } catch (e) {
        expect(e.code).eq(C.ERROR_CODE.NOT_EXIST_TMP_AUTH_CODE);
        flag = false;
      }

      expect(flag).eq(false);
    });
  });
});