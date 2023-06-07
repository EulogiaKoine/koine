"use strict"
module.exports = function(){
/**
 * @name Object.entries
 * @param {object} obj any js object
 * @returns {Array} every enumerable properties' [key, values] tuffle
 */
function entries(obj){
    return Object.keys(obj).map(key => [key, obj[key]])
}

return entries
}