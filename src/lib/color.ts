//Color class is adapted from:
//https://github.com/Microsoft/TypeScriptSamples/blob/master/raytracer/raytracer.ts

import { IColor } from "./interfaces";

export default class Color implements IColor {

  /**
   * creates a new color
   * @param r red 0..1
   * @param g green 0..1
   * @param b blue 0..1
   */
  constructor(
    public r: number,
    public g: number,
    public b: number) {
  }

  /**
   * clones this color
   * @returns a cloned color
   */
  public clone() {
    return Color.create(this.r, this.g, this.b);
  }

  /**
   * creates a new color
   * @param r red 0..1
   * @param g green 0..1
   * @param b blue 0..1
   * @returns a new color
   */
  static create(r: number, g: number, b: number) {
    return new Color(r, g, b);
  }

  /**
   *
   * @param k multiplier
   * @param v color
   * @returns a new color
   */
  static scale(k: number, v: Color) { return new Color(k * v.r, k * v.g, k * v.b); }

  /**
   *
   * @param v1 color 1
   * @param v2 color 2
   * @returns a new color
   */
  static plus(v1: Color, v2: Color) { return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b); }

  /**
   *
   * @param v1 color 1
   * @param v2 color 2
   * @returns a new color
   */
  static times(v1: Color, v2: Color) { return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b); }

  /**
   * white
   */
  static readonly white = Color.create(1.0, 1.0, 1.0);

  /**
   * gray
   */
  static readonly grey = Color.create(0.5, 0.5, 0.5);

  /**
   * black
   */
  static readonly black = Color.create(0.0, 0.0, 0.0);

  /**
   * default background: white
   */
  static readonly background = Color.white.clone();

  /**
   * default color: black
   */
  static readonly defaultColor = Color.black.clone();

  static toHex(c: Color): string {
    return "#" + ((1 << 24) + (c.r << 16) + (c.g << 8) + c.b).toString(16).slice(1);
  }

  static fromHex(hex: string | number): IColor {
    let
      bigint = parseInt(<string>hex),
      r = (bigint >> 16) & 255,
      g = (bigint >> 8) & 255,
      b = bigint & 255;
    /*
    0xffa795
    16754581
    parseInt(0xffa795)
    16754581
    parseInt("0xffa795")
    16754581
    */
    return { r: r, g: g, b: b };
  }

  /**
   * converts to a normalized color
   * @param c a color
   * @returns a json color structure
   */
  static toJsonColor(c: Color): IColor {
    let
      legalize = (d: number) => d > 1 ? 1 : d;
    return {
      r: Math.floor(legalize(c.r) * 255),
      g: Math.floor(legalize(c.g) * 255),
      b: Math.floor(legalize(c.b) * 255)
    }
  }

}
