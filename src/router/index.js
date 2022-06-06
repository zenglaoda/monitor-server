const Router = require('@koa/router');

const project = require('../controller/project');
const script = require('../controller/script');

const router = new Router({
  prefix: '/api'
});

router.get('/project/getList', ctx => project.getList(ctx));

router.get('/script/getList', ctx => script.getList(ctx));
router.get('/script/getItem', ctx => script.getItem(ctx));
router.post('/script/create', ctx => script.create(ctx));
router.post('/script/update', ctx => script.update(ctx));

module.exports = router;