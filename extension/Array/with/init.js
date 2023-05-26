"use strict"
module.exports = function(_with){
    if(!Array.prototype.with)
        Object.defineProperty(Array.prototype, "with", {
            value: _with
        })
}