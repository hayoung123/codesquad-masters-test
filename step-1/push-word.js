const form = document.querySelector("#js-form");
const input = document.querySelector("#js-input");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const [str, cnt, dir] = input.value.split(" ");
  moveChar(str, cnt, dir.toUpperCase());
  input.value = "";
}
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
