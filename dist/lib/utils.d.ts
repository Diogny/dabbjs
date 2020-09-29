import { IPoint } from './interfaces';
import Point from './point';
import Vector2D from './vec2';
/**
 * @description retrieves all DOM script templates
 *
 * script with attribute data-tmpl="id" are returned as an object with [id] as key.
 *
 * it removes any CDATA, LF, NL, Tabs from result
 */
export declare const DOMTemplates: () => {
    [key: string]: any;
};
/**
 * used for string & numbers
 * @param t string
 * @param e amount
 * @param ch pad char
 */
export declare const pad: (t: string, e: number, ch?: any) => string;
/**
 *
 * @param ch char|string to fill
 * @param len repeat count, must be equal or greater than zero
 */
export declare const fillChar: (ch: string, len: number) => string;
/**
 * @description left pads an string
 * @param s string to padd
 * @param width max amount of final string, if less, same string is returned
 */
export declare const padStr: (s: string, width: number) => string;
/**
 * @description pad left number
 * @param n number to convert to string
 * @param width max width, if less, number to string is returned
 */
export declare const formatNumber: (n: number, width: number) => string;
/**
 * @description creates an SVG element by tag name
 * @param tagName tag name
 * @param id optional name
 * @param nsAttrs attributes
 */
export declare const tag: (tagName: string, id: string, nsAttrs: {
    [id: string]: any;
}) => SVGElement;
/**
 * @description creates an SVG element by an string
 * @param html html string representation
 */
export declare const svg: (html: string) => SVGElement;
/**
 * @description creates an HTML element by an string
 * @param html html string representation
 */
export declare const html: (html: string) => HTMLElement;
/**
 * @description returns the points of an arrow and vector
 * @param a first point
 * @param b second point
 * @param head arrow head length
 * @param swipe swipe angle of head line
 */
export declare const arrow: (a: IPoint, b: IPoint, head: number, swipe: number) => {
    ang: number;
    v: Vector2D;
    a: Point;
    b: Point;
};
/**
 * @description loops through an object properties and returns it in a function
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => void
 */
export declare const each: (obj: {
    [id: string]: any;
}, fn: (value: any, key: string, ndx: number) => void) => void;
/**
 * @description returns an array of all object properties mapped
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => any
 */
export declare const map: (obj: {
    [id: string]: any;
}, fn: (value: any, key: string, ndx: number) => any) => any[];
/**
 * @description filters an object properties by a function
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => any
 */
export declare const filter: (obj: {
    [id: string]: any;
}, fn: (value: any, key: string, ndx: number) => any) => {
    [id: string]: any;
};
/**
 * @description
 * @param obj an object to filter
 * @param fn if it returns true array[]= value (key is lost), if object array[] = object, otherwise discarded
 */
export declare const filterArray: (obj: {
    [id: string]: any;
}, fn: (value: any, key: string, ndx: number) => any) => any[];
/**
 * @description get/set object property
 * @param o object
 * @param path path to property "a.b.c"
 * @param value undefined to get value, otherwise
 */
export declare const prop: (o: {
    [id: string]: any;
}, path: string, value?: any) => any;
/**
 * @description calls a function when DOM is ready
 * @param fn function to be called
 */
export declare const ready: (fn: Function) => boolean;
/**
 * @description document.querySelector shortcut
 * @param selectors query string
 * @param elem HTMLElement or document if undefined
 */
export declare const qS: (selectors: string, elem?: HTMLElement | undefined) => HTMLElement;
/**
 * @description document.querySelectorAll shortcut
 * @param selectors query string
 * @param elem HTMLElement or document if undefined
 */
export declare const qSA: (selectors: string, elem?: HTMLElement | undefined) => NodeListOf<Element>;
/**
 * @description document.getElementById shortcut
 * @param s #id
 */
export declare const gEId: (id: string) => HTMLElement | null;
/**
 * @description extracts a base-name from page metadata
 */
export declare const basePath: () => string | null;
/**
 * @description creates a NxN matrix
 * @param rows amount of rows
 * @param cols amount of columns
 * @param filler cell filler
 */
export declare const matrix: <T>(rows: number, cols: number, filler: T) => T[][];
/**
 * @description converts a web css property to camel case
 * @param str font-size  -webkit-box-shadow
 * @@returns fontSize  WebkitBoxShadow
 */
export declare const cssCamel: (str: string) => string;
/**
 * @description removes camel of a web css property
 * @param str fontSize  WebkitBoxShadow
 * @returns font-size  -webkit-box-shadow
 */
export declare const cssUncamel: (str: string) => string;
/**
 * @description converts an string to camel case
 * @param str string
 *
 * - width => Width
 * - width height => Width Height
 */
export declare const camel: (str: string) => string;
