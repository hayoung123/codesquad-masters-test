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
  console.log(newStrList);
  return strList;
}
