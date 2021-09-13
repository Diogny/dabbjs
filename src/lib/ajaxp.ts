/**
 * @description AJAX with promise
 */
export default abstract class Ajaxp {

  static sGet: string = "GET";
  static sPost: string = "POST";

  /**
   * @description template default object properties
   */
  static xobj: object = {
    method: Ajaxp.sGet,
    data: void 0,
    responseType: "text"
  }
  static rt: string = "responseType";

  /**
   * @description gets HTTP AJAX object
   */
  public static x(): XMLHttpRequest { return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); }

  /**
   * @description returns a url query object
   * @param data object with properties
   * @param ask true to append, false only props. GET appends to url, POST in body
   * @returns query string
   */
  static query(data: { [key: string]: any }, ask: boolean) {
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
  static update(io: { [key: string]: any }, obj: { [key: string]: any }) {
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
  static send(url: string, ox: { [key: string]: any }): Promise<any> {
    return new Promise(function (resolve, reject) {
      let
        x = Ajaxp.x();
      ox = Ajaxp.update(Ajaxp.xobj, ox);
      x.open(ox.method, url, true);
      (<any>x)[Ajaxp.rt] = ox.responseType;
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');	//PHP detect AJAX
      x.onreadystatechange = function () {
        let
          DONE = 4, // readyState 4 means the request is done.
          OK = 200, // status 200 is a successful return.
          NOT_MODIFIED = 304;
        if (x.readyState == DONE) {
          let
            data: any = '';
          //isJson = x[ajaxp.rt] && (x[ajaxp.rt] == "json");
          switch ((<any>x)[Ajaxp.rt]) {
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
          } else {
            reject({ status: x.status, d: x.response, xhr: x });
          }
        }
      };
      if (ox.method == Ajaxp.sPost) {
        x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }
      x.onerror = function (e: any) {
        reject(e);
      };
      try {
        x.send(ox.data);
      } catch (e) {
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
  public static get(url: string, ox?: { [key: string]: any }): Promise<any> {
    return (ox = ox || {}, ox.method = Ajaxp.sGet, url += Ajaxp.query(ox.data, true), ox.data = void 0, Ajaxp.send(url, ox))
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
  public static post(url: string, ox?: { [key: string]: any }): Promise<any> {
    return (ox = ox || {}, ox.method = Ajaxp.sPost, ox.data = Ajaxp.query(ox.data, false), Ajaxp.send(url, ox));
  }

}
