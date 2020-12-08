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

function moveChar(str, count, dir) {
  const strLen = str.length;
  if (count < 0) {
    dir = dir === "R" ? "L" : "R";
    count *= -1;
  }
  if (dir === "L") count = strLen - (count % strLen);
  else count = (count * 1) % strLen;
  let strList = str.split("");
  for (let i = 0; i < count; i++) {
    strList = moveOneIndex(strList);
  }
  console.log(strList.join(""));
}
function moveOneIndex(arr) {
  const last = arr.pop();
  arr.unshift(last);
  return arr;
}
