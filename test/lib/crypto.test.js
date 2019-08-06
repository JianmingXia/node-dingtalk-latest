'use strict';

const expect = require('chai').expect;

const crypto = require('../../lib/crypto');

describe('lib/crypto.test.js', () => {
  describe('signature 加密', () => {
    it('signature 加密', async () => {
      let flag = true;
      try {
        const signature = crypto.sha256Hmac('1546084445901', 'testappSecret', 'base64');

        expect(signature).eq('HCbG3xNE3vzhO+u7qCUL1jS5hsu2n5r2cFhnTrtyDAE=');
        expect(encodeURIComponent(signature)).eq('HCbG3xNE3vzhO%2Bu7qCUL1jS5hsu2n5r2cFhnTrtyDAE%3D');
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });
});