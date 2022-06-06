const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyparser = require('koa-bodyparser')
const path = require('path');
const router = require('./router');
const { isDef } = require('./utils/share');

const app = new Koa();

app.use(koaStatic(path.resolve(__dirname, 'public')));
app.use(bodyparser());
app.use(async (ctx, next) => {
  const projectId = ctx.cookies.get('projectId');
  if (isDef(projectId)) {
    ctx.query.projectId = projectId;
    ctx.request.body.projectId = projectId;
  }
  await next();
});
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.log('-------- onerror -------')
  console.log(err);
});

app.listen(3001, '127.0.0.1');