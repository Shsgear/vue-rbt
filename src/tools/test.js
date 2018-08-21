function f ({ x, y = 4 }) {
  let sum = x + y;
  console.log(sum);
  return sum;
}

let a = () => f({ x: 1, y: 2 })
