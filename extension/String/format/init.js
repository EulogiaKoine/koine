"use strict"
module.exports = function(format){
    if(!String.prototype.format)
        Object.defineProperty(String.prototype, "format", {
            value: format
        })
}