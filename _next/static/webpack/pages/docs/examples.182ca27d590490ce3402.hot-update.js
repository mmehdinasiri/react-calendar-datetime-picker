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


var _jsxFileName = "E:\\work\\react-calendar-datetime-picker\\website\\pages\\docs\\examples.tsx",
    _this = undefined,
    _s = $RefreshSig$();





 // import { ReactComponent as ArrowLeft } from '../../Component/Icons/arrow-left.svg'
// import { ReactComponent as ArrowRight } from '../../Component/Icons/arrow-right.svg'



var App = function App() {
  _s();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      singleExample = _useState[0],
      setSingleExample = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      singleInitValueExample = _useState2[0],
      setSingleInitValueExample = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      singleInitValueExampleAsync = _useState3[0],
      setSingleInitValueExampleAsync = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    year: 2010,
    month: 3,
    day: 22
  }),
      singleInitValueExampleAsyncInitValue = _useState4[0],
      setSingleInitValueExampleAsyncInitValue = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      singlePersianExample = _useState5[0],
      setSinglePersianExample = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      rangeExample = _useState6[0],
      setRangeExample = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      rangeInitValueExample = _useState7[0],
      setRangeInitValueExample = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      multiExample = _useState8[0],
      setMultiExample = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      multiInitialValueExample = _useState9[0],
      setMultiInitialValueExample = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      singleTimeExample = _useState10[0],
      setSingleTimeExample = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      displayingOption = _useState11[0],
      setDisplayingOption = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      callBackApi = _useState12[0],
      setCallBackApi = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      open = _useState13[0],
      setOpen = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      close = _useState14[0],
      setClose = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      change = _useState15[0],
      setChange = _useState15[1];

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

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      minMax = _useState16[0],
      setMinMax = _useState16[1];

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

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      disabledDate = _useState17[0],
      setDisabledDate = _useState17[1];

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

  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      withoutInput = _useState18[0],
      setWithoutInput = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      customIcons = _useState19[0],
      setCustomIcons = _useState19[1];

  var updateInitValue = function updateInitValue() {
    setSingleInitValueExampleAsyncInitValue({
      year: 2020,
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
        lineNumber: 104,
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
            lineNumber: 112,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 111,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setSingleExample
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 121,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singleExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 122,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 120,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "SingleDayWithInitialDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Single day with initial date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 127,
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
            lineNumber: 135,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            initValue: {
              year: 2019,
              month: 3,
              day: 20
            },
            onChange: setSingleInitValueExample
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 144,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singleInitValueExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 152,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 143,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "updateInitialDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Update initial date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 157,
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
            lineNumber: 165,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 164,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
            onClick: updateInitValue,
            className: "btn rounded-0 mb-2",
            children: "Update init value"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 174,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            initValue: singleInitValueExampleAsyncInitValue,
            onChange: setSingleInitValueExampleAsync
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 177,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singleInitValueExampleAsync, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 181,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 173,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 163,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "selectSinglePersian(Jalali)day",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Select single Jalali day"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 186,
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
            lineNumber: 194,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 193,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setSinglePersianExample,
            local: "fa",
            showWeekend: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 203,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singlePersianExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 208,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 202,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "selectAListOfDaysBetweenTwoDays",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Select a list of days between two days"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 213,
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
            lineNumber: 221,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 220,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setRangeExample,
            type: "range"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 230,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(rangeExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 231,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 229,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "rangeOfDaysWithInitialDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Range of days with initial date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 236,
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
            lineNumber: 244,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 243,
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
            lineNumber: 253,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(rangeInitValueExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 261,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 252,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 242,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "selectMultiDays",
        className: "text-2xl font-bold mb-4  scroll-offset",
        children: "Select multi days"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 266,
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
            lineNumber: 274,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 273,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setMultiExample,
            type: "multi"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 283,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(multiExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 284,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 282,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 272,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "multiDaysWithInitialDate",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Multi days with initial date"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 289,
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
            lineNumber: 297,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 296,
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
            lineNumber: 306,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(multiInitialValueExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 333,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 305,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 295,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 288,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "singleDayWithTime",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Single day with time"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 338,
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
            lineNumber: 346,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 345,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setSingleTimeExample,
            withTime: true,
            showTimeInput: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 355,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(singleTimeExample, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 356,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 354,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 344,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 337,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "showWeekendClearBtnAndTodayBtnOptions",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "ShowWeekend, clearBtn and todayBtn options"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 361,
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
            lineNumber: 369,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 368,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setDisplayingOption,
            showWeekend: true,
            clearBtn: true,
            todayBtn: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 378,
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
          lineNumber: 377,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 367,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 360,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "openCloseAndChangeCallbackApi",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Open, close and change callback api"
      }, void 0, false, {
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
            lineNumber: 397,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 396,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["open: ", open]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 406,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["change: ", change]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 407,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("span", {
            className: "block",
            children: ["close: ", close]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 408,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            type: "single",
            onChange: setCallBackApi,
            onCalenderChange: handleCalendarChange,
            onCalenderShow: handleCalendarOpen,
            onCalenderHide: handleCalendarClose
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 409,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(callBackApi, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 416,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 405,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 395,
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
        lineNumber: 421,
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
            lineNumber: 429,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 428,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 lg:w-1/4 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
            onChange: setMinMax,
            minDate: minDate,
            maxDate: maxDate
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 438,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(minMax, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 443,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 437,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 427,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 420,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "setAListOfDisabledDates",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Set a list of disabled dates"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 448,
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
            lineNumber: 456,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 455,
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
            lineNumber: 465,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(disabledDate, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 471,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 464,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 454,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 447,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4 border-b border-primary border-opacity-50 ",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "WithoutInput",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Without input"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 476,
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
            lineNumber: 481,
            columnNumber: 7
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 480,
          columnNumber: 6
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "w-2/2 xl:w-1/2",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "mt-4",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_calendar_datetime_picker__WEBPACK_IMPORTED_MODULE_2__["DtCalendar"], {
              onChange: setWithoutInput
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 491,
              columnNumber: 8
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 490,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            className: "mt-4",
            children: JSON.stringify(withoutInput, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 493,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 489,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 479,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 475,
      columnNumber: 4
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "my-10 pb-4",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
        id: "CustomCalender",
        className: "text-2xl font-bold mb-4 scroll-offset",
        children: "Custom calender: icons - input placeholder - styles"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 498,
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
            lineNumber: 506,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("br", {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 513,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h4", {
            className: "text-lg",
            children: "Style"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 514,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "rounded",
            style: react_syntax_highlighter_dist_cjs_styles_hljs__WEBPACK_IMPORTED_MODULE_5__["tomorrowNightEighties"],
            language: "css",
            children: _Constant_sampleString__WEBPACK_IMPORTED_MODULE_6__["customCalenderStyle"]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 515,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 505,
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
            lineNumber: 524,
            columnNumber: 7
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
            children: JSON.stringify(customIcons, null, 2)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 536,
            columnNumber: 7
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 523,
          columnNumber: 6
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 504,
        columnNumber: 5
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 497,
      columnNumber: 4
    }, _this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 102,
    columnNumber: 3
  }, _this);
};

_s(App, "vklHkfZ4EhCnpZwMZKrhBHMvBQ8=");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvZG9jcy9leGFtcGxlcy50c3giXSwibmFtZXMiOlsiQXBwIiwidXNlU3RhdGUiLCJzaW5nbGVFeGFtcGxlIiwic2V0U2luZ2xlRXhhbXBsZSIsInNpbmdsZUluaXRWYWx1ZUV4YW1wbGUiLCJzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlIiwic2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jIiwic2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jIiwieWVhciIsIm1vbnRoIiwiZGF5Iiwic2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jSW5pdFZhbHVlIiwic2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jSW5pdFZhbHVlIiwic2luZ2xlUGVyc2lhbkV4YW1wbGUiLCJzZXRTaW5nbGVQZXJzaWFuRXhhbXBsZSIsInJhbmdlRXhhbXBsZSIsInNldFJhbmdlRXhhbXBsZSIsInJhbmdlSW5pdFZhbHVlRXhhbXBsZSIsInNldFJhbmdlSW5pdFZhbHVlRXhhbXBsZSIsIm11bHRpRXhhbXBsZSIsInNldE11bHRpRXhhbXBsZSIsIm11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZSIsInNldE11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZSIsInNpbmdsZVRpbWVFeGFtcGxlIiwic2V0U2luZ2xlVGltZUV4YW1wbGUiLCJkaXNwbGF5aW5nT3B0aW9uIiwic2V0RGlzcGxheWluZ09wdGlvbiIsImNhbGxCYWNrQXBpIiwic2V0Q2FsbEJhY2tBcGkiLCJvcGVuIiwic2V0T3BlbiIsImNsb3NlIiwic2V0Q2xvc2UiLCJjaGFuZ2UiLCJzZXRDaGFuZ2UiLCJoYW5kbGVDYWxlbmRhckNoYW5nZSIsIm5ld0RhdGUiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2FsZW5kYXJDbG9zZSIsImhhbmRsZUNhbGVuZGFyT3BlbiIsIm1pbk1heCIsInNldE1pbk1heCIsIm1heERhdGUiLCJtaW5EYXRlIiwiZGlzYWJsZWREYXRlIiwic2V0RGlzYWJsZWREYXRlIiwiZGlzYWJsZWREYXRlc0xpc3QiLCJ3aXRob3V0SW5wdXQiLCJzZXRXaXRob3V0SW5wdXQiLCJjdXN0b21JY29ucyIsInNldEN1c3RvbUljb25zIiwidXBkYXRlSW5pdFZhbHVlIiwidG9tb3Jyb3dOaWdodEVpZ2h0aWVzIiwic2luZ2xlRXhhbXBsZVN0ciIsIkpTT04iLCJzdHJpbmdpZnkiLCJzaW5nbGVJbml0VmFsdWVFeGFtcGxlU3RyIiwic2luZ2xlVXBkYXRlSW5pdFZhbHVlRXhhbXBsZVN0ciIsInNpbmdsZVBlcnNpYW5FeGFtcGxlU3RyIiwicmFuZ2VFeGFtcGxlU3RyIiwicmFuZ2VJbml0VmFsdWVFRXhhbXBsZVN0ciIsImZyb20iLCJ0byIsIm11bHRpRXhhbXBsZVN0ciIsIm11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZVN0ciIsImhvdXIiLCJtaW51dGUiLCJzaW5nbGVUaW1lRXhhbXBsZVN0ciIsImRpc3BsYXlpbmdPcHRpb25FeGFtcGxlU3RyIiwiY2FsbGJhY2tBcGlFeGFtcGxlU3RyIiwibWluTWF4RXhhbXBsZVN0ciIsImRpc2FibGVkRXhhbXBsZVN0ciIsIndpdGhvdXRJbnB1dFN0ciIsImN1c3RvbUNhbGVuZGVyIiwiY3VzdG9tQ2FsZW5kZXJTdHlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0NBRUE7QUFDQTs7QUFDQTs7QUFtQkEsSUFBTUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBTTtBQUFBOztBQUFBLGtCQUN5QkMsc0RBQVEsQ0FBQyxJQUFELENBRGpDO0FBQUEsTUFDVkMsYUFEVTtBQUFBLE1BQ0tDLGdCQURMOztBQUFBLG1CQUUyQ0Ysc0RBQVEsQ0FBQyxJQUFELENBRm5EO0FBQUEsTUFFVkcsc0JBRlU7QUFBQSxNQUVjQyx5QkFGZDs7QUFBQSxtQkFJaEJKLHNEQUFRLENBQUMsSUFBRCxDQUpRO0FBQUEsTUFHVkssMkJBSFU7QUFBQSxNQUdtQkMsOEJBSG5COztBQUFBLG1CQVFiTixz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O0FBQUE7QUFBQSxtQkFERCxlQWFDO0FBQUEsc0JBQU1JLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixXQUFmLEVBQTRCLElBQTVCLEVBQWtDLENBQWxDO0FBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFiRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBbkJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVBEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTNZRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERDtBQXliQSxDQW5nQkQ7O0dBQU1sRCxHOztLQUFBQSxHO0FBcWdCU0Esa0VBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvZG9jcy9leGFtcGxlcy4xODJjYTI3ZDU5MDQ5MGNlMzQwMi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IER0UGlja2VyLCB7IER0Q2FsZW5kYXIgfSBmcm9tICdyZWFjdC1jYWxlbmRhci1kYXRldGltZS1waWNrZXInXHJcbmltcG9ydCB7IERvY0xheW91dCB9IGZyb20gJy4uLy4uL0NvbXBvbmVudCdcclxuaW1wb3J0IFN5bnRheEhpZ2hsaWdodGVyIGZyb20gJ3JlYWN0LXN5bnRheC1oaWdobGlnaHRlcidcclxuaW1wb3J0IHsgdG9tb3Jyb3dOaWdodEVpZ2h0aWVzIH0gZnJvbSAncmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyL2Rpc3QvY2pzL3N0eWxlcy9obGpzJ1xyXG4vLyBpbXBvcnQgeyBSZWFjdENvbXBvbmVudCBhcyBBcnJvd0xlZnQgfSBmcm9tICcuLi8uLi9Db21wb25lbnQvSWNvbnMvYXJyb3ctbGVmdC5zdmcnXHJcbi8vIGltcG9ydCB7IFJlYWN0Q29tcG9uZW50IGFzIEFycm93UmlnaHQgfSBmcm9tICcuLi8uLi9Db21wb25lbnQvSWNvbnMvYXJyb3ctcmlnaHQuc3ZnJ1xyXG5pbXBvcnQge1xyXG5cdHNpbmdsZUV4YW1wbGVTdHIsXHJcblx0c2luZ2xlUGVyc2lhbkV4YW1wbGVTdHIsXHJcblx0cmFuZ2VFeGFtcGxlU3RyLFxyXG5cdG11bHRpRXhhbXBsZVN0cixcclxuXHRzaW5nbGVUaW1lRXhhbXBsZVN0cixcclxuXHRkaXNwbGF5aW5nT3B0aW9uRXhhbXBsZVN0cixcclxuXHRjYWxsYmFja0FwaUV4YW1wbGVTdHIsXHJcblx0bWluTWF4RXhhbXBsZVN0cixcclxuXHRkaXNhYmxlZEV4YW1wbGVTdHIsXHJcblx0c2luZ2xlSW5pdFZhbHVlRXhhbXBsZVN0cixcclxuXHRyYW5nZUluaXRWYWx1ZUVFeGFtcGxlU3RyLFxyXG5cdG11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZVN0cixcclxuXHRjdXN0b21DYWxlbmRlcixcclxuXHRjdXN0b21DYWxlbmRlclN0eWxlLFxyXG5cdHdpdGhvdXRJbnB1dFN0cixcclxuXHRzaW5nbGVVcGRhdGVJbml0VmFsdWVFeGFtcGxlU3RyXHJcbn0gZnJvbSAnLi4vLi4vQ29uc3RhbnQvc2FtcGxlU3RyaW5nJ1xyXG5cclxuY29uc3QgQXBwID0gKCkgPT4ge1xyXG5cdGNvbnN0IFtzaW5nbGVFeGFtcGxlLCBzZXRTaW5nbGVFeGFtcGxlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW3NpbmdsZUluaXRWYWx1ZUV4YW1wbGUsIHNldFNpbmdsZUluaXRWYWx1ZUV4YW1wbGVdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCBbc2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jLCBzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlQXN5bmNdID1cclxuXHRcdHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW1xyXG5cdFx0c2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jSW5pdFZhbHVlLFxyXG5cdFx0c2V0U2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jSW5pdFZhbHVlXHJcblx0XSA9IHVzZVN0YXRlKHsgeWVhcjogMjAxMCwgbW9udGg6IDMsIGRheTogMjIgfSlcclxuXHRjb25zdCBbc2luZ2xlUGVyc2lhbkV4YW1wbGUsIHNldFNpbmdsZVBlcnNpYW5FeGFtcGxlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW3JhbmdlRXhhbXBsZSwgc2V0UmFuZ2VFeGFtcGxlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW3JhbmdlSW5pdFZhbHVlRXhhbXBsZSwgc2V0UmFuZ2VJbml0VmFsdWVFeGFtcGxlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW211bHRpRXhhbXBsZSwgc2V0TXVsdGlFeGFtcGxlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW211bHRpSW5pdGlhbFZhbHVlRXhhbXBsZSwgc2V0TXVsdGlJbml0aWFsVmFsdWVFeGFtcGxlXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW3NpbmdsZVRpbWVFeGFtcGxlLCBzZXRTaW5nbGVUaW1lRXhhbXBsZV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFtkaXNwbGF5aW5nT3B0aW9uLCBzZXREaXNwbGF5aW5nT3B0aW9uXSA9IHVzZVN0YXRlKG51bGwpXHJcblx0Y29uc3QgW2NhbGxCYWNrQXBpLCBzZXRDYWxsQmFja0FwaV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKDApXHJcblx0Y29uc3QgW2Nsb3NlLCBzZXRDbG9zZV0gPSB1c2VTdGF0ZSgwKVxyXG5cdGNvbnN0IFtjaGFuZ2UsIHNldENoYW5nZV0gPSB1c2VTdGF0ZSgwKVxyXG5cdGNvbnN0IGhhbmRsZUNhbGVuZGFyQ2hhbmdlID0gKG5ld0RhdGU6IGFueSkgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2cobmV3RGF0ZSlcclxuXHRcdGNvbnNvbGUubG9nKCdDYWxlbmRhciBjaGFuZ2VkJylcclxuXHRcdHNldENoYW5nZShjaGFuZ2UgKyAxKVxyXG5cdH1cclxuXHRjb25zdCBoYW5kbGVDYWxlbmRhckNsb3NlID0gKCkgPT4ge1xyXG5cdFx0c2V0Q2xvc2UoY2xvc2UgKyAxKVxyXG5cdFx0Y29uc29sZS5sb2coJ0NhbGVuZGFyIGNsb3NlZCcpXHJcblx0fVxyXG5cdGNvbnN0IGhhbmRsZUNhbGVuZGFyT3BlbiA9ICgpID0+IHtcclxuXHRcdHNldE9wZW4ob3BlbiArIDEpXHJcblx0XHRjb25zb2xlLmxvZygnQ2FsZW5kYXIgb3BlbmVkJylcclxuXHR9XHJcblxyXG5cdGNvbnN0IFttaW5NYXgsIHNldE1pbk1heF0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IG1heERhdGUgPSB7XHJcblx0XHR5ZWFyOiAyMDE2LFxyXG5cdFx0bW9udGg6IDYsXHJcblx0XHRkYXk6IDIzXHJcblx0fVxyXG5cdGNvbnN0IG1pbkRhdGUgPSB7XHJcblx0XHR5ZWFyOiAyMDEyLFxyXG5cdFx0bW9udGg6IDUsXHJcblx0XHRkYXk6IDJcclxuXHR9XHJcblxyXG5cdGNvbnN0IFtkaXNhYmxlZERhdGUsIHNldERpc2FibGVkRGF0ZV0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IGRpc2FibGVkRGF0ZXNMaXN0ID0gW1xyXG5cdFx0e1xyXG5cdFx0XHR5ZWFyOiAyMDE2LFxyXG5cdFx0XHRtb250aDogNixcclxuXHRcdFx0ZGF5OiAxNVxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0eWVhcjogMjAxNixcclxuXHRcdFx0bW9udGg6IDYsXHJcblx0XHRcdGRheTogMTJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHllYXI6IDIwMTYsXHJcblx0XHRcdG1vbnRoOiA2LFxyXG5cdFx0XHRkYXk6IDEwXHJcblx0XHR9XHJcblx0XVxyXG5cdGNvbnN0IFt3aXRob3V0SW5wdXQsIHNldFdpdGhvdXRJbnB1dF0gPSB1c2VTdGF0ZShudWxsKVxyXG5cdGNvbnN0IFtjdXN0b21JY29ucywgc2V0Q3VzdG9tSWNvbnNdID0gdXNlU3RhdGUobnVsbClcclxuXHRjb25zdCB1cGRhdGVJbml0VmFsdWUgPSAoKSA9PiB7XHJcblx0XHRzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlQXN5bmNJbml0VmFsdWUoe1xyXG5cdFx0XHR5ZWFyOiAyMDIwLFxyXG5cdFx0XHRtb250aDogMTIsXHJcblx0XHRcdGRheTogMjVcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PERvY0xheW91dD5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J21iLTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzZWxlY3RTaW5nbGVEYXknXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2VsZWN0IHNpbmdsZSBkYXlcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0zLzQgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7c2luZ2xlRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyIG9uQ2hhbmdlPXtzZXRTaW5nbGVFeGFtcGxlfSAvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShzaW5nbGVFeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdTaW5nbGVEYXlXaXRoSW5pdGlhbERhdGUnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2luZ2xlIGRheSB3aXRoIGluaXRpYWwgZGF0ZVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtzaW5nbGVJbml0VmFsdWVFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRpbml0VmFsdWU9e3tcclxuXHRcdFx0XHRcdFx0XHRcdHllYXI6IDIwMTksXHJcblx0XHRcdFx0XHRcdFx0XHRtb250aDogMyxcclxuXHRcdFx0XHRcdFx0XHRcdGRheTogMjBcclxuXHRcdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShzaW5nbGVJbml0VmFsdWVFeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSd1cGRhdGVJbml0aWFsRGF0ZSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRVcGRhdGUgaW5pdGlhbCBkYXRlXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e3NpbmdsZVVwZGF0ZUluaXRWYWx1ZUV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gb25DbGljaz17dXBkYXRlSW5pdFZhbHVlfSBjbGFzc05hbWU9J2J0biByb3VuZGVkLTAgbWItMic+XHJcblx0XHRcdFx0XHRcdFx0VXBkYXRlIGluaXQgdmFsdWVcclxuXHRcdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdGluaXRWYWx1ZT17c2luZ2xlSW5pdFZhbHVlRXhhbXBsZUFzeW5jSW5pdFZhbHVlfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXRTaW5nbGVJbml0VmFsdWVFeGFtcGxlQXN5bmN9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KHNpbmdsZUluaXRWYWx1ZUV4YW1wbGVBc3luYywgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nc2VsZWN0U2luZ2xlUGVyc2lhbihKYWxhbGkpZGF5J1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdFNlbGVjdCBzaW5nbGUgSmFsYWxpIGRheVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtzaW5nbGVQZXJzaWFuRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldFNpbmdsZVBlcnNpYW5FeGFtcGxlfVxyXG5cdFx0XHRcdFx0XHRcdGxvY2FsPSdmYSdcclxuXHRcdFx0XHRcdFx0XHRzaG93V2Vla2VuZFxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShzaW5nbGVQZXJzaWFuRXhhbXBsZSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nc2VsZWN0QUxpc3RPZkRheXNCZXR3ZWVuVHdvRGF5cydcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTZWxlY3QgYSBsaXN0IG9mIGRheXMgYmV0d2VlbiB0d28gZGF5c1xyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHtyYW5nZUV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlciBvbkNoYW5nZT17c2V0UmFuZ2VFeGFtcGxlfSB0eXBlPSdyYW5nZScgLz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkocmFuZ2VFeGFtcGxlLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdyYW5nZU9mRGF5c1dpdGhJbml0aWFsRGF0ZSdcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRSYW5nZSBvZiBkYXlzIHdpdGggaW5pdGlhbCBkYXRlXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e3JhbmdlSW5pdFZhbHVlRUV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdGluaXRWYWx1ZT17e1xyXG5cdFx0XHRcdFx0XHRcdFx0ZnJvbTogeyB5ZWFyOiAyMDEyLCBtb250aDogNSwgZGF5OiAyIH0sXHJcblx0XHRcdFx0XHRcdFx0XHR0bzogeyB5ZWFyOiAyMDEyLCBtb250aDogNSwgZGF5OiAyMyB9XHJcblx0XHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0UmFuZ2VJbml0VmFsdWVFeGFtcGxlfVxyXG5cdFx0XHRcdFx0XHRcdHR5cGU9J3JhbmdlJ1xyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShyYW5nZUluaXRWYWx1ZUV4YW1wbGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3NlbGVjdE11bHRpRGF5cydcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgIHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2VsZWN0IG11bHRpIGRheXNcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7bXVsdGlFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXIgb25DaGFuZ2U9e3NldE11bHRpRXhhbXBsZX0gdHlwZT0nbXVsdGknIC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KG11bHRpRXhhbXBsZSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nbXVsdGlEYXlzV2l0aEluaXRpYWxEYXRlJ1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSd0ZXh0LTJ4bCBmb250LWJvbGQgbWItNCBzY3JvbGwtb2Zmc2V0J1xyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdE11bHRpIGRheXMgd2l0aCBpbml0aWFsIGRhdGVcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7bXVsdGlJbml0aWFsVmFsdWVFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRpbml0VmFsdWU9e1tcclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0eWVhcjogMjAxMixcclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9udGg6IDUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRheTogMjksXHJcblx0XHRcdFx0XHRcdFx0XHRcdGhvdXI6IDE4LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtaW51dGU6IDExXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR5ZWFyOiAyMDEyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtb250aDogNSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF5OiAyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRob3VyOiAxOCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWludXRlOiAxMVxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0eWVhcjogMjAxMixcclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9udGg6IDYsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRheTogMyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0aG91cjogMTgsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG1pbnV0ZTogMTFcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRdfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtzZXRNdWx0aUluaXRpYWxWYWx1ZUV4YW1wbGV9XHJcblx0XHRcdFx0XHRcdFx0dHlwZT0nbXVsdGknXHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KG11bHRpSW5pdGlhbFZhbHVlRXhhbXBsZSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nc2luZ2xlRGF5V2l0aFRpbWUnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2luZ2xlIGRheSB3aXRoIHRpbWVcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7c2luZ2xlVGltZUV4YW1wbGVTdHJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiBsZzp3LTEvNCB4bDp3LTEvMic+XHJcblx0XHRcdFx0XHRcdDxEdFBpY2tlciBvbkNoYW5nZT17c2V0U2luZ2xlVGltZUV4YW1wbGV9IHdpdGhUaW1lIHNob3dUaW1lSW5wdXQgLz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkoc2luZ2xlVGltZUV4YW1wbGUsIG51bGwsIDIpfTwvcHJlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbXktMTAgcGItNCBib3JkZXItYiBib3JkZXItcHJpbWFyeSBib3JkZXItb3BhY2l0eS01MCAnPlxyXG5cdFx0XHRcdDxoM1xyXG5cdFx0XHRcdFx0aWQ9J3Nob3dXZWVrZW5kQ2xlYXJCdG5BbmRUb2RheUJ0bk9wdGlvbnMnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2hvd1dlZWtlbmQsIGNsZWFyQnRuIGFuZCB0b2RheUJ0biBvcHRpb25zXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e2Rpc3BsYXlpbmdPcHRpb25FeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0RGlzcGxheWluZ09wdGlvbn1cclxuXHRcdFx0XHRcdFx0XHRzaG93V2Vla2VuZFxyXG5cdFx0XHRcdFx0XHRcdGNsZWFyQnRuXHJcblx0XHRcdFx0XHRcdFx0dG9kYXlCdG5cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkoZGlzcGxheWluZ09wdGlvbiwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzXHJcblx0XHRcdFx0XHRpZD0nb3BlbkNsb3NlQW5kQ2hhbmdlQ2FsbGJhY2tBcGknXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0T3BlbiwgY2xvc2UgYW5kIGNoYW5nZSBjYWxsYmFjayBhcGlcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7Y2FsbGJhY2tBcGlFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J2Jsb2NrJz5vcGVuOiB7b3Blbn08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nYmxvY2snPmNoYW5nZToge2NoYW5nZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nYmxvY2snPmNsb3NlOiB7Y2xvc2V9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHR0eXBlPSdzaW5nbGUnXHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldENhbGxCYWNrQXBpfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2FsZW5kZXJDaGFuZ2U9e2hhbmRsZUNhbGVuZGFyQ2hhbmdlfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2FsZW5kZXJTaG93PXtoYW5kbGVDYWxlbmRhck9wZW59XHJcblx0XHRcdFx0XHRcdFx0b25DYWxlbmRlckhpZGU9e2hhbmRsZUNhbGVuZGFyQ2xvc2V9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KGNhbGxCYWNrQXBpLCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzZXRNaW5pbXVtQW5kTWF4aW11bURhdGUnXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00IHNjcm9sbC1vZmZzZXQnXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0U2V0IG1pbmltdW0gYW5kIG1heGltdW0gZGF0ZVxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Jsb2NrIHhsOmZsZXggJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd3LTIvMiB4bDp3LTEvMiBwci0xMCBtYi00IHhsOm1iLTAnPlxyXG5cdFx0XHRcdFx0XHQ8U3ludGF4SGlnaGxpZ2h0ZXJcclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9J3JvdW5kZWQnXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3RvbW9ycm93TmlnaHRFaWdodGllc31cclxuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZT0namF2YXNjcmlwdCdcclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdHttaW5NYXhFeGFtcGxlU3RyfVxyXG5cdFx0XHRcdFx0XHQ8L1N5bnRheEhpZ2hsaWdodGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgbGc6dy0xLzQgeGw6dy0xLzInPlxyXG5cdFx0XHRcdFx0XHQ8RHRQaWNrZXJcclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17c2V0TWluTWF4fVxyXG5cdFx0XHRcdFx0XHRcdG1pbkRhdGU9e21pbkRhdGV9XHJcblx0XHRcdFx0XHRcdFx0bWF4RGF0ZT17bWF4RGF0ZX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHByZT57SlNPTi5zdHJpbmdpZnkobWluTWF4LCBudWxsLCAyKX08L3ByZT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J215LTEwIHBiLTQgYm9yZGVyLWIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLW9wYWNpdHktNTAgJz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdzZXRBTGlzdE9mRGlzYWJsZWREYXRlcydcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRTZXQgYSBsaXN0IG9mIGRpc2FibGVkIGRhdGVzXHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e2Rpc2FibGVkRXhhbXBsZVN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldERpc2FibGVkRGF0ZX1cclxuXHRcdFx0XHRcdFx0XHRkaXNhYmxlZERhdGVzPXtkaXNhYmxlZERhdGVzTGlzdH1cclxuXHRcdFx0XHRcdFx0XHRtaW5EYXRlPXttaW5EYXRlfVxyXG5cdFx0XHRcdFx0XHRcdG1heERhdGU9e21heERhdGV9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxwcmU+e0pTT04uc3RyaW5naWZ5KGRpc2FibGVkRGF0ZSwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00IGJvcmRlci1iIGJvcmRlci1wcmltYXJ5IGJvcmRlci1vcGFjaXR5LTUwICc+XHJcblx0XHRcdFx0PGgzIGlkPSdXaXRob3V0SW5wdXQnIGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCc+XHJcblx0XHRcdFx0XHRXaXRob3V0IGlucHV0XHJcblx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmxvY2sgeGw6ZmxleCAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yIHByLTEwIG1iLTQgeGw6bWItMCc+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdqYXZhc2NyaXB0J1xyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0e3dpdGhvdXRJbnB1dFN0cn1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J210LTQnPlxyXG5cdFx0XHRcdFx0XHRcdDxEdENhbGVuZGFyIG9uQ2hhbmdlPXtzZXRXaXRob3V0SW5wdXR9IC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8cHJlIGNsYXNzTmFtZT0nbXQtNCc+e0pTT04uc3RyaW5naWZ5KHdpdGhvdXRJbnB1dCwgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdteS0xMCBwYi00Jz5cclxuXHRcdFx0XHQ8aDNcclxuXHRcdFx0XHRcdGlkPSdDdXN0b21DYWxlbmRlcidcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT0ndGV4dC0yeGwgZm9udC1ib2xkIG1iLTQgc2Nyb2xsLW9mZnNldCdcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRDdXN0b20gY2FsZW5kZXI6IGljb25zIC0gaW5wdXQgcGxhY2Vob2xkZXIgLSBzdHlsZXNcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdibG9jayB4bDpmbGV4ICc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0yLzIgeGw6dy0xLzIgcHItMTAgbWItNCB4bDptYi0wJz5cclxuXHRcdFx0XHRcdFx0PFN5bnRheEhpZ2hsaWdodGVyXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdyb3VuZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0b21vcnJvd05pZ2h0RWlnaHRpZXN9XHJcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U9J2phdmFzY3JpcHQnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7Y3VzdG9tQ2FsZW5kZXJ9XHJcblx0XHRcdFx0XHRcdDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcblx0XHRcdFx0XHRcdDxiciAvPlxyXG5cdFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPSd0ZXh0LWxnJz5TdHlsZTwvaDQ+XHJcblx0XHRcdFx0XHRcdDxTeW50YXhIaWdobGlnaHRlclxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ncm91bmRlZCdcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17dG9tb3Jyb3dOaWdodEVpZ2h0aWVzfVxyXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlPSdjc3MnXHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHR7Y3VzdG9tQ2FsZW5kZXJTdHlsZX1cclxuXHRcdFx0XHRcdFx0PC9TeW50YXhIaWdobGlnaHRlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMi8yIGxnOnctMS80IHhsOnctMS8yJz5cclxuXHRcdFx0XHRcdFx0PER0UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3NldEN1c3RvbUljb25zfVxyXG5cdFx0XHRcdFx0XHRcdC8vIE5leHRCdG5JY29uPXtBcnJvd1JpZ2h0fVxyXG5cdFx0XHRcdFx0XHRcdC8vIFByZXZpb3VzQnRuSWNvbj17QXJyb3dMZWZ0fVxyXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPSdzZWxlY3QgZGF0ZSdcclxuXHRcdFx0XHRcdFx0XHRmcm9tTGFiZWw9J0Zyb20gZGF0ZSdcclxuXHRcdFx0XHRcdFx0XHR0b0xhYmVsPSdUbyBkYXRlJ1xyXG5cdFx0XHRcdFx0XHRcdHR5cGU9J3JhbmdlJ1xyXG5cdFx0XHRcdFx0XHRcdGlucHV0Q2xhc3M9J2N1c3RvbS1pbnB1dCdcclxuXHRcdFx0XHRcdFx0XHRoZWFkZXJDbGFzcz0nY3VzdG9tLWhlYWRlcidcclxuXHRcdFx0XHRcdFx0XHRkYXlzQ2xhc3M9J2N1c3RvbS1kYXlzJ1xyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8cHJlPntKU09OLnN0cmluZ2lmeShjdXN0b21JY29ucywgbnVsbCwgMil9PC9wcmU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L0RvY0xheW91dD5cclxuXHQpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxyXG4iXSwic291cmNlUm9vdCI6IiJ9