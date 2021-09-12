import { IPoint } from './interfaces.ts';

declare class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
    /**
     * @description returns the length of the vector
     */
    length(): number;
    /**
     * @description returns DOT product of these vectors
     * @param v vector 2d
     */
    dot(v: IPoint): number;
    /**
     * @description returns the Determinant of these vectors
     * @param v vector 2d
     */
    det(v: IPoint): number;
    /**
     * @description returns the angle between these two vectors
     * @param v vector 2d
     */
    angleTo(v: IPoint): number;
    /**
     * @description returns the vector addition
     * @param v vector2d or number
     */
    add(v: IPoint | number): Vector2D;
    /**
     * @description returns the vector subtraction
     * @param v vector2d or number
     */
    sub(v: IPoint | number): Vector2D;
    /**
     * @description returns the vector multiplication
     * @param v vector2d or number
     */
    mul(v: IPoint | number): Vector2D;
    /**
     * @description returns the vector division
     * @param v vector2d or number
     */
    div(v: IPoint | number): Vector2D;
    /**
     * @description returns the Unit vector
     */
    unit(): Vector2D;
    /**
     * @description returns a clone of this vector
     */
    clone(): Vector2D;
    /**
     * @description returns the XY plane origin/empty vector
     */
    static empty(): Vector2D;
}

export default Vector2D;
