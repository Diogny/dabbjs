import { IPoint, IRect } from "./interfaces";
export default class Rect implements IRect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    /**
     * @description returns true is this rectangle has negative widht or height
     */
    get empty(): boolean;
    /**
     * @description returns true a point is inside this rectangle
     * @param p point (x,y)
     */
    inside(p: IPoint): boolean;
    /**
     * @description returns true if this rectangle container intercepts with r
     * @param r interception rectangle
     * @returns true if this intercepts with r, r is modified with right values, otherwise false, and r is wrong
     */
    intersect(r: Rect): boolean;
    /**
     * @description clone this rect
     */
    clone(): Rect;
    /**
     * @description returns true if this rect contains r
     * @param r test rect
     */
    contains(r: Rect): boolean;
    /**
     * @description returns a combined rectangle between this rect and r. this is not modified
     * @param r rect to combine
     */
    add(r: Rect): Rect;
    /**
     * @description moves this rectangle
     * @param x delta x
     * @param y delta y
     */
    move(x: number, y: number): void;
    /**
     * @description returns a new rectangle grow/shrink by a factor, this is not modified.
     * @param dx left & right growth
     * @param dy top & bottom growth
     */
    grow(dx: number, dy: number): Rect;
    /**
     * @description returns a new rectangle translated
     * @param tx x translation
     * @param ty y translation
     */
    translate(tx: number, ty: number): Rect;
    /**
     * @description returns this rectangle scaled by a factor, this is not modified
     * @param sx x, width scale factor
     * @param sy y, height scale factor
     */
    scale(sx: number, sy: number): Rect;
    /**
     * @description returns true if this rectangle is equal to r, false otherwise
     * @param r rectangle to compare
     */
    equal(r: Rect): boolean;
    /**
     *
     * @param rect IRect object with x, y, width, height values
     * @param toInt comverts to integer rectangle
     */
    static create(rect: IRect, toInt?: boolean): Rect;
    /**
     * @description returns an empty rectangle
     */
    static get empty(): Rect;
    /**
     * @description parse a rectangle in string form
     * @param value string in the for "x, y, widht, height"
     */
    static parse(value: string): Rect | undefined;
    /**
     * @description returns string (x, y, widht, height) of this rectangle
     */
    get str(): string;
}
