const { 
  level, 
  status,
  remark,
  eventId,
} = require('../../../scheme/script');
const { isDef } = require('../../../utils/share');

module.exports = {
  id: {
    ...eventId,
    required: true
  },
  level: {
    ...level,
    required: true
  },
  status: {
    ...status,
    required: true
  },
  remark: {
    ...remark,
    transform(value) {
      return isDef(value) ? value: '';
    }
  }
};