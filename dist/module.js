define(["@emotion/css","@grafana/data","@grafana/runtime","@grafana/ui","react","rxjs"], (__WEBPACK_EXTERNAL_MODULE__emotion_css__, __WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_rxjs__) => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./common-ds/index.ts":
/*!****************************!*\
  !*** ./common-ds/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "METRIC_EDITOR_MODES": () => (/* binding */ METRIC_EDITOR_MODES),
/* harmony export */   "MetricEditorMode": () => (/* binding */ MetricEditorMode),
/* harmony export */   "RESPONSE_TYPE": () => (/* binding */ RESPONSE_TYPE),
/* harmony export */   "getCloudElementsQuery": () => (/* binding */ getCloudElementsQuery)
/* harmony export */ });
var MetricEditorMode;
(function (MetricEditorMode) {
  MetricEditorMode[MetricEditorMode["Builder"] = 0] = "Builder";
  MetricEditorMode[MetricEditorMode["Code"] = 1] = "Code";
})(MetricEditorMode || (MetricEditorMode = {}));
var RESPONSE_TYPE = [{
  label: 'JSON',
  value: "JSON"
}, {
  label: 'Frame',
  value: "Frame"
}];
var METRIC_EDITOR_MODES = [{
  label: 'Builder',
  value: MetricEditorMode.Builder
}, {
  label: 'Code',
  value: MetricEditorMode.Code
}];
var getCloudElementsQuery = function getCloudElementsQuery(id, cloudElement, awsxUrl) {
  return {
    "cloudIdentifierName": cloudElement.instanceName,
    "type": "appkube-api",
    "queryMode": "Metrics",
    "matchExact": true,
    "expression": "",
    "id": "",
    "alias": "",
    "period": "",
    "zone": "",
    "externalId": "",
    "crossAccountRoleArn": "",
    "elementType": cloudElement.elementType,
    "elementId": parseInt(id, 10),
    "cloudIdentifierId": cloudElement.instanceId,
    "awsxUrl": awsxUrl
  };
};

/***/ }),

/***/ "./components/ConfigEditor.tsx":
/*!*************************************!*\
  !*** ./components/ConfigEditor.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigEditor": () => (/* binding */ ConfigEditor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


function ConfigEditor(props) {
  var onOptionsChange = props.onOptionsChange,
    options = props.options;
  var onAwsxAPIEndpoint = function onAwsxAPIEndpoint(event) {
    var jsonData = _extends({}, options.jsonData, {
      awsxEndPoint: event.target.value
    });
    onOptionsChange(_extends({}, options, {
      jsonData: jsonData
    }));
  };
  var onGrafanaEndPoint = function onGrafanaEndPoint(event) {
    var jsonData = _extends({}, options.jsonData, {
      grafanaEndpoint: event.target.value
    });
    onOptionsChange(_extends({}, options, {
      jsonData: jsonData
    }));
  };
  var onAPIEndPointChange = function onAPIEndPointChange(event) {
    var jsonData = _extends({}, options.jsonData, {
      cmdbEndpoint: event.target.value
    });
    onOptionsChange(_extends({}, options, {
      jsonData: jsonData
    }));
  };

  // Secure field (only sent to the backend)
  // const onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   onOptionsChange({
  //     ...options,
  //     secureJsonData: {
  //       apiKey: event.target.value,
  //     },
  //   });
  // };

  // const onResetAPIKey = () => {
  //   onOptionsChange({
  //     ...options,
  //     secureJsonFields: {
  //       ...options.secureJsonFields,
  //       apiKey: false,
  //     },
  //     secureJsonData: {
  //       ...options.secureJsonData,
  //       apiKey: '',
  //     },
  //   });
  // };

  var jsonData = options.jsonData;
  // const { jsonData, secureJsonFields } = options;
  // const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "gf-form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Grafana Endpoint",
    labelWidth: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    onChange: onGrafanaEndPoint,
    value: jsonData.grafanaEndpoint || '',
    placeholder: "http://localhost:3001",
    width: 40
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "CMDB API Endpoint",
    labelWidth: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    onChange: onAPIEndPointChange,
    value: jsonData.cmdbEndpoint || '',
    placeholder: "https://api.synectiks.net/cmdb",
    width: 40
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "AWSX API Endpoint",
    labelWidth: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    onChange: onAwsxAPIEndpoint,
    value: jsonData.awsxEndPoint || '',
    placeholder: "https://api.synectiks.net/cmdb",
    width: 40
  })));
}

