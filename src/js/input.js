import { copyArray } from "./utils";

export function fx2(v) {
  let res = copyArray(v);
  res.push(Math.pow(v[0], 2));
  return res;
}

export function fy2(v) {
  let res = copyArray(v);
  res.push(Math.pow(v[1], 2));
  return res;
}
export function fx3(v) {
  let res = copyArray(v);
  res.push(Math.pow(v[0], 3));
  return res;
}

export function fy3(v) {
  let res = copyArray(v);
  res.push(Math.pow(v[1], 3));
  return res;
}

export function fx2y2(v) {
  let res = copyArray(v);
  res.push(Math.pow(v[0], 2) + Math.pow(v[1], 2));
  return res;
}

export function fx2_y2(v) {
  let res = copyArray(v);
  res.push(Math.pow(v[0], 2) - Math.pow(v[1], 2));
  return res;
}

export function fxy(v) {
  let res = copyArray(v);
  res.push(v[0] * v[1]);
  return res;
}

export function fsinx(v) {
  let res = copyArray(v);
  res.push(Math.sin(v[0]));
  return res;
}
export function fsiny(v) {
  let res = copyArray(v);
  res.push(Math.sin(v[1]));
  return res;
}
export function fcosx(v) {
  let res = copyArray(v);
  res.push(Math.cos(v[0]));
  return res;
}
export function fcosy(v) {
  let res = copyArray(v);
  res.push(Math.cos(v[1]));
  return res;
}
export function fsinxcosy(v) {
  let res = copyArray(v);
  res.push(Math.sin(v[0]) + Math.cos(v[1]));
  return res;
}
export function fsinycosx(v) {
  let res = copyArray(v);
  res.push(Math.sin(v[1]) + Math.cos(v[0]));
  return res;
}
export function fsinxcosydot(v) {
  let res = copyArray(v);
  res.push(Math.sin(v[0]) * Math.cos(v[1]));
  return res;
}
export function fsinycosxdot(v) {
  let res = copyArray(v);
  res.push(Math.sin(v[1]) * Math.cos(v[0]));
  return res;
}
