// --- file[pouchdb.js] ---

//    PouchDB 3.3.1
//    
//    (c) 2012-2015 Dale Harvey and the PouchDB team
//    PouchDB may be freely distributed under the Apache license, version 2.0.
//    For all details and documentation:
//    http://pouchdb.com






!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.PouchDB=e()}}(function(){var e;return function t(e,n,r){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[a]={exports:{}};e[a][0].call(f.exports,function(t){var n=e[a][1][t];return o(n?n:t)},f,f.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";function r(e){return function(){var t=arguments.length;if(t){for(var n=[],r=-1;++r<t;)n[r]=arguments[r];return e.call(this,n)}return e.call(this,[])}}t.exports=r},{}],2:[function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function i(e){return"number"==typeof e}function a(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!i(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,i,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||a(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],s(n))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:i=Array.prototype.slice.call(arguments,1),n.apply(this,i)}else if(a(n))for(i=Array.prototype.slice.call(arguments,1),c=n.slice(),r=c.length,u=0;r>u;u++)c[u].apply(this,i);return!0},r.prototype.addListener=function(e,t){var n;if(!o(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?a(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,a(this._events[e])&&!this._events[e].warned&&(n=s(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!o(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},r.prototype.removeListener=function(e,t){var n,r,i,s;if(!o(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,r=-1,n===t||o(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(a(n)){for(s=i;s-- >0;)if(n[s]===t||n[s].listener&&n[s].listener===t){r=s;break}if(0>r)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],o(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(o(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}},{}],3:[function(e,t,n){function r(){f=!1,s.length?c=s.concat(c):l=-1,c.length&&o()}function o(){if(!f){var e=setTimeout(r);f=!0;for(var t=c.length;t;){for(s=c,c=[];++l<t;)s&&s[l].run();l=-1,t=c.length}s=null,f=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function a(){}var s,u=t.exports={},c=[],f=!1,l=-1;u.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new i(e,t)),1!==c.length||f||setTimeout(o,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=a,u.addListener=a,u.once=a,u.off=a,u.removeListener=a,u.removeAllListeners=a,u.emit=a,u.binding=function(e){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(e){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},{}],4:[function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,i=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r),e}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(t){}}function s(){var e;try{e=n.storage.debug}catch(t){}return e}function u(){try{return window.localStorage}catch(e){}}n=t.exports=e(5),n.log=i,n.formatArgs=o,n.save=a,n.load=s,n.useColors=r,n.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(s())},{5:5}],5:[function(e,t,n){function r(){return n.colors[f++%n.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,i=t-(c||t);e.diff=i,e.prev=c,e.curr=t,c=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=r());var a=Array.prototype.slice.call(arguments);a[0]=n.coerce(a[0]),"string"!=typeof a[0]&&(a=["%o"].concat(a));var s=0;a[0]=a[0].replace(/%([a-z%])/g,function(t,r){if("%%"===t)return t;s++;var o=n.formatters[r];if("function"==typeof o){var i=a[s];t=o.call(e,i),a.splice(s,1),s--}return t}),"function"==typeof n.formatArgs&&(a=n.formatArgs.apply(e,a));var u=o.log||n.log||console.log.bind(console);u.apply(e,a)}t.enabled=!1,o.enabled=!0;var i=n.enabled(e)?o:t;return i.namespace=e,i}function i(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;r>o;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function a(){n.enable("")}function s(e){var t,r;for(t=0,r=n.skips.length;r>t;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;r>t;t++)if(n.names[t].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o,n.coerce=u,n.disable=a,n.enable=i,n.enabled=s,n.humanize=e(6),n.names=[],n.skips=[],n.formatters={};var c,f=0},{6:6}],6:[function(e,t,n){function r(e){if(e=""+e,!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*l;case"days":case"day":case"d":return n*f;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*u;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n}}}}function o(e){return e>=f?Math.round(e/f)+"d":e>=c?Math.round(e/c)+"h":e>=u?Math.round(e/u)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function i(e){return a(e,f,"day")||a(e,c,"hour")||a(e,u,"minute")||a(e,s,"second")||e+" ms"}function a(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var s=1e3,u=60*s,c=60*u,f=24*c,l=365.25*f;t.exports=function(e,t){return t=t||{},"string"==typeof e?r(e):t["long"]?i(e):o(e)}},{}],7:[function(e,t,n){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],8:[function(e,t,n){(function(e){e("object"==typeof n?n:this)}).call(this,function(e){var t=Array.prototype.slice,n=Array.prototype.forEach,r=function(e){if("object"!=typeof e)throw e+" is not an object";var o=t.call(arguments,1);return n.call(o,function(t){if(t)for(var n in t)"object"==typeof t[n]&&e[n]?r.call(e,e[n],t[n]):e[n]=t[n]}),e};e.extend=r})},{}],9:[function(e,t,n){"use strict";function r(){}function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=m,this.queue=[],this.outcome=void 0,e!==r&&u(this,e)}function i(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function a(e,t,n){p(function(){var r;try{r=t(n)}catch(o){return v.reject(e,o)}r===e?v.reject(e,new TypeError("Cannot resolve promise with itself")):v.resolve(e,r)})}function s(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}function u(e,t){function n(t){i||(i=!0,v.reject(e,t))}function r(t){i||(i=!0,v.resolve(e,t))}function o(){t(r,n)}var i=!1,a=c(o);"error"===a.status&&n(a.value)}function c(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}function f(e){return e instanceof this?e:v.resolve(new this(r),e)}function l(e){var t=new this(r);return v.reject(t,e)}function d(e){function t(e,t){function r(e){a[t]=e,++s!==o||i||(i=!0,v.resolve(c,a))}n.resolve(e).then(r,function(e){i||(i=!0,v.reject(c,e))})}var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var o=e.length,i=!1;if(!o)return this.resolve([]);for(var a=new Array(o),s=0,u=-1,c=new this(r);++u<o;)t(e[u],u);return c}function h(e){function t(e){n.resolve(e).then(function(e){i||(i=!0,v.resolve(s,e))},function(e){i||(i=!0,v.reject(s,e))})}var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var o=e.length,i=!1;if(!o)return this.resolve([]);for(var a=-1,s=new this(r);++a<o;)t(e[a]);return s}var p=e(10),v={},y=["REJECTED"],_=["FULFILLED"],m=["PENDING"];t.exports=o,o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===_||"function"!=typeof t&&this.state===y)return this;var n=new this.constructor(r);if(this.state!==m){var o=this.state===_?e:t;a(n,o,this.outcome)}else this.queue.push(new i(n,e,t));return n},i.prototype.callFulfilled=function(e){v.resolve(this.promise,e)},i.prototype.otherCallFulfilled=function(e){a(this.promise,this.onFulfilled,e)},i.prototype.callRejected=function(e){v.reject(this.promise,e)},i.prototype.otherCallRejected=function(e){a(this.promise,this.onRejected,e)},v.resolve=function(e,t){var n=c(s,t);if("error"===n.status)return v.reject(e,n.value);var r=n.value;if(r)u(e,r);else{e.state=_,e.outcome=t;for(var o=-1,i=e.queue.length;++o<i;)e.queue[o].callFulfilled(t)}return e},v.reject=function(e,t){e.state=y,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e},o.resolve=f,o.reject=l,o.all=d,o.race=h},{10:10}],10:[function(e,t,n){(function(e){"use strict";function n(){f=!0;for(var e,t,n=l.length;n;){for(t=l,l=[],e=-1;++e<n;)t[e]();n=l.length}f=!1}function r(e){1!==l.push(e)||f||o()}var o,i=e.MutationObserver||e.WebKitMutationObserver;if(i){var a=0,s=new i(n),u=e.document.createTextNode("");s.observe(u,{characterData:!0}),o=function(){u.data=a=++a%2}}else if(e.setImmediate||"undefined"==typeof e.MessageChannel)o="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){n(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(n,0)};else{var c=new e.MessageChannel;c.port1.onmessage=n,o=function(){c.port2.postMessage(0)}}var f,l=[];t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],11:[function(e,t,n){"use strict";function r(e){if(null!==e)switch(typeof e){case"boolean":return e?1:0;case"number":return f(e);case"string":return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"");case"object":var t=Array.isArray(e),r=t?e:Object.keys(e),o=-1,i=r.length,a="";if(t)for(;++o<i;)a+=n.toIndexableString(r[o]);else for(;++o<i;){var s=r[o];a+=n.toIndexableString(s)+n.toIndexableString(e[s])}return a}return""}function o(e,t){var n,r=t,o="1"===e[t];if(o)n=0,t++;else{var i="0"===e[t];t++;var a="",s=e.substring(t,t+d),u=parseInt(s,10)+l;for(i&&(u=-u),t+=d;;){var c=e[t];if("\x00"===c)break;a+=c,t++}a=a.split("."),n=1===a.length?parseInt(a,10):parseFloat(a[0]+"."+a[1]),i&&(n-=10),0!==u&&(n=parseFloat(n+"e"+u))}return{num:n,length:t-r}}function i(e,t){var n=e.pop();if(t.length){var r=t[t.length-1];n===r.element&&(t.pop(),r=t[t.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(n);else if(i===e.length-2){var a=e.pop();o[a]=n}else e.push(n)}}function a(e,t){for(var r=Math.min(e.length,t.length),o=0;r>o;o++){var i=n.collate(e[o],t[o]);if(0!==i)return i}return e.length===t.length?0:e.length>t.length?1:-1}function s(e,t){return e===t?0:e>t?1:-1}function u(e,t){for(var r=Object.keys(e),o=Object.keys(t),i=Math.min(r.length,o.length),a=0;i>a;a++){var s=n.collate(r[a],o[a]);if(0!==s)return s;if(s=n.collate(e[r[a]],t[o[a]]),0!==s)return s}return r.length===o.length?0:r.length>o.length?1:-1}function c(e){var t=["boolean","number","string","object"],n=t.indexOf(typeof e);return~n?null===e?1:Array.isArray(e)?5:3>n?n+2:n+3:Array.isArray(e)?5:void 0}function f(e){if(0===e)return"1";var t=e.toExponential().split(/e\+?/),n=parseInt(t[1],10),r=0>e,o=r?"0":"2",i=(r?-n:n)-l,a=p.padLeft(i.toString(),"0",d);o+=h+a;var s=Math.abs(parseFloat(t[0]));r&&(s=10-s);var u=s.toFixed(20);return u=u.replace(/\.?0+$/,""),o+=h+u}var l=-324,d=3,h="",p=e(12);n.collate=function(e,t){if(e===t)return 0;e=n.normalizeKey(e),t=n.normalizeKey(t);var r=c(e),o=c(t);if(r-o!==0)return r-o;if(null===e)return 0;switch(typeof e){case"number":return e-t;case"boolean":return e===t?0:t>e?-1:1;case"string":return s(e,t)}return Array.isArray(e)?a(e,t):u(e,t)},n.normalizeKey=function(e){switch(typeof e){case"undefined":return null;case"number":return e===1/0||e===-(1/0)||isNaN(e)?null:e;case"object":var t=e;if(Array.isArray(e)){var r=e.length;e=new Array(r);for(var o=0;r>o;o++)e[o]=n.normalizeKey(t[o])}else{if(e instanceof Date)return e.toJSON();if(null!==e){e={};for(var i in t)if(t.hasOwnProperty(i)){var a=t[i];"undefined"!=typeof a&&(e[i]=n.normalizeKey(a))}}}}return e},n.toIndexableString=function(e){var t="\x00";return e=n.normalizeKey(e),c(e)+h+r(e)+t},n.parseIndexableString=function(e){for(var t=[],n=[],r=0;;){var a=e[r++];if("\x00"!==a)switch(a){case"1":t.push(null);break;case"2":t.push("1"===e[r]),r++;break;case"3":var s=o(e,r);t.push(s.num),r+=s.length;break;case"4":for(var u="";;){var c=e[r];if("\x00"===c)break;u+=c,r++}u=u.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,""),t.push(u);break;case"5":var f={element:[],index:t.length};t.push(f.element),n.push(f);break;case"6":var l={element:{},index:t.length};t.push(l.element),n.push(l);break;default:throw new Error("bad collationIndex or unexpectedly reached end of input: "+a)}else{if(1===t.length)return t.pop();i(t,n)}}}},{12:12}],12:[function(e,t,n){"use strict";function r(e,t,n){for(var r="",o=n-e.length;r.length<o;)r+=t;return r}n.padLeft=function(e,t,n){var o=r(e,t,n);return o+e},n.padRight=function(e,t,n){var o=r(e,t,n);return e+o},n.stringLexCompare=function(e,t){var n,r=e.length,o=t.length;for(n=0;r>n;n++){if(n===o)return 1;var i=e.charAt(n),a=t.charAt(n);if(i!==a)return a>i?-1:1}return o>r?-1:0},n.intToDecimalForm=function(e){var t=0>e,n="";do{var r=t?-Math.ceil(e%10):Math.floor(e%10);n=r+n,e=t?Math.ceil(e/10):Math.floor(e/10)}while(e);return t&&"0"!==n&&(n="-"+n),n}},{}],13:[function(e,t,n){"use strict";function r(){this.store={}}function o(e){if(this.store=new r,e&&Array.isArray(e))for(var t=0,n=e.length;n>t;t++)this.add(e[t])}n.Map=r,n.Set=o,r.prototype.mangle=function(e){if("string"!=typeof e)throw new TypeError("key must be a string but Got "+e);return"$"+e},r.prototype.unmangle=function(e){return e.substring(1)},r.prototype.get=function(e){var t=this.mangle(e);return t in this.store?this.store[t]:void 0},r.prototype.set=function(e,t){var n=this.mangle(e);return this.store[n]=t,!0},r.prototype.has=function(e){var t=this.mangle(e);return t in this.store},r.prototype["delete"]=function(e){var t=this.mangle(e);return t in this.store?(delete this.store[t],!0):!1},r.prototype.forEach=function(e){for(var t=Object.keys(this.store),n=0,r=t.length;r>n;n++){var o=t[n],i=this.store[o];o=this.unmangle(o),e(i,o)}},o.prototype.add=function(e){return this.store.set(e,!0)},o.prototype.has=function(e){return this.store.has(e)},o.prototype["delete"]=function(e){return this.store["delete"](e)}},{}],14:[function(e,t,n){(function(){var e={}.hasOwnProperty,n=[].slice;t.exports=function(t,r){var o,i,a,s;i=[],s=[];for(o in r)e.call(r,o)&&(a=r[o],"this"!==o&&(i.push(o),s.push(a)));return Function.apply(null,n.call(i).concat([t])).apply(r["this"],s)}}).call(this)},{}],15:[function(t,n,r){!function(t){if("object"==typeof r)n.exports=t();else if("function"==typeof e&&e.amd)e(t);else{var o;try{o=window}catch(i){o=self}o.SparkMD5=t()}}(function(e){"use strict";function t(e,t,n,r,o,i){return t=g(g(t,e),g(r,i)),g(t<<o|t>>>32-o,n)}function n(e,n,r,o,i,a,s){return t(n&r|~n&o,e,n,i,a,s)}function r(e,n,r,o,i,a,s){return t(n&o|r&~o,e,n,i,a,s)}function o(e,n,r,o,i,a,s){return t(n^r^o,e,n,i,a,s)}function i(e,n,r,o,i,a,s){return t(r^(n|~o),e,n,i,a,s)}function a(e,t){var a=e[0],s=e[1],u=e[2],c=e[3];a=n(a,s,u,c,t[0],7,-680876936),c=n(c,a,s,u,t[1],12,-389564586),u=n(u,c,a,s,t[2],17,606105819),s=n(s,u,c,a,t[3],22,-1044525330),a=n(a,s,u,c,t[4],7,-176418897),c=n(c,a,s,u,t[5],12,1200080426),u=n(u,c,a,s,t[6],17,-1473231341),s=n(s,u,c,a,t[7],22,-45705983),a=n(a,s,u,c,t[8],7,1770035416),c=n(c,a,s,u,t[9],12,-1958414417),u=n(u,c,a,s,t[10],17,-42063),s=n(s,u,c,a,t[11],22,-1990404162),a=n(a,s,u,c,t[12],7,1804603682),c=n(c,a,s,u,t[13],12,-40341101),u=n(u,c,a,s,t[14],17,-1502002290),s=n(s,u,c,a,t[15],22,1236535329),a=r(a,s,u,c,t[1],5,-165796510),c=r(c,a,s,u,t[6],9,-1069501632),u=r(u,c,a,s,t[11],14,643717713),s=r(s,u,c,a,t[0],20,-373897302),a=r(a,s,u,c,t[5],5,-701558691),c=r(c,a,s,u,t[10],9,38016083),u=r(u,c,a,s,t[15],14,-660478335),s=r(s,u,c,a,t[4],20,-405537848),a=r(a,s,u,c,t[9],5,568446438),c=r(c,a,s,u,t[14],9,-1019803690),u=r(u,c,a,s,t[3],14,-187363961),s=r(s,u,c,a,t[8],20,1163531501),a=r(a,s,u,c,t[13],5,-1444681467),c=r(c,a,s,u,t[2],9,-51403784),u=r(u,c,a,s,t[7],14,1735328473),s=r(s,u,c,a,t[12],20,-1926607734),a=o(a,s,u,c,t[5],4,-378558),c=o(c,a,s,u,t[8],11,-2022574463),u=o(u,c,a,s,t[11],16,1839030562),s=o(s,u,c,a,t[14],23,-35309556),a=o(a,s,u,c,t[1],4,-1530992060),c=o(c,a,s,u,t[4],11,1272893353),u=o(u,c,a,s,t[7],16,-155497632),s=o(s,u,c,a,t[10],23,-1094730640),a=o(a,s,u,c,t[13],4,681279174),c=o(c,a,s,u,t[0],11,-358537222),u=o(u,c,a,s,t[3],16,-722521979),s=o(s,u,c,a,t[6],23,76029189),a=o(a,s,u,c,t[9],4,-640364487),c=o(c,a,s,u,t[12],11,-421815835),u=o(u,c,a,s,t[15],16,530742520),s=o(s,u,c,a,t[2],23,-995338651),a=i(a,s,u,c,t[0],6,-198630844),c=i(c,a,s,u,t[7],10,1126891415),u=i(u,c,a,s,t[14],15,-1416354905),s=i(s,u,c,a,t[5],21,-57434055),a=i(a,s,u,c,t[12],6,1700485571),c=i(c,a,s,u,t[3],10,-1894986606),u=i(u,c,a,s,t[10],15,-1051523),s=i(s,u,c,a,t[1],21,-2054922799),a=i(a,s,u,c,t[8],6,1873313359),c=i(c,a,s,u,t[15],10,-30611744),u=i(u,c,a,s,t[6],15,-1560198380),s=i(s,u,c,a,t[13],21,1309151649),a=i(a,s,u,c,t[4],6,-145523070),c=i(c,a,s,u,t[11],10,-1120210379),u=i(u,c,a,s,t[2],15,718787259),s=i(s,u,c,a,t[9],21,-343485551),e[0]=g(a,e[0]),e[1]=g(s,e[1]),e[2]=g(u,e[2]),e[3]=g(c,e[3])}function s(e){var t,n=[];for(t=0;64>t;t+=4)n[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return n}function u(e){var t,n=[];for(t=0;64>t;t+=4)n[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return n}function c(e){var t,n,r,o,i,u,c=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(t=64;c>=t;t+=64)a(f,s(e.substring(t-64,t)));for(e=e.substring(t-64),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e.charCodeAt(t)<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(a(f,r),t=0;16>t;t+=1)r[t]=0;return o=8*c,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),u=parseInt(o[1],16)||0,r[14]=i,r[15]=u,a(f,r),f}function f(e){var t,n,r,o,i,s,c=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(t=64;c>=t;t+=64)a(f,u(e.subarray(t-64,t)));for(e=c>t-64?e.subarray(t-64):new Uint8Array(0),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e[t]<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(a(f,r),t=0;16>t;t+=1)r[t]=0;return o=8*c,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),s=parseInt(o[1],16)||0,r[14]=i,r[15]=s,a(f,r),f}function l(e){var t,n="";for(t=0;4>t;t+=1)n+=b[e>>8*t+4&15]+b[e>>8*t&15];return n}function d(e){var t;for(t=0;t<e.length;t+=1)e[t]=l(e[t]);return e.join("")}function h(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),e}function p(e,t){var n,r=e.length,o=new ArrayBuffer(r),i=new Uint8Array(o);for(n=0;r>n;n+=1)i[n]=e.charCodeAt(n);return t?i:o}function v(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function y(e,t,n){var r=new Uint8Array(e.byteLength+t.byteLength);return r.set(new Uint8Array(e)),r.set(new Uint8Array(t),e.byteLength),n?r:r.buffer}function _(e){var t,n=[],r=e.length;for(t=0;r-1>t;t+=2)n.push(parseInt(e.substr(t,2),16));return String.fromCharCode.apply(String,n)}function m(){this.reset()}var g=function(e,t){return e+t&4294967295},b=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return"5d41402abc4b2a76b9719d911017c592"!==d(c("hello"))&&(g=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||!function(){function t(e,t){return e=0|e||0,0>e?Math.max(e+t,0):Math.min(e,t)}ArrayBuffer.prototype.slice=function(n,r){var o,i,a,s,u=this.byteLength,c=t(n,u),f=u;return r!==e&&(f=t(r,u)),c>f?new ArrayBuffer(0):(o=f-c,i=new ArrayBuffer(o),a=new Uint8Array(i),s=new Uint8Array(this,c,o),a.set(s),i)}}(),m.prototype.append=function(e){return this.appendBinary(h(e)),this},m.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var t,n=this._buff.length;for(t=64;n>=t;t+=64)a(this._hash,s(this._buff.substring(t-64,t)));return this._buff=this._buff.substring(t-64),this},m.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;o>t;t+=1)i[t>>2]|=r.charCodeAt(t)<<(t%4<<3);return this._finish(i,o),n=d(this._hash),e&&(n=_(n)),this.reset(),n},m.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},m.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},m.prototype.setState=function(e){return this._buff=e.buff,this._length=e.length,this._hash=e.hash,this},m.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},m.prototype._finish=function(e,t){var n,r,o,i=t;if(e[i>>2]|=128<<(i%4<<3),i>55)for(a(this._hash,e),i=0;16>i;i+=1)e[i]=0;n=8*this._length,n=n.toString(16).match(/(.*?)(.{0,8})$/),r=parseInt(n[2],16),o=parseInt(n[1],16)||0,e[14]=r,e[15]=o,a(this._hash,e)},m.hash=function(e,t){return m.hashBinary(h(e),t)},m.hashBinary=function(e,t){var n=c(e),r=d(n);return t?_(r):r},m.ArrayBuffer=function(){this.reset()},m.ArrayBuffer.prototype.append=function(e){var t,n=y(this._buff.buffer,e,!0),r=n.length;for(this._length+=e.byteLength,t=64;r>=t;t+=64)a(this._hash,u(n.subarray(t-64,t)));return this._buff=r>t-64?new Uint8Array(n.buffer.slice(t-64)):new Uint8Array(0),this},m.ArrayBuffer.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;o>t;t+=1)i[t>>2]|=r[t]<<(t%4<<3);return this._finish(i,o),n=d(this._hash),e&&(n=_(n)),this.reset(),n},m.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},m.ArrayBuffer.prototype.getState=function(){var e=m.prototype.getState.call(this);return e.buff=v(e.buff),e},m.ArrayBuffer.prototype.setState=function(e){return e.buff=p(e.buff,!0),m.prototype.setState.call(this,e)},m.ArrayBuffer.prototype.destroy=m.prototype.destroy,m.ArrayBuffer.prototype._finish=m.prototype._finish,m.ArrayBuffer.hash=function(e,t){var n=f(new Uint8Array(e)),r=d(n);return t?_(r):r},m})},{}],16:[function(e,t,n){"use strict";function r(e,t,n){var r=n[n.length-1];e===r.element&&(n.pop(),r=n[n.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(e);else if(i===t.length-2){var a=t.pop();o[a]=e}else t.push(e)}n.stringify=function(e){var t=[];t.push({obj:e});for(var n,r,o,i,a,s,u,c,f,l,d,h="";n=t.pop();)if(r=n.obj,o=n.prefix||"",i=n.val||"",h+=o,i)h+=i;else if("object"!=typeof r)h+="undefined"==typeof r?null:JSON.stringify(r);else if(null===r)h+="null";else if(Array.isArray(r)){for(t.push({val:"]"}),a=r.length-1;a>=0;a--)s=0===a?"":",",t.push({obj:r[a],prefix:s});t.push({val:"["})}else{u=[];for(c in r)r.hasOwnProperty(c)&&u.push(c);for(t.push({val:"}"}),a=u.length-1;a>=0;a--)f=u[a],l=r[f],d=a>0?",":"",d+=JSON.stringify(f)+":",t.push({obj:l,prefix:d});t.push({val:"{"})}return h},n.parse=function(e){for(var t,n,o,i,a,s,u,c,f,l=[],d=[],h=0;;)if(t=e[h++],"}"!==t&&"]"!==t&&"undefined"!=typeof t)switch(t){case" ":case"  ":case"\n":case":":case",":break;case"n":h+=3,r(null,l,d);break;case"t":h+=3,r(!0,l,d);break;case"f":h+=4,r(!1,l,d);break;case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":for(n="",h--;;){if(o=e[h++],!/[\d\.\-e\+]/.test(o)){h--;break}n+=o}r(parseFloat(n),l,d);break;case'"':for(i="",a=void 0,s=0;;){if(u=e[h++],'"'===u&&("\\"!==a||s%2!==1))break;i+=u,a=u,"\\"===a?s++:s=0}r(JSON.parse('"'+i+'"'),l,d);break;case"[":c={element:[],index:l.length},l.push(c.element),d.push(c);break;case"{":f={element:{},index:l.length},l.push(f.element),d.push(f);break;default:throw new Error("unexpectedly reached end of input: "+t)}else{if(1===l.length)return l.pop();r(l.pop(),l,d)}}},{}],17:[function(e,t,n){(function(n,r){"use strict";function o(e){return e&&"object"==typeof e&&"default"in e?e["default"]:e}function i(e,t){for(var n={},r=0,o=t.length;o>r;r++){var i=t[r];i in e&&(n[i]=e[i])}return n}function a(e){return e instanceof ArrayBuffer||"undefined"!=typeof Blob&&e instanceof Blob}function s(e){if("function"==typeof e.slice)return e.slice(0);var t=new ArrayBuffer(e.byteLength),n=new Uint8Array(t),r=new Uint8Array(e);return n.set(r),t}function u(e){if(e instanceof ArrayBuffer)return s(e);var t=e.size,n=e.type;return"function"==typeof e.slice?e.slice(0,t,n):e.webkitSlice(0,t,n)}function c(e){var t,n,r;if(!e||"object"!=typeof e)return e;if(Array.isArray(e)){for(t=[],n=0,r=e.length;r>n;n++)t[n]=c(e[n]);return t}if(e instanceof Date)return e.toISOString();if(a(e))return u(e);t={};for(n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var o=c(e[n]);"undefined"!=typeof o&&(t[n]=o)}return t}function f(e){var t=!1;return or(function(n){if(t)throw new Error("once called more than once");t=!0,e.apply(this,n)})}function l(e){return or(function(t){t=c(t);var r,o=this,i="function"==typeof t[t.length-1]?t.pop():!1;i&&(r=function(e,t){n.nextTick(function(){i(e,t)})});var a=new lr(function(n,r){var i;try{var a=f(function(e,t){e?r(e):n(t)});t.push(a),i=e.apply(o,t),i&&"function"==typeof i.then&&n(i)}catch(s){r(s)}});return r&&a.then(function(e){r(null,e)},r),a})}function d(e,t){function n(e,t,n){if(dr.enabled){for(var r=[e._db_name,t],o=0;o<n.length-1;o++)r.push(n[o]);dr.apply(null,r);var i=n[n.length-1];n[n.length-1]=function(n,r){var o=[e._db_name,t];o=o.concat(n?["error",n]:["success",r]),dr.apply(null,o),i(n,r)}}}return l(or(function(r){if(this._closed)return lr.reject(new Error("database is closed"));if(this._destroyed)return lr.reject(new Error("database is destroyed"));var o=this;return n(o,e,r),this.taskqueue.isReady?t.apply(this,r):new lr(function(t,n){o.taskqueue.addTask(function(i){i?n(i):t(o[e].apply(o,r))})})}))}function h(e,t,n){return new lr(function(r,o){e.get(t,function(i,a){if(i){if(404!==i.status)return o(i);a={}}var s=a._rev,u=n(a);return u?(u._id=t,u._rev=s,void r(p(e,u,n))):r({updated:!1,rev:s})})})}function p(e,t,n){return e.put(t).then(function(e){return{updated:!0,rev:e.rev}},function(r){if(409!==r.status)throw r;return h(e,t._id,n)})}function v(e){for(var t,n,r,o,i=e.rev_tree.slice();o=i.pop();){var a=o.ids,s=a[2],u=o.pos;if(s.length)for(var c=0,f=s.length;f>c;c++)i.push({pos:u+1,ids:s[c]});else{var l=!!a[1].deleted,d=a[0];(!t||(r!==l?r:n!==u?u>n:d>t))&&(t=d,n=u,r=l)}}return n+"-"+t}function y(e){return e.ids}function _(e,t){t||(t=v(e));for(var n,r=t.substring(t.indexOf("-")+1),o=e.rev_tree.map(y);n=o.pop();){if(n[0]===r)return!!n[1].deleted;o=o.concat(n[2])}}function m(e){return ar("return "+e+";",{})}function g(e){return new Function("doc",["var emitted = false;","var emit = function (a, b) {","  emitted = true;","};","var view = "+e+";","view(doc);","if (emitted) {","  return true;","}"].join("\n"))}function b(e){if(!e)return null;var t=e.split("/");return 2===t.length?t:1===t.length?[e,e]:null}function w(e){var t=b(e);return t?t.join("/"):null}function E(e,t){for(var n,r=e.slice();n=r.pop();)for(var o=n.pos,i=n.ids,a=i[2],s=t(0===a.length,o,i[0],n.ctx,i[1]),u=0,c=a.length;c>u;u++)r.push({pos:o+1,ids:a[u],ctx:s})}function S(e,t){return e.pos-t.pos}function k(e){var t=[];E(e,function(e,n,r,o,i){e&&t.push({rev:n+"-"+r,pos:n,opts:i})}),t.sort(S).reverse();for(var n=0,r=t.length;r>n;n++)delete t[n].pos;return t}function q(e){for(var t=v(e),n=k(e.rev_tree),r=[],o=0,i=n.length;i>o;o++){var a=n[o];a.rev===t||a.opts.deleted||r.push(a.rev)}return r}function x(e){Error.call(this,e.reason),this.status=e.status,this.name=e.error,this.message=e.reason,this.error=!0}function A(e,t,n){function r(t){for(var r in e)"function"!=typeof e[r]&&(this[r]=e[r]);void 0!==n&&(this.name=n),void 0!==t&&(this.reason=t)}return r.prototype=x.prototype,new r(t)}function T(e){var t,n,r,o,i;return n=e.error===!0&&"string"==typeof e.name?e.name:e.error,i=e.reason,
r=Mr("name",n,i),e.missing||"missing"===i||"deleted"===i||"not_found"===n?r=vr:"doc_validation"===n?(r=qr,o=i):"bad_request"===n&&r.message!==i&&(r=xr),r||(r=Mr("status",e.status,i)||wr),t=A(r,i,n),o&&(t.message=o),e.id&&(t.id=e.id),e.status&&(t.status=e.status),e.missing&&(t.missing=e.missing),t}function O(e,t,n){function r(){o.cancel()}ir.EventEmitter.call(this);var o=this;this.db=e,t=t?c(t):{};var i=t.complete=f(function(t,n){t?o.emit("error",t):o.emit("complete",n),o.removeAllListeners(),e.removeListener("destroyed",r)});n&&(o.on("complete",function(e){n(null,e)}),o.on("error",n)),e.once("destroyed",r),t.onChange=function(e){t.isCancelled||(o.emit("change",e),o.startSeq&&o.startSeq<=e.seq&&(o.startSeq=!1))};var a=new lr(function(e,n){t.complete=function(t,r){t?n(t):e(r)}});o.once("cancel",function(){e.removeListener("destroyed",r),t.complete(null,{status:"cancelled"})}),this.then=a.then.bind(a),this["catch"]=a["catch"].bind(a),this.then(function(e){i(null,e)},i),e.taskqueue.isReady?o.doChanges(t):e.taskqueue.addTask(function(){o.isCancelled?o.emit("cancel"):o.doChanges(t)})}function j(e,t,n){var r=[{rev:e._rev}];"all_docs"===n.style&&(r=k(t.rev_tree).map(function(e){return{rev:e.rev}}));var o={id:t.id,changes:r,doc:e};return _(t,e._rev)&&(o.deleted=!0),n.conflicts&&(o.doc._conflicts=q(t),o.doc._conflicts.length||delete o.doc._conflicts),o}function I(e,t,n){function r(){var e=[];l.forEach(function(t){t.docs.forEach(function(n){e.push({id:t.id,docs:[n]})})}),n(null,{results:e})}function o(){++f===c&&r()}function a(e,t,n){l[e]={id:t,docs:n},o()}var s=Array.isArray(t)?t:t.docs,u={};s.forEach(function(e){e.id in u?u[e.id].push(e):u[e.id]=[e]});var c=Object.keys(u).length,f=0,l=new Array(c);Object.keys(u).forEach(function(n,r){var o=u[n],s=i(o[0],["atts_since","attachments"]);s.open_revs=o.map(function(e){return e.rev}),s.open_revs=s.open_revs.filter(function(e){return e});var c=function(e){return e};0===s.open_revs.length&&(delete s.open_revs,c=function(e){return[{ok:e}]}),["revs","attachments","binary","ajax"].forEach(function(e){e in t&&(s[e]=t[e])}),e.get(n,s,function(e,t){a(r,n,e?[{error:e}]:c(t))})})}function C(e){return/^_local/.test(e)}function L(e){for(var t,n=[],r=e.slice();t=r.pop();){var o=t.pos,i=t.ids,a=i[0],s=i[1],u=i[2],c=0===u.length,f=t.history?t.history.slice():[];f.push({id:a,opts:s}),c&&n.push({pos:o+1-f.length,ids:f});for(var l=0,d=u.length;d>l;l++)r.push({pos:o+1,ids:u[l],history:f})}return n.reverse()}function R(e){return 0|Math.random()*e}function D(e,t){t=t||Fr.length;var n="",r=-1;if(e){for(;++r<e;)n+=Fr[R(t)];return n}for(;++r<36;)switch(r){case 8:case 13:case 18:case 23:n+="-";break;case 19:n+=Fr[3&R(16)|8];break;default:n+=Fr[R(16)]}return n}function N(e){return e.reduce(function(e,t){return e[t]=!0,e},{})}function B(e){var t;if(e?"string"!=typeof e?t=A(_r):/^_/.test(e)&&!/^_(design|local)/.test(e)&&(t=A(gr)):t=A(mr),t)throw t}function M(e){if(!/^\d+\-./.test(e))return A(Lr);var t=e.indexOf("-"),n=e.substring(0,t),r=e.substring(t+1);return{prefix:parseInt(n,10),id:r}}function F(e,t){for(var n=e.start-e.ids.length+1,r=e.ids,o=[r[0],t,[]],i=1,a=r.length;a>i;i++)o=[r[i],{status:"missing"},[o]];return[{pos:n,ids:o}]}function U(e,t){var n,r,o,i={status:"available"};if(e._deleted&&(i.deleted=!0),t)if(e._id||(e._id=D()),r=D(32,16).toLowerCase(),e._rev){if(o=M(e._rev),o.error)return o;e._rev_tree=[{pos:o.prefix,ids:[o.id,{status:"missing"},[[r,i,[]]]]}],n=o.prefix+1}else e._rev_tree=[{pos:1,ids:[r,i,[]]}],n=1;else if(e._revisions&&(e._rev_tree=F(e._revisions,i),n=e._revisions.start,r=e._revisions.ids[0]),!e._rev_tree){if(o=M(e._rev),o.error)return o;n=o.prefix,r=o.id,e._rev_tree=[{pos:n,ids:[r,i,[]]}]}B(e._id),e._rev=n+"-"+r;var a={metadata:{},data:{}};for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var u="_"===s[0];if(u&&!Ur[s]){var c=A(qr,s);throw c.message=qr.message+": "+s,c}u&&!Pr[s]?a.metadata[s.slice(1)]=e[s]:a.data[s]=e[s]}return a}function P(e,t){return t>e?-1:e>t?1:0}function H(e,t){for(var n=0;n<e.length;n++)if(t(e[n],n)===!0)return e[n]}function K(e){return function(t,n){t||n[0]&&n[0].error?e(t||n[0]):e(null,n.length?n[0]:n)}}function W(e){for(var t=0;t<e.length;t++){var n=e[t];if(n._deleted)delete n._attachments;else if(n._attachments)for(var r=Object.keys(n._attachments),o=0;o<r.length;o++){var a=r[o];n._attachments[a]=i(n._attachments[a],["data","digest","content_type","length","revpos","stub"])}}}function J(e,t){var n=P(e._id,t._id);if(0!==n)return n;var r=e._revisions?e._revisions.start:0,o=t._revisions?t._revisions.start:0;return P(r,o)}function V(e){var t={},n=[];return E(e,function(e,r,o,i){var a=r+"-"+o;return e&&(t[a]=0),void 0!==i&&n.push({from:i,to:a}),a}),n.reverse(),n.forEach(function(e){void 0===t[e.from]?t[e.from]=1+t[e.to]:t[e.from]=Math.min(t[e.from],1+t[e.to])}),t}function G(e,t,n){var r="limit"in t?t.keys.slice(t.skip,t.limit+t.skip):t.skip>0?t.keys.slice(t.skip):t.keys;if(t.descending&&r.reverse(),!r.length)return e._allDocs({limit:0},n);var o={offset:t.skip};return lr.all(r.map(function(n){var r=Yn.extend({key:n,deleted:"ok"},t);return["limit","skip","keys"].forEach(function(e){delete r[e]}),new lr(function(t,i){e._allDocs(r,function(e,r){return e?i(e):(o.total_rows=r.total_rows,void t(r.rows[0]||{key:n,error:"not_found"}))})})})).then(function(e){return o.rows=e,o})}function X(e){var t=e._compactionQueue[0],r=t.opts,o=t.callback;e.get("_local/compaction")["catch"](function(){return!1}).then(function(t){t&&t.last_seq&&(r.last_seq=t.last_seq),e._compact(r,function(t,r){t?o(t):o(null,r),n.nextTick(function(){e._compactionQueue.shift(),e._compactionQueue.length&&X(e)})})})}function z(e){return"_"===e.charAt(0)?e+"is not a valid attachment name, attachment names cannot start with '_'":!1}function Q(){ir.EventEmitter.call(this)}function $(){this.isReady=!1,this.failed=!1,this.queue=[]}function Y(e){e&&r.debug&&console.error(e)}function Z(e,t){function n(){i.emit("destroyed",o)}function r(){e.removeListener("destroyed",n),e.emit("destroyed",e)}var o=t.originalName,i=e.constructor,a=i._destructionListeners;e.once("destroyed",n),a.has(o)||a.set(o,[]),a.get(o).push(r)}function ee(e,t,n){if(!(this instanceof ee))return new ee(e,t,n);var r=this;("function"==typeof t||"undefined"==typeof t)&&(n=t,t={}),e&&"object"==typeof e&&(t=e,e=void 0),"undefined"==typeof n&&(n=Y),e=e||t.name,t=c(t),delete t.name,this.__opts=t;var o=n;r.auto_compaction=t.auto_compaction,r.prefix=ee.prefix,Q.call(r),r.taskqueue=new $;var i=new lr(function(o,i){n=function(e,t){return e?i(e):(delete t.then,void o(t))},t=c(t);var a,s,u=t.name||e;return function(){try{if("string"!=typeof u)throw s=new Error("Missing/invalid DB name"),s.code=400,s;if(a=ee.parseAdapter(u,t),t.originalName=u,t.name=a.name,t.prefix&&"http"!==a.adapter&&"https"!==a.adapter&&(t.name=t.prefix+t.name),t.adapter=t.adapter||a.adapter,r._adapter=t.adapter,er("pouchdb:adapter")("Picked adapter: "+t.adapter),r._db_name=u,!ee.adapters[t.adapter])throw s=new Error("Adapter is missing"),s.code=404,s;if(!ee.adapters[t.adapter].valid())throw s=new Error("Invalid Adapter"),s.code=404,s}catch(e){r.taskqueue.fail(e)}}(),s?i(s):(r.adapter=t.adapter,r.replicate={},r.replicate.from=function(e,t,n){return r.constructor.replicate(e,r,t,n)},r.replicate.to=function(e,t,n){return r.constructor.replicate(r,e,t,n)},r.sync=function(e,t,n){return r.constructor.sync(r,e,t,n)},r.replicate.sync=r.sync,void ee.adapters[t.adapter].call(r,t,function(e){return e?(r.taskqueue.fail(e),void n(e)):(Z(r,t),r.emit("created",r),ee.emit("created",t.originalName),r.taskqueue.ready(r),void n(null,r))}))});i.then(function(e){o(null,e)},o),r.then=i.then.bind(i),r["catch"]=i["catch"].bind(i)}function te(){return"undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage&&"undefined"!=typeof chrome.storage.local}function ne(){return Hr}function re(e){Object.keys(ir.EventEmitter.prototype).forEach(function(t){"function"==typeof ir.EventEmitter.prototype[t]&&(e[t]=Wr[t].bind(Wr))});var t=e._destructionListeners=new rr.Map;e.on("destroyed",function(e){t.has(e)&&(t.get(e).forEach(function(e){e()}),t["delete"](e))})}function oe(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(n){if("TypeError"!==n.name)throw n;for(var r="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,o=new r,i=0;i<e.length;i+=1)o.append(e[i]);return o.getBlob(t.type)}}function ie(e,t){if("undefined"==typeof FileReader)return t((new FileReaderSync).readAsArrayBuffer(e));var n=new FileReader;n.onloadend=function(e){var n=e.target.result||new ArrayBuffer(0);t(n)},n.readAsArrayBuffer(e)}function ae(){for(var e={},t=new lr(function(t,n){e.resolve=t,e.reject=n}),n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.promise=t,lr.resolve().then(function(){return fetch.apply(null,n)}).then(function(t){e.resolve(t)})["catch"](function(t){e.reject(t)}),e}function se(e,t){var n,r,o,i=new Headers,a={method:e.method,credentials:"include",headers:i};return e.json&&(i.set("Accept","application/json"),i.set("Content-Type",e.headers["Content-Type"]||"application/json")),e.body&&e.body instanceof Blob?ie(e.body,function(e){a.body=e}):e.body&&e.processData&&"string"!=typeof e.body?a.body=JSON.stringify(e.body):"body"in e?a.body=e.body:a.body=null,Object.keys(e.headers).forEach(function(t){e.headers.hasOwnProperty(t)&&i.set(t,e.headers[t])}),n=ae(e.url,a),e.timeout>0&&(r=setTimeout(function(){n.reject(new Error("Load timeout for resource: "+e.url))},e.timeout)),n.promise.then(function(t){return o={statusCode:t.status},e.timeout>0&&clearTimeout(r),o.statusCode>=200&&o.statusCode<300?e.binary?t.blob():t.text():t.json()}).then(function(e){o.statusCode>=200&&o.statusCode<300?t(null,o,e):t(e,o)})["catch"](function(e){t(e,o)}),{abort:n.reject}}function ue(e,t){var n,r,o=!1,i=function(){n.abort()},a=function(){o=!0,n.abort()};n=e.xhr?new e.xhr:new XMLHttpRequest;try{n.open(e.method,e.url)}catch(s){t(s,{statusCode:413})}n.withCredentials="withCredentials"in e?e.withCredentials:!0,"GET"===e.method?delete e.headers["Content-Type"]:e.json&&(e.headers.Accept="application/json",e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json",e.body&&e.processData&&"string"!=typeof e.body&&(e.body=JSON.stringify(e.body))),e.binary&&(n.responseType="arraybuffer"),"body"in e||(e.body=null);for(var u in e.headers)e.headers.hasOwnProperty(u)&&n.setRequestHeader(u,e.headers[u]);return e.timeout>0&&(r=setTimeout(a,e.timeout),n.onprogress=function(){clearTimeout(r),4!==n.readyState&&(r=setTimeout(a,e.timeout))},"undefined"!=typeof n.upload&&(n.upload.onprogress=n.onprogress)),n.onreadystatechange=function(){if(4===n.readyState){var r={statusCode:n.status};if(n.status>=200&&n.status<300){var i;i=e.binary?oe([n.response||""],{type:n.getResponseHeader("Content-Type")}):n.responseText,t(null,r,i)}else{var a={};if(o)a=new Error("ETIMEDOUT"),r.statusCode=400;else try{a=JSON.parse(n.response)}catch(s){}t(a,r)}}},e.body&&e.body instanceof Blob?ie(e.body,function(e){n.send(e)}):n.send(e.body),{abort:i}}function ce(){try{return new XMLHttpRequest,!0}catch(e){return!1}}function fe(e,t){return Jr||e.xhr?ue(e,t):se(e,t)}function le(){return""}function de(e,t){function n(t,n,r){if(!e.binary&&e.json&&"string"==typeof t)try{t=JSON.parse(t)}catch(o){return r(o)}Array.isArray(t)&&(t=t.map(function(e){return e.error||e.missing?T(e):e})),e.binary&&Vr(t,n),r(null,t,n)}function r(e,t){var n,r;if(e.code&&e.status){var o=new Error(e.message||e.code);return o.status=e.status,t(o)}if(e.message&&"ETIMEDOUT"===e.message)return t(e);try{n=JSON.parse(e.responseText),r=T(n)}catch(i){r=T(e)}t(r)}e=c(e);var o={method:"GET",headers:{},json:!0,processData:!0,timeout:1e4,cache:!1};return e=Yn.extend(o,e),e.json&&(e.binary||(e.headers.Accept="application/json"),e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json"),e.binary&&(e.encoding=null,e.json=!1),e.processData||(e.json=!1),fe(e,function(o,i,a){if(o)return o.status=i?i.statusCode:400,r(o,t);var s,u=i.headers&&i.headers["content-type"],c=a||le();if(!e.binary&&(e.json||!e.processData)&&"object"!=typeof c&&(/json/.test(u)||/^[\s]*\{/.test(c)&&/\}[\s]*$/.test(c)))try{c=JSON.parse(c.toString())}catch(f){}i.statusCode>=200&&i.statusCode<300?n(c,i,t):(s=T(c),s.status=i.statusCode,t(s))})}function he(e,t){var n=navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",r=-1!==n.indexOf("safari")&&-1===n.indexOf("chrome"),o=-1!==n.indexOf("msie"),i=-1!==n.indexOf("edge"),a=r||(o||i)&&"GET"===e.method,s="cache"in e?e.cache:!0,u=/^blob:/.test(e.url);if(!u&&(a||!s)){var c=-1!==e.url.indexOf("?");e.url+=(c?"&":"?")+"_nonce="+Date.now()}return de(e,t)}function pe(e){for(var t=Qr.exec(e),n={},r=14;r--;){var o=Gr[r],i=t[r]||"",a=-1!==["user","password"].indexOf(o);n[o]=a?decodeURIComponent(i):i}return n[Xr]={},n[Gr[12]].replace(zr,function(e,t,r){t&&(n[Xr][t]=r)}),n}function ve(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),o=0;t>o;o++)r[o]=e.charCodeAt(o);return n}function ye(e,t){return oe([ve(e)],{type:t})}function _e(e,t,n){try{return!e(t,n)}catch(r){var o="Filter function threw: "+r.toString();return A(xr,o)}}function me(e){var t={},n=e.filter&&"function"==typeof e.filter;return t.query=e.query_params,function(r){r.doc||(r.doc={});var o=n&&_e(e.filter,r.doc,t);if("object"==typeof o)return o;if(o)return!1;if(e.include_docs){if(!e.attachments)for(var i in r.doc._attachments)r.doc._attachments.hasOwnProperty(i)&&(r.doc._attachments[i].stub=!0)}else delete r.doc;return!0}}function ge(e,t){"console"in r&&"info"in console&&console.info("The above "+e+" is totally normal. "+t)}function be(e,t,n,r,o){return e.get(t)["catch"](function(n){if(404===n.status)return"http"===e.type()&&ge(404,"PouchDB is just checking if a remote checkpoint exists."),{session_id:r,_id:t,history:[],replicator:ro,version:no};throw n}).then(function(i){return o.cancelled?void 0:(i.history=(i.history||[]).filter(function(e){return e.session_id!==r}),i.history.unshift({last_seq:n,session_id:r}),i.history=i.history.slice(0,oo),i.version=no,i.replicator=ro,i.session_id=r,i.last_seq=n,e.put(i)["catch"](function(i){if(409===i.status)return be(e,t,n,r,o);throw i}))})}function we(e,t,n,r){this.src=e,this.target=t,this.id=n,this.returnValue=r}function Ee(e,t){if(e.session_id===t.session_id)return{last_seq:e.last_seq,history:e.history||[]};var n=e.history||[],r=t.history||[];return Se(n,r)}function Se(e,t){var n=e[0],r=e.slice(1),o=t[0],i=t.slice(1);if(!n||0===t.length)return{last_seq:io,history:[]};var a=n.session_id;if(ke(a,t))return{last_seq:n.last_seq,history:e};var s=o.session_id;return ke(s,r)?{last_seq:o.last_seq,history:i}:Se(r,i)}function ke(e,t){var n=t[0],r=t.slice(1);return e&&0!==t.length?e===n.session_id?!0:ke(e,r):!1}function qe(e){return"number"==typeof e.status&&4===Math.floor(e.status/100)}function xe(e,t){var n=6e5;e=parseInt(e,10)||0,t=parseInt(t,10),t!==t||e>=t?t=(e||1)<<1:t+=1,t>n&&(e=n>>1,t=n);var r=Math.random(),o=t-e;return~~(o*r+e)}function Ae(e){var t=0;return e||(t=2e3),xe(e,t)}function Te(e,t,n,r){return e.retry===!1?(t.emit("error",n),void t.removeAllListeners()):("function"!=typeof e.back_off_function&&(e.back_off_function=Ae),t.emit("paused"),("active"===t.state||"pending"===t.state)&&(t.emit("paused"),t.state="stopped",t.once("active",function(){e.current_back_off=so})),e.current_back_off=e.current_back_off||so,e.current_back_off=e.back_off_function(e.current_back_off),void setTimeout(r,e.current_back_off))}function Oe(e){return Yr(e)}function je(e,t,n,r){(n>0||r<t.byteLength)&&(t=new Uint8Array(t,n,Math.min(r,t.byteLength)-n)),e.append(t)}function Ie(e,t,n,r){(n>0||r<t.length)&&(t=t.substring(n,r)),e.appendBinary(t)}function Ce(e){return Object.keys(e).sort(sr.collate).reduce(function(t,n){return t[n]=e[n],t},{})}function Le(e,t,n){var r=n.doc_ids?n.doc_ids.sort(sr.collate):"",o=n.filter?n.filter.toString():"",i="",a="";return n.filter&&n.query_params&&(i=JSON.stringify(Ce(n.query_params))),n.filter&&"_view"===n.filter&&(a=n.view.toString()),lr.all([e.id(),t.id()]).then(function(e){var t=e[0]+e[1]+o+a+i+r;return fo(t)}).then(function(e){return e=e.replace(/\//g,".").replace(/\+/g,"_"),"_local/"+e})}function Re(e){for(var t=[],n=0,r=e.length;r>n;n++)t=t.concat(e[n]);return t}function De(e){return/^1-/.test(e)}function Ne(e,t,n){return!e._attachments||!e._attachments[n]||e._attachments[n].digest!==t._attachments[n].digest}function Be(e,t){var n=Object.keys(t._attachments);return lr.all(n.map(function(n){return e.getAttachment(t._id,n,{rev:t._rev})}))}function Me(e,t,n){var r="http"===t.type()&&"http"!==e.type(),o=Object.keys(n._attachments);return r?e.get(n._id).then(function(r){return lr.all(o.map(function(o){return Ne(r,n,o)?t.getAttachment(n._id,o):e.getAttachment(r._id,o)}))})["catch"](function(e){if(404!==e.status)throw e;return Be(t,n)}):Be(t,n)}function Fe(e){var t=[];return Object.keys(e).forEach(function(n){var r=e[n].missing;r.forEach(function(e){t.push({id:n,rev:e})})}),{docs:t,revs:!0}}function Ue(e,t,n,r){function o(){var o=Fe(n);if(o.docs.length)return e.bulkGet(o).then(function(n){if(r.cancelled)throw new Error("cancelled");return lr.all(n.results.map(function(n){return lr.all(n.docs.map(function(n){var r=n.ok;return n.error&&(l=!1),r&&r._attachments?Me(t,e,r).then(function(e){var t=Object.keys(r._attachments);return e.forEach(function(e,n){var o=r._attachments[t[n]];delete o.stub,delete o.length,o.data=e}),r}):r}))})).then(function(e){f=f.concat(Re(e).filter(Boolean))})})}function i(e){return e._attachments&&Object.keys(e._attachments).length>0}function a(t){return e.allDocs({keys:t,include_docs:!0}).then(function(e){if(r.cancelled)throw new Error("cancelled");e.rows.forEach(function(e){!e.deleted&&e.doc&&De(e.value.rev)&&!i(e.doc)&&(f.push(e.doc),delete n[e.id])})})}function s(){var e=Object.keys(n).filter(function(e){var t=n[e].missing;return 1===t.length&&De(t[0])});return e.length>0?a(e):void 0}function u(){return{ok:l,docs:f}}n=c(n);var f=[],l=!0;return lr.resolve().then(s).then(o).then(u)}function Pe(e,t,n,r,o){function i(){return S?lr.resolve():Le(e,t,n).then(function(n){E=n,S=new we(e,t,E,r)})}function a(){if(B=[],0!==w.docs.length){var e=w.docs;return t.bulkDocs({docs:e,new_edits:!1}).then(function(t){if(r.cancelled)throw p(),new Error("cancelled");var n=[],i={};t.forEach(function(e){e.error&&(o.doc_write_failures++,n.push(e),i[e.id]=e)}),N=N.concat(n),o.docs_written+=w.docs.length-n.length;var a=n.filter(function(e){return"unauthorized"!==e.name&&"forbidden"!==e.name});if(e.forEach(function(e){var t=i[e._id];t?r.emit("denied",c(t)):B.push(e)}),a.length>0){var s=new Error("bulkDocs error");throw s.other_errors=n,h("target.bulkDocs failed to write docs",s),new Error("bulkWrite partial failure")}},function(t){throw o.doc_write_failures+=e.length,t})}}function s(){if(w.error)throw new Error("There was a problem getting docs.");o.last_seq=O=w.seq;var e=c(o);return B.length&&(e.docs=B,r.emit("change",e)),x=!0,S.writeCheckpoint(w.seq,M).then(function(){if(x=!1,r.cancelled)throw p(),new Error("cancelled");w=void 0,m()})["catch"](b)}function u(){var e={};return w.changes.forEach(function(t){"_user/"!==t.id&&(e[t.id]=t.changes.map(function(e){return e.rev}))}),t.revsDiff(e).then(function(e){if(r.cancelled)throw p(),new Error("cancelled");w.diffs=e})}function f(){return Ue(e,t,w.diffs,r).then(function(e){w.error=!e.ok,e.docs.forEach(function(e){delete w.diffs[e._id],o.docs_read++,w.docs.push(e)})})}function l(){if(!r.cancelled&&!w){if(0===k.length)return void d(!0);w=k.shift(),u().then(f).then(a).then(s).then(l)["catch"](function(e){h("batch processing terminated with error",e)})}}function d(e){return 0===q.changes.length?void(0!==k.length||w||((j&&F.live||A)&&(r.state="pending",r.emit("active")),A&&p())):void((e||A||q.changes.length>=I)&&(k.push(q),q={seq:0,changes:[],docs:[]},("pending"===r.state||"stopped"===r.state)&&(r.state="active",r.emit("active")),l()))}function h(e,t){T||(t.message||(t.message=e),o.ok=!1,o.status="aborting",o.errors.push(t),N=N.concat(t),k=[],q={seq:0,changes:[],docs:[]},p())}function p(){if(!(T||r.cancelled&&(o.status="cancelled",x))){o.status=o.status||"complete",o.end_time=new Date,o.last_seq=O,T=!0;var i=N.filter(function(e){return"unauthorized"!==e.name&&"forbidden"!==e.name});if(i.length>0){var a=N.pop();N.length>0&&(a.other_errors=N),a.result=o,Te(n,r,a,function(){Pe(e,t,n,r)})}else o.errors=N,r.emit("complete",o),r.removeAllListeners()}}function v(e){if(r.cancelled)return p();var t=me(n)(e);t&&(q.seq=e.seq,q.changes.push(e),d(F.live))}function y(e){if(L=!1,r.cancelled)return p();if(e.results.length>0)F.since=e.last_seq,m(),d(!0);else{var t=function(){j?(r.emit("active"),F.live=!0,m()):A=!0,d(!0)};!w&&e.last_seq>O?(x=!0,S.writeCheckpoint(e.last_seq,M).then(function(){x=!1,o.last_seq=O=e.last_seq,t()})["catch"](b)):t()}}function _(e){return L=!1,r.cancelled?p():void h("changes rejected",e)}function m(){function t(){i.cancel()}function o(){r.removeListener("cancel",t)}if(!L&&!A&&k.length<C){L=!0,r._changes&&(r.removeListener("cancel",r._abortChanges),r._changes.cancel()),r.once("cancel",t);var i=e.changes(F).on("change",v);i.then(o,o),i.then(y)["catch"](_),n.retry&&(r._changes=i,r._abortChanges=t)}}function g(){i().then(function(){return r.cancelled?void p():S.getCheckpoint().then(function(e){O=e,F={since:O,limit:I,batch_size:I,style:"all_docs",doc_ids:R,return_docs:!0},n.filter&&("string"!=typeof n.filter?F.include_docs=!0:F.filter=n.filter),"heartbeat"in n&&(F.heartbeat=n.heartbeat),"timeout"in n&&(F.timeout=n.timeout),n.query_params&&(F.query_params=n.query_params),n.view&&(F.view=n.view),m()})})["catch"](function(e){h("getCheckpoint rejected with ",e)})}function b(e){throw x=!1,h("writeCheckpoint completed with error",e),e}var w,E,S,k=[],q={seq:0,changes:[],docs:[]},x=!1,A=!1,T=!1,O=0,j=n.continuous||n.live||!1,I=n.batch_size||100,C=n.batches_limit||10,L=!1,R=n.doc_ids,N=[],B=[],M=D();o=o||{ok:!0,start_time:new Date,docs_read:0,docs_written:0,doc_write_failures:0,errors:[]};var F={};return r.ready(e,t),r.cancelled?void p():(r._addedListeners||(r.once("cancel",p),"function"==typeof n.complete&&(r.once("error",n.complete),r.once("complete",function(e){n.complete(null,e)})),r._addedListeners=!0),void("undefined"==typeof n.since?g():i().then(function(){return x=!0,S.writeCheckpoint(n.since,M)}).then(function(){return x=!1,r.cancelled?void p():(O=n.since,void g())})["catch"](b)))}function He(){ir.EventEmitter.call(this),this.cancelled=!1,this.state="pending";var e=this,t=new lr(function(t,n){e.once("complete",t),e.once("error",n)});e.then=function(e,n){return t.then(e,n)},e["catch"]=function(e){return t["catch"](e)},e["catch"](function(){})}function Ke(e,t){var n=t.PouchConstructor;return"string"==typeof e?new n(e,t):e}function We(e,t,n,r){if("function"==typeof n&&(r=n,n={}),"undefined"==typeof n&&(n={}),n.doc_ids&&!Array.isArray(n.doc_ids))throw A(xr,"`doc_ids` filter parameter is not a list.");n.complete=r,n=c(n),n.continuous=n.continuous||n.live,n.retry="retry"in n?n.retry:!1,n.PouchConstructor=n.PouchConstructor||this;var o=new He(n),i=Ke(e,n),a=Ke(t,n);return Pe(i,a,n,o),o}function Je(e,t,n,r){return"function"==typeof n&&(r=n,n={}),"undefined"==typeof n&&(n={}),n=c(n),n.PouchConstructor=n.PouchConstructor||this,e=lo.toPouch(e,n),t=lo.toPouch(t,n),new Ve(e,t,n,r)}function Ve(e,t,n,r){function o(e){h.emit("change",{direction:"pull",change:e})}function i(e){h.emit("change",{direction:"push",change:e})}function a(e){h.emit("denied",{direction:"push",doc:e})}function s(e){h.emit("denied",{direction:"pull",doc:e})}function u(){h.pushPaused=!0,h.pullPaused&&h.emit("paused")}function c(){h.pullPaused=!0,h.emit("paused")}function f(){h.pushPaused=!1,h.pullPaused&&h.emit("active",{direction:"push"})}function l(){h.pullPaused=!1,h.emit("active",{direction:"pull"})}function d(e){return function(t,n){var r="change"===t&&(n===o||n===i),d="denied"===t&&(n===s||n===a),p="paused"===t&&(n===c||n===u),v="active"===t&&(n===l||n===f);(r||d||p||v)&&(t in y||(y[t]={}),y[t][e]=!0,2===Object.keys(y[t]).length&&h.removeAllListeners(t))}}var h=this;this.canceled=!1;var p=n.push?Yn.extend({},n,n.push):n,v=n.pull?Yn.extend({},n,n.pull):n;this.push=ho(e,t,p),this.pull=ho(t,e,v),this.pushPaused=!0,this.pullPaused=!0;var y={};n.live&&(this.push.on("complete",h.pull.cancel.bind(h.pull)),this.pull.on("complete",h.push.cancel.bind(h.push))),this.on("newListener",function(e){"change"===e?(h.pull.on("change",o),h.push.on("change",i)):"denied"===e?(h.pull.on("denied",s),h.push.on("denied",a)):"active"===e?(h.pull.on("active",l),h.push.on("active",f)):"paused"===e&&(h.pull.on("paused",c),h.push.on("paused",u))}),this.on("removeListener",function(e){"change"===e?(h.pull.removeListener("change",o),h.push.removeListener("change",i)):"denied"===e?(h.pull.removeListener("denied",s),h.push.removeListener("denied",a)):"active"===e?(h.pull.removeListener("active",l),h.push.removeListener("active",f)):"paused"===e&&(h.pull.removeListener("paused",c),h.push.removeListener("paused",u))}),this.pull.on("removeListener",d("pull")),this.push.on("removeListener",d("push"));var _=lr.all([this.push,this.pull]).then(function(e){var t={push:e[0],pull:e[1]};return h.emit("complete",t),r&&r(null,t),h.removeAllListeners(),t},function(e){if(h.cancel(),r?r(e):h.emit("error",e),h.removeAllListeners(),r)throw e});this.then=function(e,t){return _.then(e,t)},this["catch"]=function(e){return _["catch"](e)}}function Ge(e,t){return ye($r(e),t)}function Xe(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=0;r>o;o++)t+=String.fromCharCode(n[o]);return t}function ze(e,t){if("undefined"==typeof FileReader)return t(Xe((new FileReaderSync).readAsArrayBuffer(e)));var n=new FileReader,r="function"==typeof n.readAsBinaryString;n.onloadend=function(e){var n=e.target.result||"";return r?t(n):void t(Xe(n))},r?n.readAsBinaryString(e):n.readAsArrayBuffer(e)}function Qe(e){return new lr(function(t){ze(e,function(e){t(Yr(e))})})}function $e(e){var t=e.doc&&e.doc._attachments;t&&Object.keys(t).forEach(function(e){var n=t[e];n.data=Ge(n.data,n.content_type)})}function Ye(e){return/^_design/.test(e)?"_design/"+encodeURIComponent(e.slice(8)):/^_local/.test(e)?"_local/"+encodeURIComponent(e.slice(7)):encodeURIComponent(e)}function Ze(e){return e._attachments&&Object.keys(e._attachments)?lr.all(Object.keys(e._attachments).map(function(t){var n=e._attachments[t];return n.data&&"string"!=typeof n.data?Qe(n.data).then(function(e){n.data=e}):void 0})):lr.resolve()}function et(e){var t=pe(e);(t.user||t.password)&&(t.auth={username:t.user,password:t.password});var n=t.path.replace(/(^\/|\/$)/g,"").split("/");return t.db=n.pop(),-1===t.db.indexOf("%")&&(t.db=encodeURIComponent(t.db)),t.path=n.join("/"),t}function tt(e,t){return nt(e,e.db+"/"+t)}function nt(e,t){var n=e.path?"/":"";return e.protocol+"://"+e.host+(e.port?":"+e.port:"")+"/"+e.path+n+t}function rt(e){return"?"+Object.keys(e).map(function(t){return t+"="+encodeURIComponent(e[t])}).join("&")}function ot(e,t){function n(e,t,n){var r=e.ajax||{},o=Yn.extend(c(p),r,t);return mo(o.method+" "+o.url),eo.ajax(o,n)}function r(e,t){return new lr(function(r,o){n(e,t,function(e,t){return e?o(e):void r(t)})})}function o(e,t){return d(e,or(function(e){a().then(function(){return t.apply(this,e)})["catch"](function(t){var n=e.pop();n(t)})}))}function a(){if(e.skipSetup||e.skip_setup)return lr.resolve();if(m)return m;var t={method:"GET",url:h};return m=r({},t)["catch"](function(e){return e&&e.status&&404===e.status?(ge(404,"PouchDB is just detecting if the remote exists."),r({},{method:"PUT",url:h})):lr.reject(e)})["catch"](function(e){return e&&e.status&&412===e.status?!0:lr.reject(e)}),m["catch"](function(){m=null}),m}function s(e){return e.split("/").map(encodeURIComponent).join("/")}var u=this,f=et;e.getHost&&(f=e.getHost);var l=f(e.name,e),h=tt(l,"");e=c(e);var p=e.ajax||{};if(u.getUrl=function(){return h},u.getHeaders=function(){return p.headers||{}},e.auth||l.auth){var v=e.auth||l.auth,y=v.username+":"+v.password,_=Yr(unescape(encodeURIComponent(y)));p.headers=p.headers||{},p.headers.Authorization="Basic "+_}var m;setTimeout(function(){t(null,u)}),u.type=function(){return"http"},u.id=o("id",function(e){n({},{method:"GET",url:nt(l,"")},function(t,n){var r=n&&n.uuid?n.uuid+l.db:tt(l,"");e(null,r)})}),u.request=o("request",function(e,t){e.url=tt(l,e.url),n({},e,t)}),u.compact=o("compact",function(e,t){"function"==typeof e&&(t=e,e={}),e=c(e),n(e,{url:tt(l,"_compact"),method:"POST"},function(){function n(){u.info(function(r,o){o&&!o.compact_running?t(null,{ok:!0}):setTimeout(n,e.interval||200)})}n()})}),u.bulkGet=d("bulkGet",function(e,t){function r(t){var r={};e.revs&&(r.revs=!0),e.attachments&&(r.attachments=!0),n({},{url:tt(l,"_bulk_get"+rt(r)),method:"POST",body:{docs:e.docs}},t)}function o(){function n(e){return function(n,r){u[e]=r.results,++s===o&&t(null,{results:Re(u)})}}for(var r=vo,o=Math.ceil(e.docs.length/r),s=0,u=new Array(o),c=0;o>c;c++){var f=i(e,["revs","attachments"]);f.ajax=p,f.docs=e.docs.slice(c*r,Math.min(e.docs.length,(c+1)*r)),I(a,f,n(c))}}var a=this,s=nt(l,""),u=yo[s];"boolean"!=typeof u?r(function(e,n){if(e){var r=Math.floor(e.status/100);4===r||5===r?(yo[s]=!1,ge(e.status,"PouchDB is just detecting if the remote supports the _bulk_get API."),o()):t(e)}else yo[s]=!0,t(null,n)}):u?r(t):o()}),u._info=function(e){a().then(function(){n({},{method:"GET",url:tt(l,"")},function(t,n){return t?e(t):(n.host=tt(l,""),void e(null,n))})})["catch"](e)},u.get=o("get",function(e,t,n){function o(e){var n=e._attachments,o=n&&Object.keys(n);return n&&o.length?lr.all(o.map(function(o){var i=n[o],a=Ye(e._id)+"/"+s(o)+"?rev="+e._rev;return r(t,{method:"GET",url:tt(l,a),binary:!0}).then(function(e){return t.binary?e:Qe(e)}).then(function(e){delete i.stub,delete i.length,i.data=e})})):void 0}function i(e){return Array.isArray(e)?lr.all(e.map(function(e){return e.ok?o(e.ok):void 0})):o(e)}"function"==typeof t&&(n=t,t={}),t=c(t);var a={};t.revs&&(a.revs=!0),t.revs_info&&(a.revs_info=!0),t.open_revs&&("all"!==t.open_revs&&(t.open_revs=JSON.stringify(t.open_revs)),a.open_revs=t.open_revs),t.rev&&(a.rev=t.rev),t.conflicts&&(a.conflicts=t.conflicts),e=Ye(e);var u={method:"GET",url:tt(l,e+rt(a))};r(t,u).then(function(e){return lr.resolve().then(function(){return t.attachments?i(e):void 0}).then(function(){n(null,e)})})["catch"](n)}),u.remove=o("remove",function(e,t,r,o){var i;"string"==typeof t?(i={_id:e,_rev:t},"function"==typeof r&&(o=r,r={})):(i=e,"function"==typeof t?(o=t,r={}):(o=r,r=t));var a=i._rev||r.rev;n(r,{method:"DELETE",url:tt(l,Ye(i._id))+"?rev="+a},o)}),u.getAttachment=o("getAttachment",function(e,t,r,o){"function"==typeof r&&(o=r,r={});var i=r.rev?"?rev="+r.rev:"",a=tt(l,Ye(e))+"/"+s(t)+i;n(r,{method:"GET",url:a,binary:!0},o)}),u.removeAttachment=o("removeAttachment",function(e,t,r,o){var i=tt(l,Ye(e)+"/"+s(t))+"?rev="+r;n({},{method:"DELETE",url:i},o)}),u.putAttachment=o("putAttachment",function(e,t,r,o,i,a){"function"==typeof i&&(a=i,i=o,o=r,r=null);var u=Ye(e)+"/"+s(t),c=tt(l,u);if(r&&(c+="?rev="+r),"string"==typeof o){var f;try{f=$r(o)}catch(d){return a(A(Er,"Attachment is not a valid base64 string"))}o=f?ye(f,i):""}var h={headers:{"Content-Type":i},method:"PUT",url:c,processData:!1,body:o,timeout:p.timeout||6e4};n({},h,a)}),u._bulkDocs=function(e,t,r){e.new_edits=t.new_edits,a().then(function(){return lr.all(e.docs.map(Ze))}).then(function(){n(t,{method:"POST",url:tt(l,"_bulk_docs"),body:e},function(e,t){return e?r(e):(t.forEach(function(e){e.ok=!0}),void r(null,t))})})["catch"](r)},u.allDocs=o("allDocs",function(e,t){"function"==typeof e&&(t=e,e={}),e=c(e);var n,o={},i="GET";e.conflicts&&(o.conflicts=!0),e.descending&&(o.descending=!0),e.include_docs&&(o.include_docs=!0),e.attachments&&(o.attachments=!0),e.key&&(o.key=JSON.stringify(e.key)),e.start_key&&(e.startkey=e.start_key),e.startkey&&(o.startkey=JSON.stringify(e.startkey)),
e.end_key&&(e.endkey=e.end_key),e.endkey&&(o.endkey=JSON.stringify(e.endkey)),"undefined"!=typeof e.inclusive_end&&(o.inclusive_end=!!e.inclusive_end),"undefined"!=typeof e.limit&&(o.limit=e.limit),"undefined"!=typeof e.skip&&(o.skip=e.skip);var a=rt(o);if("undefined"!=typeof e.keys){var s="keys="+encodeURIComponent(JSON.stringify(e.keys));s.length+a.length+1<=_o?a+="&"+s:(i="POST",n={keys:e.keys})}r(e,{method:i,url:tt(l,"_all_docs"+a),body:n}).then(function(n){e.include_docs&&e.attachments&&e.binary&&n.rows.forEach($e),t(null,n)})["catch"](t)}),u._changes=function(e){var t="batch_size"in e?e.batch_size:po;e=c(e),e.timeout="timeout"in e?e.timeout:"timeout"in p?p.timeout:3e4;var r,o=e.timeout?{timeout:e.timeout-5e3}:{},i="undefined"!=typeof e.limit?e.limit:!1;r="return_docs"in e?e.return_docs:"returnDocs"in e?e.returnDocs:!0;var s=i;if(e.style&&(o.style=e.style),(e.include_docs||e.filter&&"function"==typeof e.filter)&&(o.include_docs=!0),e.attachments&&(o.attachments=!0),e.continuous&&(o.feed="longpoll"),e.conflicts&&(o.conflicts=!0),e.descending&&(o.descending=!0),"heartbeat"in e?e.heartbeat&&(o.heartbeat=e.heartbeat):o.heartbeat=1e4,e.filter&&"string"==typeof e.filter&&(o.filter=e.filter,"_view"===e.filter&&e.view&&"string"==typeof e.view&&(o.view=e.view)),e.query_params&&"object"==typeof e.query_params)for(var u in e.query_params)e.query_params.hasOwnProperty(u)&&(o[u]=e.query_params[u]);var f,d="GET";if(e.doc_ids){o.filter="_doc_ids";var h=JSON.stringify(e.doc_ids);h.length<_o?o.doc_ids=h:(d="POST",f={doc_ids:e.doc_ids})}var v,y,_=function(r,u){if(!e.aborted){o.since=r,"object"==typeof o.since&&(o.since=JSON.stringify(o.since)),e.descending?i&&(o.limit=s):o.limit=!i||s>t?t:s;var c={method:d,url:tt(l,"_changes"+rt(o)),timeout:e.timeout,body:f};y=r,e.aborted||a().then(function(){v=n(e,c,u)})["catch"](u)}},m={results:[]},g=function(n,o){if(!e.aborted){var a=0;if(o&&o.results){a=o.results.length,m.last_seq=o.last_seq;var u={};u.query=e.query_params,o.results=o.results.filter(function(t){s--;var n=me(e)(t);return n&&(e.include_docs&&e.attachments&&e.binary&&$e(t),r&&m.results.push(t),e.onChange(t)),n})}else if(n)return e.aborted=!0,void e.complete(n);o&&o.last_seq&&(y=o.last_seq);var c=i&&0>=s||o&&t>a||e.descending;(!e.continuous||i&&0>=s)&&c?e.complete(null,m):setTimeout(function(){_(y,g)},0)}};return _(e.since||0,g),{cancel:function(){e.aborted=!0,v&&v.abort()}}},u.revsDiff=o("revsDiff",function(e,t,r){"function"==typeof t&&(r=t,t={}),n(t,{method:"POST",url:tt(l,"_revs_diff"),body:e},r)}),u._close=function(e){e()},u._destroy=function(t,r){n(t,{url:tt(l,""),method:"DELETE"},function(t,n){return t&&t.status&&404!==t.status?r(t):(u.emit("destroyed"),u.constructor.emit("destroyed",e.name),void r(null,n))})}}function it(){this.promise=new lr(function(e){e()})}function at(e){return cr.hash(e)}function st(e){var t=e.db,n=e.viewName,r=e.map,o=e.reduce,i=e.temporary,a=r.toString()+(o&&o.toString())+"undefined";if(!i&&t._cachedViews){var s=t._cachedViews[a];if(s)return lr.resolve(s)}return t.info().then(function(e){function s(e){e.views=e.views||{};var t=n;-1===t.indexOf("/")&&(t=n+"/"+n);var r=e.views[t]=e.views[t]||{};if(!r[u])return r[u]=!0,e}var u=e.db_name+"-mrview-"+(i?"temp":at(a));return h(t,"_local/mrviews",s).then(function(){return t.registerDependentDatabase(u).then(function(e){var n=e.db;n.auto_compaction=!0;var s={name:u,db:n,sourceDB:t,adapter:t.adapter,mapFun:r,reduceFun:o};return s.db.get("_local/lastSeq")["catch"](function(e){if(404!==e.status)throw e}).then(function(e){return s.seq=e?e.seq:0,i||(t._cachedViews=t._cachedViews||{},t._cachedViews[a]=s,s.db.once("destroyed",function(){delete t._cachedViews[a]})),s})})})})}function ut(e,t,n,r,o,i){return ar("return ("+e.replace(/;\s*$/,"")+");",{emit:t,sum:n,log:r,isArray:o,toJSON:i})}function ct(e){return-1===e.indexOf("/")?[e,e]:e.split("/")}function ft(e){return 1===e.length&&/^1-/.test(e[0].rev)}function lt(e,t){try{e.emit("error",t)}catch(n){console.error("The user's map/reduce function threw an uncaught error.\nYou can debug this error by doing:\nmyDatabase.on('error', function (err) { debugger; });\nPlease double-check your map/reduce function."),console.error(t)}}function dt(e,t,n){try{return{output:t.apply(null,n)}}catch(r){return lt(e,r),{error:r}}}function ht(e,t){var n=xo(e.key,t.key);return 0!==n?n:xo(e.value,t.value)}function pt(e,t,n){return n=n||0,"number"==typeof t?e.slice(n,t+n):n>0?e.slice(n):e}function vt(e){var t=e.value,n=t&&"object"==typeof t&&t._id||e.id;return n}function yt(e){e.rows.forEach(function(e){var t=e.doc&&e.doc._attachments;t&&Object.keys(t).forEach(function(e){var n=t[e];t[e].data=Ge(n.data,n.content_type)})})}function _t(e){return function(t){return e.include_docs&&e.attachments&&e.binary&&yt(t),t}}function mt(e){var t="builtin "+e+" function requires map values to be numbers or number arrays";return new Ht(t)}function gt(e){for(var t=0,n=0,r=e.length;r>n;n++){var o=e[n];if("number"!=typeof o){if(!Array.isArray(o))throw mt("_sum");t="number"==typeof t?[t]:t;for(var i=0,a=o.length;a>i;i++){var s=o[i];if("number"!=typeof s)throw mt("_sum");"undefined"==typeof t[i]?t.push(s):t[i]+=s}}else"number"==typeof t?t+=o:t[0]+=o}return t}function bt(e,t,n,r){var o=t[e];"undefined"!=typeof o&&(r&&(o=encodeURIComponent(JSON.stringify(o))),n.push(e+"="+o))}function wt(e){if("undefined"!=typeof e){var t=Number(e);return isNaN(t)||t!==parseInt(e,10)?e:t}}function Et(e){return e.group_level=wt(e.group_level),e.limit=wt(e.limit),e.skip=wt(e.skip),e}function St(e){if(e){if("number"!=typeof e)return new Ut('Invalid value for integer: "'+e+'"');if(0>e)return new Ut('Invalid value for positive integer: "'+e+'"')}}function kt(e,t){var n=e.descending?"endkey":"startkey",r=e.descending?"startkey":"endkey";if("undefined"!=typeof e[n]&&"undefined"!=typeof e[r]&&xo(e[n],e[r])>0)throw new Ut("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");if(t.reduce&&e.reduce!==!1){if(e.include_docs)throw new Ut("{include_docs:true} is invalid for reduce");if(e.keys&&e.keys.length>1&&!e.group&&!e.group_level)throw new Ut("Multi-key fetches for reduce views must use {group: true}")}["group_level","limit","skip"].forEach(function(t){var n=St(e[t]);if(n)throw n})}function qt(e,t,n){var r,o=[],i="GET";if(bt("reduce",n,o),bt("include_docs",n,o),bt("attachments",n,o),bt("limit",n,o),bt("descending",n,o),bt("group",n,o),bt("group_level",n,o),bt("skip",n,o),bt("stale",n,o),bt("conflicts",n,o),bt("startkey",n,o,!0),bt("start_key",n,o,!0),bt("endkey",n,o,!0),bt("end_key",n,o,!0),bt("inclusive_end",n,o),bt("key",n,o,!0),o=o.join("&"),o=""===o?"":"?"+o,"undefined"!=typeof n.keys){var a=2e3,s="keys="+encodeURIComponent(JSON.stringify(n.keys));s.length+o.length+1<=a?o+=("?"===o[0]?"&":"?")+s:(i="POST","string"==typeof t?r={keys:n.keys}:t.keys=n.keys)}if("string"==typeof t){var u=ct(t);return e.request({method:i,url:"_design/"+u[0]+"/_view/"+u[1]+o,body:r}).then(_t(n))}return r=r||{},Object.keys(t).forEach(function(e){Array.isArray(t[e])?r[e]=t[e]:r[e]=t[e].toString()}),e.request({method:"POST",url:"_temp_view"+o,body:r}).then(_t(n))}function xt(e,t,n){return new lr(function(r,o){e._query(t,n,function(e,t){return e?o(e):void r(t)})})}function At(e){return new lr(function(t,n){e._viewCleanup(function(e,r){return e?n(e):void t(r)})})}function Tt(e){return function(t){if(404===t.status)return e;throw t}}function Ot(e,t,n){function r(){return ft(f)?lr.resolve(s):t.db.get(a)["catch"](Tt(s))}function o(e){return e.keys.length?t.db.allDocs({keys:e.keys,include_docs:!0}):lr.resolve({rows:[]})}function i(e,t){for(var n=[],r={},o=0,i=t.rows.length;i>o;o++){var a=t.rows[o],s=a.doc;if(s&&(n.push(s),r[s._id]=!0,s._deleted=!c[s._id],!s._deleted)){var u=c[s._id];"value"in u&&(s.value=u.value)}}var f=Object.keys(c);return f.forEach(function(e){if(!r[e]){var t={_id:e},o=c[e];"value"in o&&(t.value=o.value),n.push(t)}}),e.keys=Co(f.concat(e.keys)),n.push(e),n}var a="_local/doc_"+e,s={_id:a,keys:[]},u=n[e],c=u.indexableKeysToKeyValues,f=u.changes;return r().then(function(e){return o(e).then(function(t){return i(e,t)})})}function jt(e,t,n){var r="_local/lastSeq";return e.db.get(r)["catch"](Tt({_id:r,seq:0})).then(function(r){var o=Object.keys(t);return lr.all(o.map(function(n){return Ot(n,e,t)})).then(function(t){var o=Re(t);return r.seq=n,o.push(r),e.db.bulkDocs({docs:o})})})}function It(e){var t="string"==typeof e?e:e.name,n=Do[t];return n||(n=Do[t]=new it),n}function Ct(e){return Io(It(e),function(){return Lt(e)})()}function Lt(e){function t(e,t){var n={id:o._id,key:To(e)};"undefined"!=typeof t&&null!==t&&(n.value=To(t)),r.push(n)}function n(t,n){return function(){return jt(e,t,n)}}var r,o,i;if("function"==typeof e.mapFun&&2===e.mapFun.length){var a=e.mapFun;i=function(e){return a(e,t)}}else i=ut(e.mapFun.toString(),t,gt,go,Array.isArray,JSON.parse);var s=e.seq||0,u=new it;return new lr(function(t,a){function c(){u.finish().then(function(){e.seq=s,t()})}function f(){function t(e){a(e)}e.sourceDB.changes({conflicts:!0,include_docs:!0,style:"all_docs",since:s,limit:Bo}).on("complete",function(t){var a=t.results;if(!a.length)return c();for(var l={},d=0,h=a.length;h>d;d++){var p=a[d];if("_"!==p.doc._id[0]){r=[],o=p.doc,o._deleted||dt(e.sourceDB,i,[o]),r.sort(ht);for(var v,y={},_=0,m=r.length;m>_;_++){var g=r[_],b=[g.key,g.id];0===xo(g.key,v)&&b.push(_);var w=Ao(b);y[w]=g,v=g.key}l[p.doc._id]={indexableKeysToKeyValues:y,changes:p.changes}}s=p.seq}return u.add(n(l,s)),a.length<Bo?c():f()}).on("error",t)}f()})}function Rt(e,t,n){0===n.group_level&&delete n.group_level;var r,o=n.group||n.group_level;r=Mo[e.reduceFun]?Mo[e.reduceFun]:ut(e.reduceFun.toString(),null,gt,go,Array.isArray,JSON.parse);var i=[],a=isNaN(n.group_level)?Number.POSITIVE_INFINITY:n.group_level;t.forEach(function(e){var t=i[i.length-1],n=o?e.key:null;return o&&Array.isArray(n)&&(n=n.slice(0,a)),t&&0===xo(t.groupKey,n)?(t.keys.push([e.key,e.id]),void t.values.push(e.value)):void i.push({keys:[[e.key,e.id]],values:[e.value],groupKey:n})}),t=[];for(var s=0,u=i.length;u>s;s++){var c=i[s],f=dt(e.sourceDB,r,[c.keys,c.values,!1]);if(f.error&&f.error instanceof Ht)throw f.error;t.push({value:f.error?null:f.output,key:c.groupKey})}return{rows:pt(t,n.limit,n.skip)}}function Dt(e,t){return Io(It(e),function(){return Nt(e,t)})()}function Nt(e,t){function n(t){return t.include_docs=!0,e.db.allDocs(t).then(function(e){return o=e.total_rows,e.rows.map(function(e){if("value"in e.doc&&"object"==typeof e.doc.value&&null!==e.doc.value){var t=Object.keys(e.doc.value).sort(),n=["id","key","value"];if(!(n>t||t>n))return e.doc.value}var r=Oo(e.doc._id);return{key:r[0],id:r[1],value:"value"in e.doc?e.doc.value:null}})})}function r(n){var r;if(r=i?Rt(e,n,t):{total_rows:o,offset:a,rows:n},t.include_docs){var s=Co(n.map(vt));return e.sourceDB.allDocs({keys:s,include_docs:!0,conflicts:t.conflicts,attachments:t.attachments,binary:t.binary}).then(function(e){var t={};return e.rows.forEach(function(e){e.doc&&(t["$"+e.id]=e.doc)}),n.forEach(function(e){var n=vt(e),r=t["$"+n];r&&(e.doc=r)}),r})}return r}var o,i=e.reduceFun&&t.reduce!==!1,a=t.skip||0;if("undefined"==typeof t.keys||t.keys.length||(t.limit=0,delete t.keys),"undefined"!=typeof t.keys){var s=t.keys,u=s.map(function(e){var t={startkey:Ao([e]),endkey:Ao([e,{}])};return n(t)});return lr.all(u).then(Re).then(r)}var c={descending:t.descending};if(t.start_key&&(t.startkey=t.start_key),t.end_key&&(t.endkey=t.end_key),"undefined"!=typeof t.startkey&&(c.startkey=Ao(t.descending?[t.startkey,{}]:[t.startkey])),"undefined"!=typeof t.endkey){var f=t.inclusive_end!==!1;t.descending&&(f=!f),c.endkey=Ao(f?[t.endkey,{}]:[t.endkey])}if("undefined"!=typeof t.key){var l=Ao([t.key]),d=Ao([t.key,{}]);c.descending?(c.endkey=l,c.startkey=d):(c.startkey=l,c.endkey=d)}return i||("number"==typeof t.limit&&(c.limit=t.limit),c.skip=a),n(c).then(r)}function Bt(e){return e.request({method:"POST",url:"_view_cleanup"})}function Mt(e){return e.get("_local/mrviews").then(function(t){var n={};Object.keys(t.views).forEach(function(e){var t=ct(e),r="_design/"+t[0],o=t[1];n[r]=n[r]||{},n[r][o]=!0});var r={keys:Object.keys(n),include_docs:!0};return e.allDocs(r).then(function(r){var o={};r.rows.forEach(function(e){var r=e.key.substring(8);Object.keys(n[e.key]).forEach(function(n){var i=r+"/"+n;t.views[i]||(i=n);var a=Object.keys(t.views[i]),s=e.doc&&e.doc.views&&e.doc.views[n];a.forEach(function(e){o[e]=o[e]||s})})});var i=Object.keys(o).filter(function(e){return!o[e]}),a=i.map(function(t){return Io(It(t),function(){return new e.constructor(t,e.__opts).destroy()})()});return lr.all(a).then(function(){return{ok:!0}})})},Tt({ok:!0}))}function Ft(e,t,r){if("http"===e.type())return qt(e,t,r);if("function"==typeof e._query)return xt(e,t,r);if("string"!=typeof t){kt(r,t);var o={db:e,viewName:"temp_view/temp_view",map:t.map,reduce:t.reduce,temporary:!0};return No.add(function(){return st(o).then(function(e){function t(){return e.db.destroy()}return Lo(Ct(e).then(function(){return Dt(e,r)}),t)})}),No.finish()}var i=t,a=ct(i),s=a[0],u=a[1];return e.get("_design/"+s).then(function(t){var o=t.views&&t.views[u];if(!o||"string"!=typeof o.map)throw new Pt("ddoc "+s+" has no view named "+u);kt(r,o);var a={db:e,viewName:i,map:o.map,reduce:o.reduce};return st(a).then(function(e){return"ok"===r.stale||"update_after"===r.stale?("update_after"===r.stale&&n.nextTick(function(){Ct(e)}),Dt(e,r)):Ct(e).then(function(){return Dt(e,r)})})})}function Ut(e){this.status=400,this.name="query_parse_error",this.message=e,this.error=!0;try{Error.captureStackTrace(this,Ut)}catch(t){}}function Pt(e){this.status=404,this.name="not_found",this.message=e,this.error=!0;try{Error.captureStackTrace(this,Pt)}catch(t){}}function Ht(e){this.status=500,this.name="invalid_value",this.message=e,this.error=!0;try{Error.captureStackTrace(this,Ht)}catch(t){}}function Kt(e){return Yr(Xe(e))}function Wt(e,t,n){function r(e){try{return $r(e)}catch(t){var n=A(Er,"Attachment is not a valid base64 string");return{error:n}}}function o(e,n){if(e.stub)return n();if("string"==typeof e.data){var o=r(e.data);if(o.error)return n(o.error);e.length=o.length,"blob"===t?e.data=ye(o,e.content_type):"base64"===t?e.data=Yr(o):e.data=o,fo(o).then(function(t){e.digest="md5-"+t,n()})}else ie(e.data,function(r){"binary"===t?e.data=Xe(r):"base64"===t&&(e.data=Kt(r)),fo(r).then(function(t){e.digest="md5-"+t,e.length=r.byteLength,n()})})}function i(){s++,e.length===s&&(a?n(a):n())}if(!e.length)return n();var a,s=0;e.forEach(function(e){function t(e){a=e,r++,r===n.length&&i()}var n=e.data&&e.data._attachments?Object.keys(e.data._attachments):[],r=0;if(!n.length)return i();for(var s in e.data._attachments)e.data._attachments.hasOwnProperty(s)&&o(e.data._attachments[s],t)})}function Jt(e,t){return e.pos-t.pos}function Vt(e,t,n){for(var r,o=0,i=e.length;i>o;)r=o+i>>>1,n(e[r],t)<0?o=r+1:i=r;return o}function Gt(e,t,n){var r=Vt(e,t,n);e.splice(r,0,t)}function Xt(e,t){for(var n,r,o=t,i=e.length;i>o;o++){var a=e[o],s=[a.id,a.opts,[]];r?(r[2].push(s),r=s):n=r=s}return n}function zt(e,t){return e[0]<t[0]?-1:1}function Qt(e,t){for(var n=[{tree1:e,tree2:t}],r=!1;n.length>0;){var o=n.pop(),i=o.tree1,a=o.tree2;(i[1].status||a[1].status)&&(i[1].status="available"===i[1].status||"available"===a[1].status?"available":"missing");for(var s=0;s<a[2].length;s++)if(i[2][0]){for(var u=!1,c=0;c<i[2].length;c++)i[2][c][0]===a[2][s][0]&&(n.push({tree1:i[2][c],tree2:a[2][s]}),u=!0);u||(r="new_branch",Gt(i[2],a[2][s],zt))}else r="new_leaf",i[2][0]=a[2][s]}return{conflicts:r,tree:e}}function $t(e,t,n){var r,o=[],i=!1,a=!1;if(!e.length)return{tree:[t],conflicts:"new_leaf"};for(var s=0,u=e.length;u>s;s++){var c=e[s];if(c.pos===t.pos&&c.ids[0]===t.ids[0])r=Qt(c.ids,t.ids),o.push({pos:c.pos,ids:r.tree}),i=i||r.conflicts,a=!0;else if(n!==!0){var f=c.pos<t.pos?c:t,l=c.pos<t.pos?t:c,d=l.pos-f.pos,h=[],p=[];for(p.push({ids:f.ids,diff:d,parent:null,parentIdx:null});p.length>0;){var v=p.pop();if(0!==v.diff)for(var y=v.ids[2],_=0,m=y.length;m>_;_++)p.push({ids:y[_],diff:v.diff-1,parent:v.ids,parentIdx:_});else v.ids[0]===l.ids[0]&&h.push(v)}var g=h[0];g?(r=Qt(g.ids,l.ids),g.parent[2][g.parentIdx]=r.tree,o.push({pos:f.pos,ids:f.ids}),i=i||r.conflicts,a=!0):o.push(c)}else o.push(c)}return a||o.push(t),o.sort(Jt),{tree:o,conflicts:i||"internal_node"}}function Yt(e,t){for(var n,r=L(e),o={},i=0,a=r.length;a>i;i++){for(var s=r[i],u=s.ids,c=Math.max(0,u.length-t),f={pos:s.pos+c,ids:Xt(u,c)},l=0;c>l;l++){var d=s.pos+l+"-"+u[l].id;o[d]=!0}n=n?$t(n,f,!0).tree:[f]}return E(n,function(e,t,n){delete o[t+"-"+n]}),{tree:n,revs:Object.keys(o)}}function Zt(e,t,n){var r=$t(e,t),o=Yt(r.tree,n);return{tree:o.tree,stemmedRevs:o.revs,conflicts:r.conflicts}}function en(e,t){for(var n,r=e.slice(),o=t.split("-"),i=parseInt(o[0],10),a=o[1];n=r.pop();){if(n.pos===i&&n.ids[0]===a)return!0;for(var s=n.ids[2],u=0,c=s.length;c>u;u++)r.push({pos:n.pos+1,ids:s[u]})}return!1}function tn(e,t,n,r,o,i,a,s){if(en(t.rev_tree,n.metadata.rev))return r[o]=n,i();var u=t.winningRev||v(t),c="deleted"in t?t.deleted:_(t,u),f="deleted"in n.metadata?n.metadata.deleted:_(n.metadata),l=/^1-/.test(n.metadata.rev);if(c&&!f&&s&&l){var d=n.data;d._rev=u,d._id=n.metadata.id,n=U(d,s)}var h=Zt(t.rev_tree,n.metadata.rev_tree[0],e),p=s&&(c&&f||!c&&"new_leaf"!==h.conflicts||c&&!f&&"new_branch"===h.conflicts);if(p){var y=A(yr);return r[o]=y,i()}var m=n.metadata.rev;n.metadata.rev_tree=h.tree,n.stemmedRevs=h.stemmedRevs||[],t.rev_map&&(n.metadata.rev_map=t.rev_map);var g,b=v(n.metadata),w=_(n.metadata,b),E=c===w?0:w>c?-1:1;g=m===b?w:_(n.metadata,m),a(n,b,w,g,!0,E,o,i)}function nn(e){return"missing"===e.metadata.rev_tree[0].ids[1].status}function rn(e,t,n,r,o,i,a,s,u){function c(e,t,n){var r=v(e.metadata),o=_(e.metadata,r);if("was_delete"in s&&o)return i[t]=A(vr,"deleted"),n();var u=l&&nn(e);if(u){var c=A(yr);return i[t]=c,n()}var f=o?0:1;a(e,r,o,o,!1,f,t,n)}function f(){++h===p&&u&&u()}e=e||1e3;var l=s.new_edits,d=new rr.Map,h=0,p=t.length;t.forEach(function(e,t){if(e._id&&C(e._id)){var r=e._deleted?"_removeLocal":"_putLocal";return void n[r](e,{ctx:o},function(e,n){i[t]=e||n,f()})}var a=e.metadata.id;d.has(a)?(p--,d.get(a).push([e,t])):d.set(a,[[e,t]])}),d.forEach(function(t,n){function o(){++u<t.length?s():f()}function s(){var s=t[u],f=s[0],d=s[1];if(r.has(n))tn(e,r.get(n),f,i,d,o,a,l);else{var h=Zt([],f.metadata.rev_tree[0],e);f.metadata.rev_tree=h.tree,f.stemmedRevs=h.stemmedRevs||[],c(f,d,o)}}var u=0;s()})}function on(e){var t=[];return E(e.rev_tree,function(e,n,r,o,i){"available"!==i.status||e||(t.push(n+"-"+r),i.status="missing")}),t}function an(e){try{return JSON.parse(e)}catch(t){return fr.parse(e)}}function sn(e){return e.length<5e4?JSON.parse(e):an(e)}function un(e){try{return JSON.stringify(e)}catch(t){return fr.stringify(e)}}function cn(e,t,n,r){try{e.apply(t,n)}catch(o){r.emit("error",o)}}function fn(e){if(!Qo.running&&Qo.queue.length){Qo.running=!0;var t=Qo.queue.shift();t.action(function(r,o){cn(t.callback,this,[r,o],e),Qo.running=!1,n.nextTick(function(){fn(e)})})}}function ln(e){return function(t){var n="unknown_error";t.target&&t.target.error&&(n=t.target.error.name||t.target.error.message),e(A(Or,n,t.type))}}function dn(e,t,n){return{data:un(e),winningRev:t,deletedOrLocal:n?"1":"0",seq:e.seq,id:e.id}}function hn(e){if(!e)return null;var t=sn(e.data);return t.winningRev=e.winningRev,t.deleted="1"===e.deletedOrLocal,t.seq=e.seq,t}function pn(e){if(!e)return e;var t=e._doc_id_rev.lastIndexOf(":");return e._id=e._doc_id_rev.substring(0,t-1),e._rev=e._doc_id_rev.substring(t+1),delete e._doc_id_rev,e}function vn(e,t,n,r){n?r(e?"string"!=typeof e?e:Ge(e,t):oe([""],{type:t})):e?"string"!=typeof e?ze(e,function(e){r(Yr(e))}):r(e):r("")}function yn(e,t,n,r){function o(){++s===a.length&&r&&r()}function i(e,t){var r=e._attachments[t],i=r.digest,a=n.objectStore(Jo).get(i);a.onsuccess=function(e){r.body=e.target.result.body,o()}}var a=Object.keys(e._attachments||{});if(!a.length)return r&&r();var s=0;a.forEach(function(n){t.attachments&&t.include_docs?i(e,n):(e._attachments[n].stub=!0,o())})}function _n(e,t){return lr.all(e.map(function(e){if(e.doc&&e.doc._attachments){var n=Object.keys(e.doc._attachments);return lr.all(n.map(function(n){var r=e.doc._attachments[n];if("body"in r){var o=r.body,a=r.content_type;return new lr(function(s){vn(o,a,t,function(t){e.doc._attachments[n]=Yn.extend(i(r,["digest","content_type"]),{data:t}),s()})})}}))}}))}function mn(e,t,n){function r(){c--,c||o()}function o(){i.length&&i.forEach(function(e){var t=u.index("digestSeq").count(IDBKeyRange.bound(e+"::",e+"::￿",!1,!1));t.onsuccess=function(t){var n=t.target.result;n||s["delete"](e)}})}var i=[],a=n.objectStore(Wo),s=n.objectStore(Jo),u=n.objectStore(Vo),c=e.length;e.forEach(function(e){var n=a.index("_doc_id_rev"),o=t+"::"+e;n.getKey(o).onsuccess=function(e){var t=e.target.result;if("number"!=typeof t)return r();a["delete"](t);var n=u.index("seq").openCursor(IDBKeyRange.only(t));n.onsuccess=function(e){var t=e.target.result;if(t){var n=t.value.digestSeq.split("::")[0];i.push(n),u["delete"](t.primaryKey),t["continue"]()}else r()}}})}function gn(e,t,n){try{return{txn:e.transaction(t,n)}}catch(r){return{error:r}}}function bn(e,t,n,r,o,i,a){function s(){var e=[Ko,Wo,Jo,Xo,Vo],t=gn(o,e,"readwrite");return t.error?a(t.error):(g=t.txn,g.onabort=ln(a),g.ontimeout=ln(a),g.oncomplete=f,b=g.objectStore(Ko),w=g.objectStore(Wo),E=g.objectStore(Jo),S=g.objectStore(Vo),void d(function(e){return e?(R=!0,a(e)):void c()}))}function u(){rn(e.revs_limit,q,r,L,g,I,h,n)}function c(){function e(){++n===q.length&&u()}function t(t){var n=hn(t.target.result);n&&L.set(n.id,n),e()}if(q.length)for(var n=0,r=0,o=q.length;o>r;r++){var i=q[r];if(i._id&&C(i._id))e();else{var a=b.get(i.metadata.id);a.onsuccess=t}}}function f(){R||(i.notify(r._meta.name),r._meta.docCount+=x,a(null,I))}function l(e,t){var n=E.get(e);n.onsuccess=function(n){if(n.target.result)t();else{var r=A(Dr,"unknown stub attachment with digest "+e);r.status=412,t(r)}}}function d(e){function t(){++o===n.length&&e(r)}var n=[];if(q.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t];r.stub&&n.push(r.digest)})}),!n.length)return e();var r,o=0;n.forEach(function(e){l(e,function(e){e&&!r&&(r=e),t()})})}function h(e,t,n,r,o,i,a,s){x+=i,e.metadata.winningRev=t,e.metadata.deleted=n;var u=e.data;u._id=e.metadata.id,u._rev=e.metadata.rev,r&&(u._deleted=!0);var c=u._attachments&&Object.keys(u._attachments).length;return c?y(e,t,n,o,a,s):void v(e,t,n,o,a,s)}function p(e){var t=on(e.metadata);mn(t,e.metadata.id,g)}function v(e,t,n,o,i,a){function s(i){o&&r.auto_compaction?p(e):e.stemmedRevs.length&&mn(e.stemmedRevs,e.metadata.id,g),l.seq=i.target.result,delete l.rev;var a=dn(l,t,n),s=b.put(a);s.onsuccess=c}function u(e){e.preventDefault(),e.stopPropagation();var t=w.index("_doc_id_rev"),n=t.getKey(f._doc_id_rev);n.onsuccess=function(e){var t=w.put(f,e.target.result);t.onsuccess=s}}function c(){I[i]={ok:!0,id:l.id,rev:t},L.set(e.metadata.id,e.metadata),_(e,l.seq,a)}var f=e.data,l=e.metadata;f._doc_id_rev=l.id+"::"+l.rev,delete f._id,delete f._rev;var d=w.put(f);d.onsuccess=s,d.onerror=u}function y(e,t,n,r,o,i){function a(){c===f.length&&v(e,t,n,r,o,i)}function s(){c++,a()}var u=e.data,c=0,f=Object.keys(u._attachments);f.forEach(function(n){var r=e.data._attachments[n];if(r.stub)c++,a();else{var o=r.data;delete r.data,r.revpos=parseInt(t,10);var i=r.digest;m(i,o,s)}})}function _(e,t,n){function r(){++i===a.length&&n()}function o(n){var o=e.data._attachments[n].digest,i=S.put({seq:t,digestSeq:o+"::"+t});i.onsuccess=r,i.onerror=function(e){e.preventDefault(),e.stopPropagation(),r()}}var i=0,a=Object.keys(e.data._attachments||{});if(!a.length)return n();for(var s=0;s<a.length;s++)o(a[s])}function m(e,t,n){var r=E.count(e);r.onsuccess=function(r){var o=r.target.result;if(o)return n();var i={digest:e,body:t},a=E.put(i);a.onsuccess=n}}for(var g,b,w,E,S,k,q=t.docs,x=0,T=0,O=q.length;O>T;T++){var j=q[T];j._id&&C(j._id)||(j=q[T]=U(j,n.new_edits),j.error&&!k&&(k=j))}if(k)return a(k);var I=new Array(q.length),L=new rr.Map,R=!1,D=r._meta.blobSupport?"blob":"base64";Wt(q,D,function(e){return e?a(e):void s()})}function wn(e,t,n,r,o){try{if(e&&t)return o?IDBKeyRange.bound(t,e,!n,!1):IDBKeyRange.bound(e,t,!1,!n);if(e)return o?IDBKeyRange.upperBound(e):IDBKeyRange.lowerBound(e);if(t)return o?IDBKeyRange.lowerBound(t,!n):IDBKeyRange.upperBound(t,!n);if(r)return IDBKeyRange.only(r)}catch(i){return{error:i}}return null}function En(e,t,n,r){return"DataError"===n.name&&0===n.code?r(null,{total_rows:e._meta.docCount,offset:t.skip,rows:[]}):void r(A(Or,n.name,n.message))}function Sn(e,t,n,r){function o(e,r){function o(t,n,r){var o=t.id+"::"+r;S.get(o).onsuccess=function(r){n.doc=pn(r.target.result),e.conflicts&&(n.doc._conflicts=q(t)),yn(n.doc,e,g)}}function i(t,n,r){var i={id:r.id,key:r.id,value:{rev:n}},a=r.deleted;if("ok"===e.deleted)k.push(i),a?(i.value.deleted=!0,i.doc=null):e.include_docs&&o(r,i,n);else if(!a&&d--<=0&&(k.push(i),e.include_docs&&o(r,i,n),0===--h))return;t["continue"]()}function a(e){x=t._meta.docCount;var n=e.target.result;if(n){var r=hn(n.value),o=r.winningRev;i(n,o,r)}}function s(){r(null,{total_rows:x,offset:e.skip,rows:k})}function u(){e.attachments?_n(k,e.binary).then(s):s()}var c="startkey"in e?e.startkey:!1,f="endkey"in e?e.endkey:!1,l="key"in e?e.key:!1,d=e.skip||0,h="number"==typeof e.limit?e.limit:-1,p=e.inclusive_end!==!1,v="descending"in e&&e.descending?"prev":null,y=wn(c,f,p,l,v);if(y&&y.error)return En(t,e,y.error,r);var _=[Ko,Wo];e.attachments&&_.push(Jo);var m=gn(n,_,"readonly");if(m.error)return r(m.error);var g=m.txn,b=g.objectStore(Ko),w=g.objectStore(Wo),E=v?b.openCursor(y,v):b.openCursor(y),S=w.index("_doc_id_rev"),k=[],x=0;g.oncomplete=u,E.onsuccess=a}function i(e,n){return 0===e.limit?n(null,{total_rows:t._meta.docCount,offset:e.skip,rows:[]}):void o(e,n)}i(e,r)}function kn(e){return new lr(function(t){var n=oe([""]);e.objectStore(zo).put(n,"key"),e.onabort=function(e){e.preventDefault(),e.stopPropagation(),t(!1)},e.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);t(n||!e||parseInt(e[1],10)>=43)}})["catch"](function(){return!1})}function qn(e){te()?chrome.storage.onChanged.addListener(function(t){null!=t.db_name&&e.emit(t.dbName.newValue)}):ne()&&("undefined"!=typeof addEventListener?addEventListener("storage",function(t){e.emit(t.key)}):window.attachEvent("storage",function(t){e.emit(t.key)}))}function xn(){ir.EventEmitter.call(this),this._listeners={},qn(this)}function An(e,t){var n=this;Qo.queue.push({action:function(t){Tn(n,e,t)},callback:t}),fn(n.constructor)}function Tn(e,t,r){function o(e){var t=e.createObjectStore(Ko,{keyPath:"id"});e.createObjectStore(Wo,{autoIncrement:!0}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0}),e.createObjectStore(Jo,{keyPath:"digest"}),e.createObjectStore(Go,{keyPath:"id",autoIncrement:!1}),e.createObjectStore(zo),t.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),e.createObjectStore(Xo,{keyPath:"_id"});var n=e.createObjectStore(Vo,{autoIncrement:!0});n.createIndex("seq","seq"),n.createIndex("digestSeq","digestSeq",{unique:!0})}function i(e,t){var n=e.objectStore(Ko);n.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),n.openCursor().onsuccess=function(e){var r=e.target.result;if(r){var o=r.value,i=_(o);o.deletedOrLocal=i?"1":"0",n.put(o),r["continue"]()}else t()}}function a(e){e.createObjectStore(Xo,{keyPath:"_id"}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0})}function s(e,t){var n=e.objectStore(Xo),r=e.objectStore(Ko),o=e.objectStore(Wo),i=r.openCursor();i.onsuccess=function(e){var i=e.target.result;if(i){var a=i.value,s=a.id,u=C(s),c=v(a);if(u){var f=s+"::"+c,l=s+"::",d=s+"::~",h=o.index("_doc_id_rev"),p=IDBKeyRange.bound(l,d,!1,!1),y=h.openCursor(p);y.onsuccess=function(e){if(y=e.target.result){var t=y.value;t._doc_id_rev===f&&n.put(t),o["delete"](y.primaryKey),y["continue"]()}else r["delete"](i.primaryKey),i["continue"]()}}else i["continue"]()}else t&&t()}}function u(e){var t=e.createObjectStore(Vo,{autoIncrement:!0});t.createIndex("seq","seq"),t.createIndex("digestSeq","digestSeq",{unique:!0})}function f(e,t){var n=e.objectStore(Wo),r=e.objectStore(Jo),o=e.objectStore(Vo),i=r.count();i.onsuccess=function(e){var r=e.target.result;return r?void(n.openCursor().onsuccess=function(e){var n=e.target.result;if(!n)return t();for(var r=n.value,i=n.primaryKey,a=Object.keys(r._attachments||{}),s={},u=0;u<a.length;u++){var c=r._attachments[a[u]];s[c.digest]=!0}var f=Object.keys(s);for(u=0;u<f.length;u++){var l=f[u];o.put({seq:i,digestSeq:l+"::"+i})}n["continue"]()}):t()}}function d(e){function t(e){return e.data?hn(e):(e.deleted="1"===e.deletedOrLocal,e)}var n=e.objectStore(Wo),r=e.objectStore(Ko),o=r.openCursor();o.onsuccess=function(e){function o(){var e=s.id+"::",t=s.id+"::￿",r=n.index("_doc_id_rev").openCursor(IDBKeyRange.bound(e,t)),o=0;r.onsuccess=function(e){var t=e.target.result;if(!t)return s.seq=o,i();var n=t.primaryKey;n>o&&(o=n),t["continue"]()}}function i(){var e=dn(s,s.winningRev,s.deleted),t=r.put(e);t.onsuccess=function(){a["continue"]()}}var a=e.target.result;if(a){var s=t(a.value);return s.winningRev=s.winningRev||v(s),s.seq?i():void o()}}}var h=t.name,p=null;e._meta=null,e.type=function(){return"idb"},e._id=l(function(t){t(null,e._meta.instanceId)}),e._bulkDocs=function(n,r,o){bn(t,n,r,e,p,Zo,o)},e._get=function(e,t,n){function r(){n(a,{doc:o,metadata:i,ctx:s})}var o,i,a,s=t.ctx;if(!s){var u=gn(p,[Ko,Wo,Jo],"readonly");if(u.error)return n(u.error);s=u.txn}s.objectStore(Ko).get(e).onsuccess=function(e){if(i=hn(e.target.result),!i)return a=A(vr,"missing"),r();if(_(i)&&!t.rev)return a=A(vr,"deleted"),r();var n=s.objectStore(Wo),u=t.rev||i.winningRev,c=i.id+"::"+u;n.index("_doc_id_rev").get(c).onsuccess=function(e){return o=e.target.result,o&&(o=pn(o)),o?void r():(a=A(vr,"missing"),r())}}},e._getAttachment=function(e,t,n){var r;if(t.ctx)r=t.ctx;else{var o=gn(p,[Ko,Wo,Jo],"readonly");if(o.error)return n(o.error);r=o.txn}var i=e.digest,a=e.content_type;r.objectStore(Jo).get(i).onsuccess=function(e){var r=e.target.result.body;vn(r,a,t.binary,function(e){n(null,e)})}},e._info=function(t){if(null===p||!Yo.has(h)){var n=new Error("db isn't open");return n.id="idbNull",t(n)}var r,o,i=gn(p,[Wo],"readonly");if(i.error)return t(i.error);var a=i.txn,s=a.objectStore(Wo).openCursor(null,"prev");s.onsuccess=function(t){var n=t.target.result;r=n?n.key:0,o=e._meta.docCount},a.oncomplete=function(){t(null,{doc_count:o,update_seq:r,idb_attachment_format:e._meta.blobSupport?"binary":"base64"})}},e._allDocs=function(t,n){Sn(t,e,p,n)},e._changes=function(t){function n(e){function n(){return c.seq!==a?e["continue"]():(u=a,c.winningRev===i._rev?o(i):void r())}function r(){var e=i._id+"::"+c.winningRev,t=_.get(e);t.onsuccess=function(e){o(pn(e.target.result))}}function o(n){var r=t.processChange(n,c,t);r.seq=c.seq;var o=b(r);return"object"==typeof o?t.complete(o):(o&&(g++,l&&m.push(r),t.attachments&&t.include_docs?yn(n,t,d,function(){_n([r],t.binary).then(function(){t.onChange(r)})}):t.onChange(r)),void(g!==f&&e["continue"]()))}var i=pn(e.value),a=e.key;if(s&&!s.has(i._id))return e["continue"]();var c;return(c=w.get(i._id))?n():void(y.get(i._id).onsuccess=function(e){c=hn(e.target.result),w.set(i._id,c),n()})}function r(e){var t=e.target.result;t&&n(t)}function o(){var e=[Ko,Wo];t.attachments&&e.push(Jo);var n=gn(p,e,"readonly");if(n.error)return t.complete(n.error);d=n.txn,d.onabort=ln(t.complete),d.oncomplete=i,v=d.objectStore(Wo),y=d.objectStore(Ko),_=v.index("_doc_id_rev");var o;o=t.descending?v.openCursor(null,"prev"):v.openCursor(IDBKeyRange.lowerBound(t.since,!0)),o.onsuccess=r}function i(){function e(){t.complete(null,{results:m,last_seq:u})}!t.continuous&&t.attachments?_n(m).then(e):e()}if(t=c(t),t.continuous){var a=h+":"+D();
return Zo.addListener(h,a,e,t),Zo.notify(h),{cancel:function(){Zo.removeListener(h,a)}}}var s=t.doc_ids&&new rr.Set(t.doc_ids);t.since=t.since||0;var u=t.since,f="limit"in t?t.limit:-1;0===f&&(f=1);var l;l="return_docs"in t?t.return_docs:"returnDocs"in t?t.returnDocs:!0;var d,v,y,_,m=[],g=0,b=me(t),w=new rr.Map;o()},e._close=function(e){return null===p?e(A(br)):(p.close(),Yo["delete"](h),p=null,void e())},e._getRevisionTree=function(e,t){var n=gn(p,[Ko],"readonly");if(n.error)return t(n.error);var r=n.txn,o=r.objectStore(Ko).get(e);o.onsuccess=function(e){var n=hn(e.target.result);n?t(null,n.rev_tree):t(A(vr))}},e._doCompaction=function(e,t,n){var r=[Ko,Wo,Jo,Vo],o=gn(p,r,"readwrite");if(o.error)return n(o.error);var i=o.txn,a=i.objectStore(Ko);a.get(e).onsuccess=function(n){var r=hn(n.target.result);E(r.rev_tree,function(e,n,r,o,i){var a=n+"-"+r;-1!==t.indexOf(a)&&(i.status="missing")}),mn(t,e,i);var o=r.winningRev,a=r.deleted;i.objectStore(Ko).put(dn(r,o,a))},i.onabort=ln(n),i.oncomplete=function(){n()}},e._getLocal=function(e,t){var n=gn(p,[Xo],"readonly");if(n.error)return t(n.error);var r=n.txn,o=r.objectStore(Xo).get(e);o.onerror=ln(t),o.onsuccess=function(e){var n=e.target.result;n?(delete n._doc_id_rev,t(null,n)):t(A(vr))}},e._putLocal=function(e,t,n){"function"==typeof t&&(n=t,t={}),delete e._revisions;var r=e._rev,o=e._id;r?e._rev="0-"+(parseInt(r.split("-")[1],10)+1):e._rev="0-1";var i,a=t.ctx;if(!a){var s=gn(p,[Xo],"readwrite");if(s.error)return n(s.error);a=s.txn,a.onerror=ln(n),a.oncomplete=function(){i&&n(null,i)}}var u,c=a.objectStore(Xo);r?(u=c.get(o),u.onsuccess=function(o){var a=o.target.result;if(a&&a._rev===r){var s=c.put(e);s.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)}}else n(A(yr))}):(u=c.add(e),u.onerror=function(e){n(A(yr)),e.preventDefault(),e.stopPropagation()},u.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)})},e._removeLocal=function(e,t,n){"function"==typeof t&&(n=t,t={});var r=t.ctx;if(!r){var o=gn(p,[Xo],"readwrite");if(o.error)return n(o.error);r=o.txn,r.oncomplete=function(){i&&n(null,i)}}var i,a=e._id,s=r.objectStore(Xo),u=s.get(a);u.onerror=ln(n),u.onsuccess=function(r){var o=r.target.result;o&&o._rev===e._rev?(s["delete"](a),i={ok:!0,id:a,rev:"0-0"},t.ctx&&n(null,i)):n(A(vr))}},e._destroy=function(e,t){Zo.removeAllListeners(h);var n=ei.get(h);n&&n.result&&(n.result.close(),Yo["delete"](h));var r=indexedDB.deleteDatabase(h);r.onsuccess=function(){ei["delete"](h),ne()&&h in localStorage&&delete localStorage[h],t(null,{ok:!0})},r.onerror=ln(t)};var y=Yo.get(h);if(y)return p=y.idb,e._meta=y.global,void n.nextTick(function(){r(null,e)});var m;m=t.storage?On(h,t.storage):indexedDB.open(h,Ho),ei.set(h,m),m.onupgradeneeded=function(e){function t(){var e=c[l-1];l++,e&&e(r,t)}var n=e.target.result;if(e.oldVersion<1)return o(n);var r=e.currentTarget.transaction;e.oldVersion<3&&a(n),e.oldVersion<4&&u(n);var c=[i,s,f,d],l=e.oldVersion;t()},m.onsuccess=function(t){p=t.target.result,p.onversionchange=function(){p.close(),Yo["delete"](h)},p.onabort=function(e){console.error("Database has a global failure",e.target.error),p.close(),Yo["delete"](h)};var n=p.transaction([Go,zo,Ko],"readwrite"),o=n.objectStore(Go).get(Go),i=null,a=null,s=null;o.onsuccess=function(t){var o=function(){null!==i&&null!==a&&null!==s&&(e._meta={name:h,instanceId:s,blobSupport:i,docCount:a},Yo.set(h,{idb:p,global:e._meta}),r(null,e))},u=t.target.result||{id:Go};h+"_id"in u?(s=u[h+"_id"],o()):(s=D(),u[h+"_id"]=s,n.objectStore(Go).put(u).onsuccess=function(){o()}),$o||($o=kn(n)),$o.then(function(e){i=e,o()});var c=n.objectStore(Ko).index("deletedOrLocal");c.count(IDBKeyRange.only("0")).onsuccess=function(e){a=e.target.result,o()}}},m.onerror=function(){var e="Failed to open indexedDB, are you in private browsing mode?";console.error(e),r(A(Or,e))}}function On(e,t){try{return indexedDB.open(e,{version:Ho,storage:t})}catch(n){return indexedDB.open(e,Ho)}}function jn(e){return decodeURIComponent(window.escape(e))}function In(e){return 65>e?e-48:e-55}function Cn(e,t,n){for(var r="";n>t;)r+=String.fromCharCode(In(e.charCodeAt(t++))<<4|In(e.charCodeAt(t++)));return r}function Ln(e,t,n){for(var r="";n>t;)r+=String.fromCharCode(In(e.charCodeAt(t+2))<<12|In(e.charCodeAt(t+3))<<8|In(e.charCodeAt(t))<<4|In(e.charCodeAt(t+1))),t+=4;return r}function Rn(e,t){return"UTF-8"===t?jn(Cn(e,0,e.length)):Ln(e,0,e.length)}function Dn(e){return"'"+e+"'"}function Nn(){return"undefined"!=typeof sqlitePlugin?sqlitePlugin.openDatabase.bind(sqlitePlugin):"undefined"!=typeof openDatabase?function(e){return openDatabase(e.name,e.version,e.description,e.size)}:void 0}function Bn(){return"undefined"!=typeof openDatabase||"undefined"!=typeof SQLitePlugin}function Mn(e){return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"")}function Fn(e){return e.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,"")}function Un(e){return delete e._id,delete e._rev,JSON.stringify(e)}function Pn(e,t,n){return e=JSON.parse(e),e._id=t,e._rev=n,e}function Hn(e){for(var t="(";e--;)t+="?",e&&(t+=",");return t+")"}function Kn(e,t,n,r,o){return"SELECT "+e+" FROM "+("string"==typeof t?t:t.join(" JOIN "))+(n?" ON "+n:"")+(r?" WHERE "+("string"==typeof r?r:r.join(" AND ")):"")+(o?" ORDER BY "+o:"")}function Wn(e,t,n){function r(){++i===e.length&&o()}function o(){if(a.length){var e="SELECT DISTINCT digest AS digest FROM "+si+" WHERE seq IN "+Hn(a.length);n.executeSql(e,a,function(e,t){for(var n=[],r=0;r<t.rows.length;r++)n.push(t.rows.item(r).digest);if(n.length){var o="DELETE FROM "+si+" WHERE seq IN ("+a.map(function(){return"?"}).join(",")+")";e.executeSql(o,a,function(e){var t="SELECT digest FROM "+si+" WHERE digest IN ("+n.map(function(){return"?"}).join(",")+")";e.executeSql(t,n,function(e,t){for(var r=new rr.Set,o=0;o<t.rows.length;o++)r.add(t.rows.item(o).digest);n.forEach(function(t){r.has(t)||(e.executeSql("DELETE FROM "+si+" WHERE digest=?",[t]),e.executeSql("DELETE FROM "+oi+" WHERE digest=?",[t]))})})})}})}}if(e.length){var i=0,a=[];e.forEach(function(e){var o="SELECT seq FROM "+ri+" WHERE doc_id=? AND rev=?";n.executeSql(o,[t,e],function(e,t){if(!t.rows.length)return r();var n=t.rows.item(0).seq;a.push(n),e.executeSql("DELETE FROM "+ri+" WHERE seq=?",[n],r)})})}}function Jn(e){return function(t){console.error("WebSQL threw an error",t);var n=t&&t.constructor.toString().match(/function ([^\(]+)/),r=n&&n[1]||t.type,o=t.target||t.message;e(A(jr,o,r))}}function Vn(e){if("size"in e)return 1e6*e.size;var t="undefined"!=typeof navigator&&/Android/.test(navigator.userAgent);return t?5e6:1}function Gn(e,t){try{return{db:e(t)}}catch(n){return{error:n}}}function Xn(e){var t=ui.get(e.name);if(!t){var n=Nn();t=Gn(n,e),ui.set(e.name,t),t.db&&(t.db._sqlitePlugin="undefined"!=typeof sqlitePlugin)}return t}function zn(e,t,n,r,o,i,a){function s(){return g?a(g):(i.notify(r._name),r._docCount=-1,void a(null,b))}function u(e,t){var n="SELECT count(*) as cnt FROM "+oi+" WHERE digest=?";m.executeSql(n,[e],function(n,r){if(0===r.rows.item(0).cnt){var o=A(Dr,"unknown stub attachment with digest "+e);t(o)}else t()})}function c(e){function t(){++o===n.length&&e(r)}var n=[];if(y.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t];r.stub&&n.push(r.digest)})}),!n.length)return e();var r,o=0;n.forEach(function(e){u(e,function(e){e&&!r&&(r=e),t()})})}function f(e,t,n,o,i,a,s,u){function c(){function t(e,t){function r(){return++i===a.length&&t(),!1}function o(t){var o="INSERT INTO "+si+" (digest, seq) VALUES (?,?)",i=[n._attachments[t].digest,e];m.executeSql(o,i,r,r)}var i=0,a=Object.keys(n._attachments||{});if(!a.length)return t();for(var s=0;s<a.length;s++)o(a[s])}var n=e.data,r=o?1:0,i=n._id,a=n._rev,s=Un(n),u="INSERT INTO "+ri+" (doc_id, rev, json, deleted) VALUES (?, ?, ?, ?);",c=[i,a,s,r];m.executeSql(u,c,function(e,n){var r=n.insertId;t(r,function(){d(e,r)})},function(){var e=Kn("seq",ri,null,"doc_id=? AND rev=?");return m.executeSql(e,[i,a],function(e,n){var o=n.rows.item(0).seq,u="UPDATE "+ri+" SET json=?, deleted=? WHERE doc_id=? AND rev=?;",c=[s,r,i,a];e.executeSql(u,c,function(e){t(o,function(){d(e,o)})})}),!1})}function f(e){p||(e?(p=e,u(p)):v===y.length&&c())}function l(e){v++,f(e)}function d(n,o){var a=e.metadata.id;i&&r.auto_compaction?Wn(on(e.metadata),a,n):e.stemmedRevs.length&&Wn(e.stemmedRevs,a,n),e.metadata.seq=o,delete e.metadata.rev;var c=i?"UPDATE "+ni+" SET json=?, max_seq=?, winningseq=(SELECT seq FROM "+ri+" WHERE doc_id="+ni+".id AND rev=?) WHERE id=?":"INSERT INTO "+ni+" (id, winningseq, max_seq, json) VALUES (?,?,?,?);",f=un(e.metadata),l=i?[f,o,t,a]:[a,o,o,f];n.executeSql(c,l,function(){b[s]={ok:!0,id:e.metadata.id,rev:t},w.set(a,e.metadata),u()})}var p=null,v=0;e.data._id=e.metadata.id,e.data._rev=e.metadata.rev;var y=Object.keys(e.data._attachments||{});o&&(e.data._deleted=!0),y.forEach(function(n){var r=e.data._attachments[n];if(r.stub)v++,f();else{var o=r.data;delete r.data,r.revpos=parseInt(t,10);var i=r.digest;h(i,o,l)}}),y.length||c()}function l(){rn(e.revs_limit,y,r,w,m,b,f,n)}function d(e){function t(){++n===y.length&&e()}if(!y.length)return e();var n=0;y.forEach(function(e){if(e._id&&C(e._id))return t();var n=e.metadata.id;m.executeSql("SELECT json FROM "+ni+" WHERE id = ?",[n],function(e,r){if(r.rows.length){var o=sn(r.rows.item(0).json);w.set(n,o)}t()})})}function h(e,t,n){var r="SELECT digest FROM "+oi+" WHERE digest=?";m.executeSql(r,[e],function(o,i){return i.rows.length?n():(r="INSERT INTO "+oi+" (digest, body, escaped) VALUES (?,?,1)",void o.executeSql(r,[e,Mn(t)],function(){n()},function(){return n(),!1}))})}var p=n.new_edits,v=t.docs,y=v.map(function(e){if(e._id&&C(e._id))return e;var t=U(e,p);return t}),_=y.filter(function(e){return e.error});if(_.length)return a(_[0]);var m,g,b=new Array(y.length),w=new rr.Map;Wt(y,"binary",function(e){return e?a(e):void o.transaction(function(e){m=e,c(function(e){e?g=e:d(l)})},Jn(a),s)})}function Qn(e,t,n,r,o){function a(){++c===u.length&&o&&o()}function s(e,o){var s=e._attachments[o],u={binary:t.binary,ctx:r};n._getAttachment(s,u,function(t,n){e._attachments[o]=Yn.extend(i(s,["digest","content_type"]),{data:n}),a()})}var u=Object.keys(e._attachments||{});if(!u.length)return o&&o();var c=0;u.forEach(function(n){t.attachments&&t.include_docs?s(e,n):(e._attachments[n].stub=!0,a())})}function $n(e,t){function n(){ne()&&(window.localStorage["_pouch__websqldb_"+g._name]=!0),t(null,g)}function r(e,t){e.executeSql(hi),e.executeSql("ALTER TABLE "+ri+" ADD COLUMN deleted TINYINT(1) DEFAULT 0",[],function(){e.executeSql(li),e.executeSql("ALTER TABLE "+ni+" ADD COLUMN local TINYINT(1) DEFAULT 0",[],function(){e.executeSql("CREATE INDEX IF NOT EXISTS 'doc-store-local-idx' ON "+ni+" (local, id)");var n="SELECT "+ni+".winningseq AS seq, "+ni+".json AS metadata FROM "+ri+" JOIN "+ni+" ON "+ri+".seq = "+ni+".winningseq";e.executeSql(n,[],function(e,n){for(var r=[],o=[],i=0;i<n.rows.length;i++){var a=n.rows.item(i),s=a.seq,u=JSON.parse(a.metadata);_(u)&&r.push(s),C(u.id)&&o.push(u.id)}e.executeSql("UPDATE "+ni+"SET local = 1 WHERE id IN "+Hn(o.length),o,function(){e.executeSql("UPDATE "+ri+" SET deleted = 1 WHERE seq IN "+Hn(r.length),r,t)})})})})}function o(e,t){var n="CREATE TABLE IF NOT EXISTS "+ii+" (id UNIQUE, rev, json)";e.executeSql(n,[],function(){var n="SELECT "+ni+".id AS id, "+ri+".json AS data FROM "+ri+" JOIN "+ni+" ON "+ri+".seq = "+ni+".winningseq WHERE local = 1";e.executeSql(n,[],function(e,n){function r(){if(!o.length)return t(e);var n=o.shift(),i=JSON.parse(n.data)._rev;e.executeSql("INSERT INTO "+ii+" (id, rev, json) VALUES (?,?,?)",[n.id,i,n.data],function(e){e.executeSql("DELETE FROM "+ni+" WHERE id=?",[n.id],function(e){e.executeSql("DELETE FROM "+ri+" WHERE seq=?",[n.seq],function(){r()})})})}for(var o=[],i=0;i<n.rows.length;i++)o.push(n.rows.item(i));r()})})}function i(e,t){function n(n){function r(){if(!n.length)return t(e);var o=n.shift(),i=Rn(o.hex,m),a=i.lastIndexOf("::"),s=i.substring(0,a),u=i.substring(a+2),c="UPDATE "+ri+" SET doc_id=?, rev=? WHERE doc_id_rev=?";e.executeSql(c,[s,u,i],function(){r()})}r()}var r="ALTER TABLE "+ri+" ADD COLUMN doc_id";e.executeSql(r,[],function(e){var t="ALTER TABLE "+ri+" ADD COLUMN rev";e.executeSql(t,[],function(e){e.executeSql(di,[],function(e){var t="SELECT hex(doc_id_rev) as hex FROM "+ri;e.executeSql(t,[],function(e,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o));n(r)})})})})}function a(e,t){function n(e){var n="SELECT COUNT(*) AS cnt FROM "+oi;e.executeSql(n,[],function(e,n){function r(){var n=Kn(_i+", "+ni+".id AS id",[ni,ri],yi,null,ni+".id ");n+=" LIMIT "+a+" OFFSET "+i,i+=a,e.executeSql(n,[],function(e,n){function o(e,t){var n=i[e]=i[e]||[];-1===n.indexOf(t)&&n.push(t)}if(!n.rows.length)return t(e);for(var i={},a=0;a<n.rows.length;a++)for(var s=n.rows.item(a),u=Pn(s.data,s.id,s.rev),c=Object.keys(u._attachments||{}),f=0;f<c.length;f++){var l=u._attachments[c[f]];o(l.digest,s.seq)}var d=[];if(Object.keys(i).forEach(function(e){var t=i[e];t.forEach(function(t){d.push([e,t])})}),!d.length)return r();var h=0;d.forEach(function(t){var n="INSERT INTO "+si+" (digest, seq) VALUES (?,?)";e.executeSql(n,t,function(){++h===d.length&&r()})})})}var o=n.rows.item(0).cnt;if(!o)return t(e);var i=0,a=10;r()})}var r="CREATE TABLE IF NOT EXISTS "+si+" (digest, seq INTEGER)";e.executeSql(r,[],function(e){e.executeSql(vi,[],function(e){e.executeSql(pi,[],n)})})}function s(e,t){var n="ALTER TABLE "+oi+" ADD COLUMN escaped TINYINT(1) DEFAULT 0";e.executeSql(n,[],t)}function u(e,t){var n="ALTER TABLE "+ni+" ADD COLUMN max_seq INTEGER";e.executeSql(n,[],function(e){var n="UPDATE "+ni+" SET max_seq=(SELECT MAX(seq) FROM "+ri+" WHERE doc_id=id)";e.executeSql(n,[],function(e){var n="CREATE UNIQUE INDEX IF NOT EXISTS 'doc-max-seq-idx' ON "+ni+" (max_seq)";e.executeSql(n,[],t)})})}function f(e,t){e.executeSql('SELECT HEX("a") AS hex',[],function(e,n){var r=n.rows.item(0).hex;m=2===r.length?"UTF-8":"UTF-16",t()})}function d(){for(;S.length>0;){var e=S.pop();e(null,b)}}function h(e,t){if(0===t){var n="CREATE TABLE IF NOT EXISTS "+ai+" (dbid, db_version INTEGER)",c="CREATE TABLE IF NOT EXISTS "+oi+" (digest UNIQUE, escaped TINYINT(1), body BLOB)",f="CREATE TABLE IF NOT EXISTS "+si+" (digest, seq INTEGER)",l="CREATE TABLE IF NOT EXISTS "+ni+" (id unique, json, winningseq, max_seq INTEGER UNIQUE)",h="CREATE TABLE IF NOT EXISTS "+ri+" (seq INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, json, deleted TINYINT(1), doc_id, rev)",p="CREATE TABLE IF NOT EXISTS "+ii+" (id UNIQUE, rev, json)";e.executeSql(c),e.executeSql(p),e.executeSql(f,[],function(){e.executeSql(pi),e.executeSql(vi)}),e.executeSql(l,[],function(){e.executeSql(hi),e.executeSql(h,[],function(){e.executeSql(li),e.executeSql(di),e.executeSql(n,[],function(){var t="INSERT INTO "+ai+" (db_version, dbid) VALUES (?,?)";b=D();var n=[ti,b];e.executeSql(t,n,function(){d()})})})})}else{var v=function(){var n=ti>t;n&&e.executeSql("UPDATE "+ai+" SET db_version = "+ti);var r="SELECT dbid FROM "+ai;e.executeSql(r,[],function(e,t){b=t.rows.item(0).dbid,d()})},y=[r,o,i,a,s,u,v],_=t,m=function(e){y[_-1](e,m),_++};m(e)}}function p(){T.transaction(function(e){f(e,function(){v(e)})},Jn(t),n)}function v(e){var t="SELECT sql FROM sqlite_master WHERE tbl_name = "+ai;e.executeSql(t,[],function(e,t){t.rows.length?/db_version/.test(t.rows.item(0).sql)?e.executeSql("SELECT db_version FROM "+ai,[],function(e,t){var n=t.rows.item(0).db_version;h(e,n)}):e.executeSql("ALTER TABLE "+ai+" ADD COLUMN db_version INTEGER",[],function(){h(e,1)}):h(e,0)})}function y(e,t){if(-1!==g._docCount)return t(g._docCount);var n=Kn("COUNT("+ni+".id) AS 'num'",[ni,ri],yi,ri+".deleted=0");e.executeSql(n,[],function(e,n){g._docCount=n.rows.item(0).num,t(g._docCount)})}var m,g=this,b=null,w=Vn(e),S=[];g._docCount=-1,g._name=e.name;var k=Yn.extend({},e,{size:w,version:fi}),x=Xn(k);if(x.error)return Jn(t)(x.error);var T=x.db;"function"!=typeof T.readTransaction&&(T.readTransaction=T.transaction),p(),g.type=function(){return"websql"},g._id=l(function(e){e(null,b)}),g._info=function(e){T.readTransaction(function(t){y(t,function(n){var r="SELECT MAX(seq) AS seq FROM "+ri;t.executeSql(r,[],function(t,r){var o=r.rows.item(0).seq||0;e(null,{doc_count:n,update_seq:o,sqlite_plugin:T._sqlitePlugin,websql_encoding:m})})})},Jn(e))},g._bulkDocs=function(t,n,r){zn(e,t,n,g,T,ci,r)},g._get=function(e,t,n){function r(){n(a,{doc:o,metadata:i,ctx:s})}var o,i,a,s=t.ctx;if(!s)return T.readTransaction(function(r){g._get(e,Yn.extend({ctx:r},t),n)});var u,c;t.rev?(u=Kn(_i,[ni,ri],ni+".id="+ri+".doc_id",[ri+".doc_id=?",ri+".rev=?"]),c=[e,t.rev]):(u=Kn(_i,[ni,ri],yi,ni+".id=?"),c=[e]),s.executeSql(u,c,function(e,n){if(!n.rows.length)return a=A(vr,"missing"),r();var s=n.rows.item(0);return i=sn(s.metadata),s.deleted&&!t.rev?(a=A(vr,"deleted"),r()):(o=Pn(s.data,i.id,s.rev),void r())})},g._allDocs=function(e,t){var n,r=[],o="startkey"in e?e.startkey:!1,i="endkey"in e?e.endkey:!1,a="key"in e?e.key:!1,s="descending"in e?e.descending:!1,u="limit"in e?e.limit:-1,c="skip"in e?e.skip:0,f=e.inclusive_end!==!1,l=[],d=[];if(a!==!1)d.push(ni+".id = ?"),l.push(a);else if(o!==!1||i!==!1){if(o!==!1&&(d.push(ni+".id "+(s?"<=":">=")+" ?"),l.push(o)),i!==!1){var h=s?">":"<";f&&(h+="="),d.push(ni+".id "+h+" ?"),l.push(i)}a!==!1&&(d.push(ni+".id = ?"),l.push(a))}"ok"!==e.deleted&&d.push(ri+".deleted = 0"),T.readTransaction(function(t){y(t,function(o){if(n=o,0!==u){var i=Kn(_i,[ni,ri],yi,d,ni+".id "+(s?"DESC":"ASC"));i+=" LIMIT "+u+" OFFSET "+c,t.executeSql(i,l,function(t,n){for(var o=0,i=n.rows.length;i>o;o++){var a=n.rows.item(o),s=sn(a.metadata),u=s.id,c=Pn(a.data,u,a.rev),f=c._rev,l={id:u,key:u,value:{rev:f}};if(e.include_docs&&(l.doc=c,l.doc._rev=f,e.conflicts&&(l.doc._conflicts=q(s)),Qn(l.doc,e,g,t)),a.deleted){if("ok"!==e.deleted)continue;l.value.deleted=!0,l.doc=null}r.push(l)}})}})},Jn(t),function(){t(null,{total_rows:n,offset:e.skip,rows:r})})},g._changes=function(e){function t(){var t=ni+".json AS metadata, "+ni+".max_seq AS maxSeq, "+ri+".json AS winningDoc, "+ri+".rev AS winningRev ",n=ni+" JOIN "+ri,u=ni+".id="+ri+".doc_id AND "+ni+".winningseq="+ri+".seq",c=["maxSeq > ?"],f=[e.since];e.doc_ids&&(c.push(ni+".id IN "+Hn(e.doc_ids.length)),f=f.concat(e.doc_ids));var l="maxSeq "+(r?"DESC":"ASC"),d=Kn(t,n,u,c,l),h=me(e);e.view||e.filter||(d+=" LIMIT "+o);var p=e.since||0;T.readTransaction(function(t){t.executeSql(d,f,function(t,n){function r(t){return function(){e.onChange(t)}}for(var u=0,c=n.rows.length;c>u;u++){var f=n.rows.item(u),l=sn(f.metadata);p=f.maxSeq;var d=Pn(f.winningDoc,l.id,f.winningRev),v=e.processChange(d,l,e);v.seq=f.maxSeq;var y=h(v);if("object"==typeof y)return e.complete(y);if(y&&(s++,i&&a.push(v),e.attachments&&e.include_docs?Qn(d,e,g,t,r(v)):r(v)()),s===o)break}})},Jn(e.complete),function(){e.continuous||e.complete(null,{results:a,last_seq:p})})}if(e=c(e),e.continuous){var n=g._name+":"+D();return ci.addListener(g._name,n,g,e),ci.notify(g._name),{cancel:function(){ci.removeListener(g._name,n)}}}var r=e.descending;e.since=e.since&&!r?e.since:0;var o="limit"in e?e.limit:-1;0===o&&(o=1);var i;i="return_docs"in e?e.return_docs:"returnDocs"in e?e.returnDocs:!0;var a=[],s=0;t()},g._close=function(e){e()},g._getAttachment=function(e,t,n){var r,o=t.ctx,i=e.digest,a=e.content_type,s="SELECT escaped, CASE WHEN escaped = 1 THEN body ELSE HEX(body) END AS body FROM "+oi+" WHERE digest=?";o.executeSql(s,[i],function(e,o){var i=o.rows.item(0),s=i.escaped?Fn(i.body):Rn(i.body,m);r=t.binary?ye(s,a):Yr(s),n(null,r)})},g._getRevisionTree=function(e,t){T.readTransaction(function(n){var r="SELECT json AS metadata FROM "+ni+" WHERE id = ?";n.executeSql(r,[e],function(e,n){if(n.rows.length){var r=sn(n.rows.item(0).metadata);t(null,r.rev_tree)}else t(A(vr))})})},g._doCompaction=function(e,t,n){return t.length?void T.transaction(function(n){var r="SELECT json AS metadata FROM "+ni+" WHERE id = ?";n.executeSql(r,[e],function(n,r){var o=sn(r.rows.item(0).metadata);E(o.rev_tree,function(e,n,r,o,i){var a=n+"-"+r;-1!==t.indexOf(a)&&(i.status="missing")});var i="UPDATE "+ni+" SET json = ? WHERE id = ?";n.executeSql(i,[un(o),e])}),Wn(t,e,n)},Jn(n),function(){n()}):n()},g._getLocal=function(e,t){T.readTransaction(function(n){var r="SELECT json, rev FROM "+ii+" WHERE id=?";n.executeSql(r,[e],function(n,r){if(r.rows.length){var o=r.rows.item(0),i=Pn(o.json,e,o.rev);t(null,i)}else t(A(vr))})})},g._putLocal=function(e,t,n){function r(e){var r,c;i?(r="UPDATE "+ii+" SET rev=?, json=? WHERE id=? AND rev=?",c=[o,u,a,i]):(r="INSERT INTO "+ii+" (id, rev, json) VALUES (?,?,?)",c=[a,o,u]),e.executeSql(r,c,function(e,r){r.rowsAffected?(s={ok:!0,id:a,rev:o},t.ctx&&n(null,s)):n(A(yr))},function(){return n(A(yr)),!1})}"function"==typeof t&&(n=t,t={}),delete e._revisions;var o,i=e._rev,a=e._id;o=i?e._rev="0-"+(parseInt(i.split("-")[1],10)+1):e._rev="0-1";var s,u=Un(e);t.ctx?r(t.ctx):T.transaction(r,Jn(n),function(){s&&n(null,s)})},g._removeLocal=function(e,t,n){function r(r){var i="DELETE FROM "+ii+" WHERE id=? AND rev=?",a=[e._id,e._rev];r.executeSql(i,a,function(r,i){return i.rowsAffected?(o={ok:!0,id:e._id,rev:"0-0"},void(t.ctx&&n(null,o))):n(A(vr))})}"function"==typeof t&&(n=t,t={});var o;t.ctx?r(t.ctx):T.transaction(r,Jn(n),function(){o&&n(null,o)})},g._destroy=function(e,t){ci.removeAllListeners(g._name),T.transaction(function(e){var t=[ni,ri,oi,ai,ii,si];t.forEach(function(t){e.executeSql("DROP TABLE IF EXISTS "+t,[])})},Jn(t),function(){ne()&&(delete window.localStorage["_pouch__websqldb_"+g._name],delete window.localStorage[g._name]),t(null,{ok:!0})})}}var Yn=e(8),Zn=o(Yn),er=o(e(4)),tr=o(e(7)),nr=o(e(9)),rr=e(13),or=o(e(1)),ir=e(2),ar=o(e(14)),sr=e(11),ur=o(sr),cr=o(e(15)),fr=o(e(16)),lr="function"==typeof Promise?Promise:nr,dr=er("pouchdb:api");tr(x,Error),x.prototype.toString=function(){return JSON.stringify({status:this.status,name:this.name,message:this.message,reason:this.reason})};var hr=new x({status:401,error:"unauthorized",reason:"Name or password is incorrect."}),pr=new x({status:400,error:"bad_request",reason:"Missing JSON list of 'docs'"}),vr=new x({status:404,error:"not_found",reason:"missing"}),yr=new x({status:409,error:"conflict",reason:"Document update conflict"}),_r=new x({status:400,error:"invalid_id",reason:"_id field must contain a string"}),mr=new x({status:412,error:"missing_id",reason:"_id is required for puts"}),gr=new x({status:400,error:"bad_request",reason:"Only reserved document ids may start with underscore."}),br=new x({status:412,error:"precondition_failed",reason:"Database not open"}),wr=new x({status:500,error:"unknown_error",reason:"Database encountered an unknown error"}),Er=new x({status:500,error:"badarg",reason:"Some query argument is invalid"}),Sr=new x({status:400,error:"invalid_request",reason:"Request was invalid"}),kr=new x({status:400,error:"query_parse_error",reason:"Some query parameter is invalid"}),qr=new x({status:500,error:"doc_validation",reason:"Bad special document member"}),xr=new x({status:400,error:"bad_request",reason:"Something wrong with the request"}),Ar=new x({status:400,error:"bad_request",reason:"Document must be a JSON object"}),Tr=new x({status:404,error:"not_found",reason:"Database not found"}),Or=new x({status:500,error:"indexed_db_went_bad",reason:"unknown"}),jr=new x({status:500,error:"web_sql_went_bad",reason:"unknown"}),Ir=new x({status:500,error:"levelDB_went_went_bad",reason:"unknown"}),Cr=new x({status:403,error:"forbidden",reason:"Forbidden by design doc validate_doc_update function"}),Lr=new x({status:400,error:"bad_request",reason:"Invalid rev format"}),Rr=new x({status:412,error:"file_exists",reason:"The database could not be created, the file already exists."}),Dr=new x({status:412,error:"missing_stub"}),Nr=new x({status:413,error:"invalid_url",reason:"Provided URL is invalid"}),Br={UNAUTHORIZED:hr,MISSING_BULK_DOCS:pr,MISSING_DOC:vr,REV_CONFLICT:yr,INVALID_ID:_r,MISSING_ID:mr,RESERVED_ID:gr,NOT_OPEN:br,UNKNOWN_ERROR:wr,BAD_ARG:Er,INVALID_REQUEST:Sr,QUERY_PARSE_ERROR:kr,DOC_VALIDATION:qr,BAD_REQUEST:xr,NOT_AN_OBJECT:Ar,DB_MISSING:Tr,WSQ_ERROR:jr,LDB_ERROR:Ir,FORBIDDEN:Cr,INVALID_REV:Lr,FILE_EXISTS:Rr,MISSING_STUB:Dr,IDB_ERROR:Or,INVALID_URL:Nr},Mr=function(e,t,n){var r=Object.keys(Br).filter(function(n){var r=Br[n];return"function"!=typeof r&&r[e]===t}),o=n&&r.filter(function(e){var t=Br[e];return t.message===n})[0]||r[0];return o?Br[o]:null};tr(O,ir.EventEmitter),O.prototype.cancel=function(){this.isCancelled=!0,this.db.taskqueue.isReady&&this.emit("cancel")},O.prototype.doChanges=function(e){var t=this,n=e.complete;if(e=c(e),"live"in e&&!("continuous"in e)&&(e.continuous=e.live),e.processChange=j,"latest"===e.since&&(e.since="now"),e.since||(e.since=0),"now"===e.since)return void this.db.info().then(function(r){return t.isCancelled?void n(null,{status:"cancelled"}):(e.since=r.update_seq,void t.doChanges(e))},n);if(e.continuous&&"now"!==e.since&&this.db.info().then(function(e){t.startSeq=e.update_seq},function(e){if("idbNull"!==e.id)throw e}),e.filter&&"string"==typeof e.filter&&("_view"===e.filter?e.view=w(e.view):e.filter=w(e.filter),"http"!==this.db.type()&&!e.doc_ids))return this.filterChanges(e);"descending"in e||(e.descending=!1),e.limit=0===e.limit?1:e.limit,e.complete=n;var r=this.db._changes(e);if(r&&"function"==typeof r.cancel){var o=t.cancel;t.cancel=or(function(e){r.cancel(),o.apply(this,e)})}},O.prototype.filterChanges=function(e){var t=this,n=e.complete;if("_view"===e.filter){if(!e.view||"string"!=typeof e.view){var r=A(xr,"`view` filter parameter not found or invalid.");return n(r)}var o=b(e.view);this.db.get("_design/"+o[0],function(r,i){if(t.isCancelled)return n(null,{status:"cancelled"});if(r)return n(T(r));var a=i&&i.views&&i.views[o[1]]&&i.views[o[1]].map;return a?(e.filter=g(a),void t.doChanges(e)):n(A(vr,i.views?"missing json key: "+o[1]:"missing json key: views"))})}else{var i=b(e.filter);if(!i)return t.doChanges(e);this.db.get("_design/"+i[0],function(r,o){if(t.isCancelled)return n(null,{status:"cancelled"});if(r)return n(T(r));var a=o&&o.filters&&o.filters[i[1]];return a?(e.filter=m(a),void t.doChanges(e)):n(A(vr,o&&o.filters?"missing json key: "+i[1]:"missing json key: filters"))})}};var Fr="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),Ur=N(["_id","_rev","_attachments","_deleted","_revisions","_revs_info","_conflicts","_deleted_conflicts","_local_seq","_rev_tree","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats","_removed"]),Pr=N(["_attachments","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats"]);tr(Q,ir.EventEmitter),Q.prototype.post=d("post",function(e,t,n){return"function"==typeof t&&(n=t,t={}),"object"!=typeof e||Array.isArray(e)?n(A(Ar)):void this.bulkDocs({docs:[e]},t,K(n))}),Q.prototype.put=d("put",or(function(e){var t,n,r,o,i=e.shift(),a="_id"in i;if("object"!=typeof i||Array.isArray(i))return(o=e.pop())(A(Ar));for(;;)if(t=e.shift(),n=typeof t,"string"!==n||a?"string"!==n||!a||"_rev"in i?"object"===n?r=t:"function"===n&&(o=t):i._rev=t:(i._id=t,a=!0),!e.length)break;return r=r||{},B(i._id),C(i._id)&&"function"==typeof this._putLocal?i._deleted?this._removeLocal(i,o):this._putLocal(i,o):void this.bulkDocs({docs:[i]},r,K(o))})),Q.prototype.putAttachment=d("putAttachment",function(e,t,n,r,o){function i(e){var n="_rev"in e?parseInt(e._rev,10):0;return e._attachments=e._attachments||{},e._attachments[t]={content_type:o,data:r,revpos:++n},a.put(e)}var a=this;return"function"==typeof o&&(o=r,r=n,n=null),"undefined"==typeof o&&(o=r,r=n,n=null),a.get(e).then(function(e){if(e._rev!==n)throw A(yr);return i(e)},function(t){if(t.reason===vr.message)return i({_id:e});throw t})}),Q.prototype.removeAttachment=d("removeAttachment",function(e,t,n,r){var o=this;o.get(e,function(e,i){return e?void r(e):i._rev!==n?void r(A(yr)):i._attachments?(delete i._attachments[t],0===Object.keys(i._attachments).length&&delete i._attachments,void o.put(i,r)):r()})}),Q.prototype.remove=d("remove",function(e,t,n,r){var o;"string"==typeof t?(o={_id:e,_rev:t},"function"==typeof n&&(r=n,n={})):(o=e,"function"==typeof t?(r=t,n={}):(r=n,n=t)),n=n||{},n.was_delete=!0;var i={_id:o._id,_rev:o._rev||n.rev};return i._deleted=!0,C(i._id)&&"function"==typeof this._removeLocal?this._removeLocal(o,r):void this.bulkDocs({docs:[i]},n,K(r))}),Q.prototype.revsDiff=d("revsDiff",function(e,t,n){function r(e,t){s.has(e)||s.set(e,{missing:[]}),s.get(e).missing.push(t)}function o(t,n){var o=e[t].slice(0);E(n,function(e,n,i,a,s){var u=n+"-"+i,c=o.indexOf(u);-1!==c&&(o.splice(c,1),"available"!==s.status&&r(t,u))}),o.forEach(function(e){r(t,e)})}"function"==typeof t&&(n=t,t={});var i=Object.keys(e);if(!i.length)return n(null,{});var a=0,s=new rr.Map;i.map(function(t){this._getRevisionTree(t,function(r,u){if(r&&404===r.status&&"missing"===r.message)s.set(t,{missing:e[t]});else{if(r)return n(r);o(t,u)}if(++a===i.length){var c={};return s.forEach(function(e,t){c[t]=e}),n(null,c)}})},this)}),Q.prototype.bulkGet=d("bulkGet",function(e,t){I(this,e,t)}),Q.prototype.compactDocument=d("compactDocument",function(e,t,n){var r=this;this._getRevisionTree(e,function(o,i){if(o)return n(o);var a=V(i),s=[],u=[];Object.keys(a).forEach(function(e){a[e]>t&&s.push(e)}),E(i,function(e,t,n,r,o){var i=t+"-"+n;"available"===o.status&&-1!==s.indexOf(i)&&u.push(i)}),r._doCompaction(e,u,n)})}),Q.prototype.compact=d("compact",function(e,t){"function"==typeof e&&(t=e,e={});var n=this;e=e||{},n._compactionQueue=n._compactionQueue||[],n._compactionQueue.push({opts:e,callback:t}),1===n._compactionQueue.length&&X(n)}),Q.prototype._compact=function(e,t){function n(e){a.push(o.compactDocument(e.id,0))}function r(e){var n=e.last_seq;lr.all(a).then(function(){return h(o,"_local/compaction",function(e){return!e.last_seq||e.last_seq<n?(e.last_seq=n,e):!1})}).then(function(){t(null,{ok:!0})})["catch"](t)}var o=this,i={return_docs:!1,last_seq:e.last_seq||0},a=[];o.changes(i).on("change",n).on("complete",r).on("error",t)},Q.prototype.get=d("get",function(e,t,n){function r(){var r=[],a=o.length;return a?void o.forEach(function(o){i.get(e,{rev:o,revs:t.revs,attachments:t.attachments},function(e,t){e?r.push({missing:o}):r.push({ok:t}),a--,a||n(null,r)})}):n(null,r)}if("function"==typeof t&&(n=t,t={}),"string"!=typeof e)return n(A(_r));if(C(e)&&"function"==typeof this._getLocal)return this._getLocal(e,n);var o=[],i=this;if(!t.open_revs)return this._get(e,t,function(e,r){if(e)return n(e);var o=r.doc,a=r.metadata,s=r.ctx;if(t.conflicts){var u=q(a);u.length&&(o._conflicts=u)}if(_(a,o._rev)&&(o._deleted=!0),t.revs||t.revs_info){var c=L(a.rev_tree),f=H(c,function(e){return-1!==e.ids.map(function(e){return e.id}).indexOf(o._rev.split("-")[1])}),l=f.ids.map(function(e){return e.id}).indexOf(o._rev.split("-")[1])+1,d=f.ids.length-l;if(f.ids.splice(l,d),f.ids.reverse(),t.revs&&(o._revisions={start:f.pos+f.ids.length-1,ids:f.ids.map(function(e){return e.id})}),t.revs_info){var h=f.pos+f.ids.length;o._revs_info=f.ids.map(function(e){return h--,{rev:h+"-"+e.id,status:e.opts.status}})}}if(t.attachments&&o._attachments){var p=o._attachments,v=Object.keys(p).length;if(0===v)return n(null,o);Object.keys(p).forEach(function(e){this._getAttachment(p[e],{binary:t.binary,ctx:s},function(t,r){var i=o._attachments[e];i.data=r,delete i.stub,delete i.length,--v||n(null,o)})},i)}else{if(o._attachments)for(var y in o._attachments)o._attachments.hasOwnProperty(y)&&(o._attachments[y].stub=!0);n(null,o)}});if("all"===t.open_revs)this._getRevisionTree(e,function(e,t){return e?n(e):(o=k(t).map(function(e){return e.rev}),void r())});else{if(!Array.isArray(t.open_revs))return n(A(wr,"function_clause"));o=t.open_revs;for(var a=0;a<o.length;a++){var s=o[a];if("string"!=typeof s||!/^\d+-/.test(s))return n(A(Lr));
}r()}}),Q.prototype.getAttachment=d("getAttachment",function(e,t,n,r){var o=this;n instanceof Function&&(r=n,n={}),this._get(e,n,function(e,i){return e?r(e):i.doc._attachments&&i.doc._attachments[t]?(n.ctx=i.ctx,n.binary=!0,o._getAttachment(i.doc._attachments[t],n,r),void 0):r(A(vr))})}),Q.prototype.allDocs=d("allDocs",function(e,t){if("function"==typeof e&&(t=e,e={}),e.skip="undefined"!=typeof e.skip?e.skip:0,e.start_key&&(e.startkey=e.start_key),e.end_key&&(e.endkey=e.end_key),"keys"in e){if(!Array.isArray(e.keys))return t(new TypeError("options.keys must be an array"));var n=["startkey","endkey","key"].filter(function(t){return t in e})[0];if(n)return void t(A(kr,"Query parameter `"+n+"` is not compatible with multi-get"));if("http"!==this.type())return G(this,e,t)}return this._allDocs(e,t)}),Q.prototype.changes=function(e,t){return"function"==typeof e&&(t=e,e={}),new O(this,e,t)},Q.prototype.close=d("close",function(e){return this._closed=!0,this._close(e)}),Q.prototype.info=d("info",function(e){var t=this;this._info(function(n,r){return n?e(n):(r.db_name=r.db_name||t._db_name,r.auto_compaction=!(!t.auto_compaction||"http"===t.type()),r.adapter=t.type(),void e(null,r))})}),Q.prototype.id=d("id",function(e){return this._id(e)}),Q.prototype.type=function(){return"function"==typeof this._type?this._type():this.adapter},Q.prototype.bulkDocs=d("bulkDocs",function(e,t,n){if("function"==typeof t&&(n=t,t={}),t=t||{},Array.isArray(e)&&(e={docs:e}),!e||!e.docs||!Array.isArray(e.docs))return n(A(pr));for(var r=0;r<e.docs.length;++r)if("object"!=typeof e.docs[r]||Array.isArray(e.docs[r]))return n(A(Ar));var o;return e.docs.forEach(function(e){e._attachments&&Object.keys(e._attachments).forEach(function(e){o=o||z(e)})}),o?n(A(xr,o)):("new_edits"in t||("new_edits"in e?t.new_edits=e.new_edits:t.new_edits=!0),t.new_edits||"http"===this.type()||e.docs.sort(J),W(e.docs),this._bulkDocs(e,t,function(e,r){return e?n(e):(t.new_edits||(r=r.filter(function(e){return e.error})),void n(null,r))}))}),Q.prototype.registerDependentDatabase=d("registerDependentDatabase",function(e,t){function n(t){return t.dependentDbs=t.dependentDbs||{},t.dependentDbs[e]?!1:(t.dependentDbs[e]=!0,t)}var r=new this.constructor(e,this.__opts);h(this,"_local/_pouch_dependentDbs",n).then(function(){t(null,{db:r})})["catch"](t)}),Q.prototype.destroy=d("destroy",function(e,t){function n(){r._destroy(e,function(e,n){return e?t(e):(r._destroyed=!0,r.emit("destroyed"),void t(null,n||{ok:!0}))})}"function"==typeof e&&(t=e,e={});var r=this,o="use_prefix"in r?r.use_prefix:!0;return"http"===r.type()?n():void r.get("_local/_pouch_dependentDbs",function(e,i){if(e)return 404!==e.status?t(e):n();var a=i.dependentDbs,s=r.constructor,u=Object.keys(a).map(function(e){var t=o?e.replace(new RegExp("^"+s.prefix),""):e;return new s(t,r.__opts).destroy()});lr.all(u).then(n,t)})}),$.prototype.execute=function(){var e;if(this.failed)for(;e=this.queue.shift();)e(this.failed);else for(;e=this.queue.shift();)e()},$.prototype.fail=function(e){this.failed=e,this.execute()},$.prototype.ready=function(e){this.isReady=!0,this.db=e,this.execute()},$.prototype.addTask=function(e){this.queue.push(e),this.failed&&this.execute()},tr(ee,Q),ee.debug=er;var Hr;if(te())Hr=!1;else try{localStorage.setItem("_pouch_check_localstorage",1),Hr=!!localStorage.getItem("_pouch_check_localstorage")}catch(Kr){Hr=!1}ee.adapters={},ee.preferredAdapters=[],ee.prefix="_pouch_";var Wr=new ir.EventEmitter;re(ee),ee.parseAdapter=function(e,t){var n,r,o=e.match(/([a-z\-]*):\/\/(.*)/);if(o){if(e=/http(s?)/.test(o[1])?o[1]+"://"+o[2]:o[2],n=o[1],!ee.adapters[n].valid())throw"Invalid adapter";return{name:e,adapter:o[1]}}var i="idb"in ee.adapters&&"websql"in ee.adapters&&ne()&&localStorage["_pouch__websqldb_"+ee.prefix+e];if(t.adapter)r=t.adapter;else if("undefined"!=typeof t&&t.db)r="leveldb";else for(var a=0;a<ee.preferredAdapters.length;++a)if(r=ee.preferredAdapters[a],r in ee.adapters){if(i&&"idb"===r){console.log('PouchDB is downgrading "'+e+'" to WebSQL to avoid data loss, because it was already opened with WebSQL.');continue}break}n=ee.adapters[r];var s=n&&"use_prefix"in n?n.use_prefix:!0;return{name:s?ee.prefix+e:e,adapter:r}},ee.adapter=function(e,t,n){t.valid()&&(ee.adapters[e]=t,n&&ee.preferredAdapters.push(e))},ee.plugin=function(e){return Object.keys(e).forEach(function(t){ee.prototype[t]=e[t]}),ee},ee.defaults=function(e){function t(n,r,o){return this instanceof t?(("function"==typeof r||"undefined"==typeof r)&&(o=r,r={}),n&&"object"==typeof n&&(r=n,n=void 0),r=Yn.extend({},e,r),void ee.call(this,n,r,o)):new t(n,r,o)}return tr(t,ee),re(t),t.preferredAdapters=ee.preferredAdapters.slice(),Object.keys(ee).forEach(function(e){e in t||(t[e]=ee[e])}),t};var Jr=ce(),Vr=function(){},Gr=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],Xr="queryKey",zr=/(?:^|&)([^&=]*)=?([^&]*)/g,Qr=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,$r=function(e){return atob(e)},Yr=function(e){return btoa(e)},Zr=Zn.extend,eo={ajax:he,parseUri:pe,uuid:D,Promise:lr,atob:$r,btoa:Yr,binaryStringToBlobOrBuffer:ye,clone:c,extend:Zr,createError:A},to=ur.collate,no=1,ro="pouchdb",oo=5,io=0;we.prototype.writeCheckpoint=function(e,t){var n=this;return this.updateTarget(e,t).then(function(){return n.updateSource(e,t)})},we.prototype.updateTarget=function(e,t){return be(this.target,this.id,e,t,this.returnValue)},we.prototype.updateSource=function(e,t){var n=this;return this.readOnlySource?lr.resolve(!0):be(this.src,this.id,e,t,this.returnValue)["catch"](function(e){if(qe(e))return n.readOnlySource=!0,!0;throw e})};var ao={undefined:function(e,t){return 0===to(e.last_seq,t.last_seq)?t.last_seq:0},1:function(e,t){return Ee(t,e).last_seq}};we.prototype.getCheckpoint=function(){var e=this;return e.target.get(e.id).then(function(t){return e.readOnlySource?lr.resolve(t.last_seq):e.src.get(e.id).then(function(e){if(t.version!==e.version)return io;var n;return n=t.version?t.version.toString():"undefined",n in ao?ao[n](t,e):io},function(n){if(404===n.status&&t.last_seq)return e.src.put({_id:e.id,last_seq:io}).then(function(){return io},function(n){return qe(n)?(e.readOnlySource=!0,t.last_seq):io});throw n})})["catch"](function(e){if(404!==e.status)throw e;return io})};var so=0,uo=r.setImmediate||r.setTimeout,co=32768,fo=l(function(e,t){function n(){var r=s*i,o=r+i;if(s++,a>s)c(u,e,r,o),uo(n);else{c(u,e,r,o);var f=u.end(!0),l=Oe(f);t(null,l),u.destroy()}}var r="string"==typeof e,o=r?e.length:e.byteLength,i=Math.min(co,o),a=Math.ceil(o/i),s=0,u=r?new cr:new cr.ArrayBuffer,c=r?Ie:je;n()});tr(He,ir.EventEmitter),He.prototype.cancel=function(){this.cancelled=!0,this.state="cancelled",this.emit("cancel")},He.prototype.ready=function(e,t){function n(){o.cancel()}function r(){e.removeListener("destroyed",n),t.removeListener("destroyed",n)}var o=this;o._readyCalled||(o._readyCalled=!0,e.once("destroyed",n),t.once("destroyed",n),o.once("complete",r))};var lo={replicate:We,toPouch:Ke},ho=lo.replicate;tr(Ve,ir.EventEmitter),Ve.prototype.cancel=function(){this.canceled||(this.canceled=!0,this.push.cancel(),this.pull.cancel())};var po=25,vo=50,yo={},_o=1800,mo=er("pouchdb:http");ot.valid=function(){return!0},it.prototype.add=function(e){return this.promise=this.promise["catch"](function(){}).then(function(){return e()}),this.promise},it.prototype.finish=function(){return this.promise};var go,bo=function(e,t){return t&&e.then(function(e){n.nextTick(function(){t(null,e)})},function(e){n.nextTick(function(){t(e)})}),e},wo=function(e){return or(function(t){var n=t.pop(),r=e.apply(this,t);return"function"==typeof n&&bo(r,n),r})},Eo=function(e,t){return e.then(function(e){return t().then(function(){return e})},function(e){return t().then(function(){throw e})})},So=function(e,t){return function(){var n=arguments,r=this;return e.add(function(){return t.apply(r,n)})}},ko=function(e){for(var t={},n=0,r=e.length;r>n;n++)t["$"+e[n]]=!0;var o=Object.keys(t),i=new Array(o.length);for(n=0,r=o.length;r>n;n++)i[n]=o[n].substring(1);return i},qo={uniq:ko,sequentialize:So,fin:Eo,callbackify:wo,promisedCallback:bo},xo=ur.collate,Ao=ur.toIndexableString,To=ur.normalizeKey,Oo=ur.parseIndexableString;go="undefined"!=typeof console&&"function"==typeof console.log?Function.prototype.bind.call(console.log,console):function(){};var jo=qo.callbackify,Io=qo.sequentialize,Co=qo.uniq,Lo=qo.fin,Ro=qo.promisedCallback,Do={},No=new it,Bo=50,Mo={_sum:function(e,t){return gt(t)},_count:function(e,t){return t.length},_stats:function(e,t){function n(e){for(var t=0,n=0,r=e.length;r>n;n++){var o=e[n];t+=o*o}return t}return{sum:gt(t),min:Math.min.apply(null,t),max:Math.max.apply(null,t),count:t.length,sumsqr:n(t)}}},Fo=jo(function(){var e=this;return"http"===e.type()?Bt(e):"function"==typeof e._viewCleanup?At(e):Mt(e)}),Uo=function(e,t,n){"function"==typeof t&&(n=t,t={}),t=t?Et(t):{},"function"==typeof e&&(e={map:e});var r=this,o=lr.resolve().then(function(){return Ft(r,e,t)});return Ro(o,n),o};tr(Ut,Error),tr(Pt,Error),tr(Ht,Error);var Po={query:Uo,viewCleanup:Fo},Ho=5,Ko="document-store",Wo="by-sequence",Jo="attach-store",Vo="attach-seq-store",Go="meta-store",Xo="local-store",zo="detect-blob-support",Qo={running:!1,queue:[]};tr(xn,ir.EventEmitter),xn.prototype.addListener=function(e,t,n,r){function o(){function e(){s=!1}if(a._listeners[t]){if(s)return void(s="waiting");s=!0;var u=i(r,["style","include_docs","attachments","conflicts","filter","doc_ids","view","since","query_params","binary"]);n.changes(u).on("change",function(e){e.seq>r.since&&!r.cancelled&&(r.since=e.seq,r.onChange(e))}).on("complete",function(){"waiting"===s&&setTimeout(function(){o()},0),s=!1}).on("error",e)}}if(!this._listeners[t]){var a=this,s=!1;this._listeners[t]=o,this.on(e,o)}},xn.prototype.removeListener=function(e,t){t in this._listeners&&ir.EventEmitter.prototype.removeListener.call(this,e,this._listeners[t])},xn.prototype.notifyLocalWindows=function(e){te()?chrome.storage.local.set({dbName:e}):ne()&&(localStorage[e]="a"===localStorage[e]?"b":"a")},xn.prototype.notify=function(e){this.emit(e),this.notifyLocalWindows(e)};var $o,Yo=new rr.Map,Zo=new xn,ei=new rr.Map;An.valid=function(){var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform);return!e&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange};var ti=7,ni=Dn("document-store"),ri=Dn("by-sequence"),oi=Dn("attach-store"),ii=Dn("local-store"),ai=Dn("metadata-store"),si=Dn("attach-seq-store"),ui=new rr.Map,ci=new xn,fi=1,li="CREATE INDEX IF NOT EXISTS 'by-seq-deleted-idx' ON "+ri+" (seq, deleted)",di="CREATE UNIQUE INDEX IF NOT EXISTS 'by-seq-doc-id-rev' ON "+ri+" (doc_id, rev)",hi="CREATE INDEX IF NOT EXISTS 'doc-winningseq-idx' ON "+ni+" (winningseq)",pi="CREATE INDEX IF NOT EXISTS 'attach-seq-seq-idx' ON "+si+" (seq)",vi="CREATE UNIQUE INDEX IF NOT EXISTS 'attach-seq-digest-idx' ON "+si+" (digest, seq)",yi=ri+".seq = "+ni+".winningseq",_i=ri+".seq AS seq, "+ri+".deleted AS deleted, "+ri+".json AS data, "+ri+".rev AS rev, "+ni+".json AS metadata";$n.use_prefix=!("undefined"!=typeof n&&!n.browser),$n.valid=Bn;var mi={idb:An,websql:$n};ee.ajax=he,ee.utils=eo,ee.Errors=Br,ee.replicate=lo.replicate,ee.sync=Je,ee.version="5.3.3-prerelease",ee.adapter("http",ot),ee.adapter("https",ot),ee.plugin(Po),Object.keys(mi).forEach(function(e){ee.adapter(e,mi[e],!0)}),t.exports=ee}).call(this,e(3),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{1:1,11:11,13:13,14:14,15:15,16:16,2:2,3:3,4:4,7:7,8:8,9:9}]},{},[17])(17)});












