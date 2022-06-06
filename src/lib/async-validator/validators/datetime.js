function isEmptyValue(value) {
  return (value === undefined || value === null || value === '');
}

module.exports = function datetime(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value)) {
      if (!rule.required) {
        return callback();
      } 
      errors.push(`${rule.fullField} is required`);
    }

    const reg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
    if (!reg.test(value)) {
      errors.push(`${rule.fullField} is not a valid datetime`);
    }

  }
  callback(errors);
}