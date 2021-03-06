"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dab_1 = require("./dab");
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rect.prototype, "empty", {
        /**
         * @description returns true is this rectangle has negative widht or height
         */
        get: function () { return this.width < 0 || this.height < 0; },
        enumerable: false,
        configurable: true
    });
    /**
     * @description returns true a point is inside this rectangle
     * @param p point (x,y)
     */
    Rect.prototype.inside = function (p) {
        return p.x >= this.x && p.y >= this.y && p.x <= (this.x + this.width) && p.y <= (this.y + this.height);
        // Point.inside(Point.minus(p, this.location), this.size)
    };
    /**
     * @description returns true if this rectangle container intercepts with r
     * @param r interception rectangle
     * @returns true if this intercepts with r, r is modified with right values, otherwise false, and r is wrong
     */
    Rect.prototype.intersect = function (r) {
        var nx = Math.max(this.x, r.x), ny = Math.max(this.y, r.y);
        r.width = Math.min((this.x + this.width), (r.x + r.width)) - nx;
        r.height = Math.min((this.y + this.height), (r.y + r.height)) - ny;
        r.x = nx;
        r.y = ny;
        return !r.empty;
    };
    /**
     * @description clone this rect
     */
    Rect.prototype.clone = function () { return Rect.create(this); };
    /**
     * @description returns true if this rect contains r
     * @param r test rect
     */
    Rect.prototype.contains = function (r) {
        return r.x >= this.x
            && r.y >= this.y
            && (r.x + r.width <= this.x + this.width)
            && (r.y + r.height <= this.y + this.height);
    };
    /**
     * @description returns a combined rectangle between this rect and r. this is not modified
     * @param r rect to combine
     */
    Rect.prototype.add = function (r) {
        var nx = Math.min(this.x, r.x), ny = Math.min(this.y, r.y);
        return new Rect(nx, ny, Math.max(this.x + this.width, r.x + r.width) - nx, Math.max(this.y + this.height, r.y + r.height) - ny);
    };
    /**
     * @description moves this rectangle
     * @param x delta x
     * @param y delta y
     */
    Rect.prototype.move = function (x, y) {
        this.x = x | 0;
        this.y = y | 0;
    };
    /**
     * @description returns a new rectangle grow/shrink by a factor, this is not modified.
     * @param dx left & right growth
     * @param dy top & bottom growth
     */
    Rect.prototype.grow = function (dx, dy) {
        return new Rect(this.x - dx, this.y - dy, this.width + dx * 2, this.height + dy * 2);
    };
    /**
     * @description returns a new rectangle translated
     * @param tx x translation
     * @param ty y translation
     */
    Rect.prototype.translate = function (tx, ty) {
        return new Rect(this.x + tx, this.y + ty, this.width, this.height);
    };
    /**
     * @description returns this rectangle scaled by a factor, this is not modified
     * @param sx x, width scale factor
     * @param sy y, height scale factor
     */
    Rect.prototype.scale = function (sx, sy) {
        return new Rect(this.x * sx, this.y * sy, this.width * sx, this.height * sy);
    };
    /**
     * @description returns true if this rectangle is equal to r, false otherwise
     * @param r rectangle to compare
     */
    Rect.prototype.equal = function (r) { return this.x == r.x && this.y == r.y && this.width == r.width && this.height == r.height; };
    /**
     *
     * @param rect IRect object with x, y, width, height values
     * @param toInt comverts to integer rectangle
     */
    Rect.create = function (rect, toInt) {
        var r = new Rect(rect.x, rect.y, rect.width, rect.height);
        toInt && (r.x = r.x | 0, r.y = r.y | 0, r.width = r.width | 0, r.height = r.height | 0);
        return r;
    };
    Object.defineProperty(Rect, "empty", {
        /**
         * @description returns an empty rectangle
         */
        get: function () { return new Rect(0, 0, 0, 0); },
        enumerable: false,
        configurable: true
    });
    /**
     * @description parse a rectangle in string form
     * @param value string in the for "x, y, widht, height"
     */
    Rect.parse = function (value) {
        var numbers = dab_1.parse(value, 4);
        return numbers && new Rect(numbers[0], numbers[1], numbers[2], numbers[3]);
    };
    Object.defineProperty(Rect.prototype, "str", {
        /**
         * @description returns string (x, y, widht, height) of this rectangle
         */
        get: function () { return this.x + ", " + this.y + ", " + this.width + ", " + this.height; },
        enumerable: false,
        configurable: true
    });
    return Rect;
}());
exports.default = Rect;
