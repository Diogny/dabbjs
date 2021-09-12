/**
 * @description AJAX with promise
 */
export default abstract class ajaxp {
    static sGet: string;
    static sPost: string;
    /**
     * @description template default object properties
     */
    static xobj: object;
    static rt: string;
    /**
     * @description gets HTTP AJAX object
     */
    static x(): XMLHttpRequest;
    /**
     * @description returns a url query object
     * @param data object with properties
     * @param ask true to append, false only props. GET appends to url, POST in body
     * @returns query string
     */
    static query(data: {
        [key: string]: any;
    }, ask: boolean): string;
    /**
     * @description copies default object properties not in dest object
     * @param io template object
     * @param obj dest object
     * @returns obj updated
     */
    static update(io: {
        [key: string]: any;
    }, obj: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    /**
     * @description performs the AJAX request
     * @param url url
     * @param ox object with values
     * @returns a promise
     */
    static send(url: string, ox: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * @description performs a AJAX GET
     * @param url url
     * @param ox options below:
     *
     * - method: GET
     * - responseType: json|text|document. default is "text", for xml use document
     * - data: object with values, it's sent appended to url ? &
     */
    static get(url: string, ox?: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * @description performs a AJAX POST
     * @param url url
     * @param ox options below:
     *
     * - method: POST
     * - responseType: json|text|document. default is "text", for xml use document
     * - data: object with values, it's sent in the body
     */
    static post(url: string, ox?: {
        [key: string]: any;
    }): Promise<any>;
}
