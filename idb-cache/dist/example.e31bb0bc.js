// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/uitils/Dep.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dep =
/*#__PURE__*/
function () {
  function Dep() {
    _classCallCheck(this, Dep);

    this.deps = [];
  }

  _createClass(Dep, [{
    key: "add",
    value: function add(element) {
      this.deps.push(element);
    }
  }, {
    key: "notify",
    value: function notify() {
      for (var i = 0; i < this.deps.length; i++) {
        this.deps[i]();
      }

      this.deps.length = 0;
    }
  }]);

  return Dep;
}();

var _default = Dep;
exports.default = _default;
},{}],"../src/uitils/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAME = void 0;
var NAME = 'idb-js';
exports.NAME = NAME;
},{}],"../src/uitils/log.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log_error = log_error;
exports.log = log;

var _config = require("./config");

function log_error() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  throw new Error("".concat(_config.NAME, "\uFF1A").concat(msg));
}

function log() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  console.log("".concat(_config.NAME, "\uFF1A").concat(msg));
}
},{"./config":"../src/uitils/config.js"}],"../src/global.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDBKeyRange = exports.IDBTransaction = exports.indexedDB = void 0;
// 兼容
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
exports.indexedDB = indexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
exports.IDBTransaction = IDBTransaction;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
exports.IDBKeyRange = IDBKeyRange;
},{}],"../src/uitils/type.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.isObject = void 0;

var isObject = function isObject(data) {
  return Object.prototype.toString.call(data) === "[object Object]";
};

exports.isObject = isObject;

var isArray = function isArray(data) {
  return Object.prototype.toString.call(data) === "[object Array]";
};

exports.isArray = isArray;
},{}],"../src/DB.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Dep = _interopRequireDefault(require("./uitils/Dep.js"));

var _log = require("./uitils/log");

var _global = require("./global");

