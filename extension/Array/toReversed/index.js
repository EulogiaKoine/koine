"use strict"
module.exports = (function(){

/**
 * @name Array.prototype.toReversed
 * 
 * @pre this = Array or Array-like object
 * @returns {Array} reversed Array
 */
function toReversed(){
    return Array.from(this).reverse()
}

return toReversed
})()