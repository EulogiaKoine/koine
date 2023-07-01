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
function random(start, end){
    start = start >> 0 || 0
    end = end >> 0 || this.length
    return this[Math.floor(Math.random() * (end - start) + start)]
}

return random
}