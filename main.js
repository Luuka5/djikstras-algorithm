var canvas = document.getElementById("canvas");
canvas.width = canvas.parentNode.clientWidth;
canvas.height = canvas.parentNode.clientHeight;
var crc = canvas.getContext("2d");

const scale = 50;
window.w = Math.floor(canvas.width / scale);
window.h = Math.floor(canvas.height / scale);
window.offsetX = (canvas.width % scale) / 2.0;
window.offsetY = (canvas.height % scale) / 2.0;

window.algo;
window.algoIntrvl = 0;

window.interval;
window.map = [];
window.start = {
  x: 0,
  y: 0,
};
window.goal = {
  x: w - 1,
  y: h - 1,
};
begin();

function createMap() {
  let oldMap = [...map];
  for (let i = oldMap.length; i < w; i++) {
    oldMap.push(new Array());
  }

  map = [];
  for (let i = 0; i < w; i++) {
    map.push(new Array());
    for (let j = 0; j < h; j++) {
      if (oldMap[i][j] != undefined) {
        map[i].push(oldMap[i][j]);
        continue;
      }
      map[i].push(new Node(i, j));
    }
  }
}
function createNewMap() {
  map = [];
  for (let i = 0; i < w; i++) {
    map.push(new Array());
    for (let j = 0; j < h; j++) {
      map[i].push(new Node(i, j));
    }
  }
}

function draw() {
  algo.update();
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      map[i][j].draw();
    }
  }
  crc.fillStyle = "#fff";
  crc.fillRect(
    offsetX + start.x * scale,
    offsetY + start.y * scale,
    scale,
    scale
  );
  crc.fillRect(
    offsetX + goal.x * scale,
    offsetY + goal.y * scale,
    scale,
    scale
  );
}

function begin() {
  createMap();
  algo = new DijkstrasAlgo();
  interval = window.setInterval(draw, 50);
}

window.onresize = function () {
  canvas.width = canvas.parentNode.clientWidth;
  canvas.height = canvas.parentNode.clientHeight;
  w = Math.floor(canvas.width / scale);
  h = Math.floor(canvas.height / scale);
  offsetX = (canvas.width % scale) / 2.0;
  offsetY = (canvas.height % scale) / 2.0;
  createMap();
  goal = {
    x: w - 1,
    y: h - 1,
  };
};

function mouse(e) {
  if (e.buttons != 1) return;
  try {
    map[((e.offsetX - offsetX) / scale) | 0][
      ((e.offsetY - offsetY) / scale) | 0
    ].setWall(!e.ctrlKey);
  } catch (e) {}
}

function clearAll() {
  algo = new DijkstrasAlgo();
  window.clearInterval(algoIntrvl);
  map = [];
  createNewMap();
}

function run() {
  algo.start();
}

canvas.addEventListener("mousemove", mouse);
canvas.addEventListener("mousedown", mouse);
document.getElementById("run").addEventListener("click", run);
document.getElementById("clear").addEventListener("click", clearAll);
