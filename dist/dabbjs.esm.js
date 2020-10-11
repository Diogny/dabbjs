/**
 * @description AJAX with promise
 */
var ajaxp = /** @class */ (function () {
    function ajaxp() {
    }
    /**
     * @description gets HTTP AJAX object
     */
    ajaxp.x = function () { return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); };
    /**
     * @description returns a url query object
     * @param data object with properties
     * @param ask true to append, false only props. GET appends to url, POST in body
     * @returns query string
     */
    ajaxp.query = function (data, ask) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        return ((ask && query.length) ? "?" : "") + query.join("&");
    };
    /**
     * @description copies default object properties not in dest object
     * @param io template object
     * @param obj dest object
     * @returns obj updated
     */
    ajaxp.update = function (io, obj) {
        for (var p in io) {
            obj[p] = obj[p] || io[p];
        }
        return obj;
    };
    /**
     * @description performs the AJAX request
     * @param url url
     * @param ox object with values
     * @returns a promise
     */
    ajaxp.send = function (url, ox) {
        return new Promise(function (resolve, reject) {
            var x = ajaxp.x();
            ox = ajaxp.update(ajaxp.xobj, ox);
            x.open(ox.method, url, true);
            x[ajaxp.rt] = ox.responseType;
            x.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); //PHP detect AJAX
            x.onreadystatechange = function () {
                var DONE = 4, // readyState 4 means the request is done.
                OK = 200, // status 200 is a successful return.
                NOT_MODIFIED = 304;
                if (x.readyState == DONE) {
                    var isJson = x[ajaxp.rt] && (x[ajaxp.rt] == "json");
                    if (x.status === OK || x.status === NOT_MODIFIED) {
                        resolve(isJson ? x.response : x.responseText);
                    }
                    else {
                        reject({ status: x.status, d: x.response, xhr: x });
                    }
                }
            };
            if (ox.method == ajaxp.sPost) {
                x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
            x.onerror = function (e) {
                reject(e);
            };
            try {
                x.send(ox.data);
            }
            catch (e) {
                reject({ status: x.status, statusText: x.statusText, xhr: x });
            }
        });
    };
    /**
     * @description performs a AJAX GET
     * @param url url
     * @param ox options below:
     *
     * - method: GET
     * - responseType: json|text. default is "text"
     * - data: object with values, it's sent appended to url ? &
     */
    ajaxp.get = function (url, ox) {
        return (ox = ox || {}, ox.method = ajaxp.sGet, url += ajaxp.query(ox.data, true), ox.data = void 0, ajaxp.send(url, ox));
    };
    /**
     * @description performs a AJAX POST
     * @param url url
     * @param ox options below:
     *
     * - method: POST
     * - responseType: json|text. default is "text"
     * - data: object with values, it's sent in the body
     */
    ajaxp.post = function (url, ox) {
        return (ox = ox || {}, ox.method = ajaxp.sPost, ox.data = ajaxp.query(ox.data, false), ajaxp.send(url, ox));
    };
    ajaxp.sGet = "GET";
    ajaxp.sPost = "POST";
    /**
     * @description template default object properties
     */
    ajaxp.xobj = {
        method: ajaxp.sGet,
        data: void 0,
        responseType: "text"
    };
    ajaxp.rt = "responseType";
    return ajaxp;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

//still in progress...
var c = {
    s: "string",
    o: "object",
    b: "boolean",
    i: "integer",
    n: "number",
    a: "array",
    fn: "function",
    sp: "super",
    c: "color",
    t: "type",
    d: "defaut",
    u: "undefined",
    v: "value",
    svgNs: "http://www.w3.org/2000/svg"
};
var ts = function (t) { return ({}).toString.call(t); };
/**
 * it can be extended later to array [] and object {}
 * @param s any
 */
var empty = function (s) { return typeof s == void 0 || !s || (isStr(s) && s.match(/^ *$/) !== null); };
/**
 * returned values: array, date,	function, number, object, regexp, string, undefined  	global,	JSON, null
 * @param o any
 */
var typeOf = function (o) { return ts(o).slice(8, -1).toLowerCase(); };
var isFn = function (f) { return typeof f === c.fn; };
/**
 * defined,	undefined === void 0
 * @param t any
 */
var dfnd = function (t) { return t !== void 0 && t !== null; };
var isStr = function (s) { return typeof s === c.s; };
/**
 * true for Array, pojo retruns true only for a plain old object {}
 * @param t any
 */
