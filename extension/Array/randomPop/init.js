"use strict"
module.exports = function(randomPop){
    if(!Array.prototype.randomPop)
        Object.defineProperty(Array.prototype, 'randomPop', {
            value: randomPop
        })
}