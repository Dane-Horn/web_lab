function isVisited(visited, v) {
	return visited.find(([ x, y ]) => x == v[0] && y == v[1]);
}

function inQueue(queue, [ nx, ny ]) {
	return queue.find(([ x, y ]) => nx == x && ny == y);
}

function move([ x, y ], store) {
	store.push([ x, y ]);
}
function access(grid) {
	return ([ x, y ]) => {
		if (grid[y] == undefined || grid[y][x] == undefined) return Infinity;
		return grid[y][x] <= 5 ? grid[y][x] : 0;
	};
}

function breadth_first(grid) {
	let src = [];
	let dst = [];
	outer: for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] == 6) src = [ x, y ];
			if (grid[y][x] == 7) dst = [ x, y ];
			if (src.length > 0 && dst.length > 0) break outer;
		}
	}
	let visited = [];
	let [ dx, dy ] = dst;
	let queue = [ src ];
	while (true) {
		if (queue.length == 0) return { visited, error: true };
		let [ x, y ] = queue.shift();
		visited.push([ x, y ]);
		if (x == dx && y == dy) return { visited };
		let getCost = access(grid);
		let right = { newpos: [ x + 1, y ], cost: getCost([ x + 1, y ]) };
		let left = { newpos: [ x - 1, y ], cost: getCost([ x - 1, y ]) };
		let down = { newpos: [ x, y + 1 ], cost: getCost([ x, y + 1 ]) };
		let up = { newpos: [ x, y - 1 ], cost: getCost([ x, y - 1 ]) };
		let validNeighbours = [ right, left, down, up ] //reverse bias - up > down > left > right
			.filter(({ cost, newpos }) => cost < 5 && !isVisited(visited, newpos))
			.filter(({ newpos }) => !inQueue(queue, newpos))
			.sort(({ cost: costA }, { cost: costB }) => costB - costA)
			.forEach(({ newpos }) => {
				move(newpos, queue);
			});
	}
}
export { breadth_first as breadthFirst };
