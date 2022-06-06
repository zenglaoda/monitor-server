const pool = require('../../lib/mysql/connect');

class Project {
  // 获取项目列表
  async getList() {
    const sql = 'SELECT id, name, description, createTime, updateTime from tb_project';
    return pool.promise().execute(sql)
      .then((([rows]) => rows));
  }
}

module.exports = new Project();
