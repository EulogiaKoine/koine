"use strict"
module.exports = (function(){
/**
 * @name Array.prototype.at
 * 
 * @param {int} index
 * @returns {*} index >= 0 ? element indexed (index) : element indexed (length-|index|)
 */
function at(index){
    return this[(index >>= 0) < 0? this.length+index: index]
}

return at
})()