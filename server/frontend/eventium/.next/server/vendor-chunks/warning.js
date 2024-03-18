"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/warning";
exports.ids = ["vendor-chunks/warning"];
exports.modules = {

/***/ "(ssr)/../../../node_modules/warning/warning.js":
/*!************************************************!*\
  !*** ../../../node_modules/warning/warning.js ***!
  \************************************************/
/***/ ((module) => {

eval("/**\r\n * Copyright (c) 2014-present, Facebook, Inc.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE file in the root directory of this source tree.\r\n */ \n/**\r\n * Similar to invariant but only logs a warning if the condition is not met.\r\n * This can be used to log issues in development environments in critical\r\n * paths. Removing the logging code for production environments will keep the\r\n * same logic and follow the same code paths.\r\n */ var __DEV__ = \"development\" !== \"production\";\nvar warning = function() {};\nif (__DEV__) {\n    var printWarning = function printWarning(format, args) {\n        var len = arguments.length;\n        args = new Array(len > 1 ? len - 1 : 0);\n        for(var key = 1; key < len; key++){\n            args[key - 1] = arguments[key];\n        }\n        var argIndex = 0;\n        var message = \"Warning: \" + format.replace(/%s/g, function() {\n            return args[argIndex++];\n        });\n        if (typeof console !== \"undefined\") {\n            console.error(message);\n        }\n        try {\n            // --- Welcome to debugging React ---\n            // This error was thrown as a convenience so that you can use this stack\n            // to find the callsite that caused this warning to fire.\n            throw new Error(message);\n        } catch (x) {}\n    };\n    warning = function(condition, format, args) {\n        var len = arguments.length;\n        args = new Array(len > 2 ? len - 2 : 0);\n        for(var key = 2; key < len; key++){\n            args[key - 2] = arguments[key];\n        }\n        if (format === undefined) {\n            throw new Error(\"`warning(condition, format, ...args)` requires a warning \" + \"message argument\");\n        }\n        if (!condition) {\n            printWarning.apply(null, [\n                format\n            ].concat(args));\n        }\n    };\n}\nmodule.exports = warning;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Q0FLQyxHQUVEO0FBRUE7Ozs7O0NBS0MsR0FFRCxJQUFJQSxVQUFVQyxrQkFBeUI7QUFFdkMsSUFBSUMsVUFBVSxZQUFZO0FBRTFCLElBQUlGLFNBQVM7SUFDWCxJQUFJRyxlQUFlLFNBQVNBLGFBQWFDLE1BQU0sRUFBRUMsSUFBSTtRQUNuRCxJQUFJQyxNQUFNQyxVQUFVQyxNQUFNO1FBQzFCSCxPQUFPLElBQUlJLE1BQU1ILE1BQU0sSUFBSUEsTUFBTSxJQUFJO1FBQ3JDLElBQUssSUFBSUksTUFBTSxHQUFHQSxNQUFNSixLQUFLSSxNQUFPO1lBQ2xDTCxJQUFJLENBQUNLLE1BQU0sRUFBRSxHQUFHSCxTQUFTLENBQUNHLElBQUk7UUFDaEM7UUFDQSxJQUFJQyxXQUFXO1FBQ2YsSUFBSUMsVUFBVSxjQUNaUixPQUFPUyxPQUFPLENBQUMsT0FBTztZQUNwQixPQUFPUixJQUFJLENBQUNNLFdBQVc7UUFDekI7UUFDRixJQUFJLE9BQU9HLFlBQVksYUFBYTtZQUNsQ0EsUUFBUUMsS0FBSyxDQUFDSDtRQUNoQjtRQUNBLElBQUk7WUFDRixxQ0FBcUM7WUFDckMsd0VBQXdFO1lBQ3hFLHlEQUF5RDtZQUN6RCxNQUFNLElBQUlJLE1BQU1KO1FBQ2xCLEVBQUUsT0FBT0ssR0FBRyxDQUFDO0lBQ2Y7SUFFQWYsVUFBVSxTQUFTZ0IsU0FBUyxFQUFFZCxNQUFNLEVBQUVDLElBQUk7UUFDeEMsSUFBSUMsTUFBTUMsVUFBVUMsTUFBTTtRQUMxQkgsT0FBTyxJQUFJSSxNQUFNSCxNQUFNLElBQUlBLE1BQU0sSUFBSTtRQUNyQyxJQUFLLElBQUlJLE1BQU0sR0FBR0EsTUFBTUosS0FBS0ksTUFBTztZQUNsQ0wsSUFBSSxDQUFDSyxNQUFNLEVBQUUsR0FBR0gsU0FBUyxDQUFDRyxJQUFJO1FBQ2hDO1FBQ0EsSUFBSU4sV0FBV2UsV0FBVztZQUN4QixNQUFNLElBQUlILE1BQ04sOERBQ0E7UUFFTjtRQUNBLElBQUksQ0FBQ0UsV0FBVztZQUNkZixhQUFhaUIsS0FBSyxDQUFDLE1BQU07Z0JBQUNoQjthQUFPLENBQUNpQixNQUFNLENBQUNoQjtRQUMzQztJQUNGO0FBQ0Y7QUFFQWlCLE9BQU9DLE9BQU8sR0FBR3JCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXZlbnRpdW0vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcz8zMTk4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxyXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXHJcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXHJcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxyXG4gKi9cclxuXHJcbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcclxuXHJcbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbmlmIChfX0RFVl9fKSB7XHJcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQsIGFyZ3MpIHtcclxuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAxID8gbGVuIC0gMSA6IDApO1xyXG4gICAgZm9yICh2YXIga2V5ID0gMTsga2V5IDwgbGVuOyBrZXkrKykge1xyXG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XHJcbiAgICB9XHJcbiAgICB2YXIgYXJnSW5kZXggPSAwO1xyXG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXHJcbiAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcclxuICAgICAgfSk7XHJcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXHJcbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xyXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgfSBjYXRjaCAoeCkge31cclxuICB9XHJcblxyXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xyXG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XHJcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XHJcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcclxuICAgIH1cclxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXHJcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICghY29uZGl0aW9uKSB7XHJcbiAgICAgIHByaW50V2FybmluZy5hcHBseShudWxsLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcclxuIl0sIm5hbWVzIjpbIl9fREVWX18iLCJwcm9jZXNzIiwid2FybmluZyIsInByaW50V2FybmluZyIsImZvcm1hdCIsImFyZ3MiLCJsZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJBcnJheSIsImtleSIsImFyZ0luZGV4IiwibWVzc2FnZSIsInJlcGxhY2UiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIngiLCJjb25kaXRpb24iLCJ1bmRlZmluZWQiLCJhcHBseSIsImNvbmNhdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../../node_modules/warning/warning.js\n");

/***/ })

};
;