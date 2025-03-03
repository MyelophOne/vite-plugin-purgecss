"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  cssRegExp: () => cssRegExp,
  default: () => index_default,
  sourceString: () => sourceString
});
module.exports = __toCommonJS(index_exports);
var import_node_path = require("path");
var import_purgecss = require("purgecss");
var cssRegExp = /^.*(\.module)?\.css(\?.*)?$/i;
function purgeCssPlugin(opts) {
  return {
    name: "vite-plugin-purgecss",
    enforce: "post",
    generateBundle(_, bundle) {
      return __async(this, null, function* () {
        let content = [];
        let css = [];
        if (opts != null) {
          const _a2 = opts, { content: optsContent, css: optsCss } = _a2, rest = __objRest(_a2, ["content", "css"]);
          content = optsContent != null ? optsContent : content;
          css = optsCss != null ? optsCss : css;
          opts = rest;
        }
        const outputs = {};
        for (const id in bundle) {
          const file = bundle[id];
          const isChunk = file.type === "chunk";
          if (isChunk || !cssRegExp.test(file.fileName)) {
            content.push({
              extension: (0, import_node_path.extname)(file.fileName).slice(1),
              raw: isChunk ? file.code : sourceString(file.source)
            });
            continue;
          }
          css.push({ name: id, raw: sourceString(file.source) });
          outputs[id] = file;
        }
        const results = yield new import_purgecss.PurgeCSS().purge(__spreadProps(__spreadValues({}, opts), {
          content,
          css
        }));
        for (const result of results) {
          outputs[result.file].source = result.css;
        }
      });
    }
  };
}
function sourceString(source) {
  if (typeof source === "string") {
    return source;
  }
  return new TextDecoder().decode(source);
}
var index_default = purgeCssPlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cssRegExp,
  sourceString
});
