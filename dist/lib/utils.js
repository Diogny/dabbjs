import { attr, consts, isFn, pojo, aEL } from './dab.ts';
import Point from './point.ts';
import Vector2D from './vec2.ts';

const DOMTemplates = () => {
  let templates = {};
  Array.from(qSA("script[data-tmpl]")).forEach((scr) => {
    let id = scr.getAttribute("data-tmpl"), src = scr.innerHTML.replace("<![CDATA[", "").replace("]]>", "").replace(/[\r\n\t]/g, "").trim();
    templates[id] = src;
  });
  return templates;
};
const pad = (t, e, ch) => new Array(Math.max(0, (e || 2) + 1 - String(t).length)).join(ch ? ch : "0") + t;
const fillChar = (ch, len) => new Array(len + 1).join(ch);
const padStr = (s, width) => new Array(Math.max(0, width - s.length + 1)).join(" ") + s;
const formatNumber = (n, width) => padStr(n + "", width);
const tag = (tagName, id, nsAttrs) => (id && (nsAttrs.id = id), attr(document.createElementNS(consts.svgNs, tagName), nsAttrs));
const svg = (html2) => {
  let template = document.createElementNS(consts.svgNs, "template");
  template.innerHTML = html2;
  return template.children[0];
};
const html = (html2) => {
  let template = document.createElement("template");
  template.innerHTML = html2;
  return template.content.firstChild;
};
const arrow = (a, b, head, swipe) => {
  let v = new Vector2D(b.x - a.x, b.y - a.y), angle = Math.atan2(v.y, v.x), p = (ang) => new Point(b.x - head * Math.cos(ang), b.y - head * Math.sin(ang));
  return {
    ang: angle,
    v,
    a: p(angle - swipe),
    b: p(angle + swipe)
  };
};
const each = (obj, fn) => {
  if (!isFn(fn) || !obj)
    return;
  let ndx = 0;
  for (let key in obj)
    if (!obj.hasOwnProperty || obj.hasOwnProperty(key))
      fn(obj[key], key, ndx++);
};
const map = (obj, fn) => {
  let arr = [];
  each(obj, (value, key, ndx) => {
    arr.push(fn(value, key, ndx));
  });
  return arr;
};
const filter = (obj, fn) => {
  let o = {};
  each(obj, (value, key, ndx) => {
    fn(value, key, ndx) && (o[key] = value);
  });
  return o;
};
const filterArray = (obj, fn) => {
  let o = [];
  each(obj, (value, key, ndx) => {
    let res = fn(value, key, ndx);
    if (res === true)
      o.push(value);
    else if (pojo(res))
      o.push(res);
  });
  return o;
};
const prop = function(o, path, value) {
  let r = path.split(".").map((s) => s.trim()), last = r.pop(), result;
  for (let i = 0; !!o && i < r.length; i++) {
    o = o[r[i]];
  }
  result = o && o[last];
  return value != void 0 ? result != void 0 && (o[last] = value, true) : result;
};
const ready = (fn) => {
  if (!isFn(fn)) {
    return false;
  }
  if (document.readyState != "loading")
    return fn(), true;
  else if (document["addEventListener"])
    aEL(document, "DOMContentLoaded", fn, false);
  else
    document.attachEvent("onreadystatechange", () => {
      if (document.readyState == "complete")
        fn();
    });
  return true;
};
const qS = (selectors, elem) => (elem || document).querySelector(selectors);
const qSA = (selectors, elem) => (elem || document).querySelectorAll(selectors);
const gEId = (id) => document.getElementById(id);
const basePath = () => {
  let meta = qS('meta[name="base"]');
  return meta ? meta.getAttribute("content") : "";
};
const matrix = (rows, cols, filler) => Array.from({ length: rows }, () => new Array(cols).fill(filler));
const cssCamel = (str) => str.replace(/\-([a-z])/gi, (match, group) => group.toUpperCase());
const cssUncamel = (str) => str.replace(/([A-Z])/g, (match, group) => "-" + group.toLowerCase());
const camel = (str) => str.replace(/([a-z])(\w*)/gi, (match, letter, rest) => letter.toUpperCase() + rest);

export { DOMTemplates, arrow, basePath, camel, cssCamel, cssUncamel, each, fillChar, filter, filterArray, formatNumber, gEId, html, map, matrix, pad, padStr, prop, qS, qSA, ready, svg, tag };
