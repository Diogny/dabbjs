import { IPoint } from 'src';
import Point from './point';
import Vector2D from './vec2';
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
export declare const fillChar: (ch: string, len: number) => string;
export declare const padStr: (s: string, width: number) => string;
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
 * for objects
 * @param obj
 * @param fn
 */
export declare const each: (obj: any, fn: (value: any, key: string, ndx: number) => void) => void;
/**
 * for objects
 * @param obj
 * @param fn
 */
export declare const map: (obj: any, fn: (value: any, key: string, ndx: number) => any) => any[];
/**
 * for objects, returns an object with key=>value
 * @param obj
 * @param fn
 */
export declare const filter: (obj: any, fn: (value: any, key: string, ndx: number) => any) => any;
/**
 * @description
 * @param obj an object to filter
 * @param fn if it returns true array[]= value (key is lost), if object array[] = object, otherwise discarded
 */
export declare const filterArray: (obj: any, fn: (value: any, key: string, ndx: number) => any) => any[];
export declare const prop: (o: any, path: string, value?: any) => any;
export declare const ready: (fn: Function) => boolean;
/**
 * @description document.querySelector shortcut
 * @param s query
 */
export declare const qS: (s: string) => HTMLElement;
/**
 * @description document.querySelectorAll shortcut
 * @param s query
 */
export declare const qSA: (s: string) => NodeListOf<Element>;
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
