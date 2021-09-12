import { IPoint } from './interfaces';
import { isFn, attr, aEL, consts as _, pojo } from './dab';
import Point from './point';
import Vector2D from './vec2';

/**
 * @description retrieves all DOM script templates
 * 
 * script with attribute data-tmpl="id" are returned as an object with [id] as key.
 * 
 * it removes any CDATA, LF, NL, Tabs from result
 */
export const DOMTemplates = (): { [key: string]: any } => {
	let
		templates: { [key: string]: any } = {};
	Array.from(qSA('script[data-tmpl]')).forEach(((scr: HTMLScriptElement) => {
		let
			id = <string>scr.getAttribute('data-tmpl'),
			src = scr.innerHTML.replace("<![CDATA[", "").replace("]]>", "").replace(/[\r\n\t]/g, "").trim();
		templates[id] = src
	}));
	return templates;
}

/**
 * used for string & numbers
 * @param t string
 * @param e amount
 * @param ch pad char
 */
export const pad = (t: string, e: number, ch?: any) =>
	new Array(Math.max(0, (e || 2) + 1 - String(t).length)).join(ch ? ch : '0') + t;

/**
 * 
 * @param ch char|string to fill
 * @param len repeat count, must be equal or greater than zero
 */
export const fillChar = (ch: string, len: number) => new Array(len + 1).join(ch);

/**
 * @description left pads an string
 * @param s string to padd
 * @param width max amount of final string, if less, same string is returned
 */
export const padStr = (s: string, width: number) => new Array(Math.max(0, width - s.length + 1)).join(' ') + s;

/**
 * @description pad left number
 * @param n number to convert to string
 * @param width max width, if less, number to string is returned
 */
export const formatNumber = (n: number, width: number) => padStr(n + "", width);

/**
 * @description creates an SVG element by tag name
 * @param tagName tag name
 * @param id optional name
 * @param nsAttrs attributes
 */
export const tag = (tagName: string, id: string, nsAttrs: { [id: string]: any }): SVGElement => <SVGElement><unknown>(id && (nsAttrs.id = id),
	attr(document.createElementNS(_.svgNs, tagName), nsAttrs));

/**
 * @description creates an SVG element by an string
 * @param html html string representation
 */
export const svg = (html: string): SVGElement => {
	let template = document.createElementNS(_.svgNs, "template");
	template.innerHTML = html;
	return <SVGElement>template.children[0];
};

/**
 * @description creates an HTML element by an string
 * @param html html string representation
 */
export const html = (html: string): HTMLElement => {
	let template = document.createElement("template");
	template.innerHTML = html;
	return <HTMLElement>template.content.firstChild;
};

/**
 * @description returns the points of an arrow and vector
 * @param a first point
 * @param b second point
 * @param head arrow head length
 * @param swipe swipe angle of head line
 */
export const arrow = (a: IPoint, b: IPoint, head: number, swipe: number) => {
	let
		v = new Vector2D(b.x - a.x, b.y - a.y),
		angle = Math.atan2(v.y, v.x),
		p = (ang: number) => new Point(b.x - head * Math.cos(ang), b.y - head * Math.sin(ang));
	return {
		ang: angle,
		v: v,
		a: p(angle - swipe),
		b: p(angle + swipe)
	}
}

/**
 * @description loops through an object properties and returns it in a function
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => void
 */
export const each = (obj: { [id: string]: any }, fn: (value: any, key: string, ndx: number) => void) => {
	if (!isFn(fn) || !obj)
		return;
	let ndx = 0;
	for (let key in obj)
		if (!obj.hasOwnProperty || obj.hasOwnProperty(key))
			fn(obj[key], key, ndx++);	// (value, key, index)
};

/**
 * @description returns an array of all object properties mapped
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => any
 */
export const map = (obj: { [id: string]: any }, fn: (value: any, key: string, ndx: number) => any) => {
	let arr: any[] = [];
	each(obj, (value: any, key: string, ndx: number) => {
		arr.push(fn(value, key, ndx));
	});
	return arr;
};

