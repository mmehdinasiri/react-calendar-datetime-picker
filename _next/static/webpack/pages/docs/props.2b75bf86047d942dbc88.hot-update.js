webpackHotUpdate_N_E("pages/docs/props",{

/***/ "./Constant/Apis.ts":
/*!**************************!*\
  !*** ./Constant/Apis.ts ***!
  \**************************/
/*! exports provided: APIS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APIS", function() { return APIS; });
var APIS = [{
  property: 'onChange',
  type: 'func',
  "default": '-',
  required: 'true',
  description: 'A function that returns an object of selected date/dates.'
}, {
  property: 'initValue',
  type: 'Day | null',
  "default": 'null',
  description: 'You can set a default value for your date using this property.'
}, {
  property: 'type',
  type: 'string',
  "default": 'single',
  description: 'You can choose the selection type that you need to use. There exist 3 types: "single", "range", "multi"'
}, {
  property: 'local',
  type: 'string',
  "default": 'en',
  description: 'This date picker supports both Gregorian and Jalali calenders.To select Gregorian calendar you have to set "local" to "en" and to "fa" for Jalali.'
}, {
  property: 'autoClose',
  type: 'boolean',
  "default": 'true',
  description: 'Calendar modal close automatically, by set autoClose to false you can keep calender modal open even after selecting date(auto closing just works on single and range type)'
}, {
  property: 'withTime',
  type: 'boolean',
  "default": 'false',
  description: 'Should you need to use time in your date picker you can set this prop to true.This prop works only in single and range types.'
}, {
  property: 'showTimeInput',
  type: 'boolean',
  "default": 'false',
  description: 'Helps you to show time in input date picker'
}, {
  property: 'showWeekend',
  type: 'boolean',
  "default": 'false',
  description: 'Marks weekends by changing the color.'
}, {
  property: 'clearBtn',
  type: 'boolean',
  "default": 'false',
  description: 'Add a button to your input to clear you calendar initial date/dates.'
}, {
  property: 'isRequired',
  type: 'boolean',
  "default": 'false',
  description: 'This prop makes your input as a required field in the form validation'
}, {
  property: 'todayBtn',
  type: 'boolean',
  "default": 'false',
  description: 'A button to move fast to the date of today in the calendar.'
}, {
  property: 'onCalenderChange',
  type: 'func',
  "default": '',
  description: 'A callback that runs when the calendar value is changed, to use this feature you should pass initValue '
}, {
  property: 'onCalenderShow',
  type: 'func',
  "default": '',
  description: 'A callback that runs when the calendar opens'
}, {
  property: 'onCalenderHide',
  type: 'func',
  "default": '',
  description: 'A callback that runs when the calendar closes'
}, {
  property: 'maxDate',
  type: 'Day',
  "default": '',
  description: 'You can set this prop to limit the maximum date that the user can select.Periods partially overlapped by maxDate will also be selectable, although React-calendar-dateTime-picker will ensure that no later date is selected.'
}, {
  property: 'minDate',
  type: 'Day',
  "default": '',
  description: 'You can set this prop to limit the minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although React-calendar-dateTime-picker will ensure that no earlier date is selected.	'
}, {
  property: 'disabledDates',
  type: 'Day[]',
  "default": '',
  description: 'A list of dates that you want the user not to select.'
}, {
  property: 'isDisabled',
  type: 'boolean',
  "default": 'false',
  description: 'Use to disable the calendar input'
}, {
  property: 'yearListStyle',
  type: 'string',
  "default": 'grid',
  description: 'Use to change year item list style(accepted value: grid, list)'
}];

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vQ29uc3RhbnQvQXBpcy50cyJdLCJuYW1lcyI6WyJBUElTIiwicHJvcGVydHkiLCJ0eXBlIiwicmVxdWlyZWQiLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBTyxJQUFNQSxJQUFJLEdBQUcsQ0FDbkI7QUFDQ0MsVUFBUSxFQUFFLFVBRFg7QUFFQ0MsTUFBSSxFQUFFLE1BRlA7QUFHQyxhQUFTLEdBSFY7QUFJQ0MsVUFBUSxFQUFFLE1BSlg7QUFLQ0MsYUFBVyxFQUFFO0FBTGQsQ0FEbUIsRUFRbkI7QUFDQ0gsVUFBUSxFQUFFLFdBRFg7QUFFQ0MsTUFBSSxFQUFFLFlBRlA7QUFHQyxhQUFTLE1BSFY7QUFJQ0UsYUFBVyxFQUNWO0FBTEYsQ0FSbUIsRUFlbkI7QUFDQ0gsVUFBUSxFQUFFLE1BRFg7QUFFQ0MsTUFBSSxFQUFFLFFBRlA7QUFHQyxhQUFTLFFBSFY7QUFJQ0UsYUFBVyxFQUNWO0FBTEYsQ0FmbUIsRUFzQm5CO0FBQ0NILFVBQVEsRUFBRSxPQURYO0FBRUNDLE1BQUksRUFBRSxRQUZQO0FBR0MsYUFBUyxJQUhWO0FBSUNFLGFBQVcsRUFDVjtBQUxGLENBdEJtQixFQTZCbkI7QUFDQ0gsVUFBUSxFQUFFLFdBRFg7QUFFQ0MsTUFBSSxFQUFFLFNBRlA7QUFHQyxhQUFTLE1BSFY7QUFJQ0UsYUFBVyxFQUNWO0FBTEYsQ0E3Qm1CLEVBb0NuQjtBQUNDSCxVQUFRLEVBQUUsVUFEWDtBQUVDQyxNQUFJLEVBQUUsU0FGUDtBQUdDLGFBQVMsT0FIVjtBQUlDRSxhQUFXLEVBQ1Y7QUFMRixDQXBDbUIsRUEyQ25CO0FBQ0NILFVBQVEsRUFBRSxlQURYO0FBRUNDLE1BQUksRUFBRSxTQUZQO0FBR0MsYUFBUyxPQUhWO0FBSUNFLGFBQVcsRUFBRTtBQUpkLENBM0NtQixFQWlEbkI7QUFDQ0gsVUFBUSxFQUFFLGFBRFg7QUFFQ0MsTUFBSSxFQUFFLFNBRlA7QUFHQyxhQUFTLE9BSFY7QUFJQ0UsYUFBVyxFQUFFO0FBSmQsQ0FqRG1CLEVBdURuQjtBQUNDSCxVQUFRLEVBQUUsVUFEWDtBQUVDQyxNQUFJLEVBQUUsU0FGUDtBQUdDLGFBQVMsT0FIVjtBQUlDRSxhQUFXLEVBQ1Y7QUFMRixDQXZEbUIsRUE4RG5CO0FBQ0NILFVBQVEsRUFBRSxZQURYO0FBRUNDLE1BQUksRUFBRSxTQUZQO0FBR0MsYUFBUyxPQUhWO0FBSUNFLGFBQVcsRUFDVjtBQUxGLENBOURtQixFQXFFbkI7QUFDQ0gsVUFBUSxFQUFFLFVBRFg7QUFFQ0MsTUFBSSxFQUFFLFNBRlA7QUFHQyxhQUFTLE9BSFY7QUFJQ0UsYUFBVyxFQUFFO0FBSmQsQ0FyRW1CLEVBMkVuQjtBQUNDSCxVQUFRLEVBQUUsa0JBRFg7QUFFQ0MsTUFBSSxFQUFFLE1BRlA7QUFHQyxhQUFTLEVBSFY7QUFJQ0UsYUFBVyxFQUNWO0FBTEYsQ0EzRW1CLEVBa0ZuQjtBQUNDSCxVQUFRLEVBQUUsZ0JBRFg7QUFFQ0MsTUFBSSxFQUFFLE1BRlA7QUFHQyxhQUFTLEVBSFY7QUFJQ0UsYUFBVyxFQUFFO0FBSmQsQ0FsRm1CLEVBd0ZuQjtBQUNDSCxVQUFRLEVBQUUsZ0JBRFg7QUFFQ0MsTUFBSSxFQUFFLE1BRlA7QUFHQyxhQUFTLEVBSFY7QUFJQ0UsYUFBVyxFQUFFO0FBSmQsQ0F4Rm1CLEVBOEZuQjtBQUNDSCxVQUFRLEVBQUUsU0FEWDtBQUVDQyxNQUFJLEVBQUUsS0FGUDtBQUdDLGFBQVMsRUFIVjtBQUlDRSxhQUFXLEVBQ1Y7QUFMRixDQTlGbUIsRUFxR25CO0FBQ0NILFVBQVEsRUFBRSxTQURYO0FBRUNDLE1BQUksRUFBRSxLQUZQO0FBR0MsYUFBUyxFQUhWO0FBSUNFLGFBQVcsRUFDVjtBQUxGLENBckdtQixFQTRHbkI7QUFDQ0gsVUFBUSxFQUFFLGVBRFg7QUFFQ0MsTUFBSSxFQUFFLE9BRlA7QUFHQyxhQUFTLEVBSFY7QUFJQ0UsYUFBVyxFQUFFO0FBSmQsQ0E1R21CLEVBa0huQjtBQUNDSCxVQUFRLEVBQUUsWUFEWDtBQUVDQyxNQUFJLEVBQUUsU0FGUDtBQUdDLGFBQVMsT0FIVjtBQUlDRSxhQUFXLEVBQUU7QUFKZCxDQWxIbUIsRUF3SG5CO0FBQ0NILFVBQVEsRUFBRSxlQURYO0FBRUNDLE1BQUksRUFBRSxRQUZQO0FBR0MsYUFBUyxNQUhWO0FBSUNFLGFBQVcsRUFDVjtBQUxGLENBeEhtQixDQUFiIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL2RvY3MvcHJvcHMuMmI3NWJmODYwNDdkOTQyZGJjODguaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElTID0gW1xyXG5cdHtcclxuXHRcdHByb3BlcnR5OiAnb25DaGFuZ2UnLFxyXG5cdFx0dHlwZTogJ2Z1bmMnLFxyXG5cdFx0ZGVmYXVsdDogJy0nLFxyXG5cdFx0cmVxdWlyZWQ6ICd0cnVlJyxcclxuXHRcdGRlc2NyaXB0aW9uOiAnQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0IG9mIHNlbGVjdGVkIGRhdGUvZGF0ZXMuJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cHJvcGVydHk6ICdpbml0VmFsdWUnLFxyXG5cdFx0dHlwZTogJ0RheSB8IG51bGwnLFxyXG5cdFx0ZGVmYXVsdDogJ251bGwnLFxyXG5cdFx0ZGVzY3JpcHRpb246XHJcblx0XHRcdCdZb3UgY2FuIHNldCBhIGRlZmF1bHQgdmFsdWUgZm9yIHlvdXIgZGF0ZSB1c2luZyB0aGlzIHByb3BlcnR5LidcclxuXHR9LFxyXG5cdHtcclxuXHRcdHByb3BlcnR5OiAndHlwZScsXHJcblx0XHR0eXBlOiAnc3RyaW5nJyxcclxuXHRcdGRlZmF1bHQ6ICdzaW5nbGUnLFxyXG5cdFx0ZGVzY3JpcHRpb246XHJcblx0XHRcdCdZb3UgY2FuIGNob29zZSB0aGUgc2VsZWN0aW9uIHR5cGUgdGhhdCB5b3UgbmVlZCB0byB1c2UuIFRoZXJlIGV4aXN0IDMgdHlwZXM6IFwic2luZ2xlXCIsIFwicmFuZ2VcIiwgXCJtdWx0aVwiJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cHJvcGVydHk6ICdsb2NhbCcsXHJcblx0XHR0eXBlOiAnc3RyaW5nJyxcclxuXHRcdGRlZmF1bHQ6ICdlbicsXHJcblx0XHRkZXNjcmlwdGlvbjpcclxuXHRcdFx0J1RoaXMgZGF0ZSBwaWNrZXIgc3VwcG9ydHMgYm90aCBHcmVnb3JpYW4gYW5kIEphbGFsaSBjYWxlbmRlcnMuVG8gc2VsZWN0IEdyZWdvcmlhbiBjYWxlbmRhciB5b3UgaGF2ZSB0byBzZXQgXCJsb2NhbFwiIHRvIFwiZW5cIiBhbmQgdG8gXCJmYVwiIGZvciBKYWxhbGkuJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cHJvcGVydHk6ICdhdXRvQ2xvc2UnLFxyXG5cdFx0dHlwZTogJ2Jvb2xlYW4nLFxyXG5cdFx0ZGVmYXVsdDogJ3RydWUnLFxyXG5cdFx0ZGVzY3JpcHRpb246XHJcblx0XHRcdCdDYWxlbmRhciBtb2RhbCBjbG9zZSBhdXRvbWF0aWNhbGx5LCBieSBzZXQgYXV0b0Nsb3NlIHRvIGZhbHNlIHlvdSBjYW4ga2VlcCBjYWxlbmRlciBtb2RhbCBvcGVuIGV2ZW4gYWZ0ZXIgc2VsZWN0aW5nIGRhdGUoYXV0byBjbG9zaW5nIGp1c3Qgd29ya3Mgb24gc2luZ2xlIGFuZCByYW5nZSB0eXBlKSdcclxuXHR9LFxyXG5cdHtcclxuXHRcdHByb3BlcnR5OiAnd2l0aFRpbWUnLFxyXG5cdFx0dHlwZTogJ2Jvb2xlYW4nLFxyXG5cdFx0ZGVmYXVsdDogJ2ZhbHNlJyxcclxuXHRcdGRlc2NyaXB0aW9uOlxyXG5cdFx0XHQnU2hvdWxkIHlvdSBuZWVkIHRvIHVzZSB0aW1lIGluIHlvdXIgZGF0ZSBwaWNrZXIgeW91IGNhbiBzZXQgdGhpcyBwcm9wIHRvIHRydWUuVGhpcyBwcm9wIHdvcmtzIG9ubHkgaW4gc2luZ2xlIGFuZCByYW5nZSB0eXBlcy4nXHJcblx0fSxcclxuXHR7XHJcblx0XHRwcm9wZXJ0eTogJ3Nob3dUaW1lSW5wdXQnLFxyXG5cdFx0dHlwZTogJ2Jvb2xlYW4nLFxyXG5cdFx0ZGVmYXVsdDogJ2ZhbHNlJyxcclxuXHRcdGRlc2NyaXB0aW9uOiAnSGVscHMgeW91IHRvIHNob3cgdGltZSBpbiBpbnB1dCBkYXRlIHBpY2tlcidcclxuXHR9LFxyXG5cdHtcclxuXHRcdHByb3BlcnR5OiAnc2hvd1dlZWtlbmQnLFxyXG5cdFx0dHlwZTogJ2Jvb2xlYW4nLFxyXG5cdFx0ZGVmYXVsdDogJ2ZhbHNlJyxcclxuXHRcdGRlc2NyaXB0aW9uOiAnTWFya3Mgd2Vla2VuZHMgYnkgY2hhbmdpbmcgdGhlIGNvbG9yLidcclxuXHR9LFxyXG5cdHtcclxuXHRcdHByb3BlcnR5OiAnY2xlYXJCdG4nLFxyXG5cdFx0dHlwZTogJ2Jvb2xlYW4nLFxyXG5cdFx0ZGVmYXVsdDogJ2ZhbHNlJyxcclxuXHRcdGRlc2NyaXB0aW9uOlxyXG5cdFx0XHQnQWRkIGEgYnV0dG9uIHRvIHlvdXIgaW5wdXQgdG8gY2xlYXIgeW91IGNhbGVuZGFyIGluaXRpYWwgZGF0ZS9kYXRlcy4nXHJcblx0fSxcclxuXHR7XHJcblx0XHRwcm9wZXJ0eTogJ2lzUmVxdWlyZWQnLFxyXG5cdFx0dHlwZTogJ2Jvb2xlYW4nLFxyXG5cdFx0ZGVmYXVsdDogJ2ZhbHNlJyxcclxuXHRcdGRlc2NyaXB0aW9uOlxyXG5cdFx0XHQnVGhpcyBwcm9wIG1ha2VzIHlvdXIgaW5wdXQgYXMgYSByZXF1aXJlZCBmaWVsZCBpbiB0aGUgZm9ybSB2YWxpZGF0aW9uJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cHJvcGVydHk6ICd0b2RheUJ0bicsXHJcblx0XHR0eXBlOiAnYm9vbGVhbicsXHJcblx0XHRkZWZhdWx0OiAnZmFsc2UnLFxyXG5cdFx0ZGVzY3JpcHRpb246ICdBIGJ1dHRvbiB0byBtb3ZlIGZhc3QgdG8gdGhlIGRhdGUgb2YgdG9kYXkgaW4gdGhlIGNhbGVuZGFyLidcclxuXHR9LFxyXG5cdHtcclxuXHRcdHByb3BlcnR5OiAnb25DYWxlbmRlckNoYW5nZScsXHJcblx0XHR0eXBlOiAnZnVuYycsXHJcblx0XHRkZWZhdWx0OiAnJyxcclxuXHRcdGRlc2NyaXB0aW9uOlxyXG5cdFx0XHQnQSBjYWxsYmFjayB0aGF0IHJ1bnMgd2hlbiB0aGUgY2FsZW5kYXIgdmFsdWUgaXMgY2hhbmdlZCwgdG8gdXNlIHRoaXMgZmVhdHVyZSB5b3Ugc2hvdWxkIHBhc3MgaW5pdFZhbHVlICdcclxuXHR9LFxyXG5cdHtcclxuXHRcdHByb3BlcnR5OiAnb25DYWxlbmRlclNob3cnLFxyXG5cdFx0dHlwZTogJ2Z1bmMnLFxyXG5cdFx0ZGVmYXVsdDogJycsXHJcblx0XHRkZXNjcmlwdGlvbjogJ0EgY2FsbGJhY2sgdGhhdCBydW5zIHdoZW4gdGhlIGNhbGVuZGFyIG9wZW5zJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cHJvcGVydHk6ICdvbkNhbGVuZGVySGlkZScsXHJcblx0XHR0eXBlOiAnZnVuYycsXHJcblx0XHRkZWZhdWx0OiAnJyxcclxuXHRcdGRlc2NyaXB0aW9uOiAnQSBjYWxsYmFjayB0aGF0IHJ1bnMgd2hlbiB0aGUgY2FsZW5kYXIgY2xvc2VzJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cHJvcGVydHk6ICdtYXhEYXRlJyxcclxuXHRcdHR5cGU6ICdEYXknLFxyXG5cdFx0ZGVmYXVsdDogJycsXHJcblx0XHRkZXNjcmlwdGlvbjpcclxuXHRcdFx0J1lvdSBjYW4gc2V0IHRoaXMgcHJvcCB0byBsaW1pdCB0aGUgbWF4aW11bSBkYXRlIHRoYXQgdGhlIHVzZXIgY2FuIHNlbGVjdC5QZXJpb2RzIHBhcnRpYWxseSBvdmVybGFwcGVkIGJ5IG1heERhdGUgd2lsbCBhbHNvIGJlIHNlbGVjdGFibGUsIGFsdGhvdWdoIFJlYWN0LWNhbGVuZGFyLWRhdGVUaW1lLXBpY2tlciB3aWxsIGVuc3VyZSB0aGF0IG5vIGxhdGVyIGRhdGUgaXMgc2VsZWN0ZWQuJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cHJvcGVydHk6ICdtaW5EYXRlJyxcclxuXHRcdHR5cGU6ICdEYXknLFxyXG5cdFx0ZGVmYXVsdDogJycsXHJcblx0XHRkZXNjcmlwdGlvbjpcclxuXHRcdFx0J1lvdSBjYW4gc2V0IHRoaXMgcHJvcCB0byBsaW1pdCB0aGUgbWluaW11bSBkYXRlIHRoYXQgdGhlIHVzZXIgY2FuIHNlbGVjdC4gUGVyaW9kcyBwYXJ0aWFsbHkgb3ZlcmxhcHBlZCBieSBtaW5EYXRlIHdpbGwgYWxzbyBiZSBzZWxlY3RhYmxlLCBhbHRob3VnaCBSZWFjdC1jYWxlbmRhci1kYXRlVGltZS1waWNrZXIgd2lsbCBlbnN1cmUgdGhhdCBubyBlYXJsaWVyIGRhdGUgaXMgc2VsZWN0ZWQuXHQnXHJcblx0fSxcclxuXHR7XHJcblx0XHRwcm9wZXJ0eTogJ2Rpc2FibGVkRGF0ZXMnLFxyXG5cdFx0dHlwZTogJ0RheVtdJyxcclxuXHRcdGRlZmF1bHQ6ICcnLFxyXG5cdFx0ZGVzY3JpcHRpb246ICdBIGxpc3Qgb2YgZGF0ZXMgdGhhdCB5b3Ugd2FudCB0aGUgdXNlciBub3QgdG8gc2VsZWN0LidcclxuXHR9LFxyXG5cdHtcclxuXHRcdHByb3BlcnR5OiAnaXNEaXNhYmxlZCcsXHJcblx0XHR0eXBlOiAnYm9vbGVhbicsXHJcblx0XHRkZWZhdWx0OiAnZmFsc2UnLFxyXG5cdFx0ZGVzY3JpcHRpb246ICdVc2UgdG8gZGlzYWJsZSB0aGUgY2FsZW5kYXIgaW5wdXQnXHJcblx0fSxcclxuXHR7XHJcblx0XHRwcm9wZXJ0eTogJ3llYXJMaXN0U3R5bGUnLFxyXG5cdFx0dHlwZTogJ3N0cmluZycsXHJcblx0XHRkZWZhdWx0OiAnZ3JpZCcsXHJcblx0XHRkZXNjcmlwdGlvbjpcclxuXHRcdFx0J1VzZSB0byBjaGFuZ2UgeWVhciBpdGVtIGxpc3Qgc3R5bGUoYWNjZXB0ZWQgdmFsdWU6IGdyaWQsIGxpc3QpJ1xyXG5cdH1cclxuXVxyXG4iXSwic291cmNlUm9vdCI6IiJ9