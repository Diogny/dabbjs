import { IPoint } from 'src';
import { isFn, attr, aEL, consts as _, pojo } from './dab';
import Point from './point';
import Vector2D from './vec2';

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

export const fillChar = (ch: string, len: number) => new Array(len).join(ch);

export const padStr = (s: string, width: number) => new Array(Math.max(0, width - s.length)).join(' ') + s;

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
 * for objects
 * @param obj 
 * @param fn 
 */
export const each = (obj: any, fn: (value: any, key: string, ndx: number) => void) => {
	if (!isFn(fn) || !obj)
		return;
	let ndx = 0;
	for (let key in obj)
		if (!obj.hasOwnProperty || obj.hasOwnProperty(key))
			fn(obj[key], key, ndx++);	// (value, key, index)
};

/**
 * for objects
 * @param obj 
 * @param fn 
 */
export const map = (obj: any, fn: (value: any, key: string, ndx: number) => any) => {
	let arr: any[] = [];
	each(obj, (value: any, key: string, ndx: number) => {
		arr.push(fn(value, key, ndx));
	});
	return arr;
};

/**
 * for objects, returns an object with key=>value
 * @param obj 
 * @param fn 
 */
export const filter = (obj: any, fn: (value: any, key: string, ndx: number) => any) => {
	let o: any = {};
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
export const filterArray = (obj: any, fn: (value: any, key: string, ndx: number) => any) => {
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

export const prop = function (o: any, path: string, value?: any) {
	let
		r = path.split('.').map(s => s.trim()),
		last = <string>r.pop(),
		result = <any>void 0;
	for (let i = 0; !!o && i < r.length; i++) {
		o = o[r[i]]
	}
	result = o && o[last];
	return value ? ((result != undefined) && (o[<string>last] = value, true)) : result
};

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
 * @param s query
 */
export const qS = (s: string): HTMLElement => <HTMLElement>document.querySelector(s);

/**
 * @description document.querySelectorAll shortcut
 * @param s query
 */
export const qSA = (s: string) => document.querySelectorAll(s);

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

