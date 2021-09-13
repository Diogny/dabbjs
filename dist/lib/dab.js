"use strict";
//still in progress...
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.fBool = exports.isBool = exports.toBool = exports.dP = exports.defEnum = exports.clone = exports.obj = exports.pojo = exports.inherit = exports.splat = exports.round = exports.clamp = exports.pInt = exports.isInt = exports.isNumeric = exports.isNum = exports.isArr = exports.isObj = exports.isStr = exports.dfnd = exports.isFn = exports.typeOf = exports.empty = exports.ts = exports.consts = void 0;
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
exports.consts = c;
const ts = (t) => ({}).toString.call(t);
exports.ts = ts;
/**
 * it can be extended later to array [] and object {}
 * @param s any
 */
const empty = (s) => typeof s == void 0 || !s || ((0, exports.isStr)(s) && s.match(/^ *$/) !== null);
exports.empty = empty;
/**
 * returned values: array, date,	function, number, object, regexp, string, undefined  	global,	JSON, null
 * @param o any
 */
const typeOf = (o) => (0, exports.ts)(o).slice(8, -1).toLowerCase();
exports.typeOf = typeOf;
const isFn = (f) => typeof f === c.fn;
exports.isFn = isFn;
/**
 * defined,	undefined === void 0
 * @param t any
 */
const dfnd = (t) => t !== void 0 && t !== null;
exports.dfnd = dfnd;
const isStr = (s) => typeof s === c.s;
exports.isStr = isStr;
/**
 * true for Array, pojo retruns true only for a plain old object {}
 * @param t any
 */
const isObj = (t) => typeof t === c.o;
exports.isObj = isObj;
const isArr = (t) => Array.isArray(t); // typeOf(t) === c.a;
exports.isArr = isArr;
/**
 * @description returns true if n is number
 * @param n value
 *
 * - "1" returns false
 * - NaN returns true
 */
const isNum = (n) => typeof n === c.n;
exports.isNum = isNum;
/**
 * @description returns true if n is numeric
 * @param n
 *
 * - "1" returns true
 * - NaN returns false
 */
const isNumeric = (n) => isNaN(n) ? !1 : (n = parseInt(n), (0 | n) === n);
exports.isNumeric = isNumeric;
//return (typeof x === dab.n) && (x % 1 === 0);
const isInt = (n) => (parseFloat(n) == parseInt(n)) && !isNaN(n);
exports.isInt = isInt;
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
const pInt = (s, radix) => parseInt(s, radix);
exports.pInt = pInt;
/**
 * @description clamps a value inside a range min..max
 * @param v value
 * @param min minim
 * @param max maximum
 */
const clamp = (v, min, max) => (v <= min) ? min : (v >= max) ? max : v;
exports.clamp = clamp;
/**
 * @description rounds a number to a decimal
 * @param v float value
 * @param decimals valid decimals
 *
 * - (123.5678, 1) => 123.6
 * - (123.5678, 0) => 124
 * - (123.5678, -1) => NaN
 */
const round = (v, decimals) => {
    //https://expertcodeblog.wordpress.com/2018/02/12/typescript-javascript-round-number-by-decimal-pecision/
    return (decimals = decimals | 0, Number(Math.round(Number(v + "e" + decimals)) + "e-" + decimals));
}; //force toArray
exports.round = round;
const splat = (o) => (0, exports.isArr)(o) ? o : ((0, exports.dfnd)(o) ? [o] : []);
exports.splat = splat;
const inherit = (parent, child) => {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};
exports.inherit = inherit;
/**
 * plainObj   Plain Old JavaScript Object (POJO) {}
 * @param arg args
 */
const pojo = (arg) => {
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
};
exports.pojo = pojo;
/**
 * deep copy
 * @param o any
 */
const obj = (o) => {
    if (!(0, exports.pojo)(o)) {
        return o;
    }
    let result = Object.create(null);
    for (let k in o)
        if (!o.hasOwnProperty || o.hasOwnProperty(k)) {
            let prop = o[k];
            result[k] = (0, exports.pojo)(prop) ? (0, exports.obj)(prop) : prop;
        }
    return result;
};
exports.obj = obj;
/**
 * JSON stringify & parse cloner
 * @param o any
 */
const clone = (o) => JSON.parse(JSON.stringify(o));
exports.clone = clone;
const defEnum = (e) => {
    for (let key in e) { //let item = e[key];
        e[e[key]] = key;
    }
    return e;
};
exports.defEnum = defEnum;
/**
 * @description defines a new object property
 * @param obj object
 * @param propName property name
 * @param attrs attributes
 */
const dP = (obj, propName, attrs) => Object.defineProperty(obj, propName, attrs);
exports.dP = dP;
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
const toBool = (val) => a[val];
exports.toBool = toBool;
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
const isBool = (val) => a[val] != undefined;
exports.isBool = isBool;
/**
 * @description converts a value to boolean, and undefined are forced to boolean
 * @param val value
 * @param forcedUndefined forced undefined values, default is "false"
 */
const fBool = (val, forcedUndefined) => a[val] || !!forcedUndefined;
exports.fBool = fBool;
/**
 * parses an string and returns an array of parsed number values
 * @param s string in the form "n0, n1, n2, n3, n(n)"
 * @param l amount of valid numbers to parse
 * @returns number array if valid, undefined otherwise
 */
const parse = (s, l) => {
    let n, nans = false, numbers = s.split(',').map(str => (n = parseFloat(str), isNaN(n) && (nans = true), n));
    return (nans || numbers.length != l) ? void 0 : numbers;
};
exports.parse = parse;
//# sourceMappingURL=dab.js.map