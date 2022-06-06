const shareUtils = require('../lib/utils/share');

shareUtils.isInvalid = function(value) {
  return value === '' || value === undefined || value === null;
}

module.exports = shareUtils;

