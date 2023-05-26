"use strict"
module.exports = function(shake){
    if(!Array.prototype.shake)
        Object.defineProperty(Array.prototype, 'shake', {
            value: shake
        })
}