/***/ }),

/***/ "./components/QueryEditor.tsx":
/*!************************************!*\
  !*** ./components/QueryEditor.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryEditor": () => (/* binding */ QueryEditor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_ds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-ds */ "./common-ds/index.ts");
/* harmony import */ var _extended_EditorRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../extended/EditorRow */ "./extended/EditorRow.tsx");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service */ "./service/index.ts");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





function QueryEditor(_ref) {
  var query = _ref.query,
    onChange = _ref.onChange,
    onRunQuery = _ref.onRunQuery,
    datasource = _ref.datasource;
  var service = new _service__WEBPACK_IMPORTED_MODULE_4__.Services(datasource.meta.jsonData.cmdbEndpoint || "", datasource.meta.jsonData.grafanaEndpoint || "");
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    elementId = _useState2[0],
    setElementId = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    supportedPanels = _useState4[0],
    setSupportedPanels = _useState4[1];
  var onChanged = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var getCloudElements = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id, query) {
    service.getCloudElements(id).then(function (res) {
      if (res && res[0]) {
        var cloudElement = res[0];
        if (cloudElement) {
          var cloudElementQuery = (0,_common_ds__WEBPACK_IMPORTED_MODULE_2__.getCloudElementsQuery)(id, cloudElement, datasource.meta.jsonData.awsxEndPoint || "");
          query = _extends({}, query, cloudElementQuery);
          onChange(_extends({}, query));
          service.getSupportedPanels(cloudElement.elementType.toUpperCase(), "AWS").then(function (res) {
            if (res && res.length > 0) {
              var panels = [];
              res.map(function (panel) {
                panels.push({
                  label: panel.name,
                  value: panel.name
                });
              });
              setSupportedPanels(panels);
            }
          });
        }
      }
    });
  }, [onChange]); // eslint-disable-line react-hooks/exhaustive-deps

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (onChanged.current === false) {
      var id = findParam("var-elementId", window.location.href);
      if (id) {
        setElementId(id);
        getCloudElements(id, query);
      } else {
        alert("Please set 'elementId' variable");
      }
      onChanged.current = true;
    }
  }, [query, onChange, getCloudElements]);
  var findParam = function findParam(paramName, url) {
    if (!url) {
      url = location.href;
    }
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + paramName + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? "" : results[1];
  };
  var onChangeElementType = function onChangeElementType(e) {
    onChange(_extends({}, query, {
      elementType: e.target.value
    }));
  };
  var onChangeInstanceID = function onChangeInstanceID(e) {
    onChange(_extends({}, query, {
      cloudIdentifierId: e.target.value
    }));
  };
  var onChangeSupportedPanel = function onChangeSupportedPanel(value) {
    onChange(_extends({}, query, {
      queryString: value
    }));
  };
  var onChangeResponseType = function onChangeResponseType(value) {
    onChange(_extends({}, query, {
      responseType: value
    }));
  };
  var elementType = query.elementType,
    cloudIdentifierId = query.cloudIdentifierId,
    queryString = query.queryString,
    responseType = query.responseType;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_3__.EditorRows, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_3__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Element Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: elementType,
    onChange: function onChange(e) {
      return onChangeElementType(e);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Instance ID"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: cloudIdentifierId,
    onChange: function onChange(e) {
      return onChangeInstanceID(e);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Element ID"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    disabled: true,
    value: elementId
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_3__.EditorRows, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_3__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Supported Panels"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    className: "min-width-12 width-12",
    value: queryString,
    options: supportedPanels,
    onChange: function onChange(e) {
      return onChangeSupportedPanel(e.value);
    },
    menuShouldPortal: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Response Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    className: "min-width-12 width-12",
    value: responseType,
    options: _common_ds__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_TYPE,
    onChange: function onChange(e) {
      return onChangeResponseType(e.value);
    },
    menuShouldPortal: true
  })))));
}