// --- file[pouchdb.quick-search.js] ---

;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

// Use a fork of pouchdb-mapreduce, which allows us
// deeper control over what's persisted, without needing ddocs
var mapReduce = require('pouchdb-mapreduce-no-ddocs');
Object.keys(mapReduce).forEach(function (key) {
  exports[key] = mapReduce[key];
});

var utils = require('./pouch-utils');
var lunr = require('lunr');
var uniq = require('uniq');
var Promise = utils.Promise;

var indexes = {};

var TYPE_TOKEN_COUNT = 'a';
var TYPE_DOC_INFO = 'b';

function add(left, right) {
  return left + right;
}

// get all the tokens found in the given text (non-unique)
// in the future, we might expand this to do more than just
// English. Also, this is a private Lunr API, hence why
// the Lunr version is pegged.
function getTokenStream(text, index) {
  text = text.replace(/<(?:.|\n)*?>/gm, ' ');
  return index.pipeline.run(lunr.tokenizer(text));
}

// given an object containing the field name and/or
// a deepField definition plus the doc, return the text for
// indexing
function getText(fieldBoost, doc) {
  var text;
  if (!fieldBoost.deepField) {
    text = doc[fieldBoost.field];
  } else { // "Enhance."
    text = doc;
    for (var i = 0, len = fieldBoost.deepField.length; i < len; i++) {
      text = text && text[fieldBoost.deepField[i]];
    }
  }
  if (text) {
    if (Array.isArray(text)) {
      text = text.join(' ');
    } else if (typeof text !== 'string') {
      text = text.toString();
    }
  }

  return text;
}

