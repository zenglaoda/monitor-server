
const { isDef } = require('../utils/share');


/**
 * @description 格式化 fields, values, placeholder
 * @param {array<[]>} param
 * @returns {fields:string[], vlaues: any[], place: string[], placeString: string}
*/
exports.formatPlaceholder = function(fields, values) {
  const f = [];
  const v = [];
  const p = [];
  fields.forEach((field, index) => {
    const value = values[index];
    if (isDef(value)) {
      f.push(field);
      v.push(value);
      p.push('?');
    }
  });
  return {
    fields: f,
    values: v,
    place: p,
    placeString: v.map(e => {
      if (e === '') return `''`;
      return e;
    }).join(','),
  };
}