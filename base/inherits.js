"use strict";

/**
 * @license none
 * @version 1.0 2023. 5. 3
 */

module.exports = (function(){

function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}});
    Object.defineProperty(subClass, "prototype", {writable: false});
    if (superClass) {
        Object.setPrototypeOf(subClass, superClass);
    }
}

return inherits;
})();