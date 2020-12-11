class PlainCube {
  constructor(cube) {
    this.cube = cube;
    this.MOVE_TYPE = {
      U: { fixer: 'row', fixIndex: 0, reverse: true },
      "U'": { fixer: 'row', fixIndex: 0, reverse: false },
      R: { fixer: 'column', fixIndex: 2, reverse: true },
      "R'": { fixer: 'column', fixIndex: 2, reverse: false },
      L: { fixer: 'column', fixIndex: 0, reverse: false },
      "L'": { fixer: 'column', fixIndex: 0, reverse: true },
      B: { fixer: 'row', fixIndex: 2, reverse: false },
      "B'": { fixer: 'row', fixIndex: 2, reverse: true }
    };
  }
  playPlainCube(input, rl) {}
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
  splitString(str) {
    let strList = str.split('').map((v) => v.toUpperCase());
    for (let i = 0; i < strList.length; i++) {
      if (strList[i] === "'") strList[i - 1] += "'";
    }
    strList = strList.filter((char) => char !== "'");
    return strList;
  }
  moveCube(cube, type) {
    type = this.MOVE_TYPE[type];
    let newArr = this.makeNewArr(cube, type);
    newArr = this.moveIndex(newArr, type.reverse);
    this.setCubeData(cube, newArr, type);
  }
  makeNewArr(cube, dir) {
    let newArr = [];
    if (dir.fixer === 'row') {
      cube[dir.fixIndex].forEach((code) => newArr.push(code));
    } else {
      cube.forEach((cube) => newArr.push(cube[dir.fixIndex]));
    }
    return newArr;
  }
  setCubeData(cube, newCube, dir) {
    if (dir.fixer === 'row') {
      for (let i = 0; i < cube.length; i++) {
        cube[dir.fixIndex][i] = newCube[i];
      }
    } else {
      for (let i = 0; i < cube.length; i++) {
        cube[i][dir.fixIndex] = newCube[i];
      }
    }
  }
  printCube() {
    this.cube.forEach((line) => {
      const str = line.join(' ');
      console.log(str);
    });
    console.log();
  }
}

let cube = [
  ['R', 'R', 'W'],
  ['G', 'C', 'W'],
  ['G', 'B', 'B']
];

const plainCube = new PlainCube(cube);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'CUBE> '
});
plainCube.printCube();
rl.prompt();
rl.on('line', function (line) {
  try {
    const typeList = plainCube.splitString(line);
    typeList.forEach((type) => {
      if (type === 'Q') {
        console.log('Bye~');
        rl.close();
      }
      console.log(type);
      plainCube.moveCube(plainCube.cube, type);
      plainCube.printCube();
    });
  } catch (error) {
    console.log('잘못된 값을 입력했어요!');
  }
  rl.prompt();
}).on('close', function () {
  process.exit();
});
