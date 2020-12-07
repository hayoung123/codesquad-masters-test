let testArr = [
  ["R", "R", "W"],
  ["G", "C", "W"],
  ["G", "B", "B"],
];

const MOVE_TYPE = {
  U: { fixer: "row", fixIndex: 0, moveCount: 2 },
  "U'": { fixer: "row", fixIndex: 0, moveCount: 1 },
  R: { fixer: "column", fixIndex: 2, moveCount: 2 },
  "R'": { fixer: "column", fixIndex: 2, moveCount: 1 },
  L: { fixer: "column", fixIndex: 0, moveCount: 1 },
  "L'": { fixer: "column", fixIndex: 0, moveCount: 2 },
  B: { fixer: "row", fixIndex: 2, moveCount: 1 },
  "B'": { fixer: "row", fixIndex: 2, moveCount: 2 },
};
//TODO : 줄바꿔서 출력하기
// CUBE> 작성하기
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const charList = splitString(line);
  charList.forEach((char) => {
    if (char === "Q") {
      console.log("Bye~");
      rl.close();
    }
    console.log(char);
    moveCube(testArr, char);
  });
}).on("close", function () {
  process.exit();
});

function splitString(str) {
  let strList = str.split("");
  for (let i = 0; i < strList.length; i++) {
    if (strList[i] === "'") strList[i - 1] += "'";
  }
  strList = strList.filter((char) => char !== "'");
  return strList;
}

function moveCube(cube, type) {
  type = MOVE_TYPE[type];
  let newArr = new Array(3);
  if (type.fixer === "column") {
    for (let i = 0; i < cube.length; i++) {
      newArr[(i + type.moveCount) % cube.length] = cube[i][type.fixIndex];
    }
    [
      cube[0][type.fixIndex],
      cube[1][type.fixIndex],
      cube[2][type.fixIndex],
    ] = newArr;
  } else {
    for (let i = 0; i < cube.length; i++) {
      newArr[(i + type.moveCount) % cube.length] = cube[type.fixIndex][i];
    }
    [
      cube[type.fixIndex][0],
      cube[type.fixIndex][1],
      cube[type.fixIndex][2],
    ] = newArr;
  }
  console.log(cube);
}

function init() {
  console.log(testArr);
}

init();
