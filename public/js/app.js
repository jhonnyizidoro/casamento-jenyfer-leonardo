!function c(i,u,a){function s(r,e){if(!u[r]){if(!i[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(f)return f(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var o=u[r]={exports:{}};i[r][0].call(o.exports,function(e){return s(i[r][1][e]||e)},o,o.exports,c,i,u,a)}return u[r].exports}for(var f="function"==typeof require&&require,e=0;e<a.length;e++)s(a[e]);return s}({1:[function(e,r,t){"use strict";window.LazyLoad=e("./modules/LazyLoad")},{"./modules/LazyLoad":2}],2:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.observe=void 0;t.observe=function(e){var r=document.querySelectorAll("".concat(e," img, ").concat(e,", ").concat(e," iframe")),t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&n(e.target)})});r.forEach(function(e){t.observe(e)})};var n=function(e){""===e.src&&e.dataset.src&&(e.src=e.dataset.src,delete e.dataset.src)}},{}]},{},[1]);
//# sourceMappingURL=tmp/app.js.map