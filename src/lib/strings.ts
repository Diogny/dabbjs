/**
 * used for string & numbers
 * @param t string
 * @param e amount
 * @param ch pad char
 */
export const pad = (t: string, e: number, ch?: any) =>
  new Array(Math.max(0, (e || 2) + 1 - String(t).length)).join(ch || '0') + t;

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
 * @description converts a web css property to camel case
 * @param str font-size  -webkit-box-shadow
 * @@returns fontSize  WebkitBoxShadow
 */
export const cssCamel = (str: string) => str.replace(/-([a-z])/gi, (_match, group) => group.toUpperCase())

/**
 * @description removes camel of a web css property
 * @param str fontSize  WebkitBoxShadow
 * @returns font-size  -webkit-box-shadow
 */
export const cssUncamel = (str: string) => str.replace(/([A-Z])/g, (_match, group) => '-' + group.toLowerCase())

/**
 * @description converts an string to camel case
 * @param str string
 *
 * - width => Width
 * - width height => Width Height
 */
export const camel = (str: string) => str.replace(/([a-z])(\w*)/gi, (_match, letter, rest) => letter.toUpperCase() + rest);
