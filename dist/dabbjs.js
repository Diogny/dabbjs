'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var interfaces_ts = require('./lib/interfaces.ts');
var ajaxp_ts = require('./lib/ajaxp.ts');
var dab_ts = require('./lib/dab.ts');
var utils_ts = require('./lib/utils.ts');
var point_ts = require('./lib/point.ts');
var size_ts = require('./lib/size.ts');
var rect_ts = require('./lib/rect.ts');
var colors_ts = require('./lib/colors.ts');
var templates_ts = require('./lib/templates.ts');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			}
		});
	}
	n['default'] = e;
	return Object.freeze(n);
}

var ajaxp_ts__default = /*#__PURE__*/_interopDefaultLegacy(ajaxp_ts);
var dab_ts__namespace = /*#__PURE__*/_interopNamespace(dab_ts);
var utils_ts__namespace = /*#__PURE__*/_interopNamespace(utils_ts);
var point_ts__default = /*#__PURE__*/_interopDefaultLegacy(point_ts);
var size_ts__default = /*#__PURE__*/_interopDefaultLegacy(size_ts);
var rect_ts__default = /*#__PURE__*/_interopDefaultLegacy(rect_ts);
var colors_ts__default = /*#__PURE__*/_interopDefaultLegacy(colors_ts);



Object.defineProperty(exports, 'IEqual', {
	enumerable: true,
	get: function () {
		return interfaces_ts.IEqual;
	}
});
Object.defineProperty(exports, 'IJsonColor', {
	enumerable: true,
	get: function () {
		return interfaces_ts.IJsonColor;
	}
});
Object.defineProperty(exports, 'IPoint', {
	enumerable: true,
	get: function () {
		return interfaces_ts.IPoint;
	}
});
Object.defineProperty(exports, 'IRect', {
	enumerable: true,
	get: function () {
		return interfaces_ts.IRect;
	}
});
Object.defineProperty(exports, 'ISize', {
	enumerable: true,
	get: function () {
		return interfaces_ts.ISize;
	}
});
Object.defineProperty(exports, 'ajaxp', {
	enumerable: true,
	get: function () {
		return ajaxp_ts__default['default'];
	}
});
exports.dab = dab_ts__namespace;
exports.utils = utils_ts__namespace;
Object.defineProperty(exports, 'Point', {
	enumerable: true,
	get: function () {
		return point_ts__default['default'];
	}
});
Object.defineProperty(exports, 'Size', {
	enumerable: true,
	get: function () {
		return size_ts__default['default'];
	}
});
Object.defineProperty(exports, 'Rect', {
	enumerable: true,
	get: function () {
		return rect_ts__default['default'];
	}
});
Object.defineProperty(exports, 'Color', {
	enumerable: true,
	get: function () {
		return colors_ts__default['default'];
	}
});
Object.defineProperty(exports, 'Templates', {
	enumerable: true,
	get: function () {
		return templates_ts.Templates;
	}
});
Object.defineProperty(exports, 'XML', {
	enumerable: true,
	get: function () {
		return templates_ts.XML;
	}
});
//# sourceMappingURL=dabbjs.js.map
