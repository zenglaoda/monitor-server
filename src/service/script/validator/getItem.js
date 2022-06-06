const { eventId } = require('../../../scheme/script');

module.exports = {
  id: {
    ...eventId,
    required: true
  },
};