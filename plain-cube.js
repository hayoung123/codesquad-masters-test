let cube = [
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
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
printArr(cube);
rl.setPrompt("CUBE> ");
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
    printArr(newCube);
  });
  rl.prompt();
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
  let newArr = new Array(cube.length);
  if (type.fixer === "column") {
    for (let i = 0; i < cube.length; i++) {
      newArr[(i + type.moveCount) % cube.length] = cube[i][type.fixIndex];
    }
    for (let i = 0; i < cube.length; i++) {
      cube[i][type.fixIndex] = newArr[i];
    }
  } else {
    for (let i = 0; i < cube.length; i++) {
      newArr[(i + type.moveCount) % cube.length] = cube[type.fixIndex][i];
    }
    for (let i = 0; i < cube.length; i++) {
      cube[type.fixIndex][i] = newArr[i];
    }
  }
  return cube;
}

function printArr(arr) {
  arr.forEach((line) => {
    const str = line.join(" ");
    console.log(str);
  });
  console.log();
}
