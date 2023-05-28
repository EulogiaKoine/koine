"use strict"
module.exports = function(format){
    if(!Date.prototype.format)
        Object.defineProperty(Date.prototype, 'format', {
            value: format
        })
}