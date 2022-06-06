const { SUCCESS } = require('../utils/status-code');
const { formatError } = require('../utils/format-error');
module.exports = class Controller {
  success(data) {
    return {
      data: data,
      code: SUCCESS
    };
  }

  fail(error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(error);
    }
    return formatError(error);
  }
}