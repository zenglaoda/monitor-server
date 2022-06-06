 const { isDef, isUndef }  = require('./share');
 const { ER_SERVER } = require('./status-code');


function mysqlError(error) {
  if (isUndef(error.sqlMessage) && isUndef(error.errno)) return;
  return {
    code: ER_SERVER,
    message: '服务器错误'
  };
}

function catchError(error) {
  return {
    code: error.code || ER_SERVER,
    message: error.message || '服务器错误'
  };
}

function formatError(error) {
  const stack = [
    mysqlError,
    catchError
  ];
  for (let i = 0; i < stack.length; i++) {
    const res = stack[i](error);
    if (res) return res;
  }
  return {
    code: ER_SERVER,
    message: '服务器错误'
  };
}

module.exports = {
  formatError
};