const Controller = require('./controller');
const projectService = require('../service/project');

class Project extends Controller {
  constructor() {
    super();
  }

  getList(ctx) {
    return projectService.getList()
      .then((data) => {
        ctx.body = this.success(data);
      })
      .catch((error) => {
        ctx.body = this.fail(error);
      });
  }
}
module.exports = new Project();