// map function that gets passed to map/reduce
// emits two types of key/values - one for each token
// and one for the field-len-norm
function createMapFunction(fieldBoosts, index, filter, db) {
  return function (doc, emit) {

    if (isFiltered(doc, filter, db)) {
      return;
    }

    var docInfo = [];

    for (var i = 0, len = fieldBoosts.length; i < len; i++) {
      var fieldBoost = fieldBoosts[i];

      var text = getText(fieldBoost, doc);

      var fieldLenNorm;
      if (text) {
        var terms = getTokenStream(text, index);
        for (var j = 0, jLen = terms.length; j < jLen; j++) {
      if(terms[j].length >2){
          var term = terms[j];
          // avoid emitting the value if there's only one field;
          // it takes up unnecessary space on disk
          var value = fieldBoosts.length > 1 ? i : undefined;
          emit(TYPE_TOKEN_COUNT + term, value);
    }}
        fieldLenNorm = Math.sqrt(terms.length);
      } else { // no tokens
        fieldLenNorm = 0;
      }
      docInfo.push(fieldLenNorm);
    }

    emit(TYPE_DOC_INFO + doc._id, docInfo);
  };
}

exports.search = utils.toPromise(function (opts, callback) {
  var pouch = this;
  opts = utils.extend(true, {}, opts);
  var q = opts.query || opts.q;
  var mm = 'mm' in opts ? (parseFloat(opts.mm) / 100) : 1; // e.g. '75%'
  var fields = opts.fields;
  var highlighting = opts.highlighting;
  var includeDocs = opts.include_docs;
  var destroy = opts.destroy;
  var stale = opts.stale;
  var limit = opts.limit;
  var build = opts.build;
  var skip = opts.skip || 0;
  var language = opts.language || 'en';
  var filter = opts.filter;

  if (Array.isArray(fields)) {
    var fieldsMap = {};
    fields.forEach(function (field) {
      fieldsMap[field] = 1; // default boost
    });
    fields = fieldsMap;
  }

  var fieldBoosts = Object.keys(fields).map(function (field) {
    var deepField = field.indexOf('.') !== -1 && field.split('.');
    return {
      field: field,
      deepField: deepField,
      boost: fields[field]
    };
  });

  var index = indexes[language];
  if (!index) {
    index = indexes[language] = lunr();
    if (language !== 'en') {
      index.use(global.lunr[language]);
    }
  }

  // the index we save as a separate database is uniquely identified
  // by the fields the user want to index (boost doesn't matter)
  // plus the tokenizer

  var indexParams =  {
    language: language,
    fields: fieldBoosts.map(function (x) { return x.field; }).sort()
  };

  if (filter) {
    indexParams.filter = filter.toString();
  }

  var persistedIndexName = 'search-' + utils.MD5(JSON.stringify(indexParams));

  var mapFun = createMapFunction(fieldBoosts, index, filter, pouch);

  var queryOpts = {
    saveAs: persistedIndexName
  };
  if (destroy) {
    queryOpts.destroy = true;
    return pouch._search_query(mapFun, queryOpts, callback);
  } else if (build) {
    delete queryOpts.stale; // update immediately
    queryOpts.limit = 0;
    pouch._search_query(mapFun, queryOpts).then(function () {
      callback(null, {ok: true});
    })["catch"](callback);
    return;
  }

  // it shouldn't matter if the user types the same
  // token more than once, in fact I think even Lucene does this
  // special cases like boingo boingo and mother mother are rare
  var queryTerms = uniq(getTokenStream(q, index));
  if (!queryTerms.length) {
    return callback(null, {rows: []});
  }
  queryOpts.keys = queryTerms.map(function (queryTerm) {
    return TYPE_TOKEN_COUNT + queryTerm;
  });

  if (typeof stale === 'string') {
    queryOpts.stale = stale;
  }

  // search algorithm, basically classic TF-IDF
  //
  // step 1: get the doc+fields associated with the terms in the query
  // step 2: get the doc-len-norms of those document fields
  // step 3: calculate document scores using tf-idf
  //
  // note that we follow the Lucene convention (established in
  // DefaultSimilarity.java) of computing doc-len-norm (in our case, tecnically
  // field-lennorm) as Math.sqrt(numTerms),
  // which is an optimization that avoids having to look up every term
  // in that document and fully recompute its scores based on tf-idf
  // More info:
  // https://lucene.apache.org/core/3_6_0/api/core/org/apache/lucene/search/Similarity.html
  //

  // step 1
  pouch._search_query(mapFun, queryOpts).then(function (res) {

    if (!res.rows.length) {
      return callback(null, {rows: []});
    }

    var docIdsToFieldsToQueryTerms = {};
    var termDFs = {};

    res.rows.forEach(function (row) {
      var term = row.key.substring(1);
      var field = row.value || 0;

      // calculate termDFs
      if (!(term in termDFs)) {
        termDFs[term] = 1;
      } else {
        termDFs[term]++;
      }

      // calculate docIdsToFieldsToQueryTerms
      if (!(row.id in docIdsToFieldsToQueryTerms)) {
        var arr = docIdsToFieldsToQueryTerms[row.id] = [];
        for (var i = 0; i < fieldBoosts.length; i++) {
          arr[i] = {};
        }
      }

      var docTerms = docIdsToFieldsToQueryTerms[row.id][field];
      if (!(term in docTerms)) {
        docTerms[term] = 1;
      } else {
        docTerms[term]++;
      }
    });

    // apply the minimum should match (mm)
    if (queryTerms.length > 1) {
      Object.keys(docIdsToFieldsToQueryTerms).forEach(function (docId) {
        var allMatchingTerms = {};
        var fieldsToQueryTerms = docIdsToFieldsToQueryTerms[docId];
        Object.keys(fieldsToQueryTerms).forEach(function (field) {
          Object.keys(fieldsToQueryTerms[field]).forEach(function (term) {
            allMatchingTerms[term] = true;
          });
        });
        var numMatchingTerms = Object.keys(allMatchingTerms).length;
        var matchingRatio = numMatchingTerms / queryTerms.length;
        if ((Math.floor(matchingRatio * 100) / 100) < mm) {
          delete docIdsToFieldsToQueryTerms[docId]; // ignore this doc
        }
      });
    }

    if (!Object.keys(docIdsToFieldsToQueryTerms).length) {
      return callback(null, {rows: []});
    }

    var keys = Object.keys(docIdsToFieldsToQueryTerms).map(function (docId) {
      return TYPE_DOC_INFO + docId;
    });

    var queryOpts = {
      saveAs: persistedIndexName,
      keys: keys
    };

    // step 2
    return pouch._search_query(mapFun, queryOpts).then(function (res) {

      var docIdsToFieldsToNorms = {};
      res.rows.forEach(function (row) {
        docIdsToFieldsToNorms[row.id] = row.value;
      });
      // step 3
      // now we have all information, so calculate scores
      var rows = calculateDocumentScores(queryTerms, termDFs,
        docIdsToFieldsToQueryTerms, docIdsToFieldsToNorms, fieldBoosts);
      return rows;
    }).then(function (rows) {
      // filter before fetching docs or applying highlighting
      // for a slight optimization, since for now we've only fetched ids/scores
      return (typeof limit === 'number' && limit >= 0) ?
          rows.slice(skip, skip + limit) : skip > 0 ? rows.slice(skip) : rows;
    }).then(function (rows) {
      if (includeDocs) {
        return applyIncludeDocs(pouch, rows);
      }
      return rows;
    }).then(function (rows) {
      if (highlighting) {
        return applyHighlighting(pouch, opts, rows, fieldBoosts, docIdsToFieldsToQueryTerms);
      }
      return rows;

    }).then(function (rows) {
      callback(null, {rows: rows});
    });
  })["catch"](callback);
});


