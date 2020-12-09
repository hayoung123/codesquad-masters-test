class RubiksCube {
  constructor({ cube }) {
    this.cube = cube;
    this.DIR_TYPE = {
      UP: { fixer: "row", fixIndex: 0 },
      DOWN: { fixer: "row", fixIndex: 2 },
      LEFT: { fixer: "column", fixIndex: 0 },
      RIGHT: { fixer: "column", fixIndex: 2 },
    };
    //prettier-ignore
    this.MOVE_TYPE = {
      F: {
        data: this.cube.front,
        linked: [this.cube.up, this.cube.right, this.cube.down, this.cube.left],
        linkedDir: [this.DIR_TYPE.DOWN, this.DIR_TYPE.LEFT, this.DIR_TYPE.UP, this.DIR_TYPE.RIGHT],
      },
      R: {
        data: this.cube.right,
        linked: [this.cube.up, this.cube.back, this.cube.down, this.cube.front],
        linkedDir: [this.DIR_TYPE.RIGHT,this.DIR_TYPE.LEFT,this.DIR_TYPE.RIGHT,this.DIR_TYPE.RIGHT,],
      },
      L: {
        data: this.cube.left,
        linked: [this.cube.up, this.cube.front, this.cube.down, this.cube.back],
        linkedDir: [this.DIR_TYPE.LEFT,this.DIR_TYPE.LEFT,this.DIR_TYPE.LEFT,this.DIR_TYPE.RIGHT,],
      },
      B: {
        data: this.cube.back,
        linked: [this.cube.up, this.cube.left, this.cube.down, this.cube.right],
        linkedDir: [this.DIR_TYPE.UP, this.DIR_TYPE.LEFT, this.DIR_TYPE.DOWN, this.DIR_TYPE.RIGHT],
      },
      U: {
        data: this.cube.up,
        linked: [this.cube.front, this.cube.left, this.cube.back, this.cube.right],
        linkedDir: [this.DIR_TYPE.UP, this.DIR_TYPE.UP, this.DIR_TYPE.UP, this.DIR_TYPE.UP],
      },
      D: {
        data: this.cube.down,
        linked: [this.cube.front, this.cube.right, this.cube.back, this.cube.left],
        linkedDir: [this.DIR_TYPE.DOWN, this.DIR_TYPE.DOWN, this.DIR_TYPE.DOWN, this.DIR_TYPE.DOWN],
      },
    };
    this.count = 0;
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
    if (reverse) return this.reverseOneIndex(arr);
    else return this.moveOneIndex(arr);
  }
  checkReverse(char) {
    if (char.split("").includes("'")) return true;
    return false;
  }
  removeQuotes(char) {
    return char.replace("'", "");
  }
  moveCube(type) {
    this.count++;
    const reverse = this.checkReverse(type);
    type = this.removeQuotes(type);
    type = this.MOVE_TYPE[type];
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
  printEndComment() {
    console.log(`조작갯수: ${this.count}`);
    console.log("이용해주셔서 감사합니다. 뚜룻뚜룻뚜~");
  }
}
class Timer {
  constructor() {
    this.start = new Date();
    this.timer = 0;
  }
  checkTime() {
    this.timer = new Date() - this.start;
    let seconds = Math.floor(this.timer / 1000);
    seconds = this.addZero(seconds);
    let minutes = Math.floor(seconds / 60);
    minutes = this.addZero(minutes);
    console.log(`경과시간 : ${minutes}:${seconds}`);
  }
  addZero(num) {
    if (num === 0) return "00";
    else if (num < 10) return `0${num}`;
    else return num;
  }
}

class CubeGame {
  constructor({ rubiksCube }) {
    this.cube = rubiksCube.cube;
    this.moveType = rubiksCube.moveType;
    this.answer = JSON.stringify(this.cube);
  }
  getRandomString() {
    let randomString = "";
    Object.keys(this.moveType).forEach((type) => {
      randomString += type;
      randomString += Math.ceil(Math.random() * 4);
    });
    return randomString;
  }
  randomCube() {
    const randomString = this.getRandomString();
    const typeList = rubiksCube.splitString(randomString);
    console.log(typeList);
    typeList.forEach((type) => rubiksCube.moveCube(type));
    console.log(this.cube);
  }
  checkAnswer() {
    const stringCube = JSON.stringify(this.cube);
    if (stringCube === this.answer) {
      console.log("정답입니다!");
    }
  }
}

let cube = {
  up: Array.from(Array(3), () => new Array(3).fill("B")),
  down: Array.from(Array(3), () => new Array(3).fill("R")),
  front: Array.from(Array(3), () => new Array(3).fill("O")),
  right: Array.from(Array(3), () => new Array(3).fill("G")),
  left: Array.from(Array(3), () => new Array(3).fill("W")),
  back: Array.from(Array(3), () => new Array(3).fill("Y")),
};

const rubiksCube = new RubiksCube({ cube });
const cubeGame = new CubeGame({ rubiksCube });
// cubeGame.randomCube();

const timer = new Timer();
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
    if (type === "Q" || cubeGame.checkAnswer()) {
      timer.checkTime();
      rubiksCube.printEndComment();
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
