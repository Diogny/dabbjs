import { empty, isFn, isStr, consts } from "./dab"

/**
 * returns true if an element if an HTML or SVG DOM element
 * @param e {any} an element
 */
export const isDOM = (e: any) => e instanceof HTMLElement;  // || e instanceof Document;

/**
 * css(el, { background: 'green', display: 'none', 'border-radius': '5px' });
 * @param el HTMLElement
 * @param styles object of styles
 */
export const css = (el: HTMLElement, styles: { [id: string]: any } | string) => {
  if (isStr(styles))
    return el.style[<any>styles]
  else {
    Object.assign(el.style, styles)
    // for (let prop in styles)
    // 	el.style[prop] = styles[prop];
    return el
  }
}

/**
 * get/set html element attribute
 * @param el HTML element
 * @param attrs string to get it's attribute, or an object with attributes to set
 * @param value when defined
 *
 * should be attr(el: HTMLElement, attr: { [id: string]: any } | string, value?: string)
 *
 * when attr is an object, it sets all attributes in the object
 *
 * when value is undefined, it returns the attribute value if any
 * when value is an string
 */
export const attr = function (el: HTMLElement, attrs: { [id: string]: any } | string, value?: string) {
  if (typeof attrs == "string") {
    if (value) {
      //set single attr and return HTMLElement
      el.setAttribute(attrs, value);
    } else {
      //return HTMLElement single attribute value
      return el.getAttribute(attrs);
    }
  } else {
    //assign object of attributes to HTMLElement
    for (let attr in <{ [id: string]: any }>attrs)
      el.setAttribute(attr, (<any>attrs)[attr]);
  }
  return el;
}

/**
 * adds an event listener to an element
 * @param el element
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
export const aEL = (el: HTMLElement, type: string, fn: Function, b?: boolean | AddEventListenerOptions): void => el.addEventListener(type, <any>fn, b);

/**
 * removes an event listener from an element
 * @param el element
 * @param type event name
 * @param fn
 * @param b
 */
export const rEL = (el: HTMLElement, type: string, fn: Function, b?: boolean | AddEventListenerOptions): void => el.removeEventListener(type, <any>fn, b);

/**
 * adds an event listener to the document
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
export const daEl = (type: string, fn: Function, b?: boolean | AddEventListenerOptions): void => document.addEventListener(type, <any>fn, b);

/**
 * removes an event listener from the document
 * @param el element
 * @param type event name
 * @param fn
 * @param b
 */
export const drEL = (type: string, fn: Function, b?: boolean | AddEventListenerOptions): void => document.removeEventListener(type, <any>fn, b);

/**
 * appends a child element to it's new parent
 * @param parent parent element
 * @param child child element
 */
export const aChld = (parent: any, child: any) => parent.appendChild(child);

/**
 * test for class
 * @param el Element
 * @param className className cannot contain spaces
 * @returns true if present, false otherwise
 */
export const hCl = (el: Element, className: string): boolean => el.classList.contains(className);

/**
 * adds a class to an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
export const aCl = (el: Element, className: string) => el.classList.add(className);

/**
 * removes a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
export const rCl = (el: Element, className: string) => el.classList.remove(className);

/**
 * toggles a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 * @param force undefined is toggle, true is add, false is remove
 * @returns true if present, false if not
 */
export const tCl = (el: Element, className: string, force?: boolean): boolean => el.classList.toggle(className, force);

/**
 * add class safe
 * @param el HTMLElement
 * @param className class names separated by space
 */
export const aClx = (el: Element, className: string): Element => {
  el.classList.add(...(className || "").split(' ').filter((v: string) => !empty(v)))
  return el
}

/**
 * calls a function when DOM is ready
 * @param fn function to be called
 */
export const ready = (fn: Function) => { //https://plainjs.com/javascript/events/running-code-when-the-document-is-ready-15/
  if (!isFn(fn)) {
    return !1;
  }
  if (document.readyState != "loading")
    return (fn(), !0);
  else if (document["addEventListener"])
    aEL(<any>document, "DOMContentLoaded", fn, false);
  else
    (<any>document).attachEvent("onreadystatechange", () => {
      if (document.readyState == "complete")
        fn();
    });
  return !0;
};

