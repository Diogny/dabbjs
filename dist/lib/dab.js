const c = {
  s: "string",
  o: "object",
  b: "boolean",
  i: "integer",
  n: "number",
  a: "array",
  fn: "function",
  sp: "super",
  c: "color",
  t: "type",
  d: "defaut",
  u: "undefined",
  v: "value",
  svgNs: "http://www.w3.org/2000/svg"
};
const ts = (t) => ({}).toString.call(t);
const empty = (s) => typeof s == void 0 || !s || isStr(s) && s.match(/^ *$/) !== null;
const typeOf = (o) => ts(o).slice(8, -1).toLowerCase();
const isFn = (f) => typeof f === c.fn;
const dfnd = (t) => t !== void 0 && t !== null;
const isStr = (s) => typeof s === c.s;
const isObj = (t) => typeof t === c.o;
const isArr = (t) => Array.isArray(t);
const isNum = (n) => typeof n === c.n;
const isNumeric = (n) => isNaN(n) ? false : (n = parseInt(n), (0 | n) === n);
const isInt = (n) => parseFloat(n) == parseInt(n) && !isNaN(n);
const pInt = (s, radix) => parseInt(s, radix);
const clamp = (v, min, max) => v <= min ? min : v >= max ? max : v;
const round = (v, decimals) => {
  return decimals = decimals | 0, Number(Math.round(Number(v + "e" + decimals)) + "e-" + decimals);
};
const splat = (o) => isArr(o) ? o : dfnd(o) ? [o] : [];
const extend = (obj2, src) => {
  pojo(src) && Object.keys(src).forEach((key) => {
    obj2[key] = src[key];
  });
  return obj2;
};
const copy = (obj2, src) => {
  pojo(src) && Object.keys(obj2).forEach((key) => {
    let k = src[key];
    dfnd(k) && (obj2[key] = k);
  });
  return obj2;
};
const inherit = (parent, child) => {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
};
const isDOM = (e) => e instanceof window.HTMLElement || e instanceof window.HTMLDocument;
const pojo = (arg) => {
  if (arg == null || typeof arg !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(arg);
  return !proto || proto.constructor.name === "Object";
};
const obj = (o) => {
  if (!pojo(o)) {
    return o;
  }
  let result = Object.create(null);
  for (let k in o)
    if (!o.hasOwnProperty || o.hasOwnProperty(k)) {
      let prop = o[k];
      result[k] = pojo(prop) ? obj(prop) : prop;
    }
  return result;
};
const clone = (o) => JSON.parse(JSON.stringify(o));
const defEnum = (e) => {
  for (let key in e) {
    e[e[key]] = key;
  }
  return e;
};
const css = (el, styles) => {
  if (isStr(styles))
    return el.style[styles];
  else {
    Object.assign(el.style, styles);
    return el;
  }
};
const attr = function(el, attrs) {
  if (isStr(attrs))
    return el.getAttribute(attrs);
  for (let attr2 in attrs)
    el.setAttribute(attr2, attrs[attr2]);
  return el;
};
const aEL = (el, type, fn, b) => el.addEventListener(type, fn, b);
const rEL = (el, type, fn, b) => el.removeEventListener(type, fn, b);
const daEl = (type, fn, b) => document.addEventListener(type, fn, b);
const drEL = (type, fn, b) => document.removeEventListener(type, fn, b);
const dP = (obj2, propName, attrs) => Object.defineProperty(obj2, propName, attrs);
const aChld = (parent, child) => parent.appendChild(child);
const hCl = (el, className) => el.classList.contains(className);
const aCl = (el, className) => el.classList.add(className);
const rCl = (el, className) => el.classList.remove(className);
const tCl = (el, className, force) => el.classList.toggle(className, force);
const range = (s, e) => Array.from("x".repeat(e - s), (_, i) => s + i);
const unique = (x) => x.filter((elem, index) => x.indexOf(elem) === index);
const union = (x, y) => unique(x.concat(y));
const aClx = (el, className) => {
  el.classList.add(...(className || "").split(" ").filter((v) => !empty(v)));
  return el;
};
const selectMany = (input, selectListFn) => input.reduce((out, inx) => {
  out.push(...selectListFn(inx));
  return out;
}, new Array());
var a = {
  "TRUE": true,
  "True": true,
  "true": true,
  "1": true,
  "FALSE": false,
  "False": false,
  "false": false,
  "0": false
};
const toBool = (val) => a[val];
const isBool = (val) => a[val] != void 0;
const fBool = (val, forcedUndefined) => a[val] || !!forcedUndefined;
const parse = (s, l) => {
  let n, nans = false, numbers = s.split(",").map((str) => (n = parseFloat(str), isNaN(n) && (nans = true), n));
  return nans || numbers.length != l ? void 0 : numbers;
};

export { aChld, aCl, aClx, aEL, attr, clamp, clone, c as consts, copy, css, dP, daEl, defEnum, dfnd, drEL, empty, extend, fBool, hCl, inherit, isArr, isBool, isDOM, isFn, isInt, isNum, isNumeric, isObj, isStr, obj, pInt, parse, pojo, rCl, rEL, range, round, selectMany, splat, tCl, toBool, ts, typeOf, union, unique };
