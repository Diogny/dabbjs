import { dfnd, isFn, pojo } from "./dab";
import { IPoint } from "./interfaces";
import { Point } from "./point";
import { Vector2D } from "./vec2d";

//https://plainjs.com/javascript/traversing/match-element-selector-52/
//https://plainjs.com/javascript/traversing/get-siblings-of-an-element-40/

export const range = (s: number, e: number) => Array.from('x'.repeat(e - s), (_, i) => s + i);

/**
 * loops through an object properties and returns it in a function
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => void
 */
export const each = <T>(obj: { [id: string]: any }, fn: (value: T, key: string, ndx: number) => void) => {
  if (!isFn(fn) || !obj)
    return;
  let ndx = 0;
  for (let key in obj)
    if (!obj.hasOwnProperty || obj.hasOwnProperty(key))
      fn(obj[key], key, ndx++);	// (value, key, index)
};

/**
 * returns an array of all object properties mapped
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => any
 */
export const map = <T>(obj: { [id: string]: any }, fn: (value: T, key: string, ndx: number) => T) => {
  let arr: T[] = [];
  each(obj, (value: T, key: string, ndx: number) => {
    arr.push(fn(value, key, ndx));
  });
  return arr;
};

/**
 * filters an object properties by a function
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => any
 */
export const filter = <T>(obj: { [id: string]: any }, fn: (value: T, key: string, ndx: number) => T) => {
  let o: { [id: string]: any } = {};
  each(obj, (value: T, key: string, ndx: number) => {
    fn(value, key, ndx) && (o[key] = value);
  });
  return o;
};

/**
 *
 * @param obj an object to filter
 * @param fn if it returns true array[]= value (key is lost), if object array[] = object, otherwise discarded
 */
export const filterArray = <T>(obj: { [id: string]: any }, fn: (value: T, key: string, ndx: number) => T) => {
  let o: T[] = [];
  each(obj, (value: T, key: string, ndx: number) => {
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
 * get/set object property
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

/**
 * creates a NxN matrix
 * @param rows amount of rows
 * @param cols amount of columns
 * @param filler cell filler
 */
export const matrix = <T>(rows: number, cols: number, filler: T): T[][] =>
  Array.from({ length: rows }, () => new Array(cols).fill(filler));

/**
* returns the points of an arrow and vector
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
