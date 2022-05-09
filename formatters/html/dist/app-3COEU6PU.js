(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/lodash.throttle/index.js
  var require_lodash = __commonJS({
    "node_modules/lodash.throttle/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce2(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
          return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function throttle2(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce2(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = throttle2;
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/utils.js
  var require_utils = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/utils.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.extend = extend;
      exports.indexOf = indexOf;
      exports.escapeExpression = escapeExpression;
      exports.isEmpty = isEmpty;
      exports.createFrame = createFrame;
      exports.blockParams = blockParams;
      exports.appendContextPath = appendContextPath;
      var escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
        "=": "&#x3D;"
      };
      var badChars = /[&<>"'`=]/g;
      var possible = /[&<>"'`=]/;
      function escapeChar(chr) {
        return escape[chr];
      }
      function extend(obj) {
        for (var i = 1; i < arguments.length; i++) {
          for (var key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
              obj[key] = arguments[i][key];
            }
          }
        }
        return obj;
      }
      var toString = Object.prototype.toString;
      exports.toString = toString;
      var isFunction = function isFunction2(value) {
        return typeof value === "function";
      };
      if (isFunction(/x/)) {
        exports.isFunction = isFunction = function(value) {
          return typeof value === "function" && toString.call(value) === "[object Function]";
        };
      }
      exports.isFunction = isFunction;
      var isArray = Array.isArray || function(value) {
        return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false;
      };
      exports.isArray = isArray;
      function indexOf(array, value) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (array[i] === value) {
            return i;
          }
        }
        return -1;
      }
      function escapeExpression(string) {
        if (typeof string !== "string") {
          if (string && string.toHTML) {
            return string.toHTML();
          } else if (string == null) {
            return "";
          } else if (!string) {
            return string + "";
          }
          string = "" + string;
        }
        if (!possible.test(string)) {
          return string;
        }
        return string.replace(badChars, escapeChar);
      }
      function isEmpty(value) {
        if (!value && value !== 0) {
          return true;
        } else if (isArray(value) && value.length === 0) {
          return true;
        } else {
          return false;
        }
      }
      function createFrame(object) {
        var frame = extend({}, object);
        frame._parent = object;
        return frame;
      }
      function blockParams(params, ids) {
        params.path = ids;
        return params;
      }
      function appendContextPath(contextPath, id) {
        return (contextPath ? contextPath + "." : "") + id;
      }
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/exception.js
  var require_exception = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/exception.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
      function Exception(message, node) {
        var loc = node && node.loc, line = void 0, endLineNumber = void 0, column = void 0, endColumn = void 0;
        if (loc) {
          line = loc.start.line;
          endLineNumber = loc.end.line;
          column = loc.start.column;
          endColumn = loc.end.column;
          message += " - " + line + ":" + column;
        }
        var tmp = Error.prototype.constructor.call(this, message);
        for (var idx = 0; idx < errorProps.length; idx++) {
          this[errorProps[idx]] = tmp[errorProps[idx]];
        }
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, Exception);
        }
        try {
          if (loc) {
            this.lineNumber = line;
            this.endLineNumber = endLineNumber;
            if (Object.defineProperty) {
              Object.defineProperty(this, "column", {
                value: column,
                enumerable: true
              });
              Object.defineProperty(this, "endColumn", {
                value: endColumn,
                enumerable: true
              });
            } else {
              this.column = column;
              this.endColumn = endColumn;
            }
          }
        } catch (nop) {
        }
      }
      Exception.prototype = new Error();
      exports["default"] = Exception;
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js
  var require_block_helper_missing = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      var _utils = require_utils();
      exports["default"] = function(instance) {
        instance.registerHelper("blockHelperMissing", function(context, options) {
          var inverse = options.inverse, fn = options.fn;
          if (context === true) {
            return fn(this);
          } else if (context === false || context == null) {
            return inverse(this);
          } else if (_utils.isArray(context)) {
            if (context.length > 0) {
              if (options.ids) {
                options.ids = [options.name];
              }
              return instance.helpers.each(context, options);
            } else {
              return inverse(this);
            }
          } else {
            if (options.data && options.ids) {
              var data = _utils.createFrame(options.data);
              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
              options = { data };
            }
            return fn(context, options);
          }
        });
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/helpers/each.js
  var require_each = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/helpers/each.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _utils = require_utils();
      var _exception = require_exception();
      var _exception2 = _interopRequireDefault(_exception);
      exports["default"] = function(instance) {
        instance.registerHelper("each", function(context, options) {
          if (!options) {
            throw new _exception2["default"]("Must pass iterator to #each");
          }
          var fn = options.fn, inverse = options.inverse, i = 0, ret = "", data = void 0, contextPath = void 0;
          if (options.data && options.ids) {
            contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
          }
          if (_utils.isFunction(context)) {
            context = context.call(this);
          }
          if (options.data) {
            data = _utils.createFrame(options.data);
          }
          function execIteration(field, index, last) {
            if (data) {
              data.key = field;
              data.index = index;
              data.first = index === 0;
              data.last = !!last;
              if (contextPath) {
                data.contextPath = contextPath + field;
              }
            }
            ret = ret + fn(context[field], {
              data,
              blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
            });
          }
          if (context && typeof context === "object") {
            if (_utils.isArray(context)) {
              for (var j = context.length; i < j; i++) {
                if (i in context) {
                  execIteration(i, i, i === context.length - 1);
                }
              }
            } else if (global.Symbol && context[global.Symbol.iterator]) {
              var newContext = [];
              var iterator = context[global.Symbol.iterator]();
              for (var it = iterator.next(); !it.done; it = iterator.next()) {
                newContext.push(it.value);
              }
              context = newContext;
              for (var j = context.length; i < j; i++) {
                execIteration(i, i, i === context.length - 1);
              }
            } else {
              (function() {
                var priorKey = void 0;
                Object.keys(context).forEach(function(key) {
                  if (priorKey !== void 0) {
                    execIteration(priorKey, i - 1);
                  }
                  priorKey = key;
                  i++;
                });
                if (priorKey !== void 0) {
                  execIteration(priorKey, i - 1, true);
                }
              })();
            }
          }
          if (i === 0) {
            ret = inverse(this);
          }
          return ret;
        });
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js
  var require_helper_missing = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _exception = require_exception();
      var _exception2 = _interopRequireDefault(_exception);
      exports["default"] = function(instance) {
        instance.registerHelper("helperMissing", function() {
          if (arguments.length === 1) {
            return void 0;
          } else {
            throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
          }
        });
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/helpers/if.js
  var require_if = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/helpers/if.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _utils = require_utils();
      var _exception = require_exception();
      var _exception2 = _interopRequireDefault(_exception);
      exports["default"] = function(instance) {
        instance.registerHelper("if", function(conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2["default"]("#if requires exactly one argument");
          }
          if (_utils.isFunction(conditional)) {
            conditional = conditional.call(this);
          }
          if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
            return options.inverse(this);
          } else {
            return options.fn(this);
          }
        });
        instance.registerHelper("unless", function(conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2["default"]("#unless requires exactly one argument");
          }
          return instance.helpers["if"].call(this, conditional, {
            fn: options.inverse,
            inverse: options.fn,
            hash: options.hash
          });
        });
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/helpers/log.js
  var require_log = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/helpers/log.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      exports["default"] = function(instance) {
        instance.registerHelper("log", function() {
          var args = [void 0], options = arguments[arguments.length - 1];
          for (var i = 0; i < arguments.length - 1; i++) {
            args.push(arguments[i]);
          }
          var level = 1;
          if (options.hash.level != null) {
            level = options.hash.level;
          } else if (options.data && options.data.level != null) {
            level = options.data.level;
          }
          args[0] = level;
          instance.log.apply(instance, args);
        });
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js
  var require_lookup = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      exports["default"] = function(instance) {
        instance.registerHelper("lookup", function(obj, field, options) {
          if (!obj) {
            return obj;
          }
          return options.lookupProperty(obj, field);
        });
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/helpers/with.js
  var require_with = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/helpers/with.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _utils = require_utils();
      var _exception = require_exception();
      var _exception2 = _interopRequireDefault(_exception);
      exports["default"] = function(instance) {
        instance.registerHelper("with", function(context, options) {
          if (arguments.length != 2) {
            throw new _exception2["default"]("#with requires exactly one argument");
          }
          if (_utils.isFunction(context)) {
            context = context.call(this);
          }
          var fn = options.fn;
          if (!_utils.isEmpty(context)) {
            var data = options.data;
            if (options.data && options.ids) {
              data = _utils.createFrame(options.data);
              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
            }
            return fn(context, {
              data,
              blockParams: _utils.blockParams([context], [data && data.contextPath])
            });
          } else {
            return options.inverse(this);
          }
        });
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/helpers.js
  var require_helpers = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/helpers.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.registerDefaultHelpers = registerDefaultHelpers;
      exports.moveHelperToHooks = moveHelperToHooks;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _helpersBlockHelperMissing = require_block_helper_missing();
      var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
      var _helpersEach = require_each();
      var _helpersEach2 = _interopRequireDefault(_helpersEach);
      var _helpersHelperMissing = require_helper_missing();
      var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
      var _helpersIf = require_if();
      var _helpersIf2 = _interopRequireDefault(_helpersIf);
      var _helpersLog = require_log();
      var _helpersLog2 = _interopRequireDefault(_helpersLog);
      var _helpersLookup = require_lookup();
      var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
      var _helpersWith = require_with();
      var _helpersWith2 = _interopRequireDefault(_helpersWith);
      function registerDefaultHelpers(instance) {
        _helpersBlockHelperMissing2["default"](instance);
        _helpersEach2["default"](instance);
        _helpersHelperMissing2["default"](instance);
        _helpersIf2["default"](instance);
        _helpersLog2["default"](instance);
        _helpersLookup2["default"](instance);
        _helpersWith2["default"](instance);
      }
      function moveHelperToHooks(instance, helperName, keepHelper) {
        if (instance.helpers[helperName]) {
          instance.hooks[helperName] = instance.helpers[helperName];
          if (!keepHelper) {
            delete instance.helpers[helperName];
          }
        }
      }
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js
  var require_inline = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      var _utils = require_utils();
      exports["default"] = function(instance) {
        instance.registerDecorator("inline", function(fn, props, container, options) {
          var ret = fn;
          if (!props.partials) {
            props.partials = {};
            ret = function(context, options2) {
              var original = container.partials;
              container.partials = _utils.extend({}, original, props.partials);
              var ret2 = fn(context, options2);
              container.partials = original;
              return ret2;
            };
          }
          props.partials[options.args[0]] = options.fn;
          return ret;
        });
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/decorators.js
  var require_decorators = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/decorators.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.registerDefaultDecorators = registerDefaultDecorators;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _decoratorsInline = require_inline();
      var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
      function registerDefaultDecorators(instance) {
        _decoratorsInline2["default"](instance);
      }
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/logger.js
  var require_logger = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/logger.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      var _utils = require_utils();
      var logger = {
        methodMap: ["debug", "info", "warn", "error"],
        level: "info",
        lookupLevel: function lookupLevel(level) {
          if (typeof level === "string") {
            var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
            if (levelMap >= 0) {
              level = levelMap;
            } else {
              level = parseInt(level, 10);
            }
          }
          return level;
        },
        log: function log(level) {
          level = logger.lookupLevel(level);
          if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
            var method = logger.methodMap[level];
            if (!console[method]) {
              method = "log";
            }
            for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              message[_key - 1] = arguments[_key];
            }
            console[method].apply(console, message);
          }
        }
      };
      exports["default"] = logger;
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js
  var require_create_new_lookup_object = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.createNewLookupObject = createNewLookupObject;
      var _utils = require_utils();
      function createNewLookupObject() {
        for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }
        return _utils.extend.apply(void 0, [/* @__PURE__ */ Object.create(null)].concat(sources));
      }
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js
  var require_proto_access = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.createProtoAccessControl = createProtoAccessControl;
      exports.resultIsAllowed = resultIsAllowed;
      exports.resetLoggedProperties = resetLoggedProperties;
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj["default"] = obj;
          return newObj;
        }
      }
      var _createNewLookupObject = require_create_new_lookup_object();
      var _logger = require_logger();
      var logger = _interopRequireWildcard(_logger);
      var loggedProperties = /* @__PURE__ */ Object.create(null);
      function createProtoAccessControl(runtimeOptions) {
        var defaultMethodWhiteList = /* @__PURE__ */ Object.create(null);
        defaultMethodWhiteList["constructor"] = false;
        defaultMethodWhiteList["__defineGetter__"] = false;
        defaultMethodWhiteList["__defineSetter__"] = false;
        defaultMethodWhiteList["__lookupGetter__"] = false;
        var defaultPropertyWhiteList = /* @__PURE__ */ Object.create(null);
        defaultPropertyWhiteList["__proto__"] = false;
        return {
          properties: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
            defaultValue: runtimeOptions.allowProtoPropertiesByDefault
          },
          methods: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
            defaultValue: runtimeOptions.allowProtoMethodsByDefault
          }
        };
      }
      function resultIsAllowed(result, protoAccessControl, propertyName) {
        if (typeof result === "function") {
          return checkWhiteList(protoAccessControl.methods, propertyName);
        } else {
          return checkWhiteList(protoAccessControl.properties, propertyName);
        }
      }
      function checkWhiteList(protoAccessControlForType, propertyName) {
        if (protoAccessControlForType.whitelist[propertyName] !== void 0) {
          return protoAccessControlForType.whitelist[propertyName] === true;
        }
        if (protoAccessControlForType.defaultValue !== void 0) {
          return protoAccessControlForType.defaultValue;
        }
        logUnexpecedPropertyAccessOnce(propertyName);
        return false;
      }
      function logUnexpecedPropertyAccessOnce(propertyName) {
        if (loggedProperties[propertyName] !== true) {
          loggedProperties[propertyName] = true;
          logger.log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
        }
      }
      function resetLoggedProperties() {
        Object.keys(loggedProperties).forEach(function(propertyName) {
          delete loggedProperties[propertyName];
        });
      }
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/base.js
  var require_base = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/base.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.HandlebarsEnvironment = HandlebarsEnvironment;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _utils = require_utils();
      var _exception = require_exception();
      var _exception2 = _interopRequireDefault(_exception);
      var _helpers = require_helpers();
      var _decorators = require_decorators();
      var _logger = require_logger();
      var _logger2 = _interopRequireDefault(_logger);
      var _internalProtoAccess = require_proto_access();
      var VERSION = "4.7.7";
      exports.VERSION = VERSION;
      var COMPILER_REVISION = 8;
      exports.COMPILER_REVISION = COMPILER_REVISION;
      var LAST_COMPATIBLE_COMPILER_REVISION = 7;
      exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
      var REVISION_CHANGES = {
        1: "<= 1.0.rc.2",
        2: "== 1.0.0-rc.3",
        3: "== 1.0.0-rc.4",
        4: "== 1.x.x",
        5: "== 2.0.0-alpha.x",
        6: ">= 2.0.0-beta.1",
        7: ">= 4.0.0 <4.3.0",
        8: ">= 4.3.0"
      };
      exports.REVISION_CHANGES = REVISION_CHANGES;
      var objectType = "[object Object]";
      function HandlebarsEnvironment(helpers, partials, decorators) {
        this.helpers = helpers || {};
        this.partials = partials || {};
        this.decorators = decorators || {};
        _helpers.registerDefaultHelpers(this);
        _decorators.registerDefaultDecorators(this);
      }
      HandlebarsEnvironment.prototype = {
        constructor: HandlebarsEnvironment,
        logger: _logger2["default"],
        log: _logger2["default"].log,
        registerHelper: function registerHelper11(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2["default"]("Arg not supported with multiple helpers");
            }
            _utils.extend(this.helpers, name);
          } else {
            this.helpers[name] = fn;
          }
        },
        unregisterHelper: function unregisterHelper(name) {
          delete this.helpers[name];
        },
        registerPartial: function registerPartial(name, partial) {
          if (_utils.toString.call(name) === objectType) {
            _utils.extend(this.partials, name);
          } else {
            if (typeof partial === "undefined") {
              throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined');
            }
            this.partials[name] = partial;
          }
        },
        unregisterPartial: function unregisterPartial(name) {
          delete this.partials[name];
        },
        registerDecorator: function registerDecorator(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2["default"]("Arg not supported with multiple decorators");
            }
            _utils.extend(this.decorators, name);
          } else {
            this.decorators[name] = fn;
          }
        },
        unregisterDecorator: function unregisterDecorator(name) {
          delete this.decorators[name];
        },
        resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
          _internalProtoAccess.resetLoggedProperties();
        }
      };
      var log = _logger2["default"].log;
      exports.log = log;
      exports.createFrame = _utils.createFrame;
      exports.logger = _logger2["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/safe-string.js
  var require_safe_string = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/safe-string.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      function SafeString(string) {
        this.string = string;
      }
      SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
        return "" + this.string;
      };
      exports["default"] = SafeString;
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js
  var require_wrapHelper = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.wrapHelper = wrapHelper;
      function wrapHelper(helper, transformOptionsFn) {
        if (typeof helper !== "function") {
          return helper;
        }
        var wrapper = function wrapper2() {
          var options = arguments[arguments.length - 1];
          arguments[arguments.length - 1] = transformOptionsFn(options);
          return helper.apply(this, arguments);
        };
        return wrapper;
      }
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/runtime.js
  var require_runtime = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/runtime.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.checkRevision = checkRevision;
      exports.template = template11;
      exports.wrapProgram = wrapProgram;
      exports.resolvePartial = resolvePartial;
      exports.invokePartial = invokePartial;
      exports.noop = noop;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj["default"] = obj;
          return newObj;
        }
      }
      var _utils = require_utils();
      var Utils = _interopRequireWildcard(_utils);
      var _exception = require_exception();
      var _exception2 = _interopRequireDefault(_exception);
      var _base = require_base();
      var _helpers = require_helpers();
      var _internalWrapHelper = require_wrapHelper();
      var _internalProtoAccess = require_proto_access();
      function checkRevision(compilerInfo) {
        var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _base.COMPILER_REVISION;
        if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
          return;
        }
        if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
          var runtimeVersions = _base.REVISION_CHANGES[currentRevision], compilerVersions = _base.REVISION_CHANGES[compilerRevision];
          throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
        } else {
          throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
        }
      }
      function template11(templateSpec, env) {
        if (!env) {
          throw new _exception2["default"]("No environment passed to template");
        }
        if (!templateSpec || !templateSpec.main) {
          throw new _exception2["default"]("Unknown template object: " + typeof templateSpec);
        }
        templateSpec.main.decorator = templateSpec.main_d;
        env.VM.checkRevision(templateSpec.compiler);
        var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
        function invokePartialWrapper(partial, context, options) {
          if (options.hash) {
            context = Utils.extend({}, context, options.hash);
            if (options.ids) {
              options.ids[0] = true;
            }
          }
          partial = env.VM.resolvePartial.call(this, partial, context, options);
          var extendedOptions = Utils.extend({}, options, {
            hooks: this.hooks,
            protoAccessControl: this.protoAccessControl
          });
          var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
          if (result == null && env.compile) {
            options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
            result = options.partials[options.name](context, extendedOptions);
          }
          if (result != null) {
            if (options.indent) {
              var lines = result.split("\n");
              for (var i = 0, l = lines.length; i < l; i++) {
                if (!lines[i] && i + 1 === l) {
                  break;
                }
                lines[i] = options.indent + lines[i];
              }
              result = lines.join("\n");
            }
            return result;
          } else {
            throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
          }
        }
        var container = {
          strict: function strict(obj, name, loc) {
            if (!obj || !(name in obj)) {
              throw new _exception2["default"]('"' + name + '" not defined in ' + obj, {
                loc
              });
            }
            return container.lookupProperty(obj, name);
          },
          lookupProperty: function lookupProperty(parent, propertyName) {
            var result = parent[propertyName];
            if (result == null) {
              return result;
            }
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return result;
            }
            if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
              return result;
            }
            return void 0;
          },
          lookup: function lookup(depths, name) {
            var len = depths.length;
            for (var i = 0; i < len; i++) {
              var result = depths[i] && container.lookupProperty(depths[i], name);
              if (result != null) {
                return depths[i][name];
              }
            }
          },
          lambda: function lambda(current, context) {
            return typeof current === "function" ? current.call(context) : current;
          },
          escapeExpression: Utils.escapeExpression,
          invokePartial: invokePartialWrapper,
          fn: function fn(i) {
            var ret2 = templateSpec[i];
            ret2.decorator = templateSpec[i + "_d"];
            return ret2;
          },
          programs: [],
          program: function program(i, data, declaredBlockParams, blockParams, depths) {
            var programWrapper = this.programs[i], fn = this.fn(i);
            if (data || depths || blockParams || declaredBlockParams) {
              programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
            } else if (!programWrapper) {
              programWrapper = this.programs[i] = wrapProgram(this, i, fn);
            }
            return programWrapper;
          },
          data: function data(value, depth) {
            while (value && depth--) {
              value = value._parent;
            }
            return value;
          },
          mergeIfNeeded: function mergeIfNeeded(param, common) {
            var obj = param || common;
            if (param && common && param !== common) {
              obj = Utils.extend({}, common, param);
            }
            return obj;
          },
          nullContext: Object.seal({}),
          noop: env.VM.noop,
          compilerInfo: templateSpec.compiler
        };
        function ret(context) {
          var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
          var data = options.data;
          ret._setup(options);
          if (!options.partial && templateSpec.useData) {
            data = initData(context, data);
          }
          var depths = void 0, blockParams = templateSpec.useBlockParams ? [] : void 0;
          if (templateSpec.useDepths) {
            if (options.depths) {
              depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
            } else {
              depths = [context];
            }
          }
          function main(context2) {
            return "" + templateSpec.main(container, context2, container.helpers, container.partials, data, blockParams, depths);
          }
          main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
          return main(context, options);
        }
        ret.isTop = true;
        ret._setup = function(options) {
          if (!options.partial) {
            var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
            wrapHelpersToPassLookupProperty(mergedHelpers, container);
            container.helpers = mergedHelpers;
            if (templateSpec.usePartial) {
              container.partials = container.mergeIfNeeded(options.partials, env.partials);
            }
            if (templateSpec.usePartial || templateSpec.useDecorators) {
              container.decorators = Utils.extend({}, env.decorators, options.decorators);
            }
            container.hooks = {};
            container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
            var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
            _helpers.moveHelperToHooks(container, "helperMissing", keepHelperInHelpers);
            _helpers.moveHelperToHooks(container, "blockHelperMissing", keepHelperInHelpers);
          } else {
            container.protoAccessControl = options.protoAccessControl;
            container.helpers = options.helpers;
            container.partials = options.partials;
            container.decorators = options.decorators;
            container.hooks = options.hooks;
          }
        };
        ret._child = function(i, data, blockParams, depths) {
          if (templateSpec.useBlockParams && !blockParams) {
            throw new _exception2["default"]("must pass block params");
          }
          if (templateSpec.useDepths && !depths) {
            throw new _exception2["default"]("must pass parent depths");
          }
          return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
        };
        return ret;
      }
      function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
        function prog(context) {
          var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
          var currentDepths = depths;
          if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
            currentDepths = [context].concat(depths);
          }
          return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
        }
        prog = executeDecorators(fn, prog, container, depths, data, blockParams);
        prog.program = i;
        prog.depth = depths ? depths.length : 0;
        prog.blockParams = declaredBlockParams || 0;
        return prog;
      }
      function resolvePartial(partial, context, options) {
        if (!partial) {
          if (options.name === "@partial-block") {
            partial = options.data["partial-block"];
          } else {
            partial = options.partials[options.name];
          }
        } else if (!partial.call && !options.name) {
          options.name = partial;
          partial = options.partials[partial];
        }
        return partial;
      }
      function invokePartial(partial, context, options) {
        var currentPartialBlock = options.data && options.data["partial-block"];
        options.partial = true;
        if (options.ids) {
          options.data.contextPath = options.ids[0] || options.data.contextPath;
        }
        var partialBlock = void 0;
        if (options.fn && options.fn !== noop) {
          (function() {
            options.data = _base.createFrame(options.data);
            var fn = options.fn;
            partialBlock = options.data["partial-block"] = function partialBlockWrapper(context2) {
              var options2 = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
              options2.data = _base.createFrame(options2.data);
              options2.data["partial-block"] = currentPartialBlock;
              return fn(context2, options2);
            };
            if (fn.partials) {
              options.partials = Utils.extend({}, options.partials, fn.partials);
            }
          })();
        }
        if (partial === void 0 && partialBlock) {
          partial = partialBlock;
        }
        if (partial === void 0) {
          throw new _exception2["default"]("The partial " + options.name + " could not be found");
        } else if (partial instanceof Function) {
          return partial(context, options);
        }
      }
      function noop() {
        return "";
      }
      function initData(context, data) {
        if (!data || !("root" in data)) {
          data = data ? _base.createFrame(data) : {};
          data.root = context;
        }
        return data;
      }
      function executeDecorators(fn, prog, container, depths, data, blockParams) {
        if (fn.decorator) {
          var props = {};
          prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
          Utils.extend(prog, props);
        }
        return prog;
      }
      function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
        Object.keys(mergedHelpers).forEach(function(helperName) {
          var helper = mergedHelpers[helperName];
          mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
        });
      }
      function passLookupPropertyOption(helper, container) {
        var lookupProperty = container.lookupProperty;
        return _internalWrapHelper.wrapHelper(helper, function(options) {
          return Utils.extend({ lookupProperty }, options);
        });
      }
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars/no-conflict.js
  var require_no_conflict = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars/no-conflict.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      exports["default"] = function(Handlebars11) {
        var root = typeof global !== "undefined" ? global : window, $Handlebars = root.Handlebars;
        Handlebars11.noConflict = function() {
          if (root.Handlebars === Handlebars11) {
            root.Handlebars = $Handlebars;
          }
          return Handlebars11;
        };
      };
      module.exports = exports["default"];
    }
  });

  // node_modules/handlebars/dist/cjs/handlebars.runtime.js
  var require_handlebars_runtime = __commonJS({
    "node_modules/handlebars/dist/cjs/handlebars.runtime.js"(exports, module) {
      "use strict";
      exports.__esModule = true;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj["default"] = obj;
          return newObj;
        }
      }
      var _handlebarsBase = require_base();
      var base = _interopRequireWildcard(_handlebarsBase);
      var _handlebarsSafeString = require_safe_string();
      var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
      var _handlebarsException = require_exception();
      var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
      var _handlebarsUtils = require_utils();
      var Utils = _interopRequireWildcard(_handlebarsUtils);
      var _handlebarsRuntime = require_runtime();
      var runtime = _interopRequireWildcard(_handlebarsRuntime);
      var _handlebarsNoConflict = require_no_conflict();
      var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
      function create() {
        var hb = new base.HandlebarsEnvironment();
        Utils.extend(hb, base);
        hb.SafeString = _handlebarsSafeString2["default"];
        hb.Exception = _handlebarsException2["default"];
        hb.Utils = Utils;
        hb.escapeExpression = Utils.escapeExpression;
        hb.VM = runtime;
        hb.template = function(spec) {
          return runtime.template(spec, hb);
        };
        return hb;
      }
      var inst = create();
      inst.create = create;
      _handlebarsNoConflict2["default"](inst);
      inst["default"] = inst;
      exports["default"] = inst;
      module.exports = exports["default"];
    }
  });

  // node_modules/lunr/lunr.js
  var require_lunr = __commonJS({
    "node_modules/lunr/lunr.js"(exports, module) {
      (function() {
        var lunr2 = function(config) {
          var builder = new lunr2.Builder();
          builder.pipeline.add(lunr2.trimmer, lunr2.stopWordFilter, lunr2.stemmer);
          builder.searchPipeline.add(lunr2.stemmer);
          config.call(builder, builder);
          return builder.build();
        };
        lunr2.version = "2.3.8";
        lunr2.utils = {};
        lunr2.utils.warn = function(global2) {
          return function(message) {
            if (global2.console && console.warn) {
              console.warn(message);
            }
          };
        }(this);
        lunr2.utils.asString = function(obj) {
          if (obj === void 0 || obj === null) {
            return "";
          } else {
            return obj.toString();
          }
        };
        lunr2.utils.clone = function(obj) {
          if (obj === null || obj === void 0) {
            return obj;
          }
          var clone = /* @__PURE__ */ Object.create(null), keys = Object.keys(obj);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i], val = obj[key];
            if (Array.isArray(val)) {
              clone[key] = val.slice();
              continue;
            }
            if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
              clone[key] = val;
              continue;
            }
            throw new TypeError("clone is not deep and does not support nested objects");
          }
          return clone;
        };
        lunr2.FieldRef = function(docRef, fieldName, stringValue) {
          this.docRef = docRef;
          this.fieldName = fieldName;
          this._stringValue = stringValue;
        };
        lunr2.FieldRef.joiner = "/";
        lunr2.FieldRef.fromString = function(s) {
          var n = s.indexOf(lunr2.FieldRef.joiner);
          if (n === -1) {
            throw "malformed field ref string";
          }
          var fieldRef = s.slice(0, n), docRef = s.slice(n + 1);
          return new lunr2.FieldRef(docRef, fieldRef, s);
        };
        lunr2.FieldRef.prototype.toString = function() {
          if (this._stringValue == void 0) {
            this._stringValue = this.fieldName + lunr2.FieldRef.joiner + this.docRef;
          }
          return this._stringValue;
        };
        lunr2.Set = function(elements) {
          this.elements = /* @__PURE__ */ Object.create(null);
          if (elements) {
            this.length = elements.length;
            for (var i = 0; i < this.length; i++) {
              this.elements[elements[i]] = true;
            }
          } else {
            this.length = 0;
          }
        };
        lunr2.Set.complete = {
          intersect: function(other) {
            return other;
          },
          union: function(other) {
            return other;
          },
          contains: function() {
            return true;
          }
        };
        lunr2.Set.empty = {
          intersect: function() {
            return this;
          },
          union: function(other) {
            return other;
          },
          contains: function() {
            return false;
          }
        };
        lunr2.Set.prototype.contains = function(object) {
          return !!this.elements[object];
        };
        lunr2.Set.prototype.intersect = function(other) {
          var a, b, elements, intersection = [];
          if (other === lunr2.Set.complete) {
            return this;
          }
          if (other === lunr2.Set.empty) {
            return other;
          }
          if (this.length < other.length) {
            a = this;
            b = other;
          } else {
            a = other;
            b = this;
          }
          elements = Object.keys(a.elements);
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element in b.elements) {
              intersection.push(element);
            }
          }
          return new lunr2.Set(intersection);
        };
        lunr2.Set.prototype.union = function(other) {
          if (other === lunr2.Set.complete) {
            return lunr2.Set.complete;
          }
          if (other === lunr2.Set.empty) {
            return this;
          }
          return new lunr2.Set(Object.keys(this.elements).concat(Object.keys(other.elements)));
        };
        lunr2.idf = function(posting, documentCount) {
          var documentsWithTerm = 0;
          for (var fieldName in posting) {
            if (fieldName == "_index")
              continue;
            documentsWithTerm += Object.keys(posting[fieldName]).length;
          }
          var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);
          return Math.log(1 + Math.abs(x));
        };
        lunr2.Token = function(str, metadata) {
          this.str = str || "";
          this.metadata = metadata || {};
        };
        lunr2.Token.prototype.toString = function() {
          return this.str;
        };
        lunr2.Token.prototype.update = function(fn) {
          this.str = fn(this.str, this.metadata);
          return this;
        };
        lunr2.Token.prototype.clone = function(fn) {
          fn = fn || function(s) {
            return s;
          };
          return new lunr2.Token(fn(this.str, this.metadata), this.metadata);
        };
        lunr2.tokenizer = function(obj, metadata) {
          if (obj == null || obj == void 0) {
            return [];
          }
          if (Array.isArray(obj)) {
            return obj.map(function(t) {
              return new lunr2.Token(lunr2.utils.asString(t).toLowerCase(), lunr2.utils.clone(metadata));
            });
          }
          var str = obj.toString().toLowerCase(), len = str.length, tokens = [];
          for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
            var char = str.charAt(sliceEnd), sliceLength = sliceEnd - sliceStart;
            if (char.match(lunr2.tokenizer.separator) || sliceEnd == len) {
              if (sliceLength > 0) {
                var tokenMetadata = lunr2.utils.clone(metadata) || {};
                tokenMetadata["position"] = [sliceStart, sliceLength];
                tokenMetadata["index"] = tokens.length;
                tokens.push(new lunr2.Token(str.slice(sliceStart, sliceEnd), tokenMetadata));
              }
              sliceStart = sliceEnd + 1;
            }
          }
          return tokens;
        };
        lunr2.tokenizer.separator = /[\s\-]+/;
        lunr2.Pipeline = function() {
          this._stack = [];
        };
        lunr2.Pipeline.registeredFunctions = /* @__PURE__ */ Object.create(null);
        lunr2.Pipeline.registerFunction = function(fn, label) {
          if (label in this.registeredFunctions) {
            lunr2.utils.warn("Overwriting existing registered function: " + label);
          }
          fn.label = label;
          lunr2.Pipeline.registeredFunctions[fn.label] = fn;
        };
        lunr2.Pipeline.warnIfFunctionNotRegistered = function(fn) {
          var isRegistered = fn.label && fn.label in this.registeredFunctions;
          if (!isRegistered) {
            lunr2.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", fn);
          }
        };
        lunr2.Pipeline.load = function(serialised) {
          var pipeline = new lunr2.Pipeline();
          serialised.forEach(function(fnName) {
            var fn = lunr2.Pipeline.registeredFunctions[fnName];
            if (fn) {
              pipeline.add(fn);
            } else {
              throw new Error("Cannot load unregistered function: " + fnName);
            }
          });
          return pipeline;
        };
        lunr2.Pipeline.prototype.add = function() {
          var fns = Array.prototype.slice.call(arguments);
          fns.forEach(function(fn) {
            lunr2.Pipeline.warnIfFunctionNotRegistered(fn);
            this._stack.push(fn);
          }, this);
        };
        lunr2.Pipeline.prototype.after = function(existingFn, newFn) {
          lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
          var pos = this._stack.indexOf(existingFn);
          if (pos == -1) {
            throw new Error("Cannot find existingFn");
          }
          pos = pos + 1;
          this._stack.splice(pos, 0, newFn);
        };
        lunr2.Pipeline.prototype.before = function(existingFn, newFn) {
          lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
          var pos = this._stack.indexOf(existingFn);
          if (pos == -1) {
            throw new Error("Cannot find existingFn");
          }
          this._stack.splice(pos, 0, newFn);
        };
        lunr2.Pipeline.prototype.remove = function(fn) {
          var pos = this._stack.indexOf(fn);
          if (pos == -1) {
            return;
          }
          this._stack.splice(pos, 1);
        };
        lunr2.Pipeline.prototype.run = function(tokens) {
          var stackLength = this._stack.length;
          for (var i = 0; i < stackLength; i++) {
            var fn = this._stack[i];
            var memo = [];
            for (var j = 0; j < tokens.length; j++) {
              var result = fn(tokens[j], j, tokens);
              if (result === null || result === void 0 || result === "")
                continue;
              if (Array.isArray(result)) {
                for (var k = 0; k < result.length; k++) {
                  memo.push(result[k]);
                }
              } else {
                memo.push(result);
              }
            }
            tokens = memo;
          }
          return tokens;
        };
        lunr2.Pipeline.prototype.runString = function(str, metadata) {
          var token = new lunr2.Token(str, metadata);
          return this.run([token]).map(function(t) {
            return t.toString();
          });
        };
        lunr2.Pipeline.prototype.reset = function() {
          this._stack = [];
        };
        lunr2.Pipeline.prototype.toJSON = function() {
          return this._stack.map(function(fn) {
            lunr2.Pipeline.warnIfFunctionNotRegistered(fn);
            return fn.label;
          });
        };
        lunr2.Vector = function(elements) {
          this._magnitude = 0;
          this.elements = elements || [];
        };
        lunr2.Vector.prototype.positionForIndex = function(index) {
          if (this.elements.length == 0) {
            return 0;
          }
          var start = 0, end = this.elements.length / 2, sliceLength = end - start, pivotPoint = Math.floor(sliceLength / 2), pivotIndex = this.elements[pivotPoint * 2];
          while (sliceLength > 1) {
            if (pivotIndex < index) {
              start = pivotPoint;
            }
            if (pivotIndex > index) {
              end = pivotPoint;
            }
            if (pivotIndex == index) {
              break;
            }
            sliceLength = end - start;
            pivotPoint = start + Math.floor(sliceLength / 2);
            pivotIndex = this.elements[pivotPoint * 2];
          }
          if (pivotIndex == index) {
            return pivotPoint * 2;
          }
          if (pivotIndex > index) {
            return pivotPoint * 2;
          }
          if (pivotIndex < index) {
            return (pivotPoint + 1) * 2;
          }
        };
        lunr2.Vector.prototype.insert = function(insertIdx, val) {
          this.upsert(insertIdx, val, function() {
            throw "duplicate index";
          });
        };
        lunr2.Vector.prototype.upsert = function(insertIdx, val, fn) {
          this._magnitude = 0;
          var position = this.positionForIndex(insertIdx);
          if (this.elements[position] == insertIdx) {
            this.elements[position + 1] = fn(this.elements[position + 1], val);
          } else {
            this.elements.splice(position, 0, insertIdx, val);
          }
        };
        lunr2.Vector.prototype.magnitude = function() {
          if (this._magnitude)
            return this._magnitude;
          var sumOfSquares = 0, elementsLength = this.elements.length;
          for (var i = 1; i < elementsLength; i += 2) {
            var val = this.elements[i];
            sumOfSquares += val * val;
          }
          return this._magnitude = Math.sqrt(sumOfSquares);
        };
        lunr2.Vector.prototype.dot = function(otherVector) {
          var dotProduct = 0, a = this.elements, b = otherVector.elements, aLen = a.length, bLen = b.length, aVal = 0, bVal = 0, i = 0, j = 0;
          while (i < aLen && j < bLen) {
            aVal = a[i], bVal = b[j];
            if (aVal < bVal) {
              i += 2;
            } else if (aVal > bVal) {
              j += 2;
            } else if (aVal == bVal) {
              dotProduct += a[i + 1] * b[j + 1];
              i += 2;
              j += 2;
            }
          }
          return dotProduct;
        };
        lunr2.Vector.prototype.similarity = function(otherVector) {
          return this.dot(otherVector) / this.magnitude() || 0;
        };
        lunr2.Vector.prototype.toArray = function() {
          var output = new Array(this.elements.length / 2);
          for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
            output[j] = this.elements[i];
          }
          return output;
        };
        lunr2.Vector.prototype.toJSON = function() {
          return this.elements;
        };
        lunr2.stemmer = function() {
          var step2list = {
            "ational": "ate",
            "tional": "tion",
            "enci": "ence",
            "anci": "ance",
            "izer": "ize",
            "bli": "ble",
            "alli": "al",
            "entli": "ent",
            "eli": "e",
            "ousli": "ous",
            "ization": "ize",
            "ation": "ate",
            "ator": "ate",
            "alism": "al",
            "iveness": "ive",
            "fulness": "ful",
            "ousness": "ous",
            "aliti": "al",
            "iviti": "ive",
            "biliti": "ble",
            "logi": "log"
          }, step3list = {
            "icate": "ic",
            "ative": "",
            "alize": "al",
            "iciti": "ic",
            "ical": "ic",
            "ful": "",
            "ness": ""
          }, c = "[^aeiou]", v = "[aeiouy]", C = c + "[^aeiouy]*", V = v + "[aeiou]*", mgr0 = "^(" + C + ")?" + V + C, meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$", mgr1 = "^(" + C + ")?" + V + C + V + C, s_v = "^(" + C + ")?" + v;
          var re_mgr0 = new RegExp(mgr0);
          var re_mgr1 = new RegExp(mgr1);
          var re_meq1 = new RegExp(meq1);
          var re_s_v = new RegExp(s_v);
          var re_1a = /^(.+?)(ss|i)es$/;
          var re2_1a = /^(.+?)([^s])s$/;
          var re_1b = /^(.+?)eed$/;
          var re2_1b = /^(.+?)(ed|ing)$/;
          var re_1b_2 = /.$/;
          var re2_1b_2 = /(at|bl|iz)$/;
          var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
          var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");
          var re_1c = /^(.+?[^aeiou])y$/;
          var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
          var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
          var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
          var re2_4 = /^(.+?)(s|t)(ion)$/;
          var re_5 = /^(.+?)e$/;
          var re_5_1 = /ll$/;
          var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");
          var porterStemmer = function porterStemmer2(w) {
            var stem, suffix, firstch, re, re2, re3, re4;
            if (w.length < 3) {
              return w;
            }
            firstch = w.substr(0, 1);
            if (firstch == "y") {
              w = firstch.toUpperCase() + w.substr(1);
            }
            re = re_1a;
            re2 = re2_1a;
            if (re.test(w)) {
              w = w.replace(re, "$1$2");
            } else if (re2.test(w)) {
              w = w.replace(re2, "$1$2");
            }
            re = re_1b;
            re2 = re2_1b;
            if (re.test(w)) {
              var fp = re.exec(w);
              re = re_mgr0;
              if (re.test(fp[1])) {
                re = re_1b_2;
                w = w.replace(re, "");
              }
            } else if (re2.test(w)) {
              var fp = re2.exec(w);
              stem = fp[1];
              re2 = re_s_v;
              if (re2.test(stem)) {
                w = stem;
                re2 = re2_1b_2;
                re3 = re3_1b_2;
                re4 = re4_1b_2;
                if (re2.test(w)) {
                  w = w + "e";
                } else if (re3.test(w)) {
                  re = re_1b_2;
                  w = w.replace(re, "");
                } else if (re4.test(w)) {
                  w = w + "e";
                }
              }
            }
            re = re_1c;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              w = stem + "i";
            }
            re = re_2;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              suffix = fp[2];
              re = re_mgr0;
              if (re.test(stem)) {
                w = stem + step2list[suffix];
              }
            }
            re = re_3;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              suffix = fp[2];
              re = re_mgr0;
              if (re.test(stem)) {
                w = stem + step3list[suffix];
              }
            }
            re = re_4;
            re2 = re2_4;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              re = re_mgr1;
              if (re.test(stem)) {
                w = stem;
              }
            } else if (re2.test(w)) {
              var fp = re2.exec(w);
              stem = fp[1] + fp[2];
              re2 = re_mgr1;
              if (re2.test(stem)) {
                w = stem;
              }
            }
            re = re_5;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              re = re_mgr1;
              re2 = re_meq1;
              re3 = re3_5;
              if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
                w = stem;
              }
            }
            re = re_5_1;
            re2 = re_mgr1;
            if (re.test(w) && re2.test(w)) {
              re = re_1b_2;
              w = w.replace(re, "");
            }
            if (firstch == "y") {
              w = firstch.toLowerCase() + w.substr(1);
            }
            return w;
          };
          return function(token) {
            return token.update(porterStemmer);
          };
        }();
        lunr2.Pipeline.registerFunction(lunr2.stemmer, "stemmer");
        lunr2.generateStopWordFilter = function(stopWords) {
          var words = stopWords.reduce(function(memo, stopWord) {
            memo[stopWord] = stopWord;
            return memo;
          }, {});
          return function(token) {
            if (token && words[token.toString()] !== token.toString())
              return token;
          };
        };
        lunr2.stopWordFilter = lunr2.generateStopWordFilter([
          "a",
          "able",
          "about",
          "across",
          "after",
          "all",
          "almost",
          "also",
          "am",
          "among",
          "an",
          "and",
          "any",
          "are",
          "as",
          "at",
          "be",
          "because",
          "been",
          "but",
          "by",
          "can",
          "cannot",
          "could",
          "dear",
          "did",
          "do",
          "does",
          "either",
          "else",
          "ever",
          "every",
          "for",
          "from",
          "get",
          "got",
          "had",
          "has",
          "have",
          "he",
          "her",
          "hers",
          "him",
          "his",
          "how",
          "however",
          "i",
          "if",
          "in",
          "into",
          "is",
          "it",
          "its",
          "just",
          "least",
          "let",
          "like",
          "likely",
          "may",
          "me",
          "might",
          "most",
          "must",
          "my",
          "neither",
          "no",
          "nor",
          "not",
          "of",
          "off",
          "often",
          "on",
          "only",
          "or",
          "other",
          "our",
          "own",
          "rather",
          "said",
          "say",
          "says",
          "she",
          "should",
          "since",
          "so",
          "some",
          "than",
          "that",
          "the",
          "their",
          "them",
          "then",
          "there",
          "these",
          "they",
          "this",
          "tis",
          "to",
          "too",
          "twas",
          "us",
          "wants",
          "was",
          "we",
          "were",
          "what",
          "when",
          "where",
          "which",
          "while",
          "who",
          "whom",
          "why",
          "will",
          "with",
          "would",
          "yet",
          "you",
          "your"
        ]);
        lunr2.Pipeline.registerFunction(lunr2.stopWordFilter, "stopWordFilter");
        lunr2.trimmer = function(token) {
          return token.update(function(s) {
            return s.replace(/^\W+/, "").replace(/\W+$/, "");
          });
        };
        lunr2.Pipeline.registerFunction(lunr2.trimmer, "trimmer");
        lunr2.TokenSet = function() {
          this.final = false;
          this.edges = {};
          this.id = lunr2.TokenSet._nextId;
          lunr2.TokenSet._nextId += 1;
        };
        lunr2.TokenSet._nextId = 1;
        lunr2.TokenSet.fromArray = function(arr) {
          var builder = new lunr2.TokenSet.Builder();
          for (var i = 0, len = arr.length; i < len; i++) {
            builder.insert(arr[i]);
          }
          builder.finish();
          return builder.root;
        };
        lunr2.TokenSet.fromClause = function(clause) {
          if ("editDistance" in clause) {
            return lunr2.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
          } else {
            return lunr2.TokenSet.fromString(clause.term);
          }
        };
        lunr2.TokenSet.fromFuzzyString = function(str, editDistance) {
          var root = new lunr2.TokenSet();
          var stack = [{
            node: root,
            editsRemaining: editDistance,
            str
          }];
          while (stack.length) {
            var frame = stack.pop();
            if (frame.str.length > 0) {
              var char = frame.str.charAt(0), noEditNode;
              if (char in frame.node.edges) {
                noEditNode = frame.node.edges[char];
              } else {
                noEditNode = new lunr2.TokenSet();
                frame.node.edges[char] = noEditNode;
              }
              if (frame.str.length == 1) {
                noEditNode.final = true;
              }
              stack.push({
                node: noEditNode,
                editsRemaining: frame.editsRemaining,
                str: frame.str.slice(1)
              });
            }
            if (frame.editsRemaining == 0) {
              continue;
            }
            if ("*" in frame.node.edges) {
              var insertionNode = frame.node.edges["*"];
            } else {
              var insertionNode = new lunr2.TokenSet();
              frame.node.edges["*"] = insertionNode;
            }
            if (frame.str.length == 0) {
              insertionNode.final = true;
            }
            stack.push({
              node: insertionNode,
              editsRemaining: frame.editsRemaining - 1,
              str: frame.str
            });
            if (frame.str.length > 1) {
              stack.push({
                node: frame.node,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
              });
            }
            if (frame.str.length == 1) {
              frame.node.final = true;
            }
            if (frame.str.length >= 1) {
              if ("*" in frame.node.edges) {
                var substitutionNode = frame.node.edges["*"];
              } else {
                var substitutionNode = new lunr2.TokenSet();
                frame.node.edges["*"] = substitutionNode;
              }
              if (frame.str.length == 1) {
                substitutionNode.final = true;
              }
              stack.push({
                node: substitutionNode,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
              });
            }
            if (frame.str.length > 1) {
              var charA = frame.str.charAt(0), charB = frame.str.charAt(1), transposeNode;
              if (charB in frame.node.edges) {
                transposeNode = frame.node.edges[charB];
              } else {
                transposeNode = new lunr2.TokenSet();
                frame.node.edges[charB] = transposeNode;
              }
              if (frame.str.length == 1) {
                transposeNode.final = true;
              }
              stack.push({
                node: transposeNode,
                editsRemaining: frame.editsRemaining - 1,
                str: charA + frame.str.slice(2)
              });
            }
          }
          return root;
        };
        lunr2.TokenSet.fromString = function(str) {
          var node = new lunr2.TokenSet(), root = node;
          for (var i = 0, len = str.length; i < len; i++) {
            var char = str[i], final = i == len - 1;
            if (char == "*") {
              node.edges[char] = node;
              node.final = final;
            } else {
              var next = new lunr2.TokenSet();
              next.final = final;
              node.edges[char] = next;
              node = next;
            }
          }
          return root;
        };
        lunr2.TokenSet.prototype.toArray = function() {
          var words = [];
          var stack = [{
            prefix: "",
            node: this
          }];
          while (stack.length) {
            var frame = stack.pop(), edges = Object.keys(frame.node.edges), len = edges.length;
            if (frame.node.final) {
              frame.prefix.charAt(0);
              words.push(frame.prefix);
            }
            for (var i = 0; i < len; i++) {
              var edge = edges[i];
              stack.push({
                prefix: frame.prefix.concat(edge),
                node: frame.node.edges[edge]
              });
            }
          }
          return words;
        };
        lunr2.TokenSet.prototype.toString = function() {
          if (this._str) {
            return this._str;
          }
          var str = this.final ? "1" : "0", labels = Object.keys(this.edges).sort(), len = labels.length;
          for (var i = 0; i < len; i++) {
            var label = labels[i], node = this.edges[label];
            str = str + label + node.id;
          }
          return str;
        };
        lunr2.TokenSet.prototype.intersect = function(b) {
          var output = new lunr2.TokenSet(), frame = void 0;
          var stack = [{
            qNode: b,
            output,
            node: this
          }];
          while (stack.length) {
            frame = stack.pop();
            var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
            for (var q = 0; q < qLen; q++) {
              var qEdge = qEdges[q];
              for (var n = 0; n < nLen; n++) {
                var nEdge = nEdges[n];
                if (nEdge == qEdge || qEdge == "*") {
                  var node = frame.node.edges[nEdge], qNode = frame.qNode.edges[qEdge], final = node.final && qNode.final, next = void 0;
                  if (nEdge in frame.output.edges) {
                    next = frame.output.edges[nEdge];
                    next.final = next.final || final;
                  } else {
                    next = new lunr2.TokenSet();
                    next.final = final;
                    frame.output.edges[nEdge] = next;
                  }
                  stack.push({
                    qNode,
                    output: next,
                    node
                  });
                }
              }
            }
          }
          return output;
        };
        lunr2.TokenSet.Builder = function() {
          this.previousWord = "";
          this.root = new lunr2.TokenSet();
          this.uncheckedNodes = [];
          this.minimizedNodes = {};
        };
        lunr2.TokenSet.Builder.prototype.insert = function(word) {
          var node, commonPrefix = 0;
          if (word < this.previousWord) {
            throw new Error("Out of order word insertion");
          }
          for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
            if (word[i] != this.previousWord[i])
              break;
            commonPrefix++;
          }
          this.minimize(commonPrefix);
          if (this.uncheckedNodes.length == 0) {
            node = this.root;
          } else {
            node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
          }
          for (var i = commonPrefix; i < word.length; i++) {
            var nextNode = new lunr2.TokenSet(), char = word[i];
            node.edges[char] = nextNode;
            this.uncheckedNodes.push({
              parent: node,
              char,
              child: nextNode
            });
            node = nextNode;
          }
          node.final = true;
          this.previousWord = word;
        };
        lunr2.TokenSet.Builder.prototype.finish = function() {
          this.minimize(0);
        };
        lunr2.TokenSet.Builder.prototype.minimize = function(downTo) {
          for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
            var node = this.uncheckedNodes[i], childKey = node.child.toString();
            if (childKey in this.minimizedNodes) {
              node.parent.edges[node.char] = this.minimizedNodes[childKey];
            } else {
              node.child._str = childKey;
              this.minimizedNodes[childKey] = node.child;
            }
            this.uncheckedNodes.pop();
          }
        };
        lunr2.Index = function(attrs) {
          this.invertedIndex = attrs.invertedIndex;
          this.fieldVectors = attrs.fieldVectors;
          this.tokenSet = attrs.tokenSet;
          this.fields = attrs.fields;
          this.pipeline = attrs.pipeline;
        };
        lunr2.Index.prototype.search = function(queryString) {
          return this.query(function(query) {
            var parser = new lunr2.QueryParser(queryString, query);
            parser.parse();
          });
        };
        lunr2.Index.prototype.query = function(fn) {
          var query = new lunr2.Query(this.fields), matchingFields = /* @__PURE__ */ Object.create(null), queryVectors = /* @__PURE__ */ Object.create(null), termFieldCache = /* @__PURE__ */ Object.create(null), requiredMatches = /* @__PURE__ */ Object.create(null), prohibitedMatches = /* @__PURE__ */ Object.create(null);
          for (var i = 0; i < this.fields.length; i++) {
            queryVectors[this.fields[i]] = new lunr2.Vector();
          }
          fn.call(query, query);
          for (var i = 0; i < query.clauses.length; i++) {
            var clause = query.clauses[i], terms = null, clauseMatches = lunr2.Set.complete;
            if (clause.usePipeline) {
              terms = this.pipeline.runString(clause.term, {
                fields: clause.fields
              });
            } else {
              terms = [clause.term];
            }
            for (var m = 0; m < terms.length; m++) {
              var term = terms[m];
              clause.term = term;
              var termTokenSet = lunr2.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
              if (expandedTerms.length === 0 && clause.presence === lunr2.Query.presence.REQUIRED) {
                for (var k = 0; k < clause.fields.length; k++) {
                  var field = clause.fields[k];
                  requiredMatches[field] = lunr2.Set.empty;
                }
                break;
              }
              for (var j = 0; j < expandedTerms.length; j++) {
                var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
                for (var k = 0; k < clause.fields.length; k++) {
                  var field = clause.fields[k], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr2.Set(matchingDocumentRefs);
                  if (clause.presence == lunr2.Query.presence.REQUIRED) {
                    clauseMatches = clauseMatches.union(matchingDocumentsSet);
                    if (requiredMatches[field] === void 0) {
                      requiredMatches[field] = lunr2.Set.complete;
                    }
                  }
                  if (clause.presence == lunr2.Query.presence.PROHIBITED) {
                    if (prohibitedMatches[field] === void 0) {
                      prohibitedMatches[field] = lunr2.Set.empty;
                    }
                    prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);
                    continue;
                  }
                  queryVectors[field].upsert(termIndex, clause.boost, function(a, b) {
                    return a + b;
                  });
                  if (termFieldCache[termField]) {
                    continue;
                  }
                  for (var l = 0; l < matchingDocumentRefs.length; l++) {
                    var matchingDocumentRef = matchingDocumentRefs[l], matchingFieldRef = new lunr2.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
                    if ((fieldMatch = matchingFields[matchingFieldRef]) === void 0) {
                      matchingFields[matchingFieldRef] = new lunr2.MatchData(expandedTerm, field, metadata);
                    } else {
                      fieldMatch.add(expandedTerm, field, metadata);
                    }
                  }
                  termFieldCache[termField] = true;
                }
              }
            }
            if (clause.presence === lunr2.Query.presence.REQUIRED) {
              for (var k = 0; k < clause.fields.length; k++) {
                var field = clause.fields[k];
                requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
              }
            }
          }
          var allRequiredMatches = lunr2.Set.complete, allProhibitedMatches = lunr2.Set.empty;
          for (var i = 0; i < this.fields.length; i++) {
            var field = this.fields[i];
            if (requiredMatches[field]) {
              allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
            }
            if (prohibitedMatches[field]) {
              allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field]);
            }
          }
          var matchingFieldRefs = Object.keys(matchingFields), results = [], matches = /* @__PURE__ */ Object.create(null);
          if (query.isNegated()) {
            matchingFieldRefs = Object.keys(this.fieldVectors);
            for (var i = 0; i < matchingFieldRefs.length; i++) {
              var matchingFieldRef = matchingFieldRefs[i];
              var fieldRef = lunr2.FieldRef.fromString(matchingFieldRef);
              matchingFields[matchingFieldRef] = new lunr2.MatchData();
            }
          }
          for (var i = 0; i < matchingFieldRefs.length; i++) {
            var fieldRef = lunr2.FieldRef.fromString(matchingFieldRefs[i]), docRef = fieldRef.docRef;
            if (!allRequiredMatches.contains(docRef)) {
              continue;
            }
            if (allProhibitedMatches.contains(docRef)) {
              continue;
            }
            var fieldVector = this.fieldVectors[fieldRef], score = queryVectors[fieldRef.fieldName].similarity(fieldVector), docMatch;
            if ((docMatch = matches[docRef]) !== void 0) {
              docMatch.score += score;
              docMatch.matchData.combine(matchingFields[fieldRef]);
            } else {
              var match = {
                ref: docRef,
                score,
                matchData: matchingFields[fieldRef]
              };
              matches[docRef] = match;
              results.push(match);
            }
          }
          return results.sort(function(a, b) {
            return b.score - a.score;
          });
        };
        lunr2.Index.prototype.toJSON = function() {
          var invertedIndex = Object.keys(this.invertedIndex).sort().map(function(term) {
            return [term, this.invertedIndex[term]];
          }, this);
          var fieldVectors = Object.keys(this.fieldVectors).map(function(ref) {
            return [ref, this.fieldVectors[ref].toJSON()];
          }, this);
          return {
            version: lunr2.version,
            fields: this.fields,
            fieldVectors,
            invertedIndex,
            pipeline: this.pipeline.toJSON()
          };
        };
        lunr2.Index.load = function(serializedIndex) {
          var attrs = {}, fieldVectors = {}, serializedVectors = serializedIndex.fieldVectors, invertedIndex = /* @__PURE__ */ Object.create(null), serializedInvertedIndex = serializedIndex.invertedIndex, tokenSetBuilder = new lunr2.TokenSet.Builder(), pipeline = lunr2.Pipeline.load(serializedIndex.pipeline);
          if (serializedIndex.version != lunr2.version) {
            lunr2.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr2.version + "' does not match serialized index '" + serializedIndex.version + "'");
          }
          for (var i = 0; i < serializedVectors.length; i++) {
            var tuple = serializedVectors[i], ref = tuple[0], elements = tuple[1];
            fieldVectors[ref] = new lunr2.Vector(elements);
          }
          for (var i = 0; i < serializedInvertedIndex.length; i++) {
            var tuple = serializedInvertedIndex[i], term = tuple[0], posting = tuple[1];
            tokenSetBuilder.insert(term);
            invertedIndex[term] = posting;
          }
          tokenSetBuilder.finish();
          attrs.fields = serializedIndex.fields;
          attrs.fieldVectors = fieldVectors;
          attrs.invertedIndex = invertedIndex;
          attrs.tokenSet = tokenSetBuilder.root;
          attrs.pipeline = pipeline;
          return new lunr2.Index(attrs);
        };
        lunr2.Builder = function() {
          this._ref = "id";
          this._fields = /* @__PURE__ */ Object.create(null);
          this._documents = /* @__PURE__ */ Object.create(null);
          this.invertedIndex = /* @__PURE__ */ Object.create(null);
          this.fieldTermFrequencies = {};
          this.fieldLengths = {};
          this.tokenizer = lunr2.tokenizer;
          this.pipeline = new lunr2.Pipeline();
          this.searchPipeline = new lunr2.Pipeline();
          this.documentCount = 0;
          this._b = 0.75;
          this._k1 = 1.2;
          this.termIndex = 0;
          this.metadataWhitelist = [];
        };
        lunr2.Builder.prototype.ref = function(ref) {
          this._ref = ref;
        };
        lunr2.Builder.prototype.field = function(fieldName, attributes) {
          if (/\//.test(fieldName)) {
            throw new RangeError("Field '" + fieldName + "' contains illegal character '/'");
          }
          this._fields[fieldName] = attributes || {};
        };
        lunr2.Builder.prototype.b = function(number) {
          if (number < 0) {
            this._b = 0;
          } else if (number > 1) {
            this._b = 1;
          } else {
            this._b = number;
          }
        };
        lunr2.Builder.prototype.k1 = function(number) {
          this._k1 = number;
        };
        lunr2.Builder.prototype.add = function(doc, attributes) {
          var docRef = doc[this._ref], fields = Object.keys(this._fields);
          this._documents[docRef] = attributes || {};
          this.documentCount += 1;
          for (var i = 0; i < fields.length; i++) {
            var fieldName = fields[i], extractor = this._fields[fieldName].extractor, field = extractor ? extractor(doc) : doc[fieldName], tokens = this.tokenizer(field, {
              fields: [fieldName]
            }), terms = this.pipeline.run(tokens), fieldRef = new lunr2.FieldRef(docRef, fieldName), fieldTerms = /* @__PURE__ */ Object.create(null);
            this.fieldTermFrequencies[fieldRef] = fieldTerms;
            this.fieldLengths[fieldRef] = 0;
            this.fieldLengths[fieldRef] += terms.length;
            for (var j = 0; j < terms.length; j++) {
              var term = terms[j];
              if (fieldTerms[term] == void 0) {
                fieldTerms[term] = 0;
              }
              fieldTerms[term] += 1;
              if (this.invertedIndex[term] == void 0) {
                var posting = /* @__PURE__ */ Object.create(null);
                posting["_index"] = this.termIndex;
                this.termIndex += 1;
                for (var k = 0; k < fields.length; k++) {
                  posting[fields[k]] = /* @__PURE__ */ Object.create(null);
                }
                this.invertedIndex[term] = posting;
              }
              if (this.invertedIndex[term][fieldName][docRef] == void 0) {
                this.invertedIndex[term][fieldName][docRef] = /* @__PURE__ */ Object.create(null);
              }
              for (var l = 0; l < this.metadataWhitelist.length; l++) {
                var metadataKey = this.metadataWhitelist[l], metadata = term.metadata[metadataKey];
                if (this.invertedIndex[term][fieldName][docRef][metadataKey] == void 0) {
                  this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
                }
                this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
              }
            }
          }
        };
        lunr2.Builder.prototype.calculateAverageFieldLengths = function() {
          var fieldRefs = Object.keys(this.fieldLengths), numberOfFields = fieldRefs.length, accumulator = {}, documentsWithField = {};
          for (var i = 0; i < numberOfFields; i++) {
            var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i]), field = fieldRef.fieldName;
            documentsWithField[field] || (documentsWithField[field] = 0);
            documentsWithField[field] += 1;
            accumulator[field] || (accumulator[field] = 0);
            accumulator[field] += this.fieldLengths[fieldRef];
          }
          var fields = Object.keys(this._fields);
          for (var i = 0; i < fields.length; i++) {
            var fieldName = fields[i];
            accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
          }
          this.averageFieldLength = accumulator;
        };
        lunr2.Builder.prototype.createFieldVectors = function() {
          var fieldVectors = {}, fieldRefs = Object.keys(this.fieldTermFrequencies), fieldRefsLength = fieldRefs.length, termIdfCache = /* @__PURE__ */ Object.create(null);
          for (var i = 0; i < fieldRefsLength; i++) {
            var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i]), fieldName = fieldRef.fieldName, fieldLength = this.fieldLengths[fieldRef], fieldVector = new lunr2.Vector(), termFrequencies = this.fieldTermFrequencies[fieldRef], terms = Object.keys(termFrequencies), termsLength = terms.length;
            var fieldBoost = this._fields[fieldName].boost || 1, docBoost = this._documents[fieldRef.docRef].boost || 1;
            for (var j = 0; j < termsLength; j++) {
              var term = terms[j], tf = termFrequencies[term], termIndex = this.invertedIndex[term]._index, idf, score, scoreWithPrecision;
              if (termIdfCache[term] === void 0) {
                idf = lunr2.idf(this.invertedIndex[term], this.documentCount);
                termIdfCache[term] = idf;
              } else {
                idf = termIdfCache[term];
              }
              score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
              score *= fieldBoost;
              score *= docBoost;
              scoreWithPrecision = Math.round(score * 1e3) / 1e3;
              fieldVector.insert(termIndex, scoreWithPrecision);
            }
            fieldVectors[fieldRef] = fieldVector;
          }
          this.fieldVectors = fieldVectors;
        };
        lunr2.Builder.prototype.createTokenSet = function() {
          this.tokenSet = lunr2.TokenSet.fromArray(Object.keys(this.invertedIndex).sort());
        };
        lunr2.Builder.prototype.build = function() {
          this.calculateAverageFieldLengths();
          this.createFieldVectors();
          this.createTokenSet();
          return new lunr2.Index({
            invertedIndex: this.invertedIndex,
            fieldVectors: this.fieldVectors,
            tokenSet: this.tokenSet,
            fields: Object.keys(this._fields),
            pipeline: this.searchPipeline
          });
        };
        lunr2.Builder.prototype.use = function(fn) {
          var args = Array.prototype.slice.call(arguments, 1);
          args.unshift(this);
          fn.apply(this, args);
        };
        lunr2.MatchData = function(term, field, metadata) {
          var clonedMetadata = /* @__PURE__ */ Object.create(null), metadataKeys = Object.keys(metadata || {});
          for (var i = 0; i < metadataKeys.length; i++) {
            var key = metadataKeys[i];
            clonedMetadata[key] = metadata[key].slice();
          }
          this.metadata = /* @__PURE__ */ Object.create(null);
          if (term !== void 0) {
            this.metadata[term] = /* @__PURE__ */ Object.create(null);
            this.metadata[term][field] = clonedMetadata;
          }
        };
        lunr2.MatchData.prototype.combine = function(otherMatchData) {
          var terms = Object.keys(otherMatchData.metadata);
          for (var i = 0; i < terms.length; i++) {
            var term = terms[i], fields = Object.keys(otherMatchData.metadata[term]);
            if (this.metadata[term] == void 0) {
              this.metadata[term] = /* @__PURE__ */ Object.create(null);
            }
            for (var j = 0; j < fields.length; j++) {
              var field = fields[j], keys = Object.keys(otherMatchData.metadata[term][field]);
              if (this.metadata[term][field] == void 0) {
                this.metadata[term][field] = /* @__PURE__ */ Object.create(null);
              }
              for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                if (this.metadata[term][field][key] == void 0) {
                  this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
                } else {
                  this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
                }
              }
            }
          }
        };
        lunr2.MatchData.prototype.add = function(term, field, metadata) {
          if (!(term in this.metadata)) {
            this.metadata[term] = /* @__PURE__ */ Object.create(null);
            this.metadata[term][field] = metadata;
            return;
          }
          if (!(field in this.metadata[term])) {
            this.metadata[term][field] = metadata;
            return;
          }
          var metadataKeys = Object.keys(metadata);
          for (var i = 0; i < metadataKeys.length; i++) {
            var key = metadataKeys[i];
            if (key in this.metadata[term][field]) {
              this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
            } else {
              this.metadata[term][field][key] = metadata[key];
            }
          }
        };
        lunr2.Query = function(allFields) {
          this.clauses = [];
          this.allFields = allFields;
        };
        lunr2.Query.wildcard = new String("*");
        lunr2.Query.wildcard.NONE = 0;
        lunr2.Query.wildcard.LEADING = 1;
        lunr2.Query.wildcard.TRAILING = 2;
        lunr2.Query.presence = {
          OPTIONAL: 1,
          REQUIRED: 2,
          PROHIBITED: 3
        };
        lunr2.Query.prototype.clause = function(clause) {
          if (!("fields" in clause)) {
            clause.fields = this.allFields;
          }
          if (!("boost" in clause)) {
            clause.boost = 1;
          }
          if (!("usePipeline" in clause)) {
            clause.usePipeline = true;
          }
          if (!("wildcard" in clause)) {
            clause.wildcard = lunr2.Query.wildcard.NONE;
          }
          if (clause.wildcard & lunr2.Query.wildcard.LEADING && clause.term.charAt(0) != lunr2.Query.wildcard) {
            clause.term = "*" + clause.term;
          }
          if (clause.wildcard & lunr2.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr2.Query.wildcard) {
            clause.term = "" + clause.term + "*";
          }
          if (!("presence" in clause)) {
            clause.presence = lunr2.Query.presence.OPTIONAL;
          }
          this.clauses.push(clause);
          return this;
        };
        lunr2.Query.prototype.isNegated = function() {
          for (var i = 0; i < this.clauses.length; i++) {
            if (this.clauses[i].presence != lunr2.Query.presence.PROHIBITED) {
              return false;
            }
          }
          return true;
        };
        lunr2.Query.prototype.term = function(term, options) {
          if (Array.isArray(term)) {
            term.forEach(function(t) {
              this.term(t, lunr2.utils.clone(options));
            }, this);
            return this;
          }
          var clause = options || {};
          clause.term = term.toString();
          this.clause(clause);
          return this;
        };
        lunr2.QueryParseError = function(message, start, end) {
          this.name = "QueryParseError";
          this.message = message;
          this.start = start;
          this.end = end;
        };
        lunr2.QueryParseError.prototype = new Error();
        lunr2.QueryLexer = function(str) {
          this.lexemes = [];
          this.str = str;
          this.length = str.length;
          this.pos = 0;
          this.start = 0;
          this.escapeCharPositions = [];
        };
        lunr2.QueryLexer.prototype.run = function() {
          var state8 = lunr2.QueryLexer.lexText;
          while (state8) {
            state8 = state8(this);
          }
        };
        lunr2.QueryLexer.prototype.sliceString = function() {
          var subSlices = [], sliceStart = this.start, sliceEnd = this.pos;
          for (var i = 0; i < this.escapeCharPositions.length; i++) {
            sliceEnd = this.escapeCharPositions[i];
            subSlices.push(this.str.slice(sliceStart, sliceEnd));
            sliceStart = sliceEnd + 1;
          }
          subSlices.push(this.str.slice(sliceStart, this.pos));
          this.escapeCharPositions.length = 0;
          return subSlices.join("");
        };
        lunr2.QueryLexer.prototype.emit = function(type) {
          this.lexemes.push({
            type,
            str: this.sliceString(),
            start: this.start,
            end: this.pos
          });
          this.start = this.pos;
        };
        lunr2.QueryLexer.prototype.escapeCharacter = function() {
          this.escapeCharPositions.push(this.pos - 1);
          this.pos += 1;
        };
        lunr2.QueryLexer.prototype.next = function() {
          if (this.pos >= this.length) {
            return lunr2.QueryLexer.EOS;
          }
          var char = this.str.charAt(this.pos);
          this.pos += 1;
          return char;
        };
        lunr2.QueryLexer.prototype.width = function() {
          return this.pos - this.start;
        };
        lunr2.QueryLexer.prototype.ignore = function() {
          if (this.start == this.pos) {
            this.pos += 1;
          }
          this.start = this.pos;
        };
        lunr2.QueryLexer.prototype.backup = function() {
          this.pos -= 1;
        };
        lunr2.QueryLexer.prototype.acceptDigitRun = function() {
          var char, charCode;
          do {
            char = this.next();
            charCode = char.charCodeAt(0);
          } while (charCode > 47 && charCode < 58);
          if (char != lunr2.QueryLexer.EOS) {
            this.backup();
          }
        };
        lunr2.QueryLexer.prototype.more = function() {
          return this.pos < this.length;
        };
        lunr2.QueryLexer.EOS = "EOS";
        lunr2.QueryLexer.FIELD = "FIELD";
        lunr2.QueryLexer.TERM = "TERM";
        lunr2.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
        lunr2.QueryLexer.BOOST = "BOOST";
        lunr2.QueryLexer.PRESENCE = "PRESENCE";
        lunr2.QueryLexer.lexField = function(lexer) {
          lexer.backup();
          lexer.emit(lunr2.QueryLexer.FIELD);
          lexer.ignore();
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexTerm = function(lexer) {
          if (lexer.width() > 1) {
            lexer.backup();
            lexer.emit(lunr2.QueryLexer.TERM);
          }
          lexer.ignore();
          if (lexer.more()) {
            return lunr2.QueryLexer.lexText;
          }
        };
        lunr2.QueryLexer.lexEditDistance = function(lexer) {
          lexer.ignore();
          lexer.acceptDigitRun();
          lexer.emit(lunr2.QueryLexer.EDIT_DISTANCE);
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexBoost = function(lexer) {
          lexer.ignore();
          lexer.acceptDigitRun();
          lexer.emit(lunr2.QueryLexer.BOOST);
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexEOS = function(lexer) {
          if (lexer.width() > 0) {
            lexer.emit(lunr2.QueryLexer.TERM);
          }
        };
        lunr2.QueryLexer.termSeparator = lunr2.tokenizer.separator;
        lunr2.QueryLexer.lexText = function(lexer) {
          while (true) {
            var char = lexer.next();
            if (char == lunr2.QueryLexer.EOS) {
              return lunr2.QueryLexer.lexEOS;
            }
            if (char.charCodeAt(0) == 92) {
              lexer.escapeCharacter();
              continue;
            }
            if (char == ":") {
              return lunr2.QueryLexer.lexField;
            }
            if (char == "~") {
              lexer.backup();
              if (lexer.width() > 0) {
                lexer.emit(lunr2.QueryLexer.TERM);
              }
              return lunr2.QueryLexer.lexEditDistance;
            }
            if (char == "^") {
              lexer.backup();
              if (lexer.width() > 0) {
                lexer.emit(lunr2.QueryLexer.TERM);
              }
              return lunr2.QueryLexer.lexBoost;
            }
            if (char == "+" && lexer.width() === 1) {
              lexer.emit(lunr2.QueryLexer.PRESENCE);
              return lunr2.QueryLexer.lexText;
            }
            if (char == "-" && lexer.width() === 1) {
              lexer.emit(lunr2.QueryLexer.PRESENCE);
              return lunr2.QueryLexer.lexText;
            }
            if (char.match(lunr2.QueryLexer.termSeparator)) {
              return lunr2.QueryLexer.lexTerm;
            }
          }
        };
        lunr2.QueryParser = function(str, query) {
          this.lexer = new lunr2.QueryLexer(str);
          this.query = query;
          this.currentClause = {};
          this.lexemeIdx = 0;
        };
        lunr2.QueryParser.prototype.parse = function() {
          this.lexer.run();
          this.lexemes = this.lexer.lexemes;
          var state8 = lunr2.QueryParser.parseClause;
          while (state8) {
            state8 = state8(this);
          }
          return this.query;
        };
        lunr2.QueryParser.prototype.peekLexeme = function() {
          return this.lexemes[this.lexemeIdx];
        };
        lunr2.QueryParser.prototype.consumeLexeme = function() {
          var lexeme = this.peekLexeme();
          this.lexemeIdx += 1;
          return lexeme;
        };
        lunr2.QueryParser.prototype.nextClause = function() {
          var completedClause = this.currentClause;
          this.query.clause(completedClause);
          this.currentClause = {};
        };
        lunr2.QueryParser.parseClause = function(parser) {
          var lexeme = parser.peekLexeme();
          if (lexeme == void 0) {
            return;
          }
          switch (lexeme.type) {
            case lunr2.QueryLexer.PRESENCE:
              return lunr2.QueryParser.parsePresence;
            case lunr2.QueryLexer.FIELD:
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expected either a field or a term, found " + lexeme.type;
              if (lexeme.str.length >= 1) {
                errorMessage += " with value '" + lexeme.str + "'";
              }
              throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
        };
        lunr2.QueryParser.parsePresence = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          switch (lexeme.str) {
            case "-":
              parser.currentClause.presence = lunr2.Query.presence.PROHIBITED;
              break;
            case "+":
              parser.currentClause.presence = lunr2.Query.presence.REQUIRED;
              break;
            default:
              var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
              throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            var errorMessage = "expecting term or field, found nothing";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.FIELD:
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseField = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          if (parser.query.allFields.indexOf(lexeme.str) == -1) {
            var possibleFields = parser.query.allFields.map(function(f) {
              return "'" + f + "'";
            }).join(", "), errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.fields = [lexeme.str];
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            var errorMessage = "expecting term, found nothing";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseTerm = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          parser.currentClause.term = lexeme.str.toLowerCase();
          if (lexeme.str.indexOf("*") != -1) {
            parser.currentClause.usePipeline = false;
          }
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseEditDistance = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          var editDistance = parseInt(lexeme.str, 10);
          if (isNaN(editDistance)) {
            var errorMessage = "edit distance must be numeric";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.editDistance = editDistance;
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseBoost = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          var boost = parseInt(lexeme.str, 10);
          if (isNaN(boost)) {
            var errorMessage = "boost must be numeric";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.boost = boost;
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        (function(root, factory) {
          if (typeof define === "function" && define.amd) {
            define(factory);
          } else if (typeof exports === "object") {
            module.exports = factory();
          } else {
            root.lunr = factory();
          }
        })(this, function() {
          return lunr2;
        });
      })();
    }
  });

  // js/helpers.js
  var qs = document.querySelector.bind(document);
  var qsAll = document.querySelectorAll.bind(document);
  function escapeRegexModifiers(text) {
    return text.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }
  function escapeHtmlEntities(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function getCurrentPageSidebarType() {
    return document.body.dataset.type;
  }
  function findSidebarCategory(nodes, anchor) {
    if (!nodes)
      return;
    for (const node of nodes) {
      const nodeGroup = node.nodeGroups && node.nodeGroups.find((nodeGroup2) => nodeGroup2.nodes.some((subnode) => subnode.anchor === anchor));
      if (nodeGroup)
        return nodeGroup.key;
    }
    return null;
  }
  function getLocationHash() {
    return window.location.hash.replace(/^#/, "");
  }
  function getQueryParamByName(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  function checkUrlExists(url) {
    return fetch(url).then((response) => response.ok).catch(() => false);
  }
  function onDocumentReady(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }
  function isBlank(text) {
    return !text || text.trim() === "";
  }
  function debounce(fn, milliseconds) {
    let timeout;
    return function debouncedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        fn(...args);
      }, milliseconds);
    };
  }
  function getProjectNameAndVersion() {
    return document.head.querySelector("meta[name=project][content]").content;
  }

  // js/settings-store.js
  var SETTINGS_KEY = "ex_doc:settings";
  var DEFAULT_SETTINGS = {
    tooltips: true,
    theme: null,
    livebookUrl: null
  };
  var SettingsStore = class {
    constructor() {
      this._subscribers = [];
      this._settings = DEFAULT_SETTINGS;
      this._loadSettings();
    }
    get() {
      return this._settings;
    }
    update(newSettings) {
      const prevSettings = this._settings;
      this._settings = { ...this._settings, ...newSettings };
      this._subscribers.forEach((callback) => callback(this._settings, prevSettings));
      this._storeSettings();
    }
    getAndSubscribe(callback) {
      this._subscribers.push(callback);
      callback(this._settings);
    }
    _loadSettings() {
      try {
        const json = localStorage.getItem(SETTINGS_KEY);
        if (json) {
          const settings = JSON.parse(json);
          this._settings = { ...this._settings, ...settings };
        }
        this._loadSettingsLegacy();
      } catch (error) {
        console.error(`Failed to load settings: ${error}`);
      }
    }
    _storeSettings() {
      try {
        this._storeSettingsLegacy();
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(this._settings));
      } catch (error) {
        console.error(`Failed to persist settings: ${error}`);
      }
    }
    _loadSettingsLegacy() {
      const tooltipsDisabled = localStorage.getItem("tooltipsDisabled");
      if (tooltipsDisabled !== null) {
        this._settings = { ...this._settings, tooltips: false };
      }
      const nightMode = localStorage.getItem("night-mode");
      if (nightMode === "true") {
        this._settings = { ...this._settings, nightMode: true };
      }
      if (this._settings.nightMode === true) {
        this._settings = { ...this._settings, theme: "dark" };
      }
    }
    _storeSettingsLegacy() {
      if (this._settings.tooltips) {
        localStorage.removeItem("tooltipsDisabled");
      } else {
        localStorage.setItem("tooltipsDisabled", "true");
      }
      if (this._settings.nightMode !== null) {
        localStorage.setItem("night-mode", this._settings.nightMode === true ? "true" : "false");
      } else {
        localStorage.removeItem("night-mode");
      }
      if (this._settings.theme !== null) {
        localStorage.setItem("night-mode", this._settings.theme === "dark" ? "true" : "false");
        this._settings.nightMode = this._settings.theme === "dark";
      } else {
        delete this._settings.nightMode;
        localStorage.removeItem("night-mode");
      }
    }
  };
  var settingsStore = new SettingsStore();

  // js/content.js
  var CONTENT_SELECTOR = ".content";
  var CONTENT_INNER_SELECTOR = ".content-inner";
  var LIVEBOOK_BADGE_ANCHOR_SELECTOR = ".livebook-badge";
  function initialize() {
    fixLinks();
    fixSpacebar();
    setLivebookBadgeUrl();
    fixBlockquotes();
  }
  function fixLinks() {
    qs(CONTENT_SELECTOR).querySelectorAll("a").forEach((anchor) => {
      if (anchor.querySelector("code, img")) {
        anchor.classList.add("no-underline");
      }
    });
  }
  function fixBlockquotes() {
    const classes = ["warning", "info", "error", "neutral", "tip"];
    classes.forEach((element) => {
      qsAll(`blockquote h3.${element}, blockquote h4.${element}`).forEach((header) => {
        header.closest("blockquote").classList.add(element);
      });
    });
  }
  function fixSpacebar() {
    qs(CONTENT_INNER_SELECTOR).setAttribute("tabindex", -1);
    qs(CONTENT_INNER_SELECTOR).focus();
  }
  function setLivebookBadgeUrl() {
    const path = window.location.pathname;
    const notebookPath = path.replace(/\.html$/, ".livemd");
    const notebookUrl = new URL(notebookPath, window.location.href).toString();
    settingsStore.getAndSubscribe((settings) => {
      const targetUrl = settings.livebookUrl ? getLivebookImportUrl(settings.livebookUrl, notebookUrl) : getLivebookDevRunUrl(notebookUrl);
      for (const anchor of qsAll(LIVEBOOK_BADGE_ANCHOR_SELECTOR)) {
        anchor.href = targetUrl;
      }
    });
  }
  function getLivebookDevRunUrl(notebookUrl) {
    return `https://livebook.dev/run?url=${encodeURIComponent(notebookUrl)}`;
  }
  function getLivebookImportUrl(livebookUrl, notebookUrl) {
    return `${livebookUrl}/import?url=${encodeURIComponent(notebookUrl)}`;
  }

  // js/sidebar/sidebar-drawer.js
  var import_lodash = __toESM(require_lodash());
  var BREAKPOINT = 768;
  var ANIMATION_DURATION = 300;
  var SIDEBAR_TOGGLE_SELECTOR = ".sidebar-toggle";
  var CONTENT_SELECTOR2 = ".content";
  var userPref = {
    CLOSED: "closed",
    OPEN: "open",
    NO_PREF: "no_pref"
  };
  var SIDEBAR_CLASS = {
    opened: "sidebar-opened",
    opening: "sidebar-opening",
    closed: "sidebar-closed",
    closing: "sidebar-closing"
  };
  var SIDEBAR_CLASSES = Object.values(SIDEBAR_CLASS);
  var state = {
    togglingTimeout: null,
    lastWindowWidth: window.innerWidth,
    sidebarPreference: userPref.NO_PREF
  };
  function initialize2() {
    setDefaultSidebarState();
    addEventListeners();
  }
  function setDefaultSidebarState() {
    setClass(isScreenSmall() ? SIDEBAR_CLASS.closed : SIDEBAR_CLASS.opened);
  }
  function isScreenSmall() {
    return window.matchMedia(`screen and (max-width: ${BREAKPOINT}px)`).matches;
  }
  function setClass(...classes) {
    document.body.classList.remove(...SIDEBAR_CLASSES);
    document.body.classList.add(...classes);
  }
  function addEventListeners() {
    qs(SIDEBAR_TOGGLE_SELECTOR).addEventListener("click", (event) => {
      toggleSidebar();
      setPreference();
    });
    qs(CONTENT_SELECTOR2).addEventListener("click", (event) => {
      closeSidebarIfSmallScreen();
    });
    window.addEventListener("resize", (0, import_lodash.default)((event) => {
      adoptSidebarToWindowSize();
    }, 100));
  }
  function toggleSidebar() {
    if (isSidebarOpen()) {
      return closeSidebar();
    } else {
      return openSidebar();
    }
  }
  function isSidebarOpen() {
    return document.body.classList.contains(SIDEBAR_CLASS.opened) || document.body.classList.contains(SIDEBAR_CLASS.opening);
  }
  function openSidebar() {
    clearTimeoutIfAny();
    setClass(SIDEBAR_CLASS.opening);
    return new Promise((resolve, reject) => {
      state.togglingTimeout = setTimeout(() => {
        setClass(SIDEBAR_CLASS.opened);
        resolve();
      }, ANIMATION_DURATION);
    });
  }
  function closeSidebar() {
    clearTimeoutIfAny();
    setClass(SIDEBAR_CLASS.closing);
    return new Promise((resolve, reject) => {
      state.togglingTimeout = setTimeout(() => {
        setClass(SIDEBAR_CLASS.closed);
        resolve();
      }, ANIMATION_DURATION);
    });
  }
  function clearTimeoutIfAny() {
    if (state.togglingTimeout) {
      clearTimeout(state.togglingTimeout);
      state.togglingTimeout = null;
    }
  }
  function adoptSidebarToWindowSize() {
    if (state.lastWindowWidth !== window.innerWidth) {
      state.lastWindowWidth = window.innerWidth;
      if (state.sidebarPreference === userPref.OPEN || state.sidebarPreference === userPref.NO_PREF) {
        setDefaultSidebarState();
      }
    }
  }
  function closeSidebarIfSmallScreen() {
    const sidebarCoversContent = isScreenSmall();
    if (sidebarCoversContent && isSidebarOpen()) {
      closeSidebar();
    }
  }
  function setPreference() {
    switch (state.sidebarPreference) {
      case userPref.OPEN:
        state.sidebarPreference = userPref.CLOSED;
        break;
      case userPref.CLOSED:
        state.sidebarPreference = userPref.OPEN;
        break;
      case userPref.NO_PREF:
        isSidebarOpen() ? state.sidebarPreference = userPref.OPEN : state.sidebarPreference = userPref.CLOSED;
    }
  }

  // js/handlebars/templates/sidebar-items.handlebars
  var Handlebars = __toESM(require_handlebars_runtime());
  Handlebars.registerHelper({});
  var sidebar_items_default = Handlebars.template({ "1": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, alias1 = depth0 != null ? depth0 : container.nullContext || {}, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return ((stack1 = lookupProperty(helpers, "groupChanged").call(alias1, depths[1], (stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "group") : stack1, { "name": "groupChanged", "hash": {}, "fn": container.program(2, data, 0, blockParams, depths), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 2, "column": 2 }, "end": { "line": 6, "column": 19 } } })) != null ? stack1 : "") + "\n" + ((stack1 = lookupProperty(helpers, "nestingChanged").call(alias1, depths[1], blockParams[0][0], { "name": "nestingChanged", "hash": {}, "fn": container.program(7, data, 0, blockParams, depths), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 8, "column": 2 }, "end": { "line": 10, "column": 21 } } })) != null ? stack1 : "") + '\n  <li class="' + ((stack1 = lookupProperty(helpers, "isLocal").call(alias1, (stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "id") : stack1, { "name": "isLocal", "hash": {}, "fn": container.program(9, data, 0, blockParams, depths), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 12, "column": 13 }, "end": { "line": 12, "column": 62 } } })) != null ? stack1 : "") + '">\n    <a href="' + container.escapeExpression(container.lambda((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "id") : stack1, depth0)) + ".html" + ((stack1 = lookupProperty(helpers, "isLocal").call(alias1, (stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "id") : stack1, { "name": "isLocal", "hash": {}, "fn": container.program(11, data, 0, blockParams, depths), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 13, "column": 29 }, "end": { "line": 13, "column": 69 } } })) != null ? stack1 : "") + '" class="expand" ' + ((stack1 = lookupProperty(helpers, "isArray").call(alias1, (stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "headers") : stack1, { "name": "isArray", "hash": {}, "fn": container.program(3, data, 0, blockParams, depths), "inverse": container.program(5, data, 0, blockParams, depths), "data": data, "blockParams": blockParams, "loc": { "start": { "line": 13, "column": 86 }, "end": { "line": 13, "column": 145 } } })) != null ? stack1 : "") + ">\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, (stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "nested_title") : stack1, { "name": "if", "hash": {}, "fn": container.program(13, data, 0, blockParams, depths), "inverse": container.program(15, data, 0, blockParams, depths), "data": data, "blockParams": blockParams, "loc": { "start": { "line": 14, "column": 6 }, "end": { "line": 18, "column": 13 } } })) != null ? stack1 : "") + '      <span class="icon-expand"></span>\n    </a>\n\n    <ul>\n' + ((stack1 = lookupProperty(helpers, "isArray").call(alias1, (stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "headers") : stack1, { "name": "isArray", "hash": {}, "fn": container.program(17, data, 0, blockParams, depths), "inverse": container.program(20, data, 0, blockParams, depths), "data": data, "blockParams": blockParams, "loc": { "start": { "line": 23, "column": 6 }, "end": { "line": 65, "column": 18 } } })) != null ? stack1 : "") + "      </ul>\n  </li>\n";
  }, "2": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '    <li class="group" ' + ((stack1 = lookupProperty(helpers, "isArray").call(depth0 != null ? depth0 : container.nullContext || {}, (stack1 = blockParams[1][0]) != null ? lookupProperty(stack1, "headers") : stack1, { "name": "isArray", "hash": {}, "fn": container.program(3, data, 0, blockParams), "inverse": container.program(5, data, 0, blockParams), "data": data, "blockParams": blockParams, "loc": { "start": { "line": 3, "column": 22 }, "end": { "line": 3, "column": 81 } } })) != null ? stack1 : "") + ">\n      " + container.escapeExpression(container.lambda((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1, "group") : stack1, depth0)) + "\n    </li>\n";
  }, "3": function(container, depth0, helpers, partials, data) {
    return "";
  }, "5": function(container, depth0, helpers, partials, data) {
    return 'translate="no"';
  }, "7": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '    <li class="nesting-context" aria-hidden="true" translate="no">' + container.escapeExpression(container.lambda((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1, "nested_context") : stack1, depth0)) + "</li>\n";
  }, "9": function(container, depth0, helpers, partials, data) {
    return "current-page open";
  }, "11": function(container, depth0, helpers, partials, data) {
    return "#content";
  }, "13": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return "        " + ((stack1 = container.lambda((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1, "nested_title") : stack1, depth0)) != null ? stack1 : "") + "\n";
  }, "15": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return "        " + ((stack1 = container.lambda((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1, "title") : stack1, depth0)) != null ? stack1 : "") + "\n";
  }, "17": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return (stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, (stack1 = blockParams[1][0]) != null ? lookupProperty(stack1, "headers") : stack1, { "name": "each", "hash": {}, "fn": container.program(18, data, 0, blockParams), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 24, "column": 8 }, "end": { "line": 28, "column": 17 } } })) != null ? stack1 : "";
  }, "18": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, alias1 = container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '          <li>\n            <a href="' + container.escapeExpression(alias1((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1, "id") : stack1, depth0)) + ".html#" + ((stack1 = alias1(depth0 != null ? lookupProperty(depth0, "anchor") : depth0, depth0)) != null ? stack1 : "") + '">' + ((stack1 = alias1(depth0 != null ? lookupProperty(depth0, "id") : depth0, depth0)) != null ? stack1 : "") + "</a>\n          </li>\n";
  }, "20": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, alias1 = depth0 != null ? depth0 : container.nullContext || {}, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return ((stack1 = lookupProperty(helpers, "showSections").call(alias1, blockParams[1][0], { "name": "showSections", "hash": {}, "fn": container.program(21, data, 0, blockParams), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 30, "column": 8 }, "end": { "line": 44, "column": 25 } } })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "showSummary").call(alias1, blockParams[1][0], { "name": "showSummary", "hash": {}, "fn": container.program(26, data, 0, blockParams), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 45, "column": 8 }, "end": { "line": 49, "column": 24 } } })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "each").call(alias1, (stack1 = blockParams[1][0]) != null ? lookupProperty(stack1, "nodeGroups") : stack1, { "name": "each", "hash": {}, "fn": container.program(28, data, 1, blockParams), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 50, "column": 8 }, "end": { "line": 64, "column": 17 } } })) != null ? stack1 : "");
  }, "21": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, alias1 = depth0 != null ? depth0 : container.nullContext || {}, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '          <li class="docs ' + ((stack1 = lookupProperty(helpers, "isLocal").call(alias1, (stack1 = blockParams[2][0]) != null ? lookupProperty(stack1, "id") : stack1, { "name": "isLocal", "hash": {}, "fn": container.program(22, data, 0, blockParams), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 31, "column": 26 }, "end": { "line": 31, "column": 62 } } })) != null ? stack1 : "") + '">\n            <a href="' + container.escapeExpression(container.lambda((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1, "id") : stack1, depth0)) + '.html#content" class="expand">\n              Sections\n              <span class="icon-expand"></span>\n            </a>\n            <ul class="sections-list deflist">\n' + ((stack1 = lookupProperty(helpers, "each").call(alias1, depth0 != null ? lookupProperty(depth0, "sections") : depth0, { "name": "each", "hash": {}, "fn": container.program(24, data, 0, blockParams), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 37, "column": 14 }, "end": { "line": 41, "column": 23 } } })) != null ? stack1 : "") + "            </ul>\n          </li>\n";
  }, "22": function(container, depth0, helpers, partials, data) {
    return "open";
  }, "24": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '                <li>\n                  <a href="' + alias2(alias1((stack1 = blockParams[3][0]) != null ? lookupProperty(stack1, "id") : stack1, depth0)) + ".html#" + alias2(alias1(depth0 != null ? lookupProperty(depth0, "anchor") : depth0, depth0)) + '">' + ((stack1 = alias1(depth0 != null ? lookupProperty(depth0, "id") : depth0, depth0)) != null ? stack1 : "") + "</a>\n                </li>\n";
  }, "26": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '          <li>\n            <a href="' + container.escapeExpression(container.lambda((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1, "id") : stack1, depth0)) + '.html#summary" class="summary">Summary</a>\n          </li>\n';
  }, "28": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '          <li class="docs">\n            <a href="' + alias2(alias1((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1, "id") : stack1, depth0)) + ".html#" + alias2(alias1((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "key") : stack1, depth0)) + '" class="expand">\n              ' + alias2(alias1((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "name") : stack1, depth0)) + '\n              <span class="icon-expand"></span>\n            </a>\n            <ul class="' + alias2(alias1((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "key") : stack1, depth0)) + '-list deflist">\n' + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, (stack1 = blockParams[0][0]) != null ? lookupProperty(stack1, "nodes") : stack1, { "name": "each", "hash": {}, "fn": container.program(29, data, 0, blockParams), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 57, "column": 14 }, "end": { "line": 61, "column": 23 } } })) != null ? stack1 : "") + "            </ul>\n          </li>\n";
  }, "29": function(container, depth0, helpers, partials, data, blockParams) {
    var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '                <li>\n                  <a href="' + alias2(alias1((stack1 = blockParams[3][0]) != null ? lookupProperty(stack1, "id") : stack1, depth0)) + ".html#" + alias2(alias1(depth0 != null ? lookupProperty(depth0, "anchor") : depth0, depth0)) + '" translate="no">' + alias2(alias1(depth0 != null ? lookupProperty(depth0, "id") : depth0, depth0)) + "</a>\n                </li>\n";
  }, "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return (stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "nodes") : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 2, blockParams, depths), "inverse": container.noop, "data": data, "blockParams": blockParams, "loc": { "start": { "line": 1, "column": 0 }, "end": { "line": 68, "column": 9 } } })) != null ? stack1 : "";
  }, "useData": true, "useDepths": true, "useBlockParams": true });

  // js/globals.js
  function getSidebarNodes() {
    return window.sidebarNodes || {};
  }
  function getVersionNodes() {
    return window.versionNodes || [];
  }

  // js/sidebar/sidebar-list.js
  var SIDEBAR_TYPE = {
    search: "search",
    extras: "extras",
    modules: "modules",
    tasks: "tasks"
  };
  var SIDEBAR_NAV_TYPES = [SIDEBAR_TYPE.extras, SIDEBAR_TYPE.modules, SIDEBAR_TYPE.tasks];
  var SIDEBAR_NODE_LIST_SELECTOR = "#full-list";
  function initialize3() {
    renderSidebarNodeList(getSidebarNodes(), getCurrentPageSidebarType());
    markCurrentHashInSidebar();
    scrollNodeListToCurrentCategory();
    addEventListeners2();
  }
  function renderSidebarNodeList(nodesByType, type) {
    const nodes = nodesByType[type] || [];
    const nodeList = qs(SIDEBAR_NODE_LIST_SELECTOR);
    const listContentHtml = sidebar_items_default({ nodes, group: "" });
    nodeList.innerHTML = listContentHtml;
    highlightNavigationLink(type);
    nodeList.querySelectorAll("ul").forEach((list) => {
      if (list.innerHTML.trim() === "") {
        const emptyExpand = list.previousElementSibling;
        if (emptyExpand.classList.contains("expand")) {
          emptyExpand.classList.remove("expand");
        }
      }
    });
    nodeList.querySelectorAll("li a").forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const target = event.target;
        const listItem = target.closest("li");
        const previousSection = nodeList.querySelector(".current-section");
        if (target.matches(".icon-expand")) {
          event.preventDefault();
          listItem.classList.toggle("open");
          return;
        }
        if (previousSection) {
          previousSection.classList.remove("current-section");
        }
        if (anchor.matches(".expand") && anchor.pathname === window.location.pathname) {
          listItem.classList.add("open");
        }
      });
    });
  }
  function highlightNavigationLink(activeType) {
    SIDEBAR_NAV_TYPES.forEach((type) => {
      const anchor = qs(`#${type}-list-link`);
      if (anchor) {
        anchor.parentElement.classList.toggle("selected", type === activeType);
      }
    });
  }
  function scrollNodeListToCurrentCategory() {
    const nodeList = qs(SIDEBAR_NODE_LIST_SELECTOR);
    const currentPage = nodeList.querySelector("li.current-page");
    if (currentPage) {
      currentPage.scrollIntoView();
      nodeList.scrollTop -= 40;
    }
  }
  function markCurrentHashInSidebar() {
    const hash = getLocationHash() || "content";
    const sidebarNodes = getSidebarNodes();
    const nodes = sidebarNodes[getCurrentPageSidebarType()] || [];
    const category = findSidebarCategory(nodes, hash);
    const nodeList = qs(SIDEBAR_NODE_LIST_SELECTOR);
    const categoryEl = nodeList.querySelector(`li.current-page a.expand[href$="#${category}"]`);
    if (categoryEl) {
      categoryEl.closest("li").classList.add("open");
    }
    const hashEl = nodeList.querySelector(`li.current-page a[href$="#${hash}"]`);
    if (hashEl) {
      const deflist = hashEl.closest("ul");
      if (deflist.classList.contains("deflist")) {
        deflist.closest("li").classList.add("current-section");
      }
      hashEl.closest("li").classList.add("current-hash");
    }
  }
  function addEventListeners2() {
    SIDEBAR_NAV_TYPES.forEach((type) => {
      const anchor = qs(`#${type}-list-link`);
      if (anchor) {
        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          renderSidebarNodeList(getSidebarNodes(), type);
          scrollNodeListToCurrentCategory();
        });
      }
    });
    window.addEventListener("hashchange", (event) => {
      const nodeList = qs(SIDEBAR_NODE_LIST_SELECTOR);
      const currentListItem = nodeList.querySelector("li.current-page li.current-hash");
      if (currentListItem) {
        currentListItem.classList.remove("current-hash");
      }
      markCurrentHashInSidebar();
    });
  }

  // js/handlebars/templates/autocomplete-suggestions.handlebars
  var Handlebars2 = __toESM(require_handlebars_runtime());
  Handlebars2.registerHelper({});
  var autocomplete_suggestions_default = Handlebars2.template({ "1": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, alias3 = depth0 != null ? depth0 : container.nullContext || {}, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '    <a href="' + alias2(alias1(depth0 != null ? lookupProperty(depth0, "link") : depth0, depth0)) + '" class="autocomplete-suggestion" data-index="' + alias2(alias1(data && lookupProperty(data, "index"), depth0)) + '" tabindex="-1">\n      <div class="title">\n        <span translate="no">' + ((stack1 = alias1(depth0 != null ? lookupProperty(depth0, "title") : depth0, depth0)) != null ? stack1 : "") + "</span>\n" + ((stack1 = lookupProperty(helpers, "if").call(alias3, depth0 != null ? lookupProperty(depth0, "label") : depth0, { "name": "if", "hash": {}, "fn": container.program(2, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 10, "column": 8 }, "end": { "line": 12, "column": 15 } } })) != null ? stack1 : "") + "      </div>\n\n" + ((stack1 = lookupProperty(helpers, "if").call(alias3, depth0 != null ? lookupProperty(depth0, "description") : depth0, { "name": "if", "hash": {}, "fn": container.program(4, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 15, "column": 6 }, "end": { "line": 19, "column": 13 } } })) != null ? stack1 : "") + "    </a>\n";
  }, "2": function(container, depth0, helpers, partials, data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '          <span class="label">(' + container.escapeExpression(container.lambda(depth0 != null ? lookupProperty(depth0, "label") : depth0, depth0)) + ")</span>\n";
  }, "4": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '        <div class="description" translate="no">\n          ' + ((stack1 = container.lambda(depth0 != null ? lookupProperty(depth0, "description") : depth0, depth0)) != null ? stack1 : "") + "\n        </div>\n";
  }, "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '<div class="autocomplete-suggestions">\n  <a class="autocomplete-suggestion" href="search.html?q=' + alias2(alias1(depth0 != null ? lookupProperty(depth0, "term") : depth0, depth0)) + '" data-index="-1" tabindex="-1">\n    <div class="title">"<em>' + alias2(alias1(depth0 != null ? lookupProperty(depth0, "term") : depth0, depth0)) + '</em>"</div>\n    <div class="description">Search the documentation</div>\n  </a>\n' + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "suggestions") : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 6, "column": 2 }, "end": { "line": 21, "column": 11 } } })) != null ? stack1 : "") + "</div>\n";
  }, "useData": true });

  // js/autocomplete/suggestions.js
  var SUGGESTION_CATEGORY = {
    module: "module",
    moduleChild: "module-child",
    mixTask: "mix-task",
    extra: "extra"
  };
  function getSuggestions(query, limit = 5) {
    if (isBlank(query)) {
      return [];
    }
    const nodes = getSidebarNodes();
    const suggestions = [
      ...findSuggestionsInTopLevelNodes(nodes.modules, query, SUGGESTION_CATEGORY.module),
      ...findSuggestionsInChildNodes(nodes.modules, query, SUGGESTION_CATEGORY.moduleChild),
      ...findSuggestionsInTopLevelNodes(nodes.tasks, query, SUGGESTION_CATEGORY.mixTask),
      ...findSuggestionsInTopLevelNodes(nodes.extras, query, SUGGESTION_CATEGORY.extra)
    ];
    return sort(suggestions).slice(0, limit);
  }
  function findSuggestionsInTopLevelNodes(nodes, query, category) {
    return nodes.map((node) => nodeSuggestion(node, query, category)).filter((suggestion) => suggestion !== null);
  }
  function findSuggestionsInChildNodes(nodes, query, category) {
    return nodes.filter((node) => node.nodeGroups).flatMap((node) => {
      return node.nodeGroups.flatMap(({ key, nodes: childNodes }) => {
        const label = nodeGroupKeyToLabel(key);
        return childNodes.map((childNode) => childNodeSuggestion(childNode, node.id, query, category, label) || moduleChildNodeSuggestion(childNode, node.id, query, category, label));
      });
    }).filter((suggestion) => suggestion !== null);
  }
  function nodeSuggestion(node, query, category) {
    if (!matchesAll(node.title, query)) {
      return null;
    }
    return {
      link: `${node.id}.html`,
      title: highlightMatches(node.title, query),
      label: null,
      description: null,
      matchQuality: matchQuality(node.title, query),
      category
    };
  }
  function childNodeSuggestion(childNode, parentId, query, category, label) {
    if (!matchesAll(childNode.id, query)) {
      return null;
    }
    return {
      link: `${parentId}.html#${childNode.anchor}`,
      title: highlightMatches(childNode.id, query),
      label,
      description: parentId,
      matchQuality: matchQuality(childNode.id, query),
      category
    };
  }
  function moduleChildNodeSuggestion(childNode, parentId, query, category, label) {
    const modFun = `${parentId}.${childNode.id}`;
    if (!matchesAll(modFun, query)) {
      return null;
    }
    const tokenizedQuery = query.replace(/\./g, " ");
    if (!matchesAny(childNode.id, tokenizedQuery))
      return null;
    return {
      link: `${parentId}.html#${childNode.anchor}`,
      title: highlightMatches(childNode.id, tokenizedQuery),
      label,
      description: parentId,
      matchQuality: matchQuality(modFun, query),
      category
    };
  }
  function nodeGroupKeyToLabel(key) {
    switch (key) {
      case "callbacks":
        return "callback";
      case "types":
        return "type";
      default:
        return null;
    }
  }
  function sort(suggestions) {
    return suggestions.slice().sort((suggestion1, suggestion2) => {
      if (suggestion1.matchQuality !== suggestion2.matchQuality) {
        return suggestion2.matchQuality - suggestion1.matchQuality;
      } else {
        return categoryPriority(suggestion1.category) - categoryPriority(suggestion2.category);
      }
    });
  }
  function categoryPriority(category) {
    switch (category) {
      case SUGGESTION_CATEGORY.module:
        return 1;
      case SUGGESTION_CATEGORY.moduleChild:
        return 2;
      case SUGGESTION_CATEGORY.mixTask:
        return 3;
      default:
        return 4;
    }
  }
  function matchesAny(text, query) {
    const terms = tokenize(query);
    return terms.some((term) => includes(text, term));
  }
  function matchesAll(text, query) {
    const terms = tokenize(query);
    return terms.every((term) => includes(text, term));
  }
  function includes(text, subtext) {
    return text.toLowerCase().includes(subtext.toLowerCase());
  }
  function matchQuality(text, query) {
    const terms = tokenize(query);
    const termsLength = terms.map((term) => term.length).reduce((x, y) => x + y, 0);
    const quality = termsLength / text.length;
    const bonus = startsWith(text, terms[0]) ? 1 : 0;
    return quality + bonus;
  }
  function startsWith(text, subtext) {
    return text.toLowerCase().startsWith(subtext.toLowerCase());
  }
  function tokenize(query) {
    return query.trim().split(/\s+/);
  }
  function highlightMatches(text, query) {
    const terms = tokenize(query).sort((term1, term2) => term2.length - term1.length);
    return highlightTerms(text, terms);
  }
  function highlightTerms(text, terms) {
    if (terms.length === 0)
      return text;
    const [firstTerm, ...otherTerms] = terms;
    const match = text.match(new RegExp(`(.*)(${escapeRegexModifiers(firstTerm)})(.*)`, "i"));
    if (match) {
      const [, before, matching, after] = match;
      return highlightTerms(before, terms) + "<em>" + escapeHtmlEntities(matching) + "</em>" + highlightTerms(after, terms);
    } else {
      return highlightTerms(text, otherTerms);
    }
  }

  // js/autocomplete/autocomplete-list.js
  var AUTOCOMPLETE_CONTAINER_SELECTOR = ".autocomplete";
  var AUTOCOMPLETE_SUGGESTION_SELECTOR = ".autocomplete-suggestion";
  var state2 = {
    autocompleteSuggestions: [],
    selectedIdx: -1
  };
  function showAutocompleteList() {
    qs(AUTOCOMPLETE_CONTAINER_SELECTOR).classList.add("shown");
  }
  function hideAutocompleteList() {
    qs(AUTOCOMPLETE_CONTAINER_SELECTOR).classList.remove("shown");
  }
  function isAutocompleteListOpen() {
    return qs(AUTOCOMPLETE_CONTAINER_SELECTOR).classList.contains("shown");
  }
  function updateAutocompleteList(searchTerm) {
    state2.autocompleteSuggestions = getSuggestions(searchTerm);
    state2.selectedIdx = -1;
    if (!isBlank(searchTerm)) {
      renderSuggestions({ term: searchTerm, suggestions: state2.autocompleteSuggestions });
      moveAutocompleteSelection(0);
      showAutocompleteList();
    } else {
      hideAutocompleteList();
    }
  }
  function renderSuggestions({ term, suggestions }) {
    const autocompleteContainerHtml = autocomplete_suggestions_default({ suggestions, term });
    const autocompleteContainer = qs(AUTOCOMPLETE_CONTAINER_SELECTOR);
    autocompleteContainer.innerHTML = autocompleteContainerHtml;
  }
  function selectedAutocompleteSuggestion() {
    if (state2.selectedIdx === -1)
      return null;
    return state2.autocompleteSuggestions[state2.selectedIdx];
  }
  function moveAutocompleteSelection(offset) {
    state2.selectedIdx = newAutocompleteIndex(offset);
    const selectedElement = qs(`${AUTOCOMPLETE_SUGGESTION_SELECTOR}.selected`);
    const elementToSelect = qs(`${AUTOCOMPLETE_SUGGESTION_SELECTOR}[data-index="${state2.selectedIdx}"]`);
    if (selectedElement) {
      selectedElement.classList.remove("selected");
    }
    if (elementToSelect) {
      elementToSelect.classList.add("selected");
    }
  }
  function newAutocompleteIndex(offset) {
    const length = state2.autocompleteSuggestions.length + 1;
    const index = state2.selectedIdx + offset;
    return (index + 1 + length) % length - 1;
  }

  // js/sidebar/sidebar-search.js
  var SEARCH_INPUT_SELECTOR = "form.sidebar-search input";
  var SEARCH_CLOSE_BUTTON_SELECTOR = "form.sidebar-search .search-close-button";
  function initialize4() {
    addEventListeners3();
  }
  function setSearchInputValue(value) {
    const searchInput = qs(SEARCH_INPUT_SELECTOR);
    searchInput.value = value;
  }
  function focusSearchInput() {
    const searchInput = qs(SEARCH_INPUT_SELECTOR);
    searchInput.focus();
  }
  function addEventListeners3() {
    const searchInput = qs(SEARCH_INPUT_SELECTOR);
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        clearSearch();
        searchInput.blur();
      } else if (event.key === "Enter") {
        handleAutocompleteFormSubmission(event);
      } else if (event.key === "ArrowUp") {
        moveAutocompleteSelection(-1);
        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        moveAutocompleteSelection(1);
        event.preventDefault();
      }
    });
    searchInput.addEventListener("input", (event) => {
      updateAutocompleteList(event.target.value);
    });
    searchInput.addEventListener("focus", (event) => {
      document.body.classList.add("search-focused");
      updateAutocompleteList(event.target.value);
    });
    searchInput.addEventListener("blur", (event) => {
      const relatedTarget = event.relatedTarget;
      if (relatedTarget) {
        if (relatedTarget.matches(AUTOCOMPLETE_SUGGESTION_SELECTOR)) {
          setTimeout(() => {
            if (isAutocompleteListOpen()) {
              searchInput.focus();
            }
          }, 1e3);
          return null;
        }
        if (relatedTarget.matches(SEARCH_CLOSE_BUTTON_SELECTOR)) {
          clearSearch();
        }
      }
      hideAutocomplete();
    });
    qs(AUTOCOMPLETE_CONTAINER_SELECTOR).addEventListener("click", (event) => {
      const newWindowKeyDown = event.shiftKey || event.ctrlKey;
      if (newWindowKeyDown) {
        searchInput.focus();
      } else {
        clearSearch();
        hideAutocomplete();
      }
    });
  }
  function handleAutocompleteFormSubmission(event) {
    const searchInput = qs(SEARCH_INPUT_SELECTOR);
    const newWindowKeyDown = event.shiftKey || event.ctrlKey;
    const autocompleteSuggestion = selectedAutocompleteSuggestion();
    event.preventDefault();
    const target = newWindowKeyDown ? "_blank" : "_self";
    const anchor = document.createElement("a");
    anchor.setAttribute("target", target);
    if (autocompleteSuggestion) {
      anchor.setAttribute("href", autocompleteSuggestion.link);
    } else {
      anchor.setAttribute("href", `search.html?q=${encodeURIComponent(searchInput.value)}`);
    }
    anchor.click();
    if (!newWindowKeyDown) {
      clearSearch();
      hideAutocomplete();
    }
  }
  function clearSearch() {
    const input = qs(SEARCH_INPUT_SELECTOR);
    input.value = "";
  }
  function hideAutocomplete() {
    document.body.classList.remove("search-focused");
    hideAutocompleteList();
  }

  // js/handlebars/templates/versions-dropdown.handlebars
  var Handlebars3 = __toESM(require_handlebars_runtime());
  Handlebars3.registerHelper({});
  var versions_dropdown_default = Handlebars3.template({ "1": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '      <option translate="no" value="' + alias2(alias1(depth0 != null ? lookupProperty(depth0, "url") : depth0, depth0)) + '"' + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "isCurrentVersion") : depth0, { "name": "if", "hash": {}, "fn": container.program(2, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 4, "column": 44 }, "end": { "line": 4, "column": 93 } } })) != null ? stack1 : "") + ">\n        " + alias2(alias1(depth0 != null ? lookupProperty(depth0, "version") : depth0, depth0)) + "\n      </option>\n";
  }, "2": function(container, depth0, helpers, partials, data) {
    return " selected disabled";
  }, "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '<form autocomplete="off">\n  <select class="sidebar-projectVersionsDropdown">\n' + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "nodes") : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 3, "column": 4 }, "end": { "line": 7, "column": 13 } } })) != null ? stack1 : "") + "  </select>\n</form>\n";
  }, "useData": true });

  // js/sidebar/sidebar-version-select.js
  var VERSIONS_CONTAINER_SELECTOR = ".sidebar-projectVersion";
  var VERSIONS_DROPDOWN_SELECTOR = ".sidebar-projectVersionsDropdown";
  function initialize5() {
    const versionNodes = getVersionNodes();
    if (versionNodes.length > 0) {
      const versionsContainer = qs(VERSIONS_CONTAINER_SELECTOR);
      const currentVersion = versionsContainer.textContent.trim();
      const nodes = decorateVersionNodes(versionNodes, currentVersion);
      renderVersionsDropdown({ nodes });
    }
  }
  function renderVersionsDropdown({ nodes }) {
    const versionsContainer = qs(VERSIONS_CONTAINER_SELECTOR);
    const versionsDropdownHtml = versions_dropdown_default({ nodes });
    versionsContainer.innerHTML = versionsDropdownHtml;
    qs(VERSIONS_DROPDOWN_SELECTOR).addEventListener("change", handleVersionSelected);
  }
  function decorateVersionNodes(nodes, currentVersion) {
    const withCurrentVersion = ensureCurrentVersionNode(nodes, currentVersion);
    return withCurrentVersion.map((node) => ({
      ...node,
      isCurrentVersion: node.version === currentVersion
    }));
  }
  function ensureCurrentVersionNode(nodes, currentVersion) {
    const currentVersionPresent = nodes.some((node) => node.version === currentVersion);
    if (currentVersionPresent) {
      return nodes;
    } else {
      const currentVersionNode = { version: currentVersion, url: "#" };
      return [currentVersionNode, ...nodes];
    }
  }
  function handleVersionSelected(event) {
    const url = event.target.value;
    const pathSuffix = window.location.pathname.split("/").pop() + window.location.hash;
    const otherVersionWithPath = `${url}/${pathSuffix}`;
    checkUrlExists(otherVersionWithPath).then((exists) => {
      if (exists) {
        window.location.href = otherVersionWithPath;
      } else {
        window.location.href = url;
      }
    });
  }

  // js/search-page.js
  var import_lunr = __toESM(require_lunr());

  // js/handlebars/templates/search-results.handlebars
  var Handlebars4 = __toESM(require_handlebars_runtime());

  // js/handlebars/template-helpers/isNonEmptyArray.js
  function isNonEmptyArray_default(entry, options) {
    if (Array.isArray(entry) && entry.length > 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

  // js/handlebars/templates/search-results.handlebars
  Handlebars4.registerHelper({ isNonEmptyArray: isNonEmptyArray_default });
  var search_results_default = Handlebars4.template({ "1": function(container, depth0, helpers, partials, data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return "    Search results for <em>" + container.escapeExpression(container.lambda(depth0 != null ? lookupProperty(depth0, "value") : depth0, depth0)) + "</em>\n";
  }, "3": function(container, depth0, helpers, partials, data) {
    return "    Invalid search\n";
  }, "5": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return (stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "results") : depth0, { "name": "each", "hash": {}, "fn": container.program(6, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 15, "column": 2 }, "end": { "line": 26, "column": 11 } } })) != null ? stack1 : "";
  }, "6": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '    <div class="result">\n      <h2 class="result-id">\n        <a href="' + alias2(alias1(depth0 != null ? lookupProperty(depth0, "ref") : depth0, depth0)) + '">\n          <span translate="no">' + alias2(alias1(depth0 != null ? lookupProperty(depth0, "title") : depth0, depth0)) + "</span> <small>(" + alias2(alias1(depth0 != null ? lookupProperty(depth0, "type") : depth0, depth0)) + ")</small>\n        </a>\n      </h2>\n" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "excerpts") : depth0, { "name": "each", "hash": {}, "fn": container.program(7, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 22, "column": 8 }, "end": { "line": 24, "column": 17 } } })) != null ? stack1 : "") + "    </div>\n";
  }, "7": function(container, depth0, helpers, partials, data) {
    var stack1;
    return '          <p class="result-elem">' + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "") + "</p>\n";
  }, "9": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return ((stack1 = lookupProperty(helpers, "isArray").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "results") : depth0, { "name": "isArray", "hash": {}, "fn": container.program(10, data, 0), "inverse": container.program(12, data, 0), "data": data, "loc": { "start": { "line": 28, "column": 2 }, "end": { "line": 34, "column": 14 } } })) != null ? stack1 : "") + "\n  <p>The search functionality is full-text based. Here are some tips:</p>\n\n  <ul>\n    <li>Multiple words (such as <code>foo bar</code>) are searched as <code>OR</code></li>\n    <li>Use <code>*</code> anywhere (such as <code>fo*</code>) as wildcard</li>\n    <li>Use <code>+</code> before a word (such as <code>+foo</code>) to make its presence required</li>\n    <li>Use <code>-</code> before a word (such as <code>-foo</code>) to make its absence required</li>\n    <li>Use <code>:</code> to search on a particular field (such as <code>field:word</code>). The available fields are <code>title</code> and <code>doc</code></li>\n    <li>Use <code>WORD^NUMBER</code> (such as <code>foo^2</code>) to boost the given word</li>\n    <li>Use <code>WORD~NUMBER</code> (such as <code>foo~2</code>) to do a search with edit distance on word</li>\n  </ul>\n\n  <p>To quickly go to a module, type, or function, use the autocompletion feature in the sidebar search.</p>\n";
  }, "10": function(container, depth0, helpers, partials, data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return "    <p>Sorry, we couldn't find anything for <em>" + container.escapeExpression(container.lambda(depth0 != null ? lookupProperty(depth0, "value") : depth0, depth0)) + "</em>.</p>\n";
  }, "12": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "value") : depth0, { "name": "if", "hash": {}, "fn": container.program(13, data, 0), "inverse": container.program(15, data, 0), "data": data, "loc": { "start": { "line": 30, "column": 2 }, "end": { "line": 34, "column": 2 } } })) != null ? stack1 : "";
  }, "13": function(container, depth0, helpers, partials, data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return "    <p>Invalid search: " + container.escapeExpression(container.lambda(depth0 != null ? lookupProperty(depth0, "errorMessage") : depth0, depth0)) + ".</p>\n";
  }, "15": function(container, depth0, helpers, partials, data) {
    return "    <p>Please type something into the search bar to perform a search.</p>\n  ";
  }, "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = depth0 != null ? depth0 : container.nullContext || {}, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return "<h1>\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "value") : depth0, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.program(3, data, 0), "data": data, "loc": { "start": { "line": 2, "column": 2 }, "end": { "line": 6, "column": 9 } } })) != null ? stack1 : "") + '\n  <button class="settings display-settings">\n    <i class="ri-settings-3-line"></i>\n    <span class="sr-only">Settings</span>\n  </button>\n</h1>\n\n' + ((stack1 = lookupProperty(helpers, "isNonEmptyArray").call(alias1, depth0 != null ? lookupProperty(depth0, "results") : depth0, { "name": "isNonEmptyArray", "hash": {}, "fn": container.program(5, data, 0), "inverse": container.program(9, data, 0), "data": data, "loc": { "start": { "line": 14, "column": 0 }, "end": { "line": 49, "column": 20 } } })) != null ? stack1 : "");
  }, "useData": true });

  // js/search-page.js
  var EXCERPT_RADIUS = 80;
  var SEARCH_CONTAINER_SELECTOR = "#search";
  function initialize6() {
    if (window.location.pathname.endsWith("/search.html")) {
      const query = getQueryParamByName("q");
      search(query);
    }
  }
  function search(value) {
    if (isBlank(value)) {
      renderResults({ value });
    } else {
      setSearchInputValue(value);
      const index = getIndex();
      try {
        const results = searchResultsToDecoratedSearchNodes(index.search(value));
        renderResults({ value, results });
      } catch (error) {
        renderResults({ value, errorMessage: error.message });
      }
    }
  }
  function renderResults({ value, results, errorMessage }) {
    const searchContainer = qs(SEARCH_CONTAINER_SELECTOR);
    const resultsHtml = search_results_default({ value, results, errorMessage });
    searchContainer.innerHTML = resultsHtml;
  }
  function getIndex() {
    const cachedIndex = loadIndex();
    if (cachedIndex) {
      return cachedIndex;
    }
    const index = createIndex();
    saveIndex(index);
    return index;
  }
  function loadIndex() {
    try {
      const serializedIndex = sessionStorage.getItem(indexStorageKey());
      if (serializedIndex) {
        return import_lunr.default.Index.load(JSON.parse(serializedIndex));
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to load index: ", error);
      return null;
    }
  }
  function saveIndex(index) {
    try {
      const serializedIndex = JSON.stringify(index);
      sessionStorage.setItem(indexStorageKey(), serializedIndex);
    } catch (error) {
      console.error("Failed to save index: ", error);
    }
  }
  function indexStorageKey() {
    return `index:${getProjectNameAndVersion()}`;
  }
  function createIndex() {
    return (0, import_lunr.default)(function() {
      this.ref("ref");
      this.field("title", { boost: 3 });
      this.field("doc");
      this.metadataWhitelist = ["position"];
      this.pipeline.remove(import_lunr.default.stopWordFilter);
      this.use(elixirTokenSplitter);
      searchNodes.forEach((searchNode) => {
        this.add(searchNode);
      });
    });
  }
  function elixirTokenSplitter(builder) {
    function elixirTokenFunction(token) {
      const tokens = token.toString().split(/\.|\/|_/).map((part) => {
        return token.clone().update(() => part);
      });
      if (tokens.length > 1) {
        return [...tokens, token];
      }
      return tokens;
    }
    import_lunr.default.Pipeline.registerFunction(elixirTokenFunction, "elixirTokenSplitter");
    builder.pipeline.before(import_lunr.default.stemmer, elixirTokenFunction);
    builder.searchPipeline.before(import_lunr.default.stemmer, elixirTokenFunction);
  }
  function searchResultsToDecoratedSearchNodes(results) {
    return results.filter((result) => getSearchNodeByRef(result.ref)).map((result) => {
      const searchNode = getSearchNodeByRef(result.ref);
      const metadata = result.matchData.metadata;
      return {
        ...searchNode,
        metadata,
        excerpts: getExcerpts(searchNode, metadata)
      };
    });
  }
  function getSearchNodeByRef(ref) {
    return searchNodes.find((searchNode) => searchNode.ref === ref) || null;
  }
  function getExcerpts(searchNode, metadata) {
    const { doc } = searchNode;
    const searchTerms = Object.keys(metadata);
    const excerpts = searchTerms.filter((term) => "doc" in metadata[term]).map((term) => {
      return metadata[term].doc.position.map(([sliceStart, sliceLength]) => excerpt(doc, sliceStart, sliceLength));
    }).reduce((xs, ys) => xs.concat(ys), []);
    if (excerpts.length === 0) {
      const beginning = doc.slice(0, EXCERPT_RADIUS * 2) + (EXCERPT_RADIUS * 2 < doc.length ? "..." : "");
      return [beginning];
    }
    return excerpts.slice(0, 1);
  }
  function excerpt(doc, sliceStart, sliceLength) {
    const startPos = Math.max(sliceStart - EXCERPT_RADIUS, 0);
    const endPos = Math.min(sliceStart + sliceLength + EXCERPT_RADIUS, doc.length);
    return [
      startPos > 0 ? "..." : "",
      doc.slice(startPos, sliceStart),
      "<em>" + escapeHtmlEntities(doc.slice(sliceStart, sliceStart + sliceLength)) + "</em>",
      doc.slice(sliceStart + sliceLength, endPos),
      endPos < doc.length ? "..." : ""
    ].join("");
  }

  // js/toast.js
  var toastTimer = null;
  var toast = document.getElementById("toast");
  toast.addEventListener("click", (event) => {
    clearTimeout(toastTimer);
    event.target.classList.remove("show");
  });
  function showToast(message) {
    if (toast) {
      clearTimeout(toastTimer);
      toast.innerText = message;
      toast.classList.add("show");
      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
        toastTimer = setTimeout(function() {
          toast.innerText = "";
        }, 1e3);
      }, 5e3);
    }
  }

  // js/theme.js
  var DARK_MODE_CLASS = "dark";
  var THEMES = ["system", "dark", "light"];
  function initialize7() {
    settingsStore.getAndSubscribe((settings) => {
      document.body.classList.toggle(DARK_MODE_CLASS, shouldUseDarkMode(settings));
    });
    listenToDarkMode();
  }
  function cycleTheme() {
    const settings = settingsStore.get();
    const currentTheme = settings.theme || "system";
    const nextTheme = THEMES[THEMES.indexOf(currentTheme) + 1] || THEMES[0];
    settingsStore.update({ theme: nextTheme });
    showToast(`Set theme to "${nextTheme}"`);
  }
  function shouldUseDarkMode(settings) {
    return settings.theme === "dark" || prefersDarkColorScheme() && (settings.theme == null || settings.theme === "system");
  }
  function prefersDarkColorScheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function listenToDarkMode() {
    window.matchMedia("(prefers-color-scheme: dark)").addListener((_e) => {
      const settings = settingsStore.get();
      const isNight = shouldUseDarkMode(settings);
      if (settings.theme == null || settings.theme === "system") {
        document.body.classList.toggle(DARK_MODE_CLASS, isNight);
        showToast(`Browser changed theme to "${isNight ? "dark" : "light"}"`);
      }
    });
  }

  // js/makeup.js
  var HIGHLIGHT_CLASS = "hll";
  function initialize8() {
    initializeDelimitersHighlighting();
  }
  function initializeDelimitersHighlighting() {
    const delimiters = qsAll("[data-group-id]");
    delimiters.forEach((delimiter) => {
      const groupId = delimiter.getAttribute("data-group-id");
      delimiter.addEventListener("mouseenter", (event) => {
        toggleDelimitersHighlight(groupId, true);
      });
      delimiter.addEventListener("mouseleave", (event) => {
        toggleDelimitersHighlight(groupId, false);
      });
    });
  }
  function toggleDelimitersHighlight(groupId, force) {
    const delimiters = qsAll(`[data-group-id="${groupId}"]`);
    delimiters.forEach((delimiter) => {
      delimiter.classList.toggle(HIGHLIGHT_CLASS, force);
    });
  }

  // js/handlebars/templates/modal-layout.handlebars
  var Handlebars5 = __toESM(require_handlebars_runtime());
  Handlebars5.registerHelper({});
  var modal_layout_default = Handlebars5.template({ "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    return '<div id="modal" class="modal" tabindex="-1">\n  <div class="modal-contents">\n    <div class="modal-header">\n      <div class="modal-title"></div>\n      <button class="modal-close">\xD7</button>\n    </div>\n    <div class="modal-body">\n    </div>\n  </div>\n</div>\n';
  }, "useData": true });

  // js/modal.js
  var MODAL_SELECTOR = "#modal";
  var MODAL_CLOSE_BUTTON_SELECTOR = "#modal .modal-close";
  var MODAL_TITLE_SELECTOR = "#modal .modal-title";
  var MODAL_BODY_SELECTOR = "#modal .modal-body";
  var FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var state3 = {
    prevFocus: null,
    lastFocus: null,
    ignoreFocusChanges: false
  };
  function initialize9() {
    renderModal();
  }
  function renderModal() {
    const modalLayoutHtml = modal_layout_default();
    document.body.insertAdjacentHTML("beforeend", modalLayoutHtml);
    qs(MODAL_SELECTOR).addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
    qs(MODAL_CLOSE_BUTTON_SELECTOR).addEventListener("click", (event) => {
      closeModal();
    });
  }
  function trapFocus(event) {
    if (state3.ignoreFocusChanges)
      return;
    const modal = qs(MODAL_SELECTOR);
    if (modal.contains(event.target)) {
      state3.lastFocus = event.target;
    } else {
      state3.ignoreFocusChanges = true;
      const firstFocusable = firstFocusableDescendant(modal);
      if (state3.lastFocus === firstFocusable) {
        lastFocusableDescendant(modal).focus();
      } else {
        firstFocusable.focus();
      }
      state3.ignoreFocusChanges = false;
      state3.lastFocus = document.activeElement;
    }
  }
  function firstFocusableDescendant(element) {
    return element.querySelector(FOCUSABLE_SELECTOR);
  }
  function lastFocusableDescendant(element) {
    const elements = element.querySelectorAll(FOCUSABLE_SELECTOR);
    return elements[elements.length - 1];
  }
  function openModal({ title, body }) {
    state3.prevFocus = document.activeElement;
    document.addEventListener("focus", trapFocus, true);
    qs(MODAL_TITLE_SELECTOR).innerHTML = title;
    qs(MODAL_BODY_SELECTOR).innerHTML = body;
    qs(MODAL_SELECTOR).classList.add("shown");
    qs(MODAL_SELECTOR).focus();
  }
  function closeModal() {
    qs(MODAL_SELECTOR).classList.remove("shown");
    document.addEventListener("focus", trapFocus, true);
    state3.prevFocus && state3.prevFocus.focus();
    state3.prevFocus = null;
  }
  function isModalOpen() {
    return qs(MODAL_SELECTOR).classList.contains("shown");
  }

  // js/handlebars/templates/quick-switch-modal-body.handlebars
  var Handlebars6 = __toESM(require_handlebars_runtime());
  Handlebars6.registerHelper({});
  var quick_switch_modal_body_default = Handlebars6.template({ "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    return '<div id="quick-switch-modal-body">\n  <i class="ri-search-2-line ri-lg" aria-hidden="true"></i>\n  <input type="text" id="quick-switch-input" class="search-input" placeholder="Jump to..." autocomplete="off">\n  <div id="quick-switch-results"></div>\n</div>\n';
  }, "useData": true });

  // js/handlebars/templates/quick-switch-results.handlebars
  var Handlebars7 = __toESM(require_handlebars_runtime());
  Handlebars7.registerHelper({});
  var quick_switch_results_default = Handlebars7.template({ "1": function(container, depth0, helpers, partials, data) {
    var alias1 = container.lambda, alias2 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '  <div class="quick-switch-result" data-index="' + alias2(alias1(data && lookupProperty(data, "index"), depth0)) + '">\n    ' + alias2(alias1(depth0 != null ? lookupProperty(depth0, "name") : depth0, depth0)) + "\n  </div>\n";
  }, "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return (stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "results") : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 1, "column": 0 }, "end": { "line": 5, "column": 9 } } })) != null ? stack1 : "";
  }, "useData": true });

  // js/quick-switch.js
  var HEX_DOCS_ENDPOINT = "https://hexdocs.pm/%%";
  var HEX_SEARCH_ENDPOINT = "https://hex.pm/api/packages?search=name:%%*";
  var QUICK_SWITCH_LINK_SELECTOR = ".display-quick-switch";
  var QUICK_SWITCH_INPUT_SELECTOR = "#quick-switch-input";
  var QUICK_SWITCH_RESULTS_SELECTOR = "#quick-switch-results";
  var QUICK_SWITCH_RESULT_SELECTOR = ".quick-switch-result";
  var DEBOUNCE_KEYPRESS_TIMEOUT = 300;
  var NUMBER_OF_SUGGESTIONS = 9;
  var STATIC_SEARCH_RESULTS = [
    "elixir",
    "eex",
    "ex_unit",
    "hex",
    "iex",
    "logger",
    "mix"
  ].map((name) => ({ name }));
  var MIN_SEARCH_LENGTH = 2;
  var state4 = {
    autocompleteResults: [],
    selectedIdx: null
  };
  function initialize10() {
    addEventListeners4();
  }
  function addEventListeners4() {
    qsAll(QUICK_SWITCH_LINK_SELECTOR).forEach((element) => {
      element.addEventListener("click", (event) => {
        openQuickSwitchModal();
      });
    });
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const packageSlug = event.target.value;
      quickSwitchToPackage(packageSlug);
      event.preventDefault();
    } else if (event.key === "ArrowUp") {
      moveAutocompleteSelection2(-1);
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      moveAutocompleteSelection2(1);
      event.preventDefault();
    }
  }
  function handleInput(event) {
    const packageSlug = event.target.value;
    if (packageSlug.length < MIN_SEARCH_LENGTH) {
      const resultsContainer = qs(QUICK_SWITCH_RESULTS_SELECTOR);
      resultsContainer.innerHTML = "";
    } else {
      debouncedQueryForAutocomplete(packageSlug);
    }
  }
  function openQuickSwitchModal() {
    openModal({
      title: "Search HexDocs package",
      body: quick_switch_modal_body_default()
    });
    qs(QUICK_SWITCH_INPUT_SELECTOR).focus();
    const quickSwitchInput = qs(QUICK_SWITCH_INPUT_SELECTOR);
    quickSwitchInput.addEventListener("keydown", handleKeyDown);
    quickSwitchInput.addEventListener("input", handleInput);
    state4.autocompleteResults = [];
    state4.selectedIdx = null;
  }
  function quickSwitchToPackage(packageSlug) {
    if (state4.selectedIdx === null) {
      navigateToHexDocPackage(packageSlug);
    } else {
      const selectedResult = state4.autocompleteResults[state4.selectedIdx];
      navigateToHexDocPackage(selectedResult.name);
    }
  }
  function navigateToHexDocPackage(packageSlug) {
    window.location = HEX_DOCS_ENDPOINT.replace("%%", packageSlug.toLowerCase());
  }
  var debouncedQueryForAutocomplete = debounce(queryForAutocomplete, DEBOUNCE_KEYPRESS_TIMEOUT);
  function queryForAutocomplete(packageSlug) {
    const url = HEX_SEARCH_ENDPOINT.replace("%%", packageSlug);
    fetch(url).then((response) => response.json()).then((payload) => {
      if (Array.isArray(payload)) {
        state4.autocompleteResults = resultsFromPayload(packageSlug, payload);
        state4.selectedIdx = null;
        const currentTerm = qs(QUICK_SWITCH_INPUT_SELECTOR).value;
        if (currentTerm.length >= MIN_SEARCH_LENGTH) {
          renderResults2({ results: state4.autocompleteResults });
        }
      }
    });
  }
  function renderResults2({ results }) {
    const resultsContainer = qs(QUICK_SWITCH_RESULTS_SELECTOR);
    const resultsHtml = quick_switch_results_default({ results });
    resultsContainer.innerHTML = resultsHtml;
    qsAll(QUICK_SWITCH_RESULT_SELECTOR).forEach((result) => {
      result.addEventListener("click", (event) => {
        const index = result.getAttribute("data-index");
        const selectedResult = state4.autocompleteResults[index];
        navigateToHexDocPackage(selectedResult.name);
      });
    });
  }
  function resultsFromPayload(packageSlug, payload) {
    return STATIC_SEARCH_RESULTS.concat(payload).filter((result) => result.name.toLowerCase().includes(packageSlug.toLowerCase())).filter((result) => result.releases === void 0 || result.releases[0]["has_docs"] === true).slice(0, NUMBER_OF_SUGGESTIONS);
  }
  function moveAutocompleteSelection2(offset) {
    state4.selectedIdx = newAutocompleteIndex2(offset);
    const selectedElement = qs(".quick-switch-result.selected");
    const elementToSelect = qs(`.quick-switch-result[data-index="${state4.selectedIdx}"]`);
    if (selectedElement) {
      selectedElement.classList.remove("selected");
    }
    if (elementToSelect) {
      elementToSelect.classList.add("selected");
    }
  }
  function newAutocompleteIndex2(offset) {
    const length = state4.autocompleteResults.length;
    if (state4.selectedIdx === null) {
      if (offset >= 0)
        return 0;
      if (offset < 0)
        return length - 1;
    }
    const index = state4.selectedIdx + offset;
    return (index + length) % length;
  }

  // js/handlebars/templates/settings-modal-body.handlebars
  var Handlebars8 = __toESM(require_handlebars_runtime());
  Handlebars8.registerHelper({});
  var settings_modal_body_default = Handlebars8.template({ "1": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "description") : depth0, { "name": "if", "hash": {}, "fn": container.program(2, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 40, "column": 7 }, "end": { "line": 53, "column": 14 } } })) != null ? stack1 : "";
  }, "2": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '         <dl class="shortcut-row">\n           <dd class="shortcut-description">\n             ' + container.escapeExpression(container.lambda(depth0 != null ? lookupProperty(depth0, "description") : depth0, depth0)) + '\n           </dd>\n           <dt class="shortcut-keys">\n' + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "displayAs") : depth0, { "name": "if", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.program(5, data, 0), "data": data, "loc": { "start": { "line": 46, "column": 13 }, "end": { "line": 50, "column": 20 } } })) != null ? stack1 : "") + "           </dt>\n         </dl>\n";
  }, "3": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return "               " + ((stack1 = container.lambda(depth0 != null ? lookupProperty(depth0, "displayAs") : depth0, depth0)) != null ? stack1 : "") + "\n";
  }, "5": function(container, depth0, helpers, partials, data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return "               <kbd><kbd>" + container.escapeExpression(container.lambda(depth0 != null ? lookupProperty(depth0, "key") : depth0, depth0)) + "</kbd></kbd>\n";
  }, "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '<div id="settings-modal-content">\n  <div id="settings-content">\n    <label class="switch-button-container">\n      <div>\n        <span>Theme</span>\n        <p>Use the documentation UI in a theme.</p>\n      </div>\n      <div>\n        <select name="theme" class="settings-select">\n          <option value="dark">Dark</option>\n          <option value="light">Light</option>\n          <option value="system">System</option>\n        </select>\n      </div>\n    </label>\n    <label class="switch-button-container">\n      <div>\n        <span>Show tooltips</span>\n        <p>Show tooltips when mousing over code references.</p>\n      </div>\n      <div class="switch-button">\n        <input class="switch-button__checkbox" type="checkbox" name="tooltips" />\n        <div class="switch-button__bg"></div>\n      </div>\n    </label>\n    <label class="switch-button-container">\n      <div>\n        <span>Run in Livebook</span>\n        <p>Use Direct Address for \u201CRun in Livebook\u201D badges.</p>\n      </div>\n      <div class="switch-button">\n        <input class="switch-button__checkbox" type="checkbox" name="direct_livebook_url" />\n        <div class="switch-button__bg"></div>\n      </div>\n    </label>\n    <input class="input" type="url" name="livebook_url" placeholder="Enter Livebook instance URL" aria-label="Enter Livebook instance URL" />\n  </div>\n   <div id="keyboard-shortcuts" class="hidden">\n' + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "shortcuts") : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 39, "column": 5 }, "end": { "line": 54, "column": 14 } } })) != null ? stack1 : "") + "   </div>\n</div>\n";
  }, "useData": true });

  // js/settings.js
  var SETTINGS_LINK_SELECTOR = ".display-settings";
  var SETTINGS_MODAL_BODY_SELECTOR = "#settings-modal-content";
  var SETTINGS_TAB = "#modal-settings-tab";
  var KEYBOARD_SHORTCUTS_TAB = "#modal-keyboard-shortcuts-tab";
  var SETTINGS_CONTENT = "#settings-content";
  var KEYBOARD_SHORTCUTS_CONTENT = "#keyboard-shortcuts";
  var modalTabs = [
    {
      title: "Settings",
      id: "modal-settings-tab"
    },
    {
      title: "Keyboard shortcuts",
      id: "modal-keyboard-shortcuts-tab"
    }
  ];
  function initialize11() {
    addEventListeners5();
  }
  function addEventListeners5() {
    qsAll(SETTINGS_LINK_SELECTOR).forEach((element) => {
      element.addEventListener("click", (event) => {
        openSettingsModal();
      });
    });
  }
  function showSettinsTab() {
    qs(KEYBOARD_SHORTCUTS_TAB).classList.remove("active");
    qs(SETTINGS_TAB).classList.add("active");
    qs(SETTINGS_CONTENT).classList.remove("hidden");
    qs(KEYBOARD_SHORTCUTS_CONTENT).classList.add("hidden");
  }
  function showKeyboardShortcutsTab() {
    qs(KEYBOARD_SHORTCUTS_TAB).classList.add("active");
    qs(SETTINGS_TAB).classList.remove("active");
    qs(KEYBOARD_SHORTCUTS_CONTENT).classList.remove("hidden");
    qs(SETTINGS_CONTENT).classList.add("hidden");
  }
  function openSettingsModal() {
    openModal({
      title: modalTabs.map(({ id, title }) => `<button id="${id}">${title}</button>`).join(""),
      body: settings_modal_body_default({ shortcuts: keyboardShortcuts })
    });
    const modal = qs(SETTINGS_MODAL_BODY_SELECTOR);
    const themeInput = modal.querySelector(`[name="theme"]`);
    const tooltipsInput = modal.querySelector(`[name="tooltips"]`);
    const directLivebookUrlInput = modal.querySelector(`[name="direct_livebook_url"]`);
    const livebookUrlInput = modal.querySelector(`[name="livebook_url"]`);
    settingsStore.getAndSubscribe((settings) => {
      themeInput.value = settings.theme || "system";
      tooltipsInput.checked = settings.tooltips;
      if (settings.livebookUrl === null) {
        directLivebookUrlInput.checked = false;
        livebookUrlInput.classList.add("hidden");
        livebookUrlInput.tabIndex = -1;
      } else {
        directLivebookUrlInput.checked = true;
        livebookUrlInput.classList.remove("hidden");
        livebookUrlInput.tabIndex = 0;
        livebookUrlInput.value = settings.livebookUrl;
      }
    });
    themeInput.addEventListener("change", (event) => {
      settingsStore.update({ theme: event.target.value });
    });
    tooltipsInput.addEventListener("change", (event) => {
      settingsStore.update({ tooltips: event.target.checked });
    });
    directLivebookUrlInput.addEventListener("change", (event) => {
      const livebookUrl = event.target.checked ? livebookUrlInput.value : null;
      settingsStore.update({ livebookUrl });
    });
    livebookUrlInput.addEventListener("input", (event) => {
      settingsStore.update({ livebookUrl: event.target.value });
    });
    qs(SETTINGS_TAB).addEventListener("click", (event) => {
      showSettinsTab();
    });
    qs(KEYBOARD_SHORTCUTS_TAB).addEventListener("click", (event) => {
      showKeyboardShortcutsTab();
    });
    showSettinsTab();
  }

  // js/keyboard-shortcuts.js
  var HELP_MODAL_BODY_SELECTOR = "#settings-modal-content";
  var keyboardShortcuts = [
    {
      key: "c",
      description: "Toggle sidebar",
      action: toggleSidebar
    },
    {
      key: "n",
      description: "Cycle themes",
      action: cycleTheme
    },
    {
      key: "s",
      description: "Focus search bar",
      displayAs: "<kbd><kbd>/</kbd></kbd> or <kbd><kbd>s</kdb></kdb>",
      action: searchKeyAction
    },
    {
      key: "/",
      action: searchKeyAction
    },
    {
      key: "g",
      description: "Search HexDocs package",
      displayAs: "<kbd><kbd>g</kdb></kdb>",
      action: openQuickSwitchModal
    },
    {
      key: "?",
      displayAs: "<kbd><kbd>?</kbd></kbd>",
      description: "Bring up this help dialog",
      action: toggleHelpModal
    }
  ];
  var state5 = {
    shortcutBeingPressed: null
  };
  function initialize12() {
    addEventListeners6();
  }
  function addEventListeners6() {
    document.addEventListener("keydown", handleKeyDown2);
    document.addEventListener("keyup", handleKeyUp);
  }
  function handleKeyDown2(event) {
    if (state5.shortcutBeingPressed) {
      return;
    }
    if (event.target.matches("input, textarea")) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    const matchingShortcut = keyboardShortcuts.find((shortcut) => shortcut.key === event.key);
    if (!matchingShortcut) {
      return;
    }
    state5.shortcutBeingPressed = matchingShortcut;
    event.preventDefault();
    matchingShortcut.action(event);
  }
  function handleKeyUp(event) {
    state5.shortcutBeingPressed = null;
  }
  function searchKeyAction(event) {
    closeModal();
    openSidebar().then(() => {
      focusSearchInput();
    });
  }
  function toggleHelpModal() {
    if (isHelpModalOpen()) {
      closeModal();
    } else {
      openSettingsModal();
    }
  }
  function isHelpModalOpen() {
    return isModalOpen() && qs(HELP_MODAL_BODY_SELECTOR);
  }

  // js/handlebars/templates/tooltip-body.handlebars
  var Handlebars9 = __toESM(require_handlebars_runtime());
  Handlebars9.registerHelper({});
  var tooltip_body_default = Handlebars9.template({ "1": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '  <section class="docstring docstring-plain">\n    ' + container.escapeExpression(container.lambda((stack1 = depth0 != null ? lookupProperty(depth0, "hint") : depth0) != null ? lookupProperty(stack1, "description") : stack1, depth0)) + "\n  </section>\n";
  }, "3": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '  <div class="detail-header">\n    <h1 class="signature">\n      <span translate="no">' + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "hint") : depth0) != null ? lookupProperty(stack1, "title") : stack1, depth0)) + '</span>\n      <div class="version-info" translate="no">' + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "hint") : depth0) != null ? lookupProperty(stack1, "version") : stack1, depth0)) + "</div>\n    </h1>\n  </div>\n" + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, (stack1 = depth0 != null ? lookupProperty(depth0, "hint") : depth0) != null ? lookupProperty(stack1, "description") : stack1, { "name": "if", "hash": {}, "fn": container.program(4, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 12, "column": 2 }, "end": { "line": 16, "column": 9 } } })) != null ? stack1 : "");
  }, "4": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return '    <section class="docstring">\n      ' + container.escapeExpression(container.lambda((stack1 = depth0 != null ? lookupProperty(depth0, "hint") : depth0) != null ? lookupProperty(stack1, "description") : stack1, depth0)) + "\n    </section>\n";
  }, "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return void 0;
    };
    return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "isPlain") : depth0, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.program(3, data, 0), "data": data, "loc": { "start": { "line": 1, "column": 0 }, "end": { "line": 17, "column": 7 } } })) != null ? stack1 : "";
  }, "useData": true });

  // js/handlebars/templates/tooltip-layout.handlebars
  var Handlebars10 = __toESM(require_handlebars_runtime());
  Handlebars10.registerHelper({});
  var tooltip_layout_default = Handlebars10.template({ "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
    return '<div id="tooltip">\n  <div class="tooltip-body"></div>\n</div>\n';
  }, "useData": true });

  // js/tooltips/hints.js
  var HINT_KIND = {
    plain: "plain",
    function: "function",
    module: "module"
  };
  var predefinedHints = [{
    href: "typespecs.html#basic-types",
    hint: {
      kind: HINT_KIND.plain,
      description: "Basic type"
    }
  }, {
    href: "typespecs.html#literals",
    hint: {
      kind: HINT_KIND.plain,
      description: "Literal"
    }
  }, {
    href: "typespecs.html#built-in-types",
    hint: {
      kind: HINT_KIND.plain,
      description: "Built-in type"
    }
  }];
  var state6 = {
    cancelHintFetching: null
  };
  function isValidHintHref(href) {
    if (findPredefinedHint(href)) {
      return true;
    }
    const supportedHashRegex = /#.*\//;
    const unsupportedHash = href.includes("#") && !supportedHashRegex.test(href);
    if (unsupportedHash) {
      return false;
    }
    const validExtension = href.includes(".html");
    return validExtension;
  }
  function getHint(href) {
    const predefinedHint = findPredefinedHint(href);
    if (predefinedHint) {
      return Promise.resolve(predefinedHint);
    }
    return loadHintFromExternalPage(href);
  }
  function findPredefinedHint(href) {
    const result = predefinedHints.find((predefinedHint) => href.includes(predefinedHint.href));
    return result ? result.hint : null;
  }
  function loadHintFromExternalPage(href) {
    const hintHref = href.replace(".html", `.html?hint=true`);
    return new Promise((resolve, reject) => {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
      iframe.setAttribute("src", hintHref);
      iframe.style.display = "none";
      function handleMessage(event) {
        const { href: href2, hint } = event.data;
        if (hintHref === href2) {
          cleanup();
          resolve(hint);
        }
      }
      state6.cancelHintFetching = () => {
        cleanup();
        reject(new Error("cancelled"));
      };
      function cleanup() {
        iframe.remove();
        window.removeEventListener("message", handleMessage);
        state6.cancelHintFetching = null;
      }
      window.addEventListener("message", handleMessage);
      document.body.appendChild(iframe);
    });
  }
  function cancelHintFetchingIfAny() {
    if (state6.cancelHintFetching) {
      state6.cancelHintFetching();
    }
  }
  function extractFunctionHint(element) {
    const heading = element.querySelector("h1");
    const title = heading.textContent;
    const firstParagraph = element.querySelector(".docstring > p");
    const description = firstParagraph ? firstParagraph.textContent : "";
    return {
      kind: HINT_KIND.function,
      title: title.trim(),
      description: description.trim()
    };
  }
  function extractModuleHint(content) {
    let heading = content.querySelector("h1 > span");
    const title = heading.textContent;
    const firstParagraph = content.querySelector("#moduledoc p");
    const description = firstParagraph ? firstParagraph.textContent : "";
    return {
      kind: HINT_KIND.module,
      title: title.trim(),
      description: description.trim()
    };
  }

  // js/tooltips/tooltips.js
  var TOOLTIP_ACTIVATORS_SELECTOR = ".content a";
  var TOOLTIP_SELECTOR = "#tooltip";
  var TOOLTIP_BODY_SELECTOR = "#tooltip .tooltip-body";
  var CONTENT_INNER_SELECTOR2 = "body .content-inner";
  var MODULE_CONTENT_HASH = "#content";
  var TOOLTIP_SHOWN_CLASS = "tooltip-shown";
  var SPACING_BASE = 10;
  var MIN_BOTTOM_SPACING = SPACING_BASE * 4;
  var MIN_WINDOW_SIZE = { height: 450, width: 768 };
  var HOVER_DELAY_MS = 100;
  var state7 = {
    currentLinkElement: null,
    hoverDelayTimeout: null
  };
  function initialize13() {
    renderTooltipLayout();
    addEventListeners7();
  }
  function renderTooltipLayout() {
    const tooltipLayoutHtml = tooltip_layout_default();
    qs(CONTENT_INNER_SELECTOR2).insertAdjacentHTML("beforeend", tooltipLayoutHtml);
  }
  function addEventListeners7() {
    qsAll(TOOLTIP_ACTIVATORS_SELECTOR).forEach((element) => {
      if (!linkElementEligibleForTooltip(element)) {
        return;
      }
      element.addEventListener("mouseenter", (event) => {
        handleHoverStart(element);
      });
      element.addEventListener("mouseleave", (event) => {
        handleHoverEnd(element);
      });
    });
  }
  function linkElementEligibleForTooltip(linkElement) {
    if (linkElement.classList.contains("detail-link")) {
      return false;
    }
    if (isHrefToSelf(linkElement.href)) {
      return false;
    }
    if (!isValidHintHref(linkElement.href)) {
      return false;
    }
    return true;
  }
  function isHrefToSelf(href) {
    const targetPage = href.replace(MODULE_CONTENT_HASH, "");
    const currentPage = window.location.href.split("#")[0];
    return currentPage === targetPage;
  }
  function handleHoverStart(element) {
    if (!shouldShowTooltips()) {
      return;
    }
    state7.currentLinkElement = element;
    state7.hoverDelayTimeout = setTimeout(() => {
      getHint(element.href).then((hint) => {
        renderTooltip(hint);
        animateTooltipIn();
      }).catch(() => {
      });
    }, HOVER_DELAY_MS);
  }
  function shouldShowTooltips() {
    const windowToSmall = window.innerWidth < MIN_WINDOW_SIZE.width || window.innerHeight < MIN_WINDOW_SIZE.height;
    return tooltipsEnabled() && !windowToSmall;
  }
  function renderTooltip(hint) {
    const tooltipBodyHtml = tooltip_body_default({
      isPlain: hint.kind === HINT_KIND.plain,
      hint
    });
    qs(TOOLTIP_BODY_SELECTOR).innerHTML = tooltipBodyHtml;
    updateTooltipPosition();
  }
  function animateTooltipIn() {
    const tooltipElement = qs(TOOLTIP_SELECTOR);
    tooltipElement.classList.add(TOOLTIP_SHOWN_CLASS);
  }
  function handleHoverEnd(element) {
    if (!tooltipsEnabled()) {
      return;
    }
    clearTimeout(state7.hoverDelayTimeout);
    cancelHintFetchingIfAny();
    state7.currentLinkElement = null;
    animateTooltipOut();
  }
  function animateTooltipOut() {
    const tooltipElement = qs(TOOLTIP_SELECTOR);
    tooltipElement.classList.remove(TOOLTIP_SHOWN_CLASS);
  }
  function updateTooltipPosition() {
    if (!state7.currentLinkElement) {
      return;
    }
    const tooltipElement = qs(TOOLTIP_SELECTOR);
    const linkBoundingRect = state7.currentLinkElement.getBoundingClientRect();
    const contentInnerBoundingRect = qs(CONTENT_INNER_SELECTOR2).getBoundingClientRect();
    const tooltipBoundingRect = tooltipElement.getBoundingClientRect();
    const relativeBoundingRect = getRelativeBoundingRect(linkBoundingRect, contentInnerBoundingRect);
    if (linkBoundingRect.left + tooltipBoundingRect.width + SPACING_BASE < window.innerWidth) {
      tooltipElement.style.left = `${relativeBoundingRect.left}px`;
      tooltipElement.style.right = "auto";
    } else {
      const left = Math.max(relativeBoundingRect.right - tooltipBoundingRect.width, SPACING_BASE);
      tooltipElement.style.left = `${left}px`;
      tooltipElement.style.right = "auto";
    }
    if (linkBoundingRect.bottom + tooltipBoundingRect.height + MIN_BOTTOM_SPACING < window.innerHeight) {
      tooltipElement.style.top = `${relativeBoundingRect.bottom + SPACING_BASE}px`;
    } else {
      tooltipElement.style.top = `${relativeBoundingRect.top - tooltipBoundingRect.height - SPACING_BASE}px`;
    }
  }
  function getRelativeBoundingRect(elementRect, containerRect) {
    return {
      top: elementRect.top - containerRect.top,
      bottom: elementRect.bottom - containerRect.top,
      left: elementRect.left - containerRect.left,
      right: elementRect.right - containerRect.left,
      x: elementRect.x - containerRect.x,
      y: elementRect.y - containerRect.y,
      width: elementRect.width,
      height: elementRect.height
    };
  }
  function tooltipsEnabled() {
    return settingsStore.get().tooltips;
  }

  // js/tooltips/hint-page.js
  var CONTENT_INNER_SELECTOR3 = ".content-inner";
  function initialize14() {
    if (shouldSendHint()) {
      const hint = buildHint();
      if (hint) {
        sendHintToParentWindow(hint);
      }
    }
  }
  function shouldSendHint() {
    const params = new URLSearchParams(window.location.search);
    return params.has("hint") && window.self !== window.parent;
  }
  function sendHintToParentWindow(hint) {
    const href = window.location.href;
    const message = { hint, href };
    window.parent.postMessage(message, "*");
  }
  function buildHint() {
    const infoElement = descriptionElementFromHash(getLocationHash());
    const content = qs(CONTENT_INNER_SELECTOR3);
    if (infoElement) {
      const hint = extractFunctionHint(infoElement);
      return withVersion(hint);
    } else if (isModulePage()) {
      const hint = extractModuleHint(content);
      return withVersion(hint);
    }
    return null;
  }
  function withVersion(hint) {
    const version = getProjectNameAndVersion();
    return { ...hint, version };
  }
  function isModulePage() {
    return ["modules", "tasks"].includes(getCurrentPageSidebarType());
  }
  function descriptionElementFromHash(hash) {
    if (!hash) {
      return null;
    }
    const element = document.getElementById(hash);
    if (!element) {
      return null;
    }
    if (element.matches(".detail")) {
      return element;
    }
    if (element.matches("span")) {
      return element.parentElement;
    }
    return null;
  }

  // js/copy-button.js
  var BUTTON = `<button class="copy-button" aria-label="copy"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg></button>`;
  function initialize15() {
    if ("clipboard" in navigator) {
      addCopyButtons();
    }
  }
  function addCopyButtons() {
    Array.from(qsAll("pre")).filter((pre) => pre.firstElementChild && pre.firstElementChild.tagName === "CODE").forEach((pre) => pre.insertAdjacentHTML("afterbegin", BUTTON));
    Array.from(qsAll(".copy-button")).forEach((button) => {
      let timeout;
      button.addEventListener("click", () => {
        timeout && clearTimeout(timeout);
        let text = Array.from(button.parentElement.querySelector("code").childNodes).filter((elem) => !(elem.tagName === "SPAN" && elem.classList.contains("unselectable"))).map((elem) => elem.textContent).join("");
        navigator.clipboard.writeText(text);
        button.classList.add("clicked");
        timeout = setTimeout(() => button.classList.remove("clicked"), 3e3);
      });
    });
  }

  // entrypoints/html/dist/app.js
  onDocumentReady(() => {
    initialize7();
    initialize2();
    initialize3();
    initialize4();
    initialize5();
    initialize();
    initialize8();
    initialize9();
    initialize12();
    initialize10();
    initialize13();
    initialize14();
    initialize6();
    initialize15();
    initialize11();
  });
})();
/*!
 * lunr.Builder
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.Index
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.Pipeline
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.Set
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.TokenSet
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.Vector
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.stemmer
 * Copyright (C) 2019 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.tokenizer
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.trimmer
 * Copyright (C) 2019 Oliver Nightingale
 */
/*!
 * lunr.utils
 * Copyright (C) 2019 Oliver Nightingale
 */
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.8
 * Copyright (C) 2019 Oliver Nightingale
 * @license MIT
 */
