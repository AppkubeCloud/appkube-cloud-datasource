define(["@emotion/css","@grafana/data","@grafana/runtime","@grafana/ui","react"], (__WEBPACK_EXTERNAL_MODULE__emotion_css__, __WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_react__) => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./common-ds/index.ts":
/*!****************************!*\
  !*** ./common-ds/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DUMMY_ENVS": () => (/* binding */ DUMMY_ENVS),
/* harmony export */   "DUMMY_METRIC_NAME": () => (/* binding */ DUMMY_METRIC_NAME),
/* harmony export */   "DUMMY_MODULES": () => (/* binding */ DUMMY_MODULES),
/* harmony export */   "DUMMY_PRODUCTS": () => (/* binding */ DUMMY_PRODUCTS),
/* harmony export */   "DUMMY_SERVICES": () => (/* binding */ DUMMY_SERVICES),
/* harmony export */   "DUMMY_STASTISTIC": () => (/* binding */ DUMMY_STASTISTIC),
/* harmony export */   "METRIC_EDITOR_MODES": () => (/* binding */ METRIC_EDITOR_MODES),
/* harmony export */   "METRIC_TYPE": () => (/* binding */ METRIC_TYPE),
/* harmony export */   "MetricEditorMode": () => (/* binding */ MetricEditorMode),
/* harmony export */   "SOURCE_TYPE": () => (/* binding */ SOURCE_TYPE),
/* harmony export */   "SOURCE_VALUE": () => (/* binding */ SOURCE_VALUE)
/* harmony export */ });
const SOURCE_VALUE = {
  METRIC: "metric",
  LOG: "log",
  TRACE: "trace",
  API: "api"
};
let MetricEditorMode;
(function (MetricEditorMode) {
  MetricEditorMode[MetricEditorMode["Builder"] = 0] = "Builder";
  MetricEditorMode[MetricEditorMode["Code"] = 1] = "Code";
})(MetricEditorMode || (MetricEditorMode = {}));
const SOURCE_TYPE = [{
  label: 'Metric',
  value: SOURCE_VALUE.METRIC
}, {
  label: 'LOG',
  value: SOURCE_VALUE.LOG
}, {
  label: 'Trace',
  value: SOURCE_VALUE.TRACE
}, {
  label: 'API',
  value: SOURCE_VALUE.API
}];
const METRIC_TYPE = [{
  label: 'INFRA',
  value: "infra"
}, {
  label: 'SERVICE',
  value: "service"
}];
const DUMMY_PRODUCTS = [{
  label: 'HRMS',
  value: "hrms"
}, {
  label: 'Procurement',
  value: "procurement"
}, {
  label: 'Supply Chain',
  value: "supply_chain"
}, {
  label: 'CMS',
  value: "cms"
}];
const DUMMY_ENVS = [{
  label: 'Prod',
  value: "prod"
}, {
  label: 'Dev',
  value: "dev"
}, {
  label: 'Stage',
  value: "stage"
}, {
  label: 'Test',
  value: "test"
}];
const DUMMY_MODULES = [{
  label: 'Recruitment',
  value: "Recruitment"
}, {
  label: 'Attendance',
  value: "Attendance"
}, {
  label: 'Appraisals',
  value: "Appraisals"
}, {
  label: 'Salary',
  value: "Salary"
}, {
  label: 'Engagement',
  value: "Engagement"
}, {
  label: 'Documentation',
  value: "Documentation"
}];
const DUMMY_SERVICES = [{
  label: 'Java app',
  value: "Recruitment"
}, {
  label: 'RDS Postgres DB',
  value: "Attendance"
}, {
  label: 'Open Search DB',
  value: "Appraisals"
}, {
  label: 'S3',
  value: "Salary"
}, {
  label: 'GitHub',
  value: "Engagement"
}];
const DUMMY_METRIC_NAME = [{
  label: 'Metric 1',
  value: "Metric 1"
}, {
  label: 'Metric 2',
  value: "Metric 2"
}, {
  label: 'Metric 3',
  value: "Metric 3"
}];
const DUMMY_STASTISTIC = [{
  label: 'Stastic 1',
  value: "Stastic 1"
}, {
  label: 'Stastic 2',
  value: "Stastic 2"
}, {
  label: 'Stastic 3',
  value: "Stastic 3"
}];
const METRIC_EDITOR_MODES = [{
  label: 'Builder',
  value: MetricEditorMode.Builder
}, {
  label: 'Code',
  value: MetricEditorMode.Code
}];

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


