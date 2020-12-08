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

function moveOneIndex(arr) {
  const last = arr.pop();
  arr.unshift(last);
  return arr;
}
function reverseOneIndex(arr) {
  const first = arr.shift();
  arr.push(first);
  return arr;
}
function moveIndex(arr, reverse) {
  if (!reverse) {
    return moveOneIndex(arr);
  } else {
    return reverseOneIndex(arr);
  }
}
function checkReverse(char) {
  if (char.split("").includes("'")) return true;
  return false;
}
function removeQuotes(char) {
  return char.replace("'", "");
}
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
  const reverse = checkReverse(type);
  type = removeQuotes(type);
  type = MOVE_TYPE[type];
  type.data = rotateCube(type.data, reverse);
  let newArr = [];
  for (let i = 0; i < type.linked.length; i++) {
    const linkedArr = makeNewArr(type.linked[i], type.linkedDir[i]);
    newArr.push(linkedArr);
  }
  newArr = moveIndex(newArr, reverse);
  for (let i = 0; i < type.linked.length; i++) {
    setCubeData(type.linked[i], newArr[i], type.linkedDir[i]);
  }
  return cube;
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

function setCubeData(cube, newCube, dir) {
  if (dir.fixer === "column") {
    for (let i = 0; i < cube.length; i++) {
      cube[dir.fixIndex][i] = newCube[i];
    }
  } else {
    for (let i = 0; i < cube.length; i++) {
      cube[i][dir.fixIndex] = newCube[i];
    }
  }
}
function rotateCube(cube, reverse) {
  let arr = cube;
  if (reverse) {
    arr = reverseRotate(arr);
  } else {
    arr = rotate(arr);
  }
  return arr;
}

function rotate(cube) {
  let arr = cube;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
    }
  }
  arr.forEach((row) => row.reverse());
  return arr;
}
function reverseRotate(cube) {
  let arr = cube;
  arr.forEach((row) => row.reverse());
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
    }
  }
  return arr;
}

function printCube(cube) {
  //up/ left,front,right,back / down
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "CUBE> ",
});
console.dir(cube, { depth: null });
rl.prompt();
rl.on("line", function (line) {
  const typeList = splitString(line);
  typeList.forEach((type) => {
    if (type === "Q") {
      console.log("Bye~");
      rl.close();
    }
    console.log(type);
    const newCube = moveCube(cube, type);
    console.dir(newCube, { depth: null });
  });
  rl.prompt();
}).on("close", function () {
  process.exit();
});