var _type = require("./uitils/type.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DB =
/*#__PURE__*/
function () {
  function DB(_ref) {
    var dbName = _ref.dbName,
        version = _ref.version;

    _classCallCheck(this, DB);

    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.idb = null;
    this.table = [];
    this._status = false; // 是否先添加了表

    this._dep_ = new _Dep.default();
  }
  /**
   * 打开数据库
   * @success 成功的回调，返回db，非必传
   * @error 失败的回调，返回错误信息，非必传
   * */


  _createClass(DB, [{
    key: "open",
    value: function open(ops) {
      var _this = this;

      var success = function success() {},
          error = function error() {};

      if (ops) {
        success = ops.success ? ops.success : success;
        error = ops.error ? ops.error : error;
      } // 打开前要先添加表


      if (this.table.length == 0 && !this._status) {
        (0, _log.log_error)("打开前要先用add_table添加表");
        return;
      }

      if (typeof success !== "function") {
        (0, _log.log_error)("open中success必须是一个function类型");
        return;
      }

      var request = _global.indexedDB.open(this.dbName, this.version);

      request.onerror = function (e) {
        error(e.currentTarget.error.message);
      };

      request.onsuccess = function (e) {
        _this.db = e.target.result;
        success(_this.db);

        _this._dep_.notify();
      };

      request.onupgradeneeded = function (e) {
        _this.idb = e.target.result;

        for (var i = 0; i < _this.table.length; i++) {
          _this.__create_table(_this.idb, _this.table[i]);
        }
      };
    } //  关闭数据库

  }, {
    key: "close_db",
    value: function close_db() {
      var _this2 = this;

      var handler = function handler() {
        _this2.db.close();
      };

      this.__action(handler);
    } // 删除数据库

  }, {
    key: "delete_db",
    value: function delete_db() {
      _global.indexedDB.deleteDatabase(name);
    } //清空某张表的数据

  }, {
    key: "clear_table",
    value: function clear_table(_ref2) {
      var _this3 = this;

      var tableName = _ref2.tableName;

      this.__action(function () {
        return _this3.__create_transaction(tableName, "readwrite").clear();
      });
    }
    /**
     * 添加一张表
     * @param tableOption<Object>
     * @tableName 表名
     * @option 表配置
     * @index 索引配置
     * */

  }, {
    key: "add_table",
    value: function add_table() {
      var tableOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._status = false;
      this.table.push(tableOption);
    }
    /**
     * @method 查询某张表的所有数据
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {Function} [success] @return {Array} 查询成功的回调，返回查到的结果
     * */

  }, {
    key: "queryAll",
    value: function queryAll(_ref3) {
      var _this4 = this;

      var tableName = _ref3.tableName,
          _ref3$success = _ref3.success,
          success = _ref3$success === void 0 ? function () {} : _ref3$success;

      if (typeof success !== "function") {
        (0, _log.log_error)("queryAll方法中success必须是一个Function类型");
        return;
      }

      var handler = function handler() {
        var res = [];

        _this4.__create_transaction(tableName, "readonly").openCursor().onsuccess = function (e) {
          return _this4.__cursor_success(e, {
            condition: function condition() {
              return true;
            },
            handler: function handler(_ref4) {
              var currentValue = _ref4.currentValue;
              return res.push(currentValue);
            },
            over: function over() {
              return success(res);
            }
          });
        };
      };

      this.__action(handler);
    }
    /**
     * @method 查询
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {Function} condition 查询的条件
     *      @arg {Object} 遍历每条数据，和filter类似
     *      @return 条件
     *   @property {Function} [success] @return {Array} 查询成功的回调，返回查到的结果
     * */

  }, {
    key: "query",
    value: function query(_ref5) {
      var _this5 = this;

      var tableName = _ref5.tableName,
          condition = _ref5.condition,
          _ref5$success = _ref5.success,
          success = _ref5$success === void 0 ? function () {} : _ref5$success;

      if (typeof success !== "function") {
        (0, _log.log_error)("query方法中success必须是一个Function类型");
        return;
      }

      if (typeof condition !== "function") {
        (0, _log.log_error)("in query,condition is required,and type is function");
        return;
      }

      var handler = function handler() {
        var res = [];

        _this5.__create_transaction(tableName, "readonly").openCursor().onsuccess = function (e) {
          return _this5.__cursor_success(e, {
            condition: condition,
            handler: function handler(_ref6) {
              var currentValue = _ref6.currentValue;
              return res.push(currentValue);
            },
            over: function over() {
              return success(res);
            }
          });
        };
      };

      this.__action(handler);
    }
    /**
     * @method 增加数据
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {Object} data 插入的数据
     *   @property {Function} [success] 插入成功的回调
     * */

  }, {
    key: "insert",
    value: function insert(_ref7) {
      var _this6 = this;

      var tableName = _ref7.tableName,
          data = _ref7.data,
          _ref7$success = _ref7.success,
          success = _ref7$success === void 0 ? function () {} : _ref7$success;

      if (!((0, _type.isArray)(data) || (0, _type.isObject)(data))) {
        (0, _log.log_error)("in insert，data type is Object or Array");
        return;
      }

      if (typeof success !== "function") {
        (0, _log.log_error)("insert方法中success必须是一个Function类型");
        return;
      }

      this.__action(function () {
        var store = _this6.__create_transaction(tableName, "readwrite");

        (0, _type.isArray)(data) ? data.forEach(function (v) {
          return store.put(v);
        }) : store.put(data); // this.__create_transaction(tableName, "readwrite").add(data);

        success();
      });
    }
    /**
     * @method 删除数据
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {Function} condition 查询的条件，遍历，与filter类似
     *      @arg {Object} 每个元素
     *      @return 条件
     *   @property {Function} [success] 删除成功的回调  @return {Array} 返回被删除的值
     *   @property {Function} [error] 错误函数 @return {String}
     * */

  }, {
    key: "delete",
    value: function _delete(_ref8) {
      var _this7 = this;

      var tableName = _ref8.tableName,
          condition = _ref8.condition,
          _ref8$success = _ref8.success,
          success = _ref8$success === void 0 ? function () {} : _ref8$success;

      if (typeof success !== "function") {
        (0, _log.log_error)("delete方法中success必须是一个Function类型");
        return;
      }

      if (typeof condition !== "function") {
        (0, _log.log_error)("in delete,condition is required,and type is function");
        return;
      }

      var handler = function handler() {
        var res = [];

        _this7.__create_transaction(tableName, "readwrite").openCursor().onsuccess = function (e) {
          return _this7.__cursor_success(e, {
            condition: condition,
            handler: function handler(_ref9) {
              var currentValue = _ref9.currentValue,
                  cursor = _ref9.cursor;
              res.push(currentValue);
              cursor.delete();
            },
            over: function over() {
              if (res.length == 0) {
                (0, _log.log_error)("in delete ,\u6570\u636E\u5E93\u4E2D\u6CA1\u6709\u4EFB\u4F55\u7B26\u5408condition\u7684\u5143\u7D20");
                return;
              }

              success(res);
            }
          });
        };
      };

      this.__action(handler);
    }
    /**
     * @method 删除数据(主键)
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {String\|Number} target 目标主键值
     *   @property {Function} [success] 删除成功的回调  @return {Null}
     * */

  }, {
    key: "delete_by_primaryKey",
    value: function delete_by_primaryKey(_ref10) {
      var _this8 = this;

      var tableName = _ref10.tableName,
          target = _ref10.target,
          _ref10$success = _ref10.success,
          success = _ref10$success === void 0 ? function () {} : _ref10$success,
          _ref10$error = _ref10.error,
          error = _ref10$error === void 0 ? function () {} : _ref10$error;

      if (typeof success !== "function") {
        (0, _log.log_error)("in delete_by_primaryKey，success必须是一个Function类型");
        return;
      }

      this.__action(function () {
        var request = _this8.__create_transaction(tableName, "readwrite").delete(target);

        request.onsuccess = function () {
          return success();
        };

        request.onerror = function () {
          return error();
        };
      });
    }
    /**
     * @method 修改某条数据(主键)
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {String\|Number} target 目标主键值
     *   @property {Function} handle 处理函数，接收本条数据的引用，对其修改
     *   @property {Function} [success] 修改成功的回调   @return {Object} 返回被修改后的值
     * */

  }, {
    key: "update_by_primaryKey",
    value: function update_by_primaryKey(_ref11) {
      var _this9 = this;

      var tableName = _ref11.tableName,
          target = _ref11.target,
          _ref11$success = _ref11.success,
          success = _ref11$success === void 0 ? function () {} : _ref11$success,
          handle = _ref11.handle;

      if (typeof success !== "function") {
        (0, _log.log_error)("in update_by_primaryKey，success必须是一个Function类型");
        return;
      }

      if (typeof handle !== "function") {
        (0, _log.log_error)("in update_by_primaryKey，handle必须是一个Function类型");
        return;
      }

      this.__action(function () {
        var store = _this9.__create_transaction(tableName, "readwrite");

        store.get(target).onsuccess = function (e) {
          var currentValue = e.target.result;
          handle(currentValue);
          store.put(currentValue);
          success(currentValue);
        };
      });
    }
    /**
     * @method 修改数据
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {Function} condition 查询的条件，遍历，与filter类似
     *      @arg {Object} 每个元素
     *      @return 条件
     *   @property {Function} handle 处理函数，接收本条数据的引用，对其修改
     *   @property {Function} [success] 修改成功的回调，返回修改成功的数据   @return {Array} 返回被修改后的值
     * */

  }, {
    key: "update",
    value: function update(_ref12) {
      var _this10 = this;

      var tableName = _ref12.tableName,
          condition = _ref12.condition,
          handle = _ref12.handle,
          _ref12$success = _ref12.success,
          success = _ref12$success === void 0 ? function () {} : _ref12$success;

      if (typeof handle !== "function") {
        (0, _log.log_error)("in update,handle必须是一个function类型");
        return;
      }

      if (typeof success !== "function") {
        (0, _log.log_error)("in update,success必须是一个function类型");
        return;
      }

      if (typeof condition !== "function") {
        (0, _log.log_error)("in update,condition is required,and type is function");
        return;
      }

      var handler = function handler() {
        var res = [];

        _this10.__create_transaction(tableName, "readwrite").openCursor().onsuccess = function (e) {
          return _this10.__cursor_success(e, {
            condition: condition,
            handler: function handler(_ref13) {
              var currentValue = _ref13.currentValue,
                  cursor = _ref13.cursor;
              handle(currentValue);
              res.push(currentValue);
              cursor.update(currentValue);
            },
            over: function over() {
              if (res.length == 0) {
                (0, _log.log_error)("in update ,\u6570\u636E\u5E93\u4E2D\u6CA1\u6709\u4EFB\u4F55\u7B26\u5408condition\u7684\u5143\u7D20");
                return;
              }

              success(res);
            }
          });
        };
      };

      this.__action(handler);
    }
    /**
     * @method 查询数据（主键值）
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {Number|String} target 主键值
     *   @property {Function} [success] 查询成功的回调，返回查询成功的数据   @return {Object} 返回查到的结果
     *
     * */

  }, {
    key: "query_by_primaryKey",
    value: function query_by_primaryKey(_ref14) {
      var _this11 = this;

      var tableName = _ref14.tableName,
          target = _ref14.target,
          _ref14$success = _ref14.success,
          success = _ref14$success === void 0 ? function () {} : _ref14$success;

      if (typeof success !== "function") {
        (0, _log.log_error)("in query_by_primaryKey,success必须是一个Function类型");
        return;
      }

      var handleFn = function handleFn() {
        _this11.__create_transaction(tableName, "readonly").get(target).onsuccess = function (e) {
          var result = e.target.result;
          success(result || null);
        };
      };

      this.__action(handleFn);
    }
    /**
     * @method 查询数据（索引）
     * @param {Object}
     *   @property {String} tableName 表名
     *   @property {Number|String} indexName 索引名
     *   @property {Number|String} target 索引值
     *   @property {Function} [success] 查询成功的回调，返回查询成功的数据   @return {Object} 返回查到的结果
     *
     * */

  }, {
    key: "query_by_index",
    value: function query_by_index(_ref15) {
      var _this12 = this;

      var tableName = _ref15.tableName,
          indexName = _ref15.indexName,
          target = _ref15.target,
          _ref15$success = _ref15.success,
          success = _ref15$success === void 0 ? function () {} : _ref15$success;

      if (typeof success !== "function") {
        (0, _log.log_error)("in query_by_index,success必须是一个Function类型");
        return;
      }

      var handleFn = function handleFn() {
        _this12.__create_transaction(tableName, "readonly").index(indexName).get(target).onsuccess = function (e) {
          var result = e.target.result;
          success(result || null);
        };
      };

      this.__action(handleFn);
    }
    /**
     * @method 游标开启成功,遍历游标
     * @param {Function} 条件
     * @param {Function} 满足条件的处理方式 @arg {Object} @property cursor游标 @property currentValue当前值
     * @param {Function} 游标遍历完执行的方法
     * @return {Null}
     * */

  }, {
    key: "__cursor_success",
    value: function __cursor_success(e, _ref16) {
      var condition = _ref16.condition,
          handler = _ref16.handler,
          over = _ref16.over;
      var cursor = e.target.result;

      if (cursor) {
        var currentValue = cursor.value;
        if (condition(currentValue)) handler({
          cursor: cursor,
          currentValue: currentValue
        });
        cursor.continue();
      } else {
        over();
      }
    }
    /**
     * @method 开启事务
     * @param {String} 表名
     * @param {String} 事务权限
     * @return store
     * */

  }, {
    key: "__create_transaction",
    value: function __create_transaction(tableName) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "readwrite";

      if (!tableName || !mode) {
        throw new Error("in __create_transaction,tableName and mode is required");
      }

      var transaction = this.db.transaction(tableName, mode);
      return transaction.objectStore(tableName);
    } // db是异步的,保证fn执行的时候db存在

  }, {
    key: "__action",
    value: function __action(handler) {
      var action = function action() {
        handler();
      }; // 如果db不存在，加入依赖


      if (!this.db) {
        this._dep_.add(action);
      } else {
        action();
      }
    }
    /**
     * 创建table
     * @option<Object>  keyPath指定主键 autoIncrement是否自增
     * @index 索引配置
     * */

  }, {
    key: "__create_table",
    value: function __create_table(idb, _ref17) {
      var tableName = _ref17.tableName,
          option = _ref17.option,
          _ref17$indexs = _ref17.indexs,
          indexs = _ref17$indexs === void 0 ? [] : _ref17$indexs;

      if (!idb.objectStoreNames.contains(tableName)) {
        var store = idb.createObjectStore(tableName, option);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = indexs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var indexItem = _step.value;

            this.__create_index(store, indexItem);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
    /**
     * 创建索引
     * @option<Object> unique是否是唯一值
     * */

  }, {
    key: "__create_index",
    value: function __create_index(store, _ref18) {
      var key = _ref18.key,
          option = _ref18.option;
      store.createIndex(key, key, option);
    }
  }]);

  return DB;
}();

var _default = DB;
exports.default = _default;
},{"./uitils/Dep.js":"../src/uitils/Dep.js","./uitils/log":"../src/uitils/log.js","./global":"../src/global.js","./uitils/type.js":"../src/uitils/type.js"}],"../src/Idb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DB = _interopRequireDefault(require("./DB"));

