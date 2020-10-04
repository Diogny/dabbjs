export default abstract class ajaxp {
    static sGet: string;
    static sPost: string;
    static xobj: object;
    static rt: string;
    static x(): XMLHttpRequest;
    static query(data: {
        [key: string]: any;
    }, ask: boolean): string;
    static update(io: any, obj: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    static send(url: string, ox: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * @description performs a AJAX GET
     * @param url url
     * @param ox options below:
     *
     * - method: GET
     * - responseType: json|text. default is "text"
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
     * - responseType: json|text. default is "text"
     * - data: object with values, it's sent in the body
     */
    static post(url: string, ox?: {
        [key: string]: any;
    }): Promise<any>;
}