var isObj = function (t) { return typeof t === c.o; };
var isArr = function (t) { return Array.isArray(t); }; // typeOf(t) === c.a;
/**
 * @description returns true if n is number
 * @param n value
 *
 * - "1" returns false
 * - NaN returns true
 */
var isNum = function (n) { return typeof n === c.n; };
/**
 * @description returns true if n is numeric
 * @param n
 *
 * - "1" returns true
 * - NaN returns false
 */
var isNumeric = function (n) { return isNaN(n) ? !1 : (n = parseInt(n), (0 | n) === n); };
//return (typeof x === dab.n) && (x % 1 === 0);
var isInt = function (n) { return (parseFloat(n) == parseInt(n)) && !isNaN(n); };
//http://speakingjs.com/es5/ch11.html#converting_to_integer
/**
 * @description parse a number according to a radix
 * @param s string value
 * @param radix convertion radix
 *
 * - "0101001" => 2		binary
 * - "0xFF"	=> 255 hexadecimal
 * - "123" => 123
 */
var pInt = function (s, radix) { return parseInt(s, radix); };
/**
 * @description clamps a value inside a range min..max
 * @param v value
 * @param min minim
 * @param max maximum
 */
var clamp = function (v, min, max) { return (v <= min) ? min : (v >= max) ? max : v; };
/**
 * @description rounds a number to a decimal
 * @param v float value
 * @param decimals valid decimals
 *
 * - (123.5678, 1) => 123.6
 * - (123.5678, 0) => 124
 * - (123.5678, -1) => NaN
 */
var round = function (v, decimals) {
    //https://expertcodeblog.wordpress.com/2018/02/12/typescript-javascript-round-number-by-decimal-pecision/
    return (decimals = decimals | 0, Number(Math.round(Number(v + "e" + decimals)) + "e-" + decimals));
}; //force toArray
var splat = function (o) { return isArr(o) ? o : (dfnd(o) ? [o] : []); };
/**
 * copy all properties in src to obj, and returns obj
 * @param obj dest object
 * @param src source object
 */
var extend = function (obj, src) {
    //const returnedTarget = Object.assign(target, source); doesn't throw error if source is undefined
    //		but target has to be an object
    pojo(src) && Object.keys(src).forEach(function (key) { obj[key] = src[key]; });
    return obj;
};
/**
 * copy properties in src that exists only in obj, and returns obj
 * @param obj dest and template object
 * @param src source object
 */
var copy = function (obj, src) {
    pojo(src) && Object.keys(obj).forEach(function (key) {
        var k = src[key];
        dfnd(k) && (obj[key] = k);
    });
    return obj;
};
var inherit = function (parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};
/**
 * @description returns true if an element if an HTML or SVG DOM element
 * @param e {any} an element
 */
var isDOM = function (e) { return e instanceof window.HTMLElement || e instanceof window.HTMLDocument; };
/**
 * plainObj   Plain Old JavaScript Object (POJO) {}
 * @param arg args
 */
var pojo = function (arg) {
    if (arg == null || typeof arg !== 'object') {
        return false;
    }
    var proto = Object.getPrototypeOf(arg);
    // Prototype may be null if you used `Object.create(null)`
    // Checking `proto`'s constructor is safe because `getPrototypeOf()`
    // explicitly crosses the boundary from object data to object metadata
    return !proto || proto.constructor.name === 'Object';
    //Object.getPrototypeOf([]).constructor.name == "Array"
    //Object.getPrototypeOf({}).constructor.name == "Object"
    //Object.getPrototypeOf(Object.create(null)) == null
};
/**
 * deep copy
 * @param o any
 */
var obj = function (o) {
    if (!pojo(o)) {
        return o;
    }
    var result = Object.create(null);
    for (var k in o)
        if (!o.hasOwnProperty || o.hasOwnProperty(k)) {
            var prop = o[k];
            result[k] = pojo(prop) ? obj(prop) : prop;
        }
    return result;
};
/**
 * JSON stringify & parse cloner
 * @param o any
 */
var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
var defEnum = function (e) {
    for (var key in e) { //let item = e[key];
        e[e[key]] = key;
    }
    return e;
};
/**
 * css(el, { background: 'green', display: 'none', 'border-radius': '5px' });
 * @param el HTMLElement
 * @param styles object of styles
 */
