/**
 * 自定义的钉钉 error
 */
class DingTalkError extends Error {
  /**
   * 构造函数
   * @param {string} msg
   */
  constructor(msg) {
    super(msg);

    this.code = undefined;
    this.data = undefined;
    this.xxx_aaa = '';
  }
}

module.exports = DingTalkError;