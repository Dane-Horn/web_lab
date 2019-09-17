import Joi from '@hapi/joi';
import Router from 'koa-router';
import { depthFirst } from './depth_first.mjs';
import { breadthFirst } from './breadth_first.mjs';
import { generate_maze } from './maze.mjs';
const router = new Router();

router.get('/', (ctx) => {
	ctx.body = ctx.request.body;
});

router.get('/hello', (ctx) => {
	ctx.body = 'Hello';
});

const schema = Joi.object({
	grid: Joi.array().items(Joi.array().items(Joi.number().integer().valid(0, 1, 2, 3, 4, 5, 6, 7))).required(),
	alg: Joi.string().required()
});
router.post('/getPath', (ctx) => {
	const { error, value } = schema.validate(ctx.request.body);
	if (error) {
		ctx.body = error.details.map(({ message }) => message);
		return;
	}
	let { alg, grid } = value;
	switch (alg.toLowerCase()) {
		case 'depth-first':
			ctx.body = depthFirst(grid);
			break;
		case 'breadth-first':
			ctx.body = breadthFirst(grid);
			break;
	}
});

const mazeSchema = Joi.object({
	x: Joi.number().integer(),
	y: Joi.number().integer()
});
router.post('/getMaze', (ctx) => {
	const { error, value: { x, y } } = mazeSchema.validate(ctx.request.body);
	if (error) {
		ctx.body = error.details.map(({ message }) => message);
		return;
	}
	try {
		ctx.body = generate_maze(x, y);
	} catch (error) {
		ctx.body = 'hello';
	}
});

export { router };
