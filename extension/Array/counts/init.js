"use strict"
module.exports = function(counts){
    if(!Array.prototype.counts)
        Object.defineProperty(Array.prototype, 'counts', {
            value: counts,
            writable: true
        })
}