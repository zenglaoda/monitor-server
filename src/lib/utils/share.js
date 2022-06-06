function isUndef(value) {
  return value === undefined || value === null;
}

function isDef(value) {
  return isUndef(value) === false;
}

module.exports = {
  isUndef,
  isDef,
};