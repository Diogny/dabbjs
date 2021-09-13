"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description AJAX with promise
 */
class Ajaxp {
    /**
     * @description gets HTTP AJAX object
     */
    static x() { return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); }
    /**
     * @description returns a url query object
     * @param data object with properties
     * @param ask true to append, false only props. GET appends to url, POST in body
     * @returns query string
     */
    static query(data, ask) {
        let query = [];
        for (let key in data) {
            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        return ((ask && query.length) ? "?" : "") + query.join("&");
    }
    /**
     * @description copies default object properties not in dest object
     * @param io template object
     * @param obj dest object
     * @returns obj updated
     */
    static update(io, obj) {
        for (let p in io) {
            obj[p] = obj[p] || io[p];
        }
        return obj;
    }
    /**
     * @description performs the AJAX request
     * @param url url
     * @param ox object with values
     * @returns a promise
     */
    static send(url, ox) {
        return new Promise(function (resolve, reject) {
            let x = Ajaxp.x();
            ox = Ajaxp.update(Ajaxp.xobj, ox);
            x.open(ox.method, url, true);
            x[Ajaxp.rt] = ox.responseType;
            x.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); //PHP detect AJAX
            x.onreadystatechange = function () {
                let DONE = 4, // readyState 4 means the request is done.
                OK = 200, // status 200 is a successful return.
                NOT_MODIFIED = 304;
                if (x.readyState == DONE) {
                    let data = '';
                    //isJson = x[ajaxp.rt] && (x[ajaxp.rt] == "json");
                    switch (x[Ajaxp.rt]) {
                        case 'document':
                        case 'json':
                            data = x.response;
                            break;
                        case '':
                        case 'text':
                        default:
                            data = x.responseText;
                            break;
                    }
                    if (x.status === OK || x.status === NOT_MODIFIED) {
                        resolve(data);
                    }
                    else {
                        reject({ status: x.status, d: x.response, xhr: x });
                    }
                }
            };
            if (ox.method == Ajaxp.sPost) {
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
    }
    /**
     * @description performs a AJAX GET
     * @param url url
     * @param ox options below:
     *
     * - method: GET
     * - responseType: json|text|document. default is "text", for xml use document
     * - data: object with values, it's sent appended to url ? &
     */
    static get(url, ox) {
        return (ox = ox || {}, ox.method = Ajaxp.sGet, url += Ajaxp.query(ox.data, true), ox.data = void 0, Ajaxp.send(url, ox));
    }
    /**
     * @description performs a AJAX POST
     * @param url url
     * @param ox options below:
     *
     * - method: POST
     * - responseType: json|text|document. default is "text", for xml use document
     * - data: object with values, it's sent in the body
     */
    static post(url, ox) {
        return (ox = ox || {}, ox.method = Ajaxp.sPost, ox.data = Ajaxp.query(ox.data, false), Ajaxp.send(url, ox));
    }
}
exports.default = Ajaxp;
Ajaxp.sGet = "GET";
Ajaxp.sPost = "POST";
/**
 * @description template default object properties
 */
Ajaxp.xobj = {
    method: Ajaxp.sGet,
    data: void 0,
    responseType: "text"
};
Ajaxp.rt = "responseType";
//# sourceMappingURL=ajaxp.js.map