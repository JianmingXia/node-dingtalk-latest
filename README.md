## 说在前面
虽然 ali-sdk 中有官方维护的 钉钉 SDK，但是很遗憾已经有一年未更新了。另外从 Issue 上看官方也没有计划来更新，所以才有了本库。

本库主要解决目前 node-dingtalk 两个问题：
- 很多接口已经不再适用；
- 调用方式也发生了改变（不推荐使用 corpId 及 corpSecret 参数）

## 使用

```
const DingTalk = require('node-dingtalk-latest');
const dingtalk = new DingTalk({
  appKey: '',
  appSecret: '',
  loginAppId: '',
  loginAppSecret: ''
});

await dingtalk.message.sendMessage({
  agent_id: '',
  userid_list: '',
  msg: {
    'msgtype': 'text',
    'text': {
      'content': `Ryoma 的 测试：${Date.now()}`,
    },
  },
});
```

## Cache
引入 Cache 的理由与官方一样，在 cluster 下换成 Redis 等外部存储降低获取 AccessToken 频率。

## API

> 目前支持的 API，主要以我目前使用的为主，欢迎大家提需求

### Client
#### getAccessToken
> GET /gettoken

获取 AccessToken, 并在有效期内自动缓存

### Auth

#### getQRGotoUrl

获取内嵌二维码的 goto url

#### getUserInfoByCode

> /sns/getuserinfo_bycode

通过 code 获取用户信息

Note：扫码获取 tmpAuthCode 后，需要手动构造一个链接，该链接会 302 到重定向地址，此时的 code 才可使用

### Message
#### sendMessage
> POST /topapi/message/corpconversation/asyncsend_v2

发送工作通知消息

#### getSendProgress
> POST /topapi/message/corpconversation/getsendprogress

查询工作通知消息的发送进度

#### getSendResult
> POST /topapi/message/corpconversation/getsendresult

查询工作通知消息的发送结果

#### recallMessage
> POST /topapi/message/corpconversation/recall

工作通知消息撤回

### User

#### getDeptUserIds

> GET /user/getDeptMember

获取部门用户 userid 列表

#### getDeptUserSimples

> /user/simplelist

获取部门部分用户基本信息

#### getDeptAllUserSimples

> /user/simplelist

获取部门所有用户基本信息，基于 **/user/simplelist** 接口封装

#### getDeptUsers

> /user/listbypage

获取部门部分用户详情

#### getDeptAllUsers

> /user/listbypage

获取部门所有用户信息，基于 **/user/listbypage** 接口封装

#### getUser

> /user/get

获取用户详情

#### getUserIdByUnionId

> /user/getUseridByUnionid

根据 unionid 获取 userid

#### getOrgUserCount

> /user/get_org_user_count

获取企业员工数

### Department

#### getSubDepts

> /department/list

获取子部门列表——支持迭代获取子部门

#### getSubDeptIds

> /department/list_ids

获取子部门 ID  列表——不支持迭代获取子部门 ID 列表

### getDepartment

> /department/get

获取部门详情

## 注意
- 测试时，请在 **test/test.config.js** 填上自己的配置