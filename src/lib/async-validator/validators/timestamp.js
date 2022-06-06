function isEmptyValue(value) {
  return (value === undefined || value === null || value === '');
}

const minTime = (new Date(1970, 1, 1)).getTime();
const maxTime = (new Date(2088, 8, 8)).getTime();

module.exports = function timestamp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value)) {
      if (!rule.required) {
        return callback();
      } 
      errors.push(`${rule.fullField} is required`);
    }

    const val = Number(value);
    if (
      /^\d{13}$/.test(value) === false ||
      val < minTime ||
      val > maxTime
    ) {
      errors.push(`${rule.fullField} is not a valid timestamp`);
    }

  }
  callback(errors);
}