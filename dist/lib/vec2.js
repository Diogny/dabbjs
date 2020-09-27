"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//inspired by
//https://evanw.github.io/lightgl.js/docs/vector.html
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * @description returns the length of the vector
     */
    Vector2D.prototype.length = function () { return Math.sqrt(this.dot(this)); };
    /**
     * @description returns DOT product of these vectors
     * @param v vector 2d
     */
    Vector2D.prototype.dot = function (v) { return this.x * v.x + this.y * v.y; };
    /**
     * @description returns the Determinant of these vectors
     * @param v vector 2d
     */
    Vector2D.prototype.det = function (v) { return this.x * v.y - this.y * v.x; };
    /**
     * @description returns the angle between these two vectors
     * @param v vector 2d
     */
    Vector2D.prototype.angleTo = function (v) { return Math.atan2(this.det(v), this.dot(v)); };
    /**
     * @description returns the vector addition
     * @param v vector2d or number
     */
    Vector2D.prototype.add = function (v) {
        if (typeof v === "number")
            return new Vector2D(this.x + v, this.y + v);
        else
            return new Vector2D(this.x + v.x, this.y + v.y);
    };
    /**
     * @description returns the vector subtraction
     * @param v vector2d or number
     */
    Vector2D.prototype.sub = function (v) {
        if (typeof v === "number")
            return new Vector2D(this.x - v, this.y - v);
        else
            return new Vector2D(this.x - v.x, this.y - v.y);
    };
    /**
     * @description returns the vector multiplication
     * @param v vector2d or number
     */
    Vector2D.prototype.mul = function (v) {
        if (typeof v === "number")
            return new Vector2D(this.x * v, this.y * v);
        else
            return new Vector2D(this.x * v.x, this.y * v.y);
    };
    /**
     * @description returns the vector division
     * @param v vector2d or number
     */
    Vector2D.prototype.div = function (v) {
        if (typeof v === "number")
            return new Vector2D(this.x / v, this.y / v);
        else
            return new Vector2D(this.x / v.x, this.y / v.y);
    };
    /**
     * @description returns the Unit vector
     */
    Vector2D.prototype.unit = function () { return this.div(this.length()); };
    /**
     * @description returns a clone of this vector
     */
    Vector2D.prototype.clone = function () { return new Vector2D(this.x, this.y); };
    /**
     * @description returns the XY plane origin/empty vector
     */
    Vector2D.empty = function () { return new Vector2D(0, 0); };
    return Vector2D;
}());
exports.default = Vector2D;
