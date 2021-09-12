const _ajaxp = class {
  static x() {
    return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  }
  static query(data, ask) {
    let query = [];
    for (let key in data) {
      query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return (ask && query.length ? "?" : "") + query.join("&");
  }
  static update(io, obj) {
    for (let p in io) {
      obj[p] = obj[p] || io[p];
    }
    return obj;
  }
  static send(url, ox) {
    return new Promise(function(resolve, reject) {
      let x = _ajaxp.x();
      ox = _ajaxp.update(_ajaxp.xobj, ox);
      x.open(ox.method, url, true);
      x[_ajaxp.rt] = ox.responseType;
      x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      x.onreadystatechange = function() {
        let DONE = 4, OK = 200, NOT_MODIFIED = 304;
        if (x.readyState == DONE) {
          let data = "";
          switch (x[_ajaxp.rt]) {
            case "document":
            case "json":
              data = x.response;
              break;
            case "":
            case "text":
            default:
              data = x.responseText;
              break;
          }
          if (x.status === OK || x.status === NOT_MODIFIED) {
            resolve(data);
          } else {
            reject({ status: x.status, d: x.response, xhr: x });
          }
        }
      };
      if (ox.method == _ajaxp.sPost) {
        x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }
      x.onerror = function(e) {
        reject(e);
      };
      try {
        x.send(ox.data);
      } catch (e) {
        reject({ status: x.status, statusText: x.statusText, xhr: x });
      }
    });
  }
  static get(url, ox) {
    return ox = ox || {}, ox.method = _ajaxp.sGet, url += _ajaxp.query(ox.data, true), ox.data = void 0, _ajaxp.send(url, ox);
  }
  static post(url, ox) {
    return ox = ox || {}, ox.method = _ajaxp.sPost, ox.data = _ajaxp.query(ox.data, false), _ajaxp.send(url, ox);
  }
};
let ajaxp = _ajaxp;
ajaxp.sGet = "GET";
ajaxp.sPost = "POST";
ajaxp.xobj = {
  method: _ajaxp.sGet,
  data: void 0,
  responseType: "text"
};
ajaxp.rt = "responseType";

export default ajaxp;
