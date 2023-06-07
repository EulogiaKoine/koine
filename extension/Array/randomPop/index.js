"use strict"
module.exports = function(){

/**
 * @name Array.prototype.random
 * @param {number} [start=0]
 * @param {number} [end=this.length]
 * @returns {*} random element of this
 * 
 * @pre start & end == undefined | integer
 * @pre start >= 0 && end <= this.length
 */
function randomPop(start, end){
    start = start >> 0 || 0
    end = end >> 0 || this.length
    return this.splice(Math.random() * (end - start) + start, 1)[0]
}

return randomPop
}