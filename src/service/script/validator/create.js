const { projectId } = require('../../../scheme/share');
const { 
  level, 
  errorMeta, 
  eventId,
  remark,
  version,
  userAgent,
  extras,
  status,
} = require('../../../scheme/script');

module.exports = {
  projectId,
  level,
  status,
  errorMeta,
  eventId,
  slat: [
    {
      type: 'string',
      min: 1,
      max: 200,
    },
    {
      validator(rule, value, callback, source, options) {
        if (!eventId && !value) {
          return callback('slat/eventId不能同时为空!');
        }
        callback();
      }
    }
  ],
  remark,
  version,
  userAgent,
  extras,
};