import { parse, round } from './dab.ts';

class Size {
  constructor(width, height) {
    this.width = Math.round(width);
    this.height = Math.round(height);
  }
  clone() {
    return new Size(this.width, this.height);
  }
  equal(size) {
    return this.width == size.width && this.height == size.height;
  }
  get positive() {
    return this.width >= 0 && this.height >= 0;
  }
  static get empty() {
    return new Size(0, 0);
  }
  static create(size) {
    return new Size(size.width, size.height);
  }
  static parse(value) {
    let numbers = parse(value, 2);
    return numbers && new Size(numbers[0], numbers[1]);
  }
  toString(options) {
    let pars = ((options = options | 0) & 1) != 0, shortVars = (options & 2) != 0, longVars = (options & 4) != 0, width = () => shortVars ? "w: " : longVars ? "width: " : "", height = () => shortVars ? "h: " : longVars ? "height: " : "";
    return `${pars ? "(" : ""}${width()}${round(this.width, 1)}, ${height()}${round(this.height, 1)}${pars ? ")" : ""}`;
  }
  get str() {
    return `${this.width}, ${this.height}`;
  }
}

export default Size;
