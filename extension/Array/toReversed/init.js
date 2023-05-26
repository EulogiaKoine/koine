"use strict"
module.exports = function(toReversed){
    if(!Array.prototype.toReversed)
        Object.defineProperty(Array.prototype, 'toReversed', {
            value: toReversed
        })
}