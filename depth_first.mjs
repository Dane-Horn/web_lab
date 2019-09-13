function isVisited(visited, v) {
    return visited.find(({ val: [x, y] }) => x == v[0] && y == v[1]);
}
function move([x, y], store, neighbours, cost) {
    store.push({ val: [x, y], neighbours, travelled: cost });
}
function access(grid) {
    return ([x, y]) => {
        if (grid[y] == undefined || grid[y][x] == undefined) return Infinity;
        return grid[y][x] <= 5 ? grid[y][x] : 0;
    }
}

function depth_first(grid) { // returns {visited, seen}
    let src = []
    let dst = []
    outer:
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 6)
                src = [x, y];
            if (grid[y][x] == 7)
                dst = [x, y];
            if (src.length > 0 && dst.length > 0)
                break outer;
        }
    }
    let visited = [];
    let [dx, dy] = dst;
    let stack = [{ val: src, travelled: 0 }];
    while (true) {
        let { 'val': [x, y], travelled, neighbours } = stack.pop();
        visited.push({ val: [x, y], travelled, neighbours });
        if (x == dx && y == dy) return { visited };
        let getCost = access(grid);
        let right = { newpos: [x + 1, y], cost: getCost([x + 1, y]) };
        let left = { newpos: [x - 1, y], cost: getCost([x - 1, y]) };
        let down = { newpos: [x, y + 1], cost: getCost([x, y + 1]) };
        let up = { newpos: [x, y - 1], cost: getCost([x, y - 1]) };
        let validNeighbours =
            [right, left, down, up] //reverse bias - up > down > left > right
                .filter(({ cost, newpos }) => cost < 5 && !isVisited(visited, newpos))
                .sort(({ cost: costA }, { cost: costB }) => costB - costA)
        validNeighbours.forEach(({ newpos, cost }) => {
            let neighbours =
                validNeighbours
                    .map(({ newpos }) => newpos);
            move(newpos, stack, neighbours, travelled + cost);
        });
    }
}
export { depth_first as depthFirst };