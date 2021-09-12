class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  length() {
    return Math.sqrt(this.dot(this));
  }
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  det(v) {
    return this.x * v.y - this.y * v.x;
  }
  angleTo(v) {
    return Math.atan2(this.det(v), this.dot(v));
  }
  add(v) {
    if (typeof v === "number")
      return new Vector2D(this.x + v, this.y + v);
    else
      return new Vector2D(this.x + v.x, this.y + v.y);
  }
  sub(v) {
    if (typeof v === "number")
      return new Vector2D(this.x - v, this.y - v);
    else
      return new Vector2D(this.x - v.x, this.y - v.y);
  }
  mul(v) {
    if (typeof v === "number")
      return new Vector2D(this.x * v, this.y * v);
    else
      return new Vector2D(this.x * v.x, this.y * v.y);
  }
  div(v) {
    if (typeof v === "number")
      return new Vector2D(this.x / v, this.y / v);
    else
      return new Vector2D(this.x / v.x, this.y / v.y);
  }
  unit() {
    return this.div(this.length());
  }
  clone() {
    return new Vector2D(this.x, this.y);
  }
  static empty() {
    return new Vector2D(0, 0);
  }
}

export default Vector2D;
