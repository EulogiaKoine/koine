"use strict"
module.exports = function(at){
    if(!Array.prototype.at)
        Object.defineProperty(Array.prototype, 'at', {
            value: at
        })
}