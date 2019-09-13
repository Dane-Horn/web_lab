import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router } from './routes.mjs';
import cors from "koa2-cors";
const app = new Koa();

app.use(cors({ origin: false }));
app.use(bodyParser());
app.use(router.allowedMethods());
app.use(router.routes());
app.listen(3000);