var _log = require("./uitils/log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Idb(_ref) {
  var dbName = _ref.dbName,
      _ref$version = _ref.version,
      version = _ref$version === void 0 ? new Date().getTime() : _ref$version,
      _ref$tables = _ref.tables,
      tables = _ref$tables === void 0 ? [] : _ref$tables;
  var db = new _DB.default({
    dbName: dbName,
    version: version
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var tableItem = _step.value;
      // tableItem<Object> @tableName,@option,@indexs
      db.add_table(tableItem);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return new Promise(function (resolve, reject) {
    db.open({
      success: function success() {
        (0, _log.log)("\u6570\u636E\u5E93 ".concat(dbName, " \u5DF2\u7ECF\u6253\u5F00"));
        resolve(db);
      },
      error: function error(err) {
        reject(err);
      }
    });
  });
}

var _default = Idb;
exports.default = _default;
},{"./DB":"../src/DB.js","./uitils/log":"../src/uitils/log.js"}],"db_student_config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  dbName: "student",
  version: 1,
  tables: [{
    tableName: "grade",
    option: {
      keyPath: "id"
    },
    indexs: [{
      key: "id",
      option: {
        unique: true
      }
    }, {
      key: "name"
    }, {
      key: "score"
    }]
  }, {
    tableName: "info",
    option: {
      keyPath: "id"
    },
    indexs: [{
      key: "id",
      option: {
        unique: true
      }
    }, {
      key: "name"
    }, {
      key: "age"
    }, {
      key: "sex"
    }]
  }]
};
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _Idb = _interopRequireDefault(require("../src/Idb"));