// returns a sorted list of scored results, like:
// [{id: {...}, score: 0.2}, {id: {...}, score: 0.1}];
//
// some background: normally this would be implemented as cosine similarity
// using tf-idf, which is equal to
// dot-product(q, d) / (norm(q) * norm(doc))
// (although there is no point in calculating the query norm,
// because all we care about is the relative score for a given query,
// so we ignore it, lucene does this too)
//
//
// but instead of straightforward cosine similarity, here I implement
// the dismax algorithm, so the doc score is the
// sum of its fields' scores, and this is done on a per-query-term basis,
// then the maximum score for each of the query terms is the one chosen,
// i.e. max(sumOfQueryTermScoresForField1, sumOfQueryTermScoresForField2, etc.)
//

function calculateDocumentScores(queryTerms, termDFs, docIdsToFieldsToQueryTerms,
                            docIdsToFieldsToNorms, fieldBoosts) {

  var results = Object.keys(docIdsToFieldsToQueryTerms).map(function (docId) {

    var fieldsToQueryTerms = docIdsToFieldsToQueryTerms[docId];
    var fieldsToNorms = docIdsToFieldsToNorms[docId];

    var queryScores = queryTerms.map(function (queryTerm) {
      return fieldsToQueryTerms.map(function (queryTermsToCounts, fieldIdx) {
        var fieldNorm = fieldsToNorms[fieldIdx];
        if (!(queryTerm in queryTermsToCounts)) {
          return 0;
        }
        var termDF = termDFs[queryTerm];
        var termTF = queryTermsToCounts[queryTerm];
        var docScore = termTF / termDF; // TF-IDF for doc
        var queryScore = 1 / termDF; // TF-IDF for query, count assumed to be 1
        var boost = fieldBoosts[fieldIdx].boost;
        return docScore * queryScore * boost / fieldNorm; // see cosine sim equation
      }).reduce(add, 0);
    });

    var maxQueryScore = 0;
    queryScores.forEach(function (queryScore) {
      if (queryScore > maxQueryScore) {
        maxQueryScore = queryScore;
      }
    });

    return {
      id: docId,
      score: maxQueryScore
    };
  });

  results.sort(function (a, b) {
    return a.score < b.score ? 1 : (a.score > b.score ? -1 : 0);
  });

  return results;
}

