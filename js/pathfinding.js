const rotation = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

export class DijkstrasAlgo {
  constructor() {
    this.setNodes();
    this.x = start.x;
    this.y = start.y;
    this.run = false;

    map[0][0].setState(1);
  }

  update() {
    if (!this.run) return;

    let n = this.findBestNode();
    n.setState(2);
    n.data.visited = true;
    n.data.pre = this.getPrev();

    for (let i = 0; i < rotation.length; i++) {
      let n = getNode(this.x + rotation[i].x, this.y + rotation[i].y);
      if (n == undefined || n.getState() != 0) continue;
      n.setState(1);
      n.data.dist = getNode(this.x, this.y).data.dist + 1;
    }

    if (this.x == goal.x && this.y == goal.y) this.finish();
  }

  findBestNode() {
    let best = Infinity;
    let pos = { x: this.x, y: this.y };

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        let n = getNode(i, j);
        if (n == undefined || n.wall || n.data.visited || n.getState() != 1)
          continue;
        if (n.data.dist < best) {
          best = n.data.dist;
          pos.x = i;
          pos.y = j;
        }
      }
    }
    this.x = pos.x;
    this.y = pos.y;
    return getNode(pos.x, pos.y);
  }

  getPrev() {
    let best = Infinity;
    let index = 0;
    for (let i = 0; i < rotation.length; i++) {
      let n = getNode(this.x + rotation[i].x, this.y + rotation[i].y);
      if (n == undefined || !n.data.visited || n.wall) continue;
      if (n.data.dist < best) {
        index = i;
      }
    }
    return { x: rotation[index].x, y: rotation[index].y };
  }

  finish() {
    console.log("finished");
    this.run = false;

    while (this.x != start.x || this.y != start.y) {
      let n = getNode(this.x, this.y);
      n.setState(3);
      this.x += n.data.pre.x;
      this.y += n.data.pre.y;
    }
  }

  setNodes() {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        if (map[i][j].wall) continue;
        map[i][j].data = new Data(i, j);
        map[i][j].state = 0;
      }
    }
  }

  start() {
    this.run = true;
    this.setNodes();
    this.x = start.x;
    this.y = start.y;
  }
}

class Data {
  constructor(px, py) {
    this.pos = {
      x: px,
      y: py,
    };
    this.prev = {
      x: 0,
      y: 0,
    };
    this.dist = -1;
    this.visited = false;
  }
}

function getNode(x, y) {
  try {
    return map[x][y];
  } catch (e) {
    return undefined;
  }
}

function dist(x, y) {
  return Math.sqrt(x * x + y * y);
}
