import { IJsonColor } from './interfaces.ts';

declare class Color implements IJsonColor {
    r: number;
    g: number;
    b: number;
    /**
     * creates a new color
     * @param r red 0..1
     * @param g green 0..1
     * @param b blue 0..1
     */
    constructor(r: number, g: number, b: number);
    /**
     * clones this color
     * @returns a cloned color
     */
    clone(): Color;
    /**
     * creates a new color
     * @param r red 0..1
     * @param g green 0..1
     * @param b blue 0..1
     * @returns a new color
     */
    static create(r: number, g: number, b: number): Color;
    /**
     *
     * @param k multiplier
     * @param v color
     * @returns a new color
     */
    static scale(k: number, v: Color): Color;
    /**
     *
     * @param v1 color 1
     * @param v2 color 2
     * @returns a new color
     */
    static plus(v1: Color, v2: Color): Color;
    /**
     *
     * @param v1 color 1
     * @param v2 color 2
     * @returns a new color
     */
    static times(v1: Color, v2: Color): Color;
    /**
     * white
     */
    static white: Color;
    /**
     * gray
     */
    static grey: Color;
    /**
     * black
     */
    static black: Color;
    /**
     * default background: white
     */
    static background: Color;
    /**
     * default color: black
     */
    static defaultColor: Color;
    static toHex(c: Color): string;
    static fromHex(hex: string | number): IJsonColor;
    /**
     * converts to a normalized color
     * @param c a color
     * @returns a json color structure
     */
    static toJsonColor(c: Color): IJsonColor;
}

export default Color;
