const cube = {
  up: {
    data: Array.from(Array(3), () => new Array(3).fill('B')),
    linked: [this.front, cube.right, cube.back, cube.left]
  },
  down: { data: Array.from(Array(3), () => new Array(3).fill('R')) },
  front: { data: Array.from(Array(3), () => new Array(3).fill('O')) },
  right: { data: Array.from(Array(3), () => new Array(3).fill('G')) },
  left: { data: Array.from(Array(3), () => new Array(3).fill('W')) },
  back: { data: Array.from(Array(3), () => new Array(3).fill('Y')) }
};

function splitString(str) {
  let strList = str.split('').map((v) => v.toUpperCase());
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

console.dir(cube, { depth: null });