/**
 * document.querySelector shortcut
 * @param selectors query string
 * @param elem HTMLElement or document if undefined
 */
export const qS = (selectors: string, elem?: HTMLElement): HTMLElement => <HTMLElement>(elem || document).querySelector(selectors);

/**
 * document.querySelectorAll shortcut
 * @param selectors query string
 * @param elem HTMLElement or document if undefined
 */
export const qSA = (selectors: string, elem?: HTMLElement) => Array.from<HTMLElement>((elem || document).querySelectorAll(selectors));

/**
 * document.getElementById shortcut
 * @param s #id
 */
export const gEId = (id: string) => document.getElementById(id);

/**
 * extracts a base-name from page metadata
 */
export const basePath = () => {
  let
    meta = qS('meta[name="base"]');
  return meta ? meta.getAttribute('content') : "";
}

/**
 * creates an SVG element by tag name
 * @param tagName tag name
 * @param id optional name
 * @param nsAttrs attributes
 */
export const tag = (tagName: string, id: string, nsAttrs: { [id: string]: any }): SVGElement => <SVGElement><unknown>(id && (nsAttrs.id = id),
  attr(document.createElementNS(consts.svgNs, tagName), nsAttrs));

/**
* creates an SVG element by an string
* @param html html string representation
*/
export const svg = (html: string): SVGElement => {
  let template = document.createElementNS(consts.svgNs, "template");
  template.innerHTML = html;
  return <SVGElement>template.children[0];
};

/**
* creates an HTML element by an string
* @param html html string representation
*/
export const html = (html: string): HTMLElement => {
  let template = document.createElement("template");
  template.innerHTML = html;
  return <HTMLElement>template.content.firstChild;
};

export const registerCustomElement = (name: string, constructor: CustomElementConstructor): boolean => {
  //https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements
  if (customElements.get(name))
    return false;
  customElements.define(name, constructor);
  return true;
}

//If you use a "<div/>" tag, it will strip out all the html.
//If you use a "<textarea/>" tag, it will preserve the html tags.

/**
 *
 * @param text
 * @returns
 */
export const decodeHTMLEntities = (text: string): string => {
  let
    textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

/**
 *
 * @param text
 * @returns
 */
export const encodeHTMLEntities = (text: string): string => {
  let
    textArea = document.createElement('textarea');
  textArea.innerText = text;
  return textArea.innerHTML;
}

/**
 *
 * @param str
 * @returns
 */
export const escapeChars = (str: string): string => {
  let
    div = html(str);
  div.innerText = str;
  return div.innerHTML
}


/**
 * saves CSS in Document DOM inside SVG element styles
 * @param dom
 * @returns
 */
export const svgStyles = (dom: HTMLElement): HTMLElement => {
  let used = "";
  let sheets = document.styleSheets;
  for (let i = 0; i < sheets.length; i++) {
    let rules = sheets[i].cssRules;
    for (let j = 0; j < rules.length; j++) {
      let rule = <CSSStyleRule>rules[j];
      if (typeof (rule.style) != "undefined") {
        let elems = dom.querySelectorAll(rule.selectorText);
        if (elems.length > 0) {
          used += rule.selectorText + " { " + rule.style.cssText + " }\n";
        }
      }
    }
  }

  let s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  s.innerHTML = "<![CDATA[\n" + used + "\n]]>";

  let defs = document.createElement('defs');
  defs.appendChild(s);
  dom.insertBefore(defs, dom.firstChild);
  return dom
}

/**
 * retrieves all DOM script templates
 *
 * script with attribute data-tmpl="id" are returned as an object with [id] as key.
 *
 * it removes any CDATA, LF, NL, Tabs from result
 */
export const DOMTemplates = (): { [key: string]: any } => {
  let
    templates: { [key: string]: any } = {};
  qSA('script[data-tmpl]').forEach((scr: HTMLElement) => {
    let
      id = <string>scr.getAttribute('data-tmpl'),
      src = scr.innerHTML.replace("<![CDATA[", "").replace("]]>", "").replace(/[\r\n\t]/g, "").trim();
    templates[id] = src
  });
  return templates;
}
