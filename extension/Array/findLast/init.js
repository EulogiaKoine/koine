"use strict"
module.exports = function(findLast){
    if(!Array.prototype.findLast)
        Object.defineProperty(Array.prototype, 'findLast', {
            value: findLast
        })
}