import { parse } from './dab.ts';

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  get empty() {
    return this.width < 0 || this.height < 0;
  }
  inside(p) {
    return p.x >= this.x && p.y >= this.y && p.x <= this.x + this.width && p.y <= this.y + this.height;
  }
  intersect(r) {
    let nx = Math.max(this.x, r.x), ny = Math.max(this.y, r.y);
    r.width = Math.min(this.x + this.width, r.x + r.width) - nx;
    r.height = Math.min(this.y + this.height, r.y + r.height) - ny;
    r.x = nx;
    r.y = ny;
    return !r.empty;
  }
  clone() {
    return Rect.create(this);
  }
  contains(r) {
    return r.x >= this.x && r.y >= this.y && r.x + r.width <= this.x + this.width && r.y + r.height <= this.y + this.height;
  }
  add(r) {
    let nx = Math.min(this.x, r.x), ny = Math.min(this.y, r.y);
    return new Rect(nx, ny, Math.max(this.x + this.width, r.x + r.width) - nx, Math.max(this.y + this.height, r.y + r.height) - ny);
  }
  move(x, y) {
    this.x = x | 0;
    this.y = y | 0;
  }
  grow(dx, dy) {
    return new Rect(this.x - dx, this.y - dy, this.width + dx * 2, this.height + dy * 2);
  }
  translate(tx, ty) {
    return new Rect(this.x + tx, this.y + ty, this.width, this.height);
  }
  scale(sx, sy) {
    return new Rect(this.x * sx, this.y * sy, this.width * sx, this.height * sy);
  }
  equal(r) {
    return this.x == r.x && this.y == r.y && this.width == r.width && this.height == r.height;
  }
  static create(rect, toInt) {
    let r = new Rect(rect.x, rect.y, rect.width, rect.height);
    toInt && (r.x = r.x | 0, r.y = r.y | 0, r.width = r.width | 0, r.height = r.height | 0);
    return r;
  }
  static get empty() {
    return new Rect(0, 0, 0, 0);
  }
  static parse(value) {
    let numbers = parse(value, 4);
    return numbers && new Rect(numbers[0], numbers[1], numbers[2], numbers[3]);
  }
  get str() {
    return `${this.x}, ${this.y}, ${this.width}, ${this.height}`;
  }
}

export default Rect;
