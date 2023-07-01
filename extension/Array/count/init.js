"use strict"
module.exports = function(count){
    if(!Array.prototype.count)
        Object.defineProperty(Array.prototype, 'count', {
            value: count,
            writable: true
        })
}