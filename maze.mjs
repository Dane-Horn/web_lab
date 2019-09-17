function shuffleArray(array) {
	// thank you Laurens Holst
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[ array[i], array[j] ] = [ array[j], array[i] ];
	}
}

function isVisited(visited, [ vx, vy ]) {
	return visited.find(([ x, y ]) => x == vx && y == vy);
}

function generate_maze(x, y) {
	let fx = x * 2 + 1;
	let fy = y * 2 + 1;
	let maze = new Array();
	for (let i = 0; i < fy; i++) {
		maze.push([]);
		for (let j = 0; j < fx; j++) {
			if (i % 2 == 0) {
				maze[i].push(5);
			} else {
				if (j % 2 == 0) {
					maze[i].push(5);
				} else {
					maze[i].push(0);
				}
			}
		}
	}
	let curry = 0;
	let currx = Math.floor(Math.random() * x) * 2 + 1;
	maze[curry][currx] = 6;
	let dsty = fy - 1;
	let dstx = Math.floor(Math.random() * x) * 2 + 1;
	maze[dsty][dstx] = 7;

	curry = Math.floor(Math.random() * y) * 2 + 1;
	currx = Math.floor(Math.random() * x) * 2 + 1;
	//              up     down     left     right
	let dirs = [ [ 0, -2 ], [ 0, 2 ], [ -2, 0 ], [ 2, 0 ] ];
	let visited = [ [ currx, curry ] ];
	let stack = [];
	while (true) {
		let neighbours = [];
		dirs.forEach(([ xmove, ymove ]) => {
			if (currx + xmove >= 0 && currx + xmove < fx && curry + ymove >= 0 && curry + ymove < fy && !isVisited(visited, [ currx + xmove, curry + ymove ])) {
				neighbours.push([ currx + xmove, curry + ymove ]);
			}
		});
		if (neighbours.length == 0) {
			if (stack.length == 0) return maze;
			[ currx, curry ] = stack.pop();
		} else {
			shuffleArray(neighbours);
			let [ tempx, tempy ] = neighbours[0];
			maze[curry + (tempy - curry) / 2][currx + (tempx - currx) / 2] = 0;
			[ currx, curry ] = [ tempx, tempy ];
			visited.push([ currx, curry ]);
			stack.push([ currx, curry ]);
		}
	}
}

export { generate_maze };
export default generate_maze;
