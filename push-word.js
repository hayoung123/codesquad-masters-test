function moveChar(str, count, dir) {
  const strLen = str.length;
  if (count < 0) {
    dir = dir === "R" ? "L" : "R";
    count *= -1;
  }
  count = (count * 1) % strLen;
  if (dir === "L") count = strLen - count;

  let strList = str.split("");
  strList = moveList(strList, count);
  console.log(strList.join(""));
}
function moveOneIndex(arr) {
  const last = arr.pop();
  arr.unshift(last);
  return arr;
}
function moveList(arr, count) {
  let list = arr;
  for (let i = 0; i < count; i++) {
    list = moveOneIndex(list);
  }
  return list;
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [str, cnt, dir] = line.split(" ");
  moveChar(str, cnt, dir.toUpperCase());
  rl.close();
}).on("close", function () {
  process.exit();
});
