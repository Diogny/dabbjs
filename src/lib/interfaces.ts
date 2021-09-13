/**
 * Equal function
 */
export type IEqual = (p: IPoint | ISize | IRect) => boolean;	// | Unit

/**
 * 2D Point interface
 */
export interface IPoint {
  x: number;
  y: number;
}

/**
 * 3D Point interface
 */
export interface IPoint3D extends IPoint {
  z: number;
}

/**
 * Size interface
 */
export interface ISize {
  width: number;
  height: number;
}

/**
 * Rectangle interface
 */
export interface IRect extends IPoint, ISize { }

/**
 * Color interface
 */
export interface IColor {
  r: number;
  g: number;
  b: number;
}
