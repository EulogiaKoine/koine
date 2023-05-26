"use strict"
module.exports = (function(){
/**
 * @name Array.prototype.toSorted
 * @param {function(*, *): int} compareFn
 * @pre this instanceof Array || Array-like object
 * @returns {Array} sorted Array
 */
function toSorted(compareFn){
    return Array.from(this).sort(compareFn)
}

return toSorted
})()