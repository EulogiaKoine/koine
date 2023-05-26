"use strict"
module.exports = function(random){
    if(!Array.prototype.random)
        Object.defineProperty(Array.prototype, 'random', {
            value: random
        })
}