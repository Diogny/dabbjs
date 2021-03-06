declare const c: any;
export { c as consts };
export declare const ts: (t: any) => any;
/**
 * it can be extended later to array [] and object {}
 * @param s any
 */
export declare const empty: (s: any) => boolean;
/**
 * returned values: array, date,	function, number, object, regexp, string, undefined  	global,	JSON, null
 * @param o any
 */
export declare const typeOf: (o: any) => any;
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
/**
 * copy all properties in src to obj, and returns obj
 * @param obj dest object
 * @param src source object
 */
export declare const extend: (obj: {
    [id: string]: any;
}, src: {
    [id: string]: any;
}) => {
    [id: string]: any;
};
/**
 * copy properties in src that exists only in obj, and returns obj
 * @param obj dest and template object
 * @param src source object
 */
export declare const copy: (obj: {
    [id: string]: any;
}, src: {
    [id: string]: any;
}) => {
    [id: string]: any;
};
export declare const inherit: (parent: any, child: any) => void;
/**
 * @description returns true if an element if an HTML or SVG DOM element
 * @param e {any} an element
 */
export declare const isDOM: (e: any) => boolean;
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
 * css(el, { background: 'green', display: 'none', 'border-radius': '5px' });
 * @param el HTMLElement
 * @param styles object of styles
 */
export declare const css: (el: HTMLElement, styles: string | {
    [id: string]: any;
}) => any;
/**
 * @description get/set html element attribute
 * @param el HTML element
 * @param attrs string to get it's attribute, or an object with attributes to set
 */
export declare const attr: (el: HTMLElement, attrs: string | {
    [id: string]: any;
}) => string | HTMLElement | null;
/**
 * @description adds an event listener to an element
 * @param el element
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
export declare const aEL: (el: HTMLElement, type: string, fn: Function, b?: boolean | AddEventListenerOptions | undefined) => void;
/**
 * @description removes an event listener from an element
 * @param el element
 * @param type event name
 * @param fn
 * @param b
 */
export declare const rEL: (el: HTMLElement, type: string, fn: Function, b?: boolean | AddEventListenerOptions | undefined) => void;
/**
 * @description adds an event listener to the document
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
export declare const daEl: (type: string, fn: Function, b?: boolean | AddEventListenerOptions | undefined) => void;
/**
 * @description removes an event listener from the document
 * @param el element
 * @param type event name
 * @param fn
 * @param b
 */
export declare const drEL: (type: string, fn: Function, b?: boolean | AddEventListenerOptions | undefined) => void;
/**
 * @description defines a new object property
 * @param obj object
 * @param propName property name
 * @param attrs attributes
 */
export declare const dP: (obj: any, propName: string, attrs: object) => any;
/**
 * @description appends a child element to it's new parent
 * @param parent parent element
 * @param child child element
 */
export declare const aChld: (parent: any, child: any) => any;
/**
 * @description test for class
 * @param el Element
 * @param className className cannot contain spaces
 * @returns true if present, false otherwise
 */
export declare const hCl: (el: Element, className: string) => boolean;
/**
 * @description adds a class to an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
export declare const aCl: (el: Element, className: string) => void;
/**
 * @description removes a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
export declare const rCl: (el: Element, className: string) => void;
/**
 * @description toggles a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 * @param force undefined is toggle, true is add, false is remove
 * @returns true if present, false if not
 */
export declare const tCl: (el: Element, className: string, force?: boolean | undefined) => boolean;
export declare const range: (s: number, e: number) => number[];
/**
 * return unique items in array
 * @param x array
 */
export declare const unique: (x: any[]) => any[];
export declare const union: (x: any[], y: any[]) => any[];
/**
 * add class safe
 * @param el HTMLElement
 * @param className class names separated by space
 */
export declare const aClx: (el: Element, className: string) => Element;
/**
 * LINQ select many
 * @param input
 * @param selectListFn
 */
export declare const selectMany: <TIn, TOut>(input: TIn[], selectListFn: (t: TIn) => TOut[]) => TOut[];
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
