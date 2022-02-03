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
          children: "(Note: onCalenderChange only works correctly if you pass initValue )"
        }, void 0, false, {
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
            lineNumber: 400,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 399,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["open: ", open]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 409,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["change: ", change]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 410,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["close: ", close]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 411,
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
            lineNumber: 412,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(callBackApi, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 420,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 408,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 398,
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
        lineNumber: 425,
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
            lineNumber: 433,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 432,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setMinMax,
            minDate: minDate,
            maxDate: maxDate
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 442,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(minMax, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 447,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 441,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 431,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 424,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "setAListOfDisabledDates",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Set a list of disabled dates"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 452,
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
            lineNumber: 460,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 459,
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
            lineNumber: 469,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(disabledDate, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 475,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 468,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 458,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 451,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "AutoClose",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "AutoClose : false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 480,
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
            lineNumber: 485,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 484,
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
              lineNumber: 495,
              columnNumber: 8
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 494,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            className: "mt-4",
            children: JSON.stringify(autoCloseFalse, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 497,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 493,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 483,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 479,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "WithoutInput",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Without input"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 504,
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
            lineNumber: 509,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 508,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "mt-4",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2__["DtCalendar"], {
              onChange: setWithoutInput
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 519,
              columnNumber: 8
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 518,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            className: "mt-4",
            children: JSON.stringify(withoutInput, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 521,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 517,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 507,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 503,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "CustomCalender",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Custom calendar: icons - input placeholder - styles"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 527,
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
            lineNumber: 535,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("br", {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 542,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h4", {
            className: "text-lg",
            children: "Style"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 543,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "css",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["customCalenderStyle"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 544,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 534,
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
            lineNumber: 553,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(customIcons, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 565,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 552,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 533,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 526,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvZG9jcy9leGFtcGxlcy50c3giXSwibmFtZXMiOlsiQXBwIiwidXNlU3RhdGUiLCJzaW5nbGVFeGFtcGxlIiwic2V0U2luZ2xlRXhhbXBsZSIsInllYXIiLCJtb250aCIsImRheSIsInNpbmdsZUluaXRWYWx1ZUV4YW1wbGUiLCJzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlIiwic2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jIiwic2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jIiwic2luZ2xlUGVyc2lhbkV4YW1wbGUiLCJzZXRTaW5nbGVQZXJzaWFuRXhhbXBsZSIsInJhbmdlRXhhbXBsZSIsInNldFJhbmdlRXhhbXBsZSIsInJhbmdlSW5pdFZhbHVlRXhhbXBsZSIsInNldFJhbmdlSW5pdFZhbHVlRXhhbXBsZSIsIm11bHRpRXhhbXBsZSIsInNldE11bHRpRXhhbXBsZSIsIm11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZSIsInNldE11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZSIsInNpbmdsZVRpbWVFeGFtcGxlIiwic2V0U2luZ2xlVGltZUV4YW1wbGUiLCJkaXNwbGF5aW5nT3B0aW9uIiwic2V0RGlzcGxheWluZ09wdGlvbiIsImNhbGxCYWNrQXBpIiwic2V0Q2FsbEJhY2tBcGkiLCJvcGVuIiwic2V0T3BlbiIsImNsb3NlIiwic2V0Q2xvc2UiLCJjaGFuZ2UiLCJzZXRDaGFuZ2UiLCJoYW5kbGVDYWxlbmRhckNoYW5nZSIsIm5ld0RhdGUiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2FsZW5kYXJDbG9zZSIsImhhbmRsZUNhbGVuZGFyT3BlbiIsIm1pbk1heCIsInNldE1pbk1heCIsIm1heERhdGUiLCJtaW5EYXRlIiwiZGlzYWJsZWREYXRlIiwic2V0RGlzYWJsZWREYXRlIiwiZGlzYWJsZWREYXRlc0xpc3QiLCJ3aXRob3V0SW5wdXQiLCJzZXRXaXRob3V0SW5wdXQiLCJhdXRvQ2xvc2VGYWxzZSIsInNldEF1dG9DbG9zZUZhbHNlIiwiY3VzdG9tSWNvbnMiLCJzZXRDdXN0b21JY29ucyIsInVwZGF0ZUluaXRWYWx1ZSIsInRvbW9ycm93TmlnaHRFaWdodGllcyIsInNpbmdsZUV4YW1wbGVTdHIiLCJKU09OIiwic3RyaW5naWZ5Iiwic2luZ2xlSW5pdFZhbHVlRXhhbXBsZVN0ciIsInNpbmdsZVVwZGF0ZUluaXRWYWx1ZUV4YW1wbGVTdHIiLCJzaW5nbGVQZXJzaWFuRXhhbXBsZVN0ciIsInJhbmdlRXhhbXBsZVN0ciIsInJhbmdlSW5pdFZhbHVlRUV4YW1wbGVTdHIiLCJmcm9tIiwidG8iLCJtdWx0aUV4YW1wbGVTdHIiLCJtdWx0aUluaXRpYWxWYWx1ZUV4YW1wbGVTdHIiLCJob3VyIiwibWludXRlIiwic2luZ2xlVGltZUV4YW1wbGVTdHIiLCJkaXNwbGF5aW5nT3B0aW9uRXhhbXBsZVN0ciIsImNhbGxiYWNrQXBpRXhhbXBsZVN0ciIsIm1pbk1heEV4YW1wbGVTdHIiLCJkaXNhYmxlZEV4YW1wbGVTdHIiLCJhdXRvQ2xvc2VTdHIiLCJ3aXRob3V0SW5wdXRTdHIiLCJjdXN0b21DYWxlbmRlciIsImN1c3RvbUNhbGVuZGVyU3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtDQUVBO0FBQ0E7O0FBQ0E7O0FBb0JBLElBQU1BLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQU07QUFBQTs7QUFBQSxrQkFDeUJDLHNEQUFRLENBQUMsSUFBRCxDQURqQztBQUFBLE1BQ1ZDLGFBRFU7QUFBQSxNQUNLQyxnQkFETDs7QUFBQSxtQkFFMkNGLHNEQUFRLENBQUM7QUFDcEVHLFFBQUksRUFBRSxJQUQ4RDtBQUVwRUMsU0FBSyxFQUFFLENBRjZEO0FBR3BFQyxPQUFHLEVBQUU7QUFIK0QsR0FBRCxDQUZuRDtBQUFBLE1BRVZDLHNCQUZVO0FBQUEsTUFFY0MseUJBRmQ7O0FBQUEsbUJBUWhCUCxzREFBUSxDQUFDO0FBQUVHLFFBQUksRUFBRSxJQUFS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QztBQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBYkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQW5CRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFQRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFyYUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREQ7QUFtZEEsQ0EvaEJEOztHQUFNbEQsRzs7S0FBQUEsRztBQWlpQlNBLGtFQUFmIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL2RvY3MvZXhhbXBsZXMuOWFiNDg0Mzg2NDM4MWFhODRmYzAuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCBEdFBpY2tlciwgeyBEdENhbGVuZGFyIH0gZnJvbSAncmVhY3QtY2FsZW5kYXItZGF0ZXRpbWUtcGlja2VyJ1xyXG5pbXBvcnQgeyBEb2NMYXlvdXQgfSBmcm9tICcuLi8uLi9Db21wb25lbnQnXHJcbmltcG9ydCBTeW50YXhIaWdobGlnaHRlciBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInXHJcbmltcG9ydCB7IHRvbW9ycm93TmlnaHRFaWdodGllcyB9IGZyb20gJ3JlYWN0LXN5bnRheC1oaWdobGlnaHRlci9kaXN0L2Nqcy9zdHlsZXMvaGxqcydcclxuLy8gaW1wb3J0IHsgUmVhY3RDb21wb25lbnQgYXMgQXJyb3dMZWZ0IH0gZnJvbSAnLi4vLi4vQ29tcG9uZW50L0ljb25zL2Fycm93LWxlZnQuc3ZnJ1xyXG4vLyBpbXBvcnQgeyBSZWFjdENvbXBvbmVudCBhcyBBcnJvd1JpZ2h0IH0gZnJvbSAnLi4vLi4vQ29tcG9uZW50L0ljb25zL2Fycm93LXJpZ2h0LnN2ZydcclxuaW1wb3J0IHtcclxuXHRzaW5nbGVFeGFtcGxlU3RyLFxyXG5cdHNpbmdsZVBlcnNpYW5FeGFtcGxlU3RyLFxyXG5cdHJhbmdlRXhhbXBsZVN0cixcclxuXHRtdWx0aUV4YW1wbGVTdHIsXHJcblx0c2luZ2xlVGltZUV4YW1wbGVTdHIsXHJcblx0ZGlzcGxheWluZ09wdGlvbkV4YW1wbGVTdHIsXHJcblx0Y2FsbGJhY2tBcGlFeGFtcGxlU3RyLFxyXG5cdG1pbk1heEV4YW1wbGVTdHIsXHJcblx0ZGlzYWJsZWRFeGFtcGxlU3RyLFxyXG5cdHNpbmdsZUluaXRWYWx1ZUV4YW1wbGVTdHIsXHJcblx0cmFuZ2VJbml0VmFsdWVFRXhhbXBsZVN0cixcclxuXHRtdWx0aUluaXRpYWxWYWx1ZUV4YW1wbGVTdHIsXHJcblx0Y3VzdG9tQ2FsZW5kZXIsXHJcblx0Y3VzdG9tQ2FsZW5kZXJTdHlsZSxcclxuXHR3aXRob3V0SW5wdXRTdHIsXHJcblx0c2luZ2xlVXBkYXRlSW5pdFZhbHVlRXhhbXBsZVN0cixcclxuXHRhdXRvQ2xvc2VTdHJcclxufSBmcm9tICcuLi8uLi9Db25zdGFudC9zYW1wbGVTdHJpbmcnXHJcblxyXG5jb25zdCBBcHAgPSAoKSA9PiB7XHJcblx0Y29uc3QgW3NpbmdsZUV4YW1wbGUsIHNldFNpbmdsZUV4YW1wbGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbc2luZ2xlSW5pdFZhbHVlRXhhbXBsZSwgc2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZV0gPSB1c2VTdGF0ZSh7XHJcblx0XHR5ZWFyOiAyMDE5LFxyXG5cdFx0bW9udGg6IDMsXHJcblx0XHRkYXk6IDIwXHJcblx0fSlcclxuXHRjb25zdCBbc2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jLCBzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlQXN5bmNdID1cclxuXHRcdHVzZVN0YXRlKHsgeWVhcjogMjAxMCwgbW9udGg6IDMsIGRheTogMjIgfSlcclxuXHJcblx0Y29uc3QgW3NpbmdsZVBlcnNpYW5FeGFtcGxlLCBzZXRTaW5nbGVQZXJzaWFuRXhhbXBsZV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFtyYW5nZUV4YW1wbGUsIHNldFJhbmdlRXhhbXBsZV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFtyYW5nZUluaXRWYWx1ZUV4YW1wbGUsIHNldFJhbmdlSW5pdFZhbHVlRXhhbXBsZV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFttdWx0aUV4YW1wbGUsIHNldE11bHRpRXhhbXBsZV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFttdWx0aUluaXRpYWxWYWx1ZUV4YW1wbGUsIHNldE11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFtzaW5nbGVUaW1lRXhhbXBsZSwgc2V0U2luZ2xlVGltZUV4YW1wbGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbZGlzcGxheWluZ09wdGlvbiwgc2V0RGlzcGxheWluZ09wdGlvbl0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFtjYWxsQmFja0FwaSwgc2V0Q2FsbEJhY2tBcGldID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZSgwKVxyXG5cdGNvbnN0IFtjbG9zZSwgc2V0Q2xvc2VdID0gdXNlU3RhdGUoMClcclxuXHRjb25zdCBbY2hhbmdlLCBzZXRDaGFuZ2VdID0gdXNlU3RhdGUoMClcclxuXHRjb25zdCBoYW5kbGVDYWxlbmRhckNoYW5nZSA9IChuZXdEYXRlOiBhbnkpID0+IHtcclxuXHRcdGNvbnNvbGUubG9nKG5ld0RhdGUpXHJcblx0XHRjb25zb2xlLmxvZygnQ2FsZW5kYXIgY2hhbmdlZCcpXHJcblx0XHRzZXRDaGFuZ2UoY2hhbmdlICsgMSlcclxuXHR9XHJcblx0Y29uc3QgaGFuZGxlQ2FsZW5kYXJDbG9zZSA9ICgpID0+IHtcclxuXHRcdHNldENsb3NlKGNsb3NlICsgMSlcclxuXHRcdGNvbnNvbGUubG9nKCdDYWxlbmRhciBjbG9zZWQnKVxyXG5cdH1cclxuXHRjb25zdCBoYW5kbGVDYWxlbmRhck9wZW4gPSAoKSA9PiB7XHJcblx0XHRzZXRPcGVuKG9wZW4gKyAxKVxyXG5cdFx0Y29uc29sZS5sb2coJ0NhbGVuZGFyIG9wZW5lZCcpXHJcblx0fVxyXG5cclxuXHRjb25zdCBbbWluTWF4LCBzZXRNaW5NYXhdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBtYXhEYXRlID0ge1xyXG5cdFx0eWVhcjogMjAxNixcclxuXHRcdG1vbnRoOiA2LFxyXG5cdFx0ZGF5OiAyM1xyXG5cdH1cclxuXHRjb25zdCBtaW5EYXRlID0ge1xyXG5cdFx0eWVhcjogMjAxMixcclxuXHRcdG1vbnRoOiA1LFxyXG5cdFx0ZGF5OiAyXHJcblx0fVxyXG5cclxuXHRjb25zdCBbZGlzYWJsZWREYXRlLCBzZXREaXNhYmxlZERhdGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBkaXNhYmxlZERhdGVzTGlzdCA9IFtcclxuXHRcdHtcclxuXHRcdFx0eWVhcjogMjAxNixcclxuXHRcdFx0bW9udGg6IDYsXHJcblx0XHRcdGRheTogMTVcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHllYXI6IDIwMTYsXHJcblx0XHRcdG1vbnRoOiA2LFxyXG5cdFx0XHRkYXk6IDEyXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHR5ZWFyOiAyMDE2LFxyXG5cdFx0XHRtb250aDogNixcclxuXHRcdFx0ZGF5OiAxMFxyXG5cdFx0fVxyXG5cdF1cclxuXHRjb25zdCBbd2l0aG91dElucHV0LCBzZXRXaXRob3V0SW5wdXRdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbYXV0b0Nsb3NlRmFsc2UsIHNldEF1dG9DbG9zZUZhbHNlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW2N1c3RvbUljb25zLCBzZXRDdXN0b21JY29uc10gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IHVwZGF0ZUluaXRWYWx1ZSA9ICgpID0+IHtcclxuXHRcdHNldFNpbmdsZUluaXRWYWx1ZUV4YW1wbGVBc3luYyh7XHJcblx0XHRcdHllYXI6IDIwMjEsXHJcblx0XHRcdG1vbnRoOiAxMixcclxuXHRcdFx0ZGF5OiAyNVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8RG9jTGF5b3V0PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbWItMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3NlbGVjdFNpbmdsZURheSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTZWxlY3Qgc2luZ2xlIGRheVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTMvNCB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtzaW5nbGVFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXIgb25DaGFuZ2U9e3NldFNpbmdsZUV4YW1wbGV9IC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KHNpbmdsZUV4YW1wbGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J1NpbmdsZURheVdpdGhJbml0aWFsRGF0ZSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTaW5nbGUgZGF5IHdpdGggaW5pdGlhbCBkYXRlXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e3NpbmdsZUluaXRWYWx1ZUV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdGluaXRWYWx1ZT17c2luZ2xlSW5pdFZhbHVlRXhhbXBsZX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkoc2luZ2xlSW5pdFZhbHVlRXhhbXBsZSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0ndXBkYXRlSW5pdGlhbERhdGUnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0VXBkYXRlIGluaXRpYWwgZGF0ZVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtzaW5nbGVVcGRhdGVJbml0VmFsdWVFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9e3VwZGF0ZUluaXRWYWx1ZX0gY2xhc3NOYW1lPSdidG4gcm91bmRlZC0wIG1iLTInPlxyXG5cdFx0XHRcdFx0XHRcdFVwZGF0ZSBpbml0IHZhbHVlXHJcblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRpbml0VmFsdWU9e3NpbmdsZUluaXRWYWx1ZUV4YW1wbGVBc3luY31cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShzaW5nbGVJbml0VmFsdWVFeGFtcGxlQXN5bmMsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3NlbGVjdFNpbmdsZVBlcnNpYW4oSmFsYWxpKWRheSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTZWxlY3Qgc2luZ2xlIEphbGFsaSBkYXlcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7c2luZ2xlUGVyc2lhbkV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXRTaW5nbGVQZXJzaWFuRXhhbXBsZX1cclxuXHRcdFx0XHRcdFx0XHRsb2NhbD0nZmEnXHJcblx0XHRcdFx0XHRcdFx0c2hvd1dlZWtlbmRcclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkoc2luZ2xlUGVyc2lhbkV4YW1wbGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3NlbGVjdEFMaXN0T2ZEYXlzQmV0d2VlblR3b0RheXMnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2VsZWN0IGEgbGlzdCBvZiBkYXlzIGJldHdlZW4gdHdvIGRheXNcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7cmFuZ2VFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXIgb25DaGFuZ2U9e3NldFJhbmdlRXhhbXBsZX0gdHlwZT0ncmFuZ2UnIC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KHJhbmdlRXhhbXBsZSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0ncmFuZ2VPZkRheXNXaXRoSW5pdGlhbERhdGUnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0UmFuZ2Ugb2YgZGF5cyB3aXRoIGluaXRpYWwgZGF0ZVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtyYW5nZUluaXRWYWx1ZUVFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRpbml0VmFsdWU9e3tcclxuXHRcdFx0XHRcdFx0XHRcdGZyb206IHsgeWVhcjogMjAxMiwgbW9udGg6IDUsIGRheTogMiB9LFxyXG5cdFx0XHRcdFx0XHRcdFx0dG86IHsgeWVhcjogMjAxMiwgbW9udGg6IDUsIGRheTogMjMgfVxyXG5cdFx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldFJhbmdlSW5pdFZhbHVlRXhhbXBsZX1cclxuXHRcdFx0XHRcdFx0XHR0eXBlPSdyYW5nZSdcclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkocmFuZ2VJbml0VmFsdWVFeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzZWxlY3RNdWx0aURheXMnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00ICBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFNlbGVjdCBtdWx0aSBkYXlzXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e211bHRpRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyIG9uQ2hhbmdlPXtzZXRNdWx0aUV4YW1wbGV9IHR5cGU9J211bHRpJyAvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShtdWx0aUV4YW1wbGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J211bHRpRGF5c1dpdGhJbml0aWFsRGF0ZSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRNdWx0aSBkYXlzIHdpdGggaW5pdGlhbCBkYXRlXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e211bHRpSW5pdGlhbFZhbHVlRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0aW5pdFZhbHVlPXtbXHJcblx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHllYXI6IDIwMTIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbnRoOiA1LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXk6IDI5LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRob3VyOiAxOCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWludXRlOiAxMVxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0eWVhcjogMjAxMixcclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9udGg6IDUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRheTogMixcclxuXHRcdFx0XHRcdFx0XHRcdFx0aG91cjogMTgsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG1pbnV0ZTogMTFcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHllYXI6IDIwMTIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbnRoOiA2LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXk6IDMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGhvdXI6IDE4LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtaW51dGU6IDExXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0TXVsdGlJbml0aWFsVmFsdWVFeGFtcGxlfVxyXG5cdFx0XHRcdFx0XHRcdHR5cGU9J211bHRpJ1xyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShtdWx0aUluaXRpYWxWYWx1ZUV4YW1wbGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3NpbmdsZURheVdpdGhUaW1lJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFNpbmdsZSBkYXkgd2l0aCB0aW1lXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e3NpbmdsZVRpbWVFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXIgb25DaGFuZ2U9e3NldFNpbmdsZVRpbWVFeGFtcGxlfSB3aXRoVGltZSBzaG93VGltZUlucHV0IC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KHNpbmdsZVRpbWVFeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzaG93V2Vla2VuZENsZWFyQnRuQW5kVG9kYXlCdG5PcHRpb25zJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFNob3dXZWVrZW5kLHllYXIgbGlzdCBzdHlsZSwgY2xlYXJCdG4gYW5kIHRvZGF5QnRuIG9wdGlvbnNcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7ZGlzcGxheWluZ09wdGlvbkV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXREaXNwbGF5aW5nT3B0aW9ufVxyXG5cdFx0XHRcdFx0XHRcdHNob3dXZWVrZW5kXHJcblx0XHRcdFx0XHRcdFx0Y2xlYXJCdG5cclxuXHRcdFx0XHRcdFx0XHR0b2RheUJ0blxyXG5cdFx0XHRcdFx0XHRcdHllYXJMaXN0U3R5bGU9J2xpc3QnXHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KGRpc3BsYXlpbmdPcHRpb24sIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J29wZW5DbG9zZUFuZENoYW5nZUNhbGxiYWNrQXBpJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdE9wZW4sIGNsb3NlIGFuZCBjaGFuZ2UgY2FsbGJhY2sgYXBpeycgJ31cclxuXHRcdFx0XHRcdDxzcGFuPlxyXG5cdFx0XHRcdFx0XHQoTm90ZTogb25DYWxlbmRlckNoYW5nZSBvbmx5IHdvcmtzIGNvcnJlY3RseSBpZiB5b3UgcGFzcyBpbml0VmFsdWUgKVxyXG5cdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtjYWxsYmFja0FwaUV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nYmxvY2snPm9wZW46IHtvcGVufTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPSdibG9jayc+Y2hhbmdlOiB7Y2hhbmdlfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPSdibG9jayc+Y2xvc2U6IHtjbG9zZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdHR5cGU9J3NpbmdsZSdcclxuXHRcdFx0XHRcdFx0XHRpbml0VmFsdWU9e2NhbGxCYWNrQXBpfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXRDYWxsQmFja0FwaX1cclxuXHRcdFx0XHRcdFx0XHRvbkNhbGVuZGVyQ2hhbmdlPXtoYW5kbGVDYWxlbmRhckNoYW5nZX1cclxuXHRcdFx0XHRcdFx0XHRvbkNhbGVuZGVyU2hvdz17aGFuZGxlQ2FsZW5kYXJPcGVufVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2FsZW5kZXJIaWRlPXtoYW5kbGVDYWxlbmRhckNsb3NlfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShjYWxsQmFja0FwaSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nc2V0TWluaW11bUFuZE1heGltdW1EYXRlJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFNldCBtaW5pbXVtIGFuZCBtYXhpbXVtIGRhdGVcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7bWluTWF4RXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldE1pbk1heH1cclxuXHRcdFx0XHRcdFx0XHRtaW5EYXRlPXttaW5EYXRlfVxyXG5cdFx0XHRcdFx0XHRcdG1heERhdGU9e21heERhdGV9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KG1pbk1heCwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nc2V0QUxpc3RPZkRpc2FibGVkRGF0ZXMnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2V0IGEgbGlzdCBvZiBkaXNhYmxlZCBkYXRlc1xyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtkaXNhYmxlZEV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXREaXNhYmxlZERhdGV9XHJcblx0XHRcdFx0XHRcdFx0ZGlzYWJsZWREYXRlcz17ZGlzYWJsZWREYXRlc0xpc3R9XHJcblx0XHRcdFx0XHRcdFx0bWluRGF0ZT17bWluRGF0ZX1cclxuXHRcdFx0XHRcdFx0XHRtYXhEYXRlPXttYXhEYXRlfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShkaXNhYmxlZERhdGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoMyBpZD0nQXV0b0Nsb3NlJyBjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnPlxyXG5cdFx0XHRcdFx0QXV0b0Nsb3NlIDogZmFsc2VcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7YXV0b0Nsb3NlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXQtNCc+XHJcblx0XHRcdFx0XHRcdFx0PER0UGlja2VyIG9uQ2hhbmdlPXtzZXRBdXRvQ2xvc2VGYWxzZX0gYXV0b0Nsb3NlPXtmYWxzZX0gLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxwcmUgY2xhc3NOYW1lPSdtdC00Jz5cclxuXHRcdFx0XHRcdFx0XHR7SlNPTi5zdHJpbmdpZnkoYXV0b0Nsb3NlRmFsc2UsIG51bGwsIDIpfVxyXG5cdFx0XHRcdFx0XHQ8L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDMgaWQ9J1dpdGhvdXRJbnB1dCcgY2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0Jz5cclxuXHRcdFx0XHRcdFdpdGhvdXQgaW5wdXRcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7d2l0aG91dElucHV0U3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXQtNCc+XHJcblx0XHRcdFx0XHRcdFx0PER0Q2FsZW5kYXIgb25DaGFuZ2U9e3NldFdpdGhvdXRJbnB1dH0gLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxwcmUgY2xhc3NOYW1lPSdtdC00Jz57SlNPTi5zdHJpbmdpZnkod2l0aG91dElucHV0LCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00Jz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdDdXN0b21DYWxlbmRlcidcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRDdXN0b20gY2FsZW5kYXI6IGljb25zIC0gaW5wdXQgcGxhY2Vob2xkZXIgLSBzdHlsZXNcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7Y3VzdG9tQ2FsZW5kZXJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHRcdDxiciAvPlxyXG5cdFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPSd0ZXh0LWxnJz5TdHlsZTwvaDQ+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdjc3MnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7Y3VzdG9tQ2FsZW5kZXJTdHlsZX1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldEN1c3RvbUljb25zfVxyXG5cdFx0XHRcdFx0XHRcdC8vIE5leHRCdG5JY29uPXtBcnJvd1JpZ2h0fVxyXG5cdFx0XHRcdFx0XHRcdC8vIFByZXZpb3VzQnRuSWNvbj17QXJyb3dMZWZ0fVxyXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPSdzZWxlY3QgZGF0ZSdcclxuXHRcdFx0XHRcdFx0XHRmcm9tTGFiZWw9J0Zyb20gZGF0ZSdcclxuXHRcdFx0XHRcdFx0XHR0b0xhYmVsPSdUbyBkYXRlJ1xyXG5cdFx0XHRcdFx0XHRcdHR5cGU9J3JhbmdlJ1xyXG5cdFx0XHRcdFx0XHRcdGlucHV0Q2xhc3M9J2N1c3RvbS1pbnB1dCdcclxuXHRcdFx0XHRcdFx0XHRoZWFkZXJDbGFzcz0nY3VzdG9tLWhlYWRlcidcclxuXHRcdFx0XHRcdFx0XHRkYXlzQ2xhc3M9J2N1c3RvbS1kYXlzJ1xyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShjdXN0b21JY29ucywgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L0RvY0xheW91dD5cclxuXHQpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxyXG4iXSwic291cmNlUm9vdCI6IiJ9