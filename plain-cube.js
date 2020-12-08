const MOVE_TYPE = {
  U: { fixer: "row", fixIndex: 0, reverse: true },
  "U'": { fixer: "row", fixIndex: 0, reverse: false },
  R: { fixer: "column", fixIndex: 2, reverse: true },
  "R'": { fixer: "column", fixIndex: 2, reverse: false },
  L: { fixer: "column", fixIndex: 0, reverse: false },
  "L'": { fixer: "column", fixIndex: 0, reverse: true },
  B: { fixer: "row", fixIndex: 2, reverse: false },
  "B'": { fixer: "row", fixIndex: 2, reverse: true },
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

function splitString(str) {
  let strList = str.split("").map((v) => v.toUpperCase());
  for (let i = 0; i < strList.length; i++) {
    if (strList[i] === "'") strList[i - 1] += "'";
  }
  strList = strList.filter((char) => char !== "'");
  return strList;
}

function moveCube(cube, type) {
  type = MOVE_TYPE[type];
  let newArr = [];
  if (type.fixer === "column") {
    for (let i = 0; i < cube.length; i++) {
      newArr.push(cube[i][type.fixIndex]);
    }
    newArr = moveIndex(newArr, type.reverse);
    for (let i = 0; i < cube.length; i++) {
      cube[i][type.fixIndex] = newArr[i];
    }
  } else {
    for (let i = 0; i < cube.length; i++) {
      newArr.push(cube[type.fixIndex][i]);
    }
    newArr = moveIndex(newArr, type.reverse);
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

let cube = [
  ["R", "R", "W"],
  ["G", "C", "W"],
  ["G", "B", "B"],
];

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "CUBE> ",
});
printArr(cube);
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
