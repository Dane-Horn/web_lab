const exists = (seen) => (val) => {
    return seen.find(e => e[0] == val[0] && e[1] == val[1]);
}

function move([x, y], store, cost) {
    store.push({ val: [x, y], travelled: cost });
}
function access(grid) {
    return ([x, y]) => {
        if (grid[y] == undefined || grid[y][x] == undefined) return Infinity;
        return grid[y][x];
    }
}

function depth_first(src, dst, grid) { // returns {visited, seen}
    let visited = [];
    let seen = [src];
    let [dx, dy] = dst;
    let stack = [{ val: src, travelled: 0 }];
    while (true) {
        let isSeen = exists(seen);
        let { 'val': [x, y], travelled } = stack.pop();
        visited.push({ val: [x, y], travelled });
        if (x == dx && y == dy) return { seen, visited };
        let getCost = access(grid);
        let right = { newpos: [x + 1, y], cost: getCost([x + 1, y]) };
        let left = { newpos: [x - 1, y], cost: getCost([x - 1, y]) };
        let down = { newpos: [x, y + 1], cost: getCost([x, y + 1]) };
        let up = { newpos: [x, y - 1], cost: getCost([x, y - 1]) };

        [right, left, down, up] //reverse bias - up > down > left > right
            .filter(({ cost }) => cost != Infinity)
            .filter(({ newpos }) => !isSeen(newpos))
            .sort(({ cost: costA }, { cost: costB }) => costB - costA)
            .forEach(({ newpos, cost }) => {
                seen.push(newpos);
                move(newpos, stack, travelled + cost);
            });
    }
}
export { depth_first as depthFirst };