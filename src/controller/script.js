const Controller = require('./controller');
const scriptService = require('../service/script/script');

class Script extends Controller {
  constructor() {
    super();
  }

  getList(ctx) {
    return scriptService.getList(ctx.query)
      .then((data) => {
        ctx.body = this.success(data);
      })
      .catch((error) => {
        ctx.body = this.fail(error);
      });
  }

  create(ctx) {
    return scriptService.create(ctx.request.body)
      .then((data) => {
        ctx.body = this.success(data);
      })
      .catch((error) => {
        ctx.body = this.fail(error);
      });
  }

  update(ctx) {
    return scriptService.update(ctx.request.body)
      .then((data) => {
        ctx.body = this.success(data);
      })
      .catch((error) => {
        ctx.body = this.fail(error);
      });
  }

  getItem(ctx) {
    return scriptService.getItem(ctx.query)
    .then((data) => {
      ctx.body = this.success(data);
    })
    .catch((error) => {
      ctx.body = this.fail(error);
    });
  }
}
module.exports = new Script();