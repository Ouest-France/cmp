;(function(cn){
    if(!window.localStorage) return;

    // La sdk consent string est requise par le composant sipacmp

    // doc: https://github.com/InteractiveAdvertisingBureau/Consent-String-SDK-JS.git
    // install:
    //      git clone https://github.com/InteractiveAdvertisingBureau/Consent-String-SDK-JS.git
    //      cd Consent-String-SDK-JS
    //      npm install
    //  Compilation "browsing" du consent string sdk : (prérequis npm install -g browserify)
    //      npm run build
    //      browserify ./dist/consent-string.js > ./dist/consent-string-browser.js
    !function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=8)}([function(e,n,t){"use strict";var r,o,i,a,s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=(Array.from||(r=function(e){return"function"==typeof e},o=Math.pow(2,53)-1,i=function(e){var n=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n}(e);return Math.min(Math.max(n,0),o)},a=function(e){var n=e.next();return!Boolean(n.done)&&n}),t(2)),d=u.decodeBitsToIds,c=u.decodeFromBase64;e.exports={decodeConsentString:function(e){var n=c(e),t=n.version,r=n.cmpId,o=n.vendorListVersion,i=n.purposeIdBitString,a=n.maxVendorId,s=n.created,u=n.lastUpdated,l=n.isRange,f=n.defaultConsent,p=n.vendorIdBitString,h=n.vendorRangeList,y=n.cmpVersion,v=n.consentScreen,m=n.consentLanguage,g={version:t,cmpId:r,vendorListVersion:o,allowedPurposeIds:d(i),maxVendorId:a,created:s,lastUpdated:u,cmpVersion:y,consentScreen:v,consentLanguage:m};if(l){var b=h.reduce(function(e,n){for(var t=n.isRange,r=n.startVendorId,o=n.endVendorId,i=t?o:r,a=r;a<=i;a+=1)e[a]=!0;return e},{});g.allowedVendorIds=[];for(var w=0;w<=a;w+=1)(f&&!b[w]||!f&&b[w])&&-1===g.allowedVendorIds.indexOf(w)&&g.allowedVendorIds.push(w)}else g.allowedVendorIds=d(p);return g}}},function(e,n,t){"use strict";var r,o,i,a,s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Array.from||(r=function(e){return"function"==typeof e},o=Math.pow(2,53)-1,i=function(e){var n=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n}(e);return Math.min(Math.max(n,0),o)},a=function(e){var n=e.next();return!Boolean(n.done)&&n});e.exports={versionNumBits:6,vendorVersionMap:{1:{version:1,metadataFields:["version","created","lastUpdated","cmpId","cmpVersion","consentScreen","vendorListVersion"],fields:[{name:"version",type:"int",numBits:6},{name:"created",type:"date",numBits:36},{name:"lastUpdated",type:"date",numBits:36},{name:"cmpId",type:"int",numBits:12},{name:"cmpVersion",type:"int",numBits:12},{name:"consentScreen",type:"int",numBits:6},{name:"consentLanguage",type:"language",numBits:12},{name:"vendorListVersion",type:"int",numBits:12},{name:"purposeIdBitString",type:"bits",numBits:24},{name:"maxVendorId",type:"int",numBits:16},{name:"isRange",type:"bool",numBits:1},{name:"vendorIdBitString",type:"bits",numBits:function(e){return e.maxVendorId},validator:function(e){return!e.isRange}},{name:"defaultConsent",type:"bool",numBits:1,validator:function(e){return e.isRange}},{name:"numEntries",numBits:12,type:"int",validator:function(e){return e.isRange}},{name:"vendorRangeList",type:"list",listCount:function(e){return e.numEntries},validator:function(e){return e.isRange},fields:[{name:"isRange",type:"bool",numBits:1},{name:"startVendorId",type:"int",numBits:16},{name:"endVendorId",type:"int",numBits:16,validator:function(e){return e.isRange}}]}]}}}},function(e,n,t){"use strict";var r,o,i,a,s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=Array.from||(r=function(e){return"function"==typeof e},o=Math.pow(2,53)-1,i=function(e){var n=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n}(e);return Math.min(Math.max(n,0),o)},a=function(e){var n=e.next();return!Boolean(n.done)&&n},function(e){var n,t,o,u=this,d=arguments.length>1?arguments[1]:void 0;if(void 0!==d){if(!r(d))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(n=arguments[2])}var c=function(e,n){if(null!=e&&null!=n){var t=e[n];if(null==t)return;if(!r(t))throw new TypeError(t+" is not a function");return t}}(e,function(e){if(null!=e){if(["string","number","boolean","symbol"].indexOf(void 0===e?"undefined":s(e))>-1)return Symbol.iterator;if("undefined"!=typeof Symbol&&"iterator"in Symbol&&Symbol.iterator in e)return Symbol.iterator;if("@@iterator"in e)return"@@iterator"}}(e));if(void 0!==c){t=r(u)?Object(new u):[];var l,f,p=c.call(e);if(null==p)throw new TypeError("Array.from requires an array-like or iterable object");for(o=0;;){if(!(l=a(p)))return t.length=o,t;f=l.value,t[o]=d?d.call(n,f,o):f,o++}}else{var h=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var y,v=i(h.length);for(t=r(u)?Object(new u(v)):new Array(v),o=0;o<v;)y=h[o],t[o]=d?d.call(n,y,o):y,o++;t.length=v}return t});var d=t(6),c=t(1),l=c.versionNumBits,f=c.vendorVersionMap;function p(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"0",t="",r=0;r<e;r+=1)t+=n;return t}function h(e,n){return p(Math.max(0,n))+e}function y(e,n){return e+p(Math.max(0,n))}function v(e,n){var t="";return"number"!=typeof e||isNaN(e)||(t=parseInt(e,10).toString(2)),n>=t.length&&(t=h(t,n-t.length)),t.length>n&&(t=t.substring(0,n)),t}function m(e){return v(!0===e?1:0,1)}function g(e,n){return e instanceof Date?v(e.getTime()/100,n):v(e,n)}function b(e,n){return v(e.toUpperCase().charCodeAt(0)-65,n)}function w(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:12;return b(e.slice(0,1),n/2)+b(e.slice(1),n/2)}function S(e,n,t){return parseInt(e.substr(n,t),2)}function V(e,n,t){return new Date(100*S(e,n,t))}function I(e,n){return 1===parseInt(e.substr(n,1),2)}function B(e){var n=S(e);return String.fromCharCode(n+65).toLowerCase()}function C(e,n,t){var r=e.substr(n,t);return B(r.slice(0,t/2))+B(r.slice(t/2))}function A(e){var n=e.input,t=e.field,r=t.name,o=t.type,i=t.numBits,a=t.encoder,s=t.validator;if("function"==typeof s&&!s(n))return"";if("function"==typeof a)return a(n);var u="function"==typeof i?i(n):i,d=n[r],c=null===d||void 0===d?"":d;switch(o){case"int":return v(c,u);case"bool":return m(c);case"date":return g(c,u);case"bits":return y(c,u-c.length).substring(0,u);case"list":return c.reduce(function(e,n){return e+x({input:n,fields:t.fields})},"");case"language":return w(c,u);default:throw new Error("ConsentString - Unknown field type "+o+" for encoding")}}function x(e){var n=e.input;return e.fields.reduce(function(e,t){return e+=A({input:n,field:t})},"")}function L(e){var n=e.input,t=e.output,r=e.startPosition,o=e.field,i=o.type,a=o.numBits,s=o.decoder,d=o.validator,c=o.listCount;if("function"==typeof d&&!d(t))return{newPosition:r};if("function"==typeof s)return s(n,t,r);var l="function"==typeof a?a(t):a,f=0;switch("function"==typeof c?f=c(t):"number"==typeof c&&(f=c),i){case"int":return{fieldValue:S(n,r,l)};case"bool":return{fieldValue:I(n,r)};case"date":return{fieldValue:V(n,r,l)};case"bits":return{fieldValue:n.substr(r,l)};case"list":return new Array(f).fill().reduce(function(e){var t=M({input:n,fields:o.fields,startPosition:e.newPosition}),r=t.decodedObject,i=t.newPosition;return{fieldValue:[].concat(function(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return u(e)}(e.fieldValue),[r]),newPosition:i}},{fieldValue:[],newPosition:r});case"language":return{fieldValue:C(n,r,l)};default:throw new Error("ConsentString - Unknown field type "+i+" for decoding")}}function M(e){var n=e.input,t=e.fields,r=e.startPosition,o=void 0===r?0:r;return{decodedObject:t.reduce(function(e,t){var r=t.name,i=t.numBits,a=L({input:n,output:e,startPosition:o,field:t}),s=a.fieldValue,u=a.newPosition;return void 0!==s&&(e[r]=s),void 0!==u?o=u:"number"==typeof i&&(o+=i),e},{}),newPosition:o}}function P(e,n){var t=e.version;if("number"!=typeof t)throw new Error("ConsentString - No version field to encode");if(n[t])return x({input:e,fields:n[t].fields});throw new Error("ConsentString - No definition for version "+t)}e.exports={padRight:y,padLeft:h,encodeField:A,encodeDataToBits:P,encodeIntToBits:v,encodeBoolToBits:m,encodeDateToBits:g,encodeLanguageToBits:w,encodeLetterToBits:b,encodeToBase64:function(e){var n=P(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:f);if(n){for(var t=y(n,7-(n.length+7)%8),r="",o=0;o<t.length;o+=8)r+=String.fromCharCode(parseInt(t.substr(o,8),2));return d.encode(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}return null},decodeBitsToIds:function(e){return e.split("").reduce(function(e,n,t){return"1"===n&&-1===e.indexOf(t+1)&&e.push(t+1),e},[])},decodeBitsToInt:S,decodeBitsToDate:V,decodeBitsToBool:I,decodeBitsToLanguage:C,decodeBitsToLetter:B,decodeFromBase64:function(e,n){for(var t=e;t.length%4!=0;)t+="=";t=t.replace(/-/g,"+").replace(/_/g,"/");for(var r=d.decode(t),o="",i=0;i<r.length;i+=1){var a=r.charCodeAt(i).toString(2);o+=h(a,8-a.length)}return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f,t=S(e,0,l);if("number"!=typeof t)throw new Error("ConsentString - Unknown version number in the string to decode");if(!f[t])throw new Error("ConsentString - Unsupported version "+t+" in the string to decode");return M({input:e,fields:n[t].fields}).decodedObject}(o,n)}}},function(e,n,t){"use strict";var r,o,i,a,s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},d=Array.from||(r=function(e){return"function"==typeof e},o=Math.pow(2,53)-1,i=function(e){var n=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n}(e);return Math.min(Math.max(n,0),o)},a=function(e){var n=e.next();return!Boolean(n.done)&&n},function(e){var n,t,o,u=this,d=arguments.length>1?arguments[1]:void 0;if(void 0!==d){if(!r(d))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(n=arguments[2])}var c=function(e,n){if(null!=e&&null!=n){var t=e[n];if(null==t)return;if(!r(t))throw new TypeError(t+" is not a function");return t}}(e,function(e){if(null!=e){if(["string","number","boolean","symbol"].indexOf(void 0===e?"undefined":s(e))>-1)return Symbol.iterator;if("undefined"!=typeof Symbol&&"iterator"in Symbol&&Symbol.iterator in e)return Symbol.iterator;if("@@iterator"in e)return"@@iterator"}}(e));if(void 0!==c){t=r(u)?Object(new u):[];var l,f,p=c.call(e);if(null==p)throw new TypeError("Array.from requires an array-like or iterable object");for(o=0;;){if(!(l=a(p)))return t.length=o,t;f=l.value,t[o]=d?d.call(n,f,o):f,o++}}else{var h=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var y,v=i(h.length);for(t=r(u)?Object(new u(v)):new Array(v),o=0;o<v;)y=h[o],t[o]=d?d.call(n,y,o):y,o++;t.length=v}return t});function c(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return d(e)}var l=t(2),f=l.encodeToBase64,p=l.padRight;function h(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set,t=Math.max.apply(Math,[0].concat(c(e.map(function(e){return e.id})),c(d(n)))),r="",o=1;o<=t;o+=1)r+=-1!==n.indexOf(o)?"1":"0";return r}function y(e,n){var t=[],r=e.map(function(e){return e.id});return e.reduce(function(o,i,a){var s=i.id;if(-1!==n.indexOf(s)&&t.push(s),(-1===n.indexOf(s)||a===e.length-1||-1===r.indexOf(s+1))&&t.length){var u=t.shift(),d=t.pop();return t=[],[].concat(c(o),[{isRange:"number"==typeof d,startVendorId:u,endVendorId:d}])}return o},[])}e.exports={convertVendorsToRanges:y,encodeConsentString:function(e){var n=e.maxVendorId,t=e.vendorList,r=void 0===t?{}:t,o=e.allowedPurposeIds,i=e.allowedVendorIds,a=r.vendors,s=void 0===a?[]:a,d=r.purposes,c=void 0===d?[]:d;n||(n=0,s.forEach(function(e){e.id>n&&(n=e.id)}));var l=f(u({},e,{maxVendorId:n,purposeIdBitString:h(c,o),isRange:!1,vendorIdBitString:function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],t="",r=1;r<=e;r+=1)t+=-1!==n.indexOf(r)?"1":"0";return p(t,Math.max(0,e-t.length))}(n,i)})),v=y(s,i),m=f(u({},e,{maxVendorId:n,purposeIdBitString:h(c,o),isRange:!0,defaultConsent:!1,numEntries:v.length,vendorRangeList:v}));return l.length<m.length?l:m}}},function(e,n){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,n){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,n,t){(function(e,r){var o;/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */!function(i){var a="object"==typeof n&&n,s=("object"==typeof e&&e&&e.exports,"object"==typeof r&&r);s.global!==s&&s.window;var u=function(e){this.message=e};(u.prototype=new Error).name="InvalidCharacterError";var d=function(e){throw new u(e)},c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l=/[\t\n\f\r ]/g,f={encode:function(e){e=String(e),/[^\0-\xFF]/.test(e)&&d("The string to be encoded contains characters outside of the Latin1 range.");for(var n,t,r,o,i=e.length%3,a="",s=-1,u=e.length-i;++s<u;)n=e.charCodeAt(s)<<16,t=e.charCodeAt(++s)<<8,r=e.charCodeAt(++s),a+=c.charAt((o=n+t+r)>>18&63)+c.charAt(o>>12&63)+c.charAt(o>>6&63)+c.charAt(63&o);return 2==i?(n=e.charCodeAt(s)<<8,t=e.charCodeAt(++s),a+=c.charAt((o=n+t)>>10)+c.charAt(o>>4&63)+c.charAt(o<<2&63)+"="):1==i&&(o=e.charCodeAt(s),a+=c.charAt(o>>2)+c.charAt(o<<4&63)+"=="),a},decode:function(e){var n=(e=String(e).replace(l,"")).length;n%4==0&&(n=(e=e.replace(/==?$/,"")).length),(n%4==1||/[^+a-zA-Z0-9/]/.test(e))&&d("Invalid character: the string to be decoded is not correctly encoded.");for(var t,r,o=0,i="",a=-1;++a<n;)r=c.indexOf(e.charAt(a)),t=o%4?64*t+r:r,o++%4&&(i+=String.fromCharCode(255&t>>(-2*o&6)));return i},version:"0.1.0"};void 0===(o=function(){return f}.call(n,t,n,e))||(e.exports=o)}()}).call(this,t(5)(e),t(4))},function(e,n,t){"use strict";var r,o,i,a,s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();Array.from||(r=function(e){return"function"==typeof e},o=Math.pow(2,53)-1,i=function(e){var n=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n}(e);return Math.min(Math.max(n,0),o)},a=function(e){var n=e.next();return!Boolean(n.done)&&n});var d=t(3).encodeConsentString,c=t(0).decodeConsentString,l=t(1).vendorVersionMap,f=/^[a-z]{2}$/,p=function(){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.created=new Date,this.lastUpdated=new Date,this.version=1,this.vendorList=null,this.vendorListVersion=null,this.cmpId=null,this.cmpVersion=null,this.consentScreen=null,this.consentLanguage=null,this.allowedPurposeIds=[],this.allowedVendorIds=[],n&&Object.assign(this,c(n))}return u(e,[{key:"getConsentString",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(!this.vendorList)throw new Error("ConsentString - A vendor list is required to encode a consent string");return!0===e&&(this.lastUpdated=new Date),d({version:this.getVersion(),vendorList:this.vendorList,allowedPurposeIds:this.allowedPurposeIds,allowedVendorIds:this.allowedVendorIds,created:this.created,lastUpdated:this.lastUpdated,cmpId:this.cmpId,cmpVersion:this.cmpVersion,consentScreen:this.consentScreen,consentLanguage:this.consentLanguage,vendorListVersion:this.vendorListVersion})}},{key:"getMetadataString",value:function(){return d({version:this.getVersion(),created:this.created,lastUpdated:this.lastUpdated,cmpId:this.cmpId,cmpVersion:this.cmpVersion,consentScreen:this.consentScreen,vendorListVersion:this.vendorListVersion})}},{key:"getVersion",value:function(){return this.version}},{key:"getVendorListVersion",value:function(){return this.vendorListVersion}},{key:"setGlobalVendorList",value:function(e){if("object"!==(void 0===e?"undefined":s(e)))throw new Error("ConsentString - You must provide an object when setting the global vendor list");if(!e.vendorListVersion||!Array.isArray(e.purposes)||!Array.isArray(e.vendors))throw new Error("ConsentString - The provided vendor list does not respect the schema from the IAB EU’s GDPR Consent and Transparency Framework");this.vendorList={vendorListVersion:e.vendorListVersion,lastUpdated:e.lastUpdated,purposes:e.purposes,features:e.features,vendors:e.vendors.slice(0).sort(function(e,n){return e.id<n.id?-1:1})},this.vendorListVersion=e.vendorListVersion}},{key:"setCmpId",value:function(e){this.cmpId=e}},{key:"getCmpId",value:function(){return this.cmpId}},{key:"setCmpVersion",value:function(e){this.cmpVersion=e}},{key:"getCmpVersion",value:function(){return this.cmpVersion}},{key:"setConsentScreen",value:function(e){this.consentScreen=e}},{key:"getConsentScreen",value:function(){return this.consentScreen}},{key:"setConsentLanguage",value:function(e){if(!1===f.test(e))throw new Error("ConsentString - The consent language must be a two-letter ISO639-1 code (en, fr, de, etc.)");this.consentLanguage=e}},{key:"getConsentLanguage",value:function(){return this.consentLanguage}},{key:"setPurposesAllowed",value:function(e){this.allowedPurposeIds=e}},{key:"getPurposesAllowed",value:function(){return this.allowedPurposeIds}},{key:"setPurposeAllowed",value:function(e,n){var t=this.allowedPurposeIds.indexOf(e);!0===n?-1===t&&this.allowedPurposeIds.push(e):!1===n&&-1!==t&&this.allowedPurposeIds.splice(t,1)}},{key:"isPurposeAllowed",value:function(e){return-1!==this.allowedPurposeIds.indexOf(e)}},{key:"setVendorsAllowed",value:function(e){this.allowedVendorIds=e}},{key:"getVendorsAllowed",value:function(){return this.allowedVendorIds}},{key:"setVendorAllowed",value:function(e,n){var t=this.allowedVendorIds.indexOf(e);!0===n?-1===t&&this.allowedVendorIds.push(e):!1===n&&-1!==t&&this.allowedVendorIds.splice(t,1)}},{key:"isVendorAllowed",value:function(e){return-1!==this.allowedVendorIds.indexOf(e)}}],[{key:"decodeMetadataString",value:function(e){var n=c(e),t={};return l[n.version].metadataFields.forEach(function(e){t[e]=n[e]}),t}}]),e}();e.exports={ConsentString:p}},function(e,n,t){"use strict";var r,o,i,a,s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=(Array.from||(r=function(e){return"function"==typeof e},o=Math.pow(2,53)-1,i=function(e){var n=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n}(e);return Math.min(Math.max(n,0),o)},a=function(e){var n=e.next();return!Boolean(n.done)&&n}),t(7).ConsentString),d=t(0).decodeConsentString,c=t(3).encodeConsentString;e.exports={ConsentString:u,decodeConsentString:d,encodeConsentString:c};window.__cmpConsentString=u;}]);

    // lib throttle https://lodash.com/docs#throttle
    !function o(f,u,a){function c(e,t){if(!u[e]){if(!f[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(l)return l(e,!0);var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}var i=u[e]={exports:{}};f[e][0].call(i.exports,function(t){return c(f[e][1][t]||t)},i,i.exports,o,f,u,a)}return u[e].exports}for(var l="function"==typeof require&&require,t=0;t<a.length;t++)c(a[t]);return c}({1:[function(t,v,e){(function(t){var m="Expected a function",o=NaN,f="[object Symbol]",u=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,l=/^0o[0-7]+$/i,p=parseInt,e="object"==typeof t&&t&&t.Object===Object&&t,n="object"==typeof self&&self&&self.Object===Object&&self,r=e||n||Function("return this")(),s=Object.prototype.toString,w=Math.max,h=Math.min,x=function(){return r.Date.now()};function d(r,i,t){var o,f,u,a,c,l,p=0,s=!1,d=!1,e=!0;if("function"!=typeof r)throw new TypeError(m);function v(t){var e=o,n=f;return o=f=void 0,p=t,a=r.apply(n,e)}function y(t){var e=t-l;return void 0===l||i<=e||e<0||d&&u<=t-p}function b(){var t,e,n=x();if(y(n))return g(n);c=setTimeout(b,(e=i-((t=n)-l),d?h(e,u-(t-p)):e))}function g(t){return c=void 0,e&&o?v(t):(o=f=void 0,a)}function n(){var t,e=x(),n=y(e);if(o=arguments,f=this,l=e,n){if(void 0===c)return p=t=l,c=setTimeout(b,i),s?v(t):a;if(d)return c=setTimeout(b,i),v(l)}return void 0===c&&(c=setTimeout(b,i)),a}return i=O(i)||0,j(t)&&(s=!!t.leading,u=(d="maxWait"in t)?w(O(t.maxWait)||0,i):u,e="trailing"in t?!!t.trailing:e),n.cancel=function(){void 0!==c&&clearTimeout(c),o=l=f=c=void(p=0)},n.flush=function(){return void 0===c?a:g(x())},n}function i(t,e,n){var r=!0,i=!0;if("function"!=typeof t)throw new TypeError(m);return j(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),d(t,e,{leading:r,maxWait:e,trailing:i})}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function O(t){if("number"==typeof t)return t;if("symbol"==typeof(e=t)||(n=e)&&"object"==typeof n&&s.call(e)==f)return o;var e,n;if(j(t)){var r="function"==typeof t.valueOf?t.valueOf():t;t=j(r)?r+"":r}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(u,"");var i=c.test(t);return i||l.test(t)?p(t.slice(2),i?2:8):a.test(t)?o:+t}v.exports=i,window._throttle=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);

    var _local_consent = function(name, arg) {
        // Set
        if(arg != undefined) {
            window.localStorage.setItem(name, JSON.stringify(arg));
            return arg;
        // Get
        } else {
            return JSON.parse(window.localStorage.getItem(name));
        }
    };
    var _consent = function(arg){
        // Set consent
        if(arg != undefined) {
            var d = new Date();
            d.setTime(d.getTime() + 34128000000); // 13 mois
            document.cookie = cn + '_consent' + "=" + _consent_family(arg) + ";" + "expires="+ d.toUTCString() + ";path=/";
        }
        return _local_consent(cn+'-consent', arg)
    };
    var _consent_token = function(arg){
        return _local_consent(cn+'-consent-token', arg)
    };
    var _consent_uuid = function(arg){
        var uuid = _local_consent(cn+'-consent-uuid');

        if(!uuid) {
            uuid = '';
            var i, random;
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    uuid += '-';
                }
                uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }
            _local_consent(cn+'-consent-uuid', uuid);
        }

        return uuid;
    };
    var _consent_family = function(arg){
        var obj = {
            "functionning": "000001",
            "social":       "000010",
            "advertising":  "000100",
            "analytics":    "001000",
            "family":       "010000",
            "family_2":     "100000",
        }, family = 0;

        // Encode family
        if("object" == typeof arg) {
            Object.keys(obj).map(function(key, index) {
                family += arg[key] == undefined || arg[key] ? obj[key] >>> 0 : 0;
            });
            return parseInt( family, 2 );
        // Decode family
        } else if("number" == typeof arg) {
            arg = arg >>> 0;

            return {
                "functionning": arg & obj.functionning >>> 0 ? true : false,
                "social":       arg & obj.social >>> 0 ? true : false,
                "advertising":  arg & obj.advertising >>> 0 ? true : false,
                "analytics":    arg & obj.analytics >>> 0 ? true : false,
                "family":       arg & obj.family >>> 0 ? true : false,
                "family_2":     arg & obj.family_2 >>> 0 ? true : false,
            }
        }
        // else {
        //     var ret = {}
        //     Object.keys(obj).map(function(key, index) {
        //         ret[key] = false;
        //     });
        //     ret["family"] = ret["family_2"] = true;
        //     return ret;
        // }
    };
    var _init = function (will_revalidate) {
        if(!vendorlist) return;

        var consentData = window.localStorage.getItem(cn+'-consent-data');

        if(!consentData || will_revalidate) {
            // Si le consentement est nouveau ou a moins d'une semaine on revalide
            // console.log('revalidate')
            consentData = new __cmpConsentString();
            // Modify the consent data
            consentData.setCmpId(0);
            consentData.setConsentScreen(1);
            consentData.setCmpVersion(1);
            consentData.setGlobalVendorList(vendorlist);
            consentData.setConsentLanguage('fr');

            will_revalidate = true;

        } else {
            consentData = new __cmpConsentString(consentData);
            consentData.setGlobalVendorList(vendorlist);
        }
        var consent = _consent();
            consent = consent ? consent : _consent_family(63);
        consentData.setPurposesAllowed(consent.functionning ? vendorlist.purposes.map(function(purpose){return purpose.id}) : []);
        consentData.setVendorsAllowed(consent.functionning ? vendorlist.vendors.map(function(vendor){return vendor.id}) : []);


        if(will_revalidate) {
            // console.log('computeConsentString', consentData);
            window.localStorage.setItem(cn+'-consent-data', consentData.getConsentString());
        }

        // Prépare les appels stockés avant le chargement de la cmp
        var _cmpStub_commandQueue = window.__cmp.commandQueue;
        var _config = (window.__cmp && window.__cmp.config ? window.__cmp.config : {});
        window.dataLayer = window.dataLayer || [];

        // CMP IAB
        window.__cmp = function(command, parameter, cb) {
            var cmp = {
                'getVendorConsents': function(parameter, callback){
                    // console.log('getVendorConsents', parameter);

                    var vendorIds = parameter || [];
                    var vendorConsents = {};
                    consentData.vendorList.vendors.forEach(function(vendor) {
                    if (!vendorIds.length || vendorIds.indexOf(vendor.id) !== -1)
                        vendorConsents[vendor.id] = consentData.allowedVendorIds.indexOf(vendor.id) !== -1
                    });
                    callback({
                        metadata: consentData.getMetadataString(),
                        gdprApplies: true,
                        hasGlobalScope: true,
                        purposeConsents: consentData.getPurposesAllowed(),
                        vendorConsents: vendorConsents
                    }, true)
                },
                'getConsentData': function(parameter, callback){
                    // console.log('getConsentData', parameter);

                    callback({
                        consentData: consentData.getConsentString(),
                        gdprApplies: true,
                        hasGlobalScope: true
                    }, true)
                },
                'ping': function(parameter, callback){
                    // console.log('ping', parameter);

                    callback({
                        gdprAppliesGlobally: true,
                        cmpLoaded: true
                    }, true);
                },
                'getUserData': function(parameter, callback){

                    callback({'consentData': consentData.getConsentString(), 'uuid': _consent_uuid()}, true);
                }
            };
            return cmp[command](parameter, cb);
        };
        // Surcharge de la fonction message
        __cmp.receiveMessage = function(event) {
            var data = event && event.data && event.data.__cmpCall;
            // Si c'est un message cmp (dont l'objet __cmpCall éxiste)
            if (data) {
                __cmp({
                    command: data.command,
                    parameter: data.parameter,
                    callback: function(retValue, success) {
                        var returnMsg = {"__cmpReturn": {
                            "returnValue": retValue,
                            "success": success,
                            "callId": data.callId
                        }};
                        event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
                    }
                });
            }
        };
        __cmp.consent = _consent;
        __cmp._create_banner = function() {
            if(__cmp.div_banner) return;
            // CSS
            var styleEl = document.createElement('style');
            styleEl.innerHTML = '.scmp-popin,.scmp-popin .scmp-actions,.scmp-popin .scmp-overlay{position:fixed;bottom:0;left:0;right:0}body.scmp-no-scroll{overflow:hidden}.scmp-hidden{display:none!important}.scmp-popin{max-height:100vh}.scmp-popin .scmp-overlay{background:rgba(0,0,0,.6);top:0;z-index:-1}.scmp-popin .scmp-content{background:#fff;max-height:100vh;overflow:auto;padding:20px 20px 66px;box-shadow:0 0 8px 0 rgba(135,135,135,.5)}.scmp-popin *{font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666;box-sizing:border-box}.scmp-popin a,.scmp-popin a:hover{color:#666}.scmp-popin .scmp-title{font-weight:800;font-size:16px;color:#333;margin-bottom:12px}.scmp-text{line-height:1.3}.scmp-popin .scmp-strong{font-weight:800}.scmp-popin .scmp-margin-bottom-small{margin-bottom:7px}.scmp-popin .scmp-margin-bottom{margin-bottom:18px}.scmp-popin .scmp-actions{padding:20px;background:#fff}.scmp-popin .scmp-button{text-decoration:underline;background:#fff;border:0;display:inline-block;text-align:center;font-size:14px;height:34px;line-height:34px;padding:0 20px}.scmp-popin .scmp-button:hover{text-decoration:none;cursor:pointer}.scmp-popin .scmp-button-n1{color:#fff;font-weight:700;text-decoration:none;border-radius:3px;background:#e2001a}.scmp-popin .scmp-button-n1:focus,.scmp-popin .scmp-button-n1:hover{text-decoration:none;color:#fff;background:#b40015}.scmp-popin .scmp-list-parameters{display:table;width:100%;padding:0;margin:12px 0 18px;list-style:none}.scmp-popin .scmp-list-parameters li{padding:22px 55px 10px 0;position:relative;border-bottom:1px solid #d4d4d4}.scmp-popin .scmp-list-parameters.retention li{display:none}.scmp-popin .scmp-list-parameters.retention li.retention{display:block}.scmp-popin .scmp-list-parameters li:last-child{border-bottom:none}.scmp-popin .scmp-list-parameters [type=checkbox]{position:absolute;left:-9999px}.scmp-popin .scmp-list-parameters label{font-weight:800;color:#333;cursor:pointer;display:block;position:absolute;top:8px;right:0;bottom:5px;left:0}.scmp-popin .scmp-list-parameters label:after,.scmp-popin .scmp-list-parameters label:before{content:"";display:block;position:absolute;top:50%;transform:translateY(-50%);border-radius:100px}.scmp-popin .scmp-list-parameters label:before{width:40px;height:24px;right:0;background:#3AAA35}.scmp-popin .scmp-list-parameters [type=checkbox]:not(:checked)+label:before{background:#878787}.scmp-popin .scmp-list-parameters label:after{width:20px;height:20px;right:2px;background:#fff;transition:right .3s ease}.scmp-popin .scmp-list-parameters [type=checkbox]:not(:checked)+label:after{right:18px}.scmp-popin .scmp-list-parameters [type=checkbox]:disabled+label:before{opacity:.5}@media screen and (min-width:45em){.scmp-popin *{font-size:14px}.scmp-popin .scmp-title{font-size:18px}}@media screen and (min-width:45em) and (orientation :landscape){.scmp-popin .scmp-max-width{max-width:620px}}@media screen and (min-width:60em){.scmp-popin .scmp-content{padding:30px 0}.scmp-container{width:960px;margin-right:auto;margin-left:auto;padding-left:40px;padding-right:10px}.scmp-max-width{max-width:740px}.scmp-popin .scmp-margin-bottom{margin-bottom:29px}.scmp-popin .scmp-actions{position:static;padding:23px 0 0}.scmp-popin .scmp-button{font-size:16px;height:44px;line-height:44px;padding:0 33px}.scmp-popin .scmp-list-parameters{margin:20px 0 0}.scmp-popin .scmp-list-parameters li{padding-top:25px}}@media screen and (min-width:80em){.scmp-popin .scmp-container{width:1280px;padding-left:65px}.scmp-popin .scmp-list-parameters li{padding-right:65px}.scmp-popin .scmp-list-parameters label:before{width:50px;height:26px}.scmp-popin .scmp-list-parameters [type=checkbox]:checked+label:after{right:3px}.scmp-popin .scmp-list-parameters [type=checkbox]:not(:checked)+label:after{right:27px}}@media screen and (max-width:21em) and (max-height:41.563em){.scmp-popin.scmp-parameters-open .scmp-actions{box-shadow:0 0 8px 0 rgba(135,135,135,.5)}}@media screen and (max-height:29.125em){.scmp-popin.scmp-parameters-open .scmp-actions{box-shadow:0 0 8px 0 rgba(135,135,135,.5)}}';
            document.head.appendChild(styleEl);

            // HTML
            __cmp.div_banner = document.createElement('div');
            var html = '<div role="dialog" id="scmp-popin" class="scmp-popin"> <div id="scmp-overlay" class="scmp-overlay scmp-hidden"></div><div class="scmp-content"> <div class="scmp-container"> <div id="scmp-header"> <div class="scmp-title scmp-max-width">Ce site utilise des cookies.</div><div class="scmp-text scmp-margin-bottom-small scmp-max-width">##scmp-text##</div></div><div id="scmp-parameters" class="scmp-hidden"> <div id="scmp-description"> <div class="scmp-text scmp-margin-bottom-small scmp-max-width">Les cookies garantissent une expérience de navigation optimale.</div><div class="scmp-margin-bottom-small scmp-max-width">Cliquez sur chaque catégorie pour activer ou désactiver l’utilisation des cookies. Le bouton de couleur indique si les cookies sont actifs (vert) ou inactifs (gris).</div></div><div id="scmp-confirmation" class="scmp-hidden"> <div class="scmp-title scmp-margin-bottom-small scmp-max-width">Êtes-vous sûr de vouloir refuser les cookies publicitaires&nbsp;?</div><div class="scmp-margin-bottom-small scmp-max-width">En refusant ces cookies, nous ne pourrons pas personnaliser la publicité qui sera présentée sur le site, qui sera ainsi moins pertinente.</div></div><ul class="scmp-list-parameters scmp-max-width"> <li> <input type="checkbox" id="fonctionnement" data-consent-family="functionning" value="fonctionnement" disabled checked> <label for="fonctionnement">Fontionnement</label> <div>Ces cookies garantissent le fonctionnement du site et permettent son optimisation.</div></li><li> <input type="checkbox" id="webanalytics" data-consent-family="analytics" value="webanalytics" checked> <label for="webanalytics">Web Analytics</label> <div>Ces cookies permettent le suivi anonyme et agrégé des outils de Web Analytics.</div></li><li> <input type="checkbox" id="social" data-consent-family="social" value="social" checked> <label for="social">Social</label> <div>Ces cookies vous permettent d’interagir avec les modules sociaux présents sur le site.</div></li><li class="retention"> <input type="checkbox" id="publicite" data-consent-family="advertising" value="publicite" checked> <label for="publicite">Publicité</label> <div>Ces cookies permettent de mieux cibler les publicités qui vous sont proposées sur Internet.</div></li></ul> </div><div class="scmp-actions"> <button id="scmp-btn-validation" href="javascript:;" role="button" class="scmp-button scmp-button-n1">J’accepte</button> <button id="scmp-btn-parameters" href="javascript:;" class="scmp-button">Je paramètre</button> </div></div></div></div>';
            html = html.replace('##scmp-text##', _config.text || 'En poursuivant votre navigaton sur ce site, vous acceptez notre <a href="https://www.ouest-france.fr/politiquedeprotectiondesdonneespersonnelles/" target="_blank" data-trkcmp="lien données personnelles">politique de protection des données personnelles</a> et notre <a href="https://www.ouest-france.fr/politiquedeprotectiondesdonneespersonnelles/" target="_blank" data-trkcmp="lien cookies">politique cookies</a>, ainsi que le dépôt de cookies et technologies similaires destinés à réaliser des statistiques visant à évaluer le trafic et l’utilisation des services sur notre site, vous proposer des services éditoriaux et des publicités adaptés à vos centres d’intérêts et vous permettre de partager des contenus sur les réseaux sociaux.')
            __cmp.div_banner.innerHTML = html;
            document.body.appendChild(__cmp.div_banner);

            // set checkbox
            document.querySelectorAll('input[data-consent-family]').forEach(function(el){
                el.setAttribute('checked', consent[el.getAttribute('data-consent-family')]);
                el.checked = consent[el.getAttribute('data-consent-family')];
            });

            // Gestion affichage parametres
            document.querySelector('#scmp-btn-parameters').addEventListener('click', function(){

                document.querySelector('#scmp-popin').classList.add('scmp-parameters-open');

                [].map.call(document.querySelectorAll('#scmp-parameters, #scmp-overlay, #scmp-btn-parameters'), function(elem) {
                    elem.classList.toggle('scmp-hidden');
                });

                document.body.classList.add('scmp-no-scroll');
            });

            // Consentement par click
            var retention = false;
            document.querySelector('#scmp-btn-validation').addEventListener('click', function(){
                document.querySelectorAll('input[data-consent-family]').forEach(function(el){
                    consent[el.getAttribute('data-consent-family')] = el.checked;
                });

                if(consent.advertising || retention) {
                    document.querySelector('#scmp-parameters').classList.add('scmp-hidden');
                    document.querySelector('#scmp-confirmation').classList.add('scmp-hidden');

                    document.querySelector('#scmp-description').classList.remove('scmp-hidden');
                    document.querySelector('#scmp-header').classList.remove('scmp-hidden');;

                    document.querySelector('.scmp-list-parameters').classList.remove('retention');

                    consent = __cmp.save_consent(consent);
                    retention = false;
                    return;
                }
                if(!consent.advertising) {
                    document.querySelector('#scmp-description').classList.add('scmp-hidden');
                    document.querySelector('#scmp-header').classList.add('scmp-hidden');
                    document.querySelector('#scmp-confirmation').classList.remove('scmp-hidden');


                    document.querySelector('.scmp-list-parameters').classList.add('retention');
                    retention = true;
                    return;
                }
            });
        };
        __cmp.hide = function() {
            if(!__cmp.div_banner) return;

            document.querySelector('#scmp-popin').classList.remove('scmp-parameters-open');

            [].map.call(document.querySelectorAll('#scmp-parameters, #scmp-overlay'), function(elem) {
                elem.classList.add('scmp-hidden');
            });
            document.querySelector('#scmp-popin').classList.add('scmp-hidden'),
            document.body.classList.remove('scmp-no-scroll');
        };
        __cmp.show = function() {
            __cmp._create_banner();

            document.getElementById('scmp-popin').classList.remove('scmp-hidden');
            document.getElementById('scmp-btn-parameters').classList.remove('scmp-hidden');
        };
        __cmp.save_consent = function(consent) {
            consent = __cmp.consent(consent);
            _consent_token(false);
            __cmp.hide();
            dataLayer.push({'event':cn+'Change'});

            __cmp('getUserData', null, function(ret){
                var request = new XMLHttpRequest();

                request.open('POST', 'https://cmp.aws-sipa.ouest-france.fr/' + (window.location.hostname.indexOf('www') != '-1' ? 'prod' : 'staging') + '/v1/cmp', true);
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify({
                    "consentString": ret.consentData,
                    "utilisateurId": ret.uuid
                }));
            });
            return consent;
        };


        // Exemple d'appels:
        // window.__cmp('ping', {}, function(e){ console.log(e) })
        // window.__cmp('getConsentData', {}, function(e){ console.log(e) })
        // window.__cmp('getVendorConsents', {}, function(e){ console.log(e) })

        // Joue les appels stockés avant le chargement de la cmp
        (_cmpStub_commandQueue || []).forEach(function(param) {
            __cmp(param.command, param.parameter || null, param.callback || function(){return null;});
        });

        // consentement par navigation
        if(_consent_token() && !window[cn + '_gcda']) { // _global_consent_doesnt_apply
            // console.log('consent nav')
           consent = __cmp.save_consent({}); // consent all
        }

        // CMP Bandeau
        if(consent == undefined || document.cookie.indexOf(cn + '_consent=') === -1) {
            // affiche bandeau
            __cmp.show();

            _consent_token(true);

            if(!window[cn + '_gcda']) {
                // Ecouteur Scroll
                var evt_scroll = _throttle(function() {
                    if((window.pageYOffset || document.documentElement.scrollTop) > window.innerHeight * .1) { // 10%
                        consent = __cmp.save_consent({}); // consentement par Scroll

                        window.removeEventListener('scroll', evt_scroll);
                    }
                }, 200, { trailing: true, leading: true });
                window.addEventListener('scroll', evt_scroll);
            }
        } else {
            dataLayer.push({'event':cn+'Change'});
        }

    };

    var vendorlist = (function (u) {
        var local_vendorlist = JSON.parse(window.localStorage.getItem(cn+'-vendorlist'));

        // On stocke la liste qu'une semaine en local storage
        if(!local_vendorlist || ((new Date()).getTime() - window.localStorage.getItem(cn+'-vendorlist-update') > 604800000)) { // 7 jours

            var xhr = new XMLHttpRequest();
            xhr.open('GET', u, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status === 200) {

                        vendorlist = xhr.response;
                        window.localStorage.setItem(cn+'-vendorlist-update', (new Date()).getTime());
                        window.localStorage.setItem(cn+'-vendorlist', JSON.stringify(xhr.response));

                        _init(true);
                }
            };

            return xhr.send();

        } else {
            return local_vendorlist;

        }
    })('https://vendorlist.consensu.org/vendorlist.json'); // Url liste globale vendor https://vendorlist.consensu.org/v-versionnum/vendorlist.json

    _init();

})('sipacmp');
