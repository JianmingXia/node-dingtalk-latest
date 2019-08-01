module.exports = {
  // HTTP 请求超时 10000 ms
  HTTP_TIMEOUT: 10000,
  // access token 默认有效时间
  ACCESS_TOKEN_EXPIRED_TIME: 7200,
  // 确保 access token 有效时间：1000 s
  ENSURE_ACCESS_TOKEN_VALID_TIME: 1000,
  ERROR_CODE: {
    OK: 0,
    INVALID_APP_ID_OR_APP_SECRET: 40089,
    INVALID_PARAM: 400002,
  },
};