/***/ }),

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSource": () => (/* binding */ DataSource)
/* harmony export */ });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service */ "./service/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var _common_ds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common-ds */ "./common-ds/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var DataSource = /*#__PURE__*/function (_DataSourceWithBacken) {
  _inherits(DataSource, _DataSourceWithBacken);
  var _super = _createSuper(DataSource);
  function DataSource(instanceSettings) {
    var _this;
    _classCallCheck(this, DataSource);
    _this = _super.call(this, instanceSettings);
    _defineProperty(_assertThisInitialized(_this), "service", void 0);
    _defineProperty(_assertThisInitialized(_this), "awsxUrl", void 0);
    _this.service = new _service__WEBPACK_IMPORTED_MODULE_1__.Services(instanceSettings.jsonData.cmdbEndpoint || "", instanceSettings.jsonData.grafanaEndpoint || "");
    instanceSettings.meta.jsonData = JSON.parse(JSON.stringify(instanceSettings.jsonData));
    _this.awsxUrl = instanceSettings.jsonData.awsxEndPoint || "";
    return _this;
  }
  _createClass(DataSource, [{
    key: "findParam",
    value: function findParam(paramName, url) {
      if (!url) {
        url = location.href;
      }
      paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regexS = "[\\?&]" + paramName + "=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(url);
      return results == null ? "" : results[1];
    }
  }, {
    key: "getCloudElements",
    value: function getCloudElements(id) {
      var _this2 = this;
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.from)(this.service.getCloudElements(id).then(function (res) {
        var cloudElementQuery = {};
        if (res && res[0]) {
          var cloudElement = res[0];
          if (cloudElement) {
            cloudElementQuery = (0,_common_ds__WEBPACK_IMPORTED_MODULE_3__.getCloudElementsQuery)(id, cloudElement, _this2.awsxUrl);
          }
        }
        return cloudElementQuery;
      }));
    }
  }, {
    key: "getDefaultQuery",
    value: function getDefaultQuery(_) {
      return _types__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_QUERY;
    }
  }, {
    key: "query",
    value: function query(request) {
      var _this3 = this;
      var id = this.findParam("var-elementId", window.location.href);
      if (id) {
        return this.getCloudElements(id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(function (query) {
          var targets = request.targets;
          for (var i = 0; i < targets.length; i++) {
            targets[i] = _extends({}, targets[i], query);
          }
          return _get(_getPrototypeOf(DataSource.prototype), "query", _this3).call(_this3, request);
        }));
      } else {
        return _get(_getPrototypeOf(DataSource.prototype), "query", this).call(this, request);
      }
    }
  }]);
  return DataSource;
}(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.DataSourceWithBackend);

/***/ }),

/***/ "./extended/EditorRow.tsx":
/*!********************************!*\
  !*** ./extended/EditorRow.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorRow": () => (/* binding */ EditorRow),
/* harmony export */   "EditorRows": () => (/* binding */ EditorRows)
/* harmony export */ });
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/css */ "@emotion/css");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Stack */ "./extended/Stack.tsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var EditorRow = function EditorRow(_ref) {
  var label = _ref.label,
    collapsible = _ref.collapsible,
    _ref$collapsed = _ref.collapsed,
    collapsed = _ref$collapsed === void 0 ? true : _ref$collapsed,
    title = _ref.title,
    dataTestId = _ref.dataTestId,
    children = _ref.children;
  var styles = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.useStyles2)(getStyles);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(collapsed),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  var testId = function testId() {
    var compType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return "infinity-query-row".concat(compType ? '-' + compType : '', "-").concat((dataTestId || label).replace(/\ /g, '-')).toLowerCase();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: styles.root,
    "data-testid": testId('wrapper')
  }, collapsible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: show ? 'angle-down' : 'angle-right',
    fill: "text",
    size: "sm",
    variant: "secondary",
    onClick: function onClick(e) {
      setShow(!show);
      e.preventDefault();
    },
    style: {
      marginRight: '10px'
    },
    "data-testid": testId("collapse-".concat(show ? 'hide' : 'show'))
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    onClick: function onClick(e) {
      setShow(!show);
      e.preventDefault();
    },
    "data-testid": testId("title")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("b", {
    className: styles.collapseTile
  }, label)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: styles.collapseTileSecondary
  }, title ? title() : 'Options')), show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    style: {
      display: 'flex',
      marginTop: label && collapsible ? '15px' : '0px',
      marginLeft: '0px'
    },
    "data-testid": testId("children")
  }, children));
};
var getStyles = function getStyles(theme) {
  return {
    root: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      padding: theme.spacing(1),
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.shape.borderRadius(1)
    }),
    collapseTile: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      marginRight: theme.spacing(1),
      color: theme.colors.secondary.text
    }),
    collapseTileSecondary: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.bodySmall.fontSize,
      '&:hover': {
        color: theme.colors.secondary.text
      }
    })
  };
};
var EditorRows = function EditorRows(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Stack__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    gap: 0.5,
    direction: "column"
  }, children);
};

