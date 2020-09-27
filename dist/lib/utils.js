"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camel = exports.cssUncamel = exports.cssCamel = exports.matrix = exports.basePath = exports.gEId = exports.qSA = exports.qS = exports.ready = exports.prop = exports.filterArray = exports.filter = exports.map = exports.each = exports.html = exports.svg = exports.tag = exports.formatNumber = exports.padStr = exports.fillChar = exports.pad = exports.DOMTemplates = void 0;
var dab_1 = require("./dab");
exports.DOMTemplates = function () {
    var templates = {};
    Array.from(exports.qSA('script[data-tmpl]')).forEach((function (scr) {
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
exports.pad = function (t, e, ch) {
    return new Array(Math.max(0, (e || 2) + 1 - String(t).length)).join(ch ? ch : '0') + t;
};
exports.fillChar = function (ch, len) { return new Array(len).join(ch); };
exports.padStr = function (s, width) { return new Array(Math.max(0, width - s.length)).join(' ') + s; };
exports.formatNumber = function (n, width) { return exports.padStr(n + "", width); };
/**
 * @description creates an SVG element by tag name
 * @param tagName tag name
 * @param id optional name
 * @param nsAttrs attributes
 */
exports.tag = function (tagName, id, nsAttrs) { return (id && (nsAttrs.id = id),
    dab_1.attr(document.createElementNS(dab_1.consts.svgNs, tagName), nsAttrs)); };
/**
 * @description creates an SVG element by an string
 * @param html html string representation
 */
exports.svg = function (html) {
    var template = document.createElementNS(dab_1.consts.svgNs, "template");
    template.innerHTML = html;
    return template.children[0];
};
/**
 * @description creates an HTML element by an string
 * @param html html string representation
 */
exports.html = function (html) {
    var template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstChild;
};
/**
 * for objects
 * @param obj
 * @param fn
 */
exports.each = function (obj, fn) {
    if (!dab_1.isFn(fn) || !obj)
        return;
    var ndx = 0;
    for (var key in obj)
        if (!obj.hasOwnProperty || obj.hasOwnProperty(key))
            fn(obj[key], key, ndx++); // (value, key, index)
};
/**
 * for objects
 * @param obj
 * @param fn
 */
exports.map = function (obj, fn) {
    var arr = [];
    exports.each(obj, function (value, key, ndx) {
        arr.push(fn(value, key, ndx));
    });
    return arr;
};
/**
 * for objects, returns an object with key=>value
 * @param obj
 * @param fn
 */
exports.filter = function (obj, fn) {
    var o = {};
    exports.each(obj, function (value, key, ndx) {
        fn(value, key, ndx) && (o[key] = value);
    });
    return o;
};
/**
 * @description
 * @param obj an object to filter
 * @param fn if it returns true array[]= value (key is lost), if object array[] = object, otherwise discarded
 */
exports.filterArray = function (obj, fn) {
    var o = [];
    exports.each(obj, function (value, key, ndx) {
        var res = fn(value, key, ndx);
        if (res === true)
            o.push(value);
        else if (dab_1.pojo(res))
            o.push(res);
    });
    return o;
};
exports.prop = function (o, path, value) {
    var r = path.split('.').map(function (s) { return s.trim(); }), last = r.pop(), result = void 0;
    for (var i = 0; !!o && i < r.length; i++) {
        o = o[r[i]];
    }
    result = o && o[last];
    return value ? ((result != undefined) && (o[last] = value, true)) : result;
};
exports.ready = function (fn) {
    if (!dab_1.isFn(fn)) {
        return !1;
    }
    if (document.readyState != "loading")
        return (fn(), !0);
    else if (document["addEventListener"])
        dab_1.aEL(document, "DOMContentLoaded", fn, false);
    else
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState == "complete")
                fn();
        });
    return !0;
};
/**
 * @description document.querySelector shortcut
 * @param s query
 */
exports.qS = function (s) { return document.querySelector(s); };
/**
 * @description document.querySelectorAll shortcut
 * @param s query
 */
exports.qSA = function (s) { return document.querySelectorAll(s); };
/**
 * @description document.getElementById shortcut
 * @param s #id
 */
exports.gEId = function (id) { return document.getElementById(id); };
/**
 * @description extracts a base-name from page metadata
 */
exports.basePath = function () {
    var meta = exports.qS('meta[name="base"]');
    return meta ? meta.getAttribute('content') : "";
};
/**
 * @description creates a NxN matrix
 * @param rows amount of rows
 * @param cols amount of columns
 * @param filler cell filler
 */
exports.matrix = function (rows, cols, filler) {
    return Array.from({ length: rows }, function () { return new Array(cols).fill(filler); });
};
/**
 * @description converts a web css property to camel case
 * @param str font-size  -webkit-box-shadow
 * @@returns fontSize  WebkitBoxShadow
 */
exports.cssCamel = function (str) { return str.replace(/\-([a-z])/gi, function (match, group) { return group.toUpperCase(); }); };
/**
 * @description removes camel of a web css property
 * @param str fontSize  WebkitBoxShadow
 * @returns font-size  -webkit-box-shadow
 */
exports.cssUncamel = function (str) { return str.replace(/([A-Z])/g, function (match, group) { return '-' + group.toLowerCase(); }); };
/**
 * @description converts an string to camel case
 * @param str string
 *
 * - width => Width
 * - width height => Width Height
 */
exports.camel = function (str) { return str.replace(/([a-z])(\w*)/gi, function (match, letter, rest) { return letter.toUpperCase() + rest; }); };
