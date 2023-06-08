"use strict"
module.exports = function(toShaken){
    if(!Array.prototype.toShaken)
        Object.defineProperty(Array.prototype, "toShaken", {
            value: toShaken,
            writable: true
        })
}