function ConfigEditor(props) {
  const {
    onOptionsChange,
    options
  } = props;
  const onPathChange = event => {
    const jsonData = Object.assign({}, options.jsonData, {
      path: event.target.value
    });
    onOptionsChange(Object.assign({}, options, {
      jsonData
    }));
  };
  const onAPIEndPointChange = event => {
    const jsonData = Object.assign({}, options.jsonData, {
      apiEndpoint: event.target.value
    });
    onOptionsChange(Object.assign({}, options, {
      jsonData
    }));
  };

  // Secure field (only sent to the backend)
  const onAPIKeyChange = event => {
    onOptionsChange(Object.assign({}, options, {
      secureJsonData: {
        apiKey: event.target.value
      }
    }));
  };
  const onResetAPIKey = () => {
    onOptionsChange(Object.assign({}, options, {
      secureJsonFields: Object.assign({}, options.secureJsonFields, {
        apiKey: false
      }),
      secureJsonData: Object.assign({}, options.secureJsonData, {
        apiKey: ''
      })
    }));
  };
  const {
    jsonData,
    secureJsonFields
  } = options;
  const secureJsonData = options.secureJsonData || {};
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "gf-form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Path",
    labelWidth: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    onChange: onPathChange,
    value: jsonData.path || '',
    placeholder: "json field returned to frontend",
    width: 40
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "API Key",
    labelWidth: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.SecretInput, {
    isConfigured: secureJsonFields && secureJsonFields.apiKey,
    value: secureJsonData.apiKey || '',
    placeholder: "Test",
    width: 40,
    onReset: onResetAPIKey,
    onChange: onAPIKeyChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "API Endpoint",
    labelWidth: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    onChange: onAPIEndPointChange,
    value: jsonData.apiEndpoint || '',
    placeholder: "API Endpoint",
    width: 40
  })));
}

/***/ }),

/***/ "./components/EditorComponents/Api.tsx":
/*!*********************************************!*\
  !*** ./components/EditorComponents/Api.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Api": () => (/* binding */ Api)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extended/EditorRow */ "./extended/EditorRow.tsx");
/* harmony import */ var _extended_EditorField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../extended/EditorField */ "./extended/EditorField.tsx");
var _EditorRow, _EditorRow2, _EditorRow3;




