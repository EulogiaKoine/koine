"use strict"
module.exports = (function(){

/**
 * @name Object.values
 * @param {object} obj any js object
 * @returns {Array} every enumerable properties' values
 */
function values(obj){
    return Object.keys(obj).map(key => obj[key])
}

return values
})()