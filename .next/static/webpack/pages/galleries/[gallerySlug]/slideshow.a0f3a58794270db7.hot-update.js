"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/galleries/[gallerySlug]/slideshow",{

/***/ "./components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js":
/*!*****************************************************************************************************!*\
  !*** ./components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js ***!
  \*****************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_responsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-responsive */ \"./node_modules/react-responsive/dist/esm/index.js\");\n/* harmony import */ var _common_images__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../common/images */ \"./common/images.js\");\n/* harmony import */ var _FilmStackSlideshowLayout_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FilmStackSlideshowLayout.module.css */ \"./components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.module.css\");\n/* harmony import */ var _FilmStackSlideshowLayout_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_FilmStackSlideshowLayout_module_css__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nvar FilmStackSlideshowLayout = function(param) {\n    var imageUrls = param.imageUrls, currentImageIndex = param.currentImageIndex, transitioning = param.transitioning, aspectRatios = param.aspectRatios, captions = param.captions, hideCaptionsOnMobile = param.hideCaptionsOnMobile;\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), tilts = _useState[0], setTilts = _useState[1];\n    var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), zTilts = _useState1[0], setZTilts = _useState1[1];\n    var _useState2 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), moveXs = _useState2[0], setMoveXs = _useState2[1];\n    var _useState3 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), moveYs = _useState3[0], setMoveYs = _useState3[1];\n    var _useState4 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), durations = _useState4[0], setDurations = _useState4[1];\n    var isMobile = (0,react_responsive__WEBPACK_IMPORTED_MODULE_5__.useMediaQuery)({\n        query: \"(max-width: 768px)\"\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        if (imageUrls.length > 0) {\n            var newTilts = imageUrls.map(function() {\n                return Math.random() * 12 - 6;\n            });\n            var newZTilts = imageUrls.map(function() {\n                return Math.random() * 20 - 10;\n            });\n            var newMoveXs = imageUrls.map(function() {\n                return \"\".concat(Math.random() * 15 - 5, \"px\");\n            });\n            var newMoveYs = imageUrls.map(function() {\n                return \"\".concat(Math.random() * 20 - 5, \"px\");\n            });\n            var newDurations = imageUrls.map(function() {\n                return \"\".concat(Math.random() * 2 + 3, \"s\");\n            });\n            setTilts(newTilts);\n            setZTilts(newZTilts);\n            setMoveXs(newMoveXs);\n            setMoveYs(newMoveYs);\n            setDurations(newDurations);\n        }\n    }, [\n        imageUrls\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"slideshow-container mt-8 md:mt-0\",\n        children: imageUrls.map(function(url, index) {\n            // Randomly choose left or right for each image\n            var slideDirection = Math.random() < 0.5 ? \"left\" : \"right\";\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"film-stack-image \".concat(aspectRatios[index] > 1 ? \"horizontal\" : \"vertical\", \" \").concat(index === currentImageIndex ? transitioning ? \"slide-out-\".concat(slideDirection) : \"slide-out-\".concat(slideDirection, \" visible\") : index > currentImageIndex ? \"stacked\" : \"hidden\"),\n                style: {\n                    \"--rotate\": \"\".concat(tilts[index], \"deg\"),\n                    \"--rotateZ\": \"\".concat(zTilts[index], \"deg\"),\n                    \"--moveX\": moveXs[index],\n                    \"--moveY\": moveYs[index],\n                    \"--duration\": durations[index],\n                    zIndex: imageUrls.length - index\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: (0,_common_images__WEBPACK_IMPORTED_MODULE_2__.getCloudimageUrl)(url, {\n                            width: 1300,\n                            quality: 80\n                        }),\n                        alt: \"Image \".concat(index + 1)\n                    }, void 0, false, {\n                        fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\",\n                        lineNumber: 49,\n                        columnNumber: 13\n                    }, _this),\n                    (!isMobile || !hideCaptionsOnMobile) && captions[index] && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"absolute top-10 left-4 w-3/5 p-5\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-left bg-yellow-200 font-mono shadow-lg transform rotate-1\",\n                                style: {\n                                    backgroundImage: \"url('images/paper2.jpg')\",\n                                    backgroundSize: \"cover\",\n                                    boxShadow: \"2px 2px 8px rgba(0,0,0,0.2)\",\n                                    clipPath: \"url(#torn-edge-clip)\",\n                                    padding: \"20px\"\n                                },\n                                children: captions[index]\n                            }, void 0, false, {\n                                fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\",\n                                lineNumber: 53,\n                                columnNumber: 17\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                                width: \"0\",\n                                height: \"0\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"clipPath\", {\n                                    id: \"torn-edge-clip\",\n                                    clipPathUnits: \"objectBoundingBox\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                        d: \"M0,0 h1 v0.7 l-0.1,0.05 l0.05,0.05 l-0.05,0.05 l0.1,0.05 v0.7 h-1 z\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\",\n                                        lineNumber: 66,\n                                        columnNumber: 21\n                                    }, _this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\",\n                                    lineNumber: 65,\n                                    columnNumber: 19\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\",\n                                lineNumber: 64,\n                                columnNumber: 17\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\",\n                        lineNumber: 52,\n                        columnNumber: 15\n                    }, _this)\n                ]\n            }, index, true, {\n                fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\",\n                lineNumber: 38,\n                columnNumber: 11\n            }, _this);\n        })\n    }, void 0, false, {\n        fileName: \"/Users/swami/Library/Mobile Documents/com~apple~CloudDocs/Contexts/sp/Code/swamiphoto.github.io/components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, _this);\n};\n_s(FilmStackSlideshowLayout, \"wgKzJ0lZpXBUhMBFq5xU+p4hhiE=\", false, function() {\n    return [\n        react_responsive__WEBPACK_IMPORTED_MODULE_5__.useMediaQuery\n    ];\n});\n_c = FilmStackSlideshowLayout;\nFilmStackSlideshowLayout.propTypes = {\n    imageUrls: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().array).isRequired,\n    currentImageIndex: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().number).isRequired,\n    transitioning: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool).isRequired,\n    aspectRatios: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().array).isRequired,\n    captions: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object).isRequired,\n    hideCaptionsOnMobile: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool).isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (FilmStackSlideshowLayout);\nvar _c;\n$RefreshReg$(_c, \"FilmStackSlideshowLayout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2ltYWdlLWRpc3BsYXlzL3NsaWRlc2hvdy9maWxtLXN0YWNrLXNsaWRlc2hvdy1sYXlvdXQvRmlsbVN0YWNrU2xpZGVzaG93TGF5b3V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDaEI7QUFDYztBQUNZO0FBQ0Y7QUFFM0QsSUFBTU8sMkJBQTJCO1FBQUdDLGtCQUFBQSxXQUFXQywwQkFBQUEsbUJBQW1CQyxzQkFBQUEsZUFBZUMscUJBQUFBLGNBQWNDLGlCQUFBQSxVQUFVQyw2QkFBQUE7O0lBQ3ZHLElBQTBCWCxZQUFBQSwrREFBQUEsQ0FBQUEsK0NBQVFBLENBQUMsRUFBRSxPQUE5QlksUUFBbUJaLGNBQVphLFdBQVliO0lBQzFCLElBQTRCQSxhQUFBQSwrREFBQUEsQ0FBQUEsK0NBQVFBLENBQUMsRUFBRSxPQUFoQ2MsU0FBcUJkLGVBQWJlLFlBQWFmO0lBQzVCLElBQTRCQSxhQUFBQSwrREFBQUEsQ0FBQUEsK0NBQVFBLENBQUMsRUFBRSxPQUFoQ2dCLFNBQXFCaEIsZUFBYmlCLFlBQWFqQjtJQUM1QixJQUE0QkEsYUFBQUEsK0RBQUFBLENBQUFBLCtDQUFRQSxDQUFDLEVBQUUsT0FBaENrQixTQUFxQmxCLGVBQWJtQixZQUFhbkI7SUFDNUIsSUFBa0NBLGFBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBQyxFQUFFLE9BQXRDb0IsWUFBMkJwQixlQUFoQnFCLGVBQWdCckI7SUFDbEMsSUFBTXNCLFdBQVdwQiwrREFBYUEsQ0FBQztRQUFFcUIsT0FBTztJQUFxQjtJQUU3RHhCLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSU8sVUFBVWtCLE1BQU0sR0FBRyxHQUFHO1lBQ3hCLElBQU1DLFdBQVduQixVQUFVb0IsR0FBRyxDQUFDO3VCQUFNQyxLQUFLQyxNQUFNLEtBQUssS0FBSzs7WUFDMUQsSUFBTUMsWUFBWXZCLFVBQVVvQixHQUFHLENBQUM7dUJBQU1DLEtBQUtDLE1BQU0sS0FBSyxLQUFLOztZQUMzRCxJQUFNRSxZQUFZeEIsVUFBVW9CLEdBQUcsQ0FBQzt1QkFBTSxHQUEwQixPQUF2QkMsS0FBS0MsTUFBTSxLQUFLLEtBQUssR0FBRTs7WUFDaEUsSUFBTUcsWUFBWXpCLFVBQVVvQixHQUFHLENBQUM7dUJBQU0sR0FBMEIsT0FBdkJDLEtBQUtDLE1BQU0sS0FBSyxLQUFLLEdBQUU7O1lBQ2hFLElBQU1JLGVBQWUxQixVQUFVb0IsR0FBRyxDQUFDO3VCQUFNLEdBQXlCLE9BQXRCQyxLQUFLQyxNQUFNLEtBQUssSUFBSSxHQUFFOztZQUVsRWYsU0FBU1k7WUFDVFYsVUFBVWM7WUFDVlosVUFBVWE7WUFDVlgsVUFBVVk7WUFDVlYsYUFBYVc7UUFDZjtJQUNGLEdBQUc7UUFBQzFCO0tBQVU7SUFFZCxxQkFDRSw4REFBQzJCO1FBQUlDLFdBQVU7a0JBQ1o1QixVQUFVb0IsR0FBRyxDQUFDLFNBQUNTLEtBQUtDO1lBQ25CLCtDQUErQztZQUMvQyxJQUFNQyxpQkFBaUJWLEtBQUtDLE1BQU0sS0FBSyxNQUFNLFNBQVM7WUFFdEQscUJBQ0UsOERBQUNLO2dCQUVDQyxXQUFXLG9CQUEyRUUsT0FBdkQzQixZQUFZLENBQUMyQixNQUFNLEdBQUcsSUFBSSxlQUFlLFlBQVcsS0FBNEssT0FBektBLFVBQVU3QixvQkFBcUJDLGdCQUFnQixhQUE0QixPQUFmNkIsa0JBQW1CLGFBQTRCLE9BQWZBLGdCQUFlLGNBQWFELFFBQVE3QixvQkFBb0IsWUFBWTtnQkFDdFArQixPQUFPO29CQUNMLFlBQVksR0FBZ0IsT0FBYjFCLEtBQUssQ0FBQ3dCLE1BQU0sRUFBQztvQkFDNUIsYUFBYSxHQUFpQixPQUFkdEIsTUFBTSxDQUFDc0IsTUFBTSxFQUFDO29CQUM5QixXQUFXcEIsTUFBTSxDQUFDb0IsTUFBTTtvQkFDeEIsV0FBV2xCLE1BQU0sQ0FBQ2tCLE1BQU07b0JBQ3hCLGNBQWNoQixTQUFTLENBQUNnQixNQUFNO29CQUM5QkcsUUFBUWpDLFVBQVVrQixNQUFNLEdBQUdZO2dCQUM3Qjs7a0NBQ0EsOERBQUNJO3dCQUFJQyxLQUFLdEMsZ0VBQWdCQSxDQUFDZ0MsS0FBSzs0QkFBRU8sT0FBTzs0QkFBTUMsU0FBUzt3QkFBRzt3QkFBSUMsS0FBSyxTQUFtQixPQUFWUixRQUFROzs7Ozs7b0JBRW5GLEVBQUNkLFlBQVksQ0FBQ1gsb0JBQW1CLEtBQU1ELFFBQVEsQ0FBQzBCLE1BQU0sa0JBQ3RELDhEQUFDSDt3QkFBSUMsV0FBVTs7MENBQ2IsOERBQUNEO2dDQUNDQyxXQUFVO2dDQUNWSSxPQUFPO29DQUNMTyxpQkFBaUI7b0NBQ2pCQyxnQkFBZ0I7b0NBQ2hCQyxXQUFXO29DQUNYQyxVQUFVO29DQUNWQyxTQUFTO2dDQUNYOzBDQUNDdkMsUUFBUSxDQUFDMEIsTUFBTTs7Ozs7OzBDQUVsQiw4REFBQ2M7Z0NBQUlSLE9BQU07Z0NBQUlTLFFBQU87MENBQ3BCLDRFQUFDSDtvQ0FBU0ksSUFBRztvQ0FBaUJDLGVBQWM7OENBQzFDLDRFQUFDQzt3Q0FBS0MsR0FBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEzQlhuQjs7Ozs7UUFrQ1g7Ozs7OztBQUdOO0dBckVNL0I7O1FBTWFILDJEQUFhQTs7O0tBTjFCRztBQXVFTkEseUJBQXlCbUQsU0FBUyxHQUFHO0lBQ25DbEQsV0FBV0wseURBQWUsQ0FBQ3lELFVBQVU7SUFDckNuRCxtQkFBbUJOLDBEQUFnQixDQUFDeUQsVUFBVTtJQUM5Q2xELGVBQWVQLHdEQUFjLENBQUN5RCxVQUFVO0lBQ3hDakQsY0FBY1IseURBQWUsQ0FBQ3lELFVBQVU7SUFDeENoRCxVQUFVVCwwREFBZ0IsQ0FBQ3lELFVBQVU7SUFDckMvQyxzQkFBc0JWLHdEQUFjLENBQUN5RCxVQUFVO0FBQ2pEO0FBRUEsK0RBQWVyRCx3QkFBd0JBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9pbWFnZS1kaXNwbGF5cy9zbGlkZXNob3cvZmlsbS1zdGFjay1zbGlkZXNob3ctbGF5b3V0L0ZpbG1TdGFja1NsaWRlc2hvd0xheW91dC5qcz80M2M3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyB1c2VNZWRpYVF1ZXJ5IH0gZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIjtcbmltcG9ydCB7IGdldENsb3VkaW1hZ2VVcmwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL2ltYWdlc1wiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9GaWxtU3RhY2tTbGlkZXNob3dMYXlvdXQubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBGaWxtU3RhY2tTbGlkZXNob3dMYXlvdXQgPSAoeyBpbWFnZVVybHMsIGN1cnJlbnRJbWFnZUluZGV4LCB0cmFuc2l0aW9uaW5nLCBhc3BlY3RSYXRpb3MsIGNhcHRpb25zLCBoaWRlQ2FwdGlvbnNPbk1vYmlsZSB9KSA9PiB7XG4gIGNvbnN0IFt0aWx0cywgc2V0VGlsdHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbelRpbHRzLCBzZXRaVGlsdHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbW92ZVhzLCBzZXRNb3ZlWHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbW92ZVlzLCBzZXRNb3ZlWXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbZHVyYXRpb25zLCBzZXREdXJhdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBpc01vYmlsZSA9IHVzZU1lZGlhUXVlcnkoeyBxdWVyeTogXCIobWF4LXdpZHRoOiA3NjhweClcIiB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpbWFnZVVybHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbmV3VGlsdHMgPSBpbWFnZVVybHMubWFwKCgpID0+IE1hdGgucmFuZG9tKCkgKiAxMiAtIDYpO1xuICAgICAgY29uc3QgbmV3WlRpbHRzID0gaW1hZ2VVcmxzLm1hcCgoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMCk7XG4gICAgICBjb25zdCBuZXdNb3ZlWHMgPSBpbWFnZVVybHMubWFwKCgpID0+IGAke01hdGgucmFuZG9tKCkgKiAxNSAtIDV9cHhgKTtcbiAgICAgIGNvbnN0IG5ld01vdmVZcyA9IGltYWdlVXJscy5tYXAoKCkgPT4gYCR7TWF0aC5yYW5kb20oKSAqIDIwIC0gNX1weGApO1xuICAgICAgY29uc3QgbmV3RHVyYXRpb25zID0gaW1hZ2VVcmxzLm1hcCgoKSA9PiBgJHtNYXRoLnJhbmRvbSgpICogMiArIDN9c2ApO1xuXG4gICAgICBzZXRUaWx0cyhuZXdUaWx0cyk7XG4gICAgICBzZXRaVGlsdHMobmV3WlRpbHRzKTtcbiAgICAgIHNldE1vdmVYcyhuZXdNb3ZlWHMpO1xuICAgICAgc2V0TW92ZVlzKG5ld01vdmVZcyk7XG4gICAgICBzZXREdXJhdGlvbnMobmV3RHVyYXRpb25zKTtcbiAgICB9XG4gIH0sIFtpbWFnZVVybHNdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVzaG93LWNvbnRhaW5lciBtdC04IG1kOm10LTBcIj5cbiAgICAgIHtpbWFnZVVybHMubWFwKCh1cmwsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIFJhbmRvbWx5IGNob29zZSBsZWZ0IG9yIHJpZ2h0IGZvciBlYWNoIGltYWdlXG4gICAgICAgIGNvbnN0IHNsaWRlRGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwibGVmdFwiIDogXCJyaWdodFwiO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZpbG0tc3RhY2staW1hZ2UgJHthc3BlY3RSYXRpb3NbaW5kZXhdID4gMSA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwifSAke2luZGV4ID09PSBjdXJyZW50SW1hZ2VJbmRleCA/ICh0cmFuc2l0aW9uaW5nID8gYHNsaWRlLW91dC0ke3NsaWRlRGlyZWN0aW9ufWAgOiBgc2xpZGUtb3V0LSR7c2xpZGVEaXJlY3Rpb259IHZpc2libGVgKSA6IGluZGV4ID4gY3VycmVudEltYWdlSW5kZXggPyBcInN0YWNrZWRcIiA6IFwiaGlkZGVuXCJ9YH1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIFwiLS1yb3RhdGVcIjogYCR7dGlsdHNbaW5kZXhdfWRlZ2AsXG4gICAgICAgICAgICAgIFwiLS1yb3RhdGVaXCI6IGAke3pUaWx0c1tpbmRleF19ZGVnYCxcbiAgICAgICAgICAgICAgXCItLW1vdmVYXCI6IG1vdmVYc1tpbmRleF0sXG4gICAgICAgICAgICAgIFwiLS1tb3ZlWVwiOiBtb3ZlWXNbaW5kZXhdLFxuICAgICAgICAgICAgICBcIi0tZHVyYXRpb25cIjogZHVyYXRpb25zW2luZGV4XSxcbiAgICAgICAgICAgICAgekluZGV4OiBpbWFnZVVybHMubGVuZ3RoIC0gaW5kZXgsXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxpbWcgc3JjPXtnZXRDbG91ZGltYWdlVXJsKHVybCwgeyB3aWR0aDogMTMwMCwgcXVhbGl0eTogODAgfSl9IGFsdD17YEltYWdlICR7aW5kZXggKyAxfWB9IC8+XG5cbiAgICAgICAgICAgIHsoIWlzTW9iaWxlIHx8ICFoaWRlQ2FwdGlvbnNPbk1vYmlsZSkgJiYgY2FwdGlvbnNbaW5kZXhdICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMTAgbGVmdC00IHctMy81IHAtNVwiPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtbGVmdCBiZy15ZWxsb3ctMjAwIGZvbnQtbW9ubyBzaGFkb3ctbGcgdHJhbnNmb3JtIHJvdGF0ZS0xXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ2ltYWdlcy9wYXBlcjIuanBnJylcIixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6IFwiY292ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBcIjJweCAycHggOHB4IHJnYmEoMCwwLDAsMC4yKVwiLFxuICAgICAgICAgICAgICAgICAgICBjbGlwUGF0aDogXCJ1cmwoI3Rvcm4tZWRnZS1jbGlwKVwiLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAge2NhcHRpb25zW2luZGV4XX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMFwiIGhlaWdodD1cIjBcIj5cbiAgICAgICAgICAgICAgICAgIDxjbGlwUGF0aCBpZD1cInRvcm4tZWRnZS1jbGlwXCIgY2xpcFBhdGhVbml0cz1cIm9iamVjdEJvdW5kaW5nQm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMCwwIGgxIHYwLjcgbC0wLjEsMC4wNSBsMC4wNSwwLjA1IGwtMC4wNSwwLjA1IGwwLjEsMC4wNSB2MC43IGgtMSB6XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvY2xpcFBhdGg+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuRmlsbVN0YWNrU2xpZGVzaG93TGF5b3V0LnByb3BUeXBlcyA9IHtcbiAgaW1hZ2VVcmxzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgY3VycmVudEltYWdlSW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgdHJhbnNpdGlvbmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgYXNwZWN0UmF0aW9zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgY2FwdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgaGlkZUNhcHRpb25zT25Nb2JpbGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGaWxtU3RhY2tTbGlkZXNob3dMYXlvdXQ7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIlByb3BUeXBlcyIsInVzZU1lZGlhUXVlcnkiLCJnZXRDbG91ZGltYWdlVXJsIiwic3R5bGVzIiwiRmlsbVN0YWNrU2xpZGVzaG93TGF5b3V0IiwiaW1hZ2VVcmxzIiwiY3VycmVudEltYWdlSW5kZXgiLCJ0cmFuc2l0aW9uaW5nIiwiYXNwZWN0UmF0aW9zIiwiY2FwdGlvbnMiLCJoaWRlQ2FwdGlvbnNPbk1vYmlsZSIsInRpbHRzIiwic2V0VGlsdHMiLCJ6VGlsdHMiLCJzZXRaVGlsdHMiLCJtb3ZlWHMiLCJzZXRNb3ZlWHMiLCJtb3ZlWXMiLCJzZXRNb3ZlWXMiLCJkdXJhdGlvbnMiLCJzZXREdXJhdGlvbnMiLCJpc01vYmlsZSIsInF1ZXJ5IiwibGVuZ3RoIiwibmV3VGlsdHMiLCJtYXAiLCJNYXRoIiwicmFuZG9tIiwibmV3WlRpbHRzIiwibmV3TW92ZVhzIiwibmV3TW92ZVlzIiwibmV3RHVyYXRpb25zIiwiZGl2IiwiY2xhc3NOYW1lIiwidXJsIiwiaW5kZXgiLCJzbGlkZURpcmVjdGlvbiIsInN0eWxlIiwiekluZGV4IiwiaW1nIiwic3JjIiwid2lkdGgiLCJxdWFsaXR5IiwiYWx0IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFNpemUiLCJib3hTaGFkb3ciLCJjbGlwUGF0aCIsInBhZGRpbmciLCJzdmciLCJoZWlnaHQiLCJpZCIsImNsaXBQYXRoVW5pdHMiLCJwYXRoIiwiZCIsInByb3BUeXBlcyIsImFycmF5IiwiaXNSZXF1aXJlZCIsIm51bWJlciIsImJvb2wiLCJvYmplY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/image-displays/slideshow/film-stack-slideshow-layout/FilmStackSlideshowLayout.js\n"));

/***/ })

});