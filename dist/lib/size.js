"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dab_1 = require("./dab");
class Size {
    constructor(width, height) {
        this.width = Math.round(width);
        this.height = Math.round(height);
    }
    clone() { return new Size(this.width, this.height); }
    equal(size) { return this.width == size.width && this.height == size.height; }
    /**
     * @description returns true if both width & height are positive
     */
    get positive() { return this.width >= 0 && this.height >= 0; }
    static get empty() { return new Size(0, 0); }
    static create(size) {
        return new Size(size.width, size.height);
    }
    /**
     * @description parse an string into an (x,y) Size
     * @param value string in the for "width, height"
     */
    static parse(value) {
        let numbers = (0, dab_1.parse)(value, 2);
        return numbers && new Size(numbers[0], numbers[1]);
    }
    /**
     * returns string of a Size oobject
     * @param options  0 = width,height	1 = parenthesis	2 = short variables w: width, h: height	4 = long variables (width: width, height: height)
     */
    toString(options) {
        let pars = ((options = options | 0) & 1) != 0, shortVars = (options & 2) != 0, longVars = (options & 4) != 0, width = () => shortVars ? "w: " : longVars ? "width: " : "", height = () => shortVars ? "h: " : longVars ? "height: " : "";
        return `${pars ? "(" : ""}${width()}${(0, dab_1.round)(this.width, 1)}, ${height()}${(0, dab_1.round)(this.height, 1)}${pars ? ")" : ""}`;
    }
    get str() { return `${this.width}, ${this.height}`; }
}
exports.default = Size;
//# sourceMappingURL=size.js.map