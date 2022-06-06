const { isInvalid } = require('../utils/share');

exports.invalidTransform = function(value) {
  return isInvalid(value) ? null : String(value);
}

// json 数据序列化
exports.stringify = function(value) {
  let val;
  try {
    val = JSON.stringify(value);
  } catch(e) {
    val = value
  }
  return val;
}