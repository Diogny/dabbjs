declare const c: any;
export { c as consts };
export declare const ts: (t: any) => string;
/**
 * it can be extended later to array [] and object {}
 * @param s any
 */
export declare const empty: (s: any) => boolean;
/**
 * returned values: array, date,	function, number, object, regexp, string, undefined  	global,	JSON, null
 * @param o any
 */
export declare const typeOf: (o: any) => string;
export declare const isFn: (f: any) => boolean;
/**
 * defined,	undefined === void 0
 * @param t any
 */
export declare const dfnd: (t: any) => boolean;
export declare const isStr: (s: any) => boolean;
/**
 * true for Array, pojo retruns true only for a plain old object {}
 * @param t any
 */
export declare const isObj: (t: any) => boolean;
export declare const isArr: (t: any) => boolean;
/**
 * @description returns true if n is number
 * @param n value
 *
 * - "1" returns false
 * - NaN returns true
 */
export declare const isNum: (n: any) => boolean;
/**
 * @description returns true if n is numeric
 * @param n
 *
 * - "1" returns true
 * - NaN returns false
 */
export declare const isNumeric: (n: any) => boolean;
export declare const isInt: (n: any) => boolean;
/**
 * @description parse a number according to a radix
 * @param s string value
 * @param radix convertion radix
 *
 * - "0101001" => 2		binary
 * - "0xFF"	=> 255 hexadecimal
 * - "123" => 123
 */
export declare const pInt: (s: string, radix?: number | undefined) => number;
/**
 * @description clamps a value inside a range min..max
 * @param v value
 * @param min minim
 * @param max maximum
 */
export declare const clamp: (v: number, min: number, max: number) => number;
/**
 * @description rounds a number to a decimal
 * @param v float value
 * @param decimals valid decimals
 *
 * - (123.5678, 1) => 123.6
 * - (123.5678, 0) => 124
 * - (123.5678, -1) => NaN
 */
export declare const round: (v: number, decimals: number) => number;
export declare const splat: <T>(o: any) => T[];
export declare const inherit: (parent: any, child: any) => void;
/**
 * plainObj   Plain Old JavaScript Object (POJO) {}
 * @param arg args
 */
export declare const pojo: (arg: any) => boolean;
/**
 * deep copy
 * @param o any
 */
export declare const obj: (o: any) => any;
/**
 * JSON stringify & parse cloner
 * @param o any
 */
export declare const clone: <T>(o: T) => T;
export declare const defEnum: (e: any) => any;
/**
 * @description defines a new object property
 * @param obj object
 * @param propName property name
 * @param attrs attributes
 */
export declare const dP: (obj: any, propName: string, attrs: object) => any;
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
export declare const toBool: (val: any) => boolean | undefined;
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
export declare const isBool: (val: any) => boolean;
/**
 * @description converts a value to boolean, and undefined are forced to boolean
 * @param val value
 * @param forcedUndefined forced undefined values, default is "false"
 */
export declare const fBool: (val: any, forcedUndefined?: boolean | undefined) => boolean;
/**
 * parses an string and returns an array of parsed number values
 * @param s string in the form "n0, n1, n2, n3, n(n)"
 * @param l amount of valid numbers to parse
 * @returns number array if valid, undefined otherwise
 */
export declare const parse: (s: string, l: number) => number[] | undefined;
