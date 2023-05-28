"use strict"
module.exports = function(findLastIndex){
    if(!Array.prototype.findLastIndex)
        Object.defineProperty(Array.prototype, 'findLastIndex', {
            value: findLastIndex
        })
}