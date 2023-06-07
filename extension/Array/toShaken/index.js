"use strict"
module.exports = function(){

const _shake = require('../shake')

/**
 * @name Array.prototype.toShaken
 */
function toShaken(start, end){
    return _shake.call(this.slice(start >> 0, end >> 0 || this.length))
}

return toShaken
}