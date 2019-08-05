'use strict';

const expect = require('chai').expect;

const DingTalk = require('../../../lib/dingtalk');
const config = require('../../test.config');

describe('lib/api/department.test.js', () => {
  describe('获取子部门列表', () => {
    it('获取子部门列表', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const depts = await dingtalk.department.getSubDepts({
          parentDeptId: config.departmentId,
        });

        expect(depts.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });

    it('获取子部门列表：递归子部门', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const depts = await dingtalk.department.getSubDepts({
          parentDeptId: config.departmentId,
          fetchChild: false,
        });

        const fetchChildDepts = await dingtalk.department.getSubDepts({
          parentDeptId: config.departmentId,
          fetchChild: true,
        });

        expect(fetchChildDepts.length).gte(depts.length);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('获取子部门 id 列表（不支持迭代）', () => {
    it('获取子部门 id 列表', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const deptIds = await dingtalk.department.getSubDeptIds(config.departmentId);

        expect(deptIds.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });

    it('获取子部门 id 列表', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const deptIds = await dingtalk.department.getSubDeptIds(config.rootDepartmentId);

        expect(deptIds.length).gte(0);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });

  describe('获取部门详情', () => {
    it('获取部门详情', async () => {
      let flag = true;
      try {
        const dingtalk = new DingTalk(config);

        const department = await dingtalk.department.getDepartment(config.departmentId);

        expect(department.id).gte(config.departmentId);
      } catch (e) {
        flag = false;
      }

      expect(flag).eq(true);
    });
  });
});