function applyIncludeDocs(pouch, rows) {
  return Promise.all(rows.map(function (row) {
    return pouch.get(row.id);
  })).then(function (docs) {
    docs.forEach(function (doc, i) {
      rows[i].doc = doc;
    });
  }).then(function () {
    return rows;
  });
}

// create a convenient object showing highlighting results
// this is designed to be like solr's highlighting feature, so it
// should return something like
// {'fieldname': 'here is some <strong>highlighted text</strong>.'}
//
function applyHighlighting(pouch, opts, rows, fieldBoosts,
                           docIdsToFieldsToQueryTerms) {

  var pre = opts.highlighting_pre || '<strong>';
  var post = opts.highlighting_post || '</strong>';

  return Promise.all(rows.map(function (row) {

    return Promise.resolve().then(function () {
      if (row.doc) {
        return row.doc;
      }
      return pouch.get(row.id);
    }).then(function (doc) {
      row.highlighting = {};
      docIdsToFieldsToQueryTerms[row.id].forEach(function (queryTerms, i) {
        var fieldBoost = fieldBoosts[i];
        var fieldName = fieldBoost.field;
        var text = getText(fieldBoost, doc);
        // TODO: this is fairly naive highlighting code; could improve
        // the regex
        Object.keys(queryTerms).forEach(function (queryTerm) {
          var regex = new RegExp('(' + queryTerm + '[a-z]*)', 'gi');
          var replacement = pre + '$1' + post;
          text = text.replace(regex, replacement);
          row.highlighting[fieldName] = text;
        });
      });
    });
  })).then(function () {
    return rows;
  });
}

