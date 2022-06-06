
exports.timestampDescriptor = {
  type: 'timestamp',
  transform(value) {
    return /^\d{13}$/.test(value) ? Number(value) : value;
  }
};

exports.datetimeDescriptor = {
  type: 'datetime',
};


exports.integerDescriptor = {
  type: 'integer',
  min: 1,
  transform(value) {
    const reg = /^\d+$/;
    if (reg.test(value)) {
      return Number(value);
    }
    return value;
  }  
};


