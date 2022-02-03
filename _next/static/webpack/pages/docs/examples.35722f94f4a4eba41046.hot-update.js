webpackHotUpdate_N_E("pages/docs/examples",{

/***/ "./pages/docs/examples.tsx":
/*!*********************************!*\
  !*** ./pages/docs/examples.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-calendar-datetime-picker */ "./node_modules/react-calendar-datetime-picker/dist/index.js");
/* harmony import */ var react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Component */ "./Component/index.ts");
/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-syntax-highlighter */ "./node_modules/react-syntax-highlighter/dist/esm/index.js");
/* harmony import */ var react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-syntax-highlighter/dist/cjs/styles/hljs */ "./node_modules/react-syntax-highlighter/dist/cjs/styles/hljs/index.js");
/* harmony import */ var react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Constant/sampleString */ "./Constant/sampleString.ts");


var _jsxFileName = "D:\\MyselfProject\\react-calendar-datetime-picker\\website\\pages\\docs\\examples.tsx",
    _this = undefined,
    _s = $RefreshSig$();





 // import { ReactComponent as ArrowLeft } from '../../Component/Icons/arrow-left.svg'
// import { ReactComponent as ArrowRight } from '../../Component/Icons/arrow-right.svg'



var App = function App() {
  _s();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      singleExample = _useState[0],
      setSingleExample = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    year: 2019,
    month: 3,
    day: 20
  }),
      singleInitValueExample = _useState2[0],
      setSingleInitValueExample = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    year: 2010,
    month: 3,
    day: 22
  }),
      singleInitValueExampleAsync = _useState3[0],
      setSingleInitValueExampleAsync = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      singlePersianExample = _useState4[0],
      setSinglePersianExample = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      rangeExample = _useState5[0],
      setRangeExample = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      rangeInitValueExample = _useState6[0],
      setRangeInitValueExample = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      multiExample = _useState7[0],
      setMultiExample = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      multiInitialValueExample = _useState8[0],
      setMultiInitialValueExample = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      singleTimeExample = _useState9[0],
      setSingleTimeExample = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      displayingOption = _useState10[0],
      setDisplayingOption = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      callBackApi = _useState11[0],
      setCallBackApi = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      open = _useState12[0],
      setOpen = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      close = _useState13[0],
      setClose = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      change = _useState14[0],
      setChange = _useState14[1];

  var handleCalendarChange = function handleCalendarChange(newDate) {
    console.log(newDate);
    console.log('Calendar changed');
    setChange(change + 1);
  };

  var handleCalendarClose = function handleCalendarClose() {
    setClose(close + 1);
    console.log('Calendar closed');
  };

  var handleCalendarOpen = function handleCalendarOpen() {
    setOpen(open + 1);
    console.log('Calendar opened');
  };

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      minMax = _useState15[0],
      setMinMax = _useState15[1];

  var maxDate = {
    year: 2016,
    month: 6,
    day: 23
  };
  var minDate = {
    year: 2012,
    month: 5,
    day: 2
  };

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      disabledDate = _useState16[0],
      setDisabledDate = _useState16[1];

  var disabledDatesList = [{
    year: 2016,
    month: 6,
    day: 15
  }, {
    year: 2016,
    month: 6,
    day: 12
  }, {
    year: 2016,
    month: 6,
    day: 10
  }];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      withoutInput = _useState17[0],
      setWithoutInput = _useState17[1];

  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      autoCloseFalse = _useState18[0],
      setAutoCloseFalse = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      customIcons = _useState19[0],
      setCustomIcons = _useState19[1];

  var updateInitValue = function updateInitValue() {
    setSingleInitValueExampleAsync({
      year: 2021,
      month: 12,
      day: 25
    });
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_Component__WEBPACK_IMPORTED_MODULE_3__["DocLayout"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "mb-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "selectSingleDay",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Select single day"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-3/4 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["singleExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 115,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 114,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setSingleExample
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 124,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singleExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 125,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 123,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "SingleDayWithInitialDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Single day with initial date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["singleInitValueExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 138,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 137,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            initValue: singleInitValueExample,
            onChange: setSingleInitValueExample
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 147,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singleInitValueExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 151,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "updateInitialDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Update initial date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["singleUpdateInitValueExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 163,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
            onClick: updateInitValue,
            className: "btn rounded-0 mb-2",
            children: "Update init value"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 173,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            initValue: singleInitValueExampleAsync,
            onChange: setSingleInitValueExampleAsync
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 176,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singleInitValueExampleAsync, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 180,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 172,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 162,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "selectSinglePersian(Jalali)day",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Select single Jalali day"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 185,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["singlePersianExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 193,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 192,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setSinglePersianExample,
            local: "fa",
            showWeekend: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 202,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singlePersianExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 207,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 201,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "selectAListOfDaysBetweenTwoDays",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Select a list of days between two days"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 212,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["rangeExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 220,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 219,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setRangeExample,
            type: "range"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 229,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(rangeExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 230,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 218,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 211,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "rangeOfDaysWithInitialDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Range of days with initial date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 235,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["rangeInitValueEExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 243,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 242,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            initValue: {
              from: {
                year: 2012,
                month: 5,
                day: 2
              },
              to: {
                year: 2012,
                month: 5,
                day: 23
              }
            },
            onChange: setRangeInitValueExample,
            type: "range"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 252,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(rangeInitValueExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 260,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 251,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 241,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "selectMultiDays",
        className: "text-2xl font-bold mb-4  scroll-offset",
        children: "Select multi days"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 265,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["multiExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 273,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 272,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setMultiExample,
            type: "multi"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 282,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(multiExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 283,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 281,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 271,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 264,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "multiDaysWithInitialDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Multi days with initial date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 288,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["multiInitialValueExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 296,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 295,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            initValue: [{
              year: 2012,
              month: 5,
              day: 29,
              hour: 18,
              minute: 11
            }, {
              year: 2012,
              month: 5,
              day: 2,
              hour: 18,
              minute: 11
            }, {
              year: 2012,
              month: 6,
              day: 3,
              hour: 18,
              minute: 11
            }],
            onChange: setMultiInitialValueExample,
            type: "multi"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 305,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(multiInitialValueExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 332,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 304,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 294,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "singleDayWithTime",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Single day with time"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 337,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["singleTimeExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 345,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 344,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setSingleTimeExample,
            withTime: true,
            showTimeInput: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 354,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singleTimeExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 355,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 353,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 343,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 336,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "showWeekendClearBtnAndTodayBtnOptions",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "ShowWeekend,year list style, clearBtn and todayBtn options"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 360,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["displayingOptionExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 368,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 367,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setDisplayingOption,
            showWeekend: true,
            clearBtn: true,
            todayBtn: true,
            yearListStyle: "list"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 377,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(displayingOption, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 384,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 376,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 366,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 359,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "openCloseAndChangeCallbackApi",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: ["Open, close and change callback api", ' ', /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
          className: "text-sm",
          children: ["(", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            children: "Note"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 395,
            columnNumber: 8
          }, _this), ": onCalenderChange only works correctly if you pass initValue )"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 394,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 389,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["callbackApiExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 401,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 400,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["open: ", open]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 410,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["change: ", change]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 411,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["close: ", close]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 412,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            type: "single",
            initValue: callBackApi,
            onChange: setCallBackApi,
            onCalenderChange: handleCalendarChange,
            onCalenderShow: handleCalendarOpen,
            onCalenderHide: handleCalendarClose
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 413,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(callBackApi, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 421,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 409,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 399,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 388,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "setMinimumAndMaximumDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Set minimum and maximum date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 426,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["minMaxExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 434,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 433,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setMinMax,
            minDate: minDate,
            maxDate: maxDate
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 443,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(minMax, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 448,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 442,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 432,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 425,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "setAListOfDisabledDates",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Set a list of disabled dates"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 453,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["disabledExampleStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 461,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 460,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setDisabledDate,
            disabledDates: disabledDatesList,
            minDate: minDate,
            maxDate: maxDate
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 470,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(disabledDate, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 476,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 469,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 459,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 452,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "AutoClose",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "AutoClose : false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 481,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["autoCloseStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 486,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 485,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "mt-4",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
              onChange: setAutoCloseFalse,
              autoClose: false
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 496,
              columnNumber: 8
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 495,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            className: "mt-4",
            children: JSON.stringify(autoCloseFalse, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 498,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 494,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 484,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 480,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "WithoutInput",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Without input"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 505,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["withoutInputStr"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 510,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 509,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "mt-4",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2__["DtCalendar"], {
              onChange: setWithoutInput
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 520,
              columnNumber: 8
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 519,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            className: "mt-4",
            children: JSON.stringify(withoutInput, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 522,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 518,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 508,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 504,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "CustomCalender",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Custom calendar: icons - input placeholder - styles"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 528,
        columnNumber: 5
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "block xl:flex ",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "javascript",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["customCalender"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 536,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("br", {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 543,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h4", {
            className: "text-lg",
            children: "Style"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 544,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "css",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["customCalenderStyle"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 545,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 535,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setCustomIcons // NextBtnIcon={ArrowRight}
            // PreviousBtnIcon={ArrowLeft}
            ,
            placeholder: "select date",
            fromLabel: "From date",
            toLabel: "To date",
            type: "range",
            inputClass: "custom-input",
            headerClass: "custom-header",
            daysClass: "custom-days"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 554,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(customIcons, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 566,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 553,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 534,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 527,
      columnNumber: 4
    }, _this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 3
  }, _this);
};

_s(App, "hqTwK8G87apRbUmGZ5wiIThFbI4=");

_c = App;
/* harmony default export */ __webpack_exports__["default"] = (App);

var _c;

$RefreshReg$(_c, "App");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvZG9jcy9leGFtcGxlcy50c3giXSwibmFtZXMiOlsiQXBwIiwidXNlU3RhdGUiLCJzaW5nbGVFeGFtcGxlIiwic2V0U2luZ2xlRXhhbXBsZSIsInllYXIiLCJtb250aCIsImRheSIsInNpbmdsZUluaXRWYWx1ZUV4YW1wbGUiLCJzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlIiwic2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jIiwic2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jIiwic2luZ2xlUGVyc2lhbkV4YW1wbGUiLCJzZXRTaW5nbGVQZXJzaWFuRXhhbXBsZSIsInJhbmdlRXhhbXBsZSIsInNldFJhbmdlRXhhbXBsZSIsInJhbmdlSW5pdFZhbHVlRXhhbXBsZSIsInNldFJhbmdlSW5pdFZhbHVlRXhhbXBsZSIsIm11bHRpRXhhbXBsZSIsInNldE11bHRpRXhhbXBsZSIsIm11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZSIsInNldE11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZSIsInNpbmdsZVRpbWVFeGFtcGxlIiwic2V0U2luZ2xlVGltZUV4YW1wbGUiLCJkaXNwbGF5aW5nT3B0aW9uIiwic2V0RGlzcGxheWluZ09wdGlvbiIsImNhbGxCYWNrQXBpIiwic2V0Q2FsbEJhY2tBcGkiLCJvcGVuIiwic2V0T3BlbiIsImNsb3NlIiwic2V0Q2xvc2UiLCJjaGFuZ2UiLCJzZXRDaGFuZ2UiLCJoYW5kbGVDYWxlbmRhckNoYW5nZSIsIm5ld0RhdGUiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2FsZW5kYXJDbG9zZSIsImhhbmRsZUNhbGVuZGFyT3BlbiIsIm1pbk1heCIsInNldE1pbk1heCIsIm1heERhdGUiLCJtaW5EYXRlIiwiZGlzYWJsZWREYXRlIiwic2V0RGlzYWJsZWREYXRlIiwiZGlzYWJsZWREYXRlc0xpc3QiLCJ3aXRob3V0SW5wdXQiLCJzZXRXaXRob3V0SW5wdXQiLCJhdXRvQ2xvc2VGYWxzZSIsInNldEF1dG9DbG9zZUZhbHNlIiwiY3VzdG9tSWNvbnMiLCJzZXRDdXN0b21JY29ucyIsInVwZGF0ZUluaXRWYWx1ZSIsInRvbW9ycm93TmlnaHRFaWdodGllcyIsInNpbmdsZUV4YW1wbGVTdHIiLCJKU09OIiwic3RyaW5naWZ5Iiwic2luZ2xlSW5pdFZhbHVlRXhhbXBsZVN0ciIsInNpbmdsZVVwZGF0ZUluaXRWYWx1ZUV4YW1wbGVTdHIiLCJzaW5nbGVQZXJzaWFuRXhhbXBsZVN0ciIsInJhbmdlRXhhbXBsZVN0ciIsInJhbmdlSW5pdFZhbHVlRUV4YW1wbGVTdHIiLCJmcm9tIiwidG8iLCJtdWx0aUV4YW1wbGVTdHIiLCJtdWx0aUluaXRpYWxWYWx1ZUV4YW1wbGVTdHIiLCJob3VyIiwibWludXRlIiwic2luZ2xlVGltZUV4YW1wbGVTdHIiLCJkaXNwbGF5aW5nT3B0aW9uRXhhbXBsZVN0ciIsImNhbGxiYWNrQXBpRXhhbXBsZVN0ciIsIm1pbk1heEV4YW1wbGVTdHIiLCJkaXNhYmxlZEV4YW1wbGVTdHIiLCJhdXRvQ2xvc2VTdHIiLCJ3aXRob3V0SW5wdXRTdHIiLCJjdXN0b21DYWxlbmRlciIsImN1c3RvbUNhbGVuZGVyU3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtDQUVBO0FBQ0E7O0FBQ0E7O0FBb0JBLElBQU1BLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQU07QUFBQTs7QUFBQSxrQkFDeUJDLHNEQUFRLENBQUMsSUFBRCxDQURqQztBQUFBLE1BQ1ZDLGFBRFU7QUFBQSxNQUNLQyxnQkFETDs7QUFBQSxtQkFFMkNGLHNEQUFRLENBQUM7QUFDcEVHLFFBQUksRUFBRSxJQUQ4RDtBQUVwRUMsU0FBSyxFQUFFLENBRjZEO0FBR3BFQyxPQUFHLEVBQUU7QUFIK0QsR0FBRCxDQUZuRDtBQUFBLE1BRVZDLHNCQUZVO0FBQUEsTUFFY0MseUJBRmQ7O0FBQUEsbUJBUWhCUCxzREFBUSxDQUFDO0FBQUVHLFFBQUksRUFBRSxJQUFS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YUM7QUFBQSxzQkFBTUksSUFBSSxDQUFDQyxTQUFMLENBQWVOLFdBQWYsRUFBNEIsSUFBNUIsRUFBa0MsQ0FBbEM7QUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFuQkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBUEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBdGFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUREO0FBb2RBLENBaGlCRDs7R0FBTWxELEc7O0tBQUFBLEc7QUFraUJTQSxrRUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9kb2NzL2V4YW1wbGVzLjM1NzIyZjk0ZjRhNGViYTQxMDQ2LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgRHRQaWNrZXIsIHsgRHRDYWxlbmRhciB9IGZyb20gJ3JlYWN0LWNhbGVuZGFyLWRhdGV0aW1lLXBpY2tlcidcclxuaW1wb3J0IHsgRG9jTGF5b3V0IH0gZnJvbSAnLi4vLi4vQ29tcG9uZW50J1xyXG5pbXBvcnQgU3ludGF4SGlnaGxpZ2h0ZXIgZnJvbSAncmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyJ1xyXG5pbXBvcnQgeyB0b21vcnJvd05pZ2h0RWlnaHRpZXMgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXIvZGlzdC9janMvc3R5bGVzL2hsanMnXHJcbi8vIGltcG9ydCB7IFJlYWN0Q29tcG9uZW50IGFzIEFycm93TGVmdCB9IGZyb20gJy4uLy4uL0NvbXBvbmVudC9JY29ucy9hcnJvdy1sZWZ0LnN2ZydcclxuLy8gaW1wb3J0IHsgUmVhY3RDb21wb25lbnQgYXMgQXJyb3dSaWdodCB9IGZyb20gJy4uLy4uL0NvbXBvbmVudC9JY29ucy9hcnJvdy1yaWdodC5zdmcnXHJcbmltcG9ydCB7XHJcblx0c2luZ2xlRXhhbXBsZVN0cixcclxuXHRzaW5nbGVQZXJzaWFuRXhhbXBsZVN0cixcclxuXHRyYW5nZUV4YW1wbGVTdHIsXHJcblx0bXVsdGlFeGFtcGxlU3RyLFxyXG5cdHNpbmdsZVRpbWVFeGFtcGxlU3RyLFxyXG5cdGRpc3BsYXlpbmdPcHRpb25FeGFtcGxlU3RyLFxyXG5cdGNhbGxiYWNrQXBpRXhhbXBsZVN0cixcclxuXHRtaW5NYXhFeGFtcGxlU3RyLFxyXG5cdGRpc2FibGVkRXhhbXBsZVN0cixcclxuXHRzaW5nbGVJbml0VmFsdWVFeGFtcGxlU3RyLFxyXG5cdHJhbmdlSW5pdFZhbHVlRUV4YW1wbGVTdHIsXHJcblx0bXVsdGlJbml0aWFsVmFsdWVFeGFtcGxlU3RyLFxyXG5cdGN1c3RvbUNhbGVuZGVyLFxyXG5cdGN1c3RvbUNhbGVuZGVyU3R5bGUsXHJcblx0d2l0aG91dElucHV0U3RyLFxyXG5cdHNpbmdsZVVwZGF0ZUluaXRWYWx1ZUV4YW1wbGVTdHIsXHJcblx0YXV0b0Nsb3NlU3RyXHJcbn0gZnJvbSAnLi4vLi4vQ29uc3RhbnQvc2FtcGxlU3RyaW5nJ1xyXG5cclxuY29uc3QgQXBwID0gKCkgPT4ge1xyXG5cdGNvbnN0IFtzaW5nbGVFeGFtcGxlLCBzZXRTaW5nbGVFeGFtcGxlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW3NpbmdsZUluaXRWYWx1ZUV4YW1wbGUsIHNldFNpbmdsZUluaXRWYWx1ZUV4YW1wbGVdID0gdXNlU3RhdGUoe1xyXG5cdFx0eWVhcjogMjAxOSxcclxuXHRcdG1vbnRoOiAzLFxyXG5cdFx0ZGF5OiAyMFxyXG5cdH0pXHJcblx0Y29uc3QgW3NpbmdsZUluaXRWYWx1ZUV4YW1wbGVBc3luYywgc2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jXSA9XHJcblx0XHR1c2VTdGF0ZSh7IHllYXI6IDIwMTAsIG1vbnRoOiAzLCBkYXk6IDIyIH0pXHJcblxyXG5cdGNvbnN0IFtzaW5nbGVQZXJzaWFuRXhhbXBsZSwgc2V0U2luZ2xlUGVyc2lhbkV4YW1wbGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbcmFuZ2VFeGFtcGxlLCBzZXRSYW5nZUV4YW1wbGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbcmFuZ2VJbml0VmFsdWVFeGFtcGxlLCBzZXRSYW5nZUluaXRWYWx1ZUV4YW1wbGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbbXVsdGlFeGFtcGxlLCBzZXRNdWx0aUV4YW1wbGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbbXVsdGlJbml0aWFsVmFsdWVFeGFtcGxlLCBzZXRNdWx0aUluaXRpYWxWYWx1ZUV4YW1wbGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbc2luZ2xlVGltZUV4YW1wbGUsIHNldFNpbmdsZVRpbWVFeGFtcGxlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW2Rpc3BsYXlpbmdPcHRpb24sIHNldERpc3BsYXlpbmdPcHRpb25dID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbY2FsbEJhY2tBcGksIHNldENhbGxCYWNrQXBpXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoMClcclxuXHRjb25zdCBbY2xvc2UsIHNldENsb3NlXSA9IHVzZVN0YXRlKDApXHJcblx0Y29uc3QgW2NoYW5nZSwgc2V0Q2hhbmdlXSA9IHVzZVN0YXRlKDApXHJcblx0Y29uc3QgaGFuZGxlQ2FsZW5kYXJDaGFuZ2UgPSAobmV3RGF0ZTogYW55KSA9PiB7XHJcblx0XHRjb25zb2xlLmxvZyhuZXdEYXRlKVxyXG5cdFx0Y29uc29sZS5sb2coJ0NhbGVuZGFyIGNoYW5nZWQnKVxyXG5cdFx0c2V0Q2hhbmdlKGNoYW5nZSArIDEpXHJcblx0fVxyXG5cdGNvbnN0IGhhbmRsZUNhbGVuZGFyQ2xvc2UgPSAoKSA9PiB7XHJcblx0XHRzZXRDbG9zZShjbG9zZSArIDEpXHJcblx0XHRjb25zb2xlLmxvZygnQ2FsZW5kYXIgY2xvc2VkJylcclxuXHR9XHJcblx0Y29uc3QgaGFuZGxlQ2FsZW5kYXJPcGVuID0gKCkgPT4ge1xyXG5cdFx0c2V0T3BlbihvcGVuICsgMSlcclxuXHRcdGNvbnNvbGUubG9nKCdDYWxlbmRhciBvcGVuZWQnKVxyXG5cdH1cclxuXHJcblx0Y29uc3QgW21pbk1heCwgc2V0TWluTWF4XSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgbWF4RGF0ZSA9IHtcclxuXHRcdHllYXI6IDIwMTYsXHJcblx0XHRtb250aDogNixcclxuXHRcdGRheTogMjNcclxuXHR9XHJcblx0Y29uc3QgbWluRGF0ZSA9IHtcclxuXHRcdHllYXI6IDIwMTIsXHJcblx0XHRtb250aDogNSxcclxuXHRcdGRheTogMlxyXG5cdH1cclxuXHJcblx0Y29uc3QgW2Rpc2FibGVkRGF0ZSwgc2V0RGlzYWJsZWREYXRlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgZGlzYWJsZWREYXRlc0xpc3QgPSBbXHJcblx0XHR7XHJcblx0XHRcdHllYXI6IDIwMTYsXHJcblx0XHRcdG1vbnRoOiA2LFxyXG5cdFx0XHRkYXk6IDE1XHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHR5ZWFyOiAyMDE2LFxyXG5cdFx0XHRtb250aDogNixcclxuXHRcdFx0ZGF5OiAxMlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0eWVhcjogMjAxNixcclxuXHRcdFx0bW9udGg6IDYsXHJcblx0XHRcdGRheTogMTBcclxuXHRcdH1cclxuXHRdXHJcblx0Y29uc3QgW3dpdGhvdXRJbnB1dCwgc2V0V2l0aG91dElucHV0XSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW2F1dG9DbG9zZUZhbHNlLCBzZXRBdXRvQ2xvc2VGYWxzZV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFtjdXN0b21JY29ucywgc2V0Q3VzdG9tSWNvbnNdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCB1cGRhdGVJbml0VmFsdWUgPSAoKSA9PiB7XHJcblx0XHRzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlQXN5bmMoe1xyXG5cdFx0XHR5ZWFyOiAyMDIxLFxyXG5cdFx0XHRtb250aDogMTIsXHJcblx0XHRcdGRheTogMjVcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PERvY0xheW91dD5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J21iLTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzZWxlY3RTaW5nbGVEYXknXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2VsZWN0IHNpbmdsZSBkYXlcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0zLzQgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7c2luZ2xlRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyIG9uQ2hhbmdlPXtzZXRTaW5nbGVFeGFtcGxlfSAvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShzaW5nbGVFeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdTaW5nbGVEYXlXaXRoSW5pdGlhbERhdGUnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2luZ2xlIGRheSB3aXRoIGluaXRpYWwgZGF0ZVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtzaW5nbGVJbml0VmFsdWVFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRpbml0VmFsdWU9e3NpbmdsZUluaXRWYWx1ZUV4YW1wbGV9XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldFNpbmdsZUluaXRWYWx1ZUV4YW1wbGV9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KHNpbmdsZUluaXRWYWx1ZUV4YW1wbGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3VwZGF0ZUluaXRpYWxEYXRlJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFVwZGF0ZSBpbml0aWFsIGRhdGVcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7c2luZ2xlVXBkYXRlSW5pdFZhbHVlRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXt1cGRhdGVJbml0VmFsdWV9IGNsYXNzTmFtZT0nYnRuIHJvdW5kZWQtMCBtYi0yJz5cclxuXHRcdFx0XHRcdFx0XHRVcGRhdGUgaW5pdCB2YWx1ZVxyXG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0aW5pdFZhbHVlPXtzaW5nbGVJbml0VmFsdWVFeGFtcGxlQXN5bmN9XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldFNpbmdsZUluaXRWYWx1ZUV4YW1wbGVBc3luY31cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkoc2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzZWxlY3RTaW5nbGVQZXJzaWFuKEphbGFsaSlkYXknXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2VsZWN0IHNpbmdsZSBKYWxhbGkgZGF5XHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e3NpbmdsZVBlcnNpYW5FeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0U2luZ2xlUGVyc2lhbkV4YW1wbGV9XHJcblx0XHRcdFx0XHRcdFx0bG9jYWw9J2ZhJ1xyXG5cdFx0XHRcdFx0XHRcdHNob3dXZWVrZW5kXHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KHNpbmdsZVBlcnNpYW5FeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzZWxlY3RBTGlzdE9mRGF5c0JldHdlZW5Ud29EYXlzJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFNlbGVjdCBhIGxpc3Qgb2YgZGF5cyBiZXR3ZWVuIHR3byBkYXlzXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e3JhbmdlRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyIG9uQ2hhbmdlPXtzZXRSYW5nZUV4YW1wbGV9IHR5cGU9J3JhbmdlJyAvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShyYW5nZUV4YW1wbGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3JhbmdlT2ZEYXlzV2l0aEluaXRpYWxEYXRlJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFJhbmdlIG9mIGRheXMgd2l0aCBpbml0aWFsIGRhdGVcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7cmFuZ2VJbml0VmFsdWVFRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0aW5pdFZhbHVlPXt7XHJcblx0XHRcdFx0XHRcdFx0XHRmcm9tOiB7IHllYXI6IDIwMTIsIG1vbnRoOiA1LCBkYXk6IDIgfSxcclxuXHRcdFx0XHRcdFx0XHRcdHRvOiB7IHllYXI6IDIwMTIsIG1vbnRoOiA1LCBkYXk6IDIzIH1cclxuXHRcdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXRSYW5nZUluaXRWYWx1ZUV4YW1wbGV9XHJcblx0XHRcdFx0XHRcdFx0dHlwZT0ncmFuZ2UnXHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KHJhbmdlSW5pdFZhbHVlRXhhbXBsZSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nc2VsZWN0TXVsdGlEYXlzJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCAgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTZWxlY3QgbXVsdGkgZGF5c1xyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHttdWx0aUV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlciBvbkNoYW5nZT17c2V0TXVsdGlFeGFtcGxlfSB0eXBlPSdtdWx0aScgLz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkobXVsdGlFeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdtdWx0aURheXNXaXRoSW5pdGlhbERhdGUnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0TXVsdGkgZGF5cyB3aXRoIGluaXRpYWwgZGF0ZVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHttdWx0aUluaXRpYWxWYWx1ZUV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdGluaXRWYWx1ZT17W1xyXG5cdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR5ZWFyOiAyMDEyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtb250aDogNSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF5OiAyOSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0aG91cjogMTgsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG1pbnV0ZTogMTFcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHllYXI6IDIwMTIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbnRoOiA1LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXk6IDIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGhvdXI6IDE4LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtaW51dGU6IDExXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR5ZWFyOiAyMDEyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtb250aDogNixcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF5OiAzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRob3VyOiAxOCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWludXRlOiAxMVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdF19XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldE11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZX1cclxuXHRcdFx0XHRcdFx0XHR0eXBlPSdtdWx0aSdcclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkobXVsdGlJbml0aWFsVmFsdWVFeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzaW5nbGVEYXlXaXRoVGltZSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTaW5nbGUgZGF5IHdpdGggdGltZVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtzaW5nbGVUaW1lRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyIG9uQ2hhbmdlPXtzZXRTaW5nbGVUaW1lRXhhbXBsZX0gd2l0aFRpbWUgc2hvd1RpbWVJbnB1dCAvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShzaW5nbGVUaW1lRXhhbXBsZSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nc2hvd1dlZWtlbmRDbGVhckJ0bkFuZFRvZGF5QnRuT3B0aW9ucydcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTaG93V2Vla2VuZCx5ZWFyIGxpc3Qgc3R5bGUsIGNsZWFyQnRuIGFuZCB0b2RheUJ0biBvcHRpb25zXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e2Rpc3BsYXlpbmdPcHRpb25FeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0RGlzcGxheWluZ09wdGlvbn1cclxuXHRcdFx0XHRcdFx0XHRzaG93V2Vla2VuZFxyXG5cdFx0XHRcdFx0XHRcdGNsZWFyQnRuXHJcblx0XHRcdFx0XHRcdFx0dG9kYXlCdG5cclxuXHRcdFx0XHRcdFx0XHR5ZWFyTGlzdFN0eWxlPSdsaXN0J1xyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShkaXNwbGF5aW5nT3B0aW9uLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdvcGVuQ2xvc2VBbmRDaGFuZ2VDYWxsYmFja0FwaSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRPcGVuLCBjbG9zZSBhbmQgY2hhbmdlIGNhbGxiYWNrIGFwaXsnICd9XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J3RleHQtc20nPlxyXG5cdFx0XHRcdFx0XHQoPHNwYW4+Tm90ZTwvc3Bhbj46IG9uQ2FsZW5kZXJDaGFuZ2Ugb25seSB3b3JrcyBjb3JyZWN0bHkgaWYgeW91XHJcblx0XHRcdFx0XHRcdHBhc3MgaW5pdFZhbHVlIClcclxuXHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7Y2FsbGJhY2tBcGlFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J2Jsb2NrJz5vcGVuOiB7b3Blbn08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nYmxvY2snPmNoYW5nZToge2NoYW5nZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nYmxvY2snPmNsb3NlOiB7Y2xvc2V9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHR0eXBlPSdzaW5nbGUnXHJcblx0XHRcdFx0XHRcdFx0aW5pdFZhbHVlPXtjYWxsQmFja0FwaX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0Q2FsbEJhY2tBcGl9XHJcblx0XHRcdFx0XHRcdFx0b25DYWxlbmRlckNoYW5nZT17aGFuZGxlQ2FsZW5kYXJDaGFuZ2V9XHJcblx0XHRcdFx0XHRcdFx0b25DYWxlbmRlclNob3c9e2hhbmRsZUNhbGVuZGFyT3Blbn1cclxuXHRcdFx0XHRcdFx0XHRvbkNhbGVuZGVySGlkZT17aGFuZGxlQ2FsZW5kYXJDbG9zZX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkoY2FsbEJhY2tBcGksIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3NldE1pbmltdW1BbmRNYXhpbXVtRGF0ZSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTZXQgbWluaW11bSBhbmQgbWF4aW11bSBkYXRlXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e21pbk1heEV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXRNaW5NYXh9XHJcblx0XHRcdFx0XHRcdFx0bWluRGF0ZT17bWluRGF0ZX1cclxuXHRcdFx0XHRcdFx0XHRtYXhEYXRlPXttYXhEYXRlfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShtaW5NYXgsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3NldEFMaXN0T2ZEaXNhYmxlZERhdGVzJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFNldCBhIGxpc3Qgb2YgZGlzYWJsZWQgZGF0ZXNcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7ZGlzYWJsZWRFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0RGlzYWJsZWREYXRlfVxyXG5cdFx0XHRcdFx0XHRcdGRpc2FibGVkRGF0ZXM9e2Rpc2FibGVkRGF0ZXNMaXN0fVxyXG5cdFx0XHRcdFx0XHRcdG1pbkRhdGU9e21pbkRhdGV9XHJcblx0XHRcdFx0XHRcdFx0bWF4RGF0ZT17bWF4RGF0ZX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkoZGlzYWJsZWREYXRlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDMgaWQ9J0F1dG9DbG9zZScgY2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0Jz5cclxuXHRcdFx0XHRcdEF1dG9DbG9zZSA6IGZhbHNlXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e2F1dG9DbG9zZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J210LTQnPlxyXG5cdFx0XHRcdFx0XHRcdDxEdFBpY2tlciBvbkNoYW5nZT17c2V0QXV0b0Nsb3NlRmFsc2V9IGF1dG9DbG9zZT17ZmFsc2V9IC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8cHJlIGNsYXNzTmFtZT0nbXQtNCc+XHJcblx0XHRcdFx0XHRcdFx0e0pTT04uc3RyaW5naWZ5KGF1dG9DbG9zZUZhbHNlLCBudWxsLCAyKX1cclxuXHRcdFx0XHRcdFx0PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzIGlkPSdXaXRob3V0SW5wdXQnIGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCc+XHJcblx0XHRcdFx0XHRXaXRob3V0IGlucHV0XHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e3dpdGhvdXRJbnB1dFN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J210LTQnPlxyXG5cdFx0XHRcdFx0XHRcdDxEdENhbGVuZGFyIG9uQ2hhbmdlPXtzZXRXaXRob3V0SW5wdXR9IC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8cHJlIGNsYXNzTmFtZT0nbXQtNCc+e0pTT04uc3RyaW5naWZ5KHdpdGhvdXRJbnB1dCwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nQ3VzdG9tQ2FsZW5kZXInXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0Q3VzdG9tIGNhbGVuZGFyOiBpY29ucyAtIGlucHV0IHBsYWNlaG9sZGVyIC0gc3R5bGVzXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e2N1c3RvbUNhbGVuZGVyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0XHQ8YnIgLz5cclxuXHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT0ndGV4dC1sZyc+U3R5bGU8L2g0PlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0nY3NzJ1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e2N1c3RvbUNhbGVuZGVyU3R5bGV9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXRDdXN0b21JY29uc31cclxuXHRcdFx0XHRcdFx0XHQvLyBOZXh0QnRuSWNvbj17QXJyb3dSaWdodH1cclxuXHRcdFx0XHRcdFx0XHQvLyBQcmV2aW91c0J0bkljb249e0Fycm93TGVmdH1cclxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj0nc2VsZWN0IGRhdGUnXHJcblx0XHRcdFx0XHRcdFx0ZnJvbUxhYmVsPSdGcm9tIGRhdGUnXHJcblx0XHRcdFx0XHRcdFx0dG9MYWJlbD0nVG8gZGF0ZSdcclxuXHRcdFx0XHRcdFx0XHR0eXBlPSdyYW5nZSdcclxuXHRcdFx0XHRcdFx0XHRpbnB1dENsYXNzPSdjdXN0b20taW5wdXQnXHJcblx0XHRcdFx0XHRcdFx0aGVhZGVyQ2xhc3M9J2N1c3RvbS1oZWFkZXInXHJcblx0XHRcdFx0XHRcdFx0ZGF5c0NsYXNzPSdjdXN0b20tZGF5cydcclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkoY3VzdG9tSWNvbnMsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9Eb2NMYXlvdXQ+XHJcblx0KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==