// return true if filtered, false otherwise
// limit the try/catch to its own function to avoid deoptimization
function isFiltered(doc, filter, db) {
  try {
    return !!(filter && !filter(doc));
  } catch (e) {
    db.emit('error', e);
    return true;
  }
}

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports);
}

},{"./pouch-utils":38,"lunr":24,"pouchdb-mapreduce-no-ddocs":29,"uniq":37}],2:[function(require,module,exports){
'use strict';

module.exports = argsArray;

function argsArray(fun) {
  return function () {
    var len = arguments.length;
    if (len) {
      var args = [];
      var i = -1;
      while (++i < len) {
        args[i] = arguments[i];
      }
      return fun.call(this, args);
    } else {
      return fun.call(this, []);
    }
  };
}
},{}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],6:[function(require,module,exports){
'use strict';

module.exports = INTERNAL;

function INTERNAL() {}
},{}],7:[function(require,module,exports){
'use strict';
var Promise = require('./promise');
var reject = require('./reject');
var resolve = require('./resolve');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = all;
function all(iterable) {
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new Promise(INTERNAL);
  
  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len & !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}
},{"./INTERNAL":6,"./handlers":8,"./promise":10,"./reject":13,"./resolve":14}],8:[function(require,module,exports){
'use strict';
var tryCatch = require('./tryCatch');
var resolveThenable = require('./resolveThenable');
var states = require('./states');

exports.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return exports.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    resolveThenable.safely(self, thenable);
  } else {
    self.state = states.FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
exports.reject = function (self, error) {
  self.state = states.REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && typeof obj === 'object' && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}
},{"./resolveThenable":15,"./states":16,"./tryCatch":17}],9:[function(require,module,exports){
module.exports = exports = require('./promise');

exports.resolve = require('./resolve');
exports.reject = require('./reject');
exports.all = require('./all');
exports.race = require('./race');
},{"./all":7,"./promise":10,"./race":12,"./reject":13,"./resolve":14}],10:[function(require,module,exports){
'use strict';

var unwrap = require('./unwrap');
var INTERNAL = require('./INTERNAL');
var resolveThenable = require('./resolveThenable');
var states = require('./states');
var QueueItem = require('./queueItem');

module.exports = Promise;
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    return new Promise(resolver);
  }
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = states.PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    resolveThenable.safely(this, resolver);
  }
}

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === states.FULFILLED ||
    typeof onRejected !== 'function' && this.state === states.REJECTED) {
    return this;
  }
  var promise = new Promise(INTERNAL);

  
  if (this.state !== states.PENDING) {
    var resolver = this.state === states.FULFILLED ? onFulfilled: onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};

},{"./INTERNAL":6,"./queueItem":11,"./resolveThenable":15,"./states":16,"./unwrap":18}],11:[function(require,module,exports){
'use strict';
var handlers = require('./handlers');
var unwrap = require('./unwrap');

module.exports = QueueItem;
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};
},{"./handlers":8,"./unwrap":18}],12:[function(require,module,exports){
'use strict';
var Promise = require('./promise');
var reject = require('./reject');
var resolve = require('./resolve');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = race;
function race(iterable) {
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return resolve([]);
  }

  var resolved = 0;
  var i = -1;
  var promise = new Promise(INTERNAL);
  
  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}
},{"./INTERNAL":6,"./handlers":8,"./promise":10,"./reject":13,"./resolve":14}],13:[function(require,module,exports){
'use strict';

var Promise = require('./promise');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = reject;

function reject(reason) {
  var promise = new Promise(INTERNAL);
  return handlers.reject(promise, reason);
}
},{"./INTERNAL":6,"./handlers":8,"./promise":10}],14:[function(require,module,exports){
'use strict';

var Promise = require('./promise');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = resolve;

var FALSE = handlers.resolve(new Promise(INTERNAL), false);
var NULL = handlers.resolve(new Promise(INTERNAL), null);
var UNDEFINED = handlers.resolve(new Promise(INTERNAL), void 0);
var ZERO = handlers.resolve(new Promise(INTERNAL), 0);
var EMPTYSTRING = handlers.resolve(new Promise(INTERNAL), '');

function resolve(value) {
  if (value) {
    if (value instanceof Promise) {
      return value;
    }
    return handlers.resolve(new Promise(INTERNAL), value);
  }
  var valueType = typeof value;
  switch (valueType) {
    case 'boolean':
      return FALSE;
    case 'undefined':
      return UNDEFINED;
    case 'object':
      return NULL;
    case 'number':
      return ZERO;
    case 'string':
      return EMPTYSTRING;
  }
}
},{"./INTERNAL":6,"./handlers":8,"./promise":10}],15:[function(require,module,exports){
'use strict';
var handlers = require('./handlers');
var tryCatch = require('./tryCatch');
function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }
  
  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}
exports.safely = safelyResolveThenable;
},{"./handlers":8,"./tryCatch":17}],16:[function(require,module,exports){
// Lazy man's symbols for states

exports.REJECTED = ['REJECTED'];
exports.FULFILLED = ['FULFILLED'];
exports.PENDING = ['PENDING'];
},{}],17:[function(require,module,exports){
'use strict';

module.exports = tryCatch;

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}
},{}],18:[function(require,module,exports){
'use strict';

var immediate = require('immediate');
var handlers = require('./handlers');
module.exports = unwrap;

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}
},{"./handlers":8,"immediate":19}],19:[function(require,module,exports){
'use strict';
var types = [
  require('./nextTick'),
  require('./mutation.js'),
  require('./messageChannel'),
  require('./stateChange'),
  require('./timeout')
];
var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}
var scheduleDrain;
var i = -1;
var len = types.length;
while (++ i < len) {
  if (types[i] && types[i].test && types[i].test()) {
    scheduleDrain = types[i].install(nextTick);
    break;
  }
}
module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}
},{"./messageChannel":20,"./mutation.js":21,"./nextTick":3,"./stateChange":22,"./timeout":23}],20:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

exports.test = function () {
  if (global.setImmediate) {
    // we can only get here in IE10
    // which doesn't handel postMessage well
    return false;
  }
  return typeof global.MessageChannel !== 'undefined';
};

exports.install = function (func) {
  var channel = new global.MessageChannel();
  channel.port1.onmessage = func;
  return function () {
    channel.port2.postMessage(0);
  };
};
},{}],21:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';
//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

exports.test = function () {
  return Mutation;
};

exports.install = function (handle) {
  var called = 0;
  var observer = new Mutation(handle);
  var element = global.document.createTextNode('');
  observer.observe(element, {
    characterData: true
  });
  return function () {
    element.data = (called = ++called % 2);
  };
};
},{}],22:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

exports.test = function () {
  return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
};

exports.install = function (handle) {
  return function () {

    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
    var scriptEl = global.document.createElement('script');
    scriptEl.onreadystatechange = function () {
      handle();

      scriptEl.onreadystatechange = null;
      scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
    };
    global.document.documentElement.appendChild(scriptEl);

    return handle;
  };
};
},{}],23:[function(require,module,exports){
'use strict';
exports.test = function () {
  return true;
};

exports.install = function (t) {
  return function () {
    setTimeout(t, 0);
  };
};
},{}],24:[function(require,module,exports){
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.5.5
 * Copyright (C) 2014 Oliver Nightingale
 * MIT Licensed
 * @license
 */

(function(){

/**
 * Convenience function for instantiating a new lunr index and configuring it
 * with the default pipeline functions and the passed config function.
 *
 * When using this convenience function a new index will be created with the
 * following functions already in the pipeline:
 *
 * lunr.StopWordFilter - filters out any stop words before they enter the
 * index
 *
 * lunr.stemmer - stems the tokens before entering the index.
 *
 * Example:
 *
 *     var idx = lunr(function () {
 *       this.field('title', 10)
 *       this.field('tags', 100)
 *       this.field('body')
 *       
 *       this.ref('cid')
 *       
 *       this.pipeline.add(function () {
 *         // some custom pipeline function
 *       })
 *       
 *     })
 *
 * @param {Function} config A function that will be called with the new instance
 * of the lunr.Index as both its context and first parameter. It can be used to
 * customize the instance of new lunr.Index.
 * @namespace
 * @module
 * @returns {lunr.Index}
 *
 */
var lunr = function (config) {
  var idx = new lunr.Index

  idx.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  if (config) config.call(idx, idx)

  return idx
}

lunr.version = "0.5.5"
/*!
 * lunr.utils
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
})(this)

/*!
 * lunr.EventEmitter
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
 *
 * @constructor
 */
lunr.EventEmitter = function () {
  this.events = {}
}

/**
 * Binds a handler function to a specific event(s).
 *
 * Can bind a single function to many different events in one call.
 *
 * @param {String} [eventName] The name(s) of events to bind this function to.
 * @param {Function} handler The function to call when an event is fired.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.addListener = function () {
  var args = Array.prototype.slice.call(arguments),
      fn = args.pop(),
      names = args

  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")

  names.forEach(function (name) {
    if (!this.hasHandler(name)) this.events[name] = []
    this.events[name].push(fn)
  }, this)
}

/**
 * Removes a handler function from a specific event.
 *
 * @param {String} eventName The name of the event to remove this function from.
 * @param {Function} handler The function to remove from an event.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.removeListener = function (name, fn) {
  if (!this.hasHandler(name)) return

  var fnIndex = this.events[name].indexOf(fn)
  this.events[name].splice(fnIndex, 1)

  if (!this.events[name].length) delete this.events[name]
}

/**
 * Calls all functions bound to the given event.
 *
 * Additional data can be passed to the event handler as arguments to `emit`
 * after the event name.
 *
 * @param {String} eventName The name of the event to emit.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.emit = function (name) {
  if (!this.hasHandler(name)) return

  var args = Array.prototype.slice.call(arguments, 1)

  this.events[name].forEach(function (fn) {
    fn.apply(undefined, args)
  })
}

/**
 * Checks whether a handler has ever been stored against an event.
 *
 * @param {String} eventName The name of the event to check.
 * @private
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.hasHandler = function (name) {
  return name in this.events
}

/*!
 * lunr.tokenizer
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index.
 *
 * @module
 * @param {String} obj The string to convert into tokens
 * @returns {Array}
 */
lunr.tokenizer = function (obj) {
  if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

  var str = obj.toString().replace(/^\s+/, '')

  for (var i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1)
      break
    }
  }

  return str
    .split(/(?:\s+|\-)/)
    .filter(function (token) {
      return !!token
    })
    .map(function (token) {
      return token.toLowerCase()
    })
}
/*!
 * lunr.Pipeline
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = {}

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {Function} fn The function to check for.
 * @param {String} label The label to register this function with
 * @memberOf Pipeline
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {Function} fn The function to check for.
 * @private
 * @memberOf Pipeline
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 * @memberOf Pipeline
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error ('Cannot load un-registered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} functions Any number of functions to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn) + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {Function} fn The function to remove from the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var out = [],
      tokenLength = tokens.length,
      stackLength = this._stack.length

  for (var i = 0; i < tokenLength; i++) {
    var token = tokens[i]

    for (var j = 0; j < stackLength; j++) {
      token = this._stack[j](token, i, tokens)
      if (token === void 0) break
    };

    if (token !== void 0) out.push(token)
  };

  return out
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Vectors implement vector related operations for
 * a series of elements.
 *
 * @constructor
 */
lunr.Vector = function () {
  this._magnitude = null
  this.list = undefined
  this.length = 0
}

/**
 * lunr.Vector.Node is a simple struct for each node
 * in a lunr.Vector.
 *
 * @private
 * @param {Number} The index of the node in the vector.
 * @param {Object} The data at this node in the vector.
 * @param {lunr.Vector.Node} The node directly after this node in the vector.
 * @constructor
 * @memberOf Vector
 */
lunr.Vector.Node = function (idx, val, next) {
  this.idx = idx
  this.val = val
  this.next = next
}

/**
 * Inserts a new value at a position in a vector.
 *
 * @param {Number} The index at which to insert a value.
 * @param {Object} The object to insert in the vector.
 * @memberOf Vector.
 */
lunr.Vector.prototype.insert = function (idx, val) {
  var list = this.list

  if (!list) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  var prev = list,
      next = list.next

  while (next != undefined) {
    if (idx < next.idx) {
      prev.next = new lunr.Vector.Node (idx, val, next)
      return this.length++
    }

    prev = next, next = next.next
  }

  prev.next = new lunr.Vector.Node (idx, val, next)
  return this.length++
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magniture) return this._magnitude
  var node = this.list,
      sumOfSquares = 0,
      val

  while (node) {
    val = node.val
    sumOfSquares += val * val
    node = node.next
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var node = this.list,
      otherNode = otherVector.list,
      dotProduct = 0

  while (node && otherNode) {
    if (node.idx < otherNode.idx) {
      node = node.next
    } else if (node.idx > otherNode.idx) {
      otherNode = otherNode.next
    } else {
      dotProduct += node.val * otherNode.val
      node = node.next
      otherNode = otherNode.next
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector The other vector to calculate the
 * similarity with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}
/*!
 * lunr.SortedSet
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
 * order.
 *
 * @constructor
 */
lunr.SortedSet = function () {
  this.length = 0
  this.elements = []
}

/**
 * Loads a previously serialised sorted set.
 *
 * @param {Array} serialisedData The serialised set to load.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.load = function (serialisedData) {
  var set = new this

  set.elements = serialisedData
  set.length = serialisedData.length

  return set
}

/**
 * Inserts new items into the set in the correct position to maintain the
 * order.
 *
 * @param {Object} The objects to add to this set.
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.add = function () {
  Array.prototype.slice.call(arguments).forEach(function (element) {
    if (~this.indexOf(element)) return
    this.elements.splice(this.locationFor(element), 0, element)
  }, this)

  this.length = this.elements.length
}

/**
 * Converts this sorted set into an array.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toArray = function () {
  return this.elements.slice()
}

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this sorted set.
 *
 * Delegates to Array.prototype.map and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * for the function fn.
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.map = function (fn, ctx) {
  return this.elements.map(fn, ctx)
}

/**
 * Executes a provided function once per sorted set element.
 *
 * Delegates to Array.prototype.forEach and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * @memberOf SortedSet
 * for the function fn.
 */
lunr.SortedSet.prototype.forEach = function (fn, ctx) {
  return this.elements.forEach(fn, ctx)
}

/**
 * Returns the index at which a given element can be found in the
 * sorted set, or -1 if it is not present.
 *
 * @param {Object} elem The object to locate in the sorted set.
 * @param {Number} start An optional index at which to start searching from
 * within the set.
 * @param {Number} end An optional index at which to stop search from within
 * the set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.indexOf = function (elem, start, end) {
  var start = start || 0,
      end = end || this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  if (sectionLength <= 1) {
    if (pivotElem === elem) {
      return pivot
    } else {
      return -1
    }
  }

  if (pivotElem < elem) return this.indexOf(elem, pivot, end)
  if (pivotElem > elem) return this.indexOf(elem, start, pivot)
  if (pivotElem === elem) return pivot
}

/**
 * Returns the position within the sorted set that an element should be
 * inserted at to maintain the current order of the set.
 *
 * This function assumes that the element to search for does not already exist
 * in the sorted set.
 *
 * @param {Object} elem The elem to find the position for in the set
 * @param {Number} start An optional index at which to start searching from
 * within the set.
 * @param {Number} end An optional index at which to stop search from within
 * the set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.locationFor = function (elem, start, end) {
  var start = start || 0,
      end = end || this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  if (sectionLength <= 1) {
    if (pivotElem > elem) return pivot
    if (pivotElem < elem) return pivot + 1
  }

  if (pivotElem < elem) return this.locationFor(elem, pivot, end)
  if (pivotElem > elem) return this.locationFor(elem, start, pivot)
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the intersection
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.intersect = function (otherSet) {
  var intersectSet = new lunr.SortedSet,
      i = 0, j = 0,
      a_len = this.length, b_len = otherSet.length,
      a = this.elements, b = otherSet.elements

  while (true) {
    if (i > a_len - 1 || j > b_len - 1) break

    if (a[i] === b[j]) {
      intersectSet.add(a[i])
      i++, j++
      continue
    }

    if (a[i] < b[j]) {
      i++
      continue
    }

    if (a[i] > b[j]) {
      j++
      continue
    }
  };

  return intersectSet
}

/**
 * Makes a copy of this set
 *
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.clone = function () {
  var clone = new lunr.SortedSet

  clone.elements = this.toArray()
  clone.length = clone.elements.length

  return clone
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the union
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to union with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.union = function (otherSet) {
  var longSet, shortSet, unionSet

  if (this.length >= otherSet.length) {
    longSet = this, shortSet = otherSet
  } else {
    longSet = otherSet, shortSet = this
  }

  unionSet = longSet.clone()

  unionSet.add.apply(unionSet, shortSet.toArray())

  return unionSet
}

/**
 * Returns a representation of the sorted set ready for serialisation.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toJSON = function () {
  return this.toArray()
}
/*!
 * lunr.Index
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Index is object that manages a search index.  It contains the indexes
 * and stores all the tokens and document lookups.  It also provides the main
 * user facing API for the library.
 *
 * @constructor
 */
lunr.Index = function () {
  this._fields = []
  this._ref = 'id'
  this.pipeline = new lunr.Pipeline
  this.documentStore = new lunr.Store
  this.tokenStore = new lunr.TokenStore
  this.corpusTokens = new lunr.SortedSet
  this.eventEmitter =  new lunr.EventEmitter

  this._idfCache = {}

  this.on('add', 'remove', 'update', (function () {
    this._idfCache = {}
  }).bind(this))
}

/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} handler The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} handler The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}

/**
 * Loads a previously serialised index.
 *
 * Issues a warning if the index being imported was serialised
 * by a different version of lunr.
 *
 * @param {Object} serialisedData The serialised set to load.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.load = function (serialisedData) {
  if (serialisedData.version !== lunr.version) {
    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
  }

  var idx = new this

  idx._fields = serialisedData.fields
  idx._ref = serialisedData.ref

  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

  return idx
}

/**
 * Adds a field to the list of fields that will be searchable within documents
 * in the index.
 *
 * An optional boost param can be passed to affect how much tokens in this field
 * rank in search results, by default the boost value is 1.
 *
 * Fields should be added before any documents are added to the index, fields
 * that are added after documents are added to the index will only apply to new
 * documents added to the index.
 *
 * @param {String} fieldName The name of the field within the document that
 * should be indexed
 * @param {Number} boost An optional boost that can be applied to terms in this
 * field.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.field = function (fieldName, opts) {
  var opts = opts || {},
      field = { name: fieldName, boost: opts.boost || 1 }

  this._fields.push(field)
  return this
}

/**
 * Sets the property used to uniquely identify documents added to the index,
 * by default this property is 'id'.
 *
 * This should only be changed before adding documents to the index, changing
 * the ref property without resetting the index can lead to unexpected results.
 *
 * @param {String} refName The property to use to uniquely identify the
 * documents in the index.
 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.ref = function (refName) {
  this._ref = refName
  return this
}

/**
 * Add a document to the index.
 *
 * This is the way new documents enter the index, this function will run the
 * fields from the document through the index's pipeline and then add it to
 * the index, it will then show up in search results.
 *
 * An 'add' event is emitted with the document that has been added and the index
 * the document has been added to. This event can be silenced by passing false
 * as the second argument to add.
 *
 * @param {Object} doc The document to add to the index.
 * @param {Boolean} emitEvent Whether or not to emit events, default true.
 * @memberOf Index
 */
lunr.Index.prototype.add = function (doc, emitEvent) {
  var docTokens = {},
      allDocumentTokens = new lunr.SortedSet,
      docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  this._fields.forEach(function (field) {
    var fieldTokens = this.pipeline.run(lunr.tokenizer(doc[field.name]))

    docTokens[field.name] = fieldTokens
    lunr.SortedSet.prototype.add.apply(allDocumentTokens, fieldTokens)
  }, this)

  this.documentStore.set(docRef, allDocumentTokens)
  lunr.SortedSet.prototype.add.apply(this.corpusTokens, allDocumentTokens.toArray())

  for (var i = 0; i < allDocumentTokens.length; i++) {
    var token = allDocumentTokens.elements[i]
    var tf = this._fields.reduce(function (memo, field) {
      var fieldLength = docTokens[field.name].length

      if (!fieldLength) return memo

      var tokenCount = docTokens[field.name].filter(function (t) { return t === token }).length

      return memo + (tokenCount / fieldLength * field.boost)
    }, 0)

    this.tokenStore.add(token, { ref: docRef, tf: tf })
  };

  if (emitEvent) this.eventEmitter.emit('add', doc, this)
}

/**
 * Removes a document from the index.
 *
 * To make sure documents no longer show up in search results they can be
 * removed from the index using this method.
 *
 * The document passed only needs to have the same ref property value as the
 * document that was added to the index, they could be completely different
 * objects.
 *
 * A 'remove' event is emitted with the document that has been removed and the index
 * the document has been removed from. This event can be silenced by passing false
 * as the second argument to remove.
 *
 * @param {Object} doc The document to remove from the index.
 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
 * @memberOf Index
 */
lunr.Index.prototype.remove = function (doc, emitEvent) {
  var docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  if (!this.documentStore.has(docRef)) return

  var docTokens = this.documentStore.get(docRef)

  this.documentStore.remove(docRef)

  docTokens.forEach(function (token) {
    this.tokenStore.remove(token, docRef)
  }, this)

  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
}

/**
 * Updates a document in the index.
 *
 * When a document contained within the index gets updated, fields changed,
 * added or removed, to make sure it correctly matched against search queries,
 * it should be updated in the index.
 *
 * This method is just a wrapper around `remove` and `add`
 *
 * An 'update' event is emitted with the document that has been updated and the index.
 * This event can be silenced by passing false as the second argument to update. Only
 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
 * are silenced.
 *
 * @param {Object} doc The document to update in the index.
 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
 * @see Index.prototype.remove
 * @see Index.prototype.add
 * @memberOf Index
 */
lunr.Index.prototype.update = function (doc, emitEvent) {
  var emitEvent = emitEvent === undefined ? true : emitEvent

  this.remove(doc, false)
  this.add(doc, false)

  if (emitEvent) this.eventEmitter.emit('update', doc, this)
}

/**
 * Calculates the inverse document frequency for a token within the index.
 *
 * @param {String} token The token to calculate the idf of.
 * @see Index.prototype.idf
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.idf = function (term) {
  var cacheKey = "@" + term
  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

  var documentFrequency = this.tokenStore.count(term),
      idf = 1

  if (documentFrequency > 0) {
    idf = 1 + Math.log(this.tokenStore.length / documentFrequency)
  }

  return this._idfCache[cacheKey] = idf
}

/**
 * Searches the index using the passed query.
 *
 * Queries should be a string, multiple words are allowed and will lead to an
 * AND based query, e.g. `idx.search('foo bar')` will run a search for
 * documents containing both 'foo' and 'bar'.
 *
 * All query tokens are passed through the same pipeline that document tokens
 * are passed through, so any language processing involved will be run on every
 * query term.
 *
 * Each query term is expanded, so that the term 'he' might be expanded to
 * 'hello' and 'help' if those terms were already included in the index.
 *
 * Matching documents are returned as an array of objects, each object contains
 * the matching document ref, as set for this index, and the similarity score
 * for this document against the query.
 *
 * @param {String} query The query to search the index with.
 * @returns {Object}
 * @see Index.prototype.idf
 * @see Index.prototype.documentVector
 * @memberOf Index
 */
lunr.Index.prototype.search = function (query) {
  var queryTokens = this.pipeline.run(lunr.tokenizer(query)),
      queryVector = new lunr.Vector,
      documentSets = [],
      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

  var hasSomeToken = queryTokens.some(function (token) {
    return this.tokenStore.has(token)
  }, this)

  if (!hasSomeToken) return []

  queryTokens
    .forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length)
          similarityBoost = 1 / Math.log(diff)
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

        // add all the documents that have this key into a set
        Object.keys(self.tokenStore.get(key)).forEach(function (ref) { set.add(ref) })

        return memo.union(set)
      }, new lunr.SortedSet)

      documentSets.push(set)
    }, this)

  var documentSet = documentSets.reduce(function (memo, set) {
    return memo.intersect(set)
  })

  return documentSet
    .map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
    }, this)
    .sort(function (a, b) {
      return b.score - a.score
    })
}

/**
 * Generates a vector containing all the tokens in the document matching the
 * passed documentRef.
 *
 * The vector contains the tf-idf score for each token contained in the
 * document with the passed documentRef.  The vector will contain an element
 * for every token in the indexes corpus, if the document does not contain that
 * token the element will be 0.
 *
 * @param {Object} documentRef The ref to find the document with.
 * @returns {lunr.Vector}
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.documentVector = function (documentRef) {
  var documentTokens = this.documentStore.get(documentRef),
      documentTokensLength = documentTokens.length,
      documentVector = new lunr.Vector

  for (var i = 0; i < documentTokensLength; i++) {
    var token = documentTokens.elements[i],
        tf = this.tokenStore.get(token)[documentRef].tf,
        idf = this.idf(token)

    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
  };

  return documentVector
}

/**
 * Returns a representation of the index ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Index
 */
