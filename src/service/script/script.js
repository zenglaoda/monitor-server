const { escape } = require('mysql2');
const MD5 = require('crypto-js/md5');
const validate = require('../../lib/async-validator');
const pool = require('../../lib/mysql/connect');
const { formatPlaceholder } = require('../../lib/mysql/format');
const { isDef } = require('../../utils/share');

class Script {
  // 获取脚本错误列表
  async getList(query) {
    let { 
      page, 
      pageSize, 
      status, 
      level,
      sTime,
      eTime,
      projectId
    } = query;

    page = page || 1;
    pageSize = pageSize || 10;

    const sIndex = (page - 1) * pageSize;
    const eIndex = (page) * pageSize;
    const sql = [
      'SELECT',
      'id, projectId, level, status, remark, errorMeta, createTime, updateTime',
      'FROM',
      'tb_script',
      `WHERE projectId = ${escape(projectId)}`,
      level ? `AND level = ${escape(level)}` : '',
      status ? `AND status = ${escape(status)}` : '',
      (sTime && eTime) ? `AND createTime >= ${escape(sTime)} AND createTime <= ${escape(eTime)}` : '',
      (page && pageSize) ? `LIMIT ${escape(sIndex)}, ${escape(eIndex)}` : ''
    ].join(' ');
    const sqlCount = [
      'SELECT',
      'Count(*) as count',
      'FROM',
      'tb_script',
      `WHERE projectId = ${escape(projectId)}`,
      level ? `AND level = ${escape(level)}` : '',
      status ? `AND status = ${escape(status)}` : '',
      (sTime && eTime) ? `AND createTime >= ${escape(sTime)} AND createTime <= ${escape(eTime)}` : '',
    ].join(' ');

    const connection = await pool.promise().getConnection();

    try {
      const count = await connection.execute(sqlCount)
        .then(([rows]) => {
          return rows[0].count;
        });

      const data = await connection.execute(sql)
        .then(([rows]) => {
          return {
            rows,
            count
          };
        })
      return data;
    } finally {
      connection.release();
    }
  }

  // 创建脚本
  async create(body) {
    if (!body.eventId) {
      body.eventId = this.createEventId(body);
    }
    
    const connect = await pool.promise().getConnection();

    try {
      let error;
      await this.createScriptLog(body, connect).catch((err) => {
        error = err;
      });

      if (!error) {
        return body.eventId;
      }
      if (error.errno !== 1452) {
        throw error;
      }
      await this.createScript(body, connect);
      await this.createScriptLog(body, connect);
      return body.eventId;
    } finally {
      connect.release();
    }
  }

  async update(body) {
    const {
      level,
      status,
      remark,
      id,
    } = body;

    const sql = `
      UPDATE tb_script  
      SET level=?, status=?, remark=? 
      WHERE id = ?;
    `;
    return pool.promise()
      .execute(sql, [level, status, remark, id, projectId])
      .then(() => true);
  }

  async getItem(body) {
    const { id } = body;
    const sql = `
      SELECT 
        id, projectId, level, status, remark, errorMeta, createTime 
      FROM 
        tb_script 
      WHERE id = ?;
    `;
    return pool.promise()
      .execute(sql, [id])
      .then((([row]) => {
        return row ? row[0] : null;
      }));
  }

  async getLogList(query) {

  }

  createEventId(body) {
    let { projectId, slat } = body;
    const payload = `${projectId}-${slat}`;
    return MD5(payload).toString();
  }

  async createScript(body, connect) {
    const {
      eventId,
      projectId,
      level,
      errorMeta,
      remark,
      status,
    } = body;
    const { fields, values, place } = formatPlaceholder(
      ['id', 'projectId', 'errorMeta', 'level', 'status', 'remark'],
      [eventId, projectId, errorMeta, level, status, remark]
    );
    const sql = [
      'INSERT INTO tb_script',
      `(${fields.join(',')})`,
      'VALUES',
      `(${place.join(',')})`
    ].join(' ');

    return connect.execute(sql, values);
  }
  
  async createScriptLog(body, connect) {
    const {
      eventId,
      projectId,
      version,
      userAgent,
      extras,
    } = body;
    const { fields, values, place } = formatPlaceholder(
      ['eventId', 'projectId', 'version', 'userAgent', 'extras'],
      [eventId, projectId, version, userAgent, extras]
    );
    const sql = [
      'INSERT INTO tb_script_log',
      `(${fields.join(',')})`,
      'VALUES',
      `(${place.join(',')})`
    ].join(' ');
    return connect.execute(sql, values);
  }
}

validate(Script, 'getList', require('./validator/getList'));
validate(Script, 'create', require('./validator/create'));
validate(Script, 'update', require('./validator/update'));
validate(Script, 'getItem', require('./validator/getItem'));
module.exports = new Script();
