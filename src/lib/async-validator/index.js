const Schema = require('./async-validator').default;
const timestampValidator = require('./validators/timestamp');
const datetimeValidator = require('./validators/datetime');
const { ER_PARAM } = require('../../utils/status-code');

Schema.validators.timestamp = timestampValidator;
Schema.validators.datetime = datetimeValidator;

// async-validate 库的 validate方法依赖 data 对象 的hasOwnerProperty方法，
// ctx.query, ctx.body 是由Object.create(null)创建的


module.exports = function validate(target, key, schema) {
    const origin = target.prototype[key];

    target.prototype[key] = async function(data) {
        data = Object.assign({}, data);
        const validator = new Schema(schema);
        await validator.validate(data, { first: true })
            .catch((res) => {
                const error = new Error(res.errors[0].message);
                error.code = ER_PARAM;
                throw error;
            });
        return origin.call(this, data);
    }    
}