lunr.Index.prototype.toJSON = function () {
  return {
    version: lunr.version,
    fields: this._fields,
    ref: this._ref,
    documentStore: this.documentStore.toJSON(),
    tokenStore: this.tokenStore.toJSON(),
    corpusTokens: this.corpusTokens.toJSON(),
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Applies a plugin to the current index.
 *
 * A plugin is a function that is called with the index as its context.
 * Plugins can be used to customise or extend the behaviour the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied to the index.
 *
 * The plugin function will be called with the index as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index as its context.
 *
 * Example:
 *
 *     var myPlugin = function (idx, arg1, arg2) {
 *       // `this` is the index to be extended
 *       // apply any extensions etc here.
 *     }
 *
 *     var idx = lunr(function () {
 *       this.use(myPlugin, 'arg1', 'arg2')
 *     })
 *
 * @param {Function} plugin The plugin to apply.
 * @memberOf Index
 */
lunr.Index.prototype.use = function (plugin) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  plugin.apply(this, args)
}
/*!
 * lunr.Store
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Store is a simple key-value store used for storing sets of tokens for
 * documents stored in index.
 *
 * @constructor
 * @module
 */
lunr.Store = function () {
  this.store = {}
  this.length = 0
}

/**
 * Loads a previously serialised store
 *
 * @param {Object} serialisedData The serialised store to load.
 * @returns {lunr.Store}
 * @memberOf Store
 */
lunr.Store.load = function (serialisedData) {
  var store = new this

  store.length = serialisedData.length
  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
    return memo
  }, {})

  return store
}

/**
 * Stores the given tokens in the store against the given id.
 *
 * @param {Object} id The key used to store the tokens against.
 * @param {Object} tokens The tokens to store against the key.
 * @memberOf Store
 */
lunr.Store.prototype.set = function (id, tokens) {
  this.store[id] = tokens
  this.length = Object.keys(this.store).length
}

/**
 * Retrieves the tokens from the store for a given key.
 *
 * @param {Object} id The key to lookup and retrieve from the store.
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.get = function (id) {
  return this.store[id]
}

/**
 * Checks whether the store contains a key.
 *
 * @param {Object} id The id to look up in the store.
 * @returns {Boolean}
 * @memberOf Store
 */
lunr.Store.prototype.has = function (id) {
  return id in this.store
}

/**
 * Removes the value for a key in the store.
 *
 * @param {Object} id The id to remove from the store.
 * @memberOf Store
 */
lunr.Store.prototype.remove = function (id) {
  if (!this.has(id)) return

  delete this.store[id]
  this.length--
}

/**
 * Returns a representation of the store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.toJSON = function () {
  return {
    store: this.store,
    length: this.length
  }
}

/*!
 * lunr.stemmer
 * Copyright (C) 2014 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartaurs.org/~martin
 *
 * @module
 * @param {String} str The string to stem
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  return function (w) {
    var   stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = new RegExp(mgr0);
      if (re.test(fp[1])) {
        re = /.$/;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = new RegExp(s_v);
      if (re2.test(stem)) {
        w = stem;
        re2 = /(at|bl|iz)$/;
        re3 = new RegExp("([^aeiouylsz])\\1$");
        re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        if (re2.test(w)) {  w = w + "e"; }
        else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = /^(.+?[^aeiou])y$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = new RegExp(mgr1);
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      re2 = new RegExp(meq1);
      re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(w) && re2.test(w)) {
      re = /.$/;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  }
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stopWordFilter = function (token) {
  if (lunr.stopWordFilter.stopWords.indexOf(token) === -1) return token
}

lunr.stopWordFilter.stopWords = new lunr.SortedSet
lunr.stopWordFilter.stopWords.length = 119
lunr.stopWordFilter.stopWords.elements = [
  "",
  "a",
  "able",
  "about",
  "across",
  "after",
  "all",
  "almost",
  "also",
  "am",
  "among",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "but",
  "by",
  "can",
  "cannot",
  "could",
  "dear",
  "did",
  "do",
  "does",
  "either",
  "else",
  "ever",
  "every",
  "for",
  "from",
  "get",
  "got",
  "had",
  "has",
  "have",
  "he",
  "her",
  "hers",
  "him",
  "his",
  "how",
  "however",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "least",
  "let",
  "like",
  "likely",
  "may",
  "me",
  "might",
  "most",
  "must",
  "my",
  "neither",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "often",
  "on",
  "only",
  "or",
  "other",
  "our",
  "own",
  "rather",
  "said",
  "say",
  "says",
  "she",
  "should",
  "since",
  "so",
  "some",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "tis",
  "to",
  "too",
  "twas",
  "us",
  "wants",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "would",
  "yet",
  "you",
  "your"
]

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the begining and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token
    .replace(/^\W+/, '')
    .replace(/\W+$/, '')
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.stemmer
 * Copyright (C) 2014 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.TokenStore is used for efficient storing and lookup of the reverse
 * index of token to document ref.
 *
 * @constructor
 */
lunr.TokenStore = function () {
  this.root = { docs: {} }
  this.length = 0
}

/**
 * Loads a previously serialised token store
 *
 * @param {Object} serialisedData The serialised token store to load.
 * @returns {lunr.TokenStore}
 * @memberOf TokenStore
 */
lunr.TokenStore.load = function (serialisedData) {
  var store = new this

  store.root = serialisedData.root
  store.length = serialisedData.length

  return store
}

/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.add = function (token, doc, root) {
  var root = root || this.root,
      key = token[0],
      rest = token.slice(1)

  if (!(key in root)) root[key] = {docs: {}}

  if (rest.length === 0) {
    root[key].docs[doc.ref] = doc
    this.length += 1
    return
  } else {
    return this.add(rest, doc, root[key])
  }
}

/**
 * Checks whether this key is contained within this lunr.TokenStore.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to check for
 * @param {Object} root An optional node at which to start
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.has = function (token) {
  if (!token) return false

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token[i]]) return false

    node = node[token[i]]
  }

  return true
}

/**
 * Retrieve a node from the token store for a given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the node for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @see TokenStore.prototype.get
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.getNode = function (token) {
  if (!token) return {}

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token[i]]) return {}

    node = node[token[i]]
  }

  return node
}

/**
 * Retrieve the documents for a node for the given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.get = function (token, root) {
  return this.getNode(token, root).docs || {}
}

lunr.TokenStore.prototype.count = function (token, root) {
  return Object.keys(this.get(token, root)).length
}

/**
 * Remove the document identified by ref from the token in the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {String} ref The ref of the document to remove from this token.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.remove = function (token, ref) {
  if (!token) return
  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!(token[i] in node)) return
    node = node[token[i]]
  }

  delete node.docs[ref]
}

/**
 * Find all the possible suffixes of the passed token using tokens
 * currently in the store.
 *
 * @param {String} token The token to expand.
 * @returns {Array}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.expand = function (token, memo) {
  var root = this.getNode(token),
      docs = root.docs || {},
      memo = memo || []

  if (Object.keys(docs).length) memo.push(token)

  Object.keys(root)
    .forEach(function (key) {
      if (key === 'docs') return

      memo.concat(this.expand(token + key, memo))
    }, this)

  return memo
}

/**
 * Returns a representation of the token store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.toJSON = function () {
  return {
    root: this.root,
    length: this.length
  }
}


  /**
   * export the module via AMD, CommonnJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory)
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})()

},{}],25:[function(require,module,exports){
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.md5=b()}(this,function(){function a(a,b){var g=a[0],h=a[1],i=a[2],j=a[3];g=c(g,h,i,j,b[0],7,-680876936),j=c(j,g,h,i,b[1],12,-389564586),i=c(i,j,g,h,b[2],17,606105819),h=c(h,i,j,g,b[3],22,-1044525330),g=c(g,h,i,j,b[4],7,-176418897),j=c(j,g,h,i,b[5],12,1200080426),i=c(i,j,g,h,b[6],17,-1473231341),h=c(h,i,j,g,b[7],22,-45705983),g=c(g,h,i,j,b[8],7,1770035416),j=c(j,g,h,i,b[9],12,-1958414417),i=c(i,j,g,h,b[10],17,-42063),h=c(h,i,j,g,b[11],22,-1990404162),g=c(g,h,i,j,b[12],7,1804603682),j=c(j,g,h,i,b[13],12,-40341101),i=c(i,j,g,h,b[14],17,-1502002290),h=c(h,i,j,g,b[15],22,1236535329),g=d(g,h,i,j,b[1],5,-165796510),j=d(j,g,h,i,b[6],9,-1069501632),i=d(i,j,g,h,b[11],14,643717713),h=d(h,i,j,g,b[0],20,-373897302),g=d(g,h,i,j,b[5],5,-701558691),j=d(j,g,h,i,b[10],9,38016083),i=d(i,j,g,h,b[15],14,-660478335),h=d(h,i,j,g,b[4],20,-405537848),g=d(g,h,i,j,b[9],5,568446438),j=d(j,g,h,i,b[14],9,-1019803690),i=d(i,j,g,h,b[3],14,-187363961),h=d(h,i,j,g,b[8],20,1163531501),g=d(g,h,i,j,b[13],5,-1444681467),j=d(j,g,h,i,b[2],9,-51403784),i=d(i,j,g,h,b[7],14,1735328473),h=d(h,i,j,g,b[12],20,-1926607734),g=e(g,h,i,j,b[5],4,-378558),j=e(j,g,h,i,b[8],11,-2022574463),i=e(i,j,g,h,b[11],16,1839030562),h=e(h,i,j,g,b[14],23,-35309556),g=e(g,h,i,j,b[1],4,-1530992060),j=e(j,g,h,i,b[4],11,1272893353),i=e(i,j,g,h,b[7],16,-155497632),h=e(h,i,j,g,b[10],23,-1094730640),g=e(g,h,i,j,b[13],4,681279174),j=e(j,g,h,i,b[0],11,-358537222),i=e(i,j,g,h,b[3],16,-722521979),h=e(h,i,j,g,b[6],23,76029189),g=e(g,h,i,j,b[9],4,-640364487),j=e(j,g,h,i,b[12],11,-421815835),i=e(i,j,g,h,b[15],16,530742520),h=e(h,i,j,g,b[2],23,-995338651),g=f(g,h,i,j,b[0],6,-198630844),j=f(j,g,h,i,b[7],10,1126891415),i=f(i,j,g,h,b[14],15,-1416354905),h=f(h,i,j,g,b[5],21,-57434055),g=f(g,h,i,j,b[12],6,1700485571),j=f(j,g,h,i,b[3],10,-1894986606),i=f(i,j,g,h,b[10],15,-1051523),h=f(h,i,j,g,b[1],21,-2054922799),g=f(g,h,i,j,b[8],6,1873313359),j=f(j,g,h,i,b[15],10,-30611744),i=f(i,j,g,h,b[6],15,-1560198380),h=f(h,i,j,g,b[13],21,1309151649),g=f(g,h,i,j,b[4],6,-145523070),j=f(j,g,h,i,b[11],10,-1120210379),i=f(i,j,g,h,b[2],15,718787259),h=f(h,i,j,g,b[9],21,-343485551),a[0]=l(g,a[0]),a[1]=l(h,a[1]),a[2]=l(i,a[2]),a[3]=l(j,a[3])}function b(a,b,c,d,e,f){return b=l(l(b,a),l(d,f)),l(b<<e|b>>>32-e,c)}function c(a,c,d,e,f,g,h){return b(c&d|~c&e,a,c,f,g,h)}function d(a,c,d,e,f,g,h){return b(c&e|d&~e,a,c,f,g,h)}function e(a,c,d,e,f,g,h){return b(c^d^e,a,c,f,g,h)}function f(a,c,d,e,f,g,h){return b(d^(c|~e),a,c,f,g,h)}function g(b){txt="";var c,d=b.length,e=[1732584193,-271733879,-1732584194,271733878];for(c=64;c<=b.length;c+=64)a(e,h(b.substring(c-64,c)));b=b.substring(c-64);var f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(c=0;c<b.length;c++)f[c>>2]|=b.charCodeAt(c)<<(c%4<<3);if(f[c>>2]|=128<<(c%4<<3),c>55)for(a(e,f),c=0;16>c;c++)f[c]=0;return f[14]=8*d,a(e,f),e}function h(a){var b,c=[];for(b=0;64>b;b+=4)c[b>>2]=a.charCodeAt(b)+(a.charCodeAt(b+1)<<8)+(a.charCodeAt(b+2)<<16)+(a.charCodeAt(b+3)<<24);return c}function i(a){for(var b="",c=0;4>c;c++)b+=m[a>>8*c+4&15]+m[a>>8*c&15];return b}function j(a){for(var b=0;b<a.length;b++)a[b]=i(a[b]);return a.join("")}function k(a){return j(g(a))}function l(a,b){return a+b&4294967295}function l(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}var m="0123456789abcdef".split("");return"5d41402abc4b2a76b9719d911017c592"!=k("hello"),k});
},{}],26:[function(require,module,exports){
"use strict";

// Extends method
// (taken from http://code.jquery.com/jquery-1.9.0.js)
// Populate the class2type map
var class2type = {};

var types = [
  "Boolean", "Number", "String", "Function", "Array",
  "Date", "RegExp", "Object", "Error"
];
for (var i = 0; i < types.length; i++) {
  var typename = types[i];
  class2type["[object " + typename + "]"] = typename.toLowerCase();
}

var core_toString = class2type.toString;
var core_hasOwn = class2type.hasOwnProperty;

function type(obj) {
  if (obj === null) {
    return String(obj);
  }
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[core_toString.call(obj)] || "object" :
    typeof obj;
}

function isWindow(obj) {
  return obj !== null && obj === obj.window;
}

function isPlainObject(obj) {
  // Must be an Object.
  // Because of IE, we also have to check the presence of
  // the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if (!obj || type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
    return false;
  }

  try {
    // Not own constructor property must be Object
    if (obj.constructor &&
      !core_hasOwn.call(obj, "constructor") &&
      !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
      return false;
    }
  } catch ( e ) {
    // IE8,9 Will throw exceptions on certain host objects #9897
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for (key in obj) {}

  return key === undefined || core_hasOwn.call(obj, key);
}


function isFunction(obj) {
  return type(obj) === "function";
}

var isArray = Array.isArray || function (obj) {
  return type(obj) === "array";
};

function extend() {
  // originally extend() was recursive, but this ended up giving us
  // "call stack exceeded", so it's been unrolled to use a literal stack
  // (see https://github.com/pouchdb/pouchdb/issues/2543)
  var stack = [];
  var i = -1;
  var len = arguments.length;
  var args = new Array(len);
  while (++i < len) {
    args[i] = arguments[i];
  }
  var container = {};
  stack.push({args: args, result: {container: container, key: 'key'}});
  var next;
  while ((next = stack.pop())) {
    extendInner(stack, next.args, next.result);
  }
  return container.key;
}

function extendInner(stack, args, result) {
  var options, name, src, copy, copyIsArray, clone,
    target = args[0] || {},
    i = 1,
    length = args.length,
    deep = false,
    numericStringRegex = /\d+/,
    optionsIsArray;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
    deep = target;
    target = args[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && !isFunction(target)) {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if (length === i) {
    /* jshint validthis: true */
    target = this;
    --i;
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = args[i]) != null) {
      optionsIsArray = isArray(options);
      // Extend the base object
      for (name in options) {
        //if (options.hasOwnProperty(name)) {
        if (!(name in Object.prototype)) {
          if (optionsIsArray && !numericStringRegex.test(name)) {
            continue;
          }

          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) ||
              (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];

            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            stack.push({
              args: [deep, clone, copy],
              result: {
                container: target,
                key: name
              }
            });

          // Don't bring in undefined values
          } else if (copy !== undefined) {
            if (!(isArray(options) && isFunction(copy))) {
              target[name] = copy;
            }
          }
        }
      }
    }
  }

  // "Return" the modified object by setting the key
  // on the given container
  result.container[result.key] = target;
}


