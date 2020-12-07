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
  else count *= 1;
  const arr = new Array(strLen);
  str.split("").forEach((char, idx) => {
    arr[(idx + count) % strLen] = char;
  });
  console.log(arr.join(""));
}
