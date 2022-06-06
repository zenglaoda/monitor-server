const { SCRIPT_LEVEL, SCRIPT_STATUS } = require('../enum/script');
const { invalidTransform, stringify } = require('../scheme/transform')

module.exports = {
  version: {
    required: true,
    type: 'string',
    min: 2,
    max: 14
  },
  errorMeta: [
    {
      type: 'object',
      required: true,
    },
    {
      type: 'string',
      max: 65535,
      transform: stringify,
    },
  ],
  status: {
    type: 'enum',
    enum: SCRIPT_STATUS,
    transform: invalidTransform
  }, 
  level: {
    type: 'enum',
    enum: SCRIPT_LEVEL,
    transform: invalidTransform
  },
  eventId: {
    type: 'string',
    min: 1,
    max: 32,
    pattern: /^\w{1,32}$/
  },
  remark: {
    type: 'string',
    max: 200
  },
  userAgent: {
    type: 'string',
    max: 300
  },
  extras: [
    {
      type: 'object',
    },
    {
      type: 'string',
      max: 65535,
      transform: stringify
    },
  ]
};