var css = function (el, styles) {
    if (isStr(styles))
        return el.style[styles];
    else {
        Object.assign(el.style, styles);
        // for (let prop in styles)
        // 	el.style[prop] = styles[prop];
        return el;
    }
};
/**
 * @description get/set html element attribute
 * @param el HTML element
 * @param attrs string to get it's attribute, or an object with attributes to set
 */
var attr = function (el, attrs) {
    if (isStr(attrs))
        return el.getAttribute(attrs);
    for (var attr_1 in attrs)
        el.setAttribute(attr_1, attrs[attr_1]);
    return el;
};
/**
 * @description adds an event listener to an element
 * @param el element
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
var aEL = function (el, type, fn, b) { return el.addEventListener(type, fn, b); };
/**
 * @description removes an event listener from an element
 * @param el element
 * @param type event name
 * @param fn
 * @param b
 */
var rEL = function (el, type, fn, b) { return el.removeEventListener(type, fn, b); };
/**
 * @description adds an event listener to the document
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
var daEl = function (type, fn, b) { return document.addEventListener(type, fn, b); };
/**
 * @description removes an event listener from the document
 * @param el element
 * @param type event name
 * @param fn
 * @param b
 */
var drEL = function (type, fn, b) { return document.removeEventListener(type, fn, b); };
/**
 * @description defines a new object property
 * @param obj object
 * @param propName property name
 * @param attrs attributes
 */
var dP = function (obj, propName, attrs) { return Object.defineProperty(obj, propName, attrs); };
/**
 * @description appends a child element to it's new parent
 * @param parent parent element
 * @param child child element
 */
var aChld = function (parent, child) { return parent.appendChild(child); };
/**
 * @description test for class
 * @param el Element
 * @param className className cannot contain spaces
 * @returns true if present, false otherwise
 */
var hCl = function (el, className) { return el.classList.contains(className); };
/**
 * @description adds a class to an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
var aCl = function (el, className) { return el.classList.add(className); };
/**
 * @description removes a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
var rCl = function (el, className) { return el.classList.remove(className); };
/**
 * @description toggles a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 * @param force undefined is toggle, true is add, false is remove
 * @returns true if present, false if not
 */
var tCl = function (el, className, force) { return el.classList.toggle(className, force); };
//https://plainjs.com/javascript/traversing/match-element-selector-52/
//https://plainjs.com/javascript/traversing/get-siblings-of-an-element-40/
var range = function (s, e) { return Array.from('x'.repeat(e - s), function (_, i) { return s + i; }); };
/**
 * return unique items in array
 * @param x array
 */
var unique = function (x) { return x.filter(function (elem, index) { return x.indexOf(elem) === index; }); };
var union = function (x, y) { return unique(x.concat(y)); };
/**
 * add class safe
 * @param el HTMLElement
 * @param className class names separated by space
 */
var aClx = function (el, className) {
    var _a;
    (_a = el.classList).add.apply(_a, __spread((className || "").split(' ').filter(function (v) { return !empty(v); })));
    return el;
};
/**
 * LINQ select many
 * @param input
 * @param selectListFn
 */
var selectMany = function (input, selectListFn) {
    return input.reduce(function (out, inx) {
        out.push.apply(out, __spread(selectListFn(inx)));
        return out;
    }, new Array());
};
var a = {
    'TRUE': true,
    'True': true,
    'true': true,
    '1': true,
    'FALSE': false,
    'False': false,
    'false': false,
    '0': false
};
/**
 * return true if value it's true or false, undefined if not valid
 * @param val any
 *
 * value can be:
 * - TRUE
 * - True
 * - true
 * - FALSE
 * - False
 * - false
 * - 1
 * - 0
 */
var toBool = function (val) { return a[val]; };
/**
 * return true if value is a valid boolean
 * @param val any
 *
 * valid values are:
 * - TRUE
 * - True
 * - true
 * - FALSE
 * - False
 * - false
 * - 1
 * - 0
 */
var isBool = function (val) { return a[val] != undefined; };
/**
 * @description converts a value to boolean, and undefined are forced to boolean
 * @param val value
 * @param forcedUndefined forced undefined values, default is "false"
 */
var fBool = function (val, forcedUndefined) { return a[val] || !!forcedUndefined; };
/**
 * parses an string and returns an array of parsed number values
 * @param s string in the form "n0, n1, n2, n3, n(n)"
 * @param l amount of valid numbers to parse
 * @returns number array if valid, undefined otherwise
 */
var parse = function (s, l) {
    var n, nans = false, numbers = s.split(',').map(function (str) { return (n = parseFloat(str), isNaN(n) && (nans = true), n); });
    return (nans || numbers.length != l) ? void 0 : numbers;
};

