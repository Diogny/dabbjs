import { IPoint } from "../lib/interfaces";

//inspired by
//https://evanw.github.io/lightgl.js/docs/vector.html
export default class Vector2D {

  constructor(public x: number, public y: number) { }

  /**
   * @description returns the length of the vector
   */
  length() { return Math.sqrt(this.dot(this)) }

  /**
   * @description returns DOT product of these vectors
   * @param v vector 2d
   */
  dot(v: IPoint) { return this.x * v.x + this.y * v.y }

  /**
   * @description returns the Determinant of these vectors
   * @param v vector 2d
   */
  det(v: IPoint) { return this.x * v.y - this.y * v.x }

  /**
   * @description returns the angle between these two vectors
   * @param v vector 2d
   */
  angleTo(v: IPoint) { return Math.atan2(this.det(v), this.dot(v)) }

  /**
   * @description returns the vector addition
   * @param v vector2d or number
   */
  add(v: IPoint | number) {
    if (typeof v === "number")
      return new Vector2D(this.x + v, this.y + v)
    else
      return new Vector2D(this.x + v.x, this.y + v.y)
  }

  /**
   * @description returns the vector subtraction
   * @param v vector2d or number
   */
  sub(v: IPoint | number) {
    if (typeof v === "number")
      return new Vector2D(this.x - v, this.y - v)
    else
      return new Vector2D(this.x - v.x, this.y - v.y)
  }

  /**
   * @description returns the vector multiplication
   * @param v vector2d or number
   */
  mul(v: IPoint | number) {
    if (typeof v === "number")
      return new Vector2D(this.x * v, this.y * v)
    else
      return new Vector2D(this.x * v.x, this.y * v.y)
  }

  /**
   * @description returns the vector division
   * @param v vector2d or number
   */
  div(v: IPoint | number) {
    if (typeof v === "number")
      return new Vector2D(this.x / v, this.y / v)
    else
      return new Vector2D(this.x / v.x, this.y / v.y)
  }

  /**
   * @description returns the Unit vector
   */
  unit() { return this.div(this.length()) }

  /**
   * @description returns a clone of this vector
   */
  clone() { return new Vector2D(this.x, this.y) }

  /**
   * @description returns the XY plane origin/empty vector
   */
  static empty() { return new Vector2D(0, 0) }

}
