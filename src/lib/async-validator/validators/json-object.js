function isEmptyValue(value) {
  return (value === undefined || value === null || value === '');
}
function isObject(value) {
  return Object.prototype.toString.call(value).toLowerCase().slice(8, -1) === 'object';
}

module.exports = function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  const typeError = `${rule.fullField} is not a valid object string`;

  if (validate) {
    if (isEmptyValue(value)) {
      if (!rule.required) {
        return callback();
      } 
      errors.push(`${rule.fullField} is required`);
    }

    try {
      const val = JSON.parse(value);
      if (isObject(val)) {
        return callback();
      } else {
        return callback(typeError);
      }
    } catch(e) {
      return callback(typeError);
    }
  }
  callback(errors);
}