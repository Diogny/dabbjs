import { round, parse } from './dab.ts';

class Point {
  constructor(x, y) {
    this.x = Math.round(x);
    this.y = Math.round(y);
  }
  distance(p) {
    var dx = this.x - p.x;
    var dy = this.y - p.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  clone() {
    return new Point(this.x, this.y);
  }
  add(x, y) {
    return new Point(this.x + x, this.y + y);
  }
  mul(x, y) {
    return new Point(this.x * x, this.y * y);
  }
  equal(p) {
    return this.x == p.x && this.y == p.y;
  }
  toString(options) {
    let vars = ((options = options | 0) & 2) != 0, pars = (options & 1) != 0;
    return `${pars ? "(" : ""}${vars ? "x: " : ""}${round(this.x, 1)}, ${vars ? "y: " : ""}${round(this.y, 1)}${pars ? ")" : ""}`;
  }
  get str() {
    return `${this.x}, ${this.y}`;
  }
  get quadrant() {
    if (this.x == 0 || this.y == 0) {
      return this.x == this.y ? 0 : -1;
    }
    if (this.y > 0)
      return this.x > 0 ? 1 : 2;
    else
      return this.x < 0 ? 3 : 4;
  }
  static rotateBy(x, y, cx, cy, angle) {
    var radians = Math.PI / 180 * angle, cos = Math.cos(radians), sin = Math.sin(radians), nx = cos * (x - cx) + sin * (y - cy) + cx, ny = cos * (y - cy) - sin * (x - cx) + cy;
    return { x: nx | 0, y: ny | 0 };
  }
  static validateRotation(val) {
    return val = (val | 0) % 360, val < 0 && (val += 360), val;
  }
  static get origin() {
    return new Point(0, 0);
  }
  static create(p) {
    return new Point(p.x, p.y);
  }
  static parse(value) {
    let numbers = parse(value, 2);
    return numbers && new Point(numbers[0], numbers[1]);
  }
  static scale(v, k) {
    return new Point(k * v.x, k * v.y);
  }
  static translateBy(v, dx, dy) {
    return new Point(v.x + dx, v.y + dy);
  }
  static times(v, scaleX, scaleY) {
    return new Point(v.x * scaleX, v.y * scaleY);
  }
  static minus(v1, v2) {
    return new Point(v1.x - v2.x, v1.y - v2.y);
  }
  static plus(v1, v2) {
    return new Point(v1.x + v2.x, v1.y + v2.y);
  }
  static inside(p, s) {
    return p.x >= 0 && p.x <= s.width && p.y >= 0 && p.y <= s.height;
  }
}

export default Point;
