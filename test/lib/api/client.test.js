'use strict';

const expect = require('chai').expect;

const C = require('../../../lib/constant');
const DingTalk = require('../../../lib/dingtalk');
const config = require('../../test.config');

describe('lib/api/client.test.js', () => {
  describe('获取应用的 access token', () => {
    it('获取应用的 access token：不合法的 appKey 或 appSecret', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk({
          appKey: 'test',
          appSecret: 'test',
        });

        await dingtalk.client.getAppAccessToken();
      } catch (e) {
        flag = false;

        expect(e.code).eq(C.ERROR_CODE.INVALID_APP_ID_OR_APP_SECRET);
      }


      expect(flag).eq(false);
    });

    it('获取应用的 access token', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const res = await dingtalk.client.getAppAccessToken();
        await dingtalk.client.getAppAccessToken();
        expect(res.length).gt(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });
});
