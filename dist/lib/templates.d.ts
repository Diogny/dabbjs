/**
 * Template engine
 */
declare class Templates {
    /**
     * map of all templates
     */
    private static map;
    /**
     * gets a template
     * @param key template's key
     * @returns template text
     */
    static get(key: string): string;
    /**
     * saves a template
     * @param key template's key
     * @param value template's text
     */
    static set(key: string, value: string): void;
    /**
     * returns a mount of registered templates
     */
    static get size(): number;
    /**
     * register a json key-value pair with templates
     * @param obj key-value pair of template's key with it's text
     */
    static register(obj: {
        [key: string]: string;
    }): void;
    /**
     * @description simple template parser
     * @param key template's key name
     * @param obj object to get values from
     */
    static nano(key: string, obj: any): string;
    /**
     * @description full template parser
     * @param key template's key name
     * @param obj object to get values from
     */
    static parse(key: string, obj: any, beautify?: boolean): string;
}
declare const XML: {
    parse: (str: string, type?: DOMParserSupportedType) => Document;
    stringify: (DOM: Node) => string;
    transform: (xml: any, xsl: any) => string | DocumentFragment;
    minify: (node: any) => string;
    prettify: (node: any) => string;
    toString: (node: any, pretty: boolean, level?: number, singleton?: boolean) => string;
};
export { Templates, XML };