var _db_student_config = _interopRequireDefault(require("./db_student_config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Idb.default)(_db_student_config.default).then(function (student_db) {
  // 增
  student_db.insert({
    tableName: "grade",
    data: {
      id: 1,
      score: 98,
      name: "小明"
    },
    success: function success() {
      return console.log("添加成功1");
    }
  });
}, function (err) {
  return console.log(err);
});
(0, _Idb.default)(_db_student_config.default).then(function (student_db) {
  // 增
  student_db.insert({
    tableName: "grade",
    data: {
      id: 1,
      score: 98,
      name: "小明"
    }
  });
  student_db.insert({
    tableName: "grade",
    data: {
      id: 1,
      score: 99,
      name: "小明"
    }
  });
  student_db.insert({
    tableName: "grade",
    data: {
      id: 2,
      score: 100,
      name: "小红"
    }
  });
  student_db.insert({
    tableName: "grade",
    data: {
      id: 3,
      score: 100,
      name: "小华"
    }
  });
  student_db.insert({
    tableName: "info",
    data: {
      id: 1,
      age: 18,
      name: "小明",
      sex: 1
    }
  });
  student_db.insert({
    tableName: "info",
    data: [{
      id: 2,
      age: 13,
      name: "小1",
      sex: 2
    }, {
      id: 3,
      age: 11,
      name: "小2",
      sex: 1
    }],
    success: function success() {
      return console.log("添加成功");
    }
  });
  setTimeout(function () {
    // 查
    student_db.query({
      tableName: "grade",
      condition: function condition(item) {
        return item.score == 100;
      },
      success: function success(r) {
        console.log('查询成功');
        console.log(r);
      }
    });
  }, 1000); // 改

  student_db.update({
    tableName: "grade",
    condition: function condition(item) {
      return item.score == 100;
    },
    handle: function handle(r) {
      r.name = "我的name被修改了";
    },
    success: function success(r) {
      console.log("修改成功", r);
    },
    error: function error(msg) {
      return console.log(msg);
    }
  });
  student_db.queryAll({
    tableName: "grade",
    success: function success(res) {
      console.log(res);
    }
  });
  student_db.query_by_primaryKey({
    tableName: "grade",
    target: 1,
    success: function success(res) {
      console.log(res);
    }
  });
  student_db.query_by_index({
    tableName: "grade",
    indexName: "name",
    target: "小明",
    success: function success(res) {
      console.log(res);
    }
  }); // 删除
  // student_db.delete({
  //   tableName: "grade",
  //   condition: (item)=> item.score == 100,
  //   success: () => {
  //     console.log("删除成功");
  //   }
  // });
  // 关闭该数据库
  // student_db.close_db();
  // 删除该数据库
  // student_db.delete_db();
  //清空某张表的数据
  // student_db.clear_table({
  //   tableName:'grade'
  // })
  // 通过主键删除某条数据
  // student_db.delete_by_primaryKey({
  //   tableName:'grade',
  //   target:1,
  //   success:()=>console.log('删除成功')
  // })
  // student_db.update_by_primaryKey({
  //   tableName: "grade",
  //   target: 1,
  //   handle: val => (val.score = 101),
  //   success: res => {
  //     console.log(res);
  //   }
  // });
}, function (err) {
  console.log(err);
});
},{"../src/Idb":"../src/Idb.js","./db_student_config":"db_student_config.js"}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63757" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/example.e31bb0bc.js.map