/***/ }),

/***/ "./extended/Stack.tsx":
/*!****************************!*\
  !*** ./extended/Stack.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stack": () => (/* binding */ Stack)
/* harmony export */ });
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/css */ "@emotion/css");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
var _excluded = ["children"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



var Stack = function Stack(_ref) {
  var children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  var styles = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.useStyles2)((0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (theme) {
    return getStyles(theme, props);
  }, [props]));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: styles.root
  }, children);
};
var getStyles = function getStyles(theme, props) {
  var _props$direction, _props$wrap, _props$gap;
  return {
    root: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      display: 'flex',
      flexDirection: (_props$direction = props.direction) !== null && _props$direction !== void 0 ? _props$direction : 'row',
      flexWrap: ((_props$wrap = props.wrap) !== null && _props$wrap !== void 0 ? _props$wrap : true) ? 'wrap' : undefined,
      alignItems: props.alignItems,
      gap: theme.spacing((_props$gap = props.gap) !== null && _props$gap !== void 0 ? _props$gap : 2),
      flexGrow: props.flexGrow
    })
  };
};

/***/ }),

/***/ "./service/index.ts":
/*!**************************!*\
  !*** ./service/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Services": () => (/* binding */ Services)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// const BASE_URL = "https://api.synectiks.net/cmdb";
// const APPKUBE_URL="http://localhost:3001"
var GET_CLOUD_ELEMENT = "/cloud-element/search";
var GET_SUPPORTED_PANELS = "/cloud-element-supported-api/search";
var Services = /*#__PURE__*/function () {
  function Services(cmdbEndpoint, grafanaEndpoint) {
    _classCallCheck(this, Services);
    _defineProperty(this, "cmdbEndpoint", "");
    _defineProperty(this, "grafanaEndpoint", "");
    this.cmdbEndpoint = cmdbEndpoint;
    this.grafanaEndpoint = grafanaEndpoint;
  }
  _createClass(Services, [{
    key: "getCloudElements",
    value: function getCloudElements(id) {
      return fetch("".concat(this.cmdbEndpoint).concat(GET_CLOUD_ELEMENT, "?id=").concat(id)).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "getSupportedPanels",
    value: function getSupportedPanels(elementType, cloud) {
      return fetch("".concat(this.cmdbEndpoint).concat(GET_SUPPORTED_PANELS, "?elementType=").concat(elementType, "&cloud=").concat(cloud)).then(function (response) {
        return response.json();
      });
    }
  }]);
  return Services;
}();

/***/ }),

/***/ "./types.ts":
/*!******************!*\
  !*** ./types.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_QUERY": () => (/* binding */ DEFAULT_QUERY)
/* harmony export */ });
var DEFAULT_QUERY = {
  constant: 6.5
};

/**
 * These are options configured for each DataSource instance
 */

/***/ }),

/***/ "@emotion/css":
/*!*******************************!*\
  !*** external "@emotion/css" ***!
  \*******************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__emotion_css__;

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/runtime":
/*!***********************************!*\
  !*** external "@grafana/runtime" ***!
  \***********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_runtime__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "plugin": () => (/* binding */ plugin)
/* harmony export */ });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./datasource.ts");
/* harmony import */ var _components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ConfigEditor */ "./components/ConfigEditor.tsx");
/* harmony import */ var _components_QueryEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/QueryEditor */ "./components/QueryEditor.tsx");




var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__.DataSourcePlugin(_datasource__WEBPACK_IMPORTED_MODULE_1__.DataSource).setConfigEditor(_components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__.ConfigEditor).setQueryEditor(_components_QueryEditor__WEBPACK_IMPORTED_MODULE_3__.QueryEditor);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=module.js.map