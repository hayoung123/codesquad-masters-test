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
    linkedDir: [DIR_TYPE.RIGHT, DIR_TYPE.LEFT, DIR_TYPE.RIGHT, DIR_TYPE.RIGHT],
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

class RubiksCube {
  constructor(cube, dirType, moveType) {
    (this.cube = cube), (this.dirType = dirType), (this.moveType = moveType);
  }
  splitString(str) {
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
  moveOneIndex(arr) {
    const last = arr.pop();
    arr.unshift(last);
    return arr;
  }
  reverseOneIndex(arr) {
    const first = arr.shift();
    arr.push(first);
    return arr;
  }
  moveIndex(arr, reverse) {
    if (reverse) {
      return this.reverseOneIndex(arr);
    } else {
      return this.moveOneIndex(arr);
    }
  }
  checkReverse(char) {
    if (char.split("").includes("'")) return true;
    return false;
  }
  removeQuotes(char) {
    return char.replace("'", "");
  }
  moveCube(type) {
    const reverse = this.checkReverse(type);
    type = this.removeQuotes(type);
    type = this.moveType[type];
    type.data = this.rotateCube(type.data, reverse);
    let newArr = [];
    type.linked.forEach((cube, idx) => {
      const linkedArr = this.makeNewArr(cube, type.linkedDir[idx]);
      newArr.push(linkedArr);
    });
    newArr = this.moveIndex(newArr, reverse);
    type.linked.forEach((cube, idx) =>
      this.setCubeData(cube, newArr[idx], type.linkedDir[idx])
    );
  }
  makeNewArr(cube, dir) {
    let newArr = [];
    if (dir.fixer === "row") {
      cube[dir.fixIndex].forEach((code) => newArr.push(code));
    } else {
      cube.forEach((cube) => newArr.push(cube[dir.fixIndex]));
    }
    return newArr;
  }
  setCubeData(cube, newCube, dir) {
    if (dir.fixer === "row") {
      for (let i = 0; i < cube.length; i++) {
        cube[dir.fixIndex][i] = newCube[i];
      }
    } else {
      for (let i = 0; i < cube.length; i++) {
        cube[i][dir.fixIndex] = newCube[i];
      }
    }
  }
  rotateCube(cube, reverse) {
    let arr = cube;
    if (reverse) {
      arr = this.reverseRotate(arr);
    } else {
      arr = this.rotate(arr);
    }
    return arr;
  }
  rotate(cube) {
    let arr = cube;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
      }
    }
    arr.forEach((row) => row.reverse());
    return arr;
  }
  reverseRotate(cube) {
    let arr = cube;
    arr.forEach((row) => row.reverse());
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
      }
    }
    return arr;
  }
  printCube(cube) {
    cube.forEach((line) => {
      const str = line.join(" ");
      console.log("\t", str);
    });
    console.log();
  }
  printView() {
    this.printCube(this.cube.up);
    for (let i = 0; i < 3; i++) {
      const strLeft = this.cube.left[i].join(" ");
      const strFront = this.cube.front[i].join(" ");
      const strRight = this.cube.right[i].join(" ");
      const strBack = this.cube.back[i].join(" ");
      console.log(`${strLeft}\t${strFront}\t${strRight}\t${strBack}`);
    }
    console.log();
    this.printCube(this.cube.down);
  }
}

const rubiksCube = new RubiksCube(cube, DIR_TYPE, MOVE_TYPE);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "CUBE> ",
});
rubiksCube.printView();
rl.prompt();
rl.on("line", function (line) {
  const typeList = rubiksCube.splitString(line);
  typeList.forEach((type) => {
    if (type === "Q") {
      console.log("Bye~");
      rl.close();
    }
    console.log(type);
    rubiksCube.moveCube(type);
    rubiksCube.printView();
  });
  rl.prompt();
}).on("close", function () {
  process.exit();
});
