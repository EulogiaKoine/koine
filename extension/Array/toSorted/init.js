"use strict"
module.exports = function(toSorted){
    if(!Array.prototype.toSorted)
        Object.defineProperty(Array.prototype, "toSorted", {
            value: toSorted
        })
}