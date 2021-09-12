const _Color = class {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  clone() {
    return _Color.create(this.r, this.g, this.b);
  }
  static create(r, g, b) {
    return new _Color(r, g, b);
  }
  static scale(k, v) {
    return new _Color(k * v.r, k * v.g, k * v.b);
  }
  static plus(v1, v2) {
    return new _Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
  }
  static times(v1, v2) {
    return new _Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
  }
  static toHex(c) {
    return "#" + ((1 << 24) + (c.r << 16) + (c.g << 8) + c.b).toString(16).slice(1);
  }
  static fromHex(hex) {
    let bigint = parseInt(hex), r = bigint >> 16 & 255, g = bigint >> 8 & 255, b = bigint & 255;
    return { r, g, b };
  }
  static toJsonColor(c) {
    var legalize = (d) => d > 1 ? 1 : d;
    return {
      r: Math.floor(legalize(c.r) * 255),
      g: Math.floor(legalize(c.g) * 255),
      b: Math.floor(legalize(c.b) * 255)
    };
  }
};
let Color = _Color;
Color.white = _Color.create(1, 1, 1);
Color.grey = _Color.create(0.5, 0.5, 0.5);
Color.black = _Color.create(0, 0, 0);
Color.background = _Color.white.clone();
Color.defaultColor = _Color.black.clone();

export default Color;
