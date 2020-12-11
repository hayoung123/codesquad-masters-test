function moveChar(str, count, dir) {
  const strLen = str.length;
  if (count < 0) {
    dir = dir === 'R' ? 'L' : 'R';
    count *= -1;
  }
  count = (count * 1) % strLen;
  if (dir === 'L') count = strLen - count;

  let strList = str.split('');
  strList = moveList(strList, count);
  console.log(strList.join(''));
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

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('문자열, 숫자, 방향을 공백으로 구분해 입력해주세요.');
console.log('ex) apple 3 R ');
rl.on('line', function (line) {
  try {
    const [str, cnt, dir] = line.split(' ');
    moveChar(str, cnt, dir.toUpperCase());
  } catch (error) {
    console.log('잘못된 형식으로 입력했습니다.');
  }
  rl.close();
}).on('close', function () {
  process.exit();
});
