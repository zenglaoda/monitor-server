const { 
  integerDescriptor, 
  timestampDescriptor,
  datetimeDescriptor
} = require('./desctiptor');

exports.projectId = {
  type: 'integer',
  min: 1,
  required: true,
  transform(value) {
    const reg = /^\d+$/;
    if (reg.test(value)) {
      return Number(value);
    }
    return value;
  }
};

exports.page = integerDescriptor;
exports.pageSize = integerDescriptor;
exports.sTime = datetimeDescriptor;
exports.eTime = datetimeDescriptor;