/**
 * @description filters an object properties by a function
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => any
 */
export const filter = (obj: { [id: string]: any }, fn: (value: any, key: string, ndx: number) => any) => {
	let o: { [id: string]: any } = {};
	each(obj, (value: any, key: string, ndx: number) => {
		fn(value, key, ndx) && (o[key] = value);
	});
	return o;
};

/**
 * @description
 * @param obj an object to filter
 * @param fn if it returns true array[]= value (key is lost), if object array[] = object, otherwise discarded
 */
export const filterArray = (obj: { [id: string]: any }, fn: (value: any, key: string, ndx: number) => any) => {
	let o: any[] = [];
	each(obj, (value: any, key: string, ndx: number) => {
		let
			res = fn(value, key, ndx);
		if (res === true)
			o.push(value)
		else if (pojo(res))
			o.push(res);
	});
	return o;
};

/**
 * @description get/set object property
 * @param o object
 * @param path path to property "a.b.c"
 * @param value undefined to get value, otherwise
 */
export const prop = function (o: { [id: string]: any }, path: string, value?: any) {
	let
		r = path.split('.').map(s => s.trim()),
		last = <string>r.pop(),
		result;
	for (let i = 0; !!o && i < r.length; i++) {
		o = o[r[i]]
	}
	result = o && o[last];
	return value != undefined ? ((result != undefined) && (o[last] = value, true)) : result
};

/**
 * @description calls a function when DOM is ready
 * @param fn function to be called
 */
export const ready = (fn: Function) => { //https://plainjs.com/javascript/events/running-code-when-the-document-is-ready-15/
	if (!isFn(fn)) {
		return !1;
	}
	if (document.readyState != "loading")
		return (fn(), !0);
	else if (document["addEventListener"])
		aEL(<any>document, "DOMContentLoaded", fn, false);
	else
		(<any>document).attachEvent("onreadystatechange", () => {
			if (document.readyState == "complete")
				fn();
		});
	return !0;
};

/**
 * @description document.querySelector shortcut
 * @param selectors query string
 * @param elem HTMLElement or document if undefined
 */
export const qS = (selectors: string, elem?: HTMLElement): HTMLElement => <HTMLElement>(elem || document).querySelector(selectors);

/**
 * @description document.querySelectorAll shortcut
 * @param selectors query string
 * @param elem HTMLElement or document if undefined
 */
export const qSA = (selectors: string, elem?: HTMLElement) => (elem || document).querySelectorAll(selectors);

/**
 * @description document.getElementById shortcut
 * @param s #id
 */
export const gEId = (id: string) => document.getElementById(id);

/**
 * @description extracts a base-name from page metadata
 */
export const basePath = () => {
	let
		meta = qS('meta[name="base"]');
	return meta ? meta.getAttribute('content') : "";
}

/**
 * @description creates a NxN matrix
 * @param rows amount of rows
 * @param cols amount of columns
 * @param filler cell filler
 */
export const matrix = <T>(rows: number, cols: number, filler: T): T[][] =>
	Array.from({ length: rows }, () => new Array(cols).fill(filler));

/**
 * @description converts a web css property to camel case
 * @param str font-size  -webkit-box-shadow
 * @@returns fontSize  WebkitBoxShadow
 */
export const cssCamel = (str: string) => str.replace(/\-([a-z])/gi, (match, group) => group.toUpperCase())

/**
 * @description removes camel of a web css property
 * @param str fontSize  WebkitBoxShadow
 * @returns font-size  -webkit-box-shadow
 */
export const cssUncamel = (str: string) => str.replace(/([A-Z])/g, (match, group) => '-' + group.toLowerCase())

/**
 * @description converts an string to camel case
 * @param str string
 * 
 * - width => Width
 * - width height => Width Height
 */
export const camel = (str: string) => str.replace(/([a-z])(\w*)/gi, (match, letter, rest) => letter.toUpperCase() + rest);

