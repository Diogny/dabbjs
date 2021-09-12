const _Templates = class {
  static get(key) {
    return _Templates.map.get(key);
  }
  static set(key, value) {
    _Templates.map.set(key, value);
  }
  static get size() {
    return _Templates.map.size;
  }
  static register(obj) {
    for (let key in obj) {
      _Templates.set(key, obj[key]);
    }
  }
  static nano(key, obj) {
    let str = _Templates.get(key);
    return str.replace(/\{\{\s*([\w\.]*)\s*\}\}/g, (n, t) => {
      for (var arr = t.split("."), f = obj[arr.shift()], i = 0, len = arr.length; f && len > i; i++)
        f = f[arr[i]];
      return typeof f != "undefined" && f !== null ? f : "null";
    });
  }
  static parse(key, obj, beautify) {
    let xml = XML.parse(_Templates.get(key), "text/html"), nsMap = new Map(), getValue = (ns, o) => {
      for (var arr = ns.split("."), f = o[arr.shift()], i = 0, len = arr.length; f && len > i; i++)
        f = f[arr[i]];
      return f;
    }, getMappedValue = (ns) => {
      let value = nsMap.get(ns);
      !value && nsMap.set(ns, value = getValue(ns, obj));
      return value;
    }, processNode = (node, rootName, arr, ndx) => {
      let isMatch = false, attributes = Array.from(node.attributes), parseContent = (str) => {
        let regex = /\{\{\s*([\w\.]*)\s*\}\}/g, match, parsed = "", index = 0;
        while (match = regex.exec(str)) {
          parsed += str.substr(index, match.index - index);
          isMatch = true;
          if (rootName == match[1])
            parsed += arr[ndx];
          else if (rootName && match[1].startsWith(rootName + ".")) {
            parsed += getValue(match[1].substr(rootName.length + 1), arr[ndx]);
          } else {
            parsed += getMappedValue(match[1]);
          }
          index = match.index + match[0].length;
        }
        parsed += str.substr(index, str.length - index);
        return parsed;
      };
      for (let i = 0; i < attributes.length; i++) {
        let attr = attributes[i], attrName = attr.name, isIndex = attrName == "d-for-ndx", removeUndefined = attrName.endsWith("?"), value;
        isMatch = false;
        isIndex ? (attrName = attr.value, value = ndx) : (value = parseContent(attr.value), removeUndefined && (attrName = attrName.substr(0, attrName.length - 1)));
        if (removeUndefined || isIndex) {
          node.removeAttribute(attr.name);
          if (value != "undefined")
            node.setAttribute(attrName, value);
        } else
          isMatch && (attr.value = value);
      }
      if (!node.children.length) {
        node.firstChild && (node.firstChild.nodeValue = parseContent(node.firstChild.nodeValue));
      } else
        processChildren(node, rootName, arr, ndx);
    }, processChild = (child, rootName, arr, ndx) => {
      let _for = child.getAttribute("d-for");
      if (_for) {
        if (rootName)
          throw "nested @for not supported";
        child.removeAttribute("d-for");
        let match = _for.match(/(\w*)\s+in\s+(\w*)/), array = match ? obj[match[2]] : void 0;
        if (!array)
          throw "invalid %for template";
        array.forEach((item, ndx2) => {
          let node = child.cloneNode(true);
          child.parentElement?.insertBefore(node, child);
          processNode(node, match[1], array, ndx2);
        });
        child.parentElement?.removeChild(child);
        return array.length;
      } else {
        processNode(child, rootName, arr, ndx);
        return 1;
      }
    }, processChildren = (parent, rootName, arr, ndx) => {
      for (let i = 0, child = parent.children[i]; i < parent.children.length; child = parent.children[i]) {
        i += processChild(child, rootName, arr, ndx);
      }
    };
    processChildren(xml.body, void 0, void 0, void 0);
    return beautify ? XML.prettify(xml.body.firstChild) : xml.body.innerHTML;
  }
};
let Templates = _Templates;
Templates.map = new Map();
const XML = {
  parse: (str, type = "text/xml") => new DOMParser().parseFromString(str, type),
  stringify: (DOM) => new XMLSerializer().serializeToString(DOM),
  transform: (xml, xsl) => {
    let proc = new XSLTProcessor();
    proc.importStylesheet(typeof xsl == "string" ? XML.parse(xsl) : xsl);
    let output = proc.transformToFragment(typeof xml == "string" ? XML.parse(xml) : xml, document);
    return typeof xml == "string" ? XML.stringify(output) : output;
  },
  minify: (node) => XML.toString(node, false),
  prettify: (node) => XML.toString(node, true),
  toString: (node, pretty, level = 0, singleton = false) => {
    if (typeof node == "string")
      node = XML.parse(node);
    let tabs = pretty ? Array(level + 1).fill("").join("	") : "", newLine = pretty ? "\n" : "";
    if (node.nodeType == 3) {
      let nodeContent = (singleton ? "" : tabs) + node.textContent.trim();
      return nodeContent.trim() ? nodeContent + (singleton ? "" : newLine) : "";
    }
    if (!node.tagName)
      return XML.toString(node.firstChild, pretty);
    let output = tabs + `<${node.tagName}`;
    for (let i = 0; i < node.attributes.length; i++)
      output += ` ${node.attributes[i].name}="${node.attributes[i].value}"`;
    if (node.childNodes.length == 0)
      return output + " />" + newLine;
    else
      output += ">";
    let onlyOneTextChild = node.childNodes.length == 1 && node.childNodes[0].nodeType == 3;
    if (!onlyOneTextChild)
      output += newLine;
    for (let i = 0; i < node.childNodes.length; i++)
      output += XML.toString(node.childNodes[i], pretty, level + 1, onlyOneTextChild);
    return output + (onlyOneTextChild ? "" : tabs) + `</${node.tagName}>` + newLine;
  }
};

export { Templates, XML };
