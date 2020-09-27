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

/**
 * copy all properties in src to obj, and returns obj
 * @param obj dest object
 * @param src source object
 */
export const extend = (obj: { [id: string]: any }, src: { [id: string]: any }) => { //no support for IE 8 https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
	//const returnedTarget = Object.assign(target, source); doesn't throw error if source is undefined
	//		but target has to be an object
	pojo(src) && Object.keys(src).forEach((key) => { obj[key] = src[key]; });
	return obj;
}

/**
 * copy properties in src that exists only in obj, and returns obj
 * @param obj dest and template object
 * @param src source object
 */
export const copy = (obj: { [id: string]: any }, src: { [id: string]: any }) => {
	pojo(src) && Object.keys(obj).forEach((key) => {
		let
			k = src[key];
		dfnd(k) && (obj[key] = k)
	});
	return obj
}

export const inherit = (parent: any, child: any) => {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
}

/**
 * @description returns true if an element if an HTML or SVG DOM element
 * @param e {any} an element
 */
export const isDOM = (e: any) => e instanceof window.HTMLElement || e instanceof window.HTMLDocument;

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
 * css(el, { background: 'green', display: 'none', 'border-radius': '5px' });
 * @param el HTMLElement
 * @param styles object of styles
 */
export const css = (el: HTMLElement, styles: { [id: string]: any } | string) => {
	if (isStr(styles))
		return el.style[<string>styles]
	else {
		Object.assign(el.style, styles)
		// for (let prop in styles)
		// 	el.style[prop] = styles[prop];
		return el
	}
}

/**
 * @description get/set html element attribute
 * @param el HTML element
 * @param attrs string to get it's attribute, or an object with attributes to set
 */
export const attr = function (el: HTMLElement, attrs: { [id: string]: any } | string) {
	if (isStr(attrs))
		return el.getAttribute(<string>attrs);
	for (let attr in <{ [id: string]: any }>attrs)
		el.setAttribute(attr, attrs[attr]);
	return el;
}

/**
 * @description adds an event listener to an element
 * @param el element
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
export const aEL = (el: HTMLElement, type: string, fn: Function, b?: boolean | AddEventListenerOptions | undefined): void => el.addEventListener(type, <any>fn, b);

/**
 * @description removes an event listener from an element
 * @param el element
 * @param type event name
 * @param fn 
 * @param b 
 */
export const rEL = (el: HTMLElement, type: string, fn: Function, b?: boolean | AddEventListenerOptions | undefined): void => el.removeEventListener(type, <any>fn, b);

/**
 * @description adds an event listener to the document
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
export const daEl = (type: string, fn: Function, b?: boolean | AddEventListenerOptions | undefined): void => document.addEventListener(type, <any>fn, b);

/**
 * @description removes an event listener from the document
 * @param el element
 * @param type event name
 * @param fn 
 * @param b 
 */
export const drEL = (type: string, fn: Function, b?: boolean | AddEventListenerOptions | undefined): void => document.removeEventListener(type, <any>fn, b);

/**
 * @description defines a new object property
 * @param obj object
 * @param propName property name
 * @param attrs attributes
 */
export const dP = (obj: any, propName: string, attrs: object) => Object.defineProperty(obj, propName, attrs);

/**
 * @description appends a child element to it's new parent
 * @param parent parent element
 * @param child child element
 */
export const aChld = (parent: any, child: any) => parent.appendChild(child);

/**
 * @description test for class
 * @param el Element
 * @param className className cannot contain spaces
 * @returns true if present, false otherwise
 */
export const hCl = (el: Element, className: string): boolean => el.classList.contains(className);

/**
 * @description adds a class to an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
export const aCl = (el: Element, className: string) => el.classList.add(className);

/**
 * @description removes a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
export const rCl = (el: Element, className: string) => el.classList.remove(className);

/**
 * @description toggles a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 * @param force undefined is toggle, true is add, false is remove
 * @returns true if present, false if not
 */
export const tCl = (el: Element, className: string, force?: boolean): boolean => el.classList.toggle(className, force);

//https://plainjs.com/javascript/traversing/match-element-selector-52/
//https://plainjs.com/javascript/traversing/get-siblings-of-an-element-40/

export const range = (s: number, e: number) => Array.from('x'.repeat(e - s), (_, i) => s + i);

/**
 * return unique items in array
 * @param x array
 */
export const unique = (x: any[]): any[] => x.filter((elem, index) => x.indexOf(elem) === index);

export const union = (x: any[], y: any[]): any[] => unique(x.concat(y));

/**
 * add class safe
 * @param el HTMLElement
 * @param className class names separated by space
 */
export const aClx = (el: Element, className: string): Element => {
	el.classList.add(...(className || "").split(' ').filter((v: string) => !empty(v)))
	return el
}

/**
 * LINQ select many
 * @param input 
 * @param selectListFn 
 */
export const selectMany = <TIn, TOut>(input: TIn[], selectListFn: (t: TIn) => TOut[]): TOut[] =>
	input.reduce((out, inx) => {
		out.push(...selectListFn(inx));
		return out;
	}, new Array<TOut>());

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
export const toBool = (val: any): boolean | undefined => a[val];

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
export const isBool = (val: any): boolean => a[val] != undefined;

/**
 * @description converts a value to boolean, and undefined are forced to boolean
 * @param val value
 * @param forcedUndefined forced undefined values, default is "false"
 */
export const fBool = (val: any, forcedUndefined?: boolean): boolean => a[val] || !!forcedUndefined;

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