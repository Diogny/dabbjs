import { IEqual, IPoint, IPoint3D, ISize, IRect, IColor } from "./lib/interfaces";
import Color from "./lib/color";
import Point from "./lib/point";
import Size from "./lib/size";
import Rect from "./lib/rect";
import Vector2D from "./lib/vec2d";
import Ajaxp from "./lib/ajaxp";
import * as dab from "./lib/dab";
import * as strings from "./lib/strings";
import * as dom from "./lib/dom";
import * as misc from "./lib/misc";
import { Templates, XML } from "./lib/templates";

/**
 *
 * @param delayMs millisecond
 * @returns
 */
export const delayMillis = (delayMs: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delayMs));

/**
 * greetings
 * @param name name
 * @returns
 */
export const greet = (name: string): string => `Hello ${name}`

/**
 * old foo
 * @returns
 */
export const foo = async (): Promise<boolean> => {
  console.log(greet('World'))
  await delayMillis(1000)
  console.log('done')
  return true
}

export {
  dab,
  strings,
  dom,
  misc,

  Ajaxp,

  Vector2D,
  Color,
  Point,
  Size,
  Rect,

  IEqual,
  IPoint,
  IPoint3D,
  ISize,
  IRect,
  IColor,

  Templates,
  XML
};

//dabjs
