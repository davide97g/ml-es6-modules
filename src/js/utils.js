export function randf(a, b) {
  return Math.random() * (b - a) + a;
}

// generate random integer between a and b (b excluded)
export function randi(a, b) {
  return Math.floor(Math.random() * (b - a) + a);
}

// create vector of zeros of length n
export function zeros(n) {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = 0;
  }
  return arr;
}

//create a copy of the original array
export function copyArray(v) {
  let array = new Array(v.length);
  for (let i = 0; i < v.length; i++) {
    array[i] = v[i];
  }
  return array;
}

//create an array based on copy of the value passed from input
export function arrayWith(value, N) {
  let array = new Array(N);
  for (let i = 0; i < N; i++) {
    array[i] = value;
  }
  return array;
}

export function objectToArray(array) {
  let result = [];
  array.forEach(data => result.push([data.x, data.y]));
  return result;
}

export function arrayToObject(array) {
  let result = [];
  array.forEach(data => result.push({ x: data[0], y: data[1] }));
  return result;
}
