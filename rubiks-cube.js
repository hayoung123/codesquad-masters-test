let cube = {
  up: Array.from(Array(3), () => new Array(3).fill("B")),
  down: Array.from(Array(3), () => new Array(3).fill("R")),
  front: Array.from(Array(3), () => new Array(3).fill("O")),
  right: Array.from(Array(3), () => new Array(3).fill("G")),
  left: Array.from(Array(3), () => new Array(3).fill("W")),
  back: Array.from(Array(3), () => new Array(3).fill("Y")),
};

const DIR_TYPE = {
  UP: { fixer: "row", fixIndex: 0 },
  DOWN: { fixer: "row", fixIndex: 2 },
  LEFT: { fixer: "column", fixIndex: 0 },
  RIGHT: { fixer: "column", fixIndex: 2 },
};

let MOVE_TYPE = {
  F: {
    data: cube.front,
    linked: [cube.up, cube.right, cube.down, cube.left],
    linkedDir: [DIR_TYPE.DOWN, DIR_TYPE.LEFT, DIR_TYPE.UP, DIR_TYPE.RIGHT],
  },
  R: {
    data: cube.right,
    linked: [cube.up, cube.back, cube.down, cube.front],
    linkedDir: [DIR_TYPE.RIGHT, DIR_TYPE.LEFT, DIR_TYPE.DOWN, DIR_TYPE.DOWN],
  },
  L: {
    data: cube.left,
    linked: [cube.up, cube.front, cube.down, cube.back],
    linkedDir: [DIR_TYPE.LEFT, DIR_TYPE.LEFT, DIR_TYPE.LEFT, DIR_TYPE.RIGHT],
  },
  B: {
    data: cube.back,
    linked: [cube.up, cube.left, cube.down, cube.right],
    linkedDir: [DIR_TYPE.UP, DIR_TYPE.LEFT, DIR_TYPE.DOWN, DIR_TYPE.RIGHT],
  },
  U: {
    data: cube.up,
    linked: [cube.front, cube.left, cube.back, cube.right],
    linkedDir: [DIR_TYPE.UP, DIR_TYPE.UP, DIR_TYPE.UP, DIR_TYPE.UP],
  },
  D: {
    data: cube.down,
    linked: [cube.front, cube.right, cube.back, cube.left],
    linkedDir: [DIR_TYPE.DOWN, DIR_TYPE.DOWN, DIR_TYPE.DOWN, DIR_TYPE.DOWN],
  },
};

function splitString(str) {
  let strList = str.split("").map((v) => v.toUpperCase());
  for (let i = 0; i < strList.length; i++) {
    if (strList[i] === "'") strList[i - 1] += "'";
  }
  strList = strList.filter((char) => char !== "'");
  const newStrList = [];
  strList.forEach((v, idx) => {
    if (!isNaN(parseInt(v))) {
      const arr = new Array(v * 1 - 1).fill(strList[idx - 1]);
      newStrList.push(...arr);
    } else {
      newStrList.push(v);
    }
  });
  return newStrList;
}

function moveCube(cube, type) {
  type = MOVE_TYPE[type];
  let newArr = [];
  for (let i = 0; i < type.linked; i++) {
    const linkedArr = makeNewArr(type.linked[i]);
    newArr.push(linkedArr);
  }
}

function makeNewArr(cube, dir) {
  let newArr = [];
  if (dir.fixer === "column") {
    for (let i = 0; i < cube.length; i++) {
      newArr.push(cube[dir.fixIndex][i]);
    }
  } else {
    for (let i = 0; i < cube.length; i++) {
      newArr.push(cube[i][dir.fixIndex]);
    }
  }
  return newArr;
}
