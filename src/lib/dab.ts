//still in progress...

const c: any = {
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

export { c as consts };

export const ts = (t: any) => ({}).toString.call(t);

/**
 * it can be extended later to array [] and object {}
 * @param s any
 */
export const empty = (s: any): boolean => typeof s == void 0 || !s || (isStr(s) && s.match(/^ *$/) !== null);

/**
 * returned values: array, date,	function, number, object, regexp, string, undefined  	global,	JSON, null
 * @param o any
 */
export const typeOf = (o: any) => ts(o).slice(8, -1).toLowerCase();

export const isFn = (f: any) => typeof f === c.fn;

/**
 * defined,	undefined === void 0
 * @param t any
 */
export const dfnd = (t: any) => t !== void 0 && t !== null;

export const isStr = (s: any) => typeof s === c.s;

/**
 * true for Array, pojo retruns true only for a plain old object {}
 * @param t any
 */
export const isObj = (t: any) => typeof t === c.o;

export const isArr = (t: any) => Array.isArray(t); // typeOf(t) === c.a;

/**
 * @description returns true if n is number
 * @param n value
 *
 * - "1" returns false
 * - NaN returns true
 */
export const isNum = (n: any) => typeof n === c.n;

/**
 * @description returns true if n is numeric
 * @param n
 *
 * - "1" returns true
 * - NaN returns false
 */
export const isNumeric = (n: any) => isNaN(n) ? !1 : (n = parseInt(n), (0 | n) === n);

//return (typeof x === dab.n) && (x % 1 === 0);
export const isInt = (n: any) => (parseFloat(n) == parseInt(n)) && !isNaN(n);
//http://speakingjs.com/es5/ch11.html#converting_to_integer

/**
 * @description parse a number according to a radix
 * @param s string value
 * @param radix convertion radix
 *
 * - "0101001" => 2		binary
 * - "0xFF"	=> 255 hexadecimal
 * - "123" => 123
 */
export const pInt = (s: string, radix?: number) => parseInt(s, radix);

/**
 * @description clamps a value inside a range min..max
 * @param v value
 * @param min minim
 * @param max maximum
 */
export const clamp = (v: number, min: number, max: number) => (v <= min) ? min : (v >= max) ? max : v;

/**
 * @description rounds a number to a decimal
 * @param v float value
 * @param decimals valid decimals
 *
 * - (123.5678, 1) => 123.6
 * - (123.5678, 0) => 124
 * - (123.5678, -1) => NaN
 */
export const round = (v: number, decimals: number) => {
  //https://expertcodeblog.wordpress.com/2018/02/12/typescript-javascript-round-number-by-decimal-pecision/
  return (decimals = decimals | 0, Number(Math.round(Number(v + "e" + decimals)) + "e-" + decimals));
} //force toArray

export const splat = <T>(o: any): T[] => isArr(o) ? o : (dfnd(o) ? [o] : []);

export const inherit = (parent: any, child: any) => {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

/**
 * plainObj   Plain Old JavaScript Object (POJO) {}
 * @param arg args
 */
export const pojo = (arg: any): boolean => {
  if (arg == null || typeof arg !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(arg);
  // Prototype may be null if you used `Object.create(null)`
  // Checking `proto`'s constructor is safe because `getPrototypeOf()`
  // explicitly crosses the boundary from object data to object metadata
  return !proto || proto.constructor.name === 'Object';
  //Object.getPrototypeOf([]).constructor.name == "Array"
  //Object.getPrototypeOf({}).constructor.name == "Object"
  //Object.getPrototypeOf(Object.create(null)) == null
}

/**
 * deep copy
 * @param o any
 */
export const obj = (o: any) => {
  if (!pojo(o)) {
    return o;
  }
  let
    result = Object.create(null);
  for (let k in o)
    if (!o.hasOwnProperty || o.hasOwnProperty(k)) {
      let
        prop = o[k];
      result[k] = pojo(prop) ? obj(prop) : prop;
    }
  return result;
}

/**
 * JSON stringify & parse cloner
 * @param o any
 */
export const clone = <T>(o: T): T => <T>JSON.parse(JSON.stringify(o));

export const defEnum = (e: any) => {
  for (let key in e) {			//let item = e[key];
    e[e[key]] = key;
  }
  return e;
}

/**
 * @description defines a new object property
 * @param obj object
 * @param propName property name
 * @param attrs attributes
 */
export const dP = (obj: any, propName: string, attrs: object) => Object.defineProperty(obj, propName, attrs);

var a = {
  'TRUE': true,
  'True': true,
  'true': true,
  '1': true,
  'FALSE': false,
  'False': false,
  'false': false,
  '0': false
};

/**
 * return true if value it's true or false, undefined if not valid
 * @param val any
 *
 * value can be:
 * - TRUE
 * - True
 * - true
 * - FALSE
 * - False
 * - false
 * - 1
 * - 0
 */
export const toBool = (val: any): boolean | undefined => (<any>a)[val];

/**
 * return true if value is a valid boolean
 * @param val any
 *
 * valid values are:
 * - TRUE
 * - True
 * - true
 * - FALSE
 * - False
 * - false
 * - 1
 * - 0
 */
export const isBool = (val: any): boolean => (<any>a)[val] != undefined;

/**
 * @description converts a value to boolean, and undefined are forced to boolean
 * @param val value
 * @param forcedUndefined forced undefined values, default is "false"
 */
export const fBool = (val: any, forcedUndefined?: boolean): boolean => (<any>a)[val] || !!forcedUndefined;

/**
 * parses an string and returns an array of parsed number values
 * @param s string in the form "n0, n1, n2, n3, n(n)"
 * @param l amount of valid numbers to parse
 * @returns number array if valid, undefined otherwise
 */
export const parse = (s: string, l: number): number[] | undefined => {
  let
    n: number,
    nans = false,
    numbers = s.split(',').map(str => (n = parseFloat(str), isNaN(n) && (nans = true), n));
  return (nans || numbers.length != l) ? void 0 : numbers
}
