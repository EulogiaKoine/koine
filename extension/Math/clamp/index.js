"use strict"
module.exports = (function(){

/**
 * @name Math.clamp
 * @param {number} value
 * @param {number} min the lowest limit of result
 * @param {number} max the highest limit of result
 * @returns {number} returns value within limited range
 */
function clamp(value, min, max){
    return value < min? min: max < value? max: value
}

return clamp
})()