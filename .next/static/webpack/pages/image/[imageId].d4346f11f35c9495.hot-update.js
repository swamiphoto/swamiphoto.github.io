"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/image/[imageId]",{

/***/ "./components/image-displays/lightbox/Lightbox.js":
/*!********************************************************!*\
  !*** ./components/image-displays/lightbox/Lightbox.js ***!
  \********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_to_consumable_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_to_consumable_array */ \"./node_modules/@swc/helpers/esm/_to_consumable_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_HiOutlineX_react_icons_hi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=HiOutlineX!=!react-icons/hi */ \"__barrel_optimize__?names=HiOutlineX!=!./node_modules/react-icons/hi/index.esm.js\");\n/* harmony import */ var _common_images__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/images */ \"./common/images.js\");\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n // Next.js router\n\n // Adjust the import paths\nvar Lightbox = function() {\n    _s();\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    var imageId = router.query.imageId; // Get the dynamic imageId from the query params\n    var _ref = router.query || {}, _ref_previousImageUrls = _ref.previousImageUrls, previousImageUrls = _ref_previousImageUrls === void 0 ? [] : _ref_previousImageUrls, _ref_nextImageUrls = _ref.nextImageUrls, nextImageUrls = _ref_nextImageUrls === void 0 ? [] : _ref_nextImageUrls, from = _ref.from; // Fetch state from the query if needed\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), 2), currentImage = _useState[0], setCurrentImage = _useState[1];\n    var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"default\"), 2), cursorType = _useState1[0], setCursorType = _useState1[1];\n    var _useState2 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), 2), isMiddleSection = _useState2[0], setIsMiddleSection = _useState2[1];\n    // Handle decoding and finding the image URL\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        if (imageId) {\n            var decodedImageUrl = (0,_common_images__WEBPACK_IMPORTED_MODULE_3__.base64Decode)(imageId); // Decode the Base64-encoded image URL\n            var matchingImage = _common_images__WEBPACK_IMPORTED_MODULE_3__.imageMapping[decodedImageUrl]; // Check if it's a hardcoded image\n            if (matchingImage) {\n                setCurrentImage(matchingImage);\n            } else {\n                setCurrentImage(decodedImageUrl); // Set the dynamic image URL\n            }\n        }\n    }, [\n        imageId\n    ]);\n    // Handle mouse movement to set the cursor type for navigation\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        var handleMouseMove = function(event) {\n            var containerWidth = window.innerWidth;\n            var containerHeight = window.innerHeight;\n            var mouseX = event.clientX;\n            var mouseY = event.clientY;\n            // Define the middle 60% section of the screen\n            var isInMiddleSection = mouseY > containerHeight * 0.2 && mouseY < containerHeight * 0.8;\n            setIsMiddleSection(isInMiddleSection);\n            if (isInMiddleSection) {\n                if (mouseX < containerWidth / 2 && previousImageUrls.length > 0) {\n                    setCursorType(\"left\");\n                } else if (mouseX >= containerWidth / 2 && nextImageUrls.length > 0) {\n                    setCursorType(\"right\");\n                } else {\n                    setCursorType(\"default\");\n                }\n            } else {\n                setCursorType(\"default\");\n            }\n        };\n        window.addEventListener(\"mousemove\", handleMouseMove);\n        return function() {\n            window.removeEventListener(\"mousemove\", handleMouseMove);\n        };\n    }, [\n        previousImageUrls,\n        nextImageUrls\n    ]);\n    // Handle image navigation on click (left or right)\n    var handleClick = function() {\n        if (cursorType === \"left\" && previousImageUrls.length > 0) {\n            var previousImage = previousImageUrls[previousImageUrls.length - 1];\n            var encodedPreviousImage = (0,_common_images__WEBPACK_IMPORTED_MODULE_3__.base64Encode)(previousImage); // Encode the previous image URL\n            router.push({\n                pathname: \"/image/\".concat(encodedPreviousImage),\n                query: {\n                    previousImageUrls: previousImageUrls.slice(0, -1).join(\",\"),\n                    nextImageUrls: [\n                        currentImage\n                    ].concat((0,_swc_helpers_to_consumable_array__WEBPACK_IMPORTED_MODULE_5__._)(nextImageUrls)).join(\",\"),\n                    from: from\n                }\n            });\n        }\n        if (cursorType === \"right\" && nextImageUrls.length > 0) {\n            var nextImage = nextImageUrls[0];\n            var encodedNextImage = (0,_common_images__WEBPACK_IMPORTED_MODULE_3__.base64Encode)(nextImage); // Encode the next image URL\n            router.push({\n                pathname: \"/image/\".concat(encodedNextImage),\n                query: {\n                    previousImageUrls: (0,_swc_helpers_to_consumable_array__WEBPACK_IMPORTED_MODULE_5__._)(previousImageUrls).concat([\n                        currentImage\n                    ]).join(\",\"),\n                    nextImageUrls: nextImageUrls.slice(1).join(\",\"),\n                    from: from\n                }\n            });\n        }\n    };\n    // Close the Lightbox and navigate to the previous page or default to \"/\"\n    var handleClose = function(e) {\n        e.stopPropagation(); // Prevent the click event from bubbling up to the parent container\n        if (from) {\n            router.push(from); // Go back to the referring page\n        } else {\n            router.push(\"/\"); // Default to home if no referrer\n        }\n    };\n    if (!currentImage) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Image not found\"\n        }, void 0, false, {\n            fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/lightbox/Lightbox.js\",\n            lineNumber: 102,\n            columnNumber: 12\n        }, _this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50\",\n        onClick: handleClick,\n        style: {\n            cursor: cursorType === \"left\" ? 'url(\"/left-arrow.svg\") 24 24, auto' : cursorType === \"right\" ? 'url(\"/right-arrow.svg\") 24 24, auto' : \"default\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"absolute top-4 right-4 text-white text-3xl p-2 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out z-60\",\n                onClick: handleClose,\n                style: {\n                    zIndex: 60\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_HiOutlineX_react_icons_hi__WEBPACK_IMPORTED_MODULE_6__.HiOutlineX, {}, void 0, false, {\n                    fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/lightbox/Lightbox.js\",\n                    lineNumber: 113,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/lightbox/Lightbox.js\",\n                lineNumber: 112,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative w-full h-full flex items-center justify-center p-5\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                    src: currentImage + \"?width=1300\",\n                    alt: \"Current Image\",\n                    className: \"max-h-full max-w-full object-contain\"\n                }, void 0, false, {\n                    fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/lightbox/Lightbox.js\",\n                    lineNumber: 116,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/lightbox/Lightbox.js\",\n                lineNumber: 115,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/lightbox/Lightbox.js\",\n        lineNumber: 106,\n        columnNumber: 5\n    }, _this);\n};\n_s(Lightbox, \"IwbYBJFbW6CLGwNI8RG/Q0xoyFk=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Lightbox;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Lightbox);\nvar _c;\n$RefreshReg$(_c, \"Lightbox\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2ltYWdlLWRpc3BsYXlzL2xpZ2h0Ym94L0xpZ2h0Ym94LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDWCxDQUFDLGlCQUFpQjtBQUNkO0FBQ3NDLENBQUMsMEJBQTBCO0FBRTdHLElBQU1RLFdBQVc7O0lBQ2YsSUFBTUMsU0FBU04sc0RBQVNBO0lBQ3hCLElBQU0sVUFBY00sT0FBT0UsS0FBSyxDQUF4QkQsU0FBMEIsZ0RBQWdEO0lBQ2xGLElBQTZERCxPQUFBQSxPQUFPRSxLQUFLLElBQUksQ0FBQyw0QkFBakJGLEtBQXJERyxtQkFBQUEsd0RBQW9CLEVBQUUsZ0RBQStCSCxLQUE3QkksZUFBQUEsZ0RBQWdCLEVBQUUsdUJBQUVDLE9BQVNMLEtBQVRLLE1BQTZCLHVDQUF1QztJQUV4SCxJQUF3Q1osWUFBQUEsK0RBQUFBLENBQUFBLCtDQUFRQSxDQUFDLFdBQTFDYSxlQUFpQ2IsY0FBbkJjLGtCQUFtQmQ7SUFDeEMsSUFBb0NBLGFBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBQyxnQkFBdENlLGFBQTZCZixlQUFqQmdCLGdCQUFpQmhCO0lBQ3BDLElBQThDQSxhQUFBQSwrREFBQUEsQ0FBQUEsK0NBQVFBLENBQUMsWUFBaERpQixrQkFBdUNqQixlQUF0QmtCLHFCQUFzQmxCO0lBRTlDLDRDQUE0QztJQUM1Q0QsZ0RBQVNBLENBQUM7UUFDUixJQUFJUyxTQUFTO1lBQ1gsSUFBTVcsa0JBQWtCZCw0REFBWUEsQ0FBQ0csVUFBVSxzQ0FBc0M7WUFFckYsSUFBTVksZ0JBQWdCakIsd0RBQVksQ0FBQ2dCLGdCQUFnQixFQUFFLGtDQUFrQztZQUN2RixJQUFJQyxlQUFlO2dCQUNqQk4sZ0JBQWdCTTtZQUNsQixPQUFPO2dCQUNMTixnQkFBZ0JLLGtCQUFrQiw0QkFBNEI7WUFDaEU7UUFDRjtJQUNGLEdBQUc7UUFBQ1g7S0FBUTtJQUVaLDhEQUE4RDtJQUM5RFQsZ0RBQVNBLENBQUM7UUFDUixJQUFNc0Isa0JBQWtC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QVU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTlFO0dBbEhNM0M7O1FBQ1dMLGtEQUFTQTs7O0tBRHBCSztBQW9ITiwrREFBZUEsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL2ltYWdlLWRpc3BsYXlzL2xpZ2h0Ym94L0xpZ2h0Ym94LmpzPzlhMzEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiOyAvLyBOZXh0LmpzIHJvdXRlclxuaW1wb3J0IHsgSGlPdXRsaW5lWCB9IGZyb20gXCJyZWFjdC1pY29ucy9oaVwiO1xuaW1wb3J0IHsgaW1hZ2VNYXBwaW5nLCBiYXNlNjRFbmNvZGUsIGJhc2U2NERlY29kZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vaW1hZ2VzXCI7IC8vIEFkanVzdCB0aGUgaW1wb3J0IHBhdGhzXG5cbmNvbnN0IExpZ2h0Ym94ID0gKCkgPT4ge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgeyBpbWFnZUlkIH0gPSByb3V0ZXIucXVlcnk7IC8vIEdldCB0aGUgZHluYW1pYyBpbWFnZUlkIGZyb20gdGhlIHF1ZXJ5IHBhcmFtc1xuICBjb25zdCB7IHByZXZpb3VzSW1hZ2VVcmxzID0gW10sIG5leHRJbWFnZVVybHMgPSBbXSwgZnJvbSB9ID0gcm91dGVyLnF1ZXJ5IHx8IHt9OyAvLyBGZXRjaCBzdGF0ZSBmcm9tIHRoZSBxdWVyeSBpZiBuZWVkZWRcblxuICBjb25zdCBbY3VycmVudEltYWdlLCBzZXRDdXJyZW50SW1hZ2VdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtjdXJzb3JUeXBlLCBzZXRDdXJzb3JUeXBlXSA9IHVzZVN0YXRlKFwiZGVmYXVsdFwiKTtcbiAgY29uc3QgW2lzTWlkZGxlU2VjdGlvbiwgc2V0SXNNaWRkbGVTZWN0aW9uXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBIYW5kbGUgZGVjb2RpbmcgYW5kIGZpbmRpbmcgdGhlIGltYWdlIFVSTFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpbWFnZUlkKSB7XG4gICAgICBjb25zdCBkZWNvZGVkSW1hZ2VVcmwgPSBiYXNlNjREZWNvZGUoaW1hZ2VJZCk7IC8vIERlY29kZSB0aGUgQmFzZTY0LWVuY29kZWQgaW1hZ2UgVVJMXG5cbiAgICAgIGNvbnN0IG1hdGNoaW5nSW1hZ2UgPSBpbWFnZU1hcHBpbmdbZGVjb2RlZEltYWdlVXJsXTsgLy8gQ2hlY2sgaWYgaXQncyBhIGhhcmRjb2RlZCBpbWFnZVxuICAgICAgaWYgKG1hdGNoaW5nSW1hZ2UpIHtcbiAgICAgICAgc2V0Q3VycmVudEltYWdlKG1hdGNoaW5nSW1hZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0Q3VycmVudEltYWdlKGRlY29kZWRJbWFnZVVybCk7IC8vIFNldCB0aGUgZHluYW1pYyBpbWFnZSBVUkxcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtpbWFnZUlkXSk7XG5cbiAgLy8gSGFuZGxlIG1vdXNlIG1vdmVtZW50IHRvIHNldCB0aGUgY3Vyc29yIHR5cGUgZm9yIG5hdmlnYXRpb25cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBjb25zdCBtb3VzZVggPSBldmVudC5jbGllbnRYO1xuICAgICAgY29uc3QgbW91c2VZID0gZXZlbnQuY2xpZW50WTtcblxuICAgICAgLy8gRGVmaW5lIHRoZSBtaWRkbGUgNjAlIHNlY3Rpb24gb2YgdGhlIHNjcmVlblxuICAgICAgY29uc3QgaXNJbk1pZGRsZVNlY3Rpb24gPSBtb3VzZVkgPiBjb250YWluZXJIZWlnaHQgKiAwLjIgJiYgbW91c2VZIDwgY29udGFpbmVySGVpZ2h0ICogMC44O1xuICAgICAgc2V0SXNNaWRkbGVTZWN0aW9uKGlzSW5NaWRkbGVTZWN0aW9uKTtcblxuICAgICAgaWYgKGlzSW5NaWRkbGVTZWN0aW9uKSB7XG4gICAgICAgIGlmIChtb3VzZVggPCBjb250YWluZXJXaWR0aCAvIDIgJiYgcHJldmlvdXNJbWFnZVVybHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHNldEN1cnNvclR5cGUoXCJsZWZ0XCIpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vdXNlWCA+PSBjb250YWluZXJXaWR0aCAvIDIgJiYgbmV4dEltYWdlVXJscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc2V0Q3Vyc29yVHlwZShcInJpZ2h0XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEN1cnNvclR5cGUoXCJkZWZhdWx0XCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRDdXJzb3JUeXBlKFwiZGVmYXVsdFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB9O1xuICB9LCBbcHJldmlvdXNJbWFnZVVybHMsIG5leHRJbWFnZVVybHNdKTtcblxuICAvLyBIYW5kbGUgaW1hZ2UgbmF2aWdhdGlvbiBvbiBjbGljayAobGVmdCBvciByaWdodClcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKGN1cnNvclR5cGUgPT09IFwibGVmdFwiICYmIHByZXZpb3VzSW1hZ2VVcmxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzSW1hZ2UgPSBwcmV2aW91c0ltYWdlVXJsc1twcmV2aW91c0ltYWdlVXJscy5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IGVuY29kZWRQcmV2aW91c0ltYWdlID0gYmFzZTY0RW5jb2RlKHByZXZpb3VzSW1hZ2UpOyAvLyBFbmNvZGUgdGhlIHByZXZpb3VzIGltYWdlIFVSTFxuXG4gICAgICByb3V0ZXIucHVzaCh7XG4gICAgICAgIHBhdGhuYW1lOiBgL2ltYWdlLyR7ZW5jb2RlZFByZXZpb3VzSW1hZ2V9YCxcbiAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICBwcmV2aW91c0ltYWdlVXJsczogcHJldmlvdXNJbWFnZVVybHMuc2xpY2UoMCwgLTEpLmpvaW4oXCIsXCIpLFxuICAgICAgICAgIG5leHRJbWFnZVVybHM6IFtjdXJyZW50SW1hZ2UsIC4uLm5leHRJbWFnZVVybHNdLmpvaW4oXCIsXCIpLFxuICAgICAgICAgIGZyb20sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY3Vyc29yVHlwZSA9PT0gXCJyaWdodFwiICYmIG5leHRJbWFnZVVybHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbmV4dEltYWdlID0gbmV4dEltYWdlVXJsc1swXTtcbiAgICAgIGNvbnN0IGVuY29kZWROZXh0SW1hZ2UgPSBiYXNlNjRFbmNvZGUobmV4dEltYWdlKTsgLy8gRW5jb2RlIHRoZSBuZXh0IGltYWdlIFVSTFxuXG4gICAgICByb3V0ZXIucHVzaCh7XG4gICAgICAgIHBhdGhuYW1lOiBgL2ltYWdlLyR7ZW5jb2RlZE5leHRJbWFnZX1gLFxuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIHByZXZpb3VzSW1hZ2VVcmxzOiBbLi4ucHJldmlvdXNJbWFnZVVybHMsIGN1cnJlbnRJbWFnZV0uam9pbihcIixcIiksXG4gICAgICAgICAgbmV4dEltYWdlVXJsczogbmV4dEltYWdlVXJscy5zbGljZSgxKS5qb2luKFwiLFwiKSxcbiAgICAgICAgICBmcm9tLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIENsb3NlIHRoZSBMaWdodGJveCBhbmQgbmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIHBhZ2Ugb3IgZGVmYXVsdCB0byBcIi9cIlxuICBjb25zdCBoYW5kbGVDbG9zZSA9IChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCB0aGUgY2xpY2sgZXZlbnQgZnJvbSBidWJibGluZyB1cCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxuICAgIGlmIChmcm9tKSB7XG4gICAgICByb3V0ZXIucHVzaChmcm9tKTsgLy8gR28gYmFjayB0byB0aGUgcmVmZXJyaW5nIHBhZ2VcbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVyLnB1c2goXCIvXCIpOyAvLyBEZWZhdWx0IHRvIGhvbWUgaWYgbm8gcmVmZXJyZXJcbiAgICB9XG4gIH07XG5cbiAgaWYgKCFjdXJyZW50SW1hZ2UpIHtcbiAgICByZXR1cm4gPGRpdj5JbWFnZSBub3QgZm91bmQ8L2Rpdj47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS05MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTUwXCJcbiAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSAvLyBFbmFibGUgY2xpY2tpbmcgb24gbGVmdCBhbmQgcmlnaHQgc2lkZXMgZm9yIG5hdmlnYXRpb25cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGN1cnNvcjogY3Vyc29yVHlwZSA9PT0gXCJsZWZ0XCIgPyAndXJsKFwiL2xlZnQtYXJyb3cuc3ZnXCIpIDI0IDI0LCBhdXRvJyA6IGN1cnNvclR5cGUgPT09IFwicmlnaHRcIiA/ICd1cmwoXCIvcmlnaHQtYXJyb3cuc3ZnXCIpIDI0IDI0LCBhdXRvJyA6IFwiZGVmYXVsdFwiLFxuICAgICAgfX0+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC00IHJpZ2h0LTQgdGV4dC13aGl0ZSB0ZXh0LTN4bCBwLTIgb3BhY2l0eS03MCBob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uLW9wYWNpdHkgZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0IHotNjBcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZX0gc3R5bGU9e3sgekluZGV4OiA2MCB9fT5cbiAgICAgICAgPEhpT3V0bGluZVggLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgaC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNVwiPlxuICAgICAgICA8aW1nIHNyYz17Y3VycmVudEltYWdlICsgXCI/d2lkdGg9MTMwMFwifSBhbHQ9XCJDdXJyZW50IEltYWdlXCIgY2xhc3NOYW1lPVwibWF4LWgtZnVsbCBtYXgtdy1mdWxsIG9iamVjdC1jb250YWluXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlnaHRib3g7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkhpT3V0bGluZVgiLCJpbWFnZU1hcHBpbmciLCJiYXNlNjRFbmNvZGUiLCJiYXNlNjREZWNvZGUiLCJMaWdodGJveCIsInJvdXRlciIsImltYWdlSWQiLCJxdWVyeSIsInByZXZpb3VzSW1hZ2VVcmxzIiwibmV4dEltYWdlVXJscyIsImZyb20iLCJjdXJyZW50SW1hZ2UiLCJzZXRDdXJyZW50SW1hZ2UiLCJjdXJzb3JUeXBlIiwic2V0Q3Vyc29yVHlwZSIsImlzTWlkZGxlU2VjdGlvbiIsInNldElzTWlkZGxlU2VjdGlvbiIsImRlY29kZWRJbWFnZVVybCIsIm1hdGNoaW5nSW1hZ2UiLCJoYW5kbGVNb3VzZU1vdmUiLCJldmVudCIsImNvbnRhaW5lcldpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImNvbnRhaW5lckhlaWdodCIsImlubmVySGVpZ2h0IiwibW91c2VYIiwiY2xpZW50WCIsIm1vdXNlWSIsImNsaWVudFkiLCJpc0luTWlkZGxlU2VjdGlvbiIsImxlbmd0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xpY2siLCJwcmV2aW91c0ltYWdlIiwiZW5jb2RlZFByZXZpb3VzSW1hZ2UiLCJwdXNoIiwicGF0aG5hbWUiLCJzbGljZSIsImpvaW4iLCJuZXh0SW1hZ2UiLCJlbmNvZGVkTmV4dEltYWdlIiwiaGFuZGxlQ2xvc2UiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiZGl2IiwiY2xhc3NOYW1lIiwib25DbGljayIsInN0eWxlIiwiY3Vyc29yIiwiYnV0dG9uIiwiekluZGV4IiwiaW1nIiwic3JjIiwiYWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/image-displays/lightbox/Lightbox.js\n"));

/***/ })

});