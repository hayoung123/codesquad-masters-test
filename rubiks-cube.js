class RubiksCube {
  constructor({ cube }) {
    this.cube = cube;
    this.DIR_TYPE = {
      UP: { fixer: 'row', fixIndex: 0 },
      DOWN: { fixer: 'row', fixIndex: 2 },
      LEFT: { fixer: 'column', fixIndex: 0 },
      RIGHT: { fixer: 'column', fixIndex: 2 }
    };
    this.MOVE_TYPE = {
      F: {
        data: this.cube.front,
        linked: [
          { plainCube: this.cube.up, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.right, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.down, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.left, direction: this.DIR_TYPE.RIGHT }
        ]
      },
      R: {
        data: this.cube.right,
        linked: [
          { plainCube: this.cube.up, direction: this.DIR_TYPE.RIGHT },
          { plainCube: this.cube.back, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.down, direction: this.DIR_TYPE.RIGHT },
          { plainCube: this.cube.front, direction: this.DIR_TYPE.RIGHT }
        ]
      },
      L: {
        data: this.cube.left,
        linked: [
          { plainCube: this.cube.up, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.front, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.down, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.back, direction: this.DIR_TYPE.RIGHT }
        ]
      },
      B: {
        data: this.cube.back,
        linked: [
          { plainCube: this.cube.up, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.left, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.down, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.right, direction: this.DIR_TYPE.RIGHT }
        ]
      },
      U: {
        data: this.cube.up,
        linked: [
          { plainCube: this.cube.front, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.left, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.back, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.right, direction: this.DIR_TYPE.UP }
        ]
      },
      D: {
        data: this.cube.down,
        linked: [
          { plainCube: this.cube.front, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.right, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.back, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.left, direction: this.DIR_TYPE.DOWN }
        ]
      }
    };
    this.count = 0;
  }
  //입력 문자열 tokenize
  splitString(str) {
    let strList = str.split('').map((char) => char.toUpperCase());
    for (let i = 0; i < strList.length; i++) {
      if (strList[i] === "'") strList[i - 1] += "'";
    }
    strList = strList.filter((char) => char !== "'");
    const newStrList = [];
    strList.forEach((char, idx) => {
      if (!isNaN(parseInt(char))) {
        const arr = new Array(char * 1 - 1).fill(strList[idx - 1]);
        newStrList.push(...arr);
      } else {
        newStrList.push(char);
      }
    });
    return newStrList;
  }
  //입력에 따라 큐브를 변경
  moveCube(type) {
    const reverse = this.checkReverse(type);
    type = this.removeQuotes(type);
    type = this.MOVE_TYPE[type];
    type.data = this.rotateCube(type.data, reverse);
    let newLinkedArr = this.makeLinkedArr(type);
    newLinkedArr = this.moveIndex(newLinkedArr, reverse);
    this.setLinkedData(type, newLinkedArr);
    this.count++;
  }
  // type에 따라 배열을 이동
  moveIndex(arr, reverse) {
    if (reverse) return this.reverseOneIndex(arr);
    else return this.moveOneIndex(arr);
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
  // Quote를 체크해 reverse 판별
  checkReverse(char) {
    if (char.split('').includes("'")) return true;
    return false;
  }
  removeQuotes(char) {
    return char.replace("'", '');
  }
  //type에 맞는 linked된 큐브 배열 만들기
  makeLinkedArr(type) {
    let newArr = [];
    type.linked.forEach((cube) => {
      const linkedArr = this.makeNewArr(cube.plainCube, cube.direction);
      newArr.push(linkedArr);
    });
    return newArr;
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
  //기존 큐브에 업데이트된 linked 배열 값을 저장
  setLinkedData(type, newLinkedArr) {
    type.linked.forEach((cube, idx) =>
      this.setCubeData(cube.plainCube, newLinkedArr[idx], cube.direction)
    );
  }
  setCubeData(cube, newCube, dir) {
    if (dir.fixer === 'row') {
      for (let column = 0; column < cube.length; column++) {
        cube[dir.fixIndex][column] = newCube[column];
      }
    } else {
      for (let row = 0; row < cube.length; row++) {
        cube[row][dir.fixIndex] = newCube[row];
      }
    }
  }
  //type에 따라서 90,-90도로 회전
  rotateCube(cube, reverse) {
    if (reverse) return this.reverseRotate(cube);
    else return this.rotate(cube);
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
  //평면 큐브로 출력
  printCube(cube) {
    cube.forEach((row) => {
      const str = row.join(' ');
      console.log('\t', str);
    });
    console.log();
  }
  //전개도로 출력
  printView() {
    this.printCube(this.cube.up);
    for (let row = 0; row < 3; row++) {
      const strLeft = this.cube.left[row].join(' ');
      const strFront = this.cube.front[row].join(' ');
      const strRight = this.cube.right[row].join(' ');
      const strBack = this.cube.back[row].join(' ');
      console.log(`${strLeft}\t${strFront}\t${strRight}\t${strBack}`);
    }
    console.log();
    this.printCube(this.cube.down);
  }
  printEndComment() {
    console.log(`조작갯수: ${this.count}`);
    console.log('이용해주셔서 감사합니다. 뚜룻뚜룻뚜~');
  }
}
class Timer {
  constructor() {
    this.start = new Date();
    this.timer = 0;
  }
  checkTime() {
    this.timer = new Date() - this.start;
    let seconds = Math.floor((this.timer / 1000) % 60);
    let minutes = Math.floor(this.timer / 1000 / 60);
    seconds = seconds < 10 ? '0' + seconds : seconds + '';
    minutes = minutes < 10 ? '0' + minutes : minutes + '';
    console.log(`경과시간 : ${minutes}:${seconds}`);
  }
}

class CubeGame {
  constructor({ rubiksCube, timer }) {
    this.rubiksCube = rubiksCube;
    this.cube = rubiksCube.cube;
    this.timer = timer;
    this.moveType = rubiksCube.MOVE_TYPE;
    this.answer = JSON.stringify(this.cube);
  }
  //게임스타트!
  playCubeGame(input, rl) {
    try {
      this.commandCube(input, rl);
    } catch (error) {
      console.log('제대로 된 값을 입력해주세요');
    }
    rl.prompt();
  }
  //입력값에 따라서 큐브를 처리
  commandCube(input, rl) {
    if (input === 'mix') {
      this.shuffleCube();
      this.rubiksCube.printView();
    } else {
      const typeList = rubiksCube.splitString(input);
      typeList.forEach((type) => {
        if (type === 'Q') this.gameOver(rl);
        console.log(type);
        this.rubiksCube.moveCube(type);
        this.rubiksCube.printView();
        if (this.checkAnswer()) this.gameOver(rl);
      });
    }
  }
  getRandomString() {
    let randomString = '';
    Object.keys(this.moveType).forEach((type) => {
      randomString += type;
      randomString += Math.ceil(Math.random() * 4);
    });
    return randomString;
  }
  //큐브 무작위 섞기
  shuffleCube() {
    const randomString = this.getRandomString();
    const count = rubiksCube.count;
    const typeList = rubiksCube.splitString(randomString);
    typeList.forEach((type) => rubiksCube.moveCube(type));
    rubiksCube.count = count;
  }
  //정답체크
  checkAnswer() {
    const stringCube = JSON.stringify(this.cube);
    if (stringCube === this.answer) {
      console.log('ARE YOU GENIUS???');
      console.log('정답입니다~~!!!');
      return true;
    }
  }
  gameOver(rl) {
    this.timer.checkTime();
    this.rubiksCube.printEndComment();
    rl.close();
  }
}

let cube = {
  up: Array.from(Array(3), () => new Array(3).fill('B')),
  down: Array.from(Array(3), () => new Array(3).fill('R')),
  front: Array.from(Array(3), () => new Array(3).fill('O')),
  right: Array.from(Array(3), () => new Array(3).fill('G')),
  left: Array.from(Array(3), () => new Array(3).fill('W')),
  back: Array.from(Array(3), () => new Array(3).fill('Y'))
};

const rubiksCube = new RubiksCube({ cube });
const timer = new Timer();
const cubeGame = new CubeGame({ rubiksCube, timer });

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'CUBE> '
});
console.log('섞고 싶으면 "mix"를 입력해주세요');
rubiksCube.printView();
rl.prompt();
rl.on('line', function (line) {
  cubeGame.playCubeGame(line, rl);
}).on('close', function () {
  process.exit();
});