function Api(_ref) {
  let {
    query,
    onChange
  } = _ref;
  const {
    elementType,
    instanceID,
    method,
    columns,
    isObjectInsteadOfArray,
    isDataInColumn,
    rowsRoots
  } = query;
  const [allColumns, setAllColumns] = react__WEBPACK_IMPORTED_MODULE_0___default().useState([]);
  const fetchingComplete = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {
    if (fetchingComplete.current === false) {
      setAllColumns(columns ? columns : [{
        selector: "",
        as: "",
        formatAs: ""
      }]);
    }
    fetchingComplete.current = true;
  }, [columns]);
  const onChangeElementType = e => {
    onChange(Object.assign({}, query, {
      elementType: e.target.value
    }));
  };
  const onChangeInstanceID = e => {
    onChange(Object.assign({}, query, {
      instanceID: e.target.value
    }));
  };
  const onChangeMethod = e => {
    onChange(Object.assign({}, query, {
      method: e.target.value
    }));
  };
  const onChangeColumn = (index, columnsList, key, value) => {
    columnsList[index][key] = value;
    onChange(Object.assign({}, query, {
      columns: JSON.parse(JSON.stringify(columnsList))
    }));
  };
  const onClickAddColumn = () => {
    allColumns.push({
      selector: "",
      as: "",
      formatAs: ""
    });
    setAllColumns(JSON.parse(JSON.stringify(allColumns)));
  };
  const onClickRemove = (columns, index) => {
    columns.splice(index, 1);
    setAllColumns(JSON.parse(JSON.stringify(columns)));
  };
  const renderColumns = columns => {
    const retData = [];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      retData.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
        label: "",
        key: `column-${i}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
        label: "Selector"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
        value: column.selector,
        onChange: e => onChangeColumn(i, columns, "selector", e.target.value)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
        label: "as"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
        value: column.as,
        onChange: e => onChangeColumn(i, columns, "as", e.target.value)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
        label: "Format as"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
        value: column.formatAs,
        onChange: e => onChangeColumn(i, columns, "formatAs", e.target.value)
      })), columns.length > 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
        onClick: () => onClickRemove(columns, i),
        icon: "times"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null)));
    }
    return retData;
  };
  const onChangeObjectArray = e => {
    onChange(Object.assign({}, query, {
      isObjectInsteadOfArray: e.target.checked
    }));
  };
  const onChangeDataInColumn = e => {
    onChange(Object.assign({}, query, {
      isDataInColumn: e.target.checked
    }));
  };
  const onChangeRowsRoots = e => {
    onChange(Object.assign({}, query, {
      rowsRoots: e.target.value
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRows, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Element Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: elementType,
    onChange: e => onChangeElementType(e)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Instance ID"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: instanceID,
    onChange: e => onChangeInstanceID(e)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Method"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: method,
    onChange: e => onChangeMethod(e)
  }))), _EditorRow || (_EditorRow = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h5", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("b", null, "Parsing Option and Result Field")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorField__WEBPACK_IMPORTED_MODULE_3__.EditorField, {
    label: "Rows/Root - Optional"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
    value: rowsRoots,
    onChange: onChangeRowsRoots,
    placeholder: "Rows/Root Selector"
  }))), _EditorRow2 || (_EditorRow2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Rows/Root - Optional"))), renderColumns(allColumns), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: "Column - Optional"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: onClickAddColumn,
    icon: "plus-square"
  }, "Column")), _EditorRow3 || (_EditorRow3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Advance Options - Optional"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
    value: isObjectInsteadOfArray,
    label: "Root returns object instead of array?",
    onChange: onChangeObjectArray
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
    value: isDataInColumn,
    label: "Is data in column format?",
    onChange: onChangeDataInColumn
  })));
}

/***/ }),

/***/ "./components/EditorComponents/Log.tsx":
/*!*********************************************!*\
  !*** ./components/EditorComponents/Log.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Log": () => (/* binding */ Log)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extended/EditorRow */ "./extended/EditorRow.tsx");



// import { DUMMY_PRODUCTS, DUMMY_ENVS, DUMMY_MODULES, DUMMY_SERVICES } from '../../common-ds';

function Log(_ref) {
  let {
    query,
    onChange
  } = _ref;
  const {
    elementType,
    instanceID,
    logQuery,
    logGroup
  } = query;
  const onChangeElementType = e => {
    onChange(Object.assign({}, query, {
      elementType: e.target.value
    }));
  };
  const onChangeInstanceID = e => {
    onChange(Object.assign({}, query, {
      instanceID: e.target.value
    }));
  };
  const onChangeLogGroup = e => {
    onChange(Object.assign({}, query, {
      logGroup: e.target.value
    }));
  };
  const onChangeLogQuery = e => {
    onChange(Object.assign({}, query, {
      logQuery: e.target.value
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRows, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Element Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: elementType,
    onChange: e => onChangeElementType(e)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Instance ID"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: instanceID,
    onChange: e => onChangeInstanceID(e)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Log Group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: logGroup,
    onChange: e => onChangeLogGroup(e)
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    placeholder: "Enter your log query",
    value: logQuery,
    onChange: e => onChangeLogQuery(e)
  })));
}

/***/ }),

/***/ "./components/EditorComponents/Metric.tsx":
/*!************************************************!*\
  !*** ./components/EditorComponents/Metric.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Metric": () => (/* binding */ Metric)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extended/EditorRow */ "./extended/EditorRow.tsx");
/* harmony import */ var _common_ds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common-ds */ "./common-ds/index.ts");




function Metric(_ref) {
  let {
    query,
    onChange,
    editorMode
  } = _ref;
  const {
    elementType,
    cloudIdentifierId,
    MetricName,
    statistic,
    metricQuery
  } = query;
  const onChangeElementType = e => {
    onChange(Object.assign({}, query, {
      elementType: e.target.value
    }));
  };
  const onChangeInstanceID = e => {
    onChange(Object.assign({}, query, {
      cloudIdentifierId: e.target.value
    }));
  };
  const onChangeMetricQuery = e => {
    onChange(Object.assign({}, query, {
      metricQuery: e.target.value
    }));
  };
  const onChangeMetricName = value => {
    onChange(Object.assign({}, query, {
      MetricName: value
    }));
  };
  const onChangeStatistic = value => {
    onChange(Object.assign({}, query, {
      statistic: value
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRows, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Element Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: elementType,
    onChange: e => onChangeElementType(e)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Instance ID"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: cloudIdentifierId,
    onChange: e => onChangeInstanceID(e)
  }))), editorMode === _common_ds__WEBPACK_IMPORTED_MODULE_3__.MetricEditorMode.Builder ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Metric Name"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    className: "min-width-12 width-12",
    value: MetricName,
    options: _common_ds__WEBPACK_IMPORTED_MODULE_3__.DUMMY_METRIC_NAME,
    onChange: e => onChangeMetricName(e.value),
    menuShouldPortal: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Statistic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    className: "min-width-12 width-12",
    value: statistic,
    options: _common_ds__WEBPACK_IMPORTED_MODULE_3__.DUMMY_STASTISTIC,
    onChange: e => onChangeStatistic(e.value),
    menuShouldPortal: true
  }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    placeholder: "Enter your query",
    value: metricQuery,
    onChange: e => onChangeMetricQuery(e)
  })));
}

/***/ }),

/***/ "./components/EditorComponents/Trace.tsx":
/*!***********************************************!*\
  !*** ./components/EditorComponents/Trace.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Trace": () => (/* binding */ Trace)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extended/EditorRow */ "./extended/EditorRow.tsx");



function Trace(_ref) {
  let {
    query,
    onChange
  } = _ref;
  const {
    elementType,
    instanceID,
    traceQuery,
    traceLocation
  } = query;
  const onChangeElementType = e => {
    onChange(Object.assign({}, query, {
      elementType: e.target.value
    }));
  };
  const onChangeInstanceID = e => {
    onChange(Object.assign({}, query, {
      instanceID: e.target.value
    }));
  };
  const onChangeTraceLocation = e => {
    onChange(Object.assign({}, query, {
      traceLocation: e.target.value
    }));
  };
  const onChangeTraceQuery = e => {
    onChange(Object.assign({}, query, {
      traceQuery: e.target.value
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRows, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Element Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: elementType,
    onChange: e => onChangeElementType(e)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Instance ID"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: instanceID,
    onChange: e => onChangeInstanceID(e)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Trace Location"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    value: traceLocation,
    onChange: e => onChangeTraceLocation(e)
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_extended_EditorRow__WEBPACK_IMPORTED_MODULE_2__.EditorRow, {
    label: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    placeholder: "Enter your trace query",
    value: traceQuery,
    onChange: e => onChangeTraceQuery(e)
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
/* harmony import */ var _EditorComponents_Metric__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorComponents/Metric */ "./components/EditorComponents/Metric.tsx");
/* harmony import */ var _EditorComponents_Log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditorComponents/Log */ "./components/EditorComponents/Log.tsx");
/* harmony import */ var _EditorComponents_Trace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditorComponents/Trace */ "./components/EditorComponents/Trace.tsx");
/* harmony import */ var _EditorComponents_Api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EditorComponents/Api */ "./components/EditorComponents/Api.tsx");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../service */ "./service/index.ts");








function QueryEditor(_ref) {
  let {
    query,
    onChange,
    onRunQuery
  } = _ref;
  const [elementId, setElementId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const onChanged = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const getCloudElements = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id, query) => {
    _service__WEBPACK_IMPORTED_MODULE_7__.services.getCloudElements(id).then(res => {
      if (res && res[0]) {
        const cloudElement = res[0];
        query = Object.assign({}, query, {
          "elementType": cloudElement.elementType,
          "elementId": parseInt(id, 10),
          "cloudIdentifierName": cloudElement.instanceName,
          "cloudIdentifierId": cloudElement.instanceId,
          "type": "appkube-cloudwatch",
          "queryMode": "Metrics",
          "source": "url",
          "productId": 1,
          "environmentId": parseInt(id, 10),
          "moduleId": 2,
          "serviceId": 2,
          "serviceType": "java app service",
          "cmdbUrl": "",
          "vaultUrl": "",
          "namespace": "AWS/EC2",
          "metricName": "CPUUtilization",
          "statistic": "Average",
          "matchExact": true,
          "expression": "",
          "id": "",
          "alias": "",
          "period": "",
          "metricQueryType": 0,
          "metricEditorMode": 0,
          "sqlExpression": "",
          "accountId": "657907747545",
          "region": ""
        });
        onChange(Object.assign({}, query));
      }
    });
  }, [onChange]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (onChanged.current === false) {
      const id = findParam("var-elementId", window.location.href);
      if (id) {
        setElementId(id);
        getCloudElements(id, query);
      } else {
        alert("Please set 'elementId' variable");
      }
      onChanged.current = true;
    }
  }, [query, onChange, getCloudElements]);
  const findParam = (paramName, url) => {
    if (!url) {
      url = location.href;
    }
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    const regexS = "[\\?&]" + paramName + "=([^&#]*)";
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    return results == null ? "" : results[1];
  };
  const onSourceTypeChange = value => {
    if (value === _common_ds__WEBPACK_IMPORTED_MODULE_2__.SOURCE_VALUE.METRIC) {
      query.queryType = 'timeSeriesQuery';
    } else if (value === _common_ds__WEBPACK_IMPORTED_MODULE_2__.SOURCE_VALUE.LOG) {
      query.queryType = 'logAction';
    }
    query.sourceType = value;
    if (!elementId) {
      const id = findParam("var-elementId", window.location.href);
      if (id) {
        setElementId(id);
        getCloudElements(id, query);
      } else {
        alert("Please set 'elementId' variable");
      }
    } else {
      getCloudElements(elementId, query);
    }
  };
  const onMetricTypeChange = value => {
    onChange(Object.assign({}, query, {
      metricType: value
    }));
  };
  const onChangeData = value => {
    onChange(Object.assign({}, query, value));
  };
  const {
    sourceType,
    metricType,
    metricEditorMode
  } = query;
  const defaultMetricMode = metricEditorMode ? metricEditorMode : _common_ds__WEBPACK_IMPORTED_MODULE_2__.MetricEditorMode.Builder;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Source Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    className: "min-width-12 width-12",
    value: sourceType,
    options: _common_ds__WEBPACK_IMPORTED_MODULE_2__.SOURCE_TYPE,
    onChange: e => onSourceTypeChange(e.value),
    menuShouldPortal: true
  })), sourceType === _common_ds__WEBPACK_IMPORTED_MODULE_2__.SOURCE_VALUE.METRIC ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Source Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    className: "min-width-12 width-12",
    value: metricType,
    options: _common_ds__WEBPACK_IMPORTED_MODULE_2__.METRIC_TYPE,
    onChange: e => onMetricTypeChange(e.value),
    menuShouldPortal: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.InlineField, {
    label: "Element ID"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    disabled: true,
    value: elementId
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "block",
      flexGrow: "1"
    }
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, sourceType === _common_ds__WEBPACK_IMPORTED_MODULE_2__.SOURCE_VALUE.METRIC ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_EditorComponents_Metric__WEBPACK_IMPORTED_MODULE_3__.Metric, {
    query: query,
    onChange: onChangeData,
    editorMode: defaultMetricMode
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null), sourceType === _common_ds__WEBPACK_IMPORTED_MODULE_2__.SOURCE_VALUE.LOG ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_EditorComponents_Log__WEBPACK_IMPORTED_MODULE_4__.Log, {
    query: query,
    onChange: onChangeData
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null), sourceType === _common_ds__WEBPACK_IMPORTED_MODULE_2__.SOURCE_VALUE.TRACE ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_EditorComponents_Trace__WEBPACK_IMPORTED_MODULE_5__.Trace, {
    query: query,
    onChange: onChangeData
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null), sourceType === _common_ds__WEBPACK_IMPORTED_MODULE_2__.SOURCE_VALUE.API ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_EditorComponents_Api__WEBPACK_IMPORTED_MODULE_6__.Api, {
    query: query,
    onChange: onChangeData
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null)));
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
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./types.ts");


class DataSource extends _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.DataSourceWithBackend {
  constructor(instanceSettings) {
    super(instanceSettings);
  }
  getDefaultQuery(_) {
    return _types__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_QUERY;
  }
  query(request) {
    return super.query(request);
  }
  applyTemplateVariables(query, scopedVars) {
    return super.applyTemplateVariables(query, scopedVars);
  }
}

/***/ }),

/***/ "./extended/EditorField.tsx":
/*!**********************************!*\
  !*** ./extended/EditorField.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorField": () => (/* binding */ EditorField),
/* harmony export */   "EditorFieldGroup": () => (/* binding */ EditorFieldGroup)
/* harmony export */ });
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/css */ "@emotion/css");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Space */ "./extended/Space.tsx");
/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stack */ "./extended/Stack.tsx");
var _Space;
const _excluded = ["label", "optional", "tooltip", "children", "promoNode", "width", "invalid", "borderColor", "tag", "dataTestId", "horizontal"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const EditorFieldGroup = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Stack__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    gap: 1
  }, children);
};
const EditorField = props => {
  const {
      label,
      optional,
      tooltip,
      children,
      promoNode,
      width,
      invalid,
      borderColor,
      tag,
      dataTestId,
      horizontal
    } = props,
    fieldProps = _objectWithoutPropertiesLoose(props, _excluded);
  const theme = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.useTheme2)();
  const styles = getStyles(theme, width, invalid ? 'red' : borderColor, horizontal);

  // Null check for backward compatibility
  const childInputId = (fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.htmlFor) || (_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.ReactUtils === null || _grafana_ui__WEBPACK_IMPORTED_MODULE_2__.ReactUtils === void 0 ? void 0 : _grafana_ui__WEBPACK_IMPORTED_MODULE_2__.ReactUtils.getChildId(children));
  const testId = function () {
    let compType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return `infinity-query-field${compType ? '-' + compType : ''}-${(dataTestId || label).replace(/\ /g, '-')}`.toLowerCase();
  };
  const labelEl = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
    className: styles.label,
    htmlFor: childInputId,
    "data-testid": testId('label')
  }, label, tag && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.Tag, {
    name: tag,
    className: styles.tag,
    colorIndex: 10
  }), optional && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: styles.optional
  }, " - optional"), promoNode, tooltip && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
    placement: "top",
    content: tooltip,
    theme: "info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.Icon, {
    name: "info-circle",
    size: "sm",
    className: styles.icon
  }))), _Space || (_Space = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Space__WEBPACK_IMPORTED_MODULE_3__.Space, {
    v: 0.5
  })));
  if (horizontal) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: styles.root,
      "data-testid": testId('wrapper')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.Field, _extends({
      className: styles.field,
      label: labelEl
    }, fieldProps, {
      horizontal: true
    }), children));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: styles.root,
    "data-testid": testId('wrapper')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.Field, _extends({
    className: styles.field,
    label: labelEl
  }, fieldProps), children));
};
const getStyles = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.stylesFactory)(function (theme, width) {
  let borderColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'transparent';
  let horizontal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return {
    root: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      minWidth: theme.spacing(width !== null && width !== void 0 ? width : 0),
      paddingInlineStart: '7px',
      paddingInlineEnd: '5px',
      borderLeft: `1px solid ${borderColor}`,
      marginRight: horizontal ? '10px' : '5px'
    }),
    label: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      paddingLeft: '1px',
      border: horizontal ? `1px solid ${borderColor}` : '',
      padding: horizontal ? '5px 10px 5px 0px' : '',
      textAlign: horizontal ? 'right' : 'left'
    }),
    tag: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      marginLeft: '10px'
    }),
    optional: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      fontStyle: 'italic',
      color: theme.colors.text.secondary
    }),
    field: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      marginBottom: 0,
      // GrafanaUI/Field has a bottom margin which we must remove
      marginRight: '0px'
    }),
    icon: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)({
      color: theme.colors.text.secondary,
      marginLeft: theme.spacing(1),
      ':hover': {
        color: theme.colors.text.primary
      }
    })
  };
});

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




const EditorRow = _ref => {
  let {
    label,
    collapsible,
    collapsed = true,
    title,
    dataTestId,
    children
  } = _ref;
  const styles = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.useStyles2)(getStyles);
  const [show, setShow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(collapsed);
  const testId = function () {
    let compType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return `infinity-query-row${compType ? '-' + compType : ''}-${(dataTestId || label).replace(/\ /g, '-')}`.toLowerCase();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: styles.root,
    "data-testid": testId('wrapper')
  }, collapsible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: show ? 'angle-down' : 'angle-right',
    fill: "text",
    size: "sm",
    variant: "secondary",
    onClick: e => {
      setShow(!show);
      e.preventDefault();
    },
    style: {
      marginRight: '10px'
    },
    "data-testid": testId(`collapse-${show ? 'hide' : 'show'}`)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    onClick: e => {
      setShow(!show);
      e.preventDefault();
    },
    "data-testid": testId(`title`)
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
    "data-testid": testId(`children`)
  }, children));
};
const getStyles = theme => {
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
const EditorRows = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Stack__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    gap: 0.5,
    direction: "column"
  }, children);
};

/***/ }),

/***/ "./extended/Space.tsx":
/*!****************************!*\
  !*** ./extended/Space.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Space": () => (/* binding */ Space)
/* harmony export */ });
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/css */ "@emotion/css");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);



const Space = props => {
  const theme = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.useTheme2)();
  const styles = getStyles(theme, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.cx)(styles.wrapper)
  });
};
Space.defaultProps = {
  v: 0,
  h: 0,
  layout: 'block'
};
const getStyles = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.stylesFactory)((theme, props) => {
  var _props$h, _props$v;
  return {
    wrapper: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)([{
      paddingRight: theme.spacing((_props$h = props.h) !== null && _props$h !== void 0 ? _props$h : 0),
      paddingBottom: theme.spacing((_props$v = props.v) !== null && _props$v !== void 0 ? _props$v : 0)
    }, props.layout === 'inline' && {
      display: 'inline-block'
    }, props.layout === 'block' && {
      display: 'block'
    }])
  };
});

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
const _excluded = ["children"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const Stack = _ref => {
  let {
      children
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const styles = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_2__.useStyles2)((0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(theme => getStyles(theme, props), [props]));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: styles.root
  }, children);
};
const getStyles = (theme, props) => {
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
/* harmony export */   "services": () => (/* binding */ services)
/* harmony export */ });
const BASE_URL = "http://34.199.12.114:6057";
const GET_CLOUD_ELEMENT = "/api/cloud-element/search";
const services = {
  getCloudElements: function (id) {
    return fetch(`${BASE_URL}${GET_CLOUD_ELEMENT}?id=${id}`).then(response => response.json());
  }
};

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
const DEFAULT_QUERY = {
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




const plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__.DataSourcePlugin(_datasource__WEBPACK_IMPORTED_MODULE_1__.DataSource).setConfigEditor(_components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__.ConfigEditor).setQueryEditor(_components_QueryEditor__WEBPACK_IMPORTED_MODULE_3__.QueryEditor);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=module.js.map