module.exports = extend;



},{}],27:[function(require,module,exports){
'use strict';

var upsert = require('./upsert');
var utils = require('./utils');
var Promise = utils.Promise;

module.exports = function (opts) {
  var sourceDB = opts.db;
  var viewName = opts.viewName;
  var mapFun = opts.map;
  var reduceFun = opts.reduce;
  var temporary = opts.temporary;
  var saveAs = opts.saveAs;

  // the "undefined" part is for backwards compatibility
  var viewSignature = mapFun.toString() + (reduceFun && reduceFun.toString()) +
    'undefined' + (saveAs || '');

  if (!temporary && sourceDB._cachedViews) {
    var cachedView = sourceDB._cachedViews[viewSignature];
    if (cachedView) {
      return Promise.resolve(cachedView);
    }
  }

  return sourceDB.info().then(function (info) {

    var depDbName = info.db_name + '-';
    if (saveAs) {
      depDbName += saveAs;
    } else {
      depDbName += 'mrview-' + (temporary ? 'temp' : utils.MD5(viewSignature));
    }

    function registerMrView() {
      // save the view name in the source PouchDB so it can be cleaned up if necessary
      // (e.g. when the _design doc is deleted, remove all associated view data)
      function diffFunction(doc) {
        doc.views = doc.views || {};
        var fullViewName = viewName;
        if (fullViewName.indexOf('/') === -1) {
          fullViewName = viewName + '/' + viewName;
        }
        var depDbs = doc.views[fullViewName] = doc.views[fullViewName] || {};
        /* istanbul ignore if */
        if (depDbs[depDbName]) {
          return; // no update necessary
        }
        depDbs[depDbName] = true;
        return doc;
      }

      return upsert(sourceDB, '_local/mrviews', diffFunction);
    }

    function registerDependentDb() {
      return sourceDB.registerDependentDatabase(depDbName).then(function (res) {
        var db = res.db;
        db.auto_compaction = true;
        var view = {
          name: depDbName,
          db: db,
          sourceDB: sourceDB,
          adapter: sourceDB.adapter,
          mapFun: mapFun,
          reduceFun: reduceFun
        };
        return view.db.get('_local/lastSeq')["catch"](function (err) {
          /* istanbul ignore if */
          if (err.status !== 404) {
            throw err;
          }
        }).then(function (lastSeqDoc) {
            view.seq = lastSeqDoc ? lastSeqDoc.seq : 0;
            if (!temporary) {
              sourceDB._cachedViews = sourceDB._cachedViews || {};
              sourceDB._cachedViews[viewSignature] = view;
              view.db.on('destroyed', function () {
                delete sourceDB._cachedViews[viewSignature];
              });
            }
            return view;
          });
      });
    }

    return Promise.resolve().then(function () {
      if (viewName) {
        return registerMrView();
      }
      return Promise.resolve();
    }).then(registerDependentDb);
  });
};

},{"./upsert":35,"./utils":36}],28:[function(require,module,exports){
'use strict';

module.exports = function (func, emit, sum, log, isArray, toJSON) {
  /*jshint evil:true,unused:false */
  return eval("'use strict'; (" + func.replace(/;\s*$/, "") + ");");
};

},{}],29:[function(require,module,exports){
var process=require("__browserify_process");'use strict';

var pouchCollate = require('pouchdb-collate');
var TaskQueue = require('./taskqueue');
var collate = pouchCollate.collate;
var toIndexableString = pouchCollate.toIndexableString;
var normalizeKey = pouchCollate.normalizeKey;
var createView = require('./create-view');
var evalFunc = require('./evalfunc');
var log; 
/* istanbul ignore else */
if ((typeof console !== 'undefined') && (typeof console.log === 'function')) {
  log = Function.prototype.bind.call(console.log, console);
} else {
  log = function () {};
}
var utils = require('./utils');
var Promise = utils.Promise;
var persistentQueues = {};
var tempViewQueue = new TaskQueue();
var CHANGES_BATCH_SIZE = 50;

function parseViewName(name) {
  // can be either 'ddocname/viewname' or just 'viewname'
  // (where the ddoc name is the same)
  return name.indexOf('/') === -1 ? [name, name] : name.split('/');
}

function isGenOne(changes) {
  // only return true if the current change is 1-
  // and there are no other leafs
  return changes.length === 1 && /^1-/.test(changes[0].rev);
}

function tryCode(db, fun, args) {
  // emit an event if there was an error thrown by a map/reduce function.
  // putting try/catches in a single function also avoids deoptimizations.
  try {
    return {
      output : fun.apply(null, args)
    };
  } catch (e) {
    db.emit('error', e);
    return {error : e};
  }
}

function sortByKeyThenValue(x, y) {
  var keyCompare = collate(x.key, y.key);
  return keyCompare !== 0 ? keyCompare : collate(x.value, y.value);
}

function sliceResults(results, limit, skip) {
  skip = skip || 0;
  if (typeof limit === 'number') {
    return results.slice(skip, limit + skip);
  } else if (skip > 0) {
    return results.slice(skip);
  }
  return results;
}

function rowToDocId(row) {
  var val = row.value;
  // Users can explicitly specify a joined doc _id, or it
  // defaults to the doc _id that emitted the key/value.
  var docId = (val && typeof val === 'object' && val._id) || row.id;
  return docId;
}

function createBuiltInError(name) {
  var error = new Error('builtin ' + name +
    ' function requires map values to be numbers' +
    ' or number arrays');
  error.name = 'invalid_value';
  error.status = 500;
  return error;
}

function sum(values) {
  var result = 0;
  for (var i = 0, len = values.length; i < len; i++) {
    var num = values[i];
    if (typeof num !== 'number') {
      if (Array.isArray(num)) {
        // lists of numbers are also allowed, sum them separately
        result = typeof result === 'number' ? [result] : result;
        for (var j = 0, jLen = num.length; j < jLen; j++) {
          var jNum = num[j];
          if (typeof jNum !== 'number') {
            throw createBuiltInError('_sum');
          } else if (typeof result[j] === 'undefined') {
            result.push(jNum);
          } else {
            result[j] += jNum;
          }
        }
      } else { // not array/number
        throw createBuiltInError('_sum');
      }
    } else if (typeof result === 'number') {
      result += num;
    } else { // add number to array
      result[0] += num;
    }
  }
  return result;
}

var builtInReduce = {
  _sum: function (keys, values) {
    return sum(values);
  },

  _count: function (keys, values) {
    return values.length;
  },

  _stats: function (keys, values) {
    // no need to implement rereduce=true, because Pouch
    // will never call it
    function sumsqr(values) {
      var _sumsqr = 0;
      for (var i = 0, len = values.length; i < len; i++) {
        var num = values[i];
        _sumsqr += (num * num);
      }
      return _sumsqr;
    }
    return {
      sum     : sum(values),
      min     : Math.min.apply(null, values),
      max     : Math.max.apply(null, values),
      count   : values.length,
      sumsqr : sumsqr(values)
    };
  }
};

function addHttpParam(paramName, opts, params, asJson) {
  // add an http param from opts to params, optionally json-encoded
  var val = opts[paramName];
  if (typeof val !== 'undefined') {
    if (asJson) {
      val = encodeURIComponent(JSON.stringify(val));
    }
    params.push(paramName + '=' + val);
  }
}

function checkQueryParseError(options, fun) {
  var startkeyName = options.descending ? 'endkey' : 'startkey';
  var endkeyName = options.descending ? 'startkey' : 'endkey';

  if (typeof options[startkeyName] !== 'undefined' &&
    typeof options[endkeyName] !== 'undefined' &&
    collate(options[startkeyName], options[endkeyName]) > 0) {
    throw new QueryParseError('No rows can match your key range, reverse your ' +
        'start_key and end_key or set {descending : true}');
  } else if (fun.reduce && options.reduce !== false) {
    if (options.include_docs) {
      throw new QueryParseError('{include_docs:true} is invalid for reduce');
    } else if (options.keys && options.keys.length > 1 &&
        !options.group && !options.group_level) {
      throw new QueryParseError('Multi-key fetches for reduce views must use {group: true}');
    }
  }
  if (options.group_level) {
    if (typeof options.group_level !== 'number') {
      throw new QueryParseError('Invalid value for integer: "' + options.group_level + '"');
    }
    if (options.group_level < 0) {
      throw new QueryParseError('Invalid value for positive integer: ' +
        '"' + options.group_level + '"');
    }
  }
}

function httpQuery(db, fun, opts) {
  // List of parameters to add to the PUT request
  var params = [];
  var body;
  var method = 'GET';

  // If opts.reduce exists and is defined, then add it to the list
  // of parameters.
  // If reduce=false then the results are that of only the map function
  // not the final result of map and reduce.
  addHttpParam('reduce', opts, params);
  addHttpParam('include_docs', opts, params);
  addHttpParam('attachments', opts, params);
  addHttpParam('limit', opts, params);
  addHttpParam('descending', opts, params);
  addHttpParam('group', opts, params);
  addHttpParam('group_level', opts, params);
  addHttpParam('skip', opts, params);
  addHttpParam('stale', opts, params);
  addHttpParam('conflicts', opts, params);
  addHttpParam('startkey', opts, params, true);
  addHttpParam('endkey', opts, params, true);
  addHttpParam('inclusive_end', opts, params);
  addHttpParam('key', opts, params, true);

  // Format the list of parameters into a valid URI query string
  params = params.join('&');
  params = params === '' ? '' : '?' + params;

  // If keys are supplied, issue a POST request to circumvent GET query string limits
  // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options
  if (typeof opts.keys !== 'undefined') {
    var MAX_URL_LENGTH = 2000;
    // according to http://stackoverflow.com/a/417184/680742,
    // the de facto URL length limit is 2000 characters

    var keysAsString =
      'keys=' + encodeURIComponent(JSON.stringify(opts.keys));
    if (keysAsString.length + params.length + 1 <= MAX_URL_LENGTH) {
      // If the keys are short enough, do a GET. we do this to work around
      // Safari not understanding 304s on POSTs (see pouchdb/pouchdb#1239)
      params += (params[0] === '?' ? '&' : '?') + keysAsString;
    } else {
      method = 'POST';
      if (typeof fun === 'string') {
        body = JSON.stringify({keys: opts.keys});
      } else { // fun is {map : mapfun}, so append to this
        fun.keys = opts.keys;
      }
    }
  }

  // We are referencing a query defined in the design doc
  if (typeof fun === 'string') {
    var parts = parseViewName(fun);
    return db.request({
      method: method,
      url: '_design/' + parts[0] + '/_view/' + parts[1] + params,
      body: body
    });
  }

  // We are using a temporary view, terrible for performance but good for testing
  body = body || {};
  Object.keys(fun).forEach(function (key) {
    if (Array.isArray(fun[key])) {
      body[key] = fun[key];
    } else {
      body[key] = fun[key].toString();
    }
  });
  return db.request({
    method: 'POST',
    url: '_temp_view' + params,
    body: body
  });
}

function defaultsTo(value) {
  return function (reason) {
    /* istanbul ignore else */
    if (reason.status === 404) {
      return value;
    } else {
      throw reason;
    }
  };
}

// returns a promise for a list of docs to update, based on the input docId.
// the order doesn't matter, because post-3.2.0, bulkDocs
// is an atomic operation in all three adapters.
function getDocsToPersist(docId, view, docIdsToChangesAndEmits) {
  var metaDocId = '_local/doc_' + docId;
  var defaultMetaDoc = {_id: metaDocId, keys: []};
  var docData = docIdsToChangesAndEmits[docId];
  var indexableKeysToKeyValues = docData.indexableKeysToKeyValues;
  var changes = docData.changes;

  function getMetaDoc() {
    if (isGenOne(changes)) {
      // generation 1, so we can safely assume initial state
      // for performance reasons (avoids unnecessary GETs)
      return Promise.resolve(defaultMetaDoc);
    }
    return view.db.get(metaDocId)["catch"](defaultsTo(defaultMetaDoc));
  }

  function getKeyValueDocs(metaDoc) {
    if (!metaDoc.keys.length) {
      // no keys, no need for a lookup
      return Promise.resolve({rows: []});
    }
    return view.db.allDocs({
      keys: metaDoc.keys,
      include_docs: true
    });
  }

  function processKvDocs(metaDoc, kvDocsRes) {
    var kvDocs = [];
    var oldKeysMap = {};

    for (var i = 0, len = kvDocsRes.rows.length; i < len; i++) {
      var row = kvDocsRes.rows[i];
      var doc = row.doc;
      if (!doc) { // deleted
        continue;
      }
      kvDocs.push(doc);
      oldKeysMap[doc._id] = true;
      doc._deleted = !indexableKeysToKeyValues[doc._id];
      if (!doc._deleted) {
        var keyValue = indexableKeysToKeyValues[doc._id];
        if ('value' in keyValue) {
          doc.value = keyValue.value;
        }
      }
    }

    var newKeys = Object.keys(indexableKeysToKeyValues);
    newKeys.forEach(function (key) {
      if (!oldKeysMap[key]) {
        // new doc
        var kvDoc = {
          _id: key
        };
        var keyValue = indexableKeysToKeyValues[key];
        if ('value' in keyValue) {
          kvDoc.value = keyValue.value;
        }
        kvDocs.push(kvDoc);
      }
    });
    metaDoc.keys = utils.uniq(newKeys.concat(metaDoc.keys));
    kvDocs.push(metaDoc);

    return kvDocs;
  }

  return getMetaDoc().then(function (metaDoc) {
    return getKeyValueDocs(metaDoc).then(function (kvDocsRes) {
      return processKvDocs(metaDoc, kvDocsRes);
    });
  });
}

// updates all emitted key/value docs and metaDocs in the mrview database
// for the given batch of documents from the source database
function saveKeyValues(view, docIdsToChangesAndEmits, seq) {
  var seqDocId = '_local/lastSeq';
  return view.db.get(seqDocId)[
  "catch"](defaultsTo({_id: seqDocId, seq: 0}))
  .then(function (lastSeqDoc) {
    var docIds = Object.keys(docIdsToChangesAndEmits);
    return Promise.all(docIds.map(function (docId) {
      return getDocsToPersist(docId, view, docIdsToChangesAndEmits);
    })).then(function (listOfDocsToPersist) {
      var docsToPersist = utils.flatten(listOfDocsToPersist);
      lastSeqDoc.seq = seq;
      docsToPersist.push(lastSeqDoc);
      // write all docs in a single operation, update the seq once
      return view.db.bulkDocs({docs : docsToPersist});
    });
  });
}

function getQueue(view) {
  var viewName = typeof view === 'string' ? view : view.name;
  var queue = persistentQueues[viewName];
  if (!queue) {
    queue = persistentQueues[viewName] = new TaskQueue();
  }
  return queue;
}

function updateView(view) {
  return utils.sequentialize(getQueue(view), function () {
    return updateViewInQueue(view);
  })();
}

function updateViewInQueue(view) {
  // bind the emit function once
  var mapResults;
  var doc;

  function emit(key, value) {
    var output = {id: doc._id, key: normalizeKey(key)};
    // Don't explicitly store the value unless it's defined and non-null.
    // This saves on storage space, because often people don't use it.
    if (typeof value !== 'undefined' && value !== null) {
      output.value = normalizeKey(value);
    }
    mapResults.push(output);
  }

  var mapFun;
  // for temp_views one can use emit(doc, emit), see #38
  if (typeof view.mapFun === "function" && view.mapFun.length === 2) {
    var origMap = view.mapFun;
    mapFun = function (doc) {
      return origMap(doc, emit);
    };
  } else {
    mapFun = evalFunc(view.mapFun.toString(), emit, sum, log, Array.isArray, JSON.parse);
  }

  var currentSeq = view.seq || 0;

  function processChange(docIdsToChangesAndEmits, seq) {
    return function () {
      return saveKeyValues(view, docIdsToChangesAndEmits, seq);
    };
  }

  var queue = new TaskQueue();
  // TODO(neojski): https://github.com/daleharvey/pouchdb/issues/1521

  return new Promise(function (resolve, reject) {

    function complete() {
      queue.finish().then(function () {
        view.seq = currentSeq;
        resolve();
      });
    }

    function processNextBatch() {
      view.sourceDB.changes({
        conflicts: true,
        include_docs: true,
        style: 'all_docs',
        since: currentSeq,
        limit: CHANGES_BATCH_SIZE
      }).on('complete', function (response) {
        var results = response.results;
        if (!results.length) {
          return complete();
        }
        var docIdsToChangesAndEmits = {};
        for (var i = 0, l = results.length; i < l; i++) {
          var change = results[i];
          if (change.doc._id[0] !== '_') {
            mapResults = [];
            doc = change.doc;

            if (!doc._deleted) {
              tryCode(view.sourceDB, mapFun, [doc]);
            }
            mapResults.sort(sortByKeyThenValue);

            var indexableKeysToKeyValues = {};
            var lastKey;
            for (var j = 0, jl = mapResults.length; j < jl; j++) {
              var obj = mapResults[j];
              var complexKey = [obj.key, obj.id];
              if (obj.key === lastKey) {
                complexKey.push(j); // dup key+id, so make it unique
              }
              var indexableKey = toIndexableString(complexKey);
              indexableKeysToKeyValues[indexableKey] = obj;
              lastKey = obj.key;
            }
            docIdsToChangesAndEmits[change.doc._id] = {
              indexableKeysToKeyValues: indexableKeysToKeyValues,
              changes: change.changes
            };
          }
          currentSeq = change.seq;
        }
        queue.add(processChange(docIdsToChangesAndEmits, currentSeq));
        if (results.length < CHANGES_BATCH_SIZE) {
          return complete();
        }
        return processNextBatch();
      }).on('error', onError);
      /* istanbul ignore next */
      function onError(err) {
        reject(err);
      }
    }

    processNextBatch();
  });
}

function reduceView(view, results, options) {
  if (options.group_level === 0) {
    delete options.group_level;
  }

  var shouldGroup = options.group || options.group_level;

  var reduceFun;
  if (builtInReduce[view.reduceFun]) {
    reduceFun = builtInReduce[view.reduceFun];
  } else {
    reduceFun = evalFunc(
      view.reduceFun.toString(), null, sum, log, Array.isArray, JSON.parse);
  }

  var groups = [];
  var lvl = options.group_level;
  results.forEach(function (e) {
    var last = groups[groups.length - 1];
    var key = shouldGroup ? e.key : null;

    // only set group_level for array keys
    if (shouldGroup && Array.isArray(key) && typeof lvl === 'number') {
      key = key.length > lvl ? key.slice(0, lvl) : key;
    }

    if (last && collate(last.key[0][0], key) === 0) {
      last.key.push([key, e.id]);
      last.value.push(e.value);
      return;
    }
    groups.push({key: [
      [key, e.id]
    ], value: [e.value]});
  });
  for (var i = 0, len = groups.length; i < len; i++) {
    var e = groups[i];
    var reduceTry = tryCode(view.sourceDB, reduceFun, [e.key, e.value, false]);
    // CouchDB typically just sets the value to null if reduce errors out
    e.value = reduceTry.error ? null : reduceTry.output;
    e.key = e.key[0][0];
  }
  // no total_rows/offset when reducing
  return {rows: sliceResults(groups, options.limit, options.skip)};
}

function queryView(view, opts) {
  return utils.sequentialize(getQueue(view), function () {
    return queryViewInQueue(view, opts);
  })();
}

function queryViewInQueue(view, opts) {
  var totalRows;
  var shouldReduce = view.reduceFun && opts.reduce !== false;
  var skip = opts.skip || 0;
  if (typeof opts.keys !== 'undefined' && !opts.keys.length) {
    // equivalent query
    opts.limit = 0;
    delete opts.keys;
  }

  function fetchFromView(viewOpts) {
    viewOpts.include_docs = true;
    return view.db.allDocs(viewOpts).then(function (res) {
      totalRows = res.total_rows;
      return res.rows.map(function (result) {

        // implicit migration - in older versions of PouchDB,
        // we explicitly stored the doc as {id: ..., key: ..., value: ...}
        // this is tested in a migration test
        /* istanbul ignore next */
        if ('value' in result.doc && typeof result.doc.value === 'object' &&
            result.doc.value !== null) {
          var keys = Object.keys(result.doc.value).sort();
          // this detection method is not perfect, but it's unlikely the user
          // emitted a value which was an object with these 3 exact keys
          var expectedKeys = ['id', 'key', 'value'];
          if (!(keys < expectedKeys || keys > expectedKeys)) {
            return result.doc.value;
          }
        }

        var parsedKeyAndDocId = pouchCollate.parseIndexableString(result.doc._id);
        return {
          key: parsedKeyAndDocId[0],
          id: parsedKeyAndDocId[1],
          value: ('value' in result.doc ? result.doc.value : null)
        };
      });
    });
  }

  function onMapResultsReady(rows) {
    var finalResults;
    if (shouldReduce) {
      finalResults = reduceView(view, rows, opts);
    } else {
      finalResults = {
        total_rows: totalRows,
        offset: skip,
        rows: rows
      };
    }
    if (opts.include_docs) {
      var docIds = utils.uniq(rows.map(rowToDocId));

      return view.sourceDB.allDocs({
        keys: docIds,
        include_docs: true,
        conflicts: opts.conflicts,
        attachments: opts.attachments
      }).then(function (allDocsRes) {
        var docIdsToDocs = {};
        allDocsRes.rows.forEach(function (row) {
          if (row.doc) {
            docIdsToDocs['$' + row.id] = row.doc;
          }
        });
        rows.forEach(function (row) {
          var docId = rowToDocId(row);
          var doc = docIdsToDocs['$' + docId];
          if (doc) {
            row.doc = doc;
          }
        });
        return finalResults;
      });
    } else {
      return finalResults;
    }
  }

  var flatten = function (array) {
    return array.reduce(function (prev, cur) {
      return prev.concat(cur);
    });
  };

  if (typeof opts.keys !== 'undefined') {
    var keys = opts.keys;
    var fetchPromises = keys.map(function (key) {
      var viewOpts = {
        startkey : toIndexableString([key]),
        endkey   : toIndexableString([key, {}])
      };
      return fetchFromView(viewOpts);
    });
    return Promise.all(fetchPromises).then(flatten).then(onMapResultsReady);
  } else { // normal query, no 'keys'
    var viewOpts = {
      descending : opts.descending
    };
    if (typeof opts.startkey !== 'undefined') {
      viewOpts.startkey = opts.descending ?
        toIndexableString([opts.startkey, {}]) :
        toIndexableString([opts.startkey]);
    }
    if (typeof opts.endkey !== 'undefined') {
      var inclusiveEnd = opts.inclusive_end !== false;
      if (opts.descending) {
        inclusiveEnd = !inclusiveEnd;
      }

      viewOpts.endkey = toIndexableString(inclusiveEnd ? [opts.endkey, {}] : [opts.endkey]);
    }
    if (typeof opts.key !== 'undefined') {
      var keyStart = toIndexableString([opts.key]);
      var keyEnd = toIndexableString([opts.key, {}]);
      if (viewOpts.descending) {
        viewOpts.endkey = keyStart;
        viewOpts.startkey = keyEnd;
      } else {
        viewOpts.startkey = keyStart;
        viewOpts.endkey = keyEnd;
      }
    }
    if (!shouldReduce) {
      if (typeof opts.limit === 'number') {
        viewOpts.limit = opts.limit;
      }
      viewOpts.skip = skip;
    }
    return fetchFromView(viewOpts).then(onMapResultsReady);
  }
}

function httpViewCleanup(db) {
  return db.request({
    method: 'POST',
    url: '_view_cleanup'
  });
}

function localViewCleanup(db) {
  return db.get('_local/mrviews').then(function (metaDoc) {
    var docsToViews = {};
    Object.keys(metaDoc.views).forEach(function (fullViewName) {
      var parts = parseViewName(fullViewName);
      var designDocName = '_design/' + parts[0];
      var viewName = parts[1];
      docsToViews[designDocName] = docsToViews[designDocName] || {};
      docsToViews[designDocName][viewName] = true;
    });
    var opts = {
      keys : Object.keys(docsToViews),
      include_docs : true
    };
    return db.allDocs(opts).then(function (res) {
      var viewsToStatus = {};
      res.rows.forEach(function (row) {
        var ddocName = row.key.substring(8);
        Object.keys(docsToViews[row.key]).forEach(function (viewName) {
          var fullViewName = ddocName + '/' + viewName;
          /* istanbul ignore if */
          if (!metaDoc.views[fullViewName]) {
            // new format, without slashes, to support PouchDB 2.2.0
            // migration test in pouchdb's browser.migration.js verifies this
            fullViewName = viewName;
          }
          var viewDBNames = Object.keys(metaDoc.views[fullViewName]);
          // design doc deleted, or view function nonexistent
          var statusIsGood = row.doc && row.doc.views && row.doc.views[viewName];
          viewDBNames.forEach(function (viewDBName) {
            viewsToStatus[viewDBName] = viewsToStatus[viewDBName] || statusIsGood;
          });
        });
      });
      var dbsToDelete = Object.keys(viewsToStatus).filter(function (viewDBName) {
        return !viewsToStatus[viewDBName];
      });
      var destroyPromises = dbsToDelete.map(function (viewDBName) {
        return utils.sequentialize(getQueue(viewDBName), function () {
          return db.constructor.destroy(viewDBName, db.__opts);
        })();
      });
      return Promise.all(destroyPromises).then(function () {
        return {ok: true};
      });
    });
  }, defaultsTo({ok: true}));
}

exports._search_viewCleanup = utils.callbackify(function () {
  var db = this;
  if (db.type() === 'http') {
    return httpViewCleanup(db);
  }
  return localViewCleanup(db);
});

function queryTemp(db, fun, opts) {
  checkQueryParseError(opts, fun);

  var createViewOpts = {
    db : db,
    viewName : 'temp_view/temp_view',
    map : fun.map,
    reduce : fun.reduce,
    temporary : true
  };
  tempViewQueue.add(function () {
    return createView(createViewOpts).then(function (view) {
      function cleanup() {
        return view.db.destroy();
      }
      return utils.fin(updateView(view).then(function () {
        return queryView(view, opts);
      }), cleanup);
    });
  });
  return tempViewQueue.finish();
}

function queryPersistent(db, fun, opts) {

  function onViewReady(view) {
    if (opts.stale === 'ok' || opts.stale === 'update_after') {
      if (opts.stale === 'update_after') {
        process.nextTick(function () {
          updateView(view);
        });
      }
      return queryView(view, opts);
    } else { // stale not ok
      return updateView(view).then(function () {
        return queryView(view, opts);
      });
    }
  }
  if (opts.saveAs) {

    var autoOptions = {
      db: db,
      saveAs: opts.saveAs,
      map: fun.map,
      reduce: fun.reduce
    };
    if (opts.destroy) {
      return createView(autoOptions).then(function (view) {
        return view.db.destroy();
      });
    }
    checkQueryParseError(opts, fun);
    return createView(autoOptions).then(onViewReady);
  } else {
    var fullViewName = fun;
    var parts = parseViewName(fullViewName);
    var designDocName = parts[0];
    var viewName = parts[1];
    return db.get('_design/' + designDocName).then(function (doc) {
      var fun = doc.views && doc.views[viewName];

      if (!fun || typeof fun.map !== 'string') {
        throw new NotFoundError('ddoc ' + designDocName + ' has no view named ' +
          viewName);
      }
      checkQueryParseError(opts, fun);

      var createViewOpts = {
        db : db,
        viewName : fullViewName,
        map : fun.map,
        reduce : fun.reduce
      };
      return createView(createViewOpts).then(onViewReady);
    });
  }
}

function queryPromised(db, fun, opts) {
  if (db.type() === 'http') {
    return httpQuery(db, fun, opts);
  }

  if (typeof fun !== 'string' && !opts.saveAs) {
    // temp_view
    return queryTemp(db, fun, opts);
  } else {
    // persistent view
    return queryPersistent(db, fun, opts);
  }
}

exports._search_query = function (fun, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  opts = utils.extend(true, {}, opts);

  if (typeof fun === 'function') {
    fun = {map : fun};
  }
  if (fun.saveAs) {
    opts.saveAs = fun.saveAs;
    delete fun.saveAs;
  }

  var db = this;
  var promise = Promise.resolve().then(function () {
    return queryPromised(db, fun, opts);
  });
  utils.promisedCallback(promise, callback);
  return promise;
};

function QueryParseError(message) {
  this.status = 400;
  this.name = 'query_parse_error';
  this.message = message;
  this.error = true;
  try {
    Error.captureStackTrace(this, QueryParseError);
  } catch (e) {}
}

utils.inherits(QueryParseError, Error);

function NotFoundError(message) {
  this.status = 404;
  this.name = 'not_found';
  this.message = message;
  this.error = true;
  try {
    Error.captureStackTrace(this, NotFoundError);
  } catch (e) {}
}

utils.inherits(NotFoundError, Error);

},{"./create-view":27,"./evalfunc":28,"./taskqueue":34,"./utils":36,"__browserify_process":4,"pouchdb-collate":30}],30:[function(require,module,exports){
'use strict';

var MIN_MAGNITUDE = -324; // verified by -Number.MIN_VALUE
var MAGNITUDE_DIGITS = 3; // ditto
var SEP = ''; // set to '_' for easier debugging 

var utils = require('./utils');

exports.collate = function (a, b) {

  if (a === b) {
    return 0;
  }

  a = exports.normalizeKey(a);
  b = exports.normalizeKey(b);

  var ai = collationIndex(a);
  var bi = collationIndex(b);
  if ((ai - bi) !== 0) {
    return ai - bi;
  }
  if (a === null) {
    return 0;
  }
  switch (typeof a) {
    case 'number':
      return a - b;
    case 'boolean':
      return a === b ? 0 : (a < b ? -1 : 1);
    case 'string':
      return stringCollate(a, b);
  }
  return Array.isArray(a) ? arrayCollate(a, b) : objectCollate(a, b);
};

// couch considers null/NaN/Infinity/-Infinity === undefined,
// for the purposes of mapreduce indexes. also, dates get stringified.
exports.normalizeKey = function (key) {
  switch (typeof key) {
    case 'undefined':
      return null;
    case 'number':
      if (key === Infinity || key === -Infinity || isNaN(key)) {
        return null;
      }
      return key;
    case 'object':
      var origKey = key;
      if (Array.isArray(key)) {
        var len = key.length;
        key = new Array(len);
        for (var i = 0; i < len; i++) {
          key[i] = exports.normalizeKey(origKey[i]);
        }
      } else if (key instanceof Date) {
        return key.toJSON();
      } else if (key !== null) { // generic object
        key = {};
        for (var k in origKey) {
          if (origKey.hasOwnProperty(k)) {
            var val = origKey[k];
            if (typeof val !== 'undefined') {
              key[k] = exports.normalizeKey(val);
            }
          }
        }
      }
  }
  return key;
};

function indexify(key) {
  if (key !== null) {
    switch (typeof key) {
      case 'boolean':
        return key ? 1 : 0;
      case 'number':
        return numToIndexableString(key);
      case 'string':
        // We've to be sure that key does not contain \u0000
        // Do order-preserving replacements:
        // 0 -> 1, 1
        // 1 -> 1, 2
        // 2 -> 2, 2
        return key
          .replace(/\u0002/g, '\u0002\u0002')
          .replace(/\u0001/g, '\u0001\u0002')
          .replace(/\u0000/g, '\u0001\u0001');
      case 'object':
        var isArray = Array.isArray(key);
        var arr = isArray ? key : Object.keys(key);
        var i = -1;
        var len = arr.length;
        var result = '';
        if (isArray) {
          while (++i < len) {
            result += exports.toIndexableString(arr[i]);
          }
        } else {
          while (++i < len) {
            var objKey = arr[i];
            result += exports.toIndexableString(objKey) +
                exports.toIndexableString(key[objKey]);
          }
        }
        return result;
    }
  }
  return '';
}

// convert the given key to a string that would be appropriate
// for lexical sorting, e.g. within a database, where the
// sorting is the same given by the collate() function.
exports.toIndexableString = function (key) {
  var zero = '\u0000';
  key = exports.normalizeKey(key);
  return collationIndex(key) + SEP + indexify(key) + zero;
};

function parseNumber(str, i) {
  var originalIdx = i;
  var num;
  var zero = str[i] === '1';
  if (zero) {
    num = 0;
    i++;
  } else {
    var neg = str[i] === '0';
    i++;
    var numAsString = '';
    var magAsString = str.substring(i, i + MAGNITUDE_DIGITS);
    var magnitude = parseInt(magAsString, 10) + MIN_MAGNITUDE;
    if (neg) {
      magnitude = -magnitude;
    }
    i += MAGNITUDE_DIGITS;
    while (true) {
      var ch = str[i];
      if (ch === '\u0000') {
        break;
      } else {
        numAsString += ch;
      }
      i++;
    }
    numAsString = numAsString.split('.');
    if (numAsString.length === 1) {
      num = parseInt(numAsString, 10);
    } else {
      num = parseFloat(numAsString[0] + '.' + numAsString[1]);
    }
    if (neg) {
      num = num - 10;
    }
    if (magnitude !== 0) {
      // parseFloat is more reliable than pow due to rounding errors
      // e.g. Number.MAX_VALUE would return Infinity if we did
      // num * Math.pow(10, magnitude);
      num = parseFloat(num + 'e' + magnitude);
    }
  }
  return {num: num, length : i - originalIdx};
}

// move up the stack while parsing
// this function moved outside of parseIndexableString for performance
function pop(stack, metaStack) {
  var obj = stack.pop();

  if (metaStack.length) {
    var lastMetaElement = metaStack[metaStack.length - 1];
    if (obj === lastMetaElement.element) {
      // popping a meta-element, e.g. an object whose value is another object
      metaStack.pop();
      lastMetaElement = metaStack[metaStack.length - 1];
    }
    var element = lastMetaElement.element;
    var lastElementIndex = lastMetaElement.index;
    if (Array.isArray(element)) {
      element.push(obj);
    } else if (lastElementIndex === stack.length - 2) { // obj with key+value
      var key = stack.pop();
      element[key] = obj;
    } else {
      stack.push(obj); // obj with key only
    }
  }
}

exports.parseIndexableString = function (str) {
  var stack = [];
  var metaStack = []; // stack for arrays and objects
  var i = 0;

  while (true) {
    var collationIndex = str[i++];
    if (collationIndex === '\u0000') {
      if (stack.length === 1) {
        return stack.pop();
      } else {
        pop(stack, metaStack);
        continue;
      }
    }
    switch (collationIndex) {
      case '1':
        stack.push(null);
        break;
      case '2':
        stack.push(str[i] === '1');
        i++;
        break;
      case '3':
        var parsedNum = parseNumber(str, i);
        stack.push(parsedNum.num);
        i += parsedNum.length;
        break;
      case '4':
        var parsedStr = '';
        while (true) {
          var ch = str[i];
          if (ch === '\u0000') {
            break;
          }
          parsedStr += ch;
          i++;
        }
        // perform the reverse of the order-preserving replacement
        // algorithm (see above)
        parsedStr = parsedStr.replace(/\u0001\u0001/g, '\u0000')
          .replace(/\u0001\u0002/g, '\u0001')
          .replace(/\u0002\u0002/g, '\u0002');
        stack.push(parsedStr);
        break;
      case '5':
        var arrayElement = { element: [], index: stack.length };
        stack.push(arrayElement.element);
        metaStack.push(arrayElement);
        break;
      case '6':
        var objElement = { element: {}, index: stack.length };
        stack.push(objElement.element);
        metaStack.push(objElement);
        break;
      default:
        throw new Error(
          'bad collationIndex or unexpectedly reached end of input: ' + collationIndex);
    }
  }
};

function arrayCollate(a, b) {
  var len = Math.min(a.length, b.length);
  for (var i = 0; i < len; i++) {
    var sort = exports.collate(a[i], b[i]);
    if (sort !== 0) {
      return sort;
    }
  }
  return (a.length === b.length) ? 0 :
    (a.length > b.length) ? 1 : -1;
}
function stringCollate(a, b) {
  // See: https://github.com/daleharvey/pouchdb/issues/40
  // This is incompatible with the CouchDB implementation, but its the
  // best we can do for now
  return (a === b) ? 0 : ((a > b) ? 1 : -1);
}
function objectCollate(a, b) {
  var ak = Object.keys(a), bk = Object.keys(b);
  var len = Math.min(ak.length, bk.length);
  for (var i = 0; i < len; i++) {
    // First sort the keys
    var sort = exports.collate(ak[i], bk[i]);
    if (sort !== 0) {
      return sort;
    }
    // if the keys are equal sort the values
    sort = exports.collate(a[ak[i]], b[bk[i]]);
    if (sort !== 0) {
      return sort;
    }

  }
  return (ak.length === bk.length) ? 0 :
    (ak.length > bk.length) ? 1 : -1;
}
// The collation is defined by erlangs ordered terms
// the atoms null, true, false come first, then numbers, strings,
// arrays, then objects
// null/undefined/NaN/Infinity/-Infinity are all considered null
function collationIndex(x) {
  var id = ['boolean', 'number', 'string', 'object'];
  var idx = id.indexOf(typeof x);
  //false if -1 otherwise true, but fast!!!!1
  if (~idx) {
    if (x === null) {
      return 1;
    }
    if (Array.isArray(x)) {
      return 5;
    }
    return idx < 3 ? (idx + 2) : (idx + 3);
  }
  if (Array.isArray(x)) {
    return 5;
  }
}

// conversion:
// x yyy zz...zz
// x = 0 for negative, 1 for 0, 2 for positive
// y = exponent (for negative numbers negated) moved so that it's >= 0
// z = mantisse
function numToIndexableString(num) {

  if (num === 0) {
    return '1';
  }

  // convert number to exponential format for easier and
  // more succinct string sorting
  var expFormat = num.toExponential().split(/e\+?/);
  var magnitude = parseInt(expFormat[1], 10);

  var neg = num < 0;

  var result = neg ? '0' : '2';

  // first sort by magnitude
  // it's easier if all magnitudes are positive
  var magForComparison = ((neg ? -magnitude : magnitude) - MIN_MAGNITUDE);
  var magString = utils.padLeft((magForComparison).toString(), '0', MAGNITUDE_DIGITS);

  result += SEP + magString;

  // then sort by the factor
  var factor = Math.abs(parseFloat(expFormat[0])); // [1..10)
  if (neg) { // for negative reverse ordering
    factor = 10 - factor;
  }

  var factorStr = factor.toFixed(20);

  // strip zeros from the end
  factorStr = factorStr.replace(/\.?0+$/, '');

  result += SEP + factorStr;

  return result;
}

},{"./utils":31}],31:[function(require,module,exports){
'use strict';

function pad(str, padWith, upToLength) {
  var padding = '';
  var targetLength = upToLength - str.length;
  while (padding.length < targetLength) {
    padding += padWith;
  }
  return padding;
}

exports.padLeft = function (str, padWith, upToLength) {
  var padding = pad(str, padWith, upToLength);
  return padding + str;
};

exports.padRight = function (str, padWith, upToLength) {
  var padding = pad(str, padWith, upToLength);
  return str + padding;
};

exports.stringLexCompare = function (a, b) {

  var aLen = a.length;
  var bLen = b.length;

  var i;
  for (i = 0; i < aLen; i++) {
    if (i === bLen) {
      // b is shorter substring of a
      return 1;
    }
    var aChar = a.charAt(i);
    var bChar = b.charAt(i);
    if (aChar !== bChar) {
      return aChar < bChar ? -1 : 1;
    }
  }

  if (aLen < bLen) {
    // a is shorter substring of b
    return -1;
  }

  return 0;
};

/*
 * returns the decimal form for the given integer, i.e. writes
 * out all the digits (in base-10) instead of using scientific notation
 */
exports.intToDecimalForm = function (int) {

  var isNeg = int < 0;
  var result = '';

  do {
    var remainder = isNeg ? -Math.ceil(int % 10) : Math.floor(int % 10);

    result = remainder + result;
    int = isNeg ? Math.ceil(int / 10) : Math.floor(int / 10);
  } while (int);


  if (isNeg && result !== '0') {
    result = '-' + result;
  }

  return result;
};
},{}],32:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

var PouchPromise;
/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  PouchPromise = window.PouchDB.utils.Promise;
} else {
  PouchPromise = typeof global.Promise === 'function' ? global.Promise : require('lie');
}

// this is essentially the "update sugar" function from daleharvey/pouchdb#1388
// the diffFun tells us what delta to apply to the doc.  it either returns
// the doc, or false if it doesn't need to do an update after all
function upsertInner(db, docId, diffFun) {
  return new PouchPromise(function (fulfill, reject) {
    if (typeof docId !== 'string') {
      return reject(new Error('doc id is required'));
    }

    db.get(docId, function (err, doc) {
      if (err) {
        /* istanbul ignore next */
        if (err.status !== 404) {
          return reject(err);
        }
        doc = {};
      }
      var newDoc = diffFun(doc);
      if (!newDoc) {
        return fulfill({updated: false, rev: doc._rev});
      }
      newDoc._id = docId;
      newDoc._rev = doc._rev;
      fulfill(tryAndPut(db, newDoc, diffFun));
    });
  });
}

function tryAndPut(db, doc, diffFun) {
  return db.put(doc).then(function (res) {
    return {
      updated: true,
      rev: res.rev
    };
  }, function (err) {
    /* istanbul ignore next */
    if (err.status !== 409) {
      throw err;
    }
    return upsertInner(db, doc._id, diffFun);
  });
}

exports.upsert = function upsert(docId, diffFun, cb) {
  var db = this;
  var promise = upsertInner(db, docId, diffFun);
  if (typeof cb !== 'function') {
    return promise;
  }
  promise.then(function (resp) {
    cb(null, resp);
  }, cb);
};

exports.putIfNotExists = function putIfNotExists(docId, doc, cb) {
  var db = this;

  if (typeof docId !== 'string') {
    cb = doc;
    doc = docId;
    docId = doc._id;
  }

  var diffFun = function (existingDoc) {
    if (existingDoc._rev) {
      return false; // do nothing
    }
    return doc;
  };

  var promise = upsertInner(db, docId, diffFun);
  if (typeof cb !== 'function') {
    return promise;
  }
  promise.then(function (resp) {
    cb(null, resp);
  }, cb);
};


/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports);
}

},{"lie":9}],33:[function(require,module,exports){
/*jshint bitwise:false*/
/*global unescape*/

(function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Browser globals (with support for web workers)
        var glob;
        try {
            glob = window;
        } catch (e) {
            glob = self;
        }

        glob.SparkMD5 = factory();
    }
}(function (undefined) {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////

    /*
     * Fastest md5 implementation around (JKM md5)
     * Credits: Joseph Myers
     *
     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
     * @see http://jsperf.com/md5-shootout/7
     */

    /* this function is much faster,
      so if possible we use it. Some IEs
      are the only ones I know of that
      need the idiotic second function,
      generated by an if clause.  */
    var add32 = function (a, b) {
        return (a + b) & 0xFFFFFFFF;
    },

    cmn = function (q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    },

    ff = function (a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    },

    gg = function (a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    },

    hh = function (a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    },

    ii = function (a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    },

    md5cycle = function (x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
    },

    /* there needs to be support for Unicode here,
       * unless we pretend that we can redefine the MD-5
       * algorithm for multi-byte characters (perhaps
       * by adding every four 16-bit characters and
       * shortening the sum to 32 bits). Otherwise
       * I suggest performing MD-5 as if every character
       * was two bytes--e.g., 0040 0025 = @%--but then
       * how will an ordinary MD-5 sum be matched?
       * There is no way to standardize text to something
       * like UTF-8 before transformation; speed cost is
       * utterly prohibitive. The JavaScript standard
       * itself needs to look at this: it should start
       * providing access to strings as preformed UTF-8
       * 8-bit unsigned value arrays.
       */
    md5blk = function (s) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    },

    md5blk_array = function (a) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }
        return md5blks;
    },

    md51 = function (s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);
        return state;
    },

    md51_array = function (a) {
        var n = a.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }

        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
        // containing the last element of the parent array if the sub array specified starts
        // beyond the length of the parent array - weird.
        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);

        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << ((i % 4) << 3);
        }

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);

        return state;
    },

    hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],

    rhex = function (n) {
        var s = '',
            j;
        for (j = 0; j < 4; j += 1) {
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        }
        return s;
    },

    hex = function (x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
        }
        return x.join('');
    },

    md5 = function (s) {
        return hex(md51(s));
    },



    ////////////////////////////////////////////////////////////////////////////

    /**
     * SparkMD5 OOP implementation.
     *
     * Use this class to perform an incremental md5, otherwise use the
     * static methods instead.
     */
    SparkMD5 = function () {
        // call reset to init the instance
        this.reset();
    };


    // In some cases the fast add32 function cannot be used..
    if (md5('hello') !== '5d41402abc4b2a76b9719d911017c592') {
        add32 = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
    }


    /**
     * Appends a string.
     * A conversion will be applied if an utf8 string is detected.
     *
     * @param {String} str The string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.append = function (str) {
        // converts the string to utf8 bytes if necessary
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        // then append as binary
        this.appendBinary(str);

        return this;
    };

    /**
     * Appends a binary string.
     *
     * @param {String} contents The binary string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.appendBinary = function (contents) {
        this._buff += contents;
        this._length += contents.length;

        var length = this._buff.length,
            i;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._state, md5blk(this._buff.substring(i - 64, i)));
        }

        this._buff = this._buff.substr(i - 64);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     * Use the raw parameter to obtain the raw result instead of the hex one.
     *
     * @param {Boolean} raw True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            i,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = !!raw ? this._state : hex(this._state);

        this.reset();

        return ret;
    };

    /**
     * Finish the final calculation based on the tail.
     *
     * @param {Array}  tail   The tail (will be modified)
     * @param {Number} length The length of the remaining buffer
     */
    SparkMD5.prototype._finish = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(this._state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._state, tail);
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.reset = function () {
        this._buff = "";
        this._length = 0;
        this._state = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other aditional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.prototype.destroy = function () {
        delete this._state;
        delete this._buff;
        delete this._length;
    };


    /**
     * Performs the md5 hash on a string.
     * A conversion will be applied if utf8 string is detected.
     *
     * @param {String}  str The string
     * @param {Boolean} raw True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.hash = function (str, raw) {
        // converts the string to utf8 bytes if necessary
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        var hash = md51(str);

        return !!raw ? hash : hex(hash);
    };

    /**
     * Performs the md5 hash on a binary string.
     *
     * @param {String}  content The binary string
     * @param {Boolean} raw     True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content);

        return !!raw ? hash : hex(hash);
    };

    /**
     * SparkMD5 OOP implementation for array buffers.
     *
     * Use this class to perform an incremental md5 ONLY for array buffers.
     */
    SparkMD5.ArrayBuffer = function () {
        // call reset to init the instance
        this.reset();
    };

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Appends an array buffer.
     *
     * @param {ArrayBuffer} arr The array to be appended
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        // TODO: we could avoid the concatenation here but the algorithm would be more complex
        //       if you find yourself needing extra performance, please make a PR.
        var buff = this._concatArrayBuffer(this._buff, arr),
            length = buff.length,
            i;

        this._length += arr.byteLength;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._state, md5blk_array(buff.subarray(i - 64, i)));
        }

        // Avoids IE10 weirdness (documented above)
        this._buff = (i - 64) < length ? buff.subarray(i - 64) : new Uint8Array(0);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     * Use the raw parameter to obtain the raw result instead of the hex one.
     *
     * @param {Boolean} raw True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i,
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = !!raw ? this._state : hex(this._state);

        this.reset();

        return ret;
    };

    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.reset = function () {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._state = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other aditional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

    /**
     * Concats two array buffers, returning a new one.
     *
     * @param  {ArrayBuffer} first  The first array buffer
     * @param  {ArrayBuffer} second The second array buffer
     *
     * @return {ArrayBuffer} The new array buffer
     */
    SparkMD5.ArrayBuffer.prototype._concatArrayBuffer = function (first, second) {
        var firstLength = first.length,
            result = new Uint8Array(firstLength + second.byteLength);

        result.set(first);
        result.set(new Uint8Array(second), firstLength);

        return result;
    };

    /**
     * Performs the md5 hash on an array buffer.
     *
     * @param {ArrayBuffer} arr The array buffer
     * @param {Boolean}     raw True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr));

        return !!raw ? hash : hex(hash);
    };

    return SparkMD5;
}));

},{}],34:[function(require,module,exports){
'use strict';
/*
 * Simple task queue to sequentialize actions. Assumes callbacks will eventually fire (once).
 */

var Promise = require('./utils').Promise;

function TaskQueue() {
  this.promise = new Promise(function (fulfill) {fulfill(); });
}
TaskQueue.prototype.add = function (promiseFactory) {
  this.promise = this.promise["catch"](function () {
    // just recover
  }).then(function () {
    return promiseFactory();
  });
  return this.promise;
};
TaskQueue.prototype.finish = function () {
  return this.promise;
};

module.exports = TaskQueue;

},{"./utils":36}],35:[function(require,module,exports){
'use strict';

var upsert = require('pouchdb-upsert').upsert;

module.exports = function (db, doc, diffFun) {
  return upsert.apply(db, [doc, diffFun]);
};
},{"pouchdb-upsert":32}],36:[function(require,module,exports){
var process=require("__browserify_process"),global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';
/* istanbul ignore if */
if (typeof global.Promise === 'function') {
  exports.Promise = global.Promise;
} else {
  exports.Promise = require('lie');
}

exports.inherits = require('inherits');
exports.extend = require('pouchdb-extend');
var argsarray = require('argsarray');

exports.promisedCallback = function (promise, callback) {
  if (callback) {
    promise.then(function (res) {
      process.nextTick(function () {
        callback(null, res);
      });
    }, function (reason) {
      process.nextTick(function () {
        callback(reason);
      });
    });
  }
  return promise;
};

exports.callbackify = function (fun) {
  return argsarray(function (args) {
    var cb = args.pop();
    var promise = fun.apply(this, args);
    if (typeof cb === 'function') {
      exports.promisedCallback(promise, cb);
    }
    return promise;
  });
};

// Promise finally util similar to Q.finally
exports.fin = function (promise, cb) {
  return promise.then(function (res) {
    var promise2 = cb();
    if (typeof promise2.then === 'function') {
      return promise2.then(function () {
        return res;
      });
    }
    return res;
  }, function (reason) {
    var promise2 = cb();
    if (typeof promise2.then === 'function') {
      return promise2.then(function () {
        throw reason;
      });
    }
    throw reason;
  });
};

exports.sequentialize = function (queue, promiseFactory) {
  return function () {
    var args = arguments;
    var that = this;
    return queue.add(function () {
      return promiseFactory.apply(that, args);
    });
  };
};

exports.flatten = function (arrs) {
  var res = [];
  for (var i = 0, len = arrs.length; i < len; i++) {
    res = res.concat(arrs[i]);
  }
  return res;
};

// uniq an array of strings, order not guaranteed
// similar to underscore/lodash _.uniq
exports.uniq = function (arr) {
  var map = {};

  for (var i = 0, len = arr.length; i < len; i++) {
    map['$' + arr[i]] = true;
  }

  var keys = Object.keys(map);
  var output = new Array(keys.length);

  for (i = 0, len = keys.length; i < len; i++) {
    output[i] = keys[i].substring(1);
  }
  return output;
};

var crypto = require('crypto');
var Md5 = require('spark-md5');

exports.MD5 = function (string) {
  /* istanbul ignore else */
  if (!process.browser) {
    return crypto.createHash('md5').update(string).digest('hex');
  } else {
    return Md5.hash(string);
  }
};
},{"__browserify_process":4,"argsarray":2,"crypto":3,"inherits":5,"lie":9,"pouchdb-extend":26,"spark-md5":33}],37:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],38:[function(require,module,exports){
var process=require("__browserify_process"),global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

var Promise;
/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  Promise = window.PouchDB.utils.Promise;
} else {
  Promise = typeof global.Promise === 'function' ? global.Promise : require('lie');
}
/* istanbul ignore next */
exports.once = function (fun) {
  var called = false;
  return exports.getArguments(function (args) {
    if (called) {
      console.trace();
      throw new Error('once called  more than once');
    } else {
      called = true;
      fun.apply(this, args);
    }
  });
};
/* istanbul ignore next */
exports.getArguments = function (fun) {
  return function () {
    var len = arguments.length;
    var args = new Array(len);
    var i = -1;
    while (++i < len) {
      args[i] = arguments[i];
    }
    return fun.call(this, args);
  };
};
/* istanbul ignore next */
exports.toPromise = function (func) {
  //create the function we will be returning
  return exports.getArguments(function (args) {
    var self = this;
    var tempCB = (typeof args[args.length - 1] === 'function') ? args.pop() : false;
    // if the last argument is a function, assume its a callback
    var usedCB;
    if (tempCB) {
      // if it was a callback, create a new callback which calls it,
      // but do so async so we don't trap any errors
      usedCB = function (err, resp) {
        process.nextTick(function () {
          tempCB(err, resp);
        });
      };
    }
    var promise = new Promise(function (fulfill, reject) {
      try {
        var callback = exports.once(function (err, mesg) {
          if (err) {
            reject(err);
          } else {
            fulfill(mesg);
          }
        });
        // create a callback for this invocation
        // apply the function in the orig context
        args.push(callback);
        func.apply(self, args);
      } catch (e) {
        reject(e);
      }
    });
    // if there is a callback, call it back
    if (usedCB) {
      promise.then(function (result) {
        usedCB(null, result);
      }, usedCB);
    }
    promise.cancel = function () {
      return this;
    };
    return promise;
  });
};

exports.inherits = require('inherits');
exports.Promise = Promise;

var crypto = require('crypto');
var md5 = require('md5-jkmyers');
exports.MD5 = function (string) {
  /* istanbul ignore if */
  if (process.browser) {
    return md5(string);
  }
  return crypto.createHash('md5').update(string).digest('hex');
};

exports.extend = require('pouchdb-extend');
},{"__browserify_process":4,"crypto":3,"inherits":5,"lie":9,"md5-jkmyers":25,"pouchdb-extend":26}]},{},[1])
;