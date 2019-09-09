import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router } from './routes.mjs';

const app = new Koa();


app.use(bodyParser());
app.use(router.allowedMethods());
app.use(router.routes());
app.listen(3000);