var dab = /*#__PURE__*/Object.freeze({
	__proto__: null,
	consts: c,
	ts: ts,
	empty: empty,
	typeOf: typeOf,
	isFn: isFn,
	dfnd: dfnd,
	isStr: isStr,
	isObj: isObj,
	isArr: isArr,
	isNum: isNum,
	isNumeric: isNumeric,
	isInt: isInt,
	pInt: pInt,
	clamp: clamp,
	round: round,
	splat: splat,
	extend: extend,
	copy: copy,
	inherit: inherit,
	isDOM: isDOM,
	pojo: pojo,
	obj: obj,
	clone: clone,
	defEnum: defEnum,
	css: css,
	attr: attr,
	aEL: aEL,
	rEL: rEL,
	daEl: daEl,
	drEL: drEL,
	dP: dP,
	aChld: aChld,
	hCl: hCl,
	aCl: aCl,
	rCl: rCl,
	tCl: tCl,
	range: range,
	unique: unique,
	union: union,
	aClx: aClx,
	selectMany: selectMany,
	toBool: toBool,
	isBool: isBool,
	fBool: fBool,
	parse: parse
});

//Point class is adapted from:
/**
 * @description a 2 dimension integer point class
 */
var Point = /** @class */ (function () {
    /**
     * @description creates a Point 2D
     * @param x number, is rounded
     * @param y number, is rounded
     */
    function Point(x, y) {
        this.x = Math.round(x);
        this.y = Math.round(y);
    }
    /**
     * @description calculates distance from this point to another
     * @param p point
     */
    Point.prototype.distance = function (p) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    /**
     * @description clones point
     */
    Point.prototype.clone = function () { return new Point(this.x, this.y); };
    /**
     * @description returns a new point shifted by (x,y) vector
     * @param x vector x
     * @param y vector y
     */
    Point.prototype.add = function (x, y) {
        return new Point(this.x + x, this.y + y);
    };
    /**
     * @description scales this point by a multiple (x,y)
     * @param x mul x
     * @param y mul y
     */
    Point.prototype.mul = function (x, y) { return new Point(this.x * x, this.y * y); };
    /**
     * @description equality comparer
     * @param p point
     */
    Point.prototype.equal = function (p) { return this.x == p.x && this.y == p.y; };
    /**
     * @description returns string of a Point oobject
     * @param options 0 = x,y	1 = parenthesis; 	2 = variables x: x, y: y
     */
    Point.prototype.toString = function (options) {
        var vars = ((options = options | 0) & 2) != 0, pars = (options & 1) != 0;
        return "" + (pars ? "(" : "") + (vars ? "x: " : "") + round(this.x, 1) + ", " + (vars ? "y: " : "") + round(this.y, 1) + (pars ? ")" : "");
    };
    Object.defineProperty(Point.prototype, "str", {
        get: function () { return this.x + ", " + this.y; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "quadrant", {
        /**
         * @description returns quadrant of this point
         * @returns 0 (0,0); -1 (x==0 or y ==0); 1 (y>0,x>0); 2 (y>0,x<0); 3 (y<0,x<0); 4 (y<0,x>0)
         */
        get: function () {
            if (this.x == 0 || this.y == 0) {
                return (this.x == this.y) ? 0 : -1;
            }
            if (this.y > 0)
                return (this.x > 0) ? 1 : 2;
            else
                return (this.x < 0) ? 3 : 4;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description rotatea a point (x,y) through center (x,y) by an angle
     * @param {number} x x to rotate
     * @param {number} y y to rotate
     * @param {number} cx thru center x
     * @param {number} cy thru center y
     * @param {number} angle angle to rotate
     */
    Point.rotateBy = function (x, y, cx, cy, angle) {
        var radians = (Math.PI / 180) * angle, cos = Math.cos(radians), sin = Math.sin(radians), nx = (cos * (x - cx)) + (sin * (y - cy)) + cx, ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return { x: nx | 0, y: ny | 0 }; //round(nx, 3), round(ny, 3)
    };
    Point.validateRotation = function (val) {
        return (val = (val | 0) % 360, (val < 0) && (val += 360), val);
    };
    Object.defineProperty(Point, "origin", {
        get: function () { return new Point(0, 0); },
        enumerable: false,
        configurable: true
    });
    Point.create = function (p) {
        return new Point(p.x, p.y);
    };
    /**
     * @description parse an string into an (x,y) Point
     * @param value string in the for "x, y"
     */
    Point.parse = function (value) {
        var numbers = parse(value, 2);
        return numbers && new Point(numbers[0], numbers[1]);
    };
    Point.scale = function (v, k) { return new Point(k * v.x, k * v.y); };
    Point.translateBy = function (v, dx, dy) { return new Point(v.x + dx, v.y + dy); };
    Point.times = function (v, scaleX, scaleY) { return new Point(v.x * scaleX, v.y * scaleY); };
    Point.minus = function (v1, v2) { return new Point(v1.x - v2.x, v1.y - v2.y); };
    Point.plus = function (v1, v2) { return new Point(v1.x + v2.x, v1.y + v2.y); };
    Point.inside = function (p, s) { return p.x >= 0 && p.x <= s.width && p.y >= 0 && p.y <= s.height; };
    return Point;
}());

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

/**
 * @description retrieves all DOM script templates
 *
 * script with attribute data-tmpl="id" are returned as an object with [id] as key.
 *
 * it removes any CDATA, LF, NL, Tabs from result
 */
var DOMTemplates = function () {
    var templates = {};
    Array.from(qSA('script[data-tmpl]')).forEach((function (scr) {
        var id = scr.getAttribute('data-tmpl'), src = scr.innerHTML.replace("<![CDATA[", "").replace("]]>", "").replace(/[\r\n\t]/g, "").trim();
        templates[id] = src;
    }));
    return templates;
};
/**
 * used for string & numbers
 * @param t string
 * @param e amount
 * @param ch pad char
 */
var pad = function (t, e, ch) {
    return new Array(Math.max(0, (e || 2) + 1 - String(t).length)).join(ch ? ch : '0') + t;
};
/**
 *
 * @param ch char|string to fill
 * @param len repeat count, must be equal or greater than zero
 */
var fillChar = function (ch, len) { return new Array(len + 1).join(ch); };
/**
 * @description left pads an string
 * @param s string to padd
 * @param width max amount of final string, if less, same string is returned
 */
var padStr = function (s, width) { return new Array(Math.max(0, width - s.length + 1)).join(' ') + s; };
/**
 * @description pad left number
 * @param n number to convert to string
 * @param width max width, if less, number to string is returned
 */
var formatNumber = function (n, width) { return padStr(n + "", width); };
/**
 * @description creates an SVG element by tag name
 * @param tagName tag name
 * @param id optional name
 * @param nsAttrs attributes
 */
var tag = function (tagName, id, nsAttrs) { return (id && (nsAttrs.id = id),
    attr(document.createElementNS(c.svgNs, tagName), nsAttrs)); };
/**
 * @description creates an SVG element by an string
 * @param html html string representation
 */
var svg = function (html) {
    var template = document.createElementNS(c.svgNs, "template");
    template.innerHTML = html;
    return template.children[0];
};
/**
 * @description creates an HTML element by an string
 * @param html html string representation
 */
var html = function (html) {
    var template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstChild;
};
/**
 * @description returns the points of an arrow and vector
 * @param a first point
 * @param b second point
 * @param head arrow head length
 * @param swipe swipe angle of head line
 */
var arrow = function (a, b, head, swipe) {
    var v = new Vector2D(b.x - a.x, b.y - a.y), angle = Math.atan2(v.y, v.x), p = function (ang) { return new Point(b.x - head * Math.cos(ang), b.y - head * Math.sin(ang)); };
    return {
        ang: angle,
        v: v,
        a: p(angle - swipe),
        b: p(angle + swipe)
    };
};
/**
 * @description loops through an object properties and returns it in a function
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => void
 */
var each = function (obj, fn) {
    if (!isFn(fn) || !obj)
        return;
    var ndx = 0;
    for (var key in obj)
        if (!obj.hasOwnProperty || obj.hasOwnProperty(key))
            fn(obj[key], key, ndx++); // (value, key, index)
};
/**
 * @description returns an array of all object properties mapped
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => any
 */
var map = function (obj, fn) {
    var arr = [];
    each(obj, function (value, key, ndx) {
        arr.push(fn(value, key, ndx));
    });
    return arr;
};
/**
 * @description filters an object properties by a function
 * @param obj an object
 * @param fn a function as (value: any, key: string, ndx: number) => any
 */
var filter = function (obj, fn) {
    var o = {};
    each(obj, function (value, key, ndx) {
        fn(value, key, ndx) && (o[key] = value);
    });
    return o;
};
/**
 * @description
 * @param obj an object to filter
 * @param fn if it returns true array[]= value (key is lost), if object array[] = object, otherwise discarded
 */
var filterArray = function (obj, fn) {
    var o = [];
    each(obj, function (value, key, ndx) {
        var res = fn(value, key, ndx);
        if (res === true)
            o.push(value);
        else if (pojo(res))
            o.push(res);
    });
    return o;
};
/**
 * @description get/set object property
 * @param o object
 * @param path path to property "a.b.c"
 * @param value undefined to get value, otherwise
 */
var prop = function (o, path, value) {
    var r = path.split('.').map(function (s) { return s.trim(); }), last = r.pop(), result = void 0;
    for (var i = 0; !!o && i < r.length; i++) {
        o = o[r[i]];
    }
    result = o && o[last];
    return value != undefined ? ((result != undefined) && (o[last] = value, true)) : result;
};
/**
 * @description calls a function when DOM is ready
 * @param fn function to be called
 */
var ready = function (fn) {
    if (!isFn(fn)) {
        return !1;
    }
    if (document.readyState != "loading")
        return (fn(), !0);
    else if (document["addEventListener"])
        aEL(document, "DOMContentLoaded", fn, false);
    else
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState == "complete")
                fn();
        });
    return !0;
};
/**
 * @description document.querySelector shortcut
 * @param selectors query string
 * @param elem HTMLElement or document if undefined
 */
var qS = function (selectors, elem) { return (elem || document).querySelector(selectors); };
/**
 * @description document.querySelectorAll shortcut
 * @param selectors query string
 * @param elem HTMLElement or document if undefined
 */
var qSA = function (selectors, elem) { return (elem || document).querySelectorAll(selectors); };
/**
 * @description document.getElementById shortcut
 * @param s #id
 */
var gEId = function (id) { return document.getElementById(id); };
/**
 * @description extracts a base-name from page metadata
 */
var basePath = function () {
    var meta = qS('meta[name="base"]');
    return meta ? meta.getAttribute('content') : "";
};
/**
 * @description creates a NxN matrix
 * @param rows amount of rows
 * @param cols amount of columns
 * @param filler cell filler
 */
var matrix = function (rows, cols, filler) {
    return Array.from({ length: rows }, function () { return new Array(cols).fill(filler); });
};
/**
 * @description converts a web css property to camel case
 * @param str font-size  -webkit-box-shadow
 * @@returns fontSize  WebkitBoxShadow
 */
var cssCamel = function (str) { return str.replace(/\-([a-z])/gi, function (match, group) { return group.toUpperCase(); }); };
/**
 * @description removes camel of a web css property
 * @param str fontSize  WebkitBoxShadow
 * @returns font-size  -webkit-box-shadow
 */
var cssUncamel = function (str) { return str.replace(/([A-Z])/g, function (match, group) { return '-' + group.toLowerCase(); }); };
/**
 * @description converts an string to camel case
 * @param str string
 *
 * - width => Width
 * - width height => Width Height
 */
var camel = function (str) { return str.replace(/([a-z])(\w*)/gi, function (match, letter, rest) { return letter.toUpperCase() + rest; }); };

var utils = /*#__PURE__*/Object.freeze({
	__proto__: null,
	DOMTemplates: DOMTemplates,
	pad: pad,
	fillChar: fillChar,
	padStr: padStr,
	formatNumber: formatNumber,
	tag: tag,
	svg: svg,
	html: html,
	arrow: arrow,
	each: each,
	map: map,
	filter: filter,
	filterArray: filterArray,
	prop: prop,
	ready: ready,
	qS: qS,
	qSA: qSA,
	gEId: gEId,
	basePath: basePath,
	matrix: matrix,
	cssCamel: cssCamel,
	cssUncamel: cssUncamel,
	camel: camel
});

var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = Math.round(width);
        this.height = Math.round(height);
    }
    Size.prototype.clone = function () { return new Size(this.width, this.height); };
    Size.prototype.equal = function (size) { return this.width == size.width && this.height == size.height; };
    Object.defineProperty(Size.prototype, "positive", {
        /**
         * @description returns true if both width & height are positive
         */
        get: function () { return this.width >= 0 && this.height >= 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Size, "empty", {
        get: function () { return new Size(0, 0); },
        enumerable: false,
        configurable: true
    });
    Size.create = function (size) {
        return new Size(size.width, size.height);
    };
    /**
     * @description parse an string into an (x,y) Size
     * @param value string in the for "width, height"
     */
    Size.parse = function (value) {
        var numbers = parse(value, 2);
        return numbers && new Size(numbers[0], numbers[1]);
    };
    /**
     * returns string of a Size oobject
     * @param options  0 = width,height	1 = parenthesis	2 = short variables w: width, h: height	4 = long variables (width: width, height: height)
     */
    Size.prototype.toString = function (options) {
        var pars = ((options = options | 0) & 1) != 0, shortVars = (options & 2) != 0, longVars = (options & 4) != 0, width = function () { return shortVars ? "w: " : longVars ? "width: " : ""; }, height = function () { return shortVars ? "h: " : longVars ? "height: " : ""; };
        return "" + (pars ? "(" : "") + width() + round(this.width, 1) + ", " + height() + round(this.height, 1) + (pars ? ")" : "");
    };
    Object.defineProperty(Size.prototype, "str", {
        get: function () { return this.width + ", " + this.height; },
        enumerable: false,
        configurable: true
    });
    return Size;
}());

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
        var numbers = parse(value, 4);
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

//Color class is adapted from:
//https://github.com/Microsoft/TypeScriptSamples/blob/master/raytracer/raytracer.ts
var Color = /** @class */ (function () {
    function Color(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    Color.scale = function (k, v) { return new Color(k * v.r, k * v.g, k * v.b); };
    Color.plus = function (v1, v2) { return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b); };
    Color.times = function (v1, v2) { return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b); };
    Color.toDrawingColor = function (c) {
        var legalize = function (d) { return d > 1 ? 1 : d; };
        return {
            r: Math.floor(legalize(c.r) * 255),
            g: Math.floor(legalize(c.g) * 255),
            b: Math.floor(legalize(c.b) * 255)
        };
    };
    Color.white = new Color(1.0, 1.0, 1.0);
    Color.grey = new Color(0.5, 0.5, 0.5);
    Color.black = new Color(0.0, 0.0, 0.0);
    Color.background = Color.black;
    Color.defaultColor = Color.black;
    return Color;
}());

var Templates = /** @class */ (function () {
    function Templates() {
    }
    Templates.get = function (key) { return Templates.map.get(key); };
    Templates.set = function (key, value) { Templates.map.set(key, value); };
    Object.defineProperty(Templates, "size", {
        get: function () { return Templates.map.size; },
        enumerable: false,
        configurable: true
    });
    Templates.register = function (obj) {
        for (var key in obj) {
            Templates.set(key, obj[key]);
        }
    };
    /**
     * @description simple template parser
     * @param key template's key name
     * @param obj object to get values from
     */
    Templates.nano = function (key, obj) {
        var str = Templates.get(key);
        return str.replace(/\{\{\s*([\w\.]*)\s*\}\}/g, function (n, t) {
            for (var arr = t.split("."), f = obj[arr.shift()], i = 0, len = arr.length; f && len > i; i++)
                f = f[arr[i]];
            return "undefined" != typeof f && null !== f ? f : "null";
        });
    };
    /**
     * @description full template parser
     * @param key template's key name
     * @param obj object to get values from
     */
    Templates.parse = function (key, obj, beautify) {
        var xml = XML.parse(Templates.get(key), "text/html"), nsMap = new Map(), getValue = function (ns, o) {
            for (var arr = ns.split("."), f = o[arr.shift()], i = 0, len = arr.length; f && len > i; i++)
                f = f[arr[i]];
            return f;
        }, getMappedValue = function (ns) {
            var value = nsMap.get(ns);
            !value && nsMap.set(ns, value = getValue(ns, obj));
            return value;
        }, processNode = function (node, rootName, arr, ndx) {
            var isMatch = false, attributes = Array.from(node.attributes), parseContent = function (str) {
                var regex = /\{\{\s*([\w\.]*)\s*\}\}/g, match, parsed = "", index = 0;
                while (match = regex.exec(str)) {
                    parsed += str.substr(index, match.index - index);
                    isMatch = true;
                    if (rootName == match[1])
                        parsed += arr[ndx];
                    else if (rootName && match[1].startsWith(rootName + '.')) {
                        parsed += getValue(match[1].substr(rootName.length + 1), arr[ndx]);
                    }
                    else {
                        parsed += getMappedValue(match[1]);
                    }
                    index = match.index + match[0].length;
                }
                parsed += str.substr(index, str.length - index);
                return parsed;
            };
            for (var i = 0; i < attributes.length; i++) {
                var attr = attributes[i], attrName = attr.name, isIndex = attrName == 'd-for-ndx', removeUndefined = attrName.endsWith('?'), value = void 0;
                isMatch = false;
                isIndex
                    ? (attrName = attr.value, value = ndx)
                    : (value = parseContent(attr.value), removeUndefined && (attrName = attrName.substr(0, attrName.length - 1)));
                if (removeUndefined || isIndex) {
                    node.removeAttribute(attr.name);
                    if (value != "undefined")
                        node.setAttribute(attrName, value);
                }
                else
                    isMatch && (attr.value = value);
            }
            if (!node.children.length) {
                node.firstChild && (node.firstChild.nodeValue = parseContent(node.firstChild.nodeValue));
            }
            else
                processChildren(node, rootName, arr, ndx);
        }, processChild = function (child, rootName, arr, ndx) {
            var _a;
            var _for = child.getAttribute('d-for');
            if (_for) {
                if (rootName)
                    throw 'nested @for not supported';
                child.removeAttribute('d-for');
                var match_1 = _for.match(/(\w*)\s+in\s+(\w*)/), array_1 = match_1 ? obj[match_1[2]] : void 0;
                if (!array_1)
                    throw 'invalid %for template';
                array_1.forEach(function (item, ndx) {
                    var _a;
                    var node = child.cloneNode(true);
                    (_a = child.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(node, child);
                    processNode(node, match_1[1], array_1, ndx);
                });
                (_a = child.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(child);
                return array_1.length;
            }
            else {
                processNode(child, rootName, arr, ndx);
                return 1;
            }
        }, processChildren = function (parent, rootName, arr, ndx) {
            for (var i = 0, child = parent.children[i]; i < parent.children.length; child = parent.children[i]) {
                i += processChild(child, rootName, arr, ndx);
            }
        };
        processChildren(xml.body, void 0, void 0, void 0);
        return beautify ?
            XML.prettify(xml.body.firstChild)
            : xml.body.innerHTML;
    };
    Templates.map = new Map();
    return Templates;
}());
//https://gist.github.com/max-pub/a5c15b7831bbfaba7ad13acefc3d0781
var XML = {
    parse: function (str, type) {
        if (type === void 0) { type = 'text/xml'; }
        return new DOMParser().parseFromString(str, type);
    },
    stringify: function (DOM) { return new XMLSerializer().serializeToString(DOM); },
    transform: function (xml, xsl) {
        var proc = new XSLTProcessor();
        proc.importStylesheet(typeof xsl == 'string' ? XML.parse(xsl) : xsl);
        var output = proc.transformToFragment(typeof xml == 'string' ? XML.parse(xml) : xml, document);
        return typeof xml == 'string' ? XML.stringify(output) : output; // if source was string then stringify response, else return object
    },
    minify: function (node) { return XML.toString(node, false); },
    prettify: function (node) { return XML.toString(node, true); },
    toString: function (node, pretty, level, singleton) {
        if (level === void 0) { level = 0; }
        if (singleton === void 0) { singleton = false; }
        if (typeof node == 'string')
            node = XML.parse(node);
        var tabs = pretty ? Array(level + 1).fill('').join('\t') : '', newLine = pretty ? '\n' : '';
        if (node.nodeType == 3) {
            var nodeContent = (singleton ? '' : tabs) + node.textContent.trim();
            return nodeContent.trim() ? nodeContent + (singleton ? '' : newLine) : "";
        }
        if (!node.tagName)
            return XML.toString(node.firstChild, pretty);
        var output = tabs + ("<" + node.tagName); // >\n
        for (var i = 0; i < node.attributes.length; i++)
            output += " " + node.attributes[i].name + "=\"" + node.attributes[i].value + "\"";
        if (node.childNodes.length == 0)
            return output + ' />' + newLine;
        else
            output += '>';
        var onlyOneTextChild = ((node.childNodes.length == 1) && (node.childNodes[0].nodeType == 3));
        if (!onlyOneTextChild)
            output += newLine;
        for (var i = 0; i < node.childNodes.length; i++)
            output += XML.toString(node.childNodes[i], pretty, level + 1, onlyOneTextChild);
        return output + (onlyOneTextChild ? '' : tabs) + ("</" + node.tagName + ">") + newLine;
    }
};

export { Color, Point, Rect, Size, Templates, XML, ajaxp, dab, utils };
