import Point from './point.ts';
import Size from './size.ts';
import Rect from './rect.ts';

declare type IEqual = (p: Point | Size | Rect) => boolean;
interface IPoint {
    x: number;
    y: number;
}
interface IPoint3D extends IPoint {
    z: number;
}
interface ISize {
    width: number;
    height: number;
}
interface IRect extends IPoint, ISize {
}
interface IJsonColor {
    r: number;
    g: number;
    b: number;
}

export { IEqual, IJsonColor, IPoint, IPoint3D, IRect, ISize };
