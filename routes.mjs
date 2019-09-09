import Joi from '@hapi/joi';
import Router from 'koa-router';
import { depth_first } from './depth_first.mjs';
const router = new Router();

router.get('/', ctx => {
    ctx.body = ctx.request.body;
});

router.get('/hello', ctx => {
    ctx.body = "Hello";
});

const schema = Joi.object({
    start: Joi.array().items(Joi.number().integer().label('start element')).length(2).required(),
    end: Joi.array().items(Joi.number().integer()).length(2).required(),
    grid: Joi.array().items(Joi.array().items(Joi.number().integer().valid(0, 1, 2))).required(),
    alg: Joi.string().required()
});
router.post('/getPath', ctx => {
    const { error, value } = schema.validate(ctx.request.body);
    if (error) {
        ctx.body = error.details.map(({ message }) => message);
        return;
    }
    let { start, end, alg, grid } = value;

    if (alg.toLowerCase() == 'depth-first') {
        ctx.body = depth_first(start, end, grid);
    }
    else {
        ctx.body = { start, end, alg, grid